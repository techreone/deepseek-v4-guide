# DeepSeek Mobile App Development: Secure iOS & Android Guide

- **URL**: https://chat-deep.ai/docs/deepseek-mobile-app-development/
- **Published**: 2026-06-21T21:40:32+00:00
- **Modified**: 2026-07-29T00:18:18+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 3351
- **Code blocks**: 5
- **Description**: Build DeepSeek features for iOS and Android through a secure backend. Includes a current V4 API call, Swift and Kotlin clients, streaming, and key safety.

## H1


## H2 目录
- 1. Use a backend boundary, not a direct mobile-to-DeepSeek call
- 2. Select the model on the server
- 3. Build a defensive Node.js endpoint
- 4. Call your backend from Swift
- 5. Call your backend from Kotlin and Android
- 6. Add SSE streaming without losing the security boundary
- 7. Protect users, data, and budget
- 8. Use a deliberate HTTP and retry policy
- 9. Test the integration before release
- 10. Estimate and control cost
- Launch checklist
- Frequently asked questions
- Official references

## 正文
Verified July 28, 2026. The secure way to add DeepSeek to an iOS or Android app is simple in principle: mobile app → authenticated backend → DeepSeek API. The mobile app sends the user’s request to a backend you control; that backend authenticates the user, applies limits and policy, calls DeepSeek, and returns only the result the app needs.

Never place a DeepSeek API key in an IPA, APK, JavaScript bundle, source file, mobile environment file, or remotely downloaded configuration. A determined user can extract any secret delivered to a device. Key restrictions and obfuscation may slow an attacker, but they do not turn a client-side provider key into a secret.


> Current model snapshot: DeepSeek’s official model-list endpoint currently exposes deepseek-v4-flash and deepseek-v4-pro. The retired aliases are absent from that list. In our dated checks, the old aliases returned HTTP 400 on July 25, then returned HTTP 200 on July 28 and identified the routed model as V4 Flash. That observed compatibility is inconsistent and is not a production guarantee. Use an official V4 model ID and keep it in server-side configuration.

This guide builds a practical baseline: a defensive Node.js endpoint, native Swift and Kotlin clients, cancellation, streaming design, error policy, privacy controls, tests, and cost monitoring. For the full request schema, see the DeepSeek API guide; compare capabilities on the models page, check current rates on pricing, and replace old aliases using the V4 migration guide.


### 1. Use a backend boundary, not a direct mobile-to-DeepSeek call

Your backend is not merely a key-hiding proxy. It is the control point that decides who may use the feature, what may be sent, how much may be generated, and what is safe to return.


Layer | Responsibilities | Must not do
iOS or Android app | Collect input, hold the app’s own short-lived session, render output, cancel work when the screen closes | Store the DeepSeek key or trust client-supplied limits
Your backend | Authenticate, authorize, validate, rate-limit, redact logs, set model and token limits, call DeepSeek | Expose provider errors, keys, internal prompts, or raw logs to the client
DeepSeek API | Generate the requested completion using the selected model | Act as your user database, access-control system, or permanent conversation store

Give the mobile app a session issued by your own identity system. On every request, the backend verifies that session, checks that the user is permitted to use the AI feature, and enforces server-owned quotas. Do not accept a user ID, model name, system prompt, or maximum-token value merely because the client sent it.

For a small app, one endpoint such as POST /v1/mobile/chat can be enough. A larger product may separate chat, streaming, feedback, conversation history, and file ingestion, but the same trust boundary applies.


### 2. Select the model on the server

Use deepseek-v4-flash as a sensible starting point for latency-sensitive mobile interactions, then evaluate deepseek-v4-pro against your own quality, latency, and cost requirements. Do not allow the app to submit an arbitrary provider model string. If your product offers quality modes, map a small client-facing enum such as fast or advanced to an approved model on the server.

Keep the model ID in deployment configuration so it can be changed without waiting for App Store or Play Store review. At startup or in a scheduled health check, your backend can query the official model-list endpoint and alert if the configured ID disappears. Do not silently fall back to a different model: a silent switch can change behavior, cost, latency, or compliance assumptions.

Thinking mode is also a server decision. The example below explicitly disables it for a short mobile chat response. If you enable thinking, follow the current API rules and test latency, token use, streaming, and tool-call handling. In the Node request body, thinking is a direct request field; extra_body is a Python SDK escape hatch and does not belong in this raw JavaScript request.


### 3. Build a defensive Node.js endpoint

The example uses Node.js 20+ and Express. It is intentionally fail-closed: the placeholder session verifier returns no user, so every request is rejected until you connect a real authentication provider. Replace that function with verified server-side session or JWT validation; never change it to “accept any Bearer token.”


```
import express from "express";

const app = express();
app.use(express.json({ limit: "32kb" }));

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_MODEL =
  process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";

if (!DEEPSEEK_API_KEY) {
  throw new Error("DEEPSEEK_API_KEY is required");
}

// Safe placeholder: connect this to your real server-side auth system.
async function verifyApplicationSession(_request) {
  return null;
}

async function requireUser(req, res, next) {
  try {
    const user = await verifyApplicationSession(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Authentication required" });
  }
}

function validMessages(value) {
  if (!Array.isArray(value) || value.length === 0 || value.length > 20) {
    return false;
  }

  let totalCharacters = 0;
  for (const message of value) {
    if (
      !message ||
      !["user", "assistant"].includes(message.role) ||
      typeof message.content !== "string" ||
      message.content.length === 0 ||
      message.content.length > 8_000
    ) {
      return false;
    }
    totalCharacters += message.content.length;
  }
  return totalCharacters <= 24_000;
}

app.post("/v1/mobile/chat", requireUser, async (req, res) => {
  // Add a user/tenant rate limiter and entitlement check here.
  if (!validMessages(req.body?.messages)) {
    return res.status(400).json({ error: "Invalid messages" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  const requestBody = {
    model: DEEPSEEK_MODEL,
    messages: [
      {
        role: "system",
        content:
          "Answer clearly and briefly. Do not claim access to private data."
      },
      ...req.body.messages
    ],
    thinking: { type: "disabled" },
    max_tokens: 800,
    stream: false
  };

  try {
    const upstream = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      }
    );

    if (!upstream.ok) {
      // Log only a request ID, status, model, and sanitized context.
      console.warn("DeepSeek request failed", {
        status: upstream.status,
        model: DEEPSEEK_MODEL
      });

      if (upstream.status === 429) {
        res.set("Retry-After", "2");
        return res.status(503).json({ error: "Service temporarily busy" });
      }
      if (upstream.status >= 500) {
        return res.status(503).json({ error: "Service temporarily unavailable" });
      }
      // 400/401/402/403 usually require a server configuration,
      // credentials, quota, or billing fix—not a mobile retry loop.
      return res.status(502).json({ error: "AI service configuration error" });
    }

    const contentType = upstream.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return res.status(502).json({ error: "Unexpected AI service response" });
    }

    const data = await upstream.json();
    const message = data?.choices?.[0]?.message?.content;
    if (typeof message !== "string" || message.trim().length === 0) {
      return res.status(502).json({ error: "Empty AI service response" });
    }

    return res.json({ message, model: DEEPSEEK_MODEL });
  } catch (error) {
    if (error?.name === "AbortError") {
      return res.status(504).json({ error: "AI service timed out" });
    }
    console.error("DeepSeek network failure", {
      name: error?.name || "UnknownError"
    });
    return res.status(503).json({ error: "AI service unavailable" });
  } finally {
    clearTimeout(timeout);
  }
});

app.listen(3000);
```

Add a real distributed rate limiter before production, keyed by both account and IP where appropriate. Enforce subscription entitlements and daily budgets on the server. If the app retains conversation history, load it after checking ownership; do not accept another conversation’s ID and assume it belongs to the caller.

The endpoint returns deliberately small, stable error objects. Provider response bodies can contain operational detail that belongs in restricted server diagnostics, not on a user’s screen. Even in server logs, redact authorization headers, prompts, uploaded text, user identifiers, and generated content unless you have a documented reason and retention policy.


### 4. Call your backend from Swift

The iOS client sends its own app session to your backend—not the DeepSeek key. This Foundation-only example checks cancellation, HTTP status, decoding, and empty results.


```
import Foundation

struct ChatMessage: Codable {
    let role: String
    let content: String
}

private struct ChatRequest: Encodable {
    let messages: [ChatMessage]
}

private struct ChatReply: Decodable {
    let message: String
}

enum MobileChatError: LocalizedError {
    case invalidResponse
    case authenticationRequired
    case invalidRequest
    case temporarilyUnavailable
    case emptyResponse

    var errorDescription: String? {
        switch self {
        case .authenticationRequired: return "Please sign in again."
        case .invalidRequest: return "That request could not be sent."
        case .temporarilyUnavailable: return "The service is temporarily unavailable."
        case .emptyResponse: return "The service returned an empty response."
        case .invalidResponse: return "The server returned an unexpected response."
        }
    }
}

struct MobileChatClient {
    let baseURL: URL
    let appAccessToken: () async throws -> String

    func send(messages: [ChatMessage]) async throws -> String {
        try Task.checkCancellation()

        let token = try await appAccessToken()
        let url = baseURL.appending(path: "v1/mobile/chat")
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.timeoutInterval = 35
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        request.httpBody = try JSONEncoder().encode(ChatRequest(messages: messages))

        let (data, response) = try await URLSession.shared.data(for: request)
        try Task.checkCancellation()

        guard let http = response as? HTTPURLResponse else {
            throw MobileChatError.invalidResponse
        }

        switch http.statusCode {
        case 200...299:
            let reply = try JSONDecoder().decode(ChatReply.self, from: data)
            let text = reply.message.trimmingCharacters(in: .whitespacesAndNewlines)
            guard !text.isEmpty else { throw MobileChatError.emptyResponse }
            return text
        case 401:
            throw MobileChatError.authenticationRequired
        case 408, 429:
            throw MobileChatError.temporarilyUnavailable
        case 400...499:
            throw MobileChatError.invalidRequest
        case 500...599:
            throw MobileChatError.temporarilyUnavailable
        default:
            throw MobileChatError.invalidResponse
        }
    }
}
```

Swift concurrency propagates cancellation to URLSession.data(for:). Keep the request in a Task owned by your view model, cancel the prior task when the user submits again, and cancel it when the screen disappears if the result is no longer useful. Treat CancellationError as a normal UI event, not as a failure alert.

Store only your application’s refresh credentials in Keychain when required. Prefer short-lived access tokens in memory. Apply App Transport Security, certificate validation, and your normal compromise-response process, but remember that certificate pinning does not make an embedded provider key safe.


### 5. Call your backend from Kotlin and Android

Retrofit, Moshi, coroutines, and lifecycle-aware collection provide a compact Android client. Use current compatible versions from the official project documentation rather than copying frozen dependency numbers from an article.


```
dependencies {
    implementation("com.squareup.retrofit2:retrofit:<current>")
    implementation("com.squareup.retrofit2:converter-moshi:<current>")
    implementation("com.squareup.moshi:moshi-kotlin:<current>")
    implementation("com.squareup.okhttp3:okhttp:<current>")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:<current>")
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:<current>")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:<current>")
}
```


```
import java.util.concurrent.TimeUnit
import kotlinx.coroutines.withTimeout
import okhttp3.OkHttpClient
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.Body
import retrofit2.http.POST

data class ChatMessage(val role: String, val content: String)
data class ChatRequest(val messages: List<ChatMessage>)
data class ChatReply(val message: String)

interface MobileChatApi {
    @POST("v1/mobile/chat")
    suspend fun chat(@Body request: ChatRequest): Response<ChatReply>
}

fun createMobileChatApi(
    baseUrl: String,
    appAccessToken: () -> String,
): MobileChatApi {
    val httpClient = OkHttpClient.Builder()
        .callTimeout(35, TimeUnit.SECONDS)
        .addInterceptor { chain ->
            val token = appAccessToken().trim()
            require(token.isNotEmpty()) { "Application access token is required" }
            val request = chain.request().newBuilder()
                .header("Authorization", "Bearer $token")
                .build()
            chain.proceed(request)
        }
        .build()

    return Retrofit.Builder()
        .baseUrl(baseUrl) // Must be HTTPS and end with a slash.
        .client(httpClient)
        .addConverterFactory(MoshiConverterFactory.create())
        .build()
        .create(MobileChatApi::class.java)
}

sealed class ChatFailure(message: String) : Exception(message) {
    class SignInRequired : ChatFailure("Please sign in again.")
    class InvalidRequest : ChatFailure("That request could not be sent.")
    class Temporary : ChatFailure("The service is temporarily unavailable.")
    class Unexpected : ChatFailure("The server returned an unexpected response.")
}

class ChatRepository(private val api: MobileChatApi) {
    suspend fun send(messages: List<ChatMessage>): String =
        withTimeout(35_000) {
            val response = api.chat(ChatRequest(messages))
            when {
                response.isSuccessful -> {
                    val text = response.body()?.message?.trim().orEmpty()
                    if (text.isEmpty()) throw ChatFailure.Unexpected()
                    text
                }
                response.code() == 401 -> throw ChatFailure.SignInRequired()
                response.code() in setOf(408, 429) -> throw ChatFailure.Temporary()
                response.code() in 400..499 -> throw ChatFailure.InvalidRequest()
                response.code() in 500..599 -> throw ChatFailure.Temporary()
                else -> throw ChatFailure.Unexpected()
            }
        }
}
```

Add your application token with an OkHttp interceptor that reads from your authenticated session store. Do not log the Authorization header or enable a body-logging interceptor in production. Configure Retrofit with your own HTTPS base URL and Moshi converter.

A Retrofit suspend call is cancelled when its coroutine is cancelled. Launch it from viewModelScope, keep the returned Job if you need an explicit Stop button, and collect UI state with repeatOnLifecycle. Always rethrow CancellationException; catching it as a generic error prevents structured cancellation. The 35-second client timeout should be slightly longer than the backend’s upstream timeout.


### 6. Add SSE streaming without losing the security boundary

Streaming improves perceived latency because the interface can render partial text. It does not justify a direct mobile-to-provider connection. Authenticate the app at your backend, start the DeepSeek request with stream: true, consume the provider’s server-sent events, and emit a small application-owned event format to the device.

- Send Content-Type: text/event-stream, disable proxy buffering where necessary, and flush headers promptly.

- Parse provider events on the backend rather than blindly forwarding every upstream byte. Forward only fields the app needs, such as text deltas and a terminal event.

- Treat the provider’s [DONE] marker as completion. Do not assume that a TCP close means success.

- When the mobile client disconnects, abort the upstream fetch immediately. Otherwise you may keep generating—and paying for—output nobody can see.

- Apply a maximum duration, maximum output, idle timeout, rate limit, and concurrent-stream limit per account.

- If thinking mode is enabled, decide explicitly whether reasoning content should be stored or exposed. Do not accidentally mix internal reasoning fields into the user-visible answer.

On iOS, URLSession.bytes(for:) can read the response as an asynchronous byte sequence. On Android, OkHttp can consume an SSE response or a maintained event-source library can manage framing. In both clients, assemble complete SSE events—not arbitrary network chunks—and update the UI at a controlled cadence to avoid excessive renders. Provide a Stop action and a clear retry state when a connection ends before the terminal event.


### 7. Protect users, data, and budget

AI features expand the data path of a mobile application. Document what is sent, why it is sent, where it is processed, and how long each component retains it. Give users an appropriate notice before transmitting sensitive content, and avoid collecting data the feature does not need. Legal and compliance requirements depend on your users, jurisdiction, contracts, and data categories; an API integration guide cannot replace that assessment.

- Authentication and authorization: validate sessions server-side, check tenant and feature access, and prevent object-level authorization mistakes on conversations and files.

- Input controls: enforce message count, byte size, accepted roles, upload type, and total context on the backend. Strip client-provided system or developer instructions unless your product intentionally supports them.

- Secrets: keep the provider key in a server-side secret manager, rotate it, restrict operational access, and maintain a revocation procedure.

- Logging: use request IDs and aggregate metrics. Redact prompts, completions, tokens, cookies, authorization headers, device identifiers, and personal data by default.

- Abuse and spend: enforce per-user and per-tenant rate limits, concurrency limits, maximum tokens, daily budgets, and anomaly alerts. A client-side counter is only a UI convenience.

- Output handling: treat model output as untrusted text. Escape it before rendering HTML, validate structured data, and require confirmation before any consequential action.

- Prompt injection: never let generated text bypass normal authorization. If you later add tools or retrieval, permissions must be enforced by your application, not inferred from the model’s request.


### 8. Use a deliberate HTTP and retry policy


Condition | Backend action | Mobile action
App authentication fails | Return 401 | Refresh the app session once or ask the user to sign in
Invalid client input | Return 400 with a stable safe code | Correct the request; do not retry unchanged
Provider 400 | Log sanitized configuration context; return 502 | Show a generic failure; do not loop
Provider 401 or 403 | Alert operators; fix the server credential or permission | Do not retry as though it were transient
Provider 402 | Alert operators; resolve account balance or billing | Do not retry as though it were transient
Provider 429 | Apply bounded backoff; return 503/Retry-After if unresolved | Retry only when safe, with jitter and a low attempt limit
Provider 5xx or network failure | Use bounded exponential backoff where the request is safe to repeat | Offer retry; avoid duplicate visible messages
Timeout | Abort upstream and return 504 | Show a timeout state and allow a deliberate retry

Retry only 429, selected 5xx responses, and network failures. Use exponential backoff with jitter, a small attempt cap, and a total time budget. Interactive generation is not automatically idempotent: a retry may create a second completion and another charge. Assign your own request ID, avoid displaying duplicate results, and do not retry after the user cancels. A provider 401, 402, or most 4xx responses needs a configuration, credential, billing, or request fix—not repeated traffic.


### 9. Test the integration before release

Unit-test request validation, authorization, status mapping, empty responses, timeouts, and log redaction without calling DeepSeek. Use a mock upstream server for malformed JSON, slow responses, 429, 5xx, and disconnects. In client tests, cover offline mode, session expiry, rotation, cancellation, backgrounding, duplicate taps, large Dynamic Type, and a stream that ends without a completion event.

Maintain a small staging smoke test against the configured official model ID. Record the date, model requested, HTTP status, model reported in the response, latency, and a harmless output assertion. This is how the July 25 versus July 28 alias behavior should be treated: dated observations, not a promise that undocumented compatibility will continue.

Production dashboards should track success rate, latency percentiles, timeouts, provider status classes, tokens, estimated cost, cancellations, and retries. Avoid prompt or completion text in telemetry. Alert on sudden 401/402/403 responses, a missing configured model, unusual token growth, or a retry spike.


### 10. Estimate and control cost

Use the current rates from the DeepSeek pricing page; do not hard-code an article’s price into a long-lived mobile release. The general calculation is:


```
estimated cost =
  (cache-hit input tokens / 1,000,000 × cache-hit input rate)
+ (cache-miss input tokens / 1,000,000 × cache-miss input rate)
+ (output tokens / 1,000,000 × output rate)
```

Calculate cost on the backend from provider usage fields when available. Track cache-hit and cache-miss input separately if their rates differ. Set max_tokens, trim conversation history, summarize older turns when appropriate, and prevent the client from overriding cost controls. A “send” button should be disabled while the same request is active, and retries should be visible rather than automatic without limit.


### Launch checklist

- The app calls only your HTTPS backend; no DeepSeek key is present in the binary or mobile configuration.

- The backend rejects unauthenticated requests and verifies authorization for conversations, files, and tenants.

- The configured model is deepseek-v4-flash or deepseek-v4-pro, not an old alias.

- Message size, roles, model, thinking mode, timeout, and max_tokens are controlled server-side.

- Provider errors are mapped to stable client responses without leaking credentials or internal detail.

- 401 and 402 are treated as operator-action conditions, not transient retry targets.

- Mobile cancellation aborts backend and upstream work, including SSE streams.

- Logs and analytics exclude prompts, completions, secrets, and unnecessary personal data.

- Rate limits, budgets, abuse controls, monitoring, and a key-rotation runbook are active.

- Offline, timeout, malformed response, model change, and partial-stream cases have been tested.


### Frequently asked questions


#### Can an iOS or Android app call DeepSeek directly?

Technically it can send the HTTP request, but a production app should not embed the provider key. Route calls through an authenticated backend that protects the key and enforces authorization, validation, rate limits, privacy policy, and spend limits.


#### Which DeepSeek model IDs should a mobile backend use?

As verified July 28, 2026, the official list exposes deepseek-v4-flash and deepseek-v4-pro. Choose through testing and server-side configuration. Do not depend on retired aliases merely because a dated test happened to return 200.


#### Why did an old alias work after the cutoff?

Observed behavior changed: the aliases returned 400 on July 25, while tests on July 28 returned 200 and reported V4 Flash. They remain absent from the official model list. This may be temporary compatibility or routing behavior, so it should not be treated as a documented contract.


#### Should the mobile app retry every failed request?

No. Retry only transient network failures, 429, and selected 5xx responses, with bounded exponential backoff and jitter. Do not retry invalid requests, provider authentication failures, or payment-required responses. Stop immediately when the user cancels.


#### Should conversation history be stored on the device or server?

That is a product and privacy decision. Store the minimum needed, encrypt sensitive local data using platform facilities, define retention and deletion behavior, and enforce ownership on every server read. Never trust a conversation ID from the app without checking that the authenticated user may access it.


#### Is streaming required?

No. Start with a non-streaming endpoint if it meets the experience goal; it is easier to operate and test. Add SSE when faster perceived response justifies connection management, event parsing, cancellation, partial-output UX, and additional observability.


### Official references

- DeepSeek: List Models

- DeepSeek: API Pricing

- DeepSeek: V4 API release and alias cutoff notice

- DeepSeek: Thinking Mode

- DeepSeek: Error Codes

## 内部链接
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [models page](https://chat-deep.ai/models/)
- [pricing](https://chat-deep.ai/pricing/)
- [V4 migration guide](https://chat-deep.ai/docs/migrate-deepseek-chat-reasoner-to-v4/)
- [DeepSeek pricing page](https://chat-deep.ai/pricing/)

## 外部链接
- [DeepSeek: List Models](https://api-docs.deepseek.com/api/list-models)
- [DeepSeek: API Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek: V4 API release and alias cutoff notice](https://api-docs.deepseek.com/news/news260424/)
- [DeepSeek: Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode)
- [DeepSeek: Error Codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-mobile-app-development%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-mobile-app-development%2F&text=Build%20a%20Secure%20DeepSeek%20Mobile%20App%20for%20iOS%20and%20Android)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-mobile-app-development%2F&title=Build%20a%20Secure%20DeepSeek%20Mobile%20App%20for%20iOS%20and%20Android)
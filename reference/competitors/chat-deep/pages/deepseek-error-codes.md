# DeepSeek API Error Codes: Fix 400, 401, 422 & 429

- **URL**: https://chat-deep.ai/docs/deepseek-error-codes/
- **Published**: 2026-03-28T15:41:13+00:00
- **Modified**: 2026-07-27T08:25:37+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 3039
- **Code blocks**: 3
- **Description**: DeepSeek API error codes explained with live 400/401 tests, 402 diagnosis, 429/500/503 retry rules, redacted evidence, and Python examples.

## H1


## H2 目录
- DeepSeek API error codes at a glance
- How we tested the current API
- Live result matrix: what the API actually returned
- 400 Invalid Format: fix the request before retrying
- 401 Authentication Fails: inspect key loading, not the model
- 402 Insufficient Balance: repair account state
- 422 Invalid Parameters: documented, but not reproduced here
- 429 Rate Limit Reached: control concurrency
- 500 Server Error and 503 Server Overloaded
- Observed 404, 405, and 415: useful HTTP clues outside the seven-code page
- Do not assume every error body is JSON
- A production retry policy that does not duplicate every failure
- Safe logging: enough evidence to diagnose, not enough to leak
- Reproduce the tests and inspect the evidence
- A five-minute diagnosis sequence
- Frequently asked questions
- Final checklist

## 正文
DeepSeek API error codes are easiest to fix when you separate the HTTP status from the response body and from any failure raised by your own client. DeepSeek officially documents seven API statuses: 400, 401, 402, 422, 429, 500, and 503. Our bounded live test also received 404, 405, and 415 for a wrong route, wrong method, and wrong media type. Those three are real observations, but they are not additions to DeepSeek’s official seven-code quick reference.

This guide distinguishes every claim with one of three evidence labels: Officially documented, Observed July 27, 2026 UTC, or Locally simulated. That distinction matters. We did not drain an account to manufacture a 402, flood the service to force a 429, or attempt to cause a server failure. The live matrix used 18 sequential requests across 15 safe scenarios, no automatic retries, a temporary credential, synthetic input, and a tiny successful control.

Chat-Deep.ai is an independent technical publication and is not affiliated with or endorsed by DeepSeek. Credentials, balances, private account data, provider request identifiers, and hidden reasoning were excluded from every public artifact and image.


### DeepSeek API error codes at a glance


HTTP status | Official meaning | First action | Automatic retry? | Evidence in this study
400 | Invalid Format | Correct the JSON, field types, model, or documented value range | No | Observed live
401 | Authentication Fails | Replace or correctly load the API key | No | Observed live
402 | Insufficient Balance | Check account funding and billing state | No | Not forced
422 | Invalid Parameters | Validate parameter names, values, and combinations | No | Not observed in the bounded matrix
429 | Rate Limit Reached | Reduce concurrency and queue work | Yes, bounded | Not forced
500 | Server Error | Retry briefly; check service status if persistent | Yes, bounded | Not forced
503 | Server Overloaded | Back off, shed load, and check service status | Yes, bounded | Not forced

If you are setting up a client for the first time, confirm the endpoint and request structure in our DeepSeek API guide, then verify secret handling with the DeepSeek API key guide. Fixing configuration before adding retries prevents a fast loop of identical failures.


### How we tested the current API

Observed July 27, 2026 UTC: the control request called POST https://api.deepseek.com/chat/completions with deepseek-v4-flash, thinking disabled, non-streaming output, and an eight-token maximum. It returned HTTP 200, the requested model, a stop finish reason, and the synthetic answer OK. That control established that the temporary credential, endpoint, model, and network path were working before malformed cases were sent.

The 18 requests were sequential. Automatic retries were disabled so one row could not hide an earlier response. Four requests repeated the missing-body case; all four returned 400 with the same content type, body length, and body hash. We stored status, latency, content type, safe public fields, body size, and hashes of synthetic evidence. Public artifacts exclude authorization headers, the temporary key, balance data, account identifiers, provider request IDs, private prompts, and hidden reasoning.


![DeepSeek 400 versus 422 boundary comparing official definitions with dated live API observations](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


#### Safety limits and non-results

- We did not reduce or expose account balance to force HTTP 402.

- We did not exceed documented concurrency limits or generate a traffic burst to force HTTP 429.

- We did not attempt to destabilize DeepSeek to cause HTTP 500 or 503.

- We did not observe HTTP 422 in this bounded matrix, so this article does not claim that 422 is absent from the service.

- We did not interpret a client timeout, DNS failure, or local serialization exception as a DeepSeek HTTP response.

The full provider definitions remain the authority: see DeepSeek’s Error Codes, Rate Limit & Isolation, and Create Chat Completion references.


### Live result matrix: what the API actually returned


Scenario | Status | Latency | Response shape
Known-good control | 200 | 1,050 ms | JSON completion
Authorization omitted | 401 | 300 ms | No JSON error object detected
Synthetic invalid credential | 401 | 298 ms | JSON error object
Truncated JSON | 400 | 282 ms | application/octet-stream
Empty JSON object | 400 | 342 ms | JSON error object
messages sent as an object | 400 | 264 ms | JSON error object
Unknown model ID | 400 | 266 ms | Error metadata in non-JSON media type
temperature: 3 | 400 | 263 ms | Error metadata in non-JSON media type
user_id length 513 | 400 | 284 ms | Error metadata in non-JSON media type
Unsupported developer role | 400 | 265 ms | JSON error object
Singular /chat/completion path | 404 | 266 ms | Empty body
GET on Chat Completions | 405 | 274 ms | Empty body
Content-Type: text/plain | 415 | 277 ms | Plain text


![Live DeepSeek API test matrix with successful control and observed 400, 401, 404, 405, and 415 responses](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

One compatibility result deserves caution. A synthetic user_id containing a space was accepted once with HTTP 200, even though the current Rate Limit & Isolation documentation specifies a restricted character pattern and a maximum length of 512. A 513-character value returned 400. Treat the accepted space as a dated observation—not permission to ignore the documented contract. Clients should continue generating user_id values that match [a-zA-Z0-9\-_]+ and stay within 512 characters.


### 400 Invalid Format: fix the request before retrying

Officially documented: DeepSeek describes 400 as an invalid request-body format. Observed July 27, 2026 UTC: 400 covered more than broken JSON in our run. We received it for a missing body, an empty object, the wrong messages type, an unknown model, a temperature above the allowed range, an oversized user_id, and an unsupported message role.

The practical lesson is to debug the whole request contract, not only JSON syntax. Confirm the plural /chat/completions route, a POST method, Content-Type: application/json, a current model ID, a non-empty messages array, documented message roles, and valid numeric ranges. When using structured output, validate the extra constraints in our DeepSeek JSON Output guide. When thinking is enabled, follow the field rules in the DeepSeek Thinking Mode tests.


```
curl https://api.deepseek.com/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "Reply with OK."}],
    "thinking": {"type": "disabled"},
    "max_tokens": 8
  }'
```

Do not automatically retry an unchanged 400. It usually produces the same rejection, adds noise, and can conceal a bad deployment. Log a sanitized request schema or a local validation result, correct the input, and submit a new request.


### 401 Authentication Fails: inspect key loading, not the model

Officially documented: 401 means authentication failed because the API key is incorrect. Observed July 27, 2026 UTC: omitting the Authorization header returned 401 without a detected JSON error object, while a clearly synthetic invalid bearer returned 401 with a JSON error object. That object used the string invalid_request_error in its error.code field.

The numeric HTTP status and the JSON error.code are different fields; do not route retry logic from the string alone. Check that the environment variable exists in the running process, the header begins with Bearer , whitespace has not been copied into the secret, and the key belongs to the intended environment. Rotate a credential if it may have been exposed. Never print the full header or key during diagnosis.


### 402 Insufficient Balance: repair account state

Officially documented: DeepSeek assigns 402 to insufficient account balance. Observed July 27, 2026 UTC: not forced. Manufacturing this response would have required changing or depleting account funding, so it was outside the test boundary.

A 402 is not a transient model failure. Verify billing and account state through an authorized account view, confirm the key belongs to the expected account, and add funds or resolve the billing restriction. Do not log the balance in a public trace or screenshot. A queue may hold non-urgent jobs until an operator resolves the issue, but blindly retrying the same request will not create credit. For current input and output rates, use the site’s DeepSeek pricing reference and verify figures against DeepSeek’s official pricing page.


### 422 Invalid Parameters: documented, but not reproduced here

Officially documented: DeepSeek labels 422 as Invalid Parameters. Observed July 27, 2026 UTC: no live request in our bounded matrix returned 422. Invalid model, temperature, message shape, role, and oversized user_id examples returned 400 instead.

This does not prove DeepSeek never returns 422. Validation order, endpoints, model capabilities, and hosted service versions can change which layer rejects a request. Treat both 400 and 422 as non-retryable input failures unless you have corrected the request. Preserve the numeric status in telemetry so future observations can be compared without rewriting history.


### 429 Rate Limit Reached: control concurrency

Officially documented: DeepSeek uses 429 when the account-level concurrency limit is exceeded. Its current Rate Limit & Isolation page documents separate limits for Pro and Flash requests and describes a request keep-alive mechanism while work waits for inference capacity. Observed July 27, 2026 UTC: 429 was not forced; the test intentionally avoided bursts and high concurrency.

Respond by limiting concurrent in-flight requests, adding a queue, and applying bounded backoff. Do not assume a requests-per-minute formula when the current documentation describes account-level concurrency. If a response contains Retry-After, honor it within your safety cap; none of the responses observed in our bounded matrix contained that header. Our detailed DeepSeek API Rate Limits guide covers queue sizing and isolation.


### 500 Server Error and 503 Server Overloaded

Officially documented: 500 is a DeepSeek server error, while 503 means the server is overloaded. Observed July 27, 2026 UTC: neither status was forced. Triggering provider incidents is neither safe nor a reproducible application test.

Both are reasonable candidates for a small number of delayed retries. Use exponential backoff with jitter, cap total attempts and elapsed time, and stop if the caller cancels. If errors continue, check the official DeepSeek Status page and degrade gracefully. For example, accept work into a durable queue, display a temporary-service message, or route only if you have an approved fallback. Do not convert an extended provider outage into an unbounded retry storm.


### Observed 404, 405, and 415: useful HTTP clues outside the seven-code page

Observed July 27, 2026 UTC: a POST to the singular path /chat/completion returned 404; GET on /chat/completions returned 405; and a JSON-looking body sent as text/plain returned 415. These statuses are standard transport and routing clues, but DeepSeek’s current Error Codes quick reference does not list them among its seven entries.

- 404: verify the base URL and plural endpoint path.

- 405: use the method required by the endpoint—POST for Chat Completions.

- 415: send a JSON body with Content-Type: application/json.

These are request corrections, not retry candidates. SDK users should also check whether a custom base URL appends an extra path segment. Compare setup patterns in the OpenAI SDK with DeepSeek guide, the DeepSeek Python SDK guide, or the DeepSeek Node.js and TypeScript guide.


### Do not assume every error body is JSON

Observed July 27, 2026 UTC: response bodies varied. Some 400 and 401 cases produced a JSON error object; other failures used application/octet-stream, plain text, or an empty body. A client that calls response.json() unconditionally may replace the useful HTTP status with its own JSON-decoding exception.


![Comparison of JSON error objects, non-JSON error bodies, and empty DeepSeek API error responses](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


```
def safe_error_metadata(response):
    metadata = {
        "http_status": response.status_code,
        "content_type": response.headers.get("content-type"),
        "body_bytes": len(response.content),
    }
    try:
        payload = response.json()
    except ValueError:
        metadata["response_shape"] = "non_json_or_empty"
        return metadata

    error = payload.get("error") if isinstance(payload, dict) else None
    if isinstance(error, dict):
        metadata["error_type"] = error.get("type")
        metadata["error_code"] = error.get("code")
        # Sanitize provider messages before logging; they can contain key fragments.
        metadata["has_message"] = bool(error.get("message"))
    else:
        metadata["response_shape"] = "json_without_error_object"
    return metadata
```

Cap how many body bytes you inspect, and avoid writing raw provider messages directly into public logs. In our invalid-credential response, the provider message included a masked key suffix. Masked is better than exposed, but credential-shaped fragments still do not belong in analytics, screenshots, or search-indexed debug pages.


### A production retry policy that does not duplicate every failure

Locally simulated: our deterministic fault-injection lab classified 400, 401, 402, and 422 as stop-and-fix conditions. It classified 429, 500, 503, and a network timeout as retryable with a two-retry schedule of 500 ms and 1,000 ms. The lab sent no request to DeepSeek and did not sleep; it tested policy output only.


![Local DeepSeek retry laboratory showing no retry for 400, 401, 402, and 422 and bounded backoff for 429, 500, and 503](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


```
import os
import random
import time
import requests

URL = "https://api.deepseek.com/chat/completions"
RETRYABLE = {429, 500, 503}

def retry_delay(response, attempt):
    value = response.headers.get("Retry-After")
    if value:
        try:
            return min(float(value), 30.0)
        except ValueError:
            pass
    ceiling = min(0.5 * (2 ** attempt), 8.0)
    return random.uniform(0, ceiling)

def create_completion(payload, attempts=3):
    headers = {
        "Authorization": f"Bearer {os.environ['DEEPSEEK_API_KEY']}",
        "Content-Type": "application/json",
    }
    for attempt in range(attempts):
        try:
            response = requests.post(URL, headers=headers, json=payload, timeout=(10, 90))
        except (requests.Timeout, requests.ConnectionError) as exc:
            # The provider outcome is unknown. Retry only when the caller has
            # an application-level duplicate-work guard.
            if attempt == attempts - 1:
                raise RuntimeError(
                    f"DeepSeek transport failed: {type(exc).__name__}"
                ) from exc
            ceiling = min(0.5 * (2 ** attempt), 8.0)
            time.sleep(random.uniform(0, ceiling))
            continue

        if response.ok:
            return response.json()

        metadata = safe_error_metadata(response)
        if response.status_code not in RETRYABLE or attempt == attempts - 1:
            raise RuntimeError(f"DeepSeek request failed: {metadata}")

        time.sleep(retry_delay(response, attempt))

    raise RuntimeError("unreachable")
```

A transport timeout is ambiguous: the provider may have received and completed work even though the client never received the response. Before retrying expensive or externally visible tasks, use your own operation ID, cache, or duplicate-work guard. Context reuse can also change cost behavior, so record cache metrics separately using our DeepSeek Context Caching tests.


### Safe logging: enough evidence to diagnose, not enough to leak

A useful error event records time, environment, endpoint name, HTTP method, status, latency, retry attempt, model, response content type, body byte count, and a locally generated correlation ID. It can also record whether a structured error object existed and sanitized values for error.type and error.code. It should not store the Authorization header, full API key, account balance, complete prompts, raw hidden reasoning, or provider identifiers that your privacy policy does not permit.


![Safe DeepSeek API error logging checklist separating useful diagnostics from secrets and private content](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Build dashboards around the numeric status first. Split 400 and 422 by validation stage, 401 by deployment or secret version without revealing it, 429 by queue depth and in-flight concurrency, and 500/503 by provider incident window. Our DeepSeek Observability guide shows how to connect errors with latency, token usage, and service-level alerts.


### Reproduce the tests and inspect the evidence

The redacted live summary, CSV results, methodology, local retry fixtures, and dependency-free Node.js harness are available in the public DeepSeek API Error Codes test repository. Live execution is opt-in, sequential, currently plans 14 provider requests, refuses any plan above 18, and requires your own temporary key. The offline simulation needs no credential and sends no traffic to DeepSeek.

Before rerunning the matrix, compare the harness with DeepSeek’s current Error Codes, Chat Completions, and Rate Limit & Isolation references. A future service version may classify the same invalid fixture differently, which is why each result records its UTC date and request shape.


### A five-minute diagnosis sequence

- Capture the numeric HTTP status. Do this before parsing the body.

- Confirm a known-good control. Use a tiny synthetic prompt, a current model from the DeepSeek Models page, and a small output cap.

- Classify ownership. Fix 400/401/402/422 in the request, credential, or account. Queue and retry 429/500/503 within bounds.

- Validate transport details. Check the exact route, POST method, JSON content type, timeout, proxy, and base URL.

- Compare documentation and dated evidence. Provider behavior can evolve. Preserve the date, endpoint, model, and request shape with each test.

- Escalate with sanitized facts. Include status, time window, safe correlation data, and reproducible request structure—never the key or private prompt.


### Frequently asked questions


#### Why did DeepSeek return 400 when the documentation also lists 422?

In our July 27, 2026 UTC run, malformed JSON, invalid model and temperature values, wrong message shapes, an oversized user_id, and an unsupported role all returned 400. DeepSeek still officially documents 422 for invalid parameters. The bounded result does not establish a universal boundary; validation mapping can depend on the endpoint, request, and current service version.


#### Should I retry a DeepSeek 401 error?

No. Correct the missing, invalid, expired, or incorrectly loaded credential first. Repeating the same Authorization header will normally repeat the failure and can create noisy security telemetry.


#### Does DeepSeek always return a JSON error object?

No. Our live tests received JSON error objects, non-JSON media types, plain text, and empty bodies. Preserve status and content type, then attempt JSON parsing defensively.


#### Does every 429 include a Retry-After header?

Do not assume it does. We did not force a 429, and none of the observed responses in our bounded matrix included Retry-After. Production code should honor a valid header when present and use capped backoff when it is absent.


#### Are 404, 405, and 415 official DeepSeek API error codes?

They were real HTTP responses in our dated test, but they are not listed on DeepSeek’s seven-code Error Codes quick-reference page. We report them as observations for route, method, and content-type diagnosis.


#### Can a timed-out request still consume tokens or complete?

Yes, that is possible because a client timeout only proves the client stopped waiting. It does not prove the provider never began work. Keep retries bounded and use an application-level duplicate-work guard for expensive or externally visible operations.


### Final checklist

- Treat HTTP status, JSON error.code, and local exceptions as separate signals.

- Fix 400, 401, 402, and 422 before sending another request.

- Queue and back off for 429; use only bounded retries for 500 and 503.

- Handle JSON, non-JSON, and empty error bodies.

- Follow documented parameter rules even when one dated compatibility probe is permissive.

- Never publish API keys, authorization headers, balances, private prompts, or hidden reasoning.

- Check DeepSeek’s official documentation and change log before treating a dated result as permanent behavior.

The durable pattern is simple: preserve the numeric status, validate the request contract, retry only transient classes, and keep evidence labels honest. This turns “the DeepSeek API failed” into a specific, testable diagnosis without creating load, leaking account data, or overstating what a single benchmark observed.

## 内部链接
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [DeepSeek API key guide](https://chat-deep.ai/docs/deepseek-api-key/)
- [DeepSeek JSON Output guide](https://chat-deep.ai/docs/json-output/)
- [DeepSeek Thinking Mode tests](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [DeepSeek pricing reference](https://chat-deep.ai/pricing/)
- [DeepSeek API Rate Limits guide](https://chat-deep.ai/docs/api-rate-limits/)
- [OpenAI SDK with DeepSeek guide](https://chat-deep.ai/docs/openai-sdk-to-deepseek/)
- [DeepSeek Python SDK guide](https://chat-deep.ai/docs/deepseek-python-sdk/)
- [DeepSeek Node.js and TypeScript guide](https://chat-deep.ai/docs/deepseek-nodejs-typescript/)
- [DeepSeek Context Caching tests](https://chat-deep.ai/docs/deepseek-context-caching/)
- [DeepSeek Observability guide](https://chat-deep.ai/docs/deepseek-observability/)
- [DeepSeek Models page](https://chat-deep.ai/models/)

## 外部链接
- [Error Codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [Rate Limit & Isolation](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [Create Chat Completion](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek Status page](https://status.deepseek.com/)
- [DeepSeek API Error Codes test repository](https://github.com/chatdeepai/deepseek-api-reproducible-tests/tree/main/error-codes)
- [Error Codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [Chat Completions](https://api-docs.deepseek.com/api/create-chat-completion/)
- [Rate Limit & Isolation](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-error-codes%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-error-codes%2F&text=DeepSeek%20API%20Error%20Codes%3A%20Live%20Tests%20for%20400%2C%20401%2C%20402%2C%20422%2C%20429%2C%20500%2C%20and%20503)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-error-codes%2F&title=DeepSeek%20API%20Error%20Codes%3A%20Live%20Tests%20for%20400%2C%20401%2C%20402%2C%20422%2C%20429%2C%20500%2C%20and%20503)
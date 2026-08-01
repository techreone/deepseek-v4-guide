# DeepSeek API Testing: Mocks, Regression & Live Smoke Tests

- **URL**: https://chat-deep.ai/docs/testing-deepseek-api/
- **Published**: 2026-07-23T22:20:54+00:00
- **Modified**: 2026-07-28T22:07:37+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 3323
- **Code blocks**: 11
- **Description**: DeepSeek API testing with mocked Node.js fixtures, streaming and error regressions, plus a bounded live smoke test with sanitized evidence.

## H1


## H2 目录
- How to Test DeepSeek API Calls Safely
- What Mocks and Live Tests Can Prove
- Build a Dependency-Free Node.js Test Project
- Inject fetch and Preserve HTTP Error Details
- Test the DeepSeek Chat Completion Request
- Use Current DeepSeek Model IDs in Fixtures
- Normalize Responses Before Regression Comparison
- Test DeepSeek Streaming, Usage Events, and [DONE]
- Test the DeepSeek HTTP Error Matrix
- Reject Malformed Success Responses
- Test DeepSeek JSON Output Edge Cases
- Test Timeouts, Cancellation, and Finish Reasons
- Live DeepSeek API Smoke Test: July 28, 2026
- Run Mock Tests in CI Without Secrets
- Python Equivalent with unittest.mock
- Common DeepSeek API Testing Mistakes
- DeepSeek API Testing Checklist
- Frequently Asked Questions
- Testing Methodology and Reproducibility
- Conclusion
- Official Sources
- Related DeepSeek Developer Guides

## 正文
DeepSeek API testing should separate deterministic client checks from live service checks. Use local mocks to prove that your application builds the right request, parses the fields it consumes, handles controlled failures, processes streaming events, and catches regressions. Then use a small, separately gated live smoke test only when you need evidence that a real credential, network path, endpoint, and current model work at a specific moment.

API contract reviewed: July 28, 2026 · Local suite: 29 passed, 0 failed · Live smoke test: 2 requests, both HTTP 200 · Model: deepseek-v4-flash · Temporary key: revoked after testing


> Independent testing disclosure: Chat-Deep.ai is independent from DeepSeek and is not endorsed by DeepSeek. The mock fixtures in this guide are handcrafted from the public API reference; they are not captured production responses. The local suite made no outbound request and used no real credential. A separate bounded live test was performed on July 28, 2026 with a temporary key that was revoked immediately afterward. No key, Authorization header, request ID, private prompt, or raw response was retained in the published evidence.

This guide tests application behavior around GET /models and POST /chat/completions. It does not measure model quality, factual accuracy, production uptime, account balance, provider-wide rate limits, or billing accuracy. For initial account setup, use the DeepSeek API key guide; for the complete endpoint overview, use the DeepSeek API documentation guide.


### How to Test DeepSeek API Calls Safely

Put the network boundary behind an injectable function. Production can use the global fetch; unit tests pass a fake implementation that records the request and returns a controlled Response. A visibly fake string such as unit-test-key verifies header construction without reading DEEPSEEK_API_KEY.

- Request tests assert the host, path, method, headers, model, messages, thinking setting, and optional parameters.

- Response tests parse small JSON fixtures containing only the documented fields the application uses.

- Error tests cover HTTP failures, malformed bodies, empty bodies, and unexpected success shapes.

- Streaming tests feed Server-Sent Events through arbitrary byte boundaries and stop cleanly at [DONE].

- Regression tests compare a normalized, stable application-facing object instead of a volatile raw response.

- Live smoke tests remain outside the default suite and validate current connectivity and schema with a short, low-cost request.


### What Mocks and Live Tests Can Prove


Test layer | What it can prove | What it cannot prove | Default CI?
Unit mock | Request construction, parsing, and application error mapping | Credential validity or hosted availability | Yes
Fixture contract | The documented fields consumed by the application remain explicit and reviewable | That future provider responses will be identical | Yes
Regression | A stable normalized interface did not change unexpectedly | Generated-answer quality | Yes
Live smoke | A real key, network path, endpoint, and selected model worked at the recorded time | General uptime, rate limits, billing, or answer quality | No
Evaluation | Task quality against datasets, rubrics, and reviewers | Deterministic transport behavior | Separate workflow

This boundary matters. A green mock suite does not prove that DeepSeek is reachable, and one successful live request does not prove that your parser handles every error. Model-output quality belongs in a separate DeepSeek evaluation framework.


### Build a Dependency-Free Node.js Test Project

The downloadable project uses Node.js 20 or newer and the built-in test runner. It contains no third-party package and keeps the live script outside test/, so npm test cannot discover it accidentally.


```
deepseek-api-mock-regression-tests/
├── src/
│   ├── deepseek-client.js
│   ├── deepseek-errors.js
│   ├── deepseek-sse.js
│   ├── finish-reason.js
│   └── json-output.js
├── test/
│   ├── fixtures/
│   ├── helpers/
│   ├── deepseek-client.test.js
│   ├── error-matrix.test.js
│   ├── finish-reason.test.js
│   ├── json-output.test.js
│   ├── response-validation.test.js
│   └── timeout-abort.test.js
├── live/smoke.mjs
├── demo/regression-failure.demo.js
└── package.json
```


```
{
  "type": "module",
  "private": true,
  "scripts": {
    "test": "node --test --test-concurrency=1",
    "test:regression-demo":
      "node --test demo/regression-failure.demo.js",
    "smoke:live": "node live/smoke.mjs"
  },
  "engines": {
    "node": ">=20"
  }
}
```


#### Why Run the Mock Files Sequentially?

The suite includes a global network guard that makes any uninjected request fail immediately. Running the files with test concurrency set to one prevents a file that temporarily replaces globalThis.fetch from racing another file. The individual tests are still fast because every response is local.


### Inject fetch and Preserve HTTP Error Details

The client must read the response body once, preserve the HTTP status on non-2xx responses, and distinguish API errors from protocol errors. This prevents a 401, 429, or 503 response from flowing into the success parser and prevents an HTML proxy page from becoming an unhelpful SyntaxError.


```
export class DeepSeekApiError extends Error {
  constructor(message, {
    status = null,
    code = null,
    type = null,
    requestId = null
  } = {}) {
    super(message);
    this.name = "DeepSeekApiError";
    this.status = status;
    this.code = code;
    this.type = type;
    this.requestId = requestId;
  }
}

async function parseResponse(response) {
  const text = await response.text();
  let payload = null;
  let parseError = null;

  if (text.trim()) {
    try {
      payload = JSON.parse(text);
    } catch (error) {
      parseError = error;
    }
  }

  if (!response.ok) {
    const apiError = payload?.error;
    throw new DeepSeekApiError(
      apiError?.message ??
        `DeepSeek request failed with HTTP ${response.status}`,
      {
        status: response.status,
        code: apiError?.code ?? null,
        type: apiError?.type ?? null
      }
    );
  }

  if (!text.trim()) {
    throw new Error("empty_json_response");
  }
  if (parseError) {
    throw new Error("invalid_json_response");
  }
  if (!Array.isArray(payload?.choices)) {
    throw new Error("invalid_response_shape");
  }

  return payload;
}
```

The complete download uses dedicated DeepSeekProtocolError, DeepSeekTimeoutError, and DeepSeekAbortError classes. Provider-specific type and code fields remain optional; the stable transport fact is the HTTP status.


### Test the DeepSeek Chat Completion Request

A fake transport records the call and returns a local response. The test then asserts the exact contract your application owns:


```
test("serializes the expected DeepSeek request", async () => {
  const fetchImpl = createJsonFetch({
    body: completionFixture
  });

  await createChatCompletion({
    apiKey: "unit-test-key",
    messages: [
      {
        role: "user",
        content: "Reply from the fixture."
      }
    ],
    thinking: { type: "disabled" },
    maxTokens: 128,
    fetchImpl
  });

  assert.equal(fetchImpl.calls.length, 1);
  assert.equal(
    fetchImpl.calls[0].url,
    "https://api.deepseek.com/chat/completions"
  );
  assert.equal(fetchImpl.calls[0].init.method, "POST");
  assert.equal(
    fetchImpl.calls[0].init.headers.authorization,
    "Bearer unit-test-key"
  );
});
```

The dummy key is fixture data, not a credential. The default suite never reads an environment secret and never allows network passthrough.


### Use Current DeepSeek Model IDs in Fixtures

On July 28, 2026, the current Create Chat Completion reference listed deepseek-v4-flash and deepseek-v4-pro as accepted model values. A live GET /models request for this update returned both IDs.

DeepSeek announced on April 24, 2026 that deepseek-chat and deepseek-reasoner would be discontinued on July 24, 2026. That date has passed, and the legacy aliases are no longer listed as accepted values in the current reference. New fixtures should use an explicit V4 ID. Existing integrations should follow the dated DeepSeek API updates tracker and migrate rather than rely on undocumented alias behavior.

Thinking mode currently defaults to enabled. A fixture intended to represent non-thinking behavior should set {"thinking":{"type":"disabled"}} explicitly. Preserve reasoning_content separately when testing thinking responses; see the DeepSeek Thinking Mode guide.


### Normalize Responses Before Regression Comparison

Raw responses contain values that should not normally gate a build: IDs, timestamps, backend fingerprints, exact live wording, and often token counts. Map the response to the stable interface your application promises, then compare that object with an approved fixture.


```
export function normalizeCompletionForRegression(payload) {
  return {
    object: payload.object,
    model: payload.model,
    choices: payload.choices.map((choice) => ({
      index: choice.index,
      finish_reason: choice.finish_reason,
      message: {
        role: choice.message?.role ?? null,
        content: choice.message?.content ?? null,
        reasoning_content:
          choice.message?.reasoning_content ?? null,
        tool_calls: choice.message?.tool_calls ?? []
      }
    }))
  };
}
```

The suite also includes an intentionally failing demonstration outside the default test path. It mutates one approved field and produces a readable diff. That proves the guard detects a meaningful change without leaving the everyday suite red.


![DeepSeek API testing suite with 29 passing Node.js tests](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Test DeepSeek Streaming, Usage Events, and [DONE]

DeepSeek documents streaming as data-only SSE terminated by data: [DONE]. With stream_options.include_usage, normal chunks include usage: null, followed by a usage-only chunk whose choices array is empty. A parser must not assume every event contains text or a choice.


```
: keep-alive

data: {"choices":[{"delta":{
data: "content":"Mock stream OK."},
data: "finish_reason":null}],"usage":null}

data: {"choices":[{"delta":{},
data: "finish_reason":"stop"}],"usage":null}

data: {"choices":[],"usage":{
data: "prompt_tokens":10,
data: "completion_tokens":8,
data: "total_tokens":18}}

data: [DONE]
```

- Split UTF-8 bytes at inconvenient boundaries, not just at newlines.

- Ignore comment lines such as : keep-alive and treat blank lines as event delimiters.

- Join multiple data: lines before parsing the event.

- Accumulate reasoning_content and final content separately.

- Accept a final usage event with choices: [].

- Stop on literal [DONE] without sending it to JSON.parse.

Keep operational timeout and keep-alive policy outside the SSE parser. The production behavior is covered in the DeepSeek API keep-alive and timeout guide.


### Test the DeepSeek HTTP Error Matrix

The local suite covers the statuses in DeepSeek’s public Error Codes reference. It also verifies HTML and empty error bodies. The provider type and code values in these unit fixtures are explicitly synthetic; production policy should rely first on the HTTP status.


Status | Fixture purpose | Assertion
400 | Invalid request format | Status and safe parsed details are preserved
401 | Authentication failure | Error remains distinguishable from a protocol parse failure
402 | Insufficient balance | Application receives the original HTTP status
422 | Invalid parameters | Validation policy can classify the response
429 | Rate limit reached | Typed API error preserves status and optional provider fields
500 | Server error | Empty-body fallback remains controlled
503 | Server overloaded | An HTML body does not hide the HTTP status


```
await assert.rejects(
  createChatCompletion({
    apiKey: "unit-test-key",
    messages,
    fetchImpl: createJsonFetch({
      status: 429,
      body: {
        error: {
          message: "Synthetic rate-limit fixture",
          type: "synthetic_rate_limit_error",
          code: "synthetic_rate_limit"
        }
      }
    })
  }),
  (error) => {
    assert.ok(error instanceof DeepSeekApiError);
    assert.equal(error.status, 429);
    assert.equal(error.code, "synthetic_rate_limit");
    return true;
  }
);
```

Use the separate DeepSeek error-code guide for production recovery decisions. Unit tests should verify classification without actually waiting through a retry delay.


### Reject Malformed Success Responses

A 200 status is not sufficient. The expanded suite verifies three different protocol failures:

- An empty 200 body becomes empty_json_response.

- Malformed JSON becomes invalid_json_response.

- Valid JSON without a choices array becomes invalid_response_shape.

This keeps transport failures, provider errors, and success-schema regressions distinguishable in logs and metrics.


### Test DeepSeek JSON Output Edge Cases

DeepSeek documents {"response_format":{"type":"json_object"}} for JSON Output and requires the prompt to instruct the model to produce JSON. The request test checks both requirements. The response tests then cover valid JSON, empty content, malformed JSON, and truncation.


```
await createChatCompletion({
  apiKey: "unit-test-key",
  messages: [
    {
      role: "user",
      content: "Return a JSON object with an ok boolean."
    }
  ],
  responseFormat: { type: "json_object" },
  thinking: { type: "disabled" },
  maxTokens: 64,
  fetchImpl
});
```

Check finish_reason before parsing the model content. A value of length means the JSON may be cut off, even when the response otherwise looks successful. The local parser reports truncated_json_output before attempting JSON.parse.


### Test Timeouts, Cancellation, and Finish Reasons

The fake hanging transport rejects only when its signal is aborted. One test triggers the client’s short local timeout and expects DeepSeekTimeoutError; another aborts a caller-provided controller and expects DeepSeekAbortError. No production network or long sleep is involved.


finish_reason | Application-facing classification used by the sample
stop | completed
length | truncated
content_filter | filtered
tool_calls | requires_tool
insufficient_system_resource | incomplete
Unknown future value | unknown

This table classifies outcomes; it does not claim that every outcome is retryable. Retry policy depends on the application and should be tested separately. See the DeepSeek finish_reason guide for detailed handling.


### Live DeepSeek API Smoke Test: July 28, 2026

For this update, a temporary key was created specifically for a bounded live check. The run made one authenticated model-list request and one minimal Chat Completion request. It used no retry and disabled thinking. The key was revoked immediately after the result was recorded, and its removal from the account was verified.


Tested at | 2026-07-28 21:44:33 UTC
GET /models | HTTP 200 in 310 ms; returned deepseek-v4-flash and deepseek-v4-pro
Selected model | deepseek-v4-flash
POST /chat/completions | HTTP 200 in 311 ms; object chat.completion; one choice
Thinking mode | Disabled explicitly
Finish reason | stop
Exact harmless marker | Matched
Usage | 16 prompt tokens; 4 completion tokens; 20 total tokens
Requests and retries | 2 requests; 0 retries
Credential lifecycle | Temporary key created, used for this run, revoked, and verified absent


![Sanitized DeepSeek API live smoke test result from July 28 2026](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


#### Keep the Live Script Outside the Default Suite


```
const apiKey = process.env.DEEPSEEK_API_KEY;
if (!apiKey) {
  throw new Error("DEEPSEEK_API_KEY is required");
}

const model = process.env.DEEPSEEK_MODEL ??
  "deepseek-v4-flash";

// 1. GET /models and verify that model exists.
// 2. POST one short non-thinking Chat Completion.
// 3. Log only safe schema metadata.
console.log({
  ok: true,
  model,
  finishReason,
  totalTokens
});
```

The download includes live/smoke.mjs and a manual GitHub Actions workflow. Neither runs on push or pull request. A live failure can reflect a revoked secret, network policy, account state, rate limiting, or service availability rather than a client regression.


### Run Mock Tests in CI Without Secrets

The normal workflow needs only the repository and Node.js. It deliberately contains no DeepSeek secret:


```
name: DeepSeek API contract tests

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: npm test
```

Commit fixtures beside the tests. Treat every fixture update as a code change: record the documentation source and review date, explain why the stable contract changed, review the diff, and rerun the deterministic suite.


### Python Equivalent with unittest.mock

Python uses the same architecture: inject the narrow transport your adapter owns rather than patching an entire third-party SDK.


```
from unittest import TestCase
from unittest.mock import Mock

def create_chat_completion(http_post, api_key, messages):
    return http_post(
        "https://api.deepseek.com/chat/completions",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": "deepseek-v4-flash",
            "messages": messages,
            "thinking": {"type": "disabled"},
            "stream": False,
        },
    )

class DeepSeekClientTest(TestCase):
    def test_request_contract(self):
        fixture = {
            "object": "chat.completion",
            "model": "deepseek-v4-flash",
            "choices": [{
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": "The mock path works.",
                },
                "finish_reason": "stop",
            }],
        }

        http_post = Mock(return_value=fixture)
        result = create_chat_completion(
            http_post,
            "unit-test-key",
            [{"role": "user", "content": "Test"}],
        )

        self.assertEqual(
            result["choices"][0]["message"]["content"],
            "The mock path works.",
        )
        http_post.assert_called_once()
```


### Common DeepSeek API Testing Mistakes

- Using a real key in unit tests: this creates leak, cost, and availability risks without improving parser coverage.

- Parsing JSON before checking the HTTP status: a proxy’s HTML error page can hide the original 503.

- Assuming every error has a stable provider code: preserve optional details, but classify primarily by HTTP status.

- Snapshotting the raw response: IDs, timestamps, fingerprints, usage, and generated text create noisy failures.

- Ignoring the usage-only stream chunk: it has choices: [].

- Parsing [DONE] as JSON: it is a terminator, not a completion object.

- Ignoring finish_reason="length" in JSON Output: the model content may be truncated.

- Allowing network passthrough: one missing fake can turn a unit test into an unintended paid request.

- Using retired aliases in new fixtures: use a current explicit V4 model ID and date the fixture.

- Confusing a live success with a quality benchmark: a 200 response proves reachability and schema, not answer accuracy.


### DeepSeek API Testing Checklist

- ☐ The request host, path, method, and headers are asserted.

- ☐ Unit tests use a visibly fake key and never read DEEPSEEK_API_KEY.

- ☐ Fixtures use a currently documented model ID and include a review date.

- ☐ Thinking mode is explicitly enabled or disabled when the fixture depends on it.

- ☐ Non-2xx responses preserve the HTTP status and optional safe provider details.

- ☐ Empty, malformed, and structurally invalid success responses are covered.

- ☐ The documented 400, 401, 402, 422, 429, 500, and 503 statuses are represented.

- ☐ JSON Output tests cover prompt instruction, valid JSON, empty content, invalid JSON, and truncation.

- ☐ Streaming tests cover arbitrary bytes, comments, blank lines, usage-only chunks, and [DONE].

- ☐ Every documented finish_reason has an explicit application classification.

- ☐ Timeout and caller cancellation remain distinguishable.

- ☐ Volatile fields are removed before regression comparison.

- ☐ Unmatched network requests fail immediately.

- ☐ Default CI contains no API secret and makes no live request.

- ☐ A live check is separately gated, low-cost, and validates schema rather than exact prose.

- ☐ Logs and screenshots exclude credentials, headers, request IDs, and sensitive prompts.


### Frequently Asked Questions


#### Can I test DeepSeek API calls without an API key?

Yes. Local mocks can verify request construction, response parsing, streaming, error mapping, timeout behavior, and regression protection with a dummy key. They cannot prove that a real key or the hosted service works.


#### Should I mock the OpenAI SDK or the HTTP boundary?

Mock the smallest interface your application owns. If your code wraps the SDK in an adapter, mock that adapter. If you own a small HTTP client, inject fetch. Avoid relying on undocumented SDK internals. See the OpenAI SDK with DeepSeek guide for live configuration.


#### Should I snapshot an entire DeepSeek response?

No. Normalize it first. Raw IDs, timestamps, fingerprints, exact generated text, and token counts are usually volatile. Keep only the fields your application promises and consumes.


#### Can mocks verify rate limits or service availability?

Mocks can prove how your code reacts to a chosen 429 or 503 response. They cannot prove live thresholds, concurrency behavior, availability, or recovery time. Those require carefully separated monitoring and live checks.


#### Which DeepSeek model ID should fixtures use?

Use the current explicit model targeted by production and record the review date. On July 28, 2026, the official Chat Completion reference and our live model-list request included deepseek-v4-flash and deepseek-v4-pro. Recheck the official model list and change log when maintaining the fixture.


#### Why not run the live smoke test on every pull request?

It requires a secret, can incur charges, and can fail because of account or service conditions unrelated to the code change. Keep deterministic mocks in the required PR gate and run the live check manually or on a controlled schedule.


### Testing Methodology and Reproducibility


API contract review | July 28, 2026, using DeepSeek Quick Start, Chat Completion, Model List, JSON Output, Error Codes, Rate Limit, Thinking Mode, and the V4 retirement notice
Local environment | Node.js built-in test runner; project requires Node.js 20 or newer; no third-party package
Default command | npm test
Default result | 29 passed; 0 failed; 0 skipped
Mock-suite duration | 1.209 seconds in the recorded workspace run
Mock-suite network activity | 0 live requests; unmatched fetch calls fail immediately
Intentional regression demo | 1 test failed as designed and remained outside the default suite
Live check | 2 DeepSeek requests; both HTTP 200; 0 retries
Live model and mode | deepseek-v4-flash; thinking disabled; max_tokens 16
Secret handling | Temporary key; not logged or published; revoked and verified absent after the run
Published evidence | Sanitized result captures, not screenshots of credentials or raw private response data

The 29 local tests cover request serialization, successful parsing, a seven-status HTTP error matrix, non-JSON and empty error bodies, malformed success JSON, invalid success shape, JSON Output serialization and parser edge cases, arbitrary-byte SSE, keep-alive comments, usage-only events, [DONE], timeout, caller abort, every currently documented finish reason, normalized regression comparison, and an accidental-network guard.


### Conclusion

Reliable DeepSeek API testing requires separate evidence for separate questions. Mocks prove deterministic application behavior. A bounded live smoke test proves that a credential, network route, current endpoint, and selected model worked at one recorded moment. Evaluation measures answer quality with datasets and rubrics.

Keep the HTTP boundary injectable, preserve status details before parsing success data, test malformed and empty bodies, use current dated model fixtures, handle streaming and every finish reason explicitly, normalize volatile fields, and block unmatched network access. Keep live credentials out of the default CI path and revoke temporary keys after one-off verification.


### Official Sources

- DeepSeek API Quick Start

- DeepSeek Create Chat Completion

- DeepSeek List Models

- DeepSeek JSON Output

- DeepSeek Error Codes

- DeepSeek Rate Limit and Isolation

- DeepSeek Thinking Mode

- DeepSeek V4 Preview release and legacy-alias retirement notice

- Node.js Test Runner


### Related DeepSeek Developer Guides

- DeepSeek API guide

- Create and test a DeepSeek API key

- Use the OpenAI SDK with DeepSeek

- DeepSeek error codes

- DeepSeek keep-alive and timeouts

- DeepSeek evaluation framework

- DeepSeek API updates tracker

## 内部链接
- [DeepSeek API key guide](https://chat-deep.ai/docs/deepseek-api-key/)
- [DeepSeek API documentation guide](https://chat-deep.ai/docs/api/)
- [Download the tested Node.js project](https://chat-deep.ai/wp-content/uploads/2026/07/deepseek-api-mock-regression-tests-v2.zip)
- [DeepSeek evaluation framework](https://chat-deep.ai/docs/deepseek-evaluation-framework/)
- [dated DeepSeek API updates tracker](https://chat-deep.ai/docs/deepseek-api-updates/)
- [DeepSeek Thinking Mode guide](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [DeepSeek API keep-alive and timeout guide](https://chat-deep.ai/docs/deepseek-api-keep-alive-timeouts/)
- [DeepSeek error-code guide](https://chat-deep.ai/docs/deepseek-error-codes/)
- [DeepSeek finish_reason guide](https://chat-deep.ai/docs/deepseek-finish-reason/)
- [OpenAI SDK with DeepSeek guide](https://chat-deep.ai/docs/openai-sdk-to-deepseek/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [Create and test a DeepSeek API key](https://chat-deep.ai/docs/deepseek-api-key/)
- [Use the OpenAI SDK with DeepSeek](https://chat-deep.ai/docs/openai-sdk-to-deepseek/)
- [DeepSeek error codes](https://chat-deep.ai/docs/deepseek-error-codes/)
- [DeepSeek keep-alive and timeouts](https://chat-deep.ai/docs/deepseek-api-keep-alive-timeouts/)
- [DeepSeek evaluation framework](https://chat-deep.ai/docs/deepseek-evaluation-framework/)
- [DeepSeek API updates tracker](https://chat-deep.ai/docs/deepseek-api-updates/)

## 外部链接
- [Create Chat Completion reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [Error Codes reference](https://api-docs.deepseek.com/quick_start/error_codes/)
- [DeepSeek API Quick Start](https://api-docs.deepseek.com/)
- [DeepSeek Create Chat Completion](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek List Models](https://api-docs.deepseek.com/api/list-models/)
- [DeepSeek JSON Output](https://api-docs.deepseek.com/guides/json_mode/)
- [DeepSeek Error Codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [DeepSeek Rate Limit and Isolation](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [DeepSeek Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode/)
- [DeepSeek V4 Preview release and legacy-alias retirement notice](https://api-docs.deepseek.com/news/news260424/)
- [Node.js Test Runner](https://nodejs.org/api/test.html)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Ftesting-deepseek-api%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Ftesting-deepseek-api%2F&text=DeepSeek%20API%20Testing%3A%20Mocks%2C%20Regression%20Tests%2C%20and%20a%20Live%20Smoke%20Test)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Ftesting-deepseek-api%2F&title=DeepSeek%20API%20Testing%3A%20Mocks%2C%20Regression%20Tests%2C%20and%20a%20Live%20Smoke%20Test)
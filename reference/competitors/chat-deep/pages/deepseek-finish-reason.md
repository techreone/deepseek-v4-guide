# DeepSeek finish_reason: Values, Meanings, and Fixes

- **URL**: https://chat-deep.ai/docs/deepseek-finish-reason/
- **Published**: 2026-07-23T11:06:47+00:00
- **Modified**: 2026-07-23T11:06:49+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 3104
- **Code blocks**: 4
- **Description**: Understand every DeepSeek finish_reason value—stop, length, tool_calls, content_filter, and insufficient_system_resource—with safe fixes and code examples.

## H1


## H2 目录
- Quick answer: how should each finish reason be handled?
- Contents
- The five documented DeepSeek finish_reason values
- Where finish_reason appears in the response
- Do not confuse a finish reason with an HTTP or transport error
- Use an explicit response decision matrix
- Handling finish_reason: stop
- Diagnosing finish_reason: length
- Reject truncated JSON, code, and tool arguments
- Handling finish_reason: tool_calls
- Handling finish_reason: content_filter
- Handling finish_reason: insufficient_system_resource
- How finish_reason works in streaming responses
- Node.js: route all five outcomes
- Python: equivalent fail-closed routing
- Log finish reasons without leaking prompts
- Endpoint and provider differences
- Troubleshooting checklist
- Frequently asked questions
- Final implementation rule
- Official sources

## 正文
DeepSeek finish_reason tells an application why a Chat Completions response stopped and what it should do next. The official OpenAI-compatible API documents five terminal values: stop, length, content_filter, tool_calls, and insufficient_system_resource.

Last verified: July 23, 2026. Scope: the first-party hosted DeepSeek /chat/completions endpoint with deepseek-v4-flash or deepseek-v4-pro. Chat-Deep.ai is independent and is not affiliated with DeepSeek. The Node.js and Python examples were syntax-checked and tested with offline fixtures; no live API request was sent because no test key was supplied.


### Quick answer: how should each finish reason be handled?


Value | Meaning | Safe application action
stop | Natural completion or a supplied stop sequence was reached | Validate the content, then accept it
length | The generation or context boundary was reached | Reject as incomplete and replan input or output
tool_calls | The model requested one or more functions | Validate, execute authorized tools, append results, and continue
content_filter | Output was omitted after a content-filter flag | Fail closed and avoid an unchanged automatic retry
insufficient_system_resource | Inference resources interrupted generation | Discard partial output and use a bounded retry

In a stream, null means generation is still in progress. It is not a sixth value. The SSE marker data: [DONE] ends the stream but is not a finish reason.


### Contents

- The five documented values

- Where finish_reason appears

- Completion reasons versus API and transport errors

- Decision matrix

- Handling stop

- Diagnosing length

- Truncated JSON, code, and tool arguments

- Handling tool_calls

- Handling content_filter

- Handling insufficient_system_resource

- Streaming rules

- Node.js response router

- Python response router

- Logging and tests

- FIM, Anthropic, and third-party scope

- Troubleshooting checklist

- Frequently asked questions

- Official sources


### The five documented DeepSeek finish_reason values

DeepSeek’s official Create Chat Completion schema defines the value on every choice. The same five strings are documented for non-streaming and streaming Chat Completions.


finish_reason | Official meaning | Is the answer complete? | Retry unchanged?
stop | The model reached a natural stopping point or encountered a configured stop sequence | Possibly; validate the application contract | No
length | The response reached an output allowance or the conversation reached the context boundary | No | No; change the plan first
content_filter | Output was omitted because content filters flagged it | No | No blind retry
tool_calls | The model produced one or more function calls | No final answer yet | Continue the tool workflow
insufficient_system_resource | Generation was interrupted because inference resources were insufficient | No | Yes, when bounded and idempotent


![DeepSeek Chat Completions schema showing five finish_reason values and their meanings](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Do not add values from another provider without checking the interface in use. Terms such as timeout, cancelled, rate_limit, server_error, and HTTP status numbers are not documented DeepSeek Chat Completions finish reasons.


### Where finish_reason appears in the response

For a non-streaming HTTP 200 response, read choices[0].finish_reason. The message, any tool calls, and the termination reason belong to the same choice:


```
{
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "The completed answer."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 120,
    "completion_tokens": 48,
    "total_tokens": 168
  }
}
```

Check that choices[0] exists before reading it, even when the status is 200. A malformed or unexpected envelope should fail safely rather than defaulting to stop. If DeepSeek adds an unfamiliar value after this verification date, log it as unsupported and keep the output out of automated downstream actions until the handler is reviewed.


### Do not confuse a finish reason with an HTTP or transport error

A robust integration separates three termination layers:

- HTTP or SDK failure: the request may return 400, 401, 402, 422, 429, 500, or 503 instead of a completion envelope.

- Transport failure: a timeout, disconnect, aborted request, malformed SSE event, or missing terminal chunk leaves the outcome incomplete.

- Completion outcome: a successfully parsed response includes one of the documented terminal values.

For example, insufficient_system_resource can appear inside a documented 200 response. HTTP 503 is separately documented as “Server Overloaded.” Both may justify a delayed retry, but they are different signals and should be logged separately. The dedicated DeepSeek API error-code guide owns status-code diagnosis; this guide handles the choice-level result.

A stream that closes before a non-null terminal reason has no authoritative finish reason. Do not invent length or insufficient_system_resource based only on a disconnect.


### Use an explicit response decision matrix


Signal | Display partial content? | Execute tools? | Recommended next step
stop | After validation | Only if the application separately expects an authorized action | Accept or reject against the required format
length | Only as an explicitly labeled draft | No | Reduce input, increase a safe cap, split work, or regenerate
tool_calls | Do not treat content as the final answer | Yes, after allowlist and argument validation | Append tool results and make another model request
content_filter | No | No | Return a neutral application message
insufficient_system_resource | No | No | Retry the model request with a cap and backoff
Unknown or missing | No | No | Log an integration error and fail closed


### Handling finish_reason: stop

stop is the normal terminal result, but it combines two causes: the model ended naturally, or it encountered one of the stop sequences supplied in the request. DeepSeek does not document a separate field that identifies which sequence matched.

If output ends earlier than expected despite stop, inspect the request’s stop parameter first. A delimiter used inside code, JSON, Markdown, or user data can terminate generation sooner than intended. Remove an unnecessary sequence or choose a delimiter that cannot appear in ordinary output.

Normal termination still requires application validation. Check that required text exists, JSON parses, expected keys are present, citations have the requested shape, and code passes its parser or tests. DeepSeek’s JSON Output guide notes that empty content can occasionally occur, so stop alone is not proof of a useful payload.


### Diagnosing finish_reason: length

length means the returned message may be cut off. DeepSeek’s request schema defines max_tokens as the maximum generated-token allowance and says input plus generated tokens must fit within the model context. The JSON warning explicitly states that length can reflect either the request cap or the context boundary.


#### Determine which boundary was binding

- Compare usage.completion_tokens with the max_tokens sent by the application.

- Inspect usage.prompt_tokens and the model’s context capacity before raising the output cap.

- When thinking is enabled, inspect completion_tokens_details.reasoning_tokens. Reasoning is part of completion usage, not an extra allowance.

- Check whether chat history, retrieved documents, tool schemas, or tool results enlarged the prompt.

If completion usage reached the application cap and enough context remains, a larger max_tokens may help. If the prompt consumed the remaining context, increasing max_tokens cannot create space. Trim history, retrieve fewer passages, summarize tool output, or split the task.

The DeepSeek token-usage fields guide explains prompt, completion, reasoning, cache-hit, and cache-miss accounting. Do not double-count reasoning_tokens; it is a detail inside completion_tokens.


### Reject truncated JSON, code, and tool arguments

Never parse a length response as a complete structured record. A closing brace can be missing, an array may end midway, or the text can be syntactically valid while omitting required fields. Concatenating a second independent JSON generation is also unsafe because the model may restart, rename keys, or change earlier values.

- JSON: regenerate the complete object with more room, less input, or a smaller schema; then parse and validate it.

- Tool arguments: do not execute them when the response ended with length.

- Code: request a complete bounded unit or use an explicit continuation workflow with overlap detection, syntax checks, and tests.

- Plain text: a continuation request can be an application strategy, but label it as a new request and deduplicate overlapping text.


![DeepSeek JSON Output notice about max_tokens truncation and empty content](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

When JSON Output is enabled, the prompt must also instruct the model to produce JSON. The Chat Completions reference warns that omitting that instruction can lead to whitespace generation until the token limit, making a request appear stuck. See the dedicated DeepSeek JSON Output guide for schema validation and retry design.


### Handling finish_reason: tool_calls

tool_calls is a control-flow handoff, not a failed answer and not evidence that DeepSeek executed a function. Read message.tool_calls, validate every item, run only functions that the application explicitly allows, append the assistant message and matching tool results, and ask the model to continue.

- Require a non-empty message.tool_calls array.

- Reject duplicate call IDs and unsupported tool types.

- Match the function name against an allowlist.

- Parse the arguments string as JSON and validate it against the function’s schema.

- Apply authorization, input limits, timeouts, and side-effect controls before execution.

- Append the complete assistant tool-call message.

- Append one role: "tool" result with the matching tool_call_id for each executed call.

- Repeat with a hard round limit until a final terminal result is returned.

DeepSeek’s official Tool Calls guide warns that generated arguments may contain invalid JSON or hallucinated parameters. Never invoke a function by directly spreading unvalidated model output into application code.

In thinking-mode tool chains, DeepSeek’s official Thinking Mode guide requires the assistant’s full reasoning_content to be passed back in subsequent requests. Omitting it can produce HTTP 400. Preserve the complete assistant message in history even if the application does not display reasoning. A tool-call message may contain ordinary content as well as calls, so route by finish_reason and tool_calls, not by whether content is empty. The DeepSeek Tool Calls guide covers function definitions and strict validation, while the Thinking Mode guide covers reasoning history.


### Handling finish_reason: content_filter

DeepSeek defines content_filter as output omitted after a flag from its content filters. The response schema does not document a filter category, severity, triggering fragment, or guaranteed partial-content shape. Do not invent those details or state that the user’s prompt was definitively the cause.

Fail closed: do not display or act on partial output, do not execute a tool, and do not automatically resend the identical request. Return a neutral message that the response could not be completed and allow a legitimate user to revise the task. Store only the operational metadata needed for diagnosis; avoid copying sensitive prompts into logs.


### Handling finish_reason: insufficient_system_resource

This value means inference-system resources interrupted generation. Treat any accompanying content as incomplete. DeepSeek does not document a resume token, so retrying means sending the whole model request again.

- Discard partial text and structured output.

- Retry only before performing external side effects.

- Use a small attempt cap, exponential delay, and jitter to avoid synchronized retry bursts.

- Log the response ID, model, system_fingerprint, usage, finish reason, and attempt count without sensitive prompt content.

- Return a temporary service failure after the retry budget is exhausted.

A three-attempt cap and jittered delay are application guardrails, not DeepSeek service requirements. DeepSeek’s Error Codes reference separately documents HTTP 429, 500, and 503; these may use a similar retry wrapper, but keep HTTP status and completion reason as separate dimensions in metrics.


### How finish_reason works in streaming responses

Streaming uses data-only server-sent events. Intermediate chunks usually carry finish_reason: null while delta.content or delta.reasoning_content arrives. A terminal choice chunk supplies a non-null value, and data: [DONE] closes the stream.


![DeepSeek streaming response schema showing finish_reason as nullable until termination](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

When stream_options.include_usage is enabled, DeepSeek sends an extra usage chunk before [DONE]. Its choices array is empty. A handler that always reads choices[0] will fail on that valid chunk.


```
let terminalReason = null;
let content = "";
let reasoning = "";
let usage = null;

for (const chunk of decodedSseEvents) {
  if (chunk.usage) usage = chunk.usage;

  const choice = chunk.choices?.[0];
  if (!choice) continue; // Valid usage-only chunk.

  content += choice.delta?.content ?? "";
  reasoning += choice.delta?.reasoning_content ?? "";

  if (choice.finish_reason != null) {
    terminalReason = choice.finish_reason;
  }
}

if (terminalReason == null) {
  throw new Error("Stream ended without a terminal finish_reason");
}
```

Do not publish buffered output if the connection closes, times out, or reaches [DONE] without a recognized terminal reason. The full package includes raw SSE parsers that skip the usage-only event and require both a terminal reason and the end marker. Transport settings for long generations are covered in the DeepSeek keep-alive and timeout guide.


### Node.js: route all five outcomes

This compact router is designed for a parsed non-streaming response. Validate any returned JSON against the application schema after parsing.


```
const KNOWN = new Set([
  "stop",
  "length",
  "content_filter",
  "tool_calls",
  "insufficient_system_resource",
]);

export function routeCompletion(response, { expectJson = false } = {}) {
  const choice = response?.choices?.[0];
  if (!choice || !KNOWN.has(choice.finish_reason)) {
    throw new Error("Missing or unknown finish_reason");
  }

  const reason = choice.finish_reason;
  const message = choice.message ?? {};

  switch (reason) {
    case "stop": {
      const content = message.content ?? "";
      if (expectJson && content.trim() === "") {
        throw new Error("Empty JSON Output response");
      }
      return {
        kind: "complete",
        content,
        value: expectJson ? JSON.parse(content) : null,
        usage: response.usage ?? null,
      };
    }

    case "length":
      return {
        kind: "truncated",
        partialContent: message.content ?? "",
        usage: response.usage ?? null,
      };

    case "tool_calls":
      if (!Array.isArray(message.tool_calls) ||
          message.tool_calls.length === 0) {
        throw new Error("tool_calls reason without tool calls");
      }
      return {
        kind: "tool_calls",
        assistantMessage: message,
        toolCalls: message.tool_calls,
      };

    case "content_filter":
      throw new Error("Output omitted by content filtering");

    case "insufficient_system_resource":
      return { kind: "retryable", discardPartialOutput: true };
  }
}
```

The downloadable Node.js reference adds HTTP classification, bounded retries, an allowlisted tool loop, usage checks, JSON validation, raw SSE decoding, fixture tests, and an opt-in live mode. It sends nothing unless --live is supplied and DEEPSEEK_API_KEY exists.


### Python: equivalent fail-closed routing


```
import json

KNOWN = {
    "stop",
    "length",
    "content_filter",
    "tool_calls",
    "insufficient_system_resource",
}

def route_completion(response, expect_json=False):
    choices = response.get("choices")
    if not isinstance(choices, list) or not choices:
        raise RuntimeError("Missing choices[0]")

    choice = choices[0]
    reason = choice.get("finish_reason")
    if reason not in KNOWN:
        raise RuntimeError(f"Unknown finish_reason: {reason!r}")

    message = choice.get("message") or {}

    if reason == "stop":
        content = message.get("content") or ""
        if expect_json and not content.strip():
            raise RuntimeError("Empty JSON Output response")
        return {
            "kind": "complete",
            "content": content,
            "value": json.loads(content) if expect_json else None,
            "usage": response.get("usage"),
        }

    if reason == "length":
        return {
            "kind": "truncated",
            "partial_content": message.get("content") or "",
            "usage": response.get("usage"),
        }

    if reason == "tool_calls":
        calls = message.get("tool_calls")
        if not isinstance(calls, list) or not calls:
            raise RuntimeError("tool_calls reason without tool calls")
        return {
            "kind": "tool_calls",
            "assistant_message": message,
            "tool_calls": calls,
        }

    if reason == "content_filter":
        raise RuntimeError("Output omitted by content filtering")

    return {"kind": "retryable", "discard_partial_output": True}
```

The full Python reference mirrors the Node.js behavior using only the standard library. Both files include offline fixtures for every documented value and use non-streaming responses for tool execution so the documented message.tool_calls payload can be validated before a function runs.


### Log finish reasons without leaking prompts

Record structured operational fields rather than raw user content:

- Request or response ID, model ID, and system_fingerprint.

- HTTP status or transport-error class.

- Terminal finish reason and retry attempt.

- prompt_tokens, completion_tokens, total_tokens, cache hit/miss, and reasoning-token detail.

- Latency, streaming versus non-streaming, and whether JSON or tools were requested.

- Validation result without storing sensitive generated content.

Alert on shifts in length, filtering, resource interruption, unknown values, streams without terminal reasons, and tool-loop round limits. The DeepSeek observability guide covers dashboards and privacy-aware logging in more depth.


#### Minimum offline test fixtures

- One valid response for each of the five strings.

- A stop response with empty content and JSON expected.

- A length response containing apparently valid but incomplete JSON.

- A tool call with malformed JSON, an unknown function, and a duplicate call ID.

- Several streaming chunks with null, one terminal chunk, an empty-choice usage chunk, and [DONE].

- A stream ending before its terminal chunk.

- A missing value and an invented future value.

- HTTP 400 versus retryable 429, 500, and 503 fixtures.


### Endpoint and provider differences

The five-value table applies to the official DeepSeek OpenAI-compatible Chat Completions endpoint. It should not be copied unchanged to every interface.

- FIM Completion: the separate beta /completions schema documents stop, length, content_filter, and insufficient_system_resource. It does not list tool_calls.

- Anthropic format: the response convention differs from choices[].finish_reason. Use the DeepSeek Anthropic compatibility mapping instead of assuming a one-to-one field translation.

- Third-party and self-hosted runtimes: gateways, cloud marketplaces, vLLM, Ollama, and other OpenAI-compatible layers can expose different strings or stream shapes. Test the exact provider.

Use Create Chat Completion for the wider request and response schema, while keeping termination routing isolated in one application module. That separation makes a provider-specific adapter easier to test.


### Troubleshooting checklist

- Confirm the response is from the official /chat/completions interface covered here.

- Separate HTTP status, transport state, and completion reason.

- Require a recognized non-null terminal value before accepting output.

- If the value is stop, validate content and inspect custom stop sequences when the answer is unexpectedly short.

- If it is length, compare request cap, prompt usage, completion usage, context space, and reasoning usage.

- If it is tool_calls, validate the call before execution and preserve the full assistant message in the tool loop.

- If it is content_filter, discard partial output and avoid an unchanged automatic retry.

- If resources were insufficient, retry only the whole idempotent model request with a hard cap.

- For streams, skip empty-choice usage events and require the terminal reason plus [DONE].

- Log unknown or inconsistent envelopes and fail closed.


### Frequently asked questions


#### Is null a DeepSeek finish_reason value?

No. Streaming chunks make the field nullable while generation is in progress. The application should wait for the terminal non-null value.


#### Does stop guarantee complete JSON?

No. It indicates normal model termination, but the application must still require non-empty content, parse the JSON, and validate its schema.


#### Should length be retried with the same request?

Not blindly. Determine whether the requested generation cap or remaining context was binding, then change the budget, input, or task shape.


#### Is insufficient_system_resource the same as HTTP 503?

No. One is a choice-level completion result and the other is an HTTP error. Track them separately even if both use a bounded retry policy.


#### Does tool_calls mean DeepSeek executed my function?

No. The model generated a requested function name and argument string. Your application validates, authorizes, executes, and returns the result.


### Final implementation rule

Route on the terminal reason, but never let the string replace application validation. Accept stop only after checking the required contract; reject length and filtering as incomplete; treat tool_calls as an intermediate workflow state; and retry resource interruption only within a bounded, side-effect-safe policy.

For streaming, wait for a recognized terminal reason and the end marker, while allowing the documented empty-choice usage event. This approach keeps incomplete text, malformed JSON, unvalidated tools, and transport failures out of production workflows.


### Official sources

- DeepSeek Create Chat Completion reference

- DeepSeek Tool Calls

- DeepSeek Thinking Mode

- DeepSeek JSON Output

- DeepSeek Error Codes

- DeepSeek FIM Completion response schema

## 内部链接
- [DeepSeek API error-code guide](https://chat-deep.ai/docs/deepseek-error-codes/)
- [DeepSeek token-usage fields](https://chat-deep.ai/docs/deepseek-token-usage-fields/)
- [DeepSeek JSON Output guide](https://chat-deep.ai/docs/json-output/)
- [DeepSeek Tool Calls guide](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [Thinking Mode guide](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [DeepSeek keep-alive and timeout guide](https://chat-deep.ai/docs/deepseek-api-keep-alive-timeouts/)
- [DeepSeek observability guide](https://chat-deep.ai/docs/deepseek-observability/)
- [DeepSeek Anthropic compatibility mapping](https://chat-deep.ai/docs/deepseek-anthropic-api-compatibility/)
- [Create Chat Completion](https://chat-deep.ai/guide/create-chat-completion/)

## 外部链接
- [Create Chat Completion schema](https://api-docs.deepseek.com/api/create-chat-completion/)
- [Tool Calls guide](https://api-docs.deepseek.com/guides/tool_calls/)
- [Thinking Mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [Error Codes reference](https://api-docs.deepseek.com/quick_start/error_codes/)
- [DeepSeek Create Chat Completion reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek Tool Calls](https://api-docs.deepseek.com/guides/tool_calls/)
- [DeepSeek Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode/)
- [DeepSeek JSON Output](https://api-docs.deepseek.com/guides/json_mode/)
- [DeepSeek Error Codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [DeepSeek FIM Completion response schema](https://api-docs.deepseek.com/api/create-completion)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-finish-reason%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-finish-reason%2F&text=DeepSeek%20finish_reason%20Values%20and%20Troubleshooting)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-finish-reason%2F&title=DeepSeek%20finish_reason%20Values%20and%20Troubleshooting)
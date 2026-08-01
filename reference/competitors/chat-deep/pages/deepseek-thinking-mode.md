# DeepSeek Thinking Mode: Live API Tests & reasoning_content

- **URL**: https://chat-deep.ai/docs/deepseek-thinking-mode/
- **Published**: 2026-04-04T04:04:37+00:00
- **Modified**: 2026-07-27T07:39:57+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 3039
- **Code blocks**: 7
- **Description**: Run DeepSeek Thinking Mode with V4 Flash or Pro. See live tests for reasoning_content, effort, streaming, tool calls, JSON output, tokens, and cost.

## H1


## H2 目录
- DeepSeek Thinking Mode: quick results
- How to enable or disable thinking
- Understanding reasoning_content and the response shape
- Reasoning effort and the output-token budget
- Ordinary multi-turn history: omit old reasoning
- Tool calls: replay the complete assistant message
- Streaming reasoning_content safely
- JSON Output with Thinking Mode
- Thinking Mode token cost
- Recommended production defaults
- Current models and legacy aliases
- Troubleshooting checklist
- How the tests can be reproduced
- Frequently asked questions

## 正文
DeepSeek Thinking Mode is enabled by default on both deepseek-v4-flash and deepseek-v4-pro. You can control it with {"thinking":{"type":"enabled"}} or {"thinking":{"type":"disabled"}}. When thinking is enabled, the API returns private reasoning in reasoning_content and the user-facing answer in content. The most important production detail is that reasoning tokens count inside the completion-token budget and cost, so a request can return HTTP 200 yet finish with no final answer if max_tokens is too small.

This guide combines the official DeepSeek Thinking Mode contract with original API controls run on July 27, 2026 UTC. The tests used synthetic English prompts, the official Chat Completions endpoint, and the two IDs returned by the live models endpoint. Raw reasoning, credentials, balances, private account data, and request identifiers were never saved.

Chat-Deep.ai is an independent technical publication and is not affiliated with or endorsed by DeepSeek. Before running the examples, use our DeepSeek API key setup guide to keep credentials out of source code, then verify the endpoint and request format in the DeepSeek API guide.


### DeepSeek Thinking Mode: quick results


Question | Official contract | July 27 live observation
Is thinking on by default? | Yes | Omitting the toggle returned reasoning_content on Flash and Pro
Can it be disabled? | Yes | Explicitly disabled requests returned valid answers with no reasoning field on both models
Where is reasoning returned? | message.reasoning_content | Present beside message.content, not inside it
Does reasoning use max_tokens? | Generated tokens share the output allowance | Two 512-token probes exhausted the allowance before a final answer
Should ordinary prior reasoning be replayed? | No; it is ignored when no tool call occurred | Replay, omission, and a long sentinel all produced 40 prompt tokens
Must tool-call reasoning be replayed? | Yes; the guide warns of HTTP 400 if omitted | Our bounded omission controls returned 200, so production code still follows the stricter contract
Does streaming separate reasoning and answer text? | Yes | Reasoning began at event 1; final content began at event 24 in one stream
Can JSON Output be empty? | The docs warn that JSON Output can occasionally return empty content and require a JSON instruction | A minimal prompt that requested JSON still returned 200 with empty content; a stronger system instruction fixed it


### How to enable or disable thinking

The current Chat Completions reference documents thinking.type as either enabled or disabled, with enabled as the default. Explicit configuration is safer than relying on a default that a dependency or model profile could obscure.


```
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Return only the final integer: 17 * 19"}],
    reasoning_effort="high",
    max_tokens=1024,
    extra_body={"thinking": {"type": "enabled"}},
)

message = response.choices[0].message
print(message.content)  # user-facing answer
# Do not log message.reasoning_content in production.
```

With the OpenAI Python client, the toggle belongs in extra_body; reasoning_effort remains a top-level argument. To turn thinking off, change the type to disabled. See our OpenAI SDK with DeepSeek guide and DeepSeek Python guide for client setup and environment-variable handling.


![Live DeepSeek Thinking Mode toggle matrix for V4 Flash and V4 Pro](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

For Flash, the omitted, enabled, and disabled calls used 85, 91, and zero reasoning tokens. For Pro, they used 157, 105, and zero. The differences between omitted and explicitly enabled runs are normal nondeterministic variation; they do not show that omission selects a different effort level. The reliable result is the response shape: the default behaved like enabled, and disabled removed reasoning on both current models.


### Understanding reasoning_content and the response shape

In a non-streaming response, reasoning_content is a sibling of content. Treat the former as sensitive intermediate model output and the latter as the answer intended for your application. A sanitized response has this shape:


```
{
  "choices": [{
    "finish_reason": "stop",
    "message": {
      "role": "assistant",
      "reasoning_content": "[present but deliberately not logged]",
      "content": "{\"answer\":323}"
    }
  }],
  "usage": {
    "prompt_tokens": 58,
    "completion_tokens": 92,
    "completion_tokens_details": {
      "reasoning_tokens": 85
    }
  }
}
```

Do not parse the final answer from the reasoning field. Validate content, check finish_reason, and read usage.completion_tokens_details.reasoning_tokens when it is returned. If you log full API bodies by default, add a redaction rule before deploying Thinking Mode. Our DeepSeek observability guide covers safer field-level telemetry.


### Reasoning effort and the output-token budget

DeepSeek documents two native effort choices: high and max. The default is high for regular requests, while some complex agent integrations may select max automatically. Compatibility values are mapped rather than treated as separate native levels: low and medium map to high, and xhigh maps to max.

The key operational risk is budget exhaustion. In our five-value Flash probe at max_tokens: 512, low used 512 reasoning tokens and returned empty final content with finish_reason: "length". Max used 511 reasoning tokens and also ended at length with empty content. Xhigh reached the same 512-token completion ceiling but produced some final content. Medium and high stopped normally in this particular run. These results do not establish a quality ranking; they demonstrate that HTTP 200 alone is not a success criterion.


![DeepSeek high versus max reasoning effort and output token budget live test](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

We repeated the same scheduling puzzle with a 1,024-token allowance so both high and max could finish. High used 376 reasoning tokens and 386 total completion tokens; max used 802 reasoning tokens and 811 completion tokens. Client-side elapsed time was 3,998 ms and 6,998 ms, respectively. Because this was one request per setting from one network location, use the numbers to understand the budget trade-off, not to predict latency.

- Set a realistic max_tokens allowance for reasoning plus the final response.

- Reject or retry finish_reason: "length" when complete output is required.

- Validate that content is non-empty before parsing it.

- Measure reasoning-token percentiles on your own workload before choosing high or max.

- Bound retries so an empty answer cannot create an uncontrolled cost loop.

DeepSeek also states that temperature, top_p, presence_penalty, and frequency_penalty have no effect in thinking mode. They may be accepted for compatibility without changing generation. Remove them from a thinking-specific configuration rather than assuming they tune reasoning.


### Ordinary multi-turn history: omit old reasoning

When an assistant turn did not call a tool, DeepSeek says its prior reasoning_content does not need to be sent in the next conversation request and will be ignored if supplied. Retain the assistant’s final content, because that is part of the visible conversation, but you can omit its private reasoning.

Our control began with a synthetic code and then asked the model to recall it. The continuation was sent three ways: with the actual prior reasoning, without reasoning, and with a deliberately long synthetic sentinel in its place. All three returned HTTP 200, recalled the correct code, and reported exactly 40 prompt tokens. The unchanged token count is bounded evidence that ordinary prior reasoning was ignored, matching the documented rule.


```
messages = [
    {"role": "user", "content": first_question},
    {
        "role": "assistant",
        # Keep the visible answer; omit prior reasoning when no tool call occurred.
        "content": first_response.choices[0].message.content or "",
    },
    {"role": "user", "content": follow_up},
]
```


### Tool calls: replay the complete assistant message

Tool-call history has a stricter rule. DeepSeek’s Thinking Mode guide says that when the model performs a tool call, the intermediate assistant message’s reasoning_content must be fully passed back in subsequent requests. The documented production shape preserves content, reasoning_content, and tool_calls, followed by each matching tool result.


```
import json

first = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=messages,
    tools=tools,
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}},
)

m = first.choices[0].message
assistant_tool_message = {
    "role": "assistant",
    "content": m.content or "",
    "reasoning_content": m.reasoning_content or "",
    "tool_calls": [
        {
            "id": call.id,
            "type": "function",
            "function": {
                "name": call.function.name,
                "arguments": call.function.arguments,
            },
        }
        for call in (m.tool_calls or [])
    ],
}
messages.append(assistant_tool_message)

for call in m.tool_calls or []:
    arguments = json.loads(call.function.arguments)
    result = run_validated_tool(call.function.name, arguments)
    messages.append({
        "role": "tool",
        "tool_call_id": call.id,
        "content": json.dumps(result),
    })

final = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=messages,
    tools=tools,
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}},
)
```

Validate function names and JSON arguments before executing anything, enforce an allow-list, and apply timeouts to the real tool. For a broader implementation, see our DeepSeek tool-calling guide.


#### A live compatibility gap, not a new contract

The official guide explicitly warns that omitting tool-call reasoning produces HTTP 400. Our July 27 negative controls did not reproduce that error: both Flash and Pro accepted continuations with or without prior reasoning_content, and all bounded branches returned the correct synthetic inventory value. Additional Flash controls accepted a missing content field and a null value. Explicit tool_choice: "auto" also returned a tool call on both models.

That permissive behavior may be temporary, model-specific, or changed by later validation. It is not a reason to delete required fields. Production code should follow the documented shape above so it remains valid if the server tightens enforcement.


![DeepSeek thinking-mode multi-turn and tool-call history live test results](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Streaming reasoning_content safely

Streaming responses expose separate delta.reasoning_content and delta.content fields. Accumulate them independently. Do not use an else branch that assumes a chunk can contain only one field, and guard the final usage-only event because choices is empty when stream_options.include_usage is enabled.


```
let reasoning = "";
let answer = "";
let usage = null;

for await (const chunk of stream) {
  if (chunk.usage) usage = chunk.usage;

  const delta = chunk.choices?.[0]?.delta;
  if (!delta) continue;

  if (typeof delta.reasoning_content === "string") {
    reasoning += delta.reasoning_content;
  }
  if (typeof delta.content === "string") {
    answer += delta.content;
  }
}

if (!answer || !answer.trim()) {
  throw new Error("DeepSeek returned no final content");
}
// Keep reasoning out of ordinary application logs.
console.log({ answer, reasoningTokens:
  usage?.completion_tokens_details?.reasoning_tokens });
```

In our sanitized Flash stream, 30 server-sent events were parsed. Reasoning first appeared at event 1 and accounted for 23 chunks; final content began at event 24 and used five chunks. The final content was valid, and usage reported 23 reasoning tokens. This sequence illustrates why two buffers work, but another response can use different chunk boundaries.


![DeepSeek streaming live test showing reasoning_content events before final content events](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### JSON Output with Thinking Mode

Thinking Mode and JSON Output can be used together, but response_format: {"type":"json_object"} is not a substitute for a clear instruction. DeepSeek’s documentation requires the prompt to ask for JSON and also warns that JSON Output can occasionally return empty content. Our minimal thinking-enabled user prompt did request JSON, yet it returned HTTP 200 with finish_reason: "stop" and empty final content. A retry with a stronger, explicit system instruction returned valid JSON; the equivalent non-thinking control also returned valid JSON.


```
import json

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {
            "role": "system",
            "content": (
                "Return one valid JSON object with exactly the keys "
                "\"status\" and \"count\". Do not use Markdown."
            ),
        },
        {"role": "user", "content": "Status is ready and count is 3."},
    ],
    response_format={"type": "json_object"},
    max_tokens=512,
    extra_body={"thinking": {"type": "enabled"}},
)

choice = response.choices[0]
text = choice.message.content
if choice.finish_reason != "stop" or not text or not text.strip():
    raise RuntimeError("Empty or incomplete JSON response")
data = json.loads(text)
```

After parsing, validate required keys and types against your own schema. Use a small, bounded retry for empty content, but do not retry malformed requests indefinitely. Our dedicated DeepSeek JSON Output guide covers validation and recovery patterns.


![DeepSeek JSON Output empty response and model alias routing live test](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Thinking Mode token cost

Reasoning does not have a separate surcharge. It is included in completion_tokens and is billed at the model’s output-token rate. Using the official pricing snapshot checked on the test date, V4 Flash cost $0.0028 per million cache-hit input tokens, $0.14 per million cache-miss input tokens, and $0.28 per million output tokens. V4 Pro cost $0.003625, $0.435, and $0.87 for the same categories. Prices can change, so recheck the official table before budgeting.


```
estimated_cost =
  (cache_hit_input_tokens * cache_hit_price
  + cache_miss_input_tokens * cache_miss_price
  + completion_tokens * output_price) / 1_000_000
```

In the six-call toggle matrix, estimated request cost ranged from $0.00001092 for Flash with thinking disabled to $0.00016878 for the single Pro default-thinking call. The high/max Flash control cost estimates were $0.00011746 and $0.00024752. These values describe those prompts only. Your cost depends on input length, context-cache hits, reasoning length, final-answer length, and model choice.


### Recommended production defaults

A conservative starting profile is V4 Flash, thinking explicitly enabled, high effort, a task-specific output allowance, and no ineffective sampling parameters. Add a per-request timeout, but do not assume a slow request has failed while reasoning is still being generated. Record the model, HTTP status, finish reason, prompt tokens, cache-hit tokens, completion tokens, reasoning tokens, and sanitized elapsed time. Never put an API key or raw reasoning in logs.

At the application boundary, accept a response only after confirming that a choice exists, content is non-empty, the finish reason is suitable for the task, and structured output passes validation. Treat length, empty content, a malformed tool call, and invalid JSON as distinct outcomes with separate counters. Retry only failures that can plausibly succeed unchanged, and cap both attempts and total elapsed time. The DeepSeek API key guide explains safer credential storage, while the DeepSeek API guide covers the complete request lifecycle.

For higher-stakes workflows, route a measured subset to V4 Pro or max effort instead of making that the global default. Evaluate accuracy, empty-output rate, tool-call validity, token use, and tail latency together. This preserves Thinking Mode’s benefit while making its variable generation budget observable and controllable.


### Current models and legacy aliases

The live GET /models response listed only deepseek-v4-flash and deepseek-v4-pro. Both officially support thinking and non-thinking modes, a 1M-token context window, JSON Output, and tool calls. The pricing page lists a maximum output of 384K tokens, although applications should choose a smaller task-appropriate limit.

We also sent bounded completion probes to deepseek-chat and deepseek-reasoner. Both were accepted on July 27 and the response reported deepseek-v4-flash. However, neither alias appeared in model discovery, and the V4 release notice had announced retirement after July 24. That mismatch is precisely why new code should use explicit V4 IDs rather than depend on undocumented grace-period routing. Check our DeepSeek models guide and V4 migration guide for current routing guidance.


### Troubleshooting checklist

- HTTP 200 but empty content: inspect finish_reason, reasoning-token usage, and your output allowance. For JSON Output, add an explicit JSON instruction and use a bounded retry.

- finish_reason is length: reasoning or answer generation exhausted max_tokens. Increase the allowance or simplify the task and required output.

- No reasoning_content: confirm the toggle was enabled and inspect the returned model. Thinking disabled should not return reasoning.

- Tool continuation fails: replay the full assistant tool-call message, including content, reasoning_content, and tool_calls, then attach every tool result to the correct tool_call_id.

- Streaming parser crashes at the end: the usage-bearing chunk can have an empty choices array. Use optional access and process usage separately.

- Sampling settings appear ineffective: temperature, top-p, presence penalty, and frequency penalty do not affect thinking mode.

- Unexpected alias behavior: query the models endpoint and migrate to explicit V4 IDs. Do not infer availability from one successful legacy request.

- Repeated 4xx or 5xx responses: classify the status before retrying. See the DeepSeek error-code guide and rate-limit guide.


### How the tests can be reproduced

The public DeepSeek Thinking Mode test harness on GitHub uses Node.js 20 or newer and the built-in fetch API. Its fixed endpoint and model allow-list, sequential request plan, token caps, and request budget can be validated without an API key. A live run reads a temporary key only from the process environment.

The published evidence stores status codes, timings, response-shape flags, token counts, hashes, and sanitized error metadata. It does not store prompts, final answer text, chain-of-thought text, tool arguments, tool-call IDs, raw responses, authorization headers, balances, or private identifiers. Results remain limited by nondeterministic output, one client location, small samples, and an API that can change after the test date. Use the harness to verify compatibility in your own environment, not to claim universal speed or reasoning quality.


### Frequently asked questions


#### Is DeepSeek Thinking Mode enabled by default?

Yes. The current official documentation says thinking defaults to enabled. Our omitted-toggle controls also returned reasoning on both V4 Flash and V4 Pro. Sending an explicit toggle is still clearer in production.


#### How do I turn DeepSeek reasoning off?

Send {"thinking":{"type":"disabled"}} in the request body. With the OpenAI Python SDK, pass it through extra_body. Both disabled controls returned a valid answer without reasoning_content.


#### What is the difference between content and reasoning_content?

reasoning_content contains the model’s intermediate reasoning; content contains the user-facing answer. They are separate fields. Applications should render or parse content and avoid logging raw reasoning.


#### Do reasoning tokens count toward max_tokens and cost?

Yes. Reasoning tokens are part of completion-token usage, consume the output allowance, and are charged at the output rate. Always check for empty content and finish_reason: "length".


#### Should I use high or max reasoning effort?

Start with high and test against a representative evaluation set. Move selected complex tasks to max only when measured quality gains justify additional tokens, latency, and cost. One live pair cannot determine the best setting for every workload; our DeepSeek evaluation framework explains how to compare them.


#### Must reasoning_content be sent in conversation history?

Not after an ordinary assistant response without tool calls; DeepSeek says it is ignored. After a thinking-mode tool call, the official contract requires replaying it in the assistant message. Follow that stricter rule even if a current compatibility test succeeds without it.


#### Can DeepSeek Thinking Mode return JSON?

Yes. Set response_format to json_object, explicitly instruct the model to return JSON, validate non-empty content, parse it, and enforce your own schema. A 200 response does not eliminate the need for those checks.

Last live verification: July 27, 2026 UTC. API behavior, model routing, limits, and prices may change. Recheck the linked official DeepSeek documentation before a production rollout.

## 内部链接
- [DeepSeek API key setup guide](https://chat-deep.ai/docs/deepseek-api-key/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [OpenAI SDK with DeepSeek guide](https://chat-deep.ai/docs/openai-sdk-to-deepseek/)
- [DeepSeek Python guide](https://chat-deep.ai/docs/deepseek-python-sdk/)
- [DeepSeek observability guide](https://chat-deep.ai/docs/deepseek-observability/)
- [DeepSeek tool-calling guide](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [DeepSeek JSON Output guide](https://chat-deep.ai/docs/json-output/)
- [context-cache hits](https://chat-deep.ai/docs/deepseek-context-caching/)
- [DeepSeek API key guide](https://chat-deep.ai/docs/deepseek-api-key/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [DeepSeek models guide](https://chat-deep.ai/models/)
- [V4 migration guide](https://chat-deep.ai/docs/migrate-deepseek-chat-reasoner-to-v4/)
- [DeepSeek error-code guide](https://chat-deep.ai/docs/deepseek-error-codes/)
- [rate-limit guide](https://chat-deep.ai/docs/api-rate-limits/)
- [DeepSeek evaluation framework](https://chat-deep.ai/docs/deepseek-evaluation-framework/)

## 外部链接
- [official DeepSeek Thinking Mode contract](https://api-docs.deepseek.com/guides/thinking_mode/)
- [Chat Completions reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [official pricing snapshot](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek Thinking Mode test harness on GitHub](https://github.com/chatdeepai/deepseek-api-reproducible-tests/tree/main/thinking-mode)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-thinking-mode%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-thinking-mode%2F&text=DeepSeek%20Thinking%20Mode%3A%20Live%20Tests%20for%20reasoning_content%2C%20Effort%2C%20and%20Tool%20Calls)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-thinking-mode%2F&title=DeepSeek%20Thinking%20Mode%3A%20Live%20Tests%20for%20reasoning_content%2C%20Effort%2C%20and%20Tool%20Calls)
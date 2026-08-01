# DeepSeek Tool Calls: Function Calling & Live V4 Tests

- **URL**: https://chat-deep.ai/docs/deepseek-tool-calls/
- **Published**: 2026-04-05T15:38:05+00:00
- **Modified**: 2026-07-27T14:03:44+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 5380
- **Code blocks**: 7
- **Description**: Build DeepSeek tool calls in Python and Node.js. See live V4 function-calling tests for tool_choice, strict mode, multiple calls, thinking, and validation.

## H1


## H2 目录
- Live results at a glance
- How DeepSeek Tool Calls work
- Official contract versus observed results
- Minimal setup and credential boundary
- Complete Python Tool Calls example
- DeepSeek tool-call response anatomy
- DeepSeek tool_choice: official meanings and live results
- Tool Calls in thinking and non-thinking modes
- DeepSeek strict Tool Calls mode
- Multiple Tool Calls and result mapping
- Streaming DeepSeek Tool Calls safely
- Concise Node.js Tool Calls pattern
- Argument validation and the security boundary
- Tool Calls versus JSON Output versus agents
- Tool-specific errors and debugging
- Tokens, context, and cost
- Methodology, reproducibility, and limitations
- Production checklist
- FAQ

## 正文
Live test date: July 27, 2026 (UTC). DeepSeek Tool Calls let a model request an external function, but the model does not execute that function. Your application receives the proposed function name and JSON argument string, validates them, runs an allowlisted function outside the model, appends a role: "tool" message with the matching tool_call_id, and asks DeepSeek for the final answer.

We recorded 34 bounded case outcomes across deepseek-v4-flash and deepseek-v4-pro. Thirty actual generation requests were sent: 26 from the primary run and four from one compact diagnostic follow-up. The combined HTTP results were 25 responses with status 200 and five with status 400; four planned primary continuations were safety-skipped before any request because their preceding tool arguments were incomplete. Fourteen of 34 declared case expectations were met—10 in the primary plan and all four diagnostic cases—with maximum application concurrency one and zero automatic retries.

The most important production finding was truncation. Sixteen primary cases returned HTTP 200 and started one or more structurally recognizable tool calls, yet ended with finish_reason: "length" and incomplete argument JSON under deliberately tight 48-, 64-, or 96-token caps. An HTTP 200 response and a non-empty tool_calls array do not prove that a call is executable. The application must check the finish reason, assemble the complete argument string, parse it, validate it, and refuse execution when any step fails.

Chat-Deep.ai is an independent technical publication and is not affiliated with or endorsed by DeepSeek. Official documentation defines the supported request contract; our live results show only what the recorded test observed. No API key, Authorization header, account identifier, raw hidden reasoning, provider-generated call ID, balance, or arbitrary raw response body is published.

- Model proposes; application executes. Treat every function name and argument as untrusted input.

- tool_choice is a request control, not a substitute for testing. Compare the documented value with the behavior observed for your model and thinking setting.

- Thinking tool-call turns have a replay requirement. Preserve the complete assistant message, including reasoning_content, for subsequent requests.

- Strict mode is a Beta schema feature. It improves format enforcement but does not authorize a user or make an external action safe.

- Every returned tool call needs a result with the same ID. Validate all calls before executing any side effect.


![DeepSeek tool-call lifecycle from tool definition through model request, application execution, tool-result replay, and final answer](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Live results at a glance


Measure | Recorded result
Recorded case outcomes | 34
Actual HTTP generation requests | 30: 26 primary plus 4 diagnostic
HTTP status totals | 25 × 200; 5 × 400
Primary continuations skipped by the safety gate | 4
Declared case expectations met | 14/34: 10 primary plus 4 diagnostic
Primary HTTP-200 tool-producing cases truncated with invalid argument JSON | 16
Diagnostic round trips | Single tool: 1/1 ID; two tools: 2/2 IDs; both final continuations returned 200 with stop
Execution controls | Concurrency 1; automatic retries 0
Offline validation | 20/20 tests; 0 network requests; 0 secret findings

The compact follow-up did not erase the primary failures. It answered a narrower diagnostic question: after simplifying the schema and retaining a 96-token cap, could the complete round trip finish? The single-tool initial request produced one valid call with one unique ID, and the two-tool initial request produced two valid calls with two unique IDs. Both continuations returned HTTP 200, finish_reason: "stop", and non-empty final content.


### How DeepSeek Tool Calls work

The official DeepSeek Tool Calls guide describes an application-controlled loop. “Tool Calls” and “function calling” refer to the same practical pattern in the current Chat Completions API, where the documented tool type is function.

- Your application sends conversation messages and a list of function definitions in tools.

- DeepSeek either returns normal text or an assistant message containing one or more tool_calls.

- Your application checks the finish reason, function name, call ID, and argument string.

- It parses and validates the arguments against an application-owned schema and authorization policy.

- The application executes an allowlisted local or remote function.

- It appends the original assistant message, then one role: "tool" result for each matching tool_call_id.

- It sends the updated conversation back to DeepSeek and repeats until a final assistant answer arrives or a maximum-step guard stops the loop.

This distinction matters operationally. DeepSeek can propose lookup_order, but it cannot reach your order database unless your code exposes and executes that capability. The application remains responsible for authentication, user authorization, validation, timeouts, retries, audit records, confirmation for write actions, and the decision to reject a request.


### Official contract versus observed results


Question | Official contract | Dated live observation
Which models are documented? | The current reference lists deepseek-v4-flash and deepseek-v4-pro. | Both models were tested.
Who executes a function? | The application supplies and executes the function; the model returns a request. | Primary continuations were blocked when arguments were incomplete. The compact follow-up completed one single-tool and one two-tool round trip safely.
How are results matched? | Each tool result includes the corresponding tool_call_id. | The follow-up validated 1/1 unique ID in the single-tool case and 2/2 unique IDs in the two-tool case before both final continuations returned 200 with stop.
Can thinking mode call tools? | Yes; the complete reasoning field from tool-call turns must be replayed. | The initial thinking auto request returned 200 with reasoning present, but its call arguments were truncated at 96 tokens. Both replay continuations were therefore not executed.
What does strict mode require? | The Beta base URL, strict: true on every function, and the documented schema subset. | The valid Beta request returned 200 but truncated its arguments. Several invalid controls were accepted permissively; only the missing-required case returned 400.

The Create Chat Completion reference is the source of truth for request and response fields. It currently documents a maximum of 128 function tools, function names of no more than 64 permitted characters, JSON-formatted argument strings, finish_reason: "tool_calls", and tool_choice values described below. Live behavior can still vary by model, mode, date, and request, which is why the result column is separate.


### Minimal setup and credential boundary

Use the documented OpenAI-format base URL https://api.deepseek.com, keep the key on a trusted backend, and load it from protected runtime storage. Never put a DeepSeek API key in browser JavaScript, a mobile bundle, a WordPress page, a screenshot, or a public repository. The DeepSeek API key guide covers creation, masked local input, validation, rotation, and revocation.


```
python -m pip install openai
```


```
npm install openai
```

The official first-call documentation uses the OpenAI SDK with DeepSeek’s base URL. The examples below explicitly set thinking mode instead of relying on a default, use synthetic data, and never expose a real external action. For general setup and client configuration, see the DeepSeek API guide.


### Complete Python Tool Calls example

This bounded example exposes one read-only function. It validates the requested name and argument shape before running the local lookup, preserves the assistant message, sends the result with the matching call ID, and forces the second response to remain text-only.


```
import json
import os
import re
from openai import OpenAI

MODEL = "deepseek-v4-flash"
ORDER_PATTERN = re.compile(r"^ORD-[0-9]{5}$")

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

def lookup_order_status(order_id: str) -> dict:
    if not isinstance(order_id, str) or not ORDER_PATTERN.fullmatch(order_id):
        raise ValueError("Invalid order_id")
    demo = {
        "ORD-12345": {
            "order_id": "ORD-12345",
            "status": "processing",
        }
    }
    return demo.get(order_id, {"order_id": order_id, "status": "not_found"})

tools = [
    {
        "type": "function",
        "function": {
            "name": "lookup_order_status",
            "description": "Look up a synthetic order by its ORD- plus five-digit ID.",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {
                        "type": "string",
                        "description": "Synthetic order ID such as ORD-12345.",
                        "pattern": "^ORD-[0-9]{5}$",
                    }
                },
                "required": ["order_id"],
                "additionalProperties": False,
            },
        },
    }
]

messages = [
    {"role": "user", "content": "Check synthetic order ORD-12345."}
]

first = client.chat.completions.create(
    model=MODEL,
    messages=messages,
    tools=tools,
    tool_choice="auto",
    stream=False,
    extra_body={"thinking": {"type": "disabled"}},
)

assistant = first.choices[0].message
calls = assistant.tool_calls or []
if len(calls) != 1:
    raise RuntimeError("Expected exactly one tool call")

call = calls[0]
if call.function.name != "lookup_order_status":
    raise RuntimeError("Unknown tool requested")

try:
    arguments = json.loads(call.function.arguments)
except json.JSONDecodeError as exc:
    raise ValueError("Tool arguments were not valid JSON") from exc

if set(arguments) != {"order_id"}:
    raise ValueError("Unexpected or missing argument")

result = lookup_order_status(arguments["order_id"])

messages.append(assistant.model_dump(exclude_none=True))
messages.append(
    {
        "role": "tool",
        "tool_call_id": call.id,
        "content": json.dumps(result, separators=(",", ":")),
    }
)

final = client.chat.completions.create(
    model=MODEL,
    messages=messages,
    tools=tools,
    tool_choice="none",
    stream=False,
    extra_body={"thinking": {"type": "disabled"}},
)

content = final.choices[0].message.content
if not content:
    raise RuntimeError("Final content was empty")
print(content)
```

A production validator should use a maintained schema library and explicit business rules rather than only checking keys. The example keeps validation visible for teaching. It also deliberately avoids printing the raw assistant object, argument string, headers, or client configuration.

For Python packaging, timeouts, async clients, exception classes, and structured application design, continue to the DeepSeek Python SDK guide. This page owns the tool lifecycle and tests, not every Python client feature.


### DeepSeek tool-call response anatomy


Field | Meaning | Application rule
choices[0].finish_reason | tool_calls indicates that the assistant requested one or more tools. | Do not assume the reason; inspect it with the message.
message.tool_calls | Array of requested function calls. | Allowlist and validate every entry before execution.
tool_calls[].id | Identifier linking a request to its result. | Preserve it internally and return it as tool_call_id.
function.name | Requested function name. | Dispatch only exact names in a fixed registry.
function.arguments | JSON-formatted string produced by the model. | Parse, schema-validate, authorize, and constrain it.
reasoning_content | Thinking-mode reasoning field. | Preserve it for tool-call replay; do not expose it as the user answer.
message.content | Text for the user, often final after tool results. | Check presence and grounding before display.

The API reference warns that generated arguments may be invalid JSON or may include hallucinated parameters. A successful HTTP response is therefore not the same as a safe function call. Parsing and validation are mandatory application steps.


### DeepSeek tool_choice: official meanings and live results

tool_choice controls whether the model may call a function, must call one, or must request a specific named function. The official reference documents the four patterns below. The observed column reports the dated live matrix rather than treating documentation as a model-behavior benchmark.


Setting | Official meaning | Live status | Observed behavior
Omitted, tools absent | Default is none. | 200 on Flash and Pro | Both returned non-empty text with stop and zero tool calls.
Omitted, tools present | Default is auto. | 200 on Flash and Pro | Both started one tool call, but the 48-token cap produced length and incomplete argument JSON.
"none" | The model must not call a tool. | 200 on Flash and Pro | Both returned non-empty text with stop and zero tool calls.
"auto" | The model can answer or request tools. | 200 on Flash and Pro | Both started one tool call, but the 48-token cap produced length and incomplete argument JSON.
"required" | The model must request one or more tools. | Non-thinking: 200 on both. Thinking: 400 on both. | Both non-thinking responses started one call but truncated its JSON at 48 tokens. Both thinking requests returned 400.
Named function object | The model is directed to a specific function. | Non-thinking: 200 on both. Thinking: 400 on both. | Both non-thinking responses started the named call but truncated its JSON at 48 tokens. Both thinking requests returned 400.


![DeepSeek tool_choice live-test matrix comparing auto, required, named-tool, and none behaviors](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Use auto when either a normal answer or a lookup is acceptable. Use none when the next turn must be text-only. Use required or a named function only after testing the exact model, thinking setting, base URL, and SDK serialization used in production. Regardless of choice, reject unknown tools and invalid arguments.

Production rule: a tool-selection control can work while the resulting call remains unusable. In the primary matrix, the expected tool name and a call object often appeared under HTTP 200, but the cap stopped generation inside the argument JSON. Do not enqueue or execute a call merely because tool_calls.length > 0. Require an acceptable finish reason, complete assembly, successful JSON parsing, schema validation, authorization, and an available execution budget.


### Tool Calls in thinking and non-thinking modes

DeepSeek documents Tool Calls in both modes. Set {"thinking":{"type":"disabled"}} explicitly for a simple first integration. For a task that benefits from planning, set thinking to enabled and use a documented reasoning effort. The official Thinking Mode guide says the default toggle is enabled, so explicit configuration avoids accidental mode changes when code moves between clients.


Concern | Non-thinking | Thinking
Toggle | thinking.type: disabled | thinking.type: enabled
Assistant fields | Content and/or tool calls | May include reasoning_content, content, and/or tool calls
Replay after a tool call | Preserve the assistant tool-call message | Preserve the complete assistant message, including reasoning_content
User-facing output | Final content | Final content, not hidden reasoning
Live result | Non-thinking tool-producing responses frequently reached length under the primary caps. A compact 96-token follow-up completed one single-tool and one two-tool round trip; the Flash stream also produced valid arguments. | required and named choice returned 400 on both models. The auto initial replay case returned 200 with reasoning present but ended at length with invalid arguments; the Pro stream did the same.


![DeepSeek non-thinking versus thinking tool-call transcript showing where reasoning_content appears and what must be replayed](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


#### The reasoning_content replay contract

For a thinking turn that performs a tool call, DeepSeek’s official guide says the intermediate assistant reasoning_content must participate in context concatenation and must be passed back in subsequent requests. It also states that incorrect replay returns HTTP 400. The safest SDK pattern is to append the complete assistant message object instead of reconstructing only content and tool_calls.


```
assistant_message = response.choices[0].message
messages.append(assistant_message.model_dump(exclude_none=True))

for call in assistant_message.tool_calls or []:
    messages.append(
        {
            "role": "tool",
            "tool_call_id": call.id,
            "content": run_validated_tool(call),
        }
    )
```


Planned replay control | Changed field | Execution status | Interpretation
Complete assistant replay | None removed | Not executed | The initial 200 response ended at the 96-token cap with incomplete argument JSON. The safety gate refused tool execution and continuation.
Missing reasoning replay | reasoning_content omitted | Not executed | The same incomplete initial call prevented a safe paired replay request. No 200-versus-400 comparison was observed in this run.


![DeepSeek reasoning_content replay contract compared with a live thinking tool call that was truncated and safety-gated before replay](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

This run therefore does not report a successful full replay or an observed missing-field 400. The official replay requirement still applies. A separate DeepSeek Thinking Mode benchmark was conducted under its own plan and owns broader reasoning behavior and replay evidence; its cases and denominators are not counted in this Tool Calls study. Do not publish raw reasoning_content in screenshots, logs, traces, or user interfaces.


### DeepSeek strict Tool Calls mode

Strict mode is a Beta feature for tighter tool-argument schema adherence. The official Tool Calls guide requires https://api.deepseek.com/beta, requires every function in tools to set strict: true, and says the server validates the supplied JSON Schema. A schema outside the documented subset can be rejected before generation.


```
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com/beta",
)

strict_tools = [
    {
        "type": "function",
        "function": {
            "name": "get_temperature",
            "description": "Return a synthetic temperature for an allowlisted city.",
            "strict": True,
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "pattern": "^[A-Za-z -]+$",
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                    },
                },
                "required": ["city", "unit"],
                "additionalProperties": False,
            },
        },
    }
]
```

The documented strict subset includes objects, strings, numbers, integers, booleans, arrays, enums, anyOf, and local $ref/$def. For objects, every property must be listed in required and additionalProperties must be false. The guide documents string pattern and selected format values, numeric bounds, and several numeric constraints. It lists minLength, maxLength, minItems, and maxItems as unsupported.


Strict case | Documented expectation | Observed status | Observed outcome
Valid strict schema on Beta | Meets documented setup | 200 | The server accepted the request, but the 64-token cap produced length and incomplete JSON. Argument conformance could not be assessed.
Strict tool on standard route | Does not meet the documented Beta setup | 200 | The request was accepted in this run, but output truncated and the result does not replace the documented Beta requirement.
Property omitted from required | Invalid strict object schema | 400 | The server rejected the request as expected.
Missing additionalProperties: false | Invalid strict object schema | 200 | The server accepted it in this run. Output truncated, so no generated-argument conformance claim is possible.
Documented unsupported minLength | Outside the documented strict subset | 200 | The server accepted it in this run. Output truncated, and permissive acceptance is not a portable contract.


![DeepSeek strict beta schema validation results for valid and invalid tool argument schemas](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Strict mode is not an authorization system. A schema-valid request to refund_order can still be unauthorized, duplicated, fraudulent, or contrary to business rules. Validate arguments again at the execution boundary and apply user permissions, confirmation, idempotency, and limits.

The acceptance pattern is a dated observation, not proof that the standard route, an omitted additionalProperties: false, or minLength is supported reliably. Provider validation can be permissive, change over time, or differ across schema shapes. Build against the published Beta contract, preflight schemas locally, and treat HTTP acceptance separately from the correctness of generated arguments.


### Multiple Tool Calls and result mapping

A response can contain more than one tool call. Build the application around an array even when the first demo usually returns one call. For each entry, confirm that the ID is unique, the function is allowlisted, and the arguments validate. Append one tool result for every accepted ID before requesting the next assistant turn.


```
seen_call_ids = set()

for call in assistant_message.tool_calls or []:
    if call.id in seen_call_ids:
        raise ValueError("Duplicate tool_call_id")
    seen_call_ids.add(call.id)

    handler = ALLOWED_TOOLS.get(call.function.name)
    if handler is None:
        raise ValueError("Unknown tool")

    arguments = parse_and_validate(
        call.function.name,
        call.function.arguments,
    )
    result = handler(**arguments)

    messages.append(
        {
            "role": "tool",
            "tool_call_id": call.id,
            "content": json.dumps(result, separators=(",", ":")),
        }
    )
```

The primary Pro multi-tool request returned HTTP 200 and started two calls, but it reached the 96-token cap with incomplete argument JSON; the safety gate skipped its continuation. The compact Flash diagnostic then produced two valid calls with two unique IDs, the application attached 2/2 matching tool results, and the continuation returned HTTP 200 with finish_reason: "stop" and non-empty final content. The single-tool diagnostic likewise completed 1/1 ID and ended with a 200 stop. Public evidence uses aliases instead of provider-generated IDs.


![DeepSeek multi-tool loop timeline showing multiple model requests, application execution, tool-result replay, and final completion](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Do not launch all external side effects in parallel merely because the model returned multiple calls. Read-only independent lookups may be safe to parallelize after validation; writes often need sequencing, locks, idempotency keys, or user confirmation. The model’s array is a proposal, not an execution plan with authority.


### Streaming DeepSeek Tool Calls safely

The Chat Completion reference documents server-sent events when stream: true, ending with data: [DONE]. A streamed tool call can arrive as partial deltas: the function name, call ID, and argument string may be incomplete until later chunks. Buffer by choice and tool-call index, assemble the complete structure, then parse and validate it once.

- Collect deltas without executing a function.

- Associate fragments by response choice and tool-call index.

- Wait for the terminal condition and a complete call structure.

- Parse the assembled argument string once.

- Validate the name, ID, schema, permissions, and budget.

- Execute the application function and append its result.

One of two streaming cases met every preregistered assembly expectation. Flash in non-thinking mode returned HTTP 200, emitted 31 events, ended with finish_reason: "tool_calls", produced one valid call, and included the terminal [DONE] marker. Pro in thinking mode also returned 200 and included [DONE], but its 55-event stream ended with finish_reason: "length" and incomplete argument JSON. The harness executed zero tools before complete validation in both cases.


### Concise Node.js Tool Calls pattern

The Node.js flow is the same: request, inspect, parse, validate, dispatch, replay, and request the final answer. This core example omits installation and TypeScript type design, which belong in the DeepSeek Node.js and TypeScript guide.


```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

const first = await client.chat.completions.create({
  model: "deepseek-v4-flash",
  messages: [{ role: "user", content: "Check synthetic order ORD-12345." }],
  tools,
  tool_choice: "auto",
  thinking: { type: "disabled" },
  stream: false,
});

const message = first.choices[0]?.message;
const calls = message?.tool_calls ?? [];
if (calls.length !== 1) throw new Error("Expected one tool call");

const call = calls[0];
if (call.function.name !== "lookup_order_status") {
  throw new Error("Unknown tool");
}

let args;
try {
  args = JSON.parse(call.function.arguments);
} catch {
  throw new Error("Invalid tool argument JSON");
}

if (
  Object.keys(args).length !== 1 ||
  !/^ORD-[0-9]{5}$/.test(args.order_id)
) {
  throw new Error("Tool arguments failed validation");
}

const toolResult = lookupOrderStatus(args.order_id);
const messages = [
  { role: "user", content: "Check synthetic order ORD-12345." },
  message,
  {
    role: "tool",
    tool_call_id: call.id,
    content: JSON.stringify(toolResult),
  },
];

const final = await client.chat.completions.create({
  model: "deepseek-v4-flash",
  messages,
  tools,
  tool_choice: "none",
  thinking: { type: "disabled" },
  stream: false,
});

console.log(final.choices[0]?.message?.content);
```

Do not log the entire SDK client, environment, assistant object, request headers, or raw failed payload. The OpenAI SDK with DeepSeek guide covers broader compatibility and migration boundaries.


### Argument validation and the security boundary

Model-generated function arguments are untrusted input, even in strict mode. Validation should happen before any database query, network call, message, file write, transaction, or privileged action. A production dispatcher should reject on the first failed boundary instead of attempting to repair an unsafe request automatically.

- Allowlist exact function names; never evaluate an arbitrary model-provided name.

- Parse JSON with an explicit failure path and never echo rejected values into public logs.

- Validate types, required fields, enums, formats, ranges, patterns, and unexpected properties.

- Check the authenticated user’s permission for the requested resource and action.

- Separate read-only tools from functions that change state.

- Require explicit user confirmation for consequential writes.

- Use idempotency or deduplication for payments, messages, record creation, and other repeat-sensitive actions.

- Set external timeouts, response-size limits, step budgets, and total request budgets.

- Treat tool results as data; do not let text returned by an external system override application instructions.

- Return only fields the model needs, without secrets, access tokens, internal traces, or excessive personal data.


![Application-side DeepSeek tool argument validation and security boundary before external side effects](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Observability should record safe metadata such as internal route, approved tool alias, validation outcome, duration, token counts, and normalized error class. It should not retain credentials, raw reasoning, arbitrary arguments, private tool results, or provider-generated IDs. See the DeepSeek observability guide for logging and tracing design.


### Tool Calls versus JSON Output versus agents


Need | Use | Why
Extract structured fields from supplied text | JSON Output | The model returns structured content; no external function is required.
Read live application state | Tool Calls | The application performs a controlled lookup and returns the result.
Request a controlled action | Tool Calls plus authorization | The model proposes; the application validates and executes.
Plan across tools and multiple steps | Agent workflow | An agent adds loop policy, memory, limits, and orchestration around tool calls.
Return a final JSON object after using a tool | Tool Calls, then validated structured output | External data acquisition and final formatting are separate boundaries.

The DeepSeek JSON Output guide owns response_format, parsing, and standalone response validation. This page owns function selection, argument validation, application execution, and tool-result replay. For planning, memory, and multi-step autonomy, continue to the DeepSeek agents guide.


### Tool-specific errors and debugging


Symptom | Likely boundary | Fix
No tool call under auto | Model decision or ambiguous tool description | Decide whether normal text is acceptable; improve the description or test a required/named control.
Malformed argument JSON | Generated tool-call arguments | Reject safely; do not execute or silently guess values.
Unknown function name | Dispatcher allowlist | Reject the call and record a normalized validation outcome.
Strict schema rejected | Beta URL or unsupported schema structure | Check strict: true, required properties, additionalProperties: false, and supported keywords.
HTTP 400 after a thinking tool call | Assistant replay | Preserve the complete assistant message, including reasoning_content.
Tool result not associated | ID mapping or message order | Use the exact matching tool_call_id and append one result per call.
Incomplete streamed arguments | Delta assembly | Wait for the complete call before parsing or execution.
Endless tool loop | Missing orchestration bound | Enforce a maximum step count and total budget.
429 or transient 5xx | Capacity or service condition | Use bounded retry and backoff; do not repeat side effects without idempotency.

Do not treat every failure as retryable. A malformed schema, missing credential, invalid parameter, unsafe tool, or missing replay field needs correction. The DeepSeek error codes guide owns the general status decision tree, and the DeepSeek API rate-limits guide owns concurrency and backoff.


### Tokens, context, and cost

A tool loop adds messages: the user request, assistant tool-call message, tool result, and final answer, with more turns for multi-step workflows. Keep function descriptions and tool results concise, record usage safely, and bound the number of steps. Repeated stable tool definitions may also affect cache accounting. The DeepSeek Context Caching guide covers measured cache behavior.

DeepSeek’s official pricing page states that model usage is billed by tokens and that prices can change. This page does not duplicate a volatile rate table. Check the current official figures and the DeepSeek pricing guide before production budgeting.


### Methodology, reproducibility, and limitations

The live benchmark ran on July 27, 2026 against deepseek-v4-flash and deepseek-v4-pro using the official DeepSeek API. It recorded 34 case outcomes. The primary plan contained 30 records: 26 requests were issued and four continuations were safety-skipped. A one-time compact diagnostic issued four additional requests, bringing the actual total to 30 generation-capable HTTP requests. The run used maximum application concurrency one, observed peak concurrency one, zero automatic retries, and a maximum of 96 output tokens per request.

Across the 30 issued requests, 25 returned HTTP 200 and five returned HTTP 400. Fourteen of 34 recorded expectations were met: 10/30 primary records and 4/4 diagnostic records. Sixteen primary HTTP-200 tool-producing responses ended with length and incomplete argument JSON. Combined usage was 9,058 tokens. Recorded request time ranged from 277 to 549 ms, with a 296 ms median and 440 ms p95; those timings describe this client session, not a global performance benchmark.

The result schema retained case ID, public model, thinking setting, requested tool policy, HTTP status, elapsed time, finish reason, tool-call count, argument parse and validation flags, replay checks, safe token counters, and streaming event counts. It omitted credentials, Authorization headers, account data, raw prompts, raw arguments, raw tool results, raw reasoning_content, provider request IDs, provider-generated call IDs, and raw error messages.

A separate dependency-free offline suite converted the documented contract into deterministic application tests. It made zero network requests and used no API key. The final run recorded 20/20 deterministic tests passing, zero failures, zero network requests, and zero public secret-scan findings. Local passing tests establish application-side safety behavior; they do not prove that a provider model accepted a request.

Inspect the public DeepSeek Tool Calls reproducibility suite on GitHub for the test plan, official source register, safety contract, fixtures, source, sanitized summaries, and audit notes.

This page reports one feature-specific experiment. For reusable benchmark design, preregistration, fixtures, reference checks, and regression reporting across a wider application, use the DeepSeek evaluation framework.


#### Limitations

- The live sample used one account, network environment, test date, and bounded prompt set.

- Recorded timing is an audit of this run, not a global latency benchmark or service-level promise.

- A model can select different tools or arguments for differently worded prompts.

- Passing synthetic read-only cases does not certify a production database, payment, messaging, or administrative integration.

- Strict-mode acceptance does not replace business authorization or semantic validation.

- Only the models, choices, schemas, replay variants, and streaming cases explicitly listed in the public summary were tested.

- Official documentation and provider behavior can change; reruns should record a new date and preserve earlier evidence.


![DeepSeek Tool Calls live-test methodology and results dashboard with pass counts, models, controls, and privacy guardrails](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Production checklist

- Use current model IDs obtained from current official documentation or /models.

- Store the API key outside source code and client-delivered assets.

- Set thinking mode explicitly.

- Choose tool_choice intentionally and test the exact configuration.

- Keep function names, descriptions, and parameter schemas narrow.

- Allowlist tools and validate all arguments before execution.

- Preserve assistant tool-call messages and match every result ID.

- Preserve reasoning_content privately after thinking-mode tool calls.

- Wait for complete streamed calls before validation or execution.

- Separate read-only functions from consequential writes.

- Require permission and confirmation for sensitive actions.

- Use idempotency, timeouts, result-size limits, and maximum-step guards.

- Log allowlisted metadata without credentials, raw reasoning, or private tool data.

- Monitor tool selection, validation failures, execution failures, tokens, and loop termination.


### FAQ


#### What are DeepSeek Tool Calls?

DeepSeek Tool Calls let the model return a structured request for a function defined by your application. Your code validates the name and arguments, executes the real function, returns its result with the matching call ID, and asks the model for the final answer.


#### Is DeepSeek Function Calling the same as Tool Calls?

In this API context, yes. “Function calling” is the common developer phrase, while the current DeepSeek documentation labels the feature Tool Calls and currently documents function tools.


#### Does DeepSeek execute my function?

No. DeepSeek proposes a function name and arguments. Your application decides whether to accept the request and performs any lookup or action outside the model.


#### Which DeepSeek models support Tool Calls?

The current official API reference lists deepseek-v4-flash and deepseek-v4-pro, and the current pricing/model table marks Tool Calls as supported for both. Check the official documentation again before deployment because model catalogs can change.


#### What do auto, none, required, and named tool_choice mean?

auto lets the model answer or request tools; none prevents tool use; required requests at least one tool call; and the named object directs the model to a particular function. Test actual behavior for the selected model and thinking mode.


#### What is DeepSeek strict Tool Calls mode?

It is a Beta feature for tighter JSON Schema adherence. Official setup requires the Beta base URL, strict: true on every function, all object properties marked required, additionalProperties: false, and the documented schema subset. Application-side validation and authorization are still required.


#### Why do I get HTTP 400 about reasoning_content?

For a thinking-mode turn that performed a tool call, preserve and replay the complete assistant message, including reasoning_content, before appending tool results. Reconstructing the message without that field violates the documented replay contract.


#### How should I handle multiple tool_calls?

Iterate the array, require unique IDs, validate every function and argument set, execute only allowlisted operations, and append one result for each matching tool_call_id. Decide separately whether independent operations are safe to parallelize.


#### Can DeepSeek stream Tool Calls?

The Chat Completion API supports streaming, but tool-call fields can arrive in fragments. Assemble the complete call and validate it before executing any function.


#### Why are tool arguments invalid JSON or outside my schema?

Arguments are model-generated. The official reference explicitly warns that they may be invalid JSON or contain hallucinated parameters. Reject malformed or schema-invalid arguments; do not silently repair them before a consequential action.


#### Can an HTTP 200 Tool Calls response still be unusable?

Yes. Sixteen primary cases in this test returned 200 and a tool-call structure but ended with finish_reason: "length" and incomplete argument JSON under tight output caps. Require complete assembly, an acceptable finish reason, successful parsing, schema validation, and authorization before execution.


#### Should I use Tool Calls or JSON Output?

Use JSON Output when the model only needs to return structured text. Use Tool Calls when your application must fetch external data or perform a controlled action. A workflow can use Tool Calls first and validate a structured final response separately.


#### How do I secure tools that change data?

Require authenticated user permission, strict argument validation, explicit confirmation for consequential actions, idempotency, audit logging, bounded retries, and a narrow allowlist. Never execute a write solely because the model requested it.

Next step: begin with one synthetic read-only tool in non-thinking mode, validate a complete request → tool → result → answer loop, then add strict mode, thinking replay, multiple calls, or streaming one boundary at a time.

## 内部链接
- [DeepSeek API key guide](https://chat-deep.ai/docs/deepseek-api-key/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [DeepSeek Python SDK guide](https://chat-deep.ai/docs/deepseek-python-sdk/)
- [DeepSeek Thinking Mode benchmark](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [DeepSeek Node.js and TypeScript guide](https://chat-deep.ai/docs/deepseek-nodejs-typescript/)
- [OpenAI SDK with DeepSeek guide](https://chat-deep.ai/docs/openai-sdk-to-deepseek/)
- [DeepSeek observability guide](https://chat-deep.ai/docs/deepseek-observability/)
- [DeepSeek JSON Output guide](https://chat-deep.ai/docs/json-output/)
- [DeepSeek agents guide](https://chat-deep.ai/solutions/deepseek-ai-agents/)
- [DeepSeek error codes guide](https://chat-deep.ai/docs/deepseek-error-codes/)
- [DeepSeek API rate-limits guide](https://chat-deep.ai/docs/api-rate-limits/)
- [DeepSeek Context Caching guide](https://chat-deep.ai/docs/deepseek-context-caching/)
- [DeepSeek pricing guide](https://chat-deep.ai/pricing/)
- [DeepSeek evaluation framework](https://chat-deep.ai/docs/deepseek-evaluation-framework/)

## 外部链接
- [official DeepSeek Tool Calls guide](https://api-docs.deepseek.com/guides/tool_calls/)
- [Create Chat Completion reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [official Thinking Mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [official pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek Tool Calls reproducibility suite on GitHub](https://github.com/chatdeepai/deepseek-api-reproducible-tests/tree/main/tool-calls)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-tool-calls%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-tool-calls%2F&text=DeepSeek%20Tool%20Calls%3A%20Function%20Calling%2C%20Strict%20Mode%2C%20and%20Live%20V4%20Tests)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-tool-calls%2F&title=DeepSeek%20Tool%20Calls%3A%20Function%20Calling%2C%20Strict%20Mode%2C%20and%20Live%20V4%20Tests)
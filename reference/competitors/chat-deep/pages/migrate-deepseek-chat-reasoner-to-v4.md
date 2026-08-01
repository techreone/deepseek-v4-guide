# Migrate deepseek-chat & deepseek-reasoner to V4

- **URL**: https://chat-deep.ai/docs/migrate-deepseek-chat-reasoner-to-v4/
- **Published**: 2026-07-22T04:18:25+00:00
- **Modified**: 2026-07-28T23:40:25+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 2638
- **Code blocks**: 12
- **Description**: Replace retired deepseek-chat and deepseek-reasoner aliases with current V4 IDs using migration maps, Node.js, Python, cURL, and production rollout checks.

## H1


## H2 目录
- Behavior-preserving migration map
- Migration steps
- What changes—and what does not
- 1. Find every use of the legacy aliases
- 2. Migrate Node.js requests
- 3. Migrate Python requests
- 4. Verify the migration with cURL
- 5. Account for thinking-mode differences
- 6. Test streaming, tools, and structured workflows
- 7. Production migration and validation plan
- Migration troubleshooting
- Frequently asked questions
- Official sources

## 正文
To migrate deepseek-chat to DeepSeek V4 without changing its behavior, use deepseek-v4-flash and explicitly disable thinking. To migrate deepseek-reasoner, use deepseek-v4-flash and explicitly enable thinking.


> Cutoff status: DeepSeek’s April 24, 2026 V4 release notice announced that deepseek-chat and deepseek-reasoner would be fully retired and inaccessible after July 24, 2026 at 15:59 UTC. That cutoff has passed. Current official model documentation lists deepseek-v4-flash and deepseek-v4-pro; do not keep either old alias as a production fallback.

Legacy-alias status last verified: July 28, 2026. The current official model list and a live GET /models request show only deepseek-v4-flash and deepseek-v4-pro. Chat-Deep.ai’s bounded chat-completion tests observed both old names return HTTP 400 on July 25, then return HTTP 200 and identify V4 Flash as the served model on July 28. That changing, unlisted behavior is not a routing guarantee or a safe rollback path. Replace every deployable use of the old names with a current V4 ID and an explicit thinking-mode setting. See the dated API updates tracker for the payloads, timestamps, and evidence.

Chat-Deep.ai is an independent guide and is not affiliated with DeepSeek. We checked the examples against DeepSeek’s official API documentation and syntax-checked the JavaScript and Python. The alias-status result above comes from a bounded live check of one account, endpoint, payload, and time window; it is not a guarantee of every environment. Run the smoke tests below in your own non-production environment before changing production traffic.


### Behavior-preserving migration map


Legacy request | Explicit DeepSeek V4 replacement | Behavior preserved
model: "deepseek-chat" | model: "deepseek-v4-flash"thinking: { type: "disabled" } | Non-thinking chat
model: "deepseek-reasoner" | model: "deepseek-v4-flash"thinking: { type: "enabled" } | Thinking response

Do not treat deepseek-v4-pro as the automatic successor to either alias. Pro is a deliberate model upgrade that should be selected after quality, latency, cost, and concurrency testing. Both V4 Flash and V4 Pro support thinking and non-thinking modes. See the separate DeepSeek V4 model guide before choosing between them.


![Archived DeepSeek pre-cutoff alias migration table](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Migration steps

- What changes and what stays the same

- Find every legacy alias

- Node.js migration

- Python migration

- cURL migration

- Thinking and response differences

- Streaming and tool-call checks

- Validation and rollout plan

- Troubleshooting

- Frequently asked questions


### What changes—and what does not


Configuration | Migration action
OpenAI-format base URL | Keep https://api.deepseek.com
Raw chat operation | Keep POST /chat/completions
DeepSeek API key | Keep the existing server-side key; DeepSeek does not document a new key type for V4
messages | Keep the supported system, user, assistant, and tool message structure
model | Replace the legacy alias with deepseek-v4-flash or a deliberately selected deepseek-v4-pro
thinking | Set it explicitly to preserve the old alias’s mode
Response parser | Verify reasoning_content, streaming deltas, tool calls, finish reasons, and usage fields

DeepSeek lists a 1M context length and a maximum output of 384K for both V4 models. The output figure is a maximum, not a default, and the combined input plus generated tokens must fit within the model context. Keep a realistic max_tokens value and handle finish_reason: "length" rather than assuming every response reaches your requested endpoint.


### 1. Find every use of the legacy aliases

Search more than application source files. Model names are commonly stored in environment variables, YAML, JSON, deployment manifests, gateway routing rules, observability dashboards, test fixtures, fallback arrays, database configuration, and agent model registries.


```
rg -n --hidden \ --glob '!node_modules' \ --glob '!.git' \ 'deepseek-chat|deepseek-reasoner' .
```

Classify every match by intended behavior:

- Fast or ordinary chat: map to V4 Flash with thinking disabled.

- Reasoning workflow: map to V4 Flash with thinking enabled.

- Quality-first workload: evaluate V4 Pro separately; do not assume it is a one-for-one replacement.

- Fallback: replace or remove the legacy name. A retired alias is not a safe rollback target.


#### Store the model and mode together

The legacy names encoded both a model route and a thinking choice. V4 separates those decisions. Do not keep a single environment variable that changes the model while leaving the mode implicit. Define an application-level profile that changes both values atomically:


```
const DEEPSEEK_PROFILES = { chat: { model: "deepseek-v4-flash", thinking: { type: "disabled" }, }, reasoner: { model: "deepseek-v4-flash", thinking: { type: "enabled" }, }, }; const profileName = process.env.DEEPSEEK_PROFILE ?? "chat"; const profile = DEEPSEEK_PROFILES[profileName]; if (!profile) { throw new Error("DEEPSEEK_PROFILE must be chat or reasoner."); }
```

This pattern prevents a partial deployment in which the canonical V4 name is updated but the intended thinking mode is lost. If different routes need Flash and Pro, create separate reviewed profiles rather than letting arbitrary model strings pass from user input.


### 2. Migrate Node.js requests

The examples use the OpenAI JavaScript package with DeepSeek’s unchanged base URL. Keep the API key on the server.


```
npm install openai
```


#### Replace deepseek-chat

Before:


```
const response = await client.chat.completions.create({ model: "deepseek-chat", messages, });
```

After, preserving non-thinking behavior:


```
import OpenAI from "openai"; const apiKey = process.env.DEEPSEEK_API_KEY; if (!apiKey) { throw new Error("Set DEEPSEEK_API_KEY before starting the app."); } const client = new OpenAI({ apiKey, baseURL: "https://api.deepseek.com", }); const messages = [ { role: "user", content: "Return a one-sentence deployment summary.", }, ]; const response = await client.chat.completions.create({ model: "deepseek-v4-flash", messages, thinking: { type: "disabled" }, max_tokens: 300, stream: false, }); console.log(response.choices[0].message.content);
```

The explicit thinking: { type: "disabled" } is essential. DeepSeek documents thinking as enabled by default for explicit V4 model IDs. Changing only the model name can therefore alter response fields, latency, token use, and the effect of sampling parameters.


#### Replace deepseek-reasoner

Before:


```
const response = await client.chat.completions.create({ model: "deepseek-reasoner", messages, });
```

After, preserving thinking behavior:


```
const response = await client.chat.completions.create({ model: "deepseek-v4-flash", messages, thinking: { type: "enabled" }, max_tokens: 1200, stream: false, }); const message = response.choices[0].message; console.log("Reasoning:", message.reasoning_content); console.log("Answer:", message.content);
```

You may set reasoning_effort: "high" or "max" when you deliberately want to pin an effort level. Omitting it retains DeepSeek’s documented defaults: high for regular thinking requests, with some complex agent requests automatically using max.

For project structure, TypeScript considerations, and error handling, use the dedicated DeepSeek Node.js and TypeScript guide.


### 3. Migrate Python requests

DeepSeek instructs Python OpenAI SDK users to pass the thinking object through extra_body.


#### Python replacement for deepseek-chat


```
import os from openai import OpenAI client = OpenAI( api_key=os.environ["DEEPSEEK_API_KEY"], base_url="https://api.deepseek.com", ) response = client.chat.completions.create( model="deepseek-v4-flash", messages=[ { "role": "user", "content": "Return a one-sentence deployment summary.", } ], max_tokens=300, stream=False, extra_body={"thinking": {"type": "disabled"}}, ) print(response.choices[0].message.content)
```


#### Python replacement for deepseek-reasoner


```
response = client.chat.completions.create( model="deepseek-v4-flash", messages=[ { "role": "user", "content": "Compare two deployment options and explain the tradeoffs.", } ], max_tokens=1200, stream=False, extra_body={"thinking": {"type": "enabled"}}, ) message = response.choices[0].message print("Reasoning:", message.reasoning_content) print("Answer:", message.content)
```

See the DeepSeek Python SDK guide for environment setup and a larger production structure.


### 4. Verify the migration with cURL

A small non-production request confirms that the new model ID and mode reach the API. This example tests the behavior-preserving replacement for deepseek-chat:


```
curl https://api.deepseek.com/chat/completions \ -H "Content-Type: application/json" \ -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \ -d '{ "model": "deepseek-v4-flash", "messages": [ { "role": "user", "content": "Return exactly: V4 migration test passed" } ], "thinking": { "type": "disabled" }, "max_tokens": 30, "stream": false }'
```

Do not publish the response as proof that every workflow is compatible. A simple request verifies connectivity; it does not validate streaming, JSON Output, tools, multi-turn state, rate limits, or production behavior.


#### Check canonical model IDs


```
curl https://api.deepseek.com/models \ -H "Authorization: Bearer ${DEEPSEEK_API_KEY}"
```

DeepSeek’s List Models reference documents deepseek-v4-flash and deepseek-v4-pro. Add a deployment check or configuration allowlist that rejects deepseek-chat and deepseek-reasoner before release.


### 5. Account for thinking-mode differences


![Official DeepSeek V4 thinking mode toggle and reasoning effort controls](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


Area | Non-thinking migration | Thinking migration
Toggle | thinking.type: "disabled" | thinking.type: "enabled"
Final answer | Read message.content | Read message.content
Reasoning | Do not require a reasoning field | Handle message.reasoning_content separately
Streaming | Handle delta.content | Handle delta.reasoning_content and delta.content
Sampling controls | temperature and top_p can affect generation | temperature, top_p, presence_penalty, and frequency_penalty are accepted but have no effect
Effort | Not applicable | reasoning_effort: "high" or "max"

Compatibility mappings also accept low and medium as high, and xhigh as max. Prefer DeepSeek’s native documented values in new configuration. The full DeepSeek Thinking Mode guide explains reasoning responses and multi-turn handling.


### 6. Test streaming, tools, and structured workflows


#### Streaming

A parser built for deepseek-chat may only collect delta.content. In thinking mode, DeepSeek returns reasoning through delta.reasoning_content separately from final-answer content. Test both streams and confirm your UI, logs, and token accounting do not merge reasoning into the user-facing answer.


#### Tool-call history

For a thinking-mode turn that performs a tool call, DeepSeek requires the assistant’s reasoning_content to be passed back in subsequent requests. The safest documented pattern is to preserve and append the complete assistant message object before adding the tool result. Missing reasoning history can produce HTTP 400.


```
// Preserve content, reasoning_content, and tool_calls together. messages.push(response.choices[0].message); messages.push({ role: "tool", tool_call_id: toolCall.id, content: JSON.stringify(toolResult), });
```

Test a complete tool loop, not only the first model response. See the DeepSeek Tool Calls guide for validation and execution boundaries.


#### JSON Output and FIM

DeepSeek lists JSON Output and Tool Calls for both V4 models. FIM Completion is listed only for non-thinking mode. Regression-test every specialized workflow rather than treating a successful text prompt as complete migration coverage.


#### Cache and usage fields

DeepSeek context caching is enabled automatically; the model-name migration does not require a cache flag. Log usage.prompt_cache_hit_tokens, usage.prompt_cache_miss_tokens, output tokens, and reasoning tokens during the canary. A cache hit is best effort and should not be assumed from one repeated request.


### 7. Production migration and validation plan

- Inventory both aliases. Search code, environment values, proxies, manifests, agent settings, tests, dashboards, and fallback lists.

- Map by behavior. Use Flash plus thinking disabled for deepseek-chat; use Flash plus thinking enabled for deepseek-reasoner.

- Validate configuration in CI. Fail the build when either legacy string remains in deployable configuration.

- Deploy behind configuration control. Use a model setting or feature flag so the canonical ID can be changed without a code release.

- Canary non-production traffic. Compare answer format, latency, token usage, cache fields, finish reasons, and errors.

- Test both response paths. Run non-streaming and SSE tests for non-thinking and thinking requests.

- Run a full tool loop. Preserve the complete assistant message and verify that multi-turn tool calls do not return HTTP 400.

- Regression-test specialized features. Include JSON Output, Tool Calls, FIM where used, stop sequences, and realistic context lengths.

- Load-test the selected model. Flash and Pro have different documented account concurrency, so do not replace an alias with Pro without capacity testing.

- Remove the old fallback. Roll back to the previous application build with canonical V4 configuration—not to a retired model alias.


#### What to monitor during the canary


Signal | Why it matters
Requested model and thinking type | Proves the application sent the intended atomic profile
Returned model field | Detects unexpected routing or configuration
HTTP status and provider request ID | Supports error grouping and escalation without logging prompts
Latency to first token and total duration | Reveals accidental thinking activation or a tier change
finish_reason | Detects truncation, tool calls, filtering, or resource interruption
Input, output, reasoning, cache-hit, and cache-miss tokens | Measures the actual cost and cache behavior of the selected profile
Tool-loop HTTP 400 rate | Detects missing reasoning_content history
HTTP 429 rate and retry count | Shows whether the selected model exceeds account concurrency

Log metadata needed for operations, but do not place API keys, private prompts, raw customer documents, or unredacted personal data in observability systems. Compare the canary with a dated baseline; do not judge migration success from one hand-picked prompt.


#### Minimum test matrix


Test | Expected check
Flash, thinking disabled | Final content is parsed and the application does not depend on reasoning output
Flash, thinking enabled | reasoning_content and final content are handled separately
Streaming, both modes | Reasoning and answer deltas are routed correctly; stream completion is detected
Two-turn chat | Conversation history remains valid
Thinking plus tools | Complete assistant reasoning/tool history is replayed; no HTTP 400
JSON Output | Output parses and satisfies application validation
Context boundary | finish_reason and partial output are handled safely
Usage and cache | Token and cache fields are recorded without assuming every retry hits cache
Concurrency | 429 retry and backoff behavior works at expected load
Model allowlist | Deployment contains only canonical V4 model IDs

Compare Flash and Pro on your prompts before changing tiers. Use the dedicated DeepSeek API pricing page for dated pricing and concurrency values rather than copying a price snapshot into long-lived migration code.


### Migration troubleshooting


Symptom | Likely cause | Action
Legacy model ID fails or is absent from the current model list | The retired alias was not replaced | Use a documented V4 ID and explicit thinking mode. Record the provider response; do not assume a guaranteed post-retirement error code.
deepseek-chat replacement is slower or returns reasoning | deepseek-v4-flash defaulted to thinking enabled | Add thinking: { type: "disabled" }
No effect from temperature or penalties | Thinking mode is enabled | Disable thinking when those controls are required
HTTP 400 during a tool loop | Prior assistant reasoning_content was not preserved | Append the complete assistant message before tool results
HTTP 401 | Missing or invalid DeepSeek API key | Verify the server environment and authorization header
HTTP 422 | Invalid request parameters | Compare the request with the V4 Chat Completion schema
HTTP 429 | Account or model concurrency exceeded | Apply backoff and test against the selected model’s concurrency
Answer is cut off | max_tokens or total context limit reached | Inspect finish_reason and adjust the request safely
Unexpected cost or latency after moving to Pro | Pro was treated as a direct alias replacement | Return the canary to Flash and evaluate Pro as a separate upgrade

For status-specific diagnostics, see the DeepSeek API error codes guide. For the request and response structure, use the Chat Completion guide.


### Frequently asked questions


#### What is the direct replacement for deepseek-chat?

The behavior-preserving replacement is deepseek-v4-flash with thinking.type explicitly set to disabled.


#### What is the direct replacement for deepseek-reasoner?

The behavior-preserving replacement is deepseek-v4-flash with thinking.type explicitly set to enabled.


#### Is deepseek-v4-pro the new name for deepseek-reasoner?

No. Before the cutoff, DeepSeek documented the legacy reasoner alias as mapping to V4 Flash thinking mode. That was historical compatibility behavior. V4 Pro is a separate model choice that needs its own quality, cost, latency, and capacity evaluation.


#### Can I replace only the model string?

Not safely for deepseek-chat. Explicit V4 models default to thinking enabled, so you must disable thinking to preserve non-thinking behavior. For deepseek-reasoner, the default aligns with thinking mode, but setting it explicitly makes the migration auditable and prevents configuration ambiguity.


#### Do I need a new base URL or API key?

No change is documented for the canonical OpenAI-format base URL or DeepSeek API key. Keep https://api.deepseek.com and your existing secured DeepSeek key.


#### Which error will the retired aliases return?

DeepSeek has not documented one guaranteed post-cutoff status code. Chat-Deep.ai observed HTTP 400 for both aliases on July 25, but HTTP 200 with V4 Flash routing on July 28. Your migration test should therefore fail if an old alias remains in configuration even when the request succeeds; do not use an assumed 400, 404, or 422 response as the only detection rule.


#### Should I keep the old aliases as rollback values?

No. A rollback should restore a known application version while retaining canonical V4 model IDs. The retired aliases cannot provide a dependable post-cutoff rollback path.


### Official sources

- DeepSeek API documentation home

- DeepSeek V4 Preview Release notice

- DeepSeek API Change Log

- DeepSeek Thinking Mode

- DeepSeek Create Chat Completion reference

- DeepSeek List Models reference

- DeepSeek Models & Pricing

- DeepSeek Context Caching

- DeepSeek API Error Codes

For related setup, endpoint, and production guidance, see the DeepSeek documentation hub.

## 内部链接
- [dated API updates tracker](https://chat-deep.ai/docs/deepseek-api-updates/)
- [DeepSeek V4 model guide](https://chat-deep.ai/models/deepseek-v4/)
- [DeepSeek Node.js and TypeScript guide](https://chat-deep.ai/docs/deepseek-nodejs-typescript/)
- [DeepSeek Python SDK guide](https://chat-deep.ai/docs/deepseek-python-sdk/)
- [DeepSeek Thinking Mode guide](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [DeepSeek Tool Calls guide](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [DeepSeek API pricing page](https://chat-deep.ai/pricing/)
- [DeepSeek API error codes guide](https://chat-deep.ai/docs/deepseek-error-codes/)
- [Chat Completion guide](https://chat-deep.ai/guide/create-chat-completion/)
- [DeepSeek documentation hub](https://chat-deep.ai/docs/)

## 外部链接
- [DeepSeek V4 release notice](https://api-docs.deepseek.com/news/news260424/)
- [DeepSeek Thinking Mode documentation](https://api-docs.deepseek.com/guides/thinking_mode/#thinking-mode-toggle-and-effort-control)
- [DeepSeek API documentation home](https://api-docs.deepseek.com/)
- [DeepSeek V4 Preview Release notice](https://api-docs.deepseek.com/news/news260424/)
- [DeepSeek API Change Log](https://api-docs.deepseek.com/updates/)
- [DeepSeek Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode/)
- [DeepSeek Create Chat Completion reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek List Models reference](https://api-docs.deepseek.com/api/list-models/)
- [DeepSeek Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek Context Caching](https://api-docs.deepseek.com/guides/kv_cache/)
- [DeepSeek API Error Codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fmigrate-deepseek-chat-reasoner-to-v4%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fmigrate-deepseek-chat-reasoner-to-v4%2F&text=How%20to%20Migrate%20deepseek-chat%20and%20deepseek-reasoner%20to%20DeepSeek%20V4)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fmigrate-deepseek-chat-reasoner-to-v4%2F&title=How%20to%20Migrate%20deepseek-chat%20and%20deepseek-reasoner%20to%20DeepSeek%20V4)
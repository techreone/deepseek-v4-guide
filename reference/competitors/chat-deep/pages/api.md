# DeepSeek API Docs: Quickstart, Models & Code Examples

- **URL**: https://chat-deep.ai/docs/api/
- **Published**: 2025-09-05T02:02:46+00:00
- **Modified**: 2026-07-28T23:41:11+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 3046
- **Code blocks**: 5
- **Description**: Use the DeepSeek API with Node.js, Python, or cURL. Get current V4 model IDs, authentication, thinking mode, streaming, tool calls, errors, and deployment tips.

## H1


## H2 目录
- DeepSeek API Quick Reference
- DeepSeek API Quickstart
- DeepSeek API Models: V4 Flash vs V4 Pro
- Chat Completions Request Structure
- DeepSeek API Response Fields
- Thinking Mode
- Streaming Responses
- JSON Output
- Tool Calls and Function Calling
- Multi-Turn Conversations and Context Caching
- Beta Features: Chat Prefix, FIM, and Strict Tools
- OpenAI and Anthropic API Compatibility
- DeepSeek API Endpoints
- Rate Limits, Concurrency, and API Errors
- DeepSeek API Pricing
- Production and API-Key Security Checklist
- Frequently Asked Questions
- Primary Sources and Verification

## 正文
Last verified: July 28, 2026.


> Independent guide: Chat-Deep.ai is not DeepSeek and is not an official documentation mirror. API accounts, keys, billing, service availability, policies, and technical support are provided by DeepSeek through its official platform.

The DeepSeek API provides OpenAI-format and Anthropic-format interfaces for accessing DeepSeek’s hosted models from applications. For OpenAI-format requests, use https://api.deepseek.com, authenticate with a Bearer API key, and send chat requests to POST /chat/completions. DeepSeek’s API documentation listed deepseek-v4-flash and deepseek-v4-pro during this verification.

This independent DeepSeek API docs guide gives you the base URLs, model IDs, authentication format, minimal Node.js, cURL, and Python examples, plus the operational facts needed before production. Use DeepSeek’s own documentation as the source of truth for fields, limits, pricing, beta behavior, and deprecation notices.


> Model-name migration status (verified July 28, 2026): DeepSeek’s April 24 notice announced that deepseek-chat and deepseek-reasoner would become unavailable after July 24, 2026 at 15:59 UTC, and that date has passed. The current official model list and a July 28 GET /models check show only deepseek-v4-flash and deepseek-v4-pro. Chat-Deep.ai’s bounded chat-completion tests produced a changing result: both old names returned HTTP 400 on July 25, then returned HTTP 200 and identified the served model as V4 Flash on July 28. This is observed compatibility on one account, not a documented support guarantee or a safe fallback. Use a documented V4 ID, set thinking mode explicitly, and test your own account before deployment. deepseek-reasoner is not a current R1 model ID. DeepSeek’s official change log shows that the alias served R1 and R1-0528 in early 2025, then was reused for the thinking modes of later V3 and V4 releases. Treat its meaning as date-specific, not as a permanent model-family name. See the dated API updates tracker for payloads, timestamps, and evidence.


### DeepSeek API Quick Reference


Item | Verified value
OpenAI-format base URL | https://api.deepseek.com
Anthropic-format base URL | https://api.deepseek.com/anthropic
Beta base URL | https://api.deepseek.com/beta
Chat endpoint | POST /chat/completions
Authentication | Authorization: Bearer <DEEPSEEK_API_KEY>
API model IDs | deepseek-v4-flash, deepseek-v4-pro
Context length | 1M tokens for both listed V4 models
Maximum output | 384K tokens within the model’s context capacity
Thinking mode | Supported and enabled by default
Streaming | Supported with stream: true through server-sent events
JSON and tools | JSON Output and function Tool Calls are documented for both models

The 1M context figure and 384K maximum output must not be added together. The Chat Completions reference states that the combined input and generated tokens are limited by the model context length.


### DeepSeek API Quickstart

To use the DeepSeek API, create a key, keep it on your server, install a compatible client, and send a request with one of the listed V4 model IDs. The API key must never be embedded in browser JavaScript, a mobile app bundle, a public repository, or a client-side WordPress script.


#### 1. Get and store a DeepSeek API key

Create the key through DeepSeek Platform. Our guide to get a DeepSeek API key covers creation, server-side storage, rotation, revocation, and authentication troubleshooting.


```
export DEEPSEEK_API_KEY="replace_with_your_key"
```


#### 2. Make your first DeepSeek API call with Node.js

Install the OpenAI JavaScript package. It is an OpenAI client configured to use DeepSeek’s base URL; it is not a separate official DeepSeek SDK. See DeepSeek Node.js and TypeScript for environment setup, TypeScript considerations, streaming, and server-side patterns.


```
npm install openai
```


```
import OpenAI from "openai"; if (!process.env.DEEPSEEK_API_KEY) { throw new Error("Set the DEEPSEEK_API_KEY environment variable."); } const client = new OpenAI({ baseURL: "https://api.deepseek.com", apiKey: process.env.DEEPSEEK_API_KEY, }); const completion = await client.chat.completions.create({ model: "deepseek-v4-flash", messages: [ { role: "system", content: "You are a concise API assistant.", }, { role: "user", content: "Return one sentence confirming that the API request worked.", }, ], thinking: { type: "disabled" }, stream: false, }); console.log(completion.choices[0].message.content);
```

This example disables thinking because the test is simple. For complex reasoning, coding, or agent work, enable thinking and evaluate the effect on output, latency, reasoning-token use, and cost.


#### 3. DeepSeek API cURL example


```
curl https://api.deepseek.com/chat/completions \ -H "Content-Type: application/json" \ -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \ -d '{ "model": "deepseek-v4-flash", "messages": [ { "role": "user", "content": "Return a two-word connection test." } ], "thinking": { "type": "disabled" }, "stream": false }'
```


#### 4. DeepSeek API Python example

For a larger Python implementation, including environment setup and error handling, use the DeepSeek Python API guide. This minimal example uses the OpenAI Python package with DeepSeek’s base URL.


```
import os from openai import OpenAI client = OpenAI( api_key=os.environ["DEEPSEEK_API_KEY"], base_url="https://api.deepseek.com", ) response = client.chat.completions.create( model="deepseek-v4-flash", messages=[ { "role": "user", "content": "Return one sentence confirming the connection.", } ], stream=False, extra_body={"thinking": {"type": "disabled"}}, ) print(response.choices[0].message.content)
```


### DeepSeek API Models: V4 Flash vs V4 Pro

DeepSeek’s first-party API listed two V4 Preview model IDs during verification. This is not the same as the full collection of downloadable DeepSeek checkpoints. See the DeepSeek API models and model-family guide for the broader distinction between hosted API models and open weights.


Model ID | Context / listed output | Account concurrency | Good first evaluation
deepseek-v4-flash | 1M / maximum 384K | 2,500 | Routine tasks, high-volume workloads, long-context processing, and cost-sensitive applications
deepseek-v4-pro | 1M / maximum 384K | 500 | Difficult reasoning, coding, and agent workflows where you want to evaluate the Pro model

Both support thinking and non-thinking modes, JSON Output, Tool Calls, and Chat Prefix Completion Beta. Benchmark both models on your prompts instead of treating a model name or size as a quality guarantee. The DeepSeek V4 Pro and Flash guide covers model-specific differences without turning this API page into a model report.


### Chat Completions Request Structure

The primary text-generation endpoint is POST /chat/completions. A request requires a model and a non-empty messages array. The DeepSeek Chat Completions API guide contains the complete request, response, multi-turn, and streaming workflow.


Field | Purpose | Important limitation
model | Selects Flash or Pro | Use a model ID listed by the first-party API
messages | Supplies system, user, assistant, and tool messages | At least one message is required
thinking | Enables or disables thinking mode | The default is enabled
reasoning_effort | Controls thinking effort | Documented values are high and max
max_tokens | Caps generated tokens | Input plus output must fit inside the context capacity
stream | Returns partial deltas through SSE | Streaming ends with data: [DONE]
response_format | Requests JSON output | JSON mode is not JSON Schema enforcement
tools / tool_choice | Lets the model request functions | Your application validates and executes every function
user_id | Supports safety, cache, and scheduling isolation | Do not include private information

The API reference also lists temperature, top_p, stop sequences, log probabilities, and related controls. In thinking mode, temperature, top_p, presence_penalty, and frequency_penalty do not take effect, even if a compatibility client accepts them.


### DeepSeek API Response Fields

For a non-streaming request, the final assistant text is usually available at response.choices[0].message.content. Thinking requests can also return message.reasoning_content, while tool workflows can return message.tool_calls.


Response field | What to do with it
choices[].message.content | Read the final assistant output
choices[].message.reasoning_content | Handle separately from the final answer in thinking mode
choices[].message.tool_calls | Validate the function name and arguments before execution
choices[].finish_reason | Detect normal completion, length limits, filtering, tool calls, or resource interruption
usage.prompt_tokens | Measure input-token use
usage.completion_tokens | Measure generated-token use
usage.prompt_cache_hit_tokens | Measure input tokens served as cache hits
usage.prompt_cache_miss_tokens | Measure input tokens billed as cache misses

Documented finish_reason values include stop, length, content_filter, tool_calls, and insufficient_system_resource. Production code should inspect this field rather than assuming every HTTP 200 response contains a complete answer.


### Thinking Mode

Thinking mode is enabled by default for both listed V4 API models. In OpenAI format, use {"thinking":{"type":"enabled"}} or {"thinking":{"type":"disabled"}}. The documented reasoning-effort values are high and max; compatibility values low and medium map to high, while xhigh maps to max.

Use thinking for multi-step reasoning, difficult coding, planning, and tool-based agents. Disable it for simple classification, short extraction, routing, or low-latency utility calls. In the Python OpenAI client, DeepSeek instructs developers to put thinking inside extra_body. The DeepSeek Thinking Mode guide explains reasoning_content, effort controls, streaming, and tool-call continuity.


### Streaming Responses

Set stream: true to receive data-only server-sent events instead of waiting for one completed response. Read text from delta.content; thinking output can arrive through separate delta.reasoning_content fields. The event stream ends with data: [DONE]. If stream_options.include_usage is enabled, the API can send an additional usage chunk before the final marker, and that chunk has an empty choices array.

DeepSeek also documents SSE comments such as : keep-alive while a streaming request waits. Non-streaming connections can receive empty keep-alive lines. Custom parsers should ignore these correctly rather than treating them as malformed JSON. The service closes the connection if inference has not started after ten minutes, so use explicit timeouts and prevent duplicate retries while the original request remains open.


### JSON Output

Request JSON with "response_format":{"type":"json_object"}. You must also include the word “json” in a system or user message, describe the required structure, and set a sufficient max_tokens value. JSON Output aims to return valid JSON; it does not enforce a complete JSON Schema or your application’s business rules.

Always parse and validate the response. Handle empty content, truncated JSON when finish_reason is length, missing fields, unexpected values, and retryable transport failures. See DeepSeek JSON Output for prompts, parsing, validation, and troubleshooting without duplicating that implementation here.


### Tool Calls and Function Calling

DeepSeek documents function tools through tools and tool_choice. The model can request a function by returning its name and generated JSON arguments, but it does not execute that function. Your application must validate the name, schema, arguments, authorization, and user permissions before calling a database, payment service, shell, file system, or internal API.

The API reference supports up to 128 function definitions, and tool_choice can be none, auto, required, or a named function. Strict Tool Calls are a beta feature that uses the beta base URL and additional schema constraints. The DeepSeek Tool Calls guide covers the complete tool loop and safe argument validation.


### Multi-Turn Conversations and Context Caching

The Chat Completions interface is stateless at the conversation level: your application must resend the required message history with each turn. If thinking mode produces a tool call, DeepSeek requires the associated reasoning_content to be passed back in subsequent requests; omitting it can produce HTTP 400. Store only the conversation history your application needs, and trim or summarize older turns when appropriate.

DeepSeek context caching is disk-based, enabled automatically, and requires no request change. Later requests with matching cached prefixes may produce cache hits, reported through prompt_cache_hit_tokens and prompt_cache_miss_tokens. Caching is best effort, takes time to build, and does not return a previously generated answer; the model performs inference for each request.

Stateless conversation handling does not mean zero data retention. DeepSeek documents automatic disk caching, and its privacy and Open Platform terms govern data processing. Do not send credentials, secrets, or unnecessary personal or sensitive data. Review the DeepSeek data privacy checklist before processing end-user information.


### Beta Features: Chat Prefix, FIM, and Strict Tools


Feature | Interface | Important requirement
Chat Prefix Completion Beta | POST /chat/completions through the beta base URL | The final message must use the assistant role with prefix: true
FIM Completion Beta | POST /completions through the beta base URL | Non-thinking mode; listed maximum output is 4K
Strict Tool Calls Beta | Chat Completions through the beta base URL | Set strict: true and follow the documented schema subset

DeepSeek’s Models & Pricing table marks FIM Beta for both V4 entries in non-thinking mode, while the FIM API reference lists only deepseek-v4-pro as an accepted model value. Use Pro in published examples and verify the live FIM reference before deploying Flash. See DeepSeek FIM completion and coding workflows for coding-focused guidance.


### OpenAI and Anthropic API Compatibility

DeepSeek describes its interfaces as compatible with OpenAI and Anthropic API formats through configuration changes. This means compatible SDKs can be pointed at DeepSeek base URLs; it does not mean complete feature parity with either provider. If you are migrating an existing client, follow the guide to use the OpenAI SDK with DeepSeek, then test every field used by your application.

For Anthropic-format calls, use https://api.deepseek.com/anthropic. DeepSeek documents mappings for several Claude-style model names, but unsupported names can be routed to V4 Flash. The compatibility guide states that image blocks, document blocks, citations, MCP tool use/results, and code-execution results are unsupported. Avoid silently sending those content types through this interface.


### DeepSeek API Endpoints


Method | Endpoint | Purpose
POST | /chat/completions | Create a chat-model response from a messages array
POST | /completions through the beta base URL | Use FIM Completion Beta
GET | /models | List model IDs available through the API
GET | /user/balance | Check balance information and whether the account can make requests

Do not infer undocumented embeddings, image, audio, or video endpoints from the existence of separate downloadable DeepSeek research models. Confirm an endpoint in the first-party API reference before building against it.


### Rate Limits, Concurrency, and API Errors

DeepSeek’s public rate-limit documentation presents account-level concurrency rather than a general RPM or TPM table. A request occupies one concurrency slot from submission until the response completes. The verified limits were 2,500 concurrent requests for V4 Flash and 500 for V4 Pro, calculated per account regardless of how many API keys the account uses.


HTTP code | Meaning | First action
400 | Invalid format | Fix the request body or message history
401 | Authentication fails | Check the key and Bearer header
402 | Insufficient balance | Check account balance and billing
422 | Invalid parameters | Compare fields with the API reference
429 | Rate limit reached | Reduce in-flight requests, queue work, and back off
500 | Server error | Retry after a bounded delay
503 | Server overloaded | Retry with backoff and use a fallback for critical paths

Use bounded exponential backoff with jitter for retryable failures and cap the number of attempts. Do not blindly retry authentication, balance, format, or validation errors. Use the DeepSeek API error codes guide for status-specific diagnosis, while DeepSeek API rate limits covers queues, 429 handling, account-level isolation, keep-alive behavior, and production monitoring.


### DeepSeek API Pricing

DeepSeek bills input and output tokens, with different input rates for cache hits and cache misses. Granted balance can exist on an individual account, but the API should not be described as universally free. Use DeepSeek token usage to understand response metrics, then use the dedicated DeepSeek API pricing page for verified rates, cost calculations, and cache-aware examples.


### Production and API-Key Security Checklist

- Store API keys in server-side environment variables or a secrets manager.

- Use deepseek-v4-flash or deepseek-v4-pro; remove the retired legacy aliases from deployable configuration and fallback routes.

- Set explicit connection, read, and overall request timeouts.

- Cap in-flight requests below the account limit and queue overflow work.

- Retry only transient failures with backoff, jitter, and a retry budget.

- Inspect finish_reason, empty content, parsing failures, and mid-stream errors.

- Track input, output, cache-hit, cache-miss, and reasoning-token usage.

- Validate model-generated JSON and tool arguments against application rules.

- Use a non-private user_id when documented isolation behavior is relevant.

- Recheck official model IDs, limits, beta requirements, pricing, and policy terms before a production release.


### Frequently Asked Questions

Use https://api.deepseek.com for OpenAI-format calls and https://api.deepseek.com/anthropic for Anthropic-format calls. Beta features such as Chat Prefix Completion, FIM, and strict Tool Calls use https://api.deepseek.com/beta.

As rechecked on July 28, 2026, DeepSeek’s current first-party documentation and a live GET /models request list deepseek-v4-flash and deepseek-v4-pro. The old aliases are not listed, even though a separate bounded test observed temporary routing to V4 Flash that day. Treat the V4 IDs returned by your own account as the deployable choices.

Not as a permanent or current identity. DeepSeek used deepseek-reasoner as the hosted API alias for R1 and R1-0528 in early 2025, then reused it for the thinking modes of later V3 and V4 releases. The alias is absent from the current first-party model list, so use a current V4 ID for hosted API calls and a specific R1 checkpoint name for open-weight deployments.

DeepSeek documents an OpenAI-compatible API format and shows OpenAI Python and JavaScript clients configured with its base URL. Compatibility does not guarantee support for every OpenAI parameter or feature, so verify each field against DeepSeek’s API reference.

The API uses token-based billing. An account may have granted balance or credits, but that does not create a universal free tier. Check the DeepSeek Platform balance and the verified pricing page before sending production traffic.

Yes. Set stream: true to receive server-sent events. Handle text and reasoning deltas separately, ignore documented keep-alive comments, and stop processing when the stream returns data: [DONE].

No. Stateless means your application must resend conversation history for each turn. It is not a zero-retention statement. DeepSeek documents disk-based context caching and publishes separate privacy and Open Platform terms that must be reviewed before processing user data.

The API reference checked for this guide did not list a first-party embeddings endpoint, and DeepSeek’s Anthropic compatibility guide marks image and document blocks as unsupported. Do not treat separate vision, OCR, or multimodal model repositories as proof of support in api.deepseek.com.


### Primary Sources and Verification

Model IDs, endpoints, request fields, limits, feature behavior, and migration dates were checked against DeepSeek’s first-party API documentation. Privacy and key-handling statements were checked against DeepSeek’s published policies. This guide does not treat third-party SDKs, gateways, or model hosts as evidence of first-party API support.

- DeepSeek Create Chat Completion reference

- DeepSeek List Models reference

- DeepSeek Models & Pricing

- DeepSeek Thinking Mode documentation

- DeepSeek JSON Output documentation

- DeepSeek Tool Calls documentation

- DeepSeek Context Caching documentation

- DeepSeek Anthropic API compatibility guide

- DeepSeek Rate Limit & Isolation

- DeepSeek API Error Codes

- DeepSeek Open Platform Terms of Service

- DeepSeek Privacy Policy

Alias-status note: The official model list and legacy-alias behavior were rechecked on July 28, 2026. The official list contained only the two V4 IDs; compatibility behavior for unlisted names changed between July 25 and July 28. Verify your account and do not depend on an unlisted alias in production.

## 内部链接
- [dated API updates tracker](https://chat-deep.ai/docs/deepseek-api-updates/)
- [guide to get a DeepSeek API key](https://chat-deep.ai/docs/deepseek-api-key/)
- [DeepSeek Node.js and TypeScript](https://chat-deep.ai/docs/deepseek-nodejs-typescript/)
- [DeepSeek Python API guide](https://chat-deep.ai/docs/deepseek-python-sdk/)
- [DeepSeek API models and model-family guide](https://chat-deep.ai/models/)
- [DeepSeek V4 Pro and Flash guide](https://chat-deep.ai/models/deepseek-v4/)
- [DeepSeek Chat Completions API](https://chat-deep.ai/guide/create-chat-completion/)
- [DeepSeek Thinking Mode](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [DeepSeek JSON Output](https://chat-deep.ai/docs/json-output/)
- [DeepSeek Tool Calls](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [DeepSeek context caching](https://chat-deep.ai/docs/deepseek-context-caching/)
- [DeepSeek data privacy checklist](https://chat-deep.ai/privacy-security/deepseek-data-privacy-checklist/)
- [DeepSeek FIM completion and coding workflows](https://chat-deep.ai/guide/deepseek-for-coding/)
- [use the OpenAI SDK with DeepSeek](https://chat-deep.ai/docs/openai-sdk-to-deepseek/)
- [DeepSeek API error codes](https://chat-deep.ai/docs/deepseek-error-codes/)
- [DeepSeek API rate limits](https://chat-deep.ai/docs/api-rate-limits/)
- [DeepSeek token usage](https://chat-deep.ai/docs/deepseek-token-usage/)
- [DeepSeek API pricing](https://chat-deep.ai/pricing/)

## 外部链接
- [official change log](https://api-docs.deepseek.com/updates)
- [Open the official DeepSeek API docs](https://api-docs.deepseek.com/)
- [Create an API key on DeepSeek Platform](https://platform.deepseek.com/api_keys)
- [DeepSeek Create Chat Completion reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek List Models reference](https://api-docs.deepseek.com/api/list-models/)
- [DeepSeek Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek Thinking Mode documentation](https://api-docs.deepseek.com/guides/thinking_mode/)
- [DeepSeek JSON Output documentation](https://api-docs.deepseek.com/guides/json_mode/)
- [DeepSeek Tool Calls documentation](https://api-docs.deepseek.com/guides/tool_calls/)
- [DeepSeek Context Caching documentation](https://api-docs.deepseek.com/guides/kv_cache/)
- [DeepSeek Anthropic API compatibility guide](https://api-docs.deepseek.com/guides/anthropic_api/)
- [DeepSeek Rate Limit & Isolation](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [DeepSeek API Error Codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [DeepSeek Open Platform Terms of Service](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html)
- [DeepSeek Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fapi%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fapi%2F&text=DeepSeek%20API%20Documentation%3A%20Setup%2C%20Models%20and%20Quick%20Start)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fapi%2F&title=DeepSeek%20API%20Documentation%3A%20Setup%2C%20Models%20and%20Quick%20Start)
# DeepSeek Anthropic API Compatibility: Field Mapping

- **URL**: https://chat-deep.ai/docs/deepseek-anthropic-api-compatibility/
- **Published**: 2026-07-21T18:20:45+00:00
- **Modified**: 2026-07-21T18:20:47+00:00
- **Category**: DeepSeek API Docs
- **Word count**: 2757
- **Code blocks**: 5
- **Description**: DeepSeek Anthropic API compatibility lets an Anthropic Messages client call DeepSeek by changing the SDK base URL, API key, and model value—but it is not full

## H1


## H2 目录
- Quick answer
- On this page
- What DeepSeek Anthropic API compatibility means
- Endpoint and authentication
- Node.js: use DeepSeek with the Anthropic SDK
- Python setup
- Anthropic model names mapped to DeepSeek
- HTTP headers and top-level request fields
- Thinking mode: supported fields and caveats
- Tool definitions and tool_choice
- Complete message and content-block mapping
- Use metadata.user_id safely
- Streaming, response fields, and usage data
- Migration checklist: Anthropic Messages to DeepSeek
- Common migration failures
- Frequently asked questions
- Official sources

## 正文
DeepSeek Anthropic API compatibility lets an Anthropic Messages client call DeepSeek by changing the SDK base URL, API key, and model value—but it is not full Claude feature parity. DeepSeek supports core text, system prompts, streaming, thinking, and tool-use fields, while it ignores or rejects several Anthropic-specific fields and content blocks.

Last verified: July 21, 2026. This guide maps every header, top-level request field, tool field, and message content block listed in DeepSeek’s official Anthropic API compatibility guide.

Chat-Deep.ai is an independent guide and is not affiliated with DeepSeek or Anthropic. The examples below were syntax-checked against the documented SDK interfaces. We did not send a live API request because no test API key was used.


### Quick answer

- Base URL: https://api.deepseek.com/anthropic

- Authentication: a DeepSeek API key passed through the Anthropic SDK or the x-api-key header

- Recommended model values: deepseek-v4-pro or deepseek-v4-flash

- Core support: text messages, system prompts, max tokens, stop sequences, streaming, thinking, and core tool use

- Important limitations: image, document, MCP, code-execution, and container-upload content blocks are not supported by this compatibility route

- Ignored fields: include anthropic-version, anthropic-beta, top_k, service_tier, and Anthropic-style cache_control


### On this page

- What compatibility means

- Endpoint and authentication

- Node.js setup

- Python setup

- Model mapping

- Headers and top-level request fields

- Thinking mode

- Tools and tool choice

- Message content blocks

- Metadata and user isolation

- Streaming and response fields

- Migration checklist

- Troubleshooting

- FAQ


### What DeepSeek Anthropic API compatibility means

The compatibility layer accepts the Anthropic Messages API shape at a DeepSeek-hosted base URL. This is useful when an application already depends on Anthropic’s official SDK, request structure, or tool-call conventions. In many text workflows, migration requires only a different client configuration and an explicit DeepSeek model ID.

Compatibility does not mean that DeepSeek runs a Claude model or implements every Anthropic beta feature. Treat the tables below as an allowlist: preserve supported fields, deliberately remove ignored fields, and redesign any workflow that depends on unsupported content blocks. A field or endpoint that is absent from DeepSeek’s published matrix is undocumented for portable use—not compatible by assumption. The published scope covers the Messages workflow; it does not promise Anthropic Batches, Files, token-counting, Admin, or other Anthropic endpoints. For a general platform introduction, see the DeepSeek API overview.


### Endpoint and authentication


Setting | DeepSeek value | Compatibility behavior
SDK base URL | https://api.deepseek.com/anthropic | Documented Anthropic-format route
API key | Your DeepSeek API key | Accepted through the SDK or x-api-key
Messages method | client.messages.create(...) | Uses the Anthropic SDK’s Messages interface
Model | deepseek-v4-pro or deepseek-v4-flash | Explicit DeepSeek IDs avoid silent fallback routing


![deepseek-anthropic-endpoint-model-mapping](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Create a key in DeepSeek’s API platform and keep it server-side. Do not expose it in browser JavaScript, public repositories, screenshots, or WordPress page source. See how to create and protect a DeepSeek API key.


### Node.js: use DeepSeek with the Anthropic SDK

Install Anthropic’s official TypeScript/JavaScript SDK:


```
npm install @anthropic-ai/sdk
```

Set a server-side environment variable named DEEPSEEK_API_KEY, then initialize the SDK with DeepSeek’s base URL:


```
import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  throw new Error("Set DEEPSEEK_API_KEY before starting the app.");
}

const client = new Anthropic({
  apiKey,
  baseURL: "https://api.deepseek.com/anthropic",
});

const message = await client.messages.create({
  model: "deepseek-v4-pro",
  max_tokens: 1024,
  system: "You are a concise technical assistant.",
  messages: [
    {
      role: "user",
      content: "Explain Anthropic model-prefix routing in one paragraph.",
    },
  ],
});

for (const block of message.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}
```

The SDK constructs the Messages request path beneath the configured base URL. Do not append a guessed path to baseURL; use the exact base URL DeepSeek documents.


### Python setup

DeepSeek’s official compatibility page demonstrates the Anthropic Python SDK. Install it with:


```
pip install anthropic
```


```
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com/anthropic",
)

message = client.messages.create(
    model="deepseek-v4-pro",
    max_tokens=1024,
    system="You are a concise technical assistant.",
    messages=[
        {
            "role": "user",
            "content": "Explain Anthropic model-prefix routing in one paragraph.",
        }
    ],
)

print("".join(
    block.text for block in message.content if block.type == "text"
))
```


### Anthropic model names mapped to DeepSeek

DeepSeek accepts its own model IDs and also maps documented Claude-style prefixes. These prefixes are routing aliases; they do not mean that the endpoint serves Claude or promises Claude feature parity.


Model value sent by the client | DeepSeek route | Recommendation
deepseek-v4-pro | deepseek-v4-pro | Use explicitly for the Pro route
deepseek-v4-flash | deepseek-v4-flash | Use explicitly for the Flash route
Starts with claude-opus | deepseek-v4-pro | Compatibility alias only
Starts with claude-sonnet | deepseek-v4-flash | Compatibility alias only
Starts with claude-haiku | deepseek-v4-flash | Compatibility alias only
Other unsupported model name | deepseek-v4-flash | Avoid relying on this automatic fallback

Migration rule: replace provider-specific model strings with an explicit DeepSeek model ID in production. Silent fallback can hide a typo or route traffic to a different performance tier than intended.


### HTTP headers and top-level request fields


#### Header mapping


Anthropic header | DeepSeek status | What to do
x-api-key | Fully supported | Send a DeepSeek API key
anthropic-version | Ignored | Do not depend on it for version negotiation
anthropic-beta | Ignored | Do not assume Anthropic beta features become available


#### Complete top-level request-field mapping


Field | Status | DeepSeek behavior
model | Mapped | Use a DeepSeek model ID; documented Claude prefixes are routed as shown above
messages | Supported | Use Anthropic user/assistant messages and only the supported content blocks listed below
max_tokens | Fully supported | Sets the maximum output-token allowance
container | Ignored | Container state is not applied
mcp_servers | Ignored | MCP server configuration is not forwarded
metadata | Partially supported | Only metadata.user_id is supported; other keys are ignored
service_tier | Ignored | Does not select a DeepSeek service tier
stop_sequences | Fully supported | Accepted as stop sequences
stream | Fully supported | Streaming can be requested
system | Fully supported | Accepted as the top-level system instruction; do not convert it to an OpenAI-style system message
temperature | Fully supported outside thinking mode | Accepted range is 0–2; it is silently ignored while thinking is enabled
thinking | Partially supported | type: "enabled" and type: "disabled" are supported, but budget_tokens is ignored
output_config | Partially supported | Only output_config.effort is supported
top_k | Ignored | Does not affect generation
top_p | Fully supported outside thinking mode | Accepted, but silently ignored while thinking is enabled


![DeepSeek Anthropic API request field support matrix](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

Original visual summary of fully supported, partially supported, and ignored Anthropic request fields. Based on DeepSeek’s compatibility table and Thinking Mode guide; verified July 21, 2026.

Ignored is different from unsupported. An ignored field may be accepted without changing behavior, which can be more difficult to detect than a validation error. Remove ignored Anthropic fields during migration so the application does not imply controls that DeepSeek is not applying.


### Thinking mode: supported fields and caveats

DeepSeek’s Anthropic-format route supports thinking content, but it does not use Anthropic’s thinking.budget_tokens as a reasoning-token budget. DeepSeek’s separate Thinking Mode documentation says thinking is enabled by default for the documented V4 models and uses output_config.effort for effort control. If your application needs temperature or top_p to influence generation, explicitly send thinking: { type: "disabled" }.


Setting | Behavior
thinking | Supported
thinking.budget_tokens | Ignored
output_config.effort | Supported
effort: "low" or "medium" | Mapped to DeepSeek’s high effort
effort: "xhigh" | Mapped to DeepSeek’s max effort
temperature and top_p | Accepted but have no effect while thinking is enabled

If reasoning controls are central to your application, read the dedicated DeepSeek Thinking Mode guide and test both the final text and thinking blocks your parser expects.


### Tool definitions and tool_choice


#### Tool definition fields


Field | Status | Notes
tools[].name | Fully supported | Tool name is preserved
tools[].input_schema | Fully supported | JSON Schema input definition is preserved
tools[].description | Fully supported | Tool description is preserved
tools[].cache_control | Ignored | Does not enable Anthropic-style manual prompt caching


#### tool_choice mapping


Choice type | Status | Limitation
none | Fully supported | No documented subfield exception
auto | Supported | disable_parallel_tool_use is ignored
any | Supported | disable_parallel_tool_use is ignored
tool | Supported | disable_parallel_tool_use is ignored

Core function-style tool calls can migrate cleanly when your application owns tool execution. Do not assume that a supported content block also provides Anthropic-managed web search, code execution, or MCP infrastructure. See the implementation-focused DeepSeek Tool Calls guide.

Thinking-mode tool loop: preserve the assistant’s complete returned content array—including thinking, any opaque signature data, and tool_use—then send it back unchanged before the user’s tool_result. DeepSeek warns that omitting the prior reasoning after a thinking-mode tool call can produce an HTTP 400 response. Do not reconstruct or edit opaque thinking data.


### Complete message and content-block mapping

The following table mirrors the message-field scope published by DeepSeek. “Not supported” applies to this Anthropic-compatible API route, not necessarily to every DeepSeek product or interface.


Message field or block | Status | Supported or ignored subfields
content: "plain string" | Fully supported | String content is accepted
type: "text" | Partially supported | text supported; cache_control and citations ignored
type: "image" | Not supported | Replace with a text-only workflow or a separately supported interface
type: "document" | Not supported | Extract permitted text before sending, subject to your security rules
type: "search_result" | Not supported | Do not confuse it with web_search_tool_result
type: "thinking" | Supported | Do not assume budget_tokens controls its length
type: "redacted_thinking" | Not supported | Remove any dependency on this block
type: "tool_use" | Partially supported | id, input, and name supported; cache_control ignored
type: "tool_result" | Partially supported | tool_use_id and content supported; cache_control and is_error ignored
type: "server_tool_use" | Supported | Block support does not prove parity with every managed tool
type: "web_search_tool_result" | Supported | Does not by itself mean DeepSeek supplies Anthropic’s hosted web-search tool
type: "code_execution_tool_result" | Not supported | Use application-owned execution and return a supported tool result when appropriate
type: "mcp_tool_use" | Not supported | MCP blocks cannot be forwarded as-is
type: "mcp_tool_result" | Not supported | MCP blocks cannot be forwarded as-is
type: "container_upload" | Not supported | Container uploads are outside the documented compatibility scope


![deepseek-anthropic-message-tool-compatibility](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### Use metadata.user_id safely

metadata.user_id is the only supported metadata key. DeepSeek documents it as an isolation signal used for content safety, KV-cache isolation, and request scheduling. It must match [a-zA-Z0-9\-_]+, contain no more than 512 characters, and must not include private information.


```
const message = await client.messages.create({
  model: "deepseek-v4-pro",
  max_tokens: 512,
  metadata: {
    user_id: "tenant_42_user_1087",
  },
  messages: [
    { role: "user", content: "Summarize this deployment note." },
  ],
});
```

Use an opaque internal identifier—not an email address, phone number, customer name, access token, or raw database record. Other keys placed inside metadata are ignored by this compatibility layer.


### Streaming, response fields, and usage data

DeepSeek marks the top-level stream request field as fully supported. However, its Anthropic compatibility page does not publish a complete event-by-event streaming matrix or a field-by-field response and usage schema. Do not infer undocumented parity from the request table.


#### Portable response core

The official SDK example receives a standard Anthropic Message object. The safest portable core is id, type, role, model, content, stop_reason, stop_sequence, and usage. Limit content parsing to documented block types, and do not promise newer Anthropic stop reasons or response fields that DeepSeek has not listed.


Response area | Safe handling rule
content[] | Handle documented text, thinking, tool_use, server_tool_use, and web_search_tool_result blocks
stop_reason | Handle core end, token-limit, stop-sequence, and tool-use outcomes; log unknown values
usage.input_tokens | Read defensively from the standard message usage object
usage.output_tokens | Read defensively from the standard message usage object
Cache-specific usage fields | Inspect the raw object; DeepSeek does not publish an Anthropic-endpoint name mapping

Anthropic’s SDK types include cache_creation_input_tokens and cache_read_input_tokens, while DeepSeek’s general cache documentation uses prompt_cache_hit_tokens and prompt_cache_miss_tokens. DeepSeek does not document a guaranteed translation between those names on the Anthropic route. Log the raw usage object before building billing or cache analytics around cache-specific keys.

- Record the event types and content-block deltas your SDK receives in a non-production test.

- Verify your parser handles text, thinking, tool-use, stop reason, and error paths actually used by your application.

- Log usage keys defensively and tolerate fields being absent.

- Re-run contract tests after upgrading the Anthropic SDK or changing the DeepSeek model.

A direct SSE parser must also ignore comment lines such as : keep-alive. DeepSeek documents that streaming connections may emit these comments during waits; non-streaming connections may receive blank lines. If inference has not begun after ten minutes, DeepSeek may close the connection.

If your application depends on cache-hit token accounting, do not map Anthropic cache fields by name without observing a real DeepSeek response. DeepSeek’s request-side cache_control fields are ignored, while DeepSeek context caching is a separate platform behavior explained in the DeepSeek Context Caching guide.


### Migration checklist: Anthropic Messages to DeepSeek

- Change the base URL to https://api.deepseek.com/anthropic.

- Use a DeepSeek API key; do not reuse an Anthropic credential.

- Set an explicit DeepSeek model ID instead of relying on Claude-prefix mapping or Flash fallback.

- Remove ignored headers and fields so configuration does not imply behavior that is not applied.

- Replace unsupported content blocks, especially image, document, MCP, code-execution, and container-upload blocks.

- Review thinking controls: remove dependence on budget_tokens and use documented output_config.effort behavior.

- Review tool execution: keep application-owned tools, but do not expect cache_control, is_error, or disable_parallel_tool_use to work.

- Sanitize metadata.user_id and remove all private data.

- Contract-test streaming and responses because DeepSeek does not publish a complete event-level mapping on this compatibility page.

- Monitor routing and errors before moving production traffic.

If the application uses the OpenAI client rather than Anthropic’s SDK, follow the separate OpenAI SDK integration. For IDE-agent configuration, see how to use DeepSeek with Claude Code.


### Common migration failures


HTTP status | DeepSeek meaning
400 | Invalid request format
401 | Authentication failure
402 | Insufficient balance
422 | Invalid parameters
429 | Rate or concurrency limit
500 | Server error
503 | Server overloaded


Symptom | Likely cause | Check
Authentication error | Anthropic key used against DeepSeek, missing key, or server environment not loaded | Confirm the client receives a DeepSeek API key and the base URL is exact
Unexpected Flash behavior | Unsupported or misspelled model value triggered automatic fallback | Send deepseek-v4-pro or deepseek-v4-flash explicitly
A setting appears to do nothing | The field is ignored, or thinking mode makes sampling controls ineffective | Compare the payload with the tables above
Image or document request fails | Those Anthropic content blocks are not supported on this route | Remove the block and use a supported text workflow
MCP configuration is missing | mcp_servers is ignored and MCP content blocks are unsupported | Run MCP outside this endpoint and translate results into supported tool content
Parallel-tool policy is not enforced | disable_parallel_tool_use is ignored | Enforce sequencing in application code
Tool error flag has no effect | tool_result.is_error is ignored | Encode the outcome in supported tool-result content and application state
Streaming parser breaks | The client assumes undocumented event parity | Capture actual test events and update contract tests

For status codes, retry behavior, and diagnostic steps, use the DeepSeek API errors guide.


### Frequently asked questions


#### Is the DeepSeek Anthropic API a drop-in replacement for Anthropic?

No. It preserves the Anthropic Messages shape for many core text and tool workflows, but several fields are ignored and multiple Anthropic content blocks are unsupported. Use the mapping tables as an allowlist and run contract tests before production migration.


#### What is the DeepSeek Anthropic base URL?

The documented base URL is https://api.deepseek.com/anthropic.


#### Can I use Anthropic’s official SDK with DeepSeek?

Yes. Configure the SDK with a DeepSeek API key, DeepSeek’s Anthropic-format base URL, and an explicit DeepSeek model ID. The Node.js and Python examples above show the client setup.


#### Which Claude model names map to DeepSeek?

Model values starting with claude-opus map to deepseek-v4-pro. Values starting with claude-sonnet or claude-haiku map to deepseek-v4-flash. These are routing aliases, not equivalent Claude models.


#### Does DeepSeek support Anthropic image and document blocks?

Not through the content-block compatibility table documented for this route. Both image and document are marked not supported.


#### Does thinking.budget_tokens limit DeepSeek reasoning?

No. DeepSeek marks budget_tokens as ignored. The documented Anthropic-format control is output_config.effort, and its values are mapped to DeepSeek’s effort levels.


#### Does cache_control enable prompt caching?

No. DeepSeek marks Anthropic-style cache_control fields as ignored on tool and message content. Do not use their presence as evidence of a cache write or cache hit.


#### Are web search and MCP fully compatible?

No. web_search_tool_result is listed as a supported content block, but that does not establish parity with Anthropic’s managed web-search tool. mcp_servers is ignored, and mcp_tool_use and mcp_tool_result blocks are not supported.


### Official sources

- DeepSeek: Anthropic API compatibility guide

- DeepSeek: Thinking Mode guide

- DeepSeek: Rate Limit and User ID Isolation

- DeepSeek: Context Caching guide

- DeepSeek: API error codes

- Anthropic: official TypeScript SDK repository

- Anthropic: official Python SDK repository

For cost planning after compatibility testing, review DeepSeek API pricing.

## 内部链接
- [DeepSeek API overview](https://chat-deep.ai/docs/api/)
- [create and protect a DeepSeek API key](https://chat-deep.ai/docs/deepseek-api-key/)
- [DeepSeek Thinking Mode guide](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [DeepSeek Tool Calls guide](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [DeepSeek Context Caching guide](https://chat-deep.ai/docs/deepseek-context-caching/)
- [OpenAI SDK integration](https://chat-deep.ai/docs/openai-sdk-to-deepseek/)
- [use DeepSeek with Claude Code](https://chat-deep.ai/guide/deepseek-for-coding/)
- [DeepSeek API errors guide](https://chat-deep.ai/docs/deepseek-error-codes/)
- [DeepSeek API pricing](https://chat-deep.ai/pricing/)

## 外部链接
- [Anthropic API compatibility guide](https://api-docs.deepseek.com/guides/anthropic_api/)
- [DeepSeek API Docs](https://api-docs.deepseek.com/guides/anthropic_api/)
- [compatibility table](https://api-docs.deepseek.com/guides/anthropic_api/)
- [Thinking Mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [DeepSeek’s official compatibility table](https://api-docs.deepseek.com/guides/anthropic_api/)
- [DeepSeek: Anthropic API compatibility guide](https://api-docs.deepseek.com/guides/anthropic_api/)
- [DeepSeek: Thinking Mode guide](https://api-docs.deepseek.com/guides/thinking_mode/)
- [DeepSeek: Rate Limit and User ID Isolation](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [DeepSeek: Context Caching guide](https://api-docs.deepseek.com/guides/kv_cache/)
- [DeepSeek: API error codes](https://api-docs.deepseek.com/quick_start/error_codes/)
- [Anthropic: official TypeScript SDK repository](https://github.com/anthropics/anthropic-sdk-typescript)
- [Anthropic: official Python SDK repository](https://github.com/anthropics/anthropic-sdk-python)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-anthropic-api-compatibility%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-anthropic-api-compatibility%2F&text=DeepSeek%20Anthropic%20API%20Compatibility%3A%20Complete%20Field%20Mapping)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fdocs%2Fdeepseek-anthropic-api-compatibility%2F&title=DeepSeek%20Anthropic%20API%20Compatibility%3A%20Complete%20Field%20Mapping)
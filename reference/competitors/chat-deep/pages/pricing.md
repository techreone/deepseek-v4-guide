# DeepSeek Pricing: V4 Flash & V4 Pro API Costs (2026)

- **URL**: https://chat-deep.ai/pricing/
- **Published**: 2025-08-31T22:40:30+00:00
- **Modified**: 2026-07-29T11:56:00+00:00
- **Category**: 
- **Word count**: 2913
- **Code blocks**: 0
- **Description**: Compare DeepSeek V4 Flash and V4 Pro pricing per 1M tokens, including cache-hit, cache-miss, and output costs. Includes examples and a cost calculator.

## H1
DeepSeek Pricing 2026: Free Chat, API Costs, V4 Flash & V4 Pro Rates

## H2 目录
- Is DeepSeek Free?
- DeepSeek Free Chat vs DeepSeek API Pricing
- DeepSeek API Pricing by Model
- DeepSeek Price per 1K Tokens
- How DeepSeek API Billing Works
- Cache Hit vs Cache Miss Pricing
- DeepSeek V4 Flash vs V4 Pro: Which Should You Choose?
- Current DeepSeek API Model Details
- Legacy Compatibility Aliases (Historical)
- DeepSeek API Cost Examples
- API Pricing vs Chat-Deep.ai Browser Chat
- How We Verify DeepSeek Pricing
- DeepSeek Pricing FAQ
- Recommended Next Pages

## 正文
Quick answer: DeepSeek pricing has two different meanings. The official DeepSeek web and app chat experience is free to access, while the official DeepSeek API is usage-based and billed by tokens. Current official API models are deepseek-v4-flash and deepseek-v4-pro. API input tokens are split into cheaper cache-hit input and higher cache-miss input, while generated responses are billed as output tokens. As of July 29, 2026, DeepSeek lists V4 Flash at $0.0028 cache-hit input, $0.14 cache-miss input, and $0.28 output per 1M tokens. V4 Pro is listed at $0.003625 cache-hit input, $0.435 cache-miss input, and $0.87 output per 1M tokens. Always verify production budgets against the official DeepSeek Models & Pricing page.

Last verified by Chat-Deep.ai: July 29, 2026.

Independent note: Chat-Deep.ai is an independent website and is not affiliated with, endorsed by, or operated by DeepSeek. Chat-Deep.ai does not sell official DeepSeek API keys, credits, or billing plans. Official DeepSeek API prices can change, so always verify the latest public rates on the official DeepSeek pricing page before making production billing decisions.


### Is DeepSeek Free?

Yes, the official DeepSeek web and app chat experience is free to access. That free chat experience is separate from the official DeepSeek API pricing used by developers. If you are using DeepSeek in a browser or the official app for personal chat, you are not estimating the same cost model as a production API integration.

The official DeepSeek API is different: it is usage-based and billed by tokens. Developers pay based on the model selected, cache-hit input tokens, cache-miss input tokens, and output tokens. Do not assume that free DeepSeek chat access means free API usage for apps, agents, RAG systems, coding tools, or backend automations.


### DeepSeek Free Chat vs DeepSeek API Pricing

The table below separates the main pricing meanings users often confuse when searching for DeepSeek Pricing.


Experience | Pricing model | Best for | Important note
Official DeepSeek web/app chat | Free access | Personal use, testing DeepSeek, casual chat, writing help, and research. | Use the official DeepSeek website or app for the official consumer chat experience.
Official DeepSeek API | Usage-based token billing | Developers building apps, chatbots, AI agents, coding tools, RAG systems, and production workflows. | API cost depends on model, input tokens, cache hits, cache misses, and output tokens.
Chat-Deep.ai browser experience and guides | Independent website experience | Users who want browser-based DeepSeek-related guides, examples, and tools. | Chat-Deep.ai is independent and does not sell official DeepSeek API keys or billing plans.


### DeepSeek API Pricing by Model

The official DeepSeek API pricing table is listed per 1 million tokens. Current official V4 API models are deepseek-v4-flash and deepseek-v4-pro. The API charges different rates for cache-hit input, cache-miss input, and output tokens.


Model | Cache-hit input / 1M tokens | Cache-miss input / 1M tokens | Output / 1M tokens | Context / notes | Best for
deepseek-v4-flash | $0.0028 | $0.14 | $0.28 | 1M-token context length; maximum output 384K tokens; lower-cost V4 option. | High-volume chat, summarization, extraction, classification, routine coding help, lightweight agents, and cost-sensitive workloads.
deepseek-v4-pro | $0.003625 | $0.435 | $0.87 | 1M-token context length; maximum output 384K tokens; higher-cost V4 option. | Harder reasoning, complex coding, long-context analysis, agentic workflows, and higher-value production tasks.

Pricing was checked against the official DeepSeek Models & Pricing page on July 29, 2026. DeepSeek states that product prices may vary, so confirm the official page before production use.

Check the official DeepSeek Models & Pricing page for the latest public API rates.


### DeepSeek Price per 1K Tokens

DeepSeek lists API prices per 1M tokens, but many developers estimate usage per 1K tokens or per request. To convert a DeepSeek price per 1M tokens into a price per 1K tokens, divide the official rate by 1,000.


Model | Cache-hit input / 1K | Cache-miss input / 1K | Output / 1K | 1K cache-miss input + 500 output | 10K cache-miss input + 1K output | 50K cache-miss input + 5K output
deepseek-v4-flash | $0.0000028 | $0.00014 | $0.00028 | ~$0.00028 | ~$0.00168 | ~$0.0084
deepseek-v4-pro | $0.000003625 | $0.000435 | $0.00087 | ~$0.00087 | ~$0.00522 | ~$0.0261

These examples assume 0% cache hit for the input portion. Real usage can be cheaper when a meaningful share of the input receives cache-hit pricing.


### How DeepSeek API Billing Works

DeepSeek API billing is token-based, not a fixed price per request. A short request with a short answer costs less than a long request with a long answer. A request with a high cache-hit share can also cost less than one where every input token is processed as a cache miss.


Billing line | What it means | Why it matters
Input tokens, cache hit | Input tokens served from DeepSeek context caching at the lower cache-hit price. | Repeated or reusable prefixes can reduce API costs when they receive cache-hit pricing.
Input tokens, cache miss | Input tokens that require fresh processing and are billed at the higher cache-miss input price. | New prompts, changed prefixes, and uncached context usually increase input cost.
Output tokens | Tokens generated by the model in the response and billed at the selected model’s output rate. | Longer answers cost more, so output limits are important for budget control.

DeepSeek states that API expenses are deducted from topped-up balance or granted balance, with granted balance used first when both are available. For production planning, review the official rates, then use the DeepSeek API guide for integration details and model selection.


### Cache Hit vs Cache Miss Pricing

DeepSeek context caching is enabled by default. A cache hit happens when a later request can reuse a persisted matching prefix from earlier requests. A cache miss happens when the input cannot be served from an already persisted matching prefix and requires fresh processing.

Do not assume every repeated prompt receives cache-hit pricing. DeepSeek describes context caching as best-effort, and cache hits depend on matching persisted prefixes. For accurate billing analysis, track prompt_cache_hit_tokens and prompt_cache_miss_tokens in the API response.


Usage field | Meaning | Cost impact
prompt_cache_hit_tokens | The number of input tokens that received cache-hit treatment. | These tokens are billed at the lower cache-hit input rate.
prompt_cache_miss_tokens | The number of input tokens that did not hit the cache. | These tokens are billed at the higher cache-miss input rate.
completion_tokens | The number of generated output tokens. | These tokens are billed at the model’s output-token rate.


#### When cache-hit pricing can help

- Multi-round conversations with a stable history prefix.

- Repeated system prompts that stay at the beginning of the request.

- Long static documents reused across several questions.

- RAG or chatbot workflows where the same context prefix is reused.

- Batch analysis where multiple requests share a stable instruction and document prefix.


#### When cache-hit pricing may not help

- Every request uses a completely new prompt or document.

- The reusable content changes position or no longer fully matches a persisted prefix.

- The workload has low repetition and few overlapping prefixes.

- You rely on cache-hit assumptions instead of measuring actual usage fields.


### DeepSeek V4 Flash vs V4 Pro: Which Should You Choose?

Choose deepseek-v4-flash when speed and cost efficiency matter most. It is the better default for everyday chat, routine summarization, extraction, classification, lightweight coding help, high-volume support bots, and cost-sensitive API workloads.

Choose deepseek-v4-pro when the task needs stronger reasoning, more careful coding output, complex technical analysis, or higher-value agentic workflows. V4 Pro costs more than V4 Flash across cache-hit input, cache-miss input, and output tokens, so it is usually best reserved for tasks where quality matters more than the lowest token price.


Use case | Recommended starting model | Reason
High-volume chatbot | deepseek-v4-flash | Lower input and output token costs make it better for scale.
Summarization or extraction | deepseek-v4-flash | Usually cost-sensitive and repeatable, especially with long shared context.
Complex coding task | deepseek-v4-pro | Better fit when reasoning quality matters more than minimum cost.
Agentic workflow | deepseek-v4-pro | Useful for multi-step tasks where mistakes can be more expensive than token usage.
Budget testing | deepseek-v4-flash | Start with the cheaper model, then route only harder tasks to V4 Pro.


### Current DeepSeek API Model Details

The current official DeepSeek V4 API models listed on the Models & Pricing page are deepseek-v4-flash and deepseek-v4-pro. Both are listed with OpenAI-compatible and Anthropic-compatible API formats, support thinking and non-thinking modes, and have a 1M-token context length with a maximum output of 384K tokens.


Feature | deepseek-v4-flash | deepseek-v4-pro
Model version | DeepSeek-V4-Flash | DeepSeek-V4-Pro
OpenAI-compatible base URL | https://api.deepseek.com | https://api.deepseek.com
Anthropic-compatible base URL | https://api.deepseek.com/anthropic | https://api.deepseek.com/anthropic
Context length | 1M tokens | 1M tokens
Maximum output | 384K tokens | 384K tokens
Thinking mode | Supported | Supported
Non-thinking mode | Supported | Supported
JSON Output | Supported | Supported
Tool Calls | Supported | Supported
Chat Prefix Completion | Supported, beta | Supported, beta
FIM Completion | Supported in non-thinking mode only, beta | Supported in non-thinking mode only, beta
Concurrency limit | 2500 | 500


### Legacy Compatibility Aliases (Historical)

The older model names deepseek-chat and deepseek-reasoner were legacy compatibility aliases. Before the announced retirement cutoff, DeepSeek mapped deepseek-chat to the non-thinking mode of deepseek-v4-flash and deepseek-reasoner to its thinking mode. Those mappings are historical migration context, not current documented model IDs.

Alias status (verified July 29, 2026): DeepSeek’s retirement date has passed, and the current official model list contains only deepseek-v4-flash and deepseek-v4-pro. Chat-Deep.ai observed the old aliases return HTTP 400 on July 25, then return HTTP 200 and route to V4 Flash in a bounded July 28 retest. That changing compatibility behavior does not create a separate model or pricing tier and is not a production guarantee. Price and budget against a documented V4 ID, set thinking mode explicitly, and see the dated DeepSeek API updates tracker for the test evidence.


Legacy name | Historical pre-cutoff mapping | Behavior-preserving replacement
deepseek-chat | deepseek-v4-flash non-thinking mode. | deepseek-v4-flash with thinking disabled.
deepseek-reasoner | deepseek-v4-flash thinking mode. | deepseek-v4-flash with thinking enabled.


### DeepSeek API Cost Examples

These examples are simplified estimates using the official API rates verified on July 29, 2026. They exclude taxes, retries, extra infrastructure costs, and any future price changes. Actual cost depends on cache ratio, output length, model choice, and real token usage returned by the API.


Scenario | Model | Token usage | Cache assumption | Estimated API cost
Simple chatbot reply | deepseek-v4-flash | 1,000 input + 500 output | 0% cache hit | ~$0.00028 per request
Simple higher-quality reply | deepseek-v4-pro | 1,000 input + 500 output | 0% cache hit | ~$0.00087 per request
Long document summary | deepseek-v4-flash | 50,000 input + 5,000 output | 0% cache hit | ~$0.0084 per request
Complex coding assistant request | deepseek-v4-pro | 20,000 input + 5,000 output | 0% cache hit | ~$0.01305 per request
Cached repeated prompt | deepseek-v4-flash | 100,000 cache-hit input + 5,000 output | 100% cache hit input | ~$0.00168 per request
Cached high-value analysis | deepseek-v4-pro | 100,000 cache-hit input + 5,000 output | 100% cache hit input | ~$0.0047125 per request
High-volume support bot | deepseek-v4-flash | 1,000 input + 500 output × 1,000 requests/day × 30 days | 0% cache hit | ~$8.40 per month

For precise billing analysis, use the token usage fields returned by the API instead of estimating cache hits manually. For quick budgeting, use the calculator above or the dedicated DeepSeek API cost calculator.


### API Pricing vs Chat-Deep.ai Browser Chat

This page covers the difference between free official DeepSeek chat access and official DeepSeek API billing. It does not describe a paid Chat-Deep.ai subscription plan, and it does not sell official DeepSeek API credits.

Chat-Deep.ai offers a browser-based DeepSeek-related experience, guides, examples, and pricing explainers. That is different from official DeepSeek API usage, where developers use the official DeepSeek Platform for API keys, billing, balance, and production settings.


Topic | Use Chat-Deep.ai | Use official DeepSeek API
Quick browser workflow | Use DeepSeek Chat online for a simple browser workflow. | Not required unless you are building an app or integration.
API keys and billing | Chat-Deep.ai does not sell official DeepSeek API keys, credits, or billing plans. | Use the official DeepSeek Platform for API keys, balance, usage, and billing.
Production applications | Use our API guide to understand workflows, terminology, and model choices. | Use official DeepSeek API docs and official pricing for production decisions.


### How We Verify DeepSeek Pricing

We verify DeepSeek API rates against the official DeepSeek Models & Pricing page, then convert the official per-1M-token rates into per-1K-token and example request estimates. We separate cache-hit input, cache-miss input, and output tokens because DeepSeek bills them at different rates.

We also check DeepSeek’s official token usage, context caching, rate limit, and FAQ documentation when explaining billing behavior. Because DeepSeek says product prices may vary, this page should be rechecked before using the numbers for production budgeting.


Source | Used for
Official DeepSeek Models & Pricing | Current model names, API rates, context length, max output, and concurrency limits.
Official DeepSeek V4 Release Notice | Historical alias mappings and the announced July 24, 2026 retirement cutoff.
Official DeepSeek Token & Token Usage | Token billing terminology and usage measurement.
Official DeepSeek Context Caching | Cache-hit rules, cache-miss behavior, and usage fields.
Official DeepSeek Rate Limit & Isolation | Concurrency limits and request behavior.
Official DeepSeek website | Free official DeepSeek web/app access and official product links.


#### Pricing Update Log


Date | Update
July 29, 2026 | Rechecked the official DeepSeek Models & Pricing page, confirmed that the displayed V4 Flash and V4 Pro rates were unchanged, and synchronized the verification notes.
July 10, 2026 | Updated the page into a broader DeepSeek Pricing hub, removed expired V4 Pro promotion wording, verified official V4 Flash and V4 Pro API rates, added per-1K conversions, calculator, free chat comparison, improved FAQ, and schema.
April 26, 2026 | Previous page version focused mainly on DeepSeek API pricing, V4 models, cache-hit/cache-miss pricing, and legacy model names.


### DeepSeek Pricing FAQ


#### Is DeepSeek free?

DeepSeek’s official web and app chat experience is free to access. That is separate from the official DeepSeek API, which is usage-based and billed by tokens.


#### How much does DeepSeek API cost?

DeepSeek API pricing is listed per 1 million tokens. As of July 29, 2026, deepseek-v4-flash is listed at $0.0028 per 1M cache-hit input tokens, $0.14 per 1M cache-miss input tokens, and $0.28 per 1M output tokens. deepseek-v4-pro is listed at $0.003625 per 1M cache-hit input tokens, $0.435 per 1M cache-miss input tokens, and $0.87 per 1M output tokens.


#### Is DeepSeek API free?

No. Official DeepSeek API usage is not the same as free web chat. API usage is billed by input and output tokens. Some accounts may have granted balance shown in the official platform, but production budgets should use the official pricing page.


#### Does DeepSeek charge per request or per token?

DeepSeek API billing is token-based, not fixed per request. Each request cost depends on cache-hit input tokens, cache-miss input tokens, and output tokens.


#### What is DeepSeek pricing per 1M tokens?

Current official DeepSeek API pricing per 1M tokens is split by model and token type. V4 Flash is $0.0028 cache-hit input, $0.14 cache-miss input, and $0.28 output. V4 Pro is $0.003625 cache-hit input, $0.435 cache-miss input, and $0.87 output.


#### What is DeepSeek pricing per 1K tokens?

Divide the official per-1M-token rate by 1,000. For example, V4 Flash cache-miss input is $0.00014 per 1K tokens and output is $0.00028 per 1K tokens. V4 Pro cache-miss input is $0.000435 per 1K tokens and output is $0.00087 per 1K tokens.


#### What is the cheapest current DeepSeek API model?

deepseek-v4-flash is the lower-cost current DeepSeek V4 API model across cache-hit input, cache-miss input, and output token pricing. It is usually the best starting point for cost-sensitive applications and high-volume workloads.


#### What is the difference between V4 Flash and V4 Pro pricing?

V4 Flash is cheaper and better for high-volume everyday tasks. V4 Pro costs more and is better suited for harder reasoning, coding, long-context analysis, and agentic workflows where quality matters more than the lowest token price.


#### What is cache-hit pricing?

Cache-hit pricing applies to input tokens that DeepSeek can serve from context caching because the relevant prefix is already persisted and matched. Cache-hit input tokens are much cheaper than cache-miss input tokens.


#### What is cache-miss pricing?

Cache-miss pricing applies to input tokens that require fresh processing. It is higher than cache-hit pricing, while output tokens are billed separately at the selected model’s output rate.


#### Are repeated prompts always billed at cache-hit pricing?

No. DeepSeek context caching works on a best-effort basis and depends on persisted matching prefixes. Track prompt_cache_hit_tokens and prompt_cache_miss_tokens in the API response to understand the real split for each request.


#### How can I reduce DeepSeek API costs?

Use V4 Flash when appropriate, keep reusable context at the beginning of prompts, reuse stable system prompts or long documents to improve cache hits, cap maximum output length, and monitor prompt_cache_hit_tokens and prompt_cache_miss_tokens.


#### Are deepseek-chat and deepseek-reasoner still supported?

The two names are no longer listed by GET /models or as separate pricing rows. Although a bounded July 28 test observed them route to V4 Flash after returning HTTP 400 on July 25, that is unlisted and unstable compatibility behavior. Do not use the old aliases in new code, production fallbacks, or cost models; use deepseek-v4-flash or deepseek-v4-pro and verify your own account.


#### Where can I verify official DeepSeek pricing?

Use the official DeepSeek Models & Pricing page. That page is the source of truth for current public API rates. Chat-Deep.ai is independent and does not control official DeepSeek API pricing.


#### Is Chat-Deep.ai affiliated with DeepSeek?

No. Chat-Deep.ai is independent and is not affiliated with, endorsed by, or operated by DeepSeek. It does not sell official DeepSeek API keys, credits, or billing plans.


### Recommended Next Pages

DeepSeek Chat Online — use Chat-Deep.ai’s browser chat experience.

DeepSeek API Cost Calculator — estimate per-request, daily, monthly, and yearly costs.

DeepSeek API Guide — learn setup, API calls, model selection, and examples.

DeepSeek Context Caching — understand cache hits, cache misses, and prompt reuse.

DeepSeek Models — compare available DeepSeek models and usage patterns.

## 内部链接
- [Chat-Deep.ai](https://chat-deep.ai/)
- [Estimate API Cost](https://chat-deep.ai/pricing/deepseek-api-cost-calculator/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [dated DeepSeek API updates tracker](https://chat-deep.ai/docs/deepseek-api-updates/)
- [DeepSeek API cost calculator](https://chat-deep.ai/pricing/deepseek-api-cost-calculator/)
- [Chat-Deep.ai](https://chat-deep.ai/)
- [DeepSeek Chat online](https://chat-deep.ai/deepseek-chat/)
- [API guide](https://chat-deep.ai/docs/api/)
- [DeepSeek Chat Online](https://chat-deep.ai/deepseek-chat/)
- [DeepSeek API Cost Calculator](https://chat-deep.ai/pricing/deepseek-api-cost-calculator/)
- [DeepSeek API Guide](https://chat-deep.ai/docs/api/)
- [DeepSeek Context Caching](https://chat-deep.ai/docs/deepseek-context-caching/)
- [DeepSeek Models](https://chat-deep.ai/models/)

## 外部链接
- [Official DeepSeek Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [Check the official DeepSeek Models & Pricing page](https://api-docs.deepseek.com/quick_start/pricing)
- [Official DeepSeek Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [Official DeepSeek V4 Release Notice](https://api-docs.deepseek.com/news/news260424/)
- [Official DeepSeek Token & Token Usage](https://api-docs.deepseek.com/quick_start/token_usage)
- [Official DeepSeek Context Caching](https://api-docs.deepseek.com/guides/kv_cache)
- [Official DeepSeek Rate Limit & Isolation](https://api-docs.deepseek.com/quick_start/rate_limit)
- [Official DeepSeek website](https://www.deepseek.com/en/)
- [official DeepSeek Models & Pricing page](https://api-docs.deepseek.com/quick_start/pricing)
# DeepSeek V4 Preview: Pro vs Flash, API, Pricing & Download

- **URL**: https://chat-deep.ai/models/deepseek-v4/
- **Published**: 2026-04-24T10:52:10+00:00
- **Modified**: 2026-07-29T02:16:23+00:00
- **Category**: 
- **Word count**: 3485
- **Code blocks**: 1
- **Description**: DeepSeek V4 Preview is an officially released family of Mixture-of-Experts language models comprising DeepSeek-V4-Pro and DeepSeek-V4-Flash.

## H1


## H2 目录
- DeepSeek V4 Preview status
- Contents
- DeepSeek V4 Preview at a glance
- DeepSeek V4 Pro vs Flash: key differences
- DeepSeek V4 Pro: specifications and good use cases
- DeepSeek V4 Flash: specifications and good use cases
- DeepSeek V4 specifications and API capabilities
- DeepSeek V4 pricing snapshot
- How to access DeepSeek V4
- DeepSeek V4 API IDs and post-cutoff alias status
- DeepSeek V4 download: official model weights
- Can you run DeepSeek V4 locally?
- What changed from DeepSeek V3.2 and R1?
- DeepSeek V4 benchmarks: official and independent results
- DeepSeek V4 capabilities and limitations
- Which DeepSeek V4 model should you choose?
- Frequently asked questions
- Related DeepSeek V4 guides

## 正文
Compare DeepSeek V4 Pro and Flash: specifications, 1M context, API IDs, pricing, thinking modes, official weights, and legacy-alias migration. Last verified: July 28, 2026.

DeepSeek V4 Preview is an officially released family of Mixture-of-Experts language models comprising DeepSeek-V4-Pro and DeepSeek-V4-Flash. Pro is the larger model for harder reasoning, coding, knowledge, and agent tasks; Flash is the smaller, lower-cost option for higher-throughput workloads. Both official API models list a one-million-token context window, a maximum output of 384K tokens, thinking and non-thinking modes, and downloadable weights under the MIT License.


> Independent-site disclosure: Chat-Deep.ai is an independent website and is not affiliated with, endorsed by, or operated by DeepSeek. DeepSeek controls its official web service, apps, API, model repositories, availability, and prices.


### DeepSeek V4 Preview status


Official status | Preview release
Announcement date | April 24, 2026
Variants | DeepSeek-V4-Pro and DeepSeek-V4-Flash
Final or GA date | Not announced in the official sources checked
Verified API model IDs | deepseek-v4-pro and deepseek-v4-flash

DeepSeek describes this release as DeepSeek-V4 Preview. It should not be presented as “V4 final” or “V4.0.” The official DeepSeek V4 Preview announcement documents the release, model sizes, one-million-token context, access options, and API identifiers.


### Contents

- DeepSeek V4 at a glance

- V4 Pro vs Flash

- Specifications and capabilities

- Pricing snapshot

- Access and API model IDs

- Legacy alias migration

- Official model downloads

- Official and independent benchmarks

- Frequently asked questions


### DeepSeek V4 Preview at a glance


Fact | Officially documented information
Official name | DeepSeek-V4 Preview
Architecture | Mixture of Experts (MoE)
V4 Flash size | 284B total parameters; 13B activated
V4 Pro size | 1.6T total parameters; 49B activated
Context length | 1M tokens for both official API models
Maximum API output | 384K tokens
Reasoning | Thinking and non-thinking; High and Max effort
API formats | OpenAI-compatible and Anthropic-compatible
Documented modality | Text generation; native image, audio, and video inputs are not listed for the V4 API endpoints
Published checkpoints | Pro, Flash, Pro Base, and Flash Base
Weights license | MIT License

The API model IDs and downloadable checkpoint names serve different purposes. deepseek-v4-pro and deepseek-v4-flash identify hosted API models. Names ending in -Base identify downloadable foundation checkpoints, not API model IDs. Similarly, “Max” is a reasoning-effort setting rather than a separate model endpoint.


### DeepSeek V4 Pro vs Flash: key differences

The practical choice is straightforward: start with V4 Flash when cost, throughput, or request volume matters most; evaluate V4 Pro when harder reasoning, knowledge, coding, or agent performance can justify its higher token price and lower default concurrency. Flash is not merely a quantized copy of Pro. They are separate models with different total and activated parameter counts.


Specification | DeepSeek V4 Flash | DeepSeek V4 Pro
API model ID | deepseek-v4-flash | deepseek-v4-pro
Total parameters | 284B | 1.6T
Activated parameters | 13B | 49B
Context length | 1M tokens | 1M tokens
Maximum API output | 384K tokens | 384K tokens
Thinking and non-thinking | Supported | Supported
Default account concurrency | 2,500 active connections | 500 active connections
Post-trained weight precision | Mixed FP4 and FP8 | Mixed FP4 and FP8
Good starting fit | High-volume text processing, routine reasoning, and cost-sensitive applications | Hard reasoning, complex coding, knowledge-heavy work, and difficult agent tasks


![DeepSeek V4 Pro versus V4 Flash specifications comparison](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### DeepSeek V4 Pro: specifications and good use cases

DeepSeek V4 Pro is the larger preview model, with 1.6 trillion total parameters and 49 billion activated for each token. DeepSeek positions it for difficult reasoning, knowledge, coding, and agent workloads. Pro is the stronger model to test first when an incorrect result is more expensive than the additional API cost, or when a task contains long chains of dependent decisions.

- Complex repository analysis, debugging, and multi-step software agents.

- Knowledge-heavy research and difficult STEM reasoning.

- Long-horizon agents that must plan, call tools, and recover from failures.

- Selected High or Max reasoning requests where evaluation shows a measurable gain.

Pro should not be selected automatically for every request. Its listed output price is higher than Flash, and its default account concurrency is lower. A production router can send routine work to Flash and escalate only tasks that benefit from Pro in repeatable tests.


### DeepSeek V4 Flash: specifications and good use cases

DeepSeek V4 Flash has 284 billion total parameters and 13 billion activated per token. Its smaller active footprint, lower official API price, and higher default concurrency make it the practical starting point for routine chat, extraction, classification, summarization, and first-pass agent work.

- High-volume classification, extraction, summarization, and support workflows.

- Cost-sensitive chat and content-processing applications.

- First-stage routing before difficult requests are escalated to Pro.

- Behavior-preserving migration from the older deepseek-chat and deepseek-reasoner aliases.

Flash can approach Pro on some reasoning tasks when given a larger thinking budget, but that does not make their behavior identical. Test both models on your documents, prompts, failure cases, latency targets, and budget before changing a production route.


### DeepSeek V4 specifications and API capabilities

The table below describes the official DeepSeek API. OpenRouter, cloud platforms, other hosted providers, and self-hosted runtimes can expose different model names, feature sets, context limits, and operational behavior.


Capability | V4 Flash | V4 Pro | Important condition
Thinking mode | Yes | Yes | Enabled by default
Non-thinking mode | Yes | Yes | Disable thinking explicitly
JSON Output | Yes | Yes | Validate the result in application code
Tool calls | Yes | Yes | Your application executes the requested tool
Strict tool calls | Beta | Beta | Requires the /beta base URL and supports a documented JSON Schema subset
Chat Prefix Completion | Beta | Beta | Requires the /beta URL and an assistant message with prefix: true
FIM Completion | Beta | Beta | Non-thinking only; 4K maximum output; requires the /beta URL
Context caching | Yes | Yes | Enabled by default; only qualifying repeated prefixes receive cache-hit pricing
OpenAI Chat Completions format | Yes | Yes | Change the base URL and model ID
Anthropic-compatible format | Yes | Yes | Compatibility does not imply support for every Anthropic field


#### One-million-token context and 384K maximum output

Both official API models support a one-million-token context window and a maximum output of 384K tokens. The prompt and generated completion must fit within the context window; these figures should not be added together as a 1.384M-token total. One million tokens also does not mean one million words or guarantee perfect retrieval from a long prompt.

Long-context results improve when documents are filtered, labeled, ordered, and divided into meaningful sections. Retrieval, citations, and post-generation verification remain important. See the separate DeepSeek V4 context and output limits guide for token planning and failure cases.


#### Thinking, non-thinking, High, and Max

Thinking is enabled by default. DeepSeek documents high and max as the supported reasoning-effort values. For compatibility, low and medium map to High, while xhigh maps to Max. Max is a configuration, not a separate API model named “V4-Pro-Max” or “V4-Flash-Max.”

In thinking mode, temperature, top_p, presence_penalty, and frequency_penalty have no effect. When a thinking turn makes a tool call, the returned reasoning_content must be passed back during the subsequent tool loop. Review the official thinking-mode rules and our implementation-focused DeepSeek thinking mode guide before deploying multi-turn agents.


#### Default account concurrency

DeepSeek publishes per-account concurrency limits of 2,500 active connections for V4 Flash and 500 for V4 Pro. These are concurrent connections, not requests per minute or requests per second. All API keys under one account share the limits. Exceeding the applicable allowance returns HTTP 429. DeepSeek also documents a no-additional-cost capacity request process, subject to its assessment of business needs. See the official rate-limit and isolation documentation.


### DeepSeek V4 pricing snapshot

Price snapshot verified: July 28, 2026. Prices are in U.S. dollars per one million tokens and may be changed by DeepSeek.


Official API model | Cached input | Uncached input | Output
deepseek-v4-flash | $0.0028 | $0.14 | $0.28
deepseek-v4-pro | $0.003625 | $0.435 | $0.87

Cache-hit pricing applies only to input tokens that qualify through DeepSeek’s context cache; it is not the price of every input token. Thinking has no separate token rate, but longer reasoning can increase billed output. Check the official model and pricing table before approving a production budget, or use the DeepSeek pricing guide and calculator for per-request estimates.


### How to access DeepSeek V4


#### Official web and app access

DeepSeek’s release notice states that V4 Preview is available through its web service, mobile apps, and API. Consumer-interface labels such as Expert Mode and Instant Mode belong to DeepSeek’s products. Do not assume that every interface label maps permanently and one-to-one to Pro or Flash unless the interface identifies the underlying model.


#### Official API model IDs and base URLs

- V4 Flash: deepseek-v4-flash

- V4 Pro: deepseek-v4-pro

- OpenAI-compatible base URL: https://api.deepseek.com

- Anthropic-compatible base URL: https://api.deepseek.com/anthropic

The API’s model-list response identifies those two V4 endpoints. Read DeepSeek model names and API IDs if you need to distinguish product labels, hosted API names, downloadable checkpoints, and provider-specific aliases.

This minimal request uses V4 Flash with thinking explicitly disabled:


```
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {
        "role": "user",
        "content": "Summarize the differences between DeepSeek V4 Pro and Flash."
      }
    ],
    "thinking": {"type": "disabled"},
    "stream": false
  }'
```

For authentication, Node.js, Python, streaming, error handling, retries, and production safeguards, use the complete DeepSeek API documentation.


### DeepSeek V4 API IDs and post-cutoff alias status

Current API status — verified July 28, 2026: DeepSeek’s documented hosted API model IDs are deepseek-v4-flash and deepseek-v4-pro. Its April 24 release notice set July 24, 2026 at 15:59 UTC as the retirement cutoff for deepseek-chat and deepseek-reasoner. That cutoff has passed, and the current official model list shows only the two explicit V4 IDs. The alias mappings in the table below describe DeepSeek’s documented transition period; they are not a promise of continued availability. Production applications should not depend on either alias.

Independent compatibility observation — not an official support claim: Chat-Deep.ai checks observed an HTTP 400 response for legacy-alias requests on July 25, followed by successful responses identifying V4 Flash behavior on July 28. This inconsistent post-cutoff behavior does not override the official model catalog. Production applications should use the explicit V4 IDs.


Legacy alias | Documented behavior during transition | Required explicit replacement
deepseek-chat | V4 Flash, non-thinking | deepseek-v4-flash with thinking disabled
deepseek-reasoner | V4 Flash, thinking | deepseek-v4-flash with thinking enabled

Do not migrate deepseek-reasoner automatically to Pro. Its behavior-preserving target is V4 Flash with thinking enabled. Test Pro separately where its quality advantage can justify the price and lower default concurrency. The complete DeepSeek V4 migration guide covers request changes and regression checks.


### DeepSeek V4 download: official model weights

DeepSeek publishes four V4 repositories through the verified deepseek-ai organization on Hugging Face. The post-trained models use mixed FP4 and FP8 precision, while the Base checkpoints use mixed FP8 precision.


Official repository | Purpose | Parameters
DeepSeek-V4-Flash | Post-trained Flash model | 284B total / 13B active
DeepSeek-V4-Pro | Post-trained Pro model | 1.6T total / 49B active
DeepSeek-V4-Flash-Base | Foundation checkpoint for research and adaptation | 284B total / 13B active
DeepSeek-V4-Pro-Base | Foundation checkpoint for research and adaptation | 1.6T total / 49B active

“Open-weight” is the precise description: model weights are downloadable under the MIT License. That does not mean every training dataset, complete training pipeline, hosted service component, or provider deployment has been published. Use the official organization to avoid mislabeled uploads, and verify the publisher, conversion method, license, and checksums of third-party GGUF or other quantized derivatives.


### Can you run DeepSeek V4 locally?

Yes, because official weights and inference instructions are available. However, neither full checkpoint is an ordinary laptop model. Flash has 284B total parameters, and Pro has 1.6T. Storage size is not the same as RAM or VRAM, and long contexts add substantial cache and serving requirements.

There is no single trustworthy “minimum GPU” figure for every precision, quantization, context length, batch size, runtime, and parallelism design. Self-hosted context and output limits depend on the serving stack and available infrastructure rather than automatically inheriting the official API limits. Use the local DeepSeek installation guide for deployment planning.


### What changed from DeepSeek V3.2 and R1?

V4 keeps the Mixture-of-Experts approach and Multi-Token Prediction design used by earlier DeepSeek models while introducing architectural and training changes intended to make very long contexts more efficient.


Technical component | Role described in the DeepSeek report
Compressed Sparse Attention (CSA) | Compresses key-value entries and applies sparse selection to reduce long-context work
Heavily Compressed Attention (HCA) | Uses more aggressive key-value compression while retaining dense attention
Manifold-Constrained Hyper-Connections (mHC) | Strengthens residual connections while constraining signal propagation for stability
Muon optimizer | Supports faster convergence and training stability
DeepSeekMoE and on-policy distillation | Routes tokens through selected experts and consolidates domain-specialist capabilities

DeepSeek reports that Pro, at a one-million-token context, uses 27% of the single-token inference FLOPs and 10% of the KV cache of DeepSeek V3.2. It reports 10% of the FLOPs and 7% of the KV cache for Flash under the same comparison. These are developer-reported efficiency figures, not measurements reproduced by Chat-Deep.ai. Architecture, training, precision, and evaluation details appear in the DeepSeek V4 technical report.

V4’s hosted transition also combines general responses, thinking, long-context processing, and tool use inside the Pro and Flash family. Historical R1 and V3.2 checkpoints can still matter for reproducible research and existing self-hosted systems. See the DeepSeek models guide when choosing across model families.


### DeepSeek V4 benchmarks: official and independent results


#### DeepSeek-published Max results

The following scores were published by DeepSeek for the Max reasoning configuration. They are not independent Chat-Deep.ai measurements. Scores can change with prompts, reasoning budgets, tools, scaffolding, test harnesses, and evaluation rules.


Benchmark | V4 Flash Max | V4 Pro Max | What it tests
GPQA Diamond (Pass@1) | 88.1 | 90.1 | Graduate-level science reasoning
LiveCodeBench-v6 (Pass@1-CoT) | 91.6 | 93.5 | Competitive coding
SWE Verified (Resolved) | 79.0 | 80.6 | Repository issue resolution
Terminal Bench 2.0 (Acc) | 56.9 | 67.9 | Agent work in terminal environments
MRCR 1M (MMR) | 78.7 | 83.5 | Retrieval across a million-token context

The table supports a practical, limited conclusion: Pro shows a clearer advantage on difficult knowledge and agent tasks, while Flash can remain close on several reasoning and coding evaluations when given a larger reasoning budget. It does not establish that either model is the strongest option for every workload.


#### Independent evaluation: what CAISI found

In an independent evaluation, the U.S. Center for AI Standards and Innovation described DeepSeek V4 Pro as the most capable PRC model it had evaluated. CAISI found a wider gap from leading U.S. systems on several held-out and agentic tests than DeepSeek’s selected benchmark comparisons suggested. It also found V4 Pro more cost-efficient than GPT-5.4 mini on five of seven evaluated tasks, with relative cost ranging from 53% lower to 41% higher depending on the task.

Those findings should not be mixed directly with DeepSeek’s table. They used CAISI’s serving setup, system prompts, scaffolding, reasoning settings, token budgets, and prices available during its evaluation. Review the full CAISI evaluation of DeepSeek V4 Pro for its methodology and caveats.


#### How to evaluate Pro and Flash for your application

- Build a test set from real prompts, documents, code, tool calls, and known failure cases.

- Run the same prompts with fixed reasoning settings and output limits.

- Record task success, factual errors, time to first token, completion speed, token use, and actual cost.

- Publish the prompts, rubric, settings, and raw outputs if the results will support public claims.

- Route routine work to Flash and escalate only categories where Pro produces a repeatable gain.

The DeepSeek API testing and regression guide explains how to build deterministic local fixtures. Do not describe mocked responses as live model performance.


### DeepSeek V4 capabilities and limitations


#### Where V4 can fit well

- Agentic coding: repository analysis, debugging, planning, tool use, and multi-step software tasks.

- Long-document workflows: technical documentation, policies, logs, transcripts, research collections, and contract sets.

- Reasoning: mathematics, science, planning, and structured analysis.

- High-volume text processing: classification, extraction, summarization, and support workflows routed through Flash.

- Structured applications: JSON responses and tool requests combined with application-side validation.

- Open-weight research: experimentation or self-hosting where suitable infrastructure is available.


#### Important limitations

- Preview status: behavior, availability, limits, and prices can change.

- Documented text modality: the V4 API pages do not list native image, audio, or video input. Do not confuse V4 with Janus or DeepSeek-VL.

- Company-published benchmarks: selected public scores do not guarantee results on your workload.

- Large local footprint: official checkpoints require substantial storage, memory, and serving infrastructure.

- Long-context fallibility: a 1M window does not eliminate missed details, hallucinations, or prompt-injection risk.

- JSON limitations: JSON Output is not a guarantee of full JSON Schema compliance, and outputs still require validation.

- Tool execution: the model requests a tool call; your application validates the arguments, executes the tool, and returns the result.

- Privacy and governance: do not send secrets, credentials, regulated records, or personal data without an approved processing, access, logging, and retention design.

Review what not to paste into DeepSeek before using any hosted model with sensitive information.


### Which DeepSeek V4 model should you choose?


Workload | Starting choice | Reason
Routine chat, extraction, or classification | Flash, non-thinking | Lower cost and less unnecessary reasoning
High-volume production API | Flash | Lower token prices and higher listed default concurrency
Long-document summarization | Flash first | Test Pro only where evaluation shows a quality gain
Complex coding or repository repair | Pro, High | Stronger starting position for difficult coding and agent work
Science, mathematics, or difficult planning | Pro, High | More active capacity for knowledge-heavy reasoning
Unusually hard boundary tests | Pro, Max | Uses the largest documented reasoning budget
Cost-sensitive agent workflow | Flash, High | Evaluate whether it meets the task before escalation
Local research | Flash weights first | Smaller than Pro, although still infrastructure-intensive

A measurable routing policy is usually better than selecting Max or Pro for every request. Start with the least expensive configuration that passes your acceptance criteria, record failures, and escalate only the categories that show a repeatable benefit.


### Frequently asked questions


#### What is DeepSeek V4?

DeepSeek V4 is a preview family of Mixture-of-Experts language models announced on April 24, 2026. It includes V4 Pro and V4 Flash, both with official API access, thinking and non-thinking modes, a listed 1M-token context window, and MIT-licensed downloadable weights.


#### Is DeepSeek V4 officially released?

Yes. It is an official preview release, not a rumor or an unreleased model. DeepSeek has not identified it as the final or GA version in the sources checked for this page.


#### What is the difference between DeepSeek V4 Pro and Flash?

Pro has 1.6T total parameters and 49B activated parameters and is positioned for harder reasoning, coding, knowledge, and agent tasks. Flash has 284B total and 13B activated and is positioned for lower cost and higher-throughput work. Both official API models list the same 1M context and 384K maximum output.


#### What are the DeepSeek V4 API model names?

The explicit model IDs are deepseek-v4-pro and deepseek-v4-flash. Pro Max, Flash Max, and non-thinking are configurations rather than separate API model names.


#### Does DeepSeek V4 support a one-million-token context?

Yes. DeepSeek lists a 1M-token context length for Pro and Flash. The prompt and completion must fit within that context, and the size does not guarantee perfect recall of every detail.


#### Where can I download DeepSeek V4?

Use the official Pro, Flash, Pro Base, and Flash Base repository links in the download table above. Verify any third-party quantization independently.


#### Is DeepSeek V4 open source or open weight?

The precise description is open weight: DeepSeek publishes downloadable V4 weights under the MIT License. That statement should not be expanded to imply that every dataset, service component, or infrastructure layer has been released.


#### Does DeepSeek V4 support images or video?

The official V4 API documentation and model cards describe text-generation models and do not list native image, audio, or video input for V4 Pro or Flash. A workflow that uses external tools or separate multimodal models does not make the V4 endpoint itself multimodal.


#### Does DeepSeek V4 replace deepseek-chat and deepseek-reasoner?

Yes for current integration planning. DeepSeek documented both strings as temporary compatibility aliases and set July 24, 2026 as their retirement cutoff. The current official catalog names only deepseek-v4-flash and deepseek-v4-pro; use those explicit IDs in new and production code.


#### Is DeepSeek V4 good for coding?

DeepSeek positions V4 for coding and agent workloads, and its published evaluations include competitive coding and repository-repair tests. Pro is the stronger starting choice for difficult coding agents, while Flash can be more economical for routine generation, explanation, classification, and high-volume code tasks. Test both on your repositories before deployment.

Editorial verification: Specifications, API features, prices, migration dates, model repositories, and benchmark labels were checked against DeepSeek’s official release notice, API documentation, model cards, technical report, and the cited independent evaluation on July 28, 2026. Hosted-provider and self-hosted behavior can differ from the official DeepSeek API.


### Related DeepSeek V4 guides

- DeepSeek API documentation

- DeepSeek API pricing

- DeepSeek V4 context and output limits

- Migrate legacy aliases to DeepSeek V4

- Run DeepSeek locally

- DeepSeek model names explained

## 内部链接
- [Try Chat-Deep.ai](https://chat-deep.ai/)
- [DeepSeek V4 context and output limits](https://chat-deep.ai/docs/deepseek-v4-context-output-limits/)
- [DeepSeek thinking mode guide](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [DeepSeek pricing guide and calculator](https://chat-deep.ai/pricing/)
- [DeepSeek model names and API IDs](https://chat-deep.ai/research/deepseek-model-names/)
- [DeepSeek API documentation](https://chat-deep.ai/docs/api/)
- [complete DeepSeek V4 migration guide](https://chat-deep.ai/docs/migrate-deepseek-chat-reasoner-to-v4/)
- [local DeepSeek installation guide](https://chat-deep.ai/guide/how-to-install-deepseek-locally/)
- [DeepSeek models guide](https://chat-deep.ai/models/)
- [DeepSeek API testing and regression guide](https://chat-deep.ai/docs/testing-deepseek-api/)
- [what not to paste into DeepSeek](https://chat-deep.ai/privacy-security/what-not-to-paste-into-deepseek/)
- [DeepSeek API documentation](https://chat-deep.ai/docs/api/)
- [DeepSeek API pricing](https://chat-deep.ai/pricing/)
- [DeepSeek V4 context and output limits](https://chat-deep.ai/docs/deepseek-v4-context-output-limits/)
- [Migrate legacy aliases to DeepSeek V4](https://chat-deep.ai/docs/migrate-deepseek-chat-reasoner-to-v4/)
- [Run DeepSeek locally](https://chat-deep.ai/guide/how-to-install-deepseek-locally/)
- [DeepSeek model names explained](https://chat-deep.ai/research/deepseek-model-names/)

## 外部链接
- [Open Official DeepSeek Chat](https://chat.deepseek.com/)
- [official DeepSeek V4 Preview announcement](https://api-docs.deepseek.com/news/news260424/)
- [Strict tool calls](https://api-docs.deepseek.com/guides/tool_calls/)
- [Chat Prefix Completion](https://api-docs.deepseek.com/guides/chat_prefix_completion/)
- [FIM Completion](https://api-docs.deepseek.com/guides/fim_completion/)
- [official thinking-mode rules](https://api-docs.deepseek.com/guides/thinking_mode/)
- [official rate-limit and isolation documentation](https://api-docs.deepseek.com/quick_start/rate_limit/)
- [official model and pricing table](https://api-docs.deepseek.com/quick_start/pricing/)
- [current official model list](https://api-docs.deepseek.com/api/list-models/)
- [DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)
- [DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [DeepSeek-V4-Flash-Base](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Base)
- [DeepSeek-V4-Pro-Base](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-Base)
- [DeepSeek V4 technical report](https://arxiv.org/html/2606.19348)
- [CAISI evaluation of DeepSeek V4 Pro](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro)
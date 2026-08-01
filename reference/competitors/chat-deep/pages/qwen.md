# DeepSeek vs Qwen (2026): Live Tests, Pricing & Models

- **URL**: https://chat-deep.ai/comparison/qwen/
- **Published**: 2026-05-14T17:33:30+00:00
- **Modified**: 2026-07-28T11:41:40+00:00
- **Category**: DeepSeek Comparisons
- **Word count**: 3338
- **Code blocks**: 0
- **Description**: DeepSeek vs Qwen compared with live Qwen3.7 and DeepSeek V4 tests, current API pricing, multimodal support, context, privacy, and local deployment.

## H1


## H2 目录
- Quick Verdict: DeepSeek vs Qwen
- What Is Being Compared?
- Current Models and Documented Capabilities
- Original Live Evidence: DeepSeek and Qwen
- DeepSeek vs Qwen Pricing
- Coding, Reasoning, Tools, and Long Context
- Multimodal Work: Qwen Has the Documented Advantage
- Local Deployment and Licensing
- Privacy and Data Handling
- Reproducible Account-Based Test Plan
- Practical Decision Framework
- Update Log
- FAQ: DeepSeek vs Qwen
- Official Sources

## 正文
DeepSeek vs Qwen is not one comparison. It can mean DeepSeek Chat versus Qwen Chat, DeepSeek’s API versus Alibaba Cloud Model Studio, or DeepSeek V4 weights versus Qwen’s open-weight models. A useful answer must keep those product layers separate.

Updated July 28, 2026: DeepSeek’s official API lists V4-Flash and V4-Pro. Alibaba Cloud’s current pay-as-you-go lineup includes Qwen3.7 Max, Qwen3.7 Plus, and the new Qwen3.7 Flash economy model released for Singapore on July 25. Qwen3.6 Flash is now the predecessor. The current open-weight comparison should include Qwen3.6-27B and Qwen3.6-35B-A3B rather than treating older Qwen3 sizes as the whole local-model story.

We ran the same synthetic English decision fixture through DeepSeek Chat, the DeepSeek API, Qwen Studio, and five authenticated Alibaba Cloud Model Studio API configurations. Every result below is labeled as a single-run observation, not a general speed ranking. The fixture, expected answer, mode, token usage, elapsed time, and list-price estimate are published so the result can be audited.


### Quick Verdict: DeepSeek vs Qwen

Choose DeepSeek first for very low cached-input pricing, a straightforward first-party API, 1M context on both V4 models, and MIT-licensed V4 weights. V4-Flash was also the lowest-cost successful API run on our fixture because it used far fewer output tokens; V4-Pro is the higher-reasoning tier.

Choose Qwen first for a broader hosted model platform, image and video input, Alibaba Cloud integration, or open-weight models that are more realistic for local and custom deployment. Qwen3.7 Plus is the documented multimodal hosted option, while Qwen3.6-27B and 35B-A3B are important current open-weight candidates.

For coding and reasoning quality, test both. Vendor benchmark tables use different harnesses, tools, token budgets, and model snapshots. A model that leads one leaderboard can still lose on your repository, schema, retry rate, or cost per accepted result.


Decision | Better starting point | Reason | Evidence level
Lowest short-prompt list rates | Depends | Qwen3.7 Flash is lower for uncached short input/output; DeepSeek V4-Flash is lower for cached input | Official prices checked July 28
Difficult coding or reasoning | Test V4-Pro vs Qwen3.7 Max | Both can be correct, but mode and output budget materially changed our fixture | Matched single-fixture test; broader suite required
Image, video, or visual documents | Qwen3.7 Plus or Flash | Both accept text, images, and video | Documented feature fit
Local deployment on moderate infrastructure | Qwen3.6 open weights | 27B and 35B-A3B are much smaller than DeepSeek V4 weights | Official model cards; hardware test required
1M hosted context | Both | Both providers document 1M options | Maximum size only; retrieval quality untested here
Standard permissive license | Both | DeepSeek V4 lists MIT; current Qwen3.6 open weights list Apache 2.0 | Official repository licenses


### What Is Being Compared?


#### Consumer chat products

DeepSeek Chat and Qwen Studio (formerly Qwen Chat) are consumer-facing products with their own interfaces, limits, file tools, search features, accounts, and privacy terms. A free chat result does not establish API cost or the behavior of downloadable weights. Product features can also change without changing the underlying model name.


#### Hosted developer APIs

DeepSeek provides a direct API with OpenAI-compatible and Anthropic-compatible formats. Alibaba Cloud Model Studio provides Qwen and other models through region-specific OpenAI-compatible, Anthropic-compatible, and DashScope interfaces. For Singapore, Alibaba recommends a workspace-specific OpenAI-compatible base URL under ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1. Region selection affects endpoint, availability, price, and data processing, so record it in every result without publishing the private workspace identifier.


#### Open-weight models

DeepSeek V4 and selected Qwen models publish downloadable weights. That does not make the hosted aliases and downloaded checkpoints interchangeable. A provider may apply a different snapshot, prompt template, quantization, safety layer, or serving configuration.


Layer | DeepSeek | Qwen | Use this layer for
Consumer chat | DeepSeek Chat | Qwen Studio (formerly Qwen Chat) | Interface, search, files, free access, and everyday use
Hosted frontier API | deepseek-v4-pro | qwen3.7-max | Hard reasoning, coding, and agents
Lower-cost hosted API | deepseek-v4-flash | qwen3.7-flash | Volume, latency, and cost testing
Hosted multimodal | Current V4 comparison is text-focused | qwen3.7-plus, qwen3.7-flash, or the Max June 8 snapshot | Images, video, and visual documents
Open weights | V4-Flash / V4-Pro | Qwen3.6-27B / Qwen3.6-35B-A3B | Self-hosting, tuning, and infrastructure control


### Current Models and Documented Capabilities


#### DeepSeek V4

DeepSeek’s official models page lists deepseek-v4-flash and deepseek-v4-pro. Both list a 1M context window, maximum output up to 384K, thinking and non-thinking modes, JSON output, tool calls, and chat-prefix completion. The official V4 repositories list V4-Flash at 284B total parameters with 13B active and V4-Pro at 1.6T total with 49B active.


#### Qwen3.7 hosted models

Alibaba Cloud’s current Singapore pay-as-you-go text lineup includes qwen3.7-max, qwen3.7-plus, and qwen3.7-flash. Qwen3.7 Flash launched for Singapore on July 25, 2026 and its moving alias maps to qwen3.7-flash-2026-07-15. A live GET /models call from our Singapore workspace returned HTTP 200 and 151 IDs, including the three Qwen3.7 families and their dated snapshots.

All three current families document a 1M context window, up to 64K output, hybrid thinking, function calling, and built-in tool support. Thinking is on by default and can be controlled with enable_thinking. Built-in tools depend on the Responses API or explicit tool configuration; they are not automatically active in every Chat Completions request.

Model IDs matter. The moving qwen3.7-max alias currently points to the May 20 text-only snapshot. Use qwen3.7-max-2026-06-08 for documented image and video input. Qwen3.7 Plus and Qwen3.7 Flash accept text, image, and video. Alibaba’s current pages conflict on structured JSON for Max, so validate the exact Max endpoint; Plus and Flash document structured JSON in non-thinking mode.


![Alibaba Cloud Model Studio selector showing Qwen3.7 Max, Plus, Flash, and current model snapshots](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


#### Qwen3.6 open weights

The current open-weight shortlist includes Qwen3.6-27B and Qwen3.6-35B-A3B. The 27B model lists a vision encoder, 262,144 native context, extension up to 1,010,000 tokens, and Apache 2.0. The MoE model lists 35B total parameters with 3B active and is also released under Apache 2.0.

Older Qwen3 sizes remain useful across hardware tiers, but a current comparison should not omit the Qwen3.6 models designed for agentic coding, multimodal work, and local deployment.


### Original Live Evidence: DeepSeek and Qwen

Tested July 28, 2026. We used one synthetic English fixture across both providers. It set a $12,000 budget, a May 15 launch deadline, two vendor delivery dates, and a two-business-day security review. The expected decision was Vendor B: its May 12 delivery leaves two business days before launch, while Vendor A arrives after the deadline. The response had to be valid JSON with one decision, exactly two risks, and one next step.

This is a narrow test of constraint handling, date reasoning, JSON compliance, mode selection, and output budgeting. It is not a coding benchmark or a general quality and speed ranking. Elapsed time includes network and service time; each API row is one run.


DeepSeek run | Observed result | Tokens and elapsed time
Chat Instant | Valid JSON, but the vendor decision contradicted the dates | Chat UI; token data unavailable
Chat Expert | Correct decision and requested JSON | Chat UI; token data unavailable
deepseek-v4-flash | Correct | 162 prompt, 205 completion, 127 reasoning; 2,160 ms
deepseek-v4-pro, 500 max tokens | No final answer; all completion tokens were used for reasoning | 500-token output cap exhausted
deepseek-v4-pro, 1,600 max tokens | Correct | 162 prompt, 701 completion, 574 reasoning; 12,259 ms


Qwen API run | Decision / JSON | Provider-reported tokens | Elapsed | Estimated Singapore list cost
qwen3.7-flash, default thinking | Correct / valid | 175 prompt, 2,238 completion, 2,103 reasoning | 19,883 ms | $0.0002962
qwen3.7-plus, default thinking | Correct / valid | 175 prompt, 2,214 completion, 2,030 reasoning | 41,990 ms | $0.0036124
qwen3.7-max, thinking off | Incorrect / valid | 177 prompt, 142 completion, 0 reasoning | 5,711 ms | $0.0015075
qwen3.7-max, thinking on | Correct / valid | 175 prompt, 2,353 completion, 2,195 reasoning | 46,814 ms | $0.0180850
qwen3.6-flash, thinking on | Correct / valid | 175 prompt, 1,849 completion, 1,731 reasoning | 15,171 ms | $0.0028173

Qwen Studio’s Qwen3.7-Plus with Thinking set to Auto also returned the correct decision and valid JSON. The strongest finding is not that one provider is universally better: on this fixture, Qwen3.7 Max was quicker and cheaper with thinking disabled but wrong; enabling thinking made it correct while substantially increasing output tokens and elapsed time. DeepSeek showed the same class of operational risk when Instant was wrong and V4-Pro produced no final answer under a 500-token cap.

The Qwen account’s free quota covered these calls, but the cost column deliberately uses official Singapore list prices so the figures remain comparable. Reasoning tokens are part of completion/output billing. Promotions and free allocations were excluded.

Using DeepSeek’s cache-miss input rate, the successful V4-Flash run cost approximately $0.0000801 and the successful 1,600-token V4-Pro run approximately $0.0006803. Qwen3.7 Flash’s correct run was about $0.0002962. This is why cost per successful task is more informative than list price alone: Qwen3.7 Flash has lower uncached short-prompt rates, but it generated roughly ten times as many completion tokens on this fixture.


![Qwen 3.7 Plus Chat result selecting Vendor B correctly in the live structured test](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


![DeepSeek Instant result following the JSON format but making an incorrect decision](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


![DeepSeek Expert result correctly selecting Vendor B in the synthetic fixture](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


#### Model-list and alias observation

A live GET /models request returned deepseek-v4-flash and deepseek-v4-pro. Although DeepSeek had announced that deepseek-chat and deepseek-reasoner would be retired after July 24, both aliases returned HTTP 200 in our July 28 account test and identified the returned model as deepseek-v4-flash. The reasoner alias returned reasoning content; the chat alias did not.

The authenticated Singapore Qwen endpoint returned HTTP 200 with 151 model IDs. Relevant IDs included qwen3.7-flash, qwen3.7-plus, qwen3.7-max, dated Qwen3.7 snapshots, and Qwen3.6 predecessors. The live console independently exposed Qwen3.7 Flash and the Max May 20 and June 8 snapshots.

Do not rely on moving-alias compatibility. Use explicit IDs, log the returned model, and retest after provider changes. Alibaba’s model lifecycle policy gives snapshots shorter notice than mainline aliases, so pin a dated snapshot for reproducibility and monitor retirement notices.


### DeepSeek vs Qwen Pricing

There is no single cheapest provider. For short prompts, Qwen3.7 Flash has lower uncached input and output list rates than DeepSeek V4-Flash; DeepSeek has the lower cached-input rate. Actual task cost depends on output length, thinking tokens, cache hits, retries, and correctness. On our fixture, DeepSeek V4-Flash was cheaper because its correct answer used far fewer completion tokens.


Model and Singapore scope | Input per 1M | Output per 1M | Prompt tier
DeepSeek V4-Flash | $0.0028 cache hit / $0.14 cache miss | $0.28 | Official first-party API
DeepSeek V4-Pro | $0.003625 cache hit / $0.435 cache miss | $0.87 | Official first-party API
Qwen3.7 Flash | $0.03 | $0.13 | Up to 32K
Qwen3.7 Flash | $0.10 | $0.40 | Above 32K to 256K
Qwen3.7 Flash | $0.20 | $0.80 | Above 256K to 1M
Qwen3.7 Plus | $0.40 | $1.60 | Up to 256K
Qwen3.7 Plus | $1.20 | $4.80 | Above 256K to 1M
Qwen3.7 Max | $2.50 | $7.50 | Up to 1M

Prices above are list prices checked July 28, 2026; limited promotions and account free quotas are excluded. Check Alibaba Cloud’s newest pricing table and DeepSeek’s current pricing page before budgeting. For reasoning models, include thinking tokens in output cost. For a real product, report cost per successful task rather than price per token alone.


### Coding, Reasoning, Tools, and Long Context


#### Coding and reasoning

DeepSeek V4-Pro and Qwen3.7 Max are the sensible hosted higher-tier candidates. V4-Flash and the new Qwen3.7 Flash are more relevant to cost-sensitive automation. For local coding, Qwen3.6-27B and 35B-A3B are more practical comparison points than the much larger DeepSeek V4 weights.

Score repository tasks with compilation and tests. Separate code generation, debugging, refactoring, terminal use, and long-horizon agents. A single LiveCodeBench or terminal score cannot predict all five.


#### Structured output and tools

Both platforms document function or tool calling. Qwen3.7 Plus and Flash document structured JSON in non-thinking mode, while Alibaba’s current Max pages conflict; validate the exact Max endpoint instead of assuming support. Built-in Qwen tools normally require the Responses API or explicit tool configuration. Test valid calls, missing required arguments, invalid enum values, parallel calls, retries, and multi-turn state. Always record thinking mode because it can change both feature support and answer quality.


#### Long context

DeepSeek V4 and selected hosted Qwen models list 1M context. Qwen3.6-27B lists 262,144 native context with an extension path above 1M. These are not equivalent claims. Test native and extended modes separately, and place answerable evidence at different positions inside 32K, 128K, and 256K contexts before scaling further.


### Multimodal Work: Qwen Has the Documented Advantage

Alibaba’s current vision documentation lists Qwen3.7 Plus and Qwen3.7 Flash for text, images, and video, with 1M context and up to 64K output. The dated qwen3.7-max-2026-06-08 snapshot is multimodal, but the moving Max alias currently points to the May 20 text-only snapshot. Qwen3.6 Flash remains a documented predecessor. DeepSeek’s current official V4 API comparison centers on text generation, reasoning, JSON, and tools rather than native image or video input.

Use Qwen first for screenshot analysis, chart extraction, visual document workflows, and video understanding. This is a documented feature-fit conclusion, not a claim that Qwen won an image-quality benchmark we did not run. Each modality still needs its own accuracy, latency, token, and failure tests.


### Local Deployment and Licensing

Qwen’s current open-weight models cover more practical hardware tiers. Qwen3.6-27B is dense; Qwen3.6-35B-A3B activates 3B of its 35B total parameters. Both are dramatically smaller in total parameters than DeepSeek V4-Flash at 284B and V4-Pro at 1.6T.

DeepSeek V4 lists MIT licensing, while the Qwen3.6 open models list Apache 2.0. Both are familiar permissive licenses, but verify the exact repository and included components. A model repository can depend on code, tokenizer assets, datasets, or third-party tools with additional terms.

Before calling any model “local,” record the quantization, disk size, RAM or VRAM, runtime, context, tokens per second, cold start, and output quality loss. Use the local DeepSeek guide and GGUF vs Safetensors guide for implementation details instead of duplicating them here.


### Privacy and Data Handling

Privacy depends on the product layer. Alibaba Cloud’s Model Studio privacy notice treats prompts and outputs as customer content and says Alibaba will not use them to develop or improve Model Studio models without separate consent. It also describes encryption and security controls, but this is not a zero-retention promise.

Singapore region selection does not mean every inference operation stays physically in Singapore. Alibaba says stored request data is in Singapore while inference may use international nodes outside mainland China; transient inference-node data is not persisted. The consumer Qwen Studio service has separate privacy terms that allow some de-identified content and feedback to improve services and models. Do not transfer the API policy to the consumer chat product.

DeepSeek’s hosted service follows DeepSeek’s policy. Self-hosted DeepSeek or Qwen follows the storage, logging, operators, and network controls of the environment you manage. Compare the exact provider, region, plan, retention, abuse-monitoring logs, cross-border processing, and contractual terms before processing confidential data.


### Reproducible Account-Based Test Plan

The live fixture above is reproducible, but one task is only a smoke test. A reliable production decision needs a larger matched suite, repeated runs, and the same region and scoring rules. Self-hosted Qwen or DeepSeek results also require suitable hardware. Use this expansion plan:

- Record exact model IDs, snapshots, region, endpoint, mode, prompt format, maximum output, and date.

- Compare V4-Flash with Qwen3.7 Flash for the current economy tier, then V4-Pro with Qwen3.7 Max for higher reasoning. Keep Qwen3.6 Flash only as a dated predecessor baseline.

- Run 10 coding tasks with tests, 10 reasoning/extraction tasks, five JSON schemas, and five tool-call scenarios.

- Test multi-turn reasoning-state preservation and measure the token overhead of passing prior reasoning or summaries.

- Run 32K, 128K, and 256K retrieval fixtures with facts at multiple positions. Extend farther only after the lower tiers pass.

- Run Qwen3.7 Plus image and visual-document tasks separately. Mark unsupported DeepSeek modalities as N/A, not zero.

- Use at least three repetitions for stochastic tasks and report correctness, schema validity, tool errors, retries, token use, latency, and region-specific official cost per success.

- Publish sanitized prompts, expected answers, scoring code, and raw result fields without keys, balances, workspace IDs, account details, or private content.

The DeepSeek evaluation framework can organize the test cases. Related implementation references include the DeepSeek API guide, JSON output guide, tool-call guide, and context-caching guide.


### Practical Decision Framework

- High-volume text: start with DeepSeek V4-Flash and calculate cost with real input/output ratios.

- Hard hosted coding or reasoning: benchmark DeepSeek V4-Pro against Qwen3.7 Max.

- Images, video, or visual documents: start with Qwen3.7 Plus.

- Alibaba Cloud stack: Qwen offers the more direct platform fit, regional endpoints, and built-in services.

- Moderate self-hosting infrastructure: test Qwen3.6-27B or 35B-A3B before attempting the much larger DeepSeek V4 weights.

- Mixed workload: route low-cost text to DeepSeek, multimodal requests to Qwen, and keep both as tested fallbacks.

Use the DeepSeek model catalog, V4 guide, and pricing page for deeper DeepSeek-specific details. This comparison should remain the decision page rather than repeating those complete guides.


### Update Log

- July 28, 2026: rebuilt the comparison around DeepSeek V4 and the current Qwen3.7 Max, Plus, and Flash lineup; corrected Singapore pricing, model snapshots, multimodal support, structured-output caveats, privacy, endpoint, and lifecycle details.

- Original testing: ran one matched synthetic fixture in DeepSeek Chat, the DeepSeek API, Qwen Studio, and five Qwen API configurations; added sanitized screenshots, tokens, elapsed time, correctness, and list-cost estimates.

- Limitations: API timings are single runs, local Qwen3.6 and DeepSeek V4 weights were not benchmarked, and the fixture does not substitute for a coding, multimodal, or long-context suite.


### FAQ: DeepSeek vs Qwen


#### Is DeepSeek better than Qwen?

DeepSeek is the stronger first choice for low-cost hosted text workloads in the listed price examples. Qwen is the stronger platform fit for multimodal input, Alibaba Cloud integration, and smaller current open-weight models. Quality needs a matched benchmark.


#### Which is better for coding?

Test DeepSeek V4-Pro and Qwen3.7 Max for hosted coding agents. For a local coding model, Qwen3.6-27B or 35B-A3B is more practical than DeepSeek V4 for many teams. Use compilation, unit tests, tool errors, and accepted patches rather than one benchmark score.


#### Which is cheaper?

Qwen3.7 Flash has lower uncached short-prompt input and output list rates, while DeepSeek V4-Flash has a lower cache-hit input rate. DeepSeek V4-Flash still cost less on our one successful fixture because it generated far fewer output tokens. Compare cost per correct result, not one headline token price.


#### Which is better for multimodal work?

Qwen has the documented feature advantage. Qwen3.7 Plus supports text, image, and video input with a 1M context window. DeepSeek’s current official V4 API comparison is text-focused.


#### Which is easier to run locally?

Qwen is usually the more practical current starting point because Qwen3.6 includes 27B and 35B-A3B open weights. DeepSeek V4-Flash and Pro are far larger in total parameters. Actual feasibility still depends on quantization, runtime, context, and hardware.


#### Do DeepSeek and Qwen both support 1M context?

DeepSeek lists 1M for both V4 API models. Alibaba lists 1M for selected hosted Qwen models such as Qwen3.7 Plus. Qwen3.6-27B lists a smaller native context with an extension path above 1M. Test retrieval rather than comparing maximum numbers alone.


#### Are both model families open source?

Open-weight is the more precise general term. DeepSeek V4 repositories list MIT, while current Qwen3.6 open-weight repositories list Apache 2.0. Hosted Qwen3.7 aliases should not be described as downloadable merely because other Qwen models publish weights.


#### What did the live Qwen test show?

Qwen Studio’s Qwen3.7-Plus and four thinking-enabled API configurations returned the correct decision and valid JSON. Qwen3.7 Max with thinking disabled returned valid JSON but the wrong decision; enabling thinking corrected it with much higher token use and elapsed time. These are single-fixture observations, not general rankings.


### Official Sources

- DeepSeek Models and Pricing

- DeepSeek V4 Preview Release

- Alibaba Cloud Model Studio Model Catalog

- Newly Released Qwen Models

- Current Alibaba Cloud Model Studio Pricing

- Qwen Text-Generation Capabilities

- Qwen Visual Understanding

- Model Studio Regions and Endpoints

- Model Studio Lifecycle and Retirement Policy

- Model Studio Security and Privacy Notice

- Qwen Studio Privacy Policy

- Official Qwen3.6 Repository

- Qwen3.6-27B Model Card

- Qwen3.6-35B-A3B Model Card

## 内部链接
- [local DeepSeek guide](https://chat-deep.ai/guide/how-to-install-deepseek-locally/)
- [GGUF vs Safetensors guide](https://chat-deep.ai/guide/deepseek-gguf-vs-safetensors/)
- [DeepSeek evaluation framework](https://chat-deep.ai/docs/deepseek-evaluation-framework/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [JSON output guide](https://chat-deep.ai/docs/json-output/)
- [tool-call guide](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [context-caching guide](https://chat-deep.ai/docs/deepseek-context-caching/)
- [DeepSeek model catalog](https://chat-deep.ai/models/)
- [V4 guide](https://chat-deep.ai/models/deepseek-v4/)
- [pricing page](https://chat-deep.ai/pricing/)

## 外部链接
- [V4-Flash and V4-Pro](https://api-docs.deepseek.com/quick_start/pricing/)
- [Qwen3.7 Flash launched for Singapore on July 25, 2026](https://help.aliyun.com/en/model-studio/newly-released-models)
- [Qwen3.6-27B](https://huggingface.co/Qwen/Qwen3.6-27B)
- [Qwen3.6-35B-A3B](https://qwen.ai/blog?id=qwen3.6-35b-a3b)
- [model lifecycle policy](https://help.aliyun.com/en/model-studio/model-depreciation)
- [Alibaba Cloud’s newest pricing table](https://help.aliyun.com/zh/model-studio/model-pricing)
- [DeepSeek’s current pricing page](https://api-docs.deepseek.com/quick_start/pricing/)
- [Model Studio privacy notice](https://www.alibabacloud.com/help/en/model-studio/privacy-notice)
- [privacy terms](https://qwen.ai/privacypolicy)
- [DeepSeek Models and Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek V4 Preview Release](https://api-docs.deepseek.com/news/news260424/)
- [Alibaba Cloud Model Studio Model Catalog](https://help.aliyun.com/en/model-studio/models)
- [Newly Released Qwen Models](https://help.aliyun.com/en/model-studio/newly-released-models)
- [Current Alibaba Cloud Model Studio Pricing](https://help.aliyun.com/zh/model-studio/model-pricing)
- [Qwen Text-Generation Capabilities](https://help.aliyun.com/en/model-studio/text-generation-model/)
- [Qwen Visual Understanding](https://help.aliyun.com/zh/model-studio/vision-model)
- [Model Studio Regions and Endpoints](https://www.alibabacloud.com/help/en/model-studio/regions/)
- [Model Studio Lifecycle and Retirement Policy](https://help.aliyun.com/en/model-studio/model-depreciation)
- [Model Studio Security and Privacy Notice](https://www.alibabacloud.com/help/en/model-studio/privacy-notice)
- [Qwen Studio Privacy Policy](https://qwen.ai/privacypolicy)
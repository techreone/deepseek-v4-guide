# DeepSeek V4 vs Kimi K3 (2026): Coding, Cost & API

- **URL**: https://chat-deep.ai/comparison/kimi/
- **Published**: 2026-04-22T17:50:50+00:00
- **Modified**: 2026-07-28T10:33:44+00:00
- **Category**: DeepSeek Comparisons
- **Word count**: 3076
- **Code blocks**: 1
- **Description**: Compare DeepSeek V4 and Kimi K3 on coding, reasoning, 1M context, multimodal input, API pricing, licenses, privacy, and reproducible tests.

## H1


## H2 目录
- DeepSeek vs Kimi: the short answer
- What changed with Kimi K3
- What we tested, and what remains untested
- DeepSeek V4 vs Kimi K3 specifications
- API pricing and an illustrative cost calculation
- Coding and agent workflows
- Multimodal input
- Million-token context and caching
- Reasoning controls and API differences
- Open weights and license differences
- Privacy requires contractual clarification
- Which model should you choose?
- A reproducible Kimi K3 test plan
- Limitations
- Frequently asked questions
- Official sources
- Continue your evaluation
- Update log

## 正文
Reviewed July 28, 2026: This page has been rebuilt for Kimi K3 and DeepSeek V4. It uses current first-party documentation and a dated DeepSeek test. We did not have an authenticated Kimi API account, so no Kimi output, latency, or quality score is presented as independently tested.

DeepSeek V4 and Kimi K3 are both large mixture-of-experts model families with million-token context, reasoning, tool use, and open weights, but their product tradeoffs are now sharply different. DeepSeek publishes much lower hosted API prices and offers separate Flash and Pro routes. Kimi K3 combines a much larger active parameter count with native visual understanding, long-horizon agent behavior, and an API that is always in thinking mode.

For most text-only applications with a strict cost ceiling, DeepSeek is the more practical first benchmark. Kimi K3 belongs on the shortlist when images, video, complex agent workflows, or K3-specific coding behavior could justify a higher token bill. Neither should be selected from model size or vendor benchmark charts alone: run the same tasks, tools, evidence, and scoring rules through both.


### DeepSeek vs Kimi: the short answer


Requirement | Better starting point | Reason
Lowest published hosted API cost | DeepSeek V4 | Flash and Pro are materially cheaper per token at the listed rates.
Native image and video understanding | Kimi K3 | K3 documents native visual input; DeepSeek V4’s public API is positioned as text generation.
Choice between fast and deeper routes | DeepSeek V4 | Flash and Pro expose different cost and capacity profiles.
Always-on long-horizon reasoning | Kimi K3 | K3 always thinks and provides low, high, and max reasoning-effort controls.
Permissive model license without K3-specific scale conditions | DeepSeek V4 | DeepSeek publishes V4 under MIT; K3 uses a bespoke license with conditions for some large services.
Private long-context coding or agent workload | Test both | Specifications do not predict repository-level correctness, tool recovery, or cost per successful task.


### What changed with Kimi K3

An older DeepSeek-versus-Kimi comparison centered on Kimi K2.x is no longer adequate. Kimi K3 is a new 2.8-trillion-parameter mixture-of-experts model with 104 billion active parameters, 1,048,576-token context, native multimodal input, and an agent-oriented API. Moonshot AI describes 93 layers, Kimi Delta Attention, Gated Multi-Head Latent Attention, attention residuals, and a routing design that activates 16 of 896 experts.

The commercial details changed as well. Moonshot’s July 25, 2026 price page lists $0.30 per million cached input tokens, $3.00 per million uncached input tokens, and $15.00 per million output tokens. K3’s weights are available, but the license is not simply “MIT” or “Apache.” Large-scale consumer services and model-as-a-service businesses need to examine K3’s attribution and commercial-use conditions.

That means a current comparison must replace K2-era model names, prices, context advantages, and license claims rather than appending a short update note. The sections below use K3-specific data throughout.


### What we tested, and what remains untested

On July 28, 2026, we queried DeepSeek’s live models endpoint and ran a controlled constraint-reasoning task in DeepSeek Chat and through the API. The task tested source grounding, exact JSON structure, reasoning-token headroom, and finish-reason handling. The same evidence is useful here because it shows how DeepSeek behaved beyond its specification sheet.

We did not have access to a funded Kimi API account. Kimi’s quickstart states that API access requires a successful top-up of at least $1, and rate limits depend on the top-up tier. We did not bypass that requirement, use a third-party proxy, or present a model-card score as our own result. K3 capabilities in this article are clearly identified as officially documented until an authenticated test can be added.


#### The exact DeepSeek test prompt


```
Use only the source pack below. Return valid JSON with exactly three keys:
decision, risks, and next_step. The decision must be one sentence.
risks must be an array of exactly two strings. next_step must be one sentence.

SOURCE PACK:
- Project Falcon budget cap: $12,000.
- Vendor A costs $10,800 and can deliver May 18, 2026.
- Vendor B costs $11,500 and can deliver May 12, 2026.
- Launch deadline is May 15, 2026.
- Security review takes two business days after delivery.

Question: Which vendor, if any, can support the May 15 launch?
```

Vendor B is the correct decision. It costs less than the cap, arrives May 12, and leaves two business days for the security review before the May 15 launch. Vendor A arrives too late.


DeepSeek route | Observed result | What it demonstrates
Chat, Instant | Valid requested JSON shape, but the decision was incorrect and contradicted the dates. | Structured output can still contain a reasoning error.
Chat, Expert | Valid requested shape and the correct Vendor B decision. | The higher-reasoning route was more reliable on this one task.
V4 Flash API | HTTP 200; correct decision; 2,160 ms; 162 prompt tokens and 205 completion tokens, including 127 reasoning tokens. | Flash completed this small source-grounded task successfully.
V4 Pro API, 500-token limit | HTTP 200, but reasoning consumed all 500 completion tokens; no final content; finish_reason: length. | Thinking tokens must be included in the completion budget.
V4 Pro API, 1,600-token retest | HTTP 200; correct decision; 12,259 ms; 701 completion tokens, including 574 reasoning tokens. | The larger ceiling allowed Pro to return the final JSON.


![DeepSeek Instant benchmark result showing an incorrect vendor decision](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


![DeepSeek Expert benchmark result selecting Vendor B correctly](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)

The live GET /models response contained deepseek-v4-flash and deepseek-v4-pro. The legacy deepseek-chat and deepseek-reasoner aliases also returned HTTP 200 and resolved to deepseek-v4-flash on that date. This is a dated compatibility observation, not a guarantee. New production integrations should use current IDs and monitor provider changes.


### DeepSeek V4 vs Kimi K3 specifications


Feature | DeepSeek V4 Flash | DeepSeek V4 Pro | Kimi K3
Published parameters | 284B total / 13B active | 1.6T total / 49B active | 2.8T total / 104B active
Context | 1M tokens | 1M tokens | 1,048,576 tokens
Published maximum output | 384K tokens | 384K tokens | max_completion_tokens up to 1,048,576; default 131,072, subject to request and service limits
Input modalities | Text | Text | Text, images, and video
Reasoning control | Thinking and non-thinking modes | Thinking and non-thinking modes | Always thinking; low, high, or max effort
Structured output and tools | JSON output and tool calls | JSON output and tool calls | Strict JSON Schema, tool choice, and dynamic tool loading
Published weights license | MIT | MIT | Bespoke Kimi K3 license

K3’s 104B active parameters make it substantially larger per generated token than either DeepSeek route on paper. That may provide capacity for difficult coding, visual, and agentic tasks, but it may also increase serving requirements and does not guarantee fewer errors. Flash, Pro, and K3 should be compared on completed-task rate, not raw parameter count.


### API pricing and an illustrative cost calculation


Model | Cached input / 1M | Uncached input / 1M | Output / 1M
DeepSeek V4 Flash | $0.0028 | $0.14 | $0.28
DeepSeek V4 Pro | $0.003625 | $0.435 | $0.87
Kimi K3 | $0.30 | $3.00 | $15.00

For an illustrative request with one million uncached input tokens and 200,000 output tokens, list-price arithmetic gives approximately $0.196 on V4 Flash, $0.609 on V4 Pro, and $6.00 on Kimi K3. If the full input qualified for the published cache-hit rate, the same arithmetic would be about $0.0588, $0.177625, and $3.30 respectively.

This is not a prediction of the cost of one identical job. Models tokenize differently, may use different numbers of reasoning and visible-output tokens, and may need different retry counts. Cache eligibility also has provider-specific rules. Measure cost per accepted result, including failed tool calls and repeated context, rather than comparing only the price of one million tokens.


### Coding and agent workflows

Moonshot positions K3 for long-horizon coding and agent tasks. Its API supports explicit tool choice, strict JSON Schema, and dynamic tool loading, which can reduce the number of tool definitions sent on every turn. The quickstart also warns developers to retain the complete assistant message during multi-turn and tool-call workflows rather than saving only visible content. Reasoning state and tool metadata can be necessary for the next step.

DeepSeek V4 supports thinking, tool calls, and structured JSON, with separate Flash and Pro models that make routing by task complexity possible. Our Pro run exposed an important agent-engineering detail: a request can succeed at the HTTP layer yet produce no user-visible answer when the completion limit is consumed by reasoning. Every agent loop should inspect finish_reason, validate the schema, cap retries, and preserve an idempotency key for external actions.

A fair coding test should use private or newly written tasks rather than well-known benchmark prompts. Include repository navigation, dependency constraints, failing tests, tool errors, ambiguous requirements, and a hidden test suite. Score successful builds and tests, security regressions, unnecessary edits, tool-call count, wall time, tokens, and total cost. Vendor-published benchmark scores can inform the shortlist but should not become your production acceptance test.


### Multimodal input

Kimi K3 has a clear documented capability advantage for workflows that require visual input. Moonshot describes native understanding of images and video. The API does not accept arbitrary public image URLs: use base64 data or Moonshot file IDs. That affects ingestion design, upload latency, storage, and data-governance review.

Potential evaluation cases include interpreting a product screenshot, tracing a diagram, comparing frames from a short video, extracting evidence from photographed forms, and combining visual evidence with a long text specification. Until those tasks are run with an authenticated account, this page treats multimodality as a documented K3 capability—not a measured accuracy claim.


### Million-token context and caching

Both families now support approximately one million tokens of context, so Kimi no longer has a simple context-size advantage over DeepSeek V4. The meaningful questions are how accurately each model finds evidence across the window, how performance changes with distracting material, and what the request costs after caching.

Kimi documents automatic prefix caching when the prior prompt exceeds 256 tokens and the prefix remains unchanged. DeepSeek publishes separate cache-hit and cache-miss prices and exposes usage details. In both systems, place stable instructions and reference material before rapidly changing user content if the API semantics allow it. Record actual cached tokens rather than assuming a repeated request qualified.

Long context should not replace retrieval automatically. Retrieval can enforce permissions, keep facts fresh, produce citations, and reduce irrelevant input. Compare full-context, truncated-context, and retrieve-then-rerank variants on the same dataset. Include “answer not present” cases to detect confident invention.


### Reasoning controls and API differences

K3 is always in thinking mode. Developers select reasoning_effort as low, high, or max, with max documented as the default. Moonshot fixes sampling controls such as temperature and top-p, so the quickstart says to omit them rather than trying to tune them like a conventional chat model. DeepSeek allows thinking and non-thinking operation, making a low-cost direct route possible when deep reasoning is unnecessary.

Kimi uses the OpenAI-style base URL https://api.moonshot.ai/v1, but “compatible” should never mean “behaviorally identical.” Test streaming events, message preservation, reasoning fields, tool-call IDs, schema enforcement, token reporting, errors, and retry behavior. Moonshot also says its web-search feature is being updated and is not recommended in the near term; do not design a production citation workflow around it without rechecking the current documentation.


### Open weights and license differences

DeepSeek publishes the V4 model under the MIT license. Kimi K3 publishes full weights under its own model license. The K3 license says model-as-a-service businesses exceeding $20 million in aggregate revenue over any consecutive 12-month period need a separate agreement for commercial use. It also imposes prominent “Kimi K3” display conditions on products or services exceeding 100 million monthly active users or $20 million in monthly revenue.

The license includes exceptions concerning internal use and access through official or certified inference partners. This summary is not legal advice. Any company near those thresholds—or building a service for downstream model access—should have counsel read the complete license and confirm which entity, product, revenue, and deployment path the conditions cover.

Self-hosting either model also requires more than downloading weights. Evaluate hardware availability, quantization quality, context-memory requirements, serving throughput, upgrades, monitoring, abuse controls, and the operational cost of a 24/7 service. K3’s documented minimum serving requirements should be checked against the exact precision and throughput target before making a cost comparison with hosted APIs.


### Privacy requires contractual clarification

Moonshot’s public Kimi OpenPlatform materials do not provide wording that we can reconcile into a simple “used for training” or “never used for training” conclusion. A narrow API help statement may be read as saying API content is not used for training, while the broader public privacy and model-use documents describe using submitted content and information to provide, maintain, develop, improve, and refine technology. The privacy page also states that servers are located in Singapore.

Because those statements differ in scope and context, a production team should obtain written contractual answers covering training, human review, retention periods, deletion, backups, subprocessors, transfer locations, security controls, incident notice, and data-processing terms. Do not send confidential or regulated data based on a marketing summary or an inference from one help page.

Apply the same standard to DeepSeek. Hosted API terms, account settings, and the contract govern hosted data handling; the open-weight MIT license does not. A self-hosted deployment changes the data path but transfers security and lifecycle responsibility to the operator.


### Which model should you choose?

- Start with V4 Flash for high-volume text processing, extraction, classification, straightforward coding, and routing where unit economics matter.

- Escalate to V4 Pro for harder reasoning or coding cases, while allocating enough completion tokens for thinking and the final response.

- Evaluate Kimi K3 for visual understanding, video input, complex tool-using agents, or workloads where its larger active capacity may improve completed-task rate enough to offset the higher token price.

- Prefer self-hosting only after a total-cost review that includes hardware, serving software, security, monitoring, and staff time.

- Pause procurement if privacy, data location, or K3 license obligations cannot be confirmed in writing for the intended use.


### A reproducible Kimi K3 test plan

After funding a Kimi account, the following plan can create a real head-to-head result without changing the rules between providers.

- Freeze a test set of at least 50 private or newly authored tasks across coding, source-grounded reasoning, structured output, tools, long context, and—where relevant—images or video.

- Write an answer key, allowed evidence, expected schema, tool side effects, timeout, and pass threshold before running either provider.

- Use current explicit model IDs: DeepSeek V4 Flash, DeepSeek V4 Pro, and Kimi K3. Record the date, region, account tier, SDK version, parameters, and full raw response.

- Run low and high reasoning settings where both APIs offer a meaningful equivalent. Run K3 at documented effort levels, but do not pretend its always-thinking behavior equals DeepSeek’s non-thinking route.

- For agent tasks, simulate recoverable tool errors and prevent real external side effects. Score tool selection, argument validity, recovery, duplicate actions, and final task success.

- For long context, vary evidence position and add plausible distractors. Compare full-context and retrieval-based versions, and verify every cited passage.

- For multimodal tasks, use the same lossless source images and videos. Record preprocessing and upload method because K3 does not accept arbitrary public image URLs.

- Measure accuracy, schema validity, groundedness, build and test success, p50/p95 latency, input, cached input, reasoning/output tokens, retries, and cost per accepted result.

- Repeat nondeterministic tasks and conduct blinded human review. Publish failed cases as well as successful ones.


### Limitations

- No Kimi K3 live output was produced for this revision because an authenticated funded account was not available.

- The DeepSeek prompt is one small structured reasoning task, not a comprehensive model benchmark.

- The two latency values are single observations and cannot support a general speed ranking.

- Published model sizes, contexts, and vendor benchmarks do not guarantee application-level accuracy.

- Pricing, rate limits, license terms, and privacy language can change. Recheck the official pages and contract before deployment.


### Frequently asked questions


#### Is Kimi K3 better than DeepSeek V4?

There is no universal winner. K3 documents native image and video input, a larger active model, and agent-focused controls. DeepSeek V4 publishes much lower API prices and offers separate Flash and Pro routes. Test completed-task quality and cost on your workload.


#### How large is Kimi K3?

Moonshot’s model card lists 2.8 trillion total parameters and 104 billion active parameters, with 1,048,576 tokens of context. Parameter count is an architecture fact, not a direct quality score.


#### Which API is cheaper, DeepSeek or Kimi?

At the public rates checked July 28, 2026, DeepSeek V4 Flash and Pro are cheaper per input, cached-input, and output token than Kimi K3. Actual cost depends on reasoning length, cache hits, retries, and successful-task rate.


#### Can Kimi K3 process images and video?

Yes, Moonshot documents native image and video understanding. The API expects base64 input or Moonshot file IDs rather than arbitrary public image URLs. This capability was not independently tested for this revision.


#### Are DeepSeek V4 and Kimi K3 open source?

Both publish weights, but the licenses differ. DeepSeek V4 uses MIT. Kimi K3 uses a bespoke license with conditions for certain very large products and model-as-a-service businesses. Read the complete licenses for the planned use.


#### Does Kimi use API data for training?

We could not reconcile the scope of Kimi’s public statements into a categorical answer. Obtain written contractual confirmation about training, retention, deletion, review, data location, and subprocessors before submitting sensitive data.


#### Does Kimi K3 support the OpenAI SDK?

Kimi exposes an OpenAI-style endpoint at https://api.moonshot.ai/v1. Provider-specific reasoning, tool, multimodal, message-preservation, and sampling behavior still requires integration tests; a compatible client does not guarantee feature parity.


### Official sources

- DeepSeek API pricing

- DeepSeek V4 model card

- DeepSeek thinking mode

- Kimi K3 quickstart

- Kimi K3 model card

- Kimi K3 pricing

- Kimi K3 license

- Kimi model-use terms

- Kimi OpenPlatform privacy policy


### Continue your evaluation

Check the current DeepSeek models and DeepSeek pricing, then reproduce the API behavior with the DeepSeek API guide. Our guides to thinking mode, tool calls, JSON output, context caching, and the evaluation framework provide the controls needed for a fair rerun. Browse the comparison hub for more alternatives.


### Update log

- July 28, 2026: Replaced the obsolete K2-era comparison with Kimi K3 and DeepSeek V4 specifications, current pricing, K3 API behavior, native multimodal and agent capabilities, bespoke license conditions, privacy-document conflicts, live DeepSeek evidence, and a reproducible K3 test plan.

## 内部链接
- [DeepSeek models](https://chat-deep.ai/models/)
- [DeepSeek pricing](https://chat-deep.ai/pricing/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [thinking mode](https://chat-deep.ai/docs/deepseek-thinking-mode/)
- [tool calls](https://chat-deep.ai/docs/deepseek-tool-calls/)
- [JSON output](https://chat-deep.ai/docs/json-output/)
- [context caching](https://chat-deep.ai/docs/deepseek-context-caching/)
- [evaluation framework](https://chat-deep.ai/docs/deepseek-evaluation-framework/)
- [comparison hub](https://chat-deep.ai/comparison/)

## 外部链接
- [DeepSeek API pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek V4 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [DeepSeek thinking mode](https://api-docs.deepseek.com/guides/thinking_mode)
- [Kimi K3 quickstart](https://platform.kimi.ai/docs/guide/kimi-k3-quickstart)
- [Kimi K3 model card](https://huggingface.co/moonshotai/Kimi-K3)
- [Kimi K3 pricing](https://www.kimi.com/resources/kimi-k3-pricing)
- [Kimi K3 license](https://huggingface.co/moonshotai/Kimi-K3/blob/main/LICENSE)
- [Kimi model-use terms](https://platform.kimi.ai/docs/agreement/modeluse)
- [Kimi OpenPlatform privacy policy](https://platform.kimi.ai/docs/agreement/userprivacy)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fcomparison%2Fkimi%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fcomparison%2Fkimi%2F&text=DeepSeek%20vs%20Kimi%20AI%3A%20Which%20AI%20Model%20Should%20You%20Use%20in%202026%3F)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fcomparison%2Fkimi%2F&title=DeepSeek%20vs%20Kimi%20AI%3A%20Which%20AI%20Model%20Should%20You%20Use%20in%202026%3F)
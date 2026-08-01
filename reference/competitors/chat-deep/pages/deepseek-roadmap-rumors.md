# DeepSeek V5 Release Date & Roadmap: Official Status

- **URL**: https://chat-deep.ai/guide/deepseek-roadmap-rumors/
- **Published**: 2026-05-07T03:39:30+00:00
- **Modified**: 2026-07-28T23:57:06+00:00
- **Category**: DeepSeek Guides
- **Word count**: 1625
- **Code blocks**: 0
- **Description**: No DeepSeek V5 release date is official. Check the current V4 API status, R2 and V5 evidence, exact model IDs, dated tests and official DeepSeek sources.

## H1


## H2 目录
- DeepSeek roadmap status at a glance
- Is there an official DeepSeek V5 release date?
- What DeepSeek has officially released: V4 Preview
- What happened after the July 24 API cutoff?
- What is the official DeepSeek R2 status?
- Verified DeepSeek model and API timeline
- How to evaluate a DeepSeek release rumor
- What users and developers should do now
- Frequently asked questions
- Official sources and verification log

## 正文
Quick answer: DeepSeek has not published an official V5 release date or a single forward-looking roadmap with guaranteed launch dates in the first-party sources reviewed on July 28, 2026. The current official API model list contains deepseek-v4-flash and deepseek-v4-pro. No R2 or V5 API ID, pricing row, model card, or official release notice appeared in the sources checked for this update.


> Independent tracker: Chat-Deep.ai is not affiliated with DeepSeek. This page separates first-party confirmation from dated observation and rumor. An absence from the reviewed public sources does not prove that a model is not being researched privately; it means no public release can yet be verified. Documentation reviewed: July 28, 2026. Live API snapshots: July 25 and July 28, 2026. Each live snapshot was limited to one account, the OpenAI-format API, fixed payloads, and a short UTC window. See the dated API updates tracker for the exact scope and evidence.


### DeepSeek roadmap status at a glance


Item | Status in reviewed first-party sources | Practical conclusion
deepseek-v4-flash | Listed in the current model and pricing documentation | Current lower-cost first-party API option; benchmark it on your workload
deepseek-v4-pro | Listed in the current model and pricing documentation | Current higher-priced API option to test for harder tasks
DeepSeek V4 | The official release page remains titled “DeepSeek V4 Preview” | Available on official services; do not invent a separate GA date
deepseek-chat | Announced retirement date passed; absent from the current model list | Remove from deployable configuration even if compatibility is temporarily observed
deepseek-reasoner | Announced retirement date passed; absent from the current model list | Use a listed V4 ID and explicit thinking settings
DeepSeek R2 | No current first-party API ID, pricing row, model card, or release note found | No confirmed official release date
DeepSeek V5 | No current first-party API ID, pricing row, model card, or release note found | No confirmed official release date


### Is there an official DeepSeek V5 release date?

No official DeepSeek V5 release date was found in the first-party surfaces reviewed on July 28, 2026. The current API model list does not include a V5 identifier, the pricing table does not contain a V5 row, and the reviewed change log, official news pages, verified Hugging Face organization, and GitHub organization do not publish a V5 release artifact.

The accurate answer is therefore: there is no confirmed public V5 release date from DeepSeek. A precise date found in a social post, screenshot, forum comment, SEO article, repository guess, or prediction market should be labeled unconfirmed unless it links to a verifiable first-party announcement.


#### What would count as real V5 confirmation?

- An official DeepSeek release note or change-log entry naming V5.

- A V5 model ID returned by the official API or documented in the model reference.

- A first-party pricing row, model card, technical report, or verified open-weight repository.

- A dated official platform notice that can be independently verified.

Repository activity, new inference kernels, hiring, infrastructure investment, or research papers may show technical direction, but they do not establish a V5 product name or release date. The same applies to the retirement of an older API alias: a lifecycle deadline for one route is not evidence of a different model launch.


### What DeepSeek has officially released: V4 Preview

DeepSeek’s April 24, 2026 V4 announcement introduced V4 Pro and V4 Flash, official chat and app access, hosted API access, and open weights. It describes V4 as a preview and documents both models with a 1M context window, thinking and non-thinking modes, OpenAI- and Anthropic-compatible interfaces, and agent-oriented improvements.

The current DeepSeek V4 guide explains the two variants and open-weight artifacts. For hosted applications, the deployable names should come from GET /models, not from a local repository name or an old tutorial. The official list currently identifies:

- deepseek-v4-flash

- deepseek-v4-pro

DeepSeek has not published a separate first-party page in the reviewed sources that renames V4 Preview to “V4 GA” or promises a different final checkpoint on a particular date. The safest description is the one DeepSeek itself currently uses: V4 Preview is officially available. If the company later changes the label, model IDs, prices, or weights, this page should record that as a new dated event rather than rewriting history.


### What happened after the July 24 API cutoff?

DeepSeek’s V4 notice announced that deepseek-chat and deepseek-reasoner would become inaccessible after July 24, 2026 at 15:59 UTC. That deadline has passed. The old names are absent from the current first-party model list.

Live behavior was not stable across Chat-Deep.ai’s dated checks. On July 25, both aliases returned HTTP 400. On July 28, both returned HTTP 200 and the responses identified V4 Flash as the served model; GET /models still listed only the two V4 IDs. This later result is best described as observed compatibility, not as a reversal of the official notice or a renewed support guarantee.

Developers should therefore migrate configuration rather than test whether an old name happens to work today. Use the V4 migration guide, set thinking mode explicitly, retest tool calls and response fields, and keep the unlisted aliases out of fallbacks and rollback values.


### What is the official DeepSeek R2 status?

No current first-party R2 API ID, pricing row, model card, or official release notice was found in the sources reviewed for this update. That means there is no confirmed public R2 release date to place on a roadmap.

R2 and V5 are not interchangeable labels. R2 would imply a successor in the R reasoning family; V5 would imply a later general model generation. A third-party report about one does not confirm the other. Dated reporting and its limitations belong in the separate DeepSeek R2 status tracker. On this page, the verified status is simply “not officially confirmed in the reviewed first-party sources.”


### Verified DeepSeek model and API timeline


Date | Verified event | Why it matters now
January 20, 2025 | DeepSeek announced R1 and served it through the then-current deepseek-reasoner alias | The alias historically changed underlying models; it was never a permanent family identifier
May 2025 | The official change log recorded R1-0528 behind the reasoning route | Historical tutorials must be read with their date
December 1, 2025 | DeepSeek-V3.2 became the hosted generation behind the legacy aliases | The same API names no longer meant R1
April 24, 2026 | DeepSeek announced V4 Preview, V4 Flash, V4 Pro, new IDs, and the July retirement deadline | Current integrations should use explicit V4 model and thinking choices
July 24, 2026 | The announced cutoff time passed | The aliases are no longer listed as current models
July 25, 2026 | A bounded Chat-Deep.ai test saw HTTP 400 for both old aliases | Dated observation, not a universal status-code contract
July 28, 2026 | A bounded retest saw both aliases route to V4 Flash while GET /models still returned only V4 Flash and V4 Pro | Compatibility behavior can change; unlisted names remain unsafe for deployment


### How to evaluate a DeepSeek release rumor

- Identify the exact claim. A model name, API availability, open weights, web rollout, and a research preview are different events.

- Open the primary source. A screenshot or summary is not enough when the original page can be checked.

- Check the model list and pricing table. A hosted production release normally needs an accessible ID and documented commercial terms.

- Check verified model repositories. Confirm organization ownership, model card, license, files, and publication date.

- Separate reporting from confirmation. Reputable reporting may describe plans, but a planned date is still not a shipped model.

- Record the check date. An accurate status statement can become wrong when the product changes.


### What users and developers should do now

- Use the current DeepSeek model list rather than waiting for an unconfirmed V5 date.

- Use deepseek-v4-flash or deepseek-v4-pro for the hosted API and confirm your account with GET /models.

- Remove legacy aliases from code, environment variables, gateways, fallback arrays, dashboards, and test fixtures.

- Benchmark both current models on your own quality, latency, cost, and concurrency requirements.

- Check current DeepSeek pricing immediately before approving a budget.

- Do not redesign an application around a rumored model name or launch date.


### Frequently asked questions

No official V5 release date was found in the first-party sources reviewed on July 28, 2026. Any precise date should be treated as unconfirmed until DeepSeek publishes a release artifact.

No V5 ID, pricing row, model card, or official release note appeared in the reviewed sources. The current hosted API list contains V4 Flash and V4 Pro.

Yes. DeepSeek officially released V4 Preview through its services, API, and open-weight repositories. The reviewed official release page still uses the word “Preview”; this tracker does not invent a separate GA status.

Their announced retirement deadline passed and they are absent from the current model list. Live behavior varied in two bounded checks: HTTP 400 on July 25 and temporary V4 Flash routing on July 28. Do not depend on them even if they respond in a particular environment.

No confirmed R2 release date was found in the first-party sources reviewed for this update. Follow the dedicated R2 tracker for clearly labeled dated reporting.


### Official sources and verification log

- DeepSeek V4 Preview release

- DeepSeek API model list

- DeepSeek models and pricing

- DeepSeek API change log

- Verified DeepSeek organization on Hugging Face

- Verified DeepSeek organization on GitHub

Verification conclusion: As of July 28, 2026, DeepSeek’s confirmed public API line is V4 Flash and V4 Pro. V4 remains presented through the official V4 Preview release page. DeepSeek has not published an official R2 or V5 release date in the sources reviewed. Until a new model appears in a first-party release note, model list, pricing table, model card, or change log, a precise launch date remains unconfirmed.

## 内部链接
- [dated API updates tracker](https://chat-deep.ai/docs/deepseek-api-updates/)
- [DeepSeek V4 guide](https://chat-deep.ai/models/deepseek-v4/)
- [V4 migration guide](https://chat-deep.ai/docs/migrate-deepseek-chat-reasoner-to-v4/)
- [DeepSeek R2 status tracker](https://chat-deep.ai/news/deepseek-r2-tracker-release-date/)
- [the current DeepSeek model list](https://chat-deep.ai/models/)
- [current DeepSeek pricing](https://chat-deep.ai/pricing/)

## 外部链接
- [current API model list](https://api-docs.deepseek.com/api/list-models)
- [pricing table](https://api-docs.deepseek.com/quick_start/pricing/)
- [change log](https://api-docs.deepseek.com/updates)
- [April 24, 2026 V4 announcement](https://api-docs.deepseek.com/news/news260424/)
- [DeepSeek V4 Preview release](https://api-docs.deepseek.com/news/news260424/)
- [DeepSeek API model list](https://api-docs.deepseek.com/api/list-models)
- [DeepSeek models and pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek API change log](https://api-docs.deepseek.com/updates)
- [Verified DeepSeek organization on Hugging Face](https://huggingface.co/deepseek-ai/models)
- [Verified DeepSeek organization on GitHub](https://github.com/deepseek-ai)
- [(no anchor)](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchat-deep.ai%2Fguide%2Fdeepseek-roadmap-rumors%2F)
- [(no anchor)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fchat-deep.ai%2Fguide%2Fdeepseek-roadmap-rumors%2F&text=DeepSeek%20V5%20Release%20Date%20and%202026%20Roadmap%3A%20Official%20Status)
- [(no anchor)](https://www.linkedin.com/shareArticle?url=https%3A%2F%2Fchat-deep.ai%2Fguide%2Fdeepseek-roadmap-rumors%2F&title=DeepSeek%20V5%20Release%20Date%20and%202026%20Roadmap%3A%20Official%20Status)
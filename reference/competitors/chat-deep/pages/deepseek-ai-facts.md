# DeepSeek Facts: Verified Answers & Release Timeline

- **URL**: https://chat-deep.ai/guide/deepseek-ai-facts/
- **Published**: 2026-04-06T13:51:14+00:00
- **Modified**: 2026-07-29T12:17:29+00:00
- **Category**: DeepSeek Guides
- **Word count**: 2659
- **Code blocks**: 1
- **Description**: Check verified DeepSeek facts and a source-backed release timeline covering its founder, models, API names, open weights, privacy, safety, and stock status.

## H1


## H2 目录
- How we verified these DeepSeek facts
- DeepSeek facts at a glance
- Company and ownership facts
- Model and API facts
- Open-weight and local-use facts
- Privacy, safety, and regulation facts
- Business and stock facts
- DeepSeek release timeline
- Common DeepSeek claims: true, false, or incomplete?
- What can change after this review?
- Sources

## 正文
Check verified DeepSeek facts and a source-backed release timeline covering its founder, models, API names, open weights, privacy, safety, and stock status. Last fact-checked: July 28, 2026.

DeepSeek changes quickly, so many “DeepSeek facts” pages mix historical model names, current API details, company reports, and speculation. This page does something narrower: it checks specific claims against dated primary sources and clearly labels the places where only reliable reporting—not an official company statement—is available.

If you want a beginner explanation, start with What Is DeepSeek?. Use this page as a fact-check and timeline.

Disclosure: Chat-Deep.ai is an independent resource. It is not DeepSeek, DeepSeek.com, the official DeepSeek app, or the official developer platform.


### How we verified these DeepSeek facts

We use this source order:

- Official DeepSeek sources: API documentation, release notes, model cards, policies, terms, and the transparency center.

- Official public authorities: privacy regulators, government security directions, and investor-protection guidance.

- Reliable financial reporting: used for private-company funding and IPO reports when no public issuer filing exists.

- Our inference: used only when clearly labelled and supported by the cited facts.

We do not treat a model’s answer about itself, an anonymous social-media account, a third-party host, or a crypto-token listing as proof.


### DeepSeek facts at a glance


Claim | Verdict | Evidence level
DeepSeek is a Chinese AI company founded by Liang Wenfeng | True | Official legal policies identify the operating company; Reuters and AP document the founder and 2023 origin
DeepSeek is one model | False | Official release history and model cards show multiple model families
V4 is the current official release line | True on the sources reviewed | Official V4 release, transparency center, and API docs
deepseek-v4-flash and deepseek-v4-pro are the current API IDs | True | Official List Models endpoint reference
deepseek-chat and deepseek-reasoner are current permanent model identities | False | Official changelog shows their changing historical mappings and announced retirement
The hosted DeepSeek service and a local checkpoint have the same privacy profile | False | Official privacy policy applies to hosted services; local processing depends on the user’s deployment
DeepSeek is completely open source in every sense | Incomplete | V4 weights are MIT-licensed, but hosted services and every third-party derivative are not the same artifact
DeepSeek stores hosted-service personal data only in the user’s country | False | Official privacy policy says DeepSeek directly processes and stores personal data in the PRC
DeepSeek guarantees accurate answers | False | Official policy and terms warn that outputs may be inaccurate
DeepSeek has a public stock ticker | False | No public listing; financial reports describe it as private


### Company and ownership facts


#### Fact 1: DeepSeek is operated by a Hangzhou-based Chinese company

DeepSeek’s current privacy policy and terms identify the provider and controller as Hangzhou DeepSeek Artificial Intelligence Co., Ltd., with a registered address in China. Reliable reporting places the company in Hangzhou and describes it as founded in 2023.

What is fact: the operating company, country, and location are stated in DeepSeek’s own legal documents.

What is reported: Reuters, AP, and other outlets identify Liang Wenfeng as the founder and describe DeepSeek’s origin in 2023.


#### Fact 2: High-Flyer was DeepSeek’s original financial base, but “wholly owned forever” is no longer safe wording

Liang Wenfeng also co-founded the quantitative hedge fund High-Flyer. DeepSeek was historically backed by High-Flyer, and Reuters described Liang as the controlling shareholder in 2025 based on Chinese corporate records.

In 2026, however, Reuters and other financial outlets reported DeepSeek’s first outside funding round. Unless a current cap table is public, it is safer to say that DeepSeek was founded and historically financed through High-Flyer, with outside financing reported in 2026. Do not repeat old claims that High-Flyer remains the company’s sole owner.


#### Fact 3: DeepSeek and the DeepSeek chatbot are related but not identical concepts

“DeepSeek” can refer to the company, its model families, the official web/app service, the developer API, or an open-weight checkpoint. These paths can use different model versions, policies, infrastructure, and controls.

A third-party website or local application can also run a DeepSeek model without being operated or endorsed by DeepSeek. Always identify the provider as well as the model.


### Model and API facts


#### Fact 4: V4 is the current official model line on the sources reviewed

DeepSeek announced the V4 Preview release on April 24, 2026. Its transparency center lists DeepSeek-V4 with that release date, and the current API documentation exposes V4 model IDs.

The official V4 release includes:

- DeepSeek-V4-Flash: the smaller, faster, more economical V4 option;

- DeepSeek-V4-Pro: the larger V4 option positioned for harder reasoning, coding, knowledge, and agentic workloads.

“Preview” is part of the official launch wording. Do not quietly rewrite it as a final GA designation unless DeepSeek publishes that change.


#### Fact 5: The current official API model IDs are deepseek-v4-flash and deepseek-v4-pro

DeepSeek’s official List Models reference currently returns only these two IDs:


```
deepseek-v4-flash
deepseek-v4-pro
```

They support the OpenAI-style Chat Completions interface at https://api.deepseek.com. DeepSeek also documents an Anthropic-compatible interface at https://api.deepseek.com/anthropic.


#### Fact 6: deepseek-chat and deepseek-reasoner were changing API aliases, not permanent family names

The historical record matters:

- In January 2025, deepseek-reasoner exposed DeepSeek-R1.

- In May 2025, the same API name was upgraded to R1-0528.

- In August 2025, both legacy names mapped to thinking and non-thinking modes of V3.1.

- In December 2025, they mapped to V3.2 modes.

- In April 2026, DeepSeek said they temporarily mapped to V4-Flash modes and would be retired on July 24, 2026.

The deadline has now passed, while some DeepSeek documentation still contains the old future-tense footnote. The current List Models source is the safer operational reference and lists only the two V4 IDs.

Practical rule: preserve the old names only when explaining history or migration. Do not build a new integration around them. If an old name happens to return a response, treat that as undocumented compatibility behavior, not a guaranteed contract.


#### Fact 7: Both current V4 API models have a documented 1M context length

DeepSeek’s official V4 release, model card, and pricing table document a one-million-token context length for V4-Flash and V4-Pro. The API pricing page also lists a maximum output of 384K tokens.

This does not mean every application should send one million tokens or request a 384K output. Latency, cost, retrieval quality, attention quality, and application limits still matter. “Supported maximum” is not “recommended default.”


#### Fact 8: Both V4 API models support thinking and non-thinking modes

The Chat Completions API uses a thinking object with enabled or disabled. Thinking mode can help with harder tasks but does not guarantee factual accuracy. For short classification, extraction, and routine transformation, non-thinking mode is usually the more efficient starting point.


#### Fact 9: API compatibility does not mean identical behavior

DeepSeek documents OpenAI- and Anthropic-compatible interfaces. That can make SDK migration easier, but it does not guarantee every parameter, streaming detail, tool behavior, error shape, or model capability is identical to another provider.

For example, DeepSeek’s current Chat Completions reference marks some familiar penalty parameters as deprecated, documents its own thinking controls, and has provider-specific rate and keep-alive behavior. Test the exact feature you use instead of assuming drop-in equivalence.


#### Fact 10: DeepSeek’s public API is a text/model API, not proof of an official hosted image generator

DeepSeek has published multimodal research and open models such as Janus, but the current public API documentation reviewed for this page lists the V4 text models and Chat/FIM interfaces—not a general hosted image-generation endpoint.

A third-party product may combine a DeepSeek language model with another image model. That does not make the image service an official DeepSeek API feature.


### Open-weight and local-use facts


#### Fact 11: DeepSeek publishes official open weights

DeepSeek’s official V4 model cards publish weights for V4-Flash and V4-Pro and list the repository and model weights under the MIT License. The company also publishes technical reports and inference material.

The precise phrase for a deployment page is “official open-weight model”. It tells readers what they can actually download without implying that every part of the hosted service, training pipeline, dataset, application, and third-party derivative is open.


#### Fact 12: A model license must be checked at the exact checkpoint

Do not copy one license sentence across the entire DeepSeek catalog. Check:

- the exact repository and checkpoint;

- the license file at the time of download;

- whether the artifact is official, distilled, quantized, or third-party;

- any upstream model obligations; and

- your intended redistribution or commercial use.

V4’s official card is strong evidence for V4. It is not automatic evidence for every older or derivative artifact using “DeepSeek” in its name.


#### Fact 13: Local inference can keep prompts away from DeepSeek’s hosted service—but only if it is truly local

If you download an official checkpoint and run inference entirely on infrastructure you control, prompts do not need to be sent to DeepSeek’s hosted API. That can materially change the privacy and data-residency profile.

This is an architectural inference, not a guarantee about every “local AI” app. The runtime, plugins, telemetry, update service, vector database, logs, and connected tools may still send data elsewhere. Review the complete stack.


### Privacy, safety, and regulation facts


#### Fact 14: The official hosted service may collect prompts, files, chat history, and device/network data

DeepSeek’s privacy policy, last updated February 10, 2026, lists categories that can include account data, text and voice input, prompts, uploaded files, photos, feedback, chat history, IP address, device identifiers, logs, approximate location, cookies, and payment information depending on the service used.

The policy also says the services are not designed or intended to process sensitive personal data and tells users not to provide it.


#### Fact 15: DeepSeek says hosted-service personal data is directly processed and stored in China

DeepSeek’s privacy policy says that, to provide its services, it directly collects, processes, and stores personal data in the People’s Republic of China. It also describes service-provider, search, analytics, safety-monitoring, and corporate-group processing.

This is a hosted-service fact. It should not be copied onto a truly self-hosted checkpoint as if the local model automatically sends prompts to China.


#### Fact 16: Users have a documented training opt-out, but that is not a zero-retention promise

DeepSeek’s current privacy policy describes a right to opt out of using personal data for model training or technology optimization. Its March 2026 Terms of Use refer to turning off “Improve the model for everyone.”

Opting out of training is not the same as zero collection or zero retention. The privacy policy separately says retention depends on the data type, purpose, sensitivity, and legal requirements. Read the current settings and policy together.


#### Fact 17: DeepSeek does not guarantee that outputs are accurate or professional advice

DeepSeek’s own terms say outputs may contain errors or omissions and should not be treated as professional advice. They specifically call for human review when outputs are used for decisions with legal or material impact on people, including credit, education, employment, housing, insurance, legal, and medical decisions.

Thinking mode, web search, JSON Output, or a long context window can improve a workflow. None converts the model into a verified source of truth.


#### Fact 18: Government restrictions are real, but “DeepSeek is banned everywhere” is false

Public authorities took different actions in 2025:

- Australia’s PSPF Direction 001-2025 required Australian Government entities to prevent access, use, or installation of DeepSeek products on government systems and devices.

- Taiwan announced restrictions for government agencies and critical-infrastructure contexts.

- Italy’s data-protection authority ordered an urgent limitation on processing Italian users’ data in January 2025.

- South Korea’s PIPC reviewed DeepSeek’s practices, issued corrective and improvement recommendations, and documented changes made during the review.

These actions are important evidence for privacy, jurisdiction, and institutional risk assessments. They are not proof that every individual in every country is prohibited from using every locally hosted DeepSeek checkpoint.


### Business and stock facts


#### Fact 19: DeepSeek is still private and has no public ticker

DeepSeek does not have a publicly traded stock, official public price, or retail brokerage ticker. Reuters reported private funding and possible onshore IPO preparations in 2026, followed by a report that a proposed second fundraising round was paused.

Reported private valuations are not public market prices, and IPO preparation is not a completed listing. See the dated DeepSeek Stock and IPO Status page for the financial-source timeline.


#### Fact 20: A similarly named crypto token is not DeepSeek equity

DeepSeek has said it did not issue a cryptocurrency. A token or wallet contract using the DeepSeek name is not a share in Hangzhou DeepSeek Artificial Intelligence Co., Ltd. Verify company announcements through official DeepSeek links and never treat a copied logo as proof.


### DeepSeek release timeline


Date | Release or event | Why it matters
2023 | DeepSeek founded | Liang Wenfeng established the Hangzhou AI company after building High-Flyer
May 7, 2024 | DeepSeek-V2 | The modern efficiency story: Mixture-of-Experts, MLA, and 128K context in the official paper/model card
September 5, 2024 | DeepSeek-V2.5 | Combined the general chat and Coder-V2 lines
December 26, 2024 | DeepSeek-V3 | Expanded the main general model line with a 671B-total-parameter MoE architecture
January 20, 2025 | DeepSeek-R1 | Major reasoning-focused release; deepseek-reasoner exposed R1 at that time
May 28, 2025 | DeepSeek-R1-0528 | Updated the reasoning model and added stronger JSON/function-calling support
August 21, 2025 | DeepSeek-V3.1 | Unified thinking and non-thinking modes and strengthened agent/tool use
September 29, 2025 | DeepSeek-V3.2-Exp | Introduced the experimental long-context attention direction that preceded V3.2
December 1, 2025 | DeepSeek-V3.2 | Reasoning-first agent model and the last main V3 release before V4
April 24, 2026 | DeepSeek-V4 Preview | V4-Pro and V4-Flash, 1M context, new V4 API IDs, and open weights
July 24, 2026 | Announced legacy-alias retirement deadline | The deadline for deepseek-chat and deepseek-reasoner passed; the official model list now shows only V4 IDs


### Common DeepSeek claims: true, false, or incomplete?


#### “DeepSeek R1 is the current API model.”

False today, historically true in a narrower sense. In January 2025, deepseek-reasoner exposed R1. The current official API list is V4-Flash and V4-Pro. R1 remains an important open reasoning family and historical release.


#### “DeepSeek-chat always meant the same model.”

False. DeepSeek’s changelog shows that the alias moved through V2, V2.5, V3, V3.1, V3.2, and a temporary V4-Flash compatibility mapping.


#### “DeepSeek is free.”

Incomplete. The official consumer chat has been offered without a per-token API bill, while the official developer API is usage-priced. Third-party hosts and local infrastructure have their own costs and limits.


#### “DeepSeek is open source.”

Incomplete without the artifact. Official open-weight checkpoints exist, and V4’s official weights are MIT-licensed. The hosted app/API and every derivative or third-party service are not automatically covered by that sentence.


#### “Using DeepSeek locally sends my prompts to DeepSeek.”

Not necessarily. A truly local, offline deployment does not need the official hosted API. The surrounding runtime or plugins may still communicate externally, so inspect the whole application.


#### “DeepSeek is banned.”

Too broad. Some regulators limited a hosted service, and some governments prohibited it on official systems. Rules differ by country, organization, product path, and date.


#### “A 1M context window means the model understands any one-million-token document perfectly.”

False. Context capacity is an input limit/capability, not a guarantee of recall, reasoning quality, or accuracy across every position and task.


### What can change after this review?

The following facts require frequent checks:

- the model IDs returned by the API;

- prices and concurrency limits;

- whether V4 remains labelled Preview;

- privacy-policy, Terms of Use, and Open Platform Terms dates;

- consumer app features and regional availability;

- government restrictions;

- funding and IPO status; and

- licenses for newly published checkpoints.

For current implementation details, use our DeepSeek API Guide, DeepSeek Models, and DeepSeek Pricing pages, then confirm the final value in the official DeepSeek documentation.


### Sources


#### Official DeepSeek sources

- DeepSeek Transparency Center

- DeepSeek V4 Preview release

- DeepSeek List Models

- DeepSeek API changelog

- DeepSeek Chat Completions reference

- DeepSeek Models & Pricing

- Official DeepSeek-V4-Pro model card

- Official DeepSeek-V4-Flash model card

- DeepSeek Privacy Policy

- DeepSeek Terms of Use

- DeepSeek Open Platform Terms

- DeepSeek Model Mechanism and Training Methods


#### Official public-authority sources

- Australia PSPF directions

- Taiwan Ministry of Digital Affairs announcement

- Italian Data Protection Authority order

- South Korea PIPC examination results


#### Company-history and financing sources

- Reuters company explainer

- AP company explainer

- Reuters July 2026 funding/IPO report

- Reuters July 25, 2026 funding-pause report

## 内部链接
- [What Is DeepSeek?](https://chat-deep.ai/guide/what-is-deepseek/)
- [DeepSeek Stock and IPO Status](https://chat-deep.ai/guide/deepseek-stock/)
- [DeepSeek API Guide](https://chat-deep.ai/docs/api/)
- [DeepSeek Models](https://chat-deep.ai/models/)
- [DeepSeek Pricing](https://chat-deep.ai/pricing/)

## 外部链接
- [List Models reference](https://api-docs.deepseek.com/api/list-models/)
- [DeepSeek Transparency Center](https://www.deepseek.com/en/transparency/)
- [DeepSeek V4 Preview release](https://api-docs.deepseek.com/news/news260424/)
- [DeepSeek List Models](https://api-docs.deepseek.com/api/list-models/)
- [DeepSeek API changelog](https://api-docs.deepseek.com/updates/)
- [DeepSeek Chat Completions reference](https://api-docs.deepseek.com/api/create-chat-completion/)
- [DeepSeek Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [Official DeepSeek-V4-Pro model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [Official DeepSeek-V4-Flash model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)
- [DeepSeek Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [DeepSeek Terms of Use](https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html)
- [DeepSeek Open Platform Terms](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html)
- [DeepSeek Model Mechanism and Training Methods](https://cdn.deepseek.com/policies/en-US/model-algorithm-disclosure.html)
- [Australia PSPF directions](https://www.protectivesecurity.gov.au/protective-security-directions-under-pspf)
- [Taiwan Ministry of Digital Affairs announcement](https://moda.gov.tw/en/press/press-releases/15104)
- [Italian Data Protection Authority order](https://gpdp.it/web/guest/home/docweb/-/docweb-display/docweb/10097450)
- [South Korea PIPC examination results](https://www.pipc.go.kr/eng/user/ltn/new/noticeDetail.do?bbsId=BBSMSTR_000000000001&nttId=2819)
- [Reuters company explainer](https://www.investing.com/news/stock-market-news/explainerwhat-is-deepseek-and-why-is-it-disrupting-the-ai-sector-3832137)
- [AP company explainer](https://apnews.com/article/f4908eaca221d601e31e7e3368778030)
- [Reuters July 2026 funding/IPO report](https://www.investing.com/news/stock-market-news/chinas-deepseek-to-raise-fresh-capital-at-74-billion-valuation-ahead-of-onshore-ipo-sources-say-4799575)
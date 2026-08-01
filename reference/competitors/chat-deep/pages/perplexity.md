# DeepSeek vs Perplexity: Research, Coding & Pricing

- **URL**: https://chat-deep.ai/comparison/perplexity/
- **Published**: 2026-05-14T18:00:17+00:00
- **Modified**: 2026-07-29T12:07:11+00:00
- **Category**: DeepSeek Comparisons
- **Word count**: 3982
- **Code blocks**: 0
- **Description**: Compare DeepSeek and Perplexity for cited research, coding, everyday tasks, API access, pricing and privacy, with practical strengths and tradeoffs.

## H1


## H2 目录
- Quick verdict: DeepSeek vs Perplexity
- DeepSeek vs Perplexity comparison table
- The core difference most comparisons miss
- Choose DeepSeek if…
- Choose Perplexity if…
- Research and citations: Perplexity wins
- Coding and developer workflows: DeepSeek usually wins
- API comparison: raw model API vs search-grounded API
- Pricing and value: which is cheaper?
- Accuracy and hallucinations: citations help, but they do not solve everything
- Privacy and business data: compare equivalent products before uploading sensitive material
- Best tool by use case
- A practical workflow using both tools
- Pros and cons
- Final recommendation
- FAQ: DeepSeek vs Perplexity

## 正文
Last verified: July 29, 2026.

DeepSeek and Perplexity change quickly. Model names, pricing, limits, and privacy terms should always be verified on the official pages before you make a purchasing, engineering, or business-data decision.


### Quick verdict: DeepSeek vs Perplexity

Choose Perplexity if your main job is research. It is better when you need current information, web sources, citations, topic discovery, market scanning, academic-style research, or source-backed answers. Perplexity describes itself as an AI-powered search engine that searches the web in real time and returns conversational answers backed by citations and original source links.

Choose DeepSeek if your main job is reasoning, coding, long-context analysis, or low-cost API usage. DeepSeek is better when you want a powerful model family for technical tasks, math/STEM reasoning, code generation, long documents, agent backends, or self-hosting/open-weight experimentation. DeepSeek’s current official V4 models include DeepSeek-V4-Pro and DeepSeek-V4-Flash, with 1M context length and web, app, API, and open-weight distribution paths.

The most accurate answer is not “DeepSeek is better” or “Perplexity is better.” The right answer is: Perplexity is a research and answer engine; DeepSeek is a model platform. For serious workflows, the strongest setup is often to use Perplexity to find and verify sources, then use DeepSeek to reason, code, summarize, structure, or analyze the material.


### DeepSeek vs Perplexity comparison table


Category | DeepSeek | Perplexity | Better choice
Core purpose | Model family, chat product, API platform, and open-weight model release | AI search/research assistant with citations, live web retrieval, and model orchestration | Depends on task
Research | Strong for analyzing provided material, but not primarily a citation-first research engine | Built around source-backed answers, live web search, Pro Search, and Research mode | Perplexity
Current information | Can be useful when search is available, but the API is primarily model-focused | Real-time web search is central to the product | Perplexity
Citations | Not the main product differentiator | Core strength; answers include links and citations | Perplexity
Coding | Strong fit for coding, reasoning, debugging, and agent backends | Useful for researching docs, framework changes, and code explanations; less of a pure coding model platform | DeepSeek
Long-context work | DeepSeek V4 lists 1M context length | Sonar Deep Research lists 128K context in API docs | DeepSeek for raw context
API usage | OpenAI/Anthropic-compatible DeepSeek API with low token prices | Search API, Sonar API, Agent API, embeddings, and web-grounded responses | DeepSeek for raw model cost; Perplexity for retrieval
Pricing/value | Very cost-efficient API token pricing | Higher API costs, but includes search, citations, and retrieval value | Depends on whether search is needed
Privacy/business use | Official consumer services have PRC processing and storage disclosures. Open Platform applications, third-party hosting, and self-hosting require separate assessments. | Individual, Enterprise, and Sonar API terms differ. Perplexity’s official plan documentation says Enterprise Pro/Max and Sonar API data is not logged or used for training. | Perplexity documents its enterprise and API commitments more explicitly; the final decision depends on the exact product and deployment
Best user | Developers, technical users, model experimenters, cost-sensitive API builders | Researchers, students, analysts, marketers, journalists, founders, and knowledge workers | Depends on workflow


### The core difference most comparisons miss

Comparing DeepSeek and Perplexity is partly asymmetric.

DeepSeek is closer to an engine. It provides models, a chat interface, an API, and open-weight releases that developers can integrate into apps, coding agents, automation tools, and local or private deployments. DeepSeek’s API documentation says its API is compatible with OpenAI and Anthropic API formats, and its current API examples use deepseek-v4-pro.

Perplexity is closer to a research workflow. It combines search, retrieval, model selection, source ranking, citations, and answer synthesis into one product. Its help center says responses include citations and links to original sources, and that content is sourced from the web in real time.

A simple way to think about it:

- DeepSeek helps you think, code, transform, and build.

- Perplexity helps you search, verify, cite, and discover.

That distinction matters because many “DeepSeek vs Perplexity” comparisons treat both tools like normal chatbots. They are not. Perplexity is strongest when the answer depends on fresh external information. DeepSeek is strongest when the task depends on reasoning over a prompt, a codebase, a document, or a long context window.


### Choose DeepSeek if…


#### You want stronger value for coding and technical reasoning

DeepSeek is a better fit if your work involves writing code, refactoring, debugging, explaining algorithms, solving math-heavy problems, or powering a coding assistant. DeepSeek’s V4 release notes describe V4-Pro as having enhanced agentic capabilities and strong reasoning across Math, STEM, and coding, while V4-Flash is positioned as the faster and more economical option.

Use DeepSeek for:

- Debugging a function or API integration

- Refactoring code with detailed constraints

- Explaining a complex algorithm

- Summarizing a long technical document

- Building an internal tool around an LLM API

- Running open-weight models through self-hosted or third-party infrastructure


#### You care about low API token costs

DeepSeek is especially attractive for developers who need high-volume model calls. As of the latest official pricing page checked, DeepSeek lists deepseek-v4-flash at $0.14 per 1M input tokens on cache miss and $0.28 per 1M output tokens, while deepseek-v4-pro is listed at $0.435 per 1M input tokens on cache miss and $0.87 per 1M output tokens. Cache-hit input pricing is lower when applicable.

That makes DeepSeek compelling for workloads such as classification, extraction, summarization, agent reasoning, code assistance, and long-context processing where you do not need live web search on every request.


#### You need long-context processing

DeepSeek V4’s official model card lists a 1M context length, with DeepSeek-V4-Pro and DeepSeek-V4-Flash as the current model names.

That matters if you regularly work with:

- Long PDFs

- Large code files

- Multi-document analysis

- Long transcripts

- Technical specifications

- Contracts or policy documents that must be reviewed as a whole

A long context window does not automatically mean better answers. You still need clear prompts and verification. But for raw capacity, DeepSeek has a major advantage over many search-first tools.


#### You want open-weight flexibility

DeepSeek V4 is distributed through open-source repositories and API access, and its model card lists the open-source repository assets under the MIT License.

That makes DeepSeek more interesting for developers and organizations that want deployment flexibility, experimentation, model inspection, local inference, fine-tuned workflows, or reduced dependency on a single hosted consumer app.


### Choose Perplexity if…


#### You need research with citations

Perplexity is the stronger choice when your output needs to be verifiable. Its product is designed to search the web, synthesize information, and show source links. Perplexity’s help center says each response includes citations and original-source links so users can verify information and explore further.

Use Perplexity for:

- Market research

- Academic source discovery

- News and policy monitoring

- Product comparisons

- Competitor research

- Fact-checking drafts

- Finding primary sources

- Building a sourced research brief


#### You need current information

Perplexity is better when the answer depends on what changed recently. The platform says it sources content from the web in real time as questions are asked.

That makes it more suitable for questions like:

- “What changed in this regulation this month?”

- “Which companies launched competing products recently?”

- “What are analysts saying about this market now?”

- “What are the newest docs for this framework?”

- “What sources support this claim?”

DeepSeek can still help analyze current information after you provide it, but Perplexity is usually the better first stop for finding and verifying that information.


#### You want deeper web research without manually opening dozens of tabs

Perplexity’s Pro Search is designed for complex questions. Its help center says Pro Search performs multiple searches, draws from sources such as articles, academic papers, forums, videos, and other content types, then synthesizes the information with direct source links.

For more complex work, Perplexity’s Research mode performs dozens of searches, reads hundreds of sources, reasons through the material, and produces a comprehensive report.

That is the clearest reason to choose Perplexity over DeepSeek: you are not just asking a model to answer; you are asking a research system to go find evidence.


### Research and citations: Perplexity wins

For research, Perplexity is the better default.

The reason is not that Perplexity is always “smarter.” It is that Perplexity’s product is built around retrieval and verification. It searches, ranks, cites, and lets you inspect the sources behind an answer. That is crucial when you are writing a report, researching competitors, checking medical or legal-adjacent information, reviewing academic material, or preparing content that needs citations.

DeepSeek can summarize and reason well, but if you ask a model-only system for current facts without giving it sources, you increase the risk of outdated or unsupported claims. DeepSeek’s own privacy policy warns that model outputs may not always be factually accurate and says users should not rely on factual accuracy without verification.

Practical example:If you are writing a market analysis on AI search engines, use Perplexity first to gather source-backed information from company pages, filings, news, and research. Then use DeepSeek to group the findings, identify patterns, draft the narrative, or turn the research into a structured memo.


### Coding and developer workflows: DeepSeek usually wins

For coding, DeepSeek is often the stronger choice because it is a model platform with cost-efficient API access, long-context capacity, and open-weight deployment options.

That does not mean Perplexity is bad for developers. Perplexity can be excellent when the coding task depends on fresh documentation, recent GitHub issues, framework changes, or comparing implementation approaches. Its Pro Search documentation specifically mentions code interpretation, debugging, simulations, and technical explanations as use cases.

The practical difference is:

- Use Perplexity to research what changed, find docs, compare libraries, and verify external references.

- Use DeepSeek to write, refactor, debug, reason through, or generate code once the context is known.

Practical example:A developer debugging a new framework issue might start with Perplexity to find recent docs, changelog discussions, and GitHub issues. Then they can paste the relevant error, source snippets, and constraints into DeepSeek to reason through a fix.


### API comparison: raw model API vs search-grounded API

DeepSeek and Perplexity both offer developer APIs, but they solve different problems.


#### DeepSeek API

DeepSeek’s API is designed for direct model access. As verified on July 29, 2026, the current model list shows deepseek-v4-flash and deepseek-v4-pro. DeepSeek’s April 24 notice said that deepseek-chat and deepseek-reasoner would become inaccessible after July 24, 2026 at 15:59 UTC; that deadline has passed. Use a documented V4 ID and configure thinking mode explicitly.

DeepSeek API is a good fit for:

- Chatbots

- Coding agents

- Summarization pipelines

- Classification

- Extraction

- Long-document processing

- Internal productivity tools

- High-volume LLM tasks


#### Perplexity API

Perplexity’s API platform is best when you need search, retrieval, and grounded answers. Perplexity describes its Search API as real-time web search with ranked results, domain filtering, multi-query search, and content extraction. It describes Sonar as web-grounded chat completions and reasoning models.

Perplexity also offers an Agent API for workflows across supported frontier models with built-in web search, URL fetching, and reasoning controls. Its API pricing page says the Agent API provides access to third-party models from providers including OpenAI, Anthropic, Google, xAI, Z.AI, Moonshot AI, and NVIDIA.

Perplexity API is a good fit for:

- Search-powered apps

- Research assistants

- Due diligence tools

- Market intelligence products

- Citation-backed answers

- Retrieval-heavy workflows

- AI search experiences

- Fact-checking systems


#### Which API is better?

Use DeepSeek API if your cost driver is tokens and reasoning. Use Perplexity API if your cost driver is research quality, live retrieval, citations, and source discovery.

For example, if you are summarizing 20,000 internal support tickets, DeepSeek is probably the better value. If you are building a tool that must answer questions using live web sources with citations, Perplexity is the better fit.


### Pricing and value: which is cheaper?

DeepSeek is usually cheaper for raw model usage. Perplexity can be more valuable when search, citations, and retrieval save human time.

As of the official pages checked, DeepSeek API pricing is very low on a per-token basis: deepseek-v4-flash is listed at $0.14 per 1M input tokens on cache miss and $0.28 per 1M output tokens, while deepseek-v4-pro is listed at $0.435 per 1M input tokens on cache miss and $0.87 per 1M output tokens.

Perplexity’s API pricing is structured differently because it includes search and retrieval components. Its Search API is listed at $5 per 1,000 requests with no token costs, while Sonar pricing includes token costs plus request fees depending on search context size. Its pricing page lists Sonar at $1 input and $1 output per 1M tokens, Sonar Pro at $3 input and $15 output, and Sonar Deep Research at $2 input, $8 output, $2 citation tokens, $5 per 1,000 search queries, and $3 reasoning tokens.

For consumer subscriptions, Perplexity Pro is advertised at $20/month on Perplexity’s Pro perks page, while Perplexity Max costs $200/month or $2,000/year according to the official help center.

For enterprise subscriptions, Perplexity lists Enterprise Pro at $40 per seat per month or $400 per year, and Enterprise Max at $325 per seat per month or $3,250 per year.

Bottom line:If you only need a model to process text, DeepSeek is usually the cheaper option. If you need a research assistant that finds, reads, ranks, cites, and synthesizes sources, Perplexity’s higher cost may be justified.


### Accuracy and hallucinations: citations help, but they do not solve everything

Perplexity has an advantage because it gives you links to sources. That makes verification easier. But citations are not magic. A cited answer can still misunderstand a source, miss context, overgeneralize, or cite a weak page.

DeepSeek has an advantage when the task is internal reasoning: code, math, structure, logic, or long-context analysis. But when you ask it for facts without giving it sources, you should treat the answer as a draft, not as verified truth.

The safest workflow is:

- Use Perplexity to gather current, source-backed information.

- Open the most important primary sources yourself.

- Use DeepSeek to reason over the material.

- Ask either tool to identify uncertainties, assumptions, and missing evidence.

- Verify anything related to money, law, health, security, compliance, or technical specifications.

For high-stakes work, never rely on either tool as the final authority.


### Privacy and business data: compare equivalent products before uploading sensitive material

Privacy is an important difference between DeepSeek and Perplexity, but the comparison must separate consumer accounts, enterprise products, hosted APIs, third-party hosting, and self-hosting.

DeepSeek’s Privacy Policy applies to official services that link to it. For those covered services, it describes collection of user inputs, uploaded files, feedback, chat history, account and device information, and logs. It also describes training and service-improvement uses, an opt-out right, and direct processing and storage in the People’s Republic of China.

The policy expressly excludes processing rules for personal data collected from end users inside downstream applications built through the Open Platform. Under the Open Platform Terms, the downstream application operator must disclose its processing rules, establish an appropriate legal basis, and handle the applicable end-user privacy responsibilities.

Provider-side API processing still requires review of the platform terms, account and caching settings, logs, retention, architecture, support access, and any written contract. Third-party-hosted and self-hosted DeepSeek deployments have different data paths and should not inherit the official consumer-service conclusion automatically.

Perplexity’s privacy posture also varies by product. Its official plan comparison says users of Pro, Education Pro, and Max can opt out of data collection in their settings. It separately states that Enterprise Pro and Enterprise Max data, and Sonar API data, is not logged or used for training.

These commitments make Perplexity Enterprise and Sonar API easier to evaluate for some business workflows. They should not be presented as applying automatically to every individual account, integration, connector, uploaded persistent file, or third-party service. Buyers must review the exact plan and enabled features.

That does not mean every organization should automatically choose Perplexity. A fair evaluation should compare Perplexity Enterprise with an approved DeepSeek Open Platform, third-party-hosted, or self-hosted deployment—not solely with DeepSeek’s consumer policy. A secured self-hosted DeepSeek model may provide greater infrastructure control, while Perplexity Enterprise or Sonar may offer clearer managed-service commitments.

Do not upload confidential customer information, private source code, legal documents, medical records, credentials, trade secrets, or regulated data until the exact tool, plan, data flow, contract, retention behavior, logs, and deployment route have been approved.


### Best tool by use case


Use case | Best choice | Why
Quick factual lookup | Perplexity | Faster path to current sources and citations
Academic source discovery | Perplexity | Better for finding papers, citations, and source trails
Long PDF analysis | DeepSeek | Strong long-context fit if you provide the document
Coding help | DeepSeek | Better for model-driven reasoning, generation, and debugging
Debugging a new framework issue | Use both | Perplexity for recent docs; DeepSeek for the fix
Market research | Perplexity | Stronger discovery and source verification
Competitive analysis | Perplexity first, DeepSeek second | Search first, then synthesize
API cost control | DeepSeek | Lower raw token pricing
Search-powered app | Perplexity | Search API and Sonar are designed for retrieval
Internal model experimentation | DeepSeek | Open-weight and API flexibility
Business research team | Perplexity | Enterprise controls, research workflows, citations
Sensitive regulated data | Neither by default | Use approved enterprise/private deployment only


### A practical workflow using both tools

The best DeepSeek vs Perplexity workflow is not either/or. It is sequential.


#### Step 1: Use Perplexity to collect sources

Ask Perplexity:


> Find the most recent official and primary sources about [topic]. Prioritize company documentation, regulatory pages, research papers, and reputable news. Summarize the main claims and include citations.

Then open the most important sources yourself. Save the official pages, reports, or documents that matter.


#### Step 2: Use DeepSeek to analyze the material

Give DeepSeek the verified material and ask:


> Analyze these sources. Extract the key differences, contradictions, assumptions, and decision criteria. Create a structured recommendation for [audience] with risks and next steps.

This works especially well for long documents, code, product requirements, and technical comparisons.


#### Step 3: Use Perplexity again to verify weak points

Return to Perplexity for claims that need fresh verification:


> Verify whether the pricing, model names, limits, and policy details in this draft are still current. Use official sources first.


#### Step 4: Use DeepSeek to polish the final output

Use DeepSeek to turn the verified research into a clean memo, code plan, article outline, technical spec, or executive summary.

This combined workflow avoids the biggest weakness of each tool: Perplexity can be too source-synthesis oriented for deep reasoning, while DeepSeek can produce unsupported factual claims if you do not give it verified sources.


### Pros and cons


#### DeepSeek pros

- Strong fit for reasoning, coding, math, STEM, and technical analysis

- Very competitive API token pricing

- 1M context length in current V4 documentation

- OpenAI/Anthropic-compatible API formats

- Open-weight deployment options

- Useful for developers, agent builders, and long-context workflows


#### DeepSeek cons

- Not primarily a citation-first research engine.

- Requires more manual verification for current facts.

- Privacy and data-residency terms need careful review.

- The published legacy-alias transition deadline has passed; current integrations should use the documented V4 model IDs and continue monitoring DeepSeek’s change log.

- Consumer chat experience may not replace a dedicated research workflow.


#### Perplexity pros

- Excellent for live web research and source-backed answers.

- Citations make fact-checking easier.

- Pro Search and Research mode are designed for complex information gathering.

- Strong fit for students, analysts, marketers, writers, founders, and researchers.

- Search API, Sonar API, and Agent API support retrieval-heavy products.

- Enterprise Pro, Enterprise Max, and Sonar API have explicitly documented no-logging and no-training commitments; individual plans have different settings and must be assessed separately.


#### Perplexity cons

- API usage can cost more than raw model calls

- Not always the best option for pure coding or long-context reasoning

- Citations still require human verification

- Model menus, limits, and subscription features change often

- Some advanced features may be plan-dependent


### Final recommendation

For most people, the decision is simple:

Use Perplexity when the answer depends on the outside world. That includes current events, market research, academic sources, competitor analysis, product comparisons, policy updates, and anything that needs citations.

Use DeepSeek when the answer depends on reasoning over the material you provide. That includes coding, math, technical analysis, long documents, structured writing, agent backends, and cost-sensitive API workloads.

For professional work, the best answer is often:


> Perplexity for discovery and verification. DeepSeek for reasoning and production.

That pairing gives you the biggest practical advantage: sources first, reasoning second, verification before publishing.


### FAQ: DeepSeek vs Perplexity


#### Is DeepSeek better than Perplexity?

DeepSeek is better for coding, reasoning-heavy tasks, long-context analysis, model experimentation, and low-cost API usage. Perplexity is better for live research, citations, current information, and source-backed answers. The better tool depends on whether your task needs a powerful model or a research engine.


#### Is Perplexity better than DeepSeek for research?

Yes, in most research workflows. Perplexity is designed to search the web, synthesize information, and show citations. DeepSeek can analyze sources well after you provide them, but Perplexity is usually stronger for finding, comparing, and verifying sources in the first place.


#### Which is better for coding, DeepSeek or Perplexity?

DeepSeek is usually better for direct coding tasks such as generation, debugging, refactoring, and reasoning through technical problems. Perplexity is useful when the coding task depends on recent documentation, current framework changes, or source discovery. Developers often benefit from using both.


#### Which is cheaper, DeepSeek or Perplexity?

For raw API token usage, DeepSeek is usually cheaper based on current official token pricing. Perplexity can cost more because its APIs include search, retrieval, citations, and research context. For users, Perplexity’s subscription value depends on how much time its research features save.


#### Does DeepSeek have live web search like Perplexity?

Not in the same product sense. DeepSeek may include search-related functionality depending on the app and availability, and its privacy policy references third-party APIs used to provide search services. But DeepSeek’s API documentation is primarily model-focused, while Perplexity’s core product and APIs are built around real-time web retrieval, ranking, and citations.


#### Does Perplexity use DeepSeek?

You should not assume that Perplexity uses DeepSeek unless Perplexity lists it in the current model picker or official documentation. Perplexity’s current help article says it gives access to models from companies such as OpenAI and Anthropic as well as proprietary and open-source models, and its listed Pro Search models include Sonar, GPT-5.2, Claude Sonnet 4.6, Gemini 3.1 Pro, Claude Opus for Max/Enterprise users, and NVIDIA Nemotron.


#### Can I use DeepSeek and Perplexity together?

Yes. A strong workflow is to use Perplexity for source discovery and verification, then use DeepSeek to analyze the verified material, write code, summarize documents, structure recommendations, or produce a final draft. This reduces unsupported claims while taking advantage of DeepSeek’s reasoning and cost efficiency.


#### Which is better for students?

Perplexity is usually better for students doing research because it helps find sources and citations. DeepSeek is useful for explaining concepts, solving practice problems, summarizing notes, and working through code or math. Students should still verify sources and follow their institution’s AI-use policy.


#### Which is better for developers?

DeepSeek is usually better for developers who need a low-cost model API, coding help, long-context reasoning, or open-weight experimentation. Perplexity is better for developers building search-powered apps or researching current documentation, release notes, and technical sources.


#### Which is safer for business data?

Neither product is universally safer without reviewing the exact route. Perplexity’s current documentation provides explicit no-logging and no-training commitments for Enterprise Pro, Enterprise Max, and Sonar API. Individual Perplexity plans have different controls.

DeepSeek’s consumer Privacy Policy describes collection, training and improvement uses, an opt-out right, and PRC processing and storage for official services covered by that policy. It does not govern end-user processing inside downstream Open Platform applications. DeepSeek API applications, third-party hosting, and self-hosting must therefore be assessed separately.

For sensitive business data, choose only after comparing the operator, provider-side processing, contract, region, retention, training terms, logs, caching, subprocessors, access controls, deletion process, and security architecture.


#### What are the best alternatives to DeepSeek and Perplexity?

The best alternative depends on the job. For general AI chat, use a general-purpose assistant. For coding, use a code-first AI development tool. For private data, use an approved enterprise AI platform or self-hosted model. For research, use a citation-focused research assistant or traditional search combined with primary sources.

## 外部链接
- [AI-powered search engine](https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity)
- [DeepSeek-V4-Pro and DeepSeek-V4-Flash](https://api-docs.deepseek.com/news/news260424)
- [OpenAI and Anthropic API formats](https://api-docs.deepseek.com/)
- [content is sourced from the web in real time](https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work)
- [DeepSeek lists deepseek-v4-flash](https://api-docs.deepseek.com/quick_start/pricing)
- [DeepSeek V4’s official model card](https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf)
- [MIT License](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [Perplexity’s Pro Search is designed for complex questions](https://www.perplexity.ai/help-center/en/articles/10352903-what-is-pro-search)
- [Perplexity’s Research mode performs dozens of searches](https://www.perplexity.ai/help-center/en/articles/10738684-what-is-research-mode)
- [DeepSeek’s own privacy policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [current model list](https://api-docs.deepseek.com/api/list-models/)
- [Search API as real-time web search with ranked results](https://docs.perplexity.ai/docs/search/quickstart)
- [Sonar as web-grounded chat completions](https://docs.perplexity.ai/docs/sonar/quickstart)
- [Agent API for workflows across supported frontier models](https://docs.perplexity.ai/docs/agent-api/quickstart)
- [Its Search API is listed at $5 per 1,000 requests](https://docs.perplexity.ai/docs/getting-started/pricing)
- [Perplexity Pro is advertised at $20/month](https://www.perplexity.ai/properks)
- [Perplexity Max costs $200/month](https://www.perplexity.ai/help-center/en/articles/11680686-perplexity-max)
- [Enterprise Pro at $40 per seat per month](https://www.perplexity.ai/help-center/en/articles/10352986-enterprise-pricing-and-billing-frequently-asked-questions)
- [Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [Open Platform Terms](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html)
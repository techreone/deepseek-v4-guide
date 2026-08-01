# DeepSeek vs Grok: Coding, Research & Live Data

- **URL**: https://chat-deep.ai/comparison/xai-grok/
- **Published**: 2025-10-12T22:53:34+00:00
- **Modified**: 2026-07-29T12:07:18+00:00
- **Category**: DeepSeek Comparisons
- **Word count**: 3612
- **Code blocks**: 0
- **Description**: Compare DeepSeek and Grok for coding, research, current information, pricing, API access, privacy and everyday use to choose the right assistant.

## H1


## H2 目录
- Quick Verdict: DeepSeek vs Grok AI
- What Is DeepSeek?
- What Is Grok AI?
- DeepSeek vs Grok AI: Feature Comparison
- Pricing and API Cost: DeepSeek Is Much Cheaper
- Coding and Developer Workflows: Grok Is More Integrated, DeepSeek Is More Flexible
- Real-Time Research: Grok AI Has the Clear Advantage
- Long Context and Document Handling: DeepSeek Has the Edge over Grok 4.5
- Open Weights and Self-Hosting: DeepSeek Wins
- Multimodal Features: Grok AI Has the Broader Product Stack
- Accuracy, Benchmarks, and Reasoning: Treat Public Scores Carefully
- Privacy, Data Handling, and Enterprise Risk
- Pros and Cons of DeepSeek
- Pros and Cons of Grok AI
- Best Choice by User Type
- Should You Use DeepSeek and Grok Together?
- Final Verdict: DeepSeek vs Grok AI
- FAQ

## 正文
Last Updated: July 11, 2026

DeepSeek is usually the better choice if you want low-cost API usage, open-weight models, self-hosting flexibility, and long-context text workflows. Grok AI is usually the better choice if you need real-time web and X search, multimodal features, a polished consumer chatbot, or a coding-focused workflow around Grok 4.5 and Grok Build.

That is the practical answer. The better tool depends on what you are buying: model control and cost efficiency or live information access and integrated product experience.

As of July 2026, DeepSeek’s current official API lineup centers on deepseek-v4-flash and deepseek-v4-pro, both with 1M-token context windows and thinking/non-thinking modes. Grok’s current flagship API model is grok-4.5, which xAI/SpaceXAI positions for code, chat, agentic tool calling, and configurable reasoning with a 500K-token context window.

This comparison is based on official documentation, privacy policies, and independent benchmark pages available at the time of writing—not private hands-on testing.


### Quick Verdict: DeepSeek vs Grok AI


Use case | Better choice | Why
Lowest API cost | DeepSeek | DeepSeek’s official API pricing is far lower for both V4-Flash and V4-Pro than Grok 4.5’s listed pricing.
Coding agent workflows | Grok AI for integrated tools; DeepSeek for cost/control | Grok 4.5 is positioned as xAI’s main model for code and agentic work, while DeepSeek V4 is also optimized for agent capabilities and can be cheaper at scale.
Real-time web research | Grok AI | Grok has official Web Search and X Search tools for real-time web and social content.
Social listening / X monitoring | Grok AI | X Search can perform keyword search, semantic search, user search, and thread fetch on X.
Open weights / self-hosting | DeepSeek | DeepSeek V4 is officially described as open-sourced/open-weight, and Hugging Face lists the V4-Pro weights under the MIT License.
Long-document text analysis | DeepSeek | DeepSeek V4-Pro and V4-Flash list 1M context length; Grok 4.5 lists 500K.
Image, video, and voice ecosystem | Grok AI | xAI lists separate APIs for voice, images, and video, while Grok 4.5 supports text/image input and text output.
Enterprise API privacy controls | Grok AI, if ZDR is available to your account | xAI says API inputs/outputs are not used for training without explicit permission and offers Zero Data Retention for enterprise accounts.
Privacy-sensitive self-hosting | DeepSeek, if you deploy open weights yourself | Self-hosting can reduce vendor-side data exposure, but official hosted DeepSeek services have their own privacy policy and data residency considerations.
Casual chatbot experience | Grok AI for personality; DeepSeek for direct utility | Grok is designed as a witty assistant across Grok.com, apps, and X; DeepSeek is more developer/model-centric in this comparison.


### What Is DeepSeek?

DeepSeek is an AI company and model provider best known for cost-efficient reasoning and open-weight model releases. Its current official API documentation lists two V4 models: DeepSeek-V4-Flash and DeepSeek-V4-Pro. Both support OpenAI-format and Anthropic-format API access, thinking and non-thinking modes, JSON output, tool calls, chat prefix completion, and a 1M-token context length.

DeepSeek announced the V4 Preview on April 24, 2026, describing V4-Pro as a 1.6T-total-parameter MoE model with 49B active parameters and V4-Flash as a smaller 284B-total-parameter model with 13B active parameters. The same release says DeepSeek V4 is open-sourced and that official services use a 1M context length.

For developers, the key point is simple: DeepSeek is attractive when token cost, long context, model portability, and open-weight deployment matter.


### What Is Grok AI?

Grok AI is xAI’s conversational AI product and model ecosystem. It is available through Grok.com, mobile apps, X, and xAI’s developer API. xAI’s consumer FAQ describes Grok as a conversational generative AI that can help with question answering, information retrieval, creative writing, image generation and editing, image/video understanding, and coding assistance.

For developers, xAI’s current documentation lists Grok 4.5 as its flagship coding and agentic model, with a 500K-token context window and official pricing of $2.00 per 1M input tokens and $6.00 per 1M output tokens. Other Grok models, such as Grok 4.3, may expose different context limits, so this comparison specifically refers to Grok 4.5.

The biggest difference from DeepSeek is not just the model. It is the ecosystem. Grok has official Web Search and X Search tools, plus dedicated APIs for voice, image, and video workflows.


### DeepSeek vs Grok AI: Feature Comparison


Category | DeepSeek | Grok AI
Current flagship API models | deepseek-v4-flash, deepseek-v4-pro | grok-4.5
Context window | 1M tokens for V4-Flash and V4-Pro | 500K tokens for Grok 4.5
API pricing | V4-Flash: $0.14 input / $0.28 output per 1M cache-miss tokens. V4-Pro: $0.435 input / $0.87 output per 1M cache-miss tokens. | Grok 4.5: $2.00 input / $6.00 output per 1M tokens; cached input $0.50 per 1M tokens.
Open weights | Yes for DeepSeek V4 releases | No for Grok 4.5
Self-hosting | Possible with open weights, hardware permitting | Not available for Grok 4.5 weights
Built-in real-time web search | Not documented in the same first-party API way as Grok’s Web Search/X Search tools | Yes, through official Web Search and X Search tools
X / Twitter data | No native X-specific tool documented in DeepSeek API docs | Yes, X Search supports X posts, users, and threads
Multimodal ecosystem | Mainly text-focused in the V4 API docs reviewed here | Text, code, voice, images, and video across xAI APIs
Enterprise privacy option | Depends on deployment; self-hosting may provide more control | API has 30-day default retention and enterprise Zero Data Retention option
Best fit | Cost-sensitive developers, open-weight deployment, long-context text, self-hosted workflows | Real-time research, X monitoring, multimodal apps, coding agents, consumer chatbot use

Sources: DeepSeek API model/pricing documentation, xAI model/pricing documentation, and xAI search-tool documentation.


### Pricing and API Cost: DeepSeek Is Much Cheaper

For API-heavy workloads, DeepSeek has the clearer cost advantage.

DeepSeek’s official pricing page lists V4-Flash at $0.14 per 1M cache-miss input tokens and $0.28 per 1M output tokens. V4-Pro is listed at $0.435 per 1M cache-miss input tokens and $0.87 per 1M output tokens. Cache-hit input prices are much lower: $0.0028 for V4-Flash and $0.003625 for V4-Pro per 1M tokens.

Grok 4.5 is priced higher: xAI’s pricing page lists $2.00 per 1M input tokens, $0.50 per 1M cached input tokens, and $6.00 per 1M output tokens for the Chat API.

That does not mean Grok is overpriced for every user. Grok’s value is strongest when its integrated tools save time: Web Search, X Search, coding workflows, multimodal APIs, and enterprise features. But if your main cost driver is millions or billions of text tokens, DeepSeek is usually easier to justify financially.


#### Practical cost takeaway

Choose DeepSeek if you are building:

- High-volume chatbots.

- Internal document-analysis tools.

- Long-context summarization pipelines.

- Coding assistants where open-weight control matters.

- Batch processing or agent workflows with heavy token usage.

Choose Grok AI if you are building:

- Current-events research tools.

- X/social monitoring systems.

- Coding tools that benefit from Grok Build or xAI’s integrated tool stack.

- Multimodal apps that need image, video, or voice APIs.

- Enterprise apps where xAI’s security controls fit your compliance needs.


### Coding and Developer Workflows: Grok Is More Integrated, DeepSeek Is More Flexible

For coding, the answer is not a simple “DeepSeek wins” or “Grok wins.”

Grok 4.5 is the stronger choice if you want a ready-made coding and agentic workflow. xAI calls Grok 4.5 its flagship model for code and agentic tool calling, and its model guide says to use Grok 4.5 for code and chat.

Artificial Analysis also reports strong coding-agent results for Grok 4.5 in Grok Build, saying it scored 76 on its Coding Agent Index and ranked near leading coding-agent systems in that evaluation. Treat that as an independent benchmark signal, not a guarantee that Grok will outperform in your codebase.

DeepSeek is the stronger choice if you want lower cost, open weights, and deployment control. DeepSeek’s V4 release emphasizes agentic coding, open-weight availability, and integration with coding agents such as Claude Code, OpenClaw, and OpenCode.


#### Which is better for coding?

Use Grok AI if your workflow needs:

- A coding-focused hosted product experience.

- Agentic coding in Grok Build or Cursor-style environments.

- Real-time web research during coding.

- Multimodal context, such as screenshots or design references.

- Less infrastructure responsibility.

Use DeepSeek if your workflow needs:

- Lower per-token API cost.

- Open-weight access.

- Self-hosting or private deployment.

- Long-context codebase analysis.

- Anthropic/OpenAI-compatible API migration.

The safest developer decision is to test both on your own repository: bug fixing, refactoring, test generation, dependency migration, and multi-file reasoning. Public benchmarks are useful, but real codebases expose issues that benchmarks miss.


### Real-Time Research: Grok AI Has the Clear Advantage

Grok’s strongest practical advantage over DeepSeek is real-time information access.

xAI documents a Web Search tool that lets Grok search the web in real time, browse webpages, extract relevant information, and produce answers with up-to-date content.

xAI also documents X Search, which allows Grok to perform keyword search, semantic search, user search, and thread fetch on X. That makes Grok unusually useful for social listening, breaking news, creator monitoring, market reactions, and sentiment checks around public conversations.

There is one important caveat: Grok’s model page says Grok has no access to real-time events unless search tools are enabled. In other words, Grok is not magically live in every API call; developers need to enable the relevant server-side tools.

DeepSeek supports tool calls and agent workflows in its API, but the official DeepSeek model details reviewed here list JSON output, tool calls, chat prefix completion, and FIM completion rather than a native Grok-style Web Search/X Search product.


#### Research verdict

Choose Grok AI for:

- Current events.

- News monitoring.

- X/Twitter discourse.

- Public sentiment research.

- Market reaction tracking.

- Source-aware web research.

Choose DeepSeek for:

- Long-document analysis.

- Internal research over your own files.

- Offline or private knowledge workflows.

- Cost-sensitive summarization.

- Self-hosted retrieval-augmented generation systems.


### Long Context and Document Handling: DeepSeek Has the Edge over Grok 4.5

DeepSeek V4-Flash and V4-Pro officially support a 1M-token context window and up to 384K output tokens. Grok 4.5 currently lists a 500K-token context window. This comparison refers specifically to Grok 4.5, as xAI offers other Grok models with different context limits.

That gives DeepSeek the edge for very large text inputs: legal archives, documentation sets, codebase summaries, long transcripts, and multi-document analysis. However, a larger context window does not automatically mean better answers. Long-context quality depends on retrieval strategy, prompt structure, model behavior, and whether the relevant facts remain salient.


#### Practical rule

Use DeepSeek when you need to push large volumes of text into a single request at low cost. Use Grok when the “document” includes live webpages, X threads, images, or current public data.


### Open Weights and Self-Hosting: DeepSeek Wins

DeepSeek is the clear winner for open-weight and self-hosting use cases.

DeepSeek’s V4 Preview announcement describes the model as open-sourced, and the V4-Pro Hugging Face page says the repository and model weights are licensed under the MIT License.

Artificial Analysis also lists DeepSeek V4-Pro as open weights and notes that the model weights are publicly available for self-hosting.

Grok 4.5 is proprietary. Artificial Analysis states that Grok 4.5 is not open source and that its model weights are not publicly available.


#### Why this matters

Open weights matter if your team needs:

- More control over infrastructure.

- Fine-grained privacy boundaries.

- On-prem or private-cloud deployment.

- Vendor-risk reduction.

- Model inspection and reproducibility.

- Custom inference optimization.

- Long-term fallback if an API changes.

Grok can still be a good enterprise API choice, but it is not the right fit if your requirement is “we must be able to run the model ourselves.”


### Multimodal Features: Grok AI Has the Broader Product Stack

Grok AI is stronger for multimodal workflows.

xAI’s website and docs describe one API ecosystem for text, code, voice, images, and video, with separate APIs for voice and Imagine image/video generation.

Artificial Analysis lists Grok 4.5 as supporting text and image input with text output, while DeepSeek V4-Pro is listed as text input and text output only.

That makes Grok a better fit for:

- Screenshot analysis.

- Image-grounded Q&A.

- Social media content workflows.

- Voice agents.

- Image and video generation products.

- Creator tools.

DeepSeek can still be very strong for text-only reasoning, coding, and long-context analysis, but it is not the broader multimodal platform in this comparison.


### Accuracy, Benchmarks, and Reasoning: Treat Public Scores Carefully

Independent benchmark data suggests that both tools are strong, but they are strong in different ways.

Artificial Analysis lists Grok 4.5 with a score of 54 on its Intelligence Index, a 500K-token context window, text/image input, and text output.

Artificial Analysis lists DeepSeek V4-Pro in Reasoning Max Effort with a score of 44, a 1M-token context window, text input/output, open weights, and 1.6T total parameters with 49B active parameters.

These scores should not be treated as the final answer for your use case. Benchmarks can be affected by prompting, provider implementation, tool availability, latency constraints, and evaluation design. For example, the same benchmark page notes DeepSeek V4-Pro is strong but also relatively slow and verbose in that evaluation.


#### Practical accuracy takeaway

- Pick Grok AI if your accuracy problem depends on fresh public information, web/X retrieval, images, or integrated tools.

- Pick DeepSeek if your accuracy problem depends on long internal context, cost-efficient reasoning, and private/custom deployment.

- For production, run a task-specific evaluation with your own prompts, files, latency targets, and acceptable error thresholds.


### Privacy, Data Handling, and Enterprise Risk

Privacy is not just “which model is safer?” It depends on whether you use the consumer chatbot, hosted API, enterprise plan, or self-hosted weights.


#### DeepSeek privacy considerations

DeepSeek’s privacy policy says the service is provided and controlled by Hangzhou DeepSeek Artificial Intelligence Co., Ltd. in China. It also says DeepSeek directly collects, processes, and stores personal data in the People’s Republic of China to provide its services.

The policy says DeepSeek retains personal data as long as necessary for the services and other stated purposes, including legal obligations, legitimate business interests, service improvement, safety, security, and legal claims. It also says users may have the right to opt out of using personal data for model training or technology optimization.

That does not mean DeepSeek is unusable for business. It means sensitive workloads should be evaluated carefully, especially if you are using the hosted service rather than self-hosting open weights.


#### Grok AI privacy considerations

xAI’s privacy policy applies to Grok.com and the Grok mobile apps, but it explicitly says it does not apply to data processed on behalf of customers of xAI business offerings such as the xAI API. It also says using Grok on X is governed by X’s privacy policy and terms, not the xAI privacy policy.

For the API, xAI’s security FAQ says xAI does not train on customer API inputs or outputs without explicit permission, stores API requests and responses for 30 days for abuse/misuse auditing, and automatically deletes that data after 30 days. Enterprise customers can request Zero Data Retention, which xAI says prevents storage of API request and response data.


#### Privacy verdict

Choose DeepSeek self-hosted if you need maximum infrastructure control and can operate open weights responsibly.

Choose xAI/Grok API with enterprise controls if you need a hosted API with documented API retention rules, audit logs, and Zero Data Retention availability.

Avoid sending sensitive personal data, trade secrets, regulated health data, financial records, or legal documents to either consumer chatbot unless your organization has approved the exact deployment and data-processing terms.


### Pros and Cons of DeepSeek


#### Pros

- Much cheaper API pricing for text-heavy workloads.

- 1M-token context length for V4-Flash and V4-Pro.

- Open-weight V4 release with MIT-licensed V4-Pro weights.

- Strong fit for self-hosting, private deployment, and long-context analysis.

- OpenAI- and Anthropic-format API compatibility.

- Useful for developers who want model portability and cost control.


#### Cons

- Hosted-service privacy and data residency require careful review.

- Less polished as a broad consumer/multimodal ecosystem than Grok.

- No first-party X Search equivalent.

- Text-focused compared with Grok’s image, video, and voice ecosystem.

- Open-weight self-hosting requires serious infrastructure and security work.


### Pros and Cons of Grok AI


#### Pros

- Strong real-time web and X Search capabilities.

- Grok 4.5 is positioned as the flagship model for code, chat, and agentic tool calling.

- Broad API ecosystem across text, code, voice, images, and video.

- Better fit for public research, social listening, market monitoring, and current events.

- xAI documents API retention, no-training-without-permission policy, and enterprise Zero Data Retention.


#### Cons

- Higher API pricing than DeepSeek.

- Grok 4.5 weights are proprietary and not available for self-hosting.

- Real-time access requires search tools to be enabled in API usage.

- Grok on X is governed by X’s privacy policy and terms, not just xAI’s Grok policy.

- Some availability and policy details can vary by region and product surface; xAI’s Grok 4.5 release note, for example, said it was not yet available in the EU at launch.


### Best Choice by User Type


User type | Recommendation
Solo developer | Start with DeepSeek for low-cost API experiments; use Grok when you need live web/X research.
Startup building an AI product | Use DeepSeek for cost-sensitive backend reasoning; use Grok for live-search, social, or multimodal features.
Enterprise team | Compare DeepSeek self-hosting against xAI enterprise API controls and ZDR.
Researcher | Use Grok for current public data; use DeepSeek for large private documents and long-context analysis.
Coding team | Test both on your own repos. Grok is stronger as an integrated coding product; DeepSeek is stronger for cost/control.
Privacy-sensitive organization | Prefer self-hosted DeepSeek if you can operate it securely, or xAI enterprise ZDR if you need Grok’s hosted tools.
Casual user | Try both. Grok is more personality-driven and integrated with X; DeepSeek is more direct and cost-efficient.
Social media analyst | Grok is the better fit because of X Search.
Long-document workflow | DeepSeek is usually the better fit because of 1M context and lower token cost.


### Should You Use DeepSeek and Grok Together?

Yes. A hybrid workflow often makes more sense than choosing one forever.

A practical setup looks like this:

- Use Grok AI to gather current information.Run web searches, X searches, trend checks, and source discovery.

- Use DeepSeek to process large text cheaply.Feed collected documents, transcripts, reports, or code into DeepSeek for long-context synthesis.

- Use Grok again for final freshness checks.Verify whether facts, prices, or announcements changed before publishing or shipping.

- Use your own evaluation harness.Compare outputs on correctness, speed, refusal behavior, source quality, and cost.

This hybrid approach works especially well for market research, technical documentation, startup research, content production, competitive monitoring, and developer tools.


### Final Verdict: DeepSeek vs Grok AI

Choose DeepSeek if your priorities are API cost, open weights, long-context text processing, self-hosting, and deployment control. It is the stronger option for cost-sensitive developers and teams that want to avoid being locked into a proprietary hosted model.

Choose Grok AI if your priorities are real-time research, X data, multimodal workflows, consumer chatbot experience, and integrated coding/agent tools. It is the stronger option for live information, social intelligence, market monitoring, and tools that benefit from xAI’s broader product ecosystem.

For many serious users, the best answer is not DeepSeek or Grok. It is DeepSeek for scalable, low-cost reasoning plus Grok for live web, X, and multimodal context.


### FAQ


#### Is DeepSeek better than Grok AI?

DeepSeek is better for low-cost API usage, open weights, self-hosting, and long-context text analysis. Grok AI is better for real-time web/X search, multimodal workflows, and integrated coding-agent tools.


#### Is Grok AI better than DeepSeek for real-time information?

Yes. Grok has official Web Search and X Search tools for real-time web and social content, while DeepSeek’s reviewed API docs do not document an equivalent first-party X Search/Web Search system.


#### Which is better for coding, DeepSeek or Grok?

Grok is better if you want an integrated coding-agent product around Grok 4.5 and Grok Build. DeepSeek is better if you want lower token costs, open weights, long-context code analysis, and more deployment control.


#### Which is cheaper for API usage?

DeepSeek is cheaper than Grok 4.5 based on the official API prices reviewed in this comparison. DeepSeek V4-Flash is listed at $0.14 input and $0.28 output per 1M cache-miss tokens, while Grok 4.5 is listed at $2.00 input and $6.00 output per 1M tokens.


#### Does DeepSeek have real-time web access?

DeepSeek can support tool-calling workflows, but the official API model details reviewed here do not list a native Grok-style Web Search or X Search tool. If real-time web access is required, verify the exact DeepSeek product surface or use an external search/RAG layer.


#### Does Grok use real-time data from X or the web?

Grok can use real-time data when the relevant tools are enabled. xAI documents Web Search for real-time web browsing and X Search for X posts, users, and threads. xAI also says Grok has no access to real-time events without search tools enabled.


#### Can DeepSeek be self-hosted?

Yes, DeepSeek V4-Pro weights are available on Hugging Face and listed under the MIT License, though practical self-hosting requires significant infrastructure.


#### Is Grok open source?

No. Grok 4.5 is proprietary, and its model weights are not publicly available.


#### Which is better for businesses?

DeepSeek is better for businesses that need low-cost high-volume inference or self-hosting. Grok is better for businesses that need real-time search, X intelligence, multimodal APIs, or xAI enterprise controls such as Zero Data Retention.


#### Which one is better for privacy-sensitive work?

For maximum control, a properly secured self-hosted DeepSeek deployment may be preferable. For hosted API use, xAI’s enterprise ZDR option may be attractive. Consumer chatbot privacy should be treated separately from API or enterprise privacy.


#### Should I use both DeepSeek and Grok?

Yes, if your workflow needs both current data and cost-efficient processing. Use Grok to retrieve and verify live information, then use DeepSeek for long-context analysis, summarization, and lower-cost processing.


#### What are the best alternatives to DeepSeek and Grok?

Common alternatives include ChatGPT, Claude, Gemini, Mistral, Llama-based deployments, Qwen, Kimi, and open-router/provider-hosted model options. The best alternative depends on whether you need coding, long context, multimodal input, enterprise compliance, low cost, or self-hosting.

## 外部链接
- [DeepSeek’s current official API lineup](https://api-docs.deepseek.com/updates)
- [OpenAI-format and Anthropic-format API access](https://api-docs.deepseek.com/)
- [DeepSeek announced the V4 Preview](https://api-docs.deepseek.com/news/news260424)
- [xAI’s consumer FAQ](https://x.ai/legal/faq)
- [DeepSeek’s official pricing page](https://api-docs.deepseek.com/quick_start/pricing)
- [Grok 4.5 is priced higher](https://x.ai/api)
- [flagship model for code and agentic tool calling](https://docs.x.ai/developers/release-notes)
- [Coding Agent Index](https://artificialanalysis.ai/articles/grok-4-5-brings-spacexai-to-the-the-intelligence-frontier)
- [Claude Code](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/)
- [Web Search tool](https://docs.x.ai/developers/tools/web-search)
- [X Search](https://docs.x.ai/developers/tools/x-search)
- [MIT License](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/blob/main/LICENSE)
- [one API ecosystem for text, code, voice, images, and video](https://x.ai/)
- [score of 54](https://artificialanalysis.ai/models/grok-4-5)
- [score of 44](https://artificialanalysis.ai/models/deepseek-v4-pro)
- [DeepSeek’s privacy policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [opt out of using personal data for model training or technology optimization](https://cdn.deepseek.com/policies/en-US/model-algorithm-disclosure.html)
- [xAI’s privacy policy](https://x.ai/legal/privacy-policy)
- [xAI’s security FAQ](https://docs.x.ai/developers/faq/security)
- [xAI’s Grok 4.5 release note](https://x.ai/news/grok-4-5)
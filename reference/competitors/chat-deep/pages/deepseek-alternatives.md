# DeepSeek Alternatives for Chat, Research, Coding & APIs

- **URL**: https://chat-deep.ai/comparison/deepseek-alternatives/
- **Published**: 2026-07-24T13:25:11+00:00
- **Modified**: 2026-07-29T09:11:30+00:00
- **Category**: DeepSeek Comparisons
- **Word count**: 3539
- **Code blocks**: 0
- **Description**: Compare DeepSeek alternatives for AI chat, cited research, coding, APIs, privacy and self-hosting. Use this task-based guide to choose the right tool.

## H1


## H2 目录
- What counts as a DeepSeek alternative?
- DeepSeek alternatives at a glance
- How the main alternatives differ
- Best fits for everyday AI chat
- Best fits for research with citations
- Best fits for coding and software engineering
- Best fits for developers and APIs
- Best open-weight alternatives for self-hosting
- Best options for privacy, data residency, and governance
- Where DeepSeek may still be the better fit
- How to test an alternative before migrating
- Common selection mistakes
- A practical final choice
- DeepSeek alternatives FAQ

## 正文
Last verified: July 29, 2026.

DeepSeek alternatives solve different jobs, so the right replacement depends on what you are replacing. ChatGPT is a strong starting point for broad assistant workflows, Perplexity is purpose-built for cited web research, Codex and Claude Code are repository agents, managed APIs from OpenAI, Anthropic, Google, Mistral, and Perplexity serve different developer needs, and open-weight families such as Qwen, Mistral, gpt-oss, and Llama are candidates for self-hosting.

Quick answer: which option should you test first?

- Everyday chat and mixed office work: ChatGPT; also test Claude for writing and document-heavy work, or Gemini for Google-centered workflows.

- Research with web citations: Perplexity; also test ChatGPT deep research, Claude Research, and Gemini Deep Research if files or connected work data matter.

- Repository coding: Codex or Claude Code; also test GitHub Copilot for an issue-to-pull-request and IDE-centered workflow.

- Application APIs: shortlist OpenAI, Anthropic, Gemini, or Mistral by required tools and governance; use Perplexity when search grounding is the product.

- Self-hosting: begin with a hardware-appropriate Qwen, Mistral, or gpt-oss checkpoint; consider Llama when its ecosystem and community license fit the deployment.

Last verified: July 24, 2026.

Independent guide: Chat-Deep.ai is not affiliated with DeepSeek or any alternative named below. “Fits” means a sensible option to evaluate for the stated workload, not a universal performance ranking. Plans, model catalogs, limits, and licenses can change.


### What counts as a DeepSeek alternative?

DeepSeek spans several layers: a consumer chat interface, hosted model APIs, downloadable checkpoints, and models that can be served through third-party runtimes. A useful comparison has to keep those layers separate.

- Chat product: a finished interface with conversation history, files, voice, search, memory, or integrations.

- Research product: an agent that searches, cites, synthesizes, and sometimes works with private files or connected sources.

- Coding agent: software that can inspect a repository, edit files, run commands, execute tests, and propose a reviewed change.

- Hosted API: a metered developer service with model IDs, tool calling, structured outputs, rate limits, data terms, and availability commitments.

- Open-weight checkpoint: downloadable model weights that you deploy and operate under the checkpoint’s specific license.

Ollama, LM Studio, vLLM, and SGLang are runtimes or serving layers, not model families. OpenRouter, Together, and Fireworks are access or hosting providers. Cursor and Windsurf are coding products that can route to several models. Each can replace part of a DeepSeek workflow, but none is a like-for-like model by itself.


![Decision tree for choosing a DeepSeek alternative by workload and deployment needs](data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=)


### DeepSeek alternatives at a glance


Your primary job | Start by testing | Also compare | Main trade-off to inspect
Broad chat, files, and productivity | ChatGPT | Claude, Gemini, Kimi | Plan limits, data controls, integrations, and response style
Long-form writing and document analysis | Claude | ChatGPT, Gemini | Source grounding, file handling, and workspace fit
Google-centered work and multimodal input | Gemini | ChatGPT, Claude | Integration depth versus portability outside Google
Cited web research | Perplexity | ChatGPT deep research, Claude Research, Gemini Deep Research | Citation correctness, source controls, and exportability
Repository-level coding | Codex or Claude Code | GitHub Copilot, Kimi Code, Qwen Code | Permissions, test evidence, review flow, and usage limits
General application API | OpenAI, Anthropic, Gemini, or Mistral | Qwen through Model Studio or another provider | Tool behavior, versioning, latency, data terms, and total cost
Search-grounded API | Perplexity Sonar or Search API | A general model plus a search provider | Search controls, citation fields, and reproducibility
Local or private deployment | Qwen, Mistral, or gpt-oss | Llama and hardware-appropriate specialist checkpoints | License, memory, quality after quantization, and operations

The table is a routing aid. It does not imply that one provider wins every prompt. The DeepSeek comparison hub contains narrower head-to-head guides, while the DeepSeek model guide answers which DeepSeek model fits a task.


### How the main alternatives differ


Option | What it actually is | Strongest reason to shortlist it | Hosted API | Downloadable weights
ChatGPT | Consumer and business assistant; Codex is its coding-agent surface | One polished workspace for varied chat, files, analysis, research, and coding | Yes, through the separate OpenAI API | No for ChatGPT models; gpt-oss is a separate family
Claude | Assistant, research workflow, API, and Claude Code agent | Writing, document reasoning, and repository work | Yes | No
Gemini | Google assistant, research tools, developer API, and coding surfaces | Google ecosystem and multimodal workflows | Yes | No for the main Gemini family
Perplexity | Search-first answer and research product with search-grounded APIs | Web discovery with visible citations | Yes | No
Kimi | Assistant plus Kimi Code and compatible developer endpoints | Long-context knowledge work and agentic coding | Availability depends on product and region | Checkpoint-specific; verify the exact release
Qwen | Broad model family, hosted access, open-weight checkpoints, and Qwen Code | Multilingual, coding, and self-hosted choice across several sizes | Yes through Alibaba Model Studio and providers | Yes for many checkpoints
Mistral | Assistant, API platform, coding products, and mixed open/commercial model catalog | A path from managed use to self-deployment | Yes | Yes for selected models
Llama | Meta model family distributed under a community license | Large deployment ecosystem and broad third-party support | Provider-dependent | Yes, subject to the model license


### Best fits for everyday AI chat


#### ChatGPT: broad assistant workflows

Choose ChatGPT when the replacement must cover many jobs in one interface rather than maximize one niche. Its official plan comparison lists chat, uploads, search, voice, data analysis, image generation, projects, deep research, and Codex access with plan-dependent limits. That breadth can reduce tool switching for individuals and mixed teams.

The key caveat is product separation: a ChatGPT subscription does not make an existing DeepSeek API integration portable, and OpenAI API usage is billed and configured separately. ChatGPT also is not a self-hosting option. See the focused DeepSeek vs ChatGPT comparison before choosing it as the main consumer assistant.


#### Claude: writing, documents, and careful synthesis

Claude fits users who spend much of the day reading long files, drafting, revising, and turning complex material into a coherent result. Anthropic’s product overview separates general conversation, analysis, research, and creation workflows, while Claude Code extends the same ecosystem into repositories and terminals.

Test Claude with your own document set rather than relying on a generic reasoning benchmark. Measure whether it preserves instructions across long tasks, cites the correct source passages, and produces the style your team can approve. Claude remains a managed service, so teams requiring downloadable weights need another option. The DeepSeek vs Claude guide covers the pair in more depth.


#### Gemini: Google-centered and multimodal work

Gemini belongs on the shortlist when Gmail, Drive, Docs, or multimodal material already sits at the center of the workflow. Google’s Gemini app updates document research, file, Canvas, and connected-app capabilities, although access can vary by plan, account type, and region.

The decision is less about a single answer score and more about whether native Google context saves meaningful time. If users work across several clouds or need a provider-neutral process, test export, sharing, and integration boundaries carefully. Read the dedicated DeepSeek vs Gemini comparison for the product-level trade-offs.


#### Kimi: long-context and coding-oriented workflows

Kimi is worth evaluating for large-context knowledge work and coding, especially when its regional availability and plan structure fit the team. The public Kimi Code documentation covers CLI and editor workflows plus OpenAI- and Anthropic-compatible integration paths. Compatibility can simplify setup, but it does not guarantee identical tools, prompts, output fields, or failure behavior.

Verify the exact model, context limit, access method, and license instead of treating “Kimi” as one invariant product. Use the DeepSeek vs Kimi comparison for a narrower selection.


### Best fits for research with citations


#### Perplexity: citation-first web discovery

Perplexity is the clearest specialist alternative when the main job is discovering and synthesizing public web sources. Its Research mode documentation describes a multi-step search process that produces a report with citations. This makes source inspection part of the normal interface rather than an extra prompt.

That does not make every cited sentence correct. A citation can be real yet fail to support the claim, point to a secondary summary, or omit an important qualifier. Evaluate citation entailment, source quality, and coverage—not merely the number of links. Perplexity is also less natural as a replacement for local inference or repository editing. The DeepSeek vs Perplexity guide explores that boundary.


#### ChatGPT, Claude, and Gemini research modes

The general assistants become better fits when research must combine the web with uploaded files, connected workspace sources, or a broader deliverable. OpenAI’s deep research guide describes source selection and cited reports; Anthropic’s Claude Research guide covers web and connected context; Google’s Deep Research overview describes custom sources, collaboration, and report generation.

Use the same research brief with each candidate. Supply required sources, forbidden sources, date boundaries, and a requested evidence table. Then grade unsupported claims, missed primary sources, duplicated citations, and whether another person can reproduce the search trail.


### Best fits for coding and software engineering

A strong coding model inside a chat window is not automatically a strong coding agent. Repository agents need file access, terminal tools, permission controls, test execution, diff review, and a recovery path when commands fail.


#### Codex and Claude Code: repository agents

Codex fits teams that want parallel coding tasks, isolated work, reviewable changes, and cloud or local surfaces. Claude Code fits terminal-centered work that benefits from repository context, command execution, and an interactive agent loop. Neither should be selected from a coding benchmark alone; run them against the same real issue, test suite, and permission policy.


#### GitHub Copilot: GitHub and IDE workflow

GitHub Copilot is a sensible alternative to the coding use case, not to a DeepSeek model ID. Its coding-agent workflow can move from an issue toward a pull request, while its editor features keep assistance close to the developer. Choose it when repository hosting, code review, and developer experience matter more than controlling one underlying model.


#### Kimi Code, Qwen Code, and Google’s CLI path

Kimi Code and Qwen Code deserve tests where long context, headless automation, or an alternative agent stack matters. The Qwen Code headless guide shows non-interactive use for scripts and pipelines. For individual Google coding users, Google moved consumer Gemini CLI requests to Antigravity CLI in June 2026; its transition notice explains the split from enterprise and API-key paths.

Score every agent on task completion, regressions introduced, tests run, security of commands, quality of the diff, and how much human repair was required. A fast patch that silently changes unrelated files is worse than a slower, reviewable fix.


### Best fits for developers and APIs

API selection is a systems decision. The model matters, but so do structured output reliability, tool schemas, multimodal inputs, streaming, rate limits, batch processing, regional availability, data retention, support, observability, and version pinning.

- OpenAI: shortlist when the model catalog, tool ecosystem, multimodal features, and agent building blocks fit the application.

- Anthropic: shortlist for Claude model behavior, long-form work, tool use, and its documented model lifecycle and aliases.

- Gemini API: shortlist for Google integration, multimodal inputs, and stable production models such as the cataloged Gemini 3.6 Flash.

- Mistral: shortlist when managed API access plus a possible path to open-weight deployment is valuable; check the exact model card and license.

- Qwen: shortlist when Alibaba’s hosted catalog, multilingual behavior, or alignment with downloadable Qwen checkpoints matters; verify the IDs and regions in Model Studio’s model list.

- Perplexity: shortlist when the product itself is web-grounded Q&A or search. Its Sonar model guide separates search-grounded response models from other API products.


#### Can an OpenAI-compatible endpoint be a drop-in replacement?

It can reduce code changes, but “compatible” usually describes the request envelope, not full behavior. Tool-call fields, JSON strictness, reasoning controls, token accounting, error objects, streaming chunks, safety responses, and model names can differ. Build an adapter around provider-specific details and preserve normalized fixtures for regression tests.

If legacy DeepSeek code still sends deepseek-chat or deepseek-reasoner, the cutoff announced for those aliases passed on July 24, 2026 at 15:59 UTC. The current official model list does not include them. A bounded Chat-Deep.ai test on July 28 observed both aliases still returning Flash, but that is undocumented compatibility behavior rather than an official support guarantee. Use deepseek-v4-flash or deepseek-v4-pro for maintained integrations. The DeepSeek model-name guide explains why product labels, API IDs, and checkpoints cannot be interchanged, while the DeepSeek API guide covers request setup.


### Best open-weight alternatives for self-hosting

Self-hosting changes the decision from “which subscription?” to “which weights, license, runtime, hardware, and operating model?” Use a checkpoint that fits the available memory before chasing the largest parameter count. A smaller model that runs reliably at the required context can beat a larger model that spills memory, slows to unusable latency, or needs aggressive quantization.


Family | Why evaluate it | License note | Practical caution
Qwen | Many sizes, multilingual use, coding checkpoints, and broad local-runtime support | Several checkpoints use Apache 2.0; verify each model card | Context and tool support can vary by checkpoint and quantization
Mistral / Ministral | Efficient open models plus a managed ecosystem | Many open models use Apache 2.0, but the catalog is not license-uniform | Do not transfer one model’s hardware guidance to another
gpt-oss | OpenAI’s downloadable reasoning models, including a smaller 20B option | Apache 2.0 for the released weights | It is separate from ChatGPT and hosted OpenAI models
Llama | Large community, tools, quantizations, and provider support | Custom Llama Community License, not Apache or MIT | Larger multimodal checkpoints can require server-class hardware

For a small starting point, the official Qwen3.5-4B model card identifies an Apache-licensed multimodal checkpoint. Mistral’s Ministral 3 8B card documents an Apache-licensed model and gives deployment guidance. OpenAI’s gpt-oss release describes a 20B model intended to run in roughly 16 GB of memory and a larger 120B option for substantially heavier systems.

Llama is attractive when ecosystem breadth matters, but Meta’s official repository distributes families under model-specific terms. The Llama 4 license includes attribution and additional provisions, so describe it as open-weight or community-licensed rather than unqualified open source.

After choosing weights, pick the serving layer: Ollama or LM Studio for approachable local use, and vLLM or SGLang for production-style serving. The local DeepSeek installation guide explains the same hardware and quantization concepts, while the vLLM guide covers an OpenAI-compatible serving pattern.


### Best options for privacy, data residency, and governance

No brand name is automatically the privacy winner. A self-hosted model can keep inference inside an environment, but privacy still depends on logs, prompts stored by the application, telemetry, plugins, backups, access controls, network egress, and administrator behavior. It also transfers patching, monitoring, incident response, and model-security work to the operator.

A managed enterprise service may be the better governance fit when it supplies contractual data terms, identity controls, audit logs, regional processing, retention settings, and support that a small team cannot reproduce. Compare the exact plan and contract, not the consumer privacy page. Build a data-classification rule before selection: public prompts can use one route, internal material another, and regulated or secret material may require a restricted system.

Use the DeepSeek safety and privacy guide for platform-specific context and the sensitive-prompt checklist before moving real data into any assistant.


### Where DeepSeek may still be the better fit

An alternatives page should not force a migration. DeepSeek may remain the better operational choice when its hosted V4 behavior already passes your evaluation, its API structure fits an existing stack, its open weights match the available hardware, or switching cost exceeds the measurable gain.

- Your production prompts, tool schemas, and error handling are already tested against DeepSeek.

- The workload benefits from DeepSeek’s specific reasoning or coding behavior in your own evaluation.

- A downloadable DeepSeek checkpoint satisfies the license, hardware, and deployment constraints.

- The full workload cost—including retries, tool loops, cached input, output length, and engineering time—beats the alternatives.

Use the DeepSeek pricing and cost guide for the DeepSeek side of that calculation and the local-versus-API guide when deployment, rather than vendor choice, is the central question.


### How to test an alternative before migrating

A fair test uses representative work, not ten trivia questions. Create a small evaluation set that reflects the requests, files, languages, tool calls, and failure cases the system will encounter.

- Define the job. Separate chat, research, coding, API, and self-hosting requirements. Do not blend all scores into one number.

- Build 20–50 representative cases. Remove secrets and include easy, hard, ambiguous, and adversarial examples.

- Freeze the instructions. Give each candidate the same task, source set, tools, output schema, and acceptance criteria where the products permit it.

- Record configuration. Save product plan, model ID, date, system prompt, temperature, tool definitions, context, and any provider-side research setting.

- Grade the result blind where possible. Use correctness, completeness, citation support, code tests, schema validity, latency, and reviewer effort.

- Test failure behavior. Simulate timeouts, malformed tool results, missing permissions, unavailable sources, and context overflow.

- Run a shadow period. Send a safe sample to both systems, compare results, then move traffic gradually with rollback controls.


Workload | Primary success measure | Common hidden failure
Chat | Useful answer with low correction effort | Memory or connector behavior differs by plan
Research | Claims supported by relevant primary sources | Citation exists but does not support the sentence
Coding | Tests pass and the diff stays within scope | Agent edits unrelated files or runs unsafe commands
API | Valid output at acceptable latency and cost | Tool calls or streaming events differ despite compatible syntax
Self-hosting | Required quality at sustainable throughput | Advertised context fails on available memory


### Common selection mistakes

- Picking one universal winner: a research specialist, chat assistant, coding agent, and local checkpoint optimize different things.

- Comparing model benchmarks to product workflows: interface, tools, retrieval, and permissions can matter more than the underlying score.

- Assuming API compatibility means behavioral parity: test tools, JSON, streaming, errors, and refusals.

- Calling every downloadable model open source: read the exact checkpoint license and its commercial, attribution, and redistribution terms.

- Assuming self-hosted means private: audit the entire application and operations path.

- Copying provider prices into a permanent scorecard: calculate cost from your token mix, tools, retries, caching, and support requirements.

- Migrating without rollback: preserve fixtures, normalized outputs, and a route back to the previous provider.


### A practical final choice

For most buyers, the shortlist should be small: ChatGPT, Claude, or Gemini for a general assistant; Perplexity plus one general research mode for citation-heavy work; Codex, Claude Code, or GitHub Copilot for repository coding; two managed APIs that satisfy the required features; and one hardware-appropriate Qwen, Mistral, gpt-oss, or Llama checkpoint for local deployment.

The best DeepSeek alternatives are therefore the ones that pass the same real workload under acceptable data, cost, reliability, and operational constraints. A two-tool combination is often more rational than forcing one product to cover chat, research, coding, APIs, and self-hosting equally well.


### DeepSeek alternatives FAQ


#### What is the best alternative to DeepSeek?

There is no universal replacement. Start with ChatGPT for broad assistant use, Claude for writing and document-heavy work, Gemini for Google-centered workflows, Perplexity for cited research, Codex or Claude Code for repository coding, and Qwen, Mistral, gpt-oss, or Llama for self-hosting.


#### Which DeepSeek alternative is best for research with citations?

Perplexity is the clearest citation-first specialist. Also test ChatGPT deep research, Claude Research, and Gemini Deep Research when the job combines the web with files, connected sources, or a larger deliverable. Verify that each citation actually supports the associated claim.


#### Which alternative is best for coding?

Codex and Claude Code are strong repository-agent candidates; GitHub Copilot fits GitHub and IDE-centered teams. Kimi Code and Qwen Code are additional options. Evaluate them on real issues, passing tests, diff quality, permissions, and human repair time.


#### What is the best DeepSeek API alternative?

OpenAI, Anthropic, Gemini, and Mistral are broad managed API candidates. Qwen is relevant when hosted and downloadable paths matter. Perplexity fits search-grounded applications. Select by required features, data terms, latency, reliability, versioning, and workload cost.


#### What is a free alternative to DeepSeek?

Several consumer assistants offer limited no-cost access, and downloadable checkpoints can be used without a per-token vendor charge. Neither route is costless: hosted tiers have limits, while local inference needs hardware, electricity, setup, updates, and operations. Verify plan and license terms before choosing.


#### Which alternatives can be self-hosted?

Many Qwen and Mistral checkpoints, OpenAI’s gpt-oss weights, and Meta’s Llama weights can be self-hosted. License and hardware requirements differ by exact checkpoint. ChatGPT, Claude, Gemini, and Perplexity are managed products rather than downloadable versions of their flagship services.


#### Is Ollama a DeepSeek alternative?

Ollama is a local model runtime and catalog, not a model family. It can run DeepSeek checkpoints and alternative models such as Qwen, Mistral, gpt-oss, or Llama, subject to model support, hardware, and license.


#### Can I switch from DeepSeek without rewriting my app?

An OpenAI-compatible endpoint may reduce changes to request code, but feature and response parity is not guaranteed. Test model IDs, tools, structured output, streaming, errors, token accounting, and safety behavior. An adapter layer makes multi-provider switching safer.


#### Which alternative is better for sensitive business data?

Choose from the exact enterprise contract or self-hosted architecture, not the brand alone. Compare retention, training use, identity controls, auditability, regional processing, support, and incident responsibilities. Self-hosting improves control only when the surrounding application and operations are secured.


#### Are open-weight models automatically cheaper than hosted APIs?

No. Local economics depend on hardware purchase or rental, utilization, power, engineering, monitoring, redundancy, and support. A hosted API can be cheaper for bursty or small workloads; self-hosting can make sense when utilization, control, or data constraints justify operations.

## 内部链接
- [DeepSeek comparison hub](https://chat-deep.ai/comparison/)
- [DeepSeek model guide](https://chat-deep.ai/models/)
- [DeepSeek vs ChatGPT comparison](https://chat-deep.ai/comparison/chatgpt/)
- [DeepSeek vs Claude guide](https://chat-deep.ai/comparison/claude/)
- [DeepSeek vs Gemini comparison](https://chat-deep.ai/comparison/gemini/)
- [DeepSeek vs Kimi comparison](https://chat-deep.ai/comparison/kimi/)
- [DeepSeek vs Perplexity guide](https://chat-deep.ai/comparison/perplexity/)
- [Chat-Deep.ai test on July 28](https://chat-deep.ai/docs/deepseek-api-updates/)
- [DeepSeek model-name guide](https://chat-deep.ai/research/deepseek-model-names/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [local DeepSeek installation guide](https://chat-deep.ai/guide/how-to-install-deepseek-locally/)
- [vLLM guide](https://chat-deep.ai/guide/deepseek-with-vllm/)
- [DeepSeek safety and privacy guide](https://chat-deep.ai/guide/is-deepseek-safe/)
- [sensitive-prompt checklist](https://chat-deep.ai/privacy-security/what-not-to-paste-into-deepseek/)
- [DeepSeek pricing and cost guide](https://chat-deep.ai/pricing/)
- [local-versus-API guide](https://chat-deep.ai/guide/deepseek-local-vs-api/)

## 外部链接
- [official plan comparison](https://openai.com/chatgpt/pricing/)
- [product overview](https://claude.com/product/overview)
- [Gemini app updates](https://gemini.google.com/updates)
- [Kimi Code documentation](https://www.kimi.com/code/docs/en/)
- [Research mode documentation](https://www.perplexity.ai/help-center/en/articles/10738684-what-is-research-mode)
- [deep research guide](https://help.openai.com/en/articles/10500283-deep-research)
- [Claude Research guide](https://support.claude.com/en/articles/11088861-use-research-on-claude)
- [Deep Research overview](https://blog.google/innovation-and-ai/models-and-research/gemini-models/next-generation-gemini-deep-research/)
- [Codex](https://openai.com/index/introducing-the-codex-app/)
- [Claude Code](https://code.claude.com/docs/en/overview)
- [coding-agent workflow](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview)
- [Qwen Code headless guide](https://qwenlm.github.io/qwen-code-docs/en/users/features/headless/)
- [transition notice](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)
- [model catalog](https://developers.openai.com/api/docs/models)
- [model lifecycle and aliases](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Gemini 3.6 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash)
- [model card and license](https://docs.mistral.ai/models/model-cards/mistral-medium-3-5-26-04)
- [Model Studio’s model list](https://www.alibabacloud.com/help/en/model-studio/text-generation-model)
- [Sonar model guide](https://docs.perplexity.ai/docs/sonar/models)
- [current official model list](https://api-docs.deepseek.com/api/list-models/)
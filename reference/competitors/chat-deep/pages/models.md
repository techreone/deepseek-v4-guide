# DeepSeek Models: Model List, Comparison & Best Uses

- **URL**: https://chat-deep.ai/models/
- **Published**: 2026-03-26T17:58:29+00:00
- **Modified**: 2026-07-29T11:54:54+00:00
- **Category**: 
- **Word count**: 3411
- **Code blocks**: 0
- **Description**: Compare DeepSeek AI models by use case, access, context length and deployment. See the model list and choose the right option for API or local use.

## H1
DeepSeek Models: Complete Model List and Which One to Use

## H2 目录
- Which DeepSeek Model Should You Use?
- DeepSeek Model List at a Glance
- Official DeepSeek API Models
- DeepSeek Models Comparison: V4 vs R1 vs V3
- DeepSeek R1 and R1 Distill Models
- V3, V3.1, V3.2, V2, and V2.5
- Coding, Math, and Theorem-Proving Models
- Vision, Multimodal, and OCR Models
- How DeepSeek Model Names Work
- Official API vs Open Weights vs Local Models
- DeepSeek Model Sizes and Context Windows
- How to Choose a DeepSeek Model
- DeepSeek Model Timeline
- Are DeepSeek Models Open Source?
- Frequently Asked Questions
- Official Sources and Verification Method

## 正文
Last verified: July 29, 2026.


> Independent-site disclosure: Chat-Deep.ai is an independent educational website. It is not DeepSeek’s official website, app, or API provider. Model names, product names, and trademarks belong to their respective owners.

DeepSeek models are a family of general-purpose, reasoning, coding, vision, OCR, and mathematical AI models—not one single model. During this verification, DeepSeek’s first-party API listed two model IDs: deepseek-v4-flash and deepseek-v4-pro. DeepSeek has also published downloadable model weights for V4, R1, V3, V2, Coder, VL, Janus, OCR, Math, Prover, and related research families.

The right choice depends on the task and how you want to access the model. Start with V4 Flash for routine or high-volume hosted API work, evaluate V4 Pro for harder reasoning and agentic coding, consider an R1 Distill checkpoint for a smaller local reasoning setup, and use a specialist family for vision, OCR, image generation, or theorem proving. This DeepSeek AI models guide separates first-party API models from downloadable weights and earlier releases so that similarly named models are not mistaken for the same product.

Researching earlier releases? Use the DeepSeek model history for the verified V2, V3, V3.1, and V3.2 timeline, release dates, architecture changes, and historical API mappings.


### Which DeepSeek Model Should You Use?

Use this quick model picker before comparing specifications. “First-party API” means the model ID was listed by DeepSeek’s own API documentation on the verification date. “Open weights” means model files are published for download under the license attached to that release.


Task | Recommended starting point | Why
General chat, extraction, classification, or high-volume API work | V4 Flash, non-thinking mode | Designed as the more efficient V4 API option for routine workloads.
Difficult reasoning, coding, or multi-step agents through the hosted API | V4 Pro, thinking mode | Provides the larger V4 architecture and a reasoning mode for complex tasks.
Long-document processing at scale | V4 Flash, then test V4 Pro on difficult cases | Both list a 1M-token context window; Flash is the practical first evaluation for volume.
Full-size open-weight reasoning research | R1-0528 or R1 | Published reasoning checkpoints with 671B total and 37B activated parameters.
Smaller local reasoning deployment | R1 Distill | Published checkpoints range from 1.5B to 70B, with different hardware requirements.
Local code generation or repository experiments | DeepSeek Coder V2 | A code-specialized family with Lite and full mixture-of-experts variants.
Image and document text extraction | DeepSeek OCR or OCR 2 | Specialist models for converting visual document content into text.
Visual question answering and document understanding | DeepSeek VL2 | A vision-language family for images, charts, documents, grounding, and visual Q&A.
Multimodal understanding and image generation research | Janus-Pro | A separate multimodal family that unifies understanding and generation research.
Lean theorem proving | DeepSeek Prover V2 | A specialist family for formal mathematical proof generation.


### DeepSeek Model List at a Glance

This DeepSeek model list groups checkpoints by purpose and access. It does not treat every Base, Instruct, quantized, or deployment repository as a separate model family.


Model family | Primary role | Access and status verified July 29, 2026 | Guide
V4 Flash | Efficient general, reasoning, coding, and agent workloads | First-party API ID deepseek-v4-flash; open weights; V4 Preview | V4 family guide
V4 Pro | Larger model for difficult reasoning, coding, and agent tasks | First-party API ID deepseek-v4-pro; open weights; V4 Preview | Pro vs Flash guide
R1, R1-Zero, R1-0528 | Reasoning research | Open weights; not listed as first-party API IDs during verification | R1 guide and R1-0528 guide
R1 Distill | Smaller reasoning checkpoints | Open weights derived from Qwen or Llama base models; license terms vary by checkpoint | Sizes and selection
V3.2 | Reasoning, agents, and tool-use research | Open weights; earlier API generation; Speciale’s temporary endpoint ended December 15, 2025 | V3.2 guide
V3.1 and Terminus | Hybrid thinking and non-thinking research | Open weights; earlier API generation | V3.1 guide
V3 | General language, coding, and earlier MoE research | Open weights; earlier API generation; licenses differ by release | V3 guide
V2 and V2.5 | Earlier general and coding-capable MoE models | Downloadable weights; historical families under model-specific terms | V2 guide
Coder and Coder V2 | Code generation, completion, and repair | Specialized downloadable weights; not first-party API IDs during verification | Coder guide
OCR and OCR 2 | Document and image-to-text extraction | Specialized downloadable weights; not V4 image inputs | OCR guide
VL and VL2 | Vision-language understanding | Specialized downloadable weights; model-specific license | Vision section
Janus, JanusFlow, Janus-Pro | Multimodal understanding and image generation research | Downloadable weights; code and model use have separate license terms | Janus overview
Math and Math V2 | Mathematical reasoning | Specialized downloadable research checkpoints | Math section
Prover and Prover V2 | Formal theorem proving in Lean | Specialized downloadable research checkpoints | Prover section
DeepSeek LLM and DeepSeek MoE | Earlier foundation-model research | Historical downloadable families | Timeline


### Official DeepSeek API Models

DeepSeek’s official Models & Pricing documentation listed deepseek-v4-flash and deepseek-v4-pro during verification. Both are V4 Preview mixture-of-experts models with thinking and non-thinking modes, a listed 1M-token context window, and a listed maximum output of 384K tokens. Both support tool calls and JSON output. Feature availability can depend on the selected mode, so implementation details belong in the API guide linked above.


API model ID | Architecture size | Modes | Best first evaluation
deepseek-v4-flash | 284B total / 13B activated parameters | Thinking and non-thinking | Routine tasks, long-context processing, and high-volume applications
deepseek-v4-pro | 1.6T total / 49B activated parameters | Thinking and non-thinking | Difficult reasoning, coding, and agentic workflows

Model size alone does not establish quality for your workload. Test representative prompts, tool sequences, retrieval cases, latency, output length, and failure handling. V4 Pro is the stronger candidate to evaluate on difficult or high-value tasks, but its output still requires retrieval, validation, and human review where errors carry material consequences.


#### What are deepseek-chat and deepseek-reasoner?

They are moving compatibility aliases, not stable model-family names. DeepSeek used deepseek-reasoner for the hosted R1 service in January 2025, later upgraded that route to R1-0528 and then to newer thinking models, and mapped it to V4 Flash thinking mode before the announced V4 retirement cutoff. The April 24, 2026 notice said both old names would become unavailable after July 24 at 15:59 UTC. The current official model list shows only deepseek-v4-flash and deepseek-v4-pro. In bounded Chat-Deep.ai tests, the aliases returned HTTP 400 on July 25 but returned HTTP 200 and identified V4 Flash as the served model on July 28. That changing behavior is not a support guarantee. Use a documented V4 ID and explicit thinking settings; do not infer a checkpoint or family from a legacy alias. See DeepSeek’s official change log and our dated API updates tracker.


#### Are V4 DSpark repositories separate models?

No. DeepSeek describes V4 Flash DSpark and V4 Pro DSpark as the same checkpoints with an additional speculative-decoding module for deployment. They are not extra first-party API model IDs. “Think Max” settings also describe inference configurations rather than separate models named V4 Pro Max or V4 Flash Max.


### DeepSeek Models Comparison: V4 vs R1 vs V3


Family | Main purpose | First-party hosted API status | When to consider it
V4 Preview | General tasks, reasoning, coding, agents, and long-context work | Flash and Pro were listed as official API IDs during verification | You want DeepSeek-hosted access or want to evaluate V4 open weights
R1 / R1-0528 | Reasoning-focused open-weight research | Not listed as official API IDs during verification | You want a published reasoning checkpoint or an R1 Distill model for local use
V3.2 / V3.1 / V3 | Earlier general, reasoning, and agent model generations | Earlier API generations, not listed API IDs during verification | You need to reproduce research, compare generations, or use a specific open checkpoint

The key distinction is access, not only capability. A model can remain useful as downloadable weights after its hosted endpoint has changed or ended. A third-party provider may also serve an R1 or V3 checkpoint under its own endpoint, limits, and pricing; that does not make the checkpoint a model in DeepSeek’s first-party API.


### DeepSeek R1 and R1 Distill Models

DeepSeek-R1 is a reasoning family built around a 671B-parameter mixture-of-experts architecture with 37B parameters activated per token and a 128K context window. R1-Zero is the reinforcement-learning research precursor, R1 is the released reasoning model, and R1-0528 is a later checkpoint update. These are open-weight releases, not interchangeable names for V4’s thinking mode.

The original R1 collection includes six distilled checkpoints: Qwen-based 1.5B, 7B, 14B, and 32B models, plus Llama-based 8B and 70B models. DeepSeek also published R1-0528-Qwen3-8B. Smaller parameter counts can make evaluation more practical, but memory use still depends on precision, quantization, context length, KV cache, runtime, and concurrency. Review the DeepSeek system requirements before choosing a local checkpoint.

Licensing follows the specific checkpoint. R1 itself is MIT-licensed, while distilled releases also inherit relevant terms from their Qwen or Llama base models. Check both the DeepSeek model card and the upstream base-model license before commercial deployment.


### V3, V3.1, V3.2, V2, and V2.5

These families document the development path that preceded V4. V3 introduced a 671B-total, 37B-activated mixture-of-experts model with a 128K context window. V3.1 added hybrid thinking and non-thinking operation, and V3.1 Terminus refined that line. V3.2 focused on reasoning efficiency and agents, including thinking with tools. V3.2-Speciale emphasized reasoning but did not support tool calling; its temporary official endpoint ended on December 15, 2025.

V2 and V2.5 are earlier 236B-total, 21B-activated families associated with DeepSeek’s mixture-of-experts and Multi-head Latent Attention work. They can matter for reproducibility, architecture study, or an application already built around a particular checkpoint. For a new first-party API integration, however, use the API IDs documented by DeepSeek for the verification date rather than assuming that a downloadable historical checkpoint has a hosted endpoint.


### Coding, Math, and Theorem-Proving Models


#### DeepSeek Coder and Coder V2

DeepSeek Coder is the earlier dense code-model family. DeepSeek Coder V2 extends the code-focused line with mixture-of-experts models and a 128K context window: a Lite 16B-total/2.4B-activated variant and a full 236B-total/21B-activated variant. Its official model card describes support for 338 programming languages. Consider Coder V2 when you specifically want a downloadable code checkpoint; for a hosted DeepSeek coding workflow, benchmark V4 Flash and V4 Pro on your repositories, languages, tools, and tests.


#### DeepSeekMath and DeepSeek Prover

DeepSeekMath targets mathematical reasoning. DeepSeekMath-V2 extends that research toward self-verifiable reasoning and theorem-proving workflows. DeepSeek Prover is narrower: it generates formal proofs in Lean. Prover V2 has published 7B and 671B variants. Use general V4 or R1 models for broad natural-language mathematics; use Prover when formal Lean output is the actual task.


### Vision, Multimodal, and OCR Models

DeepSeek’s specialist visual families must not be confused with the text-focused V4 API model IDs. The presence of downloadable vision or image-generation models does not establish image input or image output support for deepseek-v4-flash or deepseek-v4-pro.

- DeepSeek-VL and VL2: vision-language models for visual question answering, document and chart understanding, OCR-style tasks, and grounding. VL2 has Tiny, Small, and full variants with approximately 1.0B, 2.8B, and 4.5B activated parameters, respectively.

- Janus, JanusFlow, and Janus-Pro: multimodal research families spanning image understanding and image generation. Janus-Pro was published in 1B and 7B sizes. Its code is MIT-licensed, while model use is subject to the DeepSeek Model License.

- DeepSeek-OCR and OCR 2: 3B-class specialist models for visual document compression and image-to-text workflows. OCR model capacity is commonly discussed through visual-token budgets and image-resolution handling rather than a general text context figure.

Choose among them by testing the actual input types you process: scanned pages, photographed documents, charts, screenshots, diagrams, or natural images. OCR accuracy, reading order, tables, handwriting, grounding, and generation quality are different evaluation targets.


### How DeepSeek Model Names Work

- Family name: V4, R1, V3, Coder, VL, Janus, and OCR identify broad lines with different purposes.

- Checkpoint or version: names such as R1-0528, V3-0324, V3.1 Terminus, and V3.2-Speciale identify a release or variant.

- API model ID: a lowercase string such as deepseek-v4-pro is sent in an API request. It is not the same thing as a repository name.

- Repository ID: a name such as deepseek-ai/DeepSeek-V4-Pro identifies files and documentation in DeepSeek’s verified Hugging Face organization.

- Base versus Instruct: Base checkpoints are intended for research, adaptation, or further training. Instruct or Chat checkpoints are tuned to follow user instructions.

- Thinking mode: a reasoning mode can be a runtime option for one API model. It does not automatically create a different model family.


### Official API vs Open Weights vs Local Models


Access type | What it means | What to verify
First-party DeepSeek API | DeepSeek hosts the model behind a documented API ID. | Model ID, endpoint, context, output limit, features, rate limits, and API pricing.
Official chat product | A model or mode is offered through DeepSeek’s own web or app interface. | The interface may not expose the same controls or naming as the API.
Open-weight checkpoint | Model files can be downloaded and deployed under the attached license. | License, precision, storage, RAM/VRAM, runtime support, context, and serving configuration.
Third-party hosted model | Another provider serves a DeepSeek checkpoint. | Exact checkpoint, modifications, data handling, region, limits, reliability, and provider pricing.

Local deployment can give you more control over data flow, model files, and serving infrastructure, but it does not guarantee privacy by itself. Logs, prompts, backups, telemetry, retrieval systems, and access controls still require review. Use the local DeepSeek installation guide for deployment steps and the DeepSeek privacy checklist for a practical risk review.


### DeepSeek Model Sizes and Context Windows

DeepSeek uses both dense and mixture-of-experts architectures. For an MoE model, total parameters describe the full architecture, while activated parameters estimate how much of it participates for each token. Activated parameters are useful for understanding compute, but they are not a direct promise of speed or memory use.

A context window is the model’s input-and-output token budget under a defined serving configuration. It is not a guarantee that the model will retrieve every fact correctly from a long prompt. Evaluate long-context work with realistic document placement, retrieval questions, citations, distractors, and output requirements. Maximum output limits can also differ from the context window and from limits imposed by a third-party runtime.


### How to Choose a DeepSeek Model

- Choose hosted or self-hosted access. Use the first-party API when managed access is the priority. Use downloadable weights when you need infrastructure control, model adaptation, or reproducible research.

- Separate text from multimodal work. V4, R1, V3, and Coder are text-focused families. VL, Janus, and OCR cover distinct visual tasks.

- Match reasoning effort to task difficulty. Start with V4 Flash for routine API traffic. Test V4 Pro on cases that need deeper reasoning or agent behavior. Compare accuracy, latency, and cost on the same dataset.

- Set an infrastructure ceiling. A full R1, V3, or V4 checkpoint is not a normal single-GPU deployment. Smaller R1 Distill, V2 Lite, or Coder V2 Lite checkpoints may be more practical, especially with validated quantization.

- Verify the exact license. Do not assume every DeepSeek repository uses MIT. Review the model card, base-model terms, and commercial-use conditions for the exact checkpoint.

- Run a task-specific evaluation. Measure accuracy, unsupported claims, tool success, code test pass rate, format compliance, latency, token use, and recovery from failures. A public benchmark cannot replace your production test set.


### DeepSeek Model Timeline


Period | Family | Why it matters
2023 | DeepSeek Coder and DeepSeek LLM | Established the early code and general language-model lines.
Early 2024 | DeepSeek MoE, Math, VL, and V2 | Expanded into MoE efficiency, mathematics, visual understanding, and MLA-based general models.
Mid to late 2024 | Coder V2, Prover, V2.5, VL2, and Janus | Added larger code, formal proof, unified general capability, and multimodal research families.
December 2024–March 2025 | V3 and V3-0324 | Introduced and refined the 671B-total/37B-activated V3 generation.
January–May 2025 | R1, R1 Distill, R1-0528, and Prover V2 | Published reasoning, distilled reasoning, and formal theorem-proving checkpoints.
August–December 2025 | V3.1, V3.1 Terminus, V3.2, Math V2, and OCR | Advanced hybrid reasoning, agents, mathematical verification, and document OCR research.
January–April 2026 | OCR 2 and V4 Preview | Extended OCR and introduced the V4 Flash and V4 Pro API and open-weight lines.


### Are DeepSeek Models Open Source?

Many DeepSeek releases publish model weights and code, but “open source” should not be used as a blanket label for every family. V4, R1, V3.1, V3.2, and several related releases use MIT terms, while V2, Coder V2, VL2, Janus models, earlier V3 checkpoints, and distilled models can have different or inherited conditions. Published weights also do not necessarily include the full training data, data pipeline, or every training artifact.

The precise statement is: DeepSeek has published many open-weight models under release-specific licenses. Check the repository for the exact checkpoint you plan to use. See the full DeepSeek open-source and licensing explanation.


### Frequently Asked Questions

As rechecked in DeepSeek’s first-party documentation on July 29, 2026, and in our latest live GET /models request on July 28, 2026, the available model list includes deepseek-v4-flash and deepseek-v4-pro. The old aliases are absent from that list. A separate bounded test observed them route to V4 Flash on July 28 after returning HTTP 400 on July 25, so they should be treated as unlisted, unstable compatibility behavior—not deployable model choices.

For the first-party API, start with V4 Flash for routine or high-volume tasks and test V4 Pro for harder reasoning, coding, or agents. For local reasoning, choose an R1 Distill size that fits your hardware. Use VL2, Janus-Pro, OCR, Math, or Prover only when their specialist task matches your workload.

V4 Preview is the generation represented by the verified V4 Flash and V4 Pro API IDs. R1 is a reasoning-focused open-weight family with distilled variants. V3, V3.1, and V3.2 are earlier general, hybrid-reasoning, and agent-oriented open-weight generations.

Historically, yes—but not as a permanent identity. DeepSeek launched the hosted R1 API behind deepseek-reasoner in January 2025 and later moved that alias through R1-0528, V3-series thinking models, and V4 Flash thinking mode. The alias therefore does not identify a fixed checkpoint today. For R1 specifically, use its published model card or open-weight checkpoint name; for the current hosted API, use a model ID returned by GET /models.

Many published checkpoints can be self-hosted, but practicality varies widely. Full V4, R1, V3, and Coder V2 models require substantial storage, memory, and serving infrastructure. R1 Distill and Lite variants are more realistic starting points for smaller systems.

For DeepSeek’s hosted API, evaluate V4 Flash and V4 Pro with your languages, repositories, tools, and tests. For a downloadable code-specialized checkpoint, Coder V2 is the dedicated family. “Best” depends on test-pass rate, context needs, tool reliability, latency, and deployment constraints.

Yes. DeepSeek-VL and VL2 address vision-language understanding, Janus models cover multimodal understanding and image-generation research, and DeepSeek-OCR addresses document image-to-text work. They are separate specialist families, not evidence that the V4 text API accepts or generates images.

No single answer applies to every checkpoint. Some releases use MIT or Apache 2.0, while others use a DeepSeek Model License or inherit Qwen or Llama terms. Review the exact model card and upstream license before commercial use.

They are smaller Qwen- or Llama-based models trained using outputs associated with the R1 reasoning family. Published sizes include 1.5B, 7B, 8B, 14B, 32B, and 70B, plus R1-0528-Qwen3-8B. They are not compressed copies with identical behavior; evaluate each checkpoint independently.

Check official API documentation before an integration or migration, and verify the exact model card before downloading weights. This page records a verification date because API IDs, aliases, limits, checkpoints, and license terms can change independently.


### Official Sources and Verification Method

API availability, context limits, model IDs, and compatibility-alias status were checked against DeepSeek’s first-party documentation. Parameter counts, intended uses, and licenses were checked against model cards and collections in DeepSeek’s verified Hugging Face organization. A repository’s displayed file size was not treated as the model’s architectural parameter count.

- DeepSeek API Models & Pricing

- DeepSeek V4 Preview release notice

- DeepSeek’s verified Hugging Face organization

- Official DeepSeek V4 collection

- Official DeepSeek R1 collection

- Official DeepSeek V3.2 model card

- Official DeepSeek Coder V2 model card

- Official DeepSeek VL2 collection

- Official Janus collection

- Official DeepSeek OCR collection

- Official DeepSeek Prover collection

Editorial note: Model availability is date-sensitive. Verify the official API model list before changing production traffic, and verify the model card and license for the exact checkpoint before downloading or deploying it.

## 内部链接
- [DeepSeek model history](https://chat-deep.ai/models/deepseek-model-history/)
- [Compare V4 Pro and V4 Flash](https://chat-deep.ai/models/deepseek-v4/)
- [Read the API guide](https://chat-deep.ai/docs/api/)
- [R1 guide](https://chat-deep.ai/models/deepseek-r1/)
- [R1-0528 guide](https://chat-deep.ai/models/deepseek-r1-0528/)
- [V3.2 guide](https://chat-deep.ai/models/deepseek-v3-2/)
- [V3.1 guide](https://chat-deep.ai/models/deepseek-v3-1/)
- [V3 guide](https://chat-deep.ai/models/deepseek-v3/)
- [V2 guide](https://chat-deep.ai/models/deepseek-v2/)
- [Coder guide](https://chat-deep.ai/models/deepseek-coder/)
- [OCR guide](https://chat-deep.ai/models/deepseek-ocr/)
- [dated API updates tracker](https://chat-deep.ai/docs/deepseek-api-updates/)
- [DeepSeek system requirements](https://chat-deep.ai/guide/deepseek-system-requirements/)
- [API pricing](https://chat-deep.ai/pricing/)
- [local DeepSeek installation guide](https://chat-deep.ai/guide/how-to-install-deepseek-locally/)
- [DeepSeek privacy checklist](https://chat-deep.ai/privacy-security/deepseek-data-privacy-checklist/)
- [DeepSeek open-source and licensing explanation](https://chat-deep.ai/models/is-deepseek-open-source/)

## 外部链接
- [official change log](https://api-docs.deepseek.com/updates)
- [DeepSeek API Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek V4 Preview release notice](https://api-docs.deepseek.com/news/news260424/)
- [DeepSeek’s verified Hugging Face organization](https://huggingface.co/deepseek-ai)
- [Official DeepSeek V4 collection](https://huggingface.co/collections/deepseek-ai/deepseek-v4)
- [Official DeepSeek R1 collection](https://huggingface.co/collections/deepseek-ai/deepseek-r1)
- [Official DeepSeek V3.2 model card](https://huggingface.co/deepseek-ai/DeepSeek-V3.2)
- [Official DeepSeek Coder V2 model card](https://huggingface.co/deepseek-ai/DeepSeek-Coder-V2-Instruct)
- [Official DeepSeek VL2 collection](https://huggingface.co/collections/deepseek-ai/deepseek-vl2)
- [Official Janus collection](https://huggingface.co/collections/deepseek-ai/janus)
- [Official DeepSeek OCR collection](https://huggingface.co/collections/deepseek-ai/deepseek-ocr)
- [Official DeepSeek Prover collection](https://huggingface.co/collections/deepseek-ai/deepseek-prover)
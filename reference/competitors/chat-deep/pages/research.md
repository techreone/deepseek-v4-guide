# DeepSeek Research Papers, Reports & Reading Guide

- **URL**: https://chat-deep.ai/research/
- **Published**: 2026-04-22T09:55:40+00:00
- **Modified**: 2026-07-29T12:13:03+00:00
- **Category**: 
- **Word count**: 4092
- **Code blocks**: 4
- **Description**: Explore official DeepSeek papers, technical reports and model cards through a verified reading guide covering MoE, reasoning, agents, OCR and V4 research.

## H1


## H2 目录
- Quick Answer: What Are the Most Important DeepSeek Research Papers?
- Table of Contents
- What Is DeepSeek Research?
- Why DeepSeek Research Papers Matter
- Complete List of Important DeepSeek Research Papers
- Best Papers to Start With
- Recommended Reading Order for DeepSeek Research Papers
- DeepSeek Research Timeline
- Key Technical Themes in DeepSeek Research
- Technical Themes by Paper
- DeepSeek Research Papers by Use Case
- Official Sources for DeepSeek Research Papers
- Common Misconceptions About DeepSeek Research
- How to Cite DeepSeek Research Papers
- FAQs About DeepSeek Research Papers
- Conclusion

## 正文
Explore official DeepSeek papers, technical reports, and model cards through a verified research timeline covering MoE, reasoning, agents, OCR, and V4. Last verified: July 28, 2026.

DeepSeek Research has become one of the most closely watched areas in open-weight AI because it connects large language model architecture, efficient training, reasoning, coding, math, multimodal systems, and long-context engineering in a fast-moving public research stream. This guide collects the most important DeepSeek Research papers, technical reports, model cards, repositories, and release notes so readers can understand what to read first, how the papers connect, and where to find official sources.

DeepSeek’s verified Hugging Face organization describes DeepSeek as a Chinese company founded in 2023 and dedicated to AGI research, while its official model pages and repositories host many of the papers, model cards, weights, and implementation notes discussed in this guide.


### Quick Answer: What Are the Most Important DeepSeek Research Papers?

The most important DeepSeek papers to start with are DeepSeek LLM, DeepSeekMoE, DeepSeekMath, DeepSeek-Coder, DeepSeek-V2, DeepSeek-V3, DeepSeek-R1, DeepSeek-V3.2, and the official DeepSeek-V4 technical materials. Together, these sources explain DeepSeek’s path from scaling open language models to MoE architectures, Multi-head Latent Attention, GRPO-based reasoning, FP8 training, long-context efficiency, agentic coding, mathematical reasoning, theorem proving, multimodal research, and OCR-based context compression.


### Table of Contents


### What Is DeepSeek Research?

DeepSeek Research refers to the body of AI research, technical reports, model releases, and open model infrastructure published by DeepSeek-AI. It covers general-purpose language models, mixture-of-experts models, reasoning models, code models, math models, theorem-proving systems, vision-language models, OCR/context-compression research, and AI infrastructure.

The research line began with open language and code models such as DeepSeek LLM and DeepSeek-Coder, then moved into efficiency-focused architectures such as DeepSeekMoE, DeepSeek-V2, DeepSeek-V3, and later DeepSeek-V3.2 and DeepSeek-V4. DeepSeek’s model cards and reports repeatedly emphasize efficient scaling, sparse computation, long-context inference, reinforcement learning, and open model access.

The phrase “DeepSeek Research papers” usually refers to official arXiv papers, DeepSeek technical reports, Hugging Face model cards, GitHub repositories, and peer-reviewed publications associated with DeepSeek-AI. Some sources are full research papers, while others are release notes or model cards. This distinction matters because a model card can document usage, weights, license, chat templates, or deployment details without being a full peer-reviewed paper.


### Why DeepSeek Research Papers Matter

DeepSeek papers matter for five practical reasons.

First, they show how frontier-style language model development can be made more compute-efficient through sparse architectures. DeepSeekMoE proposed fine-grained expert segmentation and shared expert isolation to improve expert specialization in MoE language models. DeepSeek-V2 then applied DeepSeekMoE together with Multi-head Latent Attention to reduce inference costs and KV-cache requirements while scaling to 236B total parameters with 21B activated per token.

Second, DeepSeek’s reasoning papers helped popularize reinforcement-learning-centered reasoning research. DeepSeekMath introduced Group Relative Policy Optimization, or GRPO, in the context of mathematical reasoning, and DeepSeek-R1 later used large-scale reinforcement learning to incentivize reasoning behaviors. The R1 work was also published in Nature, where the authors describe using reinforcement learning to elicit reasoning patterns such as self-reflection and verification without relying on human-labeled reasoning trajectories.

Third, DeepSeek papers are useful for engineers because many releases include weights, model cards, GitHub repositories, and deployment notes. The DeepSeek-R1 repository, for example, provides R1, R1-Zero, and distilled models, while the DeepSeek-V3 and DeepSeek-V4 model cards document architecture, model sizes, context length, and local-running pathways.

Fourth, DeepSeek research connects multiple AI domains. The same research family includes code intelligence through DeepSeek-Coder and DeepSeek-Coder-V2, mathematical reasoning through DeepSeekMath and DeepSeekMath-V2, theorem proving through DeepSeek-Prover, multimodal systems through DeepSeek-VL, DeepSeek-VL2, Janus, and Janus-Pro, and long-context compression through DeepSeek-OCR.

Fifth, the research map is maintained against current releases. As of July 28, 2026, DeepSeek’s official hosted API catalog lists deepseek-v4-flash and deepseek-v4-pro. The former deepseek-chat and deepseek-reasoner service aliases belong in the historical API timeline; their announced July 24 retirement deadline has passed, and they should not be presented as current research models or supported API IDs.


### Complete List of Important DeepSeek Research Papers

The table below focuses on official or high-authority sources. Some entries are full arXiv papers; others are official release notes or Hugging Face/GitHub model cards. When an item is not a conventional paper, it is labeled accordingly.


Paper / Technical Report | Year | Main Topic | Model or System | Why It Matters | Official Source Type | Best For
DeepSeek LLM: Scaling Open-Source Language Models with Longtermism | 2024 | General LLM scaling | DeepSeek LLM 7B/67B | Establishes the early DeepSeek LLM line, scaling-law study, SFT/DPO chat models, and 2T-token pretraining dataset. | arXiv + GitHub | Beginners, LLM foundations
DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models | 2024 | MoE architecture | DeepSeekMoE | Introduces fine-grained expert segmentation and shared expert isolation, which become central to later DeepSeek MoE models. | arXiv | Architecture researchers
DeepSeek-Coder | 2024 | Code LLMs | DeepSeek-Coder 1.3B–33B | Introduces open code models trained on project-level code data, with code generation and infilling focus. | arXiv | Software engineers, coding agents
DeepSeekMath | 2024 | Math reasoning | DeepSeekMath 7B | Introduces a math-focused model and GRPO, a key method later associated with DeepSeek reasoning work. | arXiv + GitHub | Reasoning researchers, students
DeepSeek-VL | 2024 | Vision-language understanding | DeepSeek-VL | Applies DeepSeek research to real-world multimodal tasks such as screenshots, PDFs, OCR, charts, and scientific documents. | arXiv + GitHub | Multimodal engineers
DeepSeek-V2 | 2024 | Efficient MoE LLM | DeepSeek-V2 | Combines DeepSeekMoE and Multi-head Latent Attention; supports 128K context and activates 21B of 236B parameters per token. | arXiv + GitHub | LLM infra teams
DeepSeek-Prover | 2024 | Formal theorem proving | DeepSeek-Prover | Uses synthetic Lean 4 theorem-proving data to improve formal proof generation. | arXiv | Formal math researchers
DeepSeek-Coder-V2 | 2024 | MoE code intelligence | DeepSeek-Coder-V2 | Continues from DeepSeek-V2 with code-focused training, 128K context, and support for hundreds of programming languages. | arXiv + GitHub | Coding model builders
DeepSeek-Prover-V1.5 | 2024 / 2025 | Lean theorem proving | DeepSeek-Prover-V1.5 | Uses proof assistant feedback, reinforcement learning, and Monte Carlo tree search; published as an ICLR 2025 conference paper. | arXiv + ICLR | Theorem proving
Janus | 2024 | Unified multimodal understanding and generation | Janus | Decouples visual encoding for multimodal understanding and generation in a unified autoregressive framework. | arXiv + GitHub | Multimodal research
JanusFlow | 2024 / 2025 | Multimodal generation | JanusFlow | Combines autoregressive modeling with rectified flow; accepted in CVPR 2025 open access proceedings. | arXiv + CVPR | Vision-generation researchers
DeepSeek-VL2 | 2024 | MoE vision-language model | DeepSeek-VL2 | Adds dynamic tiling and DeepSeekMoE/MLA-based language modeling for advanced multimodal understanding. | arXiv + GitHub | VLM builders
DeepSeek-V3 Technical Report | 2024 / 2025 | Efficient frontier-scale MoE LLM | DeepSeek-V3 | Introduces a 671B-parameter MoE with 37B activated per token, MLA, DeepSeekMoE, auxiliary-loss-free balancing, multi-token prediction, and FP8 training. | arXiv + GitHub | LLM architecture and training teams
DeepSeek-R1 | 2025 | Reasoning via RL | DeepSeek-R1, R1-Zero, distilled models | A major reasoning-model release that studies RL-driven reasoning and distillation into smaller dense models. | arXiv + GitHub + Nature | Reasoning researchers
Janus-Pro | 2025 | Multimodal understanding and generation | Janus-Pro | Scales and improves Janus with better training strategy, data, and model size. | arXiv + Hugging Face/GitHub | Multimodal product teams
DeepSeek-R1-0528 | 2025 | R1 update | DeepSeek-R1-0528 | Official R1 update with improved benchmarks, JSON output, function calling, and open weights. | DeepSeek API docs + Hugging Face | API users, app developers
DeepSeek-V3.1 / V3.1-Terminus | 2025 | Hybrid thinking/non-thinking and agents | DeepSeek-V3.1 | Official release notes describe hybrid inference, faster thinking, and improved agent capabilities; Terminus addresses language consistency and agent feedback. | DeepSeek API docs + Hugging Face | Agent builders
DeepSeek-V3.2-Exp | 2025 | Sparse attention experiment | DeepSeek-V3.2-Exp | Introduces DeepSeek Sparse Attention as an experimental step toward more efficient long-context training and inference. | DeepSeek API docs + GitHub | Long-context researchers
DeepSeek-OCR | 2025 | Optical context compression | DeepSeek-OCR | Studies visual-text compression for long-context processing using DeepEncoder and a DeepSeek3B-MoE decoder. | arXiv + GitHub | Document AI, OCR, context compression
DeepSeek-OCR 2: Visual Causal Flow | 2026 | Semantic visual-token ordering and document understanding | DeepSeek-OCR-2 | Introduces DeepEncoder V2, which dynamically reorders visual tokens according to image semantics before language-model interpretation. | arXiv:2601.20552 + official GitHub repository | OCR, complex layouts, document AI, and RAG ingestion
DeepSeekMath-V2 | 2025 | Self-verifiable math reasoning | DeepSeekMath-V2 | Investigates LLM-based verification and proof generation for rigorous mathematical reasoning. | arXiv | Advanced math reasoning
DeepSeek-V3.2 | 2025 | Reasoning, DSA, agents | DeepSeek-V3.2 / V3.2-Speciale | Adds DSA, scalable RL, and agentic task synthesis; official sources describe it as reasoning-first and built for agents. | arXiv + DeepSeek docs + Hugging Face | Agentic AI and reasoning teams
DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence | 2026 | Million-token context, MoE, hybrid attention, and agents | DeepSeek-V4-Pro / V4-Flash | Introduces CSA/HCA hybrid attention, mHC, the Muon optimizer, and a 1M-token context; reports 1.6T total / 49B active parameters for Pro and 284B / 13B for Flash. | arXiv:2606.19348 + official model cards + DeepSeek release note | Long-context AI, agent research, model architecture, and inference systems


### Best Papers to Start With

Start here if you are new to DeepSeek Research:

- DeepSeek LLM for the early model family and scaling philosophy.

- DeepSeekMoE for the sparse expert architecture.

- DeepSeek-V2 for MLA and efficient inference.

- DeepSeek-V3 for large-scale MoE training and FP8-oriented efficiency.

- DeepSeek-R1 for reinforcement-learning-based reasoning.

- DeepSeek-V3.2 for sparse attention, agentic training, and reasoning-first design.

- DeepSeek-V4 for the current million-token context direction.


### Recommended Reading Order for DeepSeek Research Papers


Reader Type | Start With | Then Read | Why This Order Works
Beginner | DeepSeek LLM | DeepSeek-V2, DeepSeek-V3, DeepSeek-R1 | Moves from general LLM scaling to efficient MoE models and reasoning.
LLM architecture researcher | DeepSeekMoE | DeepSeek-V2, DeepSeek-V3, DeepSeek-V3.2, DeepSeek-V4 | Follows the architecture path from expert specialization to MLA, DSA, and V4 hybrid attention.
Reasoning/RL researcher | DeepSeekMath | DeepSeek-R1, DeepSeek-R1-0528, DeepSeek-V3.2, DeepSeekMath-V2 | Shows the progression from GRPO to large-scale RL, distillation, and verification-based reasoning.
Coding model engineer | DeepSeek-Coder | DeepSeek-Coder-V2, DeepSeek-R1, DeepSeek-V3.2, DeepSeek-V4 | Connects code pretraining, long context, reasoning, tool use, and agentic coding.
Math/theorem proving researcher | DeepSeekMath | DeepSeek-Prover, DeepSeek-Prover-V1.5, DeepSeekMath-V2 | Moves from informal math reasoning to Lean proof generation and self-verification.
Multimodal/OCR researcher | DeepSeek-VL | DeepSeek-VL2, Janus, Janus-Pro, DeepSeek-OCR | Covers vision-language understanding, unified generation, and visual context compression.
Infrastructure team | DeepSeek-V2 | DeepSeek-V3, V3.2-Exp, V3.2, V4, DeepSeek GitHub infrastructure repos | Focuses on model architecture, efficient attention, context length, kernels, and deployment.


### DeepSeek Research Timeline

2023: DeepSeek begins releasing open model work, including early LLM and code-model repositories. The official DeepSeek LLM repository describes the 7B/67B model family and the 2T-token bilingual pretraining dataset.

January 2024: DeepSeek LLM and DeepSeekMoE appear on arXiv. DeepSeek LLM focuses on scaling open language models, while DeepSeekMoE focuses on expert specialization in mixture-of-experts language models.

January–February 2024: DeepSeek-Coder and DeepSeekMath are published. DeepSeek-Coder focuses on code intelligence, while DeepSeekMath introduces mathematical reasoning work and GRPO.

March 2024: DeepSeek-VL is released as a vision-language model for real-world multimodal understanding, including screenshots, PDFs, OCR, charts, and scientific documents.

May–June 2024: DeepSeek-V2 and DeepSeek-Coder-V2 extend the research line into efficient MoE inference and code-focused continued training.

August 2024: DeepSeek-Prover-V1.5 appears as an improvement over DeepSeek-Prover, using proof assistant feedback, reinforcement learning, and Monte Carlo tree search. It later appears as an ICLR 2025 conference paper.

December 2024: DeepSeek-V3 is released as a major MoE technical report with 671B total parameters, 37B activated per token, MLA, DeepSeekMoE, auxiliary-loss-free load balancing, multi-token prediction, and large-scale pretraining.

January 2025: DeepSeek-R1 is released, including R1-Zero, R1, and distilled dense models. The work centers on reinforcement learning for reasoning and distillation into smaller models.

January 2025: Janus-Pro is released as an improved Janus model for unified multimodal understanding and generation.

May 2025: DeepSeek-R1-0528 is released with official notes describing improved benchmark performance, reduced hallucinations, JSON output, function calling, and open weights.

September 2025: DeepSeek-V3.2-Exp is released as an experimental model built on V3.1-Terminus and introducing DeepSeek Sparse Attention for long-context efficiency research.

October–November 2025: DeepSeek-OCR and DeepSeekMath-V2 expand the research line into optical context compression and self-verifiable mathematical reasoning.

December 2025: DeepSeek-V3.2 and V3.2-Speciale are released. Official sources describe V3.2 as a reasoning-first model built for agents, with DSA, scalable RL, and a large-scale agentic task synthesis pipeline.

January 2026: DeepSeek-OCR 2 introduced DeepEncoder V2 and Visual Causal Flow, exploring semantic reordering of visual tokens for complex document understanding.

April 2026: DeepSeek released the V4 Preview family and published the DeepSeek-V4 technical report, covering V4-Pro, V4-Flash, one-million-token context, hybrid CSA/HCA attention, mHC, and the Muon optimizer.


### Key Technical Themes in DeepSeek Research


#### Mixture-of-Experts and DeepSeekMoE

Mixture-of-Experts, or MoE, is an architecture where only part of a large model is activated for each token. The goal is to increase total model capacity without paying the full compute cost of activating every parameter. DeepSeekMoE introduced a specialization-focused MoE design using fine-grained experts and shared experts. Later models such as DeepSeek-V2, DeepSeek-V3, V3.2, and V4 build heavily on sparse expert design.


#### Multi-head Latent Attention

Multi-head Latent Attention, or MLA, is one of DeepSeek’s central efficiency ideas. In plain English, MLA compresses the attention key-value cache into a smaller latent representation, which can reduce memory pressure during inference. DeepSeek-V2 introduced MLA together with DeepSeekMoE, and DeepSeek-V3 further validated that architecture at larger scale.


#### Efficient Training and FP8

DeepSeek-V3 is the key paper for efficient large-scale training. The report describes a 671B-parameter MoE model with 37B activated parameters per token and reports pretraining on 14.8T tokens. It also highlights efficiency-focused choices such as MLA, DeepSeekMoE, auxiliary-loss-free balancing, multi-token prediction, and stable large-scale training.


#### Reinforcement Learning and GRPO

GRPO appears in the DeepSeekMath paper as a reinforcement learning method for mathematical reasoning. DeepSeek-R1 later makes RL the center of the reasoning pipeline, with R1-Zero exploring reasoning behavior through RL before the more refined R1 pipeline adds cold-start data and multi-stage training. The Nature version of the R1 paper frames this as a demonstration that reasoning can be incentivized through reinforcement learning without human-labeled reasoning trajectories.


#### Reasoning Models and Distillation

DeepSeek-R1 is important not only because of its own reasoning capability, but because it shows how reasoning traces from a large model can be distilled into smaller dense models. The official R1 repository lists distilled checkpoints based on Qwen and Llama model families, giving researchers a way to study smaller reasoning models without running the full 671B-parameter MoE model.


#### Long-Context and Sparse Attention

DeepSeek’s long-context work evolves from MLA in V2 and V3 to DeepSeek Sparse Attention in V3.2-Exp and V3.2, then to V4’s million-token context technical materials. V3.2’s arXiv abstract identifies DSA as a key mechanism for reducing computational complexity while preserving long-context performance, while V4’s official model card describes a hybrid attention design that combines Compressed Sparse Attention and Heavily Compressed Attention.


#### Coding and Agentic Workflows

DeepSeek-Coder and DeepSeek-Coder-V2 provide the code-model foundation. DeepSeek-V3.1, V3.2, and V4 then move toward agentic use cases such as tool use, code agents, and long-horizon task execution. Official V3.2 sources describe “thinking in tool-use,” and V4 release notes emphasize agentic coding and integration with leading AI-agent workflows.


#### Mathematical Reasoning and Proof Generation

DeepSeekMath introduced a math-focused model and GRPO. DeepSeek-Prover and DeepSeek-Prover-V1.5 then extended this direction into Lean 4 theorem proving, synthetic formal data, proof assistant feedback, and tree search. DeepSeekMath-V2 continues the line by focusing on self-verifiable mathematical reasoning and LLM-based verification.


#### Multimodal, Vision-Language, and OCR Research

DeepSeek-VL and DeepSeek-VL2 focus on vision-language understanding. Janus, JanusFlow, and Janus-Pro address unified multimodal understanding and generation. DeepSeek-OCR takes a different route by studying whether visual representations can compress long text contexts through optical 2D mapping.


### Technical Themes by Paper


Technical Theme | Best DeepSeek Source | What It Explains | Practical Value
Scaling open LLMs | DeepSeek LLM | Scaling laws, 7B/67B models, SFT/DPO chat models | Foundation for understanding the early DeepSeek stack
Expert specialization | DeepSeekMoE | Fine-grained expert segmentation and shared experts | Efficient model capacity expansion
KV-cache efficiency | DeepSeek-V2 | MLA and MoE for cheaper inference | Long-context serving and lower memory pressure
FP8 and large MoE training | DeepSeek-V3 | Stable training, MoE scale, multi-token prediction | Frontier-scale training design
RL for reasoning | DeepSeekMath, DeepSeek-R1 | GRPO, RL, R1-Zero, R1, distillation | Math, coding, STEM, and chain-of-reasoning research
Tool use and agents | DeepSeek-V3.2 | Thinking in tool use and agentic task synthesis | Agent workflows, code agents, tool-using models
Sparse attention | V3.2-Exp, V3.2 | DeepSeek Sparse Attention | Long-context efficiency
Million-token context | DeepSeek-V4 | CSA/HCA hybrid attention, 1M context | Large-document, repository, and agent memory use cases
Formal proof generation | DeepSeek-Prover, Prover-V1.5 | Lean 4, synthetic proof data, RL from proof assistant feedback | Formal math and theorem proving
Vision-language AI | DeepSeek-VL, VL2, Janus-Pro | OCR, document understanding, multimodal generation | Multimodal products
Optical compression | DeepSeek-OCR | Vision-text compression for long contexts | Document AI and context compression


### DeepSeek Research Papers by Use Case


If You Want To… | Read First | Then Read | Why
Understand DeepSeek reasoning models | DeepSeekMath | DeepSeek-R1, Nature R1 paper, DeepSeekMath-V2 | Shows GRPO, RL-based reasoning, and self-verification.
Build coding agents | DeepSeek-Coder | DeepSeek-Coder-V2, DeepSeek-R1, V3.2, V4 | Moves from code pretraining to agentic reasoning and tool use.
Study efficient LLM training | DeepSeekMoE | DeepSeek-V2, DeepSeek-V3, V4 | Explains sparse experts, MLA, FP8-oriented training, and hybrid attention.
Study long context | DeepSeek-V2 | V3.2-Exp, V3.2, V4, DeepSeek-OCR | Covers MLA, DSA, 1M context, and visual context compression.
Study math reasoning | DeepSeekMath | DeepSeek-R1, DeepSeekMath-V2 | Follows math RL from answer-based reasoning to verification.
Study theorem proving | DeepSeek-Prover | Prover-V1.5, DeepSeekMath-V2 | Focuses on Lean, proof assistant feedback, and proof verification.
Build multimodal apps | DeepSeek-VL | DeepSeek-VL2, Janus-Pro, DeepSeek-OCR | Covers document understanding, OCR, image understanding, and generation.
Run models locally | GitHub + Hugging Face model cards | V3, R1, V3.2, V4 model cards | Model cards explain weights, chat templates, supported runtimes, and license details.


### Official Sources for DeepSeek Research Papers

Use these source categories when verifying DeepSeek Research papers:

1. DeepSeek official website and API docsDeepSeek release notes and API documentation are the best source for current model availability, API model names, deprecations, context length, and release dates. The V4 release page, for example, lists V4-Pro and V4-Flash, official 1M context support, open weights, and the V4 technical report link.

2. DeepSeek GitHub repositoriesGitHub repositories often include paper links, quick-start instructions, model downloads, licensing notes, and citations. They are especially useful for DeepSeek LLM, V2, V3, R1, Coder-V2, VL, VL2, Janus, and OCR.

3. DeepSeek verified Hugging Face organizationHugging Face is important for official model cards, collections, weights, downloads, inference examples, and technical summaries. The verified organization lists collections such as DeepSeek-V4 and DeepSeek-OCR.

4. arXivarXiv is the main source for most DeepSeek technical papers, including DeepSeek LLM, DeepSeekMoE, DeepSeekMath, DeepSeek-V2, DeepSeek-Coder-V2, DeepSeek-V3, DeepSeek-R1, DeepSeek-V3.2, DeepSeek-OCR, and DeepSeekMath-V2.

5. Peer-reviewed or conference sourcesSome DeepSeek-related research appears in peer-reviewed or conference venues. DeepSeek-R1 has a Nature article, DeepSeek-Prover-V1.5 appears as an ICLR 2025 conference paper, and JanusFlow appears in CVPR 2025 open access proceedings.


#### Official Links Checklist

Before citing or using a DeepSeek model, verify:

- Is the source from deepseek-ai on GitHub or Hugging Face?

- Is there an arXiv paper or official technical report?

- Is the release note on official DeepSeek API docs?

- Does the model card list the license and usage restrictions?

- Is the benchmark self-reported, third-party, or peer-reviewed?

- Is the model a full release, preview, experiment, distilled model, or community quantization?

- Does the source include the current chat template, context length, and deployment instructions?


### Common Misconceptions About DeepSeek Research


#### DeepSeek Research vs. the DeepSeek Chatbot

DeepSeek Research is broader than the chatbot. The chatbot is an application interface for certain models, while the research includes papers, model weights, repositories, model cards, API releases, infrastructure libraries, and training/inference techniques.


#### Papers vs. Model Cards vs. GitHub Repositories

A paper explains the research method. A model card explains the released model, license, usage, limitations, and deployment guidance. A GitHub repository may include code, model links, examples, and citations. For DeepSeek, all three can be important.


#### Open Weight vs. Fully Open Source

A model can have public weights without every part of the training pipeline being open. Always check the license, code license, model license, data disclosure, and intended-use notes. DeepSeek often publishes weights and code, but not every release has the same level of openness or documentation.


#### Benchmarks vs. Real-World Performance

DeepSeek papers and model cards include many benchmark claims, but benchmark performance is not the same as production reliability. Treat official benchmark tables as vendor-reported unless a third-party or peer-reviewed source independently verifies them. This is especially important for comparisons against closed-source models.


#### DeepSeek-V4 Is Not Just “A Bigger V3”

DeepSeek-V4 official materials describe new architectural and optimization ideas, including hybrid CSA/HCA attention, mHC, Muon optimizer, 1M context, and two model sizes. It should be read as a new technical direction, not merely as a larger checkpoint.


### How to Cite DeepSeek Research Papers

For academic work, cite the latest official arXiv version, conference version, or journal version. Do not fabricate BibTeX. Use the citation block from the official arXiv page, GitHub repository, Hugging Face model card, Nature article, ICLR page, or CVPR page.

General guidance:

- For arXiv papers: cite the arXiv ID and version you used.

- For GitHub repositories: cite the repository, commit hash if relevant, and access date.

- For Hugging Face model cards: cite the model name, organization, revision if relevant, and access date.

- For API release notes: cite the official DeepSeek API documentation page and access date.

- For peer-reviewed work: cite the published Nature, ICLR, or CVPR version when available.

Example citation formats:


```
DeepSeek-AI. “DeepSeek-V3 Technical Report.” arXiv:2412.19437, 2024/2025.
```


```
DeepSeek-AI. “DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning.” arXiv:2501.12948, 2025.
```


```
DeepSeek-AI. “DeepSeek-V4-Pro.” Hugging Face model card, accessed July 28, 2026.
```


```
DeepSeek-AI. “DeepSeek V4 Preview Release.” DeepSeek API Docs, April 24, 2026.
```


### FAQs About DeepSeek Research Papers


#### What is DeepSeek Research?

DeepSeek Research is the collection of AI papers, technical reports, model cards, repositories, and release notes published by DeepSeek-AI. It covers LLMs, MoE models, reasoning models, code models, math models, theorem proving, multimodal models, OCR, long-context systems, and AI infrastructure.


#### Where can I find DeepSeek Research papers?

The best sources are official DeepSeek GitHub repositories, the verified DeepSeek Hugging Face organization, arXiv, DeepSeek API release notes, and peer-reviewed venues such as Nature, ICLR, and CVPR when applicable.


#### What is the most important DeepSeek paper?

For architecture, start with DeepSeek-V2 and DeepSeek-V3. For reasoning, start with DeepSeekMath and DeepSeek-R1. For the latest long-context direction, read DeepSeek-V3.2 and the official DeepSeek-V4 technical materials.


#### Is DeepSeek-R1 a research paper?

Yes. DeepSeek-R1 has an arXiv paper, official GitHub repository, Hugging Face model cards, and a Nature publication discussing reinforcement learning for reasoning.


#### Is DeepSeek-V3 open source?

DeepSeek-V3 has public checkpoints and an official GitHub repository, and the arXiv report states that checkpoints are available. For exact usage permissions, check the current repository and model-card license before deployment.


#### What is GRPO in DeepSeek research?

GRPO stands for Group Relative Policy Optimization. It appears in the DeepSeekMath paper as a reinforcement learning method for improving mathematical reasoning and is part of the broader DeepSeek reasoning research path.


#### What is the difference between DeepSeek-V3 and DeepSeek-R1?

DeepSeek-V3 is primarily a large MoE base/chat model technical report focused on efficient architecture and training. DeepSeek-R1 is a reasoning-focused model family trained with reinforcement learning on top of DeepSeek-V3-Base, with R1-Zero, R1, and distilled models.


#### What is DeepSeek-V4?

DeepSeek-V4 is DeepSeek’s 2026 model series. Official sources list V4-Pro and V4-Flash, both supporting 1M context. The Hugging Face model card describes V4-Pro as a 1.6T-parameter MoE with 49B activated parameters and V4-Flash as a 284B-parameter MoE with 13B activated parameters.


#### Are DeepSeek papers peer-reviewed?

Many DeepSeek papers are on arXiv, which is not peer review by itself. Some associated work has appeared in peer-reviewed or conference venues, including the Nature article for DeepSeek-R1, ICLR 2025 for DeepSeek-Prover-V1.5, and CVPR 2025 for JanusFlow.


#### What should I read first?

Start with DeepSeek LLM, DeepSeekMoE, DeepSeek-V2, DeepSeek-V3, and DeepSeek-R1. Then choose a specialized path: Coder for code, Math/Prover for math, VL/Janus for multimodal, V3.2/V4 for long context and agents.


#### Can I run DeepSeek models locally?

Some DeepSeek models can be run locally, but the largest MoE models require substantial hardware or specialized inference stacks. Official Hugging Face model cards and GitHub repositories provide deployment guidance, including examples for Transformers, vLLM, SGLang, Docker, and quantized variants where available.


#### How often are DeepSeek papers updated?

DeepSeek releases move quickly. The official change log shows major updates across 2024, 2025, and 2026, including V3, R1, R1-0528, V3.1, V3.2-Exp, V3.2, and V4.


### Conclusion

DeepSeek Research is best understood as a connected research program rather than a single paper or model. The core path starts with DeepSeek LLM, moves through DeepSeekMoE, DeepSeek-V2, and DeepSeek-V3, then branches into DeepSeek-R1 for reasoning, DeepSeek-Coder for programming, DeepSeekMath and DeepSeek-Prover for mathematics, DeepSeek-VL/Janus for multimodal systems, DeepSeek-OCR for visual context compression, and DeepSeek-V3.2/V4 for long-context and agentic AI.

For most readers, the best reading order is: DeepSeek LLM → DeepSeekMoE → DeepSeek-V2 → DeepSeek-V3 → DeepSeek-R1 → DeepSeek-V3.2 → DeepSeek-V4. After that, follow the specialized track that matches your work: coding, math, theorem proving, multimodal AI, OCR, or infrastructure.

Bookmark this guide and revisit it whenever DeepSeek publishes a new model, paper, model card, or technical report.

## 内部链接
- [DeepSeek](https://chat-deep.ai/)

## 外部链接
- [DeepSeek’s verified Hugging Face organization](https://huggingface.co/deepseek-ai)
- [arXiv](https://arxiv.org/abs/2401.02954)
- [GitHub](https://github.com/deepseek-ai/DeepSeek-LLM)
- [arXiv](https://arxiv.org/abs/2401.06066)
- [arXiv](https://arxiv.org/abs/2401.14196)
- [arXiv](https://arxiv.org/abs/2402.03300)
- [GitHub](https://github.com/deepseek-ai/deepseek-math)
- [arXiv](https://arxiv.org/abs/2403.05525)
- [GitHub](https://github.com/deepseek-ai/DeepSeek-VL)
- [arXiv](https://arxiv.org/abs/2405.04434)
- [GitHub](https://github.com/deepseek-ai/deepseek-vl2)
- [arXiv](https://arxiv.org/abs/2405.14333)
- [arXiv](https://arxiv.org/abs/2406.11931)
- [GitHub](https://github.com/deepseek-ai/DeepSeek-Coder-V2)
- [arXiv](https://arxiv.org/abs/2408.08152)
- [ICLR](https://iclr.cc/virtual/2025/poster/30193)
- [arXiv](https://arxiv.org/abs/2410.13848)
- [GitHub](https://github.com/deepseek-ai/janus)
- [arXiv](https://arxiv.org/abs/2411.07975)
- [CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Ma_JanusFlow_Harmonizing_Autoregression_and_Rectified_Flow_for_Unified_Multimodal_Understanding_CVPR_2025_paper.html)
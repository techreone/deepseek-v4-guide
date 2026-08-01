# DeepSeek V2–V3.2: Model History & Release Dates

- **URL**: https://chat-deep.ai/models/deepseek-model-history/
- **Published**: 2026-07-29T10:35:50+00:00
- **Modified**: 2026-07-29T10:35:51+00:00
- **Category**: 
- **Word count**: 2208
- **Code blocks**: 0
- **Description**: Trace DeepSeek from V2 to V3.2 with verified release dates, architecture changes, context windows, API history, and official sources.

## H1


## H2 目录
- Quick Answer
- DeepSeek Model Timeline at a Glance
- How to Read This History
- DeepSeek V2: May 2024
- DeepSeek V3: December 2024
- DeepSeek V3.1: August 2025
- DeepSeek V3.2: September–December 2025
- V2 vs V3 vs V3.1 vs V3.2
- How the Architecture Evolved
- Hosted API Aliases Changed Over Time
- Which DeepSeek Page Should You Use?
- FAQ
- Official Sources and Method

## 正文
Last reviewed: July 29, 2026. This is a historical reference to the DeepSeek model line from V2 through V3.2. It explains what each generation introduced, when important checkpoints were released, and how open-weight releases differed from the hosted DeepSeek API at that point in time. For current model selection, use the DeepSeek Models hub or the current API guide.


### Quick Answer


> DeepSeek V2 established the efficient MLA and DeepSeekMoE foundation in May 2024. V3 scaled that design and added new training techniques in December 2024. V3.1 introduced one model with thinking and non-thinking modes in August 2025. V3.2 moved the V3 line toward sparse attention and stronger agent behavior in late 2025. These are historical releases, not a list of current hosted API model IDs.


### DeepSeek Model Timeline at a Glance


Release | Date | What changed | Historical role
DeepSeek V2 | May 6, 2024 | 236B-parameter MoE, 21B activated parameters, MLA, 128K context | Established the architecture and efficiency direction used by later generations
DeepSeek V2-Lite | May 16, 2024 | Smaller 16B model with 2.4B activated parameters and 32K context | More accessible V2-family research checkpoint
DeepSeek V2.5 | September 5, 2024 | Combined DeepSeek-V2-0628 and DeepSeek-Coder-V2-0724 | Bridge between the V2 and V3 hosted API eras
DeepSeek V3 | December 26, 2024 | 671B MoE, 37B activated parameters, 128K context, FP8 training and Multi-Token Prediction | Major scaling and training-efficiency milestone
DeepSeek V3-0324 | March 24–25, 2025 | Updated reasoning, coding, writing, search and function-calling behavior | Important hosted update within the V3 generation
DeepSeek V3.1 | August 21, 2025 | Hybrid thinking/non-thinking modes and stronger tool use | Moved one model family toward agent-oriented use
V3.1-Terminus | September 22, 2025 | Language-consistency and agent-behavior refinements | Stabilized the V3.1 hosted release
V3.2-Exp | September 29, 2025 | Introduced DeepSeek Sparse Attention | Experimental bridge to the full V3.2 release
DeepSeek V3.2 | December 1, 2025 | Thinking and non-thinking operation, stronger agents and long-context efficiency | Final major V3-line hosted generation before later model families
V3.2-Speciale | December 1, 2025 | Temporary high-capability endpoint with separate limitations | Short-lived evaluation release, not a permanent API destination


### How to Read This History

DeepSeek model history has two layers that should not be mixed together. The first is the open-weight release: a named checkpoint, model card, technical report, license and downloadable weights. The second is the hosted service: the model behind DeepSeek Chat or an API alias at a specific date. A hosted alias could point to different underlying versions over time while client code continued using the same name.

That distinction is why an old article saying that an API alias “is DeepSeek V3” can become wrong even though it was accurate on its publication date. Use this page to understand the timeline. Use the DeepSeek Model Names reference to understand the difference between product labels, API IDs and downloadable checkpoints.


### DeepSeek V2: May 2024

DeepSeek released V2 on May 6, 2024 as a large Mixture-of-Experts model designed around economical training and efficient inference. The official release describes 236 billion total parameters with 21 billion activated for each token, 8.1 trillion pretraining tokens and a 128K context window for the main V2 checkpoints.


#### What DeepSeek V2 Introduced

- Multi-head Latent Attention (MLA): a compressed attention design intended to reduce the key-value cache required during inference.

- DeepSeekMoE: an expert-routing design that increased total model capacity without activating every parameter for every token.

- Long context: the main V2 model card listed support up to 128K tokens.

- Open-weight research access: DeepSeek published base and chat checkpoints together with code, model details and licensing information.

V2 matters because later DeepSeek generations did not discard its core direction. V3 explicitly built on MLA and DeepSeekMoE, so V2 is the clearest starting point for understanding the architectural lineage. The smaller V2-Lite followed on May 16, 2024 with 16 billion total parameters, 2.4 billion activated parameters and a 32K context window.


#### From V2 to V2.5

The V2 era included several hosted updates. DeepSeek updated its chat and coding services during June and July 2024, then announced V2.5 on September 5, 2024. That release combined DeepSeek-V2-0628 with DeepSeek-Coder-V2-0724. At the time, the hosted aliases deepseek-chat and deepseek-coder provided compatible routes to V2.5. It is best understood as the hosted bridge between the original V2 family and the later V3 generation.

Historical status: V2 and V2.5 are useful for architecture research, reproduction work and release-history comparisons. They should not be used to infer which model powers DeepSeek’s current hosted services.


### DeepSeek V3: December 2024

DeepSeek V3 was released on December 26, 2024. It scaled the MoE design to 671 billion total parameters with 37 billion activated for each token and retained a 128K context window. The official technical material describes pretraining on 14.8 trillion tokens. DeepSeek V3 was trained with FP8 and released with FP8 weights, alongside a training process designed for efficiency and stability.


#### What Changed in V3

- Greater scale: V3 substantially increased total and activated parameter counts while keeping sparse MoE activation.

- Auxiliary-loss-free load balancing: DeepSeek introduced a strategy intended to balance experts without the same performance trade-offs associated with an auxiliary balancing loss.

- Multi-Token Prediction: V3 added a training objective that predicts more than one future token and can also support speculative decoding research.

- FP8 training: the release documented large-scale FP8 mixed-precision training as part of its efficiency story.

V3 became historically important for more than its benchmark results. It showed how the architectural ideas validated in V2 could be scaled into a much larger general model while controlling training and inference cost. It also became an important open-weight reference for researchers studying MoE routing, FP8 training and long-context deployment.


#### DeepSeek V3-0324

The hosted API switched to the DeepSeek-V3-0324 checkpoint on March 24, 2025, and DeepSeek published the release announcement on March 25. The hosted update focused on reasoning, coding, front-end generation, Chinese writing, translation, search and function calling. V3-0324 was an update within the V3 line rather than a new top-level generation, so it belongs inside the V3 history rather than in a separate current-model guide.

Historical status: V3 remains a major architecture and open-weight milestone. The old hosted mapping associated with V3 was later replaced by V3.1, V3.2 and subsequent families.


### DeepSeek V3.1: August 2025

DeepSeek released V3.1 on August 21, 2025. It kept the V3 architecture scale while changing how the model could be used. Its defining feature was a hybrid design in which one model supported both thinking and non-thinking behavior through different chat templates. DeepSeek also described about 840 billion additional continued-pretraining tokens for long-context extension on top of the V3 base.


#### Hybrid Reasoning and Tool Use

Before V3.1, users often thought of general chat and explicit reasoning as separate model experiences. V3.1 brought those modes into a single family: non-thinking mode for direct responses and thinking mode for tasks that benefit from more deliberate reasoning. The release also emphasized stronger tool calling, multi-step agent tasks and improved reasoning efficiency.

The open-weight V3.1 release is separate from the dated hosted mapping. Researchers can still study the checkpoint and its chat templates, but historical API aliases should not be copied into new production code without checking the current documentation.


#### V3.1-Terminus

DeepSeek updated the hosted model to V3.1-Terminus on September 22, 2025. The update focused on reducing Chinese-English mixing and abnormal characters while further improving Code Agent and Search Agent behavior. Terminus was a stabilization step within the V3.1 generation, not a separate long-term product family.

Historical status: V3.1 is the point where hybrid thinking and agent-oriented use became central to the V3 line. Its hosted role was short because V3.2-Exp followed one week after Terminus.


### DeepSeek V3.2: September–December 2025

The V3.2 story has two stages. DeepSeek first released V3.2-Exp on September 29, 2025 as an experimental checkpoint built on V3.1-Terminus. The full DeepSeek V3.2 hosted release followed on December 1, 2025. Treating those dates separately prevents the common mistake of presenting the experimental release and the final hosted update as the same event.


#### V3.2-Exp and DeepSeek Sparse Attention

V3.2-Exp introduced DeepSeek Sparse Attention, or DSA. The goal was to explore more efficient attention for long-context training and inference while keeping output quality close to the V3.1-Terminus baseline. DeepSeek released model materials and a technical report, making V3.2-Exp an important research checkpoint even though it was explicitly described as experimental.


#### The Full V3.2 Release

On December 1, 2025, DeepSeek upgraded its hosted chat and reasoning services to V3.2. The generation retained thinking and non-thinking operation and continued the V3.1 direction toward stronger tool use and agentic tasks. It also moved sparse-attention work from an experimental milestone into the main V3.2 story.

DeepSeek also offered V3.2-Speciale through a temporary endpoint. It did not support tool calls and was available only until December 15, 2025 at 15:59 UTC; that endpoint has expired. It was a time-limited evaluation release, not a current model or permanent API option.

Historical status: V3.2 was the last major V3-line hosted generation before DeepSeek introduced later model families. For current availability, pricing and API IDs, use the DeepSeek V4 reference and the current official documentation.


### V2 vs V3 vs V3.1 vs V3.2


Generation | Core contribution | Scale and context | Best reason to study it today
V2 | MLA and efficient DeepSeekMoE foundation | 236B total, 21B activated, 128K | Origins of the architecture used by later large DeepSeek models
V3 | Large-scale MoE, FP8 training, load balancing and MTP | 671B total, 37B activated, 128K | Training efficiency, MoE scaling and open-weight research
V3.1 | Hybrid thinking/non-thinking and stronger agents | V3-scale architecture, 128K | Chat templates, tool use and the shift toward hybrid reasoning
V3.2 | Sparse attention and further agent-oriented development | V3-line MoE with long-context focus | DeepSeek Sparse Attention and the final evolution of the V3 family


### How the Architecture Evolved

The clearest way to understand the V2-to-V3.2 sequence is as a series of accumulated changes rather than four unrelated products:

- V2 established the efficient base: MLA reduced attention-cache pressure and DeepSeekMoE made sparse expert activation central to the family.

- V3 scaled and refined training: the model became much larger while adding load-balancing, MTP and FP8 training techniques.

- V3.1 changed the interaction model: thinking and non-thinking behavior moved into one family, with a stronger focus on tools and agents.

- V3.2 explored attention efficiency: sparse attention targeted long-context efficiency while agent capabilities continued to mature.


### Hosted API Aliases Changed Over Time

Names used in client code did not always match the public generation name. During different periods, the same hosted alias could refer to V2-era, V2.5, V3, V3.1 or V3.2 behavior. That compatibility was convenient for developers, but it makes old tutorials risky when they describe an alias as if it permanently identifies one checkpoint.


Period | Historical hosted mapping | What readers should do now
May–September 2024 | V2-family updates, followed by V2.5 | Use only for historical interpretation
December 2024–March 2025 | V3 and V3-0324 era | Do not assume old alias behavior is still current
August–September 2025 | V3.1 and V3.1-Terminus | Check current model IDs before implementation
September–December 2025 | V3.2-Exp and V3.2 | Treat temporary endpoints and old pricing as expired history

For live code, pricing or migration work, start with the DeepSeek API guide and verify every model ID against DeepSeek’s official documentation on the day you deploy.


### Which DeepSeek Page Should You Use?

- Use this page for release dates, architecture evolution, historical hosted mappings and comparisons between V2, V3, V3.1 and V3.2.

- Use the Models hub when choosing among current model families and access methods.

- Use the Model Names reference when decoding API IDs, product labels, Base/Instruct variants and downloadable checkpoint names.

- Use the API guide for implementation, authentication and current endpoint behavior.


### FAQ


#### When was DeepSeek V2 released?

DeepSeek V2 was released on May 6, 2024. DeepSeek V2-Lite followed on May 16, 2024, and the hosted V2 era later progressed to V2.5 in September 2024.


#### When was DeepSeek V3 released?

DeepSeek V3 was released on December 26, 2024. A significant update known as V3-0324 arrived in March 2025.


#### What is the difference between DeepSeek V3 and V3.1?

V3 established the large 671B MoE generation and its training techniques. V3.1 kept that architectural lineage but added hybrid thinking/non-thinking operation, continued long-context training and stronger tool and agent behavior.


#### Was V3.2-Exp the same as DeepSeek V3.2?

No. V3.2-Exp was an experimental release from September 29, 2025 that introduced DeepSeek Sparse Attention. The full hosted V3.2 release followed on December 1, 2025.


#### Are V2, V3, V3.1 or V3.2 current API model IDs?

Do not assume so. They are generation and checkpoint names in this historical timeline. Hosted API IDs and alias mappings change, so current implementation decisions must be checked against the current official API documentation.


#### Can these older models still be useful?

Yes. Older open-weight checkpoints can remain useful for reproducibility, architecture research, local deployment experiments and benchmark comparisons. Historical usefulness is different from being the recommended hosted model for a new production application.


### Official Sources and Method

This timeline separates release facts from interpretation and gives priority to first-party DeepSeek material. Key sources checked include:

- DeepSeek V2 official GitHub repository

- DeepSeek V3 official GitHub repository and technical material

- DeepSeek V3.1 official model card

- DeepSeek V3.2-Exp official repository and technical report

- DeepSeek API official change log for dated hosted updates

- DeepSeek V3.1 official release announcement

- DeepSeek V3.2-Exp official release announcement

- DeepSeek V3.2 official release announcement

Chat-Deep.ai is an independent DeepSeek reference site. It is not DeepSeek’s official website and does not control DeepSeek’s model availability, API mappings or release schedule.

## 内部链接
- [DeepSeek Models hub](https://chat-deep.ai/models/)
- [current API guide](https://chat-deep.ai/docs/api/)
- [DeepSeek Model Names reference](https://chat-deep.ai/research/deepseek-model-names/)
- [DeepSeek V4 reference](https://chat-deep.ai/models/deepseek-v4/)
- [DeepSeek API guide](https://chat-deep.ai/docs/api/)
- [Models hub](https://chat-deep.ai/models/)
- [Model Names reference](https://chat-deep.ai/research/deepseek-model-names/)
- [API guide](https://chat-deep.ai/docs/api/)

## 外部链接
- [DeepSeek V2 official GitHub repository](https://github.com/deepseek-ai/DeepSeek-V2)
- [DeepSeek V3 official GitHub repository and technical material](https://github.com/deepseek-ai/DeepSeek-V3)
- [DeepSeek V3.1 official model card](https://huggingface.co/deepseek-ai/DeepSeek-V3.1)
- [DeepSeek V3.2-Exp official repository and technical report](https://github.com/deepseek-ai/DeepSeek-V3.2-Exp)
- [DeepSeek API official change log](https://api-docs.deepseek.com/updates/)
- [DeepSeek V3.1 official release announcement](https://api-docs.deepseek.com/news/news250821/)
- [DeepSeek V3.2-Exp official release announcement](https://api-docs.deepseek.com/news/news250929/)
- [DeepSeek V3.2 official release announcement](https://api-docs.deepseek.com/news/news251201/)
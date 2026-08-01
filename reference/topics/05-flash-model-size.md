---
topic: DeepSeek V4 Flash 模型规模与本地部署
slug: flash-model-size
category: research
updated: 2026-08-01
status: partial
sources:
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash
  - https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash
  - https://api-docs.deepseek.com/news/news260424/
  - https://api-docs.deepseek.com/updates/
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4
  - https://unsloth.ai/docs/models/deepseek-v4
  - https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/
  - https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://deepinfra.com/deepseek-ai/DeepSeek-V4-Flash
  - https://huggingface.co/unsloth/DeepSeek-V4-Flash-GGUF
  - https://huggingface.co/antirez/deepseek-v4-gguf
  - https://github.com/ggml-org/llama.cpp/pull/24162
  - https://github.com/antirez/llama.cpp-deepseek-v4-flash
  - https://huggingface.co/teamblobfish/DeepSeek-V4-Flash-GGUF
  - https://huggingface.co/nsparks/DeepSeek-V4-Flash-FP4-FP8-GGUF
  - https://www.reddit.com/r/LocalLLaMA/comments/1uz5w3y/
  - https://www.reddit.com/r/LocalLLaMA/comments/1su3hdo/
  - https://www.reddit.com/r/LocalLLaMA/comments/1ulymml/
  - https://www.reddit.com/r/LocalLLaMA/comments/1v9100b/
  - https://www.spheron.network/blog/deploy-deepseek-v4-flash-gpu-cloud/
  - https://www.modemguides.com/blogs/ai-infrastructure/run-deepseek-v4-flash-locally-hardware-reality-check
  - https://www.morphllm.com/deepseek-v4-flash
  - https://ollama.com/library/deepseek-v4-flash
  - https://www.techtimes.com/articles/322513/20260731/
  - https://artificialanalysis.ai/models/deepseek-v4-flash
  - https://forums.developer.nvidia.com/t/deepseek-v4-flash-iq2xxs-on-a-single-gb10/368970
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/discussions/17
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Base
---

# DeepSeek V4 Flash 模型规模与本地部署

> 研究日期：2026-08-01。本文件为教程写作素材，所有事实均带来源；无法验证的点写入"缺口/待验证"一节。
> 状态：partial（NVFP4 精确文件大小、AWQ/GPTQ 社区量化是否存在，未能找到可靠来源确认）。

## 核心事实（可直接入教程）

- DeepSeek-V4-Flash 是 **284B 总参数 / 13B active** 的 Mixture-of-Experts（MoE）模型，原生支持 **1M token 上下文**，最大输出 384K tokens（[Hugging Face 模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)、[DeepSeek API Docs 官方发布](https://api-docs.deepseek.com/news/news260424/)、[OpenRouter](https://openrouter.ai/deepseek/deepseek-v4-flash)）
- 权重为 **FP4 + FP8 混合精度**：MoE expert 参数用 FP4，其余（attention / norm / router）参数用 FP8 —— 这是"原生已量化"模型，不是 BF16/FP16 分发（[官方模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)、[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）
- 官方推理版权重文件约 **159.61 GB**（来自官方 repo 的 `model.safetensors.index.json`）（[knightli.com 量化表](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/)）；各来源报 146–167 GB 区间，见下方"文件大小"表
- 官方发布/生态参考部署是 **4x H200 节点 + vLLM**（[codersera](https://www.codersera.com/blog/deepseek-v4-vram-gpu-requirements-2026/)）；全精度推理约需 **170–175 GB VRAM**（158 GB 权重 + ~10 GB 1M KV cache + 开销），2x H200（282 GB）或 2x RTX Pro 6000 Blackwell（192 GB）即可（[lushbinary](https://lushbinary.com/blog/deepseek-v4-self-hosting-guide-vllm-hardware-deployment/)）
- **"Flash" 指推理成本，不是体积**：每 token 只激活 13B，但全部 284B 权重必须常驻内存/显存（[modemguides 硬件现实检查](https://www.modemguides.com/blogs/ai-infrastructure/run-deepseek-v4-flash-locally-hardware-reality-check)、[knightli](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/)）
- NVFP4 变体 `nvidia/DeepSeek-V4-Flash-NVFP4`：MoE experts 重新量化到标准 NVFP4，attention / shared experts / router head / MTP 保持 FP8，**需 Blackwell GPU**；用 NVIDIA Model Optimizer 量化（[NVFP4 模型卡](https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4)、[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）
- **DeepSeek-V4-Flash-0731**（2026-07-31 官方正式版公测）与预览版**同架构同大小，仅重新 post-training**，在 9 项 agentic 基准上反超 V4-Pro-Preview（[DeepSeek changelog](https://api-docs.deepseek.com/updates/)、[TechTimes](https://www.techtimes.com/articles/322513/20260731/)、[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）
- 官方 API 模型 ID：`deepseek-v4-flash`；旧别名 `deepseek-chat` / `deepseek-reasoner` 已于 **2026-07-24 15:59 UTC 退役**（[DeepSeek API Docs](https://api-docs.deepseek.com/news/news260424/)）

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| 总参数 / active | 284B / 13B | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| MoE active 占比 | ~4.6%（13B/284B） | [apiyi 发布解读](https://docs.apiyi.com/en/news/deepseek-v4-launch) |
| 上下文窗口 | 1,048,576 tokens（原生） | [OpenRouter](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| 最大输出 | 384,000 tokens | [OpenRouter](https://openrouter.ai/deepseek/deepseek-v4-flash)、[morphllm](https://www.morphllm.com/deepseek-v4-flash) |
| 精度 | FP4（MoE experts）+ FP8（其余参数）混合 | [官方模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 架构 | MoE + hybrid attention（CSA + HCA）+ Manifold-Constrained Hyper-Connections（mHC） | [官方模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)、[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash) |
| 预训练数据 | 32T+ tokens | [vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)、[Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash) |
| 优化器 | Muon optimizer（预训练阶段） | [Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash) |
| 1M 上下文效率 | 单 token FLOPs 约为 V3.2 的 27%；KV cache 约为 V3.2 的 10% | [官方模型卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)（vendor 自报，未独立复测） |
| 推理模式 | Non-think / Think High / Think Max | [vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash) |
| 推荐采样参数 | temperature=1.0, top-p=1.0；0731 版 agentic 场景 top-p=0.95 | [Unsloth](https://unsloth.ai/docs/models/deepseek-v4)、[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash) |
| Think Max 最低上下文 | 384K tokens（`--max-model-len >= 393216`） | [vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)、[Unsloth](https://unsloth.ai/docs/models/deepseek-v4) |
| 许可证 | MIT | [Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash)、[HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 发布日 | 2026-04-24（preview）；0731 正式版公测 2026-07-31 | [morphllm](https://www.morphllm.com/deepseek-v4-flash)、[TechTimes](https://www.techtimes.com/articles/322513/20260731/) |
| API 定价 | $0.14 / M input、$0.28 / M output | [DeepSeek pricing](https://api-docs.deepseek.com/quick_start/pricing/)、[Artificial Analysis](https://artificialanalysis.ai/models/deepseek-v4-flash) |
| OpenRouter 定价 | $0.0896 / M input、$0.1792 / M output | [OpenRouter](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| V4-Pro 对照 | 1.6T 总参数 / 49B active，官方权重 ~864.70 GB | [knightli](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/) |

### 权重文件大小（官方 + 社区实测，2026-08-01）

| 变体 / 精度 | 大小 | 来源 |
|------|-----|------|
| 官方 Flash（inference，FP4+FP8 混合） | **159.61 GB**（`model.safetensors.index.json`） | [knightli](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/) |
| 官方 Flash（inference）磁盘占用 | ~146 GB（Lambda 标注 on-disk）；~158 GB（HF 讨论区用户实测 safetensors） | [Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash)、[HF discussion #17](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/discussions/17) |
| vLLM Recipes 口径 | preview ~160 GB；fused（DSpark 草案模块）~167 GB | [vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash) |
| Unsloth 官方参考（同原精度） | 156.4 GB（其基准表中的 "Official reference"） | [Unsloth](https://unsloth.ai/docs/models/deepseek-v4) |
| FP8-only 转换版（sgl-project/DeepSeek-V4-Flash-FP8） | ~284 GB（Hopper 用） | [Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash) |
| BF16（估算） | ~568 GB（284B × 2B，未发布官方 BF16 权重） | [chat-deep.ai 估算](https://chat-deep.ai/guide/deepseek-system-requirements/)（第三方估算） |
| Flash-Base（官方） | ~294.67 GB（≈全 FP8，284B × 1 字节） | [knightli](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/)、[HF Flash-Base 卡](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Base) |
| NVFP4 变体 | 未找到精确数字（应为 ~150 GB 量级，待验证） | — |

> 各来源差异（146/156.4/158/159.61/160/162/167 GB）源于 GB vs GiB、磁盘 vs 张量尺寸、是否含 DSpark 草案模块。[codersera](https://www.codersera.com/blog/deepseek-v4-vram-gpu-requirements-2026/) 明确注明：官方权重大小在 158–159.6 GB 之间各有引用，教程中宜给出区间而非单一精确值。

### 官方权重全家桶（对照，来自 model.safetensors.index.json）

| 模型 | 参数 | 官方权重大小 |
|------|------|------|
| DeepSeek-V4-Flash | 284B / 13B active | 159.61 GB |
| DeepSeek-V4-Pro | 1.6T / 49B active | 864.70 GB |
| DeepSeek-V4-Flash-Base | 284B | 294.67 GB |
| DeepSeek-V4-Pro-Base | 1.6T | 1606.03 GB |

来源：[knightli.com 量化表](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/)。Base 模型面向研究/微调，不适合普通 chat 部署。

## 量化变体与文件大小（GGUF 生态）

| 量化 | 文件大小 | 说明 | 来源 |
|------|-----|------|------|
| Unsloth UD-Q8_K_XL | 162 GB | **无损**（bit-exact，官方全精度等价），建议 ≥169 GB 总内存 | [Unsloth](https://unsloth.ai/docs/models/deepseek-v4) |
| Unsloth UD-Q4_K_XL | 155.1 GB | 近无损（KLD 0.0102），expert 保持 bit-exact | [Unsloth](https://unsloth.ai/docs/models/deepseek-v4) |
| Unsloth UD-IQ3_XXS | 103 GB | 官方推荐档位，建议 ≥110 GB 总内存 | [Unsloth](https://unsloth.ai/docs/models/deepseek-v4) |
| Unsloth 硬件需求表 | 1-bit≈92 / 2-bit≈102 / 3-bit≈110–135 / 4-bit≈162 / Q8≈169 GB（总内存，含 KV） | — | [Unsloth](https://unsloth.ai/docs/models/deepseek-v4) |
| Q4_K_M（社区） | ~142 GB | TheAITechPulse 推荐"甜点"档 | [TheAITechPulse](https://www.theaitechpulse.com/deepseek-v4-local-guide-2026) |
| teamblobfish Q4_K_M-XL | 4 shards（~50 GiB/shard） | 其 fork 推荐档 | [teamblobfish GGUF](https://huggingface.co/teamblobfish/DeepSeek-V4-Flash-GGUF) |
| tarruda 2.73 BPW | 97 GB 磁盘 | 自述"保留较好质量的最低大小" | [r/LocalLLaMA 2/3/4-bit GGUFs](https://www.reddit.com/r/LocalLLaMA/comments/1ukm2n0/) |
| antirez IQ2XXS（2-bit） | ~86.7 GB（Unsloth 实测） | 面向 128 GB MacBook | [Unsloth](https://unsloth.ai/docs/models/deepseek-v4)、[antirez repo](https://huggingface.co/antirez/deepseek-v4-gguf) |
| 最小可用构建（IQ2_XS 级） | ~81 GB | modemguides 声称"最小的可用量化构建" | [modemguides](https://www.modemguides.com/blogs/ai-infrastructure/run-deepseek-v4-flash-locally-hardware-reality-check) |
| Preyazz Q8_0 GGUF | — | 官方 FP8 safetensors 的无损转换 | [Preyazz GGUF](https://huggingface.co/Preyazz/DeepSeek-V4-Flash-GGUF) |
| nsparks FP4-FP8 原生 GGUF | — | 官方 FP4/FP8 码 1:1 直写 GGUF，需支持 F8_E4M3_B128 + MXFP4 的 llama.cpp 构建 | [nsparks GGUF](https://huggingface.co/nsparks/DeepSeek-V4-Flash-FP4-FP8-GGUF) |

Unsloth 关键结论：官方权重是 **quantization-aware-trained**（QAT），routed experts（模型 96%）原生就是 MXFP4；Unsloth 将 expert 按 bit 原样重打包（bit-exact，KL 散度 ~0），而把 expert 重量化为 Q4_K / IQ2_XXS 的社区转换会让 5% / >30% 的权重四舍五入（[Unsloth](https://unsloth.ai/docs/models/deepseek-v4)）。

> **AWQ / GPTQ**：未找到 V4-Flash 的可验证 AWQ/GPTQ 社区量化发布。[apidog](https://apidog.com/blog/how-to-run-deepseek-v4-locally/) 声称 "AWQ INT4 / GPTQ INT4 可把 V4-Flash 放进单张 80GB 卡，~5% 质量损失"，但其同文称权重 ~500GB@FP8（与官方 159.61GB 矛盾），可信度存疑，未采信。DeepSeek 官方分发即 FP4/FP8，社区主走 GGUF / MXFP4 路线。

## 推理所需 VRAM（单卡 / 多卡）

### 全精度（FP4+FP8 原生权重）
- 权重 ~158 GB + 1M 全上下文 KV cache ~10 GB + 运行时开销 ≈ **170–175 GB 总 VRAM**（[lushbinary](https://lushbinary.com/blog/deepseek-v4-self-hosting-guide-vllm-hardware-deployment/)）
- 配置：**2x H200**（282 GB）或 **2x RTX Pro 6000 Blackwell**（192 GB）；官方/生态参考是 **4x H200 节点 + vLLM + MoE expert parallelism**（[codersera](https://www.codersera.com/blog/deepseek-v4-vram-gpu-requirements-2026/)、[lushbinary](https://lushbinary.com/blog/deepseek-v4-self-hosting-guide-vllm-hardware-deployment/)）
- vLLM Recipes 实测：MI325X **1×256GB** 单卡 TP1 加载 148.66 GiB checkpoint 通过（4K 上下文，非 Think Max）（[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）

### FP8-only（Hopper）
- ~284 GB 权重 → 需要 **8× H100（HGX，TP=8）**；Hopper 无 FP4 硬件，必须用 FP8 版（[Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash)）

### 量化档位（knightli 估算：权重→最小/安全 VRAM）
| 档位 | 权重大小 | 最小 VRAM | 较安全 VRAM |
|------|-----|-----|-----|
| FP8 / 官方 | 159.61 GB | 192 GB | 256 GB |
| Q6 | 120 GB | 160 GB | 192 GB |
| Q5 | 100 GB | 128 GB | 160 GB |
| Q4 | 80 GB | 96 GB | 128 GB |
| Q3 | 60 GB | 80 GB | 96 GB |
| Q2 | 40 GB | 48 GB | 64 GB |

来源：[knightli.com](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/)（Q4–Q2 为比特位估算，不代表已有稳定 GGUF）。

### 现实档位速览（多来源）
- **24 GB 单卡**：跑不动完整 V4-Flash（[knightli](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/)、[willitrunai](https://willitrunai.com/blog/deepseek-v4-vram-requirements)）
- **Q4_K_M ≈ 142 GB**：Mac Studio 192GB 或 6x RTX 4090（[TheAITechPulse](https://www.theaitechpulse.com/deepseek-v4-local-guide-2026)）
- **Q2_K_XL ≈ 96.8 GB**：RTX 5090 + 128 GB DDR4，~15 t/s 生成（[r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/)）
- **INT4 多卡**：~90 GB（4× RTX 4090）（[codersera](https://www.codersera.com/blog/deepseek-v4-vram-gpu-requirements-2026/)）
- 极端低比特实验：IQ1 级 40–60 GB 量级，质量风险高（[knightli](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/)）

> ⚠️ [codersera](https://www.codersera.com/blog/deepseek-v4-flash-locally-full-2026-setup-guide/) 另报"~33 GB 重度量化可跑 1x RTX 6000 Ada"——该数字与上述所有来源（最小可行量化 ~81 GB）矛盾，未找到任何可复现的对应量化文件，判定为不可靠，未入表。

## 推理框架支持

### vLLM（官方 recipe 存在：recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash ✓）
- 版本要求：fused（DSpark）checkpoint 需 **vLLM 0.26.0**；NVIDIA-only 部署 0.25.0 即可（DSpark 草案在 0.25.0 落地，ROCm 支持 0.26.0）（[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）；[spheron](https://www.spheron.network/blog/deploy-deepseek-v4-flash-gpu-cloud/) 要求 `vllm>=0.19.0`
- 关键 flag：`--enable-expert-parallel`、`--tensor-parallel-size N`、`--data-parallel-size 4`（推荐单节点 DP+EP，正好填满 GB200 NVL4 tray）、`--kv-cache-dtype fp8`、`--block-size 256`、`--tokenizer-mode deepseek_v4`、`--reasoning-parser deepseek_v4`、`--tool-call-parser deepseek_v4`、`--trust-remote-code`、`--no-disable-hybrid-kv-cache-manager`（CSA+HCA 必需）、Blackwell 上 `--attention_config.use_fp4_indexer_cache True`（[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)、[Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash)）
- 4 个 Variant checkpoint：0731（默认，官方正式版）/ FP8（preview 权重）/ NVFP4 / DSpark（preview 权重 + fused 草案模块）（[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）
- DSpark spec-decoding 配置：`--speculative-config '{"method":"dspark","num_speculative_tokens":7,"draft_sample_method":"greedy"}'`；MTP：`{"method":"mtp","num_speculative_tokens":3}`（[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）
- NVFP4 变体在 vLLM：`vllm serve nvidia/DeepSeek-V4-Flash-NVFP4 --tensor-parallel-size 4 --trust-remote-code --kv-cache-dtype fp8`；已用 GB300 + `vllm/vllm-openai:nightly-aarch64`（vLLM 0.22.1rc1.dev504）验证（[NVFP4 卡](https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4)）。注意：NVFP4 experts 不支持 `deep_gemm_mega_moe` MoE kernel（仅 FP8），走默认 MoE backend（[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）
- 单 GPU 示例（DGX Station / B300 288GB）：`vllm serve deepseek-ai/DeepSeek-V4-Flash --tensor-parallel-size 1 --pipeline-parallel-size 1 --kv-cache-dtype fp8 --trust-remote-code --block-size 256 --gpu-memory-utilization 0.92 --compilation-config '{"cudagraph_mode":"FULL_AND_PIECEWISE","custom_ops":["all"]}' --attention_config.use_fp4_indexer_cache True --tokenizer-mode deepseek_v4 --tool-call-parser deepseek_v4 --enable-auto-tool-choice --reasoning-parser deepseek_v4 --max-cudagraph-capture-size 128 --speculative-config '{"method":"mtp","num_speculative_tokens":3}'`（[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）
- MI325X（1×256GB，ROCm）保守 TP1 配置见 [vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)（`export VLLM_ROCM_USE_AITER=1`，`--moe-backend triton_unfused`，`--enforce-eager`，仅 4K ctx）

### SGLang
- Blackwell 原生 FP4+FP8：docker 镜像 `lmsysorg/sglang:deepseek-v4-blackwell`，`--moe-runner-backend flashinfer_mxfp4`（FlashInfer FP4 expert kernel，仅 Blackwell）+ EAGLE 推测解码（[Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash)）
- Hopper：必须用 `sgl-project/DeepSeek-V4-Flash-FP8`（FP8-only 版），设 `SGLANG_DSV4_FP4_EXPERTS=0`，`lmsysorg/sglang:deepseek-v4-hopper`，TP=8（[Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash)）
- NVFP4 需 [SGLang PR #25820](https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4)，自动从 `hf_quant_config.json`（`"moe_quant_algo": "NVFP4"`）检测：`python3 -m sglang.launch_server --model nvidia/DeepSeek-V4-Flash-NVFP4 --tensor-parallel-size 8 --trust-remote-code`（[NVFP4 卡](https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4)）
- 完整 SGLang 启动命令（B200，TP=4，EAGLE 3-step）见 [Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash)

### llama.cpp（社区支撑，已合入上游）
- **上游支持已通过 PR #24162（am17an）合入** llama.cpp（[PR #24162](https://github.com/ggml-org/llama.cpp/pull/24162)、[r/LocalLLaMA 合入公告](https://www.reddit.com/r/LocalLLaMA/comments/1uj0fkw/)、[Unsloth 确认](https://huggingface.co/unsloth/DeepSeek-V4-Flash-GGUF/discussions/6)）
- 早期社区 fork（教程可提）：[antirez/llama.cpp-deepseek-v4-flash](https://github.com/antirez/llama.cpp-deepseek-v4-flash)（CPU + Metal，128GB MacBook 目标）、`cchuter/llama.cpp @ feat/v4-port-cuda`、[Fringe210/llama.cpp-deepseek-v4-flash-cuda](https://github.com/Fringe210/llama.cpp-deepseek-v4-flash-cuda)（RTX 6000 96GB 实测 18 t/s）、[teamblobfish fork](https://blog.teamblobfish.com/posts/deepseek-v4-flash-llama-cpp/)（130 commits）、`nisparks/llama.cpp @ wip/deepseek-v4-support`（原生 FP4/FP8 GGUF）
- ⚠️ Unsloth 实测警告：**必须用最新版 llama.cpp**，否则多轮对话第 2 轮后可能出现乱码（上游 prompt caching bug，已修复）（[Unsloth discussion](https://huggingface.co/unsloth/DeepSeek-V4-Flash-GGUF/discussions/6)）
- 原生 FP4-FP8 GGUF 需支持 `F8_E4M3_B128` + MXFP4 的构建，**stock 上游 llama.cpp 无法加载**（[nsparks GGUF](https://huggingface.co/nsparks/DeepSeek-V4-Flash-FP4-FP8-GGUF)）
- llama.cpp 启动示例（teamblobfish Q4_K_M-XL）：`./build/bin/llama-server --model .../DeepSeek-V4-Flash-Q4_K_M-XL-00001-of-00004.gguf --jinja --reasoning off --ctx-size 393216 --n-gpu-layers 999 --flash-attn on --no-repack --temp 1.0 --top-p 1.0 --top-k 0 --min-p 0.0`（[teamblobfish GGUF](https://huggingface.co/teamblobfish/DeepSeek-V4-Flash-GGUF)）

### Unsloth / Ollama / 其他
- **Unsloth**：官方出 UD-Dynamic GGUF（`unsloth/DeepSeek-V4-Flash-GGUF` 与 `unsloth/DeepSeek-V4-Flash-0731-GGUF`）；llama.cpp 直下：`./llama.cpp/llama-cli -hf unsloth/DeepSeek-V4-Flash-0731-GGUF:UD-Q8_K_XL --temp 1.0 --top-p 1.0 --min-p 0.0`（[Unsloth](https://unsloth.ai/docs/models/deepseek-v4)）
- **Ollama**：`deepseek-v4-flash:cloud` 是**云端模型**（跑在 Ollama 自家 Blackwell 集群上，`ollama launch claude --model deepseek-v4-flash:cloud`），不是本地权重；本地需社区量化：`ollama pull hf.co/unsloth/DeepSeek-V4-Flash-GGUF:Q4_K_M`（[ollama.com](https://ollama.com/library/deepseek-v4-flash)、[deepseekai.guide](https://deepseekai.guide/tutorials/running-deepseek-on-ollama/)）
- **ktransformers**：有人实测可跑（32GB VRAM + 192GB 系统 RAM，仅 ~1 t/s）；不支持 Ampere（3090）架构（[r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1tyb3np/)）
- **Transformers（HF）**：`AutoModelForCausalLM.from_pretrained(device_map="auto")` 可加载；hybrid attention 模块是 repo 内自定义代码，`--trust-remote-code` 必需，直到 kernel 合入上游 transformers（[framia](https://framia.converge.ai/page/en-US/news/run-deepseek-v4-locally)、[Clore docs](https://docs.clore.ai/guides/language-models/deepseek-v4)）
- **ModelScope**：同路径镜像（`deepseek-ai/DeepSeek-V4-Flash`），中国大陆下载更快（[framia](https://framia.converge.ai/page/en-US/news/deepseek-v4-huggingface)）

## 关键差异 / 时间线

- **2026-04-24**：V4 系列 preview 发布（V4-Pro 1.6T/49B active + V4-Flash 284B/13B active），1M 上下文，MIT 权重上 HF（[morphllm](https://www.morphllm.com/deepseek-v4-flash)、[DeepSeek API Docs](https://api-docs.deepseek.com/news/news260424/)）
- **2026-04-25**：Ollama 邮件公告 `deepseek-v4-flash:cloud`（Blackwell 云端）上线（[webscraft](https://webscraft.org/blog/deepseek-v4-flash-u-2026-scho-tse-skilki-koshtuye-i-yak-zapustiti-bez-gpu?lang=en)）
- **2026-04-27 前后**：上游 llama.cpp 仍为 WIP；社区 fork 先行（antirez / cchuter / Fringe210 / teamblobfish）（[loftllc.dev](https://loftllc.dev/en/docs/tech/llm-research/deepseek-v4-flash-llama-cpp-blackwell-local-inference/)、[teamblobfish 博客](https://blog.teamblobfish.com/posts/deepseek-v4-flash-llama-cpp/)）
- **2026-06 前后**：llama.cpp PR #24162 合入，上游官方支持 DeepSeek-V4（[PR](https://github.com/ggml-org/llama.cpp/pull/24162)、[r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1uj0fkw/)）
- **2026-07-24 15:59 UTC**：`deepseek-chat` / `deepseek-reasoner` 旧别名完全退役，仅剩 `deepseek-v4-flash` / `deepseek-v4-pro`（[DeepSeek API Docs](https://api-docs.deepseek.com/news/news260424/)）
- **2026-07-31**：**DeepSeek-V4-Flash-0731** 官方正式版公测——同架构同大小，仅 re-post-training；9 项 agentic 基准反超 V4-Pro-Preview（DeepSWE 7.3→54.4，约 +645%）；API 侧 `deepseek-v4-flash` 无声升级，第三方聚合商（OpenRouter 等）当时可能仍路由到 4 月 preview 版（[TechTimes](https://www.techtimes.com/articles/322513/20260731/)、[wan27.org](https://wan27.org/blog/deepseek-v4-flash-official-release)、[DeepSeek changelog](https://api-docs.deepseek.com/updates/)）
- **2026-08 初（预告）**：DeepSeek API 将采用峰谷定价（峰值 2x，北京时间 9:00–12:00、14:00–18:00）；Responses API 届时将支持 V4-Pro（[DeepSeek pricing](https://api-docs.deepseek.com/quick_start/pricing/)）

### 0731 版 vs Preview 版 agentic 基准（DeepSeek 官方自报，未独立复测）

| 基准 | Flash-0731 | Flash (Preview) | Pro (Preview) | GLM-5.2 | Opus-4.8 |
|------|-----|-----|-----|-----|-----|
| Terminal Bench 2.1 | 82.7 | 61.8 | 72.1 | 81.0 | 85.0 |
| NL2Repo | 54.2 | 39.4 | 38.5 | 48.9 | 69.7 |
| Cybergym | 76.7 | 38.7 | 52.7 | — | 83.1 |
| DeepSWE | 54.4 | 7.3 | 12.8 | 46.2 | 58.0 |
| Toolathlon-Verified | 70.3 | 49.7 | 55.9 | 59.9 | 76.2 |
| Agents' Last Exam | 25.2 | 15.8 | 16.5 | 23.8 | 25.7 |
| AutomationBench Public | 25.1 | 10.8 | 12.8 | 12.9 | 27.2 |
| DSBench-FullStack | 68.7 | 37.0 | 41.8 | 61.8 | 71.6 |
| DSBench-Hard | 59.6 | 25.8 | 31.1 | 54.5 | 71.7 |

来源：[Unsloth](https://unsloth.ai/docs/models/deepseek-v4)。其他：SWE-bench Verified Flash-Max 79.0 vs Pro-Max 80.6（[morphllm/llm-stats](https://www.morphllm.com/deepseek-v4-flash)）；Think Max 档 LiveCodeBench 91.6 / HMMT 2026 Feb 94.8 / MMLU-Pro 86.2（[Lambda](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash)，vendor 自报）；MRCR 1M（1M 针眼测试）83.5%（[webscraft](https://webscraft.org/blog/deepseek-v4-flash-u-2026-scho-tse-skilki-koshtuye-i-yak-zapustiti-bez-gpu?lang=en)）。

## 教程素材（写作时直接引用）

- **一句话定位**："Flash 描述的是推理成本，不是体积——每 token 激活 13B，但 284B 权重全部要常驻内存。"（[modemguides](https://www.modemguides.com/blogs/ai-infrastructure/run-deepseek-v4-flash-locally-hardware-reality-check)）
- **MoE 内存误区**："MoE 的 active 参数决定每 token 算力，不决定显存。除非运行时支持 expert 按需加载/卸载，否则全部 expert 权重都要加载。"（[knightli](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/)、[willitrunai](https://willitrunai.com/blog/deepseek-v4-vram-requirements)）
- **普通用户建议**：本地部署 V4-Flash 属于工作站/服务器级别；24–48GB 消费卡应改用 API 或更小的 distill 模型（[knightli](https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/)）
- **API 最高性价比**：官方 API $0.14/$0.28 每 M token，约比 GPT-5.5 / Claude Opus 4.8 便宜 35–100 倍（[techjacksolutions](https://techjacksolutions.com/ai-tools/deepseek/deepseek-pricing/)、[Artificial Analysis](https://artificialanalysis.ai/models/deepseek-v4-flash)）
- **500 字本地部署路径**：官方权重（159.61 GB，FP4+FP8）→ vLLM/SGLang（Blackwell）或 FP8 版（Hopper 8×H100）；或社区 GGUF（Unsloth UD-Q3 103GB / Q4_K_M 142GB）→ llama.cpp/Unsloth Studio；129GB 内存以下用 2-bit 量化（[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)、[Unsloth](https://unsloth.ai/docs/models/deepseek-v4)、[antirez](https://github.com/antirez/llama.cpp-deepseek-v4-flash)）
- **下载命令**：`huggingface-cli download deepseek-ai/DeepSeek-V4-Flash --local-dir ./DeepSeek-V4-Flash --resume-download`（[framia](https://framia.converge.ai/page/en-US/news/run-deepseek-v4-locally)）
- **GGUF 转换/量化脚本**（社区）：`python convert_hf_to_gguf.py --model deepseek-ai/DeepSeek-V4-Flash --outfile models/DeepSeekV4Flash.gguf` 然后 `./llama-quantize models/DeepSeekV4Flash.gguf Q4_K_M`（[tecaprovn](https://huggingface.co/tecaprovn/deepseek-v4-flash-gguf)）；原生 FP4/FP8 直写：`--outtype moe-f8-e4m3-mxfp4`（[nsparks](https://huggingface.co/nsparks/DeepSeek-V4-Flash-FP4-FP8-GGUF)）
- **OpenAI 客户端调用本地 vLLM（Think Max 示例）**：`client.chat.completions.create(model="deepseek-ai/DeepSeek-V4-Flash", messages=..., extra_body={"chat_template_kwargs": {"thinking": True, "reasoning_effort": "max"}})`（[vLLM Recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）
- **提示词技巧**：复杂 agent 任务官方推荐 thinking + `reasoning_effort=max`（[apiyi](https://docs.apiyi.com/en/news/deepseek-v4-launch)）

### 社区实测速度（Reddit r/LocalLLaMA，截至 2026-08，仅供参考）

| 硬件配置 | 量化 | 生成速度 | 来源 |
|------|-----|-----|------|
| 单 RTX 5090 | — | ~31 t/s | [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1uz5w3y/) |
| RTX 5090 + 双 Xeon | — | ~28 t/s（4 个提速点） | [r/LocalAIServers](https://www.reddit.com/r/LocalLLaMA/comments/1umsik8/) |
| RTX 5090 + 128GB DDR4 | Q2_K_XL (96.8GB) | ~15 t/s 生成，300–500 t/s prefill | [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/) |
| RTX 5090 + 3090 Ti（tensor-split） | — | ~19–20 t/s | [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1uz5w3y/) |
| 3× RTX 3090 | — | 8.4 t/s | [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1tptuph/) |
| RTX 6000 Blackwell 96GB | IQ2XXS 级 | 18 t/s | [r/unsloth](https://www.reddit.com/r/unsloth/comments/1sx65hv/) |
| 单 DGX Spark / GB10 | IQ2XXS | ~15 t/s（短上下文） | [NVIDIA 论坛](https://forums.developer.nvidia.com/t/deepseek-v4-flash-iq2xxs-on-a-single-gb10/368970) |
| MacBook M3 Max 128GB | 2-bit | ~17 t/s | [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1sw3stb/) |
| AMD Ryzen AI | ROCmFP2/3/4 混合 | 最高 ~32 t/s | [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1v9100b/) |
| 4× RTX 6000 Pro | — | >200 t/s | [local-inference-lab](https://github.com/local-inference-lab/rtx6kpro/blob/master/models/ds4-flash-v4.md) |
| 双 DGX Spark | — | ~40 t/s（单用户） | [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1u5g9pr/) |
| ktransformers，32GB VRAM + 192GB RAM | 原生 FP4/FP8 | ~1 t/s | [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1tyb3np/) |
| HGX B200 8×（SGLang，EAGLE） | 原生 FP4+FP8 | 1,222–1,469 t/s 输出（总 11,000–13,217 t/s） | [Lambda 基准](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash) |
| HGX H100 8×（FP8 版，EAGLE） | FP8 | 1,262 t/s 输出（总 11,361 t/s） | [Lambda 基准](https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash) |

Lambda 基准口径：8192 in / 1024 out tokens，32 并发，512 prompts。速度为厂商/自托管方实测，非第三方标准化测试。

## 来源清单（完整 URL，全部列出）

1. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash — 官方模型卡（284B/13B、FP4+FP8、CSA+HCA、1M ctx）
2. https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash — vLLM 官方 recipes（checkpoint 变体、配置命令、MI325X/MI355X/PD 部署）
3. https://api-docs.deepseek.com/news/news260424/ — DeepSeek V4 官方发布新闻（含旧别名退役日）
4. https://api-docs.deepseek.com/updates/ — 官方 changelog（0731 正式版、Responses API、峰谷定价预告）
5. https://api-docs.deepseek.com/quick_start/pricing/ — 官方定价页（$0.14/$0.28）
6. https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4 — NVFP4 模型卡（Model Optimizer、SGLang PR、vLLM 命令）
7. https://unsloth.ai/docs/models/deepseek-v4 — Unsloth 指南（无损量化、硬件需求表、GGUF 基准、0731 数据）
8. https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/ — 官方权重大小 + 各档量化 VRAM 估算表
9. https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash — Lambda 部署指南 + B200/H100 吞吐基准
10. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter 模型页（384K 输出、定价）
11. https://deepinfra.com/deepseek-ai/DeepSeek-V4-Flash — DeepInfra 模型页（FP4+FP8 混合说明）
12. https://huggingface.co/unsloth/DeepSeek-V4-Flash-GGUF — Unsloth GGUF（UD 系列量化）
13. https://huggingface.co/antirez/deepseek-v4-gguf — antirez 2-bit GGUF（128GB MacBook 目标）
14. https://github.com/ggml-org/llama.cpp/pull/24162 — llama.cpp 上游支持 PR（含 llama-batched-bench 性能数字）
15. https://github.com/antirez/llama.cpp-deepseek-v4-flash — antirez llama.cpp fork
16. https://huggingface.co/teamblobfish/DeepSeek-V4-Flash-GGUF — teamblobfish GGUF（Q4_K_M-XL 推荐档、命令）
17. https://huggingface.co/nsparks/DeepSeek-V4-Flash-FP4-FP8-GGUF — 原生 FP4/FP8 GGUF 转换
18. https://www.reddit.com/r/LocalLLaMA/comments/1uz5w3y/ — 5090 上 llama.cpp 实测（31/19-20 t/s）
19. https://www.reddit.com/r/LocalLLaMA/comments/1su3hdo/ — Flash/Pro 发布讨论（社区对 128GB 是否够用的判断）
20. https://www.reddit.com/r/LocalLLaMA/comments/1ulymml/ — 5090 全 1M 上下文 llama.cpp patch
21. https://www.reddit.com/r/LocalLLaMA/comments/1v9100b/ — AMD Ryzen AI 32 t/s（ROCmFP2/3/4 混合）
22. https://www.spheron.network/blog/deploy-deepseek-v4-flash-gpu-cloud/ — vLLM 云部署（FP8 ~284GB、TP/EP 配置）
23. https://www.modemguides.com/blogs/ai-infrastructure/run-deepseek-v4-flash-locally-hardware-reality-check — 硬件现实检查（最小量化 81GB）
24. https://www.morphllm.com/deepseek-v4-flash — 事实核查站（含 arXiv:2606.19348、SWE-bench 79.0）
25. https://ollama.com/library/deepseek-v4-flash — Ollama 库（:cloud 云端标签）
26. https://www.techtimes.com/articles/322513/20260731/ — 0731 re-post-training 报道（645% DeepSWE 提升）
27. https://artificialanalysis.ai/models/deepseek-v4-flash — Artificial Analysis 模型页（定价/速度）
28. https://forums.developer.nvidia.com/t/deepseek-v4-flash-iq2xxs-on-a-single-gb10/368970 — GB10 单机 IQ2XXS 实测
29. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash/discussions/17 — "158GB 权重"讨论
30. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Base — Flash-Base 卡（292B params、BF16 tensor 标注）
31. https://www.codersera.com/blog/deepseek-v4-vram-gpu-requirements-2026/ — VRAM 分层表（4x H200 官方参考）
32. https://unsloth.ai/docs/models/deepseek-v4 —（同上，GGUF 量化精度数据）
33. https://www.reddit.com/r/LocalLLaMA/comments/1sw3stb/ — llama.cpp 实验性推理讨论（M3 Max 17 t/s）
34. https://blog.teamblobfish.com/posts/deepseek-v4-flash-llama-cpp/ — teamblobfish 移植技术笔记（架构细节）
35. https://huggingface.co/unsloth/DeepSeek-V4-Flash-GGUF/discussions/6 — llama.cpp 乱码 bug 警告
36. https://www.datacamp.com/tutorial/how-to-run-deepseek-v4-flash-locally — DataCamp 实测（vLLM/SGLang 失败、llama.cpp 成功）
37. https://www.spheron.network/blog/deploy-deepseek-v4-flash-gpu-cloud/ —（同上，vLLM 命令）
38. https://www.theaitechpulse.com/deepseek-v4-local-guide-2026 — 本地部署指南（Q4_K_M 142GB、API curl）
39. https://chat-deep.ai/guide/deepseek-system-requirements/ — 系统需求估算（568/284/142GB）
40. https://willitrunai.com/blog/deepseek-v4-vram-requirements — VRAM 规划（Think Max 384K、4x 80GB 建议）
41. https://www.reddit.com/r/LocalLLaMA/comments/1ukm2n0/ — 2/3/4-bit GGUF 制作（2.73 BPW 97GB）
42. https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/ — 0731 发布讨论（5090+128GB DDR4 实测）

## 缺口 / 待验证（gaps）

1. **NVFP4 变体的精确文件大小**：所有来源只说明"MoE experts 量化到 NVFP4，其余 FP8"，未见磁盘占用数字（应为 ~150 GB 量级，待确认）。
2. **AWQ / GPTQ 量化**：未找到 V4-Flash 的可验证 AWQ/GPTQ 发布；唯一提及（apidog）的权重数字与官方矛盾，未采信。当前社区仅 GGUF / MXFP4 / 原生 FP4+FP8。
3. **BF16 权重大小**：~568 GB 仅为第三方估算（284B × 2B），官方无 BF16 分发。
4. **codersera "33 GB 重度量化"档位**：与所有其他来源（最小可行 ~81 GB）矛盾，无法复现，未入表。
5. **许可证分歧**：绝大多数来源（HF、Lambda、官方）为 MIT；[ofox.ai](https://ofox.ai/blog/deepseek-v4-release-guide-2026/) 一处写 Apache 2.0，判定为以 MIT 为准。
6. **官方发布页**：api-docs.deepseek.com 的 news260424 页面正文未抓到完整内容（搜索片段确认了 284B/13B 与退役日）；如需官方逐条数字可再 extract 一次。
7. **"1-bit" 量化的具体命名/大小**：Unsloth 硬件表出现 1-bit≈92GB，但未注明对应 GGUF 文件名（推测为 IQ1_XXS 级），教程中慎用。
8. **0713 之后聚合商路由**：截至 0731 发布，OpenRouter 等第三方仍可能路由到 4 月 preview 版；写教程时需提示用户核对实际 build。

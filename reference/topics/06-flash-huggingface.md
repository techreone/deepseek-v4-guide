---
topic: DeepSeek V4 Flash HuggingFace 权重
slug: flash-huggingface
category: research
updated: 2026-08-01
status: written
sources:
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731
  - https://huggingface.co/collections/deepseek-ai/deepseek-v4
  - https://huggingface.co/blog/deepseekv4
  - https://api-docs.deepseek.com/news/news260424/
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark
  - https://github.com/deepseek-ai/DeepSpec
  - https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash
  - https://unsloth.ai/docs/models/deepseek-v4
  - https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF
  - https://huggingface.co/ox-ox/DeepSeek-V4-Flash-0731-GGUF
  - https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4
  - https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash
  - https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/
  - https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/
  - https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks
  - https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://huggingface.co/Vontra/DeepSeek-V4-Flash-0731-MXFP4-MLX
  - https://modelscope.cn/models/deepseek-ai/DeepSeek-V4-Flash
  - https://aireleasetracker.com/model/deepseek/deepseek-v4-flash-0731
  - https://www.apidog.com/blog/deepseek-v4-flash-api/
  - https://codersera.com/blog/deepseek-dspark-explained-2026/
  - https://github.com/antirez/ds4/issues/635
  - https://x.com/ArtificialAnlys/status/2083306229074739285
  - https://kie.ai/blog/deepseek-v4-release-what-we-know
---

# DeepSeek V4 Flash HuggingFace 权重

## 核心事实（可直接入教程）

- 官方 HF collection 为 `huggingface.co/collections/deepseek-ai/deepseek-v4`，截至 2026-08-01 收录 7 个模型：`DeepSeek-V4-Flash-Base`、`DeepSeek-V4-Flash`、`DeepSeek-V4-Pro-Base`、`DeepSeek-V4-Pro`、`DeepSeek-V4-Flash-DSpark`、`DeepSeek-V4-Pro-DSpark`、`DeepSeek-V4-Flash-0731`（[collection](https://huggingface.co/collections/deepseek-ai/deepseek-v4)）。
- `deepseek-ai/DeepSeek-V4-Flash-0731` 是官方正式版 Flash 权重仓库，2026-07-31 发布，MIT 许可证（[model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)）。
- 0731 与 4 月 24 日 preview 版 `DeepSeek-V4-Flash` 的**架构与参数量完全一致**（284B total / 13B active、1M context），只是**重新 post-training 过**，并**附加了 DSpark speculative decoding 模块**（结构与 `DeepSeek-V4-Flash-DSpark` 相同）（[model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)；[marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)）。
- HF 界面上 0731 仓库显示 **304B params / 167 GB / 48 个 Safetensors shards**——比 preview 的 284B 多出的部分来自附带的 DSpark 草稿模块，并非模型变大（[r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/)；[ox-ox GGUF card](https://huggingface.co/ox-ox/DeepSeek-V4-Flash-0731-GGUF)）。
- 权重精度为 **FP4 + FP8 混合**（MoE 专家权重 FP4，其余参数 FP8），与 preview 一致；DeepSeek 从未发布 BF16 版本（[ox-ox GGUF card](https://huggingface.co/ox-ox/DeepSeek-V4-Flash-0731-GGUF)；[HF blog](https://huggingface.co/blog/deepseekv4)）。
- 官方技术报告在 preview 仓库：`DeepSeek_V4.pdf`（[api-docs](https://api-docs.deepseek.com/news/news260424/)）；论文 arXiv 2606.19348《DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence》（[model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)）。

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| 官方正式版仓库 | `deepseek-ai/DeepSeek-V4-Flash-0731` | [model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) |
| 官方 preview 仓库 | `deepseek-ai/DeepSeek-V4-Flash` | [model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| Base 仓库 | `deepseek-ai/DeepSeek-V4-Flash-Base`（FP8 全量，HF 显示 292B params） | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Base) |
| DSpark 附加模块仓库 | `deepseek-ai/DeepSeek-V4-Flash-DSpark`（preview 权重 + 草稿模块，非新权重） | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark) |
| NVIDIA 量化版 | `nvidia/DeepSeek-V4-Flash-NVFP4`（NVFP4 专家，Blackwell，SGLang/vLLM） | [NVIDIA card](https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4) |
| 总参数 / 激活参数 | 284B / 13B（MoE） | [model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) |
| Context window | 1,000,000 tokens（1M） | [model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)；[OpenRouter](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| 最大输出 | 384K tokens（high / max 推理档推荐输出上限） | [model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)；[OpenRouter](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| 权重精度 | FP4（MoE 专家）+ FP8（其余），混合 | [HF blog](https://huggingface.co/blog/deepseekv4)；[ox-ox card](https://huggingface.co/ox-ox/DeepSeek-V4-Flash-0731-GGUF) |
| 仓库体积 | ~167 GB（48 个 safetensors shards） | [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/)；[ox-ox card](https://huggingface.co/ox-ox/DeepSeek-V4-Flash-0731-GGUF) |
| 许可证 | MIT（仓库与权重均 MIT） | [model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) |
| 推理模式 | reasoning_effort 三档：`low` / `high` / `max`（preview 名为 Non-think / Think High / Think Max） | [model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)；[vLLM recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash) |
| 推荐采样参数 | temperature = 1.0；agentic 场景 top_p = 0.95，其余 top_p = 1.0 | [model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)；[unsloth docs](https://unsloth.ai/docs/models/deepseek-v4) |
| Chat template | **无 Jinja chat template**；提供 `encoding/` 目录 + `encode_messages` / `parse_message_from_completion_text` 辅助脚本 | [model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) |
| Chat 模板数据 | HF 侧内置 `deepseek_v4` tokenizer-mode；vLLM 用 `--tokenizer-mode deepseek_v4` 即可走 OpenAI 兼容接口 | [vLLM recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash) |
| 训练数据 | 32T+ tokens 预训练；post-training 两阶段（domain 专家 SFT+RL(GRPO) → on-policy distillation 整合） | [preview model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| ModelScope 镜像 | `modelscope.cn/models/deepseek-ai/DeepSeek-V4-Flash`（国内下载更快） | [framia guide](https://framia.converge.ai/page/en-US/news/deepseek-v4-huggingface)；[preview card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |

### 0731 官方 benchmark（DeepSeek 自测，DeepSeek Harness minimal mode + max effort + temp 1.0 / top_p 0.95）

| Benchmark | Flash-0731 | Flash (Preview) | V4-Pro (Preview) | GLM-5.2 | Opus-4.8 |
|---|---|---|---|---|---|
| Terminal Bench 2.1 | 82.7 | 61.8 | 72.1 | 81.0 | 85.0 |
| NL2Repo | 54.2 | 39.4 | 38.5 | 48.9 | 69.7 |
| Cybergym | 76.7 | 38.7 | 52.7 | - | 83.1 |
| DeepSWE | 54.4 | 7.3 | 12.8 | 46.2 | 58.0 |
| Toolathlon-Verified | 70.3 | 49.7 | 55.9 | 59.9 | 76.2 |
| Agents' Last Exam | 25.2 | 15.8 | 16.5 | 23.8 | 25.7 |
| AutomationBench Public | 25.1 | 10.8 | 12.8 | 12.9 | 27.2 |
| DSBench-FullStack † | 68.7 | 37.0 | 41.8 | 61.8 | 71.6 |
| DSBench-Hard † | 59.6 | 25.8 | 31.1 | 54.5 | 71.7 |

† 为 DeepSeek 内部测试集，未经第三方复现。全部为厂商自报数据，用其自家 DeepSeek Harness 评估（[model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)；[marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)）。

### 独立评测（Artificial Analysis，2026-07-31）

- **AA Intelligence Index = 50**，较 4 月 preview 的 40 分提升 10 分，并比 V4-Pro 高 6 分；仅落后 GPT-5.6 Luna (max, 51) 1 分，落后开源权重榜首 Kimi K3 (max, 57) 7 分，与 Gemini 3.6 Flash (50) 同级（[AA article](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash)）。
- **GDPval-AA v2 Elo = 1559**（preview 为 1189）；权重发布后将成为开源权重第二名（Kimi K3 1687 之后、GLM-5.2 1510 之前）（[AA article](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash)）。
- Terminal-Bench 2.1 独立测 79%（+17 分）；τ³-Bench Banking 31%（+8 分）（[AA article](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash)）。
- AA-Omniscience Index = -16（+7），幻觉率 84%（-12 分）；准确率 37% 不变，印证"只是重新 post-training、规模未变"（[AA article](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash)）。

### Flash API 定价（0731 正式版，2026-07-31 生效）

| 项 | 值 | 来源 |
|----|-----|------|
| 输入（cache miss） | $0.14 / 1M tokens | [marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)；[AA](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash) |
| 输入（cache hit） | $0.0028 / 1M tokens（约 98% 折扣） | [marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)；[AA](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash) |
| 输出 | $0.28 / 1M tokens（约为 V4-Pro $0.87 的 1/3） | [marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)；[digitalapplied](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks) |
| 并发限制 | 2,500 并发（V4-Pro 为 500） | [digitalapplied](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks) |
| OpenRouter 转售价 | $0.0896 in / $0.1792 out，context 1,048,576，max output 384,000 | [OpenRouter](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| API model id | `deepseek-v4-flash`（0731 与 preview 同名，改权重不换名） | [apidog](https://apidog.com/blog/deepseek-v4-flash-api/)；[digitalapplied](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks) |

## 关键差异 / 时间线

- **2026-04-24：V4 Preview 首发**。官方 API changelog 宣布 open-sourced，两个 MoE 权重上 HF：`DeepSeek-V4-Pro`（1.6T/49B）、`DeepSeek-V4-Flash`（284B/13B），1M context，MIT；同日还有 `-Base` 两个仓库与 V4-Pro 仓库内的技术报告 PDF（[api-docs news260424](https://api-docs.deepseek.com/news/news260424/)；[HF blog](https://huggingface.co/blog/deepseekv4)）。
- **2026-06-27 前后：DSpark / DeepSpec 发布**。DeepSeek 开源 speculative decoding 框架 DeepSpec（[github.com/deepseek-ai/DeepSpec](https://github.com/deepseek-ai/DeepSpec)），并上线 `DeepSeek-V4-Flash-DSpark` / `DeepSeek-V4-Pro-DSpark` 两个"同一 checkpoint + 草稿模块"仓库；官方自报吞吐提升 51%–400%（[codersera](https://codersera.com/blog/deepseek-dspark-explained-2026/)；[HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark)）。
- **2026-07-31：DeepSeek-V4-Flash-0731 正式版发布**。API changelog 把 V4-Flash 移出 Preview 进入 public beta；同一天权重也发布到 HF（`deepseek-ai/DeepSeek-V4-Flash-0731`），HF 组织页可见 msr2000 于当天发布/更新该模型（[marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)；[HF org 活动](https://huggingface.co/deepseek-ai)；[r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official)）。
- **0731 vs Preview 权重差异**：唯一区别是 **re-post-training**（新权重、旧骨架）+ **附带的 DSpark 草稿模块**；参数量/架构/上下文完全不变（[marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)；[digitalapplied](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks)；[vLLM recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）。
- 体积差异：融合 DSpark 的正式版 ~167 GB vs preview ~160 GB（差异即草稿模块）；tokenizer 与 preview 字节级一致（tokenizer.json / tokenizer_config.json / generation_config.json blob hash 相同）（[vLLM recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)；[ox-ox card](https://huggingface.co/ox-ox/DeepSeek-V4-Flash-0731-GGUF)）。
- **时间线歧义（重要）**：发布当天部分早期报道称"0731 权重尚未上 HF、仅 API"（[digitalapplied](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks)；[aireleasetracker](https://aireleasetracker.com/model/deepseek/deepseek-v4-flash-0731)；[AA "coming weeks"](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash)）。但截至 2026-08-01 该仓库已上线且权重完整（48 shards / 167 GB），r/LocalLLaMA 当天即有人实测，说明权重与 API 同日落地（[HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)；[r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/)）。
- V4-Pro 官方正式版"即将发布"（官方 changelog 口径），V4-Pro 目前仍是 Preview；0731 更新仅作用于 Flash API（[apidog](https://apidog.com/blog/deepseek-v4-flash-api/)；[digitalapplied](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks)）。

## 教程素材（写作时直接引用）

### 下载命令（huggingface-cli / Python）
```bash
pip install huggingface_hub hf_transfer
export HF_HUB_ENABLE_HF_TRANSFER=1   # 1Gbit+ 连接提速
# 正式版 0731（~167 GB，含 DSpark）
huggingface-cli download deepseek-ai/DeepSeek-V4-Flash-0731 --local-dir ./DeepSeek-V4-Flash-0731
# 只下权重文件
huggingface-cli download deepseek-ai/DeepSeek-V4-Flash-0731 \
  --include="*.safetensors" "*.json" "*.py" --local-dir ./deepseek-v4-flash-0731
```
（来源：[enter.pro guide](https://enter.pro/page/en-US/news/deepseek-v4-huggingface)；[framia guide](https://framia.converge.ai/page/en-US/news/deepseek-v4-huggingface)）

```python
from huggingface_hub import snapshot_download
snapshot_download(repo_id="deepseek-ai/DeepSeek-V4-Flash-0731", local_dir="./DeepSeek-V4-Flash-0731")
```
（来源：[framia guide](https://framia.converge.ai/page/en-US/news/deepseek-v4-huggingface)）

### vLLM 部署（官方 model card 给出的 4×GB300 单节点示例）
```bash
vllm serve deepseek-ai/DeepSeek-V4-Flash-0731 \
  --trust-remote-code --kv-cache-dtype fp8 --block-size 256 \
  --data-parallel-size 4 --enable-expert-parallel \
  --moe-backend deep_gemm_mega_moe \
  --attention-config '{"use_fp4_indexer_cache": true}' \
  --speculative-config '{"method":"dspark","num_speculative_tokens":7,"draft_sample_method":"greedy"}'
```
DSpark 仅需一个 flag：`--speculative-config '{"method":"dspark","num_speculative_tokens":7,"draft_sample_method":"greedy"}'`。vLLM 0.25.0 起支持 DSpark drafting；ROCm（MI325X/MI355X）需要 **vLLM 0.26.0**（[model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)；[vLLM recipes](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash)）。

### 消息编码（无 Jinja template，用官方 encoding 脚本）
```python
from encoding_dsv4 import encode_messages, parse_message_from_completion_text
messages = [
    {"role": "user", "content": "hello"},
    {"role": "assistant", "content": "Hello! I am DeepSeek.", "reasoning_content": "thinking..."},
    {"role": "user", "content": "1+1=?"}
]
prompt = encode_messages(messages, thinking_mode="thinking", reasoning_effort="max")
tokenizer = transformers.AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V4-Flash-0731")
tokens = tokenizer.encode(prompt)
```
（来源：[model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)）

### GGUF 量化（Unsloth，官方权重位级一致的重新打包）
| Quant | 大小 | 说明 |
|-------|------|------|
| UD-Q8_K_XL（lossless） | 161.9 GB（~162 GB） | 与官方权重 100% bit-exact，KL≈0 |
| UD-Q4_K_XL（near-lossless） | 155.1 GB | 专家权重保持位一致，仅非专家 4% 降至 Q8_0 |
| UD-IQ3_XXS | 103 GB | 建议至少 110 GB 内存 |
| IQ2_XXS（antirez） | 86.7 GB | 2-bit |
| 1-bit / 2-bit / 4-bit 建议总内存 | 92 / 102 / 162-169 GB | RAM+VRAM 合计 |

运行示例：`hf download unsloth/DeepSeek-V4-Flash-0731-GGUF --local-dir ... --include "*UD-Q8_K_XL*"`；llama.cpp 下 `--chat-template-kwargs '{"enable_thinking":false}'` 可关思考，`'{"reasoning_effort":"max"}'` 设推理档（[unsloth docs](https://unsloth.ai/docs/models/deepseek-v4)；[unsloth GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF)）。

### 本地推理建议
- 采样：temperature = 1.0，top_p = 0.95（agentic）/ 1.0（其他）；high/max 档建议最大输出 384K tokens。
- Think Max 建议 context ≥ 384K tokens。
- llama-server 示例（tarruda 社区版）：`llama-server --model ./IQ3_XXS/DeepSeek-V4-Flash-IQ3_XXS-00001-of-00004.gguf --ctx-size 131072 ...`（[model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)；[tarruda GGUF](https://huggingface.co/tarruda/DeepSeek-V4-Flash-GGUF)）。

### MLX（Apple Silicon）
`Vontra/DeepSeek-V4-Flash-0731-MXFP4-MLX` 为 MXFP4 专家 + MXFP8 attention 的 bit-exact 转换（305B params 显示，13B active），需要 `mlx>=0.32`（[Vontra MLX](https://huggingface.co/Vontra/DeepSeek-V4-Flash-0731-MXFP4-MLX)）。

### API 使用要点
- 保持 base_url 不变，仅把 model 改为 `deepseek-v4-flash`；0731 升级对调用方透明（[api-docs](https://api-docs.deepseek.com/news/news260424/)；[apidog](https://apidog.com/blog/deepseek-v4-flash-api/)）。
- 0731 原生支持 OpenAI Responses API 格式（为 Codex 适配），支持 ChatCompletions 与 Anthropic 兼容格式（[apidog](https://apidog.com/blog/deepseek-v4-flash-api/)；[marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)）。
- 旧模型 id `deepseek-chat` / `deepseek-reasoner` 于 2026-07-24 15:59 UTC 后完全下线，此前路由到 deepseek-v4-flash（[api-docs](https://api-docs.deepseek.com/news/news260424/)）。

### 其他可引用数据点
- DeepSWE 从 preview 的 7.3 跳到 0731 的 54.4（厂商自报，约 645% 增幅）（[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)）。
- preview 版知识/推理基准（厂商自报，DeepSeek-V4-Flash-Max）：SWE-bench Verified 79.0、LiveCodeBench 91.6、Codeforces 3052、GPQA Diamond 88.1、MMLU-Pro 86.2（[preview card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)；[kie.ai](https://kie.ai/blog/deepseek-v4-release-what-we-know)）。
- 效率（Flash 相对 V3.2，1M context）：10% 单 token FLOPs、7% KV cache（HF blog 口径）；Pro 为 27% FLOPs / 10% KV cache（[HF blog](https://huggingface.co/blog/deepseekv4)）。
- 社区热度：DeepSeek-V4-Flash preview 仓库月下载量约 2.92M（collection 元数据）、1.87k likes、100 个 Spaces；Flash-Base 单月 254,753 下载（[collection](https://huggingface.co/collections/deepseek-ai/deepseek-v4)；[preview card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)）。
- 0731 仓库 HF 侧：43 个社区量化、2 个 Spaces、2 个 finetune（[model card 元数据](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)）。
- 反诈提醒：DeepSeek 从未在 GitHub 发布 V4 权重；唯一官方下载渠道是 `huggingface.co/deepseek-ai` 与 ModelScope 镜像，谨防假镜像/钓鱼（[macaron.im](https://macaron.im/blog/deepseek-v4-download)；[digitalapplied](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks)）。

## 来源清单（完整 URL，全部列出）

1. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731 — 官方 0731 模型卡（规格/benchmark/许可证/vLLM 命令/encoding 示例）
2. https://huggingface.co/collections/deepseek-ai/deepseek-v4 — 官方 DeepSeek-V4 collection（7 个模型、下载量）
3. https://huggingface.co/blog/deepseekv4 — 官方 HF 博客（2026-04-24 发布文，CSA/HCA、4 仓库、效率数字）
4. https://api-docs.deepseek.com/news/news260424/ — DeepSeek API 文档 V4 Preview 发布公告
5. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash — Flash preview 模型卡（全量基准表、下载表）
6. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Base — Flash Base 仓库（292B params 显示、FP8）
7. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark — Flash DSpark 仓库（"非新权重，附加草稿模块"）
8. https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro — Pro preview 模型卡（技术报告 PDF）
9. https://github.com/deepseek-ai/DeepSpec — DeepSpec speculative decoding 全栈代码库
10. https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash — vLLM 官方配方（0731 vs FP8 vs NVFP4 vs DSpark 四种 checkpoint、vLLM 版本要求、部署命令）
11. https://unsloth.ai/docs/models/deepseek-v4 — Unsloth 运行指南（GGUF 量化表、内存要求、llama.cpp 命令）
12. https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF — Unsloth 0731 GGUF 仓库
13. https://huggingface.co/ox-ox/DeepSeek-V4-Flash-0731-GGUF — 社区 GGUF（48 shards、FP4 QAT、tokenizer 与 preview 一致）
14. https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4 — NVIDIA NVFP4 量化版（GB300 验证、SGLang/vLLM 命令）
15. https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash — 独立评测 AA Intelligence Index = 50
16. https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/ — 0731 发布解读（价格、并发、时间线）
17. https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/ — 社区确认 304B/167GB/48 shards 属 DSpark 造成
18. https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official — 社区确认同日权重发布
19. https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks — 0731 事实核查（并发 2500、厂商数字标记、早期"无权重"观察）
20. https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm — 九项 agent 基准超越 Pro、DeepSWE 645% 增幅、数据主权讨论
21. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter 模型页（context/output 上限、转售定价）
22. https://huggingface.co/Vontra/DeepSeek-V4-Flash-0731-MXFP4-MLX — MLX bit-exact 转换（OCP MXFP4 格式细节）
23. https://modelscope.cn/models/deepseek-ai/DeepSeek-V4-Flash — ModelScope 国内镜像
24. https://aireleasetracker.com/model/deepseek/deepseek-v4-flash-0731 — 发布追踪（07-31 发布、preview→0731 重命名、API-only 争议记录）
25. https://www.apidog.com/blog/deepseek-v4-flash-api/ — Responses API / Codex 适配、curl 与 SDK 示例
26. https://codersera.com/blog/deepseek-dspark-explained-2026/ — DSpark/DeepSpec 背景（51–400% 提速、6-27 发布）
27. https://github.com/antirez/ds4/issues/635 — antirez ds4 量化器对 0731 的支持讨论
28. https://x.com/ArtificialAnlys/status/2083306229074739285 — AA 官推：0731 开源权重确认、MIT、~167GB FP4/FP8
29. https://kie.ai/blog/deepseek-v4-release-what-we-know — preview 背景、泄漏时间线、V3.2 对比数字
30. https://framia.converge.ai/page/en-US/news/deepseek-v4-huggingface — 下载指南（snapshot_download、ModelScope、MIT 商业使用解读）
31. https://enter.pro/page/en-US/news/deepseek-v4-huggingface — 下载/硬件指南（FP4+FP8、--include 下载）
32. https://macaron.im/blog/deepseek-v4-download — 下载安全提示（权重只在 HF/官方渠道，谨防假仓库）

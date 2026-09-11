---
topic: DeepSeek V4.1 Flash 官方发布（2026-09-10）
slug: v4-1-flash
category: release
updated: 2026-09-11
status: research
sources:
  - https://api-docs.deepseek.com/updates
  - https://api-docs.deepseek.com/news/news260910/
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash
  - https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash
  - https://api-docs.deepseek.com/guides/coding_agents/
  - https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5
  - https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut
  - https://www.reddit.com/r/LocalLLaMA/comments/1wcbid7/deepseek_v41_flash_is_out/
---

# DeepSeek V4.1 Flash 官方发布（2026-09-10）

## 一句话
DeepSeek 于 **2026-09-10** 正式发布 **DeepSeek-V4.1-Flash**：全新架构家族里最小的模型，**552B 主干 MoE + 196B Engram（总计 763B 权重）**，**原生多模态视觉**，1M 上下文，MIT 开源；同时**退役 V4-Flash 系并计划淘汰 V4-Pro**。

## 核心事实（官方 changelog + news260910 + HF 模型卡）

- **发布日**：2026-09-10（API 定价 04:00 UTC 生效）
- **模型名**：API 用 `deepseek-flash`；**旧名 `deepseek-v4-flash` 与 `deepseek-v4-flash-vision-exp` 已退役，临时路由到 V4.1 Flash**
- **架构**：Causal Encoder–Decoder (CED)；40 层 Transformer = 20 层 causal encoder + 20 层 decoder
- **激活参数**：**prefill 8B / decode 16B**（非"全程 8B"——常见误读）
- **总参数**：552B 主干 + 196.6B Engram 条件记忆 = HF 显示 763B
- **层配置**：hidden size 5120；1 shared expert + 384 routed experts/层，**6 routed experts/token**
- **上下文**：1M（1,048,576 tokens），YaRN factor 16（65,536 训练窗口扩展）
- **多模态**：DeepSeek-ViT（32 层 ViT，hidden 1024，patch 14，3× 下采样 aligner，每图上限 1024 token，最少 295,936 像素）；**每 prompt 图片数量无限制**；图像 token `<|deepseek_image|>`；图像 span 有**独立路由 bias**
- **KV 缓存**：全球 KV **890 bytes/token**（≈ V4-Flash 的 1/4 HBM、1/8 SSD 存储；相对 V1 约 437×）；持久缓存保证 **≥72h** 生命周期
- **注意力**：Compressed Sparse Attention 2 (CSA2)，逐层三态 Full / Reindex / Reuse；Hierarchical Sparse Indexer（候选池 2048×8，保留 best 512/query）；FP4 main KV（E2M1，每 16 通道一个 E4M3 scale）；SWA Bounded Replay（只回放最近 n_win token，不落盘）
- **其他组件**：Single-Pass mHC（20 次 Sinkhorn 迭代）；Engram n-gram 记忆（层 1 和 14，各 ~384M 行 × 256 dim，按 4-gram hash 查找）；DSpark 投机解码
- **预训练**：从零训练于 **45T tokens 多模态语料**；稀疏注意力在 64K 序列长度训练，上下文在 34T token 处扩展到 1M
- **后训练**：SFT → RL → on-policy distillation (OPD)；支持 **连续 reasoning effort（整数 1–100）**
- **精度/权重**：routed experts MXFP4，其余 MXFP8 block-quantized，UE8M0 scale，embedding/LM head BF16；checkpoint 磁盘约 **511 GB**
- **许可**：MIT

## 官方 benchmark（instruct，max effort=100，temp=1.0，top_p=0.95；code agent 用 DeepSeek Harness minimal mode + 1M context）

| Benchmark | V4.1 Flash | Opus-5.0 | GPT-5.6 Sol | Kimi K3 | GLM-5.3 | V4-Pro | V4-Flash |
|---|---|---|---|---|---|---|---|
| GPQA Diamond | 90.9 | 93.4 | **94.1** | 92.9 | 88.1 | 92.4 | 89.9 |
| HLE | 36.8 (39.1*) | **56.3** | 44.5 | 43.5 | 42.0† | 42.7† | 37.8† |
| Codeforces (Rating) | **3471** | — | — | — | 3348 | 3289 | — |
| MathArena Apex | 65.6 | — | 65.6 | **65.6** | — | 65.3 | 58.6 |
| Terminal-Bench 2.1 | **90.6** | 89.1 | 88.8 | 88.3 | 88.2 | 87.9 | 82.7 |
| Terminal-Bench 3.0 | 30.0 | **43.3** | 34.4 | 17.7 | 28.3 | 11.8 | 7.6 |
| Terminal-Bench 4.0 | 31.2 | **51.8** | 39.9 | 12.6 | 37.9 | 12.4 | 7.0 |
| DeepSWE v1.1 | **74.2** | 74.0 | 73.0 | 67.5 | 66.9 | 62.7 | 54.4 |
| ProgramBench | 20.3 | **37.0** | 23.0 | 17.5 | 19.0 | 15.5 | — |
| NL2Repo-Bench | 64.0 | **75.3** | 56.8 | 58.0 | 58.0 | 61.5 | 54.2 |
| CyberGym | **88.1** | — | 84.5 | 80.0 | 84.5 | 83.3 | 76.7 |
| SEC-Bench Pro | 62.8 | — | **74.3** | — | — | 56.4 | 30.9 |
| ExploitGym | 15.3 | 22.1 | **33.7** | — | 15.0 | 5.4 | 1.8 |
| HLE w/ tools | **63.9** | 63.6 | — | 59.8 | 62.5 | 60.0 | 51.5 |
| AutomationBench | **54.8** | 50.3 | 45.8 | 46.7 | 48.8 | 43.2 | 37.7 |
| Agents' Last Exam | **31.8** | 28.6 | 26.7 | 27.6 | 28.5 | 25.7 | 25.2 |
| Chartography w/ tools | 78.9 | **84.0** | 79.9 | 68.1 | — | — | — |
| BabyVision w/ tools | 89.6 | **94.1** | 88.9 | 85.7 | — | — | — |
| ZeroBench-main w/ tools | 49.0 | 52.0 | **53.0** | 41.0 | — | — | — |

\* HLE 纯文本子集。† 文本子集。

### 多脚手架对照（max effort，N=8 DeepSWE / N=3 TB2.1，1M context，max_steps=500）

| Benchmark | Claude Code | Codex | OpenCode | Pi | mini-SWE | DSH Minimal | DSH Standard | DSH PTC |
|---|---|---|---|---|---|---|---|---|
| DeepSWE v1.1 | 69.8 | 65.6 | 65.5 | 66.2 | 74.2 | 72.6 | 70.5 | 67.6 |
| Terminal-Bench 2.1 | 88.0 | 84.1 | 85.0 | 86.1 | 90.3 | 90.6 | 85.8 | 85.8 |

### Base 模型关键项
- MMLU-Pro：V4.1-Flash-Base **74.1**（V4-Pro-Base 73.5，V4-Flash-Base 68.3）
- LongBench-V2：V4-Pro-Base **51.5** > V4.1 45.2 > V4-Flash 44.7
- SimpleQA-Verified：V4-Pro-Base **55.2** > V4.1 42.3 > V4-Flash 30.1
- 多模态：MMMU-Pro 56.5；CVBench 77.9；DocVQA 95.6；RefCOCO-avg 86.0

## 定价（官方 pricing，2026-09-10 04:00 UTC 生效）

| 模型 | 时段 | 1M input (cache hit) | 1M input (cache miss) | 1M output |
|---|---|---|---|---|
| deepseek-flash | OFF-PEAK | **$0.003** | $0.15 | $0.60 |
| deepseek-flash | PEAK | $0.006 | $0.30 | $1.20 |
| deepseek-v4-pro | OFF-PEAK | $0.022 | $0.66 | $1.98 |
| deepseek-v4-pro | PEAK | $0.044 | $1.32 | $3.96 |

- Peak：周一至周五 01:00–04:00 与 06:00–10:00 UTC；其余 all off-peak；off-peak = peak 的 50%
- 并发：flash 2500 / pro 500
- Bloomberg Intelligence 估算降价幅度最高 **32%**（相对 8 月涨价后）

## reasoning effort（官方 + vLLM recipe）
- **连续可控 1–100**（不是旧的 low/high/max 三档）
- vLLM 预设：low=25 / high=50 / xhigh=75 / max=100；官方 API 预设 low=50 / high=75 / max=100（VentureBeat 表述）
- 默认（两 key 都不设）：thinking ON，effort 50
- 25→100：DeepSWE 66.0→74.2，TB2.1 82.4→90.6，但 output token 约 **2.5×**
- 60–80 档可拿到大部分精度、token 不到一半；最后到 100 让轨迹长 1.6–1.8×，边际收益小

## API / 接入
- base_url：`https://api.deepseek.com`（OpenAI）/ `https://api.deepseek.com/anthropic`（Anthropic）
- model：`deepseek-flash`
- Claude Code：`ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic`，`ANTHROPIC_MODEL=deepseek-flash[1m]`，各 DEFAULT_*_MODEL 设为 `deepseek-flash[1m]`，subagent 与 haiku 用 `deepseek-flash`，`CLAUDE_CODE_EFFORT_LEVEL=max`
- OpenCode：`/connect` → deepseek → API key → 选 DeepSeek-V4.1-Flash（要求 OpenCode ≥ v1.14.24）
- OpenClaw：install.sh / install.ps1 → onboard → provider DeepSeek → model `deepseek-flash`
- 官方合作方：WorkBuddy（含 CodeBuddy）与 OpenCode 已完整支持
- Responses API、Anthropic API、JSON Output、Tool Calls、Chat Prefix Completion 均支持；FIM 仅 non-thinking

## 本地部署（vLLM recipe，verified on GB200 NVL4）
- 镜像：`vllm/vllm-openai:deepseekv41-flash-0909`（vLLM 0.30.0+，无 pip wheel）
- `vram_minimum_gb: 614`（1.2 headroom）→ 单 GB200 NVL4 tray（768GB）TP4，或 8×H200（1128GB）
- checkpoint ~511 GB 磁盘；routed+DSpark experts MXFP4 259.5GiB；Engram 188.8GiB
- 命令要点：`--tokenizer-mode deepseek_v41`、`--tool-call-parser deepseek_v41`、`--reasoning-parser deepseek_v41`、`--mm-encoder-tp-mode data`、`--tensor-parallel-size 4`
- 官方建议 2000 GPU + 存储集群的部署联系 DeepSeek
- 第三方 GGUF：`AMAImedia/DeepSeek-V4.1-Flash-FP8-GGUF`（HF）
- DSpark draft head：3 阶段（各 128 routed experts，激活 3）草拟 5 token 块

## 背景 / 争议
- VentureBeat：推理 effort 隐含成本变量；缓存命中经济对 agent 很关键
- 批评：552B 比 V4-Flash 284B 大 94%，"flash 不再小"；自托管门槛升高（decode 激活 16B）
- 技术报告承认：CSA2 稀疏选择误差与 SWA 近似重建可能在未测边界导致能力退化；训练中出现 reward hacking（agent 用新披露漏洞或删系统文件）
- 读取复杂图像能力仍落后最强闭源模型
- Reuters：DeepSeek 筹备上海科创板 IPO；融资估值或达 ¥5000 亿（~$750 亿）
- 竞品反应：MiniMax、Z.ai 港股跌超 8%，阿里跌超 2%
- 无 Jinja chat template；提供 `encoding/` Python 参考实现 + `deepseek-recipe` Rust toolkit

## 来源清单
1. https://api-docs.deepseek.com/updates
2. https://api-docs.deepseek.com/news/news260910/
3. https://api-docs.deepseek.com/quick_start/pricing/
4. https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash
5. https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash
6. https://api-docs.deepseek.com/guides/coding_agents/
7. https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5
8. https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut
9. https://www.reddit.com/r/LocalLLaMA/comments/1wcbid7/deepseek_v41_flash_is_out/

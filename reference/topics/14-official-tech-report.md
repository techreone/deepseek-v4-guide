---
topic: DeepSeek V4 官方技术报告与模型卡
slug: official-tech-report
category: research
updated: 2026-08-01
status: written
sources:
  - https://arxiv.org/abs/2606.19348
  - https://arxiv.org/html/2606.19348v1
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark
  - https://huggingface.co/blog/deepseekv4
  - https://huggingface.co/papers/2606.19348
  - https://huggingface.co/collections/deepseek-ai/deepseek-v4
  - https://api-docs.deepseek.com/news/news260424/
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/updates/
  - https://api-docs.deepseek.com/guides/thinking_mode/
  - https://api-docs.deepseek.com/guides/reasoning_model
  - https://api-docs.deepseek.com/api/create-chat-completion/
  - https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/
  - https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/blob/main/DeepSeek_V4.pdf
  - https://github.com/deepseek-ai/DeepGEMM/pull/304
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://openrouter.ai/deepseek/deepseek-v4-pro
  - https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash
  - https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4
  - https://arxiviq.substack.com/p/deepseek-v4-towards-highly-efficient
  - https://arxiv.org/abs/2512.24880
---

# DeepSeek V4 官方技术报告与模型卡

> 本文件为教程写作的一手素材库。所有事实均已核对出处；标记 🔹 的为可直接引用的原文数字/句子；「第三方转述」标注的内容请以官方为准并在写作时注明 as-of 日期。核对日期：2026-08-01。

## 核心事实（可直接入教程）

### 论文本体
- 🔹 技术报告标题：**"DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence"**，DeepSeek-AI 团队，arXiv 编号 **2606.19348**，v1 于 **2026-04-26** 提交（[arxiv.org/abs/2606.19348](https://arxiv.org/abs/2606.19348)，HTML 全文 [arxiv.org/html/2606.19348v1](https://arxiv.org/html/2606.19348v1)）。
- 作者署名 "DeepSeek-AI and 318 other authors"（arXiv 摘要页）。联系邮箱 research@deepseek.com。
- 官方 PDF 同时挂在 HF 仓库：`https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/blob/main/DeepSeek_V4.pdf`（api-docs 官方新闻页给出同一链接）。
- 🔹 论文定位：preview（预览）版本发布两个 MoE 模型 —— **DeepSeek-V4-Pro（1.6T 总参 / 49B 激活）** 与 **DeepSeek-V4-Flash（284B 总参 / 13B 激活）**，均支持 **1M token 上下文**（abstract，arXiv HTML 第 1 段）。
- 官方代码/权重入口：[HF DeepSeek-V4 collection](https://huggingface.co/collections/deepseek-ai/deepseek-v4)（7 个条目，截至 2026-08-01）；推理实现：`https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/tree/main/inference`；内核库 [DeepGEMM](https://github.com/deepseek-ai/DeepGEMM)（含 MegaMoE，PR #304）。

### 三大架构升级（论文引言 + 第 2 章）
1. 🔹 **Hybrid Attention = CSA + HCA**：Compressed Sparse Attention（压缩稀疏注意力）+ Heavily Compressed Attention（重度压缩注意力）交错排布，大幅提升长上下文效率。
2. 🔹 **mHC（Manifold-Constrained Hyper-Connections）**：将残差映射约束到双随机矩阵流形（Birkhoff polytope），谱范数 ≤ 1，改善跨层信号传播稳定性。
3. 🔹 **Muon 优化器**：替代 AdamW（用于大多数模块），收敛更快、训练更稳。

### 效率数字（教程核心卖点，务必引用）
- 🔹 1M context 下，**V4-Pro 仅需 V3.2 的 27% 单 token 推理 FLOPs 和 10% KV cache**（abstract / 论文 §1 / HF 模型卡 / 官方新闻页三处一致）。
- 🔹 **V4-Flash 在 1M context 下仅需 V3.2 的 10% 单 token FLOPs 和 7% KV cache**（论文 §1）。
- 🔹 以 BF16 GQA-8（head dim 128）为基线，**V4 系列 1M context 的 KV cache 约为其 2%**（论文 §2.3.4；HF 博客亦引用）。
- 🔹 效率来源拆解：KV 混合存储（RoPE 维 BF16 + 其余维 FP8，相比纯 BF16 省近一半）；lightning indexer 内 FP4 计算；比 V3.2 更小的 attention top-k；压缩注意力本身。
- FP4 说明：路由专家参数用 FP4（FP4 + FP8 混合，见模型卡）；FP4×FP8 GEMM 在当前硬件上峰值 FLOPs 与 FP8×FP8 相同，但理论上未来硬件可实现高约 1/3 的效率（论文 §1）。

### 训练数据与规模
- 🔹 预训练数据：**V4-Flash 训练 32T token，V4-Pro 训练 33T token**（论文 §1）；abstract 表述为 "more than 32T"。
- 🔹 数据策略：多语语料扩充以覆盖跨文化 long-tail 知识；**特别强调长文档语料**——科学论文、技术报告等学术价值文本（论文 §1 / §训练数据节，来自 arXiv HTML 摘要段）。
- 🔹 后训练采用**两阶段范式**：先为每个目标域（数学、代码、agent、指令遵循）独立培育领域专家（SFT + GRPO RL），再通过 **on-policy distillation（学生模型以 reverse KL loss 学习多教师）** 合并为统一模型（论文 §1；HF 模型卡 Intro 同述）。
- 注：arxiv 摘要中 "DeepSeek-V4-Pro-Max ... redefines the state-of-the-art for open models" 为官方自评表述。

### 官方文档站 api-docs.deepseek.com 可引用页面（2026-08-01 核实）
| 页面 | URL | 内容 |
|------|-----|------|
| V4 Preview 发布新闻 | /news/news260424/ | 2026-04-24 发布公告：模型规模、1M 标准、定价图、legacy 模型退役 |
| 变更日志 | /updates/ | V4-Flash-0731 官方发布条目（2026-07-31） |
| 模型与定价 | /quick_start/pricing/ | 官方定价表、并发限制、峰值/低谷定价预告 |
| 限流与隔离 | /quick_start/rate_limit | 并发限制细节（Flash 2500 / Pro 500） |
| Thinking Mode | /guides/thinking_mode/ | 思考模式、reasoning_effort、reasoning_content 规则 |
| 你的首次 API 调用 | /guides/reasoning_model | Python/Node/curl 示例（v4-pro 官方示例代码） |
| Create Chat Completion | /api/create-chat-completion/ | 参数参考：thinking、reasoning_effort、finish_reason |
| 集成 Claude Code | /quick_start/agent_integrations/claude_code/ | Anthropic 兼容端点的环境变量配置 |
| 集成 OpenCode | /quick_start/agent_integrations/opencode/ | OpenCode >= v1.14.24 推荐 |
| 集成 OpenClaw | /quick_start/agent_integrations/openclaw/（推测同目录） | 官方三 agent 集成指南 |

## 规格 / 数据

### 官方模型定价（api-docs.deepseek.com/quick_start/pricing/，2026-08-01 抓取）
| 项目 | deepseek-v4-flash | deepseek-v4-pro |
|------|-------------------|-----------------|
| Base URL（OpenAI 格式） | https://api.deepseek.com | https://api.deepseek.com |
| Base URL（Anthropic 格式） | https://api.deepseek.com/anthropic | 同左 |
| Model version（当前） | DeepSeek-V4-Flash-0731 | DeepSeek-V4-Pro |
| Thinking mode | 支持非思考/思考（默认思考） | 同左 |
| Context length | 1M | 1M |
| Max output | 384K | 384K |
| JSON Output | ✓ | ✓ |
| Tool Calls | ✓ | ✓ |
| Responses API | ✓ | ✗（官方注明 V4-Pro 支持将于 2026 年 8 月初加入） |
| Anthropic API | ✓ | ✓ |
| Chat Prefix Completion（Beta） | ✓ | ✓ |
| FIM Completion（Beta） | 仅非思考模式 | 仅非思考模式 |
| 1M 输入（cache hit） | **$0.0028** | **$0.003625** |
| 1M 输入（cache miss） | **$0.14** | **$0.435** |
| 1M 输出 | **$0.28** | **$0.87** |
| 并发限制 | 2500 | 500 |

- ⚠️ 官方预告：**即将采用峰值/低谷（peak/off-peak）定价**，高峰时段价格翻倍（2x），适用于所有计费项，生效日期待官方公告；**高峰时段 = 每日 9:00–12:00 与 14:00–18:00（北京时间 UTC+8）**（pricing 页脚注(2)）。
- 计费规则：费用 = token 数 × 单价，优先扣 granted balance（pricing 页 Deduction Rules）。

### 模型规格（HF 模型卡 2026-08-01 抓取）
| 模型 | 总参数 | 激活参数 | 上下文 | 精度 | License |
|------|--------|----------|--------|------|---------|
| DeepSeek-V4-Flash-Base | 284B | 13B | 1M | FP8 Mixed | MIT |
| DeepSeek-V4-Flash（instruct） | 284B | 13B | 1M | FP4 + FP8 Mixed* | MIT |
| DeepSeek-V4-Pro-Base | 1.6T | 49B | 1M | FP8 Mixed | MIT |
| DeepSeek-V4-Pro（instruct） | 1.6T | 49B | 1M | FP4 + FP8 Mixed* | MIT |
| DeepSeek-V4-Flash-0731 | 284B（HF 界面显示 304B，含 DSpark 投机解码模块） | ~13B | 1M | FP4+FP8 | MIT |

*FP4 + FP8 Mixed：MoE expert 参数用 FP4，其余大多数参数用 FP8。
- 推理推荐采样：V4-Pro 本地部署 `temperature = 1.0, top_p = 1.0`；Think Max 模式建议上下文窗口 ≥ 384K（V4-Pro 模型卡）。Flash-0731：`temperature = 1.0`，agent 场景 `top_p = 0.95`、其余 `top_p = 1.0`；high/max effort 建议最大输出 384K（Flash-0731 模型卡）。
- 权重下载热度（HF 统计）：V4-Pro 上个月下载量 1,636,857（模型卡页 2026-08-01 抓取）。量化生态：unsloth GGUF、NVIDIA NVFP4（Model Optimizer v0.44.0，配 SGLang/vLLM）等已出现。

### 官方基础模型基准（HF V4-Pro 模型卡 Base Model 表，2026-08-01 抓取）
| Benchmark (Metric) | V3.2-Base | V4-Flash-Base | V4-Pro-Base |
|------|------|------|------|
| #Activated / #Total | 37B / 671B | 13B / 284B | 49B / 1.6T |
| AGIEval (EM) 0-shot | 80.1 | 82.6 | 83.1 |
| MMLU (EM) 5-shot | 87.8 | 88.7 | 90.1 |
| MMLU-Redux (EM) | 87.5 | 89.4 | 90.8 |
| MMLU-Pro (EM) | 65.5 | 68.3 | 73.5 |
| MMMLU (EM) | 87.9 | 88.8 | 90.3 |
| C-Eval / CMMLU (EM) | 90.4 / 88.9 | 92.1 / 90.4 | 93.1 / 90.8 |
| MultiLoKo (EM) | 38.7 | 42.2 | 51.1 |
| **Simple-QA verified (EM) 25-shot** | **28.3** | **30.1** | **55.2** |
| SuperGPQA (EM) | 45.0 | 46.5 | 53.9 |
| **FACTS Parametric (EM)** | **27.1** | **33.9** | **62.6** |
| TriviaQA (EM) | 83.3 | 82.8 | 85.6 |
| BBH / DROP / HellaSwag / WinoGrande | 87.6 / 88.2 / 86.4 / 78.9 | 86.9 / 88.6 / 85.7 / 79.5 | 87.5 / 88.7 / 88.0 / 81.5 |
| HumanEval (Pass@1) | 62.8 | 69.5 | 76.8 |
| BigCodeBench (Pass@1) | 63.9 | 56.8 | 59.2 |
| GSM8K / MATH / MGSM | 91.1 / 60.5 / 81.3 | 90.8 / 57.4 / 85.7 | 92.6 / 64.5 / 84.4 |
| LongBench-V2 (EM) | 40.2 | 44.7 | 51.5 |

- 解读（官方数据）：V4-Pro-Base 在世界知识（Simple-QA 55.2 vs 28.3、FACTS 62.6 vs 27.1）与长上下文（LongBench-V2 51.5）上大幅领先 V3.2-Base；V4-Flash-Base 以 13B 激活在多数项超过 V3.2-Base 的 37B 激活。

### V4-Pro-Max vs 前沿闭源模型（HF V4-Pro 模型卡 Instruct 表，官方自报数字）
| Benchmark (Metric) | Opus-4.6 Max | GPT-5.4 xHigh | Gemini-3.1-Pro High | K2.6 Thinking | GLM-5.1 Thinking | **DS-V4-Pro Max** |
|------|------|------|------|------|------|------|
| MMLU-Pro (EM) | 89.1 | 87.5 | 91.0 | 87.1 | 86.0 | **87.5** |
| **SimpleQA-Verified (Pass@1)** | 46.2 | 45.3 | 75.6 | 36.9 | 38.1 | **57.9** |
| Chinese-SimpleQA (Pass@1) | 76.4 | 76.8 | 85.9 | 75.9 | 75.0 | **84.4** |
| GPQA Diamond (Pass@1) | 91.3 | 93.0 | 94.3 | 90.5 | 86.2 | **90.1** |
| HLE (Pass@1) | 40.0 | 39.8 | 44.4 | 36.4 | 34.7 | **37.7** |
| **LiveCodeBench (Pass@1)** | 88.8 | - | 91.7 | 89.6 | - | **93.5** |
| **Codeforces (Rating)** | - | 3168 | 3052 | - | - | **3206** |
| HMMT 2026 Feb (Pass@1) | 96.2 | 97.7 | 94.7 | 92.7 | 89.4 | **95.2** |
| IMOAnswerBench (Pass@1) | 75.3 | 91.4 | 81.0 | 86.0 | 83.8 | **89.8** |
| Apex / Apex Shortlist | 34.5 / 85.9 | 54.1 / 78.1 | 60.9 / 89.1 | 24.0 / 75.5 | 11.5 / 72.4 | **38.3 / 90.2** |
| **MRCR 1M (MMR)** | 92.9 | - | 76.3 | - | - | **83.5** |
| **CorpusQA 1M (ACC)** | 71.7 | - | 53.8 | - | - | **62.0** |
| Terminal Bench 2.0 (Acc) | 65.4 | 75.1 | 68.5 | 66.7 | 63.5 | **67.9** |
| **SWE Verified (Resolved)** | 80.8 | - | 80.6 | 80.2 | - | **80.6** |
| SWE Pro / SWE Multilingual | 57.3 / 77.5 | 57.7 / - | 54.2 / - | 58.6 / 76.7 | 58.4 / 73.3 | **55.4 / 76.2** |
| BrowseComp (Pass@1) | 83.7 | 82.7 | 85.9 | 83.2 | 79.3 | **83.4** |
| HLE w/ tools | 53.1 | 52.0 | 51.6 | 54.0 | 50.4 | **48.2** |
| GDPval-AA (Elo) | 1619 | 1674 | 1314 | 1482 | 1535 | **1554** |
| MCPAtlas Public (Pass@1) | 73.8 | 67.2 | 69.2 | 66.6 | 71.8 | **73.6** |
| Toolathlon (Pass@1) | 47.2 | 54.6 | 48.8 | 50.0 | 40.7 | **51.8** |

- 注意：以上为 DeepSeek 官方自报数字，非独立复测；写作时需注明 "per DeepSeek's model card, as of 2026-08-01"。

### 模式对比（HF V4-Pro 模型卡 "Comparison across Modes" 表，节选）
- V4-Pro Max：SWE Verified **80.6**、LiveCodeBench 93.5、Codeforces 3206、MMLU-Pro 87.5、SimpleQA-Verified 57.9、MRCR 1M 83.5。
- V4-Flash Max：SWE Verified 79.0、LiveCodeBench 91.6、Codeforces 3052、SimpleQA-Verified 34.1、MRCR 1M 78.7。
- V4-Pro Non-Think：SWE Verified 73.6、SimpleQA 45.0（思考模式显著提升知识/推理分数 —— 教程可写"max effort vs non-think 差距"）。
- 三个 reasoning mode 官方定义：**Non-think**（快、直觉式，日常任务）；**Think High**（显式 `<think>` 推理，复杂问题/规划）；**Think Max**（专用 system prompt + `<think>`，探索推理能力边界）。

### Flash-0731 官方 agent 基准（HF DeepSeek-V4-Flash-0731 模型卡，2026-08-01 抓取，官方自报）
| Benchmark | V4-Flash-0731 | Flash (Preview) | V4-Pro (Preview) | GLM-5.2 | Opus-4.8 |
|------|------|------|------|------|------|
| Terminal Bench 2.1 | **82.7** | 61.8 | 72.1 | 81.0 | 85.0 |
| NL2Repo | **54.2** | 39.4 | 38.5 | 48.9 | 69.7 |
| Cybergym | **76.7** | 38.7 | 52.7 | - | 83.1 |
| DeepSWE | **54.4** | 7.3 | 12.8 | 46.2 | 58.0 |
| Toolathlon-Verified | **70.3** | 49.7 | 55.9 | 59.9 | 76.2 |
| Agents' Last Exam | **25.2** | 15.8 | 16.5 | 23.8 | 25.7 |
| AutomationBench Public | **25.1** | 10.8 | 12.8 | 12.9 | 27.2 |
| DSBench-FullStack † | **68.7** | 37.0 | 41.8 | 61.8 | 71.6 |
| DSBench-Hard † | **59.6** | 25.8 | 31.1 | 54.5 | 71.7 |

- 脚注（官方）：公开 Code Agent 基准用 **DeepSeek Harness（minimal mode，即将发布）** 作为 agent 框架，max reasoning effort，temperature=1.0，top_p=0.95。
- † DSBench-FullStack / DSBench-Hard 为内部测试集，非公开可比数据。
- 官方声明：0731 **在所列基准上全面超过 V4-Pro (Preview)**（尽管激活参数远小于 Pro），并与最强专有模型大致相当。

## 关键差异 / 时间线
- **2026-04-24**：DeepSeek-V4 Preview 发布（api-docs news260424 + HF 博客同日发文）；当天开放 HF 权重（Pro 1.6T/Flash 284B，含 Base 版）与 API。
- **2026-04-26**：arXiv 技术报告 v1 上线（2606.19348）。
- **2026-05 起**：生态跟进 —— NVIDIA NVFP4 量化（05-28 前后）、unsloth GGUF、vLLM/SGLang recipe、OpenRouter 上架。
- **2026-07-24 15:59 UTC**：legacy 模型名 **deepseek-chat / deepseek-reasoner 正式退役**（官方新闻页 + updates 页；此前数月作为兼容名分别路由到 v4-flash 非思考/思考模式）。
- **2026-07-31**：**DeepSeek-V4-Flash-0731 官方发布（public beta）** —— 与 Preview 同架构同规模，仅 re-post-trained；API 端点模型名不变（deepseek-v4-flash），响应式升级；原生支持 **Responses API**，专门适配 **Codex**；宣布 V4-Pro 官方版"will follow soon"（官方 updates 页）。
- 高峰定价预告（官方）：2x 峰值，每日 9:00–12:00、14:00–18:00 北京时间，生效日期未定。
- V3.2 对照：V3.2 上下文 128K（第三方转述），V4 一举到 1M 且为所有官方服务默认（官方新闻页 "1M Standard"）。
- 架构 vs V3 差异（论文 §2）：保留 DeepSeekMoE + MTP；attention 从 MLA 体系换为 CSA/HCA 混合；残差连接换 mHC；初始若干层 dense FFN 换 Hash-routing MoE；专家 affinity 激活函数从 Sigmoid 换为 **Sqrt(Softplus(·))**；去掉 QK-Clip（Muon + RMSNorm 化 attention logits 替代）。
- HF 博客（2026-04-24，DeepSeek 官方账号发布）：「The benchmark numbers are competitive, but not SOTA. It doesn't matter. The real innovation is how DeepSeek v4 is designed for efficient large context length support, and hence as one of the best candidates for agentic tasks.」—— 教程可引用此定位：V4 的卖点是长上下文效率而非纯跑分。

## 教程素材（写作时直接引用）

### 可直接引用的句子 / 数据点
1. 🔹 "In the one-million-token context setting, DeepSeek-V4-Pro requires only 27% of single-token inference FLOPs and 10% of KV cache compared with DeepSeek-V3.2."（arXiv abstract）
2. 🔹 "DeepSeek-V4-Flash achieves only 10% of the single-token FLOPs and 7% of the KV cache size compared with DeepSeek-V3.2"（论文 §1）
3. 🔹 "the KV cache size of DeepSeek-V4 series can be dramatically reduced to approximately 2% of that baseline in the 1M-context setting"（论文 §2.3.4，基线 BF16 GQA8 head-128）
4. 🔹 官方发布语：「Welcome to the era of cost-effective 1M context length.」「1M context is now the default across all official DeepSeek services.」（api-docs news260424）
5. 🔹 官方价格（per 1M tokens，2026-08-01）：Flash 输入 cache-miss $0.14 / cache-hit $0.0028 / 输出 $0.28；Pro 输入 $0.435 / cache-hit $0.003625 / 输出 $0.87（api-docs pricing）
6. 🔹 OpenRouter（第三方聚合，2026-08-01 抓取）：V4 Flash 标价 $0.0896/M 输入、$0.1792/M 输出，context 1,048,576，max output 384,000 —— 注意低于官方价（教程写"OpenRouter 价格"时需注明来源）。
7. 🔹 Flash-0731 九项 agent 基准全面超 V4-Pro (Preview)（HF 模型卡，官方自报）：Terminal Bench 2.1 82.7 vs Pro-Preview 72.1；DeepSWE 54.4 vs 7.3（Preview Flash）/ 12.8（Pro-Preview）。
8. 🔹 V4-Pro-Max：SWE-bench Verified 80.6（与 Opus-4.6-Max 80.8、Gemini-3.1-Pro 80.6 同一分档）；LiveCodeBench 93.5；Codeforces 3206（HF 模型卡，官方自报）。
9. 🔹 V4-Pro 推理建议：`temperature = 1.0, top_p = 1.0`；Think Max 需上下文 ≥ 384K（HF 模型卡）。
10. 🔹 Flash-0731 本地推荐：`temperature = 1.0`、agent 场景 `top_p = 0.95`、否则 1.0；high/max effort 建议 max output 384K（HF 模型卡）。

### 官方 API 用法代码（可直接改写进教程）
- 官方 "Your First API Call"（api-docs/guides/reasoning_model）Python 示例骨架：
```python
from openai import OpenAI
client = OpenAI(api_key=os.environ.get('DEEPSEEK_API_KEY'), base_url="https://api.deepseek.com")
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "system", "content": "You are a helpful assistant"}, {"role": "user", "content": "Hello"}],
    stream=False,
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}},
)
```
- curl 等价体：`model=deepseek-v4-pro` + `"thinking": {"type": "enabled"}` + `"reasoning_effort": "high"`（官方示例）。官方明确 "Keep base_url, just update model to deepseek-v4-pro or deepseek-v4-flash"（news260424）。
- Thinking Mode 规则（官方 /guides/thinking_mode/）：
  - thinking 默认开启；默认 effort = high；复杂 agent 请求（Claude Code、OpenCode）effort 自动升到 max；
  - 兼容映射：low、medium → high；xhigh → max；
  - **含工具调用的轮次，reasoning_content 必须原样回传**，否则 API 返回 400；
  - 思考模式下 temperature / top_p / presence_penalty / frequency_penalty 不生效（第三方转述官方文档，写作时标注）。
- Claude Code 集成环境变量（官方 /quick_start/agent_integrations/claude_code/，教程可整段给出）：
```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=<your key>
export ANTHROPIC_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
export CLAUDE_CODE_EFFORT_LEVEL=max
```
  （官方注明 DeepSeek API 原生支持 Claude Code 的 Web Search 功能；Anthropic 兼容端点有已知限制：支持文本与工具调用，但不支持 image/document/web search/MCP content blocks —— 该限制来自第三方综合与官方 endpoints 文档，写作时注明。）
- OpenCode 集成（官方 /quick_start/agent_integrations/opencode/）：官方推荐 **OpenCode >= v1.14.24**；OpenCode 内 `/connect` → 选 DeepSeek → 输入 API key → 选 DeepSeek-V4-Pro（第三方转述官方指引）。

### 本地部署（模型卡官方命令，可改写进教程）
- Flash-0731 + vLLM（官方示例，单节点 4×GB300）：
```bash
vllm serve deepseek-ai/DeepSeek-V4-Flash-0731 \
  --trust-remote-code --kv-cache-dtype fp8 --block-size 256 \
  --data-parallel-size 4 --enable-expert-parallel \
  --moe-backend deep_gemm_mega_moe \
  --attention-config '{"use_fp4_indexer_cache": true}' \
  --speculative-config '{"method":"dspark","num_speculative_tokens":7,"draft_sample_method":"greedy"}'
```
- Flash-0731 + SGLang（官方示例）：`--speculative-algorithm DSPARK`（不设独立 draft model，target 与 draft 权重同 checkpoint）、`--moe-runner-backend flashinfer_mxfp4`、`--swa-full-tokens-ratio 0.1` 等。
- DSpark = 官方附带的**投机解码（speculative decoding）模块**；0731 与 DSpark 版本同结构；HF 显示 304B 参即因附带 DSpark（社区确认与 284B base 相同规模，Reddit r/LocalLLaMA 讨论）。
- 无 Jinja chat template：官方提供 `encoding/` 目录的 `encode_messages` / `parse_message_from_completion_text`（Python 示例见 Flash-0731 / V4-Pro 模型卡）。

## 来源清单（完整 URL）
1. https://arxiv.org/abs/2606.19348 — 技术报告摘要页（权威，一手）
2. https://arxiv.org/html/2606.19348v1 — 技术报告 HTML 全文（本文主要依据）
3. https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro — V4-Pro 官方模型卡（Base 表 + Pro-Max vs 前沿 + 模式对比 + 下载规格）
4. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731 — Flash-0731 官方模型卡（九项 agent 基准表 + DSpark/vLLM/SGLang 命令 + 推理建议）
5. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash — Flash Preview 模型卡
6. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark — DSpark 预览版模型卡
7. https://huggingface.co/blog/deepseekv4 — DeepSeek 官方 HF 博客（2026-04-24）：架构解读、DSec、agent 内部基准、开发者调研
8. https://huggingface.co/papers/2606.19348 — HF paper page（引用信息）
9. https://huggingface.co/collections/deepseek-ai/deepseek-v4 — V4 权重集合
10. https://api-docs.deepseek.com/news/news260424/ — V4 Preview 官方发布公告
11. https://api-docs.deepseek.com/quick_start/pricing/ — 官方定价表（含并发限制、peak/off-peak 预告）
12. https://api-docs.deepseek.com/updates/ — 官方变更日志（0731 发布条目、legacy 退役）
13. https://api-docs.deepseek.com/guides/thinking_mode/ — 官方 Thinking Mode 指南
14. https://api-docs.deepseek.com/guides/reasoning_model — 官方首次 API 调用指南（v4-pro 示例代码）
15. https://api-docs.deepseek.com/api/create-chat-completion/ — API 参考（thinking/reasoning_effort/finish_reason）
16. https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/ — Claude Code 官方集成
17. https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/ — OpenCode 官方集成
18. https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/blob/main/DeepSeek_V4.pdf — 官方论文 PDF
19. https://github.com/deepseek-ai/DeepGEMM/pull/304 — MegaMoE 内核开源（论文 §3.1 引用）
20. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter V4 Flash 页（第三方价格/规格）
21. https://openrouter.ai/deepseek/deepseek-v4-pro — OpenRouter V4 Pro 页
22. https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash — vLLM 官方 recipe（tokenizer-mode deepseek_v4、effort low/high/max、top_p 建议）
23. https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4 — NVIDIA NVFP4 量化版（第三方生态证据）
24. https://arxiviq.substack.com/p/deepseek-v4-towards-highly-efficient — 论文深度解读（补充：Anticipatory Routing、OPD 公式、DSec、trade-off 细节；第三方转述）
25. https://arxiv.org/abs/2512.24880 — mHC 原始论文（V4 引用）

## gaps（未核实 / 需后续确认）
- 论文 §3.2 之后的剩余章节（训练细节、完整评估表、消融）未能完整抓取（arXiv HTML 抓取在 50k 字符处截断）——需要长上下文基准表（MRCR 全曲线、长文档任务）原始数字时请直接读 PDF。
- 第三方价格冲突：costgoat.com / developer.puter.com 曾报 V4-Pro $1.74 输入 / $3.48 输出，与官方定价页 $0.435/$0.87 矛盾 —— 以官方页为准，第三方版本疑为旧数据或笔误，教程勿引用。
- "新用户注册送 5M 免费 token、无需信用卡" 仅见于第三方（techjacksolutions、costgoat），官方文档未见 —— 未核实，写作需谨慎或标注第三方来源。
- OpenCode 订阅（$5 首月等）与本文件无关，但官方仅提及 "/connect → 选 DeepSeek" 流程；OpenCode 版本要求 >= v1.14.24 为官方原文（api-docs opencode 页）。
- Flash-0731 的 DeepSWE 54.4 等官方自报 agent 分数依赖尚未公开的 DeepSeek Harness（minimal mode）；正式 harness 发布前这些分数不可独立复现 —— 教程应注明 "vendor-reported"。
- 高峰（peak-hour）2x 定价：官方已预告但未公布生效日期与确切百分比细则，写作时标注 "announced, not yet active（截至 2026-08-01）"。
- V4-Pro 官方版（非 preview）发布时间：官方仅称 "will follow soon"（2026-07-31 变更日志），具体日期未定。
- V4 论文是否与 R1 共用 RL 训练细节、R1 混合 RL 阶段是否完全弃用（ArXivIQ 转述 "abandons R1's mixed RL training stage"）—— 属第三方解读，需回原文确认后再用于深度内容。
- Anthropic 兼容端点不支持 image/document/web search/MCP content blocks 这一限制来自第三方综合 + 官方 endpoints 文档转述，未单独抓取 endpoints 页原文。
- V3.2 的上下文长度 128K 为第三方转述（intoai.pub），未在本次抓取的官方材料中直接核对。

---
topic: DeepSeek V4 Flash 基准测试
slug: flash-benchmark
category: research
updated: 2026-08-01
status: partial
sources:
  - https://api-docs.deepseek.com/updates/
  - https://api-docs.deepseek.com/news/news260424/
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash
  - https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash
  - https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash
  - https://artificialanalysis.ai/models/deepseek-v4-flash
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://openrouter.ai/deepseek/deepseek-v4-flash-0731
  - https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm
  - https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/
  - https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks
  - https://www.orcarouter.ai/blog/deepseek-v4-flash-official-release
  - https://www.morphllm.com/deepseek-v4
  - https://blog.kilo.ai/p/we-tested-deepseek-v4-pro-and-flash
  - https://www.uied.cn/113963.html
  - https://www.superclueai.com/
  - https://www.swfte.com/lmarena
  - https://x.com/arena/status/2047518354903359697
  - https://benchlm.ai/models/deepseek-v4-flash
  - https://benchlm.ai/models/deepseek-v4-flash-max
  - https://deepseekai.guide/news/deepseek-benchmarks-2026/
  - https://www.reddit.com/r/LocalLLaMA/comments/1vbkvau/deepseekv4flash0731_now_far_surpassing_the/
  - https://pi.dev/models/openrouter/deepseek-deepseek-v4-flash-0731
  - https://www.datalearner.com/ai-models/pretrained-models/deepseek-v4-flash
---

# DeepSeek V4 Flash 基准测试

## 核心事实（可直接入教程）

- **官方 0731 发布（2026-07-31，API public beta）的 agentic/coding 基准表**：Terminal-Bench 2.1 = 82.7、DeepSWE = 54.4、Toolathlon (verified) = 70.3、Cybergym = 76.7、NL2Repo = 54.2、Agent Last Exam = 25.2、Automation Bench (Public) = 25.1、DSBench-FullStack = 68.7、DSBench-Hard = 59.6 ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))
- **同一架构、仅重新 post-training**：DeepSeek-V4-Flash-0731 与 preview 完全相同的 284B total / 13B active MoE、1M context，仅重跑了后训练阶段；升级只作用于 API，V4-Pro API 与 APP/WEB 不变 ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)、[deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash))
- **全面超越自家 V4-Pro-Preview**：9 个已发布 agent 基准全部胜出；Terminal-Bench 2.1 上 Flash-0731 82.7 vs V4-Pro-Preview 72.1 vs Flash Preview 61.8 vs Claude Opus-4.8 85.0 ([techtimes.com](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm))；Agent Last Exam 25.2 vs Opus-4.8 25.7，仅差 0.5 分（同源）
- **DeepSWE 从 7.3 → 54.4，+645%**：同一模型靠 re-post-training 实现的提升，官方自述 ([techtimes.com](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)、[flowtivity.ai](https://flowtivity.ai/blog/deepseek-v4-flash-agent-benchmarks/))
- **测试设置（官方 Note 1）**：公开 Code Agent 基准用 **DeepSeek Harness minimal mode（尚未开源发布）**、**max effort**、**top_p=0.95、temperature=1.0**；DSBench-FullStack / DSBench-Hard 为内部测试集 ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)) —— 所有官方 agent 分数都是 vendor figures，Harness 未发布前第三方无法复测
- **独立评测（Artificial Analysis，2026-07-31）**：V4 Flash 0731 (Reasoning, Max Effort) **AA Intelligence Index = 50**，较 4 月的旧 V4 Flash（40）+10，比 V4 Pro（非 Max，44）高 6 分；距 GPT-5.6 Luna (max, 51) 与 GLM-5.2 (max, 51) 各差 1 分，距开源第一 Kimi K3 (max, 57) 差 7 分；GDPval-AA v2 Elo = 1559（前代 1189），为开源第二（仅次于 Kimi K3 1687，领先 GLM-5.2 1510）([artificialanalysis.ai](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash))
- **官方 4 月 preview 的完整基准表（HF model card）**：V4-Flash Max 档 SWE-bench Verified 79.0、LiveCodeBench 91.6、GPQA Diamond 88.1、MMLU-Pro 86.2、Codeforces 3052、HLE 34.8、SimpleQA-Verified 34.1、HMMT 2026 Feb 94.8、Toolathlon 47.8（见下方表格）([huggingface.co/deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash))
- **价格（DeepSeek 一/三方混合）**：官方 $0.14 / $0.28 per 1M input/output，cache hit $0.0028（~98% 折扣）；约为 V4-Pro 输出价 $0.87 的 1/3；OpenRouter 转售 $0.0896 / $0.1792 ([artificialanalysis.ai](https://artificialanalysis.ai/models/deepseek-v4-flash)、[marktechpost.com](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)、[openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash))

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| 模型标识（API slug） | `deepseek-v4-flash`（0731 官方版）／ `deepseek-v4-flash-0731`（OpenRouter） | [api-docs](https://api-docs.deepseek.com/updates/)、[openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash-0731) |
| 总参数 / 激活参数 | 284B total / 13B active（MoE） | [HF model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 上下文窗口 | 1M tokens（1,048,576）；最大输出 384,000 tokens | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash)、[HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 精度 | FP4 + FP8 Mixed（MoE expert 参数 FP4，其余 FP8） | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 输入模态 | 仅文本（Text input/output only） | [artificialanalysis.ai](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash) |
| 推理 effort 模式 | Non-think / Think High / Think Max 三档 | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 官方定价（input/output per 1M） | $0.14 / $0.28；cache hit $0.0028（98% 折扣） | [AA 模型页](https://artificialanalysis.ai/models/deepseek-v4-flash)、[marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/) |
| OpenRouter 定价 | $0.0896 / $0.1792 per 1M | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| 人民币定价（中国区报道） | Flash ¥1.25 / 百万 tokens；Pro ¥15 / 百万 tokens | [article.9466.com](https://article.9466.com/news/W47k9B4J) |
| 并发上限 | Flash 2,500 并发 vs Pro 500（5× headroom） | [digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks) |
| 速度（AA 实测） | 112.8 tok/s（vs Gemini 3.1 Flash-Lite 291.0）；119.9 tok/s（vs Gemini 2.5 Pro 143.1） | [AA 对比页](https://artificialanalysis.ai/models/comparisons/deepseek-v4-flash-vs-gemini-3-1-flash-lite-preview) |
| 速度（OrcaRouter 报道） | 首 token ~394 ms，吞吐 ~184 tok/s | [orcarouter.ai](https://www.orcarouter.ai/blog/deepseek-v4-flash-official-release) |
| 训练数据 | 两模型合计 >32T tokens，两阶段 post-training（专家 SFT+GRPO RL，on-policy distillation 合并） | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 许可 | MIT License（4 月 preview 权重） | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| 发布/版本 | Preview 2026-04-24；Official (0731) 2026-07-31 public beta；V4-Pro 官方版"will follow soon" | [api-docs](https://api-docs.deepseek.com/updates/)、[news260424](https://api-docs.deepseek.com/news/news260424/) |

### 官方 0731 agentic 基准（2026-07-31 changelog，vendor harness）

| 基准 | V4-Flash-0731 | 对比项 | 来源 |
|------|---------------|--------|------|
| Terminal-Bench 2.1 | **82.7** | V4-Pro-Preview 72.1 / Flash Preview 61.8 / Opus-4.8 85.0 | [changelog](https://api-docs.deepseek.com/updates/)、[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm) |
| DeepSWE | **54.4** | preview 7.3（+645%） | [changelog](https://api-docs.deepseek.com/updates/)、[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm) |
| Toolathlon (verified) | **70.3** | — | [changelog](https://api-docs.deepseek.com/updates/) |
| Cybergym | **76.7** | — | [changelog](https://api-docs.deepseek.com/updates/) |
| NL2Repo | **54.2** | — | [changelog](https://api-docs.deepseek.com/updates/) |
| Agent Last Exam | **25.2** | Opus-4.8 25.7 | [changelog](https://api-docs.deepseek.com/updates/)、[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm) |
| Automation Bench (Public) | **25.1** | — | [changelog](https://api-docs.deepseek.com/updates/) |
| DSBench-FullStack（内部） | **68.7** | preview 37.0 | [changelog](https://api-docs.deepseek.com/updates/)、[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm) |
| DSBench-Hard（内部） | **59.6** | — | [changelog](https://api-docs.deepseek.com/updates/) |

### HF model card 基准表（4 月 preview 版，按 effort 模式；Instruct 对比 across modes）

| 基准 (Metric) | Flash Non-Think | Flash High | Flash Max | Pro Max（参照） |
|---|---|---|---|---|
| MMLU-Pro (EM) | 83.0 | 86.4 | 86.2 | 87.5 |
| SimpleQA-Verified (Pass@1) | 23.1 | 28.9 | 34.1 | 57.9 |
| Chinese-SimpleQA (Pass@1) | 71.5 | 73.2 | 78.9 | 84.4 |
| GPQA Diamond (Pass@1) | 71.2 | 87.4 | 88.1 | 90.1 |
| HLE (Pass@1) | 8.1 | 29.4 | 34.8 | 37.7 |
| LiveCodeBench (Pass@1) | 55.2 | 88.4 | 91.6 | 93.5 |
| Codeforces (Rating) | - | 2816 | 3052 | 3206 |
| HMMT 2026 Feb (Pass@1) | 40.8 | 91.9 | 94.8 | 95.2 |
| IMOAnswerBench (Pass@1) | 41.9 | 85.1 | 88.4 | 89.8 |
| Apex (Pass@1) | 1.0 | 19.1 | 33.0 | 38.3 |
| Apex Shortlist (Pass@1) | 9.3 | 72.1 | 85.7 | 90.2 |
| MRCR 1M (MMR) | 37.5 | 76.9 | 78.7 | 83.5 |
| CorpusQA 1M (ACC) | 15.5 | 59.3 | 60.5 | 62.0 |
| Terminal-Bench 2.0 (Acc) | 49.1 | 56.6 | 56.9 | 67.9 |
| SWE-bench Verified (Resolved) | 73.7 | 78.6 | 79.0 | 80.6 |
| SWE-bench Pro (Resolved) | 49.1 | 52.3 | 52.6 | 55.4 |
| SWE Multilingual (Resolved) | 69.7 | 70.2 | 73.3 | 76.2 |
| BrowseComp (Pass@1) | - | 53.5 | 73.2 | 83.4 |
| HLE w/ tools (Pass@1) | - | 40.3 | 45.1 | 48.2 |
| MCPAtlas (Pass@1) | 64.0 | 67.4 | 69.0 | 73.6 |
| GDPval-AA (Elo) | - | - | 1395 | 1554 |
| Toolathlon (Pass@1) | 40.7 | 43.5 | 47.8 | 51.8 |

来源：[huggingface.co/deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)（Instruct "Comparison across Modes" 表；Pro 列仅供参照）

### Base 模型（Flash-Base）代表性分数（HF card）

AGIEval 82.6 / MMLU 88.7 / MMLU-Redux 89.4 / MMLU-Pro 68.3 / C-Eval 92.1 / CMMLU 90.4 / MultiLoKo 42.2 / Simple-QA verified 30.1 / SuperGPQA 46.5 / FACTS Parametric 33.9 / TriviaQA 82.8 / BBH 86.9 / DROP 88.6 / HellaSwag 85.7 / WinoGrande 79.5 / BigCodeBench 56.8 / HumanEval 69.5 / GSM8K 90.8 / MATH 57.4 / MGSM 85.7 / CMath 93.6 / LongBench-V2 44.7（[HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)）

### 独立第三方评测（Artificial Analysis，2026-07-31）

| 指标 | V4 Flash 0731 (Max) | 对比项 | 来源 |
|------|---------------------|--------|------|
| AA Intelligence Index | **50** | 旧 V4 Flash 40（+10）；V4 Pro（非 Max）44（+6）；GPT-5.6 Luna (max) 51；GLM-5.2 (max) 51；Kimi K3 (max) 57；Gemini 3.6 Flash 50；Muse Spark 1.1 (xhigh) 51 | [AA 文章](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash) |
| GDPval-AA v2 (Elo) | **1559** | 旧 V4 Flash 1189；开源第二（Kimi K3 1687、GLM-5.2 1510） | 同上 |
| Terminal-Bench 2.1（AA 自测） | **79%**（+17） | 官方自报 82.7 | 同上 |
| τ³-Bench Banking | 31%（+8） | — | 同上 |
| AA-Omniscience Index | **-16**（前代 -23，+7，源于幻觉率下降） | 幻觉率 84%（-11~12pt），准确率 37% 不变 | 同上 |
| 单项变化 | CritPt 17%（+9）、SciCode 50%（+5）、HLE 37%（+5）、AA-LCR 66%（+3）、GPQA Diamond 91%（+1） | — | 同上 |
| 推理输出 token 用量 | ~206M（前代 ~234M，-12%） | — | 同上 |
| Cost per Task | 官方一档 API 上比 GPT-5.6 Luna (max) 低约 60% | — | 同上 |
| V4 Pro (Max) AAII（4 月首发评测） | — | 52，开源推理 #2，仅次于 Kimi K2.6 (54)；V3.2 为 42 | [AA V4 首发文章](https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash) |

### 其他第三方排名（供教程引用，注意口径）

- **SuperCLUE 2026-05 中文综合测评**（第三方报道）：DeepSeek-V4-Pro 70.98 分国内第一，DeepSeek-V4-Flash 68.82 分第二；覆盖数学推理、科学推理、代码生成、智能体任务规划、指令遵循、幻觉控制六维（[uied.cn](https://www.uied.cn/113963.html)、[readhub.cn](https://readhub.cn/topic/8sganXn5vQ3)；SuperCLUE 官方页模型排序中 V4-Pro 居前、Flash(max) 位于 Kimi-K2.6-Thinking 之后 Qwen3.6-Max-Preview 之前：[superclueai.com](https://www.superclueai.com/)）
- **BenchLM BenchAlign**（7 月 31 日数据）：V4 Flash (Max) 综合 #110/216，51.53/100（Estimated），最强类别 Knowledge #42/55（60.1/100）；V4 Flash (High) 临时榜 #37/124（70/100）、verified 榜 #28/33；基础版未进公开总榜（[benchlm.ai/models/deepseek-v4-flash-max](https://benchlm.ai/models/deepseek-v4-flash-max)、[benchlm.ai/models/deepseek-v4-flash](https://benchlm.ai/models/deepseek-v4-flash)）
- **LMArena / Arena Text Arena（4 月 preview 期）**：DeepSeek V4 Flash (thinking) 为 #10 开源模型（总 #47）；V4 Pro (thinking) #2 开源（总 #14）（[arena.ai 官方 X](https://x.com/arena/status/2047518354903359697)）。LMArena Elo 分带参考表（swfte 整理，约值）：V4 Flash ≈1100（"Light tasks"档），V4 Pro ≈1450（[swfte.com](https://www.swfte.com/lmarena)）
- **Datalearner 汇总**：V4-Flash LiveCodeBench 91.60、MMLU Pro 86.40、GPQA Diamond 88.10、Codeforces 3052（[datalearner.com](https://www.datalearner.com/ai-models/pretrained-models/deepseek-v4-flash)）
- **Kilo.ai 独立编码工作流实测**（preview 期）：V4 Pro 77/100（Opus 4.7 91、Kimi K2.6 68）；V4 Flash 60/100 但 build 失败、输出缺失关键部分；Flash 每分成本约比 Kimi K2.6 便宜 30×、比 Opus 4.7 便宜 100×（[blog.kilo.ai](https://blog.kilo.ai/p/we-tested-deepseek-v4-pro-and-flash)）
- **社区汇总**：r/LocalLLaMA 流传"Flash 4.8× 更便宜，保持 Pro 约 83% 质量（22 基准）"；用户实测 0731 在 easy/小型修复任务上体验接近 GLM-5.2（[reddit](https://www.reddit.com/r/LocalLLaMA/comments/1vbkvau/deepseekv4flash0731_now_far_surpassing_the/)）

## 关键差异 / 时间线

- **2026-04-24**：DeepSeek-V4 Preview 发布（Pro 1.6T/49B、Flash 284B/13B），API 双通道（ChatCompletions + Anthropic 接口），`deepseek-chat`/`deepseek-reasoner` 在过渡期内指向 Flash 的 non-thinking/thinking 模式，2026-07-24 15:59 UTC 退役（[news260424](https://api-docs.deepseek.com/news/news260424/)、[changelog](https://api-docs.deepseek.com/updates/)）
- **2026-04-26**：官方技术报告发布（arXiv 2606.19348）；HF model card 给出上表 benchmark（[HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)）
- **2026-07-31**：**V4-Flash 官方版（0731）public beta** —— 仅重后训练、架构/参数量不变；9 个 agent 基准全面超 V4-Pro-Preview；原生支持 **Responses API** 与 **Codex 适配**；V4-Pro 官方版"将很快跟进"（[changelog](https://api-docs.deepseek.com/updates/)）
- **DeepSeek Harness minimal mode**：官方 agent 分数所用框架，"即将开源发布"，发布前无法第三方复测（[changelog](https://api-docs.deepseek.com/updates/)、[zhihu 讨论](https://www.zhihu.com/question/2066521165246489298)）
- **0731 权重状态**：截至 2026-07-31，Hugging Face 上仍只有 4 月 preview（MIT）权重，0731 checkpoint 未上传，开源状态未定（[digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks)）；AA 预计"未来数周"发布完整权重（[AA 文章](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash)）
- **峰值/非峰值动态定价**：已宣布但未生效——北京时间 9:00–12:00、14:00–18:00 为峰值、2× 费率；生效日期待定（[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)、[wan27.org](https://wan27.org/blog/deepseek-v4-flash-official-release)）
- **第三方服务商**：截至发布公告，仅 DeepSeek 一档 API 提供 0731；OpenRouter 已上线 `deepseek-v4-flash-0731` 路由（[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)、[openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash-0731)）
- **"世界知识仅次于 Gemini-3.1-Pro"的官方表述**：该说法出自 4 月 preview 新闻页、针对 **V4-Pro**（"Leads all current open models, trailing only Gemini-3.1-Pro"）；对 Flash 的官方定位是"小参数量在纯知识任务与最复杂 agent 工作流上略逊于 Pro"（[news260424](https://api-docs.deepseek.com/news/news260424/)、[HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)）

## 教程素材（写作时直接引用）

- 可引用句子/数据点：
  - "在同一模型上，只重跑后训练，DeepSWE 从 7.3 涨到 54.4（+645%）"（[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)）
  - "预算模型在全部 9 个已发布 agent 基准上超过自家旗舰 V4-Pro-Preview"（[api-docs](https://api-docs.deepseek.com/updates/)、[flowtivity.ai](https://flowtivity.ai/blog/deepseek-v4-flash-agent-benchmarks/)）
  - "DeepSeek 官方 agent 分数用自家 DeepSeek Harness（minimal mode，未开源），max effort、top_p=0.95、temperature=1.0"（[api-docs](https://api-docs.deepseek.com/updates/)）
  - "官方 0731 价格 $0.14/$0.28 per 1M、cache hit $0.0028，输出价约为 V4-Pro 的 1/3；Flash 并发 2500 vs Pro 500"（[marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)、[digitalapplied](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks)）
  - "AA Intelligence Index 50，距 GPT-5.6 Luna 与 GLM-5.2 各 1 分；GDPval-AA v2 Elo 1559 为开源第二"（[AA](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash)）
  - "Flash 官方推荐 agentic 采样参数：temperature=1.0、top_p=0.95；Think Max 模式建议至少 384K 上下文窗口；本地部署建议 temperature=1.0、top_p=1.0"（[marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)、[HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)）
  - "Think Max 需要约 210M output tokens 才能跑完 AA Intelligence Index（verbosity 偏高，比同价位推理模型中位 62M 高得多）"（[AA 模型页](https://artificialanalysis.ai/models/deepseek-v4-flash)）
- **给读者的实操警示（可写成 callout）**：
  - 官方 54.4 的 DeepSWE 与 82.7 的 Terminal-Bench 2.1 均为 vendor figures，harness 未发布；对照 yage.ai 对 V4-Pro 的独立 DeepSWE 复测（pass@1 仅 8%，GPT-5.5 70%、Opus 4.7 54%）判断可能的高估幅度（[morphllm.com](https://www.morphllm.com/deepseek-v4)、[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)）
  - AA 独立复测 Terminal-Bench 2.1 为 79%（官方 82.7）—— vendor vs 第三方存在 ~4 分差距（[AA](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash)）
  - V4-Flash 默认开 thinking 模式，thinking tokens 按输出价计费，agent 长链路实际成本会高于 $0.14 表面价（[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)）
  - 官方 4 月 model card 的 Terminal-Bench 2.0（Flash Max 56.9）与 0731 changelog 的 Terminal-Bench 2.1（82.7）不可直接对比：版本、harness、effort 均不同（[HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)、[api-docs](https://api-docs.deepseek.com/updates/)）
- **调用示例（API）**：
  - 官方：`base_url` 不变，`model: "deepseek-v4-flash"`；原生支持 OpenAI Responses API 与 Anthropic 接口，Codex 适配配置见官方文档（[changelog](https://api-docs.deepseek.com/updates/)、[news260424](https://api-docs.deepseek.com/news/news260424/)）
  - OpenRouter 配置 JSON（pi.dev 收录）：`{ "id": "deepseek/deepseek-v4-flash-0731", "contextWindow": 1048576, "maxTokens": 384000, "cost": { "input": 0.14, "output": 0.28, "cacheRead": 0.0028, "cacheWrite": 0 }, "thinkingLevelMap": { "high": "high", "xhigh": "xhigh" } }`（[pi.dev](https://pi.dev/models/openrouter/deepseek-deepseek-v4-flash-0731)）

## 来源清单（完整 URL，全部列出）

1. https://api-docs.deepseek.com/updates/ — 官方 changelog：2026-07-31 V4-Flash 0731 完整 agent 基准表 + 测试设置 Note + Responses API/Codex 说明
2. https://api-docs.deepseek.com/news/news260424/ — 官方 V4 Preview 发布页：规格、定位、1M context、API 方式、legacy 名称退役
3. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash — 官方 model card：跨 effort 模式完整基准表、base 模型表、架构细节、本地部署参数
4. https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash — AA 独立评测（AAII 50、GDPval-AA 1559、AA 自测 Terminal-Bench 2.1 79%、Omniscience -16）
5. https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash — AA 对 4 月 V4 Pro/Flash 首发评测（V4 Pro Max AAII 52、Kimi K2.6 54）
6. https://artificialanalysis.ai/models/deepseek-v4-flash — AA 模型页：价格、tok/s、输出 token 用量
7. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter 模型页：$0.0896/$0.1792、context、384K output
8. https://openrouter.ai/deepseek/deepseek-v4-flash-0731 — OpenRouter 0731 模型页
9. https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm — TechTimes：9 基准对比、645% DeepSWE、峰值定价、并发/成本计算
10. https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/ — MarkTechPost：价格明细、推荐采样参数、harness 说明
11. https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks — digitalapplied：2500 vs 500 并发、0731 权重未上线 HF
12. https://www.orcarouter.ai/blog/deepseek-v4-flash-official-release — OrcaRouter：394ms 首 token、184 tok/s、0% markup 转售
13. https://www.morphllm.com/deepseek-v4 — MorphLLM：SWE-bench 对比、yage.ai DeepSWE 审计、价格/成本、verifier 质量分析
14. https://blog.kilo.ai/p/we-tested-deepseek-v4-pro-and-flash — Kilo 独立 FlowGraph 工作流实测：V4 Pro 77、Flash 60（build 失败）、每分成本
15. https://www.uied.cn/113963.html — SuperCLUE 中文报道：Pro 70.98 第一、Flash 68.82 第二
16. https://www.superclueai.com/ — SuperCLUE 官方：2026-05 测评方法（六维、新题）与模型排序
17. https://www.swfte.com/lmarena — LMArena Elo 分带参考（V4 Flash ~1100、V4 Pro ~1450）
18. https://x.com/arena/status/2047518354903359697 — arena.ai（原 LMArena）官方 X：Text/Code Arena 4 月排名（Flash #10 开源 / #47 总）
19. https://benchlm.ai/models/deepseek-v4-flash — BenchLM Flash 页面（知识类 #55/55、34.4/100）
20. https://benchlm.ai/models/deepseek-v4-flash-max — BenchLM Flash (Max) 页面（综合 #110/216、51.53/100）
21. https://deepseekai.guide/news/deepseek-benchmarks-2026/ — DeepSeek 2026 基准汇总（SWE 79.0 vs 80.6、LiveCodeBench 91.6 vs 93.5、知识短板）
22. https://www.reddit.com/r/LocalLLaMA/comments/1vbkvau/deepseekv4flash0731_now_far_surpassing_the/ — r/LocalLLaMA 讨论：0731 社区实测、83% Pro 质量 / 4.8× 便宜
23. https://pi.dev/models/openrouter/deepseek-deepseek-v4-flash-0731 — Pi.dev 收录的 OpenRouter 模型配置 JSON
24. https://www.datalearner.com/ai-models/pretrained-models/deepseek-v4-flash — Datalearner：LiveCodeBench 91.6、MMLU Pro 86.4、GPQA 88.1
25. https://www.zhihu.com/question/2066521165246489298 — 知乎讨论：AA 50 分、Harness 即将开源、对比 GLM-5.2/Opus 4.8

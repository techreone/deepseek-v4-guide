---
topic: DeepSeek V4 正式版 vs 降价后 GPT-5.6 Luna 对比
slug: v4-vs-gpt56-luna
category: research
updated: 2026-08-01
status: written
sources:
  - https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/
  - https://openai.com/index/gpt-5-6/
  - https://developers.openai.com/api/docs/models/gpt-5.6-luna
  - https://openai.com/business/pricing/
  - https://artificialanalysis.ai/models/gpt-5-6-luna
  - https://artificialanalysis.ai/models/deepseek-v4-flash
  - https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash
  - https://artificialanalysis.ai/models/comparisons/gpt-5-6-luna-vs-deepseek-v4-flash
  - https://artificialanalysis.ai/models/comparisons/gpt-5-6-luna-xhigh-vs-deepseek-v4-pro
  - https://artificialanalysis.ai/providers/deepseek
  - https://artificialanalysis.ai/models/deepseek-v4-flash/providers
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/updates/
  - https://opencode.ai/docs/go/
  - https://opencode.ai/go
  - https://openrouter.ai/openai/gpt-5.6-luna
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://benchlm.ai/compare/deepseek-v4-flash-vs-gpt-5-6-luna
  - https://benchlm.ai/compare/deepseek-v4-pro-max-vs-gpt-5-6-luna
  - https://the-decoder.com/new-deepseek-flash-model-matches-openais-gpt-5-6-luna-at-roughly-60-percent-lower-cost/
  - https://venturebeat.com/technology/ai-price-wars-openai-cuts-gpt-5-6-luna-prices-by-80-as-model-competition-shifts-toward-cost
  - https://www.axios.com/2026/07/30/openai-cuts-prices-gpt-terra-luna5
  - https://www.cnbc.com/2026/07/30/open-ai-price-cut-gpt.html
  - https://finance.yahoo.com/technology/ai/articles/openai-just-cut-gpt-5-013753910.html
  - https://www.infoworld.com/article/4203865/openai-drops-gpt-5-6-luna-and-terra-api-prices-by-up-to-80.html
  - https://www.businessinsider.com/openai-price-cuts-gpt-terra-luna-2026-7
  - https://www.reddit.com/r/DeepSeek/comments/1v9gf9d/deepseek_v4_flash_beat_gpt56_luna_medium_in/
  - https://www.reddit.com/r/codex/comments/1vazoph/openai_cuts_gpt56_terra_and_luna_prices/
  - https://www.reddit.com/r/codex/comments/1vb5ia6/gpt_56_luna_pricing_has_been_updated_on_deepswe/
  - https://www.reddit.com/r/OpenAI/comments/1v08mp8/mixed_feelings_on_gpt_56_series/
  - https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/
  - https://arcprize.org/results/openai-gpt-5-6-luna
  - https://simonw.substack.com/p/the-new-gpt-56-family-luna-terra
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731
  - https://deepseek.ai/deepseek-v4-flash-review
  - https://llm-stats.com/models/compare/deepseek-v4-pro-max-vs-gpt-5.6-luna
---

# DeepSeek V4 正式版 vs 降价后 GPT-5.6 Luna 对比

## 核心事实（可直接入教程）

- **OpenAI 于 2026-07-30 宣布 GPT-5.6 Luna 降价 80%**（Terra −20%），这是发布仅 3 周后的罕见大幅降价，官方归因于推理与基础设施效率提升（GPT-5.6 Sol 自写内核等）。降价后 Luna 为 **$0.20 输入 / $1.20 输出 per 1M tokens**（原价 $1/$6）；Sol 价格不变（$5/$30）。([openai.com](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)、[axios.com](https://www.axios.com/2026/07/30/openai-cuts-prices-gpt-terra-luna5))
- **降价次日（2026-07-31）DeepSeek 发布 V4-Flash 正式版（0731）**：官方 API 进入 public beta，架构/参数不变（284B total / 13B active、1M context），仅重新 post-training；价格不变 **$0.14 输入 / $0.28 输出**，缓存命中仅 **$0.0028（≈98% 折扣）**。官方原文同时声明「DeepSeek-V4-Pro official release will follow soon」（Pro 正式版未发布）。([api-docs.deepseek.com](https://api-docs.deepseek.com/updates/))
- **独立评测（Artificial Analysis, AA）核心结论**：V4 Flash 0731（Reasoning Max）AA Intelligence Index = **50**，比旧 Flash（40）+10、比 V4 Pro（44）+6，仅比 GPT-5.6 Luna（max, 51）**低 1 分**；且「即使 OpenAI 已对 Luna 降价 80%，V4 Flash 0731 在 DeepSeek 官方 API 上的 Cost per Task 仍比 Luna (max) 低约 **60%**」。([artificialanalysis.ai 文章](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash))
- **GPT-5.6 Luna 定位（官方 API 文档）**：为「成本敏感、高吞吐」设计，约对应此前 GPT-5 家族的 **nano 档**；1.05M context、128K max output、知识截止 2026-02-16；**输入 >272K tokens 时整请求按 2x 输入 / 1.5x 输出计费**。([developers.openai.com](https://developers.openai.com/api/docs/models/gpt-5.6-luna))
- **OpenCode Go 模型清单确认 GPT 5.6 Luna**（17 个模型中唯一 OpenAI 模型），落地页标注 **「GPT 5.6 Luna (2x usage)」限时 2 倍额度促销**；Go 订阅内 Luna 定价 ≤272K 输入为 $0.20/$1.20、>272K 为 $0.40/$1.80，月使用额度仅 **$15**（DeepSeek V4 Flash 为 $60）。([opencode.ai/go](https://opencode.ai/go)、[opencode.ai/docs/go](https://opencode.ai/docs/go/))
- **社区速记等量关系（r/DeepSeek）**：「GPT-5.4 Mini XHIGH ≈ DeepSeek V4 Flash Max；**GPT-5.6 Luna Medium ≈ DeepSeek V4 Flash**；Sonnet 5 High (无思考) ≈ DeepSeek V4 Pro」；同一帖称「若用 Luna Max 则碾压任何 DeepSeek 模型」。([reddit](https://www.reddit.com/r/DeepSeek/comments/1v9gf9d/deepseek_v4_flash_beat_gpt56_luna_medium_in/))
- **价格战背景**：VentureBeat/Axios 均指出 OpenAI 降价是应对中国开源低价模型的竞争（DeepSeek、Kimi、GLM 等）；Luna 降价后总价 $1.40/M 低于 Gemini 3.5 Flash-Lite（$2.80 合计）、远低于 Gemini 3.6 Flash（$9）。([venturebeat.com](https://venturebeat.com/technology/ai-price-wars-openai-cuts-gpt-5-6-luna-prices-by-80-as-model-competition-shifts-toward-cost))

## 规格 / 数据

### 价格对比（2026-08-01 核对，per 1M tokens）

| 项目 | DeepSeek V4 Flash 0731 | DeepSeek V4 Pro | GPT-5.6 Luna（降价后） | 来源 |
|------|------------------------|-----------------|------------------------|------|
| 输入（cache miss） | $0.14 | $0.435 | $0.20（≤272K）/ $0.40（>272K） | [DeepSeek 定价](https://api-docs.deepseek.com/quick_start/pricing/)、[OpenAI 公告](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)、[OpenAI Luna 文档](https://developers.openai.com/api/docs/models/gpt-5.6-luna) |
| 输出 | $0.28 | $0.87 | $1.20（≤272K）/ $1.80（>272K） | 同上 |
| 缓存命中 | $0.0028（98% 折） | $0.003625（≈99.2% 折） | $0.02（90% 折） | 同上、[AA](https://artificialanalysis.ai/models/gpt-5-6-luna) |
| 缓存写入 | 无（不区分） | 无 | $0.25（=1.25x 未命中输入） | [OpenAI 公告](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)、[opencode.ai/docs/go](https://opencode.ai/docs/go/) |
| AA 混合价（7:2:1 命中/输入/输出） | **$0.06** | **$0.18** | **$0.17** | [AA 对比页](https://artificialanalysis.ai/models/comparisons/gpt-5-6-luna-vs-deepseek-v4-flash)、[AA DeepSeek 供应商页](https://artificialanalysis.ai/providers/deepseek) |
| AA Cost per Intelligence Index Task | 比 Luna (max) 低约 60% | — | — | [AA 文章](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash) |
| 第三方折扣价 | OpenRouter $0.0896/$0.1792（36% off） | OpenRouter $0.435/$0.87 | OpenRouter **$0.10/$0.60（限时 50% off）** | [openrouter.ai Flash](https://openrouter.ai/deepseek/deepseek-v4-flash)、[openrouter.ai Luna](https://openrouter.ai/openai/gpt-5.6-luna) |

> 注：OpenAI 官方对 Luna 的缓存读取为「标准输入 90% 折扣」（$0.02），缓存写入为未命中输入的 1.25 倍（$0.25）；DeepSeek 无缓存写入费用、缓存命中折扣更高（Flash 98%、Pro ≈99.2%）。

### 规格对比

| 项目 | DeepSeek V4 Flash 0731 | GPT-5.6 Luna | 来源 |
|------|------------------------|--------------|------|
| 模型规模 | 284B total / 13B active（MoE） | 未公开（OpenAI 未披露；约 nano 档） | [AA](https://artificialanalysis.ai/models/deepseek-v4-flash)、[OpenAI 文档](https://developers.openai.com/api/docs/models/gpt-5.6-luna) |
| 上下文 | 1M（官方 1,048,576） | 1M（官方文档 1,050,000） | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)、[OpenAI 文档](https://developers.openai.com/api/docs/models/gpt-5.6-luna) |
| 最大输出 | 384K | 128K | [openrouter Flash](https://openrouter.ai/deepseek/deepseek-v4-flash)、[simonw](https://simonw.substack.com/p/the-new-gpt-56-family-luna-terra) |
| 输入模态 | 仅文本 | 文本 + 图像 | [AA 对比页](https://artificialanalysis.ai/models/comparisons/gpt-5-6-luna-vs-deepseek-v4-flash) |
| 知识截止 | 未披露 | 2026-02-16 | [llm-stats](https://llm-stats.com/models/compare/deepseek-v4-pro-max-vs-gpt-5.6-luna)、[OpenAI 文档](https://developers.openai.com/api/docs/models/gpt-5.6-luna) |
| 许可证 / 权重 | MIT 开源（HF 已有权重） | 闭源专有 | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)、[llm-stats](https://llm-stats.com/models/compare/deepseek-v4-pro-max-vs-gpt-5.6-luna) |
| 推理模式 | thinking / 3 种 effort | reasoning：low/medium/high/xhigh/max（+ultra 属 Sol） | [DeepSeek 文档](https://api-docs.deepseek.com/guides/thinking_mode/)、[OpenAI 公告](https://openai.com/index/gpt-5-6/) |
| 输出速度（AA） | DeepSeek 官方 API ≈113.6–115.1 t/s | 172.1 t/s（max） | [AA 供应商页](https://artificialanalysis.ai/models/deepseek-v4-flash/providers)、[AA Luna 页](https://artificialanalysis.ai/models/gpt-5-6-luna) |
| 首 token 延迟（AA） | 非思考版 TTFT 1.24s | 思考版 TTFT ≈121.89s（max） | [AA 供应商页](https://artificialanalysis.ai/providers/deepseek)、[AA Luna 页](https://artificialanalysis.ai/models/gpt-5-6-luna) |
| AA 输出冗长度（II 评测总输出 token） | ~206M | ~130M（更简洁） | [AA 文章](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash)、[AA Luna 页](https://artificialanalysis.ai/models/gpt-5-6-luna) |
| 发布/正式版日期 | 2026-04-24 preview；**2026-07-31 正式版 0731** | 2026-07-09 GA（GPT-5.6 家族） | [DeepSeek 更新日志](https://api-docs.deepseek.com/updates/)、[AA](https://artificialanalysis.ai/models/gpt-5-6-luna) |

### 独立基准（Artificial Analysis Intelligence Index v4.1，2026-07-31/08-01 数据）

| 模型 | AA 智能指数 | 备注 | 来源 |
|------|------------|------|------|
| GPT-5.6 Luna (max) | **51** | 同价格带中位 17 | [AA Luna 页](https://artificialanalysis.ai/models/gpt-5-6-luna) |
| GPT-5.6 Luna (xhigh) | 49 | — | [AA 对比](https://artificialanalysis.ai/models/comparisons/gpt-5-6-luna-xhigh-vs-deepseek-v4-pro) |
| GPT-5.6 Luna (high) | 46 | — | [AA 对比](https://artificialanalysis.ai/models/comparisons/gpt-5-6-luna-high-vs-deepseek-v4-flash-0420-high) |
| DeepSeek V4 Flash 0731 (Reasoning Max) | **50** | 旧版 Flash=40；比 V4 Pro(44) 高 6 | [AA 文章](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash) |
| DeepSeek V4 Pro (Reasoning Max) | 44 | 已含在 AA 追踪 | [AA 供应商页](https://artificialanalysis.ai/providers/deepseek) |
| 参照：GLM-5.2 (max) / Kimi K3 (max) | 51 / 57 | 开源前沿参照 | [AA 文章](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash) |

AA 细节（Flash 0731 逐项）：GDPval-AA v2 = **1559 Elo**（旧版 1189；开源第二，仅次于 Kimi K3 1687、高于 GLM-5.2 1510）；Terminal-Bench 2.1 = **79%**（+17）；τ³-Bench Banking = 31%（+8）；SciCode 50%、HLE 37%、AA-LCR 66%、GPQA Diamond 91%；**AA-Omniscience = −16（+7，纯由幻觉率下降驱动），幻觉率 84%（−12）**，与 GPT-5.6 Terra (max) 85%、Mistral Medium 3.5 82% 同级。([AA 文章](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash))

### GPT-5.6 Luna 官方基准（OpenAI 自报，2026-07-09 发布页；同表列 GPT-5.5/Claude 作参照）

| 基准 | Luna | GPT-5.5 | Claude Fable 5 | Claude Opus 4.8 | 来源 |
|------|------|---------|----------------|-----------------|------|
| Agents' Last Exam | 50.3% | 46.9% | 40.5% | 45.2% | [openai.com](https://openai.com/index/gpt-5-6/) |
| AA Coding Agent Index v1.1 | 74.6 | 76.4 | 77.2 | 72.5 | 同上 |
| SWE-Bench Pro | 62.7% | 59.4% | 80% | 69.2% | 同上 |
| DeepSWE v1.1 | 67.2% | 67% | 69.7% | 59% | 同上 |
| Terminal-Bench 2.1 | 84.7% | 85.6% | 83.1% | 78.9% | 同上 |
| OSWorld 2.0 | 45.6% | 47.5% | — | 54.8% | 同上 |
| BrowseComp | 83.3% | 84.4% | 84.3% | 84.3% | 同上 |
| GPQA Diamond | 92.3% | 93.6% | 92.6% | 92% | 同上 |
| ARC-AGI-3 | 0.18% | 0.43% | — | 1.5%（high） | [arcprize](https://arcprize.org/results/openai-gpt-5-6-luna)、[openai.com](https://openai.com/index/gpt-5-6/) |
| OpenAI MRCR v2 8-needle 256K–512K | **41.3%** | 81.5% | — | — | [openai.com](https://openai.com/index/gpt-5-6/)（Luna 长上下文明显短板） |
| MMMU Pro（无工具） | 78.4% | 81.2% | — | — | 同上 |

> 官方口径：Luna 在 AA Coding Agent Index 上「outperforms Opus 4.8」，用时约 1/3、输出 token 约一半、预估成本约 1/4；Luna「nearly matches GPT‑5.5's peak performance at less than half the estimated cost」。([openai.com](https://openai.com/index/gpt-5-6/))

### DeepSeek V4 Flash 0731 官方基准（DeepSeek 自报，2026-07-31 changelog；Harness 自测，标注需独立复现）

| 基准 | Flash 0731 | Flash Preview | V4-Pro-Preview | 来源 |
|------|-----------|---------------|----------------|------|
| Terminal-Bench 2.1 | 82.7 | 61.8 | 72.1 | [api-docs.deepseek.com](https://api-docs.deepseek.com/updates/) |
| DeepSWE | 54.4 | 7.3（+645%） | — | 同上 |
| Cybergym | 76.7 | — | — | 同上 |
| NL2Repo | 54.2 | — | — | 同上 |
| Toolathlon (verified) | 70.3 | — | — | 同上 |
| Agent Last Exam | 25.2 | — | — | 同上 |
| Automation Bench (Public) | 25.1 | — | — | 同上 |
| DSBench-FullStack / DSBench-Hard | 68.7 / 59.6 | — | — | 同上 |

## 关键差异 / 时间线

- **2026-04-24**：DeepSeek V4 Preview 发布（Pro 1.6T/49B + Flash 284B/13B，1M context），上市价 Flash $0.14/$0.28、Pro $1.74/$3.48。([news260424](https://api-docs.deepseek.com/news/news260424/))
- **2026-05-22/23**：V4-Pro 75% 促销永久化 → $0.435/$0.87（「价格战」）。([topic-03](03-flash-pricing.md) 汇总)
- **2026-07-09**：OpenAI 发布 GPT-5.6 家族 GA（Sol/Terra/Luna），Luna 上市价 $1/$6；同日成为 Microsoft 365 Copilot 首选模型。([openai.com](https://openai.com/index/gpt-5-6/))
- **2026-07-24**：DeepSeek 退役 `deepseek-chat`/`deepseek-reasoner`，路由到 V4 Flash 思考/非思考模式。([api-docs.deepseek.com](https://api-docs.deepseek.com/updates/))
- **2026-07-30**：OpenAI 宣布 Luna −80%（→$0.20/$1.20）、Terra −20%（→$2/$12）、Sol 新增 Fast mode（2x 价格 / 最高 2.5x 速度）。([openai.com](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)) 多家媒体指出是对中国开源低价模型的回应（Axios：「Cheaper Chinese open-weight models have increased pressure」）。([axios](https://www.axios.com/2026/07/30/openai-cuts-prices-gpt-terra-luna5))
- **2026-07-31**：DeepSeek 发布 V4-Flash 正式版（0731）public beta，9 项 agent 基准全超自家 V4-Pro-Preview，价格不变；官方声明 V4-Pro 正式版「follow soon」（与 OpenAI 降价仅隔一天，社区称「时机与 Luna 降价巧合」）。([api-docs.deepseek.com](https://api-docs.deepseek.com/updates/)、[r/opencode](https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/))

**「DeepSeek V4 正式版」指什么（重要）**：截至 2026-08-01，官方层面唯一已「正式发布」的 V4 是 **V4-Flash（构建号 0731，public beta，权重 MIT 已上 HF）**；V4-Pro 官方仍为 preview，正式版未发布（官方 changelog 原文「The official release of DeepSeek-V4-Pro will follow soon」）。第三方曾有「V4 GA 已于 7 月中旬」的说法（tech-insider.org、agentbreaking.com 等），但与官方 changelog 冲突，且来源质量低，**不可作为事实**。V4-Pro 灰度 GA 的媒体/社区传闻详见 [09-v4-pro.md](09-v4-pro.md)。

## 教程素材（写作时直接引用）

**A. 一图流结论（AA 口径，最客观）**：「V4 Flash 0731 智能指数 50，仅比 Luna (max) 51 低 1 分，但 DeepSeek 官方 API 的 Cost per Task 低约 60%」——即使把 OpenAI 已降的 80% 算进去。([the-decoder](https://the-decoder.com/new-deepseek-flash-model-matches-openais-gpt-5-6-luna-at-roughly-60-percent-lower-cost/)、[officechai](https://officechai.com/ai/deepseek-v4-flash-0731-scores-50-on-artificial-analysis-intelligence-index-creates-big-spike-on-pareto-frontier/))

**B. 分场景推荐（基于证据 + 社区经验，写作时可组织为「谁更有优势」）**：
1. **纯价格 / 高吞吐批处理**（分类、摘要、路由、RAG 查询、轻量实时助手）→ **DeepSeek V4 Flash**。每 token 与每任务成本均为最低（$0.14/$0.28 + 98% 缓存折扣）；VentureBeat 也点明 Luna 定位正在此类「cost per request 是硬约束」的任务。([venturebeat](https://venturebeat.com/technology/ai-price-wars-openai-cuts-gpt-5-6-luna-prices-by-80-as-model-competition-shifts-toward-cost))
2. **订阅制 / 编码 agent 高用量**（OpenCode Go）→ Flash 量级优势巨大：Luna 月额度 $15 ≈ 10,250 请求/月，Flash 月额度 $60 ≈ **158,150 请求/月**（约 15 倍）。([opencode.ai/docs/go](https://opencode.ai/docs/go/))
3. **需要「少而精」的关键产出**（复杂单步代码、需要监督的落地、幻觉敏感）→ **GPT-5.6 Luna**。Luna 官方 Coding Agent Index 74.6 > Opus 4.8 72.5；社区称 Luna「plan + 快速实施」好、`I'm switching all my background agents from GLM/DeepSeek to Luna`（r/codex 高赞）；但「对重要工作别完全信任，需 Sol 或 DeepSeek V4 Pro 复查」。([r/codex](https://www.reddit.com/r/codex/comments/1vb5ia6/gpt_56_luna_pricing_has_been_updated_on_deepswe/)、[r/codex](https://www.reddit.com/r/codex/comments/1vazoph/openai_cuts_gpt56_terra_and_luna_prices/))
4. **真正复杂的生产级工程** → 两者都不是首选：Luna 官方长上下文 MRCR 256K–512K 仅 41.3%（明显弱于 GPT-5.5 81.5%）；DeepSeek 侧则建议上 V4 Pro 或等正式版。社区速记：`Forget Terra, use Luna to save limits, Sol for intelligence`；`use Sol/DeepSeek v4 Pro to check Luna's work`。([openai.com](https://openai.com/index/gpt-5-6/)、[r/codex](https://www.reddit.com/r/codex/comments/1vazoph/openai_cuts_gpt56_terra_and_luna_prices/))

**C. 可引用金句 / 数据点**：
- OpenAI 官方：「Luna delivers performance comparable to models that were frontier-class a year ago at roughly 6 cents on the dollar per task, and at nearly nine times the speed.」「On professional work, as measured by Agents' Last Exam, Luna outperforms Fable 5 at an estimated cost per task nearly 99% lower.」([openai.com](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/))
- OpenAI 官方：「Luna outperforms Opus 4.8 [on AA Coding Agent Index]; each does so in roughly one-third of the time, with about half as many output tokens, and at approximately one-quarter the estimated cost.」([openai.com](https://openai.com/index/gpt-5-6/))
- 客户背书（OpenAI 公告内）：Blitzy CTO「Luna handles 2.2× more context with 8.5× fewer output tokens — at 87% lower cost than GPT‑5.4 mini」；Dust 联创「Luna is 40% faster and 40% cheaper than our previous default」；Replit「intelligence too cheap to meter」；Ramp SWE-Bench 作者「Luna is now our default model for background agent automations」。([openai.com](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/))
- AA 供应商口径：DeepSeek 官方 API 上 V4 Flash (max) 输出速度 ≈113.6–115.1 t/s、V4 Pro (max) ≈64.4 t/s、Luna (max) ≈172.1 t/s；Luna 思考版 TTFT 达 ~122s（长思考拖慢首 token）。([AA providers](https://artificialanalysis.ai/models/deepseek-v4-flash/providers)、[AA 对比](https://artificialanalysis.ai/models/comparisons/gpt-5-6-luna-xhigh-vs-deepseek-v4-pro)、[AA Luna](https://artificialanalysis.ai/models/gpt-5-6-luna))
- 用户体感（Reddit）：DeepSeek 用户普遍称赞价格/速度/「scoped worker」角色，但多次点出「hallucinates much more than GPT/Gemini/Claude」「非常 verbose（更新后 token 用量上升 4–5x）」「需要 `Enable models hosted in China` 手动开启」；Luna 用户称赞成本、编排、子 agent，抱怨「slow（超长思考）」「开始 overthinking」「指令跟随不如预期（部分技能失效）」。([r/DeepSeek 1v9gf9d](https://www.reddit.com/r/DeepSeek/comments/1v9gf9d/deepseek_v4_flash_beat_gpt56_luna_medium_in/)、[r/hermesagent](https://www.reddit.com/r/hermesagent/comments/1uvk24n/thoughts_after_using_gpt_56_luna_for_48_hours/)、[r/OpenAI](https://www.reddit.com/r/OpenAI/comments/1v08mp8/mixed_feelings_on_gpt_56_series/)、[r/opencode](https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/))
- BenchLM 对比（第三方便利化网站，2026-07-31 更新）：Luna 公开分估计 66.56 vs Flash 0731 58.02（90% 区间重叠，非定论）；但按标准费率，Flash 在 chat（$0.00028 vs $0.0008）、repo review（$0.00784 vs $0.0136）、cache-heavy agent loop（$0.00616 vs $0.02）等预设工作负载均更便宜。([benchlm](https://benchlm.ai/compare/deepseek-v4-flash-vs-gpt-5-6-luna))

**D. 配置代码（教程可直接复用）**：
- DeepSeek（OpenAI 兼容，base_url 不变，只改 model 名）：`model=deepseek-v4-flash`（自动使用 0731 最新版）→ [官方 quickstart](https://api-docs.deepseek.com/quick_start/pricing/)；Codex 适配配置见 [codex 文档](https://api-docs.deepseek.com/quick_start/agent_integrations/codex)。
- OpenAI Luna（OpenAI 官方 API / Responses API）：`model=gpt-5.6-luna`（Poyo 示例：`curl https://api.poyo.ai/v1/responses -H "Authorization: Bearer $KEY" -d '{ "model": "gpt-5-6-luna", "input": "...", "reasoning": {"effort": "medium"} }'`）→ [poyo.ai 教程](https://poyo.ai/hub/gpt-5-6-benchmarks-sol-terra-luna)、[OpenAI 文档](https://developers.openai.com/api/docs/models/gpt-5.6-luna)。
- OpenCode Go 模型 ID：`opencode-go/gpt-5.6-luna`、`opencode-go/deepseek-v4-flash`；Luna 走 `/v1/responses` 端点、DeepSeek 走 `/v1/chat/completions`。([opencode.ai/docs/go](https://opencode.ai/docs/go/))

## 来源清单（完整 URL）

1. https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/ — OpenAI 官方降价公告（2026-07-30，Luna −80% 等，全文已读）
2. https://openai.com/index/gpt-5-6/ — GPT-5.6 家族 GA 发布页（2026-07-09，含 Luna 全量官方基准表，全文已读）
3. https://developers.openai.com/api/docs/models/gpt-5.6-luna — OpenAI Luna 模型文档（1.05M context、128K 输出、截止 2026-02-16、>272K 计价）
4. https://openai.com/business/pricing/ — OpenAI 商用定价页（Business/Enterprise 含 Luna，API 价格见公告）
5. https://artificialanalysis.ai/models/gpt-5-6-luna — AA Luna (max) 页（51 分、172.1 t/s、TTFT 121.89s、混合价 $0.17，全文已读）
6. https://artificialanalysis.ai/models/deepseek-v4-flash — AA V4 Flash 0731 (max) 页（50 分、$0.14/$0.28、1M context）
7. https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash — AA Flash 0731 独立评测文章（2026-07-31，全文已读，核心数据源）
8. https://artificialanalysis.ai/models/comparisons/gpt-5-6-luna-vs-deepseek-v4-flash — AA 逐项对比页（智能/价格/速度/上下文/多模态/开源，全文已读）
9. https://artificialanalysis.ai/models/comparisons/gpt-5-6-luna-xhigh-vs-deepseek-v4-pro — AA Luna xhigh vs V4 Pro 对比（49 vs 44、183.7 vs 64.4 t/s、TTFT 40.24s vs 1.60s）
10. https://artificialanalysis.ai/providers/deepseek — AA DeepSeek 供应商页（V4 Flash max 113.6 t/s、TTFT 1.24s、混合价 $0.06–$0.18）
11. https://artificialanalysis.ai/models/deepseek-v4-flash/providers — AA Flash 供应商基准（DeepSeek 官方 115.1 t/s；DeepInfra/GMI $0.09 输入）
12. https://api-docs.deepseek.com/quick_start/pricing/ — DeepSeek 官方定价（Flash $0.14/$0.28/$0.0028；Pro $0.435/$0.87/$0.003625）
13. https://api-docs.deepseek.com/updates/ — DeepSeek 官方 changelog（0731 正式版、9 项 agent 基准、Pro「follow soon」）
14. https://opencode.ai/docs/go/ — OpenCode Go 文档（17 模型、Luna 计价/额度/请求数表，全文已读）
15. https://opencode.ai/go — OpenCode Go 落地页（$5 首月/$10 每月、「GPT 5.6 Luna (2x usage)」）
16. https://openrouter.ai/openai/gpt-5.6-luna — OpenRouter Luna 页（限时 50% off $0.10/$0.60、1M context、2026-07-09 发布）
17. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter Flash 页（$0.0896/$0.1792、384K max output）
18. https://benchlm.ai/compare/deepseek-v4-flash-vs-gpt-5-6-luna — BenchLM Flash vs Luna 成本/分数对比（2026-07-31）
19. https://benchlm.ai/compare/deepseek-v4-pro-max-vs-gpt-5-6-luna — BenchLM V4 Pro Max vs Luna 对比
20. https://the-decoder.com/new-deepseek-flash-model-matches-openais-gpt-5-6-luna-at-roughly-60-percent-lower-cost/ — the-decoder 报道（全文已读）
21. https://venturebeat.com/technology/ai-price-wars-openai-cuts-gpt-5-6-luna-prices-by-80-as-model-competition-shifts-toward-cost — VentureBeat 价格战分析
22. https://www.axios.com/2026/07/30/openai-cuts-prices-gpt-terra-luna5 — Axios 报道（3 周即降价、中国模型压力）
23. https://www.cnbc.com/2026/07/30/open-ai-price-cut-gpt.html — CNBC 报道
24. https://finance.yahoo.com/technology/ai/articles/openai-just-cut-gpt-5-013753910.html — Yahoo Finance 分析（Luna 输入价低于 DeepSeek 但输出更贵；Fable 5 $10/$50 等）
25. https://www.infoworld.com/article/4203865/openai-drops-gpt-5-6-luna-and-terra-api-prices-by-up-to-80.html — InfoWorld（原价 $1/$6 与 $2.50/$15 确认；Codex/ChatGPT Work 扣额度更少）
26. https://www.businessinsider.com/openai-price-cuts-gpt-terra-luna-2026-7 — Business Insider（Altman 推文引述）
27. https://www.reddit.com/r/DeepSeek/comments/1v9gf9d/deepseek_v4_flash_beat_gpt56_luna_medium_in/ — r/DeepSeek「Flash beat Luna Medium in agentic tasks」+ 等量关系
28. https://www.reddit.com/r/codex/comments/1vazoph/openai_cuts_gpt56_terra_and_luna_prices/ — r/codex 降价讨论（「背景 agent 从 GLM/DeepSeek 转 Luna」等）
29. https://www.reddit.com/r/codex/comments/1vb5ia6/gpt_56_luna_pricing_has_been_updated_on_deepswe/ — r/codex Luna 实测（计划快、需监督、重要工作不信任）
30. https://www.reddit.com/r/OpenAI/comments/1v08mp8/mixed_feelings_on_gpt_56_series/ — r/OpenAI 系列体感（Luna 性价比评价）
31. https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/ — r/opencode 0731 讨论（158k 请求/月、China-hosted 需 opt-in、token 用量上升）
32. https://arcprize.org/results/openai-gpt-5-6-luna — ARC-AGI-3 结果（Luna 0%/0.18%）
33. https://simonw.substack.com/p/the-new-gpt-56-family-luna-terra — Simon Willison 评测（截止 2026-02-16、1M context、128K 输出、effort 成本区间）
34. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731 — DeepSeek V4 Flash 0731 官方权重（MIT）
35. https://deepseek.ai/deepseek-v4-flash-review — deepseek.ai 独立评测（「partly benchmark maxed」、Code Arena 排名、中文社区争议）
36. https://llm-stats.com/models/compare/deepseek-v4-pro-max-vs-gpt-5.6-luna — 规格对比（Luna 截止 2026-02-16、MIT vs 专有）

## gaps（未核实 / 需后续确认）

- **V4 Pro 正式版确切发布日期**：截至 2026-08-01 官方仅称「follow soon」，未给日期；网上「7 月 20 日 GA」为低可信第三方说法，与官方 changelog 冲突。教程写「DeepSeek V4 正式版」时应以 V4-Flash 0731 为主角，Pro 标注「preview / 即将正式发布」。
- **DeepSeek V4 全系知识截止日期**：官方未披露（llm-stats 亦标记 not specified），教程对比「谁更懂最新知识」时缺 V4 侧硬数据。
- **Flash 0731 推理版首 token 延迟**：AA 只给了非思考版 TTFT 1.24s；思考版（max）TTFT 未单独发布，教程对比延迟需注明口径差异。
- **Flash 0731 权重发布时间**：AA（07-31）称「预计数周内发布完整权重」，而 HF 已有官方仓库 `DeepSeek-V4-Flash-0731`（与 topic-01 记录一致）；两说并存，引用时注明（推测 AA 写稿时权重尚未上传或指「更完整」权重）。
- **「谁更有优势」的官方互比**：OpenAI 官方基准表未直接对比 DeepSeek V4；DeepSeek 官方基准表只对标 Gemini/GPT-5.4/Claude。唯一的直接同图对比来自 AA（50 vs 51）与 BenchLM（区间重叠），结论需注明第三方口径。
- **OpenRouter Luna 50% off 与 OpenCode Go Luna 2x 促销的到期时间**：均为「限时」，具体截止日期未公布，教程需提示读者以页面为准。
- **Luna 上下文与 docsbot 的 400K 说法冲突**：AA、OpenRouter、OpenAI 文档、simonw 均指 1M（1.05M），docsbot 的 400K 应视为过时/错误，未采信。
- **现实体感样本量**：Reddit 个体评测（本文件引用 6-7 帖）非严格对照实验；幻觉率差异（DeepSeek 用户普遍反映更高）有 AA 数据支撑（84% vs 需查 Luna 幻觉率），但 Luna 侧 AA-Omniscience 未抓取到，建议后续补查 AA Omniscience 对比页。
- **Luna 在超长上下文（>500K）的独立测试**：官方 MRCR 显示 41.3% 偏弱，但 1M 下的第三方复测数据未找到。

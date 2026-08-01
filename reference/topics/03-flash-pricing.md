---
topic: DeepSeek V4 Flash 定价与成本
slug: flash-pricing
category: research
updated: 2026-08-01
status: written
sources:
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/news/news260424
  - https://deepseek.ai/pricing
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://openrouter.ai/deepseek/deepseek-v4-pro
  - https://artificialanalysis.ai/models/deepseek-v4-flash
  - https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-flash
  - https://pricepertoken.com/endpoints/deepseek/free
  - https://felloai.com/deepseek-pricing/
  - https://tokenmix.ai/blog/deepseek-api-free-credits
  - https://apidog.com/blog/how-to-use-deepseek-v4-api-for-free/
  - https://github.com/deepseek-ai/awesome-deepseek-integration/issues/642
  - https://benchlm.ai/deepseek/api-pricing
  - https://codersera.com/blog/deepseek-v4-pro-permanent-price-cut-may-2026/
  - https://enterprisedna.co/resources/news/deepseek-v4-pro-permanent-price-cut-enterprise-ai-2026/
  - https://apidog.com/blog/deepseek-v4-pro-permanent-price-cut/
  - https://winbuzzer.com/2026/07/03/deepseek-v4-may-add-peak-hour-pricing-to-its-api-xcxwbn/
  - https://www.reddit.com/r/DeepSeek/comments/1uiq1lk/v4_peak_pricing_is_coming_midjuly_heres_how_to/
  - https://36kr.com/p/3826964226691972
  - https://www.morphllm.com/deepseek-api
  - https://www.morphllm.com/llm-api
  - https://www.cloudzero.com/blog/deepseek-pricing/
  - https://www.verdent.ai/guides/deepseek-v4-pricing-api-migration-2026
  - https://www.engadget.com/2180062/deepseek-permanently-reduces-the-price-of-its-flagship-v4-model-by-75-percent/
  - https://costgoat.com/pricing/deepseek-api
  - https://webscraft.org/blog/deepseek-v4-flash-u-2026-scho-tse-skilki-koshtuye-i-yak-zapustiti-bez-gpu?lang=en
  - https://techsy.io/en/blog/llm-api-pricing-comparison
  - https://flowtivity.ai/blog/deepseek-v4-vs-gpt-5-5-vs-claude-opus-vs-glm-cost-benchmarks/
  - https://news.ycombinator.com/item?id=48237663
  - https://chat-deep.ai/pricing/
  - https://lushbinary.com/blog/deepseek-v4-pro-vs-flash-benchmarks-pricing-comparison/
---

# DeepSeek V4 Flash 定价与成本

> 核对日期：2026-07-25 ~ 07-29（第三方均以官方定价页为准复核）；本文 2026-08-01 定稿。
> 官方定价页（最权威）：https://api-docs.deepseek.com/quick_start/pricing/
> ⚠️ 官方注明："Product prices may vary and DeepSeek reserves the right to adjust them."（价格可能随时调整，以官方页为准）([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/))

## 核心事实（可直接入教程）

- **官方单价（per 1M tokens, USD）**：`deepseek-v4-flash` = 输入 $0.14（缓存未命中 cache miss）/ $0.0028（缓存命中 cache hit）/ 输出 $0.28。([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/)，第三方多源复核 2026-07-25/29：[deepseek.ai](https://deepseek.ai/pricing)、[chat-deep.ai](https://chat-deep.ai/pricing/)、[benchlm.ai](https://benchlm.ai/deepseek/api-pricing))
- **任务简报中"约 $0.15/$0.28"应更正**：官方输入价是 **$0.14**（缓存未命中）。输出 $0.28 正确。
- **Flash ≈ Pro 的 1/3（验证通过）**：V4-Pro 官方 $0.435（输入 miss）/ $0.003625（hit）/ $0.87（输出）。输入 $0.14/$0.435 ≈ 1/3.1；输出 $0.28/$0.87 ≈ 1/3.1。([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/)、[morphllm.com](https://www.morphllm.com/deepseek-api) "deepseek-v4-pro costs roughly 3.1x the input and 3.1x the output of flash")
- **简报中"V4 Pro 约 $0.47/$1.10"不准确**：官方为 $0.435（输入 miss）/ $0.87（输出）。([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/))
- **缓存命中折扣 ≈ 98%**：Flash 命中 $0.0028 vs 未命中 $0.14（省 98%）；Pro 命中 $0.003625 vs $0.435（省 ~99.2%）。命中/未命中仅为**输入**侧区分，输出无缓存价。([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/)、[felloai.com](https://felloai.com/deepseek-pricing/))
- **思考/非思考模式同价**：官方价格表每个模型只有一行价格（不区分 thinking/non-thinking），思考档（high/xhigh 或 max）继承同一 token 价格。([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/)、[benchlm.ai](https://benchlm.ai/deepseek/api-pricing) "reasoning-effort variants (High/Max) inherit their family's token pricing") 但注意：思考模式会额外产生 reasoning tokens，按**输出价**计费（$0.28/1M），所以开启思考后单次调用更贵（reasoning tokens 计入 output）。([deepseek.ai](https://deepseek.ai/pricing) "in thinking mode, reasoning tokens are billed as output")
- **1M 上下文不加价**：全 V4 系列原生 1M context 为标配，无额外费用。([felloai.com](https://felloai.com/deepseek-pricing/)、[api-docs.deepseek.com](https://api-docs.deepseek.com/news/news260424) "1M context is now the default across all official DeepSeek services")
- **V4-Pro 曾 75% 促销，2026-05-31 起永久化**：上市价 $1.74（miss）/ $0.0145（hit）/ $3.48（输出）→ 永久价 $0.435/$0.003625/$0.87（−75%）。([codersera.com](https://codersera.com/blog/deepseek-v4-pro-permanent-price-cut-may-2026/)、[enterprisedna.co](https://enterprisedna.co/resources/news/deepseek-v4-pro-permanent-price-cut-enterprise-ai-2026/)、[engadget.com](https://www.engadget.com/2180062/deepseek-permanently-reduces-the-price-of-its-flagship-v4-model-by-75-percent/))
- **缓存命中价于 2026-04-26 降至原价 1/10**（Flash 命中 $0.028→$0.0028）。([apidog.com](https://apidog.com/blog/deepseek-v4-pro-permanent-price-cut/)、[enterprisedna.co](https://enterprisedna.co/resources/news/deepseek-v4-pro-permanent-price-cut-enterprise-ai-2026/)、[webscraft.org](https://webscraft.org/blog/deepseek-v4-flash-u-2026-scho-tse-skilki-koshtuye-i-yak-zapustiti-bez-gpu?lang=en)）
- **高峰/低谷定价（已宣布、未生效）**：官方定价页脚注（2）称"即将采用"peak/off-peak 政策，**高峰期价格为常规价 2x**，适用于所有计费项；高峰时段 = 每日 9:00–12:00 与 14:00–18:00（北京时间 UTC+8），生效日期待官方公告。截至 2026-07-25~29 官方仍是单一平峰价。([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/)、[deepseek.ai](https://deepseek.ai/pricing)、[winbuzzer.com](https://winbuzzer.com/2026/07/03/deepseek-v4-may-add-peak-hour-pricing-to-its-api-xcxwbn/)、[reddit r/DeepSeek](https://www.reddit.com/r/DeepSeek/comments/1uiq1lk/v4_peak_pricing_is_coming_midjuly_heres_how_to/))
- **旧版本 off-peak 折扣已结束**：V3 高峰期外 16:30–00:30 UTC 5 折、R1 7.5 折的机制仅适用于 V3/R1，不适用于 V4。([deepseek.ai](https://deepseek.ai/pricing))
- **新用户免费额度**：多家第三方报告"每个新账号一次性 5M 免费 tokens，无需信用卡"。([pricepertoken.com](https://pricepertoken.com/endpoints/deepseek/free)、[felloai.com](https://felloai.com/deepseek-pricing/)、[costgoat.com](https://costgoat.com/pricing/deepseek-api)) ⚠️ 见 gaps：有真实用户反馈后台找不到该额度（GitHub issue），且官方定价页未提及，需以 platform.deepseek.com 实际为准。
- **最低充值 ≈ $2**：仅 apidog 一家报告官方 API 最低充值 $2（约 ¥15）。([apidog.com](https://apidog.com/blog/how-to-use-deepseek-v4-api-for-free/)) ⚠️ 单来源，见 gaps。
- **与竞品对比（2026-07-25 核对，per 1M）**：GPT-5.5 $5/$30、GPT-5.4 $2.50/$15、Claude Opus 4.8 $5/$25、Gemini 3.1 Pro $2/$12、GLM-5.2 $1.40/$4.40。Flash $0.14/$0.28 是表格地板价。([deepseek.ai](https://deepseek.ai/pricing)、[morphllm.com](https://www.morphllm.com/llm-api)) Flash 输出比 GPT-5.5 便宜约 **107 倍**、比 Claude Sonnet 4.6 便宜约 **54 倍**。([cloudzero.com](https://www.cloudzero.com/blog/deepseek-pricing/))
- **旧模型名已退役**：`deepseek-chat`（曾路由 Flash 非思考）与 `deepseek-reasoner`（曾路由 Flash 思考）已于 **2026-07-24 15:59 UTC** 永久退役，调用返回错误。([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/)、[deepseek.ai](https://deepseek.ai/pricing)、[chat-deep.ai](https://chat-deep.ai/pricing/))
- **第三方渠道更便宜**（非官方价）：OpenRouter 上 Flash $0.0896/$0.1792（官方价 6.4 折，即 36% off）；DeepInfra 最低 $0.09/$0.18（16 家提供商价格区间 $0.09–$0.18）；Requesty $0.10/$0.20。([openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash)、[pricepertoken.com](https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-flash)、[requesty.ai](https://www.requesty.ai/models/deepinfra/deepseek-ai-deepseek-v4-flash))

## 规格 / 数据

| 项目 | V4-Flash | V4-Pro | 来源 |
|------|----------|--------|------|
| 总参数 | 284B | 1.6T | [官方公告](https://api-docs.deepseek.com/news/news260424) |
| 激活参数（per token） | 13B | 49B | [官方公告](https://api-docs.deepseek.com/news/news260424) |
| 上下文长度 | 1M（1,048,576 tokens） | 1M | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| 最大输出 | 384K tokens | 384K | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| 许可证 / 权重 | MIT，开源（HuggingFace: deepseek-ai/DeepSeek-V4-Flash） | MIT，开源 | [lushbinary.com](https://lushbinary.com/blog/deepseek-v4-pro-vs-flash-benchmarks-pricing-comparison/)、[codersera.com](https://codersera.com/blog/deepseek-v4-complete-guide-2026/) |
| 输入（缓存命中） | $0.0028 / 1M | $0.003625 / 1M | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| 输入（缓存未命中） | $0.14 / 1M | $0.435 / 1M | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| 输出 | $0.28 / 1M | $0.87 / 1M | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| 并发限制 | 2500 | 500 | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| Base URL（OpenAI 格式） | https://api.deepseek.com | 同 | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| Base URL（Anthropic 格式） | https://api.deepseek.com/anthropic | 同 | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| 思考模式 | 支持（默认开启，可切非思考） | 支持 | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| 推理 effort | high / xhigh（xhigh 映射到 max） | high / xhigh | [OpenRouter](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| Responses API | ✓（唯一支持） | ✗（2026-08 初加） | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| Anthropic API / JSON Output / Tool Calls | ✓ | ✓ | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/) |
| 最新模型版本 | DeepSeek-V4-Flash-0731（2026-07-31） | DeepSeek-V4-Pro | [官方定价页](https://api-docs.deepseek.com/quick_start/pricing/)、[artificialanalysis.ai](https://artificialanalysis.ai/models/deepseek-v4-flash) |
| 发布/上市日期 | 2026-04-24（Preview） | 2026-04-24（Preview） | [OpenRouter](https://openrouter.ai/deepseek/deepseek-v4-flash)、[官方公告](https://api-docs.deepseek.com/news/news260424) |
| 多模态 | 仅文本（无图像输入） | 仅文本 | [artificialanalysis.ai](https://artificialanalysis.ai/models/deepseek-v4-flash) |

参考数据点（供教程对比用）：
- 1M tokens ≈ 75 万英文单词（约 1 token = ¾ 个英文单词）。([deepseek.ai](https://deepseek.ai/pricing))
- 自托管硬件需求（第三方估计）：Flash 约 140–158GB VRAM（2× H100 或 4× RTX 4090）；Pro 约 862GB–2.4TB VRAM（8–16× H100 集群）。([techjacksolutions.com](https://techjacksolutions.com/ai-tools/deepseek/deepseek-pricing/))
- OpenRouter 上 Flash 推理速度（非思考档）：约 112 tokens/s，TTFT 0.93s（DeepInfra 数据）。([pricepertoken.com](https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-flash))
- AA Intelligence Index：Flash (Reasoning, Max) 50 分（同类开源中位数 25），评估耗 210M 输出 tokens（偏啰嗦，同类中位 100M），评估成本 $72.02。([artificialanalysis.ai](https://artificialanalysis.ai/models/deepseek-v4-flash))
- Flash 非思考档近 90 天提供商最低输入价从 $0.14 跌至 $0.09（−35.7%，提供商竞争所致，非官方价）。([pricepertoken.com](https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-flash))

## 关键差异 / 时间线

- **2026-04-24**：DeepSeek V4 Preview 发布（与 OpenAI GPT-5.5 同日上市）；API 即日可用；keep base_url 只改 model 名为 `deepseek-v4-pro` / `deepseek-v4-flash`；上市价 = Flash $0.14/$0.028(hit)/$0.28；Pro $1.74/$0.145(hit)/$3.48。([官方公告](https://api-docs.deepseek.com/news/news260424)、[cloudzero.com](https://www.cloudzero.com/blog/deepseek-pricing/)、[webscraft.org](https://webscraft.org/blog/deepseek-v4-flash-u-2026-scho-tse-skilki-koshtuye-i-yak-zapustiti-bez-gpu?lang=en))
- **2026-04-26 12:15 UTC**：输入缓存命中价整体降至原价 1/10（Flash $0.028→$0.0028；Pro $0.145→$0.0145）。([apidog.com](https://apidog.com/blog/deepseek-v4-pro-permanent-price-cut/)、[enterprisedna.co](https://enterprisedna.co/resources/news/deepseek-v4-pro-permanent-price-cut-enterprise-ai-2026/))
- **2026-05-22/23**：DeepSeek 宣布 V4-Pro 75% 促销价（原定 2026-05-31 15:59 UTC 到期）**永久化**，不回调。([codersera.com](https://codersera.com/blog/deepseek-v4-pro-permanent-price-cut-may-2026/)、[engadget.com](https://www.engadget.com/2180062/deepseek-permanently-reduces-the-price-of-its-flagship-v4-model-by-75-percent/)、[HN](https://news.ycombinator.com/item?id=48237663))
- **2026-05-27**：小米宣布 MiMo-V2.5 系列 API 永久降价（最高 −99%），价格直接对标 DeepSeek：MiMo-V2.5 缓存命中 ¥0.02 / 输入 ¥1 / 输出 ¥2（per 1M）；MiMo-V2.5-Pro ¥0.025 / ¥3 / ¥6。与 DeepSeek 人民币价（Flash ¥1/¥2、Pro ¥3/¥6）完全对齐。([36kr](https://36kr.com/p/3826964226691972)、[CSDN](https://blog.csdn.net/hanzhixintianxia/article/details/161461965))
- **2026-05-31 15:59 UTC**：V4-Pro 永久价生效：$0.435 / $0.003625 / $0.87（−75%）。([deepseek.ai](https://deepseek.ai/pricing)、[codersera.com](https://codersera.com/blog/deepseek-v4-pro-permanent-price-cut-may-2026/))
- **2026-06-30**：宣布 V4 官方版将采用高峰 2x 定价（deepseek.ai 转述；winbuzzer 2026-07-03 报道"官方确认现有价格，但未给出峰谷窗口细节"）。([deepseek.ai](https://deepseek.ai/pricing)、[winbuzzer.com](https://winbuzzer.com/2026/07/03/deepseek-v4-may-add-peak-hour-pricing-to-its-api-xcxwbn/))
- **2026-07-24 15:59 UTC**：`deepseek-chat` / `deepseek-reasoner` 旧别名永久退役。([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/)、[deepseek.ai](https://deepseek.ai/pricing))
- **2026-07-31**：Flash 模型版本更新为 DeepSeek-V4-Flash-0731。([官方定价页](https://api-docs.deepseek.com/quick_start/pricing/)、[artificialanalysis.ai](https://artificialanalysis.ai/models/deepseek-v4-flash))
- **2026-08 初**：Responses API 计划支持 deepseek-v4-pro。([官方定价页](https://api-docs.deepseek.com/quick_start/pricing/))
- **未生效**：高峰 2x 定价（截至 2026-07-29）。若按公布时段（北京 09–12 / 14–18，即 UTC 01–04 / 06–10）测算，全天均匀调用约多付 29%。([deepseek.ai](https://deepseek.ai/pricing)、[reddit r/DeepSeek](https://www.reddit.com/r/DeepSeek/comments/1uiq1lk/v4_peak_pricing_is_coming_midjuly_heres_how_to/))

## 教程素材（写作时直接引用）

**1. 计费机制**
- "The expense = number of tokens × price."（费用 = token 数 × 单价）；按使用量扣费，无月费、无按席位收费；预充值余额与赠送余额并存，**先扣赠送余额**。([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/))
- 思考模式下 reasoning tokens 按输出价计费。([deepseek.ai](https://deepseek.ai/pricing))
- 上下文缓存**自动生效、无需任何配置**：DeepSeek 2024-08-02 起提供基于磁盘的 prefix caching，系统提示词/长文档/few-shot 前缀命中即按 cache-hit 价计费，无 SDK 改动、无 header、无开关。([deepseek.ai](https://deepseek.ai/pricing)) 官方将缓存描述为 best-effort，不保证命中率。([benchlm.ai](https://benchlm.ai/deepseek/api-pricing))
- 命中率最大化技巧：**可复用前缀放前面**（系统提示、上下文文档在前，易变内容在后）。90% 命中时 Flash 有效输入价从 $0.14 降至约 $0.017/1M（−88%）。([deepseek.ai](https://deepseek.ai/pricing))

**2. 省钱清单（综合第三方，均来自深挖来源）**
- 默认全用 Flash，只有失败/置信度不足的请求再升级 Pro（hybrid routing）——混合工作负载下 Flash 比 Pro 端到端便宜约 3 倍。([deepseek.ai](https://deepseek.ai/pricing)、[aipricing.guru](https://www.aipricing.guru/blog/z-ai-vs-deepseek-api-pricing-2026/))
- 控制输出：384K max output 很宽，设 `max_tokens` 防止冗长输出烧钱（AA 实测 Flash 偏啰嗦：跑 Intelligence Index 用掉 210M 输出 tokens）。([artificialanalysis.ai](https://artificialanalysis.ai/models/deepseek-v4-flash))
- 无 Batch API 折扣档（BenchLM 2026-07-25 查证"DeepSeek does not currently offer a Batch API discount tier"）。批量省钱靠：缓存命中 + 高峰政策生效后错峰调度（把非实时任务 cron 到非高峰窗口）。([benchlm.ai](https://benchlm.ai/deepseek/api-pricing)、[reddit r/DeepSeek](https://www.reddit.com/r/DeepSeek/comments/1uiq1lk/v4_peak_pricing_is_coming_midjuly_heres_how_to/)、[deepseek.ai](https://deepseek.ai/pricing))
- 三把成本杠杆：①默认路由 Flash；②前缀前置工程化提升命中率；③错开高峰窗口。三管齐下通常可省 60–80%。([deepseek.ai](https://deepseek.ai/pricing))

**3. 计算示例（可代入教程）**
- 单次满上下文调用上限：1M 输入（miss）$0.14 + 384K 输出 $0.1075 ≈ **$0.25/次**（由官方价推导，标注为 derived）。
- 例 A：1M 输入（全 miss）+ 1M 输出 = $0.42；稳定系统提示使 90% 命中后约 $0.30。([deepseek.ai](https://deepseek.ai/pricing))
- 例 D（规模）：每天 10M 输入 + 5M 输出、80% 命中 → 输入 ≈ 10×(0.2×$0.14+0.8×$0.0028)=$0.30/天，输出 $1.40/天，合计约 $1.70/天 ≈ **$51/月**。同量美国前沿模型要数百美元/月。([deepseek.ai](https://deepseek.ai/pricing))
- 100M tokens/天、80% 命中 ≈ $340/月（输入+输出）。([deepseek.ai](https://deepseek.ai/pricing))
- 同一 coding-agent 工作负载：GPT-5.5 $12,000/月 vs DeepSeek V4 Flash $252/月（48×）。([morphllm.com](https://www.morphllm.com/llm-api))
- Flash 输入比 GPT-5.4 便宜 18×、比 Claude Opus 4.7 便宜 36×；输出比 Sonnet 4.6 便宜 54×、比 GPT-5.5 便宜 107×。([cloudzero.com](https://www.cloudzero.com/blog/deepseek-pricing/))
- GLM-5.2 $1.40/$4.40：Flash 输入便宜约 10×、输出约 15.7×。([morphllm.com](https://www.morphllm.com/llm-api))

**4. 代码/配置片段**
- OpenAI 兼容调用：`base_url = "https://api.deepseek.com"`，`model = "deepseek-v4-flash"`（或 `deepseek-v4-pro`）。([官方公告](https://api-docs.deepseek.com/news/news260424))
- Anthropic 兼容：`base_url = "https://api.deepseek.com/anthropic"`。([官方定价页](https://api-docs.deepseek.com/quick_start/pricing/))
- 开启思考（Flash 按请求切换）：`"thinking": {"type": "enabled"}`；Pro 默认开思考。([evolink.ai](https://evolink.ai/deepseek-api))
- 迁移：`deepseek-chat` → `deepseek-v4-flash`（非思考）；`deepseek-reasoner` → `deepseek-v4-flash`（开思考），**别盲目换成 Pro**。([verdent.ai](https://www.verdent.ai/guides/deepseek-v4-pricing-api-migration-2026))
- 限流：官方只公布并发上限（Flash 2500 / Pro 500），不公布 RPM/TPM；无账号等级，需要更高并发须向 DeepSeek 申请扩容；429 时减少在途请求 + 指数退避。([deepseek.ai](https://deepseek.ai/pricing)、[api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/))

**5. 社区观点（供平衡视角）**
- r/LocalLLaMA 讨论："V4 Flash 在 284B 规模下 $0.14/$0.28 若按参数量线性定价其实还可以更便宜"——即按参数规模看定价仍偏保守/合理。([reddit r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1su5gj5/buried_lede_deepseek_v4_flash_is_incredibly))

## 来源清单（完整 URL，全部列出）

1. https://api-docs.deepseek.com/quick_start/pricing/ — 官方「Models & Pricing」定价页（最权威；含缓存价、并发限制、高峰政策脚注、别名退役）
2. https://api-docs.deepseek.com/news/news260424 — 官方 V4 Preview 发布公告（参数、发布时间、API 用法、别名退役通知）
3. https://deepseek.ai/pricing — 独立定价指南（2026-07-25 复核官方；价格历史、缓存机制、高峰政策状态、对比表、计算器）
4. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter Flash 页（$0.0896/$0.1792、规格、effort 档位）
5. https://openrouter.ai/deepseek/deepseek-v4-pro — OpenRouter Pro 页（$0.435/$0.87）
6. https://artificialanalysis.ai/models/deepseek-v4-flash — AA 分析（Intelligence 50、7:2:1 混合 $0.06/1M、缓存价、MMLU 类基准）
7. https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-flash — 16 家提供商价格区间、90 天价格变化、速度
8. https://pricepertoken.com/endpoints/deepseek/free — 新用户 5M 免费 tokens
9. https://felloai.com/deepseek-pricing/ — 免费额度、缓存 98% 折扣、对比
10. https://tokenmix.ai/blog/deepseek-api-free-credits — 5M tokens ≈ $3.40、30 天有效期（第三方）
11. https://apidog.com/blog/how-to-use-deepseek-v4-api-for-free/ — $2 最低充值（单来源）
12. https://github.com/deepseek-ai/awesome-deepseek-integration/issues/642 — 用户反馈找不到 5M 免费额度（警示）
13. https://benchlm.ai/deepseek/api-pricing — 无 Batch 折扣档、缓存 best-effort、reasoning effort 同价
14. https://codersera.com/blog/deepseek-v4-pro-permanent-price-cut-may-2026/ — 75% 永久化细节（$1.74→$0.435 等）
15. https://enterprisedna.co/resources/news/deepseek-v4-pro-permanent-price-cut-enterprise-ai-2026/ — 2026-04-26 缓存价降至 1/10、75% 永久化
16. https://apidog.com/blog/deepseek-v4-pro-permanent-price-cut/ — 缓存命中价 2026-04-26 降至 1/10
17. https://winbuzzer.com/2026/07/03/deepseek-v4-may-add-peak-hour-pricing-to-its-api-xcxwbn/ — 高峰定价报道（官方确认价格未确认窗口）
18. https://www.reddit.com/r/DeepSeek/comments/1uiq1lk/v4_peak_pricing_is_coming_midjuly_heres_how_to/ — 社区对高峰 2x 的讨论与错峰建议
19. https://36kr.com/p/3826964226691972 — 小米 MiMo-V2.5 永久降价（¥0.02/¥1/¥2、Pro ¥0.025/¥3/¥6），与 DeepSeek 价格战
20. https://blog.csdn.net/hanzhixintianxia/article/details/161461965 — 小米 MiMo-V2.5 vs DeepSeek V4 定价对比（RMB）
21. https://www.morphllm.com/deepseek-api — 定价汇总、别名迁移说明、3.1× 关系
22. https://www.morphllm.com/llm-api — 12 家 API 价格对比（GLM-5.2 $1.40/$4.40、coding-agent 48×）
23. https://www.cloudzero.com/blog/deepseek-pricing/ — 与 GPT/Claude 的倍数对比、V4 上市同日 GPT-5.5
24. https://www.verdent.ai/guides/deepseek-v4-pricing-api-migration-2026 — 迁移指南（deepseek-reasoner→flash 思考）
25. https://www.engadget.com/2180062/deepseek-permanently-reduces-the-price-of-its-flagship-v4-model-by-75-percent/ — Engadget 报道 75% 永久降价
26. https://costgoat.com/pricing/deepseek-api — 模式说明、5M 免费额度、384K 统一输出
27. https://webscraft.org/blog/deepseek-v4-flash-u-2026-scho-tse-skilki-koshtuye-i-yak-zapustiti-bez-gpu?lang=en — 上市期缓存价（Flash $0.028 vs Pro $0.145）印证时间线
28. https://techsy.io/en/blog/llm-api-pricing-comparison — GLM-4.6 $0.43/$1.74 对比
29. https://flowtivity.ai/blog/deepseek-v4-vs-gpt-5-5-vs-claude-opus-vs-glm-cost-benchmarks/ — Flash vs GPT-5.5/Claude/GLM 成本与基准
30. https://news.ycombinator.com/item?id=48237663 — HN 讨论 75% 永久降价
31. https://chat-deep.ai/pricing/ — 别名退役状态（2026-07-29 复核官方价）
32. https://lushbinary.com/blog/deepseek-v4-pro-vs-flash-benchmarks-pricing-comparison/ — 参数/发布/许可证
33. https://www.requesty.ai/models/deepinfra/deepseek-ai-deepseek-v4-flash — Requesty $0.10/$0.20 第三方价
34. https://www.aipricing.guru/blog/z-ai-vs-deepseek-api-pricing-2026/ — DeepSeek vs GLM/Z.AI 选型建议
35. https://www.reddit.com/r/LocalLLaMA/comments/1su5gj5/buried_lede_deepseek_v4_flash_is_incredibly — 社区对 Flash 定价的看法
36. https://evolink.ai/deepseek-api — Flash 思考开关代码示例

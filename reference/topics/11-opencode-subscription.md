---
topic: OpenCode 订阅与低价批量 API
slug: opencode-subscription
category: research
updated: 2026-08-01
status: written
sources:
  - https://opencode.ai/docs/go/
  - https://opencode.ai/go
  - https://opencode.ai/docs/zen/
  - https://opencode.ai/en/zen
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/
  - https://github.com/anomalyco/opencode/issues/28846
  - https://github.com/anomalyco/opencode/issues/15872
  - https://github.com/anomalyco/opencode/issues/24879
  - https://github.blog/changelog/2026-01-16-github-copilot-now-supports-opencode/
  - https://www.reddit.com/r/opencodeCLI/comments/1slrucw/what_affordable_subscription_plans_for_opencode/
  - https://www.reddit.com/r/opencodeCLI/comments/1sx757l/i_just_noticed_the_new_deepseek_quota_on_opencode/
  - https://www.reddit.com/r/opencode/comments/1tn9sit/considering_buying_opencode_go_is_it_worth_it/
  - https://www.reddit.com/r/opencode/comments/1uoyxvx/deepseekv4flash_is_more_than_enough_i_dont_feel/
  - https://www.reddit.com/r/opencode/comments/1tu2kz4/deepseek_v4_flash_is_magical/
  - https://www.reddit.com/r/opencode/comments/1tr8e7m/open_code_go_subscription/
  - https://www.reddit.com/r/opencodeCLI/comments/1u3n68t/how_long_do_opencode_go_limits_actually_last_for/
  - https://www.bitdoze.com/opencode-go-plan/
  - https://www.knolli.ai/post/opencode-go
  - https://thomas-wiegold.com/blog/opencode-go-review/
  - https://docs.bswen.com/blog/2026-05-27-opencode-go-worth-it/
  - https://www.zidooka.com/archives/4393
  - https://vibecodedthis.com/pricing/opencode-pricing/
  - https://apidog.com/blog/deepseek-v4-pro-permanent-price-cut/
  - https://thenextweb.com/news/deepseek-v4-pro-75-percent-price-cut-permanent
  - https://openrouter.ai/deepseek/deepseek-v4-pro
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://github.com/esengine/DeepSeek-Reasonix/issues/3006
  - https://www.panghucat.cn/archives/489
  - https://linux.do/t/topic/2487835
  - https://models.dev/providers/opencode-go/
  - https://opencode.ai/data/deepseek/deepseek-v4-flash
  - https://github.com/NousResearch/hermes-agent/issues/47247
  - https://medium.com/@jatinkrmalik/opencode-go-oh-my-openagent-the-complete-guide-to-sota-model-routing-without-hitting-limits-49fdc8cb3417
---

# OpenCode 订阅与低价批量 API

## 核心事实（可直接入教程）

- **站长描述的「首月 $5 订阅」已确认为 OpenCode 官方订阅套餐「OpenCode Go」**（由 OpenCode 团队、即 SST/Anomaly 运营，经 OpenCode Zen 计费），不是 OpenRouter 或其他第三方代理的产品。官方定价：**首月 $5，之后每月 $10**，提供一批精选开源编程模型（含 DeepSeek V4 Flash 与 V4 Pro）（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)，[opencode.ai/go](https://opencode.ai/go)）。按人民币汇率约 $5 ≈ 35 元，与站长说法吻合。
- OpenCode Go 是**订阅制（flat-rate）**：买一个 API Key、一个端点，一个月内可访问 16-17 个模型，额度用「美元使用量」定义，而非按次扣费；官方目标是「你付 $10，给你约 $60 的用量」，靠批量折扣 + 预留 GPU 实现约 6 倍杠杆（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）。
- **Go 明确包含 DeepSeek V4 Flash 与 V4 Pro**。官方文档原文：限制以美元价值定义，「Cheaper models like DeepSeek V4 Flash allow for more requests, while higher-cost models like GLM-5.2 allow for fewer.」——即 **DeepSeek V4 Flash 是套餐里最划算、几乎用不完的模型**（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）。
- Go 的全局限制为：**$12 / 5 小时窗口、$30 / 周、$60 / 月**（按使用量计）。DeepSeek V4 Flash 在典型使用下的配额估算：31,650 请求/5h、79,050/周、**158,150/月**；V4 Pro：3,450 请求/5h、17,150/月（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）。
- 付费方式对国内用户友好：**OpenCode Go 支持支付宝（Alipay）付款**，首次扫码支付即自动签约代扣；opencode.ai 国内可直接访问。首月 $5 用人民币支付约 35 元（[esengine/DeepSeek-Reasonix#3006](https://github.com/esengine/DeepSeek-Reasonix/issues/3006)，[panghucat.cn](https://www.panghucat.cn/archives/489)，[linux.do](https://linux.do/t/topic/2487835)）。
- **BYOK 对比**：OpenCode 本体完全免费（MIT 开源，GitHub ~192k stars），可自带任意 API Key（包括 DeepSeek 官方 Key）直接使用，Go 只是可选付费项、不买也能用。BYOK 按官方 API 单价计费（Flash $0.14/$0.28 per 1M tokens），Go 则是固定月费换批量额度（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)，[dev.to](https://dev.to/jovan_chan_9500711396d4e6/opencode-review-2026-the-open-source-terminal-coding-agent-that-challenges-claude-code-5a89)）。
- 社区共识（r/opencode、r/opencodeCLI）：**用 DeepSeek V4 Flash / MiMo 等便宜模型时额度「根本用不完」**（官方估算 158K 请求/月，用户实测「30k 请求很难碰到上限」）；但**用 GLM-5.2、Kimi K3 等贵模型会很快烧光额度**（有用户 4 小时用掉月额度 1/5，15 天到月上限）。策略：贵模型做规划/审查，Flash/MiMo 做 build 执行（[Reddit](https://www.reddit.com/r/opencode/comments/1tr8e7m/open_code_go_subscription/)，[Reddit](https://www.reddit.com/r/opencode/comments/1tn9sit/considering_buying_opencode_go_is_it_worth_it/)，[Reddit](https://www.reddit.com/r/opencodeCLI/comments/1slrucw/what_affordable_subscription_plans_for_opencode/)）。
- **「近 Opus 体感」需谨慎表述**：社区实测普遍把 V4 Flash 定为 **Sonnet 级**（「more like a Sonnet level model」「It does remind me of sonnet, but without sonnet's annoying traits」），而把 **V4 Pro 与 Opus 相提并论**（「DeepSeek V4 Pro's design sense approaches Claude Opus territory」「at worst neck and neck with Opus on Claude Code and most of the times, better」）。但独立基准上 Flash 确实逼近前沿：Artificial Analysis Intelligence Index v4.1 得分 50，173 个模型中排第 2（max effort）；0731 版 Terminal-Bench 2.1 = 82.7、DeepSWE = 54.4（vendor 报告）。教程宜写「Flash 是基准上的前沿级、日用处感的 Sonnet 级；V4 Pro 才是被社区拿来与 Opus 对比的模型」（[Reddit](https://www.reddit.com/r/opencode/comments/1tu2kz4/deepseek_v4_flash_is_magical/)，[Reddit](https://www.reddit.com/r/opencode/comments/1uoyxvx/deepseekv4flash_is_more_than_enough_i_dont_feel/)，[zidooka.com](https://www.zidooka.com/archives/4393)，[artificialanalysis.ai](https://artificialanalysis.ai/models/deepseek-v4-flash)）。
- 隐私注意：Go 全部模型除 DeepSeek V4 Flash 外均为 **zero-retention（0 天留存、不用于训练）**；唯独 **DeepSeek V4 Flash 标注「用于模型训练、无协议」**——对隐私敏感项目是重要差异点（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）。

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| 套餐名 | OpenCode Go（官方订阅，Beta 中） | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| 价格 | 首月 $5，之后每月 $10（≈35 元人民币，支持支付宝） | [opencode.ai/go](https://opencode.ai/go)；[esengine#3006](https://github.com/esengine/DeepSeek-Reasonix/issues/3006) |
| 计费方式 | 固定月费 + 美元使用额度（非按次） | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| 全局限制 | $12 / 5 小时窗口 · $30 / 周 · $60 / 月 | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| 额度杠杆 | 付 $10 得约 $60 用量（约 6 倍） | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| 含 DeepSeek V4 Flash | 是；$60/月额度；每 1M tokens：in $0.14 / out $0.28 / cache-read $0.0028 | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| Flash 请求配额估算 | 31,650 / 5h · 79,050 / 周 · 158,150 / 月 | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| 含 DeepSeek V4 Pro | 是；$15/月额度（乘数较低）；in $0.435 / out $0.87 / cache-read $0.003625 | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| Pro 请求配额估算 | 3,450 / 5h · 8,550 / 周 · 17,150 / 月 | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| Go 模型总数 | 17 个：Grok 4.5、GLM-5.2/5.1、GPT 5.6 Luna、Kimi K3/K2.7 Code/K2.6、MiMo-V2.5/Pro、MiniMax M3/M2.7、Qwen3.7 Max/Plus、Qwen3.6 Plus、DeepSeek V4 Pro、DeepSeek V4 Flash、Hy3 | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| 模型 ID 格式 | `opencode-go/<model>`，如 `opencode-go/deepseek-v4-flash` | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| API 端点 | `https://opencode.ai/zen/go/v1/chat/completions`（OpenAI 兼容）；模型清单 `https://opencode.ai/zen/go/v1/models` | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| 可用客户端 | 任何 OpenAI/Anthropic 兼容 agent（OpenCode、Hermes、Pi、OpenClaw、Mastra 等），一套 Key 通用 | [bitdoze.com](https://www.bitdoze.com/opencode-go-plan/)；[tonyreviewsthings.com](https://www.tonyreviewsthings.com/opencode-go-review/) |
| 超出额度 | 控制台开「Use balance」后回落用 Zen 余额继续，而非拦截 | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| 隐私 | 除 DeepSeek V4 Flash「用于训练、无协议」外，全部模型 0 天留存、不用于训练 | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| 每工作区 | 仅限 1 个成员订阅 Go | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| 订阅入口 | opencode.ai → OpenCode Zen → Subscribe to Go → 拿 API Key | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |

**Go 套餐内 DeepSeek 模型的价格与额度对比（官方 Go 文档表）**

| 模型 | 每 1M in/out/cache-read | 月额度 | 请求/5h | 请求/月 |
|------|------|------|------|------|
| DeepSeek V4 Flash | $0.14 / $0.28 / $0.0028 | $60 | 31,650 | 158,150 |
| DeepSeek V4 Pro | $0.435 / $0.87 / $0.003625 | $15 | 3,450 | 17,150 |

（估算基于典型请求模式：Flash 每次约 790 in + 68,000 cache + 280 out tokens；Pro 750 in + 82,000 cache + 290 out。来源：[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）

## 关键差异 / 时间线

- **OpenCode Go ≠ 第三方代理**：它由 OpenCode 官方（SST 团队，后更名 Anomaly）运营，经 OpenCode Zen 计费。与其易混的三条路径：(1) **Go**＝固定月费订阅开源模型（$5→$10/月，本文主题）；(2) **Zen**＝按量付费网关（$20 起充值、余额低于 $5 自动补 $20，含 Claude/GPT 等专有模型，零加价）；(3) **BYOK**＝自带 DeepSeek 官方 Key 直连，OpenCode 本体免费（[opencode.ai/docs/zen/](https://opencode.ai/docs/zen/)，[vibecodedthis.com](https://vibecodedthis.com/pricing/opencode-pricing/)）。
- **DeepSeek V4 Pro 是 Go「独有」的性价比点**：社区分析指出 V4 Pro 未出现在 Zen 的定价表，想用低价 V4 Pro 只有 Go 或 DeepSeek 官方直连两条路；「Codex + Go + DeepSeek V4 Pro 是目前最佳性价比组合」（[zidooka.com](https://www.zidooka.com/archives/4393)）。
- **Go 套餐内计价与官方价的「分歧已随降价消解」**：2026-03 有用户实测 Go 上 V4 Pro 按名义参考价 $1.74/$3.48 计费（约为官方实际价 4 倍）；DeepSeek 于 2026-05 宣布 V4 Pro 永久降价 75% 后，社区在 [opencode#28846](https://github.com/anomalyco/opencode/issues/28846) 要求同步上调 Go 配额，官方文档现按 $0.435/$0.87 计价。注意：Go 的美元额度是「参考价」，官方 6 倍乘数已把折扣算进额度，教程建议说「Go 的价格对标 DeepSeek 当前官方价」。
- **时间线**：
  - 2026-03：OpenCode Go 上线 Beta，起初仅 GLM-5 / Kimi K2.5 / MiniMax M2.5 三模型（[thomas-wiegold.com](https://thomas-wiegold.com/blog/opencode-go-review/)）。
  - 2026-04-24：DeepSeek V4 发布（Flash $0.14/$0.28；Pro $1.74/$3.48 带 75% 促销）。
  - 2026-04-26：全模型 cache-hit 输入价永久降为原价 1/10（[apidog.com](https://apidog.com/blog/deepseek-v4-pro-permanent-price-cut/)）。
  - 2026-05-22：DeepSeek 宣布 V4 Pro 的 75% 折扣到期后不回调、成为永久价格（[thenextweb.com](https://thenextweb.com/news/deepseek-v4-pro-75-percent-price-cut-permanent)）。
  - 2026-05-31 15:59 UTC：V4 Pro 官方价定格 $0.435 / $0.87 / $0.003625（[api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/)）。
  - 2026 年中：Go 模型扩充到 17 个（含 DeepSeek V4 Pro/Flash、Grok 4.5、GPT 5.6 Luna 等）；GPT 5.6 Luna 限时 2 倍额度（[opencode.ai/go](https://opencode.ai/go)，[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）。
- **同类低价替代（写作对比用）**：DeepSeek 官方直连 API（最便宜按量）；GitHub Copilot（官方宣布支持 OpenCode，Pro $10/月，超额按 premium request 计费、现改 AI credits 1 credit=$0.01）（[github.blog](https://github.blog/changelog/2026-01-16-github-copilot-now-supports-opencode/)，[github.com/features/copilot/plans](https://github.com/features/copilot/plans)）；小米 MiMo 平台（$5-6/月订阅，社区评价 token 极宽裕）；阿里云 Coding Plan Lite（约 $5.80/月）；OpenRouter（按量，GLM 5.2 曾 80% off、DeepSeek V4 Flash $0.0896/$0.1792 有 36% off）（[Reddit](https://www.reddit.com/r/opencode/comments/1u1aze5/cheapest_ai_api_subscriptions_free_options_with/)，[openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash)）。

## 教程素材（写作时直接引用）

**「花 $10 用 DeepSeek V4 一整月」的核心理由（可作教程卖点）**
> OpenCode Go 付 $10 给约 $60 的用量额度（首月只要 $5）；DeepSeek V4 Flash 是套餐里最便宜的模型之一（$0.14/$0.28 per 1M），官方估算一个月可跑约 15.8 万次请求——对绝大多数个人开发者，这就是「根本用不完」。（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）

**订阅步骤（官方流程）**
1. 打开 opencode.ai → 登录/注册 OpenCode Zen → 点 Subscribe to Go（首月 $5），支持支付宝扫码，首次即签约代扣。
2. 在 Zen 控制台创建/复制 API Key。
3. 在 OpenCode TUI 里运行 `/connect` → 选 `OpenCode Go` → 粘贴 Key；运行 `/models` 查看可用模型。
4. 也可直接把 Go Key 配到任何 OpenAI 兼容 agent（Hermes、Pi、OpenClaw 等）。
（来源：[opencode.ai/docs/go/](https://opencode.ai/docs/go/)，[panghucat.cn](https://www.panghucat.cn/archives/489)）

**配置模型 ID（opencode.json）**
```
model: opencode-go/deepseek-v4-flash   # 或 deepseek-v4-pro / glm-5.2 / kimi-k3 ...
```
API 端点：`https://opencode.ai/zen/go/v1/chat/completions`；模型清单：`https://opencode.ai/zen/go/v1/models`（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）。

**省钱策略（社区实战，可直接引用）**
- 「用 GLM-5.2 / Kimi K3 做规划与审查，用 DeepSeek V4 Flash / MiMo 做 build 执行，一个月很难碰到上限。」（[Reddit](https://www.reddit.com/r/opencode/comments/1tn9sit/considering_buying_opencode_go_is_it_worth_it/)）
- 「如果你在 DeepSeek 官方 API 上月花费超过 $10，Go 就值得。」（[Reddit](https://www.reddit.com/r/opencodeCLI/comments/1u3n68t/how_long_do_opencode_go_limits_actually_last_for/)）
- 预算 $5 的 OpenRouter 余额跑同样模型一周就烧完，而 $10 的 Go 能撑一个月且限额非常宽松（[Reddit](https://www.reddit.com/r/opencodeCLI/comments/1tr8e7m/open_code_go_subscription/)）。

**警示点（教程要写）**
- Go 目前是 Beta：定价、限额、模型清单随时可能变。
- 贵的模型（GLM-5.2、Kimi K3、Grok 4.5）会快速消耗 5 小时/周/月额度；Kimi K3 官方估算每 5 小时只有约 110 次请求。
- 有用户怀疑 Go 的模型是量化/「缩水」版（社区未证实；官方文档称「在几乎所有情况下直接从源提供模型」）。写作时标注为社区传闻、无实证。（[Reddit](https://www.reddit.com/r/opencodeCLI/comments/1u35gzj/opencode_go_is_a_total_lie_imo/)，[Reddit](https://www.reddit.com/r/opencodeCLI/comments/1su7g3v/is_opencode_go_really_that_bad/)）
- DeepSeek V4 Flash 在 Go 上标注「数据用于训练、无协议」，其余模型零留存；0731 版 Flash 走中国机房、需在 opencode.ai 手动开启「Enable models hosted in China」（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)；[r/opencode 0731 帖](https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/)）。

## 来源清单（完整 URL）

**官方（最高权威）**
1. https://opencode.ai/docs/go/ — OpenCode Go 官方文档：价格、模型列表、限额表、端点、隐私（本文主依据，2026-08-01 核验）
2. https://opencode.ai/go — Go 官方落地页：$5 首月/$10 每月、Luna 2x 促销
3. https://opencode.ai/docs/zen/ — Zen 按量付费网关文档（与 Go 的差异）
4. https://opencode.ai/en/zen — Zen 落地页（$20 充值、自动补额、零加价）
5. https://api-docs.deepseek.com/quick_start/pricing/ — DeepSeek 官方定价页（V4 Pro 永久 75% off、Responses API 仅支持 flash）
6. https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/ — DeepSeek 官方 OpenCode 接入文档

**GitHub（项目/议题）**
7. https://github.com/anomalyco/opencode/issues/28846 — Go 配额与 V4 Pro 降价（官方定价页引用）
8. https://github.com/anomalyco/opencode/issues/15872 — Go 定价 vs 限额混淆
9. https://github.com/anomalyco/opencode/issues/24879 — Go Pro tier 讨论（$20 档）
10. https://github.com/esengine/DeepSeek-Reasonix/issues/3006 — Go 订阅支持支付宝（国内实测）
11. https://github.com/NousResearch/hermes-agent/issues/47247 — Zen free tier 的 DeepSeek V4 Flash 上下文限 200K
12. https://github.com/orgs/community/discussions/173899 — Copilot premium request 超额 $0.04 计费（对照）

**社区（Reddit / 博客）**
13. https://www.reddit.com/r/opencodeCLI/comments/1slrucw/what_affordable_subscription_plans_for_opencode/ — Go 首月 $5、限额是最大缺点、Copilot 对照
14. https://www.reddit.com/r/opencodeCLI/comments/1sx757l/i_just_noticed_the_new_deepseek_quota_on_opencode/ — Go 真实限额 $12/$30/$60；Flash 配额超大
15. https://www.reddit.com/r/opencode/comments/1tn9sit/considering_buying_opencode_go_is_it_worth_it/ — 值不值讨论；贵模型快速烧额度
16. https://www.reddit.com/r/opencode/comments/1uoyxvx/deepseekv4flash_is_more_than_enough_i_dont_feel/ — Flash「够用」，Sonnet 级感受
17. https://www.reddit.com/r/opencode/comments/1tu2kz4/deepseek_v4_flash_is_magical/ — Flash vs Opus 社区口径（Sonnet 级）
18. https://www.reddit.com/r/opencode/comments/1tr8e7m/open_code_go_subscription/ — $60 用量 2 个月用不完；$5 预算对比
19. https://www.reddit.com/r/opencodeCLI/comments/1u3n68t/how_long_do_opencode_go_limits_actually_last_for/ — 用量实证、模型选择策略
20. https://www.bitdoze.com/opencode-go-plan/ — 16 模型 $10/月实测、Cheap 模型策略
21. https://www.knolli.ai/post/opencode-go — Go 概览（$5/$10、Beta 说明）
22. https://thomas-wiegold.com/blog/opencode-go-review/ — Go 上线背景、模型扩充史
23. https://docs.bswen.com/blog/2026-05-27-opencode-go-worth-it/ — 程序员实测「$5 首月容易试」
24. https://www.zidooka.com/archives/4393 — Go vs Zen 对比；V4 Pro 是 Go 独有
25. https://vibecodedthis.com/pricing/opencode-pricing/ — 四档定价汇总（含 Black $20/$100/$200，暂停招生）
26. https://medium.com/@jatinkrmalik/opencode-go-oh-my-openagent-the-complete-guide-to-sota-model-routing-without-hitting-limits-49fdc8cb3417 — Go 路由策略、SWE-Bench/LiveCodeBench 数据

**价格/新闻**
27. https://apidog.com/blog/deepseek-v4-pro-permanent-price-cut/ — V4 Pro 75% 永久化细节
28. https://thenextweb.com/news/deepseek-v4-pro-75-percent-price-cut-permanent — 降价新闻分析
29. https://openrouter.ai/deepseek/deepseek-v4-pro — OpenRouter 上 V4 Pro 价格/上下文
30. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter 上 V4 Flash 价格（$0.0896/$0.1792）
31. https://models.dev/providers/opencode-go/ — Go 模型清单第三方镜像（22 个条目）
32. https://opencode.ai/data/deepseek/deepseek-v4-flash — OpenCode 站内 Flash 用量对比页
33. https://github.blog/changelog/2026-01-16-github-copilot-now-supports-opencode/ — Copilot 官方支持 OpenCode
34. https://www.panghucat.cn/archives/489 — Go 支付宝订阅教程（国内视角）
35. https://linux.do/t/topic/2487835 — 国内用户实测支付宝扣款体验

## gaps（未核实 / 需后续确认）

- **「Flash 近 Opus 体感」未获社区共识**：站长/部分来源（vendor 基准、AA 指数）支持 Flash 逼近前沿，但 r/opencode 实测普遍定位为 Sonnet 级；把 V4 与 Opus 对比的绝大多数是 **V4 Pro** 而非 Flash。教程需写明「基准 vs 日用感受」的差异，或直接以「Flash ≈ Sonnet 级、Pro ≈ Opus 级」为叙事。
- **Go 模型是否量化/降智**：社区多次怀疑（「quantized models」），官方称「几乎全部直接从源提供」，无第三方实证，记为传闻。
- **「一个月根本用不完」仅对便宜模型成立**：Flash/MiMo 配额极宽裕，但贵模型（Kimi K3、GLM-5.2、Grok 4.5）会快速触顶；官方估算为典型使用模式下的近似值，非保证值。
- **$60/月额度重置规则**：官方文档未说明是按自然月重置还是订阅周期重置；「5 小时窗口」的具体滑动窗口边界也未明示。
- **Go 套餐的地区/机房**：Go 多数模型托管于 US/EU/Singapore；0731 版 Flash 走中国机房需手动开启开关（r/opencode 帖，官方文档未直接说明 0731 加载情况）。
- **支付宝代扣细节**：linux.do 用户反映「扫码绑定后即被扣款」，首次 $5 的扣费时点、取消订阅是否即时停止扣费，均需国内用户实测确认。
- **GitHub Copilot 接入 OpenCode 的价格口径**：早期 premium request 超额 $0.04/次，后 GitHub 全面转向「AI credits」（1 credit = $0.01），当前 $10 Copilot Pro 的确切包含量建议直接查 github.com/features/copilot/plans。
- **Promo/推荐码现象**：多个来源（reddit、中文博客）带 `?ref=` 推荐码链接（双方各得 $5 额度），教程如提及请标注含推荐返利成分，避免被当作事实误导。

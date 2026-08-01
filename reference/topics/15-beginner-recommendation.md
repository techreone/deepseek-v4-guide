---
topic: 小白推荐角度：DeepSeek V4 是否最值得用的低价强力 AI
slug: beginner-recommendation
category: research
updated: 2026-08-01
status: written
sources:
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/news/news260424
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash
  - https://artificialanalysis.ai/models/comparisons/claude-sonnet-5-vs-deepseek-v4-flash
  - https://opencode.ai/docs/go/
  - https://opencode.ai/go
  - https://mashable.com/article/deepseek-v4-preview-comparison-chatgpt-claude-gemini
  - https://www.datacamp.com/blog/deepseek-v4-vs-gpt-5-5
  - https://www.reddit.com/r/opencodeCLI/comments/1svmgla/deepseek_v4_flash_is_a_monster_cheap_good_and_so/
  - https://www.reddit.com/r/opencode/comments/1tu2kz4/deepseek_v4_flash_is_magical/
  - https://www.reddit.com/r/opencode/comments/1uoyxvx/deepseekv4flash_is_more_than_enough_i_dont_feel/
  - https://www.reddit.com/r/opencodeCLI/comments/1u0qwj8/deepseek_v4_flash_feels_like_illegal_what_do_you/
  - https://www.reddit.com/r/hermesagent/comments/1tn69g2/deepseekv4flash_is_amazing_and_cheap_as_fk/
  - https://www.reddit.com/r/LocalLLaMA/comments/1vbidxt/the_official_release_deepseek_v4_flash_is_live_on/
  - https://www.reddit.com/r/LocalLLaMA/comments/1vbx39u/deepseek_v4_flash_ga_ranks_the_same_as_sonnet_5/
  - https://www.reddit.com/r/LocalLLaMA/comments/1vbjdby/deepseekv4flash0731_is_going_to_cause_another/
  - https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/
  - https://www.reddit.com/r/DeepSeek/comments/1uyvmp4/the_opencode_go_is_cheaper_than_deepseek_api/
  - https://www.reddit.com/r/opencode/comments/1um5bst/should_i_just_buy_deepseek_api_credits_or_is/
  - https://www.reddit.com/r/SillyTavernAI/comments/1t2i3mn/deepseek_v4_hallucinations/
  - https://x.com/ArtificialAnlys/status/2047735160544841953
  - https://thomas-wiegold.com/blog/deepseek-v4-review/
  - https://www.buildthisnow.com/blog/models/best-ai-coding-model-2026
  - https://diyai.io/ai-tools/ai-model-comparison/
  - https://www.voiceflow.com/blog/deepseek-vs-chatgpt
  - https://deepseekai.guide/guides/deepseek-sign-up/
  - https://deepseekai.guide/guides/deepseek-online/
  - https://pricepertoken.com/endpoints/deepseek/free
  - https://felloai.com/deepseek-pricing/
  - https://tokenmix.ai/blog/deepseek-api-free-credits
  - https://deepinfra.com/blog/deepseek-v4-pro-pricing-guide-2026-providers-cost-analysis
  - https://www.costgoat.com/pricing/deepseek-api
  - https://www.verdent.ai/guides/deepseek-v4-pricing-api-migration-2026
  - https://www.morphllm.com/best-ai-model-for-coding
---

# 小白推荐角度：DeepSeek V4 是否最值得用的低价强力 AI

> 目的：为"不知道型号名的小白推荐便宜+强力+值得长期用的 AI"这一教程方向提供素材。
> 立场规则：价格/规格是硬事实可直接引用；社区口碑/评测结论必须标注来源语境（谁、何时、何种场景），不写成网站自己的断言。

## 核心事实（可直接入教程）

- DeepSeek V4 官方双模型定价（2026-07-25 起，截至 2026-08-01 官网仍有效）：**V4-Flash 输入 $0.14 / 输出 $0.28 每 1M tokens；V4-Pro 输入 $0.435 / 输出 $0.87 每 1M tokens**。cache-hit 输入低至 Flash $0.0028、Pro $0.003625。(https://api-docs.deepseek.com/quick_start/pricing/)
- OpenRouter 上 V4-Flash 更便宜：**$0.0896 / $0.1792 每 1M（"36% off"）**，1M context、最大输出 384K；OpenRouter 官方称经过 prompt caching 后用户实际支付平均可再省 60–80%。(https://openrouter.ai/deepseek/deepseek-v4-flash)
- 对比主流闭源模型，V4-Flash 价格低一个数量级：GPT-5.5 为 $5 输入 / $30 输出每 1M；Claude Opus 4.7 为 $5 / $25；Claude Sonnet 4.6 为 $3 / $15。多家评测计算 V4-Flash 比 GPT-5.5 / Claude Sonnet 便宜 **约 97–99%**（输出 $0.28 vs $15/$30）。(https://mashable.com/article/deepseek-v4-preview-comparison-chatgpt-claude-gemini、https://www.costgoat.com/pricing/deepseek-api、https://www.verdent.ai/guides/deepseek-v4-pricing-api-migration-2026)
- **免费/低价三入口**：(1) 网页版 chat.deepseek.com 和手机 App 免费，无需订阅，V4 默认开启（Instant Mode=V4-Flash、Expert Mode=V4-Pro）；(2) 注册 API 账号送 **500 万免费 tokens（约 $3.40–$8.40 价值，30 天有效，无需信用卡）**（多来源第三方报告，官方仅提及"granted balance"，见 gaps）；(3) OpenCode Go 订阅 $5 首月 / $10 每月，官方确认。(https://api-docs.deepseek.com/news/news260424、https://opencode.ai/docs/go/、https://pricepertoken.com/endpoints/deepseek/free、https://felloai.com/deepseek-pricing/)
- 社区共识（Reddit 多帖，2026-04 至 07）：V4-Flash 是"**unquestioned price-performance leader**"（r/opencode 用户，评 0731 版：Intelligence 49.9 仅比 GLM-5.2 低 1 分，Agentic 45.7 与 Grok 4.5 并列），用户常用来替代/补充 Claude 订阅、"save a few bucks"。(https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/、https://www.reddit.com/r/hermesagent/comments/1tn69g2/deepseekv4flash_is_amazing_and_cheap_as_fk/)
- 客观短板（同样来自社区与评测，必须写进推荐教程以免误导）：**幻觉率高**（AA-Omniscience 上 V4-Pro 94%、V4-Flash 96% "不确定时也照样回答"，对比 GLM-5.2 28%、MiMo 25%、MiniMax M3 16%）；有用户反馈"明确要求英文却切回中文输出"；不擅长 Swift；有用户称"不可信到能丢着不管"。(https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash、https://x.com/ArtificialAnlys/status/2047735160544841953、https://www.reddit.com/r/LocalLLaMA/comments/1vbidxt/the_official_release_deepseek_v4_flash_is_live_on/、https://www.reddit.com/r/opencodeCLI/comments/1svmgla/deepseek_v4_flash_is_a_monster_cheap_good_and_so/)
- DeepSeek V4 是**开源模型**（MIT license，权重 Hugging Face / ModelScope 可下载自托管），这与 ChatGPT/Claude/Gemini 的闭源是本质区别，也是"值得长期用"叙事的重要支点。(https://www.voiceflow.com/blog/deepseek-vs-chatgpt、https://www.morphllm.com/best-ai-model-for-coding)

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| V4-Flash 参数量 | 284B total / 13B active (MoE) | https://openrouter.ai/deepseek/deepseek-v4-flash |
| V4-Pro 参数量 | 1.6T total / 49B active (MoE) | https://api-docs.deepseek.com/news/news260424 |
| Context window | 1M tokens（官方）/ OpenRouter 标注 1.05M | https://api-docs.deepseek.com/quick_start/pricing/ |
| 最大输出 | 384K tokens | https://api-docs.deepseek.com/quick_start/pricing/ |
| V4-Flash 官方价（1M，cache-miss in / out） | $0.14 / $0.28 | https://api-docs.deepseek.com/quick_start/pricing/ |
| V4-Flash cache-hit 输入 | $0.0028 / 1M | 同上 |
| V4-Pro 官方价（1M，cache-miss in / out） | $0.435 / $0.87（原 $1.74/$3.48 的 75% 永久降价后） | 同上 + https://felloai.com/deepseek-pricing/ |
| V4-Pro cache-hit 输入 | $0.003625 / 1M | 同上 |
| OpenRouter V4-Flash 价 | $0.0896 / $0.1792（-36%） | https://openrouter.ai/deepseek/deepseek-v4-flash |
| 第三方最便宜供应商 | DeepInfra $0.090 in（16 家供应商中最低，范围 $0.090–$0.180） | https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-flash |
| V4-Flash 并发上限 | 2500（Pro 500） | https://api-docs.deepseek.com/quick_start/pricing/ |
| 即将生效：高峰/低谷定价 | 高峰时段（北京 9:00–12:00、14:00–18:00）价格 ×2，官方另行公告生效日期 | https://api-docs.deepseek.com/quick_start/pricing/ |
| Responses API 支持 | 目前仅 Flash；Pro 预计 2026-08 初加入 | 同上 |
| GPT-5.5 对比价（1M） | $5 in / $30 out | https://mashable.com/article/deepseek-v4-preview-comparison-chatgpt-claude-gemini |
| Claude Opus 4.7 对比价（1M） | $5 in / $25 out | https://www.verdent.ai/guides/deepseek-v4-pricing-api-migration-2026 |
| Claude Sonnet 4.6 对比价（1M） | $3 in / $15 out | https://www.costgoat.com/pricing/deepseek-api |
| Gemini 2.5 Flash 对比价（1M） | $0.30 in / $2.50 out | https://devtk.ai/en/blog/ai-api-pricing-comparison-2026/（搜索快照） |
| GLM-5.2 对比价（1M，Morph） | $1.10 in / $4.10 out | https://www.morphllm.com/best-ai-model-for-coding |
| 小米 MiMo-V2.5（1M） | $0.14 / $0.28（与 Flash 同价） | https://devtk.ai/en/blog/ai-api-pricing-comparison-2026/（搜索快照） |
| MiniMax M3（1M） | $0.60 / $2.40，促销约 $0.30 / $1.20 | https://www.buildthisnow.com/blog/models/best-ai-coding-model-2026 |
| AA Intelligence Index：V4-Flash (Max) | 47（约等于 Claude Sonnet 4.6 max 水平）→ 0731 版社区报告 49.9 | https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash + https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/ |
| AA Intelligence Index：V4-Flash (Reasoning Max) vs Claude Sonnet 5 (Max) | 40 vs 53；单价 $0.06 vs $1.54 per 1M（7:2:1 混合）；TTFT 1.25s vs 161s | https://artificialanalysis.ai/models/comparisons/claude-sonnet-5-vs-deepseek-v4-flash |
| 自托管体积 | ~167GB（FP4 已量化），社区在 2× DGX Spark 上跑 ~40 tps（约为 API 一半速度） | https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/、https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/ |

## 关键差异 / 时间线

- **2026-04-24**：DeepSeek V4 Preview 发布（Pro + Flash），chat.deepseek.com 上线 Expert Mode（Pro）/ Instant Mode（Flash）；旧模型名 deepseek-chat / deepseek-reasoner 映射到 V4（后者于 2026-07-24 15:59 UTC 退役）。(https://api-docs.deepseek.com/news/news260424)
- **2026-04-29**：网页/App 新增 Vision 模式（图片、视频）。(https://deepseeksr1.com/chat/ — 第三方；以官方为准)
- **2026-05-31 后**：V4-Pro 的 75% 促销降价转为永久（$1.74/$3.48 → $0.435/$0.87）。(https://felloai.com/deepseek-pricing/、https://emergingai.substack.com/p/deepseek-v4-complete-beginners-guide)
- **2026-07-19**：DeepSeek V4（Pro + Flash，均 MIT）达到 GA。(https://www.morphllm.com/best-ai-model-for-coding — 更新注)
- **2026-07-31**：V4-Flash-0731 权重发布（与 preview 同架构同尺寸，仅重新 post-training）；官方 API model 版本更新为 DeepSeek-V4-Flash-0731。(https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/、https://api-docs.deepseek.com/quick_start/pricing/)
- **即将生效**：高峰/低谷定价（高峰 ×2），官方尚未公布生效日期 —— 对成本敏感用户需关注。(https://api-docs.deepseek.com/quick_start/pricing/)
- **定位差异**：Flash="fast, efficient, economical"（日常/量大），Pro="quality reasoning"（复杂/代码/Agent）。官方称 Flash 推理能力"closely approach V4-Pro"、简单 Agent 任务与 Pro 持平。(https://api-docs.deepseek.com/news/news260424)
- **"是否最值得"的第三方中立结论**：diyai.io 认为"Gemini 3.6 Flash 是 2026 综合性价比最高的通用模型，DeepSeek V4 Flash 是**最低可信推理成本**（lowest credible inference cost）的最优选择"；buildthisnow 称"DeepSeek V4 / MiniMax M3 用几分之一的价格完成 90% 的活"。(https://diyai.io/ai-tools/ai-model-comparison/、https://www.buildthisnow.com/blog/models/best-ai-coding-model-2026)

## 教程素材（写作时直接引用）

### 可引用的数据点
- "V4-Flash 输出 $0.28/1M 比 GPT-5.5 的 $30/1M 便宜约 90–100 倍；V4-Pro 输出 $3.48/1M 便宜约 8–9 倍。"（verdent.ai 计算，2026-07）(https://www.verdent.ai/guides/deepseek-v4-pricing-api-migration-2026)
- "V4-Flash $0.14/$0.28 比 GPT-5.5（$5/$30）和 Claude Sonnet 4.6（$3/$15）便宜 97–99%。"（costgoat）(https://www.costgoat.com/pricing/deepseek-api)
- "DeepSeek V4-Flash 是 16 家 OpenRouter 供应商中价格最低档（$0.090–$0.180 in），DeepInfra 最低 $0.090。"（pricepertoken）(https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-flash)
- "OpenRouter 显示 V4-Flash 用户实际支付均价经缓存后比挂牌价再低 60–80%。"（OpenRouter 官方）(https://openrouter.ai/deepseek/deepseek-v4-flash)
- "新开发者账号送 500 万 tokens，约合 2,500–5,000 次 API 调用，无信用卡。"（tokenmix/pricepertoken 等第三方）(https://tokenmix.ai/blog/deepseek-api-free-credits、https://deepseeksr1.com/pricing/)
- "OpenCode Go：$5 首月、之后 $10/月，含 16 个开源模型；DeepSeek V4 Flash 每次请求约 790 in / 68,000 cached / 280 out tokens。"（OpenCode 官方文档）(https://opencode.ai/docs/go/、https://opencode.ai/go)
- "单月用量示例（第三方估算，70% cache-hit）：轻用 1 万次调用约 $0.30，中等 10 万次约 $4–8，重度 100 万次约 $50–100（V4-Flash）；同样用量 GPT-5.5 API 约 $30 / $200–400 / $3,000+。"(https://deepseeksr1.com/pricing/)
- "AA 对比：V4-Flash (Reasoning, Max) 智能指数 40 高于 Claude Sonnet 4.6（36 估计）和 Claude 4.5 Sonnet（25 估计）；单价 $0.06 vs $1.54（Sonnet 5）/ $2.31（Sonnet 4.6）per 1M。"(https://artificialanalysis.ai/models/comparisons/claude-sonnet-5-vs-deepseek-v4-flash、https://artificialanalysis.ai/models/comparisons/deepseek-v4-flash-vs-claude-sonnet-4-6)

### 可引用的社区原声（必须标注来源语境）
- r/opencode 用户（2026-07，生物仿真任务）："DeepSeek V4 Flash outperformed V4 Pro and GLM 5.2 in a biological simulation task. Only DeepSeek V4 flash succeed in a few minutes and cost almost nothing (with opencode go). GLM 5.2 failed after trying for around an hour."(https://www.reddit.com/r/opencode/comments/1tu2kz4/deepseek_v4_flash_is_magical/)
- r/opencodeCLI 用户：DeepSeek V4 Flash 0731 "the undisputed price-performance leader: ~158,000 requests/month within the $60 limit, Intelligence 49.9 (just 1 point below GLM-5.2) and Agentic 45.7 – tied with Grok 4.5 and above GLM-5.2 (43.1)."(https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/)
- r/hermesagent 用户（218 票帖）："I use it for reasoning and planning... nothing I can complain about… highly recommend you guys to give it a try and save a few bucks."(https://www.reddit.com/r/hermesagent/comments/1tn69g2/deepseekv4flash_is_amazing_and_cheap_as_fk/)
- r/LocalLLaMA 用户（GA 后评测）："I have not had a single failed tool call since switching… it's extremely cheap. Load like a few $ on deepseek platform and it should last you a while."(https://www.reddit.com/r/LocalLLaMA/comments/1vbx39u/deepseek_v4_flash_ga_ranks_the_same_as_sonnet_5/)
- r/opencode 用户（改用 Flash 的体验）："I know the other models seem to do better in benchmark testing but in experience with my workflow I have not seen much of a difference to justify the higher cost."(https://www.reddit.com/r/opencode/comments/1uoyxvx/deepseekv4flash_is_more_than_enough_i_dont_feel/)
- r/LocalLLaMA 用户（质疑帖，212 票）："I wanted to love deepseek v4 flash but it just had way higher hallucination rate. Glm just works."(https://www.reddit.com/r/LocalLLaMA/comments/1vbidxt/the_official_release_deepseek_v4_flash_is_live_on/)
- r/opencodeCLI 用户（负面）："It looks for ways to cheat and then just ships incomplete work… It's lucky it's dirt cheap as it's not good… not trustworthy to leave on its own."(https://www.reddit.com/r/opencodeCLI/comments/1u0qwj8/deepseek_v4_flash_feels_like_illegal_what_do_you/)
- r/LocalLLaMA 用户（语言问题）："I had a test session where it switched back to Chinese output three times on me despite my explicit request for output to only be in English."(https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official/)
- r/opencodeCLI 用户：Flash "exceptionally bad at Swift"；r/LocalLLaMA 用户：Flash "is slow"（多帖提及）。(https://www.reddit.com/r/opencodeCLI/comments/1svmgla/deepseek_v4_flash_is_a_monster_cheap_good_and_so/、https://www.reddit.com/r/opencode/comments/1uoyxvx/deepseekv4flash_is_more_than_enough_i_dont_feel/)
- r/DeepSeek 用户（OpenCode Go 性价比争论帖，181 票）："OpenCode Go is cheaper than DeepSeek API" —— 帖子内有多方算账：对 Flash 直连 API 可能更省，对 Pro/多模型 Go 更划算；有用户"用官方 DeepSeek 直连 API 花费在 2-3 小时内约 $2（OpenRouter，低缓存命中）"。(https://www.reddit.com/r/DeepSeek/comments/1uyvmp4/the_opencode_go_is_cheaper_than_deepseek_api/、https://www.reddit.com/r/hermesagent/comments/1tn69g2/deepseekv4flash_is_amazing_and_cheap_as_fk/)

### "谁适合用 DeepSeek"（第三方建议，写作时需标注立场）
- 适合：预算敏感的个人与开发者、学生；高吞吐量任务（分类/抽取/摘要/代码补全）；自托管/数据不出域需求；作为"全家桶"里的执行层模型（Flash 执行 + Pro/GPT 审查的常见组合，多帖佐证）。
- 不适合/慎用：答案必须一次就对的高风险场景（医疗/法律/金融建议）——幻觉率高；需要纯英文稳定输出；Swift 等薄弱语言；把 Agent 丢着不管的自动化。
- 来源：https://diyai.io/ai-tools/ai-model-comparison/、https://www.buildthisnow.com/blog/models/best-ai-coding-model-2026、https://thomas-wiegold.com/blog/deepseek-v4-review/、https://www.costgoat.com/pricing/deepseek-api

### 免费入口操作要点（可写成步骤）
- 网页版：打开 chat.deepseek.com → 邮箱/手机号/Google 注册（Google 登录可跳过短信验证）→ 顶部切换 Instant（V4-Flash）/ Expert（V4-Pro）/ DeepThink / Vision 模式。网页版无公开固定的每日消息上限，高峰时段有软限速（第三方，2026-04 时点）。(https://deepseekai.guide/guides/deepseek-sign-up/、https://deepseekai.guide/guides/deepseek-online/)
- API：platform.deepseek.com 注册 → 领 500 万免费 tokens（无需信用卡）→ 生成 API key → 填写到任意 OpenAI/Anthropic 兼容工具。旧模型名 deepseek-chat/deepseek-reasoner 已退役（2026-07-24），用 deepseek-v4-flash / deepseek-v4-pro。(https://pricepertoken.com/endpoints/deepseek/free、https://api-docs.deepseek.com/news/news260424)
- 订阅便宜路径：OpenCode Go $5 首月/$10 月，官方确认含 V4 Pro + Flash 且 5 小时窗口 $12 / 周 $30 / 月 $60 用量。(https://opencode.ai/docs/go/、https://opencode.ai/go、https://www.seerofsouls.com/opencode-go-review-is-the-10-month-coding-model-plan-worth-it/)

## 来源清单（完整 URL）

1. https://api-docs.deepseek.com/quick_start/pricing/ — 官方定价/规格/峰谷政策（一手）
2. https://api-docs.deepseek.com/news/news260424 — 官方 V4 Preview 发布公告（一手）
3. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter 官方挂牌价 $0.0896/$0.1792
4. https://opencode.ai/docs/go/ — OpenCode Go 官方订阅说明（$5 首月/$10 月 + Flash/Pro 每次请求 token 额度）
5. https://opencode.ai/go — OpenCode Go 落地页（模型列表与用量）
6. https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash — AA 官方评测：V4-Flash (Max) 47 分、幻觉率 94%/96%
7. https://artificialanalysis.ai/models/comparisons/claude-sonnet-5-vs-deepseek-v4-flash — AA 对比页：40 vs 53、$0.06 vs $1.54、TTFT
8. https://mashable.com/article/deepseek-v4-preview-comparison-chatgpt-claude-gemini — 主流媒体对比（GPT-5.5 $5/$30）
9. https://www.datacamp.com/blog/deepseek-v4-vs-gpt-5-5 — GPT-5.5 vs V4 对比
10. https://www.costgoat.com/pricing/deepseek-api — 97-99% 便宜结论、各家价格表
11. https://www.verdent.ai/guides/deepseek-v4-pricing-api-migration-2026 — 90-100 倍便宜计算、迁移指引
12. https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-flash — 16 家供应商价格、DeepInfra 最低
13. https://pricepertoken.com/endpoints/deepseek/free — 免费层：500 万 tokens、无信用卡
14. https://felloai.com/deepseek-pricing/ — 四层定价、75% 永久降价、免费 tokens
15. https://tokenmix.ai/blog/deepseek-api-free-credits — 500 万 tokens 细节、2,500-5,000 次调用
16. https://deepinfra.com/blog/deepseek-v4-pro-pricing-guide-2026-providers-cost-analysis — 供应商价格比较
17. https://deepseekai.guide/guides/deepseek-sign-up/ — 注册流程（email/phone/Google、免验证）
18. https://deepseekai.guide/guides/deepseek-online/ — 网页版模式说明、无固定日上限
19. https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/ — "price-performance leader"、Intelligence 49.9、自托管 40 tps
20. https://www.reddit.com/r/opencode/comments/1tu2kz4/deepseek_v4_flash_is_magical/ — 生物仿真任务胜过 Pro 与 GLM 5.2
21. https://www.reddit.com/r/opencodeCLI/comments/1svmgla/deepseek_v4_flash_is_a_monster_cheap_good_and_so/ — "monster、cheap"、Swift 弱项、GLM 变贵
22. https://www.reddit.com/r/opencode/comments/1uoyxvx/deepseekv4flash_is_more_than_enough_i_dont_feel/ — "more than enough"、基准与体验差异
23. https://www.reddit.com/r/hermesagent/comments/1tn69g2/deepseekv4flash_is_amazing_and_cheap_as_fk/ — 218 票好评、博士工作场景
24. https://www.reddit.com/r/LocalLLaMA/comments/1vbidxt/the_official_release_deepseek_v4_flash_is_live_on/ — 幻觉率质疑、GLM 对比
25. https://www.reddit.com/r/LocalLLaMA/comments/1vbx39u/deepseek_v4_flash_ga_ranks_the_same_as_sonnet_5/ — "same as Sonnet 5"（社区说法）、$40/月 30 亿 tokens（Pro）
26. https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official/ — 英文输出切回中文的反馈、Flash 迭代/Pro 不动的判断
27. https://www.reddit.com/r/LocalLLaMA/comments/1vbjdby/deepseekv4flash0731_is_going_to_cause_another/ — 订阅换算图、Qwen3.7 Flash 竞品
28. https://www.reddit.com/r/opencodeCLI/comments/1u0qwj8/deepseek_v4_flash_feels_like_illegal_what_do_you/ — "dirt cheap but not trustworthy"负面意见
29. https://www.reddit.com/r/DeepSeek/comments/1uyvmp4/the_opencode_go_is_cheaper_than_deepseek_api/ — Go vs 直连 API 算账（181 票）
30. https://www.reddit.com/r/opencode/comments/1um5bst/should_i_just_buy_deepseek_api_credits_or_is/ — "充值 $5-$10 + Go 订阅"建议
31. https://www.reddit.com/r/SillyTavernAI/comments/1t2i3mn/deepseek_v4_hallucinations/ — SillyTavern 社区幻觉讨论（面向 RP 用户）
32. https://x.com/ArtificialAnlys/status/2047735160544841953 — AA 官方 X：幻觉率 94/96%、AA-Omniscience -23
33. https://thomas-wiegold.com/blog/deepseek-v4-review/ — 独立评测：AA 幻觉率引用、V4 落后前沿 3-6 个月（技术报告自述）
34. https://www.buildthisnow.com/blog/models/best-ai-coding-model-2026 — "90% 的活、几分之一价格"、MiniMax M3 促销价
35. https://diyai.io/ai-tools/ai-model-comparison/ — "lowest credible inference cost"结论
36. https://www.voiceflow.com/blog/deepseek-vs-chatgpt — 聊天免费、MIT 开源、V4-Flash 起步价
37. https://www.morphllm.com/best-ai-model-for-coding — 2026-07-19 V4 GA、GLM-5.2 价格、各家 SWE 分数
38. https://deepseeksr1.com/pricing/ — 免费层/用量成本估算（第三方）
39. https://www.seerofsouls.com/opencode-go-review-is-the-10-month-coding-model-plan-worth-it/ — Go 用量结构 $12/$30/$60
40. https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/ — 权重 167GB、FP4、本地跑

## gaps（未核实 / 需后续确认）

- **"500 万免费 tokens"是第三方广泛报道，官网 pricing 页未直接写明**（仅 Deduction Rules 提到"granted balance"）。有一名 r/DeepSeek 用户反馈注册后"没看到免费 tokens"（https://www.reddit.com/r/DeepSeek/comments/1t7kuv0/）。建议教程写成"据多方报道/以你注册后实际到账为准"，或实测一个账号。
- **"V4-Flash GA 与 Claude Sonnet 5 同分"** 是 r/LocalLLaMA 帖标题（社区说法）；AA 官方当前对比页显示 Flash (Max) 40 vs Sonnet 5 (Max) 53，口径（reasoning/max/non-reasoning 版本、AA 版本号）不一致，写入教程时只可引社区原话并附 AA 对比页数据。
- **0731 版 Intelligence 49.9 / Agentic 45.7** 来自 r/opencode 用户转述，未见 AA 官方页面确认；AA 官方文章（发布时点）记为 Flash (Max) 47。
- **高峰/低谷定价 ×2 的具体生效日期**未公布（官网标注 "effective date subject to official announcement"），写教程时标注"即将生效、日期待定"。
- **App/网页"永久免费、无广告、无订阅"** 为第三方（deepseeksr1.com、deepseekai.guide）描述，未在官网公告中直接成文确认；官方发布公告仅说"Try it now at chat.deepseek.com via Expert Mode / Instant Mode"。
- **V4 是否已全面上网页版**：r/DeepSeek 有用户困惑（"no idea whether V4 is actually live on chat.deepseek or not"，2026-06 帖），发布公告确认提供，但具体地区/账号灰度情况未核实。
- **手机号/实名要求**：网页版可用 email 或 Google 登录（deepseekai.guide 说 Google 可跳过验证），但部分来源称 App 需手机号验证；不同地区/版本不一致，建议教程给"备选登录方式"而非单一断言。
- **DeepSeek 数据出口/合规**（数据留在中国服务器、自托管是绕开途径）为多来源提及但细节未经官方确认；对小白教程建议以"数据敏感性自评估"一句话带过。
- **V4-Pro 促销 vs 永久价格的时间线**（75% 降价 5 月 31 日后永久化）依据第三方（felloai、emergingai），官方 pricing 页现价 $0.435/$0.87 与其一致，可确认现价，历史时间线标注第三方。
- **"OpenCode Go $60 用量 = 5x 价值"**：官方 opencode.ai/go 确认 $5/$10 定价与 $60/月 额度框；但 r/DeepSeek 算账帖指出对 Flash 而言直连 API 有时更便宜、Pro 在 Go 内被按 4x 挂牌价计费（实际现金按 1/6 折算）——写教程时需平衡呈现，不能断言 Go 恒优于直连。

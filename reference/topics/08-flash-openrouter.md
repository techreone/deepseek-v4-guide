---
topic: OpenRouter 使用 DeepSeek V4 Flash
slug: flash-openrouter
category: research
updated: 2026-08-01
status: written
sources:
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://openrouter.ai/deepseek/deepseek-v4-flash-0731
  - https://openrouter.ai/provider/deepseek
  - https://openrouter.ai/deepseek
  - https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/
  - https://openrouter.ai/blog/insights/deepseek-v4-adoption/
  - https://openrouter.ai/docs/quickstart
  - https://openrouter.ai/docs/guides/overview/auth/byok
  - https://openrouter.ai/docs/use-cases/byok
  - https://openrouter.ai/docs/faq
  - https://openrouter.ai/docs/api_reference/authentication
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/guides/thinking_mode/
  - https://api-docs.deepseek.com/updates/
  - https://api-docs.deepseek.com/news/news260424/
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash
  - https://artificialanalysis.ai/models/deepseek-v4-flash
  - https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide
  - https://github.com/BerriAI/litellm/issues/27439
  - https://github.com/earendil-works/pi/issues/4055
  - https://www.typingmind.com/guide/openrouter/deepseek-v4-flash
  - https://www.reddit.com/r/openrouter/comments/1su7nuk/available_deepseekv4flash_deepseekv4pro/
  - https://www.reddit.com/r/openrouter/comments/1u8yk1b/are_deepseek_api_prices_are_much_cheaper_direct/
  - https://www.reddit.com/r/openrouter/comments/1tkqhko/is_the_free_deepseek_v4_no_longer_free/
  - https://www.reddit.com/r/opencodeCLI/comments/1u0ercn/reasoning_effort_in_deepseek_v4_how_it_works_and/
  - https://knightli.com/en/2026/05/24/codex-deepseek-config-ccx-openrouter-byok/
  - https://apidog.com/blog/how-to-use-deepseek-v4-api-for-free/
  - https://github.com/danielrosehill/Deepseek-4-Pricing-240426
---

# OpenRouter 使用 DeepSeek V4 Flash

## 核心事实（可直接入教程）

- **OpenRouter 上 V4 Flash 的确切 model slug 是 `deepseek/deepseek-v4-flash`**（0424 preview 版），另有官方 re-post-trained 版 `deepseek/deepseek-v4-flash-0731`（2026-07-31 上架）。[openrouter.ai/deepseek/deepseek-v4-flash](https://openrouter.ai/deepseek/deepseek-v4-flash)、[openrouter.ai/deepseek/deepseek-v4-flash-0731](https://openrouter.ai/deepseek/deepseek-v4-flash-0731)
- **OpenRouter 当前价格（2026-08-01 页面实测）**：`deepseek/deepseek-v4-flash` 标 $0.0896 / $0.1792 per 1M tokens（页面标注 **36% off**）；`deepseek-v4-flash-0731` 标 $0.09 / $0.18 per 1M。[openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash)、[0731 页](https://openrouter.ai/deepseek/deepseek-v4-flash-0731)。**注意与官方价对比**：DeepSeek 官方 API 价是 $0.14 / $0.28（cache miss / 输出），即 OpenRouter 目前比官方便宜约 36%。[api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- **OpenRouter 官方声称不赚模型差价（no markup）**："catalog price 就是你要付的价"，仅按量收取 **5.5% 平台费**（pay-as-you-go）。[openrouter.ai/blog](https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/)
- **支持 thinking 模式**：OpenRouter 对 V3.2 / V4 模型暴露可选 reasoning 开关——传 `"reasoning": {"enabled": true}` 开启思维链并返回推理步骤，不传则走更快更便宜的非思考模式；V4 系列还接受 `reasoning_effort`（最高 `xhigh`）。[openrouter.ai/blog](https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/)。OpenRouter 模型页描述："Reasoning efforts `high` and `xhigh` are supported; `xhigh` maps to max reasoning"。[openrouter.ai 模型页](https://openrouter.ai/deepseek/deepseek-v4-flash)
- **在 OpenRouter 配置你自己的 DeepSeek key = BYOK**：在 workspace 的 BYOK 设置里绑定 DeepSeek provider key，key 加密存储，用于所有路由到 DeepSeek 的请求；**每月前 1M 次 BYOK 请求免费，之后收 OpenRouter 正常价 5% 的费用**（从 OpenRouter credits 扣除）。[openrouter.ai/docs BYOK](https://openrouter.ai/docs/guides/overview/auth/byok)、[openrouter.ai/docs/use-cases/byok](https://openrouter.ai/docs/use-cases/byok)
- **OpenRouter API 与官方直连的取舍（OpenRouter 官方博客给的表）**：
  - 直连 DeepSeek 官方：稳定单 provider 大流量、要地板价、延迟不敏感、不想付平台费 → 直连更划算
  - 走 OpenRouter：要跨多个 provider 的故障转移（一个 slug 背后多家公司托管）、跑 agent / 长 tool-use 不能断、想改个字符串就切换模型版本、provider 质量参差时锁定已知好 host
  - 例：V4 Pro 在 OpenRouter 上由 **16 家 provider** 托管，同模型输入价差约 **4x（$0.435–$1.74/M）**、吞吐 4–57 tok/s，价格/可用性/速度不整齐。[openrouter.ai/blog](https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/)
- **DeepSeek 是 OpenRouter 上流量第一的模型作者**：截至 2026-07-13 占 16.7% token 份额，#1；V4 Flash 排名模型用量第 3、V4 Pro 第 6（工具调用榜同列）。V4 发布仅一个多月（截至 5 月底）就占 DeepSeek 在 OpenRouter agentic token 流量的 70%。[openrouter.ai/blog](https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/)、[deepseek-v4-adoption](https://openrouter.ai/blog/insights/deepseek-v4-adoption/)
- **社区实测 vs 官方直连的成本对比**：r/openrouter 用户指出官方直连在缓存命中率高时显著更便宜——官方 cache hit 输入 $0.0028/M，而 OpenRouter 对 DeepSeek 是**单一统一定价、不区分 cache hit/miss**（约 $0.09/M 平价），缓存利用率高时直连赢；OpenRouter 赢在"一个 key 管所有模型"。[reddit r/openrouter](https://www.reddit.com/r/openrouter/comments/1u8yk1b/are_deepseek_api_prices_are_much_cheaper_direct/)

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| OpenRouter model slug（0424 preview） | `deepseek/deepseek-v4-flash` | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| OpenRouter model slug（0731 官方版） | `deepseek/deepseek-v4-flash-0731`（2026-07-31 上架） | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash-0731) |
| 总参数 / 激活参数 | 284B total / 13B active（MoE） | [HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)、[openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| 上下文窗口 | 1M（1,048,576 tokens），最大输出 384,000 tokens（部分 OpenRouter 列表标 1.05M） | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash)、[danielrosehill 快照](https://github.com/danielrosehill/Deepseek-4-Pricing-240426) |
| 发布 | 2026-04-24（preview）；0731 官方版 2026-07-31 public beta | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash)、[api-docs](https://api-docs.deepseek.com/updates/) |
| OpenRouter 价格（0424 版，per 1M） | $0.0896 input / $0.1792 output（标注 36% off，2026-08-01） | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| OpenRouter 价格（0731 版，per 1M） | $0.09 / $0.18（2026-08-01 页面显示；部分快照显示 $0.14/$0.28） | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash-0731) |
| DeepSeek 官方价格（per 1M） | input cache miss $0.14 / cache hit $0.0028 / output $0.28 | [api-docs pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 官方并发上限 | V4-Flash 2,500 / V4-Pro 500 | [api-docs pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| OpenRouter 平台费 | 5.5%（按量，无模型 markup）；BYOK 用自己 key 时前 1M 请求/月免费、之后 5% | [openrouter blog](https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/)、[BYOK docs](https://openrouter.ai/docs/use-cases/byok) |
| OpenRouter 实际有效价格 | prompt caching 后平均便宜 60–80%（过去 30 天滚动） | [openrouter.ai 模型页](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| reasoning_effort 支持 | OpenRouter 接受 `high` / `xhigh`（xhigh 映射 max）；官方 API 参数为 `low/high/max`（xhigh 映射见下） | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash)、[thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode/) |
| 官方 effort 映射表（flash 实际值） | 请求 low→low、high→high、xhigh→high、max→max（pro 为 xhigh/max→max） | [api-docs thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode/) |
| 许可 | MIT License（开放权重） | [AA](https://artificialanalysis.ai/models/deepseek-v4-flash)、[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide) |
| 输入/输出模态 | 仅文本（text only，非多模态、不支持图像输入） | [AA](https://artificialanalysis.ai/models/deepseek-v4-flash) |
| 独立智能评分 | AA Intelligence Index v4.1 = **50**（0731, Reasoning Max，同类开源中位 25）；评测产生 210M 输出 token（中位 100M，偏啰嗦） | [AA](https://artificialanalysis.ai/models/deepseek-v4-flash) |
| 成本示例 | $1 官方直连 ≈ 700 万 input token（按 $0.14/M）；AA 混合率 7:2:1（cache hit/input/output）下 $0.06/M | [apidog](https://apidog.com/blog/how-to-use-deepseek-v4-api-for-free/)、[AA](https://artificialanalysis.ai/models/deepseek-v4-flash) |

### 0731 官方 agentic 基准（DeepSeek 自测，2026-07-31 changelog，vendor 数据）

| 基准 | 0731 分数 | 备注 | 来源 |
|------|-----------|------|------|
| Terminal-Bench 2.1 | 82.7 | 高于 Kimi K3 发布时的 76.1 | [changelog](https://api-docs.deepseek.com/updates/)、[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide) |
| DeepSWE | 54.4 | | [changelog](https://api-docs.deepseek.com/updates/) |
| Toolathlon (verified) | 70.3 | | [changelog](https://api-docs.deepseek.com/updates/) |
| Cybergym | 76.7 | | [changelog](https://api-docs.deepseek.com/updates/) |
| NL2Repo | 54.2 | | [changelog](https://api-docs.deepseek.com/updates/) |
| Agent Last Exam | 25.2 | | [changelog](https://api-docs.deepseek.com/updates/) |
| Automation Bench (Public) | 25.1 | | [changelog](https://api-docs.deepseek.com/updates/) |
| DSBench-FullStack（内部） | 68.7 | | [changelog](https://api-docs.deepseek.com/updates/) |
| DSBench-Hard（内部） | 59.6 | | [changelog](https://api-docs.deepseek.com/updates/) |

官方说明：公开 Code Agent 基准用 DeepSeek Harness minimal mode（未开源）、max effort、top_p=0.95、temperature=1.0 测试；0731 与 preview **同架构同大小、仅 re-post-training**；升级只作用于 Flash API，V4-Pro API 不变。[api-docs updates](https://api-docs.deepseek.com/updates/)

## 关键差异 / 时间线

- **2026-04-24**：DeepSeek 发布 V4 Preview（Flash + Pro），同日上架 OpenRouter（`deepseek/deepseek-v4-flash`）；当时 OpenRouter 与官方价持平（cache-miss 平价，1.05M vs 1M context 略大）。[news260424](https://api-docs.deepseek.com/news/news260424/)、[danielrosehill 快照](https://github.com/danielrosehill/Deepseek-4-Pricing-240426)
- **2026-07-13**：OpenRouter 博客确认 DeepSeek 为平台 #1 token 份额（16.7%）；V4 Pro 由 16 家 provider 托管、价差 4x。[openrouter blog](https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/)
- **2026-07-24**：官方旧别名 `deepseek-chat` / `deepseek-reasoner` 退役，期间它们分别路由到 V4-Flash 非思考/思考模式。[api-docs updates](https://api-docs.deepseek.com/updates/)
- **2026-07-31**：DeepSeek 官方发布 V4-Flash-0731（API public beta，原生支持 Responses API、适配 Codex）；OpenRouter 上架 `deepseek/deepseek-v4-flash-0731`（当时仅 2 家 provider 托管；只有 DeepSeek provider 有官方 0731 版，其余 provider 仍是 0424 版）。[api-docs updates](https://api-docs.deepseek.com/updates/)、[zenmux](https://zenmux.ai/deepseek/deepseek-v4-flash)
- **2026-08-01（今天）**：OpenRouter 对 0424 版显示 36% off（$0.0896/$0.1792），0731 版 $0.09/$0.18 —— 均低于官方 $0.14/$0.28（OpenRouter 促销折价，非官方调价）。[openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash)、[0731](https://openrouter.ai/deepseek/deepseek-v4-flash-0731)
- **差异：官方直连有 cache hit 折扣（$0.0028 vs $0.14，98% off），OpenRouter 对 DeepSeek 是平价的单一价格（不单独列 cache-hit 档）**——高缓存利用率的应用直连更省。[reddit](https://www.reddit.com/r/openrouter/comments/1u8yk1b/are_deepseek_api_prices_are_much_cheaper_direct/)
- **差异：reasoning_effort 取值**——官方 API 用 `high`/`max`（文档承认 `xhigh` 别名并映射）；OpenRouter 的归一化 reasoning API 直接接受 `xhigh`、而**传 `max` 会被忽略/回退默认**（社区 bug 报告）。[pi issue #4055](https://github.com/earendil-works/pi/issues/4055)、[litellm issue #27439](https://github.com/BerriAI/litellm/issues/27439)
- **即将变化**：DeepSeek 官方将推出峰谷定价（高峰 9:00–12:00、14:00–18:00 北京时间，2x 价格，生效日期待公告）；Responses API 支持 V4-Pro 将在 2026 年 8 月初补齐。[api-docs pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- **免费变体**：`deepseek/deepseek-v4-flash:free` 曾存在（支持 reasoning），但社区反映不稳定（大量 429 限流、经常 down）。OpenRouter FAQ：free 指带 `:free` 后缀的模型、有速率限制，不是无限。[reddit](https://www.reddit.com/r/openrouter/comments/1tkqhko/is_the_free_deepseek_v4_no_longer_free/)、[openrouter FAQ](https://openrouter.ai/docs/faq)

## 教程素材（写作时直接引用）

### 配置 / 使用步骤（OpenRouter 路线）

1. 注册 openrouter.ai → dashboard 创建 API key（`sk-or-v1-...`）→ 充值 credits（typingmind 指南：$5 起充、$20 推荐，credits 不过期；注册送 $1 体验金）。
   [typingmind 指南](https://www.typingmind.com/guide/openrouter/deepseek-v4-flash)
2. 调用时只需把 OpenAI SDK 的 base_url 换成 `https://openrouter.ai/api/v1`、model 填 `deepseek/deepseek-v4-flash`，其余不变（OpenAI 兼容；也支持 Anthropic Messages / Responses 格式）。[openrouter docs](https://openrouter.ai/docs/quickstart)
3. 可选：把 DeepSeek 官方 key 绑进 OpenRouter BYOK（workspace → BYOK → DeepSeek），前 1M 请求/月免费、之后 5% 费；可用 prioritized / backup 分区管理。[BYOK docs](https://openrouter.ai/docs/guides/overview/auth/byok)
4. 可靠性增强：provider 对象里 `sort: 'throughput'`（要速度）或 `sort: 'price'`（要便宜）、`max_price` 设成本上限、`order/only/ignore` 锁定或排除 provider、`quantizations` 过滤差量化端点；长会话传 `session_id` 开启 sticky routing；`models: [...]` 数组做模型级 fallback。[openrouter blog](https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/)

### curl 示例（OpenRouter）

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek/deepseek-v4-flash",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ]
  }'
```
（基础调用格式来自 [openrouter quickstart](https://openrouter.ai/docs/quickstart)；换模型只需改 `model` 字段。可选加 `"reasoning": {"enabled": true}` 开思考模式 / `"reasoning_effort": "xhigh"` 拉满推理，见 [openrouter blog](https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/)。）

### Python（OpenAI SDK 直连 OpenRouter）

```python
from openai import OpenAI
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="sk-or-v1-...",   # OPENROUTER_API_KEY
)
resp = client.chat.completions.create(
    model="deepseek/deepseek-v4-flash",
    messages=[{"role": "user", "content": "Hello"}],
    extra_headers={"HTTP-Referer": "https://your-site.com", "X-Title": "Your App"},  # 可选，用于排名
)
print(resp.choices[0].message.content)
```
[openrouter API 认证文档](https://openrouter.ai/docs/api_reference/authentication)

### Python（DeepSeek 官方 API 直连，对照组）

```python
from openai import OpenAI
client = OpenAI(api_key="<DeepSeek API Key>", base_url="https://api.deepseek.com")
resp = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Hello"}],
    reasoning_effort="max",
    extra_body={"thinking": {"type": "enabled"}},
)
# 思维链在 resp.choices[0].message.reasoning_content
```
[api-docs 首页](https://api-docs.deepseek.com/)、[thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode/)

### 官方直连 vs OpenRouter 对照（可写进教程的"取舍"段落）

| 维度 | DeepSeek 官方直连 | OpenRouter |
|------|------------------|------------|
| Base URL | https://api.deepseek.com | https://openrouter.ai/api/v1 |
| model 名 | `deepseek-v4-flash` | `deepseek/deepseek-v4-flash` |
| 价格（per 1M） | $0.14 in / $0.28 out；cache hit $0.0028 | $0.0896 / $0.1792（36% off，2026-08-01）；平价、不单列 cache 档 |
| 平台费 | 无 | 5.5% 按量；BYOK 前 1M 请求/月免费后 5% |
| 优点 | 地板价、cache 折扣、2500 并发 | 一个 key 多模型、故障转移、零完成保险（失败不收费）、锁定 provider、改字符串切版本 |
| 缺点 | 单一 provider、无故障转移、海外延迟 | 平价的 cache 定价对高缓存应用不友好、有平台费 |

来源：[api-docs pricing](https://api-docs.deepseek.com/quick_start/pricing/)、[openrouter blog](https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/)、[reddit 对比](https://www.reddit.com/r/openrouter/comments/1u8yk1b/are_deepseek_api_prices_are_much_cheaper_direct/)

### 可引用的句子 / 数据点

- "A typical conversation might cost $0.01-0.10 depending on length."（typingmind 指南，第三方）[typingmind](https://www.typingmind.com/guide/openrouter/deepseek-v4-flash)
- "DeepSeek V4 Flash, on the cheapest endpoint, costs $0.09 input / $0.18 output per million tokens."（OpenRouter 官方博客）[openrouter blog](https://openrouter.ai/blog/insights/deepseek-v4-adoption/)
- "$1 covers roughly 7 million input tokens on V4-Flash."（apidog，按官方 $0.14/M 计算）[apidog](https://apidog.com/blog/how-to-use-deepseek-v4-api-for-free/)
- 0731 版 "DeepSWE from 7.3 → 54.4"；Terminal-Bench 2.1 82.7 超过 Kimi K3 的 76.1（第三方报道，vendor 基准）[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)
- AA 实测：0731 (Reasoning, Max) Intelligence Index 50；但"非常啰嗦"——II 评测产生 210M 输出 token vs 中位 100M，真实成本高于单价暗示（AA 独立数据）[AA](https://artificialanalysis.ai/models/deepseek-v4-flash)
- OpenRouter 对 V4 Flash 有免费变体 `deepseek/deepseek-v4-flash:free`，但可靠性差（429 / downtime 被社区多次吐槽）[reddit](https://www.reddit.com/r/openrouter/comments/1tkqhko/is_the_free_deepseek_v4_no_longer_free/)
- 每个 OpenRouter 调用建议带 `HTTP-Referer` / `X-Title` 头部（用于平台应用排名，可选）[openrouter docs](https://openrouter.ai/docs/api_reference/authentication)

## 来源清单（完整 URL，全部列出）

1. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter 模型页：slug、价格（36% off）、规格、reasoning_effort 支持
2. https://openrouter.ai/deepseek/deepseek-v4-flash-0731 — OpenRouter 0731 变体页：slug、价格、发布日期、provider 数
3. https://openrouter.ai/provider/deepseek — OpenRouter DeepSeek provider 页：模型描述、价格
4. https://openrouter.ai/deepseek — OpenRouter DeepSeek hub：模型列表、价格快照
5. https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/ — 官方"直连 vs 路由"分析：5.5% 平台费、16 provider、routing 控制、reasoning toggle
6. https://openrouter.ai/blog/insights/deepseek-v4-adoption/ — 官方数据：V4 Flash 占 agentic token 流量 70%、$0.09/$0.18 最便宜端点
7. https://openrouter.ai/docs/quickstart — curl 基础调用示例
8. https://openrouter.ai/docs/guides/overview/auth/byok — BYOK 机制：加密 key、优先/备用分区、费率
9. https://openrouter.ai/docs/use-cases/byok — BYOK：5% 费、前 1M 请求/月免费
10. https://openrouter.ai/docs/faq — FAQ：free 模型含义、BYOK 费
11. https://openrouter.ai/docs/api_reference/authentication — API 认证、SDK 示例、HTTP-Referer
12. https://api-docs.deepseek.com/quick_start/pricing/ — 官方定价表：$0.14/$0.28/$0.0028、并发、峰谷政策、base_url
13. https://api-docs.deepseek.com/guides/thinking_mode/ — thinking 开关与 effort 映射表（flash vs pro）
14. https://api-docs.deepseek.com/updates/ — 0731 changelog：9 项 agent 基准、Responses API、旧别名退役时间
15. https://api-docs.deepseek.com/news/news260424/ — V4 preview 发布说明
16. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash — 官方 model card：架构、规格、preview 基准
17. https://artificialanalysis.ai/models/deepseek-v4-flash — 独立评测：II=50、$0.14/$0.28、210M token 啰嗦度、MIT
18. https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide — 第三方 0731 解读：Terminal-Bench 82.7 vs K3 76.1、OpenCode 用法
19. https://github.com/BerriAI/litellm/issues/27439 — reasoning_effort 经 OpenRouter 可能不通透（litellm issue）
20. https://github.com/earendil-works/pi/issues/4055 — OpenRouter 接受 xhigh、拒绝 max（pi issue，社区实证）
21. https://www.typingmind.com/guide/openrouter/deepseek-v4-flash — 第三方配置指南：注册、API key、credits、费用问答
22. https://www.reddit.com/r/openrouter/comments/1su7nuk/available_deepseekv4flash_deepseekv4pro/ — 社区确认上架与实用反馈（Cline BYOK、tool calling）
23. https://www.reddit.com/r/openrouter/comments/1u8yk1b/are_deepseek_api_prices_are_much_cheaper_direct/ — 缓存定价对比：直连 cache hit 便宜 vs OpenRouter 平价
24. https://www.reddit.com/r/openrouter/comments/1tkqhko/is_the_free_deepseek_v4_no_longer_free/ — free 变体稳定性问题
25. https://www.reddit.com/r/opencodeCLI/comments/1u0ercn/reasoning_effort_in_deepseek_v4_how_it_works_and/ — reasoning_effort 行为机制（首条消息生效、max 注入文本、agent 请求自动 max）
26. https://knightli.com/en/2026/05/24/codex-deepseek-config-ccx-openrouter-byok/ — Codex + OpenRouter BYOK 配置教程
27. https://apidog.com/blog/how-to-use-deepseek-v4-api-for-free/ — 免费路径、$1≈700 万 input token、$2 官方最低充值
28. https://github.com/danielrosehill/Deepseek-4-Pricing-240426 — 2026-04-24 价格快照：OpenRouter 与官方 cache-miss 平价、1.05M context

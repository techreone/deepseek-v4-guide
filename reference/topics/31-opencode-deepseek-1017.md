---
topic: OpenCode 上的 DeepSeek（Zen / Go）与 1017 是否已生效
slug: opencode-deepseek-1017
category: integration
updated: 2026-10-18
status: research
sources:
  - https://opencode.ai/docs/zen/
  - https://opencode.ai/docs/go/
  - https://opencode.ai/docs/providers/
  - https://opencode.ai/data/deepseek
  - https://opencode.ai/data/deepseek/deepseek-v4-1-flash
  - https://opencode.ai/data/deepseek/deepseek-v4-flash
  - https://www.deepseek.com/en/news/deepseek-v4-1-flash/
  - https://explainx.ai/blog/opencode-deepseek-v4-1-flash-free-zen-go-limits-what-is-verified-2026
  - https://github.com/anomalyco/opencode/issues/43805
  - https://www.reddit.com/r/opencode/comments/1x83wt3/deepseek_v41_flash_1017_is_silently_rolling_out/
  - https://www.reddit.com/r/opencode/comments/1ve41bk/can_anyone_tell_me_whether_opencode_zen_has/
---

# OpenCode × DeepSeek：Zen / Go 现状与 1017 可用性

## 一句话
OpenCode 是 **DeepSeek 官方点名的合作伙伴**（9 月 V4.1-Flash 发布时与 WorkBuddy/CodeBuddy 并列）；它把 DeepSeek 放在 **Zen（按量付费）** 与 **Go（$10/月订阅）** 两个商业面上。**1017 是否已进 OpenCode 的自托管端点，官方没有明说** —— 但经由 DeepSeek 官方 API 的路径已经自动是 1017。

## OpenCode 两个面（别混）
### Zen（Console，按量付费）
- 模型 id：**`deepseek-v4.1-flash`**
- 端点：`https://opencode.ai/inference/v1/chat/completions`，AI SDK 包 `@ai-sdk/openai-compatible`
- 价格：**$0.30 / 1M 输入、$1.20 / 1M 输出、$0.006 cached read**（与 DeepSeek 自家 peak 价一致，OpenCode 自称"按成本价卖，只加手续费"）
- ⚠️ **免费档存在与否有两个矛盾快照（2026-10-18 实测）**：Zen **定价表**的免费清单里**没有** DeepSeek 条目（免费清单只剩 Big Pickle / Space Bunny / Cat Jam / LongCat 2.5 Preview / Step 5 Preview / Exo / MiMo ×2 / Nemotron ×2 / Muse Spark Contributor / Jev）；但**实时模型清单端点** `GET https://opencode.ai/inference/v1/models` **仍返回 `deepseek-v4.1-flash-free`**（85 个模型里 4 个 deepseek 条目之一）。→ 结论口径：**促销档是"在的但随时会没"**，不要断言已下架，也不要把"文档里没有"当成事实；以用户自己的 Console picker 为准。前例：`deepseek-v4-flash-free` 促销结束后从 picker 消失（anomalyco/opencode#43805，维护者称 intentional）
- Zen 端点（官方文档表格口径）：**`https://opencode.ai/inference/v1/chat/completions`**（模型清单 `.../inference/v1/models`）；`/inference/openai/v1/chat/completions` 也存在（实测两者未鉴权均返 401），但文档列的是前者

### Go（订阅）
- $10/月（Go Plus $40）；用量按**月额度美元数**算，分 5 小时窗口（20%）、周窗口（50%）、月上限
- **DeepSeek V4.1 Flash 月额度：Go = $80，Go Plus = $160**
- Token 价：**off-peak $0.15 输入 / $0.60 输出**，peak 翻倍
- OpenCode 自估典型 coding-agent 流量 ≈ **34,670 请求/5h、86,670/周、173,330/月**（$10 档）
- Go 页只有 3 个模型标"free"（LongCat 2.5 Preview Free / Step 5 Preview Free / Cat Jam Free）；**V4.1 Flash 在 Go 上算付费**，只是额度很大
- Go 要求客户端带稳定 `x-opencode-session` 头（路由 + 缓存用）；官方验证过的第三方客户端含 Claude Code / Codex / Hermes

## 1017 在 OpenCode 上是否生效（如实口径）
**已确认**
- DeepSeek 官方 API（`api.deepseek.com`）的 `deepseek-flash` **已经是 1017**，任何直连 DeepSeek 的配置（含 OpenCode 里 `/connect` 选 **DeepSeek** 官方 provider）自动拿到 1017
- OpenCode 是官方合作方；官方发布稿点名 OpenCode 全面支持 V4.1-Flash
- OpenCode providers 文档给出的接入流程：`/connect` → 选 DeepSeek → 粘 key → `/models`

**未确认（不要写成结论）**
- OpenCode **Zen 自托管端点**背后的权重是否已换到 1017 —— **官方无公告**；社区有人观察到"silently rolling out"、`system_fingerprint` 变化，但这只能说明**服务端配置变了**，不等于权重替换
- 因此正确说法是：**"经 DeepSeek 官方 API 走 OpenCode = 已是 1017；经 OpenCode Zen/Go 自有端点 = 待官方确认，可用 fingerprint / 实测对比自证"**

## OpenCode 侧使用数据（可用于"为什么值得关注"）
- OpenCode data 页：**DeepSeek V4.1 Flash 是 OpenCode 用量第 1 名**，占近两月观测 token 的 **20%**，累计 **196T tokens**、$2.5M 花费、**cache ratio 97%**、平均 $0.07/会话
- 旧 **DeepSeek V4 Flash**（`deepseek-v4-flash`，4 月发布）排名 #7/#8，**-53% 下滑**，10-14→10-16 日用量从 306B 掉到 150B（与 10-15 宕机、旧名退役叠加吻合）
- OpenCode 上 21 个 DeepSeek 模型在列

## 写作避坑
- 别把 "OpenCode 把 V4.1 Flash 做成免费" 当成 Go 也免费 —— **免费只在 Zen 的 free 端点**
- 别断言 OpenCode Zen 已上 1017；**用"官方 API 已自动生效 / Zen 端点待确认"的两段式口径**
- 免费档无结束日期 = **试用不是方案**，务必建议配 paid fallback（前例：`deepseek-v4-flash-free` 促销结束后从 picker 消失，见 anomalyco/opencode#43805）

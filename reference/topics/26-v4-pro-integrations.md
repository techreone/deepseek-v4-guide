---
topic: DeepSeek V4 Pro 0813 第三方接入与模型对比
slug: v4-pro-integrations
category: integration
updated: 2026-08-16
status: research
sources:
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/guides/responses_api/
  - https://api-docs.deepseek.com/guides/anthropic_api/
  - https://api-docs.deepseek.com/quick_start/
  - https://openrouter.ai/api/v1/models
  - https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/
  - https://www.cometapi.com/how-to-use-deepseek-v4-pro-api/
  - https://benchlm.ai/compare/deepseek-v4-pro-vs-gpt-5.5
  - https://atoms.dev/blog/deepseek-harness
---

# DeepSeek V4 Pro 0813：第三方接入与模型对比（2026-08-16）

## 1. OpenRouter

来源：openrouter.ai/api/v1/models（2026-08-16 抓取）

| OpenRouter 模型 ID | 上下文 | prompt/M | completion/M | 备注 |
|---|---|---|---|---|
| `deepseek/deepseek-v4-pro-0813` | 1M | $0.435 | $0.87 | **GA 新条目**（created 2026-08-13），cache read $0.003625/M |
| `deepseek/deepseek-v4-pro` | 1M | $1.168 | $2.336 | 旧 preview 条目（created 2026-04），价格仍为 preview 期 |
| `deepseek/deepseek-v4-flash` | 1M | $0.06146 | $0.12292 | Flash 常规价 |
| `deepseek/deepseek-v4-flash-0731` | 1M | $0.14 | $0.28 | 0731 checkpoint 条目 |
| `~deepseek/deepseek-v4-flash-latest` | 1M | $0.0603 | $0.1206 | 最新跟随条目 |

要点：GA 后 OpenRouter 新增 `deepseek-v4-pro-0813` 条目，价格 = 官方旧价（$0.435/$0.87）；旧 preview 条目仍在（高价 $1.168/$2.336）。8/16 峰谷新价 OpenRouter 尚未同步（待观察）。BYOK（bring-your-own-key）在 OpenRouter 一贯支持，0813 条目同样适用。

## 2. 第三方接入（官方文档 api-docs.deepseek.com）

**统一接入参数**（Quick Start）：
- base_url（OpenAI 格式）：`https://api.deepseek.com`
- base_url（Anthropic 格式）：`https://api.deepseek.com/anthropic`
- model：`deepseek-v4-pro`（0813 后直接解析到新 checkpoint，调用方式不变）；`deepseek-v4-flash` → 0731

**原生 OpenAI Responses API（8/13 新增）**：
- 为满足 Codex 需求新增；base_url 仍是 `https://api.deepseek.com`
- openai SDK：`client.responses.create(model="deepseek-v4-pro", instructions=..., input=...)`
- streaming：SSE 事件流（response.created → response.completed），**无 `data: [DONE]`**
- Codex 一键配置（官方 "Integrate with Codex" 指南）

**Anthropic API 兼容（Claude Code）**：
- 环境变量：`ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic` + `ANTHROPIC_API_KEY`
- 示例：`client.messages.create(model="deepseek-v4-pro", ...)`（anthropic SDK）
- **Claude 模型名自动映射**：`claude-opus*` → `deepseek-v4-pro`；`claude-haiku*` 或（文档截断，至少 opus→pro）；**不支持的模型名自动映射到 `deepseek-v4-flash`**
- 官方确认：Claude Code / GitHub Copilot / OpenCode 可直接用 DeepSeek 作后端，无需代码改动

**Chat API 新增参数**：`"thinking": {"type": "enabled"}`（thinking mode 切换）+ reasoning effort（low/high/max）

## 3. vs V4 Flash（官方 pricing 表，2026-08-16 抓取）

当前价（8/16 16:00 UTC 前）：
| | v4-pro | v4-flash |
|---|---|---|
| 输入 cache miss | $0.435/M | $0.14/M |
| 输入 cache hit | $0.003625/M | $0.0028/M |
| 输出 | $0.87/M | $0.28/M |
| 并发 | 500 | 2500 |

**8/16 16:00 UTC 起峰谷新价**（peak：01:00-04:00 与 06:00-10:00 UTC，其余 off-peak）：
| | v4-pro off-peak | v4-pro peak | v4-flash off-peak | v4-flash peak |
|---|---|---|---|---|
| 输入 hit | $0.022 | $0.044 | $0.007 | $0.014 |
| 输入 miss | $0.66 | $1.32 | $0.22 | $0.44 |
| 输出 | $1.98 | $3.96 | $0.66 | $1.32 |

⚠️ **实质涨价**：v4-pro 输出 off-peak $1.98 vs 旧 $0.87（+128%）；peak $3.96（+355%）。"1100% price hike" 传闻夸大，但涨幅显著。

能力：Pro 1.6T/49B active；Flash 284B/13B。SWE-bench Verified：Pro 96.40% vs Flash 88.80%（Codersera/Vals AI 第三方）。Flash 并发 2500 vs Pro 500。reasoning effort 两者都有（low/high/max）。

## 4. vs GPT-5.5 / Claude / Gemini

**BenchLM（2026-08-15 更新，共享 11 个 benchmark）**：
- 综合分：V4 Pro 0813 = 61.2/100（rank #53）vs GPT-5.5 = 73.4/100（rank #11）
- GPQA Knowledge：90.1% vs 93.6%
- SWE-bench Pro Coding：55.4% vs 58.6%
- BrowseComp Agentic：83.4% vs 84.4%

**Codersera / Vals AI（SWE-bench Verified，第三方中性 harness）**：
- Claude Opus 5：97.00%（$1.29/test）
- **DeepSeek V4-Pro-0813：96.40% ±0.83（$0.022/test）**——#2，成本约 1/59 of Opus 5、1/36 of Grok 4.6
- GPT-5.6 Sol：96.20%
- Grok 4.6：95.60%（$0.785/test）
- DeepSeek V4-Flash-0731：88.80%（$0.010/test）

**Agentic coding 争议**：
- 官方自称 Terminal-Bench 2.1 = 87.9%（自家 Harness minimal mode，该 harness 当时未发布）
- Vals 用 Terminus 2 参考 harness 实测 = 54.68%（33 分差距）
- 结论素材：patch-style 编码近前沿（SWE-bench #2），端到端 agentic 仍落后闭源旗舰

**Artificial Analysis**（CometAPI 引用）：Intelligence Index 53（对比开源中位 27）；77.6 tokens/s；1.71s TTFT。

## 5. + DeepSeek Harness 组合

- 官方（api-docs Quick Start）明确：**"DeepSeek Harness is now in developer preview... See the DeepSeek Harness Guide for details."**——Harness 与 API 同源官方生态
- Harness 官方架构（deepseek.com/harness/en/）：models 是插件，**可在配置中替换/组合任意模型**——V4 Pro 是默认/推荐搭配（官方 benchmark 即 V4-Pro + Harness minimal mode）
- 实测（atoms.dev，@deepseek-ai/dsh 0.1.0-rc.6，2026-08-14）：
  - `npx @deepseek-ai/dsh web` → 本地 UI `http://127.0.0.1:3080`
  - **默认模型路由走 DeepSeek API（需 API key，非本地推理）**
  - 首次运行 onboarding：填 DeepSeek API key → 工作区/model/preset/会话控制
  - Node 要求 ^22.19.0 或 >=24.0.0；安装 531 npm 包
- 组合用法页面素材：V4 Pro（强推理）+ Harness（agent 运行时）= 官方旗舰 agent 组合；第三方模型也可 plug-in（不绑模型）

## 适合独立页面的主题建议

1. **deepseek v4 pro openrouter**（0813 条目/价格/BYOK）
2. **deepseek v4 pro responses api**（Codex 一键接入 + SSE 事件流）
3. **deepseek v4 pro surge pricing**（峰谷价表 + 何时调用最省）
4. **deepseek v4 pro vs gpt-5.5**（BenchLM + SWE-bench 双数据源）
5. **deepseek v4 pro harness**（官方 agent 组合用法）

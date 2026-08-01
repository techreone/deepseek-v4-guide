---
topic: OpenCode 接入 DeepSeek V4 Flash
slug: flash-opencode
category: research
updated: 2026-08-01
status: written
sources:
  - https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/
  - https://api-docs.deepseek.com/guides/coding_agents/
  - https://api-docs.deepseek.com/guides/anthropic_api/
  - https://api-docs.deepseek.com/news/news260424/
  - https://github.com/deepseek-ai/awesome-deepseek-agent
  - https://opencode.ai/docs/go/
  - https://opencode.ai/go
  - https://opencode.ai/docs/providers/
  - https://opencode.ai/docs/config/
  - https://openrouter.ai/deepseek/deepseek-v4-flash
  - https://haimaker.ai/blog/deepseek-opencode-setup/
  - https://www.aimadetools.com/blog/deepseek-v4-opencode-setup/
  - https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide
  - https://docs.bswen.com/blog/2026-04-26-deepseek-v4-flash-opencode-setup/
  - https://deepseekv4.wiki/en/tutorials/deepseek-v4-opencode-integration
  - https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/
  - https://therouter.ai/news/deepseek-awesome-agent-claude-code-copilot-opencode-routing/
  - https://pi.dev/models/opencode/deepseek-v4-flash
  - https://pi.dev/models/opencode-go/deepseek-v4-flash
  - https://artificialanalysis.ai/models/deepseek-v4-flash
  - https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/
  - https://www.reddit.com/r/opencode/comments/1tu2kz4/deepseek_v4_flash_is_magical/
  - https://www.reddit.com/r/opencodeCLI/comments/1twlwxc/deepseek_v4_flash_direct_api_i_cant_hit_a_limit/
  - https://github.com/anomalyco/opencode/issues/28846
  - https://techjacksolutions.com/ai-tools/deepseek/deepseek-v4-coding-and-agentic-workflows/
  - https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/
---

# OpenCode 接入 DeepSeek V4 Flash

## 核心事实（可直接入教程）

- DeepSeek 官方宣布 V4 与 Claude Code、OpenClaw、OpenCode「无缝集成」，且 V4 已经在驱动 DeepSeek 内部自身的 agentic coding 工作流（[api-docs.deepseek.com/news/news260424/](https://api-docs.deepseek.com/news/news260424/)）。官方说明：「Keep base_url, just update model to deepseek-v4-pro or deepseek-v4-flash」，同时支持 OpenAI ChatCompletions 与 Anthropic 两种 API 格式。
- 官方 OpenCode 接入方式是**内置 /connect 流程，无需手写配置**：`opencode` → 输入 `/connect` → 输入 `deepseek` 选择 provider → 粘贴 [DeepSeek API Key](https://platform.deepseek.com/api_keys) → 选择 DeepSeek-V4-Pro 模型。要求 OpenCode 版本 **>= v1.14.24**（[api-docs.deepseek.com/quick_start/agent_integrations/opencode/](https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/)；官方 [awesome-deepseek-agent/docs/opencode.md](https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/opencode.md) 内容一致）。
- 手动配置路径：在 `opencode.json`（项目根目录）或 `~/.config/opencode/`（全局）写 provider 块，用 `@ai-sdk/openai-compatible` + `baseURL: https://api.deepseek.com/v1`，models 键必须与 API 接受的 model id 完全一致：`deepseek-v4-flash`（和 `deepseek-v4-pro`）（[haimaker.ai](https://haimaker.ai/blog/deepseek-opencode-setup/)）。
- **模型 id 用 `deepseek-v4-flash`，不是** `deepseek-v4` / `deepseek-flash` / 旧的 `deepseek-chat` / `deepseek-reasoner`。旧名 deepseek-chat / deepseek-reasoner 在 **2026-07-24 后停用**（此前向后兼容映射到 V4 Flash 的 non-thinking / thinking 模式）（[haimaker.ai](https://haimaker.ai/blog/deepseek-opencode-setup/)；[therouter.ai](https://therouter.ai/news/deepseek-awesome-agent-claude-code-copilot-opencode-routing/)）。
- `deepseek-v4-flash` 的 API 已于 2026-07-31 升级为 **DeepSeek-V4-Flash-0731**（官方 API release / public beta），调用方式不变，继续用 `deepseek-v4-flash` 即可访问最新版（[api-docs.deepseek.com](https://api-docs.deepseek.com/)）。
- 在 OpenCode Go 订阅（$5 首月 / $10 每月）里，模型 id 为 `opencode-go/deepseek-v4-flash`，端点 `https://opencode.ai/zen/go/v1/chat/completions`（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）。

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| 模型 id（DeepSeek 官方 API） | `deepseek-v4-flash`（当前指向 0731 build） | [api-docs.deepseek.com](https://api-docs.deepseek.com/) |
| 模型 id（OpenCode Go） | `opencode-go/deepseek-v4-flash`；底层也是 `deepseek-v4-flash` | [opencode.ai/docs/go/](https://opencode.ai/docs/go/)；[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide) |
| 参数量 | 284B total / 13B active，MoE，MIT license（与 V3.2/R1 系列无关的新家族） | [api-docs.deepseek.com/news/news260424/](https://api-docs.deepseek.com/news/news260424/)；[openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| 上下文窗口 | 1M tokens（1,048,576），最大输出 384K | [openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash)；[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide) |
| 官方 API 价格（每 1M tokens，0731 后不变） | 输入 $0.14（cache miss）/ 输出 $0.28 / cache hit 输入 $0.003 | [developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)（官方 changelog 转引） |
| OpenRouter 价格（每 1M tokens） | $0.0896 输入 / $0.1792 输出（OpenRouter 页标注 36% off） | [openrouter.ai/deepseek/deepseek-v4-flash](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| OpenCode Go 价格（每 1M tokens） | 输入 $0.14 / 输出 $0.28 / cache read $0.0028；每月含 $60 额度 | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| OpenCode Go 请求配额（DeepSeek V4 Flash） | 31,650 请求/5h · 79,050/周 · 158,150/月（估算，基于典型使用） | [opencode.ai/docs/go/](https://opencode.ai/docs/go/) |
| OpenCode Go 全局限制 | $12/5 小时窗口 · $30/周 · $60/月 | [opencode.ai/docs/go/](https://opencode.ai/docs/go/)；[Reddit](https://www.reddit.com/r/opencodeCLI/comments/1sx757l/) |
| V4 Pro（对比项）官方价 | $0.435 输入 / $0.87 输出（2026-05 起 75% 折扣永久化） | [openrouter.ai](https://openrouter.ai/deepseek)；[llmreference](https://www.llmreference.com/provider/openrouter/deepseek-v4-pro) |
| SWE-bench Verified（V4 Flash 预览版） | 79.0%（vendor 报告，April 预览） | [aimadetools](https://www.aimadetools.com/blog/deepseek-v4-opencode-setup/)；[wan27.org](https://wan27.org/blog/deepseek-v4-flash-official-release) |
| SWE-bench Verified（V4 Pro 预览版） | 80.6%（vendor 报告） | [haimaker.ai](https://haimaker.ai/blog/deepseek-opencode-setup/)；[wan27.org](https://wan27.org/blog/deepseek-v4-flash-official-release) |
| Terminal Bench 2.1（0731） | 82.7（vs V4-Pro-Preview 72.1，Flash 预览 61.8）— vendor 报告 | [developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)；[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm) |
| DeepSWE（0731） | 54.4（预览仅 7.3，+645%）— vendor 报告 | [techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)；[wan27.org](https://wan27.org/blog/deepseek-v4-flash-official-release) |
| Cybergym / Toolathlon(verified) / NL2Repo（0731） | 76.7 / 70.3 / 54.2 — vendor 报告 | [developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide) |
| Artificial Analysis Intelligence Index v4.1 | 50（中位数 17），173 个模型里排第 2（独立评测，max effort） | [artificialanalysis.ai/models/deepseek-v4-flash](https://artificialanalysis.ai/models/deepseek-v4-flash) |
| AA 独立评测：GDPval-AA v2 Elo | 1559（上一版 1189）；Terminal-Bench 2.1 79%（+17）；τ³-Bench Banking 31%（+8） | [artificialanalysis.ai/articles](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash) |
| 推理 effort | `high` 和 `max` 两种；`--variant max` 选择（xhigh 映射到 max） | [developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)；[openrouter.ai](https://openrouter.ai/deepseek/deepseek-v4-flash) |
| 官方推荐采样参数 | temperature = 1.0, top_p = 0.95（agentic 场景；其余 1.0），high/max 下最大 384K 输出 | [marktechpost](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/) |

## 关键差异 / 时间线

- **2026-04-24**：DeepSeek V4 预览发布。V4-Flash（284B/13B）与 V4-Pro（1.6T/49B）同日公布；官方宣布与 Claude Code、OpenClaw、OpenCode 无缝集成（[api-docs.deepseek.com/news/news260424/](https://api-docs.deepseek.com/news/news260424/)）。预览版 Flash：SWE-bench Verified 79.0%、LiveCodeBench 91.6%、Codeforces rating 3052（[wan27.org](https://wan27.org/blog/deepseek-v4-flash-official-release)）。
- **2026-07-24**：旧模型名 `deepseek-chat` / `deepseek-reasoner` 停用（此前向后兼容映射到 V4 Flash 的 non-thinking / thinking 模式）。所有官方 awesome-deepseek-agent 配置都改用新名（[therouter.ai](https://therouter.ai/news/deepseek-awesome-agent-claude-code-copilot-opencode-routing/)，[haimaker.ai](https://haimaker.ai/blog/deepseek-opencode-setup/)）。
- **2026-07-31**：DeepSeek-V4-Flash-0731 官方发布（public beta）。**仅重做后训练（re-post-trained），架构/参数量不变**；原生支持 Responses API，且「specifically adapted for Codex」——意味着 OpenAI Responses 格式的 harness（如 Codex）无需适配层直接可用。V4-Pro API 与 App/Web 模型不变，官方 Pro release「soon」（[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)；[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)）。
- **0731 的最大卖点**：284B 的 Flash 在 DeepSeek 自己公布的 9 项 agent 基准上全面超过 1.6T 的 V4-Pro-Preview，而输出价只有后者的约 1/3（$0.28 vs $0.87）。注意这是 **vendor 报告的基准**（DeepSeek Harness, minimal mode, max effort），第三方尚不能完全复现（[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)；[digitalapplied](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks)）。
- **OpenCode Go 的 DeepSeek 定价分歧（已缓解）**：2026-03 Reddit 实测称 Go 上 V4 Pro 按名义参考价 $1.74/$3.48 计费（约为官方实际价 ×4，Flash 则透明等额）；DeepSeek 于 2026-05-31 宣布 V4 Pro 永久降价 75%，社区在 [opencode#28846](https://github.com/anomalyco/opencode/issues/28846) 要求同步调整 Go 配额。当前官方 Go 文档已按 $0.435/$0.87 计价（V4 Pro，$15 额度）与 $0.14/$0.28（Flash，$60 额度）（[Reddit](https://www.reddit.com/r/opencodeCLI/comments/1tril88/)；[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）。
- **OpenCode Go 与地区限制**：0731 模型在 OpenCode Go 上「hosted in China」，需先在 opencode.ai 网站开启「Enable models hosted in China」，否则 HTTP 403；Go 的其他模型不走中国服务器（[r/opencode](https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/)）。

## 教程素材（写作时直接引用）

**官方 /connect 流程（最省事）**
```
opencode           # 进入 TUI
/connect           # 输入 deepseek 并选择 provider
# 粘贴 DeepSeek API Key
# 选择 DeepSeek-V4-Pro 模型
```
要求 OpenCode >= v1.14.24（[官方文档](https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/)）。

**手动配置 opencode.json（provider 块）**
```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "deepseek": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "DeepSeek",
      "options": { "baseURL": "https://api.deepseek.com/v1" },
      "models": {
        "deepseek-v4-pro":  { "name": "DeepSeek V4 Pro" },
        "deepseek-v4-flash": { "name": "DeepSeek V4 Flash" }
      }
    }
  }
}
```
要点：credential 与 provider 分离——先 `opencode auth login` 选 Other、provider id 用 `deepseek`，存在 `~/.local/share/opencode/auth.json`；config 里的 provider 键必须与 auth 的 provider id 一致；改完要完全退出重开，再 `/models` 选择（[haimaker.ai](https://haimaker.ai/blog/deepseek-opencode-setup/)，[open-code.ai/docs/providers](https://open-code.ai/en/docs/providers)）。

**推荐：agent 拆分配置（V4 Pro 写代码 + V4 Flash 干杂活）**，写入 `~/.config/opencode/opencode.jsonc`：
```jsonc
{
  "provider": {
    "deepseek": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "DeepSeek",
      "options": { "baseURL": "https://api.deepseek.com", "apiKey": "YOUR_DEEPSEEK_API_KEY" },
      "models": {
        "deepseek-v4-pro": {
          "name": "DeepSeek-V4-Pro",
          "limit": { "context": 1048576, "output": 262144 },
          "options": { "reasoningEffort": "high", "thinking": { "type": "enabled" } }
        },
        "deepseek-v4-flash": {
          "name": "DeepSeek-V4-Flash",
          "limit": { "context": 1048576, "output": 262144 },
          "options": { "reasoningEffort": "high", "thinking": { "type": "enabled" } }
        }
      }
    }
  },
  "agents": {
    "coder":  { "model": "deepseek-v4-pro",  "maxTokens": 16000 },
    "task":   { "model": "deepseek-v4-flash", "maxTokens": 8000 },
    "title":  { "model": "deepseek-v4-flash" }
  },
  "autoCompact": true
}
```
实际成本约 85% Pro / 15% Flash；Flash 处理文件搜索、grep、标题生成等高量低价工作（$0.28/1M output），Pro 专注真正的编码（[aimadetools.com](https://www.aimadetools.com/blog/deepseek-v4-opencode-setup/)）。注意该来源把 Pro 输出价写作 $3.48（降价前名义价），当前实际为 $0.87（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）。

**命令行用法**
```
opencode run -m deepseek/deepseek-v4-flash "Fix the typo in README.md"
opencode run -m deepseek/deepseek-v4-pro --dangerously-skip-permissions "Build a REST API"
opencode run -m deepseek/deepseek-v4-pro --variant max "Architect a distributed caching system"
opencode run --model opencode-go/deepseek-v4-flash --variant max "your task"   # OpenCode Go 渠道
```
`--variant max` = Think Max（要 384K 上下文）；`high` 是性价比默认（[aimadetools.com](https://www.aimadetools.com/blog/deepseek-v4-opencode-setup/)，[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)）。

**OpenCode Go 接入**：登录 [OpenCode Zen](https://opencode.ai/auth) → 订阅 Go → 复制 API key → TUI 里 `/connect` 选 `OpenCode Go` → 粘贴 key → `/models`。模型 id 用 `opencode-go/deepseek-v4-flash`；API 端点 `https://opencode.ai/zen/go/v1/chat/completions`（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)）。价格表里 DeepSeek V4 Flash 是 Go 上最划算的模型之一：$60/月额度、约 158,150 请求/月（[opencode.ai/docs/go/](https://opencode.ai/docs/go/)，[r/opencode](https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/) 称「undisputed price-performance leader」）。

**Anthropic 兼容端点（Claude Code / Anthropic SDK 系工具，非 OpenCode 主路径）**
- `https://api.deepseek.com/anthropic`；模型名映射：`claude-opus*` → `deepseek-v4-pro`，`claude-haiku*` / `claude-sonnet*` → `deepseek-v4-flash`（[api-docs.deepseek.com/guides/anthropic_api/](https://api-docs.deepseek.com/guides/anthropic_api/)）。
- Claude Code 官方 env：`ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic`、`ANTHROPIC_AUTH_TOKEN=<key>`、`ANTHROPIC_MODEL=deepseek-v4-pro[1m]`、`ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash`、`CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash`、`CLAUDE_CODE_EFFORT_LEVEL=max`（[api-docs.deepseek.com/guides/coding_agents/](https://api-docs.deepseek.com/guides/coding_agents/)）。`[1m]` 后缀让端点使用 1M 上下文变体，是 DeepSeek 专属 modifier（[therouter.ai](https://therouter.ai/news/deepseek-awesome-agent-claude-code-copilot-opencode-routing/)）。把 Haiku/subagent 流量路由到 Flash 可省 80-90% 子代理成本（[therouter.ai](https://therouter.ai/news/deepseek-coding-agent-integration-guide-claude-code-opencode/)）。
- OpenCode 本身走 OpenAI-compatible（`@ai-sdk/openai-compatible`），不依赖 Anthropic 端点；Anthropic 端点主要服务于 Claude Code / 使用 Anthropic Messages API 的工具。搜索未找到 OpenCode 官方文档推荐用 Anthropic 端点接 DeepSeek 的示例（未找到可靠来源）。

**与其它 agent 配置对比**

| Agent | 配置方式 | V4 Flash 角色 |
|---|---|---|
| OpenCode | `/connect deepseek` 内置 provider 或 `opencode.json` provider 块（`@ai-sdk/openai-compatible`, baseURL `api.deepseek.com/v1`） | 默认/杂务模型，或 `-m deepseek/deepseek-v4-flash` |
| Claude Code | env 变量指向 `api.deepseek.com/anthropic`；`ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash` | Haiku 层 + subagent |
| OpenClaw | `openclaw onboard --install-daemon` → 选 DeepSeek → 输入 `deepseek-v4-pro` 或 `deepseek-v4-flash` | 默认模型可选手动输入 |
| Codex CLI | 0731 build 原生支持 Responses API（「adapted for Codex」） | 同一模型可直接接入，无需转换层 |

（前两行 [api-docs.deepseek.com/guides/coding_agents/](https://api-docs.deepseek.com/guides/coding_agents/)；OpenClaw 同行；Codex 见 [developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)）

**常见错误（社区高频踩坑）**
- 模型名写成 `deepseek-v4` / `deepseek-flash` 而不是 `deepseek-v4-flash`——自定义 provider 会原样透传 model id，必须与 API 完全一致（[bswen.com](https://docs.bswen.com/blog/2026-04-26-deepseek-v4-flash-opencode-setup/)，[haimaker.ai](https://haimaker.ai/blog/deepseek-opencode-setup/)）。
- auth 的 provider id 与 config 键不一致；`opencode auth list` 检查；key 字段里不要带 `Bearer` 前缀（[haimaker.ai](https://haimaker.ai/blog/deepseek-opencode-setup/)）。
- 改配置后必须完全重启 OpenCode 再 `/models`（[haimaker.ai](https://haimaker.ai/blog/deepseek-opencode-setup/)）。
- 验证 key 与模型：`curl https://api.deepseek.com/v1/models -H "Authorization: Bearer your-key"`（[haimaker.ai](https://haimaker.ai/blog/deepseek-opencode-setup/)）。
- 高峰时段 DeepSeek 官方 API 会 503 / 超时，建议把请求 timeout 提到 60s+ 或走网关 failover（[haimaker.ai](https://haimaker.ai/blog/deepseek-opencode-setup/)）。
- 旧 Go 二进制版 OpenCode（`opencode -v` 显示 v0.0.x）会报「agent coder not found」，用 `npm install -g opencode-ai` 重装（[aimadetools.com](https://www.aimadetools.com/blog/deepseek-v4-opencode-setup/)）。
- 配置好后先跑 `opencode test`（2 秒）验证连接再投入正式任务（[bswen.com](https://docs.bswen.com/blog/2026-04-26-deepseek-v4-flash-opencode-setup/)）。

**真实使用成本（社区数据，非官方）**
- 直接走 DeepSeek 官方 API：一次正常 agent 会话约 1M 输入 + 400K 输出 ≈ $0.50–0.70；一个月的活跃编码「just under $9」；也可把 DeepInfra 端点作为 base_url 换入（OpenAI-compatible，无需其他改动）（[r/opencodeCLI](https://www.reddit.com/r/opencodeCLI/comments/1twlwxc/deepseek_v4_flash_direct_api_i_cant_hit_a_limit/)）。
- Reddit 报告 OpenCode + V4 Flash 约 100–150 tokens/s；复杂多应用重构花费不到 $4（[bswen.com](https://docs.bswen.com/blog/2026-04-26-deepseek-v4-flash-opencode-setup/) 转引 Reddit）。
- r/opencode 用户称 Flash 在生物学模拟任务上超过 V4 Pro 与 GLM 5.2；「closest thing to Opus」（[r/opencode](https://www.reddit.com/r/opencode/comments/1tu2kz4/deepseek_v4_flash_is_magical/)）。

**0731 基准细节（均为 DeepSeek 官方发布、自家 Harness）**
| 基准 | 0731 | 对照 |
|---|---|---|
| Terminal Bench 2.1 | 82.7 | V4-Pro-Preview 72.1；Flash 预览 61.8；Kimi K3 发布时 76.1 |
| Cybergym | 76.7 | - |
| Toolathlon (verified) | 70.3 | - |
| DeepSWE | 54.4 | Flash 预览 7.3（+645%） |
| NL2Repo | 54.2 | - |
| DSBench-FullStack | 68.7 | - |

来源：[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)（前 5 项）、[techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)、[orcarouter](https://www.orcarouter.ai/blog/deepseek-v4-flash-official-release)（DSBench）。**全部 vendor 自报**；独立评测以 Artificial Analysis 为准（Intelligence Index 50，排第 2/162，但「verbose——评测套件产出 210M tokens，中位数仅 62M」，实际成本高于每 token 标价）（[artificialanalysis.ai](https://artificialanalysis.ai/models/deepseek-v4-flash)）。

**价格对比锚点（写作可用）**
- V4 Flash 官方：$0.14 输入 / $0.28 输出，cache hit 输入 $0.003（98% 折扣，比行业普遍 90% 更狠）（[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)；[artificialanalysis.ai](https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash)）。
- V4 Pro 官方：$0.435 / $0.87（75% 折扣永久化后）（[openrouter.ai/deepseek](https://openrouter.ai/deepseek)）。
- 对比：Anthropic Fable 5 $10/$50——输出价差 178x，cached input 差 3500x+（[developersdigest](https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide)）；AI 单次会话成本对比：OpenCode+V4 Flash ~$0.01–0.05，V4 Pro ~$0.10–0.50，Claude Code+Sonnet / Codex+GPT-5.4 ~$0.50–2.00（[aimadetools.com](https://www.aimadetools.com/blog/deepseek-v4-opencode-setup/)）。

## 来源清单（完整 URL，全部列出）

1. https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/ — 官方 OpenCode 接入指南（/connect 流程，v1.14.24）
2. https://api-docs.deepseek.com/guides/coding_agents/ — 官方 Claude Code / OpenCode / OpenClaw 集成指南（env 配置）
3. https://api-docs.deepseek.com/guides/anthropic_api/ — Anthropic 兼容端点与模型名映射（opus→Pro，haiku/sonnet→Flash）
4. https://api-docs.deepseek.com/news/news260424/ — V4 预览发布公告（与 Claude Code/OpenClaw/OpenCode 无缝集成、内部 agentic coding、参数规格）
5. https://api-docs.deepseek.com/ — API 首页（deepseek-v4-flash → 0731 说明、OpenAI SDK 示例）
6. https://github.com/deepseek-ai/awesome-deepseek-agent — 官方 agent 集成配置仓库（docs/opencode.md 等 20 个工具指南）
7. https://opencode.ai/docs/go/ — OpenCode Go 官方文档（价格表、配额、端点、隐私表）
8. https://opencode.ai/go — OpenCode Go 营销页（$5 首月/$10 每月、请求配额图）
9. https://opencode.ai/docs/providers/ — OpenCode 官方 provider 文档（/connect deepseek）
10. https://opencode.ai/docs/config/ — OpenCode 配置文档（JSON/JSONC、模型 id 格式）
11. https://openrouter.ai/deepseek/deepseek-v4-flash — OpenRouter 模型页（$0.0896/$0.1792、1M 上下文、384K 输出、CSA/HCA 注意力、high/xhigh）
12. https://haimaker.ai/blog/deepseek-opencode-setup/ — 详细配置教程（provider 块、auth、旧名停用 07-24、排错）
13. https://www.aimadetools.com/blog/deepseek-v4-opencode-setup/ — 完整 opencode.jsonc（agent 拆分、reasoningEffort、--variant、成本对比）
14. https://www.developersdigest.tech/blog/deepseek-v4-flash-0731-opencode-guide — 0731 发布详解（架构不变、benchmark 表、定价、opencode run 命令）
15. https://docs.bswen.com/blog/2026-04-26-deepseek-v4-flash-opencode-setup/ — 实操教程（模型名坑、opencode test、tokens/s）
16. https://deepseekv4.wiki/en/tutorials/deepseek-v4-opencode-integration — /connect、/models、首跑验证教程（v1.14.24 起点）
17. https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/ — 多 agent 配置汇总（opencode.jsonc 路径、context 1048576、图片开关）
18. https://therouter.ai/news/deepseek-awesome-agent-claude-code-copilot-opencode-routing/ — awesome-deepseek-agent 解读（路由、[1m] modifier、fallback 风险）
19. https://pi.dev/models/opencode/deepseek-v4-flash — opencode provider 配置 JSON（zen/v1、thinkingLevelMap、maxTokens 384000）
20. https://pi.dev/models/opencode-go/deepseek-v4-flash — opencode-go provider 配置 JSON（zen/go/v1、thinkingFormat deepseek）
21. https://artificialanalysis.ai/models/deepseek-v4-flash — 独立评测（Intelligence Index 50、verbose 数据）
22. https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash — AA 0731 评测文章（Elo 1559、cost-per-task、cache 折扣）
23. https://www.reddit.com/r/opencode/comments/1vbnuda/deepseek_v4_flash_0731/ — 社区讨论（price-performance leader、Intelligence/Agentic 评分、China-hosted 开启、HTTP 403）
24. https://www.reddit.com/r/opencode/comments/1tu2kz4/deepseek_v4_flash_is_magical/ — 社区口碑（生物模拟任务超过 Pro/GLM-5.2）
25. https://www.reddit.com/r/opencodeCLI/comments/1twlwxc/deepseek_v4_flash_direct_api_i_cant_hit_a_limit/ — 直接 API 实测成本（$0.50–0.70/会话、月成本 $9）
26. https://www.reddit.com/r/opencodeCLI/comments/1tril88/ — Go vs API 定价实测（Flash 透传、V4 Pro 名义价分歧）
27. https://github.com/anomalyco/opencode/issues/28846 — Go 配额待调整 issue（75% 降价后）
28. https://techjacksolutions.com/ai-tools/deepseek/deepseek-v4-coding-and-agentic-workflows/ — V4 agentic 综述（官方集成声明、Anthropic 端点、NVIDIA 栈）
29. https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/ — 0731 发布报道（HuggingFace 发布、推荐参数）
30. https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm — 0731 基准报道（DeepSWE 7.3→54.4）
31. https://wan27.org/blog/deepseek-v4-flash-official-release — 0731 分析（Terminal-Bench 版本差异、预览版 SWE-bench/LiveCodeBench 数据）
32. https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks — 0731 事实/厂商声明区分（权重未放 HF、peak/off-peak 未生效、2,500 并发上限）
33. https://openrouter.ai/deepseek — DeepSeek 家族 OpenRouter 页（V4 Pro $0.435/$0.87、36% off、CSA/HCA）

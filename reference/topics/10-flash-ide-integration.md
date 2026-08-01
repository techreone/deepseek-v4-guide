---
topic: IDE 集成：Cursor / Claude Code / Codex
slug: flash-ide-integration
category: integration
updated: 2026-08-01
status: written
sources:
  - https://api-docs.deepseek.com/quick_start/agent_integrations/codex/
  - https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/
  - https://api-docs.deepseek.com/guides/coding_agents/
  - https://api-docs.deepseek.com/guides/anthropic_api/
  - https://api-docs.deepseek.com/updates/
  - https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/claude_code.md
  - https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/
  - https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/
  - https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence
  - https://www.reddit.com/r/DeepSeek/comments/1th43j0/how_to_use_deepseek_v4_pro_in_cursor_skill_issue/
  - https://github.com/yxlao/deepseek-cursor-proxy
  - https://github.com/MG-Cafe/claudecode-deepseek-stack
  - https://codex.danielvaughan.com/2026/04/24/deepseek-v4-codex-cli-provider-frontier-coding-fraction-cost/
  - https://knightli.com/en/2026/05/01/use-deepseek-v4-pro-in-cline/
  - https://cursor-alternatives.com/blog/cline-deepseek-cursor-ide-setup/
  - https://docs.bswen.com/blog/2026-04-26-deepseek-v4-ide-integration-guide/
  - https://deepseekai.guide/tutorials/deepseek-with-vscode/
  - https://www.verdent.ai/guides/deepseek-v4-in-claude-code
  - https://api-docs.deepseek.com/quick_start/pricing
  - https://build.nvidia.com/deepseek-ai/deepseek-v4-flash
  - https://www.youtube.com/watch?v=EibhUi-FnTs
---

# IDE 集成：Cursor / Claude Code / Codex

## 核心事实（可直接入教程）

- **两个 base URL，一个 API key**：DeepSeek V4 同时提供 OpenAI 兼容端点 `https://api.deepseek.com` 与 Anthropic 兼容端点 `https://api.deepseek.com/anthropic`，同一个 API key（`sk-` 开头，在 platform.deepseek.com/api_keys 创建）两边通用 ([api-docs.deepseek.com](https://api-docs.deepseek.com/guides/anthropic_api/)) ([devtk.ai](https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/))
- **模型名（大小写敏感，须精确匹配）**：`deepseek-v4-flash`（廉价高频）/ `deepseek-v4-pro`（复杂推理）；官方环境变量示例里还有带 `[1m]` 后缀的写法（`deepseek-v4-pro[1m]`），对应 1M 上下文变体 ([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/)) ([github.com/deepseek-ai](https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/claude_code.md))
- **旧别名退役**：`deepseek-chat` / `deepseek-reasoner` 于 2026-07-24 15:59 UTC 退役，之前透明路由到 V4 Flash；之后请求旧别名返回硬错误 ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/)) ([eastondev.com](https://eastondev.com/blog/en/posts/dev/20260110-cursor-deepseek-api-config/))
- **0731 双协议合流**：2026-07-31 发布的 DeepSeek-V4-Flash-0731（重后训练的公开 beta checkpoint）原生支持 OpenAI Responses API，官方说明明确"为满足 Codex 需求而适配"；Anthropic 兼容格式则自 2025-08-21（V3.1）起就已支持，两者现在同一模型零代理原生并存 ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)) ([digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence))
- **Codex 目前仅 Flash**：官方文档注明"当前只有 deepseek-v4-flash 支持集成 Codex，deepseek-v4-pro 预计 2026 年 8 月初支持" ([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/codex/)) ([techgenyz.com](https://techgenyz.com/deepseek-v4-flash-api/))
- **Claude Code 双 tier 全通**：Anthropic 端点目前同时覆盖 flash 和 pro，是本周唯一能触达 pro 档的官方路径 ([digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence))
- **Cursor 集成官方未出专门文档**，但社区有完整步骤：Settings → Models → Add Model，OpenAI Base URL 填 `https://api.deepseek.com`（**不要加 /v1**，否则 Verify 报 404），粘贴 key，模型名填 `deepseek-v4-pro` 或 `deepseek-v4-flash` ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/)) ([reddit](https://www.reddit.com/r/DeepSeek/comments/1th43j0/how_to_use_deepseek_v4_pro_in_cursor_skill_issue/))

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| OpenAI 兼容 base URL | `https://api.deepseek.com`（/chat/completions；0731 起原生 /responses） | [api-docs](https://api-docs.deepseek.com/quick_start/agent_integrations/codex/) |
| Anthropic 兼容 base URL | `https://api.deepseek.com/anthropic`（/v1/messages，需 `x-api-key` + `anthropic-version: 2023-06-01` 头） | [api-docs](https://api-docs.deepseek.com/guides/anthropic_api/) |
| API key 前缀 / 获取 | `sk-`；platform.deepseek.com/api_keys（API 付费，需充值） | [api-docs](https://api-docs.deepseek.com/quick_start/agent_integrations/codex/) |
| 模型 slug | `deepseek-v4-flash` / `deepseek-v4-pro`（大小写敏感） | [api-docs](https://api-docs.deepseek.com/) |
| 上下文窗口 | 两档均 1M tokens（1,048,576），models.json 里 `context_window` / `max_context_window` = 1048576 | [api-docs](https://api-docs.deepseek.com/quick_start/agent_integrations/codex/) ([digitalapplied](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence)) |
| 最大输出 | 两档均 384K tokens（模型层）；OpenCode 配置示例限 262144 | [digitalapplied](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence) ([devtk](https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/)) |
| 并发限制 | flash 2,500 并发请求 / pro 500（官方定价表，2026-07-31 抓取） | [digitalapplied](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence) |
| Claude Code 安装 | Node.js 18+；Windows 需 Git for Windows；`npm install -g @anthropic-ai/claude-code`；验证 `claude --version` | [api-docs](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/) |
| OpenCode 最低版本 | 官方强烈建议 >= v1.14.24 | [api-docs](https://api-docs.deepseek.com/guides/coding_agents/) |
| 官方文档覆盖的 agent | Claude Code、OpenCode、OpenClaw（coding_agents 页）+ Codex（agent_integrations/codex 页） | [api-docs](https://api-docs.deepseek.com/guides/coding_agents/) |
| Cursor 官方状态 | 无官方集成页；社区自定义模型方案（含 reasoning_content 400 缺陷，见下） | [codersera](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/) |
| V4-Flash 定价（每 1M tokens） | 输入 cache miss $0.14 / cache hit $0.028 / 输出 $0.28 | [codex.danielvaughan](https://codex.danielvaughan.com/2026/04/24/deepseek-v4-codex-cli-provider-frontier-coding-fraction-cost/) ([digitalapplied](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence)) |
| V4-Pro 定价（每 1M tokens） | 输入 miss $0.435 / hit ≈$0.0363 / 输出 $0.87（75% 折扣 2026-05-22 起永久化；原价 $1.74/$0.145/$3.48 已撤销） | [codersera](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/) ([codex.danielvaughan](https://codex.danielvaughan.com/2026/04/24/deepseek-v4-codex-cli-provider-frontier-coding-fraction-cost/)) |
| 峰值时段政策 | 已公布但未生效（2026-07-31 止）：9:00–12:00 与 14:00–18:00 北京时间为 2x 倍率，生效日期待官方公告 | [digitalapplied](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence) |
| Claude 模型名映射 | `claude-opus-*` → deepseek-v4-pro；`claude-sonnet-*` / `claude-haiku-*` → deepseek-v4-flash；未识别名 → deepseek-v4-flash | [api-docs](https://api-docs.deepseek.com/guides/anthropic_api/) |
| 独立能力评分 | Artificial Analysis Intelligence Index v4.1：V4-Flash-0731 得 50，价位/档位类别 162 个模型中排 #2（独立第三方） | [digitalapplied](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence) |
| V4-Flash-0731 agent 基准（DeepSeek 自家 Harness，minimal 模式/max effort/top_p 0.95/temp 1.0，厂商自报） | Terminal-Bench 2.1 = 82.7；DeepSWE = 54.4；Cybergym = 76.7；官方 changelog 称 9 项 agent 基准全部超过 V4-Pro-Preview | [wan27.org](https://wan27.org/blog/deepseek-v4-flash-official-release) ([techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)) |
| V4-Pro 基准（发布时厂商自报） | SWE-bench Verified 80.6%（V4-Flash 预览 79.0%）；对比 Claude Opus 4.6 的 80.8% | [codex.danielvaughan](https://codex.danielvaughan.com/2026/04/24/deepseek-v4-codex-cli-provider-frontier-coding-fraction-cost/) |
| 参数规模 | V4-Pro 1.6T 总参 / 49B 激活；V4-Flash 284B 总参 / 13B 激活；MoE + Hybrid Attention | [codersera](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/) ([codex.danielvaughan](https://codex.danielvaughan.com/2026/04/24/deepseek-v4-codex-cli-provider-frontier-coding-fraction-cost/)) |

> 注：Flash 定价有一处冲突 — codersera（2026-05-23 更新）写 $0.126/$0.252，digitalapplied 与 danielvaughan 写 $0.14/$0.28；官方定价页 api-docs.deepseek.com/quick_start/pricing 为唯一真源，教程写作前应复核，本文采用出现频率最高且最贴近官方表的 $0.14/$0.28。digitalapplied 表格中的 cache hit 数字（$0.0028 / $0.003625）疑似少一位小数，应为 $0.028 / $0.03625。

## Claude Code 配置（官方，最权威）

官方步骤（Linux/Mac；Windows 用 `$env:` 版）([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/))：

```bash
npm install -g @anthropic-ai/claude-code

export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=<your DeepSeek API Key>
export ANTHROPIC_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
export CLAUDE_CODE_EFFORT_LEVEL=max
cd /path/to/my-project
claude
```

官方 awesome-deepseek-agent 仓库的 env 配置还多一项 `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1`，并把 HAIKU 也写成 `deepseek-v4-flash[1m]` ([github.com/deepseek-ai](https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/claude_code.md))。

- **Web Search 原生可用**：Claude Code 里模型判断需要时自动调用 DeepSeek 提供的 Web Search 工具，但汇总搜索结果会产生额外 token 费用 ([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/))
- **Claude Desktop APP**：开发者模式改 base_url + api_key 即可连 DeepSeek；通过上面的 claude-* 名称映射绕过 APP 的模型名限制 ([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/))
- **已知缺口**：Anthropic 端点忽略 image / document 内容块、`cache_control`、MCP tool-use 块、`anthropic-beta` / `anthropic-version` 头、`top_k`；依赖多模态 / MCP 的工作流不要直接迁移 ([digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence))
- **社区成本口径**：MG-Cafe 仓库称用两个环境变量把 Claude Code 从 $200/月 压到 ~$7/月（"live-tested 95x cheaper"），推荐用 `--settings` 覆盖文件而非内联 env 前缀（会被已有 Anthropic OAuth/Vertex/Bedrock 配置覆盖） ([github.com/MG-Cafe](https://github.com/MG-Cafe/claudecode-deepseek-stack))；verdent 提醒"这不是 Anthropic 或 DeepSeek 官方支持的配置"，只是 DeepSeek 官方文档认可的路径 ([verdent.ai](https://www.verdent.ai/guides/deepseek-v4-in-claude-code))

## Codex 配置（官方，2026-07-31 起原生支持）

Codex 通过 **Responses API** 与模型对话，DeepSeek 0731 起原生支持该格式；Codex CLI、ChatGPT 桌面端、VS Code Codex 扩展**共享同一份配置文件** `~/.codex/` ([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/codex/))。

**方式一：一键脚本（官方推荐）** — 要求 Codex CLI 或 ChatGPT 桌面端已安装并启动过一次（生成 `~/.codex` 目录）：

```bash
# macOS / Linux
bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh)
# Windows PowerShell
irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex
```

脚本动作：把 `~/.codex/config.toml` 备份到 `~/.codex/backup-deepseek/` → 写入模型目录 `~/.codex/models.json`（声明上下文窗口、reasoning effort 档位、工具调用格式）→ 改写 config.toml（新增 `[model_providers.deepseek]`，保留 MCP/项目信任等原有配置）→ 写前校验语法，失败即中止。可重复运行切换模型或恢复原状（菜单选项 3）([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/codex/))。

**方式二：手工编辑 config.toml**（社区口径，`wire_api` 视 Codex 版本而定；digitalapplied 确认官方脚本写的是 `wire_api = 'responses'`）：

```toml
# ~/.codex/config.toml
model = "deepseek-v4-flash"
model_provider = "deepseek"

[model_providers.deepseek]
name = "DeepSeek"
env_key = "DEEPSEEK_API_KEY"
base_url = "https://api.deepseek.com"
wire_api = "responses"   # 老版本 Codex 可能只支持 chat，但官方响应式配置用 responses
```

```bash
export DEEPSEEK_API_KEY=your-deepseek-api-key
codex
```

models.json 关键字段（官方完整 JSON 在文档页，此处为要点）：`slug`、`context_window`/`max_context_window` = 1048576、`effective_context_window_percent` = 95、`apply_patch_tool_type` = "freeform"、`supported_reasoning_levels` = low/high/max、`minimal_client_version` = "0.144.0"、`default_reasoning_level` = "high" ([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/codex/))。

**注意**：
- **0731 之前**的 Codex+DeepSeek 是"代理时代"：官方 awesome-deepseek-agent 仓库文档化了开源 Moon Bridge 转发代理（本地 `127.0.0.1:38440`），因为 Codex 要求 Responses 协议而 DeepSeek 只讲 Chat Completions（2026-05-03 有人提 bug：`wire_api = "responses"` 直连返回 HTTP 404）；0731 起该层对 V4-Flash 作废 ([digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence))
- Responses 端缺 `previous_response_id`（无状态连续性），多轮需重发完整上下文；不支持 OpenAI 内置工具（file_search / code_interpreter / computer_use）和图像/文件输入 ([digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence))
- 有人报告 Codex auto-review 会把 `codex-auto-review` 模型名发给自定义 DeepSeek provider，DeepSeek 只认自己的 V4 模型名而拒绝 — 属实现层校验问题 ([deepseekv4pro.com](https://deepseekv4pro.com/news/deepseek-july2-claude-code-codex-integration-watch))

## Cursor 配置（社区完整步骤，官方无专门页）

1. platform.deepseek.com 注册、充值（$5 够 Flash 重度用一周）、创建 API key（sk- 前缀） ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/))
2. Cursor 打开 Settings（macOS `Cmd+,` / Windows `Ctrl+,`）→ Models
3. 关掉默认 OpenAI key 要求，勾选 **Override OpenAI Base URL**，填 `https://api.deepseek.com`（**切勿加 /v1** — 最常见失败是 /v1/v1 重复路径，Verify 会 404） ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/)) ([reddit](https://www.reddit.com/r/DeepSeek/comments/1th43j0/how_to_use_deepseek_v4_pro_in_cursor_skill_issue/))
4. OpenAI API key 字段粘贴 DeepSeek key（Cursor 本地存储、以 Bearer 转发）
5. Model Names 区 **+ Add model**，精确输入 `deepseek-v4-pro` 或 `deepseek-v4-flash`（无 `deepseek-v4` 这个别名）
6. 点 **Verify**：绿勾=通；404=base URL 错（多半多了 /v1）；401=key 错；model-not-found=模型名错
7. Chat 下拉里选中新模型再开线程；Pro/Flash 可并存为两个条目，同一 key/base URL 共用

**推理可见性缺陷（最耗时的坑）**：DeepSeek thinking 模式每个流式 chunk 返回 `content`（答案）+ `reasoning_content`（思维链）。Cursor 的 **Chat 面板两者都渲染**；**Composer（agent）面板只渲染 content**，且长工具调用链上会直接 400 报错 — 因为 DeepSeek thinking 模式要求后续请求**重放完整 reasoning_content 链**，Cursor 打包下一轮时把该字段剥掉了 ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/))。

三个由易到难的解决办法 ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/)):
1. **看思维用 Chat，动文件用 Composer**（零成本，默认推荐）
2. Composer 里关掉 thinking 模式 / 换 Flash（失去推理增益但 agent 稳定）
3. 本地跑社区代理 **yxlao/deepseek-cursor-proxy**：把 Cursor 指向 `http://localhost:<port>`，代理按会话缓存思维链并在下一轮重放，Composer 完整 agent 循环可用，思维 token 以折叠 Markdown 显示；可选 ngrok 暴露 ([github.com/yxlao](https://github.com/yxlao/deepseek-cursor-proxy))

**Cursor 限制**：Tab 自动补全仍用 Cursor 自有模型（自定义模型只路由 Chat 与 Composer agent）；Background Agents 截至 2026-05 不支持自定义 DeepSeek 模型 ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/))。Cursor 自身按套餐对单次请求有更低 context 上限（实际先撞 Cursor 的天花板而非 DeepSeek 的 1M）。

**成本参考**：一次典型 Composer 运行 ~20K 输入 / ~3K 输出 ≈ Pro 促销价 $0.013、Flash $0.003；全天 ~150 轮 ≈ Pro $2、Flash <$0.50。Reddit r/DeepSeek 反馈 Cline+付费 API 在 VSCode"just works"，但在 Cursor 里"有用但不等于 Claude/GPT 的完全替代" ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/)) ([reddit](https://www.reddit.com/r/DeepSeek/comments/1sv91gq/deepseek_v4_cursor/))

## Cline / Continue / Kilo Code / Copilot CLI（VS Code 生态）

**Cline**（VS Code 扩展，发行商 saoudrizwan，原名 Claude Dev；因 Cursor 是 VS Code fork，同扩展可直接装进 Cursor） ([cursor-alternatives.com](https://cursor-alternatives.com/blog/cline-deepseek-cursor-ide-setup/)) ([codersera.com](https://codersera.com/blog/cursor-cline-deepseek-agent-setup-2026/))：

| 字段 | 值 |
|------|-----|
| API Provider | OpenAI Compatible |
| Base URL | `https://api.deepseek.com` |
| API Key | DeepSeek key |
| Model ID | `deepseek-v4-flash` / `deepseek-v4-pro` |
| Context Window | 1048576 |

Cline CLI：`cline auth -p openai -k <key> -b https://api.deepseek.com -m deepseek-v4-flash`（或 `cline provider configure openai-compatible` 交互式） ([devtk.ai](https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/)) ([knightli.com](https://knightli.com/en/2026/05/01/use-deepseek-v4-pro-in-cline/))

**Continue**：编辑 `~/.continue/config.json`，模型名填 `deepseek-v4-flash` / `deepseek-v4-pro`，base URL `https://api.deepseek.com`，API key 填上；`defaultCompletionOptions` 里可设 `reasoningEffort: high`；自动补全把 role 加 `"autocomplete"` ([docs.bswen.com](https://docs.bswen.com/blog/2026-04-26-deepseek-v4-ide-integration-guide/)) ([deepseekai.guide](https://deepseekai.guide/tutorials/deepseek-with-vscode/))

**Kilo Code / Roo Code**：OpenAI Compatible 自定义 provider，base URL `https://api.deepseek.com`，模型 `deepseek-v4-flash`；若有 "supports images" 开关请关掉（V4 无图像输入），有 context window 字段填 1048576 ([devtk.ai](https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/))

**GitHub Copilot CLI**：官方指引推荐 **Anthropic provider 模式**（thinking 模式需要 Anthropic 兼容消息处理）：

```bash
export COPILOT_PROVIDER_TYPE=anthropic
export COPILOT_PROVIDER_BASE_URL=https://api.deepseek.com/anthropic
export COPILOT_PROVIDER_API_KEY=your-deepseek-api-key
export COPILOT_MODEL=deepseek-v4-pro
copilot
# 若 CLI 不识 V4 token 上限，显式指定：
export COPILOT_PROVIDER_MAX_PROMPT_TOKENS=840000
export COPILOT_PROVIDER_MAX_OUTPUT_TOKENS=128000
```
([devtk.ai](https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/))

**OpenCode**（官方集成）：`opencode` → 输入 `/connect` → 输 `deepseek` 选 provider → 填 API key → 选 DeepSeek-V4-Pro；官方要求 >= v1.14.24；也可手工写 `~/.config/opencode/opencode.jsonc`（`@ai-sdk/openai-compatible`，baseURL `https://api.deepseek.com`，context 1048576 / output 262144，`reasoningEffort: max`，`thinking.enabled`） ([api-docs.deepseek.com](https://api-docs.deepseek.com/guides/coding_agents/)) ([devtk.ai](https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/))

**OpenClaw**（官方集成）：`openclaw onboard --install-daemon`，QuickStart 模式 → Model/auth provider 选 DeepSeek → 填 key → Default model 输 `deepseek-v4-pro` 或 `deepseek-v4-flash` ([api-docs.deepseek.com](https://api-docs.deepseek.com/guides/coding_agents/)) ([devtk.ai](https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/))

**Deep Code**（DeepSeek 自家的开源终端编码助手）：config 设 `MODEL=deepseek-v4-pro`、`BASE_URL=https://api.deepseek.com`、`API_KEY`，`thinkingEnabled: true`、`reasoningEffort: max`，然后跑 `deepcode` ([devtk.ai](https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/))

## 关键差异 / 时间线

- **2025-08-21**：V3.1 发布，首次带 Anthropic API 格式支持（`/anthropic` 端点）([digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence))
- **2026-04-24**：V4 Pro + V4 Flash 发布（V4-Flash 为 Preview）；发布价 Pro $1.74/$3.48、Flash $0.14/$0.28；SWE-bench Verified 80.6% vs Opus 4.6 的 80.8% ([codex.danielvaughan.com](https://codex.danielvaughan.com/2026/04/24/deepseek-v4-codex-cli-provider-frontier-coding-fraction-cost/))
- **2026-05-22**：V4-Pro 75% 折扣永久化 → $0.435/$0.87；发布时 $1.74/$3.48 撤下 ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/))
- **2026-07-24 15:59 UTC**：`deepseek-chat` / `deepseek-reasoner` 旧别名退役，须改用 `deepseek-v4-flash` / `deepseek-v4-pro` ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/))
- **2026-07-31**：V4-Flash-0731（重后训练，架构/参数不变，官方公开 beta）— 原生 Responses API 支持 + 专为 Codex 适配；V4-Pro 仍是 Preview，Codex/Responses 支持预计 2026-08 初 ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)) ([digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence))
- **2026-08-01（今天）**：当前唯一能走官方原生 Codex 的档位是 flash；pro 走 Claude Code（Anthropic 端）无压力；peak/off-peak 2x 倍率已公布未生效 ([digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence))

## 教程素材（写作时直接引用）

- "DeepSeek 现在原生讲两种 agent 方言：OpenAI 的 Responses（为 Codex 适配）和 Anthropic 的 messages，同一模型零代理并存" — digitalapplied 0731 分析标题可作引言 ([digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence))
- "把 Anthropic base URL 换成 https://api.deepseek.com/anthropic + ANTHROPIC_AUTH_TOKEN 换成 DeepSeek key，Claude Code 就能跑在 DeepSeek 上" — 官方 Claude Code 页核心动作 ([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/))
- "Cursor 里 base URL 填 api.deepseek.com 不加 /v1，模型名精确填 deepseek-v4-flash" — Cursor 三步核心 ([codersera.com](https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/))
- 省钱对比句式：Claude Code 从 $200/月 压到 ~$7/月（MG-Cafe 自称 95x cheaper，live-tested，非官方数据） ([github.com/MG-Cafe](https://github.com/MG-Cafe/claudecode-deepseek-stack))
- Flash vs Pro 分诊：轻量任务（docstring、测试桩、单文件小修、自动补全）用 Flash；复杂规划/多文件重构/难 bug 用 Pro ([devtk.ai](https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/)) ([cursor-alternatives.com](https://cursor-alternatives.com/blog/cline-deepseek-cursor-ide-setup/))
- 双 base URL 一句话表（OpenAI 兼容 = api.deepseek.com；Anthropic 兼容 = api.deepseek.com/anthropic）可直接做成教程首屏小抄 ([devtk.ai](https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/))
- 敏感数据处理提醒：走云端 API 注意敏感数据；本地/自托管部署则无此顾虑 — WorldofAI 视频里的实用提醒 ([youtube](https://www.youtube.com/watch?v=EibhUi-FnTs))

## 来源清单（完整 URL，全部列出）

1. https://api-docs.deepseek.com/quick_start/agent_integrations/codex/ — 官方 Codex 集成（一键脚本、models.json、字段参考、flash-only 限制）
2. https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/ — 官方 Claude Code 集成（环境变量、模型映射、Web Search）
3. https://api-docs.deepseek.com/guides/coding_agents/ — 官方"Integrate with AI Tools"（Claude Code / OpenCode / OpenClaw）
4. https://api-docs.deepseek.com/guides/anthropic_api/ — 官方 Anthropic API 指南（base URL、模型映射、curl 示例）
5. https://api-docs.deepseek.com/ — 官方 First API Call（OpenAI 兼容调用示例、0731 说明）
6. https://api-docs.deepseek.com/updates/ — 官方 Change Log（0731 重后训练、Responses API、基准与评测参数）
7. https://api-docs.deepseek.com/quick_start/pricing — 官方定价页（唯一真源，教程写作前复核）
8. https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/claude_code.md — 官方仓库 Claude Code 配置（[1m] 模型名、CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC）
9. https://codersera.com/blog/deepseek-v4-cursor-ide-setup-2026/ — Cursor 完整步骤 + Composer reasoning_content 缺陷与三种解法 + 定价
10. https://devtk.ai/en/blog/deepseek-v4-agent-setup-2026/ — 多 agent 配置速查（OpenCode/Codex/Cline/Kilo/Roo/Copilot CLI/Deep Code/OpenClaw）
11. https://www.digitalapplied.com/blog/deepseek-responses-api-anthropic-format-convergence — 双协议兼容性矩阵 + 0731 分析与定价/并发数据
12. https://www.reddit.com/r/DeepSeek/comments/1th43j0/how_to_use_deepseek_v4_pro_in_cursor_skill_issue/ — 社区 Cursor 具体步骤 + reasoning_content 200k 限制讨论
13. https://www.reddit.com/r/DeepSeek/comments/1sv91gq/deepseek_v4_cursor/ — 社区对 Cursor+V4 的诚实评估
14. https://github.com/yxlao/deepseek-cursor-proxy — reasoning_content 修复代理（localhost/ngrok）
15. https://github.com/MG-Cafe/claudecode-deepseek-stack — Claude Code 成本替换方案（$200→$7/月，95x）
16. https://codex.danielvaughan.com/2026/04/24/deepseek-v4-codex-cli-provider-frontier-coding-fraction-cost/ — Codex 配置 + 发布日基准/定价表
17. https://knightli.com/en/2026/05/01/use-deepseek-v4-pro-in-cline/ — Cline 官方兼容性说明与配置
18. https://cursor-alternatives.com/blog/cline-deepseek-cursor-ide-setup/ — Cline 装进 Cursor 的指南
19. https://codersera.com/blog/cursor-cline-deepseek-agent-setup-2026/ — Cline+Cursor 配置 JSON 与坑
20. https://docs.bswen.com/blog/2026-04-26-deepseek-v4-ide-integration-guide/ — VS Code + Continue + Cline 实测
21. https://deepseekai.guide/tutorials/deepseek-with-vscode/ — VS Code Continue/Cline 配置与成本实例
22. https://www.verdent.ai/guides/deepseek-v4-in-claude-code — Claude Code 集成边界说明
23. https://deepseekv4pro.com/news/deepseek-july2-claude-code-codex-integration-watch — Codex 第三方 provider 机制核查（auto-review 模型名问题）
24. https://eastondev.com/blog/en/posts/dev/20260110-cursor-deepseek-api-config/ — Cursor 配置排错顺序
25. https://techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm — 0731 九个 agent 基准报道（厂商口径）
26. https://wan27.org/blog/deepseek-v4-flash-official-release — 0731 基准数字与 changelog 解读
27. https://build.nvidia.com/deepseek-ai/deepseek-v4-flash — NVIDIA NIM 托管 deepseek-v4-flash（备选渠道，模型名带 deepseek-ai/ 前缀）
28. https://www.youtube.com/watch?v=EibhUi-FnTs — WorldofAI 视频（Claude Code 混合工作流，含敏感数据提醒）
29. https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh — 官方 Codex 一键脚本（脚本本体，config 落盘内容）

## Gaps / 未验证项

- **Cursor 无官方集成文档**：所有 Cursor 步骤均来自社区（codersera/Reddit），官方只在 changelog 提及"为 Codex 适配"，未提及 Cursor；Cursor 官方对 reasoning_content 问题的修复时间未知（仅"已承认"）。
- **Flash 定价 $0.126 vs $0.14 冲突**：codersera（5 月）写 $0.126/$0.252，其它来源与官方表为 $0.14/$0.28；未抓取官方定价页原文核实。
- **cache hit 精确数字**：digitalapplied 的 $0.0028/$0.003625 疑似漏位小数；danielvaughan 发布日表为 Flash hit $0.028、Pro hit $0.145（折扣后应为 ~$0.0363）。未从官方定价页逐字确认。
- **`[1m]` 后缀模型名的官方解释**：官方 env 示例用 `deepseek-v4-pro[1m]`，但文档未在抓取到的页面里显式解释该后缀语义（推断对应 1M 上下文变体，需向官方确认）。
- **V4-Pro 的 Codex/Responses 支持**：官方只说"预计 2026 年 8 月初"，截至 2026-08-01 未落地。
- **peak/off-peak 2x 倍率**：已公布未生效，生效日期与是否覆盖全部档位未确认。
- **Cline 具体"supports images"行为**：devtk 建议关闭图像开关，但未给出 Cline 官方出处。

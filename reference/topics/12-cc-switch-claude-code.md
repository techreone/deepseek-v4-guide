---
topic: CC Switch / Claude Code / Claude Desktop / Linux 接入
slug: cc-switch-claude-code
category: research
updated: 2026-08-01
status: written
sources: []
---

# CC Switch / Claude Code / Claude Desktop / Linux 接入

> 本篇结论速览：CC Switch（GitHub: farion1231/cc-switch，截至 2026-08-01 约 123k stars，最新版 v3.19.0 于 2026-07-30 发布）是一个 Tauri 2 桌面 GUI，统一管理 Claude Code / Claude Desktop / Codex / Gemini CLI / Grok Build / OpenCode / OpenClaw / Hermes 八个 AI 编码工具的 provider 配置，内置 50+ 预设（含 DeepSeek）。DeepSeek 官方为 Claude Code 提供了 Anthropic 兼容端点 `https://api.deepseek.com/anthropic` + 一套完整环境变量；Claude Desktop 通过官方"开发者模式 + Configure Third-Party Inference"接入 DeepSeek，或用 CC Switch 的"模型映射 + 本地路由"绕过 Desktop 的模型名白名单限制。OpenCode 官方支持 `/connect` 直连 DeepSeek，且 OpenCode Go 订阅（首月 $5、之后 $10/月）可经 CC Switch 的 OpenCode Go 预设桥接进 Claude Code / Claude Desktop。主要坑：thinking 模式工具调用时 `reasoning_content` 必须回传（否则 400）、CC Switch 代理模式下模型名不要带 `[1m]` 后缀。

## 核心事实（可直接入教程）

- **CC Switch 是什么**：开源的跨平台桌面 All-in-One 管理器，GitHub 仓库 `farion1231/cc-switch`（MIT 协议，作者 Jason Young），官方唯一网站 ccswitch.io。核心价值：不再手改各工具各自的配置文件（`settings.json` / `config.toml` / `.env`），GUI 一键切换 provider；用 SQLite（`~/.cc-switch/cc-switch.db`）做单一数据源，采用"临时文件 + 重命名"原子写入防配置损坏。截止研究时 123k stars、8.3k forks（GitHub 页面 2026-08-01 读取） [github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch) [cuiqingcai.com/3690979](https://cuiqingcai.com/3690979.html)
- **CC Switch 管理哪些工具**：8 个 —— Claude Code、Claude Desktop、Codex、Gemini CLI、Grok Build（v3.18.0 加入，成为第八个受管应用）、OpenCode、OpenClaw、Hermes [github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch) [github.com/farion1231/cc-switch/releases/tag/v3.18.0](https://github.com/farion1231/cc-switch/releases/tag/v3.18.0)
- **切换生效机制**：Claude Code 是唯一支持"热切换"（不重启终端即生效）的工具；其余工具切换后需重启终端或对应 CLI。切换时会写入对应工具的配置文件（Claude Code 写用户级 `~/.claude/settings.json`），因此 VS Code 的 Claude Code 扩展与终端 CLI 共享同一份配置 [github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch) [cuiqingcai.com/3690979](https://cuiqingcai.com/3690979.html)
- **DeepSeek 官方 Claude Code 集成（核心）**：官方文档给出完整环境变量方案，Anthropic 兼容 base_url 为 `https://api.deepseek.com/anthropic`。Linux/Mac 全量配置见下文"教程素材"节 [api-docs.deepseek.com/quick_start/agent_integrations/claude_code/](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/) [api-docs.deepseek.com/guides/anthropic_api/](https://api-docs.deepseek.com/guides/anthropic_api/)
- **官方模型映射规则**：Claude Code / Claude Desktop 场景下，传入的 Claude 模型名会被自动映射 —— `claude-opus*` → `deepseek-v4-pro`；`claude-haiku*` / `claude-sonnet*` → `deepseek-v4-flash`。传入不支持/未知的模型名时，后端**静默回退到 `deepseek-v4-flash`**（这是很多"配置了 Pro 却在跑 Flash"问题的根源） [api-docs.deepseek.com/quick_start/agent_integrations/claude_code/](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/) [api-docs.deepseek.com/guides/anthropic_api/](https://api-docs.deepseek.com/guides/anthropic_api/)
- **Claude Desktop 官方接入方式**：DeepSeek 官方文档确认，新版 Claude Desktop APP 的"开发者模式"下，只需改 base_url 和 api_key 即可连接 DeepSeek 模型（利用上述模型映射绕过 APP 的模型名限制）。具体路径：启动 Claude Desktop（无需登录）→ Help → Troubleshooting → Enable Developer Mode → Developer → Configure Third-Party Inference… [api-docs.deepseek.com/quick_start/agent_integrations/claude_code/](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/) [claude.com/docs/third-party/claude-desktop/installation](https://claude.com/docs/third-party/claude-desktop/installation) [openrouter.ai/docs/cookbook/coding-agents/claude-desktop-integration](https://openrouter.ai/docs/cookbook/coding-agents/claude-desktop-integration)
- **Claude Desktop 的模型名限制与 CC Switch 解法**：Claude Desktop 只接受 `claude-sonnet-*` / `claude-opus-*` / `claude-haiku-*` 三类角色 ID，拒绝非 Claude 模型名（新版更严格）。CC Switch 用"模型映射模式 + 本地路由"解决：Desktop 发出的请求先到本机 gateway，CC Switch 按映射表把角色路由翻译成真实模型名（如 Sonnet 角色 → `deepseek-v4-pro`、Haiku 角色 → `deepseek-v4-flash`）再转发给 DeepSeek [ccswitch.io/en/docs](https://ccswitch.io/en/docs?item=add&section=providers) [github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.6-claude-desktop.md](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.6-claude-desktop.md) [javaguide.cn/ai-coding/cases/claude-desktop-cc-switch](https://javaguide.cn/ai-coding/cases/claude-desktop-cc-switch.html)
- **OpenCode 官方接入 DeepSeek**：DeepSeek 官方文档提供两条路：① OpenCode v1.14.24+ 中 `/connect` → 输入 `deepseek` → 选 provider → 填 API Key → 选 `deepseek-v4-pro` 模型；② 用与 Claude Code 相同的 `ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic` 环境变量方案。官方称 OpenCode 是"terminal, web, and other forms"的开源 AI 编码助手 [api-docs.deepseek.com/guides/coding_agents/](https://api-docs.deepseek.com/guides/coding_agents/)
- **CC Switch 的 OpenCode 预设**：CC Switch 内置 OpenCode 面板的 DeepSeek 预设（预设内部用 `@ai-sdk/deepseek` provider 包，配置 `apiKey` + 模型目录）。v3.18.0 起还新增 **OpenCode Go**（opencode.ai/zen/go）预设，覆盖 Claude / Claude Desktop / Codex / OpenCode 四个应用，可直接粘贴纯 API key（无 OAuth）；PR #3157（2026-05-26 合并）专门为 Claude 与 Claude Desktop 增加 "OpenCode Go (DeepSeek V4 Flash)" 预设 [github.com/farion1231/cc-switch/commit/938e2eb563961caf61e2c46e8f2dd97b8c14288a](https://github.com/farion1231/cc-switch/commit/938e2eb563961caf61e2c46e8f2dd97b8c14288a) [github.com/farion1231/cc-switch/pull/3157](https://github.com/farion1231/cc-switch/pull/3157) [ccswitch.io/en/docs](https://ccswitch.io/en/docs?item=add&section=providers)
- **OpenCode Go 订阅定价（站长关心点，已核实）**：OpenCode Go 官方页面明示 "a low cost subscription: **$5 for your first month, then $10/month**"。它是"登录 OpenCode Zen → 订阅 Go → 复制 API key"的低价订阅（面向开源/开放编码模型），有使用限额，超限后可回落免费模型或启用 Zen 余额 [opencode.ai/go](https://opencode.ai/go) [opencode.ai/docs/go/](https://opencode.ai/docs/go/) [thomas-wiegold.com/blog/opencode-go-review](https://thomas-wiegold.com/blog/opencode-go-review/)
- **Linux 安装 CC Switch**：官方支持 `.deb`（Debian/Ubuntu）、`.rpm`（Fedora/RHEL/openSUSE）、`.AppImage`（通用）；Arch 推荐 `paru -S cc-switch-bin`（AUR）。官方 Flatpak 不随 release 提供。Wayland 场景：AppImage 默认强制 `GDK_BACKEND=x11`（XWayland），若点击不响应/窗口黑屏可用 `CC_SWITCH_GDK_BACKEND=wayland ./CC-Switch-*.AppImage` 切回原生 Wayland（sway/Hyprland 平铺合成器下反而不响应时可反向设成 x11）。系统要求 Ubuntu 22.04+ / Debian 11+ / Fedora 34+ [github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)
- **reasoning_content 400 坑（最常见的坑）**：DeepSeek thinking 模式文档明确：**工具调用轮次的 `reasoning_content` 必须在后续所有请求中原样回传，否则 API 返回 400**（"The content[].thinking in the thinking mode must be passed back to the API."）。Claude Code / OpenCode 等客户端可能不保存/回传该非标准字段 → 工具调用后持续 400。CC Switch 相关 issue #2331（"Claude Code 与 DeepSeek V4-Flash 工具调用报错：缺少 reasoning_content"）与 OpenCode issue #24901 均记录此问题 [api-docs.deepseek.com/guides/thinking_mode/](https://api-docs.deepseek.com/guides/thinking_mode/) [github.com/farion1231/cc-switch/issues/2331](https://github.com/farion1231/cc-switch/issues/2331) [github.com/anomalyco/opencode/issues/24901](https://github.com/anomalyco/opencode/issues/24901)
- **`[1m]` 后缀在 CC Switch 代理模式下的坑**：直连模式（非代理）下官方推荐 `deepseek-v4-pro[1m]`（Claude Code 的 1M 上下文标记）。但若开启 CC Switch 本地路由/代理模式，`[1m]` 会被原样当模型名转发，DeepSeek 不认识就**静默回退到 flash** → 能力大幅下降。代理模式下模型名要写 `deepseek-v4-pro`（不带后缀） [blog.csdn.net/baidu_16370559/article/details/161260862](https://blog.csdn.net/baidu_16370559/article/details/161260862) [gitcode.csdn.net/6a0d78b010ee7a33f273ea14](https://gitcode.csdn.net/6a0d78b010ee7a33f273ea14.html) [github.com/farion1231/cc-switch/issues/2337](https://github.com/farion1231/cc-switch/issues/2337)
- **旧模型名弃用**：`deepseek-chat` 与 `deepseek-reasoner` 于 **2026-07-24 15:59 UTC 弃用**（此前分别对应 deepseek-v4-flash 的非思考/思考模式）。V4 时代统一用 `deepseek-v4-pro` / `deepseek-v4-flash` [api-docs.deepseek.com/guides/reasoning_model](https://api-docs.deepseek.com/guides/reasoning_model)

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| CC Switch GitHub | `github.com/farion1231/cc-switch`（MIT，作者 Jason Young） | [github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch) |
| CC Switch Star / Fork（2026-08-01） | ~123k / ~8.3k | [github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch) |
| 最新稳定版 | v3.19.0（2026-07-30）；v3.18.0 于 2026-07-21（新增 Grok Build 为第八个受管应用） | [github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases) [github.com/farion1231/cc-switch/releases/tag/v3.18.0](https://github.com/farion1231/cc-switch/releases/tag/v3.18.0) |
| 技术栈 | Tauri 2（前端 React 18 + TS + Vite + Tailwind；后端 Rust），SQLite（`~/.cc-switch/cc-switch.db`） | [github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch) |
| 受管工具数 / 内置预设 | 8 个工具 / 50+ provider 预设（Claude 预设列表含 DeepSeek、Zhipu GLM、Kimi、MiniMax、Bailian/Qwen、SiliconFlow、OpenRouter、Xiaomi MiMo 等） | [github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch) [ccswitch.io/en/docs](https://ccswitch.io/en/docs?item=add&section=providers) |
| DeepSeek Claude Code 端点 | `https://api.deepseek.com/anthropic`（官方 Anthropic 兼容 base_url） | [api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/) |
| 官方模型映射 | `claude-opus*`→`deepseek-v4-pro`；`claude-haiku*`/`claude-sonnet*`→`deepseek-v4-flash`；未知模型名→静默回退 flash | [api-docs.deepseek.com](https://api-docs.deepseek.com/guides/anthropic_api/) |
| Claude Code 安装 | `npm install -g @anthropic-ai/claude-code`（Node 18+） | [api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/) |
| OpenCode 最低版本 | ≥ v1.14.24（官方建议升级到最新） | [api-docs.deepseek.com](https://api-docs.deepseek.com/guides/coding_agents/) |
| CC Switch Linux 安装包 | `.deb` / `.rpm` / `.AppImage`；Arch: `paru -S cc-switch-bin` | [github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch) |
| OpenCode Go 定价 | 首月 $5，之后 $10/月 | [opencode.ai/go](https://opencode.ai/go) |
| V4 Flash 价格（2026-08-01 官方） | cache hit $0.0028/M；cache miss $0.14/M；输出 $0.28/M | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| V4 Pro 价格（2026-08-01 官方） | cache hit $0.003625/M；cache miss $0.435/M；输出 $0.87/M | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| Anthropic API 兼容性（重要字段） | `max_tokens`/`stream`/`system`/`temperature`(0-2)/`stop_sequences`/`top_p` 全支持；`thinking` 支持但 `budget_tokens` 被忽略；`output_config` 仅 effort 支持；`top_k`/`cache_control`/`citations`/图片与文档 content 不支持；`x-api-key` 头全支持 | [api-docs.deepseek.com/guides/anthropic_api/](https://api-docs.deepseek.com/guides/anthropic_api/) |

## 关键差异 / 时间线

- **官方直连 vs CC Switch 的定位差异**：DeepSeek 官方 Claude Code 集成（环境变量）是"原生命令行、零额外依赖"方案；CC Switch 的价值在"多供应商 GUI 切换 + MCP/Skills/Prompts 统一管理 + 用量统计 + 本地路由"，是配置管理增强层，不是替代关系。社区教程（deepseekagent.io）建议：新手/常切换者用 CC Switch，想逐字段理解再读官方文档 [deepseekagent.io/guides/cc-switch](https://deepseekagent.io/guides/cc-switch) [ofox.ai/zh/blog/cc-switch-claude-code-tutorial-2026](https://ofox.ai/zh/blog/cc-switch-claude-code-tutorial-2026/)
- **Claude Desktop 三种接入模式（CC Switch 侧）**：① Direct mode —— provider 暴露原生 Anthropic Messages API 且模型名是 Desktop 认可的 `claude-sonnet-*`/`claude-opus-*`/`claude-haiku-*` 角色 ID，可直连；② Model mapping mode —— 模型名非三档角色 ID（含 DeepSeek / Kimi）时，必须经 CC Switch 本地 gateway 映射成 Sonnet/Opus/Haiku 路由；③ Claude Desktop Official —— 恢复官方登录。DeepSeek、Kimi 等 Chat 格式预设默认已勾选"需要模型映射" [ccswitch.io/en/docs](https://ccswitch.io/en/docs?item=add&section=providers) [github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.1-add.md](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.1-add.md)
- **Claude Desktop 接入时间线（2026）**：2026 年 4 月起 Claude Desktop 开放第三方模型支持（社区教程口径）；2026 年 5 月 Anthropic 推出 "Cowork on 3P" —— 内置第三方推理 gateway，并新增模型验证逻辑（不匹配角色 ID 的模型被拒 → 需要映射层） [xylon221.github.io/2026/05/ClaudeDesktop-DeepSeekV4](https://xylon221.github.io/2026/05/ClaudeDesktop-DeepSeekV4/) [www.shawnmayzes.com/ai-engineering/using-claude-locally-2026](https://www.shawnmayzes.com/ai-engineering/using-claude-locally-2026/) [zhuanlan.zhihu.com/p/2039113876382472104](https://zhuanlan.zhihu.com/p/2039113876382472104)
- **模型名弃用时间线**：`deepseek-chat` / `deepseek-reasoner` 2026-07-24 弃用 → 老教程里的这两个名字不再适用；当前统一 `deepseek-v4-pro` / `deepseek-v4-flash`（flash 已更新为 V4-Flash-0731 build，调用名不变） [api-docs.deepseek.com/guides/reasoning_model](https://api-docs.deepseek.com/guides/reasoning_model) [api-docs.deepseek.com](https://api-docs.deepseek.com/)
- **CC Switch 版本迭代（与本文主题相关的关键版本）**：v3.13.0（Codex OAuth 反向代理引入）；v3.14.1（社区教程常用版本）；v3.15.0（Claude Desktop"模型映射 + 本地路由"接入第三方正式成型）；v3.16.1（2026-06-01）；v3.18.0（Grok Build 第 8 个应用 + OpenCode Go 预设 + 英文/日文路由攻略）；v3.19.0（2026-07-30，安全加固批次） [ofox.ai/zh/blog/cc-switch-multi-cli-claude-code-codex-gemini-2026](https://ofox.ai/zh/blog/cc-switch-multi-cli-claude-code-codex-gemini-2026/) [github.com/farion1231/cc-switch/releases/tag/v3.18.0](https://github.com/farion1231/cc-switch/releases/tag/v3.18.0)

## 教程素材（写作时直接引用）

- **DeepSeek 官方 Claude Code 环境变量（Linux/Mac，逐行可粘贴）**：
```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=<your DeepSeek API Key>
export ANTHROPIC_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
export CLAUDE_CODE_EFFORT_LEVEL=max
```
来源：DeepSeek 官方文档（直接、可复用） [api-docs.deepseek.com/quick_start/agent_integrations/claude_code/](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/) [api-docs.deepseek.com/guides/coding_agents/](https://api-docs.deepseek.com/guides/coding_agents/)（awesome-deepseek-agent 仓库 variant 额外含 `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1`，其中 HAIKU 为 `deepseek-v4-flash[1m]`） [github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/claude_code.md](https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/claude_code.md)
- **settings.json 持久化写法（等价的官方 GitHub 配置）**：
```json
{ "env": {
  "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
  "ANTHROPIC_AUTH_TOKEN": "<key>",
  "ANTHROPIC_MODEL": "deepseek-v4-pro[1m]",
  "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro[1m]",
  "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro[1m]",
  "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash",
  "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
  "CLAUDE_CODE_EFFORT_LEVEL": "max" } }
```
来源（此即 CC Switch 底层写入用户级 `~/.claude/settings.json` 的同一格式） [github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/claude_code.md](https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/claude_code.md) [cuiqingcai.com/3690979](https://cuiqingcai.com/3690979.html)
- **CC Switch 添加 DeepSeek provider 的标准字段**（社区多篇教程一致）：
  - 名称：`DeepSeek`（自定义）
  - Base URL：`https://api.deepseek.com/anthropic`（注意是 `/anthropic`，不是 `/v1`，末尾不要加斜杠）
  - 认证字段：`ANTHROPIC_AUTH_TOKEN`（⚠️ 不是 ANTHROPIC_API_KEY）
  - API Key：DeepSeek Platform 创建
  - API 格式：Anthropic Messages（原生）
  - 模型映射建议：Opus/Sonnet 角色 → `deepseek-v4-pro`；Haiku 角色 → `deepseek-v4-flash`；子代理 → `deepseek-v4-flash`
  来源 [blog.csdn.net/baidu_16370559/article/details/161260862](https://blog.csdn.net/baidu_16370559/article/details/161260862) [zhuanlan.zhihu.com/p/2039113876382472104](https://zhuanlan.zhihu.com/p/2039113876382472104) [deepseekagent.io/guides/cc-switch](https://deepseekagent.io/guides/cc-switch) [dashen-tech.com/en/dev-tools/19-cc-switch-multi-model-ai-coding-guide](https://dashen-tech.com/en/dev-tools/19-cc-switch-multi-model-ai-coding-guide/)
- **Claude Desktop 官方接入步骤**（DeepSeek 官方 + Anthropic 官方 + OpenRouter 三方一致）：启动 Claude Desktop → 不登录 → Help → Troubleshooting → Enable Developer Mode → Developer → Configure Third-Party Inference… → 填 base_url `https://api.deepseek.com/anthropic` + DeepSeek API key + 模型。OpenRouter 文档提醒：Desktop 的第三方 inference 仅在 Anthropic 一供方下保证工作，且 Sandbox 工具可能拦截外网，需在 egress 白名单放行 [api-docs.deepseek.com/quick_start/agent_integrations/claude_code/](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/) [claude.com/docs/third-party/claude-desktop/installation](https://claude.com/docs/third-party/claude-desktop/installation) [openrouter.ai/docs/cookbook/coding-agents/claude-desktop-integration](https://openrouter.ai/docs/cookbook/coding-agents/claude-desktop-integration) [reddit.com/r/ClaudeAI/comments/1ste1wo](https://www.reddit.com/r/ClaudeAI/comments/1ste1wo/claude_desktop_now_supports_3party_api_endpoint/)
- **直接填 `https://api.deepseek.com` 的坑**：社区教程实测：base URL 填 `https://api.deepseek.com`（无 `/anthropic`）虽能列出模型但请求报错，必须精确为 `https://api.deepseek.com/anthropic`；Connection Refused 也常因末尾多余斜杠 [www.xiaoge.org/archives/claude-desktop-api](https://www.xiaoge.org/archives/claude-desktop-api) [deepseek.csdn.net/69f754f20a2f6a37c5a7ad9a](https://deepseek.csdn.net/69f754f20a2f6a37c5a7ad9a.html)
- **OpenCode 官方接入**（v1.14.24+）：`opencode` → `/connect` → 输入 `deepseek` → 选 provider → 粘贴 API Key → 选 DeepSeek-V4-Pro。或复用 Claude Code 的 ANTHROPIC_* 环境变量方案 [api-docs.deepseek.com/guides/coding_agents/](https://api-docs.deepseek.com/guides/coding_agents/)
- **CC Switch 代理/本地路由模式的验证与注意事项**：
  - 验证生效：Claude Code 里 `/status` 查看 Anthropic base URL 是否为本机路由；或看 CC Switch 请求日志（app_type、request_model、status_code、latency_ms），如 `claude-desktop deepseek-v4-flash claude-haiku-4-5 200`（request_model 仍是 Claude 角色 ID 属正常——那是映射前的名字）
  - DeepSeek 侧佐证：DeepSeek Platform 用量/账单页看到请求计数与 token 消耗
  - 代理模式模型名**不要带 `[1m]`**（会被原样转发导致静默回退 flash）；路由模式未填的模型槽会沿用已填模型（Sonnet 优先），Haiku 等子代理调用始终有模型可用
  来源 [zhuanlan.zhihu.com/p/2050272532046074760](https://zhuanlan.zhihu.com/p/2050272532046074760) [github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.6-claude-desktop.md](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.6-claude-desktop.md) [blog.csdn.net/baidu_16370559/article/details/161260862](https://blog.csdn.net/baidu_16370559/article/details/161260862)
- **thinking 模式工具调用的 400 与缓解**：DeepSeek 官方思考模式文档明示工具调用轮次 `reasoning_content` 必须全量回传；纯对话无工具调用可不回传。Claude 客户端过滤该非标准字段 → 400。缓解手段：① 用 CC Switch 的本地代理 + **Rectifier**（"思考签名修复"，修复第三方网关 thinking block 格式不兼容，设置→高级）；② 社区开源代理 dsv4-cc-proxy（响应端剥离 thinking 事件、请求端补全结构）；③ 确认会话前半段未混用其他厂商模型（切换厂商导致历史缺 reasoning_content 也会 400） [api-docs.deepseek.com/guides/thinking_mode/](https://api-docs.deepseek.com/guides/thinking_mode/) [www.zhihu.com/question/2028008440656589236](https://www.zhihu.com/question/2028008440656589236) [deepseek.csdn.net/6a05977e10ee7a33f272657a](https://deepseek.csdn.net/6a05977e10ee7a33f272657a.html) [www.cnblogs.com/imust2008/p/19945935](https://www.cnblogs.com/imust2008/p/19945935) [www.runoob.com/vibe-coding/cc-switch.html](https://www.runoob.com/vibe-coding/cc-switch.html)
- **DeepSeek V4 是纯文本模型**：不支持图片/截图/UI 设计稿等视觉输入；Claude Code 中发图片只会收到 `[Image #1]` 占位符（教程里应提示） [gitcode.csdn.net/6a0d78b010ee7a33f273ea14](https://gitcode.csdn.net/6a0d78b010ee7a33f273ea14.html)
- **成本话术素材**：社区教程口径"成本约为官方的 1/50，日常编码一天约 ¥3~¥8"（CSDN 教程断言，未与官方对账，引用时标注为社区口径）；官方口径见定价页（Flash $0.14/$0.28，Pro $0.435(cache miss)/$0.87） [blog.csdn.net/baidu_16370559/article/details/161260862](https://blog.csdn.net/baidu_16370559/article/details/161260862) [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- **CC Switch 使用场景引子（SEO 文案可用）**：Reddit r/ClaudeCode 社区（2026-05-05，343 upvotes）"Anthropic is scamming Max users 20x"话题下用户吐槽限流，另一 r/DeepSeek 帖（206 upvotes）称 4 周烧 1 亿 token 不到 $30 —— 社区情绪是把 Claude Code 后端切到 DeepSeek 的驱动力（媒体转述，属社区声音非官方数据） [ofox.ai/blog/claude-code-switch-tutorial-2026/](https://ofox.ai/blog/claude-code-switch-tutorial-2026/)

## 来源清单（完整 URL）

1. https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/ — DeepSeek 官方：Claude Code 集成（环境变量、模型映射、Web Search）【最权威】
2. https://api-docs.deepseek.com/guides/anthropic_api/ — DeepSeek 官方：Anthropic API 用法 + 逐字段兼容性表
3. https://api-docs.deepseek.com/guides/coding_agents/ — DeepSeek 官方：Claude Code / OpenCode / OpenClaw 接入总览
4. https://api-docs.deepseek.com/guides/thinking_mode/ — DeepSeek 官方：thinking 模式与 reasoning_content 回传规则
5. https://api-docs.deepseek.com/guides/reasoning_model — DeepSeek 官方：deepseek-chat/reasoner 弃用（2026-07-24）说明
6. https://api-docs.deepseek.com/quick_start/pricing — DeepSeek 官方定价页（Flash/Pro 单价）
7. https://github.com/farion1231/cc-switch — CC Switch 主仓库 README（功能、FAQ、Linux 安装、Wayland 处理、数据位置）
8. https://github.com/farion1231/cc-switch/releases — 最新 release（v3.19.0 2026-07-30）
9. https://github.com/farion1231/cc-switch/releases/tag/v3.18.0 — v3.18.0（Grok Build 第 8 应用、OpenCode Go 预设）
10. https://github.com/farion1231/cc-switch/pull/3157 — OpenCode Go DeepSeek V4 Flash 预设（Claude + Claude Desktop）
11. https://github.com/farion1231/cc-switch/commit/938e2eb563961caf61e2c46e8f2dd97b8c14288a — OpenCode provider 预设（DeepSeek 预设 @ai-sdk/deepseek）
12. https://github.com/farion1231/cc-switch/issues/2331 — issue：Claude Code + V4-Flash 工具调用缺 reasoning_content 400
13. https://github.com/farion1231/cc-switch/issues/2337 — issue：CCS 本地路由模式 [1m] 后缀不要填
14. https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.1-add.md — 官方手册：添加 provider / 模型映射模式说明
15. https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.6-claude-desktop.md — 官方手册：Claude Desktop 接入（Direct vs 模型映射）
16. https://ccswitch.io/en/docs?item=add&section=providers — 官方文档站：Add Provider（含各工具预设清单）
17. https://claude.com/docs/third-party/claude-desktop/installation — Anthropic 官方：Claude Desktop 3P 安装与 Developer Mode 步骤
18. https://openrouter.ai/docs/cookbook/coding-agents/claude-desktop-integration — OpenRouter：Claude Desktop 第三方接入（含沙箱 egress 提醒）
19. https://github.com/deepseek-ai/awesome-deepseek-agent/blob/main/docs/claude_code.md — 官方 GitHub：Claude Code settings.json 全量配置
20. https://opencode.ai/go — OpenCode Go 官方定价（首月 $5，之后 $10/月）
21. https://opencode.ai/docs/go/ — OpenCode Go 文档（订阅、限额、Zen 余额）
22. https://github.com/anomalyco/opencode/issues/24901 — OpenCode issue：DeepSeek thinking 模式 reasoning_content 400
23. https://deepseekagent.io/guides/cc-switch — 第三方指南：CC Switch 接入 DeepSeek（推荐路径 + FAQ）
24. https://blog.csdn.net/baidu_16370559/article/details/161260862 — 社区教程：DeepSeek V4 接入 Claude Code（CC Switch 篇）[1m] 坑、模型映射表、成本口径
25. https://zhuanlan.zhihu.com/p/2039113876382472104 — 社区：CC Switch 让 Claude 桌面端换 DeepSeek（模型映射 + 本地路由）
26. https://zhuanlan.zhihu.com/p/2050272532046074760 — 社区：Claude Desktop 接入国产模型（本地 gateway 验证、请求日志示例）
27. https://javaguide.cn/ai-coding/cases/claude-desktop-cc-switch.html — 社区：CC Switch Claude Desktop 模型映射原理拆解（Optimizer/cache_control/thinking budget）
28. https://cuiqingcai.com/3690979.html — 社区：Claude Code CC Switch 图形化配置（settings.json 写入、/status 验证、Remote-SSH 本地代理）
29. https://ofox.ai/zh/blog/cc-switch-claude-code-tutorial-2026/ — 社区：cc-switch 配置 Claude Code 完全指南（DeepSeek 接入全流程）
30. https://ofox.ai/zh/blog/cc-switch-multi-cli-claude-code-codex-gemini-2026/ — 社区：CC Switch v3.16.1 全 CLI 指南（Linux 安装、Node 版本矩阵）
31. https://ofox.ai/blog/claude-code-switch-tutorial-2026/ — 社区英文：后端切换指南（含 Reddit 社区数据）
32. https://www.xiaoge.org/archives/claude-desktop-api — 社区：Claude 桌面客户端自定义 API（base URL 必须 /anthropic 的实测坑）
33. https://xylon221.github.io/2026/05/ClaudeDesktop-DeepSeekV4/ — 社区：Claude Desktop + DeepSeek V4 完整配置（开发者模式路径、1M 上下文）
34. https://www.shawnmayzes.com/ai-engineering/using-claude-locally-2026/ — 独立技术文：2026 Claude 本地化（Cowork on 3P、LiteLLM 代理）
35. https://thomas-wiegold.com/blog/opencode-go-review/ — 独立评测：OpenCode Go（背景：Anthropic 2026-01 封第三方用 Claude 订阅凭据）
36. https://deepseek.csdn.net/6a05977e10ee7a33f272657a — 社区：开源代理解决 DeepSeek V4 与 Claude Code 三兼容性问题（dsv4-cc-proxy）
37. https://deepseek.csdn.net/69f754f20a2f6a37c5a7ad9a — 社区：Claude 桌面端集成 DeepSeek-v4-pro（Connection Refused 排错）
38. https://www.cnblogs.com/imust2008/p/19945935 — 社区：Claude Code 连 DeepSeek 400 排查（reasoning_content 回传规则）
39. https://www.zhihu.com/question/2028008440656589236 — 社区讨论：DeepSeek reasoning 回传（工具调用必须回传）
40. https://www.reddit.com/r/ClaudeAI/comments/1ste1wo/claude_desktop_now_supports_3party_api_endpoint/ — Reddit：Claude Desktop 3P 端点实操步骤

## gaps（未核实 / 需后续确认）

- **站长场景"OpenCode 桥接进 Claude Code/Claude Desktop"的精确含义**：已确认 CC Switch 有 OpenCode Go 预设可把 Go 订阅的 API key 直接用在 Claude Code / Claude Desktop（PR #3157、v3.18.0 release notes），且 OpenCode Go 官方定价已核实（首月 $5、之后 $10/月）。但"OpenCode→Claude Code 桥接"若指把**本地 OpenCode CLI 会话**桥进 Claude Code（而非 OpenCode Go 订阅），未找到官方/主流做法，仅有 OpenCode issue #24901 显示 OpenCode 直接调 DeepSeek 有 reasoning_content 问题 —— 待向站长确认其实际工作流。
- **OpenCode Go 包含的模型清单与 DeepSeek V4 是否在 Go 套餐内**：opencode.ai/go 页面确认 $5/$10 定价与"open coding models"，但未逐条列出含哪些模型；PR #3157 出现的 "OpenCode Go (DeepSeek V4 Flash)" 预设说明 Go 至少提供过 DeepSeek V4 Flash，具体清单与限额需以 OpenCode console 为准。
- **Claude Desktop Linux 桌面版**：Anthropic 官方 3P 文档给出了 macOS/Windows 菜单路径（Help → Troubleshooting → Enable Developer Mode）；Linux 版 Claude Desktop 的开发者模式入口细节与限制未在本次研究中核实到官方文档（DeepSeek 官方只提"新 Claude Desktop APP"）。Reddit/社区多为 Windows 教程。
- **CC Switch 具体版本号的对应教程字段**：社区教程（CSDN、知乎）基于 v3.14.x / v3.15.x 截图；v3.18/3.19 界面字段可能微调（如 DeepSeek preset 自动勾选"需要模型映射"），教程写作时应提示"以当前版本实际界面为准"。
- **reasoning_content 400 在官方 Claude Code 直连（非 CC Switch）下是否仍出现**：CC Switch issue #2331 与 AstrBot issue #7798、OpenCode issue #24901 均为第三方客户端场景；官方 Claude Code 直连 DeepSeek 时客户端是否已适配 reasoning_content 回传，未找到官方明确说明（DeepSeek 官方集成教程未提及此坑）。社区建议用 CC Switch 的 Rectifier 或 dsv4-cc-proxy 兜底。
- **`[1m]` 后缀与 1M 上下文的官方口径**：`deepseek-v4-pro[1m]` 中 `[1m]` 是 Claude Code 侧的 1M 上下文标记（社区教程明确、官方环境变量示例也在用），但"不带 [1m] 时上下文约 20 万 token"的具体数值出自社区教程（CSDN），官方定价页标注 1M context / 384K max output，两者未完全对齐 —— 教程引用时建议以官方 1M context 为准。
- **CC Switch 桌面版与 Claude Desktop 在 Linux 上的协同**：CC Switch 官方文档 2.6 节有 Claude Desktop 模型映射说明，但专门针对 Linux 上 Claude Desktop + CC Switch 的端到端实测教程未见；桌面版 CC Switch 需图形会话（无头环境建议用 SaladDay/cc-switch-cli 或 cc-switch-web 变体）。
- **成本"1/50"口径**：CSDN 教程"成本约为官方的 1/50、一天 ¥3~¥8"是社区推算，官方未背书；教程引用时应改为以官方定价页数字计算对比。

---
topic: DeepSeek Harness 与主流编码 agent/IDE 的对比与集成
slug: harness-integrations
category: integration
updated: 2026-08-16
status: research
sources:
  - https://github.com/jeremy9682/dsh-cursor-codex
  - https://github.com/0xsline/awesome-deepseek-harness
  - https://www.alphalab.site/deepseek-harness
  - https://omniakey.com/blog/deepseek-harness-omniakey-setup
  - https://flowtivity.ai/blog/deepseek-harness-open-source-agent-explained/
  - https://medium.com/@richardhightower/deepseek-harness-launches-deepseek-harness-vs-grok-build-are-they-the-claude-code-killer-c7259fa1d507
  - https://tw.news.yahoo.com/deepseek-%E6%AD%A3%E5%BC%8F%E9%96%8B%E6%BA%90%E8%87%AA%E5%AE%B6%E7%B7%A8%E7%A8%8B%E6%87%89%E7%94%A8-deepseek-harness-dsh-230820472.html
  - https://mdnice.com/writing/b574368333ac46fbbef6658a5511b7cd
  - https://zhuanlan.zhihu.com/p/2071558746732597623
  - https://composio.dev/content/best-agent-harness-deepseek-v4-flash
  - https://university.tenten.co/t/2026-deepseek-v4-flash-coding-agent-opencode-codex-claude-code/2501
---

# DeepSeek Harness 对比与集成研究（2026-08-16）

> 前置：官方基础信息见 topics/21-deepseek-harness-release.md。本文聚焦对比与集成。版本：NPM @deepseek-ai/dsh 0.1.0-rc.6（8/14 查核，官方 README 警告仍有 compatibility-breaking changes）。

## 1. vs Claude Code

**定位差异（媒体共识）**：
- DeepSeek Harness 官方定义：open-source agent harness（一切皆插件）；媒体定性"直接对标 Claude Code"（Yahoo TW 新闻，8/14）
- Claude Code：成熟商业编码 agent，先发优势在 MCP/Agent Skills/Plugins 生态；DeepSeek 的差异化是"Harness Engineering"新范式——连 agent 主循环本身都可插拔（medium richardhightower，8/14）
- "DeepSeek Cut 262 MiB of Claude Code From Its New Harness"（medium chewloongnian，8/14）：早期 rc（0.0.1-rc.5，586 MiB）曾内置 Claude Code 组件，正式 rc 已移除（262 MiB）——旧构建仍在 NPM

**功能对照（多方汇总）**：

| 维度 | DeepSeek Harness (dsh) | Claude Code |
|---|---|---|
| 开源 | MIT，源码全开放 | 闭源 |
| 架构 | 一切皆插件（Cordis kernel），主循环可插拔 | 单一工具链 + MCP/skills/plugins |
| 模型 | 不绑模型，可接任意 OpenAI 兼容 provider | 主要为 Claude 模型优化 |
| 运行 | 本地 Web UI（127.0.0.1:3080）+ CLI/headless | 终端 CLI + IDE 插件 |
| 可追溯 | append-only session log + Trajectory view | 会话记录 |
| 模式 | Standard/Code/Minimal/Creator 四套 preset | 单一 agent 模式 |
| 价格 | 免费开源（模型按 API 计费） | 订阅 + API 计费 |
| 生态 | 发布 2-3 天 95K stars，插件爆发（awesome 清单 60+ 插件） | 成熟 MCP/插件市场 |

**实测观点**：Hacker News 8/13 讨论 >680 points；Reddit 有 "whole different level" 帖（用户装了 dsh 接好还没深测）；YouTube 对比视频标题 "The Results Surprised Me"；中文实测（mdnice）"30 秒装完，但有坑"（npx 安装踩坑记录）。结论：完成率取决于模型×harness×工具×缓存，不是单一"谁更好"。

## 2. vs OpenCode

- **定位差异**：OpenCode 是开源单一工具链编码 agent（OpenAI 系）；dsh 是"agent factory"（插件化运行时，官方定义 agent development/runtime environment）——codepick.dev "not ready-to-use agent but agent factory"
- **成本对比（composio，8/11）**：DeepSeek V4 Flash 场景下各 harness 单任务成本：DeepAgents $0.045、Hermes $0.056+、OpenCode $0.073、Codex 更高——harness 选择影响成本
- **同一 repo A/B 方法论（alphalab，8/14）**：分两赛道——A：同一 DeepSeek 模型隔离 harness 差异；B：各用原生推荐设置测整套产品。dsh 官方 README 提供 minimal mode 供公平 benchmark
- **生态成熟度**：tenten 评比（8/7）指出 dsh 前身/同类开源 harness 生态（plugin/MCP/社区/bug 修复）尚不够成熟，建议观望；发布后插件爆发改变此判断

## 3. IDE 集成（Cursor / VS Code / JetBrains）

**官方**：dsh 无官方 IDE 插件（本地 Web UI + CLI headless 模式）。社区方案补齐：

- **dsh-cursor-codex（jeremy9682，8/15）**：三通道集成 Cursor 与 Codex CLI——
  - ACP 通道：`dsh plugin --profile acp add @jeremy9682/dsh-acp` → `dsh --profile acp` 起 ACP stdio server（Agent Client Protocol），支持 Zed/JetBrains 等 ACP 客户端
  - MCP 通道：zero-dependency MCP stdio server 暴露 `dsh_delegate`/`dsh_health` 给 Cursor/Codex（合并 templates/cursor/mcp.json 到 ~/.cursor/mcp.json；Codex 用 dsh.config.toml）
  - Headless 通道：`dsh --profile headless "<task>"` 一次性任务
  - 已验证 dsh 0.1.0-rc.6
- **dsh-plugin-open-editor**（awesome 清单）：会话页头一键用本地编辑器（VS Code/Cursor/JetBrains/Vim）打开当前项目
- **实操观点（aiprofitboardroom）**：终端跑 harness + Cursor 做 IDE 侧，两不误
- **Cursor 接 DeepSeek V4 Pro 的旧方案**：deepseek-cursor-proxy（Python 代理转发 reasoning_content，apidog 教程，5/25）——属模型接入非 harness 集成，可作对比素材

## 4. MCP 支持

- **dsh-plugin-setting-mcp**（awesome 清单）：在 dsh 设置面板配置 MCP（官方社区插件）
- **MCP gateway 方案**：dsh-mcp-lens（progressive-disclosure MCP gateway：两个稳定接口搜大型远程工具目录，延迟连接 + 有界缓存）
- **社区 MCP server**（dsh-cursor-codex/server）：stdio server 把 dsh 能力暴露为 MCP 工具（dsh_delegate/dsh_health），供 Cursor/Codex 调用
- **web search MCP 复用**：dsh-web-search-exa（keyless 匿名 MCP fallback：mcp.exa.ai/mcp + keyed REST）；dsh-tavily（多 key 轮换）
- 结论：MCP 以插件形态集成（非原生协议），配置走 Settings → Plugins / cordis 配置

## 5. 模型接入（不绑 DeepSeek 模型）

- **官方**：models 是插件，可换可重组；配置级选择，无需改源码（deepseek.com/harness/en/）
- **自定义 provider**（omniakey，8/14 实测验证）：Web UI 配置屏幕支持 custom-provider 流程——公司网关/自托管 OpenAI 兼容 endpoint 直接可用，模型可切 Claude/GPT/Gemini（同 provider 流）；默认端口 127.0.0.1:3080
- **drop-in 反向**（floatboat，8/3）：Generic harnesses（Claude Code/Cline/OpenCode/Codex）都可接 DeepSeek 模型——双向互通
- **默认模型**：dsh 出厂接 DeepSeek API（V4-Pro/Flash）；切其他模型 = 改配置里的 models 插件/provider 字段
- **KV cache 联动**：alphalab 指出 harness 层影响 KV cache 前缀命中（deepseek 按缓存计费）——模型与 harness 组合影响账单

## 独立页面建议（供父代理写页）

1. "deepseek harness vs claude code"（对比页，功能对照表 + 实测观点）
2. "deepseek harness cursor / IDE 集成"（教程页：dsh-cursor-codex 三通道 + open-editor 插件）
3. "deepseek harness plugins"（插件生态清单页：awesome 60+ 插件分类）
4. "deepseek harness mcp"（教程页：setting-mcp + gateway + 社区 server）
5. "deepseek harness 接入任意模型"（教程页：custom provider + 切 Claude/GPT + KV cache 联动）
6. "deepseek harness vs opencode"（对比页：成本 + A/B 方法论）

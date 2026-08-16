---
topic: DeepSeek Harness v0.1 正式发布（developer preview）
slug: deepseek-harness-release
category: release
updated: 2026-08-16
status: research
sources:
  - https://deepseek.com/harness/en/
  - https://github.com/deepseek-ai/deepseek-harness
  - https://x.com/deepseek_ai/status/2087887408440164663
  - https://www.remio.ai/post/deepseek-harness-launches-putting-the-agent-runtime-above-the-model
  - https://www.blocktempo.com/deepseek-harness-open-source-agent-framework-launch-rivals-claude-code/
---

# DeepSeek Harness v0.1 发布（2026-08-13）

## 核心事实（官方 deepseek.com/harness/en/，2026-08-16 抓取）

- **状态**：developer preview，**源码同步开源**（MIT）
- **发布日**：2026-08-13（v0.1）
- **GitHub**：`deepseek-ai/deepseek-harness`（"Everything is a Plugin"）
- **核心理念**：Everything is a plugin——models / tools / skills / sessions / sandboxes / storage / loops / scheduling / UI 全部是插件，可换可重组
- **底层**：Cordis 插件系统（Cordis kernel 管理插件挂载/卸载/依赖）；Cordis services + events 让插件协作
- **公式**：Agent = Model + Harness（模型是灵魂，harness 让 agent 在真实环境工作）
- **可追溯**：append-only session log 记录模型所见一切（system prompts/reasoning/tool calls/subagent 调度/context 注入）；Trajectory view 按来源检查；resume/fork/search/replay 基于同一事件流
- **配置组合**：可在配置里选择/替换/扩展任意能力，无需改 Harness 源码

## 四种运行时模式（官方）

| 模式 | 说明 |
|---|---|
| Standard | 完整编码 agent：file editing、shell、file/web search、skills、planning、goals、subagents、workflows |
| Code | Standard 全部能力 + Code Mode SDK（模型用一段 TypeScript 程序组合多步操作） |
| Minimal | 双工具编码 agent：persistent bash + str_replace_editor（用于 benchmark 模型） |
| Creator | 检查当前 runtime、内存中测试 Cordis 插件、组合成新模式 |

## 安装/快速开始（官方）

- `npx @deepseek-ai/dsh web`
- `git clone https://github.com/deepseek-ai/deepseek-harness`（源码构建：pnpm install / pnpm run build / pnpm dsh web）
- 官方站另有：Developer docs / Community plugins / Cordis paper 入口

## 社区热度（2026-08-14~16）

- 发布首日 GitHub 38K stars（Facebook 报道）；2 天 95K stars（flowtivity.ai）
- 媒体定性：不绑自家模型、直接对标 Claude Code（blocktempo 中文报道）
- 独立指南站已出现：deepseekharness.io、open-harness.net（dsh 安装/常见错误）

## 时间线背景

- 7/31：V4-Flash-0731 changelog 首次提及（"to be released soon"，minimal mode 跑 benchmark）
- 8/10-20：NDA beta 传闻窗口
- 8/13：v0.1 developer preview 正式发布（源码 + 官方页 + X 官宣）

## 待扩展研究（子代理任务）

- [ ] dsh CLI 完整命令（web/code/minimal/creator 模式切换）
- [ ] 插件生态清单（官方 community plugins + dsh-plugin 趋势）
- [ ] 常见错误与修复（open-harness.net 的踩坑）
- [ ] 与 Claude Code / OpenCode 的功能对照细节
- [ ] MCP 支持方式（插件 or 原生）

---
topic: DeepSeek Harness 安装使用与插件生态
slug: harness-usage-plugins
category: integration
updated: 2026-08-16
status: research
sources:
  - https://github.com/deepseek-ai/deepseek-harness（README，2026-08-16 抓取，127,689★）
  - https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/apps/cli/README.md
  - https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/index.md
  - https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/docs/user/guide/providers.md
  - https://github.com/awesome-dsh-plugin/awesome-dsh-plugin（4,519★）
  - https://deepseekharness.io/（616 个社区插件索引）
  - https://www.open-harness.net/（The Complete Guide，对照 dsh 0.1.0-rc.6，2026-08-14）
  - https://www.mindstudio.ai/blog/deepseek-harness-agentic-coding（2026-08-14）
  - https://deepseek.com/harness/en/（官方页）
---

# DeepSeek Harness 安装使用与插件生态（dsh v0.1.0-rc.6）

## 1. CLI 用法（官方 apps/cli/README.md + 根 README）

### 安装与启动

```sh
# npm 一行启动（Web UI，默认 http://127.0.0.1:3080）
npx @deepseek-ai/dsh web

# 源码构建
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

### 命令语法

| 命令 | 用途 |
|---|---|
| `dsh web` | = `--profile web` 别名，启动 Web UI |
| `dsh --profile <name>` | 按命名 profile 启动（`$DSH_HOME/profiles/<name>`） |
| `dsh --profile headless "job"` | headless 模式：跑一次会话、打印最终答案、退出 |
| `dsh plugin --profile <name> <pnpm args>` | 管理 profile 插件（转发给 pnpm） |
| `dsh --profile web --port 8080` | 带 app 参数（--port 属于 web app） |
| `dsh --dump-default-config` / `--dump-config` | 检查组合后的配置树（不启动） |
| `dsh --help` | launcher 帮助（app 参数要放在 launcher 旗标后） |

### 关键概念

- **Workspace**：启动目录 = 默认文件系统位置；Web UI 需先 Choose workspace（选择项目目录）才能开会话
- **Profiles**：profile 目录 = `package.json`（`dsh.profile` manifest 含有序 `bundles` 列表）+ `cordis.patch.yml`（用户 patch 层）；web/headless 首次使用自动初始化，其他 profile 需 `dsh plugin` 创建
- **配置组合优先级**：各 bundle 的 patch（按 bundles 顺序）→ profile 的 cordis.patch.yml → `$DSH_HOME/cordis.patch.yml` → `--patch` 覆盖层
- **运行时模式**（官方 harness 页）：Standard（完整编码 agent）/ Code（+ Code Mode SDK，TypeScript 编排多步）/ Minimal（bash + str_replace_editor，跑模型 benchmark）/ Creator（检查 runtime、内存测试插件、组合新模式）
- **可追溯性**：append-only session log（system prompts/reasoning/tool calls/subagent 调度/context 注入全记录），Trajectory view 按来源检查，resume/fork/search/replay 基于同一事件流

## 2. 插件生态（everything is a plugin）

### 安装插件

```sh
dsh plugin --profile web add <包名>
# 或从 dsh-market 插件市场一键装：
dsh plugin --profile web add dshmarket
# 聊天式找插件：
dsh plugin --profile web add dsh-find-plugin
```

- 插件声明 `dsh.bundle` manifest；仓库加 `dsh-plugin` topic 便于被发现（官方推荐）
- ⚠️ 安全提示（awesome 清单警告）：装插件 = 运行第三方代码（可读文件/用凭据/联网），工具审批不沙箱插件代码；陌生插件在无密钥环境试

### 生态规模（2026-08-16）

- GitHub 仓库 127,689★ / 12,732 forks（API 实测；8/13 发布 → 8/14 day-2 66.3K → 8/16 127K）
- **awesome-dsh-plugin**（4,519★）：官方社区精选清单，分类：UI Enhancements / Models & Providers / Sessions & Messages / Memory / Tools & Capabilities / Vision & Multimodal / Skills / Workflow & Automation / Notifications / Development & Runtime / Plugin Markets
- **deepseekharness.io 索引 616 个社区插件**
- 热门插件示例：
  - `nexu-io/open-design`（87,363★）设计插件（Claude Design 开源替代）
  - `anywhere-labs/deepseek-harness-desktop`（8,457★）桌面端壳
  - `zhu1090093659/dsh-web-ui`（3,295★）Web UI 皮肤/任务板/git graph
  - `liustack/modlens`（2,287★）首个视觉插件（vision bridge）
  - `ccch1mneyyy/dsh-TUI`（1,490★）Claude Code 风 TUI
  - `0xsline/awesome-deepseek-harness`（583★）生态精选
  - MCP 类：`Js2Hou/dsh-mcp-manager`（可视化 MCP 管理）、`Ceelog/dsh-plugins#dsh-plugin-setting-mcp`（设置面板管理 MCP）

### 协作模式（重要背景）

- **仓库不接受外部 PR，GitHub Issues 禁用**；反馈走 GitHub Discussions + Discord（open-harness.net）
- 官方鼓励的扩展方式 = 发布自己的插件（tag `dsh-plugin`）
- 项目由 **Cui Tianyi**（前 Jane Street 工程师，2026-03 加入 DeepSeek）领导，团队约 5 个月从组建到公开预览

## 3. 模型配置（docs/user/guide/providers.md）

### 三层接入方式

1. **DeepSeek 原生**：Settings → Models → 输入 DeepSeek API key（存 `$DSH_HOME/.credentials.yaml`，写后不可读）
2. **目录 provider**（Anthropic / OpenAI 等）：Add provider → 选 → 输 key；目录自带 endpoint/protocol/model 列表，无需手填
   - 原生认证的例外：Bedrock（AWS 凭证+region）、Vertex（ADC 项目）、Azure（api-version）、Codex（OAuth）——只填 API key 不生效
3. **自定义 provider**（公司网关 / 自托管 / 目录外服务）：Add custom provider → Provider ID（永久、小写）+ baseURL + API protocol + credential + models；可 "Fetch available models" 探测（调 OpenAI 兼容 `GET /models`）

### 高级配置（$DSH_HOME/settings.yaml）

```yaml
llm-pi-ai:
  providers:
    my-gateway:
      apiKeyEnv: GATEWAY_API_KEY
      api: openai-completions
      baseURL: https://gateway.example/v1
      models:
        - id: legacy-chat
        - id: vision-preview
          input: [text, image]
```

- `input` 声明模态（text/image），手填模型默认 text-only；`defaultInput` 作 fallback；目录 provider 用 `modelOverrides`
- 相关包：`dsh-llm-pi-ai`（任意模型适配）、`dsh-llm-deepseek`（DeepSeek 专用）
- 模型变更**下次请求即生效，无需重启**

### 常见配置错误（官方 Troubleshooting）

| 错误 | 原因/修复 |
|---|---|
| `MISSING_CREDENTIAL` | 未存 provider key；通过 Models 页存或设对应环境变量 |
| `UNKNOWN_MODEL` | 未选已配置模型；或自定义 provider 缺该 model |
| Fetch models 返回 401 | key 错误；端点不支持 `GET /models` 就手动填模型 |
| 发送图片被拒 | 该模型未声明 image 模态；自定义模型加 `input: [text, image]` |
| provider 拒绝带图请求 | 端点实际不支持图；移除声明的 `image` 并新开会话 |

## 4. 常见错误与修复（社区/官方汇总）

- **总体定位**：developer preview，官方明确 "THERE WILL BE COMPATIBILITY-BREAKING CHANGES"（README）——升级需留意破坏性变更
- **Issues 禁用**：报 bug 走 GitHub Discussions；看别人踩坑去 Discussions + Discord（open-harness.net 提示）
- **安装类**：npm 方式需先装 Node.js；源码构建需 pnpm（monorepo 用 pnpm workspace）；构建需 `pnpm run build` 先出产物再 `pnpm dsh`（production run 要求 built artifacts）
- **启动目录陷阱**：`dsh` 进程用**启动目录**作为默认文件系统位置——在错误目录启动 = 找不到文件/工作区为空；Web UI 需先 Choose workspace
- **凭据类**：key 存 `$DSH_HOME/.credentials.yaml`（写后只读红acted 描述）；改 key 通过 Models 页
- **headless 模式**：`dsh --profile headless "job"` 一次会话打印结果退出；非零退出 = 命令/配置/启动失败（CLI 文档）

## 5. 性能/基准

- **minimal mode** 官方定位：仅 bash + str_replace_editor 双工具，用于**在最小环境跑模型 benchmark**（官方 agent 基准均用它）
- 官方 V4-Flash-0731 基准背景：9 个 agent benchmark 用 Harness minimal mode 测得（Terminal-Bench 82.7、DeepSWE 54.4 等，现有站点 deepseek-harness.ts 已有素材）
- 社区实测：flowtivity.ai "installed it, benchmarked"（标题佐证，正文 SPA 未抓全）
- 热度佐证实用性：127K★（3 天）+ 616 插件 + 多个独立指南站（open-harness.net / deepseekharness.io）说明可安装可用

## 6. 定位与对比（写页素材）

- **mindstudio.ai**：dsh 是 DeepSeek 的 agentic coding 系统（与 V4 Pro 同批发布）；可**把 Claude Code 或 Codex 作为子代理调用**——"less a competitor, more a framework that can sit above them"
- **open-harness.net**：dsh 不是成品助手（Claude Code/Codex 那种），是**组装 agent 的底盘（chassis）**；"there is no privileged core to patch"
- 默认自带完整编码 agent（文件编辑/壳/搜索/计划/技能/子代理/审批策略/本地 Web UI），但每个部件都可替换
- 版本：npm 0.1.0-rc.6（open-harness.net 2026-08-14 对照）

## 适合做独立页面的主题建议

1. **deepseek harness plugins**（616+ 插件生态、dsh plugin add、market、热门插件清单）
2. **deepseek harness install**（npm 一行 / 源码构建 / 端口 3080 / workspace 概念）
3. **deepseek harness model 配置**（接任意模型：目录 provider + 自定义 OpenAI 兼容端点 + settings.yaml）
4. **deepseek harness mcp**（MCP 插件生态：dsh-mcp-manager / dsh-plugin-setting-mcp）
5. **deepseek harness vs claude code**（底盘 vs 成品、子代理调用、插件自由度、Issues/PR 模式差异）

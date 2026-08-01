---
topic: Reasonix：专为 DeepSeek 的高缓存命中率 harness/代理
slug: reasonix-deepseek
category: research
updated: 2026-08-01
status: written
sources:
  - https://github.com/esengine/DeepSeek-Reasonix
  - https://reasonix.io/
  - https://esengine.github.io/DeepSeek-Reasonix/
  - https://api-docs.deepseek.com/quick_start/agent_integrations/reasonix/
  - https://api-docs.deepseek.com/guides/kv_cache/
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://github.com/esengine/DeepSeek-Reasonix/blob/v1/benchmarks/real-world-cache/README.md
  - https://github.com/esengine/DeepSeek-Reasonix/blob/v1/docs/ARCHITECTURE.md
  - https://github.com/esengine/DeepSeek-Reasonix/blob/main-v2/docs/GUIDE.md
  - https://github.com/esengine/DeepSeek-Reasonix/blob/main-v2/reasonix.example.toml
  - https://github.com/esengine/DeepSeek-Reasonix/blob/main-v2/REASONIX.md
  - https://github.com/esengine/DeepSeek-Reasonix/releases
  - https://github.com/esengine/DeepSeek-Reasonix/discussions
  - https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2/
  - https://dev.to/esengine/how-a-deepseek-only-agent-framework-hit-85-prefix-cache-rate-and-saved-93-vs-claude-5c9g
  - https://news.ycombinator.com/item?id=48256953
  - https://www.developersdigest.tech/blog/deepseek-reasonix-cache-first-coding-agents
  - https://aiweekly.co/alerts/deepseek-reasonix-cuts-inference-cost-5x-with-9982-cache-hit
  - https://pi.dev/packages/pi-reasonix
  - https://www.npmjs.com/package/reasonix
  - https://github.com/Hmbown/CodeWhale/issues/2264
  - https://github.com/drm-nz/reasonix-connector
  - https://www.reddit.com/r/DeepSeek/comments/1tnrv19/thoughts_on_reasonix/
  - https://www.reddit.com/r/DeepSeek/comments/1v3cn9f/reasonix_opinions_game_changer_for_me/
  - https://www.reddit.com/r/DeepSeek/comments/1u57n7i/opencode_vs_codewhale_vs_langcli_vs_reasonix/
  - https://www.reddit.com/r/DeepSeek/comments/1v1h58u/best_harness_for_deepseek_v4/
  - https://www.reddit.com/r/DeepSeek/comments/1ucm0if/i_built_a_deepseek_coding_harness_then_it_started/
  - https://www.reddit.com/r/DeepSeek/comments/1uce9me/how_do_you_reliably_hit_95_cache_rate_on_deepseek/
  - https://www.reddit.com/r/DeepSeek/comments/1uey3rm/should_i_switch_from_claude_code_to_another/
  - https://www.verdent.ai/guides/deepseek-reasonix
  - https://chat-deep.ai/pricing/
  - https://deepseek.ai/pricing
  - https://www.aimadetools.com/blog/reasonix-complete-guide/
  - https://knightli.com/en/2026/06/06/deepseek-reasonix-terminal-coding-agent/
  - https://trendshift.io/repositories/27020
  - https://www.ngjoo.com/en/trending/projects/deepseek-reasonix/
---

# Reasonix：专为 DeepSeek 的高缓存命中率 harness/代理

## 核心事实（可直接入教程）

- **Reasonix 是什么**：一个"DeepSeek-native"（深度绑定 DeepSeek API）的终端 coding agent / harness，官方自述为 "DeepSeek-native AI coding agent for your terminal. Engineered around prefix-cache stability — leave it running."（为 prefix-cache 稳定性而设计——让它一直开着）。仓库自述："A config- and plugin-driven harness — a single static Go binary, tuned around DeepSeek's prefix cache so token costs stay low across long sessions."（配置/插件驱动的 harness，单一静态 Go 二进制，围绕 DeepSeek prefix cache 调优，让长会话 token 成本保持极低）(https://github.com/esengine/DeepSeek-Reasonix)
- **GitHub**：`esengine/DeepSeek-Reasonix`，MIT 协议，社区共建（组织名 esengine）。截至 2026-08-01：**28.3k stars、1.8k forks、74 watchers、3,744 commits**，默认分支 `main-v2`。2026-05-25 首次登上 GitHub Trending（daily/weekly）(https://github.com/esengine/DeepSeek-Reasonix, https://trendshift.io/repositories/27020)
- **被 DeepSeek 官方文档收录**：DeepSeek API Docs 有专门页面 "Integrate with Reasonix"（https://api-docs.deepseek.com/quick_start/agent_integrations/reasonix/），说明 Reasonix 是 DeepSeek 官方认可的第三方 agent 集成——这是它区别于普通第三方 CLI 的关键背书。
- **核心卖点 = 缓存命中率高 = 省钱**。官方公开的真实用户单日数据（2026-05-01）：**435,033,856 输入 token 命中缓存，命中率 99.82%**，当天实际花费约 **$1.38**；同样的工作量若 0% 缓存命中则需 **$61.06**——省 **~97.7%**（v4-pro 版本则 $2.07 vs $189.73，省 ~98.9%）(https://github.com/esengine/DeepSeek-Reasonix/blob/v1/benchmarks/real-world-cache/README.md)。注意：README 营销文案写的是"~$12 instead of ~$61"（约 5x），与 benchmark 明细表的 $1.38 不一致，教程引用时建议用 benchmark 明细数字并标注此差异（见 gaps）。
- **技术原理（cache-first loop）**：DeepSeek 的 prefix cache 只在"请求的字节前缀与上一次请求完全一致"时命中。Reasonix 把每次请求切成三个区域，并保证不变量：
  1. **ImmutablePrefix（不可变前缀）**：system prompt + tool 定义 + few-shots 在会话开始时冻结，逐字节不变（session 开始时 hash 并 pin）；
  2. **AppendOnlyLog（只追加日志）**：对话历史只增不改、不乱序；
  3. **VolatileScratch（易变草稿区）**：reasoning/临时状态每轮重置，不进缓存前缀。
  另加 **auto-compact**：上下文接近上限时把旧轮折叠成 summary，且 summary 请求被塑造成复用主 agent 已缓存的 system/tool/history 前缀。官方 benchmark 文档原话："DeepSeek gave us cacheable bytes. The four mechanisms above are how we keep the bytes cacheable."（缓存是 DeepSeek 给的，命中率是客户端的设计决定的）(https://github.com/esengine/DeepSeek-Reasonix/blob/v1/benchmarks/real-world-cache/README.md)
- **四大 Pillar（当前版本）**：Pillar 1 Cache-First Loop（上述三区域）；Pillar 2 Tool-Call Repair（针对 DeepSeek 已知工具调用缺陷的 4 道修复：flatten 深/宽 schema、scavenge 从 reasoning 里捞回漏发的工具调用、truncation 修复截断 JSON、storm 抑制重复调用风暴）；Pillar 3 Cost Control（flash-first 默认、turn-end 自动压缩 3000-token 上限、/model 切换、模型自报 `<<<NEEDS_PRO>>>` 升级机制）。早期版本还有 Pillar 4 "R1 Thought Harvesting"（把 reasoning_content 用便宜 V3 调用来提取结构化计划状态）与 self-consistency branching（3 路并行采样），但 **v0.31 起已删除**（官方称"rarely paid for themselves"）(https://github.com/esengine/DeepSeek-Reasonix/blob/v1/docs/ARCHITECTURE.md, https://dev.to/esengine/how-a-deepseek-only-agent-framework-hit-85-prefix-cache-rate-and-saved-93-vs-claude-5c9g)
- **价格模型**（DeepSeek V4 官方 API，2026-07 验证）：v4-flash 缓存命中输入 **$0.0028/1M** vs 未命中 **$0.14/1M**（**50×** 价差），输出 $0.28/1M；v4-pro 缓存命中 $0.003625 vs 未命中 $0.435（**120×** 价差），输出 $0.87/1M。旧别名 deepseek-chat / deepseek-reasoner 已于 **2026-07-24 停用** (https://chat-deep.ai/pricing/, https://deepseek.ai/pricing, https://benchlm.ai/deepseek/api-pricing, https://www.morphllm.com/deepseek-api)
- **开发状态**：早期（v0.0.6，TypeScript 版）作者自评 "Not production-ready. v0.0.6 pre-alpha"；现已 **v1.18.0**（Go 重写、Stable/Preview 双发布渠道、桌面端内置终端、Kimi K3 支持、区域化人民币/美元计价、桌面/VS Code 扩展/ACP 编辑器集成）。当前定位仍是"opinionated, not general"（有主见的专用工具，非通用框架），DeepSeek 仍是预设主力，但也支持任意 OpenAI-compatible endpoint（以配置项形式）(https://github.com/esengine/DeepSeek-Reasonix/releases, https://github.com/esengine/DeepSeek-Reasonix/blob/v1/docs/ARCHITECTURE.md)
- **与经典 Agent 的差距（社区观点）**：功能面比 Claude Code / OpenCode 小（无第一公民级多 agent 编排、无 RAG、无 Web UI/SaaS）；部分 skills / MCP 兼容性存疑；DeepSeek flash 非多模态（不能直接处理 UI mockup 图片）；社区规模与生态成熟度仍不及两大主流 harness；cache-first 设计被部分资深 harness 作者批评为"把缓存当唯一目标，可能牺牲质量"（见下文 HN 反方观点）(https://github.com/esengine/DeepSeek-Reasonix/blob/v1/docs/ARCHITECTURE.md, https://www.reddit.com/r/DeepSeek/comments/1v1h58u/best_harness_for_deepseek_v4/, https://news.ycombinator.com/item?id=48256953)

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| 仓库 | github.com/esengine/DeepSeek-Reasonix（MIT，Go） | https://github.com/esengine/DeepSeek-Reasonix |
| stars / forks | 28.3k / 1.8k（2026-08-01） | 同上 |
| commits / watchers | 3,744 / 74 | 同上 |
| 默认分支 | main-v2（v2 重写进行中） | 同上 |
| 最新版本 | v1.18.0（Stable + Preview 渠道，桌面端内置终端，Kimi K3，区域化计价） | https://github.com/esengine/DeepSeek-Reasonix/releases |
| 单日真实用例（2026-05-01） | 输入 435,033,856 命中 + 767,616 未命中 + 输出 179,763 = 435,981,235 token；命中率 99.82% | https://github.com/esengine/DeepSeek-Reasonix/blob/v1/benchmarks/real-world-cache/README.md |
| 单日成本 | $1.38（vs 0% 缓存基线 $61.06，省 97.7%）；v4-pro 口径 $2.07 vs $189.73（省 98.9%） | 同上 |
| README 宣传口径 | "~$12 instead of ~$61"（与明细 $1.38 不一致，待核） | https://github.com/esengine/DeepSeek-Reasonix/tree/v1 README |
| v4-flash 定价（每 1M） | 缓存命中 $0.0028 / 未命中 $0.14 / 输出 $0.28（命中省 50×） | https://chat-deep.ai/pricing/、https://deepseek.ai/pricing |
| v4-pro 定价（每 1M） | 缓存命中 $0.003625 / 未命中 $0.435 / 输出 $0.87（命中省 120×） | 同上 |
| 新用户免费额度 | 5M token，无需信用卡 | https://www.costgoat.com/pricing/deepseek-api、https://www.nxcode.io/resources/news/deepseek-api-pricing-complete-guide-2026 |
| 官方缓存机制 | Context Caching on Disk 默认开启、best-effort、字节级前缀匹配、Sliding Window Attention、请求边界持久化 | https://api-docs.deepseek.com/guides/kv_cache/ |
| dev.to 早期实测 | 多轮 chat 85.2% 命中 / 工具调用 94.9% / R1+harvest 72.7%；相对 Claude Sonnet 4.6 省 93.9% / 95.8% / 85.4%（v0.x TypeScript 时代） | https://dev.to/esengine/how-a-deepseek-only-agent-framework-hit-85-prefix-cache-rate-and-saved-93-vs-claude-5c9g |
| 安装方式 | `npm i -g reasonix`（任意 OS，拉取预编译二进制）/ `brew install esengine/reasonix/reasonix`（macOS）/ `npx reasonix code`（免全局安装）/ 桌面版 / VS Code 扩展（`SivanLiu.reasonix-agent`）/ `make build` 源码构建 | https://github.com/esengine/DeepSeek-Reasonix、https://api-docs.deepseek.com/quick_start/agent_integrations/reasonix/ |
| 默认模型 | deepseek-v4-flash（executor）；可选 [agent] planner_model = "deepseek-pro" 双模型协作 | https://github.com/esengine/DeepSeek-Reasonix/blob/main-v2/docs/GUIDE.md |
| 压缩阈值（reasonix.toml） | soft_compact_ratio=0.5 / tool_result_snip_ratio=0.6 / compact_ratio=0.8 / compact_force_ratio=0.9 | https://github.com/esengine/DeepSeek-Reasonix/blob/main-v2/reasonix.example.toml |
| HN 热度 | item 48256953：729 points / 288 comments（2026-05-24 前后登首页，仅次于 DeepSeek V4 Pro 永久降价新闻） | https://news.ycombinator.com/item?id=48256953、https://aiweekly.co/alerts/deepseek-reasonix-cuts-inference-cost-5x-with-9982-cache-hit |
| 社区 | 双语 Discord（discord.gg/XF78rEME2D）、GitHub Discussions | https://github.com/esengine/DeepSeek-Reasonix |
| 衍生项目 | pi-reasonix（Pi 的 Reasonix 算法移植）、reasonix-connector（OpenCode 插件）、rohaquinlop/pi-deepseek-cache | https://pi.dev/packages/pi-reasonix、https://github.com/drm-nz/reasonix-connector |

## 关键差异 / 时间线

**项目演化时间线**（来源：ARCHITECTURE.md + releases + dev.to）：
- **v0.0.x（2025 年中，TypeScript/Node + Ink TUI）**：Pillar 1 端到端 + repair pipeline 完成。dev.to 文章（作者 esengine 自述）：初版叫 "Reasonix — a TypeScript agent framework built only for DeepSeek"，v0.0.6，135 个测试，作者自评 "not production-ready"。当时的模型还是 deepseek-chat / deepseek-reasoner。
- **v0.3**：MCP client（stdio + SSE）、会话持久化。
- **v0.4.x**：`reasonix code`（SEARCH/REPLACE 编辑）、review/auto gate、后台 jobs、hooks。
- **v0.5.x**：V4 模型支持、skills、memory、subagents。
- **v0.6**：Cost Control（flash-first 默认、auto-compaction、/pro one-shot、失败触发升级、成本徽章）；deepseek-chat / deepseek-reasoner 进入废弃倒计时，全面切换到 v4-flash / v4-pro。
- **v0.31**：`branch` + `harvest` 功能被整体移除（并行采样选择器与 R1 计划状态提取器"rarely paid for themselves"）。
- **v1.x（Go 重写，main-v2）**：改为 CGO_ENABLED=0 单一静态 Go 二进制，跨编译 darwin/linux/windows × amd64/arm64，"唯一的依赖是 TOML parser"。npm 包 `reasonix` 成为预编译二进制的安装器。**1.18.0** 引入 Context Engine v2、桌面端内置终端、Stable/Preview 双渠道、Kimi K3、人民币/美元区域化计价。

**"缓存命中率是客户端的责任"——最关键的行业论点**（benchmark 文档原话翻译）：
- DeepSeek 官方 web chat：单会话内 60–80%，新会话跌到 0%（system prompt 可能不同）；
- Cherry Studio / Open WebUI / 通用 OpenAI 形状 SDK：长会话通常 30–60%（历史被重排、tool 定义被重新序列化、每次漂移都破前缀）；
- Cline / Continue 等 XML 工具调用客户端：更低（每个 tool result 内联进对话，缓存键字节被移位）。
- 结论：同一条 DeepSeek API，不同客户端，命中率天差地别。缓存是 DeepSeek 的，命中率是 harness 的设计决定的。(https://github.com/esengine/DeepSeek-Reasonix/blob/v1/benchmarks/real-world-cache/README.md)

**社区 / 评测界的正反方**：
- 正方（Reddit r/DeepSeek）：
  - "I went from a less than 5% cache hits with claude code to 90% with reasonix."（Thoughts on Reasonix?）
  - "The cache hit is just ridiculously high... The balance usage DeepSeek has drastically diminished comparing to opencode or hermes."（REASONIX - OPINIONS?）
  - "I use Reasonix because it really hits a 95%+ cache hit rate for long sessions."（I built a DeepSeek coding harness...）
  - "Reasonix is on another level with its optimization for the cache hits."（Should I switch from claude code to another?）
  - "My experience for OpenCode vs Reasonix is 5% vs 1% cache miss."（OpenCode vs CodeWhale vs LangCLI vs Reasonix）
- 反方 / 限缩：
  - "My OpenCode v4 Flash setup also has 96-98% cache hits. For a lot of agentic coding tasks. Reasonix is nothing special there."（REASONIX - OPINIONS? 评论）
  - HN 资深 harness 作者 jbellis："the people at opencode etc aren't stupid, when they decide to break the prefix cache [usually partially] it's always because they've tested it and it gives better results overall."（即 append-only 并不总优于 reshape context）
  - HN 多用户对 Reasonix README 中"大多数 agent loop 每轮重排/重写/注入时间戳，命中率 <20%"的说法提出质疑，称"that doc is full of AI slop"、"I've never seen an agent loop reorder, rewrite, or inject fresh timestamps each turn"。
- 重要对照数据：**OpenCode 用户也能拿到高命中率**——HN 用户 estebarb：OpenCode + DeepSeek 单日 1.2 亿命中 vs 259 万未命中（≈97.9%）；metalspot：opencode + deepseek-v4-flash 98.6%；stavros：OpenCode subagent 单月 4.73 亿命中、命中率 97.27%、实付 $10；但也有反例 3uler："Opencode has really bad cache stability issues"，并指向 PR anomalyco/opencode#14743。(https://news.ycombinator.com/item?id=48256953)

**与 OpenCode Go / 订阅的关系（站长关注点）**：
- OpenCode Go 是 usage-based 订阅：Reddit 用户称"Opencode go is based on input/output tokens, taking cache into account as usual... give you $60 usage per month for a $10/month price"（用户声称，未官方核验）。HN 用户 stavros 的 $10/月实付与 97.27% 命中率与此吻合（OpenCode subagent 专用）。
- pi-reasonix 在 OpenCode Go（代理 DeepSeek）上实测：input_tokens 168,112 / cached_tokens 164,736 = **97.99% 命中率**。
- reasonix-connector（drm-nz）是"Reasonix Plugin for OpenCode"——把 Reasonix 的缓存优化后端接入 OpenCode 的 UI。(https://pi.dev/packages/pi-reasonix, https://www.reddit.com/r/DeepSeek/comments/1tnrv19/thoughts_on_reasonix/)

**同行影响**：
- CodeWhale（Hmbown/CodeWhale）Issue #2264 专门发 feature request "Systematic prefix-cache stability — learn from deepseek-reasonix's 99%+ cache hit architecture"，引述"Reasonix divides every request into three rigid zones that never shift"，并称 85–99%+ 命中率换算成 ¥0.02/1M cached vs ¥1/1M uncached 约 50× 成本下降——说明 Reasonix 的缓存方法论已被主流 harness 视为标杆。(https://github.com/Hmbown/CodeWhale/issues/2264)

## 教程素材（写作时直接引用）

**可引用的金句 / 数据点**：
1. "DeepSeek 的 prefix cache 只在字节前缀完全一致时命中——缓存是 DeepSeek 的，命中率是客户端的。"（benchmark 文档核心论点）
2. "Every request's context gets partitioned into three regions with strict invariants: IMMUTABLE PREFIX / APPEND-ONLY LOG / VOLATILE SCRATCH."（dev.to 原话）
3. "That single discipline is enough to push cache hit rates to 85-95% on real sessions. Nothing else in the framework would matter if this was wrong."（dev.to 原话）
4. 单日 4.35 亿输入 token、99.82% 命中、$1.38 vs $61.06（省 97.7%）——最硬核的省钱证据。
5. "A tool that quietly burns $200/month on a background project is one nobody uses."（ARCHITECTURE.md 产品北极星）
6. 价差对比：v4-flash 缓存命中 $0.0028 vs 未命中 $0.14（50×）；v4-pro $0.003625 vs $0.435（120×）。
7. 新用户注册即送 5M token 免费额度（无需信用卡）——配合 Reasonix 可零成本起步。

**安装与配置代码（可直接用）**：
```bash
# 安装（三选一）
npm i -g reasonix                  # 任意 OS，拉取预编译 Go 二进制
brew install esengine/reasonix/reasonix   # macOS
npx reasonix code                  # 免全局安装，DeepSeek 官方文档推荐路径

# 使用
reasonix setup                     # 向导：配置 provider + model，API key 持久化到 ~/.reasonix/config.json
reasonix                           # 启动交互会话（TUI）
reasonix run "implement the TODOs in main.go"
```
- TUI 内：`/pro` 下一轮切 v4-pro；`/preset max` 整场用 pro；`/preset fast` 默认；`/help` 全部命令。
- 配置（reasonix.toml）：
```toml
default_model = "deepseek-flash"   # executor；加 [agent] planner_model = "deepseek-pro" 启用双模型
[context]
soft_compact_ratio = 0.5           # 达到该比例提示压缩（保持 cache-first 前缀）
tool_result_snip_ratio = 0.6       # summary 压缩前剪掉过期 tool result
compact_ratio = 0.8                # 达到该比例尝试压缩
compact_force_ratio = 0.9          # 强制压缩水位线
# prices = { "deepseek-v4-flash" = { cache_hit = 0.02, input = 1, output = 2, currency = "¥" } }  # 每 1M token
```
- 项目指令文件：REASONIX.md（提交）、REASONIX.local.md（个人、git-ignored）、~/.config/reasonix/REASONIX.md（全局）——"It is the Reasonix analog of Claude Code's CLAUDE.md"。
- 桌面端：reasonix.io 官方下载页；VS Code 扩展：`SivanLiu.reasonix-agent`（VS Marketplace / Open VSX）。

**教程结构建议**：
1. 为什么"缓存命中率"是省钱的关键变量（价差 50×，命中率从 30% 提到 99% 意味着什么）；
2. Reasonix 是什么 + DeepSeek 官方背书（官方文档集成页）；
3. 技术原理（三区域 + 工具调用修复 + 成本控制）——"缓存命中率是 harness 设计出来的，不是撞大运"；
4. 硬数据（99.82% 单日真实案例 + dev.to 基准表）；
5. 上手教程（安装 → setup → npx reasonix code → 斜杠命令 → toml 调优）；
6. 与 opencode / Claude Code 搭配的现实建议（Reasonix 单独用、reasonix-connector 进 OpenCode、OpenCode Go 订阅与缓存计费）；
7. 诚实边界：仍开发中、功能面小、DeepSeek-only 底色、社区评价与 HN 反方观点、实测建议（不要只看命中率，要按"每完成一个任务"计量质量/成本）。

## 来源清单（完整 URL）

1. https://github.com/esengine/DeepSeek-Reasonix — 主仓库（stars/forks/commits、README、Install、Features、Star History、Acknowledgments、MIT）
2. https://reasonix.io/ — 官网（live 会话示例 95.1% hit/$0.043、append-only loop、~1/5 计费宣传、桌面端下载）
3. https://esengine.github.io/DeepSeek-Reasonix/ — GitHub Pages 站点（90%+ 命中、~1/5 输入成本宣传）
4. https://api-docs.deepseek.com/quick_start/agent_integrations/reasonix/ — **DeepSeek 官方 Reasonix 集成文档**（Node 20.10+、npx reasonix code、/pro、/preset max）
5. https://api-docs.deepseek.com/guides/kv_cache/ — DeepSeek 官方 Context Caching 机制（默认开启、best-effort、字节前缀、SWA、请求边界持久化）
6. https://api-docs.deepseek.com/quick_start/pricing/ — DeepSeek 官方定价页
7. https://github.com/esengine/DeepSeek-Reasonix/blob/v1/benchmarks/real-world-cache/README.md — **单日真实缓存基准（99.82%、$1.38 vs $61.06）**
8. https://github.com/esengine/DeepSeek-Reasonix/blob/v1/docs/ARCHITECTURE.md — 架构文档（四 pillar、设计演化、non-goals、flash-first 成本控制）
9. https://github.com/esengine/DeepSeek-Reasonix/blob/main-v2/docs/GUIDE.md — v2 使用指南（thinking control、config 路径、reasoning-language）
10. https://github.com/esengine/DeepSeek-Reasonix/blob/main-v2/reasonix.example.toml — 配置样例（压缩阈值、双模型、价格表）
11. https://github.com/esengine/DeepSeek-Reasonix/blob/main-v2/REASONIX.md — 项目指令文件说明（CLAUDE.md 的对应物）
12. https://github.com/esengine/DeepSeek-Reasonix/releases — v1.18.0 release notes（Stable/Preview、Kimi K3、区域化计价）
13. https://github.com/esengine/DeepSeek-Reasonix/commits/main-v2/ — 提交历史（活动度）
14. https://dev.to/esengine/how-a-deepseek-only-agent-framework-hit-85-prefix-cache-rate-and-saved-93-vs-claude-5c9g — 作者自述技术博客（85.2%/94.9%/72.7% 基准、三区域图、Pillar 2/3、branch/harvest）
15. https://news.ycombinator.com/item?id=48256953 — HN 主帖（729 pts/288 comments、Codex bridge 缓存数据、OpenCode 命中率对照、jbellis 反方、隐私争议）
16. https://www.developersdigest.tech/blog/deepseek-reasonix-cache-first-coding-agents — 评测（"cache hits are a harness feature"、6 项测量建议、cache-first 的局限）
17. https://aiweekly.co/alerts/deepseek-reasonix-cuts-inference-cost-5x-with-9982-cache-hit — 新闻摘要（HN 第 4 位、624→729 points、99.82%/$61→$12）
18. https://pi.dev/packages/pi-reasonix — pi-reasonix 包（Reasonix 算法移植、OpenCode Go 实测 97.99%、四 pillar 细节、DeepSeek 缓存理论）
19. https://www.npmjs.com/package/reasonix — npm 安装包（预编译二进制安装器）
20. https://github.com/Hmbown/CodeWhale/issues/2264 — CodeWhale 学习 Reasonix 的 feature request（三区域、¥0.02 vs ¥1、50×）
21. https://github.com/drm-nz/reasonix-connector — Reasonix Plugin for OpenCode
22. https://www.reddit.com/r/DeepSeek/comments/1tnrv19/thoughts_on_reasonix/ — 社区口碑（5%→90%、proxy NO_PROXY 问题、多模态局限、OpenCode Go $10/$60 说法）
23. https://www.reddit.com/r/DeepSeek/comments/1v3cn9f/reasonix_opinions_game_changer_for_me/ — 社区口碑（开销骤降、zero-config、OpenCode 96-98% 反方）
24. https://www.reddit.com/r/DeepSeek/comments/1u57n7i/opencode_vs_codewhale_vs_langcli_vs_reasonix/ — harness 对比（5% vs 1% cache miss、100M token/$1）
25. https://www.reddit.com/r/DeepSeek/comments/1v1h58u/best_harness_for_deepseek_v4/ — 选型讨论（skills/MCP 兼容顾虑）
26. https://www.reddit.com/r/DeepSeek/comments/1ucm0if/i_built_a_deepseek_coding_harness_then_it_started/ — 95%+ 长会话命中
27. https://www.reddit.com/r/DeepSeek/comments/1uce9me/how_do_you_reliably_hit_95_cache_rate_on_deepseek/ — 命中率方法论（byte stable prefix hash）
28. https://www.reddit.com/r/DeepSeek/comments/1uey3rm/should_i_switch_from_claude_code_to_another/ — 切换理由（cache hit 优化、安全警告）
29. https://www.verdent.ai/guides/deepseek-reasonix — 第三方评测（"leave it running"、与 DeepSeek-TUI 对比）
30. https://chat-deep.ai/pricing/ — DeepSeek 定价（2026-07-29 验证：$0.0028/$0.14/$0.28）
31. https://deepseek.ai/pricing — DeepSeek 定价（2026-07-25 验证，独立核实）
32. https://www.aimadetools.com/blog/reasonix-complete-guide/ — 完整指南（Node 22、缓存命中数学）
33. https://knightli.com/en/2026/06/06/deepseek-reasonix-terminal-coding-agent/ — 中文生态评测（DeepSeek-native 定位）
34. https://trendshift.io/repositories/27020 — Trending 统计（2026-05-25 首登）
35. https://www.ngjoo.com/en/trending/projects/deepseek-reasonix/ — 项目档案（25,435 stars、Go、2026-06-04 分析快照）

## gaps（未核实 / 需后续确认）

- **"~$12" vs "$1.38" 不一致**：README 营销文案称单日案例"~$12 instead of ~$61"（约 5×），但同一仓库 benchmark 明细表列出实际为 $1.38/day（约 44×，官方自己算的节省是 97.7%）。$12 可能是早期按旧价格（缓存命中约 $0.025/M）或含其他口径计算，教程引用时应采用 benchmark 明细数字并注明 README 头图的 5× 说法与之矛盾。待核：$12 的确切口径。
- **stars 数波动**：各来源快照不同（25.4k@6/4、25.6k、27k、28.1k、28.3k@8/1）——是正常增长，但"28.3k"以 2026-08-01 仓库页为准；写教程时注明 as-of 日期即可。
- **OpenCode Go 订阅详情（$10/月 → $60 usage）**：仅来自 Reddit 用户评论，未见官方定价页佐证；与 HN 用户 stavros 的 $10 实付一致但非官方。属 topic-11（opencode-subscription）的研究域，此处只作旁证。
- **"长会话输入成本 ~1/5" 宣传口径**：reasonix.io 与 GitHub Pages 均写"long sessions hold 90%+ cache hit and input-token cost collapses to ~1/5"。按当前 50× 价差、90% 命中率推算实际约 1/8.5（0.9×(1/50)+0.1=0.118）；"~1/5"更接近旧 10× 价差（0.9×0.1+0.1=0.19）时代的算法。教程引用时建议自己算一遍并用实际价差。
- **当前版本斜杠命令变动**：ARCHITECTURE.md(v1) 说 v0.50.0 把 /pro 移除、改 /model；但 DeepSeek 官方集成文档（当前）仍写 /pro 与 /preset max。可能是文档滞后或命令已回归。写作教程前应在实际安装的版本里跑 /help 确认。
- **TypeScript→Go 重写的时间点**：dev.to（TypeScript、v0.0.6）→ 现在（Go、v1.18.0、main-v2）。v1 tag 的 ARCHITECTURE.md 仍是 TS 文件树（src/cli/ui/App.tsx），说明 v1 tag 是 TS 时代的归档，Go 重写在 main-v2。精确的 Go 重写版本号未确认。
- **"效果不如经典 Agent"的量化依据**：社区多为主观评价（skills/MCP 兼容、UI、生态），缺正式 benchmark 对比 Reasonix vs Claude Code/OpenCode 的任务完成质量。写教程时以"社区观点 + 官方 non-goals"表述，勿断言。
- **hn 上"Claude Code 故意破坏第三方缓存"的说法**：HN 评论提及（x.com/hqmank/status/2056205388689891834），与本主题弱相关，未深挖；若教程引用需单独核实。
- **缓存价格历史**：news0802 页（2024 年 V2 时代）写缓存命中 $0.014/M、未命中 $0.14/M（10×），与 V4 时代的 50×/120× 不同——引用官方缓存文档时注意区分年代，别混用。

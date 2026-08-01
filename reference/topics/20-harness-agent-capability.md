---
topic: 为什么原生 Harness 能大幅提升 Agent 能力
slug: harness-agent-capability
category: research
updated: 2026-08-01
status: written
sources:
  - https://www.anthropic.com/engineering/harness-design-long-running-apps
  - https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
  - https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  - https://www.anthropic.com/research/building-effective-agents
  - https://www.anthropic.com/engineering/managed-agents
  - https://www.faros.ai/blog/harness-engineering
  - https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering
  - https://www.langchain.com/blog/context-management-for-deepagents
  - https://arxiv.org/abs/2607.06906
  - https://arxiv.org/abs/2605.23950
  - https://arxiv.org/abs/2605.27922
  - https://arxiv.org/abs/2606.12344
  - https://arxiv.org/abs/2606.17016
  - https://arxiv.org/abs/2604.07236
  - https://arxiv.org/abs/2606.25447
  - https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance/
  - https://addyosmani.com/blog/agent-harness-engineering/
  - https://www.infoq.com/news/2026/04/anthropic-three-agent-harness-ai/
  - https://www.shiplight.ai/blog/planner-generator-evaluator-multi-agent-qa
  - https://www.v2ex.com/t/1214141
  - https://www.tmtpost.com/8083615.html
  - https://36kr.com/p/3916402632644486
  - https://blog.csdn.net/techforward/article/details/163323346
  - https://www.163.com/dy/article/L3114O8P05399DAP.html
  - https://news.pedaily.cn/202607/566971.shtml
  - https://www.cnblogs.com/itech/p/20100852
  - https://api-docs.deepseek.com/guides/kv_cache/
  - https://huggingface.co/blog/deepseekv4
  - https://www.reddit.com/r/AI_Agents/comments/1v3h4xo/the_agent_harness_matters_more_than_the_model_you/
  - https://www.reddit.com/r/ClaudeAI/comments/1s6jouf/anthropic_shares_how_to_make_claude_code_better/
  - https://www.reddit.com/r/LocalLLaMA/comments/1svzlog/the_exact_kv_cache_usage_of_deepseek_v4/
  - https://www.mindstudio.ai/blog/what-is-harness-engineering
  - https://www.spheron.network/blog/context-engineering-production-ai-agents-kv-cache-long-context/
  - https://www.philschmid.de/context-engineering-part-2
  - https://arize.com/blog/context-management-in-agent-harnesses/
  - https://parallel.ai/articles/what-is-an-agent-harness
  - https://rickhigh.substack.com/p/harness-engineering-context-assembly
  - https://datarekha.com/blog/agent-harness/
  - https://www.firecrawl.dev/blog/what-is-an-agent-harness
  - https://github.com/esengine/DeepSeek-Reasonix
  - https://www.developersdigest.tech/blog/deepseek-reasonix-cache-first-coding-agents
  - https://github.com/vllm-project/vllm/issues/42948
---

# 为什么原生 Harness 能大幅提升 Agent 能力

> 姊妹篇：`13-deepseek-harness.md` 讲"DeepSeek Harness 是什么/发布状态/官方基准/传闻"，本文件讲**原理层**——为什么"模型 + harness"远强于"裸模型 + 简单提示"。本文所有事实带来源 URL；DeepSeek JD 相关为**媒体对 JD 的推断**，已与 V2EX 一手 JD 原文分层标注。
>
> 一句话结论：**模型是引擎，harness 是让引擎可靠工作并自我纠错的驾驶舱。** 官方对 harness 效应的定位，2026 年学术界已经用数据量化为"同一模型、仅换 harness，任务成本 -41%、质量不降反升；harness 引发的性能方差可以超过模型本身"。

## 核心事实（可直接入教程）

### 一、Harness 的定义与"Agent = Model + Harness"公式

- **行业通行定义（Faros，2026-05-22）**："Agent = Model + Harness。模型包含原始智能（raw intelligence），harness 让这些智能有用、可执行。"生产级 harness 分五层：**tool orchestration（工具编排）、verification loops（验证闭环）、context & memory（上下文与记忆）、guardrails（护栏）、observability（可观测性）**。harness engineering 是 AI 工程成熟的第三阶段，紧跟 prompt engineering（语言）与 context engineering（信息）之后，2026 年工程投资的主战场 ([faros.ai/blog/harness-engineering](https://www.faros.ai/blog/harness-engineering))。
- **Anthropic 把 Claude Agent SDK 直接称作"a powerful, general-purpose agent harness"**（2025-11-26），harness 的核心能力包括 compaction（压缩）等多上下文窗口管理 ([anthropic.com/engineering/effective-harnesses-for-long-running-agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents))。
- **Harness 工程学信条（Mitchell Hashimoto，Faros 引述）**："每次发现 agent 犯错，就花时间工程化一个解决方案，让 agent 永远不再犯那个错"——多数时候这个方案就是改进 harness ([faros.ai](https://www.faros.ai/blog/harness-engineering))。
- **HumanLayer 的说法（AddyOsmani 转述）**：多数 agent 失败是"skill issues"，根源是配置而非模型权重 ([addyosmani.com/blog/agent-harness-engineering](https://addyosmani.com/blog/agent-harness-engineering))。
- **核心方法论（Anthropic harness-design 文章，2026-03-24）**："harness 的每个组件都在编码一条'模型独自做不到 X'的假设；这些假设值得被压力测试——它们可能本身是错的，而且随着模型变强会快速过期。" 引"Building Effective Agents"的原则："find the simplest solution possible, and only increase complexity when needed"（找到最简单的方案，只在需要时增加复杂度）([anthropic.com/engineering/harness-design-long-running-apps](https://www.anthropic.com/engineering/harness-design-long-running-apps))。

### 二、为什么有 harness 的 agent 更强：裸模型的四个固有缺陷 + 解法

Anthropic 在 2025-11 与 2026-03 两篇工程文章里系统总结（这是"为什么"的最权威一手来源）：

1. **上下文窗口不是记忆（跨会话失忆）**：长任务要跨多个 context window，而"每个新 session 从零开始，没有任何之前的记忆"。哪怕有 compaction，**仅靠 compaction 也不够**——Opus 4.5 只给一句"建一个 claude.ai 克隆"级别的高层提示，跑在 Claude Agent SDK 上做多窗口循环，也做不出生产级 web app ([effective-harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents))。解法：initializer agent（一次性搭环境）+ coding agent（每次做增量、留交接产物），产物包括 `init.sh`、`claude-progress.txt`、git 提交、`feature_list.json`（claude.ai 克隆例子里列了 200+ 个 feature，初始全部标记 failing）([effective-harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents))。
2. **Context anxiety（上下文焦虑）**：模型在接近自以为的上下文上限时会**提前收尾、仓促完成任务**。这是与 compaction 不同的失败——compaction 原地摘要、保住连续性，但"不给干净起点，context anxiety 仍会残留"；**context reset（清空上下文 + 结构化交接）** 才给干净起点。实测 Sonnet 4.5 的 context anxiety 强到"仅靠 compaction 不足以支撑长任务"，reset 成为必需；到 Opus 4.5 该行为基本消失，作者后来干脆移除了 reset ([harness-design](https://www.anthropic.com/engineering/harness-design-long-running-apps))。
3. **自我评价偏差（self-evaluation bias）**：让模型评判自己的产出，它"总是自信地夸自己，哪怕质量在人类眼里明显平庸"。**分离生成者与评判者是关键杠杆**——"让一个独立 evaluator 变苛刻，远比让 generator 对自己的作品变挑剔容易实现"；有了外部反馈，generator 才有了可迭代的具体目标。这是受 **GAN（生成对抗网络）** 启发的设计 ([harness-design](https://www.anthropic.com/engineering/harness-design-long-running-apps))。
4. **胜利宣言偏差 / 一次性贪多（victory declaration / one-shotting overreach）**：agent 常不做验证就宣布任务完成（"没被显式要求就用浏览器自动化做端到端测试的话，Claude 会写了代码、跑过单测，却意识不到功能端到端不工作"）；或一上来想一次做完整个 app，跑到一半上下文耗尽、留下半实现且无文档的代码 ([effective-harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)、[faros.ai](https://www.faros.ai/blog/harness-engineering))。解法：feature_list 逐步勾选 + "只在通过仔细测试后把 passes 改为 true"的强指令 + 测试工具（Puppeteer MCP 等）。**Anthropic 明说"给 Claude 这类测试工具后性能大幅提升——它抓到了仅看代码看不出的 bug"** ([effective-harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents))。

### 三、Anthropic 三代理模式：Planner / Generator / Evaluator（2026-03-24 发布）

- **架构**：Planner 把 1-4 句话的提示展开成完整产品 spec（要求"只聚焦产品上下文与高层技术设计，不写细粒度技术实现"——担心 planner 把技术细节写错会在下游级联放大）；Generator 按 sprint 一次做一个 feature（React/Vite/FastAPI/SQLite 技术栈 + git 版本控制，每个 sprint 结束先自我评估再交 QA）；Evaluator 用 **Playwright MCP** 像真人一样点开运行中的应用，测 UI / API / 数据库状态，每条标准设硬阈值，任一不达标则该 sprint 失败、把详细反馈打回给 generator ([harness-design](https://www.anthropic.com/engineering/harness-design-long-running-apps))。
- **Sprint contract（冲刺契约）**：每个 sprint 开工前 generator 与 evaluator 先谈判约定"'完成'长什么样"，双方迭代到一致再写代码；通过文件互相通信（一个 agent 写文件、另一个读文件回应）。实测 Sprint 3 的 level editor 契约就含 **27 条验收标准** ([harness-design](https://www.anthropic.com/engineering/harness-design-long-running-apps))。
- **Evaluator 需要被调教**："Out of the box, Claude is a poor QA agent"——初版 evaluator 会找到真问题然后说服自己"不重要"而放行；作者逐轮读 evaluator 日志、拿自己判断与它对齐，改 QA prompt 好几轮后才可接受。评测者抓到的真实 bug 例（可直接引用作教程素材）：`fillRectangle` 只在拖拽起终点放瓦片、`LevelEditor.tsx:892` 删除键处理条件写错、`PUT /frames/reorder` 路由定义在 `/{frame_id}` 之后被 FastAPI 误解析成整数而 422 ([harness-design](https://www.anthropic.com/engineering/harness-design-long-running-apps))。
- **前端设计 harness**：把"这个设计美不美"翻译成可打分标准——四条标准 **Design quality / Originality / Craft / Functionality**，加权押注设计质量与原创新；evaluator 用 few-shot 示例校准；每轮生成 5-15 次迭代，全程可长达 4 小时；荷兰艺术博物馆例子：第 10 轮迭代把方案整个推倒，重做成 CSS 透视 3D 房间 + 门洞导航，"这是单次生成从未见过的那种创意跳跃" ([harness-design](https://www.anthropic.com/engineering/harness-design-long-running-apps))。
- **"模型越强，harness 越不该越俎代庖"的教训**：Opus 4.6 发布后作者删掉了 sprint 结构、把 evaluator 从每 sprint 改成结束前单次——因为模型原生能力上移了能力边界。"evaluator 不是固定 yes/no：任务落在当前模型 solo 就能可靠完成的范围内时它是多余开销，落在边界外时才真正有 lift。" 结论："**有趣的 harness 组合空间不会随模型变强而缩小，而是会移动。**" ([harness-design](https://www.anthropic.com/engineering/harness-design-long-running-apps))。
- InfoQ 评论把该架构概括为 planning/generation/evaluation 三角色、应对多小时的自主编码会话；新 Claw Times 报道"单 agent 长程编码一直崩溃"是设计动机 ([infoq](https://www.infoq.com/news/2026/04/anthropic-three-agent-harness-ai/)、[shiplight](https://www.shiplight.ai/blog/planner-generator-evaluator-multi-agent-qa))。

### 四、同模型带 harness vs 不带：可引用的量化差异（核心素材）

| 场景 | 裸/简单配置 | 带 harness | 结论 |
|---|---|---|---|
| Anthropic 自制 2D 游戏（Opus 4.5，同 prompt） | Solo：**20 分钟 / $9**，游戏核心坏了（实体无输入响应、布局浪费、代码接线断裂无提示） | 全 harness：**6 小时 / $200**，16-feature spec / 10 个 sprint，游戏可玩、内置 AI 生成功能 | "贵 20 倍以上，但输出质量差异立竿见影" ([harness-design](https://www.anthropic.com/engineering/harness-design-long-running-apps)) |
| DAW 数字音频工作站（Opus 4.6 V2 harness） | — | 全程 **3 小时 50 分 / $124.70**：Planner 4.7min/$0.46；Build R1 2h7m/$71.08 + QA R1 8.8min/$3.24；Build R2 1h2m/$36.89 + QA R2 6.8min/$3.09；Build R3 10.9min/$5.88 + QA R3 9.6min/$4.06 | 生成器独自跑 2 小时不散架（无需 sprint 分解）；QA 每轮都抓到 stub/display-only 缺口 ([harness-design](https://www.anthropic.com/engineering/harness-design-long-running-apps)) |
| LangChain deepagents-cli 于 Terminal Bench 2.0 | 默认 prompt+工具：**52.8%**（Top 30 开外） | 只改 harness（模型固定 gpt-5.2-codex）：**66.5%（+13.7 分，Top 5）** | "We only changed the harness." 三旋钮：system prompt / tools / middleware ([langchain.com/blog/improving-deep-agents-with-harness-engineering](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering)) |
| LangChain 推理预算实验 | 全程 xhigh：**53.9%**（超时） | "reasoning sandwich"（xhigh 规划 + high 实现 + xhigh 验证）：**63.6% → 66.5%** | 推理预算分配也是 harness 设计 ([同上](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering)) |
| Writer Harness Effect（arXiv 2607.06906） | 冻结的传统 agent loop | Writer Agent Harness（子代理委派） | 同一 22 个任务、6 个模型，仅换编排层：成本/任务 **-41%**（$0.21→$0.12）、墙钟中位数 **-44%**（48s→27s）、token/任务 **-38%**（14.2k→8.8k），完成质量 0.78→0.81（持平）；每个模型都变便宜 **33-61%**（model-invariant）；质量提升与模型基线强度 r=0.99（"harness leverage"）；质量/美元 **+82%**；每百万 token 完成任务数 54.9→92.0。**"这个负载上，编排层对单任务成本的影响超过了换遍整个模型菜单。**" ([arxiv.org/abs/2607.06906](https://arxiv.org/abs/2607.06906)) |
| NVIDIA NOOA（2026-07-27，开源） | 对比 harness：66 次 LLM 调用/2.2M tokens → 78.2%；29 次/1.3M → 78.6% | NOOA：SWE-bench Verified **82.2%**（GPT-5.5），**29 次调用 / ~1.1M tokens** | "Parity or better, at roughly half the cost." 六机制含 pass-by-reference（工具结果不回灌文本上下文）、无需 compaction——会话中位数峰值仅 22-72k prompt tokens（对 200-400k 窗口）([developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance](https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance/)) |
| 同模型不同 harness（社区） | Claude Opus 4.5 SWE-bench Pro 在某标准脚手架下约 **46%** | 换另一标准脚手架约 **55%** | r/AI_Agents 社区说法（中等置信）："same model posts very different scores depending only on the harness" ([reddit 1v3h4xo](https://www.reddit.com/r/AI_Agents/comments/1v3h4xo/the_agent_harness_matters_more_than_the_model_you/)) |
| OpenClaw 适配层（arXiv 2606.12344） | — | 同一 GLM 5.1 骨干，仅 minimal direct-diff adapter 得分 73.4% | adapter/harness 设计对 coding 任务表现是决定性的 ([arxiv.org/abs/2606.12344](https://arxiv.org/abs/2606.12344)) |
| Faros 内部 211 个真实工程任务 | — | 开源模型 GLM-5.2 / Kimi K2.6 + 优化 harness 挤进质量顶档，追平/超越 Opus 4.8、GPT-5.5 路由 | "harness 是终极均平器"（the ultimate equalizer）([faros.ai](https://www.faros.ai/blog/harness-engineering)) |
| LangChain Terminal-Bench 案例（Faros 复述） | — | 2026-03，LangChain 团队只优化 harness，Terminal Bench 2.0 从第 30 名升至第 5 名，模型完全没换 | 同上 ([faros.ai](https://www.faros.ai/blog/harness-engineering)、[langchain](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering)) |

### 五、学术立论：harness 决定性能方差（"不要在不披露 harness 时比较 agent"）

- **"Stop Comparing LLM Agents Without Disclosing the Harness"（arXiv 2605.23950，2026-05-07）**——立场论文，提出 **Binding Constraint Thesis**：对能力接近的前沿模型做 long-horizon 任务时，**harness 往往是比模型更强势的性能决定因素**。三条论据：① 控制论形式化——把 harness 视为闭环动力系统的"控制器"、LLM 是其驱动的随机策略，这解释了"小 harness 改动造成的性能位移可以超过换一个模型"；② 已发布基准 + 工业部署 + 方差分解显示 **harness 引发的方差可显著超过模型引发的方差，甚至出现模型排名反转**；③ 提出 harness-aware 评测框架与披露标准——"在 harness 规格被披露之前，long-horizon agent 的排行榜比较应被视为不完整、可能误导" ([arxiv.org/abs/2605.23950](https://arxiv.org/abs/2605.23950))。
- **Harness-Bench（arXiv 2605.27922，2026-05）**：专测"harness 效应"的诊断基准——让每个 harness 以原生执行行为跑同一批任务，产出"模型-harness 配对"的配置级诊断（完成率、工具使用、状态管理、权限处理、鲁棒性、token 成本），与 SWE-bench/AgentBench 等 outcome 型基准互补 ([arxiv.org/abs/2605.27922](https://arxiv.org/abs/2605.27922))。
- **"How Much Heavy Lifting Can an Agent Harness Do?"（arXiv 2604.07236，2026-04-08）**：度量 planning agent 里 LLM 的剩余角色（"规划时代里 harness 能扛多少活"）([arxiv.org/abs/2604.07236](https://arxiv.org/abs/2604.07236))。
- **"The Interplay of Harness Design and Post-Training in LLM Agents"（arXiv 2606.25447，POSTECH）**：工具型 LLM agent 常被包在 harness 里，其脚手架决定性能；探讨 harness 设计与后训练的相互作用 ([arxiv.org/abs/2606.25447](https://arxiv.org/abs/2606.25447))。
- **LangChain 的教训**（可引用金句）："模型天然不会进入 build-verify 闭环——它们是出色的自改进机器，但没有自然的测试倾向。" 三 middleware：`PreCompletionChecklistMiddleware`（拦截退出、提醒按任务 spec 做验证，类 Ralph Wiggum loop）、`LoopDetectionMiddleware`（同一文件编辑 N 次后提示"考虑换个思路"）、`LocalContextMiddleware`（启动时注入目录/工具上下文）。"Harness 工程师的职责：准备好并交付上下文，让 agent 能自主完成任务。" ([langchain](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering))。

### 六、KV Cache / 上下文管理 / 前缀缓存：harness 省钱省时省精度的机理（衔接 DeepSeek）

- **KV Cache 原理（社区技术文，agent.csdn.net 转载）**：LLM 每生成一个 token 都要用此前所有 token 的注意力中间结果（Key/Value）。**KV Cache 把这些结果缓存下来，新一轮请求前缀与上一轮一致时直接复用、只算新增部分**；代价是"在对话历史前部插入/修改内容（如动态改写 system prompt）会让 KV Cache 频繁失效"——所以主流 agent 的上下文策略设计原则是"只在末尾追加、不改前面已生成的部分" ([agent.csdn.net JD反推](https://agent.csdn.net/6a503bd010ee7a33f28bb82e.html))。
- **工程实证（Spheron，2026）**：跟踪"旧对话轮次何时停止影响生成"（多数任务约 10-15 轮之后）；阈值之后的轮次用小模型摘要而非保留原文；把对话历史作为稳定前缀放在新用户轮之前；若 input:output token 比超过 **10:1** 就要审查是否上下文泄漏 ([spheron.network](https://www.spheron.network/blog/context-engineering-production-ai-agents-kv-cache-long-context/))。
- **Compaction vs Summarization（Phil Schmid，Context Engineering Part 2）**：两种防"Context Rot"的方法——compaction（保留原始但压缩）与 summarization（LLM 摘要含工具调用），共同原则"**可逆性优先于压缩率**"；system instructions 相互矛盾会触发 context rot ([philschmid.de/context-engineering-part-2](https://www.philschmid.de/context-engineering-part-2))。
- **Arize 的上下文管理框架**（2026-04-28）：所有 harness 撞到同一堵墙——"上下文窗口装不下模型想记住的一切"；harness 必须决定工作集里留什么、压缩什么、稍后检索什么 ([arize.com](https://arize.com/blog/context-management-in-agent-harnesses/))。LangChain deep agents 用"会话总结替代完整对话历史"进入工作记忆 ([langchain.com/blog/context-management-for-deepagents](https://www.langchain.com/blog/context-management-for-deepagents))。
- **并行评测：harness 效率靠"append-only + 缓存友好"**（NVIDIA NOOA）：因为工具结果 pass-by-reference、不回灌文本上下文，会话 transcript 全程 append-only，**prefill 缓存命中全程叠加，无需摘要 pass** ([nvidia blog](https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance/))。
- **DeepSeek 官方 KV cache 文档（api-docs.deepseek.com/guides/kv_cache/）**：DeepSeek API 的 Context Caching on Disk 默认对所有用户开启、无需改代码；请求的前缀与已持久化缓存单元重叠部分算"cache hit"，响应 usage 里带 `prompt_cache_hit_tokens` / `prompt_cache_miss_tokens` 两个字段 ([api-docs.deepseek.com/guides/kv_cache](https://api-docs.deepseek.com/guides/kv_cache/))。
- **V4 百万上下文 + 稀疏注意力的官方背书（HF blog，2026-07-31）**："两个数字最重要：单 token 推理 FLOPs 与 KV cache 大小，都随序列长度增长。**1M token 时 DeepSeek-V4-Pro 的单 token 推理 FLOPs 只有 V3.2 的 27%，KV cache 内存只用 10%。**" V4-Pro 在 SWE Verified / MCPAtlas / 内部 R&D benchmark 上与闭源前沿模型 agent 任务持平 ([huggingface.co/blog/deepseekv4](https://huggingface.co/blog/deepseekv4))。
- **社区实测（r/LocalLLaMA 1svzlog，中置信）**：按 21 个 CSA 层 + 20 个 HCA 层估算，DSV4 Flash 在 1M 上下文时 KV cache ≈ **6.72 GiB**，相比 DSV3.2 约 **12.5 倍**省（非官方宣称的 13.7 倍）([reddit 1svzlog](https://www.reddit.com/r/LocalLLaMA/comments/1svzlog/the_exact_kv_cache_usage_of_deepseek_v4/))。
- **"缓存纪律"成为产品论点**：社区项目 DeepSeek-Reasonix 宣称"围绕 DeepSeek prefix cache 调优、长会话保持低成本"（缓存命中的模型才会便宜）；developersdigest 评"缓存效率何时帮质量、何时与 harness 打架，是下一个值得问的问题" ([github esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)、[developersdigest](https://www.developersdigest.tech/blog/deepseek-reasonix-cache-first-coding-agents))。真实工程坑：vLLM issue #42948——DeepSeek-V4-Flash hybrid groups 在重发请求时 prefix-cache 0% 命中 ([github vllm issue 42948](https://github.com/vllm-project/vllm/issues/42948))。

### 七、DeepSeek Harness 的已知设计线索（JD 原文 + 媒体推断，分层标注）

**一手 JD 原文（V2EX，崔添翼本人发帖，2026-05-20）**——"Agent Harness 研发工程师"岗位任职要求原文列出："熟悉 LLM 以及 Agent 基本机制及其技术原理，包括 **LLM API、KV Cache、Agent Loop、Tool Use、Reasoning、Planning、Skills、MCP、Memory、Subagent、Multi-Agent** 等相关知识。对 **Prompt Engineering、Context Engineering、Harness Engineering** 等课题有较深入的了解。" 团队使命段落："Model + Harness = Agent。我们正在把 DeepSeek 的前沿模型能力，转化为领先的 Agent 产品。**这其中除模型本身以外的所有工作，都属于 Harness 的范畴。**" 职责含"参与实现**模型与 Harness 的共同进化**，从 Harness 的角度实现 DeepSeek 的 Harness 与模型的深度适配"以及"以**内部真实任务**做为 Harness 产品和模型相关能力训练的重要反馈源" ([v2ex.com/t/1214141](https://www.v2ex.com/t/1214141))。

**媒体对 JD 的设计推断（tmtpost/36kr/CSDN/163/pedaily 同源，未获官方确认，写作时需注明"媒体推断"）**——据此反推 Harness 可能具备：
- **智能上下文管理**：JD 提到 KV Cache、长上下文裁剪与压缩算法 → "配合 DeepSeek V4 的前缀缓存能力，相同上下文的任务不重复计算；长对话中自动对历史消息做摘要、保留关键信息、释放 token 空间；**根据任务复杂度动态调整上下文策略**——简单任务用短上下文省成本，复杂任务拉满百万 token 长上下文" ([tmtpost.com/8083615](https://www.tmtpost.com/8083615.html))。
- **工具调用编排**：Tool Use 链式调用、错误回退与自动重试 → "能编排多步工具调用的有向无环图；工具调用失败自动重试，不行降级换方案，再不行回滚到上一个稳定状态"；"还可能支持**动态注册新工具**，Agent 自动发现并学会使用" ([tmtpost.com/8083615](https://www.tmtpost.com/8083615.html))。
- **子 Agent 架构**：多 Agent 间通信协议设计、任务分解与结果聚合 → "主 Agent 负责任务规划协调，多个子 Agent 具体执行；不同子 Agent 有不同的系统提示词、工具权限、上下文窗口；每个子 Agent 运行在独立上下文或进程中，出错不影响主流程" ([36kr.com/p/3916402632644486](https://36kr.com/p/3916402632644486))。
- **规划与自进化**：任务规划图生成、执行路径在线优化 → "接到任务先生成执行计划，执行中动态调整，每步自我检查、出错自动修正；很可能有一套**内部 benchmark**，每次架构改动都跑一遍自测" ([blog.csdn.net/techforward/article/details/163323346](https://blog.csdn.net/techforward/article/details/163323346))。
- **深度绑定 V4 特性**：JD 强调"模型与 Harness 共同进化"→ 推断"会利用 V4 的稀疏注意力、前缀缓存，**不是通用 harness 框架，而是与 DeepSeek 模型深度绑定的一体化产品**（类似 OpenAI GPT-5.5 把代码与推理合并进同一模型的思路）" ([tmtpost.com/8083615](https://www.tmtpost.com/8083615.html)、[36kr](https://36kr.com/p/3916402632644486))。
- 另：cnblogs 记录 5 月 15 与 18 日官网连挂 Harness 研发工程师 + Harness PM 两个岗位，且 Agent 方向同时在招算法研究员/数据策略工程师/全栈开发工程师（至少 5 岗）——"有组织的进攻"；"共同进化"= 把 Harness 层反馈反哺模型训练，与 Anthropic Claude Code → Claude 模型改进闭环同思路 ([cnblogs.com/itech/p/20100852](https://www.cnblogs.com/itech/p/20100852))。

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| Anthropic harness-design 文章发布日期 | 2026-03-24 | [anthropic.com](https://www.anthropic.com/engineering/harness-design-long-running-apps) |
| Anthropic effective-harnesses 文章发布日期 | 2025-11-26 | [anthropic.com](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) |
| 三代理 | Planner（1-4 句→完整 spec）/ Generator（sprint 逐 feature）/ Evaluator（Playwright MCP 验收） | [anthropic.com](https://www.anthropic.com/engineering/harness-design-long-running-apps) |
| 游戏 demo（solo vs harness，Opus 4.5） | 20 min / $9 vs 6 hr / $200；harness 产 16-feature spec / 10 sprints | [anthropic.com](https://www.anthropic.com/engineering/harness-design-long-running-apps) |
| DAW demo（Opus 4.6 V2 harness） | 3h50m / $124.70；Planner $0.46；Build×3 $71.08+$36.89+$5.88；QA×3 $3.24+$3.09+$4.06 | [anthropic.com](https://www.anthropic.com/engineering/harness-design-long-running-apps) |
| Sprint 3 契约验收标准数 | 27 条（level editor） | [anthropic.com](https://www.anthropic.com/engineering/harness-design-long-running-apps) |
| LangChain Terminal Bench 2.0 | 52.8 → 66.5（+13.7 分）；Top 30 → Top 5；模型固定 gpt-5.2-codex | [langchain.com](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering) |
| LangChain 推理预算 | 全程 xhigh 53.9%（超时）vs reasoning sandwich 63.6%→66.5% | [langchain.com](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering) |
| Writer Harness Effect | 成本 -41%（$0.21→$0.12）；墙钟 -44%（48s→27s）；token -38%（14.2k→8.8k）；质量 0.78→0.81；每模型 -33~-61%；质量/美元 +82%；每 M token 完成任务 54.9→92.0；r=0.99 | [arxiv.org/abs/2607.06906](https://arxiv.org/abs/2607.06906) |
| NVIDIA NOOA（GPT-5.5） | SWE-bench Verified 82.2%（29 调用/~1.1M token）；对比 66 调用/2.2M→78.2%、29/1.3M→78.6%；CyberGym L1 86.8%；ARC-AGI-3 85.1%（GPT-5.6-sol，~$13.3/局）；会话峰值 22-72k prompt token | [nvidia blog](https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance/) |
| NOOA 记忆/技能增益 | ARC-AGI-3 记忆 +11.8 分（vs 文件笔记）、skill +8.5 分（vs 基线） | [nvidia blog](https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance/) |
| Binding Constraint Thesis | 论文 arXiv 2605.23950（2026-05-07），Tulane/Rutgers/Virginia Tech | [arxiv.org/abs/2605.23950](https://arxiv.org/abs/2605.23950) |
| 社区同模型不同 harness（SWE-bench Pro，Opus 4.5） | ~46% vs ~55%（r/AI_Agents，中置信） | [reddit 1v3h4xo](https://www.reddit.com/r/AI_Agents/comments/1v3h4xo/the_agent_harness_matters_more_than_the_model_you/) |
| DeepSeek V4-Pro @1M 上下文 | 单 token 推理 FLOPs = V3.2 的 27%；KV cache 内存 = 10%（官方） | [huggingface.co/blog/deepseekv4](https://huggingface.co/blog/deepseekv4) |
| DSV4 Flash KV cache @1M（社区估算） | ~6.72 GiB（21 CSA + 20 HCA 层），约 12.5x 省 | [reddit 1svzlog](https://www.reddit.com/r/LocalLLaMA/comments/1svzlog/the_exact_kv_cache_usage_of_deepseek_v4/) |
| DeepSeek API 缓存 | Context Caching on Disk 默认开启；usage 字段 `prompt_cache_hit_tokens` | [api-docs.deepseek.com/guides/kv_cache](https://api-docs.deepseek.com/guides/kv_cache/) |
| DeepSeek JD 技术关键词（原文） | LLM API / KV Cache / Agent Loop / Tool Use / Reasoning / Planning / Skills / MCP / Memory / Subagent / Multi-Agent；Prompt/Context/Harness Engineering | [v2ex.com/t/1214141](https://www.v2ex.com/t/1214141) |
| claude.ai 克隆 feature_list.json | 200+ feature 初始全 failing（官方示例） | [anthropic.com](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) |

## 关键差异 / 时间线

- **概念时间线**：2025-11-26 Anthropic《Effective harnesses for long-running agents》（initializer + coding agent，context reset 与 feature_list 诞生）→ 2026-03-24 Anthropic《Harness design for long-running application development》（GAN 启发，三代理）→ 2026-03 崔添翼加入 DeepSeek 组建 Harness 团队（见 file 13）→ 2026-05-15/18 DeepSeek 官网连挂 Harness 岗位 → 2026-07-31 V4-Flash-0731 官方 changelog 首次披露 "DeepSeek Harness minimal mode (to be released soon)"，9 项 agent 基准全用它测（见 file 13）。
- **harness 工程 vs prompt/context 工程**：prompt 工程优化"话怎么说"，context 工程优化"模型知道什么"，harness 工程优化"模型被允许如何行动与自我纠错"——三阶段成熟度模型（Faros）([faros.ai](https://www.faros.ai/blog/harness-engineering))。
- **"harness 决定论" 学术共识成形**：2026-04 起 arXiv 密集出现 harness 主题论文（2604.07236 / 2605.23950 / 2605.27922 / 2606.12344 / 2606.17047 / 2606.25447 / 2607.06906），核心主张一致——"编排层对性能与成本的影响常超过模型选择"。
- **官方用自家 harness 测自家模型 = 复现性缺口**：DeepSeek 官方 agent 基准（Terminal-Bench 82.7、DeepSWE 54.4 等）全用未发布的 Harness minimal mode 测得，第三方无法复测（详见 file 13）——"不披露 harness 就比较 agent"正是 arXiv 2605.23950 批判的做法，这是把本专题接回 DeepSeek 用户价值的关键桥。
- **DeepSeek 的优势组合（写作方向）**：官方实测 V4-Pro 1M 上下文 KV cache 仅 V3.2 的 10%、FLOPs 27%（[HF blog](https://huggingface.co/blog/deepseekv4)）+ API 磁盘前缀缓存默认开启（[api docs](https://api-docs.deepseek.com/guides/kv_cache/)）+ 媒体推断 Harness 做 KV cache 复用/长上下文裁剪/历史摘要/动态上下文策略（[tmtpost](https://www.tmtpost.com/8083615.html)）→ 若落地，"长上下文 agent 任务的成本优势"会非常显著（社区已用 Reasonix 验证"缓存纪律"方向，[github](https://github.com/esengine/DeepSeek-Reasonix)）。

## 教程素材（写作时直接引用）

- **公式**："Model + Harness = Agent"——DeepSeek 招聘 JD 原句；Faros 同款 "Agent = Model + Harness" ([v2ex](https://www.v2ex.com/t/1214141)、[faros.ai](https://www.faros.ai/blog/harness-engineering))。
- **Anthropic 原话（harness 方法论）**："Every component in a harness encodes an assumption about what the model can't do on its own."（harness 的每个组件都在编码一条"模型自己做不到"的假设）([anthropic.com](https://www.anthropic.com/engineering/harness-design-long-running-apps))。
- **Anthropic 原话（模型变强后）**："The space of interesting harness combinations doesn't shrink as models improve. Instead, it moves."（有趣 harness 的组合空间不会随模型变强而缩小，而是会移动）([anthropic.com](https://www.anthropic.com/engineering/harness-design-long-running-apps))。
- **Anthropic 原话（评估者边界）**："The evaluator is not a fixed yes-or-no decision. It is worth the cost when the task sits beyond what the current model does reliably solo."（evaluator 是否值得成本，取决于任务是否落在当前模型 solo 可靠范围之外）([anthropic.com](https://www.anthropic.com/engineering/harness-design-long-running-apps))。
- **Anthropic 原话（测试工具的价值）**："Providing Claude with these kinds of testing tools dramatically improved performance, as the agent was able to identify and fix bugs that weren't obvious from the code alone." ([anthropic.com](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents))。
- **LangChain 金句**："Models today are exceptional self-improvement machines... however, they don't have a natural tendency to enter this build-verify loop."（模型不自带 build-verify 循环）([langchain.com](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering))。
- **Harness Effect 金句**："the harness is the one component whose efficiency multiplies across every model an organization runs—present and future."（harness 是唯一一个效率能跨所有模型复利的组件）([arxiv.org/abs/2607.06906](https://arxiv.org/abs/2607.06906))。
- **LangChain 反直觉数据点**：只改 harness、模型固定，Terminal Bench 2.0 +13.7 分、Top 30 → Top 5——"这是给'最强模型决定一切'观念的一记耳光"可用作教程开篇钩子 ([langchain.com](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering))。
- **NVIDIA 反直觉数据点**：同一 GPT-5.5，NOOA harness 82.2% @ ~1.1M tokens；其他 harness 66 调用/2.2M 只到 78.2%——"同模型同基准，harness 决定 4 分差距和一半成本" ([nvidia blog](https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance/))。
- **教程结构建议**（把本专题写成"为什么 DeepSeek 要做 Harness / 为什么 V4 用户该在意 Harness"）：① 裸模型的四个坑（失忆/焦虑/自我表扬/胜利宣言）→ ② harness 六层/五层结构 → ③ 三代理设计 → ④ 量化证据（LangChain/Writer/NOOA/Anthropic 四组数字）→ ⑤ DeepSeek 的 JD 线索 + V4 的 KV cache/前缀缓存硬件底子 → ⑥ 官方基准全用未发布 harness 测→发布后才能复测（连到 file 13）。每节都有上表来源可引。
- **风险提示句（写作必须保留）**：DeepSeek JD 相关设计（KV cache 复用/动态上下文/子 agent/动态工具注册/内部 benchmark）是 tmtpost/36kr/CSDN 对 JD 关键词的**推断**，官方未确认；截至 2026-08-01 Harness 未发布（见 file 13）。

## 来源清单（完整 URL）

1. https://www.anthropic.com/engineering/harness-design-long-running-apps — Anthropic 官方（2026-03-24）：三代理架构 + GAN 启发 + context anxiety/自我评价偏差 + 游戏/DAW 全程成本明细 + evaluator bug 实例（本专题最权威来源）
2. https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents — Anthropic 官方（2025-11-26）：initializer/coding agent、feature_list.json、四个失败模式表、Puppeteer 测试价值
3. https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents — Anthropic：context engineering 背景（harness-design 文内引用）
4. https://www.anthropic.com/research/building-effective-agents — Anthropic：简化原则出处（"simplest solution possible"）
5. https://www.anthropic.com/engineering/managed-agents — Anthropic：harness 假设会随模型变强而过期、context anxiety 复述
6. https://www.faros.ai/blog/harness-engineering — Faros（2026-05-22，7-15 更新）：Agent=Model+Harness、三阶段成熟度、五层 harness、Mitchell Hashimoto 信条、211 任务开源模型追平前沿、LangChain Terminal-Bench 案例、指标框架
7. https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering — LangChain（2026-02-17）：Terminal Bench 52.8→66.5 / Top30→Top5、三个 middleware、reasoning sandwich、trace analyzer skill
8. https://www.langchain.com/blog/context-management-for-deepagents — LangChain：deep agents 上下文管理（会话总结替代完整历史）
9. https://arxiv.org/abs/2607.06906 — Writer《The Harness Effect》（2026-07-08）：22 任务×6 模型，成本-41%/墙钟-44%/token-38%、harness leverage r=0.99、六机制族
10. https://arxiv.org/abs/2605.23950 — 《Stop Comparing LLM Agents Without Disclosing the Harness》（2026-05-07）：Binding Constraint Thesis、harness 方差超模型方差、披露标准
11. https://arxiv.org/abs/2605.27922 — Harness-Bench：harness 效应诊断基准
12. https://arxiv.org/abs/2606.12344 — Claw-SWE-Bench：OpenClaw minimal direct-diff adapter 73.4%（GLM 5.1）
13. https://arxiv.org/abs/2606.17016 — TokenPilot：cache-efficient 上下文管理
14. https://arxiv.org/abs/2604.07236 — 《How Much Heavy Lifting Can an Agent Harness Do?》
15. https://arxiv.org/abs/2606.25447 — 《The Interplay of Harness Design and Post-Training in LLM Agents》（POSTECH）
16. https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance/ — NVIDIA（2026-07-27）：NOOA 六机制、SWE-bench 82.2% @ 29 调用/~1.1M token、pass-by-reference 免 compaction、ARC-AGI-3 记忆/技能增益
17. https://addyosmani.com/blog/agent-harness-engineering/ — AddyOsmani：hook 拦截退出注入新上下文窗口、HumanLayer "skill issues"
18. https://www.infoq.com/news/2026/04/anthropic-three-agent-harness-ai/ — InfoQ（2026-04）：三代理架构评述
19. https://www.shiplight.ai/blog/planner-generator-evaluator-multi-agent-qa — shiplight：三代理拆解（含"无 evaluator 的 20min/$9 产出坏核心"对照复述）
20. https://www.v2ex.com/t/1214141 — **DeepSeek Harness JD 一手原文**（崔添翼 2026-05-20 亲自发帖）：Model+Harness=Agent、技术关键词清单、共同进化、内部任务反馈源
21. https://www.tmtpost.com/8083615.html — 钛媒体：JD 关键词推断（KV cache/裁剪/前缀缓存/摘要/动态上下文/工具 DAG/子 agent）+ 内测传闻
22. https://36kr.com/p/3916402632644486 — 36氪：同源 JD 推断 + 崔添翼量化背景 + 不同 harness 工具调用次数对比（Claude Code ~70 vs OpenCode ~22）
23. https://blog.csdn.net/techforward/article/details/163323346 — CSDN：JD 推断补全（规划图/自进化/内部 benchmark/动态工具注册）
24. https://www.163.com/dy/article/L3114O8P05399DAP.html — 网易：同源 JD 推断转载
25. https://news.pedaily.cn/202607/566971.shtml — 投资界：JD 推断 + 内测时间 + 峰谷定价
26. https://www.cnblogs.com/itech/p/20100852 — cnblogs：5/15、5/18 双岗位时间 + 共同进化闭环 + 5 岗并招
27. https://api-docs.deepseek.com/guides/kv_cache/ — DeepSeek 官方 API 文档：磁盘上下文缓存默认开启、prompt_cache_hit_tokens 字段
28. https://huggingface.co/blog/deepseekv4 — DeepSeek 官方 HF blog：V4-Pro @1M 上下文 FLOPs 27%、KV cache 10%、agent 任务与闭源持平
29. https://www.reddit.com/r/AI_Agents/comments/1v3h4xo/the_agent_harness_matters_more_than_the_model_you/ — r/AI_Agents：Opus 4.5 SWE-bench Pro ~46% vs ~55%（社区，中置信）
30. https://www.reddit.com/r/ClaudeAI/comments/1s6jouf/anthropic_shares_how_to_make_claude_code_better/ — r/ClaudeAI（871 票）：harness vs solo 对比解读、context anxiety/自我评价偏差
31. https://www.reddit.com/r/LocalLLaMA/comments/1svzlog/the_exact_kv_cache_usage_of_deepseek_v4/ — r/LocalLLaMA：DSV4 Flash KV cache 6.72GiB / 12.5x 社区估算
32. https://www.mindstudio.ai/blog/what-is-harness-engineering — MindStudio：同模型不同 harness 方差、工具调用次数浪费（15 vs 4）
33. https://www.spheron.network/blog/context-engineering-production-ai-agents-kv-cache-long-context/ — Spheron：KV cache/前缀缓存工程实践（10-15 轮阈值、10:1 比例）
34. https://www.philschmid.de/context-engineering-part-2 — Phil Schmid：compaction vs summarization、可逆性优先
35. https://arize.com/blog/context-management-in-agent-harnesses/ — Arize（2026-04-28）：上下文管理工作集/压缩/检索决策
36. https://parallel.ai/articles/what-is-an-agent-harness — parallel.ai：harness 定义、compaction、进度工件
37. https://rickhigh.substack.com/p/harness-engineering-context-assembly — Hightower：context assembly（"窗口没爆，agent 还是忘了"）
38. https://datarekha.com/blog/agent-harness/ — datarekha：think-act-observe 循环、静默工具错误
39. https://www.firecrawl.dev/blog/what-is-an-agent-harness — Firecrawl：harness 定义 + Lost in the Middle
40. https://github.com/esengine/DeepSeek-Reasonix — 社区：围绕 DeepSeek prefix cache 调优的终端 agent（缓存纪律）
41. https://www.developersdigest.tech/blog/deepseek-reasonix-cache-first-coding-agents — developersdigest：缓存纪律 vs 质量评论
42. https://github.com/vllm-project/vllm/issues/42948 — vLLM issue：DeepSeek-V4-Flash hybrid groups prefix-cache 0% 命中（真实工程坑）
43. https://agent.csdn.net/6a503bd010ee7a33f28bb82e.html — 社区技术文：KV Cache 原理 + agent 上下文设计原则（JD 反推）

## gaps（未核实 / 需后续确认）

- **DeepSeek Harness 的设计细节全部来自媒体对 JD 的推断**：KV cache 复用、长上下文裁剪、历史摘要、动态上下文策略、子 agent、动态工具注册、内部 benchmark 等均为 tmtpost/36kr/CSDN 解读，**官方未确认任何具体机制**；写作时只能作为"据 JD 推测"呈现。
- **r/AI_Agents 的 "Opus 4.5 SWE-bench Pro 46% vs 55%"**：单一社区帖，未溯源到具体脚手架名称与原始评测；需官方/原论文确认，仅作轶事引用。
- **"Claude Code ~70 次工具调用 vs OpenCode ~22 次"**（36kr 引述）：第三方口径，无原始实验细节（任务集、版本、日期），只可作方向性引述。
- **Anthropic 游戏/DAW demo 的成本**：单次运行、非重复实验，属"一次演示的成本分解"，不代表统计显著性；写作时需注明是单次运行。
- **NOOA 是否真正代表"通用 harness 优于专用 harness"**：NVIDIA 自报结果（含 ARC 竞赛计分卡），评测方法开源可复现但尚未见独立第三方复现。
- **V4-Pro 官方 KV cache "10% / FLOPs 27%" 的精确口径**：HF blog 原话，但未公开完整配置细节（层数、量化、稀疏模式）；社区对 Flash 的 6.72GiB 估算也依赖层数假设（12.5x vs 官方 13.7x 口径差异）。
- **Harness minimal mode 的能力边界**：官方仅以评测语境提到 minimal mode（file 13），与完整 DeepSeek Harness 产品的能力差异未知——因此"官方 agent 分数能否代表产品性能"仍是 open question。
- **"内部 benchmark 自进化"**（CSDN 推断）：无任何官方证据，仅从 JD"共同进化/以内部真实任务为反馈源"延伸，写作时避免写实。

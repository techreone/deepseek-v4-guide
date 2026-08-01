---
topic: DeepSeek Harness 前瞻（未发布）
slug: deepseek-harness
category: research
updated: 2026-08-01
status: written
sources:
  - https://api-docs.deepseek.com/updates/
  - https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731
  - https://github.com/deepseek-ai
  - https://x.com/victor207755822/status/2057064415300841626
  - https://36kr.com/p/3818407956366208
  - https://www.21jingji.com/article/20260521/herald/d706e7b6130739114b8761d933f7e546.html
  - https://www.scmp.com/tech/big-tech/article/3358077/deepseeks-harness-team-races-recruit-talent-booming-ai-agent-market
  - https://www.pandaily.com/deepseek-building-harness-team-rival-claude-code-l8jq
  - https://www.thepaper.cn/newsDetail_forward_33691141
  - https://finance.sina.com.cn/tech/roll/2026-07-28/doc-inikkhki6320881.shtml
  - https://k.sina.com.cn/article_5952915705_162d248f906703hz1s.html
  - https://chainthink.cn/zh-CN/news/160916918297792512
  - https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta
  - https://www.tmtpost.com/8083615.html
  - https://blog.csdn.net/techforward/article/details/163323346
  - https://www.163.com/dy/article/L3114O8P05399DAP.html
  - https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm
  - https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks
  - https://wan27.org/blog/deepseek-v4-flash-official-release
  - https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/
  - https://www.reddit.com/r/LocalLLaMA/comments/1tsse9i/deepswe_benchmarks_indicate_that_deepseek_v4_pro/
  - https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official/
  - https://www.reddit.com/r/LocalLLaMA/comments/1twsffj/the_deepswe_benchmark_was_runned_rather/
  - https://www.verdent.ai/guides/deepseek-coding-plan-2026
  - https://www.verdent.ai/guides/what-is-deepseek-code
  - https://dlcmh.github.io/deepseek-harness
  - https://github.com/HenryZ838978/deepseek-harness
  - https://github.com/Hmbown/DeepSeek-TUI
  - https://freebuff.com/blog/freebuff-launch
  - https://baike.baidu.com/item/Harness/67826060
  - https://www.80aj.com/2026/07/20/deepseek-harness-code-agent/
  - https://unifuncs.com/s/M8EVFKD5
---

# DeepSeek Harness 前瞻（未发布）

> 状态说明：截至 2026-08-01，DeepSeek Harness **尚未发布**。本文区分三类信息：①官方已披露（changelog、招聘 JD、HF model card）；②媒体报道/传闻（内测截图、时间窗口，均未获官方确认）；③分析推断。写教程时务必沿用这个分层，不把传闻写成事实。

## 核心事实（可直接入教程）

### 一、"DeepSeek Harness" 是什么（官方口径）

- **官方首次公开披露**：2026-07-31 发布 V4-Flash-0731 时，官方 changelog Note 1 写明——"For the Code Agent tasks in the public benchmark sets, the official DeepSeek-V4-Flash was tested using the **DeepSeek Harness minimal mode (to be released soon)** as the framework, with the **max effort** level, **topp=0.95**, and **temperature=1.0**" ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))。这是"DeepSeek Harness"一词唯一出现在官方文档的位置，也是官方第一次确认该框架存在并即将发布。HF model card 措辞略有差异（"to be released"），同样注明 agent 基准用 minimal mode + max reasoning effort + temperature=1.0 + top_p=0.95 测得 ([huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731))。
- **定位**：DeepSeek 官方 agent 运行/评测框架。它的"minimal mode"被用作官方 Code Agent 基准测试的 agent 框架；官方暗示一旦发布，第三方就能用同一配置复测官方分数。
- **产品面（招聘 JD 定义）**：核心公式 **"Model + Harness = Agent"**——"我们正在把DeepSeek的前沿模型能力，转化为领先的Agent产品。这其中**除模型本身以外的所有工作，都属于Harness的范畴**"（上下文管理、工具调用、文件读写、终端执行、结果自修正/测试反馈、记忆、MCP、反馈闭环）。新岗位将参与"DeepSeek 桌面端 Agent 产品"研发全过程并"定义 DeepSeek 对 Harness 的理解" ([36kr](https://36kr.com/p/3818407956366208)、[21jingji](https://www.21jingji.com/article/20260521/herald/d706e7b6130739114b8761d933f7e546.html))。
- **概念背景**：Harness 是 2025 年底至 2026 年初由 Anthropic 推动、在 agent 领域流行的"工程基础设施参考框架"，把裸模型的原始智能转化为可靠可控的 agent 能力，弥补裸模型在记忆、代码执行、工具调用上的固有缺陷。Anthropic 于 2026-03-24 发布 harness design 文章（三代理：规划/生成/评估）([36kr](https://36kr.com/p/3818407956366208)、[unifuncs.com](https://unifuncs.com/s/M8EVFKD5))。DeepSeek 入局是同一波趋势，对标 Anthropic 的 Claude Code / OpenAI Codex / Cursor。

### 二、Harness 团队与招聘时间线（已确认）

- **2026-03**：崔添翼（Tianyi Cui）加入 DeepSeek。背景：Jane Street 香港约 9 年（股票与固收），2022 年联合创办量化交易公司 TSY Capital。SCMP 报道其"joining DeepSeek in March to head the Harness team" ([scmp.com](https://www.scmp.com/tech/big-tech/article/3358077/deepseeks-harness-team-races-recruit-talent-booming-ai-agent-market))。注意 Verdent 提醒：媒体普遍称其为团队负责人，但官方未发正式任命公告，准确说法是"reported team lead" ([verdent.ai](https://www.verdent.ai/guides/deepseek-coding-plan-2026))。
- **2026-05-20**：DeepSeek 资深研究员陈德里（Deli Chen）在 X 发招聘帖："We're hiring! DeepSeek is forming a new Harness team to build Code Harness from the ground up—may be you can call it DeepSeek Code or something like this hhh"，两个岗位（Harness Product Manager、Harness R&D Engineer），北京 ([x.com/victor207755822/status/2057064415300841626](https://x.com/victor207755822/status/2057064415300841626))。随后在另一条推文称项目技术负责人（LinkedIn 链接指向崔添翼）是"one of our most gifted workmates" ([verdent.ai/guides/what-is-deepseek-code](https://www.verdent.ai/guides/what-is-deepseek-code))。
- **2026-05**：科创板日报/21财经报道，知情人士称团队内部对标 Anthropic Claude Code，做"DeepSeek Code Harness"；PM 岗位 JD 把 Claude Code、Cursor、Codex、Manus、Hermes、OpenClaw 列为候选工具熟悉度要求（即对标/基准清单）([21jingji](https://www.21jingji.com/article/20260521/herald/d706e7b6130739114b8761d933f7e546.html)、[verdent.ai](https://www.verdent.ai/guides/deepseek-coding-plan-2026))。
- **2026-06-16**：DeepSeek 完成首轮外部融资，Pandaily 口径 **510 亿元人民币（约 $7.4B）**，投资方包括腾讯、京东、网易、宁德时代（36kr 另有 700 亿元口径，见 gaps）([pandaily](https://www.pandaily.com/deepseek-building-harness-team-rival-claude-code-l8jq)、[unifuncs.com](https://unifuncs.com/s/M8EVFKD5))。融资协议含"禁挖人"条款，招聘要求员工具备中文工作能力（百度百科，低权威，见 gaps）([baike.baidu.com](https://baike.baidu.com/item/Harness/67826060))。
- **2026-06-21**：团队负责人崔添翼主导线上招聘专场；此后持续扩招（Harness 研究员/工程师/PM）([letsdatascience 转载 Pandaily](https://letsdatascience.com/news/deepseek-expands-harness-hiring-and-explores-self-built-comp-247b73b5))。
- 另：DeepSeek 2025-11 世界互联网大会乌镇峰会，陈德里曾提"长期主义"；官方 4 月 V4 发布时已披露 V4 被内部用于 agentic coding，并适配 Claude Code、OpenClaw、OpenCode ([21jingji](https://www.21jingji.com/article/20260521/herald/d706e7b6130739114b8761d933f7e546.html))。

### 三、V4-Flash-0731 官方基准 = "DeepSeek Harness minimal mode" 测出的数字（全表）

| 基准 | 0731 分数 | Preview 对照 | 说明 |
|------|-----------|-------------|------|
| Terminal Bench 2.1 | **82.7** | 61.8（同版本，vLLM 口径）/ 56.9（Terminal-Bench 2.0，wan27 口径） | 公开 |
| NL2Repo | **54.2** | — | 公开 |
| Cybergym | **76.7** | — | 公开 |
| DeepSWE | **54.4** | 7.3（+645%） | 公开；DeepSWE 为第三方基准 |
| Toolathlon (verified) | **70.3** | — | 公开 |
| Agent Last Exam | **25.2** | — | 公开 |
| Automation Bench (Public) | **25.1** | — | 公开 |
| DSBench-FullStack | **68.7** | 37.0 | **内部测试集**，不可外部复测 |
| DSBench-Hard | **59.6** | — | **内部测试集**，不可外部复测 |

来源：官方 changelog ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))、TechTimes ([techtimes.com](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm))、vLLM recipes（61.8/7.3 preview 对照）([recipes.vllm.ai](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash))、wan27（56.9% Terminal-Bench 2.0 preview 口径）([wan27.org](https://wan27.org/blog/deepseek-v4-flash-official-release))。DSBench-FullStack/Hard 官方明确标注为 internal test sets（changelog Note 2）([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))。

**关键含义**：这些数字全部是 vendor figures，用**未发布的**官方 Harness 测得。第三方在 Harness 发布前无法复测/复现；TechTimes 与多个第三方分析均建议"等 yage.ai 等独立实验室复测后再对高价值工作负载做生产决策" ([techtimes.com](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)、[digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks))。

### 四、内测/发布传闻（均未获官方确认，标注报道来源）

- **2026-06-29**：DeepSeek 给 API 用户发邮件，称 V4 正式版计划 **7 月中旬**上线（澎湃报道）([thepaper.cn 早期报道 → deepseekv4pro.com 引用](https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta))。7 月中旬跳票。
- **2026-07-24**：旧 API 名 `deepseek-chat` / `deepseek-reasoner` 退役；V4 正式版未同期发布（传闻称会同期，落空）([tmtpost.com](https://www.tmtpost.com/8083615.html))。
- **2026-07-28**：快科技（新浪财经）报道"DeepSeek V4 正式版要内测了：新增全新 AI 编程工具"——流传 Harness 内部测试招募通知截图；如果内测为真，预计"本周内测、8 月中旬发布，跳票约一个月"；V4 跳票的重要原因据说与 Harness 相关 ([finance.sina.com.cn](https://finance.sina.com.cn/tech/roll/2026-07-28/doc-inikkhki6320881.shtml))。
- **2026-07-30**：智能纪元AGI 报道（新浪转载）：V4 GA 预计 **8 月 10–20 日**之间，先进行 in-house Harness 封闭测试——**小范围用户被选中**参加，NDA 保密协议式 beta，公开 V4 在测试结束后 1–2 周发布（ChainThink 同步总结该截图驱动报道）。deepseekv4pro.com 明确评估：两个来源都依赖流传截图和匿名消息，**不算独立确认**，8 月 10–20 应视为 reported target 而非确定日期 ([k.sina.com.cn](https://k.sina.com.cn/article_5952915705_162d248f906703hz1s.html)、[chainthink.cn](https://chainthink.cn/zh-CN/news/160916918297792512)、[deepseekv4pro.com](https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta))。
- **2026-07-31**：官方发布 V4-Flash-0731（API public beta），changelog 首次披露 Harness minimal mode"to be released soon"；官方称 V4-Pro 正式版"will follow soon"。**Harness 仍未发布**：无下载页、无 GitHub 仓库、无产品页、无 GA 条目 ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)、[deepseekv4pro.com](https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta))。
- **流传截图细节**（未验证）：CSDN 转载分析称"一张 DeepSeek Harness 的内部测试招募通知截图在各大 AI 社区流传……虽然截图真伪无法验证，但结合官方公告与崔添翼曾表示 Harness 将和 V4 同时发布，这一传闻很可能属实"；截图要求提交个人资料、签署《保密承诺函》，泄密将取消资格并影响后续合作（Max For AI 单方爆料，36氪等表示无法独立验证、官方未回应）([blog.csdn.net](https://blog.csdn.net/techforward/article/details/163323346)、[unifuncs.com](https://unifuncs.com/s/M8EVFKD5))。
- **灰度测试参与者说法**（非官方）：V4 正式版"整体表现接近 Opus 4.8 级别，编码能力不弱于 GPT-5.6 Sol，Agent 能力和 3D、SVG 生成大幅提升，同样任务比 Claude Fable 5 迭代轮数还少"([tmtpost.com](https://www.tmtpost.com/8083615.html)、[163.com](https://www.163.com/dy/article/L3114O8P05399DAP.html))。

### 五、社区讨论：benchmark maxxing 质疑（Harness 未开源是核心争议）

- **r/LocalLLaMA（1tsse9i，DeepSWE 帖）**：DeepSWE 是"from-scratch 任务 + 行为验证器 + ~600 行参考解"的更难基准；作者用共享 harness（mini-swe-agent：单一 bash 工具、单一 prompt）测所有模型。关键质疑——**公平性试点只覆盖 Claude、GPT、Gemini，V4 不在内**："the evidence that the harness is fair covers every family except the one this whole thread is arguing about…… A bottom-of-board score for the one model nobody validated the harness against reads as a harness result, not a capability result" ([reddit.com/r/LocalLLaMA/1tsse9i](https://www.reddit.com/r/LocalLLaMA/comments/1tsse9i/deepswe_benchmarks_indicate_that_deepseek_v4_pro/))。
- **第三方独立 DeepSWE（yage.ai，2026-06）**：V4-Pro 仅 **8% pass@1**（vs GPT-5.5 70%、Opus 4.7 54%），尽管 SWE-bench Verified 上报 80.6%；yage.ai 审计认为这是真实 long-horizon 能力差距而非验证器误差。这与官方用自家 Harness 测出的 Flash-0731 DeepSWE 54.4 形成巨大反差 → 官方数字被质疑 benchmark maxxing ([morphllm.com](https://www.morphllm.com/deepseek-v4)、[techtimes.com](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm))。
- **r/LocalLLaMA（1vbidkp，0731 帖，675 票）**：mixed 反应——"god this better not be benchmark maxxing, numbers are good but they have to actually exist outside of a lab"；但另一评论："DeepSeek is known for not benchmaxxing"。官方 X 帖：https://x.com/deepseek_ai/status/2083084415157022911 ([reddit.com/r/LocalLLaMA/1vbidkp](https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official/))。
- **第三方媒体口径**："All benchmark numbers are vendor-reported on an unreleased harness — run your own evals first" (marktechpost)；"Cost per completed task on your workload — not the vendor's harness, not anyone's leaderboard — is the only number that should move your routing table" (digitalapplied) ([marktechpost.com](https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/)、[digitalapplied.com](https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks))。
- **结论方向**：Harness 发布 = 社区验证官方 agent 数字的前提。这是本专题最有价值的话题点。

### 六、SEO 重要警示：三个同名"DeepSeek Harness"（极易混淆）

1. **官方 DeepSeek Harness（未发布）**：本专题对象。截至 2026-08-01，`github.com/deepseek-ai` 组织内**没有任何 harness 仓库**（只有 DeepSeek-V3、awesome-deepseek-agent、DeepGEMM、3FS、FlashMLA、TileKernels 等）([github.com/deepseek-ai](https://github.com/deepseek-ai))。
2. **FreeBuff CLI（CodeBuff 团队）**：第三方终端 coding agent，"9 个专用 sub-agent"、免费+终端文本广告变现。Julian Goldie 系 SEO 内容农场（aiprofitboardroom / bestaiagentcommunity / juliangoldieaiautomation / aisuccesslab 等）把 FreeBuff 称作"the harness most people search for"，用"DeepSeek Harness"做 SEO 词劫持流量 ([freebuff.com/blog/freebuff-launch](https://freebuff.com/blog/freebuff-launch)、[aiprofitboardroom.com/blog/deepseek-harness](https://aiprofitboardroom.com/blog/deepseek-harness/))。**与官方 DeepSeek 无关。**
3. **社区 GitHub 同名仓库**：`HenryZ838978/deepseek-harness`（Python lib + CLI + MCP server，自称 16 个协议 quirks/270+ trials）与 `HologramSteve/deepseek-harness`——均为社区个人项目，**非官方** ([github.com/HenryZ838978/deepseek-harness](https://github.com/HenryZ838978/deepseek-harness)、[github.com/HologramSteve/deepseek-harness](https://github.com/HologramSteve/deepseek-harness))。
4. **相关但不同**：DeepSeek-TUI / CodeWhale（Hunter Bown 的 Rust 终端 agent，非官方，2026-05 中旬一周 +21k stars 达 25k+）([verdent.ai/guides/what-is-deepseek-code](https://www.verdent.ai/guides/what-is-deepseek-code))。

**SEO 机会**：关键词 "DeepSeek Harness" 目前被第三方 FreeBuff 软文占据；官方产品未发布 → 抢先占位"官方 DeepSeek Harness 前瞻"是低竞争、高时效的好机会，但内容必须反复注明"尚未发布/信息分层"以建立可信度。

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| 官方测试配置（minimal mode） | reasoning effort = **max**，temperature = **1.0**，top_p = **0.95** | [官方 changelog](https://api-docs.deepseek.com/updates/)、[HF model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) |
| 本地部署推荐采样参数（HF 官方） | temperature = 1.0；agentic 场景 top_p = 0.95，其余 top_p = 1.0；high/max effort 下建议最大输出 384K tokens | [HF model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) |
| 用 Harness 测出的官方 agent 分数 | Terminal-Bench 2.1 82.7 / NL2Repo 54.2 / Cybergym 76.7 / DeepSWE 54.4 / Toolathlon verified 70.3 / Agent Last Exam 25.2 / Automation Bench 25.1 / DSBench-FullStack 68.7（内部）/ DSBench-Hard 59.6（内部） | [官方 changelog](https://api-docs.deepseek.com/updates/) |
| Harness 首曝时间 | 2026-07-31（V4-Flash-0731 changelog Note 1） | [官方 changelog](https://api-docs.deepseek.com/updates/) |
| Harness 团队成立 | 2026-05（招聘帖 05-20）；技术负责人崔添翼 2026-03 加入 | [X 帖子](https://x.com/victor207755822/status/2057064415300841626)、[SCMP](https://www.scmp.com/tech/big-tech/article/3358077/deepseeks-harness-team-races-recruit-talent-booming-ai-agent-market) |
| 首发岗位 | Harness Product Manager + Harness R&D Engineer（北京海淀） | [X 帖子](https://x.com/victor207755822/status/2057064415300841626) |
| 对标/基准工具清单（PM JD） | Claude Code、Cursor、Codex、Manus、Hermes、OpenClaw | [verdent.ai](https://www.verdent.ai/guides/deepseek-coding-plan-2026) |
| 融资（首轮） | Pandaily 口径 510 亿元 RMB（约 $7.4B），2026-06-16 交割；腾讯/京东/网易/宁德时代 | [pandaily](https://www.pandaily.com/deepseek-building-harness-team-rival-claude-code-l8jq) |
| 报道的 Harness 内测窗口 | 2026-07-28 报道"本周内测"；07-30 报道"封闭测试结束 1–2 周后 V4 GA"，窗口 8/10–8/20 | [finance.sina](https://finance.sina.com.cn/tech/roll/2026-07-28/doc-inikkhki6320881.shtml)、[deepseekv4pro.com](https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta) |
| 官方状态（截至 08-01） | 无下载/无 GitHub 仓库/无产品页；唯一官方时间表述 = "to be released soon" | [github.com/deepseek-ai](https://github.com/deepseek-ai)、[官方 changelog](https://api-docs.deepseek.com/updates/) |
| V4-Flash 官方定价（背景参考） | $0.14 / $0.28 per 1M tokens；cache hit $0.0028 | [AA 模型页](https://artificialanalysis.ai/models/deepseek-v4-flash) |

## 关键差异 / 时间线

- **产品形态差异（官方 vs 第三方）**：官方 Harness = agent 框架 + 桌面端 Agent 产品（对标 Claude Code），且其 minimal mode 是官方基准评测框架；FreeBuff = 第三方免费终端 agent（9 sub-agent），纯 SEO 同名劫持。两者完全无关。
- **评测框架差异**：DeepSWE 是第三方基准（datacurve.ai，113 任务，from-scratch + 行为验证器，用 PIE/Harbor fork 跑）；DeepSeek 官方只是用自家 Harness minimal mode 去跑 DeepSWE 任务。DSBench 才是 DeepSeek 内部基准。([arxiv.org/pdf/2607.07946](https://arxiv.org/pdf/2607.07946)、[deepswe.datacurve.ai](https://deepswe.datacurve.ai/blog/deepswe))。
- **时间线（2026）**：
  - 03 — 崔添翼加入 DeepSeek
  - 04-24 — V4 Preview 发布（Pro+Flash 开源）
  - 05-20 — 陈德里 X 官宣 Harness 团队（"DeepSeek Code"）
  - 05-21 — 21财经/科创板日报确认内部对标 Claude Code
  - 06-16 — 首轮融资 510 亿 RMB（Pandaily 口径）
  - 06-21 — 崔添翼线上招聘专场
  - 06-29 — 邮件：V4 正式版计划 7 月中旬
  - 07-24 — 旧 API 名退役，V4 正式版未随行发布
  - 07-28 — 快科技：Harness 将内测，8 月中旬 V4
  - 07-30 — 智能纪元AGI：Harness 封闭测试 + NDA beta，V4 GA 窗口 8/10–8/20
  - 07-31 — **V4-Flash-0731 官方发布，changelog 首曝 Harness minimal mode "to be released soon"**；V4-Pro "will follow soon"
  - 08-01（今天）— Harness 仍未发布
- **为什么 Harness 对 DeepSeek 用户重要**：
  1. **复测官方基准的唯一路径**——官方 agent 分数（DeepSWE 54.4、Terminal-Bench 82.7 等）全部产自未发布 harness，发布后才能验证是否 benchmark maxxing（社区最大争议点）。
  2. **成本差异极大**——36kr 引第三方测试：同一任务 Claude Code 平均 ~70 次工具调用 vs OpenCode ~22 次；Harness 选择直接影响 token 成本。官方 Harness 若做智能上下文管理（JD 提及 KV Cache、长上下文裁剪压缩、前缀缓存、历史摘要、动态上下文策略），可显著拉低 agent 任务成本 ([36kr](https://36kr.com/p/3916402632644486))。
  3. **产品入口**——官方桌面端 Agent（对标 Claude Code）可能成为 DeepSeek 的"AI 编程入口"，与已适配的 Claude Code/OpenCode/Codex 生态并存。

## 教程素材（写作时直接引用）

- **可引用的官方原话（changelog Note 1）**："For the Code Agent tasks in the public benchmark sets, the official DeepSeek-V4-Flash was tested using the DeepSeek Harness minimal mode (to be released soon) as the framework, with the max effort level, topp=0.95, and temperature=1.0" ([api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/))
- **可引用的 HF model card 配置**："For local deployment, we recommend setting the sampling parameters to temperature = 1.0, with top_p = 0.95 for agentic scenarios and top_p = 1.0 otherwise. For the high and max reasoning effort levels, we recommend a maximum output length of 384K tokens." ([huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731))
- **"Model + Harness = Agent" 公式**（招聘 JD 核心表述）([36kr](https://36kr.com/p/3818407956366208)、[21jingji](https://www.21jingji.com/article/20260521/herald/d706e7b6130739114b8761d933f7e546.html))——可写"这决定了 Harness 评测的哲学：模型与框架共同进化"
- **社区金句（引述需注明 Reddit）**："A bottom-of-board score for the one model nobody validated the harness against reads as a harness result, not a capability result" ([reddit 1tsse9i](https://www.reddit.com/r/LocalLLaMA/comments/1tsse9i/deepswe_benchmarks_indicate_that_deepseek_v4_pro/))；"DeepSeek is known for not benchmaxxing" ([reddit 1vbidkp](https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official/))
- **对比数据点**：官方 DeepSWE 54.4（Flash-0731，自家 Harness）vs 独立 yage.ai DeepSWE 8%（V4-Pro）→ 教程可做"同一基准、两套 harness、分数差 6 倍"的讨论锚点 ([techtimes](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)、[morphllm](https://www.morphllm.com/deepseek-v4))
- **成本对照素材**：Claude Code ~70 次工具调用/任务 vs OpenCode ~22 次（第三方，36kr 引述）([36kr](https://36kr.com/p/3916402632644486))
- **SEO 警示句**（写给读者）："搜索 'DeepSeek Harness' 时请注意：目前排名靠前的多是 FreeBuff 软文与社区同名仓库，与 DeepSeek 官方产品无关；官方 Harness 截至 2026-08-01 尚未发布。" 
- **等待信号清单**（可做"如何蹲官方发布"教程）：① DeepSeek 官方 changelog 新增 GA 条目；② github.com/deepseek-ai 出现 harness 仓库；③ 官方 X @deepseek_ai 公告；④ 官方产品页/下载页。([deepseekv4pro.com](https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta))

## 来源清单（完整 URL）

1. https://api-docs.deepseek.com/updates/ — 官方 changelog；Harness minimal mode 唯一官方出处（2026-07-31 Note 1）+ 全部 9 个 agent 基准分 + "to be released soon"
2. https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731 — 官方 model card；harness 评测配置 + 本地部署采样建议（384K 输出上限）
3. https://github.com/deepseek-ai — 官方 GitHub 组织；截至 08-01 无 harness 仓库（确认"未发布"）
4. https://x.com/victor207755822/status/2057064415300841626 — 陈德里 2026-05-20 官宣 Harness 团队招聘帖（一手来源）
5. https://x.com/deepseek_ai/status/2083084415157022911 — 官方 X 的 0731 发布帖（Reddit 帖内引用）
6. https://36kr.com/p/3818407956366208 — 36氪：Harness 团队组建 + "Model + Harness = Agent" + 桌面 Agent 岗位
7. https://36kr.com/p/3916402632644486 — 36氪：Harness 内测传闻 + 不同 harness 工具调用次数对比（Claude Code ~70 vs OpenCode ~22）
8. https://www.21jingji.com/article/20260521/herald/d706e7b6130739114b8761d933f7e546.html — 21财经：知情人士确认对标 Claude Code、陈德里原话、JD 引文
9. https://www.scmp.com/tech/big-tech/article/3358077/deepseeks-harness-team-races-recruit-talent-booming-ai-agent-market — SCMP：崔添翼任团队负责人、招聘潮
10. https://www.pandaily.com/deepseek-building-harness-team-rival-claude-code-l8jq — Pandaily：510 亿 RMB 融资（腾讯/京东/网易/宁德时代）、北京海淀荣科智新中心
11. https://www.thepaper.cn/newsDetail_forward_33691141 — 澎湃：V4-Flash 正式发布 + Harness 能力首次在官方公告亮相
12. https://finance.sina.com.cn/tech/roll/2026-07-28/doc-inikkhki6320881.shtml — 快科技：Harness 将内测、8 月中旬 V4 发布可能性
13. https://k.sina.com.cn/article_5952915705_162d248f906703hz1s.html — 智能纪元AGI：V4 GA 窗口 8/10–8/20 + Harness 封闭测试（截图驱动）
14. https://chainthink.cn/zh-CN/news/160916918297792512 — ChainThink：Harness NDA 保密 beta 计划总结
15. https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta — 三方报道综述：时间窗口评估 + "reported not confirmed" 方法论
16. https://www.tmtpost.com/8083615.html — 钛媒体：内测传闻 + JD 的 KV Cache/上下文管理推断 + 灰度参与者说法
17. https://blog.csdn.net/techforward/article/details/163323346 — CSDN 转载：内测截图流传 + 与 V4 同步发布推断
18. https://www.163.com/dy/article/L3114O8P05399DAP.html — 网易：同源内测传闻报道
19. https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm — TechTimes：645% DeepSWE 跳升、harness 未发布→无法复测、需 yage.ai 复测
20. https://www.digitalapplied.com/blog/deepseek-v4-flash-0731-official-release-agent-benchmarks — 三方分析：vendor-reported、"run your own evals first"
21. https://wan27.org/blog/deepseek-v4-flash-official-release — 三方分析：harness 发布后第三方可复现 + preview 分数对照
22. https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/ — MarkTechPost：vendor figures + 未发布 harness 警示
23. https://www.reddit.com/r/LocalLLaMA/comments/1tsse9i/deepswe_benchmarks_indicate_that_deepseek_v4_pro/ — Reddit：DeepSWE harness 公平性质疑（V4 不在试点）、benchmark maxxing 争议核心帖
24. https://www.reddit.com/r/LocalLLaMA/comments/1vbidkp/deepseekv4flash_has_been_updated_the_official/ — Reddit：0731 发布反应帖（675 票）；"better not be benchmark maxxing" + "DeepSeek is known for not benchmaxxing"
25. https://www.reddit.com/r/LocalLLaMA/comments/1twsffj/the_deepswe_benchmark_was_runned_rather/ — Reddit：DeepSWE 复跑方法论讨论（直接官方 API 复跑）
26. https://www.verdent.ai/guides/deepseek-coding-plan-2026 — Verdent：V4/Harness 团队/2026 路线图综述（"reported team lead" 措辞、JD 对标清单）
27. https://www.verdent.ai/guides/what-is-deepseek-code — Verdent：官方 Code Harness vs DeepSeek-TUI vs 社区项目区分
28. https://dlcmh.github.io/deepseek-harness — 技术深读：五子系统分解 + 技术栈推断（后端 Rust+Python、前端 Tauri、向量库 LanceDB、MCP）
29. https://github.com/HenryZ838978/deepseek-harness — 社区同名仓库（非官方），SEO 同名陷阱之一
30. https://github.com/HologramSteve/deepseek-harness — 社区同名仓库（非官方），SEO 同名陷阱之一
31. https://github.com/Hmbown/DeepSeek-TUI — DeepSeek-TUI（非官方社区终端 agent，25k+ stars）
32. https://freebuff.com/blog/freebuff-launch — FreeBuff 官方页（第三方"DeepSeek Harness"软文实际对象）
33. https://baike.baidu.com/item/Harness/67826060 — 百度百科（用户编辑，低权威）：团队定义 + 6-12 个月上线预期
34. https://www.80aj.com/2026/07/20/deepseek-harness-code-agent/ — 社区分析：Harness 与 V4 同步发布传闻
35. https://unifuncs.com/s/M8EVFKD5 — 深度解析：内测传闻未被官方确认 + 融资口径差异 + 竞争态势（Claude Code 年化 >$2.5B 等）
36. https://www.morphllm.com/deepseek-v4 — yage.ai 独立 DeepSWE 数据（V4-Pro 8% vs GPT-5.5 70% vs Opus 4.7 54%）
37. https://deepswe.datacurve.ai/blog/deepswe — DeepSWE 基准官方说明（第三方基准，非 DeepSeek 出品）
38. https://arxiv.org/pdf/2607.07946 — DeepSWE 论文（第三方，PIE/Harbor fork 评测管线）

## gaps（未核实 / 需后续确认）

- **官方 Harness 确切发布日期**：唯一官方信息是 changelog "to be released soon"（2026-07-31）；8/10–8/20、NDA beta、封闭测试均出自截图驱动报道（智能纪元AGI/Sina/ChainThink），未获官方确认。
- **内测招募截图真伪**：流传截图要求提交个人资料+签《保密承诺函》；36氪/动区等明确表示无法独立验证、官方未回应；最初来源为 Max For AI 单方爆料。
- **灰度测试参与者说法**："V4 接近 Opus 4.8 / 编码不弱 GPT-5.6 Sol / 迭代轮数少于 Claude Fable 5"——非官方渠道，官方未确认。
- **崔添翼"V4 与 Harness 同步发布"表述**：多篇中文报道引用，但未见原始一手链接，官方未确认。
- **融资口径差异**：Pandaily 510 亿元 vs 36kr 700 亿元人民币（同一轮）——需官方披露为准。
- **官方 Harness 是否会开源**：DeepSeek 模型全开源，但 Harness 无任何开源承诺；是否开放给第三方复测是社区最大悬念。
- **Harness 定价 / 产品形态 / 是否分"minimal mode"与完整版**：无官方信息；产品形态仅有招聘 JD 与社区推断（dlcmh 五子系统分解为推断，非官方）。
- **百度百科"正式上线预计 6-12 个月"**：用户编辑、低权威来源，不可直接采信。
- **陈德里 X handle（@victor207755822）与招聘链接**：Verdent 亦标注需核实当前 handle；招聘链接为 mokahr 短链，未归档。
- **官方 Harness 与已发布的 OpenCode/Claude Code 适配层的关系**：V4 官方文档有 agent integrations（Claude Code/OpenCode/Codex/Pi 等），但官方 Harness 与这些第三方 harness 是并存还是取代，官方未说明。
- **"最小模式"是否就是评测专用模式**：官方只在评测语境提到 minimal mode；其与完整 Harness 产品的能力差异未知。
- **V4-Pro 正式版与 Harness 是否同批发布**：官方仅说 V4-Pro "will follow soon"，未提与 Harness 的关系。

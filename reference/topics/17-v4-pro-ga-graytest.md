---
topic: V4 Pro GA 灰度测试传闻（7 月中旬，存疑）
slug: v4-pro-ga-graytest
category: research
updated: 2026-08-01
status: written
sources:
  - https://api-docs.deepseek.com/updates/
  - https://www.deepseek.com/
  - https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture
  - https://deepseekv4pro.com/news/deepseek-v4-ga-gray-rollout-in-house-harness
  - https://www.36kr.com/p/3903106705606274
  - https://www.36kr.com/p/3902097586800259
  - https://finance.sina.com.cn/tech/roll/2026-07-08/doc-inihaiee8028366.shtml
  - https://news.qq.com/rain/a/20260721A07H7Z00
  - https://www.zaobao.com.sg/news/china/story20260719-9387305
  - https://www.163.com/dy/article/L2URMFSN0511C4AA.html
  - https://wan27.org/blog/deepseek-v4-ga
  - https://deepseek.day/en/blog/deepseek-v4-ga-full-blood-launch/
  - https://kie.ai/blog/deepseek-v4-release-what-we-know
  - https://www.reddit.com/r/DeepSeek/comments/1usjwbn/deepseek_v4_pro_on_the_official_api_right_now_is/
  - https://www.reddit.com/r/DeepSeek/comments/1v92oyf/july_is_ending_wheres_deepseek_v4_ga/
  - https://www.reddit.com/r/DeepSeek/comments/1uu7o34/deepseek_v4_is_scheduled_to_go_live_in_midjuly/
  - https://www.reddit.com/r/codex/comments/1unk129/fable_5_vs_gpt_55_vs_glm_52_vs_deepseek_4_flash/
  - https://www.zhihu.com/question/2059057378591613636
  - https://zhuanlan.zhihu.com/p/2062128296180069882
  - https://www.dalao.net/thread-61626.htm
  - https://x.com/pankajkumar_dev/status/2078536231026372846
  - https://x.com/chetaslua/status/2078491975771443396
  - https://x.com/MrAhmadAwais/status/2074536879308026031
  - https://www.bilibili.com/video/BV15xNW63Ehf/
  - https://www.bilibili.com/video/BV1KmMg68EbF/
  - https://www.bilibili.com/video/BV1ERTR6zECb/
  - https://cloud.tencent.com/developer/article/2712893
  - https://www.kucoin.com/news/flash/deepseek-v4-set-for-release-introduces-peak-valley-pricing
---

# V4 Pro GA 灰度测试传闻（7 月中旬，存疑）

> ⚠️ **专题性质声明**：本专题全部围绕「V4 Pro GA 灰度测试」这一**未经官方确认的传闻**展开。文内所有内容严格分三层标注：**官方事实**（DeepSeek 官方渠道可直接验证）、**媒体报道**（非官方二手信源）、**社区说法**（截图/实测驱动，置信度最低）。**截至 2026-08-01，DeepSeek 官方从未发布过 V4 Pro GA，也未确认 7 月灰度测试的存在。** 写作时不得将任何社区说法写成既成事实。

## 核心结论（写给教程的第一句话）

站长传闻「7 月十几号很多网友被灰度测试了 V4 Pro GA API，大呼游戏制作水平堪比 Fable 5」——**方向上有大量社区+媒体佐证，但官方层面无法验证**：

1. **灰度测试「存在过」的证据充足但全部是间接的**：7/4 的 Build ID 截图、7/8 快科技游戏视频报道、7/11 Bilibili demo、7/17 起大量 Bilibili/X 实测输出（详见时间线）。
2. **「游戏制作堪比 Fable 5」是社区主流观感，非官方结论**：B站一句话生成游戏测试、知乎问答、Reddit 均称灰度版游戏生成与 Fable 5 同档甚至更强；但官方从无此类表述，且 Pankaj Kumar 等测试者也指出"同一任务迭代轮数比 Fable 5 多"。
3. **最大的反证：截至 2026-08-01 V4 Pro GA 根本没有发布**。官方 changelog 仅于 7/31 上线 V4-Flash 正式版公测，并明文写「V4-Pro API 与 APP/WEB 模型保持不变；V4-Pro 正式版将尽快发布」。7 月中旬的灰度测试是"发布前的渐进部署"，不等于"已发布"。

---

## 一、官方事实（高置信度，可直接引用）

来源：DeepSeek 官方 API changelog (api-docs.deepseek.com/updates/)、官网 deepseek.com。**这是本专题唯一可写死的部分。**

- **2026-04-24**：DeepSeek-V4 Preview 上线并开源。`deepseek-v4-pro`（1.6T 总参数 / 49B 激活）与 `deepseek-v4-flash`（284B 总参数 / 13B 激活），1M 上下文标配，同时支持 Thinking / Non-Thinking 模式，兼容 OpenAI ChatCompletions 与 Anthropic 两套接口。旧别名 `deepseek-chat` / `deepseek-reasoner` 将于 2026-07-24 停用（期间分别映射到 flash 的非思考/思考模式）。(https://api-docs.deepseek.com/updates/)
- **2026-07-24 15:59 UTC**：`deepseek-chat`、`deepseek-reasoner` 正式退役，之后所有 API 调用必须使用 `deepseek-v4-flash` 或 `deepseek-v4-pro`。(https://api-docs.deepseek.com/updates/)
- **2026-07-31（关键）**：官方 changelog 发布 **DeepSeek-V4-Flash 正式版 API 公测**：
  - `DeepSeek-V4-Flash-0731` 与 Preview **架构和尺寸完全一致，仅重新进行后训练**（re-post-trained）。
  - Agent 能力大幅增强，公开基准**远超 V4-Pro-Preview**：Terminal Bench 2.1 = 82.7、NL2Repo = 54.2、Cybergym = 76.7、DeepSWE = 54.4、Toolathlon verified = 70.3、Agent Last Exam = 25.2、Automation Bench (Public) = 25.1、DSBench-FullStack = 68.7（内部全栈测试集）、DSBench-Hard = 59.6（内部 Coding Agent 难题集）。注：Code Agent 基准使用即将发布的 **DeepSeek Harness 极简模式** 作为框架（max effort、top_p=0.95、temperature=1.0）。
  - 原生支持 **Responses API** 格式，并针对性适配 **Codex**。
  - **原文明确**：「This update only upgrades the DeepSeek-V4-Flash API. **The DeepSeek-V4-Pro API and the APP/WEB models are unchanged.** The official release of DeepSeek-V4-Pro will follow soon.」→ 即截至 7/31 V4-Pro GA 未发布。(https://api-docs.deepseek.com/updates/)
- **2026-08-01（截稿日）**：官网首页横幅「DeepSeek-V4-Flash 正式版 API 已上线公测，Agent 能力大幅增强；**V4-Pro 暂未变动**」。(https://www.deepseek.com/)

**对教程的意义**：官方口径下，"V4 Pro GA" 目前是**进行时/未来时**——7 月中旬的灰度测试传闻从未被官方证实或证伪，官方只确认了 Flash GA（7/31）与 Pro GA「将尽快发布」。

---

## 二、规格 / 数据

### V4 官方规格（来自官方技术报告 / HF Model Card，经 HF 分析文章整理）
| 项目 | V4-Pro | V4-Flash | 来源 |
|------|--------|----------|------|
| 总参数 | 1.6T | 284B | (https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture) |
| 激活参数/token | 49B | 13B | 同上 |
| 专家数 (MoE) | 896 | 256 | 同上 |
| 上下文窗口（默认） | 1M tokens | 1M tokens | 同上 |
| 最大输出 | 384K tokens | 384K tokens | 同上 |
| 训练数据 | 32T+ tokens | 32T+ tokens | 同上 |
| 权重格式（instruct） | FP4+FP8 混合 | FP4+FP8 混合 | 同上 |
| 磁盘占用 | 862B | 158B | 同上 |
| 优化器 | Muon | Muon | 同上 |
| 许可证 | MIT | MIT | 同上 |
| 注意力 | CSA（4:1 压缩稀疏）+ HCA（128:1 重度压缩）混合，V4-Pro 61 层 | 同左 | 同上 |

### 灰度测试期讨论的「峰谷计费」价格（7 月灰度期间多家媒体曝光的定价，GA 正式生效）
| 模型 | 项目 | 平峰 | 高峰（×2） | 来源 |
|------|------|------|------------|------|
| V4-Pro | 输出 | $0.87/M | $1.74/M | (https://www.36kr.com/p/3903106705606274) |
| V4-Pro | 输入（缓存未命中） | $0.435/M | $0.87/M | 同上 |
| V4-Pro | 输入（缓存命中） | $0.003625/M | $0.00725/M | (https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture) |
| V4-Flash | 输出 | $0.28/M | $0.56/M | (https://www.36kr.com/p/3903106705606274) |
| V4-Flash | 输入（缓存未命中） | $0.14/M | $0.28/M | 同上 |
| V4-Flash | 输入（缓存命中） | $0.0028/M | $0.0056/M | 同上 |

- 高峰时段：北京时间的 09:00–12:00 与 14:00–18:00（每日）。这是 DeepSeek 首次引入「峰谷分时计费」。(https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture) (https://news.qq.com/rain/a/20260721A07H7Z00)

### 与 Fable 5 的定价对比（教程性价比素材）
| 模型 | 输出价 | 相对 V4-Pro 平峰 | 来源 |
|------|--------|------------------|------|
| DeepSeek V4-Pro（平峰） | $0.87/M | 1× | (https://www.36kr.com/p/3903106705606274) |
| Claude Fable 5 | $50/M | **≈57× 更贵**（V4 是 Fable 5 的 1/57） | (https://www.developersdigest.tech/blog/fable-5-vs-deepseek-v4-cost-quality) (https://wan27.org/blog/deepseek-v4-ga) |
| GPT-5.6 Sol | $30/M | 1/34 | (https://wan27.org/blog/deepseek-v4-ga) |
| Kimi K3 | $15/M | 1/17 | (https://deepseek.day/en/blog/deepseek-v4-ga-full-blood-launch/) |

- 游戏生成实测成本案例：B站 UP 主冬眠の松鼠_ 用疑似灰测版生成 CS:GO 网页游戏「只花了 **9 毛钱**（0.9 元）token 费」。(https://finance.sina.com.cn/tech/roll/2026-07-08/doc-inihaiee8028366.shtml)
- X 用户 Ahmad Awais 的 Flappy Bird 一次性生成对比：DeepSeek V4 Pro $0.0008 vs GLM 5.2 $0.048 vs Fable 5 $0.42，且「Fable 5 did not produce a meaningfully better UX（Fable 5 并没有产出明显更好的 UX）」。(https://x.com/MrAhmadAwais/status/2074536879308026031)

### V4-Pro Preview 官方基准（灰测讨论的"性能起点"；GA 无官方基准）
- SWE-bench Verified：80.6（与 Opus 4.6 Max 80.8、GPT-5.4 80.6 三方打平）；LiveCodeBench 93.5（全场第一）；Codeforces 3206（International Grandmaster 区间，最高）；Apex Shortlist 90.2；MMLU-Pro 87.5；GPQA Diamond 90.1；SimpleQA 57.9（落后 Gemini 3.1 Pro 17.7 分）。(https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture)
- **游戏制作无任何官方基准**——"游戏生成"是社区自造评测，官方从未发布相关数字。这一点要在教程里写清楚。

---

## 三、关键差异 / 时间线（7 月灰度传闻逐日重建）

### 已确认事实（官方）
- **04-24** V4 Preview 上线。
- **06-29** DeepSeek 邮件通知全部 API 用户：V4 正式版 7 月中旬上线、同步引入峰谷计费（邮件本身未公开，内容经媒体转述：36kr / 腾讯新闻 / Zhihu 专栏一致引用）。
- **07-24 15:59 UTC** 旧别名退役。
- **07-31** V4-Flash 正式版 API 公测；V4-Pro 未动。

### 媒体报道（非官方，置信度中等）
- **07-03** 新浪科技/腾讯云：腾讯云宣布 DeepSeek V4 正式版（原厂直供）计划 7 月中旬上线 TokenHub 与 Agent 平台，同步时间计费。(https://finance.sina.com.cn/tech/digi/2026-07-03/doc-inifpyys3519262.shtml) (经 deepseekv4pro.com 引用)
- **07-08** 快科技/新浪财经：B站用户冬眠的松鼠_ 发布 3 条疑似 V4 正式版游戏生成视频（两次《我的世界》、一次 CS:GO），"疑似在灰度测试中"。(https://finance.sina.com.cn/tech/roll/2026-07-08/doc-inihaiee8028366.shtml)
- **07-19/07-20** 36kr（新智元）：「满血版」最快明日发布；"一部分人已提前拿到了 DeepSeek V4（GA）灰度测试的权限"，两个版本 Flash + Pro；首轮测试 demo 外流（3D 射击游戏/攻城弩车打靶、我的世界+无人深空混合 HTML、割绳子、Xbox 手柄 SVG）。(https://www.36kr.com/p/3902097586800259) (https://www.36kr.com/p/3903106705606274)
- **07-19** 联合早报：据报最快 7/20 发布；测试者认为绝对性能略逊 Kimi K3、但性价比极高；给出峰谷价格明细。(https://www.zaobao.com.sg/news/china/story20260719-9387305)
- **07-21** 腾讯新闻（太平洋科技）："曝 DeepSeek-V4 正式版已开启小规模灰度测试，预计本月底发布"，较 7 月中旬计划推迟；新版本重点优化推理效率、响应速度与智能体综合能力；"可依靠单条指令生成 3D 射击游戏、融合多玩法的 HTML 网页游戏，也能完整复刻《割绳子》"。(https://news.qq.com/rain/a/20260721A07H7Z00)
- **07-28** 网易/智能纪元AGI：DeepSeek 即将为自研 Harness 工具启动封闭测试，封测结束约 1–2 周后开放 V4 GA，预计 **8 月 10–20 日**发布。(https://www.163.com/dy/article/L2URMFSN0511C4AA.html)
- **07-31** 凤凰网科技：V4-Flash 正式版 API 上线公测；V4-Pro 正式版"尽快发布"。(https://36kr.com/p/3919224296451461)

### 社区说法（截图/实测驱动，置信度最低）
- **07-04** X 上出现 Build ID 截图：`deepseek-v4-pro-202606`、`deepseek-v4-flash-202605`（符合 DeepSeek YYYYMM 内部 checkpoint 命名）。非系统卡、非官方公告，仅两行截图。(https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture) (https://kie.ai/blog/deepseek-v4-release-what-we-know)
- **07-09** X 用户 @teortaxesTex：V4-Pro API 调用"有几率路由到正式版"（a chance of routing to the official version）。(https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture)
- **07-11** Bilibili demo——deepseekv4pro.com 称其为"目前最清晰的公开产物"：创作者把会话标注为"DeepSeek V4 最终版测试"，经 Reasonix 用 V4 Flash 生成小游戏。(https://deepseekv4pro.com/news/deepseek-v4-ga-gray-rollout-in-house-harness) (https://www.bilibili.com/video/BV15xNW63Ehf/)
- **07-17** 大量 Bilibili/X 用户开始发布灰度测试输出，展示改进的代码生成与 3D 游戏制作（HF 分析文章的原话）。(https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture)
- **07-18** Pankaj Kumar 在 X 发布灰度体验评测（约 18.3K 浏览）："Opus 4.8 level overall, coding close to GPT-5.6 Sol, but it needs more iterations than Fable 5. Strong improvements in agentic capabilities, much better 3D and SVG generation. It likely won't outperform Kimi K3 overall, but expected to be priced significantly lower."同日 @ChinaMacroFacts 称 GA build "likely stronger than Kimi K3"；同日 X 上爆发"DeepSeek 路由流量到 Claude Fable 5 蒸馏"传闻（见下节）。(https://x.com/pankajkumar_dev/status/2078536231026372846) (https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture)
- **07-19** wan27 博客称 "DeepSeek V4 GA (General Availability) began rolling out to users on July 19"；但同日的 HF 分析文章 FAQ 仍写 "Is V4 officially GA yet? **No.** As of July 19, the model is in a grayscale testing phase." → 两篇二级信源对同一日期判断相反，说明 7/19 并无官方实锤。(https://wan27.org/blog/deepseek-v4-ga) (https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture)
- **07-20** deepseek.day 称 "began limited gray testing on July 20 as V4 Flash and V4 Pro"；腾讯云开发者社区文章（勇哥AI笔记）称 "V4 GA 正式版全量上线 7 月 15 日"——两篇对上线日期说法都不一致，且均无官方公告支撑。(https://deepseek.day/en/blog/deepseek-v4-ga-full-blood-launch/) (https://cloud.tencent.com/developer/article/2712893)
- **07-23** Reddit r/DeepSeek："mixed reports about whether the V4 GA has actually fully rolled out today (July 23) or if it's still in gray-testing"，且 7/24 旧端点退役在即（"silksong of the AI world"）。社区对"是否已全量"始终无共识。(https://www.reddit.com/r/DeepSeek/comments/1v4egrf/deepseek_v4_ga_rolling_today_old_models_retire/)

**时间线结论**：7 月中旬（7/4–7/20）"灰度测试"是**多源、跨平台（X/Bilibili/Reddit/知乎/媒体）的共识性传闻**，但：
- 无任何官方系统卡/API 响应字段/官方账号公告能独立证明这些输出来自 GA checkpoint（deepseekv4pro.com 的原始判断）；
- 各路媒体给出的"上线日期"（7/15、7/19、7/20、月底、8/10–20）互相矛盾；
- 官方最终只兑现了 Flash GA（7/31），Pro GA 至今未发布。

### 「Fable 5 蒸馏/路由」传闻（灰度传闻的最大衍生瓜，需单独分层）
- **传闻内容（07-18 起在 X 病毒式传播）**：DeepSeek 疑似在 API 层面把流量偷偷路由到 Anthropic 的 Claude Fable 5，收集输出做蒸馏。证据被引用为"输出相似性 + 思维链风格变化"。(https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture)
- **分析文章判定（ResterChed，HF 社区）**：**这是未经证实的社区传闻（false / unsubstantiated）**。输出相似可用"语料重叠导致的趋同行为 + 更新 checkpoint 的新指令调优分布"解释；没有任何 API 层代理的技术证据；灰度输出反映的是真实的 V4 GA 进展，不是背后挂的第三方模型。(https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture)
- **相关佐证（也属传闻）**：X 研究者 @synthwavedd 发布调查，称在特定条件（复杂代码任务 + 知识查询）下 V4 输出与 Fable 5 "几乎完全相同"（virtually identical），进一步喂养了蒸馏论（wan27 转述）；HuggingFace 上出现过 `Chunjiang-Intelligence/DeepSeek-v4-Fable` 仓库（声称用 deepseek v4 蒸馏用于自主网络行动，仅挂几天即下架，Reddit 198 票、多数认为"不太可能真发生"）。(https://wan27.org/blog/deepseek-v4-ga) (https://www.reddit.com/r/DeepSeek/comments/1u4eynu/really_hope_fable_5_was_distilled_already_by/)
- **写作口径**：这两件事是不同层级的——"灰度测试 = 真实 V4 进展"（分析文章主张）vs "V4 偷偷用 Fable 5"（传闻，无证据）。教程里只能作为"社区八卦"引用并标注存疑，**不能**借"堪比 Fable 5"反向暗示 V4 就是 Fable 5 换皮。

---

## 四、教程素材（写作时直接引用）

### 1. 游戏制作「堪比 Fable 5」的直接社区引语
- 知乎问答（关于灰测的提问，高赞回答）："从 DeepSeekV4 正式版（GA）的灰度测试看，这一版确实落在 Fable5 和 Opus4.8 之间……应该说是落在 Fable5 和 Kimi K3 之间。""结果 DSV4GA 的效果竟然和 Fable5 在同一档，属于第一梯队。K3 排在第二档，能用但有不少 bug，GPT-5.6-Sol 竟然垫底。作为对比，还使用前国模一哥 GLM5.2 完成了一版，结果完全不能用。"——注：回答者随后自评这是任务难度与模型档次的相对判断，非官方。（来自搜索结果快照，原文抓取被 403，属二手转述）(https://www.zhihu.com/question/2059057378591613636)
- 知乎专栏（灰测总结）："实际上国内先灰测到的，最开始发觉的是 B站UP『冬眠の松鼠_』……V4 GA 从灰度测试开始到 19 号下午全面结束，整体感觉是越来越强的，已经达到 Fable 水平小幅超越了。部分灰测表现是明显比 5.6 Sol 强的。"(https://zhuanlan.zhihu.com/p/2062128296180069882)
- 大佬论坛用户："早上调用 DeepSeek V4 PRO API 做联网搜索深度调研……它会自己审查、主动反驳、自动纠正错误，还会举一反三主动挖掘更多信息。这是 Claude 最强大模型 fable5 既视感。"(https://www.dalao.net/thread-61626.htm)
- X 用户 Chetaslua（2026-07）："Deepseek V4 pro GA is being tested to few users. This is the output on the same prompt that was used for Kimi K3 and GPT Sol 5.6 in the quoted video. The details are solid — addition of tents, campfire and everything. This model looks promising."(https://x.com/chetaslua/status/2078491975771443396)

### 2. Bilibili「一句话生成游戏」灰测测评潮（游戏能力的核心证据场）
- 玩法：给 API 一个游戏名，其余全部让模型自行研究并生成 HTML 网页游戏，观众/UP 主观评分。B站共识（Reddit 转述）："at least in the 'one-sentence praying for HTML clones of famous games' test cases, this suspected grayscale V4 Pro GA is better than GLM 5.2"。(https://www.reddit.com/r/DeepSeek/comments/1usjwbn/deepseek_v4_pro_on_the_official_api_right_now_is/)
- 代表作（UP 主 冬眠の松鼠_ 的《DeepSeek V4正式版一句话生成游戏》合集，7 支视频，约 27.3 万播放）：《我的世界》（单视频 13.4 万播放，07-07 发布）、CS:GO（生成记录透明，约 3 分 54 秒）、GTA5（07-09 前后，标题自评"游戏效果不及预期"）、《后室》+ 恐怖游戏（07-09）、以及一次"三个样例"合集。(https://www.bilibili.com/video/BV1ERTR6zECb/) (https://www.bilibili.com/video/BV1KmMg68EbF/) (https://www.bilibili.com/video/BV1n7MH6SEeA/)
- 其他 UP：Delight-linger《灰度测试 dsv4 正式版？泰拉瑞亚-以撒结合-RTS-浏览器操作系统-割绳子-星露谷全测试》；"飞越麦当劳"《这期神了，dsv4 灰度版生成的 mc》。(https://www.bilibili.com/video/BV1eqNE6tEQA/)
- 知乎问答对《我的世界》+《无人深空》混合复刻的评价："移动、射击、采集、侦查功能全部在线，操作丝滑，这游戏甚至还挺好玩。"(https://www.zhihu.com/question/2059057378591613636)

### 3. 民间「验货口诀」——怎么判断自己被灰度到（教程可做成实用小贴士）
- 看思维链（CoT）开口第一人称：预览版以 "Let me" 开头，灰度 GA 版变成 "I'm" / "I'll"。（博主 AiBattle 提出，36kr/知乎专栏/wan27 多方转述；纯民间偏方，无官方背书）(https://www.36kr.com/p/3902097586800259)
- 触发通道：**灰度机制在 OpenCode 上**——被选中的账号调用 `deepseek-v4-pro` 或 `deepseek-v4-flash` 有机会拿到 GA 版（随机白名单，用户事先不知道）。R/DeepSeek 帖子（251 票）证实此观感：访问"随机发放、只有一小撮人拿到"。(https://www.zhihu.com/question/2059057378591613636) (https://www.reddit.com/r/DeepSeek/comments/1usjwbn/deepseek_v4_pro_on_the_official_api_right_now_is/)

### 4. 灰度测试期开发者能力观感（Pankaj Kumar 七维度，被媒体/分析文章广泛引用）
> "整体达到 Opus 4.8 水平，编码能力接近 GPT-5.6 Sol，但完成同一任务需要比 Fable 5 更多的迭代轮数。Agent 能力大幅增强，3D 和 SVG 生成显著变好。从当前生态位来看，V4 大概率打不过刚发布的 Kimi K3，但价格会显著更低。"
- 这条引语同时被 36kr、KuCoin、Tencent Cloud、deepseek.day 等转载，是灰测期引用率最高的"中立"评价——**注意它同时包含"接近 Fable 5 档位"和"迭代比 Fable 5 多"两面**，写教程时别只取一半。(https://x.com/pankajkumar_dev/status/2078536231026372846) (https://www.36kr.com/p/3903106705606274)

### 5. Reddit 跨模型游戏生成横向测评（含 Fable 5）
- r/codex（65 票）：Space Invaders 一次性生成对比 Fable 5 vs GPT 5.5 vs GLM 5.2 vs DeepSeek v4 Flash——"Fable 5 was most expensive（最贵）……Deepseek looks the most legit while GPT 5.5 looks the best（DeepSeek 看起来最像样，GPT 5.5 看着最好）"；"Gpt 5.5 is good, but deepseek did something that even gpt 5.5 can't do（DeepSeek 做到了 GPT 5.5 都做不到的事）"。(https://www.reddit.com/r/codex/comments/1unk129/fable_5_vs_gpt_55_vs_glm_52_vs_deepseek_4_flash/)

### 6. 灰度测试方法论（分析文章观点，可入教程）
- 灰度测试（grayscale rollout）是标准软件工程实践：把 GA 候选 checkpoint 渐进部署给部分 API 用户，再全量。HF 分析文章建议：**灰度期内不要用 API 输出跑基准**，要以 HuggingFace 开源权重 + vLLM/SGLang 自部署为"ground truth"。(https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture)
- 关键警惕（deepseekv4pro.com）：灰测 demo 没有暴露模型 hash、带日期系统卡、API 响应字段或官方账号公告，因此无法独立确认构建版本；服务商可以按账号/区域/接口/流量类别差异化路由，两个用户选同一模型名可能拿到的不是同一构建。(https://deepseekv4pro.com/news/deepseek-v4-ga-gray-rollout-in-house-harness)

---

## 五、来源清单（完整 URL）

**官方（一手）**
1. https://api-docs.deepseek.com/updates/ — 官方 changelog：04-24 V4 Preview、07-24 旧端点退役、07-31 V4-Flash 正式版公测（V4-Pro 未变、将尽快发布）
2. https://api-docs.deepseek.com/news/news260424/ — V4 Preview 发布公告
3. https://www.deepseek.com/ — 官网首页（V4-Pro 暂未变动）
4. https://huggingface.co/collections/deepseek-ai/deepseek-v4 — 官方权重集合
5. https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/blob/main/DeepSeek_V4.pdf — 官方技术报告

**媒体（二手）**
6. https://www.36kr.com/p/3902097586800259 — 新智元/36kr 07-19「最快明天发布」：灰度权限、CoT 口诀、demo、峰谷价格
7. https://www.36kr.com/p/3903106705606274 — 新智元/36kr 07-20「满血版曝光」：Pankaj Kumar 评测、游戏 demo 细节
8. https://eu.36kr.com/en/p/3903106705606274 — 同上英文版
9. https://finance.sina.com.cn/tech/roll/2026-07-08/doc-inihaiee8028366.shtml — 快科技/新浪 07-08：B站游戏灰度报道、CS:GO 9 毛钱、Fable 5 游戏生成铺垫
10. https://finance.sina.com.cn/tech/digi/2026-07-03/doc-inifpyys3519262.shtml — 新浪/腾讯云：7 月中旬 TokenHub 上线（经 deepseekv4pro.com 引用）
11. https://news.qq.com/rain/a/20260721A07H7Z00 — 腾讯新闻/太平洋科技 07-21：小规模灰度、推迟至月底
12. https://www.zaobao.com.sg/news/china/story20260719-9387305 — 联合早报 07-19：最快 7/20 发布、峰谷价格
13. https://www.163.com/dy/article/L2URMFSN0511C4AA.html — 网易/智能纪元AGI 07-28：Harness 封测、V4 GA 8/10–20
14. https://36kr.com/p/3919224296451461 — 凤凰网科技 07-31：Flash 正式版、Agent 基准、Pro 尽快发布
15. https://www.kucoin.com/news/flash/deepseek-v4-set-for-release-introduces-peak-valley-pricing — KuCoin 快讯（聚合 36kr 内容）
16. https://cloud.tencent.com/developer/article/2712893 — 腾讯云开发者社区（勇哥AI笔记）：时间线、满血版解读（含"7/15 全量上线"存疑说法）
17. https://meshlaunch.com/zh/blog/2026-deepseek-v4-ga-release-pricing-benchmark-migration.html — 中文技术博客：GA 迁移 Runbook（7/20 上线说法）

**深度分析（社区文章/独立站）**
18. https://huggingface.co/blog/ResterChed/deepseek-v4-ga-architecture — HF 社区技术分析 07-19：灰度时间线、Fable 5 传闻证伪、架构/价格/硬件
19. https://deepseekv4pro.com/news/deepseek-v4-ga-gray-rollout-in-house-harness — 灰度 rollout + Harness 信号（含 7/11 Bilibili demo、7/31 更新）
20. https://wan27.org/blog/deepseek-v4-ga — 独立站：7/19 GA 开始推送、synthwavedd 调查、57x 价格
21. https://deepseek.day/en/blog/deepseek-v4-ga-full-blood-launch/ — 独立站：7/20 灰度开始、Fable 5/GPT-5.6/Kimi K3 价格对比
22. https://kie.ai/blog/deepseek-v4-release-what-we-know — 独立分析：leaks/preview/GA 信号、WAIC 时机猜测
23. https://www.developersdigest.tech/blog/fable-5-vs-deepseek-v4-cost-quality — Fable 5 vs V4 成本质量对比（SWE-bench 81% vs 高 80s–低 90s、57x/178x）

**社区（一手用户内容，置信度低）**
24. https://x.com/pankajkumar_dev/status/2078536231026372846 — Pankaj Kumar 灰测评测（7/18，18.3K 浏览）
25. https://x.com/chetaslua/status/2078491975771443396 — Chetaslua：灰测游戏输出（帐篷/篝火细节）
26. https://x.com/MrAhmadAwais/status/2074536879308026031 — Ahmad Awais：Flappy Bird 一次性生成对比 + 价格
27. https://www.reddit.com/r/DeepSeek/comments/1usjwbn/deepseek_v4_pro_on_the_official_api_right_now_is/ — r/DeepSeek 251 票：官方 API 疑似灰度 V4 Pro GA、B站共识"优于 GLM 5.2"
28. https://www.reddit.com/r/DeepSeek/comments/1uu7o34/deepseek_v4_is_scheduled_to_go_live_in_midjuly/ — r/DeepSeek 388 票：官方邮件转述、灰度=新版本
29. https://www.reddit.com/r/DeepSeek/comments/1v92oyf/july_is_ending_wheres_deepseek_v4_ga/ — r/DeepSeek 123 票：质疑灰度输出真实性（"suspicious of alleged outputs...close to Opus 4.7"）
30. https://www.reddit.com/r/codex/comments/1unk129/fable_5_vs_gpt_55_vs_glm_52_vs_deepseek_4_flash/ — r/codex 65 票：Space Invaders 一次性生成横向测评
31. https://www.zhihu.com/question/2059057378591613636 — 知乎问答「如何看待最近网传的 DeepSeek v4 正式版灰测？」（"Fable5 同一档/第一梯队"、OpenCode 灰度机制、MC+NMS 游戏评测）
32. https://zhuanlan.zhihu.com/p/2062128296180069882 — 知乎专栏灰测总结（"达到 Fable 水平小幅超越"）
33. https://www.dalao.net/thread-61626.htm — 大佬论坛用户灰测体感（fable5 既视感）
34. https://www.bilibili.com/video/BV15xNW63Ehf/ — 7/11 Bilibili 灰测游戏 demo（deepseekv4pro.com 认定的最清晰公开产物）
35. https://www.bilibili.com/video/BV1ERTR6zECb/ — 冬眠の松鼠_：《DeepSeek V4正式版生成的我的世界》（13.4 万播放）
36. https://www.bilibili.com/video/BV1KmMg68EbF/ — 冬眠の松鼠_：灰度测试一句话生成 GTA5
37. https://www.bilibili.com/video/BV1n7MH6SEeA/ — 冬眠の松鼠_：一句话生成《后室》和恐怖游戏

---

## 六、gaps（未核实 / 需后续确认）

1. **官方从未确认灰度测试的存在、规模或机制**（是否真的在 7 月灰度 V4 Pro GA、灰度比例、路由规则、OpenCode 白名单机制均无官方说明）。唯一官方"版本事实"是 7/31 的 Flash GA 与"Pro 将尽快发布"。
2. **V4 Pro GA 发布日期未定**：官方到 8/1 仍无日期；媒体说法互相矛盾（7/15、7/19、7/20、月底、8/10–20）。需持续跟踪官方 changelog。
3. **「游戏制作堪比 Fable 5」无任何可量化基准**：全部为 B站/知乎/Reddit 主观评测；且反方意见存在（Pankaj Kumar 称迭代轮数多于 Fable 5；r/DeepSeek 有人怀疑灰测输出被夸大、仅接近 Opus 4.7）。"Fable 5 同档/第一梯队"是单条知乎回答，原文被 403 无法直接抓取核对，我引的是搜索结果快照。
4. **灰度版本无法独立验证**：公开 demo 无模型 hash、日期系统卡、API 响应字段或官方账号公告（deepseekv4pro.com 原话），存在"两个用户同一模型名拿到不同构建"的可能。
5. **Fable 5 路由/蒸馏传闻**：无技术证据，仅 1 位研究者（@synthwavedd）的"输出几乎相同"调查 + 一个已下架的 HF 蒸馏仓库（Chunjiang-Intelligence/DeepSeek-v4-Fable，Reddit 多数认为不可信）。需继续观察是否有独立取证。
6. **「验货口诀」（CoT 开头 I'm/I'll vs Let me）**：民间偏方，无官方背书，真伪不可验证。
7. **峰谷计价的生效时间点**：媒体在 7 月灰度期即报价格，但官方 changelog 未在 7/31 条目里给价格表；"GA 生效"与"灰度期价格"是否一致未官方确认。
8. **灰度期的 V4-Flash 是否等于 7/31 的 Flash-0731**：官方只说了 Flash-0731 相对 Preview"仅重新后训练"，未说明它是否就是 7 月中旬灰度测试的那个 checkpoint。
9. **B站 UP 主「冬眠の松鼠_」等灰测者是否真的持有官方灰度权限**：无验证手段；部分视频标题自身承认"疑似""效果不及预期"，个别视频作者表示"想要 API 找我室友"，暗示存在第三方/中转渠道而非官方灰度。

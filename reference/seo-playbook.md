# SEO 作战手册 — deepseekv4guide.org

> 来源：Obsidian vault「血字的研究」（Mode E Research）+ Mistfall Hunter 实战生产规范。本文档是本站从选题到排名的完整操作手册。内部文档，中文撰写，术语保留英文。

---

## 一、定位（为什么这样做，不做那样做）

### 核心结论（来自 vault 的 DeepSeek V4 Flash 案例分析）

**不做"模型目录/对比/导航站"** —— 它同时命中 2026 年 3 月谷歌核心更新的三类打击对象：
1. **目录/聚合站**：AI 可大量生成、追逐热词、缺权威来源
2. **对比站（Best X / VS）**：AI 容易生成，大都缺乏权威来源
3. **字典/快速参考工具**：AI 容易生成

搜索意图是"**用**它"（api / openrouter / codex 配置）而非"**看**目录"——官方站 platform.deepseek.com + OpenRouter 吃掉了导航流量。模型目录/评测已是红海（Artificial Analysis、LMArena、datalearner 等）。

**本站形态 = 单品牌 DeepSeek 深度"使用指南站"（Guide，非 Directory）**：
- 定位："教人用 DeepSeek V4 的深度站"，EEAT 身份清晰（"我是 DeepSeek 使用指南站"）
- 每页 = **三合一精品页面**：一手规格数据 + 一手实测/教程 + 使用配置（API / Codex / OpenCode / OpenRouter / Cursor）
- 每页 600–2000 词，不做薄内容；首页吃品牌词，内链网：模型 ↔ 场景 ↔ 对比 ↔ 教程
- 先做透 DeepSeek 一个品牌，再横向扩展；**空页/占位页不完善就不发布**（会拉低全站排名）

### 渐进式上线路线图

| 阶段 | 动作 |
|------|------|
| 第 0 步（本周） | 只做 V4 Flash：3–5 个精品页（主模型页、api/pricing、openrouter、codex/opencode/claude code 接入）|
| 第 1 步（V4-Pro 正式版 8 月初） | **下一个确定新词窗口**。提前搭好 deepseek-v4-pro 框架，发布当天 4 小时内更新数据上线（先占坑再完善）|
| 第 2 步（扩展） | 只有 DeepSeek 做透后才考虑第二品牌/模型，标准是"质量达到已验证那批"，不是补全目录 |

---

## 一之二、目标用户定位（2026-08-01 站长明确）

### 核心判断：不抢头词

**"deepseek v4" 这类精准头词不抢。** 官方站（platform.deepseek.com / api-docs.deepseek.com）权重碾压，搜这个词的用户要的是"接入/官方入口"，不是教程，竞争毫无胜算。

**本站目标是两类人，他们搜的词不是模型名：**

### 人群 A：小白 / AI 好奇者（非技术用户）
- **画像**：不知道"deepseek v4"这个型号名，但知道 AI 好用；想知道"哪些 AI 便宜、哪些值得长期用、哪些能力极强"
- **打法**：**推荐型教程**——"这是昨天刚发布的最新模型（0731），极其小巧却已强到 Opus/Claude 级别"；教小白花最少的钱体验最好的服务
- **关键钩子**：OpenCode 订阅首月仅 $5，可享受近乎 Opus 体感的模型（Flash），一个月根本用不完——"5 美元像送的一样"
- **写法**：推荐式，容易写，正文链到其他教程
- **落地页**：`which ai to use / best cheap ai / deepseek v4 flash review` 类长尾

### 人群 B：专业用户 / 开发者
- **画像**：想接入 V4 Flash 最新型号，会搜 HuggingFace（HF 权重已开源 ~284B）、部署、集成
- **打法**：**深度教程**——深度阅读官方文档 → 重新梳理组织成更详细教程 → 发布 + 外链 + 内链
- **主观素材**：NVIDIA 论坛、Reddit、社区讨论中的真实玩家/用户主观观点，可作教程素材（标注来源语境，不是自己断言）
- **落地页**：`deepseek v4 flash huggingface / api / benchmark / opencode / claude code` 等

### 教程矩阵（当前 + 新增方向）

| 类型 | 页面 | 目标人群 |
|------|------|---------|
| 主模型页 | deepseek-v4-flash（0731 正式版全解） | 两群都吃 |
| API 接入 | flash-api-setup | B |
| 定价/成本 | flash-pricing | 两群都吃 |
| 基准 | flash-benchmarks | B |
| OpenCode 接入 | flash-opencode | B |
| IDE 集成 | flash-ide（Cursor/Claude Code/Codex） | B |
| OpenRouter | flash-openrouter | B |
| 模型规模 | flash-model-size | B |
| HuggingFace 下载 | flash-huggingface | B |
| V4 Pro 前瞻 | v4-pro | B |
| 小白推荐页 | beginner-guide（best cheap AI 推荐 DeepSeek V4） | A |
| OpenCode $5 订阅 | opencode-go（首月 $5 用满 Opus 级体验） | A |
| Claude Code/Desktop | cc-switch-claude-code（CC Switch，含 Linux） | A/B |
| **Harness 前瞻** | **deepseek-harness（已写，1900 词）** | B |
| **Harness 技术深解** | **harness-agent-capability：为何原生 Harness 大幅提升 Agent 能力**（新，需搜索） | B |
| **Reasonix 缓存优化** | **reasonix-deepseek：专为 DS 的高缓存命中率代理**（新，需搜索） | B |
| **Hermes 最佳搭配** | **hermes-setup：DS V4 Flash 0731 + MiMo V2.5 识图**（新，需搜索） | B |
| **对比评测** | **v4-vs-gpt56-luna：DS V4 正式版 vs 降价后 GPT-5.6 Luna**（新，需搜索） | A/B |
| 技术报告深读 | official-tech-report | B |

### Harness 首页追踪（2026-08-01 站长明确）

- **Harness 是首页主关键词之一**：在首页显眼位置放"DeepSeek Harness 在线追踪"组件，风格贴合现有 UI（暗色 + 青色 accent + mono 字体 + 边框）
- **核心叙事**：Harness 若上线，DeepSeek 模型能力将大幅跃升；搭配即将发布的 V4 Pro 正式版，效果可能前所未有
- 其他教程正文要主动提及 Harness（双链到 harness 前瞻页）
- V4 Pro GA 灰度测试传闻（7 月中旬网友测出游戏制作堪比 Fable 5，存疑）→ 做进 Harness 追踪/前瞻，标注置信度

### 字数纪律（2026-08-01 站长明确，铁律）

- **所有教程 ≥1000 词**，内容充实不水文；低于 1000 词的页面不值得做（低质量页拉低全站 SEO 权重）
- 如果内容重要但撑不满 1000 词，**合并成一个高质量页面**，不做凑字数的薄页

### 新内容策略要点

1. **推荐型教程（人群 A）**：主观但有真实依据（官方定位、第三方评测、社区实测），基于检索写作；语气是"帮你选"，不是"权威断言"
2. **Harness 前瞻页（提前布局 SEO）**：即便正式版未发布也要"言之有物"——写上线前的变化（内测阶段、邀请内测、即将发布），做成前沿信息站，先占坑再完善；这是高价值 SEO 词
3. **官方技术报告/基准文档深读**：引用官方一手信息（arXiv、HF 模型卡、官方跑分）→ SEO 真实性与专业性极强；链接官方文档，扩写 + 与站内已有教程双向链接，提升全站权重
4. **本地/部署教程**：HF 权重、vLLM、NVIDIA 论坛参考——专业用户的高价值内容
5. **一切主观内容必须基于网络检索**（搜不到不写），数据必须来自官方或可核实来源

---

## 二、关键词策略（接住 Trends 数据）

### 2026-07-31 发布窗口解读

`deepseek v4 flash 0731` 连续 6 天为 0 → 发布当天 0→100 → 24h 内衰减到 32-48。**教科书级新闻词**，头词峰值窗口已过，官方站+已发布内容占据。但 related queries 暴露了**持久长尾**：

| 长尾词 | 意图 | 对应页面 |
|--------|------|---------|
| `deepseek api` | API 接入/价格 | `deepseek-v4-flash api / pricing` 页 |
| `openrouter` | 第三方路由器使用 | `deepseek v4 flash openrouter` 页 |
| `deepseek v4 flash 正式版` | 中文用户搜"正式版"，**0731 正式版 vs preview 的信息差还在** | 主模型页标注差异 |
| `deepseek-v4-flash` | 模型 slug，配置类意图 | 主模型页 |
| `opencode go` | 编程 Agent 接入 | `deepseek v4 flash codex / opencode / claude code` 教程 |
| `deepswe` | 基准好奇 | benchmark 页 |

**新词窗口没死，只是从"头词"转移到"长尾 + 下一个发布"。**

### 打法要点

- **一页一词**：每个页面锁定一个主关键词，内页吃同义词变体；首页吃品牌词
- **title 与 H1 一致**：格式 `<关键词> | DeepSeek V4 Guide`，关键词开头，≤60 字符
- **关键词密度 3–5%**，600+ 词/页，杜绝 keyword stuffing
- **词根法批量**：`api / pricing / benchmark / size / download / install / guide / tutorial / review / comparison`，KD<30 的补落地页
- **新词监视哨**：官方 Discord/Reddit/X 公告，新模型/新版本 24-48h 内发对应页面（谷歌对新词有特殊照顾）
- **老需求+AI新词**：老需求（API 接入/模型下载）加"AI"叠新词，避开老牌竞品垄断

---

## 三、On-Page SEO 清单（每页必须）

1. **TDK**：Title 含关键词开头（≤60）；Description ≤160 说服点击；首页吃主词，内页吃同义词
2. **单一 H1** 与 title 关键词一致；H2/H3 分层，搜索意图匹配（教程页 = 教程步骤结构，参考页 = 数据表格结构）
3. **关键词密度 3–5%**，前 100 单词内出现一次主关键词
4. **内容长度**：600–2000 词黄金区间，教程篇 1000–2000+ 词；低于 600 判薄内容
5. **结构化数据 JSON-LD**：教程页 Article + BreadcrumbList；首页 WebSite + Organization；禁止 FAQ 标记（谷歌已废除）
6. **面包屑**：`Home > Guides > <分类> > <标题>`；首页写"站点名 > Home"（常见错误）
7. **图片/多媒体**：适当加分；代码块、表格提升可读性（既是质量信号也是 AI 引用素材）
8. **URL 锁死**：`/guides/<slug>` 收录后永不改
9. **内链**：每页链到相关 3-5 个页面；教程互相 prev/next 串联；无孤儿页，首页到任意页 ≤4 次点击
10. **落地页纯净**：不掺 UGC/评论稀释关键词
11. **参考资料来源**：正文加权威来源链接提升质量分（也是 GEO 素材）

---

## 四、技术 SEO 地基（上线即做）

- **GSC**：验证域名 + 提交 sitemap + 手动请求首页/核心页索引
- **sitemap.xml + canonical + 单一 H1**：覆盖全站
- **robots.txt**：显式 Allow GPTBot / ClaudeBot / PerplexityBot / Google-Extended / Bingbot（**绝不能拦 AI 爬虫**）
- **IndexNow**：静态 `/indexnow-<key>.txt`，新页发布当天 POST 提交 → Bing/Yandex 秒收录，也为 AI 爬取做准备
- **Bing Webmaster**：并列提交（很多 AI 爬虫走 Bing 索引）
- **llms.txt**：根目录生成，列核心页面 URL + 官方站链接（AI 搜索入口）
- **确认 SSR**：Next.js 默认 SSR，但动态内容必须服务端渲染出完整 HTML（爬虫看不到 JS 渲染 = 白做）
- **Microsoft Clarity**：监测 AI 引用（Citation）与 AI 爬虫活动（Bot Activity）= AI 可见性
- **页面速度/移动端**：必须；游客 3 秒内看不到主要内容扣分
- **服务条款/隐私政策**：提升 EAT/信任度（建议加 About 页说明站长与数据来源）

---

## 五、AI 搜索 / GEO（晚了就亏）

1. **Sources 引用区块**：教程页加 `<blockquote>+<cite>` 引用官方文档、官方公告；AI 更倾向引用带出处的
2. **短陈述句**：Description 每句 <15 词；每页加一句可被 AI 直接引用的结论句；关键数值放表格
3. **正文可被引用**：规格、价格、基准用表格呈现（AI 提取结构化数据最易引用）
4. **llms.txt + IndexNow**：让 AI 数据源尽快发现新内容
5. **内容差异化**：每页是"一手攻略"而非"纯数据镜像"——关键要有出处（数值/版本号），不是空的 AI 分析
6. **避免**：关键词堆砌（AI 自己会提取关键词）；复杂长句

---

## 六、冷启动与运营节奏

### 上线 Checklist
- [ ] GSC 验证 + sitemap 提交
- [ ] robots.txt（放行 AI 爬虫） + IndexNow + llms.txt
- [ ] TDK 全站审计
- [ ] JSON-LD + 面包屑
- [ ] SSR 抽查（curl 看完整 HTML）
- [ ] URL 锁死确认

### 第一周冷启动
- 谷歌给新站约一周考核期：**每天活跃加页面**（这是核心信号）
- 外链**只建 1–2 个高质量**，不需要大量；第三周看稳定趋势
- 新词+新站第一周排名不稳定是正常现象，坚持到第三周趋于稳定
- 排名进入前 20 后：对照 SERP 前 5 名调 on-page，等 1–2 周再测，别频繁改

### 每日/每周运营
| 频率 | 动作 |
|------|------|
| 每日 | 新词监控（Trends 7 天飙升 + related queries）、GSC 看收录 |
| 每周 | GSC"已抓取不收录"报表（高比例同类模板页 → 暂停该类）、新增页、Similarweb 竞品逆向 |
| 发布日 | 新词 4 小时内占坑（先占坑再完善，流量来了再补内容）|

### 外链冷启动（第一周冲 DR）
- GitHub 开源仓库 + README 顶部放官网链接
- Reddit（r/LocalLLaMA、r/OpenAI、r/ArtificialIntelligence）真诚回帖后发"我做了个攻略站"，**链指向落地页而非首页**
- 免费外链：HARO、Resource-Page-Link-Building、Guest Post、backlinkdirs.com 批量导航站
- 每日 2 外链例行，锚文本自然混用，不爆发式灌入
- **DR 未到 30 不买链接**

---

## 七、内容生产铁律（子代理执行规范）

1. **零幻觉**：只写参考文件/检索中出现的真实事实；参考里没有的绝不编造；拿不准宁缺毋滥
2. **主观内容基于网络检索**（Tavily 优先 → Anysearch 备用，双保险）：build/review/对比等主观内容必须有真实玩家/用户依据（Reddit/Steam/评测/官方公告），标注来源语境；**搜不到可靠信息 → 该页不写**，报告 skipped + 原因
3. **本地事实核查**：客观事实（模型规格/价格/基准）先查 reference/topics/ 已有笔记确认，不用网络主观信息替代
4. **语言重组**：事实可以直接沿用（模型名、API 参数、价格），来源的句子表达必须重组（换句式换顺序），谷歌看不出是复制
5. **双向内链**：新页正文链到相关现有页（`/guides/xxx`），形成织网
6. **报告**：每个任务回报 written / skipped + 原因 + 关键来源 URL
7. **字数对标**：教程 1000–2000+ 词，不强行扩写凑字数（那会逼出幻觉）

---

## 八、变现（客观预期）

- **Google AdSense**：中低 eCPM；欧美千次访问 $3-8
- **联盟/API 分成**：OpenRouter 推荐链接可尝试
- **别期待一夜暴富**：单靠 SEO 月入几千美元已属不错
- **对比页谨慎**：`deepseek v4 vs X` 是打击对象，要做用"实测场景对比"而非"纯榜单对比"

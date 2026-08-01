# 竞争分析：chat-deep.ai

> 抓取日期：2026-08-01。原始数据见 `reference/competitors/chat-deep/`（pages/*.md + index.csv + urls.txt）。
> 爬虫：`reference/competitors/crawl_competitor.py`（可复用于其他竞争站）。

## 站型画像

- WordPress 站，154 页（121 文章 + 26 页面 + 归档页），**平均 3582 词**，110 页超 3000 词——重内容站
- 分类 hub 体系：`/use-cases/` `/solutions/` `/guides/` `/comparisons/` + 分类落地页（如 "DeepSeek API Docs & Developer Guides"）
- 结构：每篇 = H2 目录 + 正文 + 代码块 + FAQ + **Sources and Test Scope**（他们也做来源引用 = GEO 打法，与本站一致）
- 定位：DeepSeek 全品牌内容农场（R1/R2/V5/Coder/模型名全收），广度制胜

## 内容覆盖（154 页按分类）

| 分类 | 数量 | 主题 |
|---|---|---|
| API Docs | 37 | SDK(2) / Tool Calling / JSON输出 / 思维模式 / 上下文缓存 / 速率限制 / 错误码 / Anthropic兼容 / 重试 / 批量 / 可观测性 / RAG(3) / V4架构 / 模型命名 / 迁移到V4 |
| Guides | 34 | Ollama / LM Studio / vLLM / VRAM / Docker / K8s / 云部署 / 微调LoRA / 提示词模板 / 是否免费/安全 / Sheets/BI / VS Code / 股票 |
| Use Cases | 14 | 学生 / 自由职业 / 创业者 / 地产 / 游戏开发 / Obsidian / Excel / SQL / 数据分析 / 翻译 / 无障碍 |
| Comparisons | 14 | vs ChatGPT / Gemini / Claude / Grok / Perplexity / Llama / Qwen / Mistral / Kimi / Cohere / Copilot / Meta AI / 区域模型 |
| Solutions | 16 | 银行 / 医疗 / 法律 / 保险 / 政府 / 网安 / 营销 / 企业级（行业垂直） |
| News/隐私/Blog | 10 | R2追踪器 / V5路线图 / 隐私 / GDPR / 数据驻留 / 开源许可 / NVIDIA vs Huawei 基建 / R1指南 |

## 对本站的启示

### ✅ 值得"搬运内化"的高价值缺口（人群 B 开发者向，符合本站深度教程定位 + V4 新词窗口）

按优先级：

1. **DeepSeek V4 工具调用 / Function Calling 实战** — 本站已写 agents（Harness/Reasonix/Hermes）但缺 V4 原生 tool call 指南；Agent 是 2026 热词，新词窗口
2. **DeepSeek V4 结构化 / JSON 输出指南** — 开发者高频搜索
3. **DeepSeek V4 思维模式 / reasoning_content 深解** — 本站只在 flash-ide 当 fix 提过，值得单独成页吃搜索
4. **DeepSeek V4 上下文缓存深度指南**（独立于定价页）— 缓存省 98% 是本站成本优化主打的延伸
5. **DeepSeek V4 API 错误码 + 速率限制指南** — 永远有人搜，SEO 常青词
6. **DeepSeek Anthropic 兼容端点专页** — Claude Code 用户搜索量大，本站 cc-switch/flash-ide 有内容但没单独吃这个词
7. **DeepSeek V4 模型命名 / API ID 对照**（deepseek-v4-flash vs 0731 vs pro vs preview）— 改名混淆是真实搜索需求
8. **DeepSeek V4 本地部署深化**（Docker / vLLM serve 生产化）— 本站 flash-huggingface 有基础版
9. **DeepSeek V4 微调（LoRA/QLoRA）** — 新词 + 技术深度
10. **DeepSeek V4 API Key 安全最佳实践** — EEAT/信任加分

### 🔴 不要复制（本站策略红线）

- **对比站全家桶**（vs 14 个模型）：playbook 明确「对比站是 2026 核心更新打击对象」。保留现有的 v4-vs-gpt56-luna 单篇即可
- **行业垂直 Solutions**（银行/医疗/保险/政府…）：商业泛内容，不是 A/B 人群，且 EEAT 风险高
- **职业 Use Cases**（地产/自由职业/学生…）：同上，非本站目标人群
- **R1/R2/V5/Coder 旧模型内容**：本站只吃 V4 新词，不做考古
- **DeepSeek 股票/IPO**：金融边界，无 EEAT 支撑，不做

### 🟢 结构借鉴（可选）

- 他们的 **分类 hub 落地页**（"DeepSeek API Docs & Developer Guides"）是 SEO 集群打法。本站目前只有首页分类筛选，未来可考虑给 API/本地部署/工具 各做一个 hub 页
- 他们的 **R2 Release Tracker / V5 Roadmap 页** 验证了本站 HarnessTracker + V4 Pro GA 的"发布追踪"打法——应继续加码 V4 Pro GA / Harness / V5 时间线追踪页

## 竞争定位结论

chat-deep.ai 赢在**覆盖广度**（程序化内容农场）；本站赢在**深度 + 来源引用 + 新词速度 + GEO**。不要学它的铺量模型（154 页 >3000 词模板化内容，无差异化），而是挑它覆盖但本站缺的 **开发者向 V4 专精页** 逐个补上，每页仍然 1500–2500 词 + 来源 + 内链网。

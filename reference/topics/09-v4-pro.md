---
topic: DeepSeek V4 Pro（下一个新词窗口）
slug: v4-pro
category: research
updated: 2026-08-01
status: partial
sources: []
---

# DeepSeek V4 Pro（下一个新词窗口）

> 本篇结论速览：V4 Pro 目前（2026-08-01）仍是 preview（2026-04-24 发布），官方 changelog 已确认"正式版将随后到来"（The official release of DeepSeek-V4-Pro will follow soon），官方定价页/推理档位映射页均给出"2026 年 8 月初"的更新预告，是最可靠的 GA 时间信号。本站"新词窗口"主题：Pro 正式版发布前后是低竞争关键词红利期。

## 核心事实（可直接入教程）

- **V4 Pro 是什么**：DeepSeek-V4-Pro 是 DeepSeek-V4 系列的旗舰 MoE（Mixture-of-Experts）模型，1.6T 总参数 / 49B 激活参数，纯文本（text-only），1M context / 384K 最大输出，MIT 开源，与 V4-Flash（284B/13B）一同于 2026-04-24 以 preview 形式发布 [api-docs.deepseek.com/news/news260424](https://api-docs.deepseek.com/news/news260424/) [huggingface.co/deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- **官方定位**：DeepSeek 官方称其性能"对标世界顶级闭源模型"（Performance rivaling the world's top closed-source models），Agentic Coding 开源 SOTA，世界知识仅次于 Gemini-3.1-Pro [x.com/deepseek_ai/status/2047516922263285776](https://x.com/deepseek_ai/status/2047516922263285776)
- **正式版状态（截至 2026-08-01）**：仍为 preview。官方 changelog（2026-07-31）明言 "The official release of DeepSeek-V4-Pro will follow soon"；同日仅升级了 Flash API（Flash-0731），Pro API 与 APP/WEB 均未动 [api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)
- **8 月初信号（官方）**：① 官方定价页脚注：Responses API 对 deepseek-v4-pro 的支持"2026 年 8 月初"加入（目前仅支持 Flash）[api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/)；② thinking 模式官方指南：pro 的 effort 映射将在 "early August 2026" 更新 [api-docs.deepseek.com/guides/thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode)
- **GA 时间线传闻（互相矛盾，未证实）**：6/29 The Paper 报道 GA 定于 7 月中旬 [deepseekv4pro.com](https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta)；36kr 2026-07-20 称"最早明天、最迟数日内"发布并已有灰度测试 [eu.36kr.com/en/p/3903106705606274](https://eu.36kr.com/en/p/3903106705606274)；随后 Reddit/媒体又传推迟至 8 月中旬 [reddit.com/r/DeepSeek/comments/1v95tu5](https://www.reddit.com/r/DeepSeek/comments/1v95tu5/)；截至 8 月 1 日官方尚未官宣 GA 日期
- **泄露模型 ID**：2026-07-04 账号 @teortaxesTex 泄露两个带日期的新 build ID：`deepseek-v4-pro-202606`、`deepseek-v4-flash-202605`，指向 GA 候选 build（未证实，官方 API 目前仍标注 Pro 为 preview 版）[kie.ai/blog/deepseek-v4-release-what-we-know](https://kie.ai/blog/deepseek-v4-release-what-we-know)
- **Flash-0731 铺垫（本站判断 Pro 即将 GA 的关键证据）**：官方 7/31 更新将 Flash 重训练为新 build，9 项 agent 基准全面超过 V4-Pro-Preview（DeepSWE 54.4 vs 7.3，+645%），并称"仅重跑了 post-training，架构与规模不变"；同条更新明确 Pro 未动、"正式版随后到来"——社区普遍解读为 Pro GA 前的最后一次快速迭代测试床 [api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/) [reddit.com/r/LocalLLaMA/comments/1vbkvau](https://www.reddit.com/r/LocalLLaMA/comments/1vbkvau/)
- **融资背景**：DeepSeek 完成首轮外部融资约 500 亿元人民币（约 $7.35–7.4B），投后估值超 $500 亿（FT 口径约 $520 亿），腾讯、宁德时代、网易、京东及国家大基金参投；结构特殊（投资人进梁文锋控制的有限合伙、五年锁定期、无投票权，仅国家基金直接持股有投票权）[reuters.com](https://www.reuters.com/business/retail-consumer/deepseek-slated-draw-7-billion-maiden-fundraising-sources-say-2026-06-03/) [forbes.com/sites/anishasircar/2026/06/17](https://www.forbes.com/sites/anishasircar/2026/06/17/deepseek-just-raised-74-billion-heres-the-catch/)；另有第二轮融资传闻，投前估值约 $710 亿 [pymnts.com](https://www.pymnts.com/news/artificial-intelligence/2026/deepseek-considers-new-funding-round-after-raising-7-billion/)

## 规格 / 数据

| 项目 | 值 | 来源 |
|------|-----|------|
| 模型全名 | DeepSeek-V4-Pro（官方 model slug: `deepseek-v4-pro`） | [api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/) |
| 总参数 / 激活参数 | 1.6T total / 49B active（MoE，每 token 激活约 3%） | [huggingface.co](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) [framia.converge.ai](https://framia.converge.ai/page/en-US/news/deepseek-v4-parameters) |
| Context / Max Output | 1M tokens / 384K tokens | [api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/) |
| 精度 | Pro 推理版：FP4 + FP8 混合（MoE 专家参数 FP4，其余 FP8）；Pro-Base：FP8 Mixed | [huggingface.co](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) |
| License | MIT | [huggingface.co](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) |
| 发布日 | 2026-04-24（preview，与 Flash 同时） | [api-docs.deepseek.com/news/news260424](https://api-docs.deepseek.com/news/news260424/) |
| 价格（2026-08-01 官方定价页） | cache hit $0.003625/M 输入；cache miss $0.435/M 输入；$0.87/M 输出 | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 对照：Flash 价格 | cache hit $0.0028/M；cache miss $0.14/M；输出 $0.28/M | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| 并发限制 | Pro: 500；Flash: 2500 | [api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/) |
| API base_url（OpenAI 格式） | `https://api.deepseek.com` | [api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/) |
| API base_url（Anthropic 格式） | `https://api.deepseek.com/anthropic` | [api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/) |
| Responses API | 暂不支持 Pro（官方："2026 年 8 月初"加入）；仅 Flash 支持 | [api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing/) |
| 训练数据 | 超过 32T tokens 预训练 | [huggingface.co](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) |
| 效率声明 | 1M context 下：单 token 推理 FLOPs 仅为 V3.2 的 27%、KV cache 仅为 10% | [huggingface.co](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) |
| 架构 | CSA（Compressed Sparse Attention）+ HCA（Heavily Compressed Attention）混合注意力；mHC（Manifold-Constrained Hyper-Connections）；Muon optimizer | [huggingface.co](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) |
| 技术报告 | arXiv:2606.19348 "DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence"（2026-04-26） | [huggingface.co](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) |
| 第三方托管 | OpenRouter、DeepInfra、Together AI、NVIDIA NIM、Ollama（`deepseek-v4-pro:cloud`）等；pricepertoken 记录 15 家提供商，输入价 $0.435–$1.74/M | [openrouter.ai/deepseek/deepseek-v4-pro](https://openrouter.ai/deepseek/deepseek-v4-pro) [build.nvidia.com](https://build.nvidia.com/deepseek-ai/deepseek-v4-pro) [ollama.com/library/deepseek-v4-pro](https://ollama.com/library/deepseek-v4-pro) [pricepertoken.com](https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-pro) |
| 实测吞吐（第三方，pricepertoken） | 约 70 tokens/s，TTFT 0.94s | [pricepertoken.com](https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-pro) |
| 本地部署 VRAM（第三方估算） | 约 862GB（FP4+FP8）；4×80GB GPU 起步"现实可行"；单卡 4090/5090 只够 distill/小实验 | [lushbinary.com](https://lushbinary.com/blog/deepseek-v4-self-hosting-guide-vllm-hardware-deployment/) [willitrunai.com](https://willitrunai.com/blog/deepseek-v4-vram-requirements) |

## 关键差异 / 时间线

- **preview 与 GA 的可能差异（未证实，仅信号）**：
  - 官方 7/31 只给 Flash 做了"仅重跑 post-training"的升级；若 GA Pro 沿用同样路径，则**架构/参数不变、仅换新权重**（社区主流预期）[api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/) [reddit.com/r/DeepSeek/comments/1uu7o34](https://www.reddit.com/r/DeepSeek/comments/1uu7o34/)
  - 部分社区猜测 GA 版可能补上 vision/多模态权重（尤其 Flash）——未证实 [kie.ai](https://kie.ai/blog/deepseek-v4-release-what-we-know) [reddit.com/r/DeepSeek/comments/1uu7o34](https://www.reddit.com/r/DeepSeek/comments/1uu7o34/)
  - 36kr 报道开发者 Pankaj Kumar 对灰度 GA 版的实测观感：整体接近 Opus 4.8 水平、编程对标 GPT-5.6 Sol、3D/SVG 生成显著提升，但同一任务迭代轮数比 Fable 5 更多、很可能不及 Kimi K3（传闻，非官方）[eu.36kr.com](https://eu.36kr.com/en/p/3903106705606274)
  - 社区"灰度验证技巧"：如果模型思维链以 "I'm"/"I'll" 开头而非旧版 "Let me"，大概率已是 GA 版（民间偏方，未证实）[eu.36kr.com](https://eu.36kr.com/en/p/3903106705606274)
- **时间线**：
  - 2026-04-24：V4 Preview 发布（Pro + Flash），1M context 成为官方默认
  - 2026-05-22：V4 Pro API 永久降价至原价 1/4（"价格战"）[finance.biggo.com](https://finance.biggo.com/news/ded2075c-c915-499e-8c73-e56c3aa9fbb0)
  - 2026-06 上旬：首轮融资约 $7.4B 落定；The Information 称公司计划 6 月发 V4.1（未兑现）[reddit.com/r/LocalLLaMA/comments/1t7bfpw](https://www.reddit.com/r/LocalLLaMA/comments/1t7bfpw/)
  - 2026-06-29：The Paper 报道 GA 计划 7 月中旬，同时引入峰谷计价 [deepseekv4pro.com](https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta)
  - 2026-07-04：`deepseek-v4-pro-202606` / `deepseek-v4-flash-202605` ID 泄露
  - 2026-07-19/20：社区与 36kr 指向 WAIC 前后 GA；已有灰度测试 [eu.36kr.com](https://eu.36kr.com/en/p/3903106705606274) [deepseek.day](https://deepseek.day/en/blog/deepseek-v4-ga-full-blood-launch/)
  - 2026-07-24 15:59 UTC：`deepseek-chat` / `deepseek-reasoner` 彻底退役（已生效）[api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)
  - 2026-07-31：Flash 官方版 public beta（Flash-0731）；Pro "official release will follow soon"
  - 2026-08 月初（官方预告）：Pro 支持 Responses API；Pro 的 thinking effort 映射更新
- **旧模型名退役**：`deepseek-chat` 与 `deepseek-reasoner` 已于 2026-07-24 停止解析，期间内部路由到 `deepseek-v4-flash` 的非思考/思考模式；教程务必提醒读者改用 `deepseek-v4-pro` / `deepseek-v4-flash` [api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/)

## 教程素材（写作时直接引用）

**A. 基准分数（均为 DeepSeek 官方自报，V4-Pro-Max / preview，发布时数据）** — 需标注"厂商自报、待独立复现"：
- SWE-bench Verified 80.6%（vs Opus-4.6 Max 80.8%、Gemini-3.1-Pro High 80.6%）
- LiveCodeBench 93.5（vs Opus-4.6 88.8、Gemini-3.1-Pro 91.7）
- Codeforces Rating 3206（vs GPT-5.4 3168、Gemini-3.1-Pro 3052）
- GPQA Diamond 90.1、MMLU-Pro 87.5、HLE 37.7、HMMT 2026 Feb 95.2、IMOAnswerBench 89.8、SimpleQA-Verified 57.9、Apex Shortlist 90.2
- Terminal Bench 2.0 67.9、SWE Pro 55.4、SWE Multilingual 76.2、BrowseComp 83.4、MRCR 1M 83.5、CorpusQA 1M 62.0
- 来源（完整表格）：[huggingface.co/deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)

**B. 独立评测（第三方，与厂商数据并存展示更客观）**：
- NIST CAISI（2026-05）：综合评估认为 V4 Pro 能力落后前沿约 8 个月、大致对应约 8 个月前发布的 GPT-5；但 CAISI 复现了厂商的 GPQA-Diamond 结果以排除推理配置错误 [nist.gov](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro)
- kilo.ai FlowGraph 实测：V4 Pro 77/100，介于 Claude Opus 4.7（91）与 Kimi K2.6（68）之间 [blog.kilo.ai](https://blog.kilo.ai/p/we-tested-deepseek-v4-pro-and-flash)
- Artificial Analysis 将 V4 Pro 排于 K2.6 之后（第二位）[kie.ai](https://kie.ai/blog/deepseek-v4-release-what-we-know)
- Code Arena 上 deepseek-v4-pro 排第 35、thinking 版第 31，落后于 GLM 5.1 / Kimi K2.6 [deepseek.ai/deepseek-v4-flash-review](https://deepseek.ai/deepseek-v4-flash-review)
- Flash-0731 官方自报 9 项 agent 基准全超 Pro-Preview（Terminal Bench 2.1：82.7 vs 72.1；DeepSWE 54.4 vs 7.3）——测试框架 DeepSeek Harness 尚未发布，暂无法独立复现 [api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates/) [techtimes.com](https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm)
- deepseek.ai 的 22 基准统计：Flash 便宜约 4.8×，质量约为 Pro 的 83% [reddit.com/r/LocalLLaMA/comments/1vbkvau](https://www.reddit.com/r/LocalLLaMA/comments/1vbkvau/)

**C. API 调用（写教程可直接展开）**：
- 官方 OpenAI SDK 示例（thinking 模式 + effort）：
  ```python
  from openai import OpenAI
  client = OpenAI(api_key="<DeepSeek API Key>", base_url="https://api.deepseek.com")
  response = client.chat.completions.create(
      model="deepseek-v4-pro",
      messages=[{"role": "user", "content": "9.11 and 9.8, which is greater?"}],
      reasoning_effort="high",
      extra_body={"thinking": {"type": "enabled"}},
  )
  # CoT 在 reasoning_content，最终答案在 content
  ```
  [api-docs.deepseek.com/guides/thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode)
- 参数对照：OpenAI 格式 `{"thinking": {"type": "enabled/disabled"}}` + `reasoning_effort: low/high/max`；Anthropic 格式 `{"reasoning": {"effort": "none/low/high/max"}}`；思考默认开启、默认 effort=high [api-docs.deepseek.com/guides/thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode)
- 注意：thinking 模式下 temperature/top_p/presence_penalty/frequency_penalty 不生效（静默忽略）；带 tools 请求必须回传 `reasoning_content`，否则 400 [api-docs.deepseek.com/guides/thinking_mode](https://api-docs.deepseek.com/guides/thinking_mode)
- 本地部署建议参数：temperature=1.0、top_p=1.0；Think Max 模式建议 context ≥ 384K [huggingface.co](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- vLLM 官方 recipe 启动命令（节选，8 卡配置）：
  ```bash
  vllm serve deepseek-ai/DeepSeek-V4-Pro --host localhost --port 8001 \
    --dtype auto --kv-cache-dtype fp8 --tensor-parallel-size 8 \
    --max-num-seqs 512 --max-num-batched-tokens 8192 \
    --distributed-executor-backend mp --trust-remote-code \
    --gpu-memory-utilization 0.9 --tokenizer-mode deepseek_v4 \
    --reasoning-parser deepseek_v4 --tool-call-parser deepseek_v4 \
    --enable-auto-tool-choice \
    --compilation-config '{"mode": 3, "cudagraph_mode": "FULL_DECODE_ONLY"}'
  ```
  [recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Pro](https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Pro)
- NVIDIA NIM 调用（thinking=False 开关在 extra_body.chat_template_kwargs）[build.nvidia.com](https://build.nvidia.com/deepseek-ai/deepseek-v4-pro)；Together AI：`deepseek-ai/DeepSeek-V4-Pro`，其托管配置为 512K context、三种推理模式 [together.ai/models/deepseek-v4-pro](https://www.together.ai/models/deepseek-v4-pro)

**D. "新词窗口"素材（站点定位）**：
- Pro GA 前的现状：官方文档三个页面（changelog、pricing、thinking guide）都在 7/31–8/1 埋下"8 月初/soon"信号——搜索"DeepSeek V4 Pro guide/how to use/API"类词的竞争度此刻最低，是教程上线的最佳时机
- 话题钩子：Pro vs Flash 怎么选（$0.435/$0.87 vs $0.14/$0.28，质量比 ~83%）；峰谷计价上线后成本怎么算（peak 9:00–12:00、14:00–18:00 北京时间，2×，生效日未定）[api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- 官方措辞提醒：DeepSeek 官方在发布公告里强调"仅相信官方渠道消息"——写预告类内容务必用"传闻/未证实"标注 [api-docs.deepseek.com/news/news260424](https://api-docs.deepseek.com/news/news260424/)

## 来源清单（完整 URL，全部列出）

1. https://api-docs.deepseek.com/news/news260424/ — 官方 V4 Preview 发布公告（2026-04-24，Pro 1.6T/49B 定位与 API 说明）
2. https://api-docs.deepseek.com/updates/ — 官方 changelog（2026-07-31 Flash-0731 升级、Pro "will follow soon"、旧别名退役）
3. https://api-docs.deepseek.com/quick_start/pricing/ — 官方定价页（Pro/Flash 费率、峰谷计价预告、Responses API 8 月初支持 Pro）
4. https://api-docs.deepseek.com/guides/thinking_mode — thinking mode 官方指南（effort 映射、参数、示例代码）
5. https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro — HF 模型卡（架构、基准全表、下载表、本地运行建议）
6. https://huggingface.co/collections/deepseek-ai/deepseek-v4 — V4 系列权重合集
7. https://x.com/deepseek_ai/status/2047516922263285776 — 官方 X 发布帖（"对标顶级闭源"）
8. https://x.com/deepseek_ai/status/2083084415157022911 — 官方 X Flash-0731 帖
9. https://openrouter.ai/deepseek/deepseek-v4-pro — OpenRouter 模型页（价格、1M ctx/384K 输出、effort high/xhigh）
10. https://www.together.ai/models/deepseek-v4-pro — Together AI（512K 托管配置、代码示例）
11. https://deepinfra.com/deepseek-ai/DeepSeek-V4-Pro — DeepInfra 托管
12. https://build.nvidia.com/deepseek-ai/deepseek-v4-pro — NVIDIA NIM 代码示例
13. https://ollama.com/library/deepseek-v4-pro — Ollama 模型页
14. https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Pro — vLLM 官方 recipe（完整 serve 命令）
15. https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro — NIST CAISI 独立评估（落后前沿约 8 个月）
16. https://blog.kilo.ai/p/we-tested-deepseek-v4-pro-and-flash — kilo.ai FlowGraph 实测（77 vs Opus 4.7 91 vs K2.6 68）
17. https://kie.ai/blog/deepseek-v4-release-what-we-know — 泄露 ID / GA 信号综述（含 Artificial Analysis 排名）
18. https://eu.36kr.com/en/p/3903106705606274 — 36kr：GA"最早明天"，峰谷计价细节、开发者实测观感
19. https://deepseekv4pro.com/news/deepseek-v4-ga-mid-august-release-window-harness-beta — GA 传推迟至 8 月中旬、Harness 未发布
20. https://deepseekv4pro.com/news/deepseek-v4-ga-gray-rollout-in-house-harness — 灰度 rollout / in-house Harness 信号
21. https://deepseek.ai/deepseek-v4 — V4 双模型指南（MIT、纯文本、价格历史）
22. https://deepseek.ai/pricing — 定价核实（$0.14/$0.435、cache hit $0.0028）
23. https://deepseek.ai/blog/deepseek-v4-ga-surge-pricing-migration — 7/26 更新：别名已退役、峰谷计价未生效、费率卡仍单档
24. https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm — TechTimes 报道 Flash-0731 超 Pro-Preview
25. https://www.reuters.com/business/retail-consumer/deepseek-slated-draw-7-billion-maiden-fundraising-sources-say-2026-06-03/ — Reuters：首轮融资约 $7.4B，腾讯/宁德/网易/京东
26. https://www.forbes.com/sites/anishasircar/2026/06/17/deepseek-just-raised-74-billion-heres-the-catch/ — Forbes：融资结构（有限合伙、锁定期、国家基金有投票权）
27. https://www.pymnts.com/news/artificial-intelligence/2026/deepseek-considers-new-funding-round-after-raising-7-billion/ — 二轮融资传闻（投前约 $71B）
28. https://finance.biggo.com/news/ded2075c-c915-499e-8c73-e56c3aa9fbb0 — 融资后扩张、5/22 降价 1/4、DSpark 论文
29. https://finance.biggo.com/news/4ae8c8bf-bff2-4b6d-90e9-c0b1ee25a873 — 估值 $71B、V4 官版"7 月中旬"预告、自研推理芯片
30. https://www.reddit.com/r/LocalLLaMA/comments/1t7bfpw/reports_suggest_deepseek_is_seeking_735_billion/ — The Information 摘要：$7.35B、V4.1 计划 6 月
31. https://www.reddit.com/r/LocalLLaMA/comments/1vbkvau/deepseekv4flash0731_now_far_surpassing_the/ — Flash-0731 社区热帖（675 票主帖在此文另一链接）、"Flash 便宜 4.8×/质量 83%"
32. https://www.reddit.com/r/DeepSeek/comments/1v92oyf/july_is_ending_wheres_deepseek_v4_ga/ — GA 推迟社区讨论（123 票）
33. https://www.reddit.com/r/DeepSeek/comments/1ujf0dw/deepseek_v4_pro_final_arrives_midjuly_can_it/ — "正式版 7 月中旬"社区帖（318 票）
34. https://www.reddit.com/r/DeepSeek/comments/1uu7o34/deepseek_v4_is_scheduled_to_go_live_in_midjuly/ — GA 前社区预期（388 票，vision 猜测）
35. https://www.reddit.com/r/DeepSeek/comments/1v95tu5/deepseek_v4_got_delayed_to_midaugust/ — 推迟至 8 月中旬帖子
36. https://www.reddit.com/r/DeepSeek/comments/1usjwbn/deepseek_v4_pro_on_the_official_api_right_now_is/ — API 灰度体验帖（251 票）
37. https://www.reddit.com/r/LocalLLaMA/comments/1v04jq2/deepseek_v4_soon/ — GA 前能力预期（511 票）
38. https://www.reddit.com/r/DeepSeek/comments/1v9qs7i/where_is_deepseek_v4_ga_bro/ — 等 GA 讨论（102 票）
39. https://www.reddit.com/r/SillyTavernAI/comments/1uiqkoz/deepseek_v4_it_will_be_officially_launched_in_july/ — "7 月正式发布"讨论（173 票）
40. https://lushbinary.com/blog/deepseek-v4-self-hosting-guide-vllm-hardware-deployment/ — 自托管 VRAM（Pro ~862GB / Flash ~158GB）
41. https://willitrunai.com/blog/deepseek-v4-vram-requirements — VRAM 指南（4×80GB 起步）
42. https://unsloth.ai/docs/models/deepseek-v4 — Unsloth 量化（Flash UD-Q8_K_XL 162GB）
43. https://deepseek.day/en/blog/deepseek-v4-ga-full-blood-launch/ — 2026-07-20 灰度测试开始
44. https://pricepertoken.com/pricing-page/model/deepseek-deepseek-v4-pro — 15 家提供商、吞吐/TTFT
45. https://framia.converge.ai/page/en-US/news/deepseek-v4-parameters — 激活比例 3%、FP8 说明
46. https://macaron.im/blog/deepseek-v4-benchmarks — 基准汇总（标注"内部声明"）
47. https://medium.com/@leucopsis/deepseek-v4-review-a23ce940151c — 独立评测（对厂商数据持保留）
48. https://www.aimadetools.com/blog/deepseek-v4-pro-complete-guide/ — V4 Pro 使用指南（价格历史、缓存省成本）
49. https://deepseek.ai/deepseek-v4-flash-review — Flash 评测（Code Arena 排名、别名退役提醒）

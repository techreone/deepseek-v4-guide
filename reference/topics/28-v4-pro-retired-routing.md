---
topic: V4-Pro 退役与请求路由 V4.1 Flash（2026-09-14 生效）
slug: v4-pro-retired
category: release
updated: 2026-09-11
status: research
sources:
  - https://api-docs.deepseek.com/news/news260910/
  - https://api-docs.deepseek.com/quick_start/pricing/
  - https://api-docs.deepseek.com/updates
  - https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut
  - https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5
  - https://www.reddit.com/r/SillyTavernAI/comments/1wbgxus/all_requests_to_the_deepseekv4pro_model_will_be
  - https://news.ycombinator.com/item?id=49624603
  - https://forums.developer.nvidia.com/t/deepseek-v4-pro-flash-removed/379558
  - https://www.requesty.ai/blog/deepseek-v4-1-flash-retires-v4-pro-pinned-model-ids
---

# V4-Pro 退役与请求路由（2026-09-14）

## 官方公告原文要点（api-docs.deepseek.com/news/news260910/）

> "Tests by multiple parties put V4.1-Flash ahead of V4-Pro on performance, cost, speed & total runtime. We're phasing out V4-Pro."
> "Starting at 04:00 UTC on Sept 14, 2026, all `deepseek-v4-pro` requests will route to V4.1-Flash at V4.1-Flash rates. This will continue until V4.1-Pro launches."

- 北京时间表述：**2026-09-14 12:00 起**
- 官方理由：**多方测试显示 V4.1-Flash 在 performance / cost / speed / total runtime 四个维度全面超越 V4-Pro**，故"有序淘汰"（phasing out）
- 处理方式：**不删除模型 id，而是把 `deepseek-v4-pro` 请求路由（route）到 V4.1-Flash，并按 V4.1-Flash 价格计费**
- 持续到 **V4.1-Pro 发布**（官方未给日期）
- 同时：`deepseek-v4-flash` 与 `deepseek-v4-flash-vision-exp` 也已退役，兼容性路由到 V4.1 Flash
- 定价页脚注(2) 同步确认该路由与计费规则

## 时间线

| 日期 | 事件 |
|---|---|
| 2026-04-24 | V4-Pro / V4-Flash preview 发布 |
| 2026-07-31 | V4-Flash-0731 beta；V4-Pro 不变 |
| 2026-08-13 | V4-Pro GA（0813 checkpoint）；app/web/API 全量 |
| 2026-08-16 16:00 UTC | V4 家族改 peak/off-peak 峰谷定价（实质涨价） |
| 2026-08-21 | V4-Flash-Vision-Exp 发布 |
| 2026-09-10 | V4.1-Flash 发布；V4-Flash 系退役路由；宣布将淘汰 V4-Pro；新价 04:00 UTC 生效 |
| 2026-09-14 04:00 UTC | **所有 `deepseek-v4-pro` 请求路由到 V4.1-Flash，按 Flash 计费** |
| 待定 | V4.1-Pro 发布（无日期） |

## 为什么"下架"（社区/媒体解读，非官方断言，需标注语境）

1. **体积效率不佳**：Reddit r/SillyTavernAI 评论称 "Since the Pro model is underperforming by its size, they are removing it probably to make room for more training capacity, and retrain a new"——即 1.6T/49B 的体积产出不如更小的 V4.1-Flash，释放算力/训练资源
2. **成本/速度劣势**：V4.1-Flash 在官方口径下同时更便宜、更快、任务总耗时更短
3. **架构代际更替**：V4.1 是新架构家族（CED + CSA2 + Engram），V4-Pro 属旧架构；官方明言新架构为"更高能力上限、更快推理、更高吞吐、可扩展到更大模型"——V4.1-Pro 才是旗舰继任者
4. **"下架"≠删除**：实际是 endpoint 路由（silent reroute），旧 id 仍可用但背后模型被换

## 争议与风险（Hacker News / VentureBeat）

- **生产标识符静默换模型**：HN 评论（news.ycombinator.com/item?id=49624603）指出，替换现有生产 model id 背后的模型，即使更优/更便宜，也会**让回归测试失效**
- 对**提示词/agent 行为微调过**的团队，模型迁移应视为"需测试"而非"默认安全"
- VentureBeat 明确："changing the underlying model behind an existing production identifier can invalidate regression testing"
- Requesty 博客（pinned model IDs）：把 pinned id 指向新模型，对依赖确定性的团队是重大变更
- NVIDIA 论坛另有独立事件：NIM 上 V4 Pro/Flash 一度从可用列表移除（8 月上旬），社区猜测为给 Kimi K3 / 新版 Flash 腾服务器——**与 9/14 路由是不同事件，勿混淆**

## 对用户的实际影响

- **API 调用方式不变**：base_url、model 名 `deepseek-v4-pro` 都不需要改
- **计费变化**：9/14 起按 V4.1-Flash 价（off-peak 输出 $0.60 / peak $1.20，而非 pro 的 $1.98/$3.96）——**实际是降价**
- **能力变化**：后端从 V4-Pro-0813 变为 V4.1-Flash；多数 agent/coding 指标上升（TB2.1 87.9→90.6，DeepSWE 62.7→74.2），但部分项下降（HLE 42.7→36.8、NL2Repo 61.5→64.0 实际升、ProgramBench 15.5→20.3 升）
- **需自查**：依赖 V4-Pro 特定输出风格/行为的 prompt 与 agent 需重新回归测试
- **多模态获得**：原本 V4-Pro 不支持 vision，路由后获得原生视觉能力
- **app/web**：V4-Pro 的 Expert Mode 后续处理方式官方未明确（待观察）

## 适合做独立页面的主题建议
1. **deepseek v4 pro retired**（本页）——含时间线、原因、争议、影响、迁移清单
2. **deepseek-flash model names**——所有模型名/别名/退役状态一张表，防生产事故
3. **deepseek v4.1 pro**——旗舰继任者前瞻（无日期）

## 来源清单
1. https://api-docs.deepseek.com/news/news260910/
2. https://api-docs.deepseek.com/quick_start/pricing/
3. https://api-docs.deepseek.com/updates
4. https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut
5. https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5
6. https://www.reddit.com/r/SillyTavernAI/comments/1wbgxus/all_requests_to_the_deepseekv4pro_model_will_be
7. https://news.ycombinator.com/item?id=49624603
8. https://forums.developer.nvidia.com/t/deepseek-v4-pro-flash-removed/379558
9. https://www.requesty.ai/blog/deepseek-v4-1-flash-retires-v4-pro-pinned-model-ids

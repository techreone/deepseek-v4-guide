---
topic: DeepSeek 2026 年 10 月连续宕机与 7 天额度补偿
slug: deepseek-outage-october-2026
category: news
updated: 2026-10-18
status: research
sources:
  - https://status.deepseek.com/incidents/7116348214287
  - https://www.caixinglobal.com/2026-10-16/deepseek-restores-services-after-nearly-five-hour-outage-102493794.html
  - https://www.scmp.com/tech/big-tech/article/3371047/deepseek-offers-user-refunds-after-suffering-another-major-outage
  - https://news.cgtn.com/news/2026-10-15/DeepSeek-offers-compensation-after-restoring-from-service-outage-1RgrRBZHn9u/share_amp.html
  - https://technode.com/2026/10/15/deepseek-implements-fix-after-partial-outage-affects-chat-and-api-services/
  - https://dev.to/gabrielanhaia/deepseeks-api-was-partly-down-for-4h52m-its-refunding-a-week-of-spend-as-credit-3p6j
  - https://explainx.ai/blog/deepseek-5-hour-api-outage-7-day-credit-refund-october-15-2026
  - https://www.ithome.com/1/013/533.htm
  - https://www.thepaper.cn/newsDetail_forward_34257131
---

# DeepSeek 2026 年 10 月宕机事件与补偿（10-15 为主）

## 一句话
**2026-10-15（周四）** DeepSeek 网页/App/API **部分中断近 5 小时**，波及 **对话服务 + V4 Pro API + V4.1 Flash API**；官方当晚宣布**把 10 月 8–14 日这 7 天的消费以赠金形式全额返还**。

## 时间线（UTC / 北京时间）
- **开始**：08:11 北京时间（**00:11 UTC**）—— 官方 status page 记为 "DeepSeek 网页/API 部分中断"，V4-Pro 与 V4.1-Flash API 先受影响
- **完全下线**：09:08 北京时间，对话（chat）服务全挂；网页/App 显示"服务器暂时不可用"
- **修复中**：12:49 北京时间 status page 转入 monitoring
- **恢复**：**13:04 北京时间**（05:04 UTC）全部服务恢复
- **时长**：官方口径 **4 小时 52 分**（约 4h53m）
- 加州对应时间：10 月 14 日 17:11 → 22:04

## 影响面
- 三个组件同时挂：**对话服务、DeepSeek-V4-Pro API、DeepSeek-V4.1-Flash API**
- 官方未公布技术根因；补偿通知里称已**全面排查并"消除各种单点依赖"**（single points of dependency）
- 未发现安全事件/数据泄露迹象 —— 是可用性故障，不是入侵

## 补偿条款（关键，别写错）
- 对象：**API 账户**（按账号，非按故障时长）
- 范围：**2026-10-08 至 2026-10-14 的全部消费**，以**赠金（bonus credit）全额返还**
- 原文（The Paper 转述）："将按账号7日内（10.8-10.14）的消耗金额以赠金形式全额返还"
- **自动发放**，无需提工单
- **扣费顺序**：充值余额与赠送余额同时存在时，**优先扣赠送余额** → 赠金先花掉，现金余额暂不动
- 口径要点：**补的是故障前那一周，不是故障本身**（比按宕机时长折算慷慨得多）；那一周没消费就补 0；重用户返还可观（有报道称个别用户达数千元级）
- **未明确**：赠金是否过期；免费/促销额度是否计入
- 前例：2026 年 6 月曾因**缓存计费系统错误**自动补赠金（覆盖约 5/13–6/9），也是赠金而非现金 —— 说明这是 DeepSeek 的一贯处理模式

## 频次与可靠性数据
- Caixin：**9 月以来已计 13 次故障**，多数是 web/API 性能下降，其中 4 次是 web+API 部分中断
- status page（2026-07 至 10）uptime：**V4 Pro API 99.91%**（另一处口径 99.74%）、**V4.1 Flash API 99.47%**
- 10 月内被媒体计为**第 5 次**中断
- 10-15 之前的零星事件：**10-01** 有数百用户报告 down（DownDetector）；**10-15** 当天为部分中断 + 修复
- 有 newsletter 把连续故障与新模型需求挂钩（"V4.1 需求激增"），**DeepSeek 未确认，属推测**

## 对开发者的实用结论（可写进 guide）
- 单一 provider 就是单点故障：**给 LLM 调用加 fallback**（第二 provider + 不同 base_url + 不同 model）
- 只在会产生宕机的错误上 failover：`status === undefined`（网络层） / `429` / `>=500`；其他 4xx 不要重试
- 设 timeout（如 20s）、maxRetries 限制、**断路器**（5 小时宕机应在几分钟内触发熔断而不是堆队列）
- 缓存 + 队列：可重复结果缓存、非紧急任务排队重放
- **换了 fallback 模型要重跑 eval**（结构化输出会漂），并记录每个请求由谁服务
- 观察 status page 与错误率告警，别等用户报障

## 与本站选题的关系
- 这是「DeepSeek 稳定性 / 宕机怎么办 / 7 天补偿怎么查」类查询的真实需求来源
- 与 1017 发布（10-17）相隔两天，构成"**先宕机、后发新 checkpoint**"的叙事线，可做时间线页

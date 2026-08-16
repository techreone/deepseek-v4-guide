---
topic: DeepSeek-V4-Pro GA（0813 正式版发布）
slug: v4-pro-ga
category: release
updated: 2026-08-16
status: research
sources:
  - https://api-docs.deepseek.com/news/news260813/
  - https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/
  - https://techjacksolutions.com/ai-brief/deepseek-v4-pro-0813-general-availability-moe/
  - https://openrouter.ai/deepseek/deepseek-v4-pro
  - https://www.cometapi.com/how-to-use-deepseek-v4-pro-api/
---

# DeepSeek-V4-Pro GA Release（2026-08-13）

## 官方公告（api-docs.deepseek.com/news/news260813/，2026-08-16 抓取）

- **2026/08/13 V4-Pro GA Release** 🚀
- **Major Agent upgrades with strong production gains**（重大 Agent 升级，生产级收益）
- **Flexible reasoning effort for V4-Pro & V4-Flash**：low（简单任务）/ high（日常 Agent 工作流）/ max（复杂任务）
- **Native OpenAI Responses API support，optimized for Codex（one-click setup）**——原生 Responses API 支持，Codex 一键接入
- V4 Pro 现可在 **app/web** 使用（"Expert Mode"）
- V4 Pro **API 可用**，model names 不变（deepseek-v4-pro），设置见 API docs
- **API pricing update**：引入 **peak（峰时）和 off-peak（谷时）费率，off-peak 低 50%**；新定价 **2026-08-16 16:00 UTC 生效**

## 规格（沿用 preview，0813 = GA checkpoint）

- 1.6T 总参数 / 49B active（per token），MoE
- 1M-token 上下文 / 384K 最大输出
- 纯文本，MIT 协议
- 推理精度 FP4 + FP8 混合
- 4/24 preview 首发；8/13 0813 checkpoint = 正式 GA
- 官方 benchmark：agentic coding 开源 SOTA，world knowledge 仅次 Gemini-3.1-Pro

## 定价变化（待子代理核实具体数字）

- 官方公告：peak/off-peak 峰谷费率，off-peak -50%
- Facebook 标题称 "1,100% Price Hike"（疑似夸大或特指某场景，需核实官方 pricing 页实际数值）
- benchlm.ai 有 8/12 快照的 pricing（可能已过时——8/16 16:00 UTC 新价生效）
- Reddit 已确认 deepseek-v4-pro-0813 上 pricing 页

## 关键升级点

1. **Agent 能力**：major upgrades with strong production gains
2. **reasoning effort**：low/high/max 三档灵活推理（V4-Pro & V4-Flash 都有）
3. **Responses API**：原生支持，Codex 一键配置
4. **Expert Mode**：app/web 新交互模式

## 待扩展研究（子代理任务）

- [ ] 8/16 新 pricing 实际数值（deepseek-v4-pro 输入/输出单价 + 缓存折扣 + off-peak 价）
- [ ] 0813 相对 preview 的评测变化（agentic coding 分数）
- [ ] Responses API 接入细节（endpoint/参数/Codex 配置）
- [ ] OpenRouter 上的 v4-pro 0813 定价与状态
- [ ] vs Flash / vs GPT-5.5 的对比素材

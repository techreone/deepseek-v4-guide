# WRITING SPEC — deepseekv4guide.org 2026-10-18 战役（1017 + 宕机事件）

> 子代理写页前**必读**。格式不对会被 `node scripts/lint-content.mjs` 拦下。

## 1. 输出位置与文件骨架

**只新建你自己那一个文件**：`src/data/guides/<slug>.ts`。**不要动 `src/data/guides/index.ts`**（主 agent 统一注册，避免并行冲突）。

```ts
import type { GuideContent } from "./types";

// target keyword: <主关键词>
// 事实来源：reference/topics/29-v4-1-flash-1017.md 等
export const <camelCaseName>: GuideContent = {
  slug: "<kebab-case-slug>",
  category: "RELEASE",            // 见 §5
  title: "<H1，可长，含主关键词>",
  seoTitle: "<≤44 字符（含空格）>",
  readTime: "9 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary: "<≤160 字符，meta description>",
  toc: [
    { id: "step-1", label: "Step 1: ..." },
    // ……必须与 steps 一一对应，数量一致，id 必须依次是 step-1..step-N
  ],
  steps: [
    {
      num: "01",
      title: "...",
      description: "...",                 // 必填首段
      paragraphs: ["...", "..."],          // 可选
      list: ["...", "..."],                // 可选
      table: { headers: ["A","B"], rows: [["1","2"]] },  // 可选
      code: "...",                          // 可选（代码块，不参与词数统计）
      note: "...",                          // 可选（提示框）
    },
    // ……
  ],
  prevGuide: { title: "...", slug: "<已有 slug>" },
  nextGuide: { title: "...", slug: "<已有 slug>" },
  relatedGuides: [
    { title: "...", slug: "..." },   // ≥3 个，全部必须是有效 slug
    { title: "...", slug: "..." },
    { title: "...", slug: "..." },
  ],
  sources: [
    { label: "...", url: "https://..." },  // ≥3 条，全部真实可访问
    { label: "...", url: "https://..." },
    { label: "...", url: "https://..." },
  ],
};
```

可选字段：`notice`（顶部时效横幅，支持 `[[slug|文字]]` 与 `[n]`）。

## 2. 硬性校验（lint-content.mjs）

| 规则 | 要求 |
|---|---|
| slug | kebab-case、全站唯一 |
| seoTitle | **≤ 44 字符**（站点会追加 " \| DeepSeek V4 Guide"，总长 ≤65） |
| summary | **≤ 160 字符** |
| toc / steps | 数量相等；`toc[i].id === "step-" + (i+1)` |
| 正文英文词数 | **≥ 1000**（<600 直接判薄内容） |
| 内链 `[[slug\|文字]]` | 目标 slug **必须在 §4 白名单内**，否则死链报错 |
| 角注 `[n]` | n 必须 ≤ sources 条数 |
| sources | **≥ 3 条** |
| relatedGuides | ≥ 3 条 |

## 3. 行内语法（只在 description / paragraphs / list / note / notice 里生效）

- `[[slug|显示文字]]` → 站内双链，跳到 `/guides/<slug>`
- `[3]` → 角注上标，链到 sources 第 3 条
- 表格用 `table` 字段，**不要**在文字里画 markdown 表格
- **不要**在 description/paragraphs 里写 markdown 语法（`##`、`**`、`-`），渲染器不解析

## 4. 内链白名单（只能是这些 slug）

```
beginner-guide cc-switch-claude-code deepseek-flash-model-names deepseek-harness
deepseek-v4-1-flash deepseek-v4-1-pro deepseek-v4-flash deepseek-v4-pro-retired
flash-api-setup flash-benchmarks flash-huggingface flash-ide flash-model-size
flash-opencode flash-openrouter flash-pricing harness-agent-capability harness-benchmark
harness-claude-code harness-code-mode harness-cordis harness-cursor harness-error-fix
harness-github harness-install harness-mcp harness-minimal-mode harness-model
harness-plugins harness-quickstart harness-release-date harness-sandbox harness-setup
harness-terminal harness-tutorial harness-vs-claude-code harness-vs-opencode harness-web-ui
hermes-setup official-tech-report opencode-go opencode-go-price-hike reasonix-deepseek
v4-1-flash-api-setup v4-1-flash-benchmarks v4-1-flash-coding-agents v4-1-flash-kv-cache
v4-1-flash-local-deployment v4-1-flash-pricing v4-1-flash-reasoning-effort v4-1-flash-vision
v4-1-flash-vs-kimi-k3 v4-1-flash-vs-opus-5 v4-1-flash-vs-v4-flash v4-pro v4-pro-0813
v4-pro-agent v4-pro-api v4-pro-benchmarks v4-pro-claude-code v4-pro-context-caching
v4-pro-cursor v4-pro-expert-mode v4-pro-harness v4-pro-model-size v4-pro-opencode
v4-pro-openrouter v4-pro-pricing v4-pro-reasoning-effort v4-pro-release-date
v4-pro-responses-api v4-pro-review v4-pro-surge-pricing v4-pro-vs-deepseek-r1
v4-pro-vs-flash v4-pro-vs-gpt-5.5 v4-vs-gpt56-luna what-is-deepseek-harness
```

**本次战役 15 个新页之间可以互相内链**（它们会在同一批注册）：

```
deepseek-v4-1-flash-1017 v4-1-flash-1017-benchmarks v4-1-flash-1017-vs-v4-1-flash
v4-1-flash-1017-local deepseek-search-api deepseek-rag-search-api deepseek-down
deepseek-outage-refund deepseek-server-busy deepseek-api-error-codes
opencode-deepseek-1017 deepseek-vscode-copilot deepseek-codex deepseek-free-1017
deepseek-mcp-servers
```

## 5. category 取值（挑一个，全大写）

`RELEASE` / `NEWS & UPCOMING` / `BENCHMARKS` / `API SETUP` / `TUTORIAL` / `INTEGRATION GUIDE` / `LOCAL DEPLOYMENT` / `COMPARISON` / `PRICING & COST` / `TECHNICAL` / `TOOLS & EXTENSIONS` / `REFERENCE`

## 6. 写作纪律（站长定案，违反即返工）

1. **零杜撰**：所有数字必须来自 `reference/topics/29-v4-1-flash-1017.md`、`30-deepseek-outage-oct2026.md`、`31-opencode-deepseek-1017.md`，或你自己**联网核实**过的一手来源。不确定就不写。
2. **禁站长话术**：不许出现「搜索量」「关键词」「自动补全」「需求分析」「我们抓取」「appid」「API 查询日期」等运营视角用语。正文是给用户看的。
3. **标注口径**：厂商自报的 benchmark 必须写明是 vendor-reported / DeepSeek's own numbers；价格写明 as-of 日期与 peak/off-peak。
4. **独立声明**：本站非官方。不要写成 DeepSeek 官方口吻。
5. **有观点**：不要只堆事实，给出「你该怎么做」的可执行结论（选型建议、成本算法、避坑）。
6. **语言**：正文英文（站点是英文站）。简洁、具体、不注水。

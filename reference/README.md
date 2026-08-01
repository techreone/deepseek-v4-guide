# Reference — DeepSeek V4 Guide 研究库

> deepseekv4guide.org 攻略站的内容原料库。所有网页搜索得来的高质量信息先落这里，再提炼成站内教程。**来源可查、数据可信、零杜撰**是本库的底线。

## 目录结构

```
reference/
├── README.md            # 本文件：组织规范
├── seo-playbook.md      # SEO 作战手册（来自 Obsidian 血字的研究 vault 的知识固化）
├── trends/              # Google Trends 原始数据存档（美国区）
│   ├── top-searches-US-20260801.csv     # 热搜词（0731 发布窗口）
│   └── rising-searches-US-20260801.csv  # 飙升词（0731 发布窗口）
└── topics/              # 每个主题一篇研究笔记（子代理深度搜索结果）
    ├── 00-<slug>.md
    └── ...
```

## 工作流

1. **找主题**：读 `trends/` 里的趋势数据 + `seo-playbook.md` 里的关键词清单，决定下一批教程写什么
2. **深度搜索**：部署子代理，用 `mcp__anysearch__search`（优先）/ `mcp__tavily-remote-mcp__tavily_search`（备用）搜索，`mcp__anysearch__extract` 抓取原文
3. **写入 topics/**：每次搜到的高质量信息**全部**写进 `topics/<序号>-<slug>.md`，不浪费；格式见下
4. **提炼教程**：基于 topics/ 写站内教程（1000-2000+ 字），一页一词，双向内链
5. **来源归档**：每条事实标注来源 URL + 访问日期，可回溯验证

## topics/ 笔记格式

```markdown
---
topic: <主题名>
slug: <url slug>
category: <分类：release|api|benchmark|pricing|model|integration|guide>
updated: YYYY-MM-DD
status: research|written
sources: []
---

# <主题名>

## 核心事实（可直接入教程）
- ...

## 规格 / 数据
| 项目 | 值 | 来源 |
|------|-----|------|
| ...  | ... | [URL](...) |

## 关键差异 / 时间线
- ...

## 教程素材（写作时直接引用）
- ...

## 来源清单（完整 URL）
1. ...
```

## 内容生产铁律（来自 PRODUCTION-GUIDELINES）

1. **数据准确性最高**：只写参考文件/检索中出现的真实事实，绝不编造。拿不准的宁缺毋滥。
2. **主观内容基于网络检索**：编造永不允许；有真实玩家/用户依据的主观内容允许写（Reddit/官方公告/评测），标注来源语境。
3. **搜索双保险**：优先 Tavily，失败换 Anysearch，绝不硬编。
4. **搜不到可靠信息 → 该页不写**，报告 skipped + 原因。
5. **不照搬任何来源原文**：用自己的话重组，谷歌看不出是复制。
6. **每个教程 1000-2000+ 字**，一页一词，600 字以下判薄内容。

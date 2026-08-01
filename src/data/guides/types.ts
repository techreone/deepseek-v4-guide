// 指南内容模型 — 富内容扩展版
// 每个教程 = 一页一词（一个主关键词）+ 三合一精品页（规格数据 + 实测 + 使用教程）
// 字段设计兼容原 steps 结构，新增 paragraphs / list / table 以承载 1000-2000 字长教程

export interface GuideTable {
  headers: string[];
  rows: string[][];
}

export interface GuideStep {
  num: string;
  title: string;
  /** 首段描述（必填）。正文行内支持两种语法：
   * - `[[slug|显示文字]]` → 站内双链，跳转 /guides/<slug>
   * - `[n]` → 角注引用，n 为 sources 数组 1 基序号，渲染为上标链接 */
  description: string;
  /** 附加段落（可选，用于长内容），同样支持 [[slug|文字]] 与 [n] */
  paragraphs?: string[];
  /** 要点列表（可选），支持 [[slug|文字]] 与 [n] */
  list?: string[];
  /** 数据表格（可选，规格/价格/基准） */
  table?: GuideTable;
  /** 代码块（可选） */
  code?: string;
  /** 提示框（可选），支持 [[slug|文字]] 与 [n] */
  note?: string;
}

export interface GuideLink {
  title: string;
  slug: string;
}

export interface GuideSource {
  label: string;
  url: string;
}

export interface GuideContent {
  slug: string;
  /** 分类标签（英文） */
  category: string;
  /** 主关键词：H1 / title 用 */
  title: string;
  readTime: string;
  updatedAt: string;
  /** meta description 素材，≤160 字符 */
  summary: string;
  toc: { id: string; label: string }[];
  steps: GuideStep[];
  prevGuide?: GuideLink;
  nextGuide?: GuideLink;
  /** 相关指南（内链网：每页链 3-5 个相关页面） */
  relatedGuides?: GuideLink[];
  /** 参考来源（GEO/EEAT：带出处更易被 AI 引用） */
  sources?: GuideSource[];
}

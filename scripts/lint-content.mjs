#!/usr/bin/env node
/**
 * lint-content.mjs — deepseekv4guide.org 内容质量门禁
 *
 * 数据模型是 TS（src/data/guides/*.ts），Node 24+ 原生类型剥离可直接 import。
 * 用法：
 *   node scripts/lint-content.mjs            # 全站检查
 *   node scripts/lint-content.mjs --new      # 仅检查本次战役新增页（NEW_SLUGS）
 *
 * 检查项（E=error 阻断, W=warning 提示）：
 *   E01 slug 为 kebab-case 且全局唯一
 *   E02 必填字段完整（slug/category/title/seoTitle/readTime/updatedAt/summary/toc/steps/sources）
 *   E03 seoTitle ≤ 44 字符（站点追加 " | DeepSeek V4 Guide" 后 ≤65）
 *   E04 summary ≤ 160 字符
 *   E05 toc 与 steps 一一对应（ids 为 step-1..step-N，数量一致）
 *   E06 正文英文词数 ≥ 600（<600 判薄内容；600-999 为 warning）
 *   E07 内链 [[slug]] 必须指向已注册页（无死链）
 *   E08 角注 [n] 必须在 sources 范围内
 *   E09 sources ≥ 3（GEO/EEAT）
 *   E10 已在 index.ts 的 guideMeta 注册（字符串 slug 出现）
 *   W01 relatedGuides ≥ 3（内链织网）
 *   W02 词数 600-999（建议扩写）
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GUIDES_DIR = join(ROOT, "src", "data", "guides");
const INDEX_FILE = join(GUIDES_DIR, "index.ts");
const NEW_ONLY = process.argv.includes("--new");

const NEW_SLUGS = new Set([
  "deepseek-v4-1-flash",
  "v4-1-flash-pricing",
  "v4-1-flash-benchmarks",
  "v4-1-flash-api-setup",
  "v4-1-flash-vision",
  "v4-1-flash-reasoning-effort",
  "deepseek-flash-model-names",
  "v4-1-flash-vs-v4-flash",
  "v4-1-flash-vs-opus-5",
  "v4-1-flash-vs-kimi-k3",
  "deepseek-v4-1-pro",
  "v4-1-flash-local-deployment",
  "v4-1-flash-coding-agents",
  "v4-1-flash-kv-cache",
  "deepseek-v4-pro-retired",
]);

const REQUIRED = ["slug", "category", "title", "seoTitle", "readTime", "updatedAt", "summary", "toc", "steps", "sources"];
const errors = [];
const warnings = [];
const E = (m) => errors.push(m);
const W = (m) => warnings.push(m);

function countWords(s) {
  if (!s || typeof s !== "string") return 0;
  return (s.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g) || []).length;
}

function guideWords(g) {
  let n = 0;
  n += countWords(g.title) + countWords(g.summary) + countWords(g.notice);
  for (const s of g.steps || []) {
    n += countWords(s.title) + countWords(s.description) + countWords(s.note) + countWords(s.code);
    (s.paragraphs || []).forEach((p) => (n += countWords(p)));
    (s.list || []).forEach((l) => (n += countWords(l)));
    if (s.table) {
      (s.table.headers || []).forEach((h) => (n += countWords(h)));
      (s.table.rows || []).forEach((r) => r.forEach((c) => (n += countWords(c))));
    }
  }
  return n;
}

// 1) 收集所有 guide 文件
const files = readdirSync(GUIDES_DIR).filter(
  (f) => f.endsWith(".ts") && f !== "types.ts" && f !== "index.ts"
);

const guides = [];
for (const f of files) {
  const url = pathToFileURL(join(GUIDES_DIR, f)).href;
  let mod;
  try {
    mod = await import(url);
  } catch (e) {
    E(`E00 无法加载 ${f}: ${e.message}`);
    continue;
  }
  for (const val of Object.values(mod)) {
    if (val && typeof val === "object" && typeof val.slug === "string" && Array.isArray(val.steps)) {
      guides.push({ file: f, g: val });
    }
  }
}

// 2) slug 表
const slugSet = new Set(guides.map(({ g }) => g.slug));
const indexText = existsSync(INDEX_FILE) ? readFileSync(INDEX_FILE, "utf-8") : "";

// 3) 逐篇检查
const seen = new Map();
for (const { file, g } of guides) {
  const isNew = NEW_SLUGS.has(g.slug);
  const tag = `${file} [${g.slug}]`;

  if (!/^[a-z0-9]+(-[a-z0-9.]+)*$/.test(g.slug)) E(`E01 ${tag}: slug 非 kebab-case`);
  if (seen.has(g.slug)) E(`E01 ${tag}: slug 重复（另见 ${seen.get(g.slug)}）`);
  seen.set(g.slug, file);

  for (const k of REQUIRED) {
    if (g[k] === undefined || g[k] === null || g[k] === "") E(`E02 ${tag}: 缺必填字段 ${k}`);
  }

  if (typeof g.seoTitle === "string" && g.seoTitle.length > 44) {
    const m = `E03 ${tag}: seoTitle ${g.seoTitle.length} > 44 字符`;
    if (isNew) E(m);
    else W(m);
  }
  if (typeof g.summary === "string" && g.summary.length > 160)
    E(`E04 ${tag}: summary ${g.summary.length} > 160 字符`);

  const toc = g.toc || [];
  const steps = g.steps || [];
  if (toc.length !== steps.length)
    E(`E05 ${tag}: toc ${toc.length} != steps ${steps.length}`);
  toc.forEach((t, i) => {
    if (t.id !== `step-${i + 1}`) E(`E05 ${tag}: toc[${i}].id "${t.id}" 应为 step-${i + 1}`);
  });

  const words = guideWords(g);
  if (words < 600) {
    const m = `E06 ${tag}: 词数 ${words} < 600（薄内容判线）`;
    if (isNew) E(m);
    else W(m);
  } else if (words < 1000) W(`W02 ${tag}: 词数 ${words} < 1000（建议扩写）`);

  // 内链死链 + 角注范围（排除 code 块：数组下标如 choices[0] 不是角注）
  const bodyText = JSON.stringify({
    toc,
    summary: g.summary,
    notice: g.notice,
    steps: steps.map(({ code, ...rest }) => rest),
  });
  const sources = g.sources || [];
  for (const m of bodyText.matchAll(/\[\[([^\]|]+)\|/g)) {
    const target = m[1];
    if (!slugSet.has(target)) E(`E07 ${tag}: 死内链 [[${target}]]`);
  }
  for (const m of bodyText.matchAll(/\[(\d+)\]/g)) {
    const n = Number(m[1]);
    if (n < 1 || n > sources.length) {
      const msg = `E08 ${tag}: 角注 [${n}] 越界（sources=${sources.length}）`;
      if (isNew) E(msg);
      else W(msg);
    }
  }

  if (sources.length < 3) E(`E09 ${tag}: sources ${sources.length} < 3`);
  const importPath = `from "./${file.replace(/\.ts$/, "")}"`;
  if (!indexText.includes(importPath)) E(`E10 ${tag}: 未在 index.ts 注册（缺 ${importPath}）`);
  if (!indexText.includes(`"${g.slug}"`)) W(`W03 ${tag}: 未在 index.ts guideMeta 登记（不计入首页卡片）`);
  if ((g.relatedGuides || []).length < 3) W(`W01 ${tag}: relatedGuides ${(g.relatedGuides || []).length} < 3`);
}

const scope = NEW_ONLY ? `（仅新增页，${NEW_SLUGS.size} 个）` : "";
const shown = NEW_ONLY ? { errors: errors.filter((x) => [...NEW_SLUGS].some((s) => x.includes(`[${s}]`))), warnings: warnings.filter((x) => [...NEW_SLUGS].some((s) => x.includes(`[${s}]`))) } : { errors, warnings };

console.log(`检查 ${guides.length} 篇指南${scope}`);
if (shown.errors.length) {
  console.log(`\n❌ ${shown.errors.length} 个错误：`);
  [...new Set(shown.errors)].sort().forEach((e) => console.log("  " + e));
} else {
  console.log("\n✅ 0 错误");
}
if (shown.warnings.length) {
  console.log(`\n⚠️  ${shown.warnings.length} 个警告：`);
  [...new Set(shown.warnings)].sort().forEach((w) => console.log("  " + w));
}
process.exit(shown.errors.length ? 1 : 0);

#!/usr/bin/env node
/**
 * indexnow.mjs — 向 IndexNow 提交本次更新的 URL（Bing / Yandex 秒级发现）
 *
 * 用法：
 *   node scripts/indexnow.mjs                 # 提交本次战役新增+更新页
 *   node scripts/indexnow.mjs <slug> [slug..] # 只提交指定 slug
 *
 * key 文件必须已部署在 https://<host>/<key>.txt（public/ 下已存在）。
 */
const HOST = "deepseekv4guide.org";
const KEY = "6bdc711ee2e4818e9b173946d60a5c68";
const BASE = `https://${HOST}`;

const CAMPAIGN_SLUGS = [
  // 2026-10-18 战役新增 15 篇
  "deepseek-v4-1-flash-1017",
  "v4-1-flash-1017-benchmarks",
  "v4-1-flash-1017-vs-v4-1-flash",
  "v4-1-flash-1017-local",
  "deepseek-search-api",
  "deepseek-rag-search-api",
  "deepseek-down",
  "deepseek-outage-refund",
  "deepseek-server-busy",
  "deepseek-api-error-codes",
  "opencode-deepseek-1017",
  "deepseek-vscode-copilot",
  "deepseek-codex",
  "deepseek-free-1017",
  "deepseek-mcp-servers",
  // 存量更新（加 1017 notice / 改版本串）
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
  "v4-1-flash-local-deployment",
  "v4-1-flash-coding-agents",
  "v4-1-flash-kv-cache",
  "deepseek-v4-pro-retired",
  "opencode-go",
];

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : CAMPAIGN_SLUGS;
const urlList = [BASE, ...slugs.map((s) => `${BASE}/guides/${s}`)];

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${BASE}/${KEY}.txt`,
  urlList,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(`IndexNow 提交 ${urlList.length} 个 URL → HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) {
  const text = await res.text().catch(() => "");
  console.error(text.slice(0, 500));
  process.exit(1);
}

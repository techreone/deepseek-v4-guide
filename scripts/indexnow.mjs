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
  // 新增 15 篇
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
  // 存量更新（加 notice / 改 seoTitle / 修 toc）
  "deepseek-v4-flash",
  "flash-api-setup",
  "flash-pricing",
  "flash-benchmarks",
  "flash-ide",
  "flash-opencode",
  "flash-model-size",
  "flash-huggingface",
  "flash-openrouter",
  "v4-pro",
  "v4-pro-release-date",
  "v4-pro-pricing",
  "v4-pro-api",
  "v4-pro-benchmarks",
  "v4-pro-0813",
  "v4-pro-review",
  "v4-pro-reasoning-effort",
  "v4-pro-surge-pricing",
  "v4-pro-context-caching",
  "v4-pro-model-size",
  "v4-pro-vs-flash",
  "v4-pro-vs-gpt-5.5",
  "v4-pro-openrouter",
  "v4-pro-cursor",
  "v4-pro-claude-code",
  "v4-pro-opencode",
  "v4-pro-responses-api",
  "v4-pro-harness",
  "v4-pro-agent",
  "v4-pro-expert-mode",
  "v4-pro-vs-deepseek-r1",
  "harness-benchmark",
  "harness-quickstart",
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

import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro pricing
export const v4ProPricing: GuideContent = {
  slug: "v4-pro-pricing",
  category: "PRICING & COST",
  title: "DeepSeek V4 Pro Pricing: Peak & Off-Peak Rates (Aug 2026)",
  seoTitle: "DeepSeek V4 Pro Pricing: $1.98-$3.96/M",
  readTime: "8 MIN READ",
  updatedAt: "SEP 11, 2026",
  notice:
    "Retiring: from Sept 14, 2026, all deepseek-v4-pro requests route to V4.1 Flash at Flash rates. See [[deepseek-v4-pro-retired|why V4-Pro was retired]] and [[deepseek-v4-1-flash|the V4.1 Flash guide]].",
  summary:
    "DeepSeek V4 Pro costs $1.98/M output off-peak, $3.96 peak after the Aug 16 update. Full rate table, the 1100% hike claim, and savings strategies.",
  toc: [
    { id: "step-1", label: "Current V4 Pro Prices (Aug 16, 2026)" },
    { id: "step-2", label: "Old vs New: What the Price Update Changed" },
    { id: "step-3", label: "The '1100% Price Hike' Claim, Explained" },
    { id: "step-4", label: "Cache Hits: The Cheapest Way to Call Pro" },
    { id: "step-5", label: "Budgeting for V4 Pro in Production" },
  ],
  steps: [
    {
      num: "01",
      title: "Current V4 Pro Prices (Aug 16, 2026)",
      description:
        "DeepSeek introduced peak and off-peak rates for the whole V4 lineup, effective 16:00 UTC on August 16, 2026. V4 Pro's per-1M-token prices are now tiered by hour[1][2].",
      table: {
        headers: ["deepseek-v4-pro (per 1M tokens)", "Off-peak", "Peak"],
        rows: [
          ["Input (cache hit)", "$0.022", "$0.044"],
          ["Input (cache miss)", "$0.66", "$1.32"],
          ["Output", "$1.98", "$3.96"],
        ],
      },
      paragraphs: [
        "Off-peak is exactly half the peak price, so the scheduling decision is worth roughly 2x on every token. Peak hours are 01:00-04:00 and 06:00-10:00 UTC; everything outside those windows is off-peak[7].",
        "For comparison, [[deepseek-v4-flash|V4 Flash]] runs at $0.22 (off-peak) / $0.44 (peak) per 1M input on a cache miss and $0.66 / $1.32 per 1M output — about one-third of Pro on most lines.",
      ],
      note: "Prices are per 1M tokens in USD. Billing is tokens × rate, charged against your granted balance first. Confirm against the official pricing page before committing (DeepSeek notes prices can be adjusted)[2].",
    },
    {
      num: "02",
      title: "Old vs New: What the Price Update Changed",
      description:
        "Before August 16, V4 Pro had a single flat rate: $0.435 input (cache miss), $0.003625 input (cache hit), and $0.87 output. The new schedule raises those numbers and splits them by hour[2].",
      table: {
        headers: ["Line", "Old flat rate", "Off-peak (new)", "Peak (new)"],
        rows: [
          ["Output", "$0.87", "$1.98 (+127.6%)", "$3.96 (+355%)"],
          ["Input, cache miss", "$0.435", "$0.66 (+51.7%)", "$1.32 (+203%)"],
          ["Input, cache hit", "$0.003625", "$0.022 (+507%)", "$0.044 (+1,114%)"],
        ],
      },
      paragraphs: [
        "Every line went up — there is no tier where the new price is lower than the old flat rate. Output is the biggest absolute jump ($0.87 → $3.96 peak), while cache-hit input is the biggest percentage jump[2].",
        "If you are comparing V4 Pro against [[v4-pro-vs-gpt-5.5|closed flagship models]] or planning a [[flash-pricing|Flash-vs-Pro routing strategy]], use the off-peak numbers for baseline capacity and the peak numbers for worst-case budgeting.",
      ],
      note: "The announcement frames the change as introducing flexibility ('off-peak rates are 50% lower than peak'), but on absolute terms the flat price no longer exists — every hour costs more than the old flat rate[1][7].",
    },
    {
      num: "03",
      title: "The '1100% Price Hike' Claim, Explained",
      description:
        "A widely shared headline claimed DeepSeek raised V4 Pro prices by 1,100%. The real number depends on which line you are looking at — and that specific figure is real but only for the most extreme case[2][7].",
      paragraphs: [
        "The +1,114% figure is the cache-hit input price at peak hours: $0.003625 → $0.044 per 1M tokens. It is technically accurate and utterly misleading as a headline, because cache-hit input is the cheapest line in the entire price table — even after a 12x increase it is still far cheaper than a cache miss.",
        "The lines that actually affect most production budgets are output (+128% off-peak, +355% peak) and input on a cache miss (+52% / +203%). For heavy [[v4-pro-context-caching|cache users]], the new cache-hit rates still make prefix caching the dominant cost-saving lever — just a smaller one than before.",
      ],
      list: [
        "Output: +127.6% off-peak / +355% peak",
        "Input cache miss: +51.7% off-peak / +203% peak",
        "Input cache hit: +507% off-peak / +1,114% peak",
        "Headline '1,100% hike' = cache-hit input at peak, the cheapest line in the table",
      ],
    },
    {
      num: "04",
      title: "Cache Hits: The Cheapest Way to Call Pro",
      description:
        "Even after the increase, cache-hit input is 30x cheaper than a cache miss at the same hour ($0.022 vs $0.66 off-peak). If your workload reuses prefixes — multi-turn agents, RAG, code review loops — caching dominates the bill[2].",
      code: `# Cost per 1M input tokens, off-peak
cache_hit  = 0.022   # same prefix replayed
cache_miss = 0.66    # first-time prefix

# A 20-turn agent loop with a 50K-token shared prefix:
#  turn 1 costs miss price for the prefix, turns 2-20 cost hit price
saved = 19 * (cache_miss - cache_hit)   # ≈ $12.1 per 1M prefix tokens`,
      list: [
        "Prefix caching is automatic — no headers or SDK changes",
        "The hit price applies to any replay of the same prefix, including partial matches",
        "The [[v4-pro-context-caching|context caching guide]] covers how to structure prompts for maximum hits",
        "Off-peak cache hits ($0.022) are the single cheapest way to run V4 Pro",
      ],
      note: "Cache-hit pricing applies per token replayed, and DeepSeek documents that reasoning tokens are billed at output rates — factor that in for reasoning-heavy calls[2].",
    },
    {
      num: "05",
      title: "Budgeting for V4 Pro in Production",
      description:
        "Concrete planning numbers: V4 Pro allows 500 concurrent requests (Flash allows 2,500), and pricing is now hourly, so capacity planning should account for when your traffic runs[2].",
      paragraphs: [
        "A practical budget model for a typical agentic workload: assume 40% cache-hit input, 60% cache-miss input, and output at 1.5x input volume (thinking tokens count as output). At off-peak hours that lands around $1.45 per 1M input-equivalent tokens; at peak it is roughly double.",
        "If your workload can defer, the [[v4-pro-surge-pricing|peak vs off-peak scheduling guide]] shows how to shift batch jobs to the cheap hours. For always-on interactive traffic, the cache-hit rate is your main lever — structure conversations to keep a stable system prompt and tool schema so prefixes replay.",
      ],
      note: "These are planning estimates built from official rates, not official guidance. DeepSeek's official docs are the source of truth for current numbers[2].",
    },
  ],
  relatedGuides: [
    {
      title: "DeepSeek V4 Pro Peak & Off-Peak Hours Guide",
      slug: "v4-pro-surge-pricing",
    },
    {
      title: "DeepSeek V4 Pro Context Caching: Save on Every Call",
      slug: "v4-pro-context-caching",
    },
    {
      title: "DeepSeek V4 Flash Pricing: How to Save Up to 98%",
      slug: "flash-pricing",
    },
    {
      title: "DeepSeek V4 Pro: Specs, Pricing & Release Date",
      slug: "v4-pro",
    },
  ],
  sources: [
    { label: "Official DeepSeek API: V4-Pro GA Release", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek First API Call Docs", url: "https://api-docs.deepseek.com/quick_start/first_api_call/" },
    { label: "ExplainX: V4 Pro 0813 Terminal-Bench Analysis", url: "https://explainx.ai/blog/deepseek-v4-pro-0813-terminal-bench-cline-august-2026" },
    { label: "Rohit AI: V4 Pro 0813 GA Benchmarks & Pricing", url: "https://rohitai.com/blog/deepseek-v4-pro-0813-ga-benchmarks-pricing" },
  ],
};

import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash pricing
// 内容来源：reference/topics/27-v4-1-flash.md（官方 pricing 页 2026-09-10 生效价）
export const v41FlashPricing: GuideContent = {
  slug: "v4-1-flash-pricing",
  category: "PRICING",
  title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates",
  seoTitle: "DeepSeek V4.1 Flash Pricing: $0.003 Cache",
  readTime: "9 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "DeepSeek V4.1 Flash costs $0.003 per 1M cached input tokens off-peak, $0.15 uncached, and $0.60 output. Peak doubles it. Full table and cache math.",
  toc: [
    { id: "step-1", label: "Step 1: The Official V4.1 Flash Prices" },
    { id: "step-2", label: "Step 2: Peak vs Off-Peak: When to Run Jobs" },
    { id: "step-3", label: "Step 3: Why the $0.003 Cache-Hit Rate Matters" },
    { id: "step-4", label: "Step 4: Worked Cache Example: 50M Cached Tokens" },
    { id: "step-5", label: "Step 5: V4.1 Flash vs V4 Flash and V4 Pro" },
    { id: "step-6", label: "Step 6: How It Compares to GPT-5.6 Sol, Opus 5 & Kimi K3" },
    { id: "step-7", label: "Step 7: How to Cut Your V4.1 Flash Bill" },
    { id: "step-8", label: "Step 8: Deduction Rules and Fair Use" },
  ],
  steps: [
    {
      num: "01",
      title: "The Official V4.1 Flash Prices",
      description:
        "DeepSeek sets V4.1 Flash at $0.003 per 1M cached input tokens, $0.15 per 1M uncached input tokens, and $0.60 per 1M output tokens during off-peak hours. Peak hours are exactly double. The rates took effect at 04:00 UTC on September 10, 2026[3].",
      paragraphs: [
        "The API model name is deepseek-flash. Legacy names deepseek-v4-flash and deepseek-v4-flash-vision-exp still work, but they now route to V4.1 Flash and are billed at these Flash rates[1].",
      ],
      table: {
        headers: ["Per 1M tokens", "Off-peak", "Peak"],
        rows: [
          ["Input (cache hit)", "$0.003", "$0.006"],
          ["Input (cache miss)", "$0.15", "$0.30"],
          ["Output", "$0.60", "$1.20"],
          ["Concurrency limit", "2,500", "2,500"],
        ],
      },
      note: "Off-peak rates are always half of peak rates. Peak hours are Monday-Friday 01:00-04:00 and 06:00-10:00 UTC; every other hour is off-peak[3].",
    },
    {
      num: "02",
      title: "Peak vs Off-Peak: When to Run Jobs",
      description:
        "DeepSeek continues the peak/off-peak scheme it introduced on August 16, 2026. Peak windows are Monday through Friday from 01:00-04:00 UTC and 06:00-10:00 UTC. All other hours — including all weekend — are off-peak and cost half as much[3][5].",
      paragraphs: [
        "For schedulable agent jobs, the time a workload runs is a cost lever every bit as real as token count. A batch job moved out of the weekday morning windows pays 50% less for identical work. The windows are defined in UTC, so teams in the US or Asia should map them to local time carefully[3][5].",
      ],
      list: [
        "Peak: Mon-Fri 01:00-04:00 UTC and 06:00-10:00 UTC",
        "Off-peak: all other hours, plus all weekend",
        "Off-peak output: $0.60/1M — half the $1.20 peak rate",
        "Shift flexible batch and eval workloads off-peak to halve the bill[3]",
      ],
      note: "The August 16 peak/off-peak scheme applies to both deepseek-flash and deepseek-v4-pro. The September 10 update lowered the Flash numbers while keeping the schedule[3].",
    },
    {
      num: "03",
      title: "Why the $0.003 Cache-Hit Rate Matters",
      description:
        "Cached input is where the economics of agents get decided. At $0.003 per 1M off-peak, a cache hit costs 2% of what an uncached input token costs ($0.15). DeepSeek itself says cache-hit charges often account for a large share of agent costs[5].",
      paragraphs: [
        "An agent repeatedly working against the same repository, tool definitions, system instructions, or conversation history rereads far more cached context than fresh context. DeepSeek cut V4.1 Flash's global KV cache to 890 bytes per token — about a quarter of V4-Flash's HBM footprint — which is what makes the low cache-hit price sustainable[2][4].",
        "The practical implication is that comparing models on uncached input price alone can obscure the fastest-growing component of agent economics. The metric that matters is cost per completed task, not headline input price[5].",
      ],
      list: [
        "$0.003/1M off-peak vs $0.15/1M uncached — a 50x difference",
        "Reuse stable prompt prefixes to maximize cache-hit ratio",
        "Measure cache-hit ratio and cost per successful task, not just token totals[5]",
      ],
      note: "The persistent cache has a guaranteed lifetime of at least 72 hours, so a repo or system prompt cached on Monday can still be warm later in the week[5].",
    },
    {
      num: "04",
      title: "Worked Cache Example: 50M Cached Tokens",
      description:
        "Consider an agent that retains a 500,000-token reusable prefix and hits that cache across 100 requests — 50 million cached input tokens total. Ignoring cache-write, new uncached context, and output, those cache reads cost about $0.15 on V4.1 Flash off-peak, according to VentureBeat's calculation[5].",
      paragraphs: [
        "The same 50M cached tokens would cost about $15 on Kimi K3, $20 on GPT-5.6 Sol, and $25 on Claude Opus 5 at their published cache-read rates. That is a 100x-to-160x gap on the cached portion alone — which is why input-heavy, repetitive, cacheable workloads are where V4.1 Flash's advantage is largest[5].",
      ],
      table: {
        headers: ["Model", "Cache-read rate /1M", "50M cached tokens"],
        rows: [
          ["DeepSeek V4.1 Flash (off-peak)", "$0.003", "~$0.15"],
          ["Kimi K3", "$0.30", "~$15"],
          ["GPT-5.6 Sol", "$0.40", "~$20"],
          ["Claude Opus 5", "$0.50", "~$25"],
        ],
      },
      note: "Real workloads never achieve perfect cache reuse. Total cost also depends on output length, reasoning tokens, retries, and tool calls — so treat this as an illustration of the cache lever, not a full cost model[5].",
    },
    {
      num: "05",
      title: "V4.1 Flash vs V4 Flash and V4 Pro",
      description:
        "V4.1 Flash is dramatically cheaper than the old V4 Flash pricing after the August peak/off-peak repricing, and far cheaper than V4 Pro. On off-peak output, V4.1 Flash is $0.60/1M versus V4 Pro's $1.98/1M and V4 Flash's old $0.66/1M peak-rate structure[3].",
      paragraphs: [
        "The September 10 change effectively reverses part of the August price rise. Bloomberg Intelligence analysts put the cut at as much as 32%. Meanwhile, every V4-Pro request routes to V4.1 Flash from September 14 and is billed at Flash rates — so V4-Pro customers get a cheaper, nominally more capable model without changing their code[3][5].",
      ],
      table: {
        headers: ["Model / period", "Cache hit", "Cache miss", "Output"],
        rows: [
          ["deepseek-flash off-peak", "$0.003", "$0.15", "$0.60"],
          ["deepseek-flash peak", "$0.006", "$0.30", "$1.20"],
          ["deepseek-v4-pro off-peak", "$0.022", "$0.66", "$1.98"],
          ["deepseek-v4-pro peak", "$0.044", "$1.32", "$3.96"],
          ["V4-Flash (Aug 16 off-peak)", "$0.007", "$0.22", "$0.66"],
        ],
      },
      note: "The pro row still appears on the pricing page because deepseek-v4-pro remains a valid id until V4.1 Pro launches — but requests are served by V4.1 Flash and billed at Flash rates from September 14[3].",
    },
    {
      num: "06",
      title: "How It Compares to GPT-5.6 Sol, Opus 5 & Kimi K3",
      description:
        "At $0.15 input / $0.60 output off-peak, or $0.75 blended per 1M tokens, V4.1 Flash sits near the absolute low end of the global paid API market. Only Meta's Contributor-tier Muse Spark and Xiaomi's MiMo-V2.5 Flash are cheaper in the comparison table VentureBeat assembled[5].",
      table: {
        headers: ["Model", "Input /1M", "Output /1M", "Blended /1M"],
        rows: [
          ["DeepSeek V4.1 Flash (off-peak)", "$0.15", "$0.60", "$0.75"],
          ["GPT-5.6 Luna", "$0.20", "$1.20", "$1.40"],
          ["DeepSeek V4.1 Flash (peak)", "$0.30", "$1.20", "$1.50"],
          ["DeepSeek V4 Pro (off-peak)", "$0.66", "$1.98", "$2.64"],
          ["GPT-5.6 Sol", "$5.00", "$30.00", "$35.00"],
          ["Claude Opus 5", "$5.00", "$25.00", "$30.00"],
          ["Kimi K3", "$3.00", "$15.00", "$18.00"],
        ],
      },
      paragraphs: [
        "Even at peak, V4.1 Flash ties with MiniMax-M3 and LongCat's promotional pricing and sits far below the mid-tier cluster around $4.50-$8.00. It is dramatically cheaper than Claude Fable/Mythos 5.1 and GPT-5.6 Sol Fast mode[5].",
      ],
      note: "DeepSeek's lowest rates require off-peak usage. The comparison also ignores cache-read rates, where the gap is far wider. All rival prices are as published by VentureBeat on September 10, 2026[5].",
    },
    {
      num: "07",
      title: "How to Cut Your V4.1 Flash Bill",
      description:
        "Three levers dominate V4.1 Flash cost: cache-hit ratio, reasoning effort, and scheduling. Reasoning effort is now a continuous 1-100 integer, and DeepSeek's own tests show the gains are front-loaded[5].",
      list: [
        "Maximize cache hits: keep stable prefixes, reuse system prompts and tool definitions.",
        "Pick effort 60-80 instead of 100: most of the accuracy at under half the output tokens.",
        "Schedule batch and eval jobs off-peak to halve the rate.",
        "Use non-thinking mode for simple tasks to avoid spending budget on the trace.",
        "Track cost per completed task, not cost per token[5]",
      ],
      paragraphs: [
        "DeepSeek says going from effort 25 to 100 raises DeepSWE v1.1 from 66.0 to 74.2, but consumes roughly 2.5x as many output tokens. The final step to 100 makes agent trajectories 1.6-1.8x longer for comparatively small gains — so the leaderboard configuration is often not the economical one[5].",
      ],
      note: "Reasoning effort also affects output tokens directly. See [[v4-1-flash-reasoning-effort|the reasoning effort guide]] for the full trade-off table.",
    },
    {
      num: "08",
      title: "Deduction Rules and Fair Use",
      description:
        "Billing is straightforward: expense = number of tokens x price. Fees are deducted from your topped-up balance or granted balance, with the granted balance used first when both are available[3].",
      paragraphs: [
        "New accounts historically start with a free token grant. DeepSeek reserves the right to adjust prices and recommends topping up based on actual usage while checking the pricing page regularly[3].",
      ],
      note: "The concurrency limit for deepseek-flash is 2,500 — five times V4 Pro's 500 — which matters for high-volume parallel agent fleets[3].",
    },
  ],
  prevGuide: {
    title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained",
    slug: "deepseek-v4-1-flash",
  },
  nextGuide: {
    title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table",
    slug: "v4-1-flash-benchmarks",
  },
  relatedGuides: [
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table", slug: "v4-1-flash-benchmarks" },
    { title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash", slug: "deepseek-v4-pro-retired" },
    { title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%", slug: "flash-pricing" },
  ],
  sources: [
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "VentureBeat: V4.1-Flash Pricing and Cache Economics", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
  ],
};

import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro context caching
export const v4ProContextCaching: GuideContent = {
  slug: "v4-pro-context-caching",
  category: "PRICING & COST",
  title: "DeepSeek V4 Pro Context Caching: Prices & How to Max Your Hits",
  seoTitle: "DeepSeek V4 Pro Context Caching Guide (2026)",
  readTime: "7 MIN READ",
  updatedAt: "SEP 11, 2026",
  notice:
    "Retiring: from Sept 14, 2026, all deepseek-v4-pro requests route to V4.1 Flash at Flash rates. See [[deepseek-v4-pro-retired|why V4-Pro was retired]] and [[deepseek-v4-1-flash|the V4.1 Flash guide]].",
  summary:
    "V4 Pro cache-hit input costs $0.022/M off-peak vs $0.66 miss — a 30x discount. How prefix caching works, Aug 16 rates, prompt design for hits.",
  toc: [
    { id: "step-1", label: "How DeepSeek Context Caching Works" },
    { id: "step-2", label: "V4 Pro Cache Rates After Aug 16" },
    { id: "step-3", label: "The Math: Why Cache Hits Dominate Your Bill" },
    { id: "step-4", label: "Designing Prompts for Maximum Hits" },
    { id: "step-5", label: "Agent Loops & the Harness Connection" },
  ],
  steps: [
    {
      num: "01",
      title: "How DeepSeek Context Caching Works",
      description:
        "DeepSeek's context caching is **automatic prefix caching**: if a later request starts with the same token prefix as an earlier one, the replayed prefix is billed at the cache-hit rate instead of the miss rate. No headers, no SDK changes, no configuration[2][3].",
      paragraphs: [
        "The discount applies per token replayed, including partial prefix matches. In practice, any workload that reuses a large, stable prefix — a system prompt, a tool schema, a long document, a codebase summary — sees most of its input billed at the hit rate.",
        "The same mechanism powered the preview-era pricing (cache hit was $0.003625 vs $0.435 miss, a 99.2% discount). The August 16 update kept the mechanism but changed the rates[2].",
      ],
      list: [
        "Automatic prefix caching — nothing to enable",
        "Hit rate applies to any replayed prefix, partial matches included",
        "No minimum prefix length documented by DeepSeek; in practice keep prefixes stable and long",
        "Works on both V4 Pro and [[deepseek-v4-flash|V4 Flash]]",
      ],
    },
    {
      num: "02",
      title: "V4 Pro Cache Rates After Aug 16",
      description:
        "Cache-hit input is still by far the cheapest line on the V4 Pro price sheet — but the gap narrowed after the peak/off-peak update[2].",
      table: {
        headers: ["deepseek-v4-pro input (per 1M tokens)", "Off-peak", "Peak"],
        rows: [
          ["Cache hit", "$0.022", "$0.044"],
          ["Cache miss", "$0.66", "$1.32"],
          ["Discount", "30x", "30x"],
        ],
      },
      paragraphs: [
        "Relative to the old flat rate, cache-hit input went from $0.003625 to $0.022 off-peak (+507%) and $0.044 peak (+1,114%) — the largest percentage increase in the whole price update, and the source of the '1100% price hike' headline. Even so, a 30x discount on input remains the single biggest cost lever DeepSeek offers[2][7].",
        "The [[v4-pro-pricing|pricing page]] explains the full old-vs-new comparison and the headline math.",
      ],
      note: "Reasoning tokens bill at output rates, so caching helps the input side only. For agent workloads the output side is controlled with reasoning_effort — see the [[v4-pro-reasoning-effort|reasoning effort guide]].",
    },
    {
      num: "03",
      title: "The Math: Why Cache Hits Dominate Your Bill",
      description:
        "A realistic agent loop shows the effect. Consider a 20-turn conversation with a 50K-token system prompt + tool schema[2].",
      code: `# Off-peak rates, per 1M tokens
hit, miss = 0.022, 0.66

# 20 turns, 50K shared prefix replayed each turn after turn 1
prefix = 50_000
turns = 20
miss_cost = prefix * miss / 1e6          # turn 1 prefix: $0.033
hit_cost  = (turns - 1) * prefix * hit / 1e6  # turns 2-20: $0.0209
saved = (turns - 1) * prefix * (miss - hit) / 1e6  # ≈ $0.63 per 50K prefix

# At 1M tokens of shared prefix replayed 19 times:
#  cache-miss cost: $12.54   cache-hit cost: $0.42   → 96.6% cheaper`,
      paragraphs: [
        "The takeaway: on multi-turn workloads, the prefix (system prompt + tools + history you keep stable) is where the money goes. Keeping it stable and replayable turns a 30x-discounted cost into a rounding error.",
        "Even at the new, higher cache-hit rates, a 96% saving on input tokens dwarfs any other line-item optimization[2].",
      ],
    },
    {
      num: "04",
      title: "Designing Prompts for Maximum Hits",
      description:
        "Cache hits are earned by prefix stability, so prompt design is a cost discipline[2][3].",
      list: [
        "Keep the system prompt byte-stable across turns — no timestamps, no per-turn injections at the front",
        "Put dynamic content (current time, user state) at the end of the context, not the start",
        "Freeze tool schemas; appending a tool later invalidates the cached prefix from that point",
        "For RAG, append the document set after the stable system+tools block",
        "Monitor cache-hit ratio in your telemetry; a sudden drop usually means a prompt change",
      ],
      paragraphs: [
        "The same rules apply to the [[deepseek-harness|DeepSeek Harness]]: harness configurations that keep a stable instruction header and append per-turn state at the tail will see materially higher hit ratios — DeepSeek's own agent benchmark config (stable prompt, max effort) is the reference pattern[4].",
      ],
      note: "DeepSeek documents that cache-hit pricing applies to context caching; verify the exact current rates on the official pricing page before capacity planning[2].",
    },
    {
      num: "05",
      title: "Agent Loops & the Harness Connection",
      description:
        "Agent frameworks are the biggest cache winners and losers. A harness that re-injects a long instruction block every turn — or reorders tool schemas between calls — destroys prefix reuse[2][4].",
      paragraphs: [
        "DeepSeek's own agent benchmarks run with a fixed prompt, `top_p=0.95`, temperature 1.0, and the Harness minimal mode — a deliberately stable configuration. Teams running [[harness-agent-capability|harness-based agents]] on V4 Pro should copy that discipline: freeze the instruction header, append state, and keep tool definitions stable across the loop.",
        "When you combine hour-aware scheduling ([[v4-pro-surge-pricing|peak vs off-peak]]) with cache-maximizing prompts, the combined saving on a 24/7 agent fleet is the difference between a V4 Pro bill that looks like a flagship price and one that looks like a rounding error.",
      ],
      note: "Cache-hit rates apply at both peak and off-peak tiers; the discount ratio (30x) is the same in both windows[2].",
    },
  ],
  relatedGuides: [
    {
      title: "DeepSeek V4 Pro Pricing: Full Rate Table",
      slug: "v4-pro-pricing",
    },
    {
      title: "DeepSeek V4 Pro Peak & Off-Peak Hours Guide",
      slug: "v4-pro-surge-pricing",
    },
    {
      title: "DeepSeek V4 Flash Pricing: How to Save Up to 98%",
      slug: "flash-pricing",
    },
    {
      title: "DeepSeek Harness: Everything You Need to Know",
      slug: "what-is-deepseek-harness",
    },
  ],
  sources: [
    { label: "Official DeepSeek API: V4-Pro GA Release", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek First API Call Docs", url: "https://api-docs.deepseek.com/quick_start/first_api_call/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "ExplainX: V4 Pro 0813 Terminal-Bench Analysis", url: "https://explainx.ai/blog/deepseek-v4-pro-0813-terminal-bench-cline-august-2026" },
  ],
};

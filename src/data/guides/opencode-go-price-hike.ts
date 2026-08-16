import type { GuideContent } from "./types";

// target keyword: opencode go deepseek v4 flash price hike / price increase (Aug 2026)
export const opencodeGoPriceHike: GuideContent = {
  slug: "opencode-go-price-hike",
  category: "COST EFFICIENCY",
  title: "OpenCode Go & the DeepSeek V4 Flash Price Hike: What Changed Aug 16",
  seoTitle: "OpenCode Go DeepSeek V4 Flash Price Hike",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek V4 Flash prices rose on Aug 16 and OpenCode Go's Flash quota dropped sharply. Here is what changed and how to pay less.",
  toc: [
    { id: "step-1", label: "What Changed on Aug 16" },
    { id: "step-2", label: "The New Rate Card: Peak vs Off-Peak" },
    { id: "step-3", label: "How It Hits the OpenCode Go Subscription" },
    { id: "step-4", label: "Flash Quota on Go: From 31,650 to 3,800" },
    { id: "step-5", label: "Four Ways to Pay Less Now" },
    { id: "step-6", label: "Go vs Direct Billing After the Hike" },
    { id: "step-7", label: "What OpenCode Is Doing About It: Sourcing Cheaper Flash" },
  ],
  steps: [
    {
      num: "01",
      title: "What Changed on Aug 16",
      description:
        "DeepSeek moved every V4 model to peak/off-peak billing at 16:00 UTC on August 16, 2026 — the first meaningful price rise for [[deepseek-v4-flash|DeepSeek V4 Flash]] since its April launch. The change also ripples through [[opencode-go|OpenCode Go]], a subscription built on ZDR-direct DeepSeek capacity.",
      paragraphs: [
        "Before Aug 16, Flash billed a single flat rate of $0.14 input / $0.28 output per 1M tokens. From Aug 16 it splits into peak and off-peak, with off-peak already above the old flat rate and peak roughly double off-peak again.[1] Coverage of the move was broad — Engadget reported models 'about to cost four times more', and the trade press flagged the 17-hour off-peak window as the new economic variable.",
        "Why it matters for OpenCode Go: Go's value is tied to the same official rates (a 6x-credit multiplier over them), so when DeepSeek raises the rate card, the dollar value of each fixed Go subscription falls.",
      ],
    },
    {
      num: "02",
      title: "The New Rate Card: Peak vs Off-Peak",
      description:
        "DeepSeek's scheduled card, effective 16:00 UTC Aug 16, applies 2x peak pricing across all billing lines. Peak windows are daily 01:00-04:00 and 06:00-10:00 UTC; all other hours are off-peak and cost half the peak rate.",
      table: {
        headers: ["Model & tier", "Input (cache miss)", "Input (cache hit)", "Output"],
        rows: [
          ["V4 Flash — off-peak", "$0.22 / 1M", "$0.007 / 1M", "$0.66 / 1M"],
          ["V4 Flash — peak", "$0.44 / 1M", "$0.014 / 1M", "$1.32 / 1M"],
          ["V4 Pro — off-peak", "$0.66 / 1M", "$0.022 / 1M", "$1.98 / 1M"],
          ["V4 Pro — peak", "$1.32 / 1M", "$0.044 / 1M", "$3.96 / 1M"],
        ],
      },
      paragraphs: [
        "The old pre-Aug-16 flat card was $0.14 / $0.0028 / $0.28 for Flash and $0.435 / $0.003625 / $0.87 for Pro. Off-peak output on Flash more than doubled ($0.28 to $0.66) and peak output nearly quintupled ($0.28 to $1.32). Cache-hit input rose hardest in percentage terms — $0.0028 to $0.014 at peak, about a 5x jump.[2]",
        "For a fuller breakdown of the mechanism and cache math, see the [[flash-pricing|DeepSeek V4 Flash pricing guide]].",
      ],
    },
    {
      num: "03",
      title: "How It Hits the OpenCode Go Subscription",
      description:
        "OpenCode Go is a flat-rate subscription: $5 the first month then $10, offering about $60 of usage value (roughly a 6x multiplier over official rates) across 17 open models.[3] Because the multiplier is computed against official rates, a rate hike shrinks how many Flash tokens a fixed $10 unlocks.",
      paragraphs: [
        "Go bills Flash at the official per-token rates — it is bulk quota at those rates, not a per-token discount. So the Aug 16 card directly raises Go's Flash burning rate. The upside: Go's credit multiplier and reserved capacity still soften the blow versus paying the official API outright, especially during off-peak.",
        "The practical effect is concentrated in Flash-heavy workflows. Anyone who leaned on Go as a near-unlimited Flash pipe now consumes their 5-hour and monthly windows faster than in late July.",
      ],
    },
    {
      num: "04",
      title: "Flash Quota on Go: From 31,650 to 3,800",
      description:
        "The most visible change is the quota. OpenCode's earlier estimate put V4 Flash at roughly 31,650 requests per 5 hours on Go; the current OpenCode Go page lists about 3,800 requests per 5 hours for Flash — a sharp reduction that parallels the official rate hike.",
      paragraphs: [
        "That ~3,800 figure still sits near the top of Go's model list (versus ~110 for Kimi K3 and ~1,050 for V4 Pro), so Flash remains Go's cheapest-density coding model. But the drop from the earlier 31,650 estimate changes the math for users who treated Flash on Go as effectively unlimited.",
        "Heavy users should budget for the smaller window, or pair Flash with the off-peak caching strategy that keeps the effective per-token cost low.",
      ],
      note: "quotas are OpenCode estimates and can shift without notice — check opencode.ai/go for the live figure before buying.",
    },
    {
      num: "05",
      title: "Four Ways to Pay Less Now",
      description:
        "The rate rise does not have to double your bill. Four levers work together to hold cost down.",
      list: [
        "Run batch, retry, and cron work off-peak (outside 01:00-04:00 and 06:00-10:00 UTC) — the single biggest post-hike lever.",
        "Maximize cache hits: put reusable prefixes (system prompts, docs) first; a 90% hit drops effective off-peak input from $0.22 toward $0.03.",
        "Cap output with max_tokens — Flash is verbose and reasoning tokens bill at the output rate.",
        "Re-evaluate Go vs direct billing: the [[opencode-go|OpenCode Go guide]] details when the fixed $10 beats paying the official API, and when BYOK wins.",
      ],
      paragraphs: [
        "On Go specifically, route the main loop to opencode-go/deepseek-v4-flash and escalate to opencode-go/deepseek-v4-pro only for architecture or hard debugging — the same hybrid pattern that held before, now with a tighter window.",
      ],
    },
    {
      num: "06",
      title: "Go vs Direct Billing After the Hike",
      description:
        "The old rule of thumb — Go is worth it if you spend more than $10 a month on the DeepSeek API — still mostly holds, but the Aug 16 card moved the break-even. Direct API billing in peak hours is now significantly pricier, making Go's fixed price look comparatively better for heavy Flash users.",
      paragraphs: [
        "Conversely, if you were paying Go monthly but using barely any of the window, the hike narrows Go's advantage — the same $10 buys fewer tokens than before. Run a one-month honest measurement of your real Flash consumption before locking in a year of either path.",
        "For a model-by-model budget view, [[v4-pro-pricing|V4 Pro pricing]] and the [[v4-pro-vs-flash|Flash vs Pro comparison]] put the two tiers in context.",
      ],
    },
    {
      num: "07",
      title: "What OpenCode Is Doing About It: Sourcing Cheaper Flash",
      description:
        "OpenCode is not simply absorbing the hike. Its engineers have publicly said the company is working to source DeepSeek-grade capacity at lower cost — and OpenCode Go is one of the vehicles for marketing cheaper DeepSeek outside China.[6]",
      paragraphs: [
        "In the run-up to Aug 16, OpenCode engineer Dax Raad said his team had found a way to reproduce DeepSeek's current pricing even when renting GPUs, and that this reproduction was achieved by a partner team OpenCode works with, not the company itself. He framed the DeepSeek hike as traffic control rather than a loss-driven move, since V4 Flash's cost-performance ratio had pushed both East and West data centers to capacity.[7]",
        "The economics explain the push. OpenCode reported spending roughly $120,000 a day on V4 Flash inference at its peak (versus OpenRouter's ~$20,000 estimate), a scale that makes self-hosting or a low-cost partner appealing once official rates climb.[8] That is why OpenCode is actively marketing low-cost DeepSeek through OpenCode Go in regions outside China.",
        "There is a real catch for users: independent tests found OpenCode Go's actual DeepSeek consumption was roughly 4x the official API on short tasks, and over 10x on long multi-turn sessions, because OpenCode's cache-hit rate trails DeepSeek's own (official cache can stay ~100% within 12 hours). So even at a lower headline rate, a poorly-cached Go session can cost more per task than the official API.[7]",
        "The takeaway: watch OpenCode's own changelog and the opencode.ai/go page. If an alternative supplier or rate lands, Go's value improves again — the single most important variable to recheck is the live Flash quota figure, which OpenCode adjusts against the underlying DeepSeek rate card.",
      ],
      list: [
        "OpenCode engineer confirmed a partner team can reproduce DeepSeek pricing on rented GPUs[7]",
        "OpenCode is marketing lower-cost DeepSeek through Go outside China[6]",
        "Go cache-hit rates trail DeepSeek ~4x-10x on real tasks — recheck cost per task, not headline rates[7]",
        "Watch opencode.ai/go for live Flash quota; the ZDR-direct deal renews monthly[9]",
      ],
      note: "OpenCode's relationship with DeepSeek is a ZDR-direct agreement renewed monthly, so the Go lineup and quotas can shift as the underlying rate card moves.[9]",
    },
  ],
  relatedGuides: [
    { title: "OpenCode Go: The $5/Month Subscription That Unlocks DeepSeek V4", slug: "opencode-go" },
    { title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save", slug: "flash-pricing" },
    { title: "Use DeepSeek V4 Flash with OpenCode: Step-by-Step", slug: "flash-opencode" },
    { title: "DeepSeek V4 Pro Pricing: Peak/Off-Peak Tiers", slug: "v4-pro-pricing" },
    { title: "DeepSeek V4 Flash vs V4 Pro", slug: "v4-pro-vs-flash" },
  ],
  sources: [
    { label: "OpenCode Go Docs (Official)", url: "https://opencode.ai/docs/go/" },
    { label: "OpenCode Go Landing Page — live quota figures", url: "https://opencode.ai/go" },
    { label: "DeepSeek Official Pricing Page", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Engadget — DeepSeek models about to cost four times more", url: "https://www.engadget.com/2236912/deepseek-ai-models-get-four-times-pricier/" },
    { label: "aiPricing.guru — DeepSeek V4 Peak & Off-Peak", url: "https://www.aipricing.guru/deepseek-pricing/" },
    { label: "InfoQ/163 — OpenCode engineer on replicating DeepSeek pricing & Go's China-outside push", url: "https://www.163.com/dy/article/L3O867FI0511D3QS.html" },
    { label: "XDA Developers — Dax Raad on $120K/day V4 Flash & rented-GPU reproduction", url: "https://www.xda-developers.com/most-people-pay-claude-code-but-opencode-go-codebase-analysis/" },
    { label: "KuCoin — DeepSeek hike as traffic management; OpenCode Go cost ~4x official", url: "https://www.kucoin.com/news/flash/deepseek-s-price-hike-may-be-traffic-management-not-loss" },
    { label: "OpenCode Go Docs — ZDR-direct DeepSeek deal, renewed monthly", url: "https://opencode.ai/docs/go/" },
  ],
};

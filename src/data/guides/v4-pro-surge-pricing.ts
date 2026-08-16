import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro surge pricing
export const v4ProSurgePricing: GuideContent = {
  slug: "v4-pro-surge-pricing",
  category: "PRICING & COST",
  title: "DeepSeek V4 Pro Peak & Off-Peak Pricing: Hours, Rates & Strategy",
  seoTitle: "DeepSeek V4 Pro Peak Hours: Save 50% Off-Peak",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek's peak/off-peak pricing took effect Aug 16: peak 01:00-04:00 and 06:00-10:00 UTC, off-peak 50% cheaper. Exact hours, rates, strategy.",
  toc: [
    { id: "step-1", label: "How Peak & Off-Peak Works" },
    { id: "step-2", label: "The Exact Hours (UTC)" },
    { id: "step-3", label: "V4 Pro Rate Table by Hour" },
    { id: "step-4", label: "Scheduling Strategy: Shift Work to Off-Peak" },
    { id: "step-5", label: "Tools & Gotchas" },
  ],
  steps: [
    {
      num: "01",
      title: "How Peak & Off-Peak Works",
      description:
        "On August 16, 2026, DeepSeek replaced flat pricing with a two-tier hourly schedule across the whole V4 lineup: **peak hours cost 2x the off-peak rate**, and off-peak covers the majority of the day[1][2].",
      paragraphs: [
        "The official announcement frames the change as flexibility: 'Off-peak rates are 50% lower than peak, enabling more flexible workload scheduling.'[1] The new rates took effect at 16:00 UTC on August 16 — three days after the [[v4-pro-release-date|V4 Pro GA]] on August 13.",
        "The important nuance: off-peak is half of the *new* peak price, not half of the old flat price. Every V4 Pro line is still more expensive than the pre-August-16 flat rate at both tiers[2][7].",
      ],
      list: [
        "Peak rate = 2x off-peak rate",
        "Off-peak covers the majority of the day (see exact hours below)",
        "Applies to deepseek-v4-pro and deepseek-v4-flash",
        "Took effect 16:00 UTC, Aug 16, 2026",
      ],
      note: "DeepSeek's earlier announcement (July 31) described peak hours in Beijing time (9:00-12:00 and 14:00-18:00). The August 16 pricing page defines the schedule in UTC — use the UTC definition for API billing[2][7].",
    },
    {
      num: "02",
      title: "The Exact Hours (UTC)",
      description:
        "Per the official pricing page, peak hours are **01:00-04:00 and 06:00-10:00 UTC**; everything else is off-peak[2][7].",
      table: {
        headers: ["Window (UTC)", "Tier", "Example regions"],
        rows: [
          ["00:00-01:00", "Off-peak", "Evening US West / early morning Europe"],
          ["01:00-04:00", "Peak", "Evening Asia / early Europe"],
          ["04:00-06:00", "Off-peak", "Late Asia / pre-dawn Europe"],
          ["06:00-10:00", "Peak", "Asia morning / Europe early workday"],
          ["10:00-01:00 (next day)", "Off-peak", "Most of the US workday + overnight"],
        ],
      },
      paragraphs: [
        "Peak hours total 7 of 24 (roughly 29% of the day); off-peak covers 17 hours. The two peak windows are both anchored to Asia business hours, which makes sense for DeepSeek's primary demand base.",
        "If your traffic is US-centric, most of the US workday (10:00-01:00 UTC) is off-peak — a genuinely useful fact for cost models.",
      ],
      note: "DeepSeek may adjust the schedule; the [[v4-pro-pricing|pricing page]] keeps the current definition[2].",
    },
    {
      num: "03",
      title: "V4 Pro Rate Table by Hour",
      description:
        "The per-1M-token rates for deepseek-v4-pro at each tier[2].",
      table: {
        headers: ["deepseek-v4-pro (per 1M tokens)", "Off-peak", "Peak (2x)"],
        rows: [
          ["Input, cache hit", "$0.022", "$0.044"],
          ["Input, cache miss", "$0.66", "$1.32"],
          ["Output", "$1.98", "$3.96"],
        ],
      },
      paragraphs: [
        "For comparison, [[deepseek-v4-flash|V4 Flash]] output is $0.66 off-peak / $1.32 peak, and Flash input on a cache miss is $0.22 / $0.44. Pro is roughly 3x Flash at every line[2].",
        "A concrete example: 10M output tokens of V4 Pro costs $19.80 off-peak vs $39.60 peak. On a heavy agent workload that runs around the clock, the peak windows add up quickly — the scheduling lever is worth roughly 2x on every token moved.",
      ],
    },
    {
      num: "04",
      title: "Scheduling Strategy: Shift Work to Off-Peak",
      description:
        "The playbook for exploiting the cheap hours without hurting your product[2][7].",
      list: [
        "Batch jobs: nightly reports, eval runs, dataset enrichment → run between 04:00-06:00 or 10:00-16:00 UTC",
        "Retries & re-generation: queue model retries to the next off-peak window",
        "Pre-generation: generate content ahead of peak demand and cache it",
        "Cache strategy: on peak hours, lean harder on [[v4-pro-context-caching|cache hits]] ($0.044 vs $1.32 input)",
        "Regional routing: if you have users in Asia, their peak is your peak — schedule accordingly",
      ],
      paragraphs: [
        "The win is real but bounded: off-peak is 50% of peak, not 10%. The bigger lever remains the cache-hit rate on input and `reasoning_effort` on output — see the [[v4-pro-reasoning-effort|reasoning effort guide]] for the output-side control.",
        "For always-on interactive traffic you cannot defer, the hourly tier is a background cost factor; for anything batch-able, it is a 2x discount you should take.",
      ],
    },
    {
      num: "05",
      title: "Tools & Gotchas",
      description:
        "Practical notes for implementing hour-aware routing[2][3].",
      code: `# Pseudo: pick the cheap tier for batch work
from datetime import datetime, timezone

def is_peak(now_utc):
    h = now_utc.hour
    return (1 <= h < 4) or (6 <= h < 10)

def schedule_batch(job):
    while is_peak(datetime.now(timezone.utc)):
        sleep(60)
    run(job)`,
      list: [
        "Use UTC — the schedule is defined in UTC, and your local tz math will drift with DST",
        "Billing is tokens × rate; reasoning tokens bill at output rates, so peak + max effort is the most expensive combination",
        "The pricing page footnote: prices can be adjusted — pin a rate check into your cost monitor",
        "OpenRouter mirrors DeepSeek rates but may lag the hourly tier; verify before relying on router prices for peak scheduling[10]",
      ],
      note: "Peak/off-peak pricing is one of the most common sources of surprise bills on the new GA build — set up a dashboard that separates peak-hour spend before you scale.",
    },
  ],
  relatedGuides: [
    {
      title: "DeepSeek V4 Pro Pricing: Full Rate Table",
      slug: "v4-pro-pricing",
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
      title: "DeepSeek V4 Pro Reasoning Effort: low/high/max",
      slug: "v4-pro-reasoning-effort",
    },
  ],
  sources: [
    { label: "Official DeepSeek API: V4-Pro GA Release", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek First API Call Docs", url: "https://api-docs.deepseek.com/quick_start/first_api_call/" },
    { label: "ExplainX: V4 Pro 0813 Terminal-Bench Analysis", url: "https://explainx.ai/blog/deepseek-v4-pro-0813-terminal-bench-cline-august-2026" },
    { label: "OpenRouter Models API", url: "https://openrouter.ai/api/v1/models" },
  ],
};

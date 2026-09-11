import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro review
export const v4ProReview: GuideContent = {
  slug: "v4-pro-review",
  category: "MODEL GUIDE",
  title: "DeepSeek V4 Pro Review: The GA Build Under a Microscope",
  seoTitle: "V4 Pro Review: Strengths & Weaknesses",
  readTime: "9 MIN READ",
  updatedAt: "SEP 11, 2026",
  notice:
    "Retiring: from Sept 14, 2026, all deepseek-v4-pro requests route to V4.1 Flash at Flash rates. See [[deepseek-v4-pro-retired|why V4-Pro was retired]] and [[deepseek-v4-1-flash|the V4.1 Flash guide]].",
  summary:
    "An honest V4 Pro 0813 review: elite agentic coding, top-1 Cybergym, but over-thinking simple tasks and new peak pricing. Verdict and who should buy.",
  toc: [
    { id: "step-1", label: "The Verdict Up Front" },
    { id: "step-2", label: "Where V4 Pro Excels" },
    { id: "step-3", label: "Where It Struggles" },
    { id: "step-4", label: "Cost & Value: Pro vs Flash vs Closed Flagships" },
    { id: "step-5", label: "Who Should Buy It (and Who Shouldn't)" },
  ],
  steps: [
    {
      num: "01",
      title: "The Verdict Up Front",
      description:
        "DeepSeek V4 Pro 0813 is the strongest open-weight model for agentic coding as of mid-August 2026, and the GA build's improvement over the April preview is one of the largest single-version jumps on record. It is not, however, the right model for every job — independent tests flag over-thinking on simple tasks, and the new peak-hour pricing raises the cost of always-on workloads[4][6].",
      paragraphs: [
        "This review draws on the official model card, MindStudio's independent 8-task evaluation (August 13), community threads, and DeepSeek's own pricing and GA announcements. Where numbers disagree between vendor and independent sources, both are shown[1][4][6].",
        "One sentence summary: buy it for agentic coding and hard reasoning; route everyday chat and simple tasks to [[deepseek-v4-flash|V4 Flash]].",
      ],
      list: [
        "Agentic coding: best-in-class among open models (TB2.1 87.9, Cybergym 83.3 first)",
        "Independent score: 76.25% on MindStudio's suite (preview: 24.8%)",
        "Pricing: $1.98/$3.96 per 1M output tokens (off-peak/peak) from Aug 16",
        "Best used with: Codex via Responses API, harness-driven agent loops",
      ],
    },
    {
      num: "02",
      title: "Where V4 Pro Excels",
      description:
        "The GA build is a coding and agent powerhouse. On DeepSeek's official tables it takes first place on Cybergym (83.3) and AutomationBench (31.8), and its Terminal Bench 2.1 score of 87.9 sits just below Opus-4.8's 88.3[4].",
      list: [
        "Agentic coding: elite terminal-bench and tool-use scores, produced with the [[deepseek-harness|DeepSeek Harness]] in minimal mode at max effort",
        "Software engineering: DeepSWE 62.7 — the biggest single gain over the preview (+49.9)",
        "Front-end generation and task planning (flagged as strengths in independent testing)[6]",
        "Long-context: native 1M-token context with a 384K max output",
        "Responses API: first-class Codex integration via one-click setup[5]",
      ],
      paragraphs: [
        "Independent testing confirms the direction: MindStudio's suite put the 0813 build at 76.25%, roughly tied with Muse Spark 1.2 and within reach of Kimi K3 and Opus 5 — remarkable for a fully open-weight model[6].",
        "The [[v4-pro-benchmarks|full benchmark page]] has every number with the harness caveat explained.",
      ],
    },
    {
      num: "03",
      title: "Where It Struggles",
      description:
        "The same independent test that praised V4 Pro's front-end work flagged two behavioral quirks: it over-thinks simple problems, and it rewrites code more than the task needs[6].",
      list: [
        "Over-thinking: simple requests get long reasoning chains, adding latency and output-token cost",
        "Over-rewriting: when asked for a small change, it often regenerates more than necessary",
        "Peak-hour pricing: the new $3.96/M output peak rate makes idle-until-midnight bots expensive",
        "Self-hosting: ~862GB VRAM estimate makes local deployment a data-center project",
        "Concurrency: 500 concurrent requests — well below Flash's 2,500",
      ],
      paragraphs: [
        "These weaknesses are manageable with configuration. The [[v4-pro-reasoning-effort|reasoning effort guide]] shows how `low` effort cuts the over-thinking problem, and the [[v4-pro-context-caching|context caching guide]] explains how to keep the bill flat for agent loops.",
        "Community threads echo the same pattern — 'sometimes the little brother V4 Flash is better for daily work' is a recurring sentiment[6][9].",
      ],
    },
    {
      num: "04",
      title: "Cost & Value: Pro vs Flash vs Closed Flagships",
      description:
        "Value math changed on August 16, when peak/off-peak pricing replaced the flat rate. Every V4 Pro line is now more expensive than the old $0.435/$0.87 flat pricing[2].",
      table: {
        headers: ["Option", "Input / 1M (miss)", "Output / 1M", "Notes"],
        rows: [
          ["V4 Pro, off-peak", "$0.66", "$1.98", "16 of 24 hours; cache hits $0.022"],
          ["V4 Pro, peak", "$1.32", "$3.96", "01:00-04:00 + 06:00-10:00 UTC"],
          ["V4 Flash, off-peak", "$0.22", "$0.66", "≈ one-third of Pro"],
          ["V4 Flash, peak", "$0.44", "$1.32", "—"],
          ["Opus-4.8-class (closed)", "≈$2.50-$5", "≈$10-$15", "Vendor list prices, varies by provider"],
        ],
      },
      paragraphs: [
        "Against closed flagships, V4 Pro remains cheap — roughly a quarter of the per-token cost of comparable Claude/GPT tiers, even at peak hours. Against its own family, the gap to Flash widened: Flash now runs about a third of Pro's price, so the routing decision (default to Flash, escalate to Pro) is worth real money at volume[2][6].",
        "The [[v4-pro-vs-flash|V4 Pro vs Flash comparison]] and the [[v4-pro-vs-gpt-5.5|V4 Pro vs GPT-5.5 comparison]] pages dig into workload-specific math.",
      ],
      note: "Closed-model prices are list prices from public providers in August 2026 and vary by region and plan. DeepSeek's official pricing page is the source of truth for V4 Pro[2].",
    },
    {
      num: "05",
      title: "Who Should Buy It (and Who Shouldn't)",
      description:
        "The honest segmentation, based on the evidence above[2][4][6].",
      list: [
        "Buy it: agent startups, code-assistant builders, teams running coding agents with a stable prefix (to exploit cache hits), anyone doing hard multi-step reasoning",
        "Consider it: teams replacing closed coding agents — the open weights + MIT license remove vendor lock-in at near-flagship quality",
        "Skip it: high-volume, latency-sensitive chat; simple Q&A at scale; teams that need >500 concurrent requests on one key",
        "Watch it: teams on tight budgets — the peak-hour rates plus reasoning-token billing can surprise",
      ],
      paragraphs: [
        "The pattern that keeps showing up in testing is hybrid: use [[deepseek-v4-flash|Flash]] for the 90% of traffic that is easy, escalate to Pro for the 10% that is hard. DeepSeek's own benchmark aggregation backs this — Flash sits around 83-88% of Pro's quality at a third of the price[4].",
        "If you are coming from the preview, the upgrade decision is basically made for you — the API already points at 0813. The remaining question is workload design, not model choice.",
      ],
      note: "This review reflects the 0813 GA build as of August 16, 2026. Model checkpoints move quickly — re-evaluate before committing long-term contracts.",
    },
  ],
  relatedGuides: [
    {
      title: "DeepSeek V4 Pro Benchmarks: 0813 Scores",
      slug: "v4-pro-benchmarks",
    },
    {
      title: "DeepSeek V4 Pro vs V4 Flash: Which One Do You Need?",
      slug: "v4-pro-vs-flash",
    },
    {
      title: "DeepSeek V4 Pro Reasoning Effort: low/high/max",
      slug: "v4-pro-reasoning-effort",
    },
    {
      title: "DeepSeek V4 Pro Pricing: Peak & Off-Peak Rates",
      slug: "v4-pro-pricing",
    },
  ],
  sources: [
    { label: "Official DeepSeek API: V4-Pro GA Release", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "MindStudio: V4 Pro 0813 Benchmark Review", url: "https://www.mindstudio.ai/blog/deepseek-v4-pro-0813-benchmark-review" },
    { label: "DeepSeek Codex Integration Docs", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/codex/" },
    { label: "Reddit r/LocalLLaMA: V4-Pro-0813 Benchmarks", url: "https://www.reddit.com/r/LocalLLaMA/comments/1vmi0fg/deepseek_v4pro0813_benchmarks/" },
  ],
};

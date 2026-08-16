import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro vs flash
export const v4ProVsFlash: GuideContent = {
  slug: "v4-pro-vs-flash",
  category: "COMPARISON",
  title: "DeepSeek V4 Pro vs V4 Flash: Which Model Should You Use?",
  seoTitle: "DeepSeek V4 Pro vs Flash: Compare & Choose",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek V4 Pro vs V4 Flash: 1.6T vs 284B params, $0.435 vs $0.14 per 1M input, 96.4% vs 88.8% SWE-bench. How to pick.",
  toc: [
    { id: "step-1", label: "Step 1: The Two Models at a Glance" },
    { id: "step-2", label: "Step 2: Benchmark Differences" },
    { id: "step-3", label: "Step 3: Price Gap & the 8/16 Peak Pricing" },
    { id: "step-4", label: "Step 4: Capability Fit: Agentic vs Knowledge Work" },
    { id: "step-5", label: "Step 5: The Hybrid Routing Pattern" },
  ],
  steps: [
    {
      num: "01",
      title: "The Two Models at a Glance",
      description:
        "V4 Pro is DeepSeek's 1.6T-parameter flagship with 49B active per token; V4 Flash is the 284B/13B workhorse that officially cleared Pro-Preview on nine agent benchmarks back in July[2]. Both share a 1M-token context window, 384K max output, MIT licensing, and the same low/high/max reasoning-effort controls introduced with the August 13 GA[1].",
      paragraphs: [
        "The August 13 release changed the comparison: [[v4-pro|V4 Pro]] went from preview to GA as the 0813 checkpoint, while Flash points to the 0731 build. Neither model name changes — you call deepseek-v4-pro and deepseek-v4-flash as always[1].",
        "Concurrency is a real difference: Pro allows 500 concurrent requests, Flash 2,500 — Flash is built for high-throughput pipelines, Pro for depth-first reasoning[1].",
      ],
      table: {
        headers: ["Spec", "DeepSeek V4 Pro (0813)", "DeepSeek V4 Flash (0731)"],
        rows: [
          ["Total parameters", "1.6T", "284B"],
          ["Active per token", "49B", "13B"],
          ["Context window", "1M tokens", "1M tokens"],
          ["Max output", "384K tokens", "384K tokens"],
          ["Concurrency limit", "500", "2,500"],
          ["Reasoning effort", "low / high / max", "low / high / max"],
          ["GA status (Aug 16, 2026)", "GA (0813)", "Official build (0731)"],
        ],
      },
      note: "Specs are from DeepSeek's official model card and pricing docs[1][5]. Concurrency limits are per the rate-limit documentation.",
    },
    {
      num: "02",
      title: "Benchmark Differences",
      description:
        "On software engineering, third-party runs put the gap at about 8 points: V4 Pro 0813 scores 96.40% on SWE-bench Verified (Codersera/Vals AI, neutral harness) versus 88.80% for Flash-0731[7]. Both are strong — Flash alone beats GPT-5.6 Sol-adjacent models on patch-style coding at a fraction of the cost.",
      table: {
        headers: ["Benchmark", "V4 Pro 0813", "V4 Flash 0731", "Notes"],
        rows: [
          ["SWE-bench Verified (3rd-party)", "96.40%", "88.80%", "Codersera / Vals AI[7]"],
          ["Terminal-Bench 2.1 (official)", "87.9", "82.7", "DeepSeek Harness minimal mode[5]"],
          ["DeepSWE (official)", "62.7", "54.4", "Vendor-reported[5]"],
          ["AutomationBench (official)", "31.8", "25.1", "Vendor-reported[5]"],
        ],
      },
      paragraphs: [
        "Official numbers come with a caveat: DeepSeek runs code-agent benchmarks through [[deepseek-harness|DeepSeek Harness]] minimal mode at max reasoning effort, and the harness was not published when the preview numbers appeared. Independent end-to-end agent runs land lower — Vals measured Pro at 54.68% on Terminal-Bench with a reference harness[4].",
        "What matters for you: on patch-style SWE tasks the two models are close enough that cost decides; on long-horizon agentic work the flagship's deeper reasoning shows up more.",
      ],
      note: "Vendor benchmarks are self-reported[5]; third-party figures come from Codersera/Vals AI and BenchLM[7][8].",
    },
    {
      num: "03",
      title: "Price Gap & the 8/16 Peak Pricing",
      description:
        "At the old flat rates, Flash ran about one-third of Pro's price on input and output: $0.14 vs $0.435 per 1M input (cache miss) and $0.28 vs $0.87 per 1M output[1]. On August 16, 16:00 UTC, DeepSeek switched both models to peak/off-peak pricing — and both got more expensive[3].",
      table: {
        headers: ["Per 1M tokens", "Pro off-peak", "Pro peak", "Flash off-peak", "Flash peak"],
        rows: [
          ["Input (cache miss)", "$0.66", "$1.32", "$0.22", "$0.44"],
          ["Input (cache hit)", "$0.022", "$0.044", "$0.007", "$0.014"],
          ["Output", "$1.98", "$3.96", "$0.66", "$1.32"],
        ],
      },
      paragraphs: [
        "Peak hours are 01:00-04:00 and 06:00-10:00 UTC; everything else is off-peak at half the peak rate[3]. The ratio between the models survives the change — Flash stays roughly one-third of Pro — but the absolute floor moved up, so caching and off-peak scheduling matter more than before[3].",
        "The cache-hit discount is the biggest lever for both: Pro input on a cache hit is $0.022 off-peak versus $0.66 on a miss — a 96.7% saving. Long, repetitive agent contexts that reuse a shared prefix benefit enormously from [[v4-pro-context-caching|context caching]].",
      ],
      note: "Prices per DeepSeek's official pricing page captured August 16, 2026[1][3]. OpenRouter had not yet mirrored the peak/off-peak rates as of this writing.",
    },
    {
      num: "04",
      title: "Capability Fit: Agentic vs Knowledge Work",
      description:
        "Flash is the default for high-volume pipelines: large-scale extraction, classification, chat, and code generation where a 3x price difference dominates. Pro earns its premium on hard reasoning, long-context synthesis, and agentic loops where a single wrong step wastes many tokens[9].",
      list: [
        "Batch summarization over millions of tokens → Flash; 2,500 concurrency and cheap cache hits.",
        "Multi-step coding agent with tool calls → Pro; official TB2.1 87.9 vs 82.7 and better DeepSWE[5].",
        "Math / logic / world-knowledge Q&A → Pro; GPQA Knowledge 90.1% and higher HLE scores[8].",
        "Cost-sensitive routing with a quality floor → Flash for easy, Pro for hard; see Step 5.",
      ],
      paragraphs: [
        "Mindstudio's independent 8-question eval found 0813 at 76.25%, with a real quirk: it over-thinks simple questions and over-rewrites code. Their practical take: 'sometimes little brother V4 Flash is better for daily use'[6]. Match the model to the task, not to the flagship label.",
        "A useful mental model: Flash is the batch worker — huge concurrency, cheap cache hits, 88.8% SWE-bench accuracy for a tenth of a cent per test[7]. Pro is the senior engineer — 96.4% accuracy, deeper reasoning, but 500 concurrency and a higher floor price. If a task fails once in a blue moon and retries are cheap, Flash wins. If a single wrong answer is expensive (code review gates, medical-style QA, long agent runs), Pro's extra eight points justify the premium.",
      ],
      note: "Independent eval results from Mindstudio's August 13 review[6].",
    },
    {
      num: "05",
      title: "The Hybrid Routing Pattern",
      description:
        "The most cost-effective setup is hybrid: default every request to [[deepseek-v4-flash|Flash]], escalate to Pro only for hard reasoning and agentic tasks. A Flash-first workload runs roughly 3x cheaper end-to-end, and DeepSeek's own 22-benchmark aggregation puts Flash at about 83% of Pro quality[9].",
      code: `# pseudo-code for hybrid routing
def route(task: str, agentic: bool) -> str:
    if agentic or task.difficulty > THRESHOLD:
        return "deepseek-v4-pro"
    return "deepseek-v4-flash"

# both models share the same base_url and API key:
# https://api.deepseek.com`,
      paragraphs: [
        "In practice this means one client, two model strings, and a simple classifier in front. Keep cache-friendly prompts identical across calls so the shared prefix hits, and schedule batch jobs into off-peak hours to cut the new peak rates[3].",
        "A concrete routing rule that works well: route anything with tool calls or multi-turn agent state to Pro, route single-shot generation, extraction, and summarization to Flash. Add a fallback: when Pro times out or the request is below a difficulty threshold, downgrade to Flash automatically. Teams using this pattern report roughly 60-70% of tokens landing on Flash while keeping 95%+ of quality-critical tasks on Pro[9].",
      ],
      note: "Quality-ratio claim is DeepSeek's own 22-benchmark aggregation[9]. Verify against your workload before committing.",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4 Pro: Specs, Pricing & Release Date", slug: "v4-pro" },
    { title: "DeepSeek V4 Pro Pricing After the 8/16 Update", slug: "v4-pro-pricing" },
    { title: "DeepSeek V4 Pro vs GPT-5.5: Benchmarks & Cost", slug: "v4-pro-vs-gpt-5.5" },
    { title: "What Is DeepSeek V4 Flash? The 0731 Release", slug: "deepseek-v4-flash" },
    { title: "DeepSeek V4 Flash Benchmarks in 2026", slug: "flash-benchmarks" },
  ],
  sources: [
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek V4 Pro GA Release Notes", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek V4 Pro 0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "ExplainX: V4 Pro 0813 Terminal-Bench Analysis", url: "https://explainx.ai/blog/deepseek-v4-pro-0813-terminal-bench-cline-august-2026" },
    { label: "Mindstudio: DeepSeek V4 Pro 0813 Review", url: "https://www.mindstudio.ai/blog/deepseek-v4-pro-0813-benchmark-review" },
    { label: "Codersera: V4 Pro 0813 Guide & Benchmarks", url: "https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/" },
    { label: "BenchLM: V4 Pro vs GPT-5.5 Comparison", url: "https://benchlm.ai/compare/deepseek-v4-pro-vs-gpt-5.5" },
    { label: "Rohit AI: V4 Pro 0813 GA Benchmarks & Pricing", url: "https://rohitai.com/blog/deepseek-v4-pro-0813-ga-benchmarks-pricing" },
  ],
};

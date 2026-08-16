import type { GuideContent } from "./types";

// 目标关键词：deepseek harness benchmark
// 内容来源：reference/topics/21-deepseek-harness-release.md + 23-harness-usage-plugins.md + 现有 deepseek-harness.ts 基准表（2026-08-16 定稿）
export const harnessBenchmark: GuideContent = {
  slug: "harness-benchmark",
  category: "GUIDE",
  title: "DeepSeek Harness Benchmarks: Official Scores, Minimal Mode, and Caveats",
  seoTitle: "DeepSeek Harness Benchmarks: Scores & Caveats",
  readTime: "9 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "How DeepSeek Harness measures models: official benchmarks run on minimal mode. Terminal-Bench 82.7, DeepSWE 54.4 — plus vendor-reported caveats.",
  toc: [
    { id: "step-1", label: "Step 1: What 'Harness-Measured' Means" },
    { id: "step-2", label: "Step 2: The Official Score Table" },
    { id: "step-3", label: "Step 3: Why Minimal Mode Is the Benchmark Rig" },
    { id: "step-4", label: "Step 4: The Benchmark-Maxxing Debate" },
    { id: "step-5", label: "Step 5: Reproducing the Numbers Yourself" },
    { id: "step-6", label: "Step 6: What to Read Next" },
  ],
  steps: [
    {
      num: "01",
      title: "What 'Harness-Measured' Means",
      description:
        "Every official agent score DeepSeek publishes for its models is a measurement of the pair — model plus harness — not the model alone. The July 31, 2026 changelog states that all Code Agent benchmarks for V4-Flash-0731 were run using the DeepSeek Harness minimal mode, with max effort, topp=0.95, and temperature=1.0[1].",
      paragraphs: [
        "That is the whole point of the Agent = Model + Harness formula: agentic capability lives in the combination. When DeepSeek reports a score, the harness is part of the result, and swapping the harness can change the number even with the same model[2].",
      ],
      note: "For the framework background, start with [[what-is-deepseek-harness|What Is DeepSeek Harness?]].",
    },
    {
      num: "02",
      title: "The Official Score Table",
      description:
        "Here is the complete official table from the V4-Flash-0731 changelog: nine benchmarks, two of which are internal test sets[1][3]:",
      table: {
        headers: ["Benchmark", "V4-Flash-0731", "Preview comparison", "Status"],
        rows: [
          ["Terminal-Bench 2.1", "82.7", "61.8 (Flash Preview)", "Public"],
          ["NL2Repo", "54.2", "—", "Public"],
          ["Cybergym", "76.7", "—", "Public"],
          ["DeepSWE", "54.4", "7.3 (+645%)", "Public"],
          ["Toolathlon (verified)", "70.3", "—", "Public"],
          ["Agent Last Exam", "25.2", "—", "Public"],
          ["Automation Bench (Public)", "25.1", "—", "Public"],
          ["DSBench-FullStack", "68.7", "37.0 (Preview)", "Internal set"],
          ["DSBench-Hard", "59.6", "—", "Internal set"],
        ],
      },
      paragraphs: [
        "The headline is the DeepSWE jump from 7.3 to 54.4 (+645%) on the same model after re-post-training. Two rows (DSBench-FullStack, DSBench-Hard) are DeepSeek's own sets and cannot be reproduced externally; the other seven are public benchmarks but every score is vendor-reported[1][3].",
      ],
    },
    {
      num: "03",
      title: "Why Minimal Mode Is the Benchmark Rig",
      description:
        "Minimal mode is a two-tool coding agent: a persistent bash shell and a str_replace_editor for file edits — nothing else[1][4].",
      paragraphs: [
        "The reasoning is comparability. A full agent environment (web search, skills, subagents) would make benchmark runs hard to attribute: did the model solve the task, or did the harness's extra tools? Minimal mode isolates the model's coding ability behind the thinnest possible tool layer, which is exactly what you want when the benchmark is about the model[1][4].",
        "It is also the reproducible configuration for third parties: install dsh, switch to the minimal profile, point it at any OpenAI-compatible model, and run a benchmark suite under the same two tools[4].",
      ],
    },
    {
      num: "04",
      title: "The Benchmark-Maxxing Debate",
      description:
        "Because the official scores are vendor-reported, the community immediately asked how much the harness contributes — the 'benchmark maxxing' question[5].",
      paragraphs: [
        "The sharpest challenge came from the DeepSWE thread. DeepSWE is a harder, from-scratch benchmark with behavioral verifiers, and its author ran every model through one shared harness. But the fairness pilot only covered Claude, GPT, and Gemini — DeepSeek was not in it. One top comment summarized the worry: 'A bottom-of-board score for the one model nobody validated the harness against reads as a harness result, not a capability result.'",
        "Independent numbers add context. A separate DeepSWE audit by yage.ai in June 2026 scored V4-Pro at just 8% pass@1, versus 70% for GPT-5.5 and 54% for Opus 4.7. Compare that with the 54.4 the official Harness reports for Flash 0731 on the same benchmark, and the gap is the whole debate in miniature[5].",
        "With the harness now public, third parties can finally re-run the suite — which is the single biggest change since July 31. Until an independent lab publishes a reproduction, treat every official agent number as directional[5].",
      ],
      note: "For the Flash-side numbers in full, see the [[flash-benchmarks|official agent benchmarks guide]].",
    },
    {
      num: "05",
      title: "Reproducing the Numbers Yourself",
      description:
        "Now that dsh is open source, the minimal-mode rig is runnable[1][4]:",
      code: `# 1. install
npx @deepseek-ai/dsh web        # or build from source (pnpm)

# 2. point at the model you want to benchmark
#    Settings → Models → add provider (any OpenAI-compatible endpoint)

# 3. run the minimal profile headless on a task
dsh --profile headless "solve this coding task and run the tests"`,
      paragraphs: [
        "For a fair model-vs-model comparison, keep the harness constant (minimal mode, same tools, same config) and vary only the model — the methodology recommended by third-party reviewers[6].",
      ],
    },
    {
      num: "06",
      title: "What to Read Next",
      description:
        "Related material[1][7]:",
      list: [
        "[[v4-pro-benchmarks|DeepSeek V4 Pro benchmarks]] — the GA 0813 numbers, including Terminal-Bench 87.9 and Cybergym",
        "[[flash-benchmarks|V4 Flash benchmarks]] — full fine print on the +645% figure",
        "[[harness-minimal-mode|Minimal mode explained]] — the two-tool rig in detail",
        "[[v4-pro-vs-gpt-5.5|V4 Pro vs GPT-5.5]] — independent comparison context",
      ],
      note: "Benchmark methodology updates as third parties publish reproductions; the harness itself is the stable reference point now.",
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Minimal Mode", slug: "harness-minimal-mode" },
    { title: "DeepSeek V4 Pro Benchmarks", slug: "v4-pro-benchmarks" },
    { title: "DeepSeek V4 Flash Benchmarks", slug: "flash-benchmarks" },
    { title: "What Is DeepSeek Harness?", slug: "what-is-deepseek-harness" },
    { title: "DeepSeek V4 Pro vs GPT-5.5", slug: "v4-pro-vs-gpt-5.5" },
  ],
  sources: [
    { label: "DeepSeek V4 Flash — Official Changelog", url: "https://api-docs.deepseek.com/news/news260731/" },
    { label: "DeepSeek Harness — Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "V4-Flash-0731 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731" },
    { label: "dsh CLI README (official)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/apps/cli/README.md" },
    { label: "DeepSWE benchmark analysis (community)", url: "https://github.com/deepswe-bench/deepswe" },
    { label: "Harness A/B methodology (Alphalab)", url: "https://www.alphalab.site/deepseek-harness" },
    { label: "V4 Pro 0813 benchmarks (MindStudio)", url: "https://www.mindstudio.ai/blog/deepseek-v4-pro-0813-benchmark-review" },
  ],
};

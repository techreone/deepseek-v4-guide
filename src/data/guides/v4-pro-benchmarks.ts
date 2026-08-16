import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro benchmarks
export const v4ProBenchmarks: GuideContent = {
  slug: "v4-pro-benchmarks",
  category: "BENCHMARKS",
  title: "DeepSeek V4 Pro Benchmarks: 0813 GA Scores & Independent Tests",
  seoTitle: "V4 Pro Benchmarks: TB2.1 87.9, Top-1 Cybergym",
  readTime: "8 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "V4 Pro 0813 scores Terminal Bench 2.1 at 87.9 and tops Cybergym and AutomationBench. Full official table, independent tests, and the harness caveat.",
  toc: [
    { id: "step-1", label: "The Headline Numbers" },
    { id: "step-2", label: "Official Benchmark Table (0813)" },
    { id: "step-3", label: "The Harness Caveat: How These Scores Were Produced" },
    { id: "step-4", label: "Independent Tests: MindStudio & Others" },
    { id: "step-5", label: "Preview vs GA: The Jump" },
    { id: "step-6", label: "How to Read These Numbers" },
  ],
  steps: [
    {
      num: "01",
      title: "The Headline Numbers",
      description:
        "DeepSeek V4 Pro 0813 — the GA build released August 13, 2026 — scores **87.9 on Terminal Bench 2.1**, takes **first place on Cybergym (83.3)** and **AutomationBench (31.8)**, and beats its own preview by a wide margin across every agent benchmark[1][4].",
      list: [
        "Terminal Bench 2.1: 87.9 (preview was 72.1, Flash-0731 was 82.7)",
        "Cybergym: 83.3 — first place in DeepSeek's published table",
        "AutomationBench (Public): 31.8 — first place",
        "DeepSWE: 62.7 (preview was 12.8)",
        "Toolathlon-Verified: 74.1",
        "Independent 8-task suite: 76.25% vs 24.8% for the preview",
      ],
      note: "All official numbers are vendor-reported on the Hugging Face model card, produced with DeepSeek's own agent configuration[4].",
    },
    {
      num: "02",
      title: "Official Benchmark Table (0813)",
      description:
        "The complete published table from the DeepSeek-V4-Pro-0813 model card, with the nearest published competitors[4].",
      table: {
        headers: ["Benchmark", "V4 Pro 0813", "Flash-0731", "Pro Preview", "Kimi K3", "Opus-4.8", "Fable-5"],
        rows: [
          ["HLE (wo/w tools)", "42.7 / 60.0", "37.8 / 51.5", "37.7 / 48.2", "40.5 / 54.7", "43.5 / 56.0", "49.8 / 57.9"],
          ["Terminal Bench 2.1", "87.9", "82.7", "72.1", "81.0", "88.3", "85.0"],
          ["NL2Repo", "61.5", "54.2", "38.5", "48.9", "—", "69.7"],
          ["Cybergym", "83.3", "76.7", "52.7", "—", "80.0", "78.3"],
          ["DeepSWE", "62.7", "54.4", "12.8", "46.2", "67.5", "58.0"],
          ["Toolathlon-Verified", "74.1", "70.3", "55.9", "59.9", "76.5", "76.2"],
          ["AutomationBench (Public)", "31.8", "25.1", "12.8", "12.9", "30.8", "27.2"],
          ["Agents' Last Exam", "25.7", "25.2", "16.5", "23.8", "27.6", "25.7"],
        ],
      },
      paragraphs: [
        "DSBench-FullStack (71.1) and DSBench-Hard (67.2) are internal test sets, marked with a dagger in the model card. Everything in this table except the internal rows uses the official DeepSeek Harness minimal mode with max reasoning effort, temperature 1.0, top_p 0.95[4].",
        "The picture: V4 Pro 0813 leads the open-weight field on agentic coding, sits just below Opus-4.8 on Terminal Bench, and clears the preview-era Flash on every line — the GA build is a real generational step.",
      ],
    },
    {
      num: "03",
      title: "The Harness Caveat: How These Scores Were Produced",
      description:
        "The agent scores are not raw model numbers — every code-agent benchmark was run through the **DeepSeek Harness in minimal mode** at max reasoning effort[4]. That is a model-plus-harness score.",
      paragraphs: [
        "The same configuration note appeared in the July 31 Flash-0731 changelog, and it matters for comparisons: a different agent framework (Claude Code, OpenCode, Cline) can produce materially different completion rates on the same model. The [[harness-benchmark|DeepSeek Harness benchmarks]] page explains how the harness itself is scored and how to replicate the setup.",
        "Practically, treat these tables as 'V4 Pro 0813 + Harness minimal' scores. If you run V4 Pro inside your own tooling, expect variance — that is normal, not a defect.",
      ],
      note: "DeepSeek's official statement for the preview said the same testing harness had not been published; the GA model card now links the open-source Harness, so the exact benchmark configuration is reproducible[4].",
    },
    {
      num: "04",
      title: "Independent Tests: MindStudio & Others",
      description:
        "Independent testing shows the same direction but more conservative numbers. MindStudio's 8-task coding/reasoning suite scored V4 Pro 0813 at **61/80 (76.25%)**, roughly tied with Muse Spark 1.2 and below Kimi K3 and Opus 5 — but the same suite scored the preview at only 24.8%[6].",
      list: [
        "Independent 8-task suite: 76.25% (preview: 24.8%) — one of the largest single-version jumps recorded",
        "Observed strengths: front-end generation, task planning, asking clarifying questions",
        "Observed weaknesses: overthinking simple problems, rewriting code more than the task needs",
        "Community verdict: for everyday workloads, V4 Flash often feels like the better tool — see the [[v4-pro-review|V4 Pro review]]",
      ],
      paragraphs: [
        "Reddit's r/LocalLLaMA thread on the 0813 numbers mostly reads them as 'sane' for an open flagship, with skepticism reserved for the vendor harness configuration and the internal DSBench rows[9].",
        "There is no NIST-level independent audit of the 0813 build yet — the May CAISI evaluation covered the preview build only.",
      ],
    },
    {
      num: "05",
      title: "Preview vs GA: The Jump",
      description:
        "The GA build's improvement over the preview is the story of this release: Terminal Bench 2.1 up 15.8 points (72.1 → 87.9), DeepSWE up from 12.8 to 62.7, AutomationBench up from 12.8 to 31.8[4][6].",
      table: {
        headers: ["Benchmark", "Preview (Apr 24)", "0813 GA (Aug 13)", "Delta"],
        rows: [
          ["Terminal Bench 2.1", "72.1", "87.9", "+15.8"],
          ["DeepSWE", "12.8", "62.7", "+49.9"],
          ["Cybergym", "52.7", "83.3", "+30.6"],
          ["Toolathlon-Verified", "55.9", "74.1", "+18.2"],
          ["AutomationBench (Public)", "12.8", "31.8", "+19.0"],
        ],
      },
      paragraphs: [
        "The scale of the jump suggests the 0813 build is a materially retrained checkpoint rather than a configuration flip — consistent with the 'same architecture, new weights' pattern DeepSeek established with Flash-0731 on July 31[1].",
        "If you benchmarked the preview in July and wrote it off, the GA numbers are worth re-checking.",
      ],
    },
    {
      num: "06",
      title: "How to Read These Numbers",
      description:
        "Three rules for using this table without fooling yourself[4][6][9].",
      list: [
        "Compare like-for-like: same harness, same reasoning effort, same temperature",
        "Use independent suites (MindStudio, your own) as the tiebreaker when vendor vs vendor tables disagree",
        "Check the date: agent frameworks and model checkpoints move weekly, so any table older than two weeks is stale",
      ],
      paragraphs: [
        "The honest summary: V4 Pro 0813 is the strongest open-weight coding agent as of mid-August 2026 on vendor numbers, and a large improvement over the preview on independent numbers. It is not head-and-shoulders above the closed flagships — expect it to trade blows with Opus-4.8 and Kimi K3 depending on the task[4][6].",
      ],
      note: "Benchmarks measure the model under one configuration. Your workload is the final test — run your own evals before committing production traffic.",
    },
  ],
  relatedGuides: [
    {
      title: "DeepSeek V4 Pro Review: Is It Worth the Premium?",
      slug: "v4-pro-review",
    },
    {
      title: "DeepSeek Harness Benchmarks: How Agent Scores Are Made",
      slug: "harness-benchmark",
    },
    {
      title: "DeepSeek V4 Flash Benchmarks",
      slug: "flash-benchmarks",
    },
    {
      title: "DeepSeek V4 Pro 0813 Build Explained",
      slug: "v4-pro-0813",
    },
  ],
  sources: [
    { label: "Official DeepSeek API: V4-Pro GA Release", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "MindStudio: V4 Pro 0813 Benchmark Review", url: "https://www.mindstudio.ai/blog/deepseek-v4-pro-0813-benchmark-review" },
    { label: "Reddit r/LocalLLaMA: V4-Pro-0813 Benchmarks", url: "https://www.reddit.com/r/LocalLLaMA/comments/1vmi0fg/deepseek_v4pro0813_benchmarks/" },
  ],
};

import type { GuideContent } from "./types";

// 目标关键词：deepseek harness minimal mode
// 内容来源：reference/topics/21-deepseek-harness-release.md + 23-harness-usage-plugins.md + 现有 deepseek-harness.ts（2026-08-16 定稿）
export const harnessMinimalMode: GuideContent = {
  slug: "harness-minimal-mode",
  category: "GUIDE",
  title: "DeepSeek Harness Minimal Mode: The Two-Tool Benchmark Rig",
  seoTitle: "DeepSeek Harness Minimal Mode Explained",
  readTime: "6 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "Minimal mode is DeepSeek Harness's two-tool configuration — persistent bash plus str_replace_editor — used for every official agent benchmark.",
  toc: [
    { id: "step-1", label: "Step 1: What Minimal Mode Is" },
    { id: "step-2", label: "Step 2: The Two Tools" },
    { id: "step-3", label: "Step 3: Why DeepSeek Benchmarks With It" },
    { id: "step-4", label: "Step 4: The Official Config" },
    { id: "step-5", label: "Step 5: Running a Benchmark With It" },
    { id: "step-6", label: "Step 6: Minimal vs Standard vs Code" },
  ],
  steps: [
    {
      num: "01",
      title: "What Minimal Mode Is",
      description:
        "Minimal mode is the smallest runtime configuration of DeepSeek Harness: a two-tool coding agent built specifically for benchmarking models in a minimal environment[1][2].",
      paragraphs: [
        "It is the configuration DeepSeek used for every public Code Agent benchmark of V4-Flash-0731 — the scores that shipped with the July 31, 2026 release and the +645% DeepSWE headline[3].",
      ],
      note: "Minimal mode is one of four plugin compositions — see [[what-is-deepseek-harness|What Is DeepSeek Harness?]] for the full mode family.",
    },
    {
      num: "02",
      title: "The Two Tools",
      description:
        "The entire tool surface is two tools[1][2]:",
      list: [
        "A persistent bash shell — the agent can run arbitrary commands and keep state between invocations",
        "str_replace_editor — a minimal file editor (string replacement based)",
      ],
      paragraphs: [
        "That is everything. No web search, no skills, no subagents, no vision, no extra sandboxing layers in the default composition. The agent solves coding tasks with the shell and the editor only[1][2].",
      ],
    },
    {
      num: "03",
      title: "Why DeepSeek Benchmarks With It",
      description:
        "The point of minimal mode is attribution. When a benchmark number is reported, reviewers need to know how much of it came from the model versus the harness's extra machinery[2].",
      paragraphs: [
        "A full agent environment (web search, skills, subagents) makes scores hard to interpret: did the model solve the task, or did the harness's tools? Minimal mode reduces the harness to its thinnest possible layer, so the score mostly reflects the model's coding ability under a controlled, reproducible setup[2][3].",
        "It also levels the playing field for third-party reproduction: install dsh, switch to the minimal profile, point it at any OpenAI-compatible model, and run the same benchmark suite under the same two tools[2].",
      ],
    },
    {
      num: "04",
      title: "The Official Config",
      description:
        "The exact settings used for the official runs, from the July 31 changelog[3]:",
      table: {
        headers: ["Parameter", "Official value"],
        rows: [
          ["Framework", "DeepSeek Harness minimal mode"],
          ["Reasoning effort", "max"],
          ["Top-p", "0.95"],
          ["Temperature", "1.0"],
        ],
      },
      paragraphs: [
        "The same parameters appear in the Hugging Face model card for V4-Flash-0731. They define the reproducibility contract for the published agent benchmarks[3].",
      ],
    },
    {
      num: "05",
      title: "Running a Benchmark With It",
      description:
        "Because dsh is open source, the rig is now runnable by anyone[1][2]:",
      code: `# install (one line)
npx @deepseek-ai/dsh web

# point at the model under test (any OpenAI-compatible provider)
# Settings → Models → add provider

# launch the minimal profile headless on a task
dsh --profile headless "implement the function, write tests, run them"`,
      paragraphs: [
        "For a fair model-vs-model comparison, keep the harness constant (minimal profile, max effort, topp 0.95, temp 1.0) and vary only the model — the methodology third-party reviewers recommend[4].",
      ],
      note: "Full score context and the vendor-reported caveats: see [[harness-benchmark|harness benchmarks]].",
    },
    {
      num: "06",
      title: "Minimal vs Standard vs Code",
      description:
        "Where minimal mode fits in the runtime family[1]:",
      table: {
        headers: ["Mode", "Tools", "Purpose"],
        rows: [
          ["Minimal", "bash + str_replace_editor", "Benchmarking models reproducibly"],
          ["Standard", "Full coding agent toolset", "Day-to-day coding"],
          ["Code", "Standard + Code Mode SDK", "Multi-step automation in TypeScript"],
          ["Creator", "Runtime inspection", "Plugin development"],
        ],
      },
      paragraphs: [
        "Choose minimal mode when you want measurement or reproducibility; choose Standard for real work and Code for deterministic automation[1].",
      ],
    },
  ],
  relatedGuides: [
    { title: "DeepSeek Harness Benchmarks", slug: "harness-benchmark" },
    { title: "DeepSeek Harness Code Mode", slug: "harness-code-mode" },
    { title: "What Is DeepSeek Harness?", slug: "what-is-deepseek-harness" },
    { title: "DeepSeek V4 Flash Benchmarks", slug: "flash-benchmarks" },
    { title: "DeepSeek V4 Pro Benchmarks", slug: "v4-pro-benchmarks" },
  ],
  sources: [
    { label: "DeepSeek Harness — Official Page", url: "https://deepseek.com/harness/en/" },
    { label: "dsh CLI README (official)", url: "https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/apps/cli/README.md" },
    { label: "DeepSeek V4 Flash — Official Changelog", url: "https://api-docs.deepseek.com/news/news260731/" },
    { label: "Harness A/B methodology (Alphalab)", url: "https://www.alphalab.site/deepseek-harness" },
  ],
};

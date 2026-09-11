import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash benchmarks
// 内容来源：reference/topics/27-v4-1-flash.md（HF 模型卡官方全表 + 多脚手架表）
export const v41FlashBenchmarks: GuideContent = {
  slug: "v4-1-flash-benchmarks",
  category: "BENCHMARKS",
  title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table",
  seoTitle: "DeepSeek V4.1 Flash Benchmarks: Full Table",
  readTime: "10 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "Every DeepSeek V4.1 Flash benchmark: Terminal-Bench 2.1 90.6, DeepSWE 74.2, CyberGym 88.1, plus the multi-scaffold table and the effort-cost caveat.",
  toc: [
    { id: "step-1", label: "Step 1: How DeepSeek Ran These Benchmarks" },
    { id: "step-2", label: "Step 2: The Headline Wins: DeepSWE, CyberGym, TB 2.1" },
    { id: "step-3", label: "Step 3: Where V4.1 Flash Still Trails" },
    { id: "step-4", label: "Step 4: The Full Frontier Comparison Table" },
    { id: "step-5", label: "Step 5: Performance Across Agent Scaffolds" },
    { id: "step-6", label: "Step 6: Base-Model and Multimodal Scores" },
    { id: "step-7", label: "Step 7: The Reasoning-Effort Cost Caveat" },
    { id: "step-8", label: "Step 8: How to Read Vendor Benchmarks" },
  ],
  steps: [
    {
      num: "01",
      title: "How DeepSeek Ran These Benchmarks",
      description:
        "All instruct results use maximum reasoning effort (reasoning_effort=100), temperature=1.0, and top_p=0.95. For code-agent benchmarks, the model was evaluated with the Minimal mode of DeepSeek Harness and a 1M-token context window. DeepSWE v1.1 used the mini-SWE harness and SEC-Bench Pro used the Claude Code harness[4].",
      paragraphs: [
        "That methodology matters. The agentic scores are not raw model scores — they are model-plus-harness scores, which is the same caveat that applies to every vendor's agent benchmark. DeepSeek also publishes a separate multi-scaffold table so readers can see how the same model behaves under Claude Code, Codex, OpenCode, and others[4].",
        "Base-model results are evaluated in DeepSeek's internal framework under shared settings, with scores within 0.3 considered equivalent[4].",
      ],
      note: "This site has not independently verified any DeepSeek number. Treat all figures as vendor-reported until independent harnesses publish runs[4][5].",
    },
    {
      num: "02",
      title: "The Headline Wins: DeepSWE, CyberGym, TB 2.1",
      description:
        "On DeepSWE v1.1, V4.1 Flash scores 74.2 — ahead of Claude Opus 5 (74.0) and GPT-5.6 Sol (73.0), and far ahead of its predecessor V4-Pro (62.7) and V4-Flash (54.4). On CyberGym it scores 88.1, the highest in the table. On Terminal-Bench 2.1 it reaches 90.6[4].",
      paragraphs: [
        "The DeepSWE jump is the most striking single number: from 54.4 on V4-Flash to 74.2 on V4.1 Flash in roughly six weeks, and from 62.7 on the V4-Pro flagship. DeepSeek frames this as a consequence of the new architecture plus larger-scale agent-task synthesis in post-training[4].",
      ],
      list: [
        "DeepSWE v1.1: 74.2 (Opus 5: 74.0; GPT-5.6 Sol: 73.0)",
        "CyberGym: 88.1 (highest listed)",
        "Terminal-Bench 2.1: 90.6 (highest listed)",
        "AutomationBench: 54.8 (highest listed)",
        "Agent's Last Exam: 31.8 (highest listed)",
        "Codeforces rating: 3471 (highest listed)[4]",
      ],
      note: "These are DeepSeek-run evaluations. TNW and other outlets have not independently verified them[5].",
    },
    {
      num: "03",
      title: "Where V4.1 Flash Still Trails",
      description:
        "The results are not uniformly dominant. Claude Opus 5 leads V4.1 Flash 43.3 to 30.0 on Terminal-Bench 3.0 and 51.8 to 31.2 on Terminal-Bench 4.0. Opus 5 also leads on HLE (56.3 vs 36.8), ProgramBench (37.0 vs 20.3), and NL2Repo-Bench (75.3 vs 64.0)[4][5].",
      paragraphs: [
        "GPT-5.6 Sol leads GPQA Diamond (94.1 vs 90.9) and SEC-Bench Pro (74.3 vs 62.8). The newer, harder Terminal-Bench versions show the clearest gap: V4.1 Flash wins the older TB 2.1 but loses decisively on TB 3.0 and 4.0, suggesting its strength is concentrated in established agentic tasks rather than frontier ones[4][5].",
      ],
      table: {
        headers: ["Benchmark", "V4.1 Flash", "Opus-5.0", "GPT-5.6 Sol"],
        rows: [
          ["Terminal-Bench 3.0", "30.0", "43.3", "34.4"],
          ["Terminal-Bench 4.0", "31.2", "51.8", "39.9"],
          ["HLE", "36.8", "56.3", "44.5"],
          ["ProgramBench", "20.3", "37.0", "23.0"],
          ["NL2Repo-Bench", "64.0", "75.3", "56.8"],
          ["GPQA Diamond", "90.9", "93.4", "94.1"],
          ["SEC-Bench Pro", "62.8", "—", "74.3"],
        ],
      },
      note: "DeepSeek's own table includes these losses, which is a point in favor of reading it directly rather than relying on summary graphics[4].",
    },
    {
      num: "04",
      title: "The Full Frontier Comparison Table",
      description:
        "The official model card compares V4.1 Flash against Claude Opus-5.0, GPT-5.6 Sol, Kimi K3, GLM-5.3, V4-Pro, and V4-Flash across reasoning and agentic categories at max effort[4].",
      table: {
        headers: ["Benchmark", "V4.1 Flash", "Opus-5.0", "GPT-5.6 Sol", "Kimi K3", "GLM-5.3", "V4-Pro", "V4-Flash"],
        rows: [
          ["GPQA Diamond", "90.9", "93.4", "94.1", "92.9", "88.1", "92.4", "89.9"],
          ["HLE", "36.8", "56.3", "44.5", "43.5", "42.0", "42.7", "37.8"],
          ["Codeforces (Rating)", "3471", "—", "—", "—", "3348", "3289", "—"],
          ["MathArena Apex", "65.6", "—", "65.6", "65.6", "—", "65.3", "58.6"],
          ["Terminal-Bench 2.1", "90.6", "89.1", "88.8", "88.3", "88.2", "87.9", "82.7"],
          ["Terminal-Bench 3.0", "30.0", "43.3", "34.4", "17.7", "28.3", "11.8", "7.6"],
          ["Terminal-Bench 4.0", "31.2", "51.8", "39.9", "12.6", "37.9", "12.4", "7.0"],
          ["DeepSWE v1.1", "74.2", "74.0", "73.0", "67.5", "66.9", "62.7", "54.4"],
          ["ProgramBench", "20.3", "37.0", "23.0", "17.5", "19.0", "15.5", "—"],
          ["NL2Repo-Bench", "64.0", "75.3", "56.8", "58.0", "58.0", "61.5", "54.2"],
          ["CyberGym", "88.1", "—", "84.5", "80.0", "84.5", "83.3", "76.7"],
          ["SEC-Bench Pro", "62.8", "—", "74.3", "—", "—", "56.4", "30.9"],
          ["ExploitGym", "15.3", "22.1", "33.7", "—", "15.0", "5.4", "1.8"],
          ["HLE w/ tools", "63.9", "63.6", "—", "59.8", "62.5", "60.0", "51.5"],
          ["AutomationBench", "54.8", "50.3", "45.8", "46.7", "48.8", "43.2", "37.7"],
          ["Agents' Last Exam", "31.8", "28.6", "26.7", "27.6", "28.5", "25.7", "25.2"],
        ],
      },
      note: "Em dashes mark benchmarks not reported for that model in DeepSeek's official table. HLE figures for V4-Pro, V4-Flash, and GLM are text-only subsets[4].",
    },
    {
      num: "05",
      title: "Performance Across Agent Scaffolds",
      description:
        "DeepSeek published a scaffold-sensitivity table showing the same model under Claude Code, Codex, OpenCode, Pi, mini-SWE, and three DeepSeek Harness configurations, using N=8 samples on DeepSWE v1.1 and N=3 on Terminal-Bench 2.1[4].",
      table: {
        headers: ["Scaffold", "DeepSWE v1.1", "Terminal-Bench 2.1"],
        rows: [
          ["DeepSeek Harness Minimal", "74.2", "90.6"],
          ["mini-SWE agent", "72.6", "90.3"],
          ["DeepSeek Harness Standard", "70.5", "85.8"],
          ["Claude Code", "69.8", "88.0"],
          ["DeepSeek Harness PTC", "67.6", "85.8"],
          ["Pi", "66.2", "86.1"],
          ["Codex", "65.6", "84.1"],
          ["OpenCode", "65.5", "85.0"],
        ],
      },
      paragraphs: [
        "The spread is roughly 9 points on DeepSWE and 6 points on TB 2.1 between the best and worst scaffold. That is a reminder that agentic benchmark headlines are partly harness headlines — a point the Harness-focused community has made repeatedly[4].",
      ],
      note: "The official agentic scores use DeepSeek Harness Minimal mode, so they represent the model's ceiling under DeepSeek's own runtime. See [[v4-1-flash-coding-agents|the coding agents guide]] for setup across tools.",
    },
    {
      num: "06",
      title: "Base-Model and Multimodal Scores",
      description:
        "The base model advances world knowledge and code over V4-Flash-Base but trails V4-Pro-Base on several knowledge and long-context items. Multimodal scores are new to the Flash line[4].",
      table: {
        headers: ["Benchmark", "V4.1-Flash-Base", "V4-Pro-Base", "V4-Flash-Base"],
        rows: [
          ["MMLU-Pro", "74.1", "73.5", "68.3"],
          ["AGIEval", "83.4", "84.4", "83.9"],
          ["C-Eval", "92.1", "93.1", "92.1"],
          ["SimpleQA-Verified", "42.3", "55.2", "30.1"],
          ["LongBench-V2", "45.2", "51.5", "44.7"],
          ["BigCodeBench", "60.6", "59.2", "56.8"],
          ["HumanEval", "79.4", "76.8", "69.5"],
          ["GSM8K", "93.0", "92.6", "90.8"],
          ["MATH", "61.1", "64.5", "57.4"],
        ],
      },
      paragraphs: [
        "Multimodal base scores: MMMU-Pro 56.5, CVBench 77.9, DocVQA 95.6, and RefCOCO-avg 86.0. V4.1 Flash trained from scratch on a 45T-token multimodal corpus, with sparse attention trained at 64K sequence length and context extended to 1M[4].",
      ],
      note: "Base-model comparisons use the same internal framework; scores within 0.3 are treated as equivalent by DeepSeek[4].",
    },
    {
      num: "07",
      title: "The Reasoning-Effort Cost Caveat",
      description:
        "The published table uses maximum effort, which is not the economical setting. DeepSeek's own tests show that increasing effort from 25 to 100 raises DeepSWE v1.1 from 66.0 to 74.2 and Terminal-Bench 2.1 from 82.4 to 90.6 — but consumes roughly 2.5x as many output tokens[5].",
      table: {
        headers: ["Reasoning effort", "DeepSWE v1.1", "Terminal-Bench 2.1", "Relative output tokens"],
        rows: [
          ["25", "66.0", "82.4", "1.0x"],
          ["60-80", "most of the gain", "most of the gain", "< 1.25x"],
          ["100 (leaderboard)", "74.2", "90.6", "~2.5x"],
        ],
      },
      paragraphs: [
        "DeepSeek says the gains are front-loaded: effort levels between 60 and 80 recover most of the maximum-effort accuracy at less than half the token budget, while the final step to 100 makes agent trajectories 1.6-1.8x longer for comparatively small gains. A team optimizing cost per successful task may find the best operating point away from max[5].",
      ],
      note: "The API exposes presets low/high/max and accepts integers from 1 to 100. See [[v4-1-flash-reasoning-effort|the reasoning effort guide]].",
    },
    {
      num: "08",
      title: "How to Read Vendor Benchmarks",
      description:
        "Every number in this guide comes from DeepSeek's own model card and news post. Independent verification is still pending, and the agentic results depend on the harness, effort level, context limit, and scaffold used[4][5].",
      paragraphs: [
        "The practical takeaway for builders is to test the model on your own workload shape. VentureBeat noted that V4.1 Flash is best suited to input-heavy, repetitive, cacheable workloads that exploit its 8B prefill path and smaller KV cache — and that a model footprint that nearly doubled makes self-hosting harder even as API serving gets cheaper[5].",
      ],
      list: [
        "Vendor scores use max effort — your cost/quality point may differ.",
        "Agentic scores are harness-dependent; test your own scaffold.",
        "Prefer cost per completed task over benchmark position[5]",
      ],
      note: "For pricing at each effort level, see [[v4-1-flash-pricing|the pricing guide]].",
    },
  ],
  prevGuide: {
    title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates",
    slug: "v4-1-flash-pricing",
  },
  nextGuide: {
    title: "DeepSeek V4.1 Flash API Setup: deepseek-flash & Migration",
    slug: "v4-1-flash-api-setup",
  },
  relatedGuides: [
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "V4.1 Flash vs Opus 5: DeepSWE, CyberGym & Cost", slug: "v4-1-flash-vs-opus-5" },
    { title: "V4.1 Flash vs Kimi K3: The Open-Weight Duel", slug: "v4-1-flash-vs-kimi-k3" },
    { title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash", slug: "deepseek-v4-pro-retired" },
  ],
  sources: [
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "The Next Web: V4.1-Flash Benchmarks and V4-Pro Retirement", url: "https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut" },
    { label: "VentureBeat: V4.1-Flash Benchmark and Cost Analysis", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
  ],
};

import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash 1017 benchmark
// 事实来源：reference/topics/29-v4-1-flash-1017.md（HF 1017 模型卡官方全表 + delta）
export const v41Flash1017Benchmarks: GuideContent = {
  slug: "v4-1-flash-1017-benchmarks",
  category: "BENCHMARKS",
  title: "DeepSeek V4.1-Flash-1017 Benchmarks: 77.0 DeepSWE",
  seoTitle: "DeepSeek V4.1 Flash 1017 Benchmarks",
  readTime: "9 MIN READ",
  updatedAt: "OCT 18, 2026",
  summary:
    "DeepSeek V4.1-Flash-1017's full official benchmark table: DeepSWE v1.1 77.0, Terminal-Bench 4.0 42.3, and all 11 scores that rose over the September build.",
  notice:
    "DeepSeek V4.1-Flash-1017 shipped on Oct 17, 2026 as a post-training refresh of the same architecture. Every score below is vendor-reported from DeepSeek's own model card; no independent harness had published a 1017 run at the time of writing[1][6].",
  toc: [
    { id: "step-1", label: "Step 1: How the 1017 Numbers Were Measured" },
    { id: "step-2", label: "Step 2: The Headline: DeepSWE v1.1 at 77.0" },
    { id: "step-3", label: "Step 3: The Biggest Jumps: TB 4.0 and ProgramBench" },
    { id: "step-4", label: "Step 4: Reasoning and Agentic Deltas" },
    { id: "step-5", label: "Step 5: Multimodal, Long-Context and Repo Rows" },
    { id: "step-6", label: "Step 6: The Full 1017 Delta Table" },
    { id: "step-7", label: "Step 7: The Cross-Vendor Table" },
    { id: "step-8", label: "Step 8: Where 1017 Still Trails Opus 5" },
    { id: "step-9", label: "Step 9: How to Read These Numbers" },
  ],
  steps: [
    {
      num: "01",
      title: "How the 1017 Numbers Were Measured",
      description:
        "DeepSeek published the 1017 table on the Hugging Face model card alongside its official release notes. Two harness choices matter: Terminal-Bench 4.0 was run with the Claude Code harness, and DeepSWE v1.1 was run with the Mini-SWE-V2 harness[1][3]. Every agentic figure is therefore a model-plus-scaffold score, not a bare model score.",
      paragraphs: [
        "The September V4.1 Flash card was measured the same way for the shared benchmarks, which is what makes the deltas in this guide meaningful. DeepSeek also notes that 1017 is a post-training checkpoint only: architecture, parameter count, context window and price are unchanged, so any score movement comes from training rather than from a bigger or faster model[1][2].",
        "That framing is worth holding on to. A reader who expects a new architecture to explain a double-digit jump will look in the wrong place. The movement here follows from reinforcement learning with self-feedback aimed at end-to-end task completion, plus longer agent trajectories, not from a wider network or a larger KV budget[1][4].",
      ],
      note: "This site has not independently verified any 1017 number. Independent evaluations from third-party harnesses were still pending at publication[1][6].",
    },
    {
      num: "02",
      title: "The Headline: DeepSWE v1.1 at 77.0",
      description:
        "DeepSWE v1.1 is the number DeepSeek led with: 77.0, up 2.8 points from the September build's 74.2, and above Claude Opus 5's 74.0[1][4]. It is the single most-quoted figure in coverage of the release[4].",
      paragraphs: [
        "DeepSWE v1.1 is DeepSeek's own software-engineering agent benchmark, and it was run under the Mini-SWE-V2 harness. Read that caveat carefully: 77.0 is the score of the model inside that scaffold, and the same model under a different scaffold can move several points, as the September card's multi-scaffold table showed[1].",
        "Still, the direction is unambiguous across the whole table. DeepSWE is not an isolated win — it is one of eleven benchmarks that all improved, with the smallest gain at 2.0 points and the largest at 11.1[1].",
      ],
      list: [
        "DeepSWE v1.1: 77.0 (September build: 74.2; delta +2.8)",
        "Claude Opus 5 on the same row: 74.0",
        "Kimi K3: 67.5; GLM-5.3: 66.9; GPT-5.6 Sol: 73.0[1]",
      ],
      note: "For the head-to-head framing, see [[v4-1-flash-vs-opus-5|the V4.1 Flash vs Opus 5 comparison]].",
    },
    {
      num: "03",
      title: "The Biggest Jumps: Terminal-Bench 4.0 and ProgramBench",
      description:
        "The largest moves are on the newest, hardest agentic tasks. Terminal-Bench 4.0 rose 11.1 points, from 31.2 to 42.3. ProgramBench rose 8.8 points, from 20.3 to 29.1[1]. Both are long-horizon, multi-step benchmarks where the September model struggled badly.",
      paragraphs: [
        "Terminal-Bench 4.0 was evaluated with the Claude Code harness, which DeepSeek calls out explicitly on the model card[1]. A gain of this size on a terminal-agent benchmark is consistent with the stated training change: teaching the model to finish a project rather than to answer a single turn well[3].",
        "ProgramBench moved from 20.3 to 29.1, still below Opus 5's 37.0 but now comfortably ahead of Kimi K3 (17.5) and GLM-5.3 (19.0)[1]. The pattern across both rows is that 1017 narrowed the gap to the closed flagship without closing it.",
      ],
      table: {
        headers: ["Benchmark", "1017", "Sept 2026", "Delta"],
        rows: [
          ["Terminal-Bench 4.0", "42.3", "31.2", "+11.1"],
          ["ProgramBench", "29.1", "20.3", "+8.8"],
          ["Apex Bench v1.1", "72.1", "64.6", "+7.5"],
          ["HLE (w/o tools)", "42.6", "36.8", "+5.8"],
          ["Automation-Bench v1.0.6", "60.5", "54.8", "+5.7"],
        ],
      },
      note: "Agentic rows depend on the harness as much as the model. A different scaffold will not reproduce these numbers exactly[1].",
    },
    {
      num: "04",
      title: "Reasoning and Agentic Deltas",
      description:
        "Beyond the coding rows, 1017 improved on reasoning and agent-behaviour tests. HLE without tools moved from 36.8 to 42.6, with the text-only subset at 44.0. Apex Bench v1.1 rose 7.5 points to 72.1, the highest value in the table. Automation-Bench v1.0.6 reached 60.5 and Agents' Last Exam 35.4[1].",
      paragraphs: [
        "HLE remains 1017's weakest relative showing: Opus 5 posts 56.3 on the same row, a 13.7-point gap that no amount of delta closes[1]. DeepSeek's own table includes the loss, which is a point in favour of reading the card directly rather than a summary graphic.",
        "Apex Bench v1.1 is the counter-example. At 72.1 it is first in DeepSeek's table, ahead of Opus 5 (65.8), GLM-5.3 (56.6) and Kimi K3 (47.8)[1]. Automation-Bench v1.0.6 at 60.5 and Agents' Last Exam at 35.4 are likewise table-leading, which is why the vendor's own framing is that 1017 wins on agentic execution even where it loses on closed-book knowledge.",
      ],
      list: [
        "HLE w/o tools: 42.6 (44.0 text-only subset; Opus 5: 56.3)",
        "Apex Bench v1.1: 72.1 (first in table)",
        "Automation-Bench v1.0.6: 60.5 (first in table)",
        "Agents' Last Exam: 35.4 (first in table)[1]",
      ],
    },
    {
      num: "05",
      title: "Multimodal, Long-Context and Repo Rows",
      description:
        "The multimodal and repository rows also moved. Chartography with tools rose to 83.0 from 78.9, BabyVision with tools to 92.5 from 89.6, and ZeroBench-main with tools to 51.0 from 49.0. NL2Repo-Bench reached 68.2 from 65.4[1].",
      paragraphs: [
        "Opus 5 still leads Chartography (84.0 to 83.0), BabyVision (94.1 to 92.5) and NL2Repo-Bench (75.3 to 68.2), while GPT-5.6 Sol leads ZeroBench-main (53.0 to 51.0)[1]. These are the rows where the September gap has narrowed but not flipped.",
        "NL2Repo-Bench is the one to watch if you generate repositories from natural-language specs: a 2.8-point gain leaves 1017 seven points behind Opus 5, so the practical recommendation is still to escalate specification-heavy generation work to a stronger model when correctness matters more than cost[1].",
      ],
      table: {
        headers: ["Benchmark", "1017", "Sept 2026", "Delta", "Leader"],
        rows: [
          ["Chartography (w/tools)", "83.0", "78.9", "+4.1", "Opus 5: 84.0"],
          ["BabyVision (w/tools)", "92.5", "89.6", "+2.9", "Opus 5: 94.1"],
          ["ZeroBench-main (w/tools)", "51.0", "49.0", "+2.0", "GPT-5.6 Sol: 53.0"],
          ["NL2Repo-Bench", "68.2", "65.4", "+2.8", "Opus 5: 75.3"],
        ],
      },
    },
    {
      num: "06",
      title: "The Full 1017 Delta Table",
      description:
        "All eleven benchmarks DeepSeek reported for 1017 improved over the September build. The smallest gain is 2.0 points on ZeroBench-main; the largest is 11.1 on Terminal-Bench 4.0[1].",
      table: {
        headers: ["Benchmark", "1017", "Sept 2026", "Delta"],
        rows: [
          ["DeepSWE v1.1", "77.0", "74.2", "+2.8"],
          ["Terminal-Bench 4.0", "42.3", "31.2", "+11.1"],
          ["ProgramBench", "29.1", "20.3", "+8.8"],
          ["Apex Bench v1.1", "72.1", "64.6", "+7.5"],
          ["HLE w/o tools", "42.6", "36.8", "+5.8"],
          ["Automation-Bench v1.0.6", "60.5", "54.8", "+5.7"],
          ["Chartography (w/tools)", "83.0", "78.9", "+4.1"],
          ["Agents' Last Exam", "35.4", "31.8", "+3.6"],
          ["BabyVision (w/tools)", "92.5", "89.6", "+2.9"],
          ["NL2Repo-Bench", "68.2", "65.4", "+2.8"],
          ["ZeroBench-main (w/tools)", "51.0", "49.0", "+2.0"],
        ],
      },
      paragraphs: [
        "A uniform, eleven-for-eleven improvement is unusual, and it is exactly why the first wave of Hacker News comments questioned it. Reviewers pointed out that a checkpoint described as a minor update had moved every single headline number upward, and several said they would wait for an independent harness before treating the deltas as real[6].",
        "The honest reading is neither blind acceptance nor dismissal. Eleven consistent gains are plausible for a post-training refresh tuned against the same evaluation family; they are also exactly what you would expect if the tuning and the tests share assumptions. Until a third party runs 1017 on the same tasks, treat the deltas as directional evidence rather than settled fact[1][6].",
      ],
      note: "See [[v4-1-flash-1017-vs-v4-1-flash|what changed between 1017 and the September build]] for the non-benchmark differences.",
    },
    {
      num: "07",
      title: "The Cross-Vendor Table",
      description:
        "The 1017 card places DeepSeek's model beside Kimi K3, GLM-5.3, GPT-5.6 Sol and Claude Opus 5 on the same eleven rows[1]. The comparison is vendor-assembled: DeepSeek chose the benchmarks, ran the numbers and published the table.",
      table: {
        headers: ["Benchmark", "1017", "Kimi K3", "GLM-5.3", "GPT-5.6 Sol", "Opus 5"],
        rows: [
          ["HLE w/o tools", "42.6", "43.5", "42.0", "44.5", "56.3"],
          ["Terminal-Bench 4.0", "42.3", "12.6", "37.9", "39.9", "51.8"],
          ["DeepSWE v1.1", "77.0", "67.5", "66.9", "73.0", "74.0"],
          ["ProgramBench", "29.1", "17.5", "19.0", "23.0", "37.0"],
          ["NL2Repo-Bench", "68.2", "58.0", "58.0", "56.8", "75.3"],
          ["Automation-Bench v1.0.6", "60.5", "46.7", "48.8", "45.8", "50.3"],
          ["Agents' Last Exam", "35.4", "27.6", "28.5", "26.7", "28.6"],
          ["Apex Bench v1.1", "72.1", "47.8", "56.6", "54.3", "65.8"],
          ["Chartography (w/tools)", "83.0", "68.1", "—", "79.9", "84.0"],
          ["BabyVision (w/tools)", "92.5", "85.7", "—", "88.9", "94.1"],
          ["ZeroBench-main (w/tools)", "51.0", "41.0", "—", "53.0", "52.0"],
        ],
      },
      paragraphs: [
        "Against the other open-weight models, 1017 wins every row except HLE, where Kimi K3 leads 43.5 to 42.6. Against GPT-5.6 Sol it wins nine of eleven, losing only HLE and ZeroBench-main. Against Opus 5 it wins four rows — DeepSWE, Automation-Bench, Agents' Last Exam and Apex — and loses the rest[1].",
        "The em dashes mark benchmarks GLM-5.3 did not report. As with any vendor table, the choice of rows matters: the four rows 1017 leads are the agentic ones, while the rows it loses are the closed-book reasoning and the hardest repository tasks[1].",
      ],
      note: "HLE figures for GLM-5.3 are the text-only subset; dashes mark rows a model did not report[1].",
    },
    {
      num: "08",
      title: "Where 1017 Still Trails Opus 5",
      description:
        "Four rows still favour Opus 5, and the gaps are not small: HLE 56.3 to 42.6, Terminal-Bench 4.0 51.8 to 42.3, ProgramBench 37.0 to 29.1 and NL2Repo-Bench 75.3 to 68.2[1]. Anyone who reads only the DeepSWE headline will overestimate how close the two models are.",
      paragraphs: [
        "There is a second caveat that matters more than any single row. DeepSeek's comparison table does not include Anthropic's or OpenAI's current-generation flagships — the Opus 5.5 and GPT-6 tier is absent. So the widely repeated claim that 1017 beats Opus 5 is true against the model in the table, and says nothing about whether it beats the current frontier[1].",
        "Combine that with the harness caveat and the picture is clear: 1017 is a strong, cheap, open-weight agent model that has closed much of the gap to a previous-generation closed flagship. It is not evidence that the frontier has changed hands[1][6].",
      ],
      list: [
        "HLE: Opus 5 leads 56.3 to 42.6 (-13.7)",
        "Terminal-Bench 4.0: Opus 5 leads 51.8 to 42.3 (-9.5)",
        "ProgramBench: Opus 5 leads 37.0 to 29.1 (-7.9)",
        "NL2Repo-Bench: Opus 5 leads 75.3 to 68.2 (-6.9)[1]",
      ],
      note: "For the price side of the same comparison, see [[v4-1-flash-vs-opus-5|the Opus 5 comparison]].",
    },
    {
      num: "09",
      title: "How to Read These Numbers",
      description:
        "Three checks separate a useful reading of this table from a marketing one. First, every figure is vendor-reported from DeepSeek's own model card[1]. Second, the agentic rows are model-plus-harness scores: Terminal-Bench 4.0 used the Claude Code harness and DeepSWE v1.1 used the Mini-SWE-V2 harness[1]. Third, the comparison set sits a generation behind the current frontier[1].",
      paragraphs: [
        "The practical conclusion for builders is the same as it was for the September build, only stronger. If your workload is input-heavy, repetitive and cacheable, 1017 is the same price with shorter outputs and better task completion, which lowers cost per finished task even though the per-token rate did not move[2][5]. If your workload depends on closed-book reasoning or on generating whole repositories from a spec, the four Opus 5 rows above are the ones to weigh before switching.",
        "Test the model on your own task shape before trusting any single number here. Run a small set of real tasks through your own scaffold, measure cost per successful completion, and compare it with whatever you run today. The deltas in this guide tell you which way the model moved; they do not tell you where your break-even sits.",
      ],
      list: [
        "Vendor-reported: no independent 1017 run had been published at the time of writing[1][6]",
        "Harness-dependent: Claude Code for TB 4.0, Mini-SWE-V2 for DeepSWE v1.1[1]",
        "Previous-generation comparison: no Opus 5.5 or GPT-6 rows[1]",
        "Same price, shorter output: verify cost per task, not per token[2][5]",
      ],
      note: "Start with [[deepseek-v4-1-flash-1017|what the 1017 snapshot is]], then read [[v4-1-flash-benchmarks|the September benchmark table]] and [[deepseek-v4-1-pro|the V4.1 Pro tier]] for context.",
    },
  ],
  prevGuide: {
    title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table",
    slug: "v4-1-flash-benchmarks",
  },
  nextGuide: {
    title: "V4.1 Flash vs Opus 5: DeepSWE & the Cost Gap",
    slug: "v4-1-flash-vs-opus-5",
  },
  relatedGuides: [
    { title: "What Is DeepSeek V4.1-Flash-1017? The 1017 Snapshot", slug: "deepseek-v4-1-flash-1017" },
    { title: "1017 vs the September V4.1 Flash: What Changed", slug: "v4-1-flash-1017-vs-v4-1-flash" },
    { title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table", slug: "v4-1-flash-benchmarks" },
    { title: "V4.1 Flash vs Opus 5: DeepSWE & the Cost Gap", slug: "v4-1-flash-vs-opus-5" },
    { title: "DeepSeek V4.1 Pro: The Flagship Tier Explained", slug: "deepseek-v4-1-pro" },
  ],
  sources: [
    { label: "Hugging Face: DeepSeek-V4.1-Flash-1017 Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017" },
    { label: "DeepSeek API Changelog (Oct 17, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek-V4.1-Flash-1017 Release Notes (Official)", url: "https://api-docs.deepseek.com/news/news261017/" },
    { label: "MarkTechPost: V4.1-Flash-1017 Scores 77.0 on DeepSWE", url: "https://www.marktechpost.com/2026/10/17/deepseek-just-released-v4-1-flash-1017-scores-77-0-on-deepswe-opens-search-api/" },
    { label: "Developers Digest: V4.1-Flash-1017 Release Guide", url: "https://www.developersdigest.tech/blog/deepseek-v4-1-flash-1017-release-guide-2026" },
    { label: "Hacker News: DeepSeek V4.1-Flash-1017 Discussion", url: "https://news.ycombinator.com/item?id=50129045" },
  ],
};

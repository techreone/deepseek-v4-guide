import type { GuideContent } from "./types";

// target keyword: deepseek v4 flash benchmark
export const flashBenchmarks: GuideContent = {
  slug: "flash-benchmarks",
  category: "BENCHMARKS",
  title: "DeepSeek V4 Flash Benchmarks: Agentic & Coding Scores in 2026",
  seoTitle: "DeepSeek V4 Flash Benchmarks: 2026 Scores",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek V4 Flash benchmark scores: Terminal-Bench 2.1 hits 82.7, DeepSWE 54.4, AA Intelligence Index 50. Full 2026 agentic comparison.",
  toc: [
    { id: "step-1", label: "Step 1: Read the Official 0731 Agentic Benchmark Table" },
    { id: "step-2", label: "Step 2: Compare 0731 Against Flash Preview & V4 Pro Preview" },
    { id: "step-3", label: "Step 3: Check Third-Party Scores vs GLM-5.2, Opus-4.8 & Kimi K3" },
    { id: "step-4", label: "Step 4: Understand Artificial Analysis's Independent Test (Index 50)" },
    { id: "step-5", label: "Step 5: Treat Official Scores with Caution (Vendor-Reported Numbers)" },
    { id: "step-6", label: "Step 6: Run Your Own DeepSeek V4 Flash Benchmarks" },
    { id: "step-7", label: "Step 7: Use the Benchmarks to Choose Flash vs Pro" },
  ],
  steps: [
    {
      num: "01",
      title: "Read the Official 0731 Agentic Benchmark Table",
      description:
        "On July 31, 2026, DeepSeek pushed [[deepseek-v4-flash|DeepSeek-V4-Flash-0731]] to public beta on the official API. The changelog published a full agentic and coding benchmark table, and the budget model beat its own flagship V4-Pro-Preview on all nine published agent benchmarks.[1] These are the headline deepseek v4 flash benchmark numbers for 2026.",
      paragraphs: [
        "The 0731 release is not a new model. DeepSeek states that DeepSeek-V4-Flash-0731 keeps the same model architecture and size as DeepSeek-V4-Flash-Preview: [[flash-model-size|284B total parameters]] with 13B active in a Mixture-of-Experts setup, and a 1M token context window.[2] Only the post-training was redone. The upgrade applies to the Flash API only; the V4-Pro API and the APP/WEB models are unchanged.",
        "The suite spans terminal-based agent tasks (Terminal-Bench), software engineering (DeepSWE), tool use (Toolathlon), cybersecurity (Cybergym), repository generation (NL2Repo), and full-stack app building (DSBench).",
      ],
      table: {
        headers: ["Agentic / Coding Benchmark", "V4 Flash 0731", "V4-Pro-Preview", "Flash Preview"],
        rows: [
          ["Terminal-Bench 2.1", "82.7", "72.1", "61.8"],
          ["DeepSWE", "54.4", "—", "7.3"],
          ["Toolathlon (verified)", "70.3", "—", "—"],
          ["Cybergym", "76.7", "—", "—"],
          ["NL2Repo", "54.2", "—", "—"],
          ["Agent Last Exam", "25.2", "—", "—"],
          ["Automation Bench (Public)", "25.1", "—", "—"],
          ["DSBench-FullStack (internal)", "68.7", "—", "37.0"],
          ["DSBench-Hard (internal)", "59.6", "—", "—"],
        ],
      },
      note: "All official agent scores are vendor figures. DeepSeek measured them with its own DeepSeek Harness, which is not yet open-sourced.",
    },
    {
      num: "02",
      title: "Compare 0731 Against Flash Preview & V4 Pro Preview",
      description:
        "The same architecture, re-trained. That is the whole story of 0731. Every gain in the table comes from re-running post-training on the 284B/13B model, not from a bigger model or a longer context.",
      paragraphs: [
        "The most dramatic jump is DeepSWE, which rose from 7.3 on the April preview to 54.4, a 645% improvement on the same model. DSBench-FullStack nearly doubled from 37.0 to 68.7, and Terminal-Bench 2.1 went from 61.8 to 82.7. Flash 0731 also trails Opus-4.8 by just 0.5 on Agent Last Exam (25.2 vs 25.7).",
        "DeepSeek is explicit that this update only upgrades the DeepSeek-V4-Flash API. The V4-Pro API and the APP/WEB models stay on the preview build until the official V4-Pro release, which the changelog says will follow soon.",
      ],
      list: [
        "Terminal-Bench 2.1: 82.7 (Flash 0731) vs 72.1 (V4-Pro-Preview) vs 61.8 (Flash Preview).",
        "DeepSWE: 54.4 vs 7.3 preview, +645% from post-training alone.",
        "Agent Last Exam: 25.2, just 0.5 behind Opus-4.8's 25.7.",
        "The old deepseek-chat and deepseek-reasoner aliases retired on July 24, 2026; call the model directly now.",
      ],
      code: `{
  "model": "deepseek-v4-flash",
  "messages": [
    { "role": "user", "content": "Refactor this repo and run the full test suite." }
  ],
  "thinking": { "type": "enabled" },
  "reasoning_effort": "max",
  "temperature": 1.0,
  "top_p": 0.95
}`,
      note: "Setting model to \"deepseek-v4-flash\" always points to the latest official build, so the same request body now hits 0731.",
    },
    {
      num: "03",
      title: "Check Third-Party Scores vs GLM-5.2, Opus-4.8 & Kimi K3",
      description:
        "DeepSeek's 0731 model card publishes the same agent benchmarks for competing frontier models. On three of four shared benchmarks, Flash 0731 beats GLM-5.2 and stays within a few points of Anthropic's Opus-4.8.",
      table: {
        headers: ["Benchmark", "V4 Flash 0731", "GLM-5.2", "Opus-4.8"],
        rows: [
          ["Terminal-Bench 2.1", "82.7", "81.0", "85.0"],
          ["DeepSWE", "54.4", "46.2", "58.0"],
          ["Agent Last Exam", "25.2", "23.8", "25.7"],
          ["DSBench-FullStack", "68.7", "61.8", "71.6"],
        ],
      },
      paragraphs: [
        "Flash 0731's 82.7 on Terminal-Bench 2.1 also clears Kimi K3's 76.1 at release, which came about two weeks earlier. DeepSeek's model card describes the 0731 build as broadly competitive with the strongest proprietary models available.",
        "Keep one caveat in mind: these competitor numbers come from the same vendor-reported table. Treat them as directional, not as independently audited results.",
      ],
    },
    {
      num: "04",
      title: "Understand Artificial Analysis's Independent Test (Index 50)",
      description:
        "Artificial Analysis ran its own evaluation on July 31, 2026, without DeepSeek's harness. The V4 Flash 0731 (Reasoning, Max Effort) scored an AA Intelligence Index of 50, 10 points above the April Flash and 6 points above V4 Pro at non-Max effort.[3]",
      table: {
        headers: ["Metric", "V4 Flash 0731 (Max)", "Reference"],
        rows: [
          [
            "AA Intelligence Index",
            "50",
            "Old Flash 40 (+10); V4 Pro (non-Max) 44 (+6); GPT-5.6 Luna 51; GLM-5.2 51; Kimi K3 57",
          ],
          [
            "GDPval-AA v2 (Elo)",
            "1559",
            "Previous 1189; open-weights #2 behind Kimi K3 (1687) and ahead of GLM-5.2 (1510)",
          ],
          ["Terminal-Bench 2.1 (AA self-run)", "79%", "Official self-report: 82.7"],
          ["AA-Omniscience Index", "-16", "Previous -23; hallucination rate fell to 84%"],
          ["Reasoning output tokens", "~206M", "Previous ~234M (-12%)"],
        ],
      },
      paragraphs: [
        "AA's own Terminal-Bench 2.1 run scored 79% against DeepSeek's self-reported 82.7, a roughly four-point vendor-to-third-party gap. Its GDPval-AA v2 Elo of 1559 makes Flash the second-best open-weights model on that ranking, behind Kimi K3's 1687 and ahead of GLM-5.2's 1510.",
        "The intelligence gain came with less verbosity. Flash used about 206M output tokens on AA's test, down from about 234M on the April preview, and its Omniscience Index improved from -23 to -16 as the hallucination rate dropped to 84% while accuracy stayed at 37%. AA also measured cost per task roughly 60% lower than GPT-5.6 Luna (max) on the official first-tier API.",
      ],
    },
    {
      num: "05",
      title: "Treat Official Scores with Caution (Vendor-Reported Numbers)",
      description:
        "Every official agent score on this page is a vendor figure. DeepSeek runs these benchmarks with its own DeepSeek Harness in minimal mode, which has not been released. Until the harness is open-sourced, no third party can reproduce the official numbers, and independent tests already show a gap.",
      list: [
        "Official test settings: max effort, top_p=0.95, temperature=1.0.",
        "DSBench-FullStack and DSBench-Hard are internal test sets.",
        "AA's independent Terminal-Bench 2.1 run: 79% vs official 82.7.",
        "The April model card's Terminal-Bench 2.0 (Flash Max 56.9) and the 0731 changelog's Terminal-Bench 2.1 (82.7) are different versions, harnesses, and effort levels, and cannot be compared directly.",
        "On r/LocalLLaMA, a common reaction was: numbers are good, but they have to actually exist outside of a lab.",
      ],
      note: "Reference point for possible overstatement: an independent DeepSWE re-test of V4 Pro measured pass@1 at just 8%, versus GPT-5.5 at 70% and Opus 4.7 at 54%. Vendor harnesses can inflate scores.",
    },
    {
      num: "06",
      title: "Run Your Own DeepSeek V4 Flash Benchmarks",
      description:
        "You do not have to wait for the harness to see how Flash 0731 behaves. Point your eval harness at the public API, or deploy the open checkpoint locally with vLLM, and run standard agentic and coding evals yourself.",
      paragraphs: [
        "DeepSeek recommends agentic sampling parameters of temperature=1.0 and top_p=0.95 with reasoning effort at max, and at max effort it suggests keeping at least a 384K context window available. The request body in Step 2 shows the exact API shape: model deepseek-v4-flash at https://api.deepseek.com.",
        "For the exact official agent benchmarks you would still need DeepSeek Harness once it is open-sourced. Until then, standard evals give a solid baseline, for example SWE-bench Verified at 79.0 for Flash Max on the April preview model card. For full control, the 0731 checkpoint is MIT-licensed on [[flash-huggingface|Hugging Face]], and the official model card ships a vLLM launch command for a 4x GB300 node with DSpark speculative decoding.",
      ],
      code: `vllm serve deepseek-ai/DeepSeek-V4-Flash-0731 --trust-remote-code --kv-cache-dtype fp8 --block-size 256 --data-parallel-size 4 --enable-expert-parallel --moe-backend deep_gemm_mega_moe --attention-config '{"use_fp4_indexer_cache": true}' --speculative-config '{"method":"dspark","num_speculative_tokens":7,"draft_sample_method":"greedy"}'`,
      note: "Budget eval tokens: running Flash at Max effort consumed about 206M output tokens on Artificial Analysis's Intelligence Index. Cap your runs accordingly.",
    },
    {
      num: "07",
      title: "Use the Benchmarks to Choose Flash vs Pro",
      description:
        "The 0731 benchmarks make Flash the default for high-volume agent work, but the scores are one input among several. Pair them with [[flash-pricing|pricing]], concurrency, and your workload before you pick.",
      list: [
        "Official price: $0.14 per 1M input and $0.28 per 1M output; cache hits drop input to $0.0028, about a 98% discount.",
        "Output price is roughly one-third of V4-Pro's $0.87.",
        "Flash concurrency limit: 2,500 vs Pro's 500.",
        "Flash enables thinking by default, and thinking tokens bill at output price, so real agent costs run above the surface rate.",
      ],
      paragraphs: [
        "Flash 0731 beats V4-Pro-Preview on all nine published agent benchmarks, but Pro's official release will follow soon, and its Max-mode Intelligence Index measured 52 at launch, second among open-weights models. For deep reasoning on long, complex agent chains, [[v4-pro|Pro]] remains the top pick. For high-volume, price-sensitive tasks, Flash's benchmark gains at one-third the output price are hard to beat.",
      ],
      note: "Artificial Analysis measured Flash's cost per task about 60% lower than GPT-5.6 Luna (max) on the official first-tier API.",
    },
  ],
  prevGuide: {
    title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%",
    slug: "flash-pricing",
  },
  nextGuide: {
    title: "Use DeepSeek V4 Flash with OpenCode: Step-by-Step",
    slug: "flash-opencode",
  },
  relatedGuides: [
    { title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release", slug: "deepseek-v4-flash" },
    { title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%", slug: "flash-pricing" },
    { title: "DeepSeek V4 Pro: Specs, Pricing & Release Date (2026)", slug: "v4-pro" },
    { title: "Use DeepSeek V4 Flash with OpenCode: Step-by-Step", slug: "flash-opencode" },
  ],
  sources: [
    { label: "Official DeepSeek API Changelog (0731 Release & Agent Benchmarks)", url: "https://api-docs.deepseek.com/updates/" },
    { label: "DeepSeek V4 Flash Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash" },
    { label: "Artificial Analysis: V4 Flash 0731 Scores 50 on the Intelligence Index", url: "https://artificialanalysis.ai/articles/deepseek-v4-flash-0731-scores-50-on-the-artificial-analysis-intelligence-index-10-points-above-previous-deepseek-v4-flash" },
    { label: "TechTimes: DeepSeek Retrained V4 Flash Beats Its Flagship Pro on Nine Agent Benchmarks", url: "https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm" },
    { label: "MarkTechPost: DeepSeek Upgrades DeepSeek V4 Flash 0731 with Major Agentic and Coding Gains", url: "https://www.marktechpost.com/2026/07/31/deepseek-upgrades-deepseek-v4-flash-0731-with-major-agentic-and-coding-gains/" },
    { label: "Artificial Analysis: DeepSeek V4 Flash Model Page", url: "https://artificialanalysis.ai/models/deepseek-v4-flash" },
  ],
};

import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash vs kimi k3
// 内容来源：reference/topics/27-v4-1-flash.md、competitors/chat-deep/pages/kimi.md（K3 定价为 Moonshot 公开标价）
export const v41FlashVsKimiK3: GuideContent = {
  slug: "v4-1-flash-vs-kimi-k3",
  category: "COMPARISON",
  title: "DeepSeek V4.1 Flash vs Kimi K3: The Open-Weight Duel",
  seoTitle: "V4.1 Flash vs Kimi K3: Open-Weight Duel",
  readTime: "9 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "DeepSeek V4.1 Flash vs Kimi K3: GPQA 90.9 vs 92.9, HLE 36.8 vs 43.5, DeepSWE 74.2 vs 67.5, and API pricing of $0.15/$0.60 vs $3/$15.",
  toc: [
    { id: "step-1", label: "Step 1: Two Open-Weight Frontier Models" },
    { id: "step-2", label: "Step 2: GPQA Diamond — 90.9 vs 92.9" },
    { id: "step-3", label: "Step 3: HLE — 36.8 vs 43.5" },
    { id: "step-4", label: "Step 4: Terminal-Bench 2.1 — 90.6 vs 88.3" },
    { id: "step-5", label: "Step 5: DeepSWE & CyberGym Gap" },
    { id: "step-6", label: "Step 6: Price — $0.15/$0.60 vs $3/$15" },
    { id: "step-7", label: "Step 7: Licenses — MIT vs a Bespoke K3 License" },
    { id: "step-8", label: "Step 8: Market Impact & How to Choose" },
  ],
  steps: [
    {
      num: "01",
      title: "Two Open-Weight Frontier Models",
      description:
        "Kimi K3 and DeepSeek V4.1 Flash are both open-weight frontier models with 1M-token contexts, native multimodality, and agent-oriented APIs — but they are built to different scales. K3 is a 2.8-trillion-parameter MoE with 104B active parameters; V4.1 Flash is a 552B backbone with 8B prefill and 16B decode activation[4][5].",
      paragraphs: [
        "K3's differentiator is always-on deep reasoning plus native image and video understanding, wrapped in a bespoke license. V4.1 Flash's is extreme inference efficiency: a Causal Encoder-Decoder core, an Engram memory, and an 890-byte-per-token KV cache that lets DeepSeek charge a fraction of K3's rates[2][4][5].",
        "Both are credible frontier options, which is exactly why the comparison is interesting. It is no longer a case of a small open model against a giant one — it is two very large models with sharply different cost and licensing trade-offs[4][5].",
      ],
      table: {
        headers: ["Dimension", "DeepSeek V4.1 Flash", "Kimi K3"],
        rows: [
          ["Parameters", "552B MoE (+196B Engram)", "2.8T MoE"],
          ["Active per token", "8B prefill / 16B decode", "104B"],
          ["Context window", "1M tokens", "1M tokens"],
          ["Multimodal input", "Images (native)", "Images + video (native)"],
          ["Reasoning mode", "Continuous effort 1-100", "Always-on thinking"],
          ["License", "MIT", "Bespoke K3 license"],
        ],
      },
      note: "Specifications are from DeepSeek's model card and the K3 comparison documentation; verify the K3 license terms for commercial use[4][5].",
    },
    {
      num: "02",
      title: "GPQA Diamond — 90.9 vs 92.9",
      description:
        "On GPQA Diamond, a graduate-level science QA set, Kimi K3 scores 92.9 against V4.1 Flash's 90.9 — a two-point edge to K3. Both trail GPT-5.6 Sol (94.1) and Opus 5 (93.4), so this is a case where the two open models are close and the closed frontier is still slightly ahead[4].",
      paragraphs: [
        "GPQA is a knowledge-and-reasoning proxy rather than an agentic test. A two-point gap rarely changes a deployment decision on its own; it signals that K3 has a small edge on hard scientific questions answered from knowledge[4].",
        "The more useful reading is that V4.1 Flash is within two points of K3 while costing roughly 20-25x less on uncached tokens and 100x less on cache hits. For high-volume question answering, that trade favors DeepSeek unless the last two points are decisive[3][4][5].",
      ],
      note: "All scores are vendor-run and not independently verified here; read them as directional[4].",
    },
    {
      num: "03",
      title: "HLE — 36.8 vs 43.5",
      description:
        "Humanity's Last Exam widens the gap. Kimi K3 scores 43.5 versus V4.1 Flash's 36.8, a 6.7-point lead on the hardest closed-book reasoning set. With tools the two converge — and actually flip: V4.1 Flash scores 63.9 and K3 scores 59.8[4].",
      paragraphs: [
        "That inversion is the most important detail in the comparison. When a model can retrieve evidence and run tools, DeepSeek's deficit on closed-book HLE largely disappears and becomes a small lead. When it must answer from parametric knowledge alone, K3 is clearly stronger[4].",
        "For agent builders this argues for evaluating the tool-assisted row, not the closed-book row. The gap that matters is whichever mode your production system actually uses[4].",
      ],
      table: {
        headers: ["Benchmark", "V4.1 Flash", "Kimi K3", "Leader"],
        rows: [
          ["HLE (closed-book)", "36.8", "43.5", "Kimi K3 +6.7"],
          ["HLE with tools", "63.9", "59.8", "V4.1 Flash +4.1"],
        ],
      },
      note: "Some HLE figures in DeepSeek's table are text-only subsets; check the footnotes before direct comparison[4].",
    },
    {
      num: "04",
      title: "Terminal-Bench 2.1 — 90.6 vs 88.3",
      description:
        "On Terminal-Bench 2.1, an established agentic coding benchmark, V4.1 Flash leads 90.6 to 88.3. It also wins the newer Terminal-Bench 3.0 (30.0 vs 17.7) and Terminal-Bench 4.0 (31.2 vs 12.6), so the terminal-agent comparison breaks in DeepSeek's favor at every version DeepSeek reports[4].",
      paragraphs: [
        "The TB 4.0 margin is the striking one: 31.2 against 12.6. That is a 18.6-point lead on the hardest terminal benchmark, which suggests V4.1 Flash handles long-horizon shell and systems tasks materially better than K3 in DeepSeek's runs[4].",
        "The usual caveat applies. These are DeepSeek-run evaluations using DeepSeek Harness at maximum effort, and K3's own vendor materials may tell a different story on different harnesses. Treat TB as a strong hint, not a verdict[4][5].",
      ],
      table: {
        headers: ["Benchmark", "V4.1 Flash", "Kimi K3"],
        rows: [
          ["Terminal-Bench 2.1", "90.6", "88.3"],
          ["Terminal-Bench 3.0", "30.0", "17.7"],
          ["Terminal-Bench 4.0", "31.2", "12.6"],
        ],
      },
      note: "See [[v4-1-flash-benchmarks|the full benchmark table]] for the other models in the same grid[4].",
    },
    {
      num: "05",
      title: "DeepSWE & CyberGym Gap",
      description:
        "DeepSWE v1.1 goes to V4.1 Flash 74.2 to 67.5 — a 6.7-point gap on software-engineering tasks. CyberGym goes 88.1 to 80.0 on security agent tasks, and AutomationBench goes 54.8 to 46.7. These are the agentic-coding rows most relevant to coding agents[4].",
      paragraphs: [
        "The consistency is notable: across coding, security, and automation agent benchmarks, V4.1 Flash leads K3 by 6-8 points. Combined with the terminal results, DeepSeek's own table paints a clear picture of V4.1 Flash as the stronger agentic coder[4].",
        "That said, benchmark position is not cost per completed task. K3's 104B active parameters may reduce error rates on tasks it attempts, and its always-on thinking can help on partly specified problems. The only reliable test is your own workload with your own harness[4][5].",
      ],
      list: [
        "DeepSWE v1.1: 74.2 vs 67.5 (V4.1 Flash +6.7)",
        "CyberGym: 88.1 vs 80.0 (V4.1 Flash +8.1)",
        "AutomationBench: 54.8 vs 46.7 (V4.1 Flash +8.1)",
        "NL2Repo-Bench: 64.0 vs 58.0 (V4.1 Flash +6.0)",
        "ProgramBench: 20.3 vs 17.5 (V4.1 Flash +2.8)[4]",
      ],
      note: "All figures are DeepSeek-run; independent K3 evaluations may differ[4][5].",
    },
    {
      num: "06",
      title: "Price — $0.15/$0.60 vs $3/$15",
      description:
        "Here the models diverge sharply. V4.1 Flash is $0.003 per million cached input tokens, $0.15 uncached, and $0.60 output off-peak. Kimi K3, per Moonshot's July 25, 2026 price page, is $0.30 cached input, $3.00 uncached input, and $15.00 output — a cache-hit gap of about 100x and roughly 20-25x on uncached input and output[3][5].",
      paragraphs: [
        "A concrete request shows the scale: one million uncached input tokens plus 200,000 output tokens costs about $0.27 on V4.1 Flash at off-peak rates versus roughly $6.00 on K3. If the whole prefix qualifies for the cache-hit rate, the same request is fractions of a cent on DeepSeek and about $3.30 on K3[3][5].",
        "Peak rates double V4.1 Flash's prices but do not close a 20-100x gap. For token-heavy agent pipelines, pricing is the single biggest practical difference between these two models[3].",
      ],
      table: {
        headers: ["Per 1M tokens", "V4.1 Flash (off-peak)", "Kimi K3", "Multiple"],
        rows: [
          ["Input (cache hit)", "$0.003", "$0.30", "~100x"],
          ["Input (cache miss)", "$0.15", "$3.00", "20x"],
          ["Output", "$0.60", "$15.00", "25x"],
          ["1M in + 200K out", "~$0.27", "~$6.00", "~22x"],
        ],
      },
      note: "DeepSeek rates per its official page; K3 rates per Moonshot's published price page as documented. See [[v4-1-flash-pricing|the V4.1 Flash pricing guide]][3][5].",
    },
    {
      num: "07",
      title: "Licenses — MIT vs a Bespoke K3 License",
      description:
        "Both publish weights, but the terms differ. V4.1 Flash is MIT-licensed on Hugging Face. Kimi K3 uses a bespoke license with attribution and commercial-use conditions that large-scale consumer services and model-as-a-service businesses must examine. If permissive reuse matters, DeepSeek is the simpler choice[4][5].",
      paragraphs: [
        "Self-hosting costs are large for both. V4.1 Flash needs roughly 511 GB of disk and about 614 GB of VRAM, meaning a GB200 NVL4 tray or eight H200s. K3's 2.8T parameters make it heavier still. Open weights buy control and auditability, not cheap inference[4][5].",
        "For startups and research groups, the MIT license removes legal friction and permits fine-tuning and redistribution. For companies planning to resell model access at scale, K3's license terms require legal review before launch[4][5].",
      ],
      note: "If you plan to self-host, start with [[v4-1-flash-local-deployment|the local deployment guide]] and [[flash-huggingface|the weights guide]][4][5].",
    },
    {
      num: "08",
      title: "Market Impact & How to Choose",
      description:
        "When V4.1 Flash launched, its combination of frontier scores and low prices hit Chinese AI peers: MiniMax and Z.ai shares in Hong Kong fell more than 8%, and Alibaba dropped more than 2%. The read is that a cheap open-weight model at this capability level resets what competitors can charge[4][6].",
      paragraphs: [
        "Choose V4.1 Flash for cost-sensitive coding and security agents, cache-heavy pipelines, and any deployment that needs MIT-licensed self-hosting. Choose Kimi K3 for workflows that need native video understanding, always-on thinking, or closed-book reasoning where its HLE lead holds[4][5].",
        "As always, run your own evaluation. Both sets of scores are vendor-reported, the agentic rows depend on the harness, and a 6-point benchmark lead can vanish or invert on a task distribution the vendors did not test[4][6].",
      ],
      list: [
        "High-volume coding agents → V4.1 Flash; 6-8 point lead at a fraction of the price.",
        "Native video input → Kimi K3; V4.1 Flash handles images, not video.",
        "Strict permissive licensing → V4.1 Flash (MIT).",
        "Always-on deep reasoning on under-specified tasks → test K3 against your prompts.",
        "Cache-heavy repetitive pipelines → V4.1 Flash; the cache-hit gap is ~100x[3][4]",
      ],
      note: "See [[v4-1-flash-vs-opus-5|V4.1 Flash vs Opus 5]] and [[v4-1-flash-vs-v4-flash|V4.1 Flash vs V4 Flash]] for the rest of the comparison series.",
    },
  ],
  relatedGuides: [
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table", slug: "v4-1-flash-benchmarks" },
    { title: "V4.1 Flash vs Opus 5: DeepSWE, CyberGym & Cost", slug: "v4-1-flash-vs-opus-5" },
    { title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates", slug: "v4-1-flash-pricing" },
    { title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash", slug: "deepseek-v4-pro-retired" },
  ],
  sources: [
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek V4 vs Kimi K3 Comparison (K3 pricing, July 25, 2026)", url: "https://chat-deep.ai/comparison/kimi/" },
    { label: "The Next Web: V4.1-Flash Launch, Pricing and Peer Reaction", url: "https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut" },
  ],
};

import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash vs opus 5
// 内容来源：reference/topics/27-v4-1-flash.md、26-v4-pro-integrations.md（竞品价格为公开标价）
export const v41FlashVsOpus5: GuideContent = {
  slug: "v4-1-flash-vs-opus-5",
  category: "COMPARISON",
  title: "DeepSeek V4.1 Flash vs Claude Opus 5: DeepSWE & the Cost Gap",
  seoTitle: "V4.1 Flash vs Opus 5: DeepSWE & Cost",
  readTime: "9 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "DeepSeek V4.1 Flash vs Claude Opus 5: DeepSWE 74.2 vs 74.0, Opus leads HLE 56.3 vs 36.8, and V4.1 costs roughly 86x less on a mixed workload.",
  toc: [
    { id: "step-1", label: "Step 1: Two Flagships, Two Philosophies" },
    { id: "step-2", label: "Step 2: DeepSWE — 74.2 vs 74.0" },
    { id: "step-3", label: "Step 3: CyberGym — 88.1 vs Not Reported" },
    { id: "step-4", label: "Step 4: Where Opus 5 Pulls Ahead" },
    { id: "step-5", label: "Step 5: Reasoning — HLE 36.8 vs 56.3" },
    { id: "step-6", label: "Step 6: Price — $0.15/$0.60 vs $5/$25" },
    { id: "step-7", label: "Step 7: Open Weights vs a Closed API" },
    { id: "step-8", label: "Step 8: Which One Should You Use?" },
  ],
  steps: [
    {
      num: "01",
      title: "Two Flagships, Two Philosophies",
      description:
        "DeepSeek V4.1 Flash and Claude Opus 5 sit at opposite ends of the frontier trade-off. V4.1 Flash is an MIT-licensed open-weight 552B MoE that DeepSeek released on September 10, 2026; Opus 5 is Anthropic's closed flagship, exposed only through its API. They trade wins across the benchmark table, so the choice is about workload and budget rather than a single score[4][5].",
      paragraphs: [
        "DeepSeek's own model card compares V4.1 Flash head-to-head with Opus-5.0 across reasoning and agentic categories. The pattern is consistent: V4.1 Flash wins or ties on established coding and security benchmarks, while Opus 5 leads on the hardest long-horizon tasks and closed-book knowledge[4].",
        "On price the two are not in the same universe. Opus 5 lists at $5 per million input tokens and $25 per million output; V4.1 Flash lists at $0.15 and $0.60 off-peak. That roughly 86x headline gap frames the entire comparison, and it is the reason many teams start with the open model and escalate only when a task demands it[3][5].",
      ],
      table: {
        headers: ["Dimension", "DeepSeek V4.1 Flash", "Claude Opus 5"],
        rows: [
          ["Release", "Sept 10, 2026", "2026 flagship"],
          ["License", "MIT (open weights)", "Closed, API only"],
          ["Architecture", "552B MoE, CED", "Not disclosed"],
          ["Activation", "8B prefill / 16B decode", "Not disclosed"],
          ["Context window", "1M tokens", "1M tokens (per Anthropic docs)"],
          ["Input price", "$0.15 / 1M off-peak", "$5 / 1M"],
          ["Output price", "$0.60 / 1M off-peak", "$25 / 1M"],
        ],
      },
      note: "Competitor list prices are Anthropic's published rates as reported; DeepSeek rates are from its official pricing page[3][5]. Verify current rates before budgeting.",
    },
    {
      num: "02",
      title: "DeepSWE — 74.2 vs 74.0",
      description:
        "DeepSWE v1.1 is about as close to a tie as a frontier benchmark gets. V4.1 Flash scores 74.2 and Claude Opus 5 scores 74.0 — a 0.2-point difference that is well within the noise of a vendor-run agent benchmark. Both sit clear of GPT-5.6 Sol (73.0) and Kimi K3 (67.5)[4].",
      paragraphs: [
        "The tie is remarkable because of where V4.1 Flash came from. Its predecessor V4-Flash scored 54.4 and the retired V4-Pro flagship scored 62.7, so DeepSeek closed a 19.8-point gap in roughly six weeks. On this particular software-engineering measure, you can no longer assume the closed flagship is ahead[4].",
        "DeepSWE is an agentic benchmark, which means the harness and reasoning effort matter. DeepSeek ran it at maximum effort with DeepSeek Harness minimal mode, so the 74.2 is a model-plus-runtime number, not a bare-model number. The same caveat applies to the Opus 5 figure[4].",
      ],
      note: "Independent Vals AI evaluations put Opus 5 at 97.00% on SWE-bench Verified, with DeepSeek's nearest measured entry (V4-Pro) at 96.40% and about 1/59 the per-test cost. Patch-style coding remains extremely close even where DeepSWE ties[6].",
    },
    {
      num: "03",
      title: "CyberGym — 88.1 vs Not Reported",
      description:
        "On CyberGym, a security-focused agent benchmark, V4.1 Flash leads at 88.1. Claude Opus 5 is not listed for this benchmark in DeepSeek's official table, so there is no head-to-head number. GPT-5.6 Sol scores 84.5 and Kimi K3 scores 80.0, both below V4.1 Flash[4].",
      paragraphs: [
        "An em dash in the table means the score was not reported, not that the model failed. So on CyberGym the honest claim is that V4.1 Flash leads every model with a published score — not that it beats Opus 5, which has no published score to compare[4].",
        "Security work is mixed overall. On ExploitGym, Opus 5 scores 22.1 against V4.1 Flash's 15.3, with GPT-5.6 Sol leading at 33.7. That means V4.1 Flash's security advantage is narrower than the single CyberGym row suggests, and teams doing offensive-security work should test both[4].",
      ],
      table: {
        headers: ["Benchmark", "V4.1 Flash", "Opus-5.0", "GPT-5.6 Sol"],
        rows: [
          ["CyberGym", "88.1", "—", "84.5"],
          ["SEC-Bench Pro", "62.8", "—", "74.3"],
          ["ExploitGym", "15.3", "22.1", "33.7"],
        ],
      },
      note: "Em dashes mark benchmarks Opus 5 was not scored on in DeepSeek's table. For the full grid, see [[v4-1-flash-benchmarks|the V4.1 Flash benchmark page]][4].",
    },
    {
      num: "04",
      title: "Where Opus 5 Pulls Ahead",
      description:
        "Opus 5 leads decisively on the newest and hardest agentic benchmarks. On Terminal-Bench 3.0 it scores 43.3 against V4.1 Flash's 30.0, and on Terminal-Bench 4.0 it scores 51.8 against 31.2. It also leads ProgramBench 37.0 to 20.3 and NL2Repo-Bench 75.3 to 64.0[4].",
      paragraphs: [
        "The direction of the split is telling. V4.1 Flash wins the older Terminal-Bench 2.1 (90.6 to 89.1) but loses the frontier versions by double-digit margins. That suggests strength on established, well-represented agentic tasks and a gap on the newest ones, which is exactly where a closed flagship's extra scale and tuning show up[4].",
        "For long-horizon autonomous work — tasks that run many steps and compound small errors — the TB 3.0 and 4.0 gaps matter more than the TB 2.1 tie. If your agent runs for an hour unattended, the newer benchmarks are the better predictor[4][5].",
      ],
      table: {
        headers: ["Benchmark", "V4.1 Flash", "Opus-5.0", "Opus lead"],
        rows: [
          ["Terminal-Bench 3.0", "30.0", "43.3", "+13.3"],
          ["Terminal-Bench 4.0", "31.2", "51.8", "+20.6"],
          ["ProgramBench", "20.3", "37.0", "+16.7"],
          ["NL2Repo-Bench", "64.0", "75.3", "+11.3"],
          ["Terminal-Bench 2.1", "90.6", "89.1", "−1.5 (V4.1 leads)"],
        ],
      },
      note: "DeepSeek reports these losses in its own table, which makes the frontier boundary between the two models unusually clear[4].",
    },
    {
      num: "05",
      title: "Reasoning — HLE 36.8 vs 56.3",
      description:
        "Closed-book reasoning is where Opus 5 separates most. On Humanity's Last Exam it scores 56.3 against V4.1 Flash's 36.8 — a 19.5-point gap, the largest single margin in the official table. With tools, though, the gap nearly vanishes: 63.6 for Opus 5 versus 63.9 for V4.1 Flash[4].",
      paragraphs: [
        "GPQA Diamond is much closer, at 93.4 for Opus 5 versus 90.9 for V4.1 Flash. The pattern is that V4.1 Flash is competitive on general science QA but trails on the hardest, most adversarial reasoning set — and that the deficit is largely recoverable when the model can search or call tools[4].",
        "This is important for agent design. If your system can retrieve evidence, run code, or query a database, the tool-assisted HLE number (63.9 vs 63.6) is the more relevant one. If it must answer from parametric knowledge alone under a strict correctness gate, Opus 5's edge is real[4].",
      ],
      note: "HLE figures for some models in DeepSeek's table are text-only subsets; read the footnotes before ranking rows directly[4].",
    },
    {
      num: "06",
      title: "Price — $0.15/$0.60 vs $5/$25",
      description:
        "Cost is where the comparison stops being close. V4.1 Flash is $0.15 per million input tokens and $0.60 per million output off-peak, with cache hits at $0.003. Opus 5 lists at $5 input and $25 output — about 33x on input and 42x on output, with the blended multiple commonly summarized as roughly 86x for input-heavy agent workloads[3][5].",
      paragraphs: [
        "Concrete example: one million uncached input tokens plus 200,000 output tokens costs about $0.27 on V4.1 Flash at off-peak rates versus roughly $10 on Opus 5, before any caching. Add cache hits and V4.1 Flash's input cost falls into fractions of a cent, which is where the practical gap gets widest for repetitive agent loops[3].",
        "Peak rates double V4.1 Flash's prices but do not change the order of magnitude. The cache-hit rate is the biggest lever: $0.003 versus an Opus input rate two to three orders of magnitude higher[3][5].",
      ],
      table: {
        headers: ["Per 1M tokens", "V4.1 Flash off-peak", "V4.1 Flash peak", "Opus 5 (list)"],
        rows: [
          ["Input (cache hit)", "$0.003", "$0.006", "Not listed"],
          ["Input (cache miss)", "$0.15", "$0.30", "$5.00"],
          ["Output", "$0.60", "$1.20", "$25.00"],
        ],
      },
      note: "DeepSeek prices per its official page; Opus 5 rates are Anthropic's published list prices as reported. See [[v4-1-flash-pricing|the V4.1 Flash pricing guide]] for the full schedule[3][5].",
    },
    {
      num: "07",
      title: "Open Weights vs a Closed API",
      description:
        "V4.1 Flash ships with MIT-licensed weights on Hugging Face, so it can be self-hosted, fine-tuned, or run inside a private network. Opus 5 is API-only; Anthropic does not release weights. That difference matters for data-governance rules, air-gapped deployments, and anyone who wants to avoid locking their stack to one vendor[4].",
      paragraphs: [
        "Open weights do not mean cheap to run yourself. The V4.1 Flash checkpoint is roughly 763B weights and about 511 GB on disk, with vLLM recipes recommending around 614 GB of VRAM — a single GB200 NVL4 tray or eight H200s. So 'open' buys control and auditability, not a laptop deployment[4][5].",
        "The trade-off is asymmetric. Choosing V4.1 Flash gives you a self-host escape hatch, model portability, and the ability to fine-tune. Choosing Opus 5 gives you a managed endpoint, Anthropic's safety tooling, and enterprise support, at a price that only makes sense when the task genuinely needs the frontier capability[4][5].",
      ],
      note: "For the self-hosting path, see [[v4-1-flash-local-deployment|the local deployment guide]] and [[flash-huggingface|the Hugging Face weights guide]][4][5].",
    },
    {
      num: "08",
      title: "Which One Should You Use?",
      description:
        "Use V4.1 Flash for cost-sensitive, high-volume, input-heavy agentic and coding work where it matches or beats Opus 5: DeepSWE, CyberGym, Terminal-Bench 2.1, AutomationBench, and tool-assisted HLE. Use Opus 5 for frontier long-horizon tasks (TB 3.0 and 4.0), the hardest closed-book reasoning (HLE 56.3), and workflows that require a closed vendor's support and compliance posture[4][5].",
      list: [
        "Coding agents on established tasks → V4.1 Flash; DeepSWE ties at a fraction of the cost.",
        "One-hour autonomous agents → Opus 5; TB 3.0/4.0 margins are large.",
        "Security triage with public benchmarks → V4.1 Flash on CyberGym, but test ExploitGym-style work.",
        "Knowledge Q&A with retrieval → near-tie on tool-assisted HLE; let cost decide.",
        "Regulated, air-gapped, or fine-tuned deployments → V4.1 Flash's open weights.",
      ],
      paragraphs: [
        "A practical pattern is a two-tier router: default to V4.1 Flash and escalate to Opus 5 only when a task fails a confidence check or is classified as frontier-hard. Because V4.1 Flash is 30-40x cheaper on list rates, keeping even 80% of traffic on it changes the economics dramatically while preserving Opus quality for the tasks that need it[3][5].",
        "Whichever you pick, run your own evaluation. Both sets of scores are vendor-reported, the agentic rows depend on the harness, and the only benchmark that ultimately matters is your workload[4][5].",
      ],
      note: "See [[v4-1-flash-vs-kimi-k3|V4.1 Flash vs Kimi K3]] and [[v4-1-flash-vs-v4-flash|V4.1 Flash vs V4 Flash]] for the other two head-to-head comparisons in this series.",
    },
  ],
  relatedGuides: [
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table", slug: "v4-1-flash-benchmarks" },
    { title: "V4.1 Flash vs Kimi K3: The Open-Weight Duel", slug: "v4-1-flash-vs-kimi-k3" },
    { title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates", slug: "v4-1-flash-pricing" },
    { title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash", slug: "deepseek-v4-pro-retired" },
  ],
  sources: [
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "VentureBeat: V4.1-Flash Benchmark and Cost Analysis", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
    { label: "Codersera: V4 Pro 0813 Guide & SWE-bench Verified Runs", url: "https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/" },
    { label: "Anthropic: Claude Models Overview (List Pricing)", url: "https://platform.claude.com/docs/en/about-claude/models/overview" },
  ],
};

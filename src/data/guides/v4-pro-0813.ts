import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro 0813
export const v4Pro0813: GuideContent = {
  slug: "v4-pro-0813",
  category: "MODEL GUIDE",
  title: "DeepSeek V4 Pro 0813 Build Explained: What Changed at GA",
  seoTitle: "V4 Pro 0813 Build: GA Changes Explained",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "V4 Pro 0813 is the GA checkpoint of Aug 13, 2026: SWE-bench 96.4%, TB2.1 87.9, native Responses API, reasoning effort levels, and new pricing.",
  toc: [
    { id: "step-1", label: "What '0813' Means" },
    { id: "step-2", label: "What Changed at GA" },
    { id: "step-3", label: "0813 on the Benchmarks" },
    { id: "step-4", label: "Model Card & Self-Hosting Notes" },
    { id: "step-5", label: "Should You Upgrade to 0813?" },
  ],
  steps: [
    {
      num: "01",
      title: "What '0813' Means",
      description:
        "`deepseek-v4-pro-0813` is the checkpoint DeepSeek shipped on August 13, 2026 — the build that moved V4 Pro from preview to generally available. '0813' is the release date in YYMMDD-style shorthand, matching the Flash-0731 naming convention from July 31[1][4].",
      paragraphs: [
        "The API keeps the stable alias `deepseek-v4-pro`, which now resolves to the 0813 weights. On OpenRouter the GA build is listed separately as `deepseek/deepseek-v4-pro-0813` (created August 13) alongside the older preview entry `deepseek/deepseek-v4-pro`, so if you use a third-party router, check which entry your config points at[10].",
        "The July 31 Flash update established the pattern: same architecture, retrained weights, new checkpoint name. The 0813 Pro build follows the same logic — a materially improved checkpoint, not a config tweak.",
      ],
      list: [
        "0813 = GA checkpoint released Aug 13, 2026",
        "API alias deepseek-v4-pro resolves to 0813 weights",
        "OpenRouter lists it as deepseek/deepseek-v4-pro-0813",
        "Same architecture as preview: 1.6T total / 49B active MoE",
      ],
      note: "Do not confuse the 0813 GA checkpoint with the preview-era entries still listed on some routers and pricing pages — check the created date[10].",
    },
    {
      num: "02",
      title: "What Changed at GA",
      description:
        "The GA release bundled three headline changes plus a pricing overhaul[1].",
      table: {
        headers: ["Change", "Preview era", "0813 GA"],
        rows: [
          ["Agent capability", "Preview-level agent scores", "Major upgrades, 'strong production gains'"],
          ["Reasoning effort", "Fixed effort behavior", "low / high / max, default high"],
          ["OpenAI Responses API", "Flash only", "Native support, Codex one-click setup"],
          ["App / web access", "Model menu only", "V4 Pro via 'Expert Mode'"],
          ["Pricing", "Flat $0.435 / $0.87", "Peak & off-peak rates from Aug 16"],
        ],
      },
      paragraphs: [
        "The reasoning-effort and Responses API changes are the ones developers actually feel day-to-day. `reasoning_effort` accepts `low` / `high` / `max` and defaults to `high`; the Responses API works with Codex clients through DeepSeek's one-click setup script[4][5].",
        "Pricing is the other big shift: peak/off-peak rates took effect 16:00 UTC on August 16, three days after GA. Every V4 Pro line costs more than the old flat rate, with output at $1.98 off-peak / $3.96 peak[2].",
      ],
      note: "Model names and endpoint URLs are unchanged — existing preview-era integrations keep working against the 0813 weights[1][3].",
    },
    {
      num: "03",
      title: "0813 on the Benchmarks",
      description:
        "The model card reports SWE-bench Verified at 96.4% — the headline coding number — alongside the full agent table: Terminal Bench 2.1 at 87.9, Cybergym 83.3 (first), AutomationBench 31.8 (first)[4].",
      table: {
        headers: ["Benchmark", "0813 GA", "Pro Preview", "Delta"],
        rows: [
          ["SWE-bench Verified", "96.4%", "80.6%", "+15.8 pts"],
          ["Terminal Bench 2.1", "87.9", "72.1", "+15.8"],
          ["Cybergym", "83.3", "52.7", "+30.6"],
          ["DeepSWE", "62.7", "12.8", "+49.9"],
          ["Toolathlon-Verified", "74.1", "55.9", "+18.2"],
        ],
      },
      paragraphs: [
        "Note the SWE-bench number: the preview-era card reported 80.6% (as of August 1), and the 0813 card reports 96.4% — a 15.8-point jump that matches the pattern across the rest of the table[4].",
        "Independent testing (MindStudio, 8 tasks) scored the 0813 build at 76.25%, versus 24.8% for the preview — same direction, more conservative magnitude[6]. The full [[v4-pro-benchmarks|benchmark page]] has the complete tables and the harness caveat.",
      ],
    },
    {
      num: "04",
      title: "Model Card & Self-Hosting Notes",
      description:
        "The 0813 model card on Hugging Face documents the weights, the encoding folder, and the official vLLM deployment recipe — including the DSpark speculative-decoding flag[4].",
      list: [
        "No Jinja chat template on the card — encoding is provided as a Python folder demonstrating OpenAI-compatible format encoding",
        "vLLM deployment: enable DSpark with a single flag: --speculative-config '{\"method\":\"dspark\",...}'",
        "Reference hardware: 4xGB300 single node for the full model",
        "Weights are MIT-licensed; self-hosting is officially supported",
      ],
      paragraphs: [
        "Self-hosting 0813 is a serious lift — third-party estimates put the FP4+FP8 weights at roughly 862GB of VRAM. The hosted API is the practical route for most teams; the [[v4-pro-model-size|model size page]] has the full hardware math.",
      ],
      note: "The card's internal DSBench rows are marked with a dagger — treat them as vendor-internal numbers[4].",
    },
    {
      num: "05",
      title: "Should You Upgrade to 0813?",
      description:
        "If you are on the preview, the upgrade is automatic — the stable model ID already points at 0813. The real decision is budget and workload[2][6].",
      paragraphs: [
        "Upgrade if your work is agentic or coding-heavy: the GA build's agent gains are the largest single-version jump in the family's history, and the [[v4-pro-responses-api|Responses API]] unlocks Codex workflows that preview-era Pro could not do[1][6].",
        "Hold the line if your workload is high-volume and latency-sensitive chat: independent tests note 0813 over-thinks simple problems, and for everyday tasks [[deepseek-v4-flash|V4 Flash]] often feels snappier at one-third the price[6]. The peak-hour rates make that calculus sharper — see the [[v4-pro-pricing|pricing page]].",
      ],
      note: "The 0813 checkpoint is the current GA as of August 16, 2026. DeepSeek has not announced the next build.",
    },
  ],
  relatedGuides: [
    {
      title: "DeepSeek V4 Pro Release Date: Preview to GA Timeline",
      slug: "v4-pro-release-date",
    },
    {
      title: "DeepSeek V4 Pro Benchmarks: 0813 Scores",
      slug: "v4-pro-benchmarks",
    },
    {
      title: "DeepSeek V4 Pro Pricing: Peak & Off-Peak Rates",
      slug: "v4-pro-pricing",
    },
    {
      title: "DeepSeek V4 Pro: Specs, Pricing & Release Date",
      slug: "v4-pro",
    },
  ],
  sources: [
    { label: "Official DeepSeek API: V4-Pro GA Release", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek First API Call Docs", url: "https://api-docs.deepseek.com/quick_start/first_api_call/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "DeepSeek Codex Integration Docs", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/codex/" },
    { label: "MindStudio: V4 Pro 0813 Benchmark Review", url: "https://www.mindstudio.ai/blog/deepseek-v4-pro-0813-benchmark-review" },
    { label: "OpenRouter Models API", url: "https://openrouter.ai/api/v1/models" },
  ],
};

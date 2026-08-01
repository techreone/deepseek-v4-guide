import type { GuideContent } from "./types";

// 目标关键词：deepseek v4 flash
// 内容来源：reference/topics/01-v4-flash-overview.md（2026-08-01 定稿，全部事实均来自该研究文件）
export const deepseekV4Flash: GuideContent = {
  slug: "deepseek-v4-flash",
  category: "MODEL GUIDE",
  title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release",
  seoTitle: "What Is DeepSeek V4 Flash? The 0731 Guide",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek V4 Flash is DeepSeek's 284B-parameter open-weight model with 1M context. Here's the full guide to the July 31, 2026 official release.",
  toc: [
    { id: "step-1", label: "Step 1: What Is DeepSeek V4 Flash?" },
    { id: "step-2", label: "Step 2: What the 0731 Official Release Actually Is" },
    { id: "step-3", label: "Step 3: Flash Preview vs 0731: Exact Differences" },
    { id: "step-4", label: "Step 4: Agent Benchmarks: Flash 0731 vs V4-Pro-Preview" },
    { id: "step-5", label: "Step 5: Pricing: $0.14 Input / $0.28 Output" },
    { id: "step-6", label: "Step 6: DSpark: The Speed Module in 0731 Weights" },
    { id: "step-7", label: "Step 7: How to Access DeepSeek V4 Flash" },
    { id: "step-8", label: "Step 8: V4 Flash vs V4 Pro: Where Each Fits" },
  ],
  steps: [
    {
      num: "01",
      title: "What Is DeepSeek V4 Flash?",
      description:
        "DeepSeek V4 Flash is DeepSeek's fast, efficient, and economical tier of the V4 family. It is a mixture-of-experts (MoE) model with 284B total parameters and 13B active parameters per token, a 1M-token context window, and a maximum output of 384K tokens[3].",
      paragraphs: [
        "Flash debuted on April 24, 2026[4] alongside the flagship [[v4-pro|V4 Pro]]. It is text-only, ships with MIT-licensed open weights, and is designed for high-volume, low-latency work. DeepSeek says Flash reasoning closely approaches V4 Pro, and Flash performs on par with V4 Pro on simple agent tasks.",
        "The model card is still the best single source for the architecture: hybrid attention built from Compressed Sparse Attention (CSA) and Heavily Compressed Attention (HCA), with FP4 + FP8 mixed precision. The 1M context window makes it a practical choice for million-token document and code tasks.",
      ],
      list: [
        "284B total / 13B active MoE parameters",
        "1M context window (1,048,576 tokens); max output 384K (393,216 tokens)",
        "Text-only input with hybrid CSA + HCA attention",
        "FP4 + FP8 mixed precision",
        "MIT-licensed open weights on Hugging Face",
      ],
      table: {
        headers: ["Spec", "DeepSeek V4 Flash"],
        rows: [
          ["Total parameters", "284B (MoE)"],
          ["Active parameters", "13B"],
          ["Context window", "1M (1,048,576 tokens)"],
          ["Max output", "384K (393,216 tokens)"],
          ["Input modality", "Text only"],
          ["Precision", "FP4 + FP8 mixed"],
          ["Attention", "Compressed Sparse Attention (CSA) + Heavily Compressed Attention (HCA)"],
          ["License", "MIT"],
        ],
      },
    },
    {
      num: "02",
      title: "What the 0731 Official Release Actually Is",
      description:
        "On July 31, 2026, DeepSeek moved the Flash API to official release (public beta) under build number DeepSeek-V4-Flash-0731[1]. The key fact: this is not a new model. The official changelog states that 0731 keeps the same model architecture and size as DeepSeek-V4-Flash-Preview, and was only re-post-trained.",
      paragraphs: [
        "Because the architecture and parameter count are unchanged, context length, pricing, and the model slug all stay the same. Setting model=deepseek-v4-flash automatically serves the latest build, so most existing API code needs no changes at all.",
        "The upgrade is limited to the Flash API. The V4-Pro API and the APP/WEB models are unchanged, and DeepSeek says the official release of V4-Pro will follow soon.",
      ],
      list: [
        "Re-post-training focused on agentic and coding capabilities",
        "Native support for the Responses API format",
        "Dedicated Codex integration support[5]",
        "Release channel moved from preview to public beta",
      ],
      note: "If you were already calling model=deepseek-v4-flash, the July 31 upgrade took effect automatically. No code change is required to get the 0731 build.",
    },
    {
      num: "03",
      title: "Flash Preview vs 0731: Exact Differences",
      description:
        "The differences between the preview and the 0731 build are easy to overstate. The model itself is unchanged: same 284B/13B architecture, same 1M context, same price. What changed is training and tooling, not the model.",
      paragraphs: [
        "Two legacy API aliases, deepseek-chat and deepseek-reasoner, retired on July 24, 2026 at 15:59 UTC. Migration is a one-line change: set model to deepseek-v4-flash (or deepseek-v4-pro); the base_url and API key stay the same. Note that deepseek-reasoner mapped to Flash thinking mode, not Pro.",
      ],
      table: {
        headers: ["Aspect", "Flash Preview (Apr 2026)", "Flash 0731 (Jul 31, 2026)"],
        rows: [
          ["Architecture", "284B / 13B MoE", "Same architecture, same size"],
          ["Post-training", "Original", "Re-post-trained (agentic focus)"],
          ["Context / output", "1M in / 384K out", "Unchanged"],
          ["Price (input / output)", "$0.14 / $0.28", "Unchanged"],
          ["Responses API", "Not supported", "Native support"],
          ["Codex integration", "None", "Dedicated one-click setup script"],
          ["Release channel", "Preview", "Public beta (official)"],
        ],
      },
    },
    {
      num: "04",
      title: "Agent Benchmarks: Flash 0731 vs V4-Pro-Preview",
      description:
        "DeepSeek reports that Flash 0731 wins all nine published [[flash-benchmarks|agent benchmarks]][8] against its own V4-Pro-Preview. The gains are most dramatic in software engineering, with DeepSWE jumping from 7.3 on the preview to 54.4 — roughly a 645% increase.",
      paragraphs: [
        "DeepSeek says Flash 0731 is broadly competitive with the strongest proprietary models available. In one external comparison, Terminal-Bench 2.1 at 82.7 also beats Kimi K3's 76.1 from about two weeks earlier.",
        "All nine figures are DeepSeek's self-reported vendor numbers. Independent third parties cannot re-run the harness yet, so treat them as directional until the evaluation harness is open-sourced.",
      ],
      table: {
        headers: ["Benchmark", "Flash 0731", "V4-Pro-Preview", "Flash Preview"],
        rows: [
          ["Terminal-Bench 2.1", "82.7", "72.1", "61.8"],
          ["DeepSWE", "54.4", "—", "7.3"],
          ["Cybergym", "76.7", "—", "—"],
          ["NL2Repo", "54.2", "—", "—"],
          ["Toolathlon (verified)", "70.3", "—", "—"],
          ["Agent Last Exam", "25.2", "—", "—"],
          ["Automation Bench (Public)", "25.1", "—", "—"],
          ["DSBench-FullStack", "68.7", "—", "—"],
          ["DSBench-Hard", "59.6", "—", "—"],
        ],
      },
      note: "Figures marked with an em dash were not reported in the official 0731 model card for that model. All scores above are vendor-reported by DeepSeek.",
    },
    {
      num: "05",
      title: "Pricing: $0.14 Input / $0.28 Output",
      description:
        "The 0731 release keeps the preview price. Input costs $0.14 per 1M tokens on a cache miss and output costs $0.28 per 1M tokens. Cached input is dramatically cheaper at $0.0028 per 1M tokens — roughly a 98% discount[2].",
      paragraphs: [
        "Flash output is about a third of V4 Pro's output price, which is why heavy or high-volume agent workloads default to Flash. New accounts also start with roughly 5 million free tokens, valid for about 30 days.",
        "DeepSeek plans peak/off-peak pricing: peak hours (Beijing time UTC+8, daily 9:00-12:00 and 14:00-18:00) will cost 2x the base price. The effective date has not been announced.",
      ],
      list: [
        "Cache hits are ~98% cheaper — reuse prompts with stable prefixes to maximize your cache hit rate.",
        "Flash supports 2,500 concurrent requests, five times V4 Pro's 500.",
        "For high-volume, low-latency work, Flash is the default; reserve Pro for heavy reasoning.",
      ],
      table: {
        headers: ["Per 1M tokens", "V4 Flash", "V4 Pro (reference)"],
        rows: [
          ["Input (cache miss)", "$0.14", "$0.435"],
          ["Input (cache hit)", "$0.0028", "$0.003625"],
          ["Output", "$0.28", "$0.87"],
          ["Concurrency limit", "2,500", "500"],
        ],
      },
    },
    {
      num: "06",
      title: "DSpark: The Speed Module in 0731 Weights",
      description:
        "The 0731 weights ship with DSpark, DeepSeek's speculative decoding framework[7]. Short for Confidence-Scheduled Speculative Decoding with Semi-Autoregressive Generation, DSpark was open-sourced under MIT on June 27, 2026 and is co-authored by DeepSeek founder Liang Wenfeng and a Peking University team.",
      paragraphs: [
        "In production, DeepSeek reports per-user generation speeds 60-85% faster for V4 Flash than the older MTP-1 baseline, with no weight changes and no extra hardware.",
        "DSpark is also why the [[flash-huggingface|Hugging Face repo]] displays 304B parameters: the extra count is the draft module, not a larger base model. The base model remains 284B.",
      ],
      code: `vllm serve deepseek-ai/DeepSeek-V4-Flash-0731 --trust-remote-code \\
  --kv-cache-dtype fp8 --block-size 256 --data-parallel-size 4 \\
  --enable-expert-parallel --moe-backend deep_gemm_mega_moe \\
  --attention-config '{"use_fp4_indexer_cache": true}' \\
  --speculative-config '{"method":"dspark","num_speculative_tokens":7,"draft_sample_method":"greedy"}'`,
      note: "DSpark accelerates per-user decoding without changing weights or adding hardware. DeepSeek also measured 51% higher total throughput on Flash in its own tests.",
    },
    {
      num: "07",
      title: "How to Access DeepSeek V4 Flash",
      description:
        "There are two official ways to use V4 Flash: the [[flash-api-setup|API]] and the chat.deepseek.com web app. On the web, Instant Mode runs the fast Flash tier for quick, low-cost responses; Expert Mode targets heavier reasoning.",
      paragraphs: [
        "For the API, keep the base_url you already use: https://api.deepseek.com for OpenAI-compatible calls, or https://api.deepseek.com/anthropic for the Anthropic format. Set model to deepseek-v4-flash, and the latest official build is served automatically.",
        "Thinking is on by default[6]. In multi-turn agent loops with tool calls, you must pass the previous turn's reasoning_content back with the message, or the reasoning chain breaks. reasoning_effort supports three levels: low, high, and max. DeepSeek recommends max output of at least 384K tokens for high and max effort, with temperature 1.0 and top_p 1.0 (0.95 in agentic settings).",
        "The 0731 build adds two developer-facing capabilities: native Responses API format support (currently Flash only, with Pro expected in early August 2026) and a dedicated [[flash-ide|Codex integration]].",
      ],
      list: [
        "OpenAI ChatCompletions and Anthropic-compatible endpoints",
        "JSON Output and Tool Calls",
        "Responses API (Flash only today)",
        "Chat Prefix Completion (Beta) and FIM Completion (non-thinking mode only)",
        "Chain-of-thought returned via reasoning_content",
      ],
      code: `curl https://api.deepseek.com/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "Explain mixture of experts in one paragraph"}],
    "thinking": {"type": "enabled"},
    "reasoning_effort": "high"
  }'`,
      note: "Codex users: run the official one-click setup — bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh) on macOS/Linux, or irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex on Windows.",
    },
    {
      num: "08",
      title: "V4 Flash vs V4 Pro: Where Each Fits",
      description:
        "DeepSeek V4 Flash is the economical tier of the V4 family, and V4 Pro is the flagship. Flash handles fast, high-volume, agent-heavy work; Pro brings the biggest model and the strongest reasoning at a higher price.",
      paragraphs: [
        "DeepSeek's official positioning is that Flash reasoning closely approaches V4 Pro, and Flash is on par with V4 Pro on simple agent tasks. After 0731, Flash now beats V4-Pro-Preview on all nine published agent benchmarks — while costing roughly a third as much for output.",
        "V4 Pro's official release will follow soon, according to DeepSeek. Until then, the V4-Pro API continues to serve the preview build, unchanged by the Flash update.",
      ],
      table: {
        headers: ["", "V4 Flash", "V4 Pro"],
        rows: [
          ["Parameters", "284B total / 13B active", "1.6T total / 49B active"],
          ["Context window", "1M", "1M"],
          ["Input (cache miss)", "$0.14 / 1M", "$0.435 / 1M"],
          ["Output", "$0.28 / 1M", "$0.87 / 1M"],
          ["Concurrency", "2,500", "500"],
          ["Best for", "Fast, cheap agent tasks", "Heavy reasoning, flagship work"],
        ],
      },
    },
  ],
  prevGuide: undefined,
  nextGuide: {
    title: "DeepSeek V4 Flash API Setup: Base URL, Models & Your First Call",
    slug: "flash-api-setup",
  },
  relatedGuides: [
    { title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%", slug: "flash-pricing" },
    { title: "DeepSeek V4 Flash Benchmarks: Agentic & Coding Scores in 2026", slug: "flash-benchmarks" },
    { title: "DeepSeek V4 Flash Model Size: Params, VRAM & What It Means", slug: "flash-model-size" },
    { title: "DeepSeek V4 Pro: Specs, Pricing & Release Date (2026)", slug: "v4-pro" },
  ],
  sources: [
    { label: "DeepSeek API Changelog (Official)", url: "https://api-docs.deepseek.com/updates/" },
    { label: "DeepSeek API Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Hugging Face: DeepSeek-V4-Flash-0731 Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731" },
    { label: "DeepSeek V4 Preview Announcement", url: "https://api-docs.deepseek.com/news/news260424/" },
    { label: "DeepSeek Codex Integration Guide", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/codex" },
    { label: "DeepSeek Thinking Mode Guide", url: "https://api-docs.deepseek.com/guides/thinking_mode/" },
    { label: "DSpark Paper (arXiv 2607.05147)", url: "https://arxiv.org/abs/2607.05147" },
    { label: "TechTimes: V4 Flash 0731 Beats V4-Pro-Preview", url: "https://www.techtimes.com/articles/322513/20260731/deepseek-retrained-v4-flash-beats-its-flagship-pro-nine-agent-benchmarks.htm" },
  ],
};

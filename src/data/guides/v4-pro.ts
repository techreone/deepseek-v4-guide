import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro
export const v4Pro: GuideContent = {
  slug: "v4-pro",
  category: "MODEL GUIDE",
  title: "DeepSeek V4 Pro: Specs, Pricing & Release Date (2026)",
  seoTitle: "DeepSeek V4 Pro: Specs, Pricing & Launch",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek V4 Pro is DeepSeek's 1.6T-parameter flagship MoE with 1M context. Here are specs, pricing, and the GA timeline as of August 2026.",
  toc: [
    { id: "step-1", label: "What Is DeepSeek V4 Pro?" },
    { id: "step-2", label: "V4 Pro Architecture & Long-Context Engineering" },
    { id: "step-3", label: "V4 Pro Pricing: $0.435 / $0.87 & Cache Discounts" },
    { id: "step-4", label: "V4 Pro Benchmarks: Vendor vs Independent Tests" },
    { id: "step-5", label: "V4 Pro Release Date: Preview Status & GA Timeline" },
    { id: "step-6", label: "Flash-0731 vs Pro-Preview: Why the Upgrade Matters" },
    { id: "step-7", label: "Calling the DeepSeek V4 Pro API" },
    { id: "step-8", label: "Should You Build on DeepSeek V4 Pro Now?" },
  ],
  steps: [
    {
      num: "01",
      title: "What Is DeepSeek V4 Pro?",
      description:
        "DeepSeek V4 Pro is the flagship model of the DeepSeek V4 family. It is a Mixture-of-Experts (MoE) model with 1.6T total parameters and only 49B active per token, a 1M-token context window, and a 384K maximum output. It is text-only and MIT-licensed[5], and it launched as a preview on April 24, 2026, the same day as [[deepseek-v4-flash|DeepSeek V4 Flash]] (284B/13B)[2].",
      paragraphs: [
        "DeepSeek positions V4 Pro as its answer to the top closed-source models, describing 'Performance rivaling the world's top closed-source models,' with agentic coding as open-source state of the art and world knowledge ranked just behind Gemini-3.1-Pro. As of August 1, 2026, the model you can call today is still the preview build.",
      ],
      table: {
        headers: ["Spec", "DeepSeek V4 Pro", "DeepSeek V4 Flash"],
        rows: [
          ["Total parameters", "1.6T", "284B"],
          ["Active parameters (per token)", "49B", "13B"],
          ["Context window", "1M tokens", "1M tokens"],
          ["Max output", "384K tokens", "384K tokens"],
          ["Modality", "Text only", "Text only"],
          ["License", "MIT", "MIT"],
          ["Precision (inference)", "FP4 + FP8 mixed", "FP4 + FP8 mixed"],
          [
            "Released",
            "Apr 24, 2026 (preview)",
            "Apr 24, 2026 (preview); official build Jul 31, 2026",
          ],
        ],
      },
      note: "Every figure in this table comes from DeepSeek's official model card or API docs. Pricing and limits can change, so confirm against the official pricing page before you commit.",
    },
    {
      num: "02",
      title: "V4 Pro Architecture & Long-Context Engineering",
      description:
        "V4 Pro is engineered to make million-token context practical. DeepSeek claims that at 1M context, per-token inference FLOPs are only 27% of DeepSeek V3.2, and KV cache is just 10%.",
      paragraphs: [
        "Under the hood, V4 Pro pairs two attention mechanisms — Compressed Sparse Attention (CSA) and Heavily Compressed Attention (HCA) — with Manifold-Constrained Hyper-Connections (mHC) and the Muon optimizer. It was pretrained on more than 32T tokens. The technical report, 'DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence,' is on arXiv as 2606.19348 (April 26, 2026).",
        "For inference, the Pro build uses FP4 for MoE expert parameters and FP8 for everything else. That mix is why the full weights come in at a third-party estimate of roughly 862GB of VRAM — a serious self-hosting lift that makes the hosted API the practical route for most teams.",
      ],
      list: [
        "1M context is native and the official default across DeepSeek services — no extra charge.",
        "Max output of 384K tokens; Think Max workloads recommend a context of at least 384K.",
        "Recommended sampling defaults: temperature 1.0, top_p 1.0.",
        "A single RTX 4090 or 5090 is only enough for distillation or small experiments (third-party estimate); 4x80GB GPUs are the realistic starting point.",
      ],
      note: "The 27% FLOPs / 10% KV cache efficiency figures and the 32T-token pretraining count are vendor-reported.",
    },
    {
      num: "03",
      title: "V4 Pro Pricing: $0.435 / $0.87 & Cache Discounts",
      description:
        "Official V4 Pro pricing per 1M tokens is $0.435 for input on a cache miss, $0.003625 for input on a cache hit, and $0.87 for output[3]. The cache-hit rate is about 99.2% below the miss price, and prefix caching is automatic — no SDK changes, headers, or configuration required.",
      paragraphs: [
        "These are permanent prices. V4 Pro launched at $1.74 (cache miss) / $0.0145 (cache hit) / $3.48 (output), then took a 75% cut that became permanent on May 31, 2026.",
        "Two things to budget for. First, thinking-mode reasoning tokens are billed at the output price, so a reasoning-heavy call costs more than the headline rate implies[4]. Second, DeepSeek has announced peak/off-peak pricing — 2x during peak hours (Beijing time 9:00-12:00 and 14:00-18:00) — but as of August 1, 2026 it is not yet in effect.",
      ],
      table: {
        headers: ["Per 1M tokens (USD)", "V4 Pro", "V4 Flash", "Pro cache discount"],
        rows: [
          ["Input (cache miss)", "$0.435", "$0.14", "—"],
          ["Input (cache hit)", "$0.003625", "$0.0028", "≈ 99.2%"],
          ["Output", "$0.87", "$0.28", "—"],
          ["Concurrency limit", "500", "2,500", "—"],
          ["Responses API", "Planned for early Aug 2026", "Supported", "—"],
        ],
      },
      note: "Flash runs about one-third of Pro's price on both input and output (a 3.1x ratio). DeepSeek's official pricing page notes that prices may vary and can be adjusted.",
    },
    {
      num: "04",
      title: "V4 Pro Benchmarks: Vendor vs Independent Tests",
      description:
        "DeepSeek's own preview figures for V4 Pro are strong: SWE-bench Verified 80.6%, LiveCodeBench 93.5, Codeforces rating 3206, and GPQA Diamond 90.1.",
      table: {
        headers: ["Benchmark", "V4 Pro (vendor-reported)", "Nearby competitors"],
        rows: [
          [
            "SWE-bench Verified",
            "80.6%",
            "Opus-4.6 Max 80.8% / Gemini-3.1-Pro High 80.6%",
          ],
          ["LiveCodeBench", "93.5", "Opus-4.6 88.8 / Gemini-3.1-Pro 91.7"],
          [
            "Codeforces Rating",
            "3206",
            "GPT-5.4 3168 / Gemini-3.1-Pro 3052",
          ],
          ["GPQA Diamond", "90.1", "—"],
          ["MMLU-Pro", "87.5", "—"],
          ["Terminal Bench 2.0", "67.9", "—"],
          ["MRCR 1M", "83.5", "—"],
        ],
      },
      paragraphs: [
        "Independent testing is more conservative. NIST's CAISI evaluation (May 2026) concluded V4 Pro trails the frontier by roughly eight months — broadly comparable to a GPT-5-class model from about eight months earlier — though CAISI did reproduce DeepSeek's GPQA-Diamond result, ruling out a reasoning-configuration error[6].",
        "Other third-party checks sit between the two extremes: kilo.ai's FlowGraph gives V4 Pro 77/100, between Claude Opus 4.7 (91) and Kimi K2.6 (68). Artificial Analysis ranks V4 Pro behind Kimi K2.6.",
      ],
      note: "All vendor benchmark numbers are self-reported from the preview build, and DeepSeek's testing harness has not been published, so independent reproduction of the full table is not yet possible.",
    },
    {
      num: "05",
      title: "V4 Pro Release Date: Preview Status & GA Timeline",
      description:
        "As of August 1, 2026, DeepSeek V4 Pro is still a preview. The July 31 changelog upgraded only the Flash API and closed with: 'The official release of DeepSeek-V4-Pro will follow soon.' The Pro API and the APP/WEB models were left unchanged[1].",
      list: [
        "The official pricing page footnote says Responses API support for deepseek-v4-pro arrives in early August 2026 (Flash has it today).",
        "The official thinking-mode guide says the Pro effort mapping will be updated in early August 2026.",
        "The July 31 update moved Flash to an official public beta (Flash-0731) while Pro stayed on preview.",
      ],
      paragraphs: [
        "Everything around the exact GA date is rumor. The Paper (June 29) reported a mid-July window; 36kr (July 20) claimed a release 'as early as tomorrow' with gray-rollout testing already underway[8]; later Reddit threads and media pushed expectations to mid-August. On July 4, a leaker posted build IDs deepseek-v4-pro-202606 and deepseek-v4-flash-202605, pointing at GA candidates. None of this is confirmed — DeepSeek has not announced a date.",
        "Throughout mid-July, a wave of grayscale-test reports circulated — mostly on Bilibili and X. The loudest claim: the GA build's game-making ability rivals Claude Fable 5, with 'one-sentence game generation' demo videos racking up hundreds of thousands of views. Developer Pankaj Kumar's hands-on (July 18, ~18K views) rated it Opus-4.8-class overall, coding close to GPT-5.6 Sol, with Agent, 3D, and SVG abilities sharply improved — though he noted more iteration rounds than Fable 5. **Every one of these is a community claim, not an official or independently benchmarked result**, and some Reddit users explicitly suspect the hype is exaggerated. There is also an unverified 'verified-account roulette' folk method for checking whether you've been grayscaled (the CoT opening switches from 'Let me' to 'I'm/I'll') — treat that as anecdote, not a reliable signal[17].",
      ],
      table: {
        headers: ["Date", "Event"],
        rows: [
          ["Apr 24, 2026", "V4 Pro and V4 Flash launch as previews; 1M context becomes the default."],
          ["May 22-31, 2026", "V4 Pro API takes a permanent 75% price cut."],
          ["Jul 4, 2026", "Leaked build IDs deepseek-v4-pro-202606 and deepseek-v4-flash-202605 surface (unconfirmed)."],
          ["Jul 20, 2026", "36kr reports gray-rollout testing of the GA build (unconfirmed)."],
          ["Jul 24, 2026", "Legacy model names deepseek-chat and deepseek-reasoner are retired."],
          ["Jul 31, 2026", "Flash-0731 goes public beta; DeepSeek: Pro official release 'will follow soon.'"],
          ["Early Aug 2026", "Responses API for Pro expected (official pricing-page footnote)."],
        ],
      },
      note: "DeepSeek explicitly warns against relying on unofficial sources for release timing. Treat every row except the changelog row as unconfirmed until an official announcement.",
    },
    {
      num: "06",
      title: "Flash-0731 vs Pro-Preview: Why the Upgrade Matters",
      description:
        "On July 31, DeepSeek retrained Flash into a new build, [[deepseek-v4-flash|DeepSeek-V4-Flash-0731]], keeping the same architecture and size (284B/13B, 1M context). In official self-tests, it beats V4 Pro-Preview on all nine published [[flash-benchmarks|agent benchmarks]].",
      table: {
        headers: ["Agent benchmark", "Flash-0731 (official)", "V4 Pro-Preview (official)"],
        rows: [
          ["Terminal-Bench 2.1", "82.7", "72.1"],
          ["DeepSWE", "54.4", "7.3"],
          ["Cybergym", "76.7", "—"],
          ["Toolathlon (verified)", "70.3", "—"],
          ["DSBench-FullStack", "68.7", "—"],
        ],
      },
      paragraphs: [
        "The gap is dramatic on software-engineering tasks: DeepSWE jumps from 7.3 to 54.4, a 645% improvement. Because the update says only post-training was rerun, the community reads Flash-0731 as a testbed for the Pro GA — same architecture, new weights is the mainstream expectation for V4 Pro's official release.",
        "DeepSeek also open-sourced DSpark, a speculative-decoding framework that the company says speeds up per-user V4 Pro generation by 57-78% without changing weights or adding hardware.",
      ],
      note: "All nine benchmark numbers are vendor-reported, and DeepSeek's testing harness has not been published yet, so they cannot be independently reproduced at the moment.",
    },
    {
      num: "07",
      title: "Calling the DeepSeek V4 Pro API",
      description:
        "Calling V4 Pro is a one-line change if you already use the DeepSeek API: keep the same base URL and API key, and set the model to deepseek-v4-pro.",
      code: `from openai import OpenAI

client = OpenAI(
    api_key="<DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "9.11 and 9.8, which is greater?"}],
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}},
)
# Chain of thought is returned in reasoning_content;
# the final answer is in content.`,
      list: [
        "Thinking is enabled by default on Pro, with effort defaulting to high; reasoning effort levels are low / high / max.",
        "Anthropic-format calls use base_url https://api.deepseek.com/anthropic and a reasoning block with effort set to none, low, high, or max.",
        "In thinking mode, temperature, top_p, presence_penalty, and frequency_penalty are silently ignored.",
        "Multi-turn calls with tools must return reasoning_content from the previous turn, or the request fails with a 400 error.",
      ],
      paragraphs: [
        "One migration warning: the legacy aliases deepseek-chat and deepseek-reasoner stopped resolving on July 24, 2026. If your code still uses them, change the model parameter to deepseek-v4-pro or deepseek-v4-flash; base URL and API key stay the same.",
      ],
      note: "V4 Pro does not support the Responses API yet (expected early August 2026). Today it supports Chat Completions, the Anthropic-compatible endpoint, JSON output, and tool calls.",
    },
    {
      num: "08",
      title: "Should You Build on DeepSeek V4 Pro Now?",
      description:
        "The practical question most developers ask is Pro versus Flash. Flash costs about one-third of Pro on both input and output (a 3.1x ratio), and DeepSeek's own 22-benchmark aggregation puts Flash at roughly 83% of Pro's quality. A common pattern is hybrid routing: default to [[deepseek-v4-flash|Flash]], escalate to V4 Pro for hard reasoning and agentic tasks.",
      list: [
        "Cost: a Flash-first hybrid workload runs about 3x cheaper end-to-end than all-Pro.",
        "Concurrency: Pro allows 500 concurrent requests; Flash allows 2,500.",
        "Context: both offer 1M native context — roughly 750,000 English words of input.",
        "Self-hosting: full FP4+FP8 Pro weights are estimated at about 862GB VRAM (third-party estimate), so the hosted API is the realistic default.",
        "Watch: peak-hour 2x pricing is announced but not yet in effect.",
      ],
      paragraphs: [
        "What the Flash-0731 result means for you: if your workloads are agentic — coding agents, browser tasks, tool use — [[deepseek-v4-flash|Flash-0731]]'s official numbers already clear Pro-Preview at a third of the price. The flagship still leads on raw world knowledge and deep reasoning, and the premium makes sense for quality-critical, lower-volume calls.",
        "If you need 1M-token context with maximum reasoning effort today, V4 Pro is the strongest model in the family. Just remember it is still a preview build, and treat the GA release date as unconfirmed until DeepSeek announces it.",
        "If you do go the self-hosting route, this is the official vLLM recipe for an 8-GPU setup[7]:",
      ],
      code: `vllm serve deepseek-ai/DeepSeek-V4-Pro --host localhost --port 8001 \\
  --dtype auto --kv-cache-dtype fp8 --tensor-parallel-size 8 \\
  --max-num-seqs 512 --max-num-batched-tokens 8192 \\
  --distributed-executor-backend mp --trust-remote-code \\
  --gpu-memory-utilization 0.9 --tokenizer-mode deepseek_v4 \\
  --reasoning-parser deepseek_v4 --tool-call-parser deepseek_v4 \\
  --enable-auto-tool-choice \\
  --compilation-config '{"mode": 3, "cudagraph_mode": "FULL_DECODE_ONLY"}'`,
      note: "Every figure in this guide comes from DeepSeek's official docs, the model card, or the cited independent evaluations. None of the vendor benchmark numbers have been independently reproduced yet.",
    },
  ],
  prevGuide: {
    title: "Download DeepSeek V4 Flash from HuggingFace & Run It Locally",
    slug: "flash-huggingface",
  },
  nextGuide: undefined,
  relatedGuides: [
    {
      title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release",
      slug: "deepseek-v4-flash",
    },
    {
      title: "DeepSeek V4 Flash Benchmarks: Agentic & Coding Scores in 2026",
      slug: "flash-benchmarks",
    },
    {
      title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%",
      slug: "flash-pricing",
    },
  ],
  sources: [
    { label: "Official DeepSeek API Changelog", url: "https://api-docs.deepseek.com/updates/" },
    { label: "DeepSeek V4 Preview Announcement", url: "https://api-docs.deepseek.com/news/news260424/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek Thinking Mode Guide", url: "https://api-docs.deepseek.com/guides/thinking_mode" },
    { label: "DeepSeek-V4-Pro Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro" },
    { label: "NIST CAISI Evaluation of DeepSeek V4 Pro", url: "https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro" },
    { label: "vLLM Recipe: DeepSeek-V4-Pro", url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Pro" },
    { label: "36kr on DeepSeek V4 GA Timing", url: "https://eu.36kr.com/en/p/3903106705606274" },
  ],
};

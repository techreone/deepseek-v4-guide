import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash
// 内容来源：reference/topics/27-v4-1-flash.md（2026-09-11，全部事实来自官方 changelog / news260910 / HF 模型卡 / vLLM recipe）
export const deepseekV41Flash: GuideContent = {
  slug: "deepseek-v4-1-flash",
  category: "MODEL GUIDE",
  title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained",
  seoTitle: "DeepSeek V4.1 Flash: 552B MoE & 1M Context",
  readTime: "11 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "DeepSeek V4.1 Flash is a 552B-parameter MoE with native vision, 8B/16B asymmetric activation, and a 1M-token context. Full guide to the Sept 10, 2026 release.",
  toc: [
    { id: "step-1", label: "Step 1: What Is DeepSeek V4.1 Flash?" },
    { id: "step-2", label: "Step 2: The Causal Encoder-Decoder Architecture" },
    { id: "step-3", label: "Step 3: 8B Prefill / 16B Decode — and Why It Matters" },
    { id: "step-4", label: "Step 4: Native Multimodal Vision" },
    { id: "step-5", label: "Step 5: KV Cache Cut to 890 Bytes per Token" },
    { id: "step-6", label: "Step 6: Benchmarks vs Opus 5, GPT-5.6 Sol & Kimi K3" },
    { id: "step-7", label: "Step 7: Pricing, Model Names & How to Access It" },
    { id: "step-8", label: "Step 8: What It Means for V4-Flash and V4-Pro" },
  ],
  steps: [
    {
      num: "01",
      title: "What Is DeepSeek V4.1 Flash?",
      description:
        "DeepSeek V4.1 Flash is the smallest model in DeepSeek's new architecture family, released on September 10, 2026. It is a multimodal Mixture-of-Experts (MoE) model with a 552B-parameter backbone, native image understanding, and a 1M-token context window. The MIT-licensed weights are on Hugging Face[4].",
      paragraphs: [
        "It is not a minor refresh of [[deepseek-v4-flash|V4 Flash]]. DeepSeek calls it the first member of a new architecture family designed for a higher capability ceiling, faster inference, higher throughput, and scaling to larger models — and it says that family's flagship, [[deepseek-v4-1-pro|V4.1 Pro]], is still to come[1].",
        "The headline trade is asymmetry: V4.1 Flash activates only 8B parameters per token while reading input (prefill) and 16B while generating output (decode). That split targets agent workloads, which spend most of their time reading fresh context, so cheaper reading makes cheaper agents[2][5].",
      ],
      list: [
        "552B backbone parameters + 196B Engram conditional memory (763B total weights)",
        "Native multimodal vision (text + images) via a 32-layer DeepSeek-ViT",
        "1M-token context; max output 384K tokens",
        "8B active per token at prefill, 16B at decode",
        "MIT-licensed open weights on Hugging Face[4]",
        "API model name changed to deepseek-flash[1]",
      ],
      table: {
        headers: ["Spec", "DeepSeek V4.1 Flash", "DeepSeek V4 Flash (old)"],
        rows: [
          ["Backbone parameters", "552B (MoE)", "284B (MoE)"],
          ["Active per token", "8B prefill / 16B decode", "13B"],
          ["Context window", "1M tokens", "1M tokens"],
          ["Max output", "384K tokens", "384K tokens"],
          ["Input modality", "Text + images (native)", "Text only"],
          ["KV cache", "890 bytes per token", "~4x larger"],
          ["Architecture", "Causal Encoder-Decoder (CED)", "Hybrid CSA + HCA"],
          ["License", "MIT", "MIT"],
        ],
      },
      note: "Every figure here comes from DeepSeek's official changelog, the September 10 news post, or the V4.1 Flash model card. Benchmark and pricing claims are vendor-reported and labeled as such[1][2][4].",
    },
    {
      num: "02",
      title: "The Causal Encoder-Decoder Architecture",
      description:
        "V4.1 Flash uses a Causal Encoder-Decoder (CED) design: a 40-layer Transformer organized as a 20-layer causal encoder followed by a 20-layer decoder. The decoder's global KV cache is projected from the final encoder hidden states rather than derived from each decoder layer's own hidden states[4].",
      paragraphs: [
        "That projection is the trick behind the low activation count. Because the decoder reads from a shared encoded representation, the model does not need every parameter active on every layer. DeepSeek says CED effectively halves prefill computation for sufficiently long sequences, while single-token decode FLOPs rise only about 25% as context grows 256-fold from 4K to 1M tokens[5].",
        "On top of CED sit three more components. Compressed Sparse Attention 2 (CSA2) assigns each attention layer one of three static modes — Full, Reindex, or Reuse — to share main KV and indexer keys across layers. A Hierarchical Sparse Indexer restricts later indexing layers to a candidate pool built by the first Full-Mode layer, bounding deeper indexer cost independently of context length. Single-Pass mHC (manifold-constrained hyper-connections) revises residual-stream mixing[4].",
      ],
      list: [
        "40 layers: 20-layer causal encoder + 20-layer decoder",
        "Hidden size 5120; 1 shared + 384 routed experts per MoE layer",
        "6 routed experts activated per token",
        "CSA2 with Full / Reindex / Reuse layer modes",
        "Hierarchical Sparse Indexer: candidate pool of 2048 blocks of 8, best 512 kept per query",
        "Engram n-gram memory: 196B params across two hash tables (layers 1 and 14)",
        "DSpark speculative decoding head for faster generation[4]",
      ],
      note: "DeepSeek warns the new architecture creates robustness boundaries it has not fully characterized — potential CSA2 sparse-selection errors and SWA state reconstruction could degrade capability in untested edge cases[5].",
    },
    {
      num: "03",
      title: "8B Prefill / 16B Decode — and Why It Matters",
      description:
        "V4.1 Flash does not activate 8B parameters across the whole inference cycle. It activates 8B during prefill (reading input) and 16B during decode (generating output). This is the single most misreported spec of the release[5].",
      paragraphs: [
        "The asymmetry is deliberate. An agent that repeatedly reads a repository, tool definitions, and conversation history is input-heavy: it ingests far more tokens than it emits. Making the read path cheap lowers the cost of exactly that pattern, which is why DeepSeek frames V4.1 Flash as an agent-first model.",
        "It is also why the name is misleading. V4.1 Flash has a larger total footprint than the old V4 Flash (552B vs 284B backbone, a ~94% jump), and its decode path activates 16B versus V4 Flash's 13B. On the Hacker News launch thread, developers questioned whether a 552B model is 'not really flash anymore,' noting that self-hosting becomes far more demanding even if serving is more efficient[5][3].",
      ],
      table: {
        headers: ["Phase", "What happens", "Active params"],
        rows: [
          ["Prefill (read)", "Model ingests input context", "8B per token"],
          ["Decode (write)", "Model generates output tokens", "16B per token"],
          ["Old V4 Flash (both)", "Single activation count", "13B per token"],
        ],
      },
      note: "For builders buying inference from DeepSeek, the asymmetry shows up as lower API pricing. For teams self-hosting the MIT weights, it raises the hardware bar: the checkpoint is about 511 GB on disk[5][6].",
    },
    {
      num: "04",
      title: "Native Multimodal Vision",
      description:
        "V4.1 Flash natively processes images and text, and generates text autoregressively. A vision encoder (DeepSeek-ViT, trained from scratch with 2D-RoPE and 3x3 pixel-unshuffle downsampling) and a two-layer MLP projector turn images into visual embeddings, processed jointly with text from the start of pre-training[4].",
      paragraphs: [
        "This replaces the separate experimental V4-Flash-Vision-Exp model. Images enter the prompt as <|deepseek_image|> spans, and the router applies a separate routing bias for tokens inside an image span, so vision and text tokens do not compete for the same experts[6].",
      ],
      list: [
        "32-layer ViT at hidden size 1024, patch 14",
        "3x downsampling aligner; up to 1024 tokens per image (minimum 295,936 pixels)",
        "No limit on images per prompt",
        "MMMU-Pro 56.5, CVBench 77.9, DocVQA 95.6 on the base model[4]",
      ],
      note: "DeepSeek admits the model still lags the best closed systems at reading complicated images. Vision is supported on the API; the old V4-Pro did not support it at all[5][3].",
    },
    {
      num: "05",
      title: "KV Cache Cut to 890 Bytes per Token",
      description:
        "The engineering claim with the biggest cost impact is memory. V4.1 Flash stores its global KV cache at 890 bytes per token — roughly one-quarter of V4-Flash's HBM footprint and one-eighth of its SSD storage. Compared with DeepSeek V1, that is about a 437-fold reduction[2][5].",
      paragraphs: [
        "The mechanism is a combination of CSA2, the hierarchical sparse indexer, and FP4 main KV caching (E2M1 format, one E4M3 scale per 16 channels). SWA Bounded Replay reconstructs missing sliding-window-attention states by replaying only the most recent n_win tokens instead of persisting them to SSD[4].",
        "DeepSeek says global KV stays in its persistent cache with a guaranteed lifetime of at least 72 hours, while short-lived SWA KV lives in a distributed memory pool provisioned from 10% of host DRAM. When the long-lived global cache survives but the SWA state does not, V4.1 Flash replays only the most recent window rather than full history[5].",
      ],
      note: "Because cache-hit charges can dominate agent bills, compressing the cache cuts real costs. See the [[v4-1-flash-kv-cache|KV cache deep dive]] for the full mechanism.",
    },
    {
      num: "06",
      title: "Benchmarks vs Opus 5, GPT-5.6 Sol & Kimi K3",
      description:
        "DeepSeek reports V4.1 Flash at max reasoning effort (100). On DeepSWE v1.1 it scores 74.2, ahead of Claude Opus 5 (74.0) and GPT-5.6 Sol (73.0). On CyberGym it scores 88.1, ahead of every rival with a listed score[3][4].",
      paragraphs: [
        "On Terminal-Bench 2.1 it reaches 90.6, the highest in DeepSeek's table. But the results are not uniformly dominant: Opus 5 leads on Terminal-Bench 3.0 (43.3 vs 30.0), Terminal-Bench 4.0 (51.8 vs 31.2), HLE (56.3 vs 36.8), and ProgramBench (37.0 vs 20.3). GPT-5.6 Sol leads GPQA Diamond and SEC-Bench Pro[3][4].",
        "A hidden cost variable sits inside those numbers: DeepSeek ran the table at max effort. Its own tests show effort 25 to 100 raises DeepSWE from 66.0 to 74.2 and Terminal-Bench 2.1 from 82.4 to 90.6, but consumes roughly 2.5x the output tokens. Effort levels between 60 and 80 recover most of the accuracy at less than half the token budget[5].",
      ],
      table: {
        headers: ["Benchmark", "V4.1 Flash", "Opus-5.0", "GPT-5.6 Sol", "Kimi K3"],
        rows: [
          ["Terminal-Bench 2.1", "90.6", "89.1", "88.8", "88.3"],
          ["Terminal-Bench 4.0", "31.2", "51.8", "39.9", "12.6"],
          ["DeepSWE v1.1", "74.2", "74.0", "73.0", "67.5"],
          ["CyberGym", "88.1", "—", "84.5", "80.0"],
          ["GPQA Diamond", "90.9", "93.4", "94.1", "92.9"],
          ["HLE", "36.8", "56.3", "44.5", "43.5"],
        ],
      },
      note: "All scores are DeepSeek-run evaluations and have not been independently verified by this site. See [[v4-1-flash-benchmarks|the full benchmark breakdown]] for every row and the multi-scaffold table[3][4].",
    },
    {
      num: "07",
      title: "Pricing, Model Names & How to Access It",
      description:
        "The API model name is now deepseek-flash. Off-peak, one million cached input tokens cost $0.003, uncached input $0.15, and output $0.60. Peak rates are double. The new pricing took effect at 04:00 UTC on September 10, 2026[3].",
      paragraphs: [
        "Legacy names still work: deepseek-v4-flash and deepseek-v4-flash-vision-exp are retired but temporarily route to V4.1 Flash. The base URL is unchanged — https://api.deepseek.com for OpenAI-compatible calls, or https://api.deepseek.com/anthropic for the Anthropic format[1][3].",
        "Official partners WorkBuddy (including CodeBuddy) and OpenCode already support the model. Coding tools connect through documented flows: OpenCode's /connect deepseek command, Claude Code's ANTHROPIC_BASE_URL environment variables, and OpenClaw's onboarding[2][7].",
      ],
      list: [
        "model: deepseek-flash",
        "Off-peak: $0.003 cache hit / $0.15 cache miss / $0.60 output per 1M",
        "Peak (weekday mornings UTC): double those rates",
        "Concurrency limit: 2,500",
        "Supports Responses API, Anthropic API, JSON Output, Tool Calls, vision[3]",
      ],
      note: "Reasoning effort is now a continuous 1-100 integer, not the old low/high/max only. See [[v4-1-flash-api-setup|the API setup guide]] and [[v4-1-flash-reasoning-effort|the reasoning effort guide]].",
    },
    {
      num: "08",
      title: "What It Means for V4-Flash and V4-Pro",
      description:
        "V4.1 Flash replaces the entire old Flash line and is set to absorb V4-Pro traffic too. V4-Flash and V4-Flash-Vision-Exp are retired and routed to V4.1 Flash. From 04:00 UTC on September 14, 2026, every deepseek-v4-pro request routes to V4.1 Flash at Flash rates, until V4.1 Pro launches[1][2].",
      paragraphs: [
        "DeepSeek says multiple parties' tests put V4.1 Flash ahead of V4-Pro on performance, cost, speed, and total runtime — its stated reason for phasing out the flagship. Because the old model ids are silently rerouted rather than deleted, teams with tightly tuned prompts or agent behavior should re-run regression tests rather than assume the swap is safe[3][5].",
      ],
      table: {
        headers: ["Old model name", "Status", "What serves it now"],
        rows: [
          ["deepseek-v4-flash", "Retired", "Routes to V4.1 Flash"],
          ["deepseek-v4-flash-vision-exp", "Retired", "Routes to V4.1 Flash"],
          ["deepseek-v4-pro", "Being phased out", "Routes to V4.1 Flash from Sept 14"],
          ["deepseek-flash", "Current", "V4.1 Flash"],
        ],
      },
      note: "Read the dedicated [[deepseek-v4-pro-retired|V4-Pro retirement and routing guide]] for the timeline, the reasons, and the developer pushback[8][9].",
    },
  ],
  prevGuide: undefined,
  nextGuide: {
    title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates",
    slug: "v4-1-flash-pricing",
  },
  relatedGuides: [
    { title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates", slug: "v4-1-flash-pricing" },
    { title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table", slug: "v4-1-flash-benchmarks" },
    { title: "DeepSeek V4.1 Flash API Setup: deepseek-flash & Migration", slug: "v4-1-flash-api-setup" },
    { title: "V4.1 Flash vs V4 Flash: 552B, CED & the 94% Jump", slug: "v4-1-flash-vs-v4-flash" },
    { title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash", slug: "deepseek-v4-pro-retired" },
  ],
  sources: [
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "VentureBeat: V4.1-Flash Debuts at $0.003/1M Off-Peak", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
    { label: "vLLM Recipes: DeepSeek-V4.1-Flash", url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "DeepSeek Docs: Integrate with AI Tools", url: "https://api-docs.deepseek.com/guides/coding_agents/" },
    { label: "The Next Web: V4.1-Flash Launch and V4-Pro Retirement", url: "https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut" },
    { label: "Hacker News: V4.1 Flash Launch Discussion", url: "https://news.ycombinator.com/item?id=49624603" },
  ],
};

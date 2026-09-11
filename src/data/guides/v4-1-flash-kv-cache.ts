import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash kv cache
// 内容来源：reference/topics/27-v4-1-flash.md（HF 模型卡 + vLLM recipe，2026-09-11）
export const v41FlashKvCache: GuideContent = {
  slug: "v4-1-flash-kv-cache",
  category: "TECHNICAL",
  title: "DeepSeek V4.1 Flash KV Cache: 890 Bytes per Token Explained",
  seoTitle: "DeepSeek V4.1 Flash KV Cache: 890 Bytes",
  readTime: "9 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "How DeepSeek V4.1 Flash stores its KV cache in 890 bytes per token: CED projection, CSA2, a hierarchical sparse indexer, FP4 KV and 72h persistence.",
  toc: [
    { id: "step-1", label: "Step 1: The Headline Number: 890 Bytes per Token" },
    { id: "step-2", label: "Step 2: CED Projection and Where the Cache Comes From" },
    { id: "step-3", label: "Step 3: CSA2 and Its Three Layer Modes" },
    { id: "step-4", label: "Step 4: The Hierarchical Sparse Indexer" },
    { id: "step-5", label: "Step 5: FP4 Main KV with E2M1 and E4M3 Scales" },
    { id: "step-6", label: "Step 6: SWA Bounded Replay" },
    { id: "step-7", label: "Step 7: 72-Hour Persistence and a 10% DRAM Pool" },
    { id: "step-8", label: "Step 8: What the KV Cache Means for Cost" },
  ],
  steps: [
    {
      num: "01",
      title: "The Headline Number: 890 Bytes per Token",
      description:
        "DeepSeek V4.1 Flash stores its global KV cache at 890 bytes per token. That is roughly one-quarter of what V4-Flash used in HBM and one-eighth of its SSD storage footprint. Measured against DeepSeek V1, the company describes it as about a 437-fold reduction[3][5].",
      paragraphs: [
        "KV cache is the working memory an attention model keeps for every token it has already read. At a million tokens of context, even a few kilobytes per token becomes hundreds of gigabytes, so per-token cache size is what decides whether long-context serving is affordable[3].",
        "V4.1 Flash attacks that number with four mechanisms stacked together: a causal encoder-decoder projection, Compressed Sparse Attention 2, a hierarchical sparse indexer, and FP4 storage for the main KV. Each is documented on the model card and the vLLM recipe page[1][2].",
      ],
      list: [
        "890 bytes per token for the global KV cache[1]",
        "Roughly one-quarter of V4-Flash's HBM footprint[3]",
        "Roughly one-eighth of V4-Flash's SSD storage[3]",
        "About a 437x reduction versus DeepSeek V1[3]",
      ],
      note: "The figure describes the global cache; a separate sliding-window cache lives in a DRAM pool and is reconstructed on demand[1].",
    },
    {
      num: "02",
      title: "CED Projection and Where the Cache Comes From",
      description:
        "V4.1 Flash is a Causal Encoder-Decoder model: 40 Transformer layers split into a 20-layer causal encoder and a 20-layer decoder. The decoder's global KV cache is projected from the final encoder hidden states rather than derived separately at every decoder layer[1].",
      paragraphs: [
        "That projection is the structural reason the cache can be small. Because every decoder layer reads from one shared encoded representation, there is no need to store a full per-layer KV set for the decoder's global attention[1][5].",
        "In FLOP terms, DeepSeek says CED roughly halves prefill computation on long sequences, while single-token decode FLOPs rise only about 25% as context grows 256-fold from 4K to 1M tokens[3].",
      ],
      note: "The cache layout follows the architecture. Change CED and you change what is cached, which is why V4.1 Flash cache numbers are not directly comparable to V4-Flash's[1][3].",
    },
    {
      num: "03",
      title: "CSA2 and Its Three Layer Modes",
      description:
        "Compressed Sparse Attention 2 assigns every attention layer one of three static modes: Full, Reindex, or Reuse. The modes determine how main KV and indexer keys are shared across layers, so not every layer pays the full storage cost[1].",
      paragraphs: [
        "Full-mode layers produce the reference representation. Reindex layers rebuild their indexing from that reference, and Reuse layers simply share it. Because the assignment is static, the serving stack knows the cache layout at load time and can plan memory accordingly[1][5].",
        "DeepSeek notes that CSA2's sparse selection introduces robustness boundaries it has not fully characterised. It warns that sparse-selection errors could degrade capability in untested edge cases, a caveat the model card states openly[3].",
      ],
      list: [
        "Full: produces the reference KV and indexer keys[1]",
        "Reindex: rebuilds the index from the reference[1]",
        "Reuse: shares the reference representation[1]",
      ],
      note: "Static modes are a memory-planning feature: a predictable layout is worth as much as raw compression when serving at scale[1].",
    },
    {
      num: "04",
      title: "The Hierarchical Sparse Indexer",
      description:
        "A hierarchical sparse indexer restricts later indexing layers to a candidate pool built by the first Full-mode layer. The pool is 2,048 blocks of 8 tokens, and each query keeps its best 512 candidates[1].",
      paragraphs: [
        "The hierarchy is what bounds cost independently of context length. Instead of every indexer layer searching the entire sequence, deeper layers search an already-narrowed candidate set, so indexer work grows with the pool rather than with the full 1M context[1].",
        "Combined with CSA2, this is the part of the design that makes sparse attention practical at a million tokens: the model keeps enough signal to retrieve the right blocks while paying for a bounded subset of them[1][3].",
      ],
      note: "Sparse retrieval is a quality trade-off as well as a cost win. DeepSeek flags it as one of the architecture's uncharacterised robustness boundaries[3].",
    },
    {
      num: "05",
      title: "FP4 Main KV with E2M1 and E4M3 Scales",
      description:
        "The main KV cache is stored in FP4 using the E2M1 format, with one E4M3 scale per 16 channels. That micro-block scaling keeps precision usable while cutting the bytes per stored value roughly in half versus an FP8 layout[1].",
      paragraphs: [
        "E2M1 gives four bits per value, so a block of values plus a shared scale is far smaller than the same data at BF16. The per-16-channel E4M3 scale is the compromise that stops outliers from destroying accuracy[1].",
        "This is a deliberate precision decision, not a lossless shortcut. DeepSeek pairs it with native quantization-aware training for the model weights, so the cache format and the weight format are designed as a set rather than assembled after the fact[1].",
      ],
      note: "The routed expert weights are also MXFP4, so FP4 appears on both the weight and cache sides of the memory budget[1].",
    },
    {
      num: "06",
      title: "SWA Bounded Replay",
      description:
        "Sliding-window attention needs its own state, and V4.1 Flash does not persist all of it. SWA Bounded Replay reconstructs missing sliding-window states by replaying only the most recent n_win tokens instead of keeping them on SSD[1].",
      paragraphs: [
        "Bounded replay is what removes a large slice of the storage cost. When short-lived window state is evicted, the server does not reload it from disk; it simply recomputes the recent window, which is cheap because the window is small[1][3].",
        "The consequence is a two-tier cache: a long-lived global representation that is expensive to lose, and a cheap, reconstructable window state. DeepSeek's design leans on that asymmetry to keep storage requirements down[1].",
      ],
      note: "Replay trades a little recompute for a lot of storage, which is usually the right trade in long-context serving[1].",
    },
    {
      num: "07",
      title: "72-Hour Persistence and a 10% DRAM Pool",
      description:
        "DeepSeek guarantees the global, long-lived KV cache a lifetime of at least 72 hours in its persistent cache. The short-lived SWA KV lives in a distributed memory pool provisioned from 10% of host DRAM[3].",
      paragraphs: [
        "When the global cache survives but the SWA window state does not, V4.1 Flash replays only the most recent window rather than the full history. That hierarchy is why the persistent cache can be useful without being enormous[3].",
        "For API users, the 72-hour window is what makes cache-hit pricing meaningful on agent workloads: a session that pauses and resumes within three days can still start from a warm cache[3][6].",
      ],
      list: [
        "Global KV persistent lifetime: at least 72 hours[3]",
        "SWA KV pool: 10% of host DRAM[3]",
        "On SWA eviction: replay the recent window only[3]",
      ],
      note: "Cache hits are priced at a small fraction of cache misses; see [[v4-1-flash-pricing|the pricing guide]] for the exact rates[6].",
    },
    {
      num: "08",
      title: "What the KV Cache Means for Cost",
      description:
        "Because cache-hit charges can dominate an agent's bill, shrinking the cache changes real economics. DeepSeek prices cached input at a fraction of uncached input, so a smaller cache per token means more of a long context fits in the cheap tier[6].",
      paragraphs: [
        "The combined effect of CED, CSA2, the hierarchical indexer, FP4 KV and bounded replay is that V4.1 Flash can hold a 1M-token context at roughly a quarter of the HBM and an eighth of the SSD of its predecessor. For input-heavy agents that repeatedly read a repository or tool definitions, that is the difference between a viable and an unviable unit cost[3][5].",
        "VentureBeat frames the same point from the billing side: caching economics are central to agent costs, and a model that compresses its cache is effectively cheaper per unit of retained context even before the per-token rate is applied[5].",
      ],
      list: [
        "Smaller per-token cache means more context in the cheap tier[6]",
        "Input-heavy agents benefit most[5]",
        "A 72-hour lifetime enables warm restarts[3]",
      ],
      note: "For the architecture that produces this cache, see [[deepseek-v4-1-flash|the V4.1 Flash overview]]; for deployment memory, see [[v4-1-flash-local-deployment|the local deployment guide]][1][2].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates", slug: "v4-1-flash-pricing" },
    { title: "Run DeepSeek V4.1 Flash Locally: VRAM, vLLM & Quantization", slug: "v4-1-flash-local-deployment" },
    { title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table", slug: "v4-1-flash-benchmarks" },
    { title: "DeepSeek V4 Technical Report Explained: Architecture & Benchmarks", slug: "official-tech-report" },
  ],
  sources: [
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "vLLM Recipes: DeepSeek-V4.1-Flash", url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "VentureBeat: V4.1-Flash Debuts at $0.003/1M Off-Peak", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
  ],
};

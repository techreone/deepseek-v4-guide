import type { GuideContent } from "./types";

// target keyword: v4.1 flash vs v4 flash
// 内容来源：reference/topics/27-v4-1-flash.md 与 28-v4-pro-retired-routing.md（2026-09-11）
export const v41FlashVsV4Flash: GuideContent = {
  slug: "v4-1-flash-vs-v4-flash",
  category: "COMPARISON",
  title: "DeepSeek V4.1 Flash vs V4 Flash: 552B, CED & the 94% Jump",
  seoTitle: "V4.1 Flash vs V4 Flash: 552B & CED",
  readTime: "9 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "DeepSeek V4.1 Flash vs V4 Flash: 552B vs 284B parameters, 8B/16B vs 13B activation, CED vs CSA+HCA, and a KV cache cut to one-quarter.",
  toc: [
    { id: "step-1", label: "Step 1: The Two Models at a Glance" },
    { id: "step-2", label: "Step 2: Parameters — 284B to 552B (+94%)" },
    { id: "step-3", label: "Step 3: Activation — 13B to 8B Prefill / 16B Decode" },
    { id: "step-4", label: "Step 4: Architecture — Hybrid CSA + HCA to CED" },
    { id: "step-5", label: "Step 5: KV Cache Cut to 890 Bytes per Token" },
    { id: "step-6", label: "Step 6: Benchmark Deltas — DeepSWE +19.8, TB2.1 +7.9" },
    { id: "step-7", label: "Step 7: Pricing — V4.1 Flash Is Cheaper" },
    { id: "step-8", label: "Step 8: Migration — Retired IDs & Regression Tests" },
  ],
  steps: [
    {
      num: "01",
      title: "The Two Models at a Glance",
      description:
        "DeepSeek V4.1 Flash arrived on September 10, 2026 as the smallest model in a brand-new architecture family, replacing the 284B-parameter V4 Flash that shipped in July. Both are MIT-licensed MoE models with a 1M-token context and 384K max output, but almost nothing under the hood is the same[1][2].",
      paragraphs: [
        "The old [[deepseek-v4-flash|V4 Flash]] was the 0731 build: 284B total parameters, 13B active per token, text-only input, and a hybrid CSA plus HCA attention design. V4.1 Flash keeps the 1M window but raises the backbone to 552B, adds 196B of Engram conditional memory, switches to a Causal Encoder-Decoder (CED) core, and gains native image understanding[2][4].",
        "DeepSeek's own framing is that V4.1 is not a refresh but the first member of a new family designed for a higher capability ceiling, faster inference, higher throughput, and scaling to larger models — which is why [[deepseek-v4-1-pro|V4.1 Pro]] is expected as the family flagship[2].",
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
      note: "Every V4.1 Flash figure comes from DeepSeek's official changelog, the September 10 news post, or the Hugging Face model card. V4 Flash figures come from the 0731 release documentation[1][2][4].",
    },
    {
      num: "02",
      title: "Parameters — 284B to 552B (+94%)",
      description:
        "The most visible difference is size. The V4.1 Flash backbone is 552B parameters against V4 Flash's 284B — a 94% increase. Count the 196.6B Engram conditional-memory tables and the total set of weights is roughly 763B, which is why the checkpoint needs about 511 GB of disk[4][5][6].",
      paragraphs: [
        "Engram is n-gram memory: two hash tables at layers 1 and 14, each roughly 384 million rows by 256 dimensions, looked up by 4-gram hash. It is conditional, so it does not activate on every token the way a dense layer would, which keeps the computed cost below what the headline number suggests[4].",
        "The jump drew immediate criticism. On the Hacker News launch thread, developers argued that a 552B model is 'not really flash anymore,' because self-hosting it now demands far more hardware even if DeepSeek's own serving stack is more efficient[6][8]. The name reflects a product tier, not a small footprint.",
      ],
      list: [
        "552B backbone parameters (MoE)",
        "196.6B Engram conditional memory → ~763B total weights shown on Hugging Face",
        "Checkpoint size roughly 511 GB on disk",
        "Routed experts quantized MXFP4; remaining weights MXFP8 block-quantized",
        "MIT license, same as V4 Flash",
      ],
      note: "For local deployment the hardware bar rose sharply versus V4 Flash. See [[v4-1-flash-local-deployment|the local deployment guide]] and [[flash-model-size|the older Flash model-size breakdown]] for context[5][6].",
    },
    {
      num: "03",
      title: "Activation — 13B to 8B Prefill / 16B Decode",
      description:
        "V4 Flash activated 13B parameters on every token. V4.1 Flash splits that into 8B during prefill (reading input) and 16B during decode (writing output). Calling it an '8B model' is the single most common misreading of the release[4][6].",
      paragraphs: [
        "The asymmetry is deliberate and aimed at agents. A coding agent reads repository files, tool schemas, and conversation history far more than it writes, so it ingests many more tokens than it emits. Making the read path roughly half the cost of the write path lowers the cost of exactly that traffic[6].",
        "At the layer level the model has a hidden size of 5120, one shared expert plus 384 routed experts per MoE layer, and it activates six routed experts per token[4]. That sparse pattern is what allows a 552B model to run without paying for all 552B on every step.",
      ],
      table: {
        headers: ["Phase", "What happens", "Active params"],
        rows: [
          ["Prefill (read)", "Model ingests input context", "8B per token"],
          ["Decode (write)", "Model generates output tokens", "16B per token"],
          ["V4 Flash (both)", "Single activation count", "13B per token"],
        ],
      },
      note: "For API buyers the asymmetry shows up as lower prices. For teams running the MIT weights themselves it raises the bar, because decode still activates 16B and the checkpoint is large[5][6].",
    },
    {
      num: "04",
      title: "Architecture — Hybrid CSA + HCA to CED",
      description:
        "V4 Flash used a hybrid of Compressed Sparse Attention and hierarchical cross attention. V4.1 Flash replaces it with a 40-layer Causal Encoder-Decoder: 20 causal encoder layers followed by 20 decoder layers. The decoder's global KV cache is projected from the encoder's final hidden states rather than each decoder layer's own hidden states[4].",
      paragraphs: [
        "That projection is the mechanism behind the low activation count. Because the decoder reads a shared encoded representation, not every parameter must be live on every layer. DeepSeek says CED roughly halves prefill computation for long sequences while single-token decode FLOPs rise only about 25% as context grows 256-fold from 4K to 1M tokens[6].",
        "Three more components ride on CED. Compressed Sparse Attention 2 (CSA2) gives each attention layer one of three static modes — Full, Reindex, or Reuse — to share main KV and indexer keys across layers. A Hierarchical Sparse Indexer limits deeper indexing layers to a candidate pool built by the first Full layer. Single-Pass manifold-constrained hyper-connections (mHC) revise residual-stream mixing[4].",
      ],
      list: [
        "40 layers total: 20-layer causal encoder + 20-layer decoder",
        "CSA2 with Full / Reindex / Reuse per-layer modes",
        "Hierarchical Sparse Indexer: candidate pool of 2048 blocks of 8, best 512 kept per query",
        "Engram n-gram memory at layers 1 and 14",
        "DSpark speculative decoding head for faster generation[4]",
      ],
      note: "DeepSeek warns the new architecture creates robustness boundaries it has not fully characterized — potential CSA2 sparse-selection errors and sliding-window state reconstruction could degrade capability in untested edge cases[6].",
    },
    {
      num: "05",
      title: "KV Cache Cut to 890 Bytes per Token",
      description:
        "The change with the biggest cost impact is memory. V4.1 Flash stores its global KV cache at 890 bytes per token — about one-quarter of V4 Flash's HBM footprint and one-eighth of its SSD storage. Against DeepSeek V1 that is roughly a 437-fold reduction[2][6].",
      paragraphs: [
        "The saving comes from combining CSA2, the hierarchical sparse indexer, and FP4 main-KV caching in E2M1 format with one E4M3 scale per 16 channels. SWA Bounded Replay reconstructs missing sliding-window-attention states by replaying only the most recent n_win tokens instead of persisting them to disk[4].",
        "For agent workloads, where cache-hit charges can dominate the bill, shrinking the cache is a direct cost cut. It is also what lets DeepSeek drop the cache-hit input price to $0.003 per million tokens while keeping the cache alive for at least 72 hours[2][3].",
      ],
      note: "The full mechanism — persistent cache, distributed SWA pool, and replay policy — is covered in the [[v4-1-flash-kv-cache|KV cache deep dive]].",
    },
    {
      num: "06",
      title: "Benchmark Deltas — DeepSWE +19.8, TB2.1 +7.9",
      description:
        "The generation gap shows most clearly in agentic coding. DeepSWE v1.1 jumps from 54.4 on V4 Flash to 74.2 on V4.1 Flash — a 19.8-point gain. Terminal-Bench 2.1 rises from 82.7 to 90.6, and the harder Terminal-Bench 4.0 climbs from 7.0 to 31.2[4].",
      paragraphs: [
        "CyberGym rises from 76.7 to 88.1 and ExploitGym from 1.8 to 15.3. NL2Repo-Bench goes from 54.2 to 64.0 and AutomationBench from 37.7 to 54.8. A few benchmarks were never reported for V4 Flash at all, such as ProgramBench and Codeforces, which now appear only on the V4.1 side[4].",
        "Not everything rises. GPQA Diamond edges from 89.9 to 90.9, but the text-subset HLE figure slips from 37.8 to 36.8 — a reminder that HLE rows are not always directly comparable. The headline remains that a model DeepSeek positions below its flagship beats the retired flagship on most agent tasks[4].",
      ],
      table: {
        headers: ["Benchmark", "V4.1 Flash", "V4 Flash (old)", "Delta"],
        rows: [
          ["DeepSWE v1.1", "74.2", "54.4", "+19.8"],
          ["Terminal-Bench 2.1", "90.6", "82.7", "+7.9"],
          ["Terminal-Bench 4.0", "31.2", "7.0", "+24.2"],
          ["CyberGym", "88.1", "76.7", "+11.4"],
          ["NL2Repo-Bench", "64.0", "54.2", "+9.8"],
          ["AutomationBench", "54.8", "37.7", "+17.1"],
          ["GPQA Diamond", "90.9", "89.9", "+1.0"],
          ["HLE (text subset)", "36.8", "37.8", "−1.0"],
        ],
      },
      note: "All scores are DeepSeek-run evaluations and have not been independently verified by this site. See [[v4-1-flash-benchmarks|the full benchmark table]] for every row and the multi-scaffold results[4].",
    },
    {
      num: "07",
      title: "Pricing — V4.1 Flash Is Cheaper",
      description:
        "Despite the larger backbone, V4.1 Flash costs less than the model it replaces. Off-peak, it charges $0.003 per million cached input tokens, $0.15 uncached, and $0.60 for output. The 0731 V4 Flash, on the peak/off-peak schedule introduced August 16, charged $0.007, $0.22, and $0.66[3].",
      paragraphs: [
        "Peak rates, which apply during weekday mornings UTC, are double in both cases: $0.006 / $0.30 / $1.20 for V4.1 Flash. The concurrency limit stays at 2,500, and the cache-hit price falls by more than half — a meaningful cut for agents that reuse long prefixes[3].",
        "DeepSeek attributes the lower price to the new architecture's efficiency rather than to a subsidy. Bloomberg Intelligence estimated the effective cut at up to 32% relative to the post-August prices, even as the model itself grew[2][6].",
      ],
      table: {
        headers: ["Per 1M tokens", "V4.1 Flash off-peak", "V4 Flash off-peak", "V4.1 Flash peak"],
        rows: [
          ["Input (cache hit)", "$0.003", "$0.007", "$0.006"],
          ["Input (cache miss)", "$0.15", "$0.22", "$0.30"],
          ["Output", "$0.60", "$0.66", "$1.20"],
          ["Concurrency", "2,500", "2,500", "2,500"],
        ],
      },
      note: "Prices per DeepSeek's official pricing page, effective 04:00 UTC on September 10, 2026. See [[v4-1-flash-pricing|the V4.1 Flash pricing guide]] and [[flash-pricing|the older Flash pricing page]] for the full rate history[1][3].",
    },
    {
      num: "08",
      title: "Migration — Retired IDs & Regression Tests",
      description:
        "V4 Flash is gone from the model list. On September 10, 2026, DeepSeek retired deepseek-v4-flash and deepseek-v4-flash-vision-exp and silently routed them to V4.1 Flash. The current API model name is deepseek-flash[1][2].",
      paragraphs: [
        "Because the old IDs are rerouted rather than deleted, existing code keeps working — but the model behind the identifier has changed. For teams with tightly tuned prompts or agent behavior, that means regression tests recorded against V4 Flash no longer prove anything about today's output[7].",
        "The migration checklist is short but necessary: update the model string to deepseek-flash where you can, re-record golden outputs, re-check token budgets because activation changed, and re-verify any vision calls, since the old vision-exp path now resolves to native V4.1 Flash vision[1][4].",
      ],
      list: [
        "deepseek-v4-flash → retired, routes to V4.1 Flash",
        "deepseek-v4-flash-vision-exp → retired, routes to V4.1 Flash",
        "deepseek-flash → current V4.1 Flash API name[1]",
        "Re-run regression suites; behavior may change even where scores improved",
        "Vision is now native, so the old experimental vision route can be dropped[4]",
      ],
      note: "Read [[v4-1-flash-api-setup|the API setup and migration guide]] and [[deepseek-flash-model-names|the model-names reference]] to avoid calling a retired identifier in production[1][8].",
    },
  ],
  relatedGuides: [
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table", slug: "v4-1-flash-benchmarks" },
    { title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates", slug: "v4-1-flash-pricing" },
    { title: "What Is DeepSeek V4 Flash? The 0731 Release", slug: "deepseek-v4-flash" },
    { title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash", slug: "deepseek-v4-pro-retired" },
  ],
  sources: [
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "vLLM Recipes: DeepSeek-V4.1-Flash", url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "VentureBeat: V4.1-Flash Debuts at $0.003/1M Off-Peak", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
    { label: "The Next Web: V4.1-Flash Launch and V4-Pro Retirement", url: "https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut" },
    { label: "Hacker News: V4.1 Flash Launch Discussion", url: "https://news.ycombinator.com/item?id=49624603" },
  ],
};

import type { GuideContent } from "./types";

// target keyword: deepseek v4 technical report
export const officialTechReport: GuideContent = {
  slug: "official-tech-report",
  category: "TECHNICAL DEEP DIVE",
  title: "DeepSeek V4 Technical Report Explained: Architecture & Benchmarks",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "The DeepSeek V4 technical report (arXiv 2606.19348) explains CSA+HCA attention, mHC, and Muon, cutting 1M-context FLOPs to 27% of V3.2.",
  toc: [
    { id: "step-1", label: "What Is the DeepSeek V4 Technical Report?" },
    { id: "step-2", label: "Three Architecture Upgrades: CSA+HCA, mHC, and Muon" },
    { id: "step-3", label: "The Million-Token Efficiency Numbers" },
    { id: "step-4", label: "Training Data & Two-Stage Post-Training" },
    { id: "step-5", label: "Official Base Model Benchmarks" },
    { id: "step-6", label: "Official Pricing & Recommended Sampling" },
    { id: "step-7", label: "Local Deployment Commands" },
    { id: "step-8", label: "How to Read the Official Model Card" },
  ],
  steps: [
    {
      num: "01",
      title: "What Is the DeepSeek V4 Technical Report?",
      description:
        "The DeepSeek V4 technical report, “DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence,” was submitted to arXiv on April 26, 2026, as paper 2606.19348[1]. It is a preview paper that documents the two MoE models DeepSeek released two days earlier on April 24: [[v4-pro|DeepSeek V4 Pro]] (1.6T total / 49B active parameters) and [[deepseek-v4-flash|DeepSeek V4 Flash]] (284B total / 13B active), both supporting a 1M-token context.",
      paragraphs: [
        "The paper is credited to “DeepSeek-AI and 318 other authors.” The same content is also published as an official PDF inside the V4-Pro Hugging Face repository[3], and the model cards, the paper page, and DeepSeek's official news post all point to the same April 24 preview release[6].",
        "The report's stated goal is efficiency at scale, not benchmark bragging. From DeepSeek's launch blog: “The benchmark numbers are competitive, but not SOTA. It doesn't matter. The real innovation is how DeepSeek v4 is designed for efficient large context length support, and hence as one of the best candidates for agentic tasks”[5].",
      ],
      note: "The paper itself is the primary source for every architecture claim in this guide. The model cards and official API docs add the product-facing numbers.",
    },
    {
      num: "02",
      title: "Three Architecture Upgrades: CSA+HCA, mHC, and Muon",
      description:
        "Chapter 2 of the report names three upgrades that carry most of the efficiency story: Hybrid Attention, Manifold-Constrained Hyper-Connections, and the Muon optimizer.",
      list: [
        "Hybrid Attention (CSA + HCA): Compressed Sparse Attention and Heavily Compressed Attention are interleaved across layers, cutting the attention cost that dominates long-context inference[2].",
        "mHC (Manifold-Constrained Hyper-Connections): residual mappings are constrained to the doubly stochastic matrix manifold (the Birkhoff polytope), with spectral norm at most 1, to stabilize cross-layer signal propagation.",
        "Muon: replaces AdamW as the optimizer for most modules, delivering faster convergence and more stable training.",
      ],
      paragraphs: [
        "Against V3, the report lists further changes: attention moved from the MLA family to the CSA/HCA hybrid, several early dense FFN layers became Hash-routing MoE, expert affinity activation switched from Sigmoid to Sqrt(Softplus(·)), and QK-Clip was removed in favor of Muon plus RMSNorm-normalized attention logits.",
      ],
      note: "All architecture descriptions are DeepSeek's own, taken from the report's introduction and Chapter 2.",
    },
    {
      num: "03",
      title: "The Million-Token Efficiency Numbers",
      description:
        "The efficiency numbers are the heart of the paper. In the 1M-token setting, V4-Pro needs only 27% of V3.2's single-token inference FLOPs and 10% of its KV cache. V4-Flash does even better: 10% of the FLOPs and 7% of the KV cache.",
      paragraphs: [
        "Against a BF16 GQA-8 (head dim 128) baseline, the report puts the V4 family's KV cache at 1M context at roughly 2% of that baseline. That is what makes 1M context a practical default instead of a research demo.",
        "Where the savings come from: KV hybrid storage that keeps RoPE dimensions in BF16 and everything else in FP8 (roughly half the KV memory of a pure-BF16 layout), FP4 compute inside the lightning indexer, smaller attention top-k than V3.2, and the compressed attention itself.",
        "One precision note: routed expert parameters use FP4 while most other parameters stay FP8. FP4×FP8 GEMMs already match the peak FLOPs of FP8×FP8 on current hardware, and the paper argues future hardware could be about one-third more efficient.",
      ],
      note: "The 27% / 10% and 10% / 7% figures are vendor-reported and are consistent across the arXiv abstract, the report body, and the model cards.",
    },
    {
      num: "04",
      title: "Training Data & Two-Stage Post-Training",
      description:
        "DeepSeek pretrained V4-Flash on 32T tokens and V4-Pro on 33T tokens. The corpus expands multilingual data to cover cross-cultural long-tail knowledge, with special emphasis on long-document sources such as scientific papers and technical reports.",
      paragraphs: [
        "Post-training follows a two-stage paradigm. Stage one cultivates a dedicated domain expert for each target domain — math, code, agents, instruction following — using SFT followed by GRPO reinforcement learning. Stage two merges the experts into one unified model through on-policy distillation, where a student model learns from multiple teachers using a reverse KL loss.",
      ],
      note: "The abstract summarizes pretraining as “more than 32T” tokens; the report body gives 32T for Flash and 33T for Pro.",
    },
    {
      num: "05",
      title: "Official Base Model Benchmarks",
      description:
        "The V4-Pro model card publishes a Base Model benchmark table comparing V3.2-Base, V4-Flash-Base, and V4-Pro-Base on identical rows. It is the cleanest way to see what the architecture buys before any post-training.",
      table: {
        headers: ["Benchmark", "V3.2-Base (37B/671B)", "V4-Flash-Base (13B/284B)", "V4-Pro-Base (49B/1.6T)"],
        rows: [
          ["AGIEval (EM) 0-shot", "80.1", "82.6", "83.1"],
          ["MMLU (EM) 5-shot", "87.8", "88.7", "90.1"],
          ["MMLU-Pro (EM)", "65.5", "68.3", "73.5"],
          ["Simple-QA verified (EM) 25-shot", "28.3", "30.1", "55.2"],
          ["FACTS Parametric (EM)", "27.1", "33.9", "62.6"],
          ["HumanEval (Pass@1)", "62.8", "69.5", "76.8"],
          ["LongBench-V2 (EM)", "40.2", "44.7", "51.5"],
        ],
      },
      paragraphs: [
        "Read it this way: V4-Pro-Base crushes V3.2-Base on world knowledge (Simple-QA 55.2 vs 28.3, FACTS Parametric 62.6 vs 27.1) and on long context (LongBench-V2 51.5 vs 40.2). V4-Flash-Base, with only 13B active parameters, beats V3.2-Base's 37B active on most rows.",
        "These are base-model, pre-instruction scores. The instruct versions add the two-stage post-training described in the previous step, and the model card reports those separately.",
      ],
      note: "Every number in this table is vendor-reported from DeepSeek's model card as of August 1, 2026. None has been independently reproduced with the full public harness.",
    },
    {
      num: "06",
      title: "Official Pricing & Recommended Sampling",
      description:
        "Official pricing for the V4 family is per 1M tokens: V4-Flash charges $0.14 input on a cache miss, $0.0028 on a cache hit, and $0.28 output; V4-Pro charges $0.435, $0.003625, and $0.87[7].",
      table: {
        headers: ["Per 1M tokens (USD)", "deepseek-v4-flash", "deepseek-v4-pro"],
        rows: [
          ["Input (cache miss)", "$0.14", "$0.435"],
          ["Input (cache hit)", "$0.0028", "$0.003625"],
          ["Output", "$0.28", "$0.87"],
          ["Context length", "1M tokens", "1M tokens"],
          ["Max output", "384K tokens", "384K tokens"],
          ["Concurrency limit", "2,500", "500"],
        ],
      },
      paragraphs: [
        "DeepSeek has announced peak/off-peak pricing — 2x during peak hours, defined as 9:00–12:00 and 14:00–18:00 Beijing time — but it is not yet in effect as of August 1, 2026. For the full cost math, including the ~98% context-cache discount, see the [[flash-pricing|V4 Flash pricing guide]].",
        "The report and model cards also publish recommended sampling. For V4-Pro local deployment: temperature 1.0, top_p 1.0, and at least 384K of context for Think Max mode. For Flash-0731: temperature 1.0, top_p 0.95 in agent scenarios and 1.0 otherwise; high/max effort suggests a 384K max output[4]. A minimal call looks like this:",
      ],
      code: `from openai import OpenAI

client = OpenAI(
    api_key="<DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Write a one-paragraph summary of the attached context."}],
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}},
)
# Chain of thought arrives in reasoning_content; the answer is in content.`,
      note: "Pricing rows come from DeepSeek's official pricing page, captured August 1, 2026. Prices, concurrency limits, and the peak-pricing rollout date can change.",
    },
    {
      num: "07",
      title: "Local Deployment Commands",
      description:
        "Both model cards ship official serving commands. This is the Flash-0731 vLLM command from the model card, built for a single node with 4×GB300 GPUs and DSpark speculative decoding enabled:",
      code: `vllm serve deepseek-ai/DeepSeek-V4-Flash-0731 \\
  --trust-remote-code --kv-cache-dtype fp8 --block-size 256 \\
  --data-parallel-size 4 --enable-expert-parallel \\
  --moe-backend deep_gemm_mega_moe \\
  --attention-config '{"use_fp4_indexer_cache": true}' \\
  --speculative-config '{"method":"dspark","num_speculative_tokens":7,"draft_sample_method":"greedy"}'`,
      paragraphs: [
        "DSpark is DeepSeek's speculative-decoding module, bundled in the 0731 release. The Hugging Face UI shows 304B parameters for the 0731 repo precisely because the DSpark draft module is included — the base model itself is still 284B.",
        "Two deployment notes. The 0731 repo has no Jinja chat template; the official encoding/ directory provides encode_messages and parse_message_from_completion_text instead. And for the full local workflow — weights, VRAM, and quantized options — read the [[flash-huggingface|HuggingFace download and local run guide]].",
      ],
      note: "Hardware requirements are substantial. The native FP4+FP8 weights are roughly 158–167 GB (community-reported), so multi-GPU serving is the realistic starting point for the unquantized build.",
    },
    {
      num: "08",
      title: "How to Read the Official Model Card",
      description:
        "The report explains the architecture; the model cards explain how to use it. The key to reading either V4 model card is the mode comparison, because every benchmark is reported per reasoning mode.",
      paragraphs: [
        "DeepSeek defines three reasoning modes: Non-think for fast, intuitive everyday tasks; Think High with explicit <think> reasoning for complex problems and planning; and Think Max with a dedicated system prompt that pushes the model toward the boundary of its reasoning ability. The API maps these onto reasoning_effort values of low / high / max, and thinking is on by default[8].",
        "Mode choice moves scores. On the Pro card, SWE-bench Verified goes from 73.6 in Non-Think to 80.6 in Max mode; SimpleQA jumps from 45.0 to 57.9; LiveCodeBench reaches 93.5 in Max; Codeforces hits 3206. When comparing DeepSeek against another model, make sure both ran at the same effort setting.",
      ],
      table: {
        headers: ["Benchmark", "V4-Pro Max", "V4-Flash Max", "V4-Pro Non-Think"],
        rows: [
          ["SWE-bench Verified", "80.6", "79.0", "73.6"],
          ["LiveCodeBench (Pass@1)", "93.5", "91.6", "—"],
          ["Codeforces (Rating)", "3206", "3052", "—"],
          ["SimpleQA-Verified (Pass@1)", "57.9", "34.1", "45.0"],
          ["MRCR 1M (MMR)", "83.5", "78.7", "—"],
          ["MMLU-Pro (EM)", "87.5", "—", "—"],
        ],
      },
      list: [
        "Separately, the Flash-0731 card reports nine agent benchmarks where the re-post-trained Flash beats the V4-Pro preview across the board — Terminal Bench 2.1 at 82.7 vs 72.1, DeepSWE at 54.4 vs 12.8, Cybergym at 76.7 vs 52.7.",
        "Those runs used DeepSeek's upcoming agent harness in minimal mode, which is not yet public. For the full table and its caveats, see the [[flash-benchmarks|Flash benchmark deep dive]] and the [[deepseek-harness|DeepSeek Harness]] explainer.",
        "Bottom line: treat every number in the DeepSeek V4 technical report and the model cards as vendor-reported until an independent harness exists. The architecture claims, the efficiency ratios, and the two-stage post-training recipe are all DeepSeek's own statements.",
      ],
      note: "The Flash-0731 agent figures depend on the DeepSeek Harness (minimal mode), scheduled for release alongside the official V4-Pro. Until then these scores are not independently reproducible.",
    },
  ],
  prevGuide: {
    title: "DeepSeek Harness: Everything We Know Before the Official Release",
    slug: "deepseek-harness",
  },
  nextGuide: undefined,
  relatedGuides: [
    {
      title: "DeepSeek Harness: Everything We Know Before the Official Release",
      slug: "deepseek-harness",
    },
    {
      title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release",
      slug: "deepseek-v4-flash",
    },
    {
      title: "DeepSeek V4 Flash Benchmarks: Agentic & Coding Scores in 2026",
      slug: "flash-benchmarks",
    },
    {
      title: "DeepSeek V4 Flash Model Size: Params, VRAM & What It Means",
      slug: "flash-model-size",
    },
  ],
  sources: [
    { label: "DeepSeek-V4 Technical Report (arXiv 2606.19348)", url: "https://arxiv.org/abs/2606.19348" },
    { label: "DeepSeek-V4 Technical Report — HTML Full Text (arXiv)", url: "https://arxiv.org/html/2606.19348v1" },
    { label: "DeepSeek-V4-Pro Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro" },
    { label: "DeepSeek-V4-Flash-0731 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731" },
    { label: "DeepSeek V4 Launch Blog (Hugging Face)", url: "https://huggingface.co/blog/deepseekv4" },
    { label: "Official DeepSeek V4 Preview Announcement", url: "https://api-docs.deepseek.com/news/news260424/" },
    { label: "Official DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Official DeepSeek Thinking Mode Guide", url: "https://api-docs.deepseek.com/guides/thinking_mode/" },
  ],
};

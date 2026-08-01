import type { GuideContent } from "./types";

// target keyword: deepseek v4 flash size
export const flashModelSize: GuideContent = {
  slug: "flash-model-size",
  category: "MODEL GUIDE",
  title: "DeepSeek V4 Flash Model Size: Params, VRAM & What It Means",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek V4 Flash model size: 284B total params, 13B active, ~160 GB official FP4/FP8 weights. Full guide to VRAM needs and quantization.",
  toc: [
    { id: "step-1", label: "DeepSeek V4 Flash Model Size: 284B Total Parameters" },
    { id: "step-2", label: "What 284B Total / 13B Active Means: MoE in Plain English" },
    { id: "step-3", label: "Weight File Sizes: FP4/FP8, FP8, and BF16" },
    { id: "step-4", label: "VRAM Requirements: Full Precision, Multi-Card, and Quantized" },
    { id: "step-5", label: "NVFP4 for Blackwell GPUs" },
    { id: "step-6", label: "GGUF Quantization Options: Q8, Q4, and Below" },
    { id: "step-7", label: "vLLM Version Requirements and Launch Commands" },
    { id: "step-8", label: "Can an RTX 4090 Run DeepSeek V4 Flash?" },
  ],
  steps: [
    {
      num: "01",
      title: "DeepSeek V4 Flash Model Size: 284B Total Parameters",
      description:
        "DeepSeek V4 Flash is a 284B-parameter Mixture-of-Experts (MoE) model that activates only 13B parameters per token. It supports a native 1M-token context and up to 384K tokens of output.[2]",
      paragraphs: [
        "The name \"Flash\" describes inference cost, not volume. Every token activates only 13B of the 284B total parameters, which keeps per-token compute low. But all 284B weights must stay resident in memory or VRAM for the entire session.",
        "Official weights ship pre-quantized in mixed FP4 + FP8 precision. MoE expert parameters use FP4; attention, norm, and router parameters use FP8. This is a natively quantized model, not a BF16/FP16 distribution.",
      ],
      table: {
        headers: ["Spec", "Value"],
        rows: [
          ["Total parameters", "284B"],
          ["Active parameters (per token)", "13B"],
          ["Active share", "~4.6% of total"],
          ["Context window", "1,048,576 tokens (native)"],
          ["Max output", "384,000 tokens"],
          ["Precision", "FP4 (MoE experts) + FP8 (attention / norm / router)"],
          ["Architecture", "MoE + hybrid attention (CSA + HCA)"],
          ["License", "MIT"],
          ["API model ID", "deepseek-v4-flash"],
        ],
      },
      note: "The [[deepseek-v4-flash|0731 official release]] keeps the same architecture and size as the April preview. It was only re-post-trained.",
    },
    {
      num: "02",
      title: "What 284B Total / 13B Active Means: MoE in Plain English",
      description:
        "In a dense model, every parameter runs for every token. MoE splits the model into many small \"expert\" networks, and a router picks only a few experts per token.",
      paragraphs: [
        "[[deepseek-v4-flash|DeepSeek V4 Flash]] has 284B total parameters, but the router activates roughly 4.6% of them — about 13B — for each token. That active count decides how much compute each token costs. The total decides how much memory you need.",
        "This is the key memory trap: active parameters determine compute, not VRAM. Unless the runtime loads and unloads experts on demand, every expert weight must be loaded, so the full 284B footprint is always on your machine.",
        "The large context window is not what makes the model heavy. The 1M-token context uses hybrid attention (Compressed Sparse Attention + Heavily Compressed Attention), which keeps the KV cache small — roughly 10 GB for a full 1M context. The weights dominate the memory bill.",
      ],
      list: [
        "Total params (284B): everything on disk and in memory.",
        "Active params (13B): what actually computes each token.",
        "Routed experts make up about 96% of the model and are native MXFP4.[4]",
        "Memory rule of thumb: Flash is about inference cost, not model size.",
      ],
    },
    {
      num: "03",
      title: "Weight File Sizes: FP4/FP8, FP8, and BF16",
      description:
        "The official DeepSeek V4 Flash inference weights are about 159.61 GB on disk, per the model's safetensors index. Reports across sources land in the 146–167 GB range.",
      paragraphs: [
        "The variance comes from measurement conventions: GB versus GiB, disk usage versus tensor sizes, and whether the checkpoint includes the DSpark draft module. The fused checkpoint with DSpark weighs about 167 GB; the plain preview around 160 GB. Treat roughly 160 GB as the working number and 158–167 GB as the range.",
        "A full FP8-only conversion is about 284 GB, which is the build Hopper users deploy. An unquantized BF16 version would be roughly 568 GB (284B x 2 bytes), but DeepSeek ships no official BF16 weights. The Flash-Base research checkpoint is ~294.67 GB, near full FP8.",
      ],
      table: {
        headers: ["Model", "Parameters", "Official weights"],
        rows: [
          ["DeepSeek-V4-Flash", "284B / 13B active", "159.61 GB"],
          ["DeepSeek-V4-Pro", "1.6T / 49B active", "864.70 GB"],
          ["DeepSeek-V4-Flash-Base", "284B", "294.67 GB"],
          ["DeepSeek-V4-Pro-Base", "1.6T", "1606.03 GB"],
        ],
      },
      code: `huggingface-cli download deepseek-ai/DeepSeek-V4-Flash --local-dir ./DeepSeek-V4-Flash --resume-download`,
      note: "Base checkpoints are for research and fine-tuning, not normal chat deployments.",
    },
    {
      num: "04",
      title: "VRAM Requirements: Full Precision, Multi-Card, and Quantized",
      description:
        "Full-precision inference of the native FP4/FP8 weights needs roughly 170–175 GB of total VRAM: about 158 GB of weights, ~10 GB for a full 1M-context KV cache, plus runtime overhead.[5]",
      paragraphs: [
        "That fits on 2x H200 (282 GB) or 2x RTX Pro 6000 Blackwell (192 GB). The commonly cited reference deployment is a 4x H200 node with vLLM and MoE expert parallelism.[3] On the Hopper side, the FP8-only weights (~284 GB) require 8x H100 in an HGX chassis with tensor parallelism 8.",
        "Below full precision, quantized tiers shrink the footprint. The table below shows estimated minimum and comfortable VRAM per tier. Note that the Q4–Q2 rows are bit-depth estimates, not guarantees that a stable GGUF exists at every step.",
      ],
      table: {
        headers: ["Tier", "Weight size", "Min VRAM", "Comfortable VRAM"],
        rows: [
          ["FP8 / official", "159.61 GB", "192 GB", "256 GB"],
          ["Q6", "120 GB", "160 GB", "192 GB"],
          ["Q5", "100 GB", "128 GB", "160 GB"],
          ["Q4", "80 GB", "96 GB", "128 GB"],
          ["Q3", "60 GB", "80 GB", "96 GB"],
          ["Q2", "40 GB", "48 GB", "64 GB"],
        ],
      },
      list: [
        "Q4_K_M (~142 GB): Mac Studio 192 GB or 6x RTX 4090.",
        "Q2_K_XL (~96.8 GB): RTX 5090 with 128 GB DDR4, ~15 tokens/s.",
        "INT4 multi-card (~90 GB): 4x RTX 4090.",
        "24 GB single cards cannot run the full model.",
      ],
      note: "A single 24 GB consumer card cannot hold the full DeepSeek V4 Flash model. Deep quantization plus system-RAM offload is possible, but throughput drops sharply.",
    },
    {
      num: "05",
      title: "NVFP4 for Blackwell GPUs",
      description:
        "NVIDIA publishes an NVFP4 variant, nvidia/DeepSeek-V4-Flash-NVFP4, that requantizes the MoE experts to standard NVFP4 while attention, shared experts, router head, and MTP stay in FP8. It is quantized with the NVIDIA Model Optimizer and requires a Blackwell GPU.[7]",
      paragraphs: [
        "The research notes did not surface an exact on-disk size for the NVFP4 variant, but it lands in the ~150 GB range like the official weights. Do not assume it matches the FP4/FP8 checkpoint byte-for-byte — verify the file listing before you download.",
        "In vLLM, serve it with tensor parallelism and an FP8 KV cache. Note that NVFP4 experts do not support the deep_gemm_mega_moe MoE kernel (that path is FP8-only), so the model runs on the default MoE backend.",
      ],
      code: `vllm serve nvidia/DeepSeek-V4-Flash-NVFP4 --tensor-parallel-size 4 --trust-remote-code --kv-cache-dtype fp8`,
      note: "The NVFP4 build was validated on GB300 with the vllm-openai nightly image (vLLM 0.22.1rc1.dev504). Blackwell only — it will not run on Hopper or consumer GPUs.",
    },
    {
      num: "06",
      title: "GGUF Quantization Options: Q8, Q4, and Below",
      description:
        "The official weights are quantization-aware-trained, and the routed experts (about 96% of the model) are already native MXFP4. Unsloth repacks those experts bit-exact — near-zero KL divergence — which is why its UD-Q8_K_XL is called lossless.",
      paragraphs: [
        "Unsloth's UD-Q8_K_XL comes in at 162 GB and is bit-exact to the official full precision; plan for at least 169 GB of total memory. The near-lossless UD-Q4_K_XL is 155.1 GB (KLD 0.0102) with experts kept bit-exact, and UD-IQ3_XXS at 103 GB is Unsloth's officially recommended tier, needing at least 110 GB.",
        "Community conversions that re-quantize the experts — for example to Q4_K or IQ2_XXS — round about 5% and over 30% of weights respectively. That trade-off is where the smaller sizes come from: Q4_K_M at ~142 GB, antirez's 2-bit IQ2XXS at ~86.7 GB, and the smallest commonly cited usable build at roughly 81 GB.",
        "llama.cpp support is upstream since PR #24162. Use a recent build: an older llama.cpp can garble output after the second turn of a multi-turn conversation due to a fixed prompt-caching bug. Native FP4/FP8 GGUF files additionally need a build with F8_E4M3_B128 and MXFP4 support — stock upstream llama.cpp cannot load them.",
      ],
      table: {
        headers: ["Quantization", "Size", "Notes"],
        rows: [
          ["Unsloth UD-Q8_K_XL", "162 GB", "Lossless, bit-exact; needs >=169 GB total memory"],
          ["Unsloth UD-Q4_K_XL", "155.1 GB", "Near-lossless (KLD 0.0102), experts bit-exact"],
          ["Unsloth UD-IQ3_XXS", "103 GB", "Recommended tier; needs >=110 GB total memory"],
          ["Q4_K_M (community)", "~142 GB", "Common sweet spot for 192 GB machines"],
          ["IQ2XXS (antirez)", "~86.7 GB", "2-bit, aimed at 128 GB MacBooks"],
          ["IQ2_XS level (min)", "~81 GB", "Smallest commonly cited usable build"],
        ],
      },
      code: `./build/bin/llama-server --model ./DeepSeek-V4-Flash-Q4_K_M-XL-00001-of-00004.gguf --jinja --reasoning off --ctx-size 393216 --n-gpu-layers 999 --flash-attn on --no-repack --temp 1.0 --top-p 1.0 --top-k 0 --min-p 0.0`,
    },
    {
      num: "07",
      title: "vLLM Version Requirements and Launch Commands",
      description:
        "vLLM has an official recipe for DeepSeek V4 Flash. A plain NVIDIA deployment works on vLLM 0.25.0, but the fused DSpark checkpoint requires vLLM 0.26.0. Third-party deployment guides ask for vllm>=0.19.0 as a baseline.",
      paragraphs: [
        "The recipe ships four checkpoint variants: 0731 (the default official release), FP8 (preview weights), NVFP4, and DSpark (preview weights plus the fused draft module). Serve the native FP4/FP8 checkpoint with the deepseek_v4 tokenizer and tool-call and reasoning parsers.",
        "For speculative decoding, DSpark uses seven speculative tokens with greedy sampling; the MTP path uses three. On Blackwell, enable the FP4 indexer cache. The example below is the single-GPU command for a DGX Station or B300 288 GB.",
      ],
      list: [
        "--enable-expert-parallel — shards MoE experts across GPUs.",
        "--data-parallel-size 4 — recommended single-node DP + EP setup.",
        "--kv-cache-dtype fp8 and --block-size 256.",
        "--tokenizer-mode deepseek_v4, --tool-call-parser deepseek_v4, --reasoning-parser deepseek_v4.",
        "--no-disable-hybrid-kv-cache-manager — required for CSA + HCA attention.",
        "--attention_config.use_fp4_indexer_cache True — on Blackwell.",
      ],
      code: `vllm serve deepseek-ai/DeepSeek-V4-Flash \\
  --tensor-parallel-size 1 --pipeline-parallel-size 1 \\
  --kv-cache-dtype fp8 --trust-remote-code --block-size 256 \\
  --gpu-memory-utilization 0.92 \\
  --compilation-config '{"cudagraph_mode":"FULL_AND_PIECEWISE","custom_ops":["all"]}' \\
  --attention_config.use_fp4_indexer_cache True \\
  --tokenizer-mode deepseek_v4 --tool-call-parser deepseek_v4 \\
  --enable-auto-tool-choice --reasoning-parser deepseek_v4 \\
  --max-cudagraph-capture-size 128 \\
  --speculative-config '{"method":"mtp","num_speculative_tokens":3}'`,
      note: "Think Max mode requires a minimum context of 384K tokens (--max-model-len >= 393216).",
    },
    {
      num: "08",
      title: "Can an RTX 4090 Run DeepSeek V4 Flash?",
      description:
        "Not on raw power. A 24 GB RTX 4090 cannot hold the full model: the native FP4/FP8 weights need about 170–175 GB of VRAM, and even the most aggressive practical quantizations sit around 81 GB.",
      paragraphs: [
        "What a 4090 can do is run a community GGUF with most layers offloaded to system RAM. The pattern is common in the community: an RTX 5090 with 128 GB DDR4 ran a Q2_K_XL (~96.8 GB) build at about 15 tokens/s, and a MacBook M3 Max with 128 GB hit ~17 tokens/s on a 2-bit build. Expect low single-digit to low-double-digit tokens per second on consumer hardware with CPU offload.",
        "For a 24–48 GB consumer card, the practical recommendation is to use the [[flash-api-setup|DeepSeek API]] ($0.14 per 1M input, $0.28 per 1M output tokens)[1] or a smaller distilled model. Running V4 Flash locally is a workstation or server-class deployment.",
      ],
      table: {
        headers: ["Hardware", "Quantization", "Speed"],
        rows: [
          ["RTX 5090 + 128 GB DDR4", "Q2_K_XL (96.8 GB)", "~15 t/s generation"],
          ["RTX 6000 Blackwell 96 GB", "IQ2XXS level", "18 t/s"],
          ["DGX Spark / GB10", "IQ2XXS", "~15 t/s (short context)"],
          ["MacBook M3 Max 128 GB", "2-bit", "~17 t/s"],
          ["4x RTX 6000 Pro", "Native FP4/FP8", ">200 t/s"],
          ["HGX H100 8x (FP8)", "FP8 + EAGLE", "1,262 t/s output"],
        ],
      },
      note: "Community speed figures are vendor- or self-reported, not third-party standardized tests.",
    },
  ],
  prevGuide: {
    title: "DeepSeek V4 Flash on OpenRouter: Setup, Pricing & BYOK",
    slug: "flash-openrouter",
  },
  nextGuide: {
    title: "Download DeepSeek V4 Flash from HuggingFace & Run It Locally",
    slug: "flash-huggingface",
  },
  relatedGuides: [
    { title: "Download DeepSeek V4 Flash from HuggingFace & Run It Locally", slug: "flash-huggingface" },
    { title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release", slug: "deepseek-v4-flash" },
    { title: "DeepSeek V4 Pro: Specs, Pricing & Release Date (2026)", slug: "v4-pro" },
  ],
  sources: [
    {
      label: "Official DeepSeek API Changelog",
      url: "https://api-docs.deepseek.com/updates/",
    },
    {
      label: "Hugging Face Model Card: DeepSeek-V4-Flash",
      url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash",
    },
    {
      label: "vLLM Recipes: DeepSeek-V4-Flash",
      url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash",
    },
    {
      label: "Unsloth: DeepSeek-V4 Documentation",
      url: "https://unsloth.ai/docs/models/deepseek-v4",
    },
    {
      label: "Knightli: DeepSeek V4 Local VRAM Quantization Table",
      url: "https://knightli.com/en/2026/05/01/deepseek-v4-local-vram-quantization-table/",
    },
    {
      label: "Lambda: DeepSeek-V4-Flash Inference Models",
      url: "https://lambda.ai/inference-models/deepseek-ai/deepseek-v4-flash",
    },
    {
      label: "NVIDIA: DeepSeek-V4-Flash-NVFP4 Model Card",
      url: "https://huggingface.co/nvidia/DeepSeek-V4-Flash-NVFP4",
    },
    {
      label: "OpenRouter: deepseek/deepseek-v4-flash",
      url: "https://openrouter.ai/deepseek/deepseek-v4-flash",
    },
  ],
};

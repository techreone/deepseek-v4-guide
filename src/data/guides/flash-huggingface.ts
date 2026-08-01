import type { GuideContent } from "./types";

// 目标关键词: deepseek v4 flash huggingface
export const flashHuggingface: GuideContent = {
  slug: "flash-huggingface",
  category: "LOCAL DEPLOYMENT",
  title: "Download DeepSeek V4 Flash from HuggingFace & Run It Locally",
  seoTitle: "Download DeepSeek V4 Flash from HuggingFace",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek V4 Flash from HuggingFace: the official 0731 repo, MIT license, 167 GB weights, and how to download and run it locally with vLLM.",
  toc: [
    { id: "step-1", label: "Step 1: Find the Official DeepSeek V4 Flash Repo on HuggingFace" },
    { id: "step-2", label: "Step 2: The 304B Display Mystery: DSpark Draft Module" },
    { id: "step-3", label: "Step 3: Check VRAM & Hardware Before You Download 167 GB" },
    { id: "step-4", label: "Step 4: Download the Weights with huggingface-cli" },
    { id: "step-5", label: "Step 5: Run DeepSeek V4 Flash Locally with vLLM" },
    { id: "step-6", label: "Step 6: Go Smaller with Unsloth GGUF Quants" },
    { id: "step-7", label: "Step 7: Local Weights vs API - What Should You Use?" },
  ],
  steps: [
    {
      num: "01",
      title: "Find the Official DeepSeek V4 Flash Repo on HuggingFace",
      description:
        "DeepSeek hosts its open weights in one place: the official HuggingFace organization at huggingface.co/deepseek-ai. For the July 31, 2026 final release, the repository you want is deepseek-ai/DeepSeek-V4-Flash-0731 - the deepseek v4 flash huggingface release that went live under the MIT license with ~167 GB of weights across 48 Safetensors shards.[1]",
      paragraphs: [
        "DeepSeek also maintains a model collection at huggingface.co/collections/deepseek-ai/deepseek-v4. As of August 1, 2026, the collection lists seven models spanning the Flash and Pro lines, including base variants for research and the fused DSpark checkpoints.[2]",
      ],
      list: [
        "deepseek-ai/DeepSeek-V4-Flash-0731 - the official final Flash release (July 31, 2026); the default choice for local inference",
        "deepseek-ai/DeepSeek-V4-Flash - the April 24 preview weights",
        "deepseek-ai/DeepSeek-V4-Flash-Base - base weights for research and fine-tuning (shows 292B params, FP8)",
        "deepseek-ai/DeepSeek-V4-Flash-DSpark - preview weights plus the speculative decoding draft module",
        "deepseek-ai/DeepSeek-V4-Pro / DeepSeek-V4-Pro-Base - [[v4-pro|the Pro line]], still preview as of August 1, 2026",
        "deepseek-ai/DeepSeek-V4-Pro-DSpark - Pro preview weights plus draft module",
      ],
      note: "Security: DeepSeek has never published V4 weights on GitHub. The only official download channels are huggingface.co/deepseek-ai and the ModelScope mirror (modelscope.cn/models/deepseek-ai/DeepSeek-V4-Flash).[8] Treat any other 'official' tarball or mirror as a phishing risk.",
    },
    {
      num: "02",
      title: "The 304B Display Mystery: DSpark Draft Module",
      description:
        "Open the DeepSeek-V4-Flash-0731 model card and HuggingFace shows 304B params, ~167 GB, and 48 Safetensors shards. The April preview listed 284B. Nothing got bigger: the extra parameter count comes from the DSpark speculative decoding draft module bundled into the same repository.",
      paragraphs: [
        "Under the hood, [[deepseek-v4-flash|DeepSeek V4 Flash]] is a 284B-total / 13B-active Mixture-of-Experts model with a native 1M token context window and up to 384K tokens of output. The 0731 release is architecturally identical to the April 24 preview. DeepSeek only re-post-trained the weights and attached the DSpark draft module, which shares the same structure as the DeepSeek-V4-Flash-DSpark repository.",
        "The weights ship in mixed precision: FP4 for the MoE expert weights and FP8 for everything else. This is a natively quantized distribution, not a BF16 release. DeepSeek has never published a BF16 version of V4 Flash.",
      ],
      table: {
        headers: ["Item", "Value"],
        rows: [
          ["Total / active parameters", "284B / 13B (MoE)"],
          ["HuggingFace display", "304B params, ~167 GB, 48 Safetensors shards"],
          ["Context window", "1,000,000 tokens (1M)"],
          ["Max output", "384K tokens (high / max reasoning tiers)"],
          ["Weight precision", "FP4 (MoE experts) + FP8 (rest), mixed"],
          ["License", "MIT"],
          ["Release date", "July 31, 2026 (0731 final)"],
        ],
      },
      note: "The ~167 GB total versus the preview's ~160 GB is exactly the draft module. Tokenizer files are byte-identical to the preview - the tokenizer.json, tokenizer_config.json, and generation_config.json blob hashes all match.",
    },
    {
      num: "03",
      title: "Check VRAM & Hardware Before You Download 167 GB",
      description:
        "All 284B weights must be resident in memory even though only 13B activate per token. 'Flash' describes inference cost, not footprint. Plan for roughly 170-175 GB of total [[flash-model-size|VRAM]] for the full-precision weights plus KV cache.",
      paragraphs: [
        "The realistic reference rig for the official FP4+FP8 weights is a 4x H200 node running vLLM with MoE expert parallelism.[3] Two H200s (282 GB) or two RTX Pro 6000 Blackwell cards (192 GB) also work. A single 24 GB consumer card cannot run the full model.",
        "If you want a smaller footprint, the GGUF route is the practical answer. Unsloth repackages the official quantization-aware-trained weights bit-exact at the expert level,[4] so you do not lose precision where it matters most.",
      ],
      table: {
        headers: ["Quantization", "Size", "Notes"],
        rows: [
          ["UD-Q8_K_XL (lossless)", "161.9 GB (~162 GB)", "100% bit-exact to official weights, KL≈0"],
          ["UD-Q4_K_XL (near-lossless)", "155.1 GB", "Experts stay bit-exact; only 4% of non-expert weights drop to Q8_0"],
          ["UD-IQ3_XXS", "103 GB", "Unsloth recommended tier; want at least 110 GB memory"],
          ["IQ2_XXS (2-bit)", "86.7 GB", "Targets a 128 GB MacBook class machine"],
        ],
      },
      note: "Unsloth's rule of thumb: total RAM + VRAM of 92 / 102 / 162-169 GB for the 1-bit, 2-bit, and 4-bit tiers respectively.",
    },
    {
      num: "04",
      title: "Download the Weights with huggingface-cli",
      description:
        "The official tool is huggingface-cli from the huggingface_hub package. Enable hf_transfer to parallelize downloads on fast connections, then point --local-dir at a target folder. The full 0731 snapshot is ~167 GB, so plan disk space and a stable network.",
      code: `pip install huggingface_hub hf_transfer
export HF_HUB_ENABLE_HF_TRANSFER=1   # speeds up downloads on 1Gbit+ connections

# Full official 0731 release (~167 GB, includes DSpark draft module)
huggingface-cli download deepseek-ai/DeepSeek-V4-Flash-0731 --local-dir ./DeepSeek-V4-Flash-0731

# Weights-only download (skip non-weight files)
huggingface-cli download deepseek-ai/DeepSeek-V4-Flash-0731 \\
  --include="*.safetensors" "*.json" "*.py" --local-dir ./deepseek-v4-flash-0731`,
      paragraphs: [
        "The equivalent Python call is snapshot_download(repo_id=\"deepseek-ai/DeepSeek-V4-Flash-0731\", local_dir=\"./DeepSeek-V4-Flash-0731\") from huggingface_hub.",
        "In mainland China, use the ModelScope mirror instead for faster transfer: modelscope.cn/models/deepseek-ai/DeepSeek-V4-Flash. Weights on the official deepseek v4 flash huggingface channel and the ModelScope path are the same files.",
      ],
      note: "One quirk: the 0731 repo ships no Jinja chat template. It provides an 'encoding/' directory plus encode_messages and parse_message_from_completion_text helper scripts. vLLM users sidestep this with --tokenizer-mode deepseek_v4.",
    },
    {
      num: "05",
      title: "Run DeepSeek V4 Flash Locally with vLLM",
      description:
        "The official model card publishes a reference vLLM command built for a single-node 4x GB300 setup. The critical piece for the 0731 weights is the DSpark speculative decoding flag - one line enables draft-based generation.",
      code: `vllm serve deepseek-ai/DeepSeek-V4-Flash-0731 \\
  --trust-remote-code --kv-cache-dtype fp8 --block-size 256 \\
  --data-parallel-size 4 --enable-expert-parallel \\
  --moe-backend deep_gemm_mega_moe \\
  --attention-config '{"use_fp4_indexer_cache": true}' \\
  --speculative-config '{"method":"dspark","num_speculative_tokens":7,"draft_sample_method":"greedy"}'`,
      paragraphs: [
        "DSpark is a single flag: --speculative-config '{\"method\":\"dspark\",\"num_speculative_tokens\":7,\"draft_sample_method\":\"greedy\"}'. vLLM 0.25.0 and newer support DSpark drafting. ROCm targets (MI325X / MI355X) require vLLM 0.26.0.",
        "vLLM exposes the model through an OpenAI-compatible interface when you pass --tokenizer-mode deepseek_v4, so standard chat completions calls just work. Add --reasoning-parser deepseek_v4 and --tool-call-parser deepseek_v4 for reasoning and tool calls.",
      ],
      note: "Recommended sampling: temperature = 1.0 with top_p = 0.95 for agentic workloads, top_p = 1.0 otherwise. Reasoning has three tiers - low, high, and max - and the max tier wants a context window of at least 384K tokens.",
    },
    {
      num: "06",
      title: "Go Smaller with Unsloth GGUF Quants",
      description:
        "If 167 GB of FP4+FP8 weights is too much, Unsloth publishes repackaged GGUF quants of the 0731 release at unsloth/DeepSeek-V4-Flash-0731-GGUF.[5] Because the official weights are quantization-aware-trained, the routed experts (about 96% of the model) are natively MXFP4 - Unsloth keeps them bit-exact while rounding only the non-expert remainder.",
      code: `hf download unsloth/DeepSeek-V4-Flash-0731-GGUF --local-dir ./deepseek-v4-flash-gguf --include "*UD-Q8_K_XL*"

# llama.cpp: control thinking / reasoning effort
--chat-template-kwargs '{"enable_thinking":false}'   # disable thinking
--chat-template-kwargs '{"reasoning_effort":"max"}'  # set reasoning tier`,
      paragraphs: [
        "The UD-Q8_K_XL quant is 161.9 GB and 100% bit-exact to the official weights (KL divergence ≈ 0). UD-Q4_K_XL is 155.1 GB near-lossless, and UD-IQ3_XXS is 103 GB with a recommended 110 GB of memory.",
        "Beware community quants that down-convert the experts themselves: re-quantizing routed experts to Q4_K or IQ2_XXS rounds 5% and over 30% of the weights respectively. Stick to quants that preserve expert bit-exactness when quality matters.",
      ],
    },
    {
      num: "07",
      title: "Local Weights vs API - What Should You Use?",
      description:
        "Downloading 167 GB only makes sense if you have the hardware or a real use case. For most developers, the [[flash-api-setup|official API]] is the pragmatic choice: model id deepseek-v4-flash, input at $0.14 per 1M tokens, output at $0.28 per 1M tokens, and a ~98% [[flash-pricing|cache-hit discount]] that drops input to $0.0028.[6]",
      paragraphs: [
        "The same model id deepseek-v4-flash powers both the 0731 and preview builds on the API; DeepSeek upgraded the weights without renaming the endpoint, so existing calls are unaffected. Note that the legacy ids deepseek-chat and deepseek-reasoner retired on July 24, 2026 at 15:59 UTC.",
        "If you only have a 24-48 GB consumer card, skip the full weights. Use the API or a smaller distill model instead - a full 284B model will not fit. Independent testing by Artificial Analysis puts the 0731 release at an Intelligence Index of 50, up 10 points from the April preview; that is the model you get on either path.",
      ],
      table: {
        headers: ["", "Local weights", "Official API"],
        rows: [
          ["Setup", "167 GB download, GPU node, vLLM", "One API key, no infrastructure"],
          ["Output cost per 1M tokens", "Electricity + hardware amortization", "$0.28"],
          ["Input per 1M tokens (cache miss / hit)", "—", "$0.14 / $0.0028"],
          ["Concurrency", "Depends on your GPUs", "2,500 concurrent requests"],
          ["Data control", "Fully on-prem", "Sent to DeepSeek"],
          ["Best for", "Privacy, offline R&D, no rate limits", "Production apps, agents, prototyping"],
        ],
      },
    },
  ],
  prevGuide: {
    title: "DeepSeek V4 Flash Model Size: Params, VRAM & What It Means",
    slug: "flash-model-size",
  },
  nextGuide: {
    title: "DeepSeek V4 Pro: Specs, Pricing & Release Date",
    slug: "v4-pro",
  },
  relatedGuides: [
    {
      title: "DeepSeek V4 Flash Model Size: Params, VRAM & What It Means",
      slug: "flash-model-size",
    },
    {
      title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release",
      slug: "deepseek-v4-flash",
    },
    {
      title: "DeepSeek V4 Pro: Specs, Pricing & Release Date (2026)",
      slug: "v4-pro",
    },
  ],
  sources: [
    { label: "Official DeepSeek V4 Flash 0731 Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731" },
    { label: "DeepSeek V4 Collection on Hugging Face", url: "https://huggingface.co/collections/deepseek-ai/deepseek-v4" },
    { label: "Official vLLM Recipe for DeepSeek-V4-Flash", url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash" },
    { label: "Unsloth DeepSeek V4 Guide (GGUF Quantization)", url: "https://unsloth.ai/docs/models/deepseek-v4" },
    { label: "Unsloth 0731 GGUF Repository", url: "https://huggingface.co/unsloth/DeepSeek-V4-Flash-0731-GGUF" },
    { label: "Official DeepSeek API Updates (0731 Release)", url: "https://api-docs.deepseek.com/updates/" },
    { label: "r/LocalLLaMA Thread on 0731 Weights", url: "https://www.reddit.com/r/LocalLLaMA/comments/1vbp7kb/deepseekaideepseekv4flash0731_on_huggingface/" },
    { label: "ModelScope Mirror for DeepSeek V4 Flash", url: "https://modelscope.cn/models/deepseek-ai/DeepSeek-V4-Flash" },
  ],
};

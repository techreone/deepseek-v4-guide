import type { GuideContent } from "./types";

// target keyword: run deepseek v4.1 flash locally
// 内容来源：reference/topics/27-v4-1-flash.md（HF 模型卡 + vLLM recipe，2026-09-11）
export const v41FlashLocalDeployment: GuideContent = {
  slug: "v4-1-flash-local-deployment",
  category: "DEPLOYMENT",
  title: "Run DeepSeek V4.1 Flash Locally: VRAM, vLLM & Quantization",
  seoTitle: "Run DeepSeek V4.1 Flash Locally: vLLM Guide",
  readTime: "11 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "How to run DeepSeek V4.1 Flash locally: MIT weights, a ~511 GB checkpoint, a 614 GB VRAM floor, the official vLLM image, MXFP4/MXFP8 and GGUF.",
  toc: [
    { id: "step-1", label: "Step 1: What It Takes to Self-Host V4.1 Flash" },
    { id: "step-2", label: "Step 2: The 614 GB VRAM Minimum, Explained" },
    { id: "step-3", label: "Step 3: Download the MIT Weights from Hugging Face" },
    { id: "step-4", label: "Step 4: Use the Official vLLM Docker Image" },
    { id: "step-5", label: "Step 5: The Complete vLLM Serve Command" },
    { id: "step-6", label: "Step 6: MXFP4 and MXFP8: What Ships in the Weights" },
    { id: "step-7", label: "Step 7: DSpark Speculative Decoding" },
    { id: "step-8", label: "Step 8: GGUF Alternatives and When to Call DeepSeek" },
  ],
  steps: [
    {
      num: "01",
      title: "What It Takes to Self-Host V4.1 Flash",
      description:
        "DeepSeek published V4.1 Flash under the MIT license on Hugging Face, so the weights are free to download, modify and serve commercially[4]. Open weights are not the same as easy weights, though. The model is a 552B-parameter MoE backbone plus 196.6B parameters of Engram conditional memory, for roughly 763B total parameters, and the published checkpoint is about 511 GB on disk[4][5].",
      paragraphs: [
        "That single number reframes the project. Running V4.1 Flash is not a laptop exercise; it is a small-cluster exercise. DeepSeek wrote the serving recipe for data-center accelerators, not consumer GPUs, because every expert must be resident in memory even though only 6 routed experts activate per token[4][5].",
        "This guide follows the official path end to end: the Hugging Face download, the real VRAM floor, the Docker image DeepSeek ships, the full vLLM command, the quantization scheme, DSpark speculative decoding, and the third-party GGUF option for teams without a cluster[4][5].",
      ],
      list: [
        "License: MIT, open weights[4]",
        "Backbone: 552B MoE + 196.6B Engram (~763B total)[4]",
        "On-disk checkpoint: about 511 GB[5]",
        "Minimum VRAM for serving: 614 GB[5]",
        "Reference hardware: one GB200 NVL4 tray or eight H200 GPUs[5]",
      ],
      note: "Every hardware and precision figure here comes from the official V4.1 Flash model card or the vLLM recipe page, both updated September 10-11, 2026[4][5].",
    },
    {
      num: "02",
      title: "The 614 GB VRAM Minimum, Explained",
      description:
        "The vLLM recipe lists vram_minimum_gb at 614, a figure that already includes a 1.2x headroom factor over the raw weight footprint. That is the floor for the MXFP4/MXFP8 distribution DeepSeek publishes, not a BF16 model, which would be far larger[5].",
      paragraphs: [
        "DeepSeek's validated configuration runs on a single GB200 NVL4 tray with 768 GB of HBM, using tensor parallelism of four across the four Blackwell dies. An alternative reference rig is eight H200 GPUs totalling 1,128 GB, again with tensor parallelism[5].",
        "This is why the local-deployment story keeps tripping people up. A model marketed as Flash and built for cheap inference still needs hundreds of gigabytes resident in memory, because all experts must be addressable even when only a handful activate per token[4].",
      ],
      table: {
        headers: ["Component", "Requirement", "Notes"],
        rows: [
          ["Minimum VRAM", "614 GB", "1.2x headroom over weights[5]"],
          ["Reference rig A", "GB200 NVL4 (768 GB)", "TP4 across four Blackwell dies[5]"],
          ["Reference rig B", "8x H200 (1,128 GB)", "More headroom[5]"],
          ["Checkpoint on disk", "~511 GB", "SafeTensors shards[5]"],
          ["Routed + DSpark experts", "259.5 GiB", "MXFP4[5]"],
          ["Engram memory", "188.8 GiB", "Two hash tables[5]"],
        ],
      },
      note: "If you do not have this class of hardware, skip ahead to Step 8 for the GGUF and API alternatives[5].",
    },
    {
      num: "03",
      title: "Download the MIT Weights from Hugging Face",
      description:
        "The official repository is deepseek-ai/DeepSeek-V4.1-Flash on Hugging Face, published under the MIT license. Use huggingface-cli with the hf_transfer helper to pull roughly 511 GB of SafeTensors shards; the tokenizer and encoding utilities live in the same repo[4].",
      code: `pip install -U huggingface_hub hf_transfer
export HF_HUB_ENABLE_HF_TRANSFER=1

# Official MIT weights (~511 GB on disk)
huggingface-cli download deepseek-ai/DeepSeek-V4.1-Flash \\
  --local-dir ./DeepSeek-V4.1-Flash

# Weights-only snapshot (skip docs, keep configs and tokenizer)
huggingface-cli download deepseek-ai/DeepSeek-V4.1-Flash \\
  --include "*.safetensors" "*.json" "*.py" \\
  --local-dir ./DeepSeek-V4.1-Flash`,
      paragraphs: [
        "Because the checkpoint is over half a terabyte, plan for both disk and network. hf_transfer parallelises shard downloads and is worth enabling on any connection faster than a gigabit[4].",
        "One practical note carried over from the V4-Flash era: DeepSeek does not ship a standard Jinja chat template. The repository includes an encoding/ directory with Python reference code and a Rust toolkit, and vLLM users sidestep the template entirely by passing --tokenizer-mode deepseek_v41[4][5].",
      ],
      list: [
        "Repo: deepseek-ai/DeepSeek-V4.1-Flash[4]",
        "License: MIT, commercial use permitted[4]",
        "Size: about 511 GB across SafeTensors shards[5]",
        "Extras: encoding/ Python reference plus a Rust toolkit[4]",
      ],
      note: "Treat only huggingface.co/deepseek-ai as the official weights channel. DeepSeek has never published V4 weights on GitHub[4].",
    },
    {
      num: "04",
      title: "Use the Official vLLM Docker Image",
      description:
        "DeepSeek ships a purpose-built container, vllm/vllm-openai:deepseekv41-flash-0909, pinned to the September 9 build. It targets vLLM 0.30.0 or newer. There is no pip wheel for this recipe, because the model needs a vLLM build that knows the deepseek_v41 tokenizer, tool parser and reasoning parser[5].",
      code: `docker run --gpus all --ipc=host --shm-size 64g \\
  -v /models/DeepSeek-V4.1-Flash:/model \\
  -p 8000:8000 \\
  vllm/vllm-openai:deepseekv41-flash-0909 \\
  --model /model`,
      paragraphs: [
        "The image exists because V4.1 Flash is not a stock-architecture model. Its tokenizer mode, tool-call parser and reasoning parser are all registered under the deepseek_v41 name, so a generic vLLM install will not recognise the checkpoint[5].",
        "If you build vLLM from source instead of using the image, match the 0.30.0 line and confirm the deepseek_v41 components are present before downloading half a terabyte of weights[5].",
      ],
      note: "Pin the image tag. The deepseekv41-flash-0909 build is the combination DeepSeek validated on GB200 NVL4[5].",
    },
    {
      num: "05",
      title: "The Complete vLLM Serve Command",
      description:
        "The recipe's serve command sets four things that matter: the tokenizer mode, the tool-call parser, the reasoning parser and the multimodal encoder parallelism. On the GB200 reference rig, tensor parallelism is four[5].",
      code: `vllm serve /model \\
  --trust-remote-code \\
  --tokenizer-mode deepseek_v41 \\
  --tool-call-parser deepseek_v41 \\
  --reasoning-parser deepseek_v41 \\
  --mm-encoder-tp-mode data \\
  --tensor-parallel-size 4 \\
  --served-model-name deepseek-flash`,
      paragraphs: [
        "The --tokenizer-mode flag switches vLLM to DeepSeek's V4.1 tokenizer without needing a Jinja template. The two parser flags make the OpenAI-compatible server emit structured tool calls and separate reasoning content the way DeepSeek's hosted API does[5].",
        "The --mm-encoder-tp-mode data flag distributes the DeepSeek-ViT vision encoder, which matters because V4.1 Flash is natively multimodal: it accepts images alongside text, and the encoder must be sharded consistently with the language model[4][5].",
      ],
      list: [
        "--tokenizer-mode deepseek_v41 — required for the checkpoint",
        "--tool-call-parser deepseek_v41 — OpenAI-style function calls",
        "--reasoning-parser deepseek_v41 — separates thinking from output",
        "--mm-encoder-tp-mode data — shards the vision encoder",
        "--tensor-parallel-size 4 — reference value for GB200 NVL4[5]",
      ],
      note: "Recommended sampling from the model card: temperature 1.0 and top_p 0.95 for agentic workloads, matching DeepSeek's own benchmark settings[4].",
    },
    {
      num: "06",
      title: "MXFP4 and MXFP8: What Ships in the Weights",
      description:
        "DeepSeek distributes V4.1 Flash in a mixed low-precision format rather than BF16. The routed experts are quantized to MXFP4, most other weights use MXFP8 block quantization with UE8M0 scales, and the embedding and LM head stay in BF16[4].",
      paragraphs: [
        "This mixed scheme is why the on-disk checkpoint is about 511 GB instead of multiple terabytes. Quantization-aware training means the published weights were trained with these formats in mind, so you are not bolting post-hoc quantization onto a BF16 model[4].",
        "The Engram conditional-memory tables are part of that footprint: 196.6B parameters split across two hash tables at layers 1 and 14, looked up by 4-gram hashing. The vLLM recipe accounts for 188.8 GiB of Engram plus 259.5 GiB of MXFP4 routed and DSpark expert weights[4][5].",
      ],
      table: {
        headers: ["Component", "Precision", "Notes"],
        rows: [
          ["Routed experts", "MXFP4", "Largest weight block[4]"],
          ["DSpark draft experts", "MXFP4", "Speculative draft head[5]"],
          ["Most other weights", "MXFP8", "UE8M0 block scales[4]"],
          ["Embedding / LM head", "BF16", "Kept high precision[4]"],
          ["Engram memory", "Quantized tables", "196.6B params, 188.8 GiB[4][5]"],
        ],
      },
      note: "Because the experts are natively MXFP4, third-party quants that re-round them to lower precision can damage quality. Prefer formats that preserve expert precision[4].",
    },
    {
      num: "07",
      title: "DSpark Speculative Decoding",
      description:
        "V4.1 Flash bundles DSpark, a speculative decoding head that drafts tokens for the main model to verify. The draft module is a three-phase structure, each phase with 128 routed experts of which 3 activate, producing draft blocks of five tokens[5].",
      paragraphs: [
        "DSpark is trained rather than bolted on: it lives in the same checkpoint and is quantized with the same MXFP4 treatment as the routed experts. In serving it works alongside normal decoding to raise throughput without changing the output distribution[5].",
        "For self-hosters, DSpark is the main lever on tokens per second. The recipe includes the draft weights in its memory budget, so if you disable speculative decoding you free that memory but also give up its speed benefit[5].",
      ],
      list: [
        "Three draft phases, 128 routed experts each[5]",
        "3 experts active per phase[5]",
        "Draft block size: 5 tokens[5]",
        "Quantized MXFP4 like the main experts[5]",
      ],
      note: "Speculative decoding changes latency and throughput, not the model's knowledge; accuracy is governed by the main model[5].",
    },
    {
      num: "08",
      title: "GGUF Alternatives and When to Call DeepSeek",
      description:
        "If a 614 GB VRAM floor is out of reach, the community GGUF route is the fallback. A third-party quantization, AMAImedia/DeepSeek-V4.1-Flash-FP8-GGUF, exists on Hugging Face for teams running llama.cpp-style stacks[5].",
      paragraphs: [
        "DeepSeek itself does not publish GGUF builds for V4.1 Flash, and it warns that re-quantizing native MXFP4 experts degrades quality. Community GGUF quants are therefore a convenience trade-off rather than an official path[4][5].",
        "For genuine production scale, DeepSeek's guidance is blunt: deployments involving around 2,000 GPUs plus a storage cluster should contact DeepSeek directly instead of assembling a recipe. Below that scale, the hosted API remains the most economical option for most teams[5].",
      ],
      list: [
        "Community GGUF: AMAImedia/DeepSeek-V4.1-Flash-FP8-GGUF[5]",
        "No official GGUF from DeepSeek[4]",
        "Large deployments (~2,000 GPUs): contact DeepSeek[5]",
        "Below that scale: compare against the paid API[5]",
      ],
      note: "Before buying hardware, price your workload against the [[v4-1-flash-pricing|V4.1 Flash API]] — for bursty or cache-heavy agents it is usually cheaper[5].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "V4.1 Flash vs V4 Flash: 552B, CED & the 94% Jump", slug: "v4-1-flash-vs-v4-flash" },
    { title: "Download DeepSeek V4 Flash from HuggingFace & Run It Locally", slug: "flash-huggingface" },
    { title: "DeepSeek V4.1 Flash KV Cache: 890 Bytes per Token", slug: "v4-1-flash-kv-cache" },
    { title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates", slug: "v4-1-flash-pricing" },
  ],
  sources: [
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "vLLM Recipes: DeepSeek-V4.1-Flash", url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "VentureBeat: V4.1-Flash Debuts at $0.003/1M Off-Peak", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
  ],
};

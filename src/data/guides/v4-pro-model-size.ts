import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro model size
export const v4ProModelSize: GuideContent = {
  slug: "v4-pro-model-size",
  category: "MODEL GUIDE",
  title: "DeepSeek V4 Pro Model Size: 1.6T Parameters, 49B Active, VRAM Needs",
  seoTitle: "V4 Pro Model Size: 1.6T/49B, ~862GB VRAM",
  readTime: "7 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "V4 Pro is a 1.6T-param MoE with 49B active per token, 1M context, FP4+FP8 weights (~862GB VRAM to self-host). Specs, memory math, hardware.",
  toc: [
    { id: "step-1", label: "The Spec Sheet" },
    { id: "step-2", label: "1.6T Total, 49B Active: What MoE Means Here" },
    { id: "step-3", label: "How Much VRAM to Self-Host" },
    { id: "step-4", label: "Deployment Options" },
    { id: "step-5", label: "Pro vs Flash: The Size Difference" },
  ],
  steps: [
    {
      num: "01",
      title: "The Spec Sheet",
      description:
        "DeepSeek V4 Pro's official specs, unchanged between the April preview and the August 13 GA (0813) build[4][5].",
      table: {
        headers: ["Spec", "DeepSeek V4 Pro"],
        rows: [
          ["Total parameters", "1.6T"],
          ["Active parameters (per token)", "49B"],
          ["Architecture", "Mixture-of-Experts (MoE)"],
          ["Context window", "1M tokens"],
          ["Max output", "384K tokens"],
          ["Modality", "Text only"],
          ["License", "MIT"],
          ["Inference precision", "FP4 (experts) + FP8 (rest)"],
          ["Pretraining", "32T+ tokens"],
          ["Released", "Apr 24, 2026 (preview); Aug 13, 2026 (GA)"],
        ],
      },
      note: "Every row comes from DeepSeek's official model card and API docs. 'Released' refers to the API build; weights are on Hugging Face as DeepSeek-V4-Pro-0813[4][5].",
    },
    {
      num: "02",
      title: "1.6T Total, 49B Active: What MoE Means Here",
      description:
        "The 1.6T total parameter count is a measure of knowledge capacity; the 49B active count is what actually runs per token. V4 Pro activates only ~3% of its parameters per token, which is why inference stays practical despite the huge total[4].",
      paragraphs: [
        "Contrast with a dense model: a dense 1.6T model would need 1.6T parameters of compute per token; V4 Pro needs 49B. That is the entire trick behind billion-scale MoE — near-dense knowledge at one-thirtieth the per-token compute.",
        "DeepSeek's architecture details (CSA + HCA attention, mHC hyper-connections, Muon optimizer) are covered in the [[v4-pro|V4 Pro main guide]]; for this page the takeaway is simple: total size = capacity, active size = cost, context = memory.",
      ],
      list: [
        "1.6T total parameters (knowledge capacity)",
        "49B active parameters per token (compute cost)",
        "≈3% of the model activates per token",
        "Same 1M context / 384K output as V4 Flash, which is 284B total / 13B active",
      ],
    },
    {
      num: "03",
      title: "How Much VRAM to Self-Host",
      description:
        "The FP4+FP8 weight mix puts the full model at a third-party estimate of roughly **862GB of VRAM** — the practical minimum for hosting the complete 0813 weights[5].",
      code: `# Rough VRAM estimate for V4 Pro (FP4 experts + FP8 rest)
weights ≈ 862 GB total

# GPU configurations that fit:
#  8 × H100/H200 80GB  = 640GB  → too small for full model
# 10 × H200 96GB       = 960GB  → fits with margin
#  4 × GB300           = fits  (DeepSeek's official vLLM reference node)

# With DSpark speculative decoding:
vllm serve deepseek-ai/DeepSeek-V4-Pro-0813 \\
  --speculative-config '{"method":"dspark", ...}' \\
  --tensor-parallel-size 8`,
      paragraphs: [
        "DeepSeek's official vLLM recipe uses a 4xGB300 single node with DSpark speculative decoding enabled — the reference deployment for the GA build[4].",
        "One 80GB GPU (RTX 4090/5090-class) is only enough for distillation or small experiments; production serving needs a multi-GPU node. The hosted API is the realistic default for most teams.",
      ],
      note: "862GB is a third-party estimate from the preview-era spec sheet. Confirm the exact checkpoint size on the Hugging Face repo before buying hardware[5].",
    },
    {
      num: "04",
      title: "Deployment Options",
      description:
        "Given the VRAM floor, the deployment ladder runs from API to self-hosted cluster[2][4].",
      list: [
        "Hosted API (recommended): deepseek-v4-pro at api.deepseek.com — $0.66/$1.32 input (miss), $1.98/$3.96 output (off-peak/peak), cache hits from $0.022",
        "Third-party routers: [[v4-pro-openrouter|OpenRouter]] lists deepseek/deepseek-v4-pro-0813 at $0.435/$0.87 (pre-Aug-16 flat pricing shown on the router)",
        "Self-hosted: vLLM + DSpark on 4xGB300 (official reference) or a comparable multi-GPU node",
        "Distillation: single-GPU experiments on the full weights are not feasible; use the Flash weights (284B/13B) for edge experiments instead",
      ],
      note: "OpenRouter's listed price for the 0813 entry may not reflect the August 16 peak/off-peak tier — verify before relying on router pricing[10].",
    },
    {
      num: "05",
      title: "Pro vs Flash: The Size Difference",
      description:
        "The family split is 5.6x on total parameters and 3.8x on active parameters[4].",
      table: {
        headers: ["Spec", "V4 Pro", "V4 Flash"],
        rows: [
          ["Total parameters", "1.6T", "284B"],
          ["Active parameters", "49B", "13B"],
          ["Context / max output", "1M / 384K", "1M / 384K"],
          ["Approx. weights size", "~862GB (FP4+FP8)", "~200-300GB range (FP4+FP8)"],
          ["Concurrency (API)", "500", "2,500"],
          ["Output price (off-peak)", "$1.98 / 1M", "$0.66 / 1M"],
        ],
      },
      paragraphs: [
        "The size gap maps to a capability gap and a price gap: Flash activates 13B per token and costs about a third of Pro on every line. DeepSeek's own 22-benchmark aggregation puts Flash at roughly 83-88% of Pro's quality — the reason the [[v4-pro-vs-flash|Pro vs Flash decision]] is a routing question, not a religious one.",
        "For hardware planning: if the ~862GB Pro footprint is a non-starter, the Flash footprint (and the [[flash-model-size|Flash model size]] page) is the pragmatic open-weight option.",
      ],
    },
  ],
  relatedGuides: [
    {
      title: "DeepSeek V4 Pro: Specs, Pricing & Release Date",
      slug: "v4-pro",
    },
    {
      title: "DeepSeek V4 Pro vs V4 Flash: Which One Do You Need?",
      slug: "v4-pro-vs-flash",
    },
    {
      title: "DeepSeek V4 Flash Model Size & VRAM Requirements",
      slug: "flash-model-size",
    },
    {
      title: "DeepSeek V4 Pro via OpenRouter",
      slug: "v4-pro-openrouter",
    },
  ],
  sources: [
    { label: "Official DeepSeek API: V4-Pro GA Release", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek First API Call Docs", url: "https://api-docs.deepseek.com/quick_start/first_api_call/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
    { label: "OpenRouter Models API", url: "https://openrouter.ai/api/v1/models" },
  ],
};

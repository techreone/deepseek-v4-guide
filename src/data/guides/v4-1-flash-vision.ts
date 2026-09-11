import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash vision
// 内容来源：reference/topics/27-v4-1-flash.md（HF 模型卡 / official news / VentureBeat / vLLM recipe）
export const v41FlashVision: GuideContent = {
  slug: "v4-1-flash-vision",
  category: "VISION",
  title: "DeepSeek V4.1 Flash Vision: Native Multimodal Images",
  seoTitle: "DeepSeek V4.1 Flash Vision: Native Images",
  readTime: "8 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "DeepSeek V4.1 Flash is natively multimodal through a 32-layer DeepSeek-ViT. Image tokens, routing bias, MMMU-Pro and DocVQA scores, and limits to know.",
  toc: [
    { id: "step-1", label: "Step 1: Native Multimodal Vision in One Paragraph" },
    { id: "step-2", label: "Step 2: The DeepSeek-ViT Encoder Specs" },
    { id: "step-3", label: "Step 3: How Images Become Tokens" },
    { id: "step-4", label: "Step 4: Routing Bias and Why Vision Doesn't Steal Text Experts" },
    { id: "step-5", label: "Step 5: Vision Benchmarks: MMMU-Pro, CVBench, DocVQA, RefCOCO" },
    { id: "step-6", label: "Step 6: Visual Agent Benchmarks: Chartography, BabyVision, ZeroBench" },
    { id: "step-7", label: "Step 7: Replacing V4-Flash-Vision-Exp and the Limits" },
  ],
  steps: [
    {
      num: "01",
      title: "Native Multimodal Vision in One Paragraph",
      description:
        "V4.1 Flash is natively multimodal: it reads text and images together and writes text. Vision is not a bolt-on adapter — images are processed jointly with text from the start of pre-training, and the model ships with a dedicated vision encoder called DeepSeek-ViT[2].",
      paragraphs: [
        "This is a structural change from the old Flash line. V4 Flash was text-only, and image understanding lived in a separate experimental model, V4-Flash-Vision-Exp. V4.1 Flash folds that capability into the main model and retires the experimental id[1][2].",
        "For builders, the practical result is one model and one API key for text, images, and agent loops. No routing between a text model and a vision model is required, and the vision path shares the same 1M-token context window and cache behavior as text. See [[v4-1-flash-api-setup|the API setup guide]] for the request format.",
      ],
      list: [
        "Native image understanding on the main model, not a side endpoint",
        "Text + images in the same prompt, text-only output",
        "Same 1M context window shared by both modalities",
        "Replaces the experimental V4-Flash-Vision-Exp id[1][2]",
      ],
      note: "The old V4-Pro did not support vision at all. After the September 14 routing change, V4-Pro requests gain native vision as a side effect. See [[deepseek-v4-pro-retired|the V4-Pro retirement guide]].",
    },
    {
      num: "02",
      title: "The DeepSeek-ViT Encoder Specs",
      description:
        "DeepSeek-ViT is a 32-layer vision Transformer trained from scratch. It uses 2D-RoPE positional encoding and 3x3 pixel-unshuffle downsampling, then a two-layer MLP projector maps visual features into the language model's embedding space[2].",
      table: {
        headers: ["Component", "Spec"],
        rows: [
          ["Encoder", "DeepSeek-ViT, 32 layers"],
          ["Hidden size", "1024"],
          ["Patch size", "14"],
          ["Downsampling", "3x aligner"],
          ["Max visual tokens per image", "1,024"],
          ["Minimum pixels per image", "295,936"],
          ["Images per prompt", "No documented limit"],
        ],
      },
      paragraphs: [
        "The 3x downsampling keeps token cost sane: a large screenshot or document page is compressed into at most 1,024 visual tokens, so a single image does not consume the whole context budget. The minimum pixel floor ensures very small images are still represented usefully rather than collapsed into a handful of patches[2].",
        "Because the encoder was trained jointly with the language model rather than frozen and bolted on, the projector can learn to place visual features where the text experts can use them. That joint training is the main reason DeepSeek calls the capability native[2].",
      ],
      note: "Treat 1,024 tokens per image as the budgeting number that matters most. Ten images can spend roughly 10,240 tokens on vision alone, which affects both context and cache planning[2].",
    },
    {
      num: "03",
      title: "How Images Become Tokens",
      description:
        "Images enter the prompt as `<|deepseek_image|>` spans. The encoder and projector turn pixels into visual embeddings, and those embeddings sit inline with text tokens in the same sequence[2][5].",
      paragraphs: [
        "Because the visual tokens live in the normal token stream, the model can interleave text and images naturally: a question, a chart, a follow-up question, another screenshot. DeepSeek documents no limit on the number of images per prompt, so the practical constraint is the context window and the per-image token cost[2].",
        "For prompt engineering, the familiar pattern holds: put the instruction near the image it refers to, and avoid burying a visual reference under thousands of tokens of unrelated text. The model sees one sequence, so ordering and proximity still guide attention.",
      ],
      list: [
        "Image placeholder token: <|deepseek_image|>",
        "Visual tokens are inline with the text stream",
        "Up to 1,024 visual tokens per image",
        "No documented cap on images per prompt[2]",
      ],
      note: "If you stream long multimodal conversations, the image tokens are part of the cached prefix too. [[v4-1-flash-kv-cache|The KV cache guide]] covers how a stable image prefix is reused.",
    },
    {
      num: "04",
      title: "Routing Bias and Why Vision Doesn't Steal Text Experts",
      description:
        "V4.1 Flash routes image-span tokens with a separate routing bias. Tokens inside an image span are biased toward a different expert set than ordinary text tokens, so vision and text do not compete for the same capacity[5].",
      paragraphs: [
        "This is one of the more interesting engineering choices in the release. In a Mixture-of-Experts model, a routing decision sends every token to a small subset of experts — V4.1 Flash activates 6 routed experts per token out of 384. If image patches and prose both competed for the same experts, the model would either waste capacity or erode text quality.",
        "The dedicated bias preserves text routing while giving vision tokens their own specialized capacity. DeepSeek describes the two modalities as jointly trained, so they cooperate rather than displace each other. The result is that adding images to a prompt does not silently degrade the text reasoning that surrounds them[2][5].",
      ],
      note: "The router still makes hard choices, and DeepSeek warns that sparse-selection errors at untested boundaries can degrade capability. Validate on your own image distribution rather than assuming uniform behavior[5].",
    },
    {
      num: "05",
      title: "Vision Benchmarks: MMMU-Pro, CVBench, DocVQA, RefCOCO",
      description:
        "On the base model, DeepSeek reports MMMU-Pro 56.5, CVBench 77.9, DocVQA 95.6, and RefCOCO-avg 86.0. These cover multimodal reasoning, general vision, document reading, and referring expression grounding respectively[2].",
      table: {
        headers: ["Benchmark", "V4.1 Flash", "What it measures"],
        rows: [
          ["MMMU-Pro", "56.5", "College-level multimodal reasoning"],
          ["CVBench", "77.9", "General computer-vision understanding"],
          ["DocVQA", "95.6", "Document text question answering"],
          ["RefCOCO-avg", "86.0", "Referring-expression grounding"],
        ],
      },
      paragraphs: [
        "The split is instructive. DocVQA at 95.6 shows the model is strong at reading text inside images, which is the dominant real-world use case for screenshots, scans, and receipts. RefCOCO at 86.0 shows solid grounding of language to image regions, useful for UI and diagram understanding.",
        "MMMU-Pro at 56.5 is the more demanding number. It mixes diagrams, charts, and scientific figures with college-level reasoning, and even strong models find it hard. Read it as a signal that V4.1 Flash is capable but not the outright leader on the hardest multimodal reasoning[2].",
      ],
      note: "All figures are vendor-reported from the model card and have not been independently verified by this site. Check them against your own task before committing[2].",
    },
    {
      num: "06",
      title: "Visual Agent Benchmarks: Chartography, BabyVision, ZeroBench",
      description:
        "The tool-augmented visual agent numbers are where the model is most competitive. With tools, V4.1 Flash scores Chartography 78.9, BabyVision 89.6, and ZeroBench-main 49.0[4].",
      table: {
        headers: ["Benchmark (with tools)", "V4.1 Flash", "Opus 5", "GPT-5.6 Sol"],
        rows: [
          ["Chartography", "78.9", "84.0", "79.9"],
          ["BabyVision", "89.6", "94.1", "88.9"],
          ["ZeroBench-main", "49.0", "52.0", "53.0"],
        ],
      },
      paragraphs: [
        "Chartography tests chart reasoning, BabyVision tests fine-grained visual discrimination, and ZeroBench-main is a deliberately hard benchmark built to expose the ceiling of current vision models. Against the same table, Claude Opus 5 leads all three, GPT-5.6 Sol leads ZeroBench, and V4.1 Flash lands close behind on Chartography and BabyVision[4].",
        "The pattern mirrors the text benchmarks: V4.1 Flash is near the frontier on practical tasks and behind on the hardest reasoning. For agent workflows that call tools to inspect a screenshot or a chart, that is usually a favorable trade given the price[4][5].",
      ],
      note: "These are agentic scores measured with tools, so they depend on the surrounding harness as much as on the model. Do not compare them directly with single-shot vision numbers[4].",
    },
    {
      num: "07",
      title: "Replacing V4-Flash-Vision-Exp and the Limits",
      description:
        "V4.1 Flash replaces the experimental V4-Flash-Vision-Exp model. If your code still calls the experimental id, it resolves, but it is answered by V4.1 Flash and billed at Flash rates[1].",
      paragraphs: [
        "DeepSeek is candid about the ceiling. It says the model still lags the best closed systems at reading complicated images. That caveat matters for teams considering it for dense document parsing, fine-grained chart extraction, or high-stakes scientific imagery where a small visual error changes the answer[5][4].",
        "A reasonable deployment rule: use V4.1 Flash where images are an input to a text or agent task, and validate carefully where the image itself is the subject of the question. Because the capability now ships on the main model, upgrading is a model-string change rather than a separate integration[1][2].",
      ],
      list: [
        "Good fit: screenshots, UI understanding, charts with tools, document text extraction",
        "Weaker fit: dense multi-panel figures, fine spatial reasoning, adversarial visual puzzles",
        "Always validate on your own image distribution before replacing a specialized model",
        "Log image count and token spend, since vision consumes context budget[2][5]",
      ],
      note: "The dedicated vision deep dive on [[v4-1-flash-benchmarks|the benchmark page]] places the visual agent rows next to the text rows. For API details, start with [[v4-1-flash-api-setup|the setup guide]].",
    },
  ],
  relatedGuides: [
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "DeepSeek V4.1 Flash Benchmarks: Full Official Table", slug: "v4-1-flash-benchmarks" },
    { title: "DeepSeek V4.1 Flash API Setup: deepseek-flash & Migration", slug: "v4-1-flash-api-setup" },
    { title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash", slug: "deepseek-v4-pro-retired" },
  ],
  sources: [
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "VentureBeat: V4.1-Flash Benchmarks and Vision", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
    { label: "vLLM Recipes: DeepSeek-V4.1-Flash", url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "The Next Web: V4.1-Flash Launch and V4-Pro Retirement", url: "https://thenextweb.com/news/deepseek-v4-1-flash-launch-v4-pro-retired-price-cut" },
  ],
};

import type { GuideContent } from "./types";

// target keyword: Hermes DeepSeek MiMo
export const hermesSetup: GuideContent = {
  slug: "hermes-setup",
  category: "AI CODING AGENTS",
  title: "Hermes Best Setup: DeepSeek V4 Flash 0731 + MiMo V2.5 (Vision)",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "Hermes DeepSeek MiMo setup: run DeepSeek V4 Flash 0731 as the main model and MiMo V2.5 in the vision slot for image support — both bill at $0.14/$0.28.",
  toc: [
    { id: "step-1", label: "Step 1: What Hermes Is: A Self-Improving Agent With Native DeepSeek Support" },
    { id: "step-2", label: "Step 2: The Problem: DeepSeek V4 Is Text-Only and Rejects Images" },
    { id: "step-3", label: "Step 3: How Hermes Solves It: auxiliary.vision Routes Images to a Vision Model" },
    { id: "step-4", label: "Step 4: Pick MiMo V2.5 (Not Pro) as the Vision Model" },
    { id: "step-5", label: "Step 5: Configure config.yaml: Flash as Main, MiMo V2.5 in the Vision Slot" },
    { id: "step-6", label: "Step 6: The Xiaomi API: Endpoint, Image Formats, and Real Token Cost" },
    { id: "step-7", label: "Step 7: Why This Combo Wins: Same Price, Community Consensus, Honest Trade-offs" },
  ],
  steps: [
    {
      num: "01",
      title: "What Hermes Is: A Self-Improving Agent With Native DeepSeek Support",
      description:
        "Hermes Agent is Nous Research's self-improving AI agent — one of the few agents with a built-in learning loop that accumulates skills, memory, and a user model across sessions. The MIT-licensed repo sits at roughly 211K–223K stars and 43K forks, and the agent ships 60+ tools[2]. DeepSeek's official API docs carry a dedicated “Integrate with Hermes Agent” page, so this pairing is first-party on both sides[1].",
      paragraphs: [
        "Install is a one-liner. On Linux, macOS, WSL2, or Termux run curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash; Windows users run iex (irm https://hermes-agent.nousresearch.com/install.ps1). Then hermes setup opens a Quick Setup flow: choose DeepSeek, paste an API key, keep the base URL at https://api.deepseek.com, and pick a model.",
        "The native model IDs deepseek-v4-flash and deepseek-v4-pro landed in Hermes' DeepSeek provider and OpenRouter lists on April 24, 2026 — the same day DeepSeek previewed the V4 family (PR #14934). You do not need a custom provider file just to run DeepSeek on Hermes.",
      ],
      list: [
        "Config splits across ~/.hermes/config.yaml (non-secrets) and ~/.hermes/.env (API keys).",
        "Hermes supports 20+ providers: DeepSeek, Xiaomi MiMo, OpenRouter, Nous Portal, Anthropic, OpenAI, and Ollama among them.",
        "Xiaomi's own docs also list Hermes Agent as an official MiMo partner alongside Claude Code, Codex, and OpenClaw.",
      ],
      note: "The Hermes DeepSeek MiMo pattern in this guide is a community-validated multi-model setup, not an officially named combo. DeepSeek and Xiaomi each document Hermes integration independently; wiring the two together is the trick this guide walks through.",
    },
    {
      num: "02",
      title: "The Problem: DeepSeek V4 Is Text-Only and Rejects Images",
      description:
        "DeepSeek V4 Flash — and V4 Pro for that matter — is a pure text model. The July 31, 2026 update to DeepSeek-V4-Flash-0731 kept the same architecture and input modality; it only re-ran post-training. Send an image to the Flash API and the request fails with an error like “unknown variant image_url, expected text” — a rejection tracked in Hermes issues #32160 and #58581.",
      paragraphs: [
        "One r/hermesagent user put it plainly: “DeepSeek-V4-Flash doesn't support image/vision processing — the model returned a 404 error when I tried to read the photo.” No prompt engineering fixes this; the API rejects image content before the model ever sees it[3].",
        "If your agent workflow touches screenshots, diagrams, receipts, or photos, a text-only brain is a hard wall. The fix is not to switch models — it is to give Hermes a second, cheaper model that can see.",
      ],
      list: [
        "[[deepseek-v4-flash|DeepSeek V4 Flash]] 0731: same 284B/13B MoE, same 1M context, still text-only.",
        "[[v4-pro|DeepSeek V4 Pro]] (1.6T/49B) is also text-only — the flagships share the limitation.",
        "Both run at $0.14 input / $0.28 output per 1M tokens, the cheapest agent-grade pricing covered on this site.",
      ],
      note: "Hermes' vision docs treat DeepSeek as the canonical text-only main model, which is exactly the case this tutorial exists to solve.",
    },
    {
      num: "03",
      title: "How Hermes Solves It: auxiliary.vision Routes Images to a Vision Model",
      description:
        "Hermes fixes this with a two-model architecture. When the main model is text-only — DeepSeek is the documented case — pasted images automatically route to a vision_analyze auxiliary tool. That tool calls a separate vision model you configure, which describes the image in text, and the description is injected back into the conversation as context.",
      paragraphs: [
        "You configure the helper under the auxiliary.vision block in ~/.hermes/config.yaml, with three knobs per slot: provider, model, and base_url. The vision slot's default provider is “auto”, which routes images to the main model — and that default breaks with a text-only main model, because the main model cannot read the image. Leave it at auto and image analysis fails; you must point the slot at a real multimodal model.",
        "The same auxiliary mechanism powers web_extract, compression, title_generation, approval, triage, and profile_describer slots. Vision is just the one you need for images.",
      ],
      list: [
        "vision_analyze: describes images into text for a text-only main model.",
        "web_extract: pulls page content for research-style tasks.",
        "compression: summarizes long context to control token spend.",
        "approval / triage: human-in-the-loop and routing helpers.",
      ],
      note: "A known bug where vision_analyze ignored the auxiliary.vision block is tracked in issue #58581, with hermes config set as the documented workaround.",
    },
    {
      num: "04",
      title: "Pick MiMo V2.5 (Not Pro) as the Vision Model",
      description:
        "MiMo-V2.5 is Xiaomi's native omnimodal model — text, image, video, and audio under one architecture. It is a 310B-total / 15B-active Sparse MoE trained on 48T tokens with a native 1M-token context and a 729M-parameter ViT vision encoder[6]. On OpenRouter it is described as delivering “Pro-level agentic performance at roughly half the inference cost”.",
      paragraphs: [
        "The decisive number is price. MiMo-V2.5 official pricing is $0.14 input (cache miss) / $0.28 output / $0.0028 cache-hit per 1M tokens — identical to DeepSeek V4 Flash[4]. Adding a vision model does not raise your per-token ceiling.",
        "The trap is the name. MiMo-V2.5-Pro is a different, text-only model. Artificial Analysis flags the Pro as non-multimodal with no image input, and Hermes issue #18884 confirms that models.dev mislabels mimo-v2.5-pro with attachment:true[7]. When you see “Pro”, do not assume vision — the multimodal model is mimo-v2.5.",
      ],
      list: [
        "MiMo-V2.5: omnimodal and vision-capable, $0.14/$0.28 — use this one in the vision slot.",
        "MiMo-V2.5-Pro: text-only, $0.435/$0.87, not a vision model — do not use it here.",
        "V2-series names (mimo-v2-pro, mimo-v2-omni) retired on June 30, 2026; move to mimo-v2.5.",
      ],
      note: "The Hermes DeepSeek MiMo recipe hinges on this choice: Flash for reasoning, MiMo V2.5 non-Pro for vision — both at the same token price, which the [[flash-pricing|pricing guide]] breaks down for the Flash side.",
    },
    {
      num: "05",
      title: "Configure config.yaml: Flash as Main, MiMo V2.5 in the Vision Slot",
      description:
        "With both API keys in hand, the whole setup is one config block. The main model becomes deepseek-v4-flash — the 0731 build, and the model ID did not change — while the auxiliary.vision slot gets provider xiaomi with model mimo-v2.5.",
      code: `# ~/.hermes/.env
DEEPSEEK_API_KEY=sk-...
XIAOMI_API_KEY=sk-...                # or OPENROUTER_API_KEY=sk-or-...

# ~/.hermes/config.yaml
model:
  default: deepseek-v4-flash         # main model = text reasoning (0731 build)
  provider: deepseek
  base_url: https://api.deepseek.com

auxiliary:
  vision:                            # vision slot = image support
    provider: xiaomi                 # or openrouter
    model: mimo-v2.5                 # NOT mimo-v2.5-pro (that one is text-only)
    # base_url: https://api.xiaomimimo.com/v1   # set explicitly if needed`,
      paragraphs: [
        "That single block is the whole Hermes DeepSeek MiMo setup: a text main model and a multimodal helper at the same price. The equivalent CLI is hermes config set auxiliary.vision.provider xiaomi and hermes config set auxiliary.vision.model mimo-v2.5, or the interactive hermes model menu under “Configure auxiliary models”.",
        "If the xiaomi provider errors in your Hermes version — models.dev metadata for the CN plan has known bugs — route the slot through OpenRouter instead: provider openrouter with model xiaomi/mimo-v2.5. Xiaomi's official Hermes integration docs use the XIAOMI_API_KEY / XIAOMI_BASE_URL environment variables for direct access.",
      ],
      note: "Keep secrets in ~/.hermes/.env and everything else in config.yaml. The .env file is where the XIAOMI_API_KEY belongs if you take Xiaomi's direct-integration path.",
    },
    {
      num: "06",
      title: "The Xiaomi API: Endpoint, Image Formats, and Real Token Cost",
      description:
        "MiMo V2.5 speaks OpenAI-compatible APIs, so it drops into any OpenAI-shaped client. The base URL is https://api.xiaomimimo.com/v1 with model id mimo-v2.5, and an Anthropic-compatible https://api.xiaomimimo.com/anthropic endpoint is available as an option[5].",
      code: `from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ["MIMO_API_KEY"],
    base_url="https://api.xiaomimimo.com/v1",
)
client.chat.completions.create(
    model="mimo-v2.5",
    messages=[{"role": "user", "content": [
        {"type": "image_url", "image_url": {"url": "https://.../image.png"}},
        {"type": "text", "text": "please describe the content of the image"},
    ]}],
)`,
      paragraphs: [
        "Images are accepted as a public URL or a Base64 data URL (data:{MIME};base64,...). Supported formats are JPEG, PNG, GIF, WebP, and BMP; a single image must stay under 50MB, and multiple images per request are allowed. There is no local-file upload — the image must be reachable over HTTP or embedded as Base64.",
        "The cost math stays small: one common-resolution image costs roughly 1,024 image tokens. At $0.14 per 1M tokens that is a rounding error per image, but it is extra on top of the conversation — community reports of MiMo “burning tokens like crazy” usually trace back to vision and long tool loops, not the base rate.",
      ],
      list: [
        "Base64 and public URLs both work; local file paths do not.",
        "Roughly 1,024 image tokens per typical image.",
        "Multi-image requests are supported, so a screenshot batch costs about 1K tokens per image.",
      ],
      note: "Keys and base URL can also be wired straight into ~/.hermes/.env for the Hermes route — see the [[flash-api-setup|DeepSeek API setup guide]] for the DeepSeek side of the same file.",
    },
    {
      num: "07",
      title: "Why This Combo Wins: Same Price, Community Consensus, Honest Trade-offs",
      description:
        "The pairing makes one simple bet: Flash is the agent brain, MiMo V2.5 is the eyes, and neither raises the other's cost. Because both models bill at $0.14/$0.28, the multimodal upgrade is effectively free per token — you only pay for the ~1,024 image tokens per picture.",
      paragraphs: [
        "This is community consensus, not a fringe hack. r/hermesagent threads frame it as a principle — “hermes works best when you don't hinge on one model” — and recommend a vision-capable model in the auxiliary slot exactly as described here[8]. The same community also votes for multi-model failover chains (MiMo 2.5, GLM 5.2, DeepSeek V4 Pro) when a task outgrows a single model.",
        "Be honest about the trade-offs. Some users report MiMo is “less capable in autonomous work” than Flash in head-to-head agent loops, and vision tokens add up on heavy screenshot workflows. That is why the split exists: you want Flash driving, with MiMo only describing images on demand.",
        "One more caveat: Hermes' direct xiaomi provider under auxiliary.vision is not yet battle-tested in the wild — issue #18884 shows metadata bugs on the Xiaomi side. The safe default is provider xiaomi, and if it fails, OpenRouter's xiaomi/mimo-v2.5 is the documented fallback.",
      ],
      list: [
        "Flash 0731 does the reasoning and coding; it hit 82.7 on Terminal-Bench 2.1 in DeepSeek's own numbers.",
        "MiMo V2.5 handles vision_analyze only — image to text, then hands the context back.",
        "Same token price on both sides; the vision slot adds no premium.",
        "Budget tip: keep the conversation on Flash and let cache hits ($0.0028/M) absorb the long context — the same lever the [[reasonix-deepseek|Reasonix guide]] uses to hit 99%+ cache rates.",
      ],
      note: "The Hermes DeepSeek MiMo pairing is the cheapest way to give a text-only agent eyes — and the same auxiliary pattern extends to other agents when you need it.",
    },
  ],
  prevGuide: { title: "Reasonix: The DeepSeek Harness That Hits 99%+ Cache Rates", slug: "reasonix-deepseek" },
  nextGuide: { title: "DeepSeek V4 vs GPT-5.6 Luna: Which Is Better After the Price Cut?", slug: "v4-vs-gpt56-luna" },
  relatedGuides: [
    { title: "Reasonix: The DeepSeek Harness That Hits 99%+ Cache Rates", slug: "reasonix-deepseek" },
    { title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release", slug: "deepseek-v4-flash" },
    { title: "OpenCode Go: The $5/Month Subscription That Unlocks DeepSeek V4", slug: "opencode-go" },
    { title: "Connect Claude Code & Claude Desktop to DeepSeek V4 with CC Switch", slug: "cc-switch-claude-code" },
  ],
  sources: [
    { label: "Integrate with Hermes Agent — Official DeepSeek Docs", url: "https://api-docs.deepseek.com/quick_start/agent_integrations/hermes/" },
    { label: "Hermes Agent — Official Docs", url: "https://hermes-agent.nousresearch.com/docs/" },
    { label: "Hermes Vision Docs — Image Support for Text-Only Main Models", url: "https://hermes-agent.nousresearch.com/docs/user-guide/features/vision" },
    { label: "MiMo V2.5 — Official Pay-as-You-Go Pricing", url: "https://mimo.mi.com/docs/price/pay-as-you-go" },
    { label: "MiMo V2.5 — Image Understanding Docs", url: "https://mimo.mi.com/docs/en-US/quick-start/usage-guide/multimodal-understanding/image-understanding" },
    { label: "MiMo-V2.5 — HuggingFace Model Card", url: "https://huggingface.co/XiaomiMiMo/MiMo-V2.5" },
    { label: "Hermes Issue #18884 — mimo-v2.5-pro Mislabeled as Attachment-Capable", url: "https://github.com/NousResearch/hermes-agent/issues/18884" },
    { label: "r/hermesagent — “DeepSeek V4 Flash is amazing and cheap as fk”", url: "https://www.reddit.com/r/hermesagent/comments/1tn69g2/deepseekv4flash_is_amazing_and_cheap_as_fk/" },
  ],
};

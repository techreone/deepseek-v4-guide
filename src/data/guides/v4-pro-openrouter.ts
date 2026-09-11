import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro openrouter
export const v4ProOpenrouter: GuideContent = {
  slug: "v4-pro-openrouter",
  category: "INTEGRATION GUIDE",
  title: "DeepSeek V4 Pro on OpenRouter: Model IDs, Pricing & Setup",
  seoTitle: "DeepSeek V4 Pro on OpenRouter: Setup",
  readTime: "5 MIN READ",
  updatedAt: "SEP 11, 2026",
  notice:
    "Retiring: from Sept 14, 2026, all deepseek-v4-pro requests route to V4.1 Flash at Flash rates. See [[deepseek-v4-pro-retired|why V4-Pro was retired]] and [[deepseek-v4-1-flash|the V4.1 Flash guide]].",
  summary:
    "Use V4 Pro 0813 on OpenRouter: model ID deepseek/deepseek-v4-pro-0813 at $0.435/$0.87, BYOK, and the 8/16 peak-pricing impact.",
  toc: [
    { id: "step-1", label: "Step 1: The OpenRouter Model Entries" },
    { id: "step-2", label: "Step 2: Calling It From Code" },
    { id: "step-3", label: "Step 3: Pricing Notes & the 8/16 Change" },
    { id: "step-4", label: "Step 4: BYOK & Rate Limits" },
    { id: "step-5", label: "Step 5: OpenRouter vs the Official API" },
  ],
  steps: [
    {
      num: "01",
      title: "The OpenRouter Model Entries",
      description:
        "OpenRouter added a fresh GA entry for DeepSeek V4 Pro on August 13, 2026, right when DeepSeek promoted the 0813 checkpoint to general availability[1][2]. The listing exposes three V4-family IDs, and the pricing on the new entry matches DeepSeek's official flat rate[1].",
      table: {
        headers: ["OpenRouter model ID", "Context", "Prompt / 1M", "Completion / 1M"],
        rows: [
          ["deepseek/deepseek-v4-pro-0813", "1M", "$0.435", "$0.87"],
          ["deepseek/deepseek-v4-pro", "1M", "$1.168", "$2.336"],
          ["deepseek/deepseek-v4-flash", "1M", "$0.06146", "$0.12292"],
          ["deepseek/deepseek-v4-flash-0731", "1M", "$0.14", "$0.28"],
        ],
      },
      paragraphs: [
        "Two pro entries exist and it matters which one you pick. The old deepseek/deepseek-v4-pro entry dates from the April preview and still carries preview-era pricing ($1.168/$2.336) — nearly three times the GA price. The 0813 entry is the one to use[1].",
      ],
      note: "Model listing captured from openrouter.ai/api/v1/models on August 16, 2026[1].",
    },
    {
      num: "02",
      title: "Calling It From Code",
      description:
        "OpenRouter uses an OpenAI-compatible endpoint, so calling V4 Pro 0813 is a two-line change if you already use the official API: swap the base_url to openrouter.ai/api/v1 and the model to deepseek/deepseek-v4-pro-0813[1].",
      code: `from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="<OPENROUTER_API_KEY>",
)

resp = client.chat.completions.create(
    model="deepseek/deepseek-v4-pro-0813",
    messages=[{"role": "user", "content": "Refactor this codebase summary"}],
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}},
)
print(resp.choices[0].message.content)`,
      list: [
        "model: deepseek/deepseek-v4-pro-0813 (the GA entry, not the old preview one).",
        "reasoning_effort: low / high / max — same three levels as the official API[3].",
        "thinking: enable with extra_body for chain-of-thought, matching DeepSeek's thinking mode[3].",
      ],
      note: "OpenRouter passes DeepSeek-specific parameters through as extra_body in the OpenAI SDK[1][3].",
    },
    {
      num: "03",
      title: "Pricing Notes & the 8/16 Change",
      description:
        "On August 16 at 16:00 UTC, DeepSeek moved the official API to peak/off-peak pricing: Pro output goes from $0.87 to $1.98 off-peak or $3.96 at peak, with cache-hit input at $0.022/$0.044[2][3]. As of this writing OpenRouter had not mirrored the new schedule — its 0813 entry still shows the flat $0.435/$0.87[1].",
      paragraphs: [
        "That lag cuts both ways. If you route heavy Pro traffic through OpenRouter, you are currently paying the old flat rate — cheaper than DeepSeek's off-peak price only for cache-heavy workloads. If you are latency- or cost-sensitive to peak hours, OpenRouter's flat rate can be a hedge, but it may change without notice as OpenRouter reconciles pricing.",
        "In practice, teams running OpenAI-SDK codebases switch to OpenRouter in minutes: same messages array, one base_url change, and the 0813 entry behaves like the official API including reasoning_content on thinking responses. The one difference to test first is streaming — OpenRouter adds its own SSE envelope — so verify your stream parser before migrating production traffic.",
        "Cache pricing on OpenRouter matches DeepSeek's: $0.003625 per 1M cache-read tokens on the 0813 entry[1]. Prefix caching is automatic on both sides.",
      ],
      note: "Peak/off-peak prices per DeepSeek's official pricing page[2][3]; OpenRouter status checked August 16, 2026[1].",
    },
    {
      num: "04",
      title: "BYOK & Rate Limits",
      description:
        "OpenRouter supports bring-your-own-key (BYOK) for DeepSeek models, so you can pass a DeepSeek API key through OpenRouter and get direct billing from DeepSeek while using OpenRouter's unified SDK and fallback routing[1]. This works on the 0813 entry like on any other DeepSeek listing.",
      list: [
        "BYOK: set an OpenRouter credentials object with your DeepSeek key; usage bills to DeepSeek.",
        "No BYOK: usage bills to OpenRouter credit at the listed rate.",
        "Concurrency on the official API is 500 for Pro / 2,500 for Flash[3]; OpenRouter applies its own queueing on top.",
      ],
      paragraphs: [
        "If you primarily want the official API's rate limits and peak/off-peak pricing, go direct. If you want one SDK for many providers with automatic fallback, OpenRouter is the pragmatic middle ground[1].",
      ],
      note: "BYOK behavior is standard OpenRouter functionality applied to the DeepSeek listings[1].",
    },
    {
      num: "05",
      title: "OpenRouter vs the Official API",
      description:
        "The official API (base_url https://api.deepseek.com) gives you the new peak/off-peak schedule, direct rate limits, and immediate access to new parameters like reasoning_effort without a middleman[3]. OpenRouter gives you multi-provider routing, a single bill, and — right now — the older flat price[1].",
      table: {
        headers: ["Factor", "Official API", "OpenRouter"],
        rows: [
          ["base_url", "https://api.deepseek.com", "https://openrouter.ai/api/v1"],
          ["Pro pricing (Aug 16)", "Off-peak $0.66/$1.98, peak $1.32/$3.96[2]", "Flat $0.435/$0.87[1]"],
          ["Concurrency", "500 (Pro)[3]", "OpenRouter-managed"],
          ["Multi-provider", "No", "Yes, with fallback"],
          ["Responses API", "Native[4]", "Via OpenAI-compatible layer"],
        ],
      },
      paragraphs: [
        "Most teams start direct on the official API, then add OpenRouter as a fallback or for provider-agnostic SDKs. Either way, the model string that matters for quality is deepseek-v4-pro-0813 — the GA checkpoint that lifted [[v4-pro-benchmarks|Terminal-Bench 2.1 to 87.9]][5].",
      ],
      note: "Both endpoints share the same model weights; only billing and routing differ[1][3].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "DeepSeek V4 Pro: Specs, Pricing & Release Date", slug: "v4-pro" },
    { title: "DeepSeek V4 Pro Pricing After the 8/16 Update", slug: "v4-pro-pricing" },
    { title: "DeepSeek V4 Pro API Setup Guide", slug: "v4-pro-api" },
    { title: "DeepSeek V4 Flash on OpenRouter", slug: "flash-openrouter" },
    { title: "DeepSeek V4 Pro Benchmarks: 0813 Scores", slug: "v4-pro-benchmarks" },
  ],
  sources: [
    { label: "OpenRouter Models API", url: "https://openrouter.ai/api/v1/models" },
    { label: "DeepSeek V4 Pro GA Release Notes", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "DeepSeek Responses API Guide", url: "https://api-docs.deepseek.com/guides/responses_api/" },
    { label: "DeepSeek-V4-Pro-0813 Model Card (Hugging Face)", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813" },
  ],
};

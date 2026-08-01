import type { GuideContent } from "./types";

// target keyword: deepseek v4 flash openrouter
export const flashOpenrouter: GuideContent = {
  slug: "flash-openrouter",
  category: "ROUTERS & PROVIDERS",
  title: "DeepSeek V4 Flash on OpenRouter: Setup, Pricing & BYOK",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek V4 Flash on OpenRouter: slugs, $0.0896/$0.1792 pricing vs official, BYOK setup, thinking params, and direct-API tradeoffs.",
  toc: [
    { id: "step-1", label: "Step 1: Why Route DeepSeek V4 Flash Through OpenRouter?" },
    { id: "step-2", label: "Step 2: The Two Slugs: deepseek-v4-flash vs deepseek-v4-flash-0731" },
    { id: "step-3", label: "Step 3: OpenRouter Pricing: $0.0896/$0.1792 vs Official $0.14/$0.28" },
    { id: "step-4", label: "Step 4: Set Up OpenRouter: Account, API Key & Credits" },
    { id: "step-5", label: "Step 5: First Call: curl & the OpenAI SDK" },
    { id: "step-6", label: "Step 6: Enable Thinking Mode: reasoning.enabled & reasoning_effort" },
    { id: "step-7", label: "Step 7: BYOK: Connect Your DeepSeek Key" },
    { id: "step-8", label: "Step 8: OpenRouter vs the Official API: Which Should You Pick?" },
  ],
  steps: [
    {
      num: "01",
      title: "Why Route DeepSeek V4 Flash Through OpenRouter?",
      description:
        "OpenRouter is a unified AI router: one API key and one OpenAI-compatible endpoint give you access to hundreds of models, including DeepSeek V4 Flash. For DeepSeek specifically, OpenRouter is the largest third-party host — DeepSeek is the platform's #1 model author with a 16.7% token share as of July 13, 2026, and DeepSeek V4 Flash ranks #3 in model usage.",
      paragraphs: [
        "A single OpenRouter slug like `deepseek/deepseek-v4-flash` can route to several independent hosting companies behind the scenes. If one provider goes down, OpenRouter can fail over to another without touching your code. That is the core argument for a router over a direct connection.",
        "OpenRouter states it does not mark up models: the catalog price is the price you pay, and it charges a 5.5% platform fee on pay-as-you-go traffic. V4 models also drive the platform's agentic traffic — they accounted for roughly 70% of DeepSeek's agentic token volume on OpenRouter within about a month of the April 24 release.",
      ],
      table: {
        headers: ["Spec", "DeepSeek V4 Flash"],
        rows: [
          ["Total parameters", "284B"],
          ["Active parameters", "13B (MoE)"],
          ["Context window", "1M (1,048,576 tokens)"],
          ["Max output", "384,000 tokens"],
          ["Released", "April 24, 2026 (preview)"],
          ["License", "MIT (open weights)"],
          ["Input", "Text only"],
        ],
      },
    },
    {
      num: "02",
      title: "The Two Slugs: deepseek-v4-flash vs deepseek-v4-flash-0731",
      description:
        "OpenRouter lists two DeepSeek V4 Flash slugs. `deepseek/deepseek-v4-flash` is the April 24 preview. `deepseek/deepseek-v4-flash-0731` is the official re-post-trained build DeepSeek shipped on July 31, 2026 as a public beta.",
      paragraphs: [
        "The 0731 build has the same architecture and the same size as the preview — it is re-post-training, not a new model. The update only applies to the Flash API; V4 Pro is unchanged. When the 0731 slug launched on OpenRouter, only two providers hosted it, and only the DeepSeek provider serves the official 0731 build — other providers still run the 0424 preview.",
        "The 0731 update adds native Responses API support and a dedicated Codex integration. For agentic coding, DeepSeek reports the 0731 build scores 82.7 on Terminal-Bench 2.1 and 54.4 on DeepSWE. These are vendor-reported figures from DeepSeek's own changelog, not independent testing.",
      ],
      table: {
        headers: ["Agent benchmark (0731, vendor-reported)", "Score"],
        rows: [
          ["Terminal-Bench 2.1", "82.7"],
          ["Cybergym", "76.7"],
          ["Toolathlon (verified)", "70.3"],
          ["DeepSWE", "54.4"],
          ["NL2Repo", "54.2"],
          ["Agent Last Exam", "25.2"],
          ["Automation Bench (Public)", "25.1"],
        ],
      },
      note: "Benchmark scores come from DeepSeek's July 31, 2026 changelog and are vendor-reported. Independent measurements may differ.",
    },
    {
      num: "03",
      title: "OpenRouter Pricing: $0.0896/$0.1792 vs Official $0.14/$0.28",
      description:
        "As of August 1, 2026, OpenRouter lists DeepSeek V4 Flash at $0.0896 per 1M input tokens and $0.1792 per 1M output tokens, marked 36% off. The 0731 variant lists at $0.09 / $0.18. DeepSeek's official API prices V4 Flash at $0.14 input (cache miss) and $0.28 output.",
      paragraphs: [
        "Today OpenRouter is roughly 36% cheaper than DeepSeek's official list price. That is an OpenRouter promotional discount, not an official DeepSeek price change — the two marketplaces can diverge over time.",
        "The catch is cache pricing. DeepSeek's official API drops cache-hit input to $0.0028 per 1M tokens, a 98% discount. OpenRouter charges one flat price for DeepSeek and does not list a separate cache-hit tier. Applications with high cache hit rates — long repeated system prompts, agent sessions — can end up paying significantly less going direct.",
      ],
      table: {
        headers: ["Route (per 1M tokens)", "Input", "Output", "Cache-hit input"],
        rows: [
          ["OpenRouter deepseek/deepseek-v4-flash", "$0.0896", "$0.1792", "Flat (no cache tier)"],
          ["OpenRouter deepseek-v4-flash-0731", "$0.09", "$0.18", "Flat (no cache tier)"],
          ["DeepSeek official API", "$0.14 (miss)", "$0.28", "$0.0028"],
        ],
      },
      note: "OpenRouter adds a 5.5% platform fee on pay-as-you-go traffic. For scale: at the official $0.14/M input price, $1 covers roughly 7 million input tokens on V4 Flash.",
    },
    {
      num: "04",
      title: "Set Up OpenRouter: Account, API Key & Credits",
      description:
        "Create an account at openrouter.ai, generate an API key from the dashboard (keys start with `sk-or-v1-`), and add credits. Third-party guides recommend a $5 minimum top-up with $20 as a comfortable starting balance; credits do not expire, and new accounts get a $1 trial credit.",
      list: [
        "Sign up at openrouter.ai and open the dashboard.",
        "Create an API key from the Keys page — it looks like `sk-or-v1-...`.",
        "Add credits: $5 minimum, $20 recommended. Credits do not expire.",
        "Store the key as the `OPENROUTER_API_KEY` environment variable in your terminal or project `.env` file.",
      ],
      note: "Never commit API keys to git. Keep them in environment variables or a `.env` file that is gitignored.",
    },
    {
      num: "05",
      title: "First Call: curl & the OpenAI SDK",
      description:
        "OpenRouter exposes an OpenAI-compatible API. Point the OpenAI SDK at `https://openrouter.ai/api/v1`, set the model to `deepseek/deepseek-v4-flash`, and everything else works as usual. OpenRouter also accepts Anthropic Messages and Responses formats.",
      code: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek/deepseek-v4-flash",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ]
  }'`,
      paragraphs: [
        "To switch model versions, change one string: `deepseek/deepseek-v4-flash` becomes `deepseek/deepseek-v4-flash-0731`. Nothing else in the request needs to change.",
        "When calling from an app, add the optional `HTTP-Referer` and `X-Title` headers. OpenRouter uses them for app rankings on the platform. See Step 8 for a Python example using the OpenAI SDK.",
      ],
    },
    {
      num: "06",
      title: "Enable Thinking Mode: reasoning.enabled & reasoning_effort",
      description:
        "OpenRouter exposes an optional reasoning switch for V3.2 and V4 models. Pass `\"reasoning\": {\"enabled\": true}` to turn on chain-of-thought and receive the reasoning steps in the response. Omit it to run the faster, cheaper non-thinking mode.",
      paragraphs: [
        "V4 models also accept a `reasoning_effort` parameter. OpenRouter's model page states: \"Reasoning efforts `high` and `xhigh` are supported; `xhigh` maps to max reasoning.\" Use `xhigh` when you want maximum reasoning depth.",
        "The official DeepSeek API uses `low` / `high` / `max` for effort, with `low` and `medium` mapped to `high` and `xhigh` mapped to `max`; complex agent requests are auto-set to `max`. Note the asymmetry: community bug reports (pi issue #4055, LiteLLM issue #27439) show OpenRouter's normalized reasoning API accepts `xhigh` directly, while passing `max` can be ignored or fall back to defaults. On OpenRouter, use `xhigh`.",
      ],
      code: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek/deepseek-v4-flash-0731",
    "messages": [{"role": "user", "content": "Plan the refactor steps."}],
    "reasoning": {"enabled": true},
    "reasoning_effort": "xhigh"
  }'`,
      note: "Thinking mode returns reasoning steps in the response. In multi-turn conversations, pass the assistant message back as usual — the reasoning content is not replayed as input.",
    },
    {
      num: "07",
      title: "BYOK: Connect Your DeepSeek Key",
      description:
        "BYOK stands for Bring Your Own Key. In your OpenRouter workspace, open the BYOK settings and bind your DeepSeek provider key. OpenRouter stores the key encrypted and uses it for every request routed to DeepSeek, so traffic bills against your own DeepSeek key instead of OpenRouter's list price.",
      paragraphs: [
        "The economics are attractive: the first 1M BYOK requests per month are free, and after that you pay 5% of OpenRouter's normal price, deducted from your OpenRouter credits. That 5% is a routing convenience fee — you keep failover, unified billing, and one key for every model.",
        "OpenRouter lets you manage multiple keys per provider with prioritized and backup partitions. A primary DeepSeek key is used first, and a fallback key absorbs the overflow when the primary is exhausted or down.",
      ],
      table: {
        headers: ["Traffic type", "Fee"],
        rows: [
          ["OpenRouter pay-as-you-go (no own key)", "5.5% platform fee, no model markup"],
          ["BYOK, first 1M requests per month", "Free"],
          ["BYOK, after 1M requests per month", "5% of OpenRouter's normal price, from OpenRouter credits"],
        ],
      },
      note: "Because BYOK bills against your DeepSeek key, it combines OpenRouter's routing with DeepSeek's official rates — including the $0.0028 cache-hit input tier.",
    },
    {
      num: "08",
      title: "OpenRouter vs the Official API: Which Should You Pick?",
      description:
        "Both routes serve the same model. Direct access hits `https://api.deepseek.com` with model `deepseek-v4-flash`; OpenRouter uses `https://openrouter.ai/api/v1` with `deepseek/deepseek-v4-flash`. For running DeepSeek V4 Flash on OpenRouter the deciding factors are failover, cache utilization, and how many models you juggle.",
      table: {
        headers: ["Dimension", "DeepSeek official direct", "OpenRouter"],
        rows: [
          ["Base URL", "https://api.deepseek.com", "https://openrouter.ai/api/v1"],
          ["Model name", "deepseek-v4-flash", "deepseek/deepseek-v4-flash"],
          ["Price per 1M (Aug 1, 2026)", "$0.14 in / $0.28 out; cache hit $0.0028", "$0.0896 / $0.1792, flat (36% off)"],
          ["Platform fee", "None", "5.5%; BYOK first 1M requests/month free, then 5%"],
          ["Concurrency", "2,500", "Provider-dependent"],
          ["Strengths", "Floor price, cache discount, high concurrency", "One key for all models, multi-provider failover, switch versions by string change, lock known providers"],
          ["Weaknesses", "Single provider, no failover", "Flat cache pricing hurts high-cache apps, platform fee"],
        ],
      },
      paragraphs: [
        "Provider quality is why routing exists. V4 Pro on OpenRouter is hosted by 16 providers with roughly a 4x spread in input pricing ($0.435–$1.74 per 1M tokens) and throughput from 4 to 57 tokens/s. When hosts vary that much, a router that locks a known-good provider or sorts by throughput or price is genuinely useful.",
        "OpenRouter exposes per-request routing controls: `sort: 'throughput'` for speed or `sort: 'price'` for the cheapest host, a `max_price` cost cap, and `order` / `only` / `ignore` to pin or exclude providers. Long sessions can pass a `session_id` for sticky routing, and a `models` array gives model-level fallback.",
        "One caution: OpenRouter has a free variant, `deepseek/deepseek-v4-flash:free`, with reasoning support, but the community reports it is unstable — frequent 429 rate limits and downtime. Treat it as a test tier, not production.",
      ],
      code: `from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="sk-or-v1-...",          # your OPENROUTER_API_KEY
)

resp = client.chat.completions.create(
    model="deepseek/deepseek-v4-flash",
    messages=[{"role": "user", "content": "Hello"}],
    extra_headers={"HTTP-Referer": "https://your-site.com", "X-Title": "Your App"},
)

print(resp.choices[0].message.content)`,
      note: "Bottom line: if you need floor pricing and run cache-heavy workloads, go direct. If you need failover, run long agent sessions, or want one key for many models, OpenRouter — especially with BYOK — is the practical choice.",
    },
  ],
  prevGuide: {
    title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex: Setup Guide",
    slug: "flash-ide",
  },
  nextGuide: {
    title: "DeepSeek V4 Flash Model Size: Params, VRAM & What It Means",
    slug: "flash-model-size",
  },
  relatedGuides: [
    { title: "DeepSeek V4 Flash API Setup: Base URL, Models & Your First Call", slug: "flash-api-setup" },
    { title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%", slug: "flash-pricing" },
    { title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex: Setup Guide", slug: "flash-ide" },
    { title: "DeepSeek V4 Flash Model Size: Params, VRAM & What It Means", slug: "flash-model-size" },
  ],
  sources: [
    {
      label: "OpenRouter Model Page — deepseek/deepseek-v4-flash",
      url: "https://openrouter.ai/deepseek/deepseek-v4-flash",
    },
    {
      label: "OpenRouter Model Page — deepseek/deepseek-v4-flash-0731",
      url: "https://openrouter.ai/deepseek/deepseek-v4-flash-0731",
    },
    {
      label: "OpenRouter Insights: Why OpenRouter for DeepSeek?",
      url: "https://openrouter.ai/blog/insights/why-openrouter-for-deepseek/",
    },
    {
      label: "OpenRouter Quickstart",
      url: "https://openrouter.ai/docs/quickstart",
    },
    {
      label: "OpenRouter BYOK Guide",
      url: "https://openrouter.ai/docs/guides/overview/auth/byok",
    },
    {
      label: "OpenRouter BYOK Use Cases",
      url: "https://openrouter.ai/docs/use-cases/byok",
    },
    {
      label: "DeepSeek Official Models & Pricing",
      url: "https://api-docs.deepseek.com/quick_start/pricing/",
    },
    {
      label: "DeepSeek Thinking Mode Guide",
      url: "https://api-docs.deepseek.com/guides/thinking_mode/",
    },
  ],
};

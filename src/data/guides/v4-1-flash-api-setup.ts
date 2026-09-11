import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash api
// 内容来源：reference/topics/27-v4-1-flash.md + 28-v4-pro-retired-routing.md（官方 changelog / news260910 / pricing / HF 模型卡 / vLLM recipe）
export const v41FlashApiSetup: GuideContent = {
  slug: "v4-1-flash-api-setup",
  category: "API",
  title: "DeepSeek V4.1 Flash API Setup: Base URL, Model ID & Migration",
  seoTitle: "DeepSeek V4.1 Flash API Setup & Migration",
  readTime: "9 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "Call DeepSeek V4.1 Flash with model deepseek-flash at api.deepseek.com. cURL and Python examples, continuous reasoning_effort, Responses API, V4 migration.",
  toc: [
    { id: "step-1", label: "Step 1: The V4.1 Flash API in One Paragraph" },
    { id: "step-2", label: "Step 2: Your First Call with cURL" },
    { id: "step-3", label: "Step 3: Your First Call with Python" },
    { id: "step-4", label: "Step 4: Thinking Mode and Continuous Reasoning Effort" },
    { id: "step-5", label: "Step 5: Responses API and the Anthropic Endpoint" },
    { id: "step-6", label: "Step 6: Migrating from deepseek-v4-flash" },
    { id: "step-7", label: "Step 7: Concurrency, Rate Limits and a Production Checklist" },
  ],
  steps: [
    {
      num: "01",
      title: "The V4.1 Flash API in One Paragraph",
      description:
        "The DeepSeek V4.1 Flash API is OpenAI-compatible. Keep your DeepSeek API key, point the client at `https://api.deepseek.com`, and set `model` to `deepseek-flash`. That single field change is the whole migration from the old Flash line, because DeepSeek retired the legacy ids and routes them to the new model behind the scenes[1][3].",
      paragraphs: [
        "V4.1 Flash launched on September 10, 2026 as the first model in DeepSeek's new architecture family. It kept the same base URLs and the same authentication model as V4 Flash, so existing SDK code keeps working. For the architecture background, see [[deepseek-v4-1-flash|What Is DeepSeek V4.1 Flash]].",
        "The API exposes two request formats. The OpenAI-compatible format lives at `https://api.deepseek.com`, and an Anthropic-compatible endpoint lives at `https://api.deepseek.com/anthropic`. The same key authenticates both. Billing is per token on a peak/off-peak schedule, so the time of day changes the price; see [[v4-1-flash-pricing|the pricing guide]] for the full rate table[3].",
      ],
      list: [
        "Base URL (OpenAI format): https://api.deepseek.com",
        "Base URL (Anthropic format): https://api.deepseek.com/anthropic",
        "Model name: deepseek-flash",
        "Auth: standard DeepSeek API key sent as a Bearer token",
        "Thinking: on by default; reasoning_effort is a continuous integer from 1 to 100[1][4]",
      ],
      note: "Legacy names deepseek-v4-flash and deepseek-v4-flash-vision-exp are retired but still resolve — they route to V4.1 Flash and bill at Flash rates. Check [[deepseek-flash-model-names|the model names reference]] before you ship[1].",
    },
    {
      num: "02",
      title: "Your First Call with cURL",
      description:
        "The smallest possible request sets the model and a user message. Everything else is optional. One POST to `/chat/completions` is enough to confirm your key, your base URL, and your network path all work[3].",
      code: `curl https://api.deepseek.com/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \\
  -d '{
    "model": "deepseek-flash",
    "messages": [{"role": "user", "content": "Reply with one word: ready"}],
    "reasoning_effort": 50
  }'`,
      paragraphs: [
        "The response puts the final answer in `content` and any thinking trace in `reasoning_content`. Reasoning tokens are billed as output tokens, so a high effort level changes both latency and cost, not just answer quality[4][5].",
        "Export your key once so it stays out of shell history: `export DEEPSEEK_API_KEY=...`. The endpoint is JSON over HTTPS and needs no extra path beyond `/chat/completions`. If you prefer an SDK, the request body is identical — only the transport changes.",
      ],
      note: "If the call returns an authentication error, confirm the key has not been revoked and that your account has a positive balance. DeepSeek deducts from the granted balance first, then the topped-up balance[3].",
    },
    {
      num: "03",
      title: "Your First Call with Python",
      description:
        "Any OpenAI-compatible SDK works. Install the `openai` package, override `base_url`, and pass `deepseek-flash` as the model. No custom client or translation layer is required[3].",
      code: `from openai import OpenAI

client = OpenAI(
    api_key="<DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-flash",
    messages=[{"role": "user", "content": "Summarize a repo layout in three bullets."}],
    reasoning_effort=50,
)

print(response.choices[0].message.content)`,
      paragraphs: [
        "The same pattern works in Node.js with the `openai` package: set the base URL, pass the key, and use the same model string. Streaming, JSON output, and tool calls are supported exactly as they were on V4 Flash, so no wrapper is needed[3].",
        "For programmatic control, read `reasoning_content` when it is present and keep it in your conversation state. In multi-turn tool-calling flows, the previous assistant turn's reasoning content usually has to be echoed back in the next request, or the API can reject the call with a 400[3].",
      ],
      note: "If cost matters, track the cache-hit ratio in your logs. Cached input costs a small fraction of uncached input off-peak. The [[v4-1-flash-kv-cache|KV cache guide]] explains the mechanics.",
    },
    {
      num: "04",
      title: "Thinking Mode and Continuous Reasoning Effort",
      description:
        "V4.1 Flash ships with thinking enabled and replaces the old three-level effort switch with a continuous integer from 1 to 100. Pass `reasoning_effort` as a number to dial reasoning depth up or down[1][4].",
      paragraphs: [
        "The default configuration is thinking on at effort 50. The labels low/high/max still exist, but they now map onto integers, and the mapping differs between the vLLM serving presets and the official API presets. Treat the label as convenience, not contract. The full breakdown lives in [[v4-1-flash-reasoning-effort|the reasoning effort guide]].",
      ],
      list: [
        "reasoning_effort: 1 (shallowest, fastest) to 100 (deepest, slowest)",
        "vLLM presets: low=25, high=50, xhigh=75, max=100",
        "Official API presets: low=50, high=75, max=100",
        "Default: thinking on, effort 50",
        "Going from effort 25 to 100 raises output tokens roughly 2.5x[5]",
      ],
      code: `response = client.chat.completions.create(
    model="deepseek-flash",
    messages=[{"role": "user", "content": "Solve this algorithm problem."}],
    reasoning_effort=75,
    extra_body={"thinking": {"type": "enabled"}},
)`,
      note: "FIM and chat prefix completion are available only in non-thinking mode. If a tool of yours depends on them, disable thinking explicitly for that call[1][6].",
    },
    {
      num: "05",
      title: "Responses API and the Anthropic Endpoint",
      description:
        "Beyond chat completions, DeepSeek supports the native OpenAI Responses API and an Anthropic-compatible messages API. Both matter for agent frameworks that expect a specific wire format rather than a generic chat body[1][6].",
      paragraphs: [
        "The Responses API lets tools such as Codex talk to the model without a translation proxy. Point the client at the same base URL and call `responses.create` with model `deepseek-flash`. Streaming arrives as server-sent events that end with `response.completed` rather than a `data: [DONE]` marker, so client code that waits for the classic sentinel needs adjusting[6].",
        "The Anthropic endpoint is what Claude Code uses. Set `ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic`, set `ANTHROPIC_MODEL=deepseek-flash[1m]`, and point the default model variables at the same id. Subagents and the haiku slot use plain `deepseek-flash`, while `CLAUDE_CODE_EFFORT_LEVEL=max` enables maximum effort[6].",
      ],
      list: [
        "OpenAI Responses API: supported natively at the same base URL",
        "Anthropic messages API: https://api.deepseek.com/anthropic",
        "Also supported: JSON Output, Tool Calls, Chat Prefix Completion",
        "FIM: non-thinking mode only[1][6]",
      ],
      note: "This is the same shape the V4 Pro line used, so existing [[v4-pro|V4 Pro]] configurations migrate by swapping the model string. OpenCode connects through `/connect` and requires version 1.14.24 or newer[6].",
    },
    {
      num: "06",
      title: "Migrating from deepseek-v4-flash",
      description:
        "If you are moving from the old Flash line, the migration is mostly a model-string swap — but two behaviors deserve a regression test before you trust it in production[1][5].",
      list: [
        "Replace model `deepseek-v4-flash` with `deepseek-flash`",
        "Replace `deepseek-v4-flash-vision-exp` with `deepseek-flash`; native vision now lives on the main model",
        "Retune reasoning effort: the old low/high/max are gone, replaced by integers 1-100",
        "Re-run evals: the serving model changed even where the id did not",
        "Re-check prompts that depended on the old output style or formatting",
      ],
      paragraphs: [
        "The trickiest part is that DeepSeek routes retired ids silently. A request to `deepseek-v4-flash` still succeeds, but it is answered by V4.1 Flash. If you pin an id and assume the old behavior, your regression tests are exercising a model you are no longer calling — a failure mode the community has flagged around pinned production identifiers[5].",
        "On the plus side, the same change adds capabilities. V4.1 Flash is natively multimodal, so a text-only integration quietly gains image understanding, and the concurrency ceiling is 2,500. Official partners WorkBuddy (including CodeBuddy) and OpenCode support the model on day one[6].",
      ],
      note: "Keep a one-line log of the model id you send and the id that responds. That single log entry is what turns a silent reroute into a visible event. See [[deepseek-flash-model-names|the alias table]] for every retired id.",
    },
    {
      num: "07",
      title: "Concurrency, Rate Limits and a Production Checklist",
      description:
        "V4.1 Flash allows 2,500 concurrent requests, five times the old V4-Pro ceiling of 500. That headroom suits parallel agent fleets, but it does not remove the need for retries, caching, and cost control[3][5].",
      list: [
        "Concurrency: 2,500 for deepseek-flash",
        "Use exponential backoff on 429 responses",
        "Track cache-hit ratio: cached input costs roughly 2% of uncached off-peak",
        "Schedule batch and eval jobs off-peak to halve the bill",
        "Log the model id actually used, not only the one requested",
        "Pin effort levels per workload instead of one global default",
      ],
      paragraphs: [
        "A practical launch-day checklist: verify your balance, smoke-test both the OpenAI and Anthropic endpoints, confirm the `reasoning_effort` value your SDK actually sends, and watch cost per completed task rather than cost per token. Token totals alone hide retries and reasoning spend[5].",
        "Because the endpoint accepts both formats and both old and new ids, the surface area for silent misconfiguration is larger than it looks. A single integration test that asserts the resolved model and the effort integer will catch most surprises before your users do[1][5].",
      ],
      note: "Concurrency is enforced per account. Combine the 2,500 limit with off-peak scheduling and prompt-prefix caching to keep a high-volume fleet predictable. See [[v4-1-flash-pricing|pricing]] for rates and [[deepseek-v4-1-flash|the model overview]] for the broader picture.",
    },
  ],
  relatedGuides: [
    { title: "DeepSeek V4.1 Flash Reasoning Effort: 1-100", slug: "v4-1-flash-reasoning-effort" },
    { title: "DeepSeek Model Names & Retired IDs (2026)", slug: "deepseek-flash-model-names" },
    { title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates", slug: "v4-1-flash-pricing" },
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
    { title: "DeepSeek V4 Pro Retired: Why It Routes to V4.1 Flash", slug: "deepseek-v4-pro-retired" },
  ],
  sources: [
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "VentureBeat: V4.1-Flash Debuts at $0.003/1M Off-Peak", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
    { label: "DeepSeek Docs: Integrate with AI Tools", url: "https://api-docs.deepseek.com/guides/coding_agents/" },
    { label: "vLLM Recipes: DeepSeek-V4.1-Flash", url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash" },
  ],
};

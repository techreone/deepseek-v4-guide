import type { GuideContent } from "./types";

// target keyword: deepseek v4 flash api
export const flashApiSetup: GuideContent = {
  slug: "flash-api-setup",
  category: "BEGINNER API GUIDE",
  title: "DeepSeek V4 Flash API Setup: Base URL, Models & Your First Call",
  readTime: "8 MIN READ",
  updatedAt: "AUG 1, 2026",
  summary:
    "DeepSeek V4 Flash API setup in minutes: create your API key, set the base URL, and make your first call with curl, Python, or Node.js.",
  toc: [
    { id: "step-1", label: "Step 1: Create Your API Key" },
    { id: "step-2", label: "Step 2: Set the Correct Base URL" },
    { id: "step-3", label: "Step 3: Pick the Model: deepseek-v4-flash" },
    { id: "step-4", label: "Step 4: Make Your First Call with cURL" },
    { id: "step-5", label: "Step 5: First Call in Python & Node.js" },
    { id: "step-6", label: "Step 6: Control Thinking with reasoning_effort" },
    { id: "step-7", label: "Step 7: Use the Responses API (Flash Only)" },
    { id: "step-8", label: "Step 8: Handle Errors, Rate Limits & Context Caching" },
  ],
  steps: [
    {
      num: "01",
      title: "Create Your API Key",
      description:
        "Everything starts with a DeepSeek API key. Open platform.deepseek.com/api_keys, sign in, and create a new secret key. Copy it immediately — the platform shows it only once.[8]",
      paragraphs: [
        "The official DeepSeek API docs open their quickstart with the same instruction: create an API key first.[1] It is the single prerequisite for every request in this guide, and it is the only credential you pass in the Authorization header.",
      ],
      list: [
        "Go to platform.deepseek.com/api_keys, the official key creation page.",
        "Create a new secret key and copy it right away. It is displayed only once.",
        "Store it in an environment variable named DEEPSEEK_API_KEY.",
        "Never commit the key to git. Keep it out of your repository entirely.",
      ],
      note: "Keys follow the sk- prefix. If you lose one, you cannot recover it — create a new key and rotate the old one.",
    },
    {
      num: "02",
      title: "Set the Correct Base URL",
      description:
        "The DeepSeek V4 Flash API is 100% OpenAI-compatible, and it also speaks the Anthropic format. The OpenAI-compatible base URL is https://api.deepseek.com. The Anthropic-compatible endpoint is https://api.deepseek.com/anthropic.",
      paragraphs: [
        "The official changelog is explicit: keep the base URL unchanged and only update the model.[2] DeepSeek does not version its endpoint per release, so nothing changes here when the model gets upgraded — including the July 31, 2026 public-beta release.",
        "Clients that already target OpenAI or Anthropic keep their existing SDKs. You change only the endpoint and the model name.",
      ],
      table: {
        headers: ["API Format", "Base URL"],
        rows: [
          ["OpenAI-compatible", "https://api.deepseek.com"],
          ["Anthropic-compatible", "https://api.deepseek.com/anthropic"],
        ],
      },
      code: `// OpenAI-compatible client (Python)
client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com")

// Anthropic-compatible client (env config)
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic`,
      note: "Both endpoints serve the same model. Pick the format that matches the SDK or agent you already use.",
    },
    {
      num: "03",
      title: "Pick the Model: deepseek-v4-flash",
      description:
        "Set the model parameter to deepseek-v4-flash. This slug now points to DeepSeek-V4-Flash-0731, the official public-beta release from July 31, 2026.",
      paragraphs: [
        "The legacy names deepseek-chat and deepseek-reasoner were retired on July 24, 2026. Any code still sending them now gets an error. New integrations should use deepseek-v4-flash, or [[v4-pro|deepseek-v4-pro]] for the flagship model.",
        "deepseek-v4-flash is a [[flash-model-size|284B-parameter Mixture-of-Experts model]] with 13B active parameters, a 1M-token context window, and a 384K-token max output.[3]",
      ],
      table: {
        headers: ["Spec", "Value"],
        rows: [
          ["Model name", "deepseek-v4-flash"],
          ["Current version", "DeepSeek-V4-Flash-0731"],
          ["Parameters", "284B total / 13B active (MoE)"],
          ["Context window", "1M tokens (1,048,576)"],
          ["Max output", "384K tokens"],
          ["Input price (cache miss)", "$0.14 / 1M tokens"],
          ["Input price (cache hit)", "$0.0028 / 1M tokens"],
          ["Output price", "$0.28 / 1M tokens"],
          ["Concurrency limit", "2,500 concurrent requests (account-level)"],
        ],
      },
      list: [
        "JSON Output: yes",
        "Tool Calls: yes",
        "Responses API: yes (Flash only — Pro expected early August 2026)",
        "Anthropic API: yes",
        "FIM completion: yes (non-thinking mode only)",
      ],
      note: "If you are migrating, the change is one line: replace deepseek-chat or deepseek-reasoner with deepseek-v4-flash. The base URL and API key stay the same.",
    },
    {
      num: "04",
      title: "Make Your First Call with cURL",
      description:
        "A single curl request is the fastest way to prove your key works. This call hits the Chat Completions endpoint with the thinking parameters from DeepSeek's official quickstart.",
      code: `curl https://api.deepseek.com/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer \${DEEPSEEK_API_KEY}" \\
  -d '{
        "model": "deepseek-v4-flash",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "thinking": {"type": "enabled"},
        "reasoning_effort": "high",
        "stream": false
      }'`,
      paragraphs: [
        "A successful response returns the assistant text under choices[0].message.content. The thinking and reasoning_effort fields are optional — thinking is on by default — but sending them explicitly makes your intent clear.",
        "If the call fails, read the HTTP status code and match it against the error table in Step 8.[4]",
      ],
      note: "Export DEEPSEEK_API_KEY in your shell first, and let it expand in the header. Do not paste the raw key into the command.",
    },
    {
      num: "05",
      title: "First Call in Python & Node.js",
      description:
        "Because the DeepSeek V4 Flash API is OpenAI-compatible, the standard openai SDK works with a one-line change: set base_url to https://api.deepseek.com and send model deepseek-v4-flash.",
      code: `# pip3 install openai
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get('DEEPSEEK_API_KEY'),
    base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"},
    ],
    stream=False,
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}})
print(response.choices[0].message.content)

// --- Node.js (OpenAI SDK) ---
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-v4-flash",
    thinking: {"type": "enabled"},
    reasoning_effort: "high",
    stream: false,
  });
  console.log(completion.choices[0].message.content);
}
main();`,
      note: "In the Python SDK, the thinking flag goes inside extra_body because the official SDK does not type it as a first-class parameter. The Node.js SDK accepts thinking directly.",
    },
    {
      num: "06",
      title: "Control Thinking with reasoning_effort",
      description:
        "Thinking mode is on by default. Two parameters control it: thinking toggles it, and reasoning_effort sets how much reasoning the model spends before answering.[6]",
      paragraphs: [
        "reasoning_effort supports three levels: low, high, and max. The default is high. For compatibility, low and medium map to high, and xhigh maps to max. Complex agent requests — like Claude Code or [[flash-opencode|OpenCode]] — are automatically set to max.",
        "When thinking is enabled, chain-of-thought reasoning comes back in the reasoning_content field. In multi-turn tool calls, you must return the assistant's reasoning_content together with the message, or the reasoning chain breaks.",
      ],
      table: {
        headers: ["Requested value", "Effective level"],
        rows: [
          ["low / medium", "high"],
          ["high", "high"],
          ["max", "max"],
          ["xhigh", "max"],
        ],
      },
      list: [
        "thinking: {\"type\": \"enabled\"} turns reasoning on; non-thinking mode turns it off.",
        "Default reasoning_effort is high.",
        "Reasoning output arrives in reasoning_content, matching the OpenAI o-series response shape.",
      ],
      note: "Turn thinking off when you need the fastest possible response for simple tasks, and use max for hard coding and agent workloads.",
    },
    {
      num: "07",
      title: "Use the Responses API (Flash Only)",
      description:
        "DeepSeek V4 Flash is the first DeepSeek model with native Responses API support — the same interface OpenAI's o-series uses.[7] Today only flash supports it; [[v4-pro|V4 Pro]] support is expected in early August 2026.",
      code: `from openai import OpenAI
client = OpenAI(api_key="<your DeepSeek API Key>", base_url="https://api.deepseek.com")

response = client.responses.create(
    model="deepseek-v4-flash",
    instructions="You are a helpful assistant.",
    input="Hi, how are you?",
)
print(response.output_text)`,
      paragraphs: [
        "Streaming responses return semantic SSE events. Each event carries an event field and an increasing sequence_number, and the stream ends with response.completed, response.incomplete, or response.failed — there is no data: [DONE] message.",
        "Unsupported parameters are silently ignored, so existing Responses API clients connect without code changes.",
      ],
      list: [
        "Tools: function, plus server-side web_search and web_search_2025_08_26.",
        "custom tools are limited to {\"type\": \"custom\", \"name\": \"apply_patch\"} for Codex compatibility.",
        "Usage is reported in usage.input_tokens and usage.output_tokens, including cached and reasoning token breakdowns.",
      ],
      note: "The base URL stays https://api.deepseek.com for the Responses API. Only the model and the endpoint differ from Chat Completions.",
    },
    {
      num: "08",
      title: "Handle Errors, Rate Limits & Context Caching",
      description:
        "DeepSeek documents seven HTTP error codes. Four mean fix your request and retry; three mean slow down and retry later.",
      table: {
        headers: ["Code", "Meaning", "What to do"],
        rows: [
          ["400", "Invalid Format", "Fix the request body per the error message"],
          ["401", "Authentication Fails", "Check or recreate your API key"],
          ["402", "Insufficient Balance", "Top up on the billing page"],
          ["422", "Invalid Parameters", "Fix the parameters per the error message"],
          ["429", "Rate Limit Reached", "Slow your request pacing; consider a temporary switch"],
          ["500", "Server Error", "Retry later; contact support if it persists"],
          ["503", "Server Overloaded", "Retry later"],
        ],
      },
      paragraphs: [
        "Rate limits are measured by concurrency, not by requests per minute. Each account gets 2,500 concurrent requests for deepseek-v4-flash (500 for deepseek-v4-pro), and all API keys on the account share that pool. Exceeding it returns HTTP 429.[5]",
        "Context caching is automatic and needs no configuration. Repeated prompt prefixes hit a server-side cache and are billed at the cache-hit price: $0.0028 per 1M tokens instead of $0.14 — roughly a 98% discount. Watch usage.prompt_cache_hit_tokens and usage.prompt_cache_miss_tokens in responses.",
      ],
      note: "Caching is best-effort, so hit rates are not guaranteed. Keep stable system prompts and shared prefixes in front of your requests to maximize cache hits. If requests are slow or you hit 500/503, check the official API status page first — https://status.deepseek.com",
    },
  ],
  prevGuide: {
    title: "What Is DeepSeek V4 Flash? Full Guide to the 0731 Release",
    slug: "deepseek-v4-flash",
  },
  nextGuide: {
    title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%",
    slug: "flash-pricing",
  },
  relatedGuides: [
    { title: "DeepSeek V4 Flash Pricing: Token Costs & How to Save Up to 98%", slug: "flash-pricing" },
    { title: "DeepSeek V4 Flash in Cursor, Claude Code & Codex: Setup Guide", slug: "flash-ide" },
    { title: "DeepSeek V4 Flash on OpenRouter: Setup, Pricing & BYOK", slug: "flash-openrouter" },
    { title: "Use DeepSeek V4 Flash with OpenCode: Step-by-Step", slug: "flash-opencode" },
  ],
  sources: [
    { label: "Official DeepSeek API — Your First API Call", url: "https://api-docs.deepseek.com/" },
    { label: "Official DeepSeek API Changelog (0731 release)", url: "https://api-docs.deepseek.com/updates/" },
    { label: "Official Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Official Error Codes", url: "https://api-docs.deepseek.com/quick_start/error_codes/" },
    { label: "Official Rate Limit & Isolation", url: "https://api-docs.deepseek.com/quick_start/rate_limit/" },
    { label: "Official Thinking Mode Guide", url: "https://api-docs.deepseek.com/guides/thinking_mode/" },
    { label: "Official Responses API Guide", url: "https://api-docs.deepseek.com/guides/responses_api/" },
    { label: "DeepSeek Platform — API Keys", url: "https://platform.deepseek.com/api_keys" },
  ],
};

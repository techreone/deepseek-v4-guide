import type { GuideContent } from "./types";

// target keyword: deepseek v4.1 flash reasoning effort
// 内容来源：reference/topics/27-v4-1-flash.md（official news / vLLM recipe / VentureBeat / HF 模型卡）
export const v41FlashReasoningEffort: GuideContent = {
  slug: "v4-1-flash-reasoning-effort",
  category: "TECHNICAL",
  title: "DeepSeek V4.1 Flash Reasoning Effort: The 1-100 Dial Explained",
  seoTitle: "DeepSeek V4.1 Flash Reasoning Effort: 1-100",
  readTime: "9 MIN READ",
  updatedAt: "SEP 11, 2026",
  summary:
    "V4.1 Flash turns reasoning effort into a continuous 1-100 integer. Presets, default effort 50, the 2.5x token cost from 25 to 100, and how to choose.",
  toc: [
    { id: "step-1", label: "Step 1: Reasoning Effort Is Now Continuous (1-100)" },
    { id: "step-2", label: "Step 2: Presets — vLLM vs the Official API" },
    { id: "step-3", label: "Step 3: The Default — Thinking On at Effort 50" },
    { id: "step-4", label: "Step 4: The 25-to-100 Trade-off: 2.5x Tokens" },
    { id: "step-5", label: "Step 5: How to Pick a Level" },
    { id: "step-6", label: "Step 6: Code — Setting Effort in Chat and Responses API" },
    { id: "step-7", label: "Step 7: Effort, Caching and Cost" },
  ],
  steps: [
    {
      num: "01",
      title: "Reasoning Effort Is Now Continuous (1-100)",
      description:
        "V4.1 Flash replaces the old low/high/max reasoning switch with a continuous integer from 1 to 100. You set it with the `reasoning_effort` field, and the value directly controls how much reasoning the model does before it answers[1][3].",
      paragraphs: [
        "The old V4 Pro and V4 Flash exposed three named levels. V4.1 Flash generalizes that into a dial. Named presets still exist for convenience, but underneath they are just integers on the same scale, and the integer is what the model actually reads[1][5].",
        "Thinking is on by default. If you send no effort field at all, the model reasons at its default level rather than skipping the trace. To reason less, lower the number. There is a separate non-thinking mode used for FIM and chat prefix completion, but lower effort is the normal way to reduce reasoning on a thinking call[1].",
      ],
      list: [
        "Field: reasoning_effort",
        "Range: continuous integer 1 to 100",
        "Thinking: enabled by default",
        "Non-thinking mode: required for FIM and chat prefix completion[1][3]",
      ],
      note: "Because effort is a number rather than a label, configuration files that once stored \"high\" must be updated to an integer. See [[v4-1-flash-api-setup|the API setup guide]] for the request examples.",
    },
    {
      num: "02",
      title: "Presets — vLLM vs the Official API",
      description:
        "The two main sources that document presets disagree on the mapping, and the disagreement matters. The vLLM recipe lists low=25, high=50, xhigh=75, max=100. The official API, as reported by VentureBeat, lists low=50, high=75, max=100[5].",
      table: {
        headers: ["Label", "vLLM preset", "Official API preset"],
        rows: [
          ["low", "25", "50"],
          ["high", "50", "75"],
          ["xhigh", "75", "(not listed)"],
          ["max", "100", "100"],
        ],
      },
      paragraphs: [
        "There is no contradiction in the model itself — only in which integer each label points to. The safest engineering practice is to send the integer you actually want and not rely on a label whose meaning may differ between a local vLLM server and the hosted API[5][6].",
        "This matters most for teams that run the same configuration in both places: a local eval harness on vLLM and a production deployment on the hosted endpoint. If \"high\" means 50 in one and 75 in the other, latency and cost will silently diverge even though the config file looks identical[5].",
      ],
      note: "Normalize your configuration to integers. Store the number, not the word, and translate labels at the edge if a UI needs them. Report the actual integer in logs so cost attribution stays honest[5][6].",
    },
    {
      num: "03",
      title: "The Default — Thinking On at Effort 50",
      description:
        "When you set neither the thinking flag nor the effort value, V4.1 Flash runs thinking on at effort 50. That is a middle setting: it reasons, but not at maximum depth[5].",
      paragraphs: [
        "Effort 50 is a reasonable default for chat and general agent work. It is not the setting DeepSeek used for the headline benchmark table, which was run at max effort 100. The distinction explains why a model that looks dominant on a leaderboard can feel ordinary under default settings[2][5].",
        "For simple classification, extraction, or formatting tasks, effort 50 can still be more reasoning than needed. Lowering it reduces both latency and output tokens without hurting accuracy on tasks that do not require a chain of thought. That is free money for high-volume, low-difficulty traffic[5].",
      ],
      note: "If your evaluations ran against the old V4 Flash defaults, they are not directly comparable. Re-baseline on V4.1 Flash at effort 50 before drawing conclusions from a leaderboard number[2][5].",
    },
    {
      num: "04",
      title: "The 25-to-100 Trade-off: 2.5x Tokens",
      description:
        "DeepSeek's own tests quantify the trade. Going from effort 25 to effort 100 raises DeepSWE v1.1 from 66.0 to 74.2 and Terminal-Bench 2.1 from 82.4 to 90.6, but consumes roughly 2.5x the output tokens[5].",
      table: {
        headers: ["Effort", "DeepSWE v1.1", "Terminal-Bench 2.1", "Relative output tokens"],
        rows: [
          ["25", "66.0", "82.4", "~1.0x"],
          ["100", "74.2", "90.6", "~2.5x"],
        ],
      },
      paragraphs: [
        "The gains are real but front-loaded. DeepSeek says effort levels between 60 and 80 recover most of the accuracy at less than half the token budget. The final climb to 100 makes agent trajectories 1.6-1.8x longer for comparatively small marginal returns[5].",
        "This is the classic reasoning-length curve: the first increments of thinking buy the most accuracy, and the tail buys little for a lot. The economical operating point is almost never the maximum, unless the task is one where being wrong is far more expensive than the extra tokens[5].",
      ],
      list: [
        "25 to 100 raises DeepSWE from 66.0 to 74.2",
        "25 to 100 raises Terminal-Bench 2.1 from 82.4 to 90.6",
        "Output tokens: roughly 2.5x across that range",
        "60-80 recovers most accuracy at under half the token spend",
        "The last step to 100 lengthens trajectories 1.6-1.8x[5]",
      ],
      note: "Output tokens include the reasoning trace, and they bill at output rates. A 2.5x token increase is a 2.5x increase on the most expensive line of the invoice[5].",
    },
    {
      num: "05",
      title: "How to Pick a Level",
      description:
        "Choice of effort is a product decision as much as a technical one. Match the level to the cost of being wrong, not to the model's maximum capability[5].",
      list: [
        "Effort 1-25: classification, extraction, formatting, short chat replies",
        "Effort 25-50: routine code edits, summarization, standard RAG answers",
        "Effort 50-80: multi-step agents, debugging, tasks where a wrong answer is expensive",
        "Effort 80-100: hardest math, competition coding, security analysis, one-shot high-stakes tasks",
        "Default 50: a safe starting point when you have no benchmark data",
      ],
      paragraphs: [
        "A practical method: run your own eval sweep at 25, 50, 75, and 100, plot accuracy against output tokens, and pick the point where the curve flattens. Because the optimal point is workload-specific, a generic recommendation is worth less than your own measurements[5].",
        "It also helps to separate task classes. Most products contain several: a cheap autocomplete path, a medium analysis path, and a rare hard path. Assigning a single global effort wastes budget on the easy path and underserves the hard one[5].",
      ],
      note: "Pin effort per task class in configuration, and log which class handled each request. When the serving model changes, a per-class setting tells you exactly what to re-evaluate[5].",
    },
    {
      num: "06",
      title: "Code — Setting Effort in Chat and Responses API",
      description:
        "Effort is passed as an integer in the request body. The same value works for chat completions and the Responses API, so a single helper can serve both call styles[1][6].",
      code: `from openai import OpenAI

client = OpenAI(
    api_key="<DeepSeek API Key>",
    base_url="https://api.deepseek.com",
)

# Chat Completions
response = client.chat.completions.create(
    model="deepseek-flash",
    messages=[{"role": "user", "content": "Refactor this function."}],
    reasoning_effort=75,          # integer 1-100, not "high"
    extra_body={"thinking": {"type": "enabled"}},
)

# Responses API: same model id and the same 1-100 effort value.
# Confirm the exact effort field name against the official
# Responses API guide before shipping.

print(response.choices[0].message.content)`,
      paragraphs: [
        "In thinking mode, sampling parameters such as temperature and top_p are not the primary control — the effort value is. If you enable tools and multi-turn conversation, remember to echo the previous assistant `reasoning_content` back in the next request, or the call can fail with a 400[3].",
        "Keep the effort value in one constant shared by your chat path and your Responses path. Duplicating the number in two places is the easiest way to end up with an eval that measures a different setting than production runs[1][6].",
      ],
      note: "The exact request field for the Responses API can differ from the chat body. Confirm the schema against the current docs before shipping, and assert the value in an integration test[6].",
    },
    {
      num: "07",
      title: "Effort, Caching and Cost",
      description:
        "Reasoning tokens bill at output rates, so effort compounds directly into cost. A max-effort agent run can spend several times the tokens of its default-effort twin for the same task[5].",
      paragraphs: [
        "The interaction with caching is subtle. Effort does not change cached input cost — cached tokens still bill at the cheap cache-hit rate — but it increases the output side, which is the expensive side. That is why the cache-hit price and the effort setting should be tuned together rather than separately[5].",
        "A good operating policy: set a conservative global default, raise effort only for task classes that justify it, and re-measure whenever the underlying model changes. Because DeepSeek reroutes retired ids to new checkpoints, an effort setting you tuned months ago may now sit on a different model[5][1].",
      ],
      list: [
        "Reasoning tokens count as output tokens",
        "Cache hits stay cheap regardless of effort",
        "Higher effort raises the expensive output line, not the cheap cache line",
        "Re-measure effort after any model or checkpoint change[5]",
      ],
      note: "See [[v4-1-flash-pricing|the pricing guide]] for rates and [[v4-1-flash-kv-cache|the KV cache guide]] for the cache mechanics. For request syntax, start with [[v4-1-flash-api-setup|the API setup guide]].",
    },
  ],
  relatedGuides: [
    { title: "DeepSeek V4.1 Flash API Setup: deepseek-flash & Migration", slug: "v4-1-flash-api-setup" },
    { title: "DeepSeek V4.1 Flash Pricing: $0.003 Cache Hits & Peak Rates", slug: "v4-1-flash-pricing" },
    { title: "DeepSeek V4.1 Flash KV Cache: 890 Bytes per Token", slug: "v4-1-flash-kv-cache" },
    { title: "What Is DeepSeek V4.1 Flash? The 552B MoE, Explained", slug: "deepseek-v4-1-flash" },
  ],
  sources: [
    { label: "DeepSeek API Changelog (Sept 10, 2026)", url: "https://api-docs.deepseek.com/updates" },
    { label: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient (Official)", url: "https://api-docs.deepseek.com/news/news260910/" },
    { label: "Hugging Face: DeepSeek-V4.1-Flash Model Card", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "VentureBeat: V4.1-Flash Reasoning Effort and Cost", url: "https://venturebeat.com/technology/deepseek-v4-1-flash-debuts-with-0-003-1m-off-peak-cached-input-rate-and-benchmarks-eclipsing-gpt-5-6-sol-claude-opus-5" },
    { label: "vLLM Recipes: DeepSeek-V4.1-Flash", url: "https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4.1-Flash" },
    { label: "DeepSeek Docs: Integrate with AI Tools", url: "https://api-docs.deepseek.com/guides/coding_agents/" },
  ],
};

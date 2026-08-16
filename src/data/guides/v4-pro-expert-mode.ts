import type { GuideContent } from "./types";

// target keyword: deepseek v4 pro expert mode
export const v4ProExpertMode: GuideContent = {
  slug: "v4-pro-expert-mode",
  category: "GUIDE",
  title: "DeepSeek V4 Pro Expert Mode: What It Is & How to Use It",
  seoTitle: "DeepSeek V4 Pro Expert Mode: Guide",
  readTime: "4 MIN READ",
  updatedAt: "AUG 16, 2026",
  summary:
    "DeepSeek V4 Pro is available in the app and web through Expert Mode — what it does, how to enable it on desktop and mobile, and how it differs from the API.",
  toc: [
    { id: "step-1", label: "Step 1: What Expert Mode Is" },
    { id: "step-2", label: "Step 2: How to Enable It" },
    { id: "step-3", label: "Step 3: What You Get" },
    { id: "step-4", label: "Step 4: Expert Mode vs the API" },
  ],
  steps: [
    {
      num: "01",
      title: "What Expert Mode Is",
      description:
        "Expert Mode is how DeepSeek exposes V4 Pro in its consumer apps. The August 13 GA release notes state: 'V4 Pro is now available on app/web. Try it via Expert Mode'[1]. It is the app-side switch that runs conversations on the flagship 1.6T model instead of the lighter default.",
      paragraphs: [
        "Before GA, the app defaulted to Flash-class speed for everyday chat. Expert Mode gives consumer users the full V4 Pro experience — deeper reasoning, longer answers, and the same model the API calls deepseek-v4-pro[1][2].",
      ],
      note: "Announcement from DeepSeek's official GA release notes[1].",
    },
    {
      num: "02",
      title: "How to Enable It",
      description:
        "On the desktop app or web chat, open the model menu and select V4 Pro — selecting it runs Expert Mode[1][3]. The exact control is labeled 'Expert Mode' or shows the V4 Pro model directly in the model picker, depending on client version.",
      list: [
        "Desktop: model dropdown → V4 Pro (Expert Mode)[3].",
        "Web (chat.deepseek.com): same model picker path[1].",
        "Mobile app: model menu → V4 Pro where available.",
        "If you don't see it, update the app — GA exposure rolled with the 0813 release[1].",
      ],
      note: "UI paths per GA notes and media coverage of the rollout[1][3].",
    },
    {
      num: "03",
      title: "What You Get",
      description:
        "Expert Mode conversations run the 0813 GA checkpoint with thinking enabled and high reasoning effort by default[1][2]. That means chain-of-thought visible in the UI, tool-like coding responses, and the model's strongest math and long-context behavior.",
      table: {
        headers: ["Aspect", "Expert Mode (V4 Pro)", "Default (Flash-class)"],
        rows: [
          ["Model", "deepseek-v4-pro (0813)[1]", "deepseek-v4-flash (0731)"],
          ["Reasoning", "Deep, multi-step[2]", "Lighter, faster"],
          ["Coding", "96.40% SWE-bench Verified[4]", "88.80%[4]"],
          ["Context", "1M tokens", "1M tokens"],
        ],
      },
      paragraphs: [
        "Expect longer generation times in Expert Mode — that is the depth cost. For quick Q&A keep the default; for hard problems, research-style questions, or long code tasks, switch to Expert Mode[2].",
        "In practice, Expert Mode shines on exactly the workloads V4 Pro benchmarks best on: multi-step math proofs, repository-level code refactors, and long-context synthesis over documents that approach the 1M-token window. Users also report the mode's tool-like coding responses (diff-style edits) in the chat UI, which the default Flash-class mode does not surface as aggressively[2][4].",
        "One thing to watch: Expert Mode answers are noticeably slower to first token than the default, and the app shows the full reasoning trace while it works. If you are copy-pasting large contexts, the mode respects the same 1M-token window, but very long inputs can push generation time into minutes[1][2].",
      ],
      note: "Model and reasoning behavior from DeepSeek docs; benchmark figures from independent eval[4].",
    },
    {
      num: "04",
      title: "Expert Mode vs the API",
      description:
        "Expert Mode is the same V4 Pro model behind the API, but the API adds what the app hides: reasoning_effort control (low/high/max), tool calling, Responses API, and per-token billing with peak/off-peak pricing[1][2][5].",
      code: `# API gives you the same model with more control:
client.responses.create(
    model="deepseek-v4-pro",
    reasoning_effort="max",     # app Expert Mode ≈ high
    thinking={"type": "enabled"},
    input="Explain the proof step by step.",
)`,
      list: [
        "App Expert Mode ≈ API call with reasoning_effort=high[1][2].",
        "API adds low/max levels, tools, streaming, and cost controls[2].",
        "After 8/16 16:00 UTC the API moved to peak/off-peak pricing — plan heavy API use for off-peak hours[5].",
      ],
      paragraphs: [
        "If your team runs both the app and the API, treat Expert Mode as a zero-config gateway to V4 Pro and the API as the tunable production path. The app is free for experimentation (subject to DeepSeek's consumer limits), while the API bills per token — so prototype in Expert Mode, then port the prompt to the API with explicit reasoning_effort and cache-friendly structure when you go to production[1][2][5].",
        "One more practical difference: the app's Expert Mode does not expose reasoning_effort or temperature controls — DeepSeek tunes those for you (effectively high). If you need low effort for speed or max for the hardest proofs, the API is the only place those knobs exist. Teams that hit the app's ceiling usually move the same prompt to the API with reasoning_effort=max and see the deep trace in reasoning_content, which the app already shows as its visible thinking stream[1][2].",
      ],
      note: "Pricing change per DeepSeek's official pricing page[5].",
    },
  ],
  prevGuide: undefined,
  nextGuide: undefined,
  relatedGuides: [
    { title: "What Is DeepSeek V4 Pro? Specs & Pricing", slug: "v4-pro" },
    { title: "DeepSeek V4 Pro API Setup Guide", slug: "v4-pro-api" },
    { title: "DeepSeek V4 Pro Reasoning Effort Guide", slug: "v4-pro-reasoning-effort" },
    { title: "DeepSeek V4 Pro Agent Capabilities", slug: "v4-pro-agent" },
    { title: "DeepSeek V4 Pro vs V4 Flash: Which Model?", slug: "v4-pro-vs-flash" },
  ],
  sources: [
    { label: "DeepSeek V4 Pro GA Release Notes", url: "https://api-docs.deepseek.com/news/news260813/" },
    { label: "DeepSeek Thinking Mode & Reasoning Effort", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
    { label: "Rohit AI: V4 Pro 0813 GA Benchmarks & Pricing", url: "https://rohitai.com/blog/deepseek-v4-pro-0813-ga-benchmarks-pricing" },
    { label: "Codersera: V4 Pro 0813 Guide & Benchmarks", url: "https://codersera.com/blog/deepseek-v4-pro-0813-guide-2026/" },
    { label: "DeepSeek Models & Pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" },
  ],
};

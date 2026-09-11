import type { GuideContent } from "./types";
import { deepseekV4Flash } from "./deepseek-v4-flash";
import { flashApiSetup } from "./flash-api-setup";
import { flashPricing } from "./flash-pricing";
import { flashBenchmarks } from "./flash-benchmarks";
import { flashOpencode } from "./flash-opencode";
import { flashIde } from "./flash-ide";
import { flashOpenrouter } from "./flash-openrouter";
import { flashModelSize } from "./flash-model-size";
import { flashHuggingface } from "./flash-huggingface";
import { v4Pro } from "./v4-pro";
import { opencodeGoPriceHike } from "./opencode-go-price-hike";
import { beginnerGuide } from "./beginner-guide";
import { opencodeGo } from "./opencode-go";
import { ccSwitchClaudeCode } from "./cc-switch-claude-code";
import { deepseekHarness } from "./deepseek-harness";
import { officialTechReport } from "./official-tech-report";
import { harnessAgentCapability } from "./harness-agent-capability";
import { reasonixDeepseek } from "./reasonix-deepseek";
import { hermesSetup } from "./hermes-setup";
import { v4VsGpt56Luna } from "./v4-vs-gpt56-luna";
import { whatIsDeepseekHarness } from "./what-is-deepseek-harness";
import { harnessReleaseDate } from "./harness-release-date";
import { harnessInstall } from "./harness-install";
import { harnessSetup } from "./harness-setup";
import { harnessGithub } from "./harness-github";
import { harnessCordis } from "./harness-cordis";
import { harnessSandbox } from "./harness-sandbox";
import { harnessModel } from "./harness-model";
import { harnessBenchmark } from "./harness-benchmark";
import { harnessCodeMode } from "./harness-code-mode";
import { harnessMinimalMode } from "./harness-minimal-mode";
import { harnessVsClaudeCode } from "./harness-vs-claude-code";
import { harnessVsOpencode } from "./harness-vs-opencode";
import { harnessPlugins } from "./harness-plugins";
import { harnessMcp } from "./harness-mcp";
import { harnessCursor } from "./harness-cursor";
import { harnessClaudeCode } from "./harness-claude-code";
import { harnessWebUi } from "./harness-web-ui";
import { harnessTerminal } from "./harness-terminal";
import { harnessTutorial } from "./harness-tutorial";
import { harnessQuickstart } from "./harness-quickstart";
import { harnessErrorFix } from "./harness-error-fix";
import { v4ProReleaseDate } from "./v4-pro-release-date";
import { v4ProPricing } from "./v4-pro-pricing";
import { v4ProApi } from "./v4-pro-api";
import { v4ProBenchmarks } from "./v4-pro-benchmarks";
import { v4Pro0813 } from "./v4-pro-0813";
import { v4ProReview } from "./v4-pro-review";
import { v4ProReasoningEffort } from "./v4-pro-reasoning-effort";
import { v4ProSurgePricing } from "./v4-pro-surge-pricing";
import { v4ProContextCaching } from "./v4-pro-context-caching";
import { v4ProModelSize } from "./v4-pro-model-size";
import { v4ProVsFlash } from "./v4-pro-vs-flash";
import { v4ProVsGpt55 } from "./v4-pro-vs-gpt-5.5";
import { v4ProOpenrouter } from "./v4-pro-openrouter";
import { v4ProCursor } from "./v4-pro-cursor";
import { v4ProClaudeCode } from "./v4-pro-claude-code";
import { v4ProOpencode } from "./v4-pro-opencode";
import { v4ProResponsesApi } from "./v4-pro-responses-api";
import { v4ProHarness } from "./v4-pro-harness";
import { v4ProAgent } from "./v4-pro-agent";
import { v4ProExpertMode } from "./v4-pro-expert-mode";
import { v4ProVsDeepseekR1 } from "./v4-pro-vs-deepseek-r1";
import { deepseekV41Flash } from "./deepseek-v4-1-flash";
import { v41FlashPricing } from "./v4-1-flash-pricing";
import { v41FlashBenchmarks } from "./v4-1-flash-benchmarks";
import { v41FlashApiSetup } from "./v4-1-flash-api-setup";
import { v41FlashVision } from "./v4-1-flash-vision";
import { v41FlashReasoningEffort } from "./v4-1-flash-reasoning-effort";
import { deepseekFlashModelNames } from "./deepseek-flash-model-names";
import { v41FlashVsV4Flash } from "./v4-1-flash-vs-v4-flash";
import { v41FlashVsOpus5 } from "./v4-1-flash-vs-opus-5";
import { v41FlashVsKimiK3 } from "./v4-1-flash-vs-kimi-k3";
import { deepseekV41Pro } from "./deepseek-v4-1-pro";
import { v41FlashLocalDeployment } from "./v4-1-flash-local-deployment";
import { v41FlashCodingAgents } from "./v4-1-flash-coding-agents";
import { v41FlashKvCache } from "./v4-1-flash-kv-cache";
import { deepseekV4ProRetired } from "./deepseek-v4-pro-retired";


// 中央指南注册表：新增教程 = 在 src/data/guides/ 新建文件并在下方登记
// 首页列表 / 指南页 / 内链全部以此为准，避免硬编码失同步
export const guidesDatabase: Record<string, GuideContent> = {
  [deepseekV41Flash.slug]: deepseekV41Flash,
  [v41FlashPricing.slug]: v41FlashPricing,
  [v41FlashBenchmarks.slug]: v41FlashBenchmarks,
  [v41FlashApiSetup.slug]: v41FlashApiSetup,
  [v41FlashVision.slug]: v41FlashVision,
  [v41FlashReasoningEffort.slug]: v41FlashReasoningEffort,
  [deepseekFlashModelNames.slug]: deepseekFlashModelNames,
  [v41FlashVsV4Flash.slug]: v41FlashVsV4Flash,
  [v41FlashVsOpus5.slug]: v41FlashVsOpus5,
  [v41FlashVsKimiK3.slug]: v41FlashVsKimiK3,
  [deepseekV41Pro.slug]: deepseekV41Pro,
  [v41FlashLocalDeployment.slug]: v41FlashLocalDeployment,
  [v41FlashCodingAgents.slug]: v41FlashCodingAgents,
  [v41FlashKvCache.slug]: v41FlashKvCache,
  [deepseekV4ProRetired.slug]: deepseekV4ProRetired,
  [deepseekV4Flash.slug]: deepseekV4Flash,
  [flashApiSetup.slug]: flashApiSetup,
  [flashPricing.slug]: flashPricing,
  [flashBenchmarks.slug]: flashBenchmarks,
  [flashOpencode.slug]: flashOpencode,
  [flashIde.slug]: flashIde,
  [flashOpenrouter.slug]: flashOpenrouter,
  [flashModelSize.slug]: flashModelSize,
  [flashHuggingface.slug]: flashHuggingface,
  [v4Pro.slug]: v4Pro,
  [beginnerGuide.slug]: beginnerGuide,
  [opencodeGo.slug]: opencodeGo,
  [opencodeGoPriceHike.slug]: opencodeGoPriceHike,
  [ccSwitchClaudeCode.slug]: ccSwitchClaudeCode,
  [deepseekHarness.slug]: deepseekHarness,
  [officialTechReport.slug]: officialTechReport,
  [harnessAgentCapability.slug]: harnessAgentCapability,
  [reasonixDeepseek.slug]: reasonixDeepseek,
  [hermesSetup.slug]: hermesSetup,
  [v4VsGpt56Luna.slug]: v4VsGpt56Luna,
  [whatIsDeepseekHarness.slug]: whatIsDeepseekHarness,
  [harnessReleaseDate.slug]: harnessReleaseDate,
  [harnessInstall.slug]: harnessInstall,
  [harnessSetup.slug]: harnessSetup,
  [harnessGithub.slug]: harnessGithub,
  [harnessCordis.slug]: harnessCordis,
  [harnessSandbox.slug]: harnessSandbox,
  [harnessModel.slug]: harnessModel,
  [harnessBenchmark.slug]: harnessBenchmark,
  [harnessCodeMode.slug]: harnessCodeMode,
  [harnessMinimalMode.slug]: harnessMinimalMode,
  [harnessVsClaudeCode.slug]: harnessVsClaudeCode,
  [harnessVsOpencode.slug]: harnessVsOpencode,
  [harnessPlugins.slug]: harnessPlugins,
  [harnessMcp.slug]: harnessMcp,
  [harnessCursor.slug]: harnessCursor,
  [harnessClaudeCode.slug]: harnessClaudeCode,
  [harnessWebUi.slug]: harnessWebUi,
  [harnessTerminal.slug]: harnessTerminal,
  [harnessTutorial.slug]: harnessTutorial,
  [harnessQuickstart.slug]: harnessQuickstart,
  [harnessErrorFix.slug]: harnessErrorFix,
  [v4ProReleaseDate.slug]: v4ProReleaseDate,
  [v4ProPricing.slug]: v4ProPricing,
  [v4ProApi.slug]: v4ProApi,
  [v4ProBenchmarks.slug]: v4ProBenchmarks,
  [v4Pro0813.slug]: v4Pro0813,
  [v4ProReview.slug]: v4ProReview,
  [v4ProReasoningEffort.slug]: v4ProReasoningEffort,
  [v4ProSurgePricing.slug]: v4ProSurgePricing,
  [v4ProContextCaching.slug]: v4ProContextCaching,
  [v4ProModelSize.slug]: v4ProModelSize,
  [v4ProVsFlash.slug]: v4ProVsFlash,
  [v4ProVsGpt55.slug]: v4ProVsGpt55,
  [v4ProOpenrouter.slug]: v4ProOpenrouter,
  [v4ProCursor.slug]: v4ProCursor,
  [v4ProClaudeCode.slug]: v4ProClaudeCode,
  [v4ProOpencode.slug]: v4ProOpencode,
  [v4ProResponsesApi.slug]: v4ProResponsesApi,
  [v4ProHarness.slug]: v4ProHarness,
  [v4ProAgent.slug]: v4ProAgent,
  [v4ProExpertMode.slug]: v4ProExpertMode,
  [v4ProVsDeepseekR1.slug]: v4ProVsDeepseekR1,

};

export function getAllGuides(): GuideContent[] {
  return Object.values(guidesDatabase);
}

export function getGuide(slug: string): GuideContent | undefined {
  return guidesDatabase[slug];
}

/** 首页卡片元数据：catId 对应 HeroHeader 分类筛选，tag 为短标签 */
export interface GuideCardMeta {
  slug: string;
  catId: string;
  tag: string;
  desc: string;
}

export const guideMeta: Record<string, GuideCardMeta> = {
  "deepseek-v4-1-flash": {
    slug: "deepseek-v4-1-flash",
    catId: "model",
    tag: "Model Guide",
    desc: "The Sept 10, 2026 release: a 552B MoE with native vision, 8B/16B asymmetric activation, a 1M context, and an 890-byte-per-token KV cache.",
  },
  "v4-1-flash-pricing": {
    slug: "v4-1-flash-pricing",
    catId: "pricing",
    tag: "Pricing",
    desc: "$0.003 per 1M cached input tokens off-peak, $0.15 uncached, $0.60 output. Peak/off-peak table, cache math, and how it compares to GPT and Claude.",
  },
  "v4-1-flash-benchmarks": {
    slug: "v4-1-flash-benchmarks",
    catId: "benchmarks",
    tag: "Benchmarks",
    desc: "Every official score: Terminal-Bench 2.1 90.6, DeepSWE 74.2, CyberGym 88.1, plus the multi-scaffold table and the effort-cost caveat.",
  },
  "v4-1-flash-api-setup": {
    slug: "v4-1-flash-api-setup",
    catId: "api",
    tag: "API Setup",
    desc: "Set model to deepseek-flash, keep your base URL, and migrate from old names. Includes a first curl call and reasoning-effort parameters.",
  },
  "v4-1-flash-vision": {
    slug: "v4-1-flash-vision",
    catId: "model",
    tag: "Vision",
    desc: "Native image understanding via a 32-layer DeepSeek-ViT: MMMU-Pro 56.5, DocVQA 95.6, and visual-agent scores, replacing V4-Flash-Vision-Exp.",
  },
  "v4-1-flash-reasoning-effort": {
    slug: "v4-1-flash-reasoning-effort",
    catId: "deepdive",
    tag: "Reasoning",
    desc: "A continuous 1-100 effort scale, not just low/high/max. How the setting trades 2.5x output tokens for accuracy, and how to pick a level.",
  },
  "deepseek-flash-model-names": {
    slug: "deepseek-flash-model-names",
    catId: "api",
    tag: "Migration",
    desc: "Every DeepSeek model id, alias, and retirement status in one table — so a rerouted or deprecated name never breaks production.",
  },
  "v4-1-flash-vs-v4-flash": {
    slug: "v4-1-flash-vs-v4-flash",
    catId: "benchmarks",
    tag: "Comparison",
    desc: "The 94% backbone jump from 284B to 552B, the move from 13B to 8B/16B activation, a 4x smaller KV cache, and what it means for migration.",
  },
  "v4-1-flash-vs-opus-5": {
    slug: "v4-1-flash-vs-opus-5",
    catId: "benchmarks",
    tag: "Comparison",
    desc: "DeepSWE 74.2 vs 74.0 and CyberGym 88.1 vs none — but Opus 5 wins the harder Terminal-Bench 3.0/4.0. Open weights at a fraction of the price.",
  },
  "v4-1-flash-vs-kimi-k3": {
    slug: "v4-1-flash-vs-kimi-k3",
    catId: "benchmarks",
    tag: "Comparison",
    desc: "Two open-weight rivals compared: V4.1 Flash leads on agent and coding tests, Kimi K3 leads GPQA and HLE. Pricing and cache rates compared.",
  },
  "deepseek-v4-1-pro": {
    slug: "deepseek-v4-1-pro",
    catId: "news",
    tag: "Upcoming",
    desc: "DeepSeek's next flagship has no release date. What the CED family implies, why V4-Pro traffic routes to Flash until it ships, and how to track it.",
  },
  "v4-1-flash-local-deployment": {
    slug: "v4-1-flash-local-deployment",
    catId: "local",
    tag: "Local Setup",
    desc: "Download the MIT weights and serve them with vLLM: a 511 GB checkpoint, a 614 GB VRAM floor, GB200/H200 layouts, and DSpark.",
  },
  "v4-1-flash-coding-agents": {
    slug: "v4-1-flash-coding-agents",
    catId: "agents",
    tag: "Coding Agents",
    desc: "Official setup for Claude Code, OpenCode, and OpenClaw, plus the DeepSeek Harness minimal mode used for the official agent benchmarks.",
  },
  "v4-1-flash-kv-cache": {
    slug: "v4-1-flash-kv-cache",
    catId: "deepdive",
    tag: "Technical",
    desc: "How V4.1 Flash stores its KV cache in 890 bytes per token: CED projection, CSA2 layer modes, FP4 KV, SWA Bounded Replay, and the 72-hour cache.",
  },
  "deepseek-v4-pro-retired": {
    slug: "deepseek-v4-pro-retired",
    catId: "news",
    tag: "Release",
    desc: "From Sept 14, 2026, every deepseek-v4-pro request routes to V4.1 Flash at Flash rates. The timeline, official reasons, and developer pushback.",
  },
  "deepseek-v4-flash": {
    slug: "deepseek-v4-flash",
    catId: "model",
    tag: "Model Guide",
    desc: "A 284B-parameter open-weight MoE with 1M context. What the July 31, 2026 official release actually changed versus the preview.",
  },
  "flash-api-setup": {
    slug: "flash-api-setup",
    catId: "api",
    tag: "API Integration",
    desc: "Step-by-step: create an API key, set the base URL, and make your first call with curl, Python, or Node.js.",
  },
  "flash-pricing": {
    slug: "flash-pricing",
    catId: "pricing",
    tag: "Cost Optimization",
    desc: "Official token pricing ($0.14 / $0.28 per 1M), the ~98% context-cache discount, and real savings vs GPT-5.5 and Claude.",
  },
  "flash-benchmarks": {
    slug: "flash-benchmarks",
    catId: "benchmarks",
    tag: "Benchmarks",
    desc: "All nine official agentic benchmarks, the +645% DeepSWE jump, and how V4 Flash stacks up against GLM-5.2 and Opus-4.8.",
  },
  "flash-opencode": {
    slug: "flash-opencode",
    catId: "agents",
    tag: "Coding Agents",
    desc: "Connect the open-source OpenCode agent to DeepSeek V4 Flash in minutes with the official /connect deepseek flow.",
  },
  "flash-ide": {
    slug: "flash-ide",
    catId: "ide",
    tag: "Cursor & IDE",
    desc: "Configure DeepSeek V4 Flash in Cursor, Claude Code (ANTHROPIC_BASE_URL), and Codex with the official one-click script.",
  },
  "flash-openrouter": {
    slug: "flash-openrouter",
    catId: "router",
    tag: "OpenRouter",
    desc: "Two model slugs, third-party pricing, BYOK setup, and when to route through OpenRouter instead of the official API.",
  },
  "flash-model-size": {
    slug: "flash-model-size",
    catId: "model",
    tag: "Model Size",
    desc: "284B total / 13B active explained, weight sizes in FP4/FP8/BF16, and what GPU you actually need to run it.",
  },
  "flash-huggingface": {
    slug: "flash-huggingface",
    catId: "local",
    tag: "Local Deployment",
    desc: "Download the MIT-licensed DeepSeek-V4-Flash-0731 weights from HuggingFace and serve them with vLLM.",
  },
  "v4-pro": {
    slug: "v4-pro",
    catId: "model",
    tag: "V4 Pro",
    desc: "1.6T-parameter flagship still in preview. Specs, official pricing, self-reported benchmarks, and the expected release window.",
  },
  "beginner-guide": {
    slug: "beginner-guide",
    catId: "beginner",
    tag: "Beginner Guide",
    desc: "Don't know model names? Here's why DeepSeek V4 is the best cheap AI to start with — plain-English, with honest limitations.",
  },
  "opencode-go": {
    slug: "opencode-go",
    catId: "agents",
    tag: "OpenCode Go",
    desc: "The $5/month subscription that unlocks DeepSeek V4 Flash and Pro — roughly 158K Flash requests a month for $10.",
  },
  "cc-switch-claude-code": {
    slug: "cc-switch-claude-code",
    catId: "ide",
    tag: "Claude Code",
    desc: "Point Claude Code & Claude Desktop at DeepSeek V4 using CC Switch — official env vars, Desktop dev mode, and Linux setup.",
  },
  "deepseek-harness": {
    slug: "deepseek-harness",
    catId: "news",
    tag: "Upcoming",
    desc: "DeepSeek's official agent framework is unreleased but every benchmark was measured on it. Everything we know so far.",
  },
  "official-tech-report": {
    slug: "official-tech-report",
    catId: "deepdive",
    tag: "Technical",
    desc: "A guided tour of the DeepSeek V4 paper — CSA+HCA attention, Muon, 27% of V3.2's FLOPs, and how to read the model cards.",
  },
  "harness-agent-capability": {
    slug: "harness-agent-capability",
    catId: "agents",
    tag: "Harness",
    desc: "Why 'Model + Harness = Agent' — the context management, tool loops, and self-correction that turn a raw model into a real agent.",
  },
  "reasonix-deepseek": {
    slug: "reasonix-deepseek",
    catId: "pricing",
    tag: "Cost Hacks",
    desc: "Reasonix hits 99%+ DeepSeek cache rates — 435M input tokens for $1.38 instead of $61. How the cache-first loop saves ~98%.",
  },
  "hermes-setup": {
    slug: "hermes-setup",
    catId: "agents",
    tag: "Hermes",
    desc: "The community-verified best pairing for Hermes: DeepSeek V4 Flash 0731 as the text brain + MiMo V2.5 for vision.",
  },
  "v4-vs-gpt56-luna": {
    slug: "v4-vs-gpt56-luna",
    catId: "benchmarks",
    tag: "Comparisons",
    desc: "DeepSeek V4 Flash vs the price-cut GPT-5.6 Luna: AI Intelligence Index 50 vs 51, but 60% lower cost per task. Who wins by scenario.",
  },
};

export function getGuideCards(): (GuideCardMeta & { guide: GuideContent })[] {
  return Object.values(guideMeta)
    .map((meta) => {
      const guide = getGuide(meta.slug);
      return guide ? { ...meta, guide } : null;
    })
    .filter(Boolean) as (GuideCardMeta & { guide: GuideContent })[];
}

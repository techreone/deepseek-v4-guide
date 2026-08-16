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


// 中央指南注册表：新增教程 = 在 src/data/guides/ 新建文件并在下方登记
// 首页列表 / 指南页 / 内链全部以此为准，避免硬编码失同步
export const guidesDatabase: Record<string, GuideContent> = {
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

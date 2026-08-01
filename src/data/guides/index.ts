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
import { beginnerGuide } from "./beginner-guide";
import { opencodeGo } from "./opencode-go";
import { ccSwitchClaudeCode } from "./cc-switch-claude-code";
import { deepseekHarness } from "./deepseek-harness";
import { officialTechReport } from "./official-tech-report";

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
  [ccSwitchClaudeCode.slug]: ccSwitchClaudeCode,
  [deepseekHarness.slug]: deepseekHarness,
  [officialTechReport.slug]: officialTechReport,
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
};

export function getGuideCards(): (GuideCardMeta & { guide: GuideContent })[] {
  return Object.values(guideMeta)
    .map((meta) => {
      const guide = getGuide(meta.slug);
      return guide ? { ...meta, guide } : null;
    })
    .filter(Boolean) as (GuideCardMeta & { guide: GuideContent })[];
}

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
};

export function getGuideCards(): (GuideCardMeta & { guide: GuideContent })[] {
  return Object.values(guideMeta)
    .map((meta) => {
      const guide = getGuide(meta.slug);
      return guide ? { ...meta, guide } : null;
    })
    .filter(Boolean) as (GuideCardMeta & { guide: GuideContent })[];
}

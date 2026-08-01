"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const guides = [
  {
    id: "api-access",
    tag: "入门指南",
    tagColor: "bg-accent-green-bg text-accent-green-text",
    title: "如何零门槛接入 DeepSeek V4 官方 API",
    description: "从注册、充值到获取 API Key 的全流程图文解析。避开常见限流坑点，确保生产环境稳定调用。",
    time: "5 分钟阅读",
    href: "#"
  },
  {
    id: "pricing-strategy",
    tag: "财务策略",
    tagColor: "bg-accent-yellow-bg text-accent-yellow-text",
    title: "V4 Flash 成本优化与最划算购买方案",
    description: "深度剖析 Token 计费模式，对比官方购买与第三方代理池的优劣，帮你制定最具性价比的采购计划。",
    time: "8 分钟阅读",
    href: "#"
  },
  {
    id: "integration",
    tag: "工程实践",
    tagColor: "bg-accent-blue-bg text-accent-blue-text",
    title: "在 Next.js 项目中优雅集成 V4 API",
    description: "使用 Vercel AI SDK 配合 DeepSeek API，实现打字机流式输出与 function calling 功能。",
    time: "12 分钟阅读",
    href: "#"
  },
  {
    id: "prompt-eng",
    tag: "提示词",
    tagColor: "bg-accent-red-bg text-accent-red-text",
    title: "为 DeepSeek V4 优化的 Prompt 技巧",
    description: "相较于 V3，V4 Flash 对指令的遵循能力大幅提升。这是一份帮助你榨干模型潜力的提示词编写模板。",
    time: "6 分钟阅读",
    href: "#"
  }
];

export function GuideIndex() {
  return (
    <section id="guides" className="py-24 border-t border-border-subtle bg-surface">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16">
          <h2 className="text-2xl font-sans font-medium tracking-tight text-charcoal mb-2">
            核心攻略索引
          </h2>
          <p className="text-text-muted text-sm">
            精心整理的技术与策略指南，不废话，全干货。
          </p>
        </div>

        <div className="flex flex-col">
          {guides.map((guide, i) => (
            <motion.a
              href={guide.href}
              key={guide.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-border-subtle hover:bg-canvas/50 transition-colors -mx-6 px-6 cursor-pointer"
            >
              <div className="flex-1 max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full tracking-wide ${guide.tagColor}`}>
                    {guide.tag}
                  </span>
                  <span className="text-xs text-text-muted font-mono">{guide.time}</span>
                </div>
                <h3 className="text-lg font-medium text-charcoal group-hover:text-black transition-colors mb-2">
                  {guide.title}
                </h3>
                <p className="text-charcoal-muted leading-relaxed text-sm mt-1">
                  {guide.description}
                </p>
              </div>
              <div className="hidden md:flex items-center justify-end w-12 text-text-muted group-hover:text-charcoal transition-colors">
                <ArrowUpRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

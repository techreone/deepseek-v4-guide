"use client";

import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-accent-blue-bg border border-accent-blue-text/10">
            <span className="flex h-2 w-2 rounded-full bg-accent-blue-text"></span>
            <span className="text-xs font-medium text-accent-blue-text tracking-wide uppercase">
              V4 Flash Edition Available
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-sans tracking-tighter leading-[1.05] text-charcoal mb-8">
            掌握 DeepSeek V4 <br className="hidden md:block" />
            <span className="text-text-muted">释放极限性价比</span>
          </h1>
          
          <p className="text-lg text-charcoal-muted leading-relaxed max-w-2xl mb-12">
            这是专为开发者和技术团队打造的 unofficial 指南。我们将深入探讨如何以最低成本接入 DeepSeek V4 Flash 官方 API，以及最佳的集成策略。
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#guides"
              className="group flex h-12 items-center justify-center gap-2 rounded bg-charcoal px-6 text-sm font-medium text-canvas transition-all hover:bg-charcoal-muted hover:scale-[0.98] active:scale-95"
            >
              开始阅读攻略
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#pricing"
              className="flex h-12 items-center justify-center px-6 text-sm font-medium text-charcoal transition-colors hover:text-text-muted"
            >
              查看购买策略
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle background ambient blob for depth */}
      <div className="absolute top-1/4 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-accent-blue-bg/40 rounded-full blur-[120px] pointer-events-none opacity-50" />
    </section>
  );
}

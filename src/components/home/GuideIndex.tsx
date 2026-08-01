"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getAllGuides } from "@/data/guides";
import { computeReadTime } from "@/lib/readTime";

const tagColors = [
  "bg-accent-green-bg text-accent-green-text",
  "bg-accent-yellow-bg text-accent-yellow-text",
  "bg-accent-blue-bg text-accent-blue-text",
  "bg-accent-red-bg text-accent-red-text",
];

export function GuideIndex() {
  const guides = getAllGuides();

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
              href={`/guides/${guide.slug}`}
              key={guide.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-border-subtle hover:bg-canvas/50 transition-colors -mx-6 px-6 cursor-pointer"
            >
              <div className="flex-1 max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full tracking-wide ${tagColors[i % tagColors.length]}`}>
                    {guide.category}
                  </span>
                  <span className="text-xs text-text-muted font-mono">{computeReadTime(guide)}</span>
                </div>
                <h3 className="text-lg font-medium text-charcoal group-hover:text-black transition-colors mb-2">
                  {guide.title}
                </h3>
                <p className="text-charcoal-muted leading-relaxed text-sm mt-1">
                  {guide.summary}
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

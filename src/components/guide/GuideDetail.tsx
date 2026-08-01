"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Copy, 
  BookmarkSimple, 
  ShareNetwork,
  List,
  Info
} from "@phosphor-icons/react/dist/ssr";

export interface GuideContent {
  slug: string;
  category: string;
  title: string;
  readTime: string;
  updatedAt: string;
  summary: string;
  toc: { id: string; label: string }[];
  steps: {
    num: string;
    title: string;
    description: string;
    code?: string;
    note?: string;
  }[];
  prevGuide?: { title: string; slug: string };
  nextGuide?: { title: string; slug: string };
}

interface GuideDetailProps {
  guide: GuideContent;
}

export function GuideDetail({ guide }: GuideDetailProps) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article className="min-h-screen text-zinc-100 pb-20">
      {/* Header Breadcrumb */}
      <div className="border-b border-zinc-800/80 pt-8 pb-6">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALL GUIDES</span>
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
              {guide.category}
            </span>
            <span className="text-zinc-600 text-xs font-mono">•</span>
            <span className="text-xs font-mono text-zinc-500">{guide.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans mb-4">
            {guide.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/60 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-4">
              <span>UPDATED: {guide.updatedAt}</span>
              <span>•</span>
              <span>AUTHOR: DEEPSEEK GUIDE TEAM</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">LINK COPIED</span>
                </>
              ) : (
                <>
                  <ShareNetwork className="w-3.5 h-3.5" />
                  <span>SHARE TUTORIAL</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Content (70%) + Right Table of Contents Sidebar (30%) */}
      <div className="mx-auto max-w-5xl px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Article Body (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Overview Box */}
            <div className="p-4 rounded-lg bg-[#0c0c0e] border border-zinc-800/80 font-sans text-xs text-zinc-300 leading-relaxed">
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
                OVERVIEW
              </div>
              <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
                {guide.summary}
              </p>
            </div>

            {/* Step-by-Step Sections */}
            {guide.steps.map((step, idx) => (
              <section id={`step-${idx + 1}`} key={idx} className="scroll-mt-24 pt-4">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs text-zinc-500 font-semibold">
                    {step.num}
                  </span>
                  <h2 className="text-lg font-bold text-white font-sans tracking-tight">
                    {step.title}
                  </h2>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-4">
                  {step.description}
                </p>

                {/* Pure Monochrome Note Box */}
                {step.note && (
                  <div className="my-4 rounded-lg bg-[#0c0c0e] border border-zinc-800/80 p-4 font-sans text-xs">
                    <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-1">
                      NOTE
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      {step.note}
                    </p>
                  </div>
                )}

                {/* Code Block if present */}
                {step.code && (
                  <div className="my-4 rounded-lg bg-[#0e0e11] border border-zinc-800/80 overflow-hidden font-mono text-xs">
                    <div className="flex items-center justify-between px-3 py-2 bg-[#141418] border-b border-zinc-800/60 text-zinc-400">
                      <span>example_code.py</span>
                      <button
                        onClick={() => handleCopyCode(step.code!, idx)}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 text-[10px]">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px]">COPY</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-zinc-300 leading-relaxed bg-[#0a0a0c]">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}

            {/* Bottom Navigation between guides */}
            <div className="pt-10 mt-6 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {guide.prevGuide ? (
                <Link
                  href={`/guides/${guide.prevGuide.slug}`}
                  className="p-4 rounded-lg bg-[#0e0e11] border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col gap-1 group"
                >
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                    PREVIOUS TUTORIAL
                  </span>
                  <span className="text-zinc-200 group-hover:text-white font-sans font-medium text-sm line-clamp-1">
                    {guide.prevGuide.title}
                  </span>
                </Link>
              ) : <div />}

              {guide.nextGuide && (
                <Link
                  href={`/guides/${guide.nextGuide.slug}`}
                  className="p-4 rounded-lg bg-[#0e0e11] border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col items-end text-right gap-1 group"
                >
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    NEXT TUTORIAL
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="text-zinc-200 group-hover:text-white font-sans font-medium text-sm line-clamp-1">
                    {guide.nextGuide.title}
                  </span>
                </Link>
              )}
            </div>

          </div>

          {/* Table of Contents Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 sticky top-24">
            <div className="rounded-lg bg-[#0e0e11] border border-zinc-800/80 p-5 font-mono text-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-zinc-800 text-zinc-300 font-bold uppercase tracking-wider">
                <List className="w-4 h-4 text-cyan-400" />
                ON THIS PAGE
              </div>
              <ul className="flex flex-col gap-2.5">
                {guide.toc.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-zinc-400 hover:text-white transition-colors block leading-snug font-sans text-xs"
                    >
                      <span className="font-mono text-zinc-600 mr-2">0{i + 1}.</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col gap-2 text-[11px] text-zinc-500 font-mono">
                <span>NEED HELP WITH API KEY?</span>
                <a
                  href="https://platform.deepseek.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-sans"
                >
                  Official DeepSeek Console ↗
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </article>
  );
}

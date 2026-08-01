"use client";

import Link from "next/link";
import { ArrowRight, Radio, Warning, CheckCircle, Hourglass } from "@phosphor-icons/react/dist/ssr";

// DeepSeek Harness 在线追踪 — 首页主关键词区
// 数据来源：reference/topics/13-deepseek-harness.md（信息分层：官方已披露 / 媒体传闻 / 分析）
export function HarnessTracker() {
  const signals = [
    {
      icon: Hourglass,
      label: "OFFICIAL STATUS",
      value: "Not released",
      detail: "\"to be released soon\" — official changelog, 2026-07-31",
      tone: "text-zinc-200",
    },
    {
      icon: CheckCircle,
      label: "OFFICIAL SIGNAL",
      value: "Shipped with V4 Flash 0731",
      detail: "All 9 agent benchmarks (Terminal-Bench 82.7, DeepSWE 54.4) measured on its minimal mode",
      tone: "text-cyan-400",
    },
    {
      icon: Radio,
      label: "REPORTED",
      value: "Internal testing + NDA beta",
      detail: "Aug 10–20 window reported — not confirmed by DeepSeek",
      tone: "text-amber-400/90",
    },
    {
      icon: Warning,
      label: "WATCH FOR",
      value: "4 official signals",
      detail: "changelog GA entry · GitHub repo · official X · product page",
      tone: "text-zinc-200",
    },
  ];

  return (
    <section
      id="harness-tracker"
      className="relative border-b border-zinc-800/80 overflow-hidden"
    >
      {/* subtle cyan glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full bg-cyan-500/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-14">
        {/* Live badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-[#0c0c0e] border border-cyan-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-medium">
              Live Tracker
            </span>
            <span className="text-zinc-600">|</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              DeepSeek Harness
            </span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            Updated Aug 1, 2026
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans mb-3">
          DeepSeek Harness <span className="text-cyan-400">Coming Soon</span>
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-sans mb-8">
          DeepSeek's official agent framework — the &ldquo;Model + Harness = Agent&rdquo; layer that runs every
          official agent benchmark. When it ships alongside the V4 Pro official release, DeepSeek's agent
          capability could jump significantly.
        </p>

        {/* Signal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {signals.map((s) => (
            <div
              key={s.label}
              className="rounded-lg bg-[#0c0c0e] border border-zinc-800/80 p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-1.5">
                <s.icon className="w-3.5 h-3.5 text-zinc-500" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                  {s.label}
                </span>
              </div>
              <div className={`text-sm font-semibold font-sans leading-snug ${s.tone}`}>
                {s.value}
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                {s.detail}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href="/guides/deepseek-harness"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-700/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 transition-colors text-xs font-mono font-medium"
          >
            FULL TRACKER — EVERYTHING WE KNOW
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/guides/v4-pro"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0e0e11] border border-zinc-800 hover:border-zinc-700 transition-colors text-xs font-mono text-zinc-400 hover:text-zinc-200"
          >
            PAIRED WITH: V4 PRO OFFICIAL RELEASE
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

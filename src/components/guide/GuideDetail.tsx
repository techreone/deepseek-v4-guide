"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import AdsterraBanner from "@/components/ads/AdsterraBanner";
import AdsterraNative from "@/components/ads/AdsterraNative";
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
import type { GuideContent } from "@/data/guides/types";
import { computeReadTime } from "@/lib/readTime";

export type { GuideContent };

/**
 * 正文富文本渲染：
 * - `[[slug|显示文字]]` → 站内双链（跳转 /guides/<slug>）
 * - `[n]` → 角注引用（上标编号，指向底部参考文献 #ref-n）
 * 仅当 n 在 sources 范围内才解析为引用，否则按普通文本输出。
 */
function renderRichText(text: string, sourceCount: number) {
  const parts = text.split(/(\[\[[^\]|]+\|[^\]]+\]\]|\[\d+\]|https?:\/\/[^\s\[\]]+)/g);
  return parts.map((part, i) => {
    if (!part) return null;
    const linkMatch = part.match(/^\[\[([^\]|]+)\|([^\]]+)\]\]$/);
    if (linkMatch) {
      return (
        <Link
          key={i}
          href={`/guides/${linkMatch[1]}`}
          className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium transition-colors"
        >
          {linkMatch[2]}
        </Link>
      );
    }
    const citeMatch = part.match(/^\[(\d+)\]$/);
    if (citeMatch) {
      const n = parseInt(citeMatch[1], 10);
      if (n >= 1 && n <= sourceCount) {
        return (
          <sup key={i} className="font-mono">
            <a
              href={`#ref-${n}`}
              className="text-cyan-400 hover:text-cyan-300 hover:underline text-[10px]"
            >
              [{n}]
            </a>
          </sup>
        );
      }
    }
    const urlMatch = part.match(/^https?:\/\/[^\s\[\]]+$/);
    if (urlMatch) {
      // 去掉被行内标点吞进的结尾字符（"https://api.deepseek.com." 中的句号），
      // 避免生成带句号的畸形链接（SEMrush "URL 格式不正确"）
      const url = urlMatch[0].replace(/[.,;:!?)\]}]+$/, "");
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 hover:underline break-all"
        >
          {url}
        </a>
      );
    }
    return part;
  });
}

interface GuideDetailProps {
  guide: GuideContent;
}

export function GuideDetail({ guide }: GuideDetailProps) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const sourceCount = guide.sources?.length ?? 0;

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
      {/* JSON-LD structured data (GEO / EEAT) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: guide.title,
                description: guide.summary,
                dateModified: guide.updatedAt,
                url: `https://deepseekv4guide.org/guides/${guide.slug}`,
                publisher: {
                  "@type": "Organization",
                  name: "DeepSeek V4 Guide",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "DeepSeek V4 Guide", item: "https://deepseekv4guide.org/" },
                  { "@type": "ListItem", position: 2, name: "Guides", item: "https://deepseekv4guide.org/#guides" },
                  { "@type": "ListItem", position: 3, name: guide.title, item: `https://deepseekv4guide.org/guides/${guide.slug}` },
                ],
              },
            ],
          }),
        }}
      />
      {/* Header Breadcrumb */}
      <div className="border-b border-zinc-800/80 pt-8 pb-6">
        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              DeepSeek V4 Guide
            </Link>
            <span aria-hidden="true" className="text-zinc-700">/</span>
            <Link href="/#guides" className="hover:text-cyan-400 transition-colors">
              Guides
            </Link>
            <span aria-hidden="true" className="text-zinc-700">/</span>
            <span className="text-zinc-300 truncate max-w-[40vw] sm:max-w-[50vw]">
              {guide.title}
            </span>
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
              {guide.category}
            </span>
            <span className="text-zinc-600 text-xs font-mono">•</span>
            <span className="text-xs font-mono text-zinc-500">{computeReadTime(guide)}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans mb-4">
            {guide.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/60 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-4">
              <span>UPDATED: {guide.updatedAt}</span>
              <span>•</span>
              <span>AUTHOR: INDEPENDENT FAN GUIDE</span>
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
      <div className="mx-auto max-w-6xl px-6 pt-10">
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

            {/* Step-by-Step Sections（长文 ≥6 步按 1/3、2/3 处穿插 300x250 广告，短文不插） */}
            {guide.steps.map((step, idx) => {
              const showAd =
                guide.steps.length >= 6 &&
                (idx === Math.floor(guide.steps.length / 3) ||
                  idx === Math.floor((guide.steps.length * 2) / 3));
              return (
              <Fragment key={idx}>
              <section id={`step-${idx + 1}`} className="scroll-mt-24 pt-4">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs text-zinc-500 font-semibold">
                    {step.num}
                  </span>
                  <h2 className="text-lg font-bold text-white font-sans tracking-tight">
                    {step.title}
                  </h2>
                </div>

                <p className="text-base text-zinc-300 leading-relaxed font-sans mb-5">
                  {renderRichText(step.description, sourceCount)}
                </p>

                {/* Additional Paragraphs (long-form) */}
                {step.paragraphs?.map((para, i) => (
                  <p key={i} className="text-base text-zinc-300 leading-relaxed font-sans mb-5">
                    {renderRichText(para, sourceCount)}
                  </p>
                ))}

                {/* Bullet List */}
                {step.list && step.list.length > 0 && (
                  <ul className="my-4 flex flex-col gap-2">
                    {step.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-base text-zinc-300 leading-relaxed font-sans">
                        <span className="mt-2 h-1 w-1 rounded-full bg-zinc-500 shrink-0" />
                        <span>{renderRichText(item, sourceCount)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Data Table (specs / pricing / benchmarks) */}
                {step.table && (
                  <div className="my-4 rounded-lg bg-[#0c0c0e] border border-zinc-800/80 overflow-x-auto">
                    <table className="w-full text-sm font-sans">
                      <thead>
                        <tr className="border-b border-zinc-800/80">
                          {step.table.headers.map((h, i) => (
                            <th key={i} className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500 whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {step.table.rows.map((row, i) => (
                          <tr key={i} className="border-b border-zinc-800/40 last:border-0">
                            {row.map((cell, j) => (
                              <td key={j} className={`px-4 py-3 text-zinc-300 whitespace-nowrap ${j === 0 ? "font-medium text-zinc-100" : ""}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Pure Monochrome Note Box */}
                {step.note && (
                  <div className="my-4 rounded-lg bg-[#0c0c0e] border border-zinc-800/80 p-4 font-sans text-xs">
                    <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-1">
                      NOTE
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {renderRichText(step.note, sourceCount)}
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
              {showAd && (
                <AdsterraBanner
                  idKey="b87b359765291fda5ec291c153acd977"
                  width={300}
                  height={250}
                  label="Sponsored"
                />
              )}
              </Fragment>
            );
            })}

            {/* Related Guides (internal link network) */}
            {guide.relatedGuides && guide.relatedGuides.length > 0 && (
              <div className="pt-6 mt-6 border-t border-zinc-800/80">
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3">
                  RELATED GUIDES
                </div>
                <div className="flex flex-col gap-2">
                  {guide.relatedGuides.map((rel, i) => (
                    <Link
                      key={i}
                      href={`/guides/${rel.slug}`}
                      className="group p-3 rounded-lg bg-[#0e0e11] border border-zinc-800/80 hover:border-zinc-700 transition-colors flex items-center justify-between gap-3"
                    >
                      <span className="text-sm text-zinc-200 group-hover:text-white font-sans leading-snug">
                        {rel.title}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 shrink-0 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sources & References (GEO / EEAT) — numbered, anchored for footnote citations */}
            {guide.sources && guide.sources.length > 0 && (
              <div className="pt-6 mt-6 border-t border-zinc-800/80">
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3">
                  REFERENCES
                </div>
                <ol className="flex flex-col gap-2 list-none">
                  {guide.sources.map((src, i) => (
                    <li
                      key={i}
                      id={`ref-${i + 1}`}
                      className="text-xs text-zinc-400 leading-relaxed flex gap-2 scroll-mt-24"
                    >
                      <span className="text-cyan-400 font-mono shrink-0">[{i + 1}]</span>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400/90 hover:text-cyan-300 hover:underline font-sans break-all"
                      >
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

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

          {/* Adsterra Native Banner（文末，每页一次） */}
          <AdsterraNative label="Sponsored" />

          {/* Adsterra 728x90 Leaderboard（文章底部） */}
          <AdsterraBanner
            idKey="9b00a0e2de68851d25e97a77bf2e9004"
            width={728}
            height={90}
            label="Sponsored"
          />

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

            {/* Adsterra 160x600 Skyscraper（仅桌面端侧边栏可见） */}
            <div className="hidden lg:block mt-6">
              <AdsterraBanner
                idKey="548a7c33e0b6c256defb46b945b92f28"
                width={160}
                height={600}
                label="Sponsored"
              />
            </div>
          </aside>

        </div>
      </div>
    </article>
  );
}

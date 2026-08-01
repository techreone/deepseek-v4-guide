"use client";

import Link from "next/link";
import { CodeTerminal } from "./CodeTerminal";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getGuideCards } from "@/data/guides";

interface MainContentProps {
  activeCategory: string;
  searchQuery: string;
}

export function MainContent({ activeCategory, searchQuery }: MainContentProps) {
  const guides = getGuideCards().map((card, i) => ({
    num: String(i + 1).padStart(2, "0"),
    catId: card.catId,
    tag: card.tag,
    title: card.guide.title,
    desc: card.desc,
    readTime: card.guide.readTime,
    href: `/guides/${card.guide.slug}`,
  }));

  const filteredGuides = guides.filter((guide) => {
    const matchesCat = activeCategory === "all" || guide.catId === activeCategory;
    const matchesQuery = searchQuery.trim() === "" || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      guide.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-6">
        {/* Essential Guides List Section */}
        <div id="guides" className="scroll-mt-24 mb-14">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              FEATURED GUIDES & TUTORIALS
            </h2>
            <span className="text-xs font-mono text-zinc-600">
              {filteredGuides.length} ARTICLES
            </span>
          </div>

          {filteredGuides.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-zinc-500">
              No matching guides found. Try a different search term or category.
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-zinc-800/60">
              {filteredGuides.map((guide) => (
                <Link
                  key={guide.num}
                  href={guide.href}
                  className="group py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 transition-colors hover:bg-zinc-900/30 -mx-4 px-4 rounded cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors pt-0.5">
                      {guide.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                          {guide.tag}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-600">
                          {guide.readTime}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors mb-1 font-sans">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl font-sans">
                        {guide.desc}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center text-zinc-600 group-hover:text-zinc-200 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Code Terminal Section Header */}
        <div className="pt-8 border-t border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              QUICK INTEGRATION CODE SNIPPET
            </h2>
            <span className="text-xs font-mono text-zinc-600">PYTHON 3.10+</span>
          </div>
          <CodeTerminal />
        </div>
      </div>
    </section>
  );
}

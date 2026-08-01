"use client";

import Link from "next/link";
import { CodeTerminal } from "./CodeTerminal";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getGuideCards } from "@/data/guides";
import { computeReadTime } from "@/lib/readTime";

const categories = [
  { id: "all", label: "All Guides" },
  { id: "beginner", label: "Beginner" },
  { id: "model", label: "Model Guides" },
  { id: "api", label: "API Setup" },
  { id: "pricing", label: "Pricing & Cost" },
  { id: "benchmarks", label: "Benchmarks" },
  { id: "agents", label: "Coding Agents" },
  { id: "ide", label: "IDE Integration" },
  { id: "router", label: "OpenRouter" },
  { id: "local", label: "Local Setup" },
  { id: "news", label: "Upcoming" },
  { id: "deepdive", label: "Technical" },
];

interface MainContentProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function MainContent({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }: MainContentProps) {
  const guides = getGuideCards().map((card, i) => ({
    num: String(i + 1).padStart(2, "0"),
    catId: card.catId,
    tag: card.tag,
    title: card.guide.title,
    desc: card.desc,
    readTime: computeReadTime(card.guide),
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
          {/* Search + Category Filter — 紧邻指南列表，实时过滤 */}
          <div className="flex flex-col gap-4 pb-6 mb-6 border-b border-zinc-800/80">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="w-4 h-4">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tutorials, API setup steps, cost guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0e0e11] border border-zinc-800 rounded-lg text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors shadow-inner font-sans"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded text-xs font-sans whitespace-nowrap transition-colors ${
                      isSelected
                        ? "bg-zinc-100 text-zinc-950 font-medium"
                        : "bg-[#0e0e11] border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

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

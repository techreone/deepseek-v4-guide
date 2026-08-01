"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlass, CaretRight } from "@phosphor-icons/react/dist/ssr";

interface HeroHeaderProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const phrases = [
  "DEEPSEEK V4 FLASH",
  "API ACCESS GUIDES",
  "BUYING STRATEGIES",
  "CURSOR SETUP TUTORIALS"
];

function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <span className="inline-flex items-center">
      <span className="font-pixel text-3xl sm:text-4xl md:text-5xl text-zinc-100 tracking-wider uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] min-h-[1.2em] inline-block">
        {displayedText}
      </span>
      <span className="font-pixel text-3xl sm:text-4xl md:text-5xl text-cyan-400 ml-1 inline-block animate-pulse font-normal">
        _
      </span>
    </span>
  );
}

export function HeroHeader({ 
  activeCategory, 
  setActiveCategory,
  searchQuery,
  setSearchQuery
}: HeroHeaderProps) {
  const categories = [
    { id: "all", label: "All Guides" },
    { id: "model", label: "Model Guides" },
    { id: "api", label: "API Setup" },
    { id: "pricing", label: "Pricing & Cost" },
    { id: "benchmarks", label: "Benchmarks" },
    { id: "agents", label: "Coding Agents" },
    { id: "ide", label: "IDE Integration" },
    { id: "router", label: "OpenRouter" },
    { id: "local", label: "Local Setup" },
  ];

  return (
    <section className="pt-16 pb-10 border-b border-zinc-800/80 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
        {/* Pure Monochrome Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-md bg-[#0c0c0e] border border-zinc-800 text-xs font-mono">
          <span className="text-zinc-300 font-medium">OFFICIAL V4 FLASH GUIDES</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">STEP-BY-STEP TUTORIALS</span>
        </div>

        {/* Hero Title */}
        <h1 className="flex flex-col items-center gap-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          <span>Master The New</span>
          <TypewriterText />
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-sans mb-8">
          The complete, step-by-step tutorial directory for DeepSeek V4 Flash. Learn how to access official APIs, optimize costs, and connect LLMs to your apps — simplified for everyone.
        </p>

        {/* Centered Search Bar */}
        <div className="w-full max-w-md relative mb-10">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <MagnifyingGlass className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search tutorials, API setup steps, cost guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0e0e11] border border-zinc-800 rounded-lg text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors shadow-inner font-sans"
          />
        </div>

        {/* Category Pill Filter Bar */}
        <div className="w-full flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
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
          <button className="px-2 py-1.5 rounded bg-[#0e0e11] border border-zinc-800 text-zinc-400 hover:text-zinc-200">
            <CaretRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Essential Specs Bar */}
        <div id="specs" className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-zinc-800/60 font-mono text-xs text-left">
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">OFFICIAL PRICE</div>
            <div className="text-sm font-semibold text-zinc-200">$0.14 <span className="text-[10px] font-normal text-zinc-500">/ 1M Input Tokens</span></div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">MODEL SIZE</div>
            <div className="text-sm font-semibold text-zinc-200">284B <span className="text-[10px] font-normal text-zinc-500">Total Params</span></div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">CONTEXT</div>
            <div className="text-sm font-semibold text-zinc-200">1M Tokens</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">DIFFICULTY</div>
            <div className="text-sm font-semibold text-zinc-200">Beginner Friendly</div>
          </div>
        </div>
      </div>
    </section>
  );
}

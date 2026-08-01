"use client";

import { useState, useEffect } from "react";

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

export function HeroHeader() {
  return (
    <section className="pt-16 pb-10 border-b border-zinc-800/80 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
        {/* Pure Monochrome Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-md bg-[#0c0c0e] border border-zinc-800 text-xs font-mono">
          <span className="text-amber-400/90 font-medium">FAN-MADE V4 GUIDE</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">NOT AFFILIATED WITH DEEPSEEK</span>
        </div>

        {/* Hero Title */}
        <h1 className="flex flex-col items-center gap-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          <span>Master The New</span>
          <TypewriterText />
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-sans mb-4">
          The complete, step-by-step tutorial directory for DeepSeek V4 Flash. Learn how to access official APIs, optimize costs, and connect LLMs to your apps — simplified for everyone. An independent fan-made resource, not run by DeepSeek.
        </p>

        {/* Official API Status Link */}
        <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-500 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          <span>DEEPSEEK API SLOW OR DOWN?</span>
          <a
            href="https://status.deepseek.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            Check the official status → status.deepseek.com
          </a>
        </div>

        {/* Centered Search Bar — 已移到指南列表顶部（MainContent，与筛选器一起） */}

        {/* Category Pill Filter Bar — 已移到 FEATURED GUIDES 上方（MainContent） */}

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

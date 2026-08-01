import Link from "next/link";
import { BookOpen, CaretDown } from "@phosphor-icons/react/dist/ssr";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#060608]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-zinc-100">
          <div className="font-mono text-zinc-400 font-bold text-sm tracking-tighter">
            -&#123;&#125; <span className="font-sans text-white text-base font-bold tracking-tight">DeepSeek V4</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
            GUIDE
          </span>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden sm:flex items-center gap-6 text-xs text-zinc-300 font-sans">
          <a href="#guides" className="flex items-center gap-1 hover:text-white transition-colors">
            Tutorials
            <CaretDown className="w-3 h-3 text-zinc-500" />
          </a>
          <a href="#specs" className="flex items-center gap-1 hover:text-white transition-colors">
            Official Specs
            <CaretDown className="w-3 h-3 text-zinc-500" />
          </a>
          <a href="#code" className="flex items-center gap-1 hover:text-white transition-colors">
            Code Templates
          </a>
        </nav>

        {/* Right Action Button: Guide Hub CTA */}
        <div className="flex items-center gap-4">
          <a
            href="https://platform.deepseek.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-white transition-colors hidden md:inline-block font-mono"
          >
            Official Site ↗
          </a>
          <a
            href="#guides"
            className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded bg-zinc-100 text-zinc-950 font-mono text-xs font-semibold hover:bg-white transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-950" />
            <span>Start Reading</span>
          </a>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-transparent py-10 mt-16 text-xs text-zinc-500 font-mono">
      <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-zinc-300 font-semibold font-sans">DeepSeek V4 Guide</span> &copy; {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-6 text-zinc-400 flex-wrap">
            <a href="#guides" className="hover:text-zinc-200 transition-colors">Guides</a>
            <a href="#specs" className="hover:text-zinc-200 transition-colors">Specs</a>
            <a href="#code" className="hover:text-zinc-200 transition-colors">Code</a>
            <Link href="/about" className="hover:text-zinc-200 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-zinc-200 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-200 transition-colors">Terms</Link>
            <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">Official API ↗</a>
            <a
              href="https://www.effectivecpmnetwork.com/guernhf9?key=00aad196365b56f8fc060676df42ed06"
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="hover:text-zinc-200 transition-colors"
            >
              Sponsored
            </a>
          </div>
        </div>
        <p className="text-[11px] text-zinc-600 leading-relaxed max-w-2xl">
          An independent, researched guide to DeepSeek V4 Flash &amp; Pro. Not affiliated with DeepSeek or any model
          provider. Prices and specs change — verify against official sources.
        </p>
      </div>
    </footer>
  );
}

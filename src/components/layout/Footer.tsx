export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-transparent py-10 mt-16 text-xs text-zinc-500 font-mono">
      <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-zinc-300 font-semibold font-sans">DeepSeek V4 Guide</span> &copy; {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-6 text-zinc-400">
          <a href="#guides" className="hover:text-zinc-200 transition-colors">Guides</a>
          <a href="#specs" className="hover:text-zinc-200 transition-colors">Specs</a>
          <a href="#code" className="hover:text-zinc-200 transition-colors">Code</a>
          <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">Official API ↗</a>
        </div>
      </div>
    </footer>
  );
}

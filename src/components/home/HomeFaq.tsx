import Link from "next/link";

// 首页 FAQ — 静态可爬取（非手风琴），答案均来自站内已核实指南
const faqs = [
  {
    q: "Is DeepSeek V4 Flash open source?",
    a: "Yes. DeepSeek released the V4 Flash weights (284B total / 13B active, 1M context) under the MIT license on Hugging Face on July 31, 2026. You can download them for free or call them through the official API.",
    href: "/guides/flash-huggingface",
    label: "Download the weights",
  },
  {
    q: "How much does DeepSeek V4 Flash cost?",
    a: "The official API charges $0.14 per 1M input tokens and $0.28 per 1M output tokens, with a roughly 98% discount on context-cache hits ($0.0028 / 1M). That makes it dramatically cheaper than GPT-5.5 or Claude for most workloads.",
    href: "/guides/flash-pricing",
    label: "Full pricing guide",
  },
  {
    q: "Does DeepSeek V4 Flash support image input?",
    a: "No — V4 Flash is text-only. For image support, community setups pair it with Xiaomi MiMo V2.5 in the vision slot, which bills at the same $0.14 / $0.28 per 1M rate.",
    href: "/guides/hermes-setup",
    label: "Vision setup guide",
  },
  {
    q: "What base URL do I use for the DeepSeek API?",
    a: "Use https://api.deepseek.com. It is OpenAI-compatible (the /v1 prefix is optional), and DeepSeek also exposes an Anthropic-compatible endpoint at https://api.deepseek.com/anthropic for Claude Code and similar tools.",
    href: "/guides/flash-api-setup",
    label: "API setup guide",
  },
  {
    q: "Can I run DeepSeek V4 Flash on my own hardware?",
    a: "Yes, though it is heavy. The FP4/FP8 weights are about 160 GB, so you realistically need a multi-GPU setup (two RTX 3090s or better) or a large unified-memory machine. The official vLLM recipe is the recommended path.",
    href: "/guides/flash-model-size",
    label: "VRAM & model size",
  },
  {
    q: "Is this site run by DeepSeek?",
    a: "No. DeepSeek V4 Guide is an independent, fan-made resource. We are not affiliated with or endorsed by DeepSeek. Always check status.deepseek.com and the official docs for production-critical information.",
    href: "/about",
    label: "About this site",
  },
];

export function HomeFaq() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="pt-8 border-t border-zinc-800/80">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <span className="text-xs font-mono text-zinc-600">QUICK ANSWERS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="p-5 rounded-lg bg-[#0e0e11] border border-zinc-800/80">
              <h3 className="text-sm font-semibold text-zinc-100 font-sans mb-2">{faq.q}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-3">{faq.a}</p>
              <Link
                href={faq.href}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                {faq.label} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

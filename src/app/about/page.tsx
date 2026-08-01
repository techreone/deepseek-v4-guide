import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | DeepSeek V4 Guide",
  description:
    "DeepSeek V4 Guide is an independent, researched tutorial site helping developers and beginners use DeepSeek V4 Flash & Pro.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen text-zinc-100 pb-20">
      <div className="border-b border-zinc-800/80 pt-16 pb-10">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            ABOUT
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans mt-4 mb-3">
            About DeepSeek V4 Guide
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">
            An independent tutorial hub for DeepSeek V4 Flash &amp; Pro — built for people who want to actually{" "}
            <em>use</em> the model, not just read about it.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-10 flex flex-col gap-8 text-sm text-zinc-300 leading-relaxed font-sans">
        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">What this site is</h2>
          <p>
            DeepSeek V4 Guide is a step-by-step tutorial site covering the DeepSeek V4 family: what the models are,
            how to access them through the official API and third-party tools, what they cost, how they benchmark, and
            how to run them locally. We focus on practical, usable answers — API setup, pricing math, agent integration,
            and local deployment — written as complete walkthroughs rather than marketing summaries.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Who this site is for</h2>
          <p className="mb-2">
            We write for two distinct audiences, and every guide is tagged so you know which one it serves:
          </p>
          <ul className="list-none flex flex-col gap-2">
            <li>
              <span className="text-cyan-400 font-mono text-xs">BEGINNER</span> — people who do not yet know the model
              names, let alone how APIs work. If you have never used a large language model, start with the{" "}
              <Link href="/guides/beginner-guide" className="text-cyan-400 hover:underline">beginner guide</Link>.
            </li>
            <li>
              <span className="text-cyan-400 font-mono text-xs">DEVELOPER</span> — engineers who already know what an
              API key is and want exact base URLs, environment variables, model slugs, and code samples. See{" "}
              <Link href="/guides/flash-api-setup" className="text-cyan-400 hover:underline">API setup</Link> or{" "}
              <Link href="/guides/flash-ide" className="text-cyan-400 hover:underline">IDE integration</Link>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">How we research</h2>
          <p className="mb-2">
            Each guide is assembled from primary sources — the official DeepSeek API documentation, the arXiv technical
            report, official model cards on Hugging Face, and release changelogs — cross-checked against independent
            analysis where available. Every factual claim carries a numbered citation that links to the reference at
            the bottom of the page, so you can verify it yourself.
          </p>
          <ul className="list-none flex flex-col gap-2">
            <li>Prices, model specs, and benchmark scores are labeled with their as-of date and marked when vendor-reported.</li>
            <li>We do not fabricate numbers. Unverified claims are either flagged as reported/rumor or omitted.</li>
            <li>We link out to the source rather than paraphrasing it into an unverifiable claim.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">What is inside a guide</h2>
          <p>
            Every guide follows the same structure: an overview box that answers the question in one paragraph, numbered
            steps that walk through the actual process, tables for specs and pricing where numbers matter, code blocks
            you can copy, honest notes about pitfalls, and a references list with the sources used. Guides cross-link to
            each other so you can follow a topic end to end — for example from{" "}
            <Link href="/guides/flash-pricing" className="text-cyan-400 hover:underline">pricing</Link> to{" "}
            <Link href="/guides/flash-huggingface" className="text-cyan-400 hover:underline">running the model locally</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Independence</h2>
          <p>
            This site is not affiliated with or endorsed by DeepSeek, Anthropic, OpenAI, or any model provider. It is an
            independent resource. For official information, always check{" "}
            <a href="https://api-docs.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              DeepSeek&rsquo;s official API docs
            </a>{" "}
            and{" "}
            <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              platform.deepseek.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Getting started</h2>
          <p className="mb-2">Not sure where to begin? Here are the most useful starting points:</p>
          <ul className="list-none flex flex-col gap-1.5">
            <li>
              <Link href="/guides/beginner-guide" className="text-cyan-400 hover:underline">Why DeepSeek V4 Is the Best Cheap AI Right Now</Link>{" "}
              — for total beginners
            </li>
            <li>
              <Link href="/guides/deepseek-v4-flash" className="text-cyan-400 hover:underline">What Is DeepSeek V4 Flash?</Link>{" "}
              — the flagship model overview
            </li>
            <li>
              <Link href="/guides/flash-api-setup" className="text-cyan-400 hover:underline">DeepSeek V4 Flash API Setup</Link>{" "}
              — first API call
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

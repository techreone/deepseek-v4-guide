import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | DeepSeek V4 Guide",
  description:
    "Terms of use for DeepSeek V4 Guide: informational content, no warranties, and disclaimer of affiliation.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen text-zinc-100 pb-20">
      <div className="border-b border-zinc-800/80 pt-16 pb-10">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            LEGAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans mt-4 mb-3">
            Terms of Use
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">Effective: August 1, 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-10 flex flex-col gap-8 text-sm text-zinc-300 leading-relaxed font-sans">
        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Informational content only</h2>
          <p>
            The content on DeepSeek V4 Guide is provided for general informational and educational purposes. It is not
            professional, legal, financial, or technical advice for any specific situation. Model capabilities, prices,
            and API behavior change frequently; verify current details against the official provider before making
            decisions.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">No affiliation</h2>
          <p>
            This site is an independent resource and is not affiliated with, endorsed by, or sponsored by DeepSeek,
            Anthropic, OpenAI, or any other model provider. Trademarks and product names belong to their respective
            owners and are used for identification only.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">No warranties</h2>
          <p>
            We strive for accuracy but make no warranties, express or implied, about the completeness or accuracy of the
            content. We are not liable for any damages arising from the use of this site or reliance on its content. You
            are responsible for how you use AI services, including any API keys or account credentials.
          </p>
        </section>
      </div>
    </main>
  );
}

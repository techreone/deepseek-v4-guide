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
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Acceptance of these terms</h2>
          <p>
            By accessing or using DeepSeek V4 Guide, you agree to these Terms of Use. If you do not agree, please do not
            use the site. We may update these terms from time to time; the &ldquo;Effective&rdquo; date at the top of
            this page indicates the latest revision. Continued use of the site after a change means you accept the
            updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Informational content only</h2>
          <p>
            The content on DeepSeek V4 Guide is provided for general informational and educational purposes. It is not
            professional, legal, financial, or technical advice for any specific situation. Model capabilities, prices,
            and API behavior change frequently; verify current details against the official provider before making
            decisions or building production systems.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">No affiliation</h2>
          <p>
            This site is an independent resource and is not affiliated with, endorsed by, or sponsored by DeepSeek,
            Anthropic, OpenAI, or any other model provider. Trademarks and product names belong to their respective
            owners and are used for identification only. Nothing on this site should be read as an official statement
            from any model provider.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Your use of third-party services</h2>
          <p>
            Some guides describe how to sign up for, pay for, or connect to third-party services such as the DeepSeek
            API, OpenRouter, OpenCode Go, or Hugging Face. When you use those services, you enter into a separate
            agreement with the respective provider, and their terms and privacy policies govern that relationship. We
            are not a party to those agreements and are not responsible for the behavior, pricing, uptime, or policies
            of third-party providers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Intellectual property</h2>
          <p>
            The original written content, structure, and code samples on this site are provided for your personal and
            professional use. You may reference, quote, and link to this content with attribution. Systematic
            republishing, scraping, or reselling of the site&rsquo;s content as your own is not permitted. Product names,
            logos, and trademarks mentioned on the site remain the property of their owners.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">No warranties</h2>
          <p>
            We strive for accuracy but make no warranties, express or implied, about the completeness, accuracy,
            reliability, or fitness-for-purpose of the content. Code samples are provided &ldquo;as is&rdquo; without
            warranty of any kind, and you should test them in your own environment before relying on them. AI models,
            APIs, and prices change quickly; what was true when a guide was written may be outdated by the time you read
            it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any direct, indirect, incidental, or
            consequential damages arising from the use of this site, reliance on its content, or use of any third-party
            service linked from it. This includes, without limitation, API costs, data loss, or lost profits. You are
            responsible for how you use AI services, including any API keys, tokens, or account credentials.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Governing law</h2>
          <p>
            These terms are governed by the laws of the jurisdiction in which the site operator is located, without
            regard to conflict-of-law principles. If any provision is found unenforceable, the remaining provisions
            continue in full force and effect.
          </p>
        </section>
      </div>
    </main>
  );
}

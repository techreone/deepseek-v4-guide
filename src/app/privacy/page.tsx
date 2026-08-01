import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DeepSeek V4 Guide",
  description:
    "DeepSeek V4 Guide privacy policy: what data this site collects, how it is used, and how to contact us.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen text-zinc-100 pb-20">
      <div className="border-b border-zinc-800/80 pt-16 pb-10">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            LEGAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans mt-4 mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans">Effective: August 1, 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-10 flex flex-col gap-8 text-sm text-zinc-300 leading-relaxed font-sans">
        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">What we collect</h2>
          <p>
            This site is a static, server-rendered website hosted on Vercel. We do not run our own analytics trackers
            or ad scripts that collect personal data. Standard server logs (IP address, user agent, requested page) may
            be retained briefly by our hosting provider for security and operational purposes, as is customary for any
            web host.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Cookies</h2>
          <p>
            This site does not set tracking cookies. Your browser and our hosting provider may set or use technically
            necessary cookies or caching, but no personal data is collected for advertising or profiling.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Third-party links</h2>
          <p>
            Our guides link to external services such as the DeepSeek API platform, Hugging Face, OpenRouter, and
            OpenCode. These services have their own privacy policies, and we encourage you to review them. Any API keys
            or account data you use with those services are managed by you and those providers — never by this site.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Contact</h2>
          <p>Questions about this policy? Contact us via the GitHub repository for this project.</p>
        </section>
      </div>
    </main>
  );
}

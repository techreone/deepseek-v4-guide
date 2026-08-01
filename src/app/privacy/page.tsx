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
            This site is a static, server-rendered website hosted on Vercel. We do not sell, rent, or share personal
            data with third parties for advertising. The data handled on this site falls into two categories: hosting
            logs and optional analytics, described below.
          </p>
          <p className="mt-3">
            Standard server logs (IP address, user agent, requested page, and timestamp) may be retained briefly by our
            hosting provider for security and operational purposes, as is customary for any web host. These logs are
            used to detect abuse, diagnose errors, and keep the service running.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Analytics (Microsoft Clarity)</h2>
          <p>
            This site uses Microsoft Clarity to understand how visitors interact with the pages. Clarity records
            behavioral signals such as mouse movements, clicks, scrolls, and session activity, and may associate them
            with a pseudonymous identifier. It can also capture data such as your approximate location, device type,
            browser, and operating system. This information is used to improve navigation, find confusing content, and
            measure which guides are useful. Clarity does not receive API keys, passwords, or any content you type into
            third-party services you visit from our links. You can learn more about how Microsoft processes Clarity
            data and how to opt out at{" "}
            <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              Microsoft&rsquo;s Clarity privacy documentation
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Data we do not collect</h2>
          <ul className="list-none flex flex-col gap-2">
            <li>We do not operate user accounts, logins, or profiles.</li>
            <li>We do not run advertising networks or ad-targeting trackers.</li>
            <li>We do not ask for — and never see — your API keys, credentials, or billing information.</li>
            <li>We do not sell or share your data with data brokers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Cookies</h2>
          <p>
            This site does not set tracking cookies for advertising or profiling. Clarity and our hosting provider may
            set technically necessary cookies or use local storage for session and analytics purposes. You can block or
            delete cookies in your browser settings without breaking the site&rsquo;s core functionality.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Third-party services</h2>
          <p>
            Our guides link to external services such as the DeepSeek API platform, Hugging Face, OpenRouter, and
            OpenCode. These services have their own privacy policies, and we encourage you to review them. Any API keys
            or account data you use with those services are managed by you and those providers — never by this site.
            When you follow an external link, the destination site may set its own cookies or collect data under its own
            policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white font-sans mb-2">Changes to this policy</h2>
          <p>
            We may update this policy as the site evolves or as legal obligations change. The &ldquo;Effective&rdquo;
            date at the top of this page reflects the latest revision. Significant changes will be reflected in the
            updated policy text.
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

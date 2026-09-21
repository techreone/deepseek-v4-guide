import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClarityTracker } from "@/components/layout/ClarityTracker";
import { GA4Tracker } from "@/components/layout/GA4Tracker";
import AdsterraBanner from "@/components/ads/AdsterraBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelFont = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deepseekv4guide.org"),
  title: {
    default: "DeepSeek V4 Guide - Step-by-Step Tutorials & API Access Guide",
    template: "%s | DeepSeek V4 Guide",
  },
  description:
    "The complete step-by-step guide to DeepSeek V4 Flash & Pro: official API setup, pricing, benchmarks, OpenCode, OpenRouter, Cursor, Claude Code, and local deployment.",
  openGraph: {
    siteName: "DeepSeek V4 Guide",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${pixelFont.variable} antialiased bg-[#070709] text-charcoal selection:bg-zinc-800 selection:text-zinc-100 font-sans flex flex-col min-h-[100dvh] relative pb-14 md:pb-0`}>
        {/* Adsterra Popunder（每页一个，注入 head 尽早注册） */}
        <Script
          strategy="beforeInteractive"
          src="https://pl30876528.effectivecpmnetwork.com/a5/1c/49/a51c4976537750022f212c723892c88b.js"
        />
        {/* WebSite + Organization structured data (brand EEAT) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "DeepSeek V4 Guide",
                  url: "https://deepseekv4guide.org/",
                  description:
                    "Step-by-step tutorials for using DeepSeek V4 Flash & Pro: API setup, pricing, benchmarks, and local deployment.",
                  inLanguage: "en",
                },
                {
                  "@type": "Organization",
                  name: "DeepSeek V4 Guide",
                  url: "https://deepseekv4guide.org/",
                },
              ],
            }),
          }}
        />
        {/* Document-level Grid Overlay that scrolls 1:1 with content */}
        <div className="grid-pattern" aria-hidden="true" />
        <Header />
        <ClarityTracker />
        <GA4Tracker />
        <main className="flex-1 flex flex-col relative z-10">
          {children}
        </main>
        <Footer />

        {/* Adsterra 移动端 Sticky 底部 320x50（仅小屏显示） */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-[#070709]/95 border-t border-zinc-800/80 py-1 shadow-2xl backdrop-blur-md md:hidden">
          <AdsterraBanner
            idKey="f90f744aec80e42cfd3ba9a7670d48c5"
            width={320}
            height={50}
            label=""
            className="!my-0 !p-0 !border-0 !bg-transparent !shadow-none"
          />
        </div>

        {/* Adsterra Social Bar（body 底部） */}
        <Script src="https://pl30876531.effectivecpmnetwork.com/56/f3/8d/56f38d1a4b3cf6f32693e9f543330fe2.js" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
  title: "DeepSeek V4 Guide - Step-by-Step Tutorials & API Access Guide",
  description: "An independent tutorial hub helping developers and beginners access, cost-optimize, and integrate DeepSeek V4 Flash.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${pixelFont.variable} antialiased bg-[#070709] text-charcoal selection:bg-zinc-800 selection:text-zinc-100 font-sans flex flex-col min-h-[100dvh] relative`}>
        {/* Document-level Grid Overlay that scrolls 1:1 with content */}
        <div className="grid-pattern" aria-hidden="true" />
        <Header />
        <main className="flex-1 flex flex-col relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

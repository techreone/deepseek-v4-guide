"use client";

import { useState } from "react";
import { HeroHeader } from "@/components/home/HeroHeader";
import { HarnessTracker } from "@/components/home/HarnessTracker";
import { MainContent } from "@/components/home/MainContent";
import { HomeFaq } from "@/components/home/HomeFaq";
import AdsterraBanner from "@/components/ads/AdsterraBanner";
import AdsterraNative from "@/components/ads/AdsterraNative";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100">
      <HeroHeader />
      <HarnessTracker />

      {/* Adsterra Native Banner（Hero 下方，每页一次） */}
      <AdsterraNative label="Sponsored" />

      <MainContent activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Adsterra 300x250（FAQ 上方） */}
      <AdsterraBanner
        idKey="b87b359765291fda5ec291c153acd977"
        width={300}
        height={250}
        label="Sponsored"
      />

      <HomeFaq />
    </div>
  );
}

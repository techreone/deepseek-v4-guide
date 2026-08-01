"use client";

import { useState } from "react";
import { HeroHeader } from "@/components/home/HeroHeader";
import { HarnessTracker } from "@/components/home/HarnessTracker";
import { MainContent } from "@/components/home/MainContent";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100">
      <HeroHeader />
      <HarnessTracker />
      <MainContent activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
}

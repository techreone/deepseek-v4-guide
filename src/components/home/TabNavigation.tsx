"use client";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: "overview", label: "核心介绍 & 主要功能" },
    { id: "api-code", label: "API 快速接入 (代码范例)" },
    { id: "cost-calculator", label: "购买策略 & 成本算盘" },
    { id: "prompts", label: "Prompt 调优建议" },
    { id: "faq", label: "常见问题 FAQ" },
  ];

  return (
    <div className="sticky top-16 z-40 w-full border-b border-border-subtle bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex overflow-x-auto no-scrollbar gap-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const el = document.getElementById(tab.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`py-3.5 text-xs sm:text-sm font-medium font-sans whitespace-nowrap relative transition-colors ${
                  isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

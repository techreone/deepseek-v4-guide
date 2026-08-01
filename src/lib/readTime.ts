import type { GuideContent } from "@/data/guides/types";

// 阅读速度假设：200 词/分钟（行业常用标准）
const WORDS_PER_MINUTE = 200;

function countWords(s?: string): number {
  if (!s) return 0;
  return s.split(/\s+/).filter(Boolean).length;
}

/** 根据教程实际内容计算阅读时间，跟随内容变化，非硬编码 */
export function computeReadTime(guide: GuideContent): string {
  let words = 0;

  for (const step of guide.steps) {
    words += countWords(step.title);
    words += countWords(step.description);
    step.paragraphs?.forEach((p) => (words += countWords(p)));
    step.list?.forEach((li) => (words += countWords(li)));
    words += countWords(step.note);
    words += countWords(step.code);
    if (step.table) {
      step.table.headers.forEach((h) => (words += countWords(h)));
      step.table.rows.forEach((row) => row.forEach((cell) => (words += countWords(cell))));
    }
  }

  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} MIN READ`;
}

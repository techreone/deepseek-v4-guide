import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideDetail } from "@/components/guide/GuideDetail";
import { getGuide, guidesDatabase } from "@/data/guides";

export async function generateStaticParams() {
  return Object.keys(guidesDatabase).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 每页独立 TDK：title 关键词开头（一页一词），description ≤160 字符
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.summary,
    alternates: {
      canonical: `https://deepseekv4guide.org/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.summary,
      url: `https://deepseekv4guide.org/guides/${guide.slug}`,
      type: "article",
      siteName: "DeepSeek V4 Guide",
    },
    twitter: {
      card: "summary",
      title: guide.title,
      description: guide.summary,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  return <GuideDetail guide={guide} />;
}

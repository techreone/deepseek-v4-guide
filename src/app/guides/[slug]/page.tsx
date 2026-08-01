import { notFound } from "next/navigation";
import { GuideDetail } from "@/components/guide/GuideDetail";
import { getGuide, guidesDatabase } from "@/data/guides";

export async function generateStaticParams() {
  return Object.keys(guidesDatabase).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  return <GuideDetail guide={guide} />;
}

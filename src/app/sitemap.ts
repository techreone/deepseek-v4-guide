// output: 'export'（Cloudflare Pages 静态托管）要求 sitemap route 显式静态化
export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { getAllGuides } from "@/data/guides";

const BASE_URL = "https://deepseekv4guide.org";
const LAST_MOD = "2026-09-11";

export default function sitemap(): MetadataRoute.Sitemap {
  const guideUrls: MetadataRoute.Sitemap = getAllGuides().map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: LAST_MOD,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: LAST_MOD,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...guideUrls,
  ];
}

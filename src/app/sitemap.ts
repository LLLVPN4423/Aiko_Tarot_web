import type { MetadataRoute } from "next";
import { majorArcana } from "@/data/major-arcana";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/library", "/journal", "/about"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
  }));
  const cards = majorArcana.map((c) => ({
    url: `${base}/library/${c.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...cards];
}

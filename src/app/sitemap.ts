import type { MetadataRoute } from "next";
import { allTarotCards } from "@/data/deck-index";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/reading", "/library", "/journal", "/about"].map(
    (path) => ({
      url: `${base}${path || "/"}`,
      lastModified: new Date(),
    }),
  );
  const cards = allTarotCards.map((c) => ({
    url: `${base}/library/${c.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...cards];
}

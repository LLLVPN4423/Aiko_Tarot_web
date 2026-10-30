"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { TarotCard } from "@/data/deck-index";
import type { Suit } from "@/data/deck-types";
import { useI18n } from "@/lib/i18n";
import { TarotCardFace } from "./TarotCardFace";

type FilterId = "all" | "major" | Suit;

const filters: { id: FilterId; vi: string; en: string }[] = [
  { id: "all", vi: "Tất cả", en: "All" },
  { id: "major", vi: "Major Arcana", en: "Major Arcana" },
  { id: "wands", vi: "Cung Thiên Thể", en: "Celestial Wands" },
  { id: "cups", vi: "Cốc Nguyệt", en: "Lunar Cups" },
  { id: "swords", vi: "Kiếm Thiên Tinh", en: "Astral Swords" },
  { id: "pentacles", vi: "Xu Vàng", en: "Golden Pentacles" },
];

export function LibraryGrid({ cards }: { cards: TarotCard[] }) {
  const { locale } = useI18n();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      if (filter === "major" && c.arcana !== "major") return false;
      if (filter !== "all" && filter !== "major" && c.suit !== filter) return false;
      const q = query.toLowerCase().trim();
      if (!q) return true;
      return (
        c.name[locale].toLowerCase().includes(q) ||
        c.name.en.toLowerCase().includes(q) ||
        c.keywords[locale].some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [cards, filter, query, locale]);

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3 py-1.5 text-xs transition ${
              filter === f.id
                ? "bg-[rgba(198,161,91,0.2)] text-[var(--color-warm-ivory)]"
                : "border border-white/10 text-[var(--color-muted-text)] hover:border-[var(--color-antique-gold)]/35"
            }`}
          >
            {locale === "vi" ? f.vi : f.en}
          </button>
        ))}
      </div>
      <input
        type="search"
        placeholder={locale === "vi" ? "Tìm lá bài..." : "Search cards..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-4 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-[var(--color-warm-ivory)]"
      />
      <p className="mt-2 text-xs text-[var(--color-muted-text)]">
        {filtered.length} / {cards.length}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((card) => (
          <Link
            key={card.slug}
            href={`/library/${card.slug}`}
            className="group rounded-xl border border-white/10 bg-black/20 p-2 transition hover:-translate-y-0.5 hover:border-[var(--color-antique-gold)]/40"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              <TarotCardFace card={card} compact />
            </div>
            <p className="mt-2 text-center font-serif text-xs text-[var(--color-soft-gold)] group-hover:text-[var(--color-warm-ivory)]">
              {card.name[locale]}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

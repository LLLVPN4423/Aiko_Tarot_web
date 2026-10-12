"use client";

import { useState } from "react";
import Link from "next/link";
import type { MajorArcanaCard } from "@/data/major-arcana";
import { useI18n } from "@/lib/i18n";
import { TarotCardFace } from "./TarotCardFace";

export function LibraryGrid({ cards }: { cards: MajorArcanaCard[] }) {
  const { locale } = useI18n();
  const [query, setQuery] = useState("");

  const filtered = cards.filter((c) => {
    const q = query.toLowerCase();
    if (!q) return true;
    return (
      c.name[locale].toLowerCase().includes(q) ||
      c.name.en.toLowerCase().includes(q) ||
      c.keywords[locale].some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <input
        type="search"
        placeholder={locale === "vi" ? "Tìm lá bài..." : "Search cards..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-6 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm"
      />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((card) => (
          <Link
            key={card.id}
            href={`/library/${card.slug}`}
            className="group rounded-xl border border-white/10 bg-white/5 p-2 transition hover:border-cyan-400/40"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <TarotCardFace card={card} compact />
            </div>
            <p className="mt-2 text-center font-serif text-xs text-amber-100 group-hover:text-cyan-100">
              {card.name[locale]}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

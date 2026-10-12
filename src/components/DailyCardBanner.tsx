"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { majorArcana } from "@/data/major-arcana";
import { getDailyDraw, getOrCreateDailySalt, type DailyDraw } from "@/lib/daily-card";
import { useI18n } from "@/lib/i18n";
import { GlassPanel } from "./GlassPanel";
import { TarotCardFace } from "./TarotCardFace";

export function DailyCardBanner() {
  const { locale, t } = useI18n();
  const [draw, setDraw] = useState<DailyDraw | null>(null);

  useEffect(() => {
    setDraw(getDailyDraw({ salt: getOrCreateDailySalt() }));
  }, []);

  const card = draw ? majorArcana.find((c) => c.id === draw.cardId) : null;
  if (!draw || !card) return null;

  return (
    <GlassPanel className="mx-auto mb-6 max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative mx-auto h-36 w-24 shrink-0 sm:mx-0">
          <TarotCardFace card={card} reversed={draw.reversed} compact />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs uppercase tracking-widest text-cyan-300/80">
            {t("Lá bài hôm nay", "Daily card")} · {draw.date}
          </p>
          <h2 className="font-serif text-lg text-amber-100">
            {card.name[locale]}
            {draw.reversed && (
              <span className="ml-2 text-sm text-rose-300">
                ({t("ngược", "reversed")})
              </span>
            )}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm text-slate-400">
            {draw.reversed ? card.reversed[locale] : card.upright[locale]}
          </p>
          <Link
            href={`/library/${card.slug}`}
            className="mt-3 inline-block text-sm text-cyan-300 underline"
          >
            {t("Xem chi tiết lá bài", "View card details")}
          </Link>
        </div>
      </div>
    </GlassPanel>
  );
}

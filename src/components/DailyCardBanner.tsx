"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { cardById } from "@/data/deck-index";
import { getDailyDraw, getOrCreateDailySalt, type DailyDraw } from "@/lib/daily-card";
import { useI18n } from "@/lib/i18n";
import { GlassPanel } from "./GlassPanel";
import { TarotCardFace } from "./TarotCardFace";

const subscribeNoop = () => () => {};

let cachedDraw: DailyDraw | null = null;
let drawHydrated = false;

function readDailyDraw(): DailyDraw | null {
  if (typeof window === "undefined") return null;
  if (!drawHydrated) {
    cachedDraw = getDailyDraw({ salt: getOrCreateDailySalt() });
    drawHydrated = true;
  }
  return cachedDraw;
}

export function DailyCardBanner() {
  const { locale, t } = useI18n();
  const draw = useSyncExternalStore(subscribeNoop, readDailyDraw, () => null);

  const card = draw ? cardById(draw.cardId) : null;
  if (!draw || !card) return null;

  return (
    <GlassPanel className="mx-auto mb-6 max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative mx-auto h-36 w-24 shrink-0 sm:mx-0">
          <TarotCardFace card={card} reversed={draw.reversed} compact />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs uppercase tracking-widest text-[var(--color-antique-gold)]">
            {t("Lá bài hôm nay", "Daily card")} · {draw.date}
          </p>
          <h2 className="font-serif text-lg text-[var(--color-warm-ivory)]">
            {card.name[locale]}
            {draw.reversed && (
              <span className="ml-2 text-sm text-rose-300">
                ({t("ngược", "reversed")})
              </span>
            )}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm text-[var(--color-muted-text)]">
            {draw.reversed ? card.reversed[locale] : card.upright[locale]}
          </p>
          <Link
            href={`/library/${card.slug}`}
            className="mt-3 inline-block text-sm text-[var(--color-soft-gold)] underline"
          >
            {t("Xem chi tiết lá bài", "View card details")}
          </Link>
        </div>
      </div>
    </GlassPanel>
  );
}

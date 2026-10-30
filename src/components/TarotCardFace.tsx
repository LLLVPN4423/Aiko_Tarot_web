"use client";

import Image from "next/image";
import type { TarotCard } from "@/data/deck-index";
import { useI18n } from "@/lib/i18n";
import { DesignedMinorFace } from "./DesignedMinorFace";

type Props = {
  card: TarotCard;
  reversed?: boolean;
  compact?: boolean;
};

export function TarotCardFace({ card, reversed, compact }: Props) {
  const { locale } = useI18n();

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-lg border border-[var(--color-antique-gold)]/35 bg-[var(--color-deep-cosmic)] shadow-[inset_0_0_24px_rgba(0,0,0,0.35)] ${
        reversed ? "rotate-180" : ""
      }`}
    >
      {card.imagePath ? (
        <Image
          src={card.imagePath}
          alt={card.name[locale]}
          fill
          className="object-cover"
          sizes={compact ? "120px" : "(max-width:768px) 40vw, 220px"}
        />
      ) : card.arcana === "minor" ? (
        <DesignedMinorFace card={card} compact={compact} />
      ) : (
        <div className="flex h-full flex-col p-3">
          <div className="relative mx-auto mt-1 aspect-square w-[52%] overflow-hidden rounded-full border-2 border-[var(--color-antique-gold)]/40">
            <Image
              src="/pet/celestial-mascot.png"
              alt=""
              fill
              className="scale-110 object-cover"
              sizes="120px"
            />
          </div>
          <p className="mt-2 text-center font-serif text-[9px] uppercase tracking-[0.2em] text-[var(--color-muted-lavender)]">
            {String(card.id).padStart(2, "0")}
          </p>
          <p
            className={`text-center font-serif font-semibold leading-tight text-[var(--color-warm-ivory)] ${
              compact ? "text-[10px]" : "text-xs"
            }`}
          >
            {card.name[locale]}
          </p>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[var(--color-obsidian)]/40 to-transparent" />
    </div>
  );
}

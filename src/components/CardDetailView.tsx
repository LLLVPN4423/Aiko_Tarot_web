"use client";

import Image from "next/image";
import type { MajorArcanaCard } from "@/data/major-arcana";
import { useI18n } from "@/lib/i18n";
import { GlassPanel } from "./GlassPanel";
import { TarotCardFace } from "./TarotCardFace";

type Props = {
  card: MajorArcanaCard;
  reversed?: boolean;
};

export function CardDetailView({ card, reversed }: Props) {
  const { locale, t } = useI18n();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-xl shadow-[0_0_40px_rgba(251,191,36,0.2)]">
        {card.imagePath ? (
          <Image
            src={card.imagePath}
            alt={card.name[locale]}
            fill
            className={`object-cover ${reversed ? "rotate-180" : ""}`}
            sizes="320px"
            priority
          />
        ) : (
          <TarotCardFace card={card} reversed={reversed} />
        )}
      </div>
      <GlassPanel>
        <h1 className="font-serif text-2xl text-amber-100">{card.name[locale]}</h1>
        <p className="mt-2 text-sm text-cyan-200/80">
          {card.keywords[locale].join(" · ")}
        </p>
        <h2 className="mt-6 font-serif text-sm uppercase text-amber-200/90">
          {t("Thuận", "Upright")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {card.upright[locale]}
        </p>
        <h2 className="mt-6 font-serif text-sm uppercase text-amber-200/90">
          {t("Ngược", "Reversed")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {card.reversed[locale]}
        </p>
      </GlassPanel>
    </div>
  );
}

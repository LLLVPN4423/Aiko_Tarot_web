"use client";

import Image from "next/image";
import type { TarotCard } from "@/data/deck-index";
import { useI18n } from "@/lib/i18n";
import { GlassPanel } from "./GlassPanel";
import { TarotCardFace } from "./TarotCardFace";

type Props = {
  card: TarotCard;
  reversed?: boolean;
};

export function CardDetailView({ card, reversed }: Props) {
  const { locale, t } = useI18n();

  const topicBlocks = [
    { key: "love", title: t("Tình cảm", "Love"), body: card.loveMeaning?.[locale] },
    {
      key: "career",
      title: t("Công việc", "Career"),
      body: card.careerMeaning?.[locale],
    },
    {
      key: "growth",
      title: t("Phát triển bản thân", "Personal growth"),
      body: card.personalGrowthMeaning?.[locale],
    },
    {
      key: "spirit",
      title: t("Tâm linh", "Spirituality"),
      body: card.spiritualityMeaning?.[locale],
    },
  ].filter((b) => b.body);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.45)]">
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
        <h1 className="font-serif text-2xl text-[var(--color-warm-ivory)]">
          {card.name[locale]}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted-lavender)]">
          {card.keywords[locale].join(" · ")}
        </p>
        {card.symbolism?.[locale] && (
          <>
            <h2 className="mt-6 font-serif text-sm uppercase text-[var(--color-antique-gold)]">
              {t("Biểu tượng", "Symbolism")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-text)]">
              {card.symbolism[locale]}
            </p>
          </>
        )}
        <h2 className="mt-6 font-serif text-sm uppercase text-[var(--color-antique-gold)]">
          {t("Thuận", "Upright")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-text)]">
          {card.upright[locale]}
        </p>
        <h2 className="mt-6 font-serif text-sm uppercase text-[var(--color-antique-gold)]">
          {t("Ngược", "Reversed")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-text)]">
          {card.reversed[locale]}
        </p>
        {topicBlocks.length > 0 && (
          <>
            <h2 className="mt-8 font-serif text-lg text-[var(--color-soft-gold)]">
              {t("Theo chủ đề", "By topic")}
            </h2>
            <div className="mt-4 space-y-4">
              {topicBlocks.map((b) => (
                <div key={b.key}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-antique-gold)]">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted-text)]">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </GlassPanel>
    </div>
  );
}

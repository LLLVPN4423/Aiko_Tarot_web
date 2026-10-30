"use client";

import type { DeckCard } from "@/lib/deck";
import type { TopicId } from "@/lib/tarot";
import { buildCardSections, buildSynthesis } from "@/lib/interpretation";
import { useI18n } from "@/lib/i18n";
import { GlassPanel } from "./GlassPanel";
import { TarotCardFace } from "./TarotCardFace";

type Props = {
  slots: (DeckCard | null)[];
  positions: string[];
  topic: TopicId;
};

export function ReadingInterpretation({ slots, positions, topic }: Props) {
  const { locale, t } = useI18n();

  const drawn = slots
    .map((s, i) => (s ? { ...s, position: positions[i] ?? "" } : null))
    .filter((s): s is DeckCard & { position: string } => s !== null);

  const synthesis = buildSynthesis({
    cards: drawn.map((d) => ({
      card: d.card,
      reversed: d.reversed,
      position: d.position,
    })),
    topic,
    locale,
    t,
  });

  return (
    <div className="space-y-6">
      <GlassPanel>
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-antique-gold)]">
          {t("Chủ đề đang đọc", "Reading topic")} ·{" "}
          {topic === "love"
            ? t("Tình cảm", "Love")
            : topic === "career"
              ? t("Công việc", "Career")
              : topic === "self"
                ? t("Phát triển", "Growth")
                : topic === "spirituality"
                  ? t("Tâm linh", "Spirituality")
                  : t("Tổng quát", "General")}
        </p>
        <h3 className="mt-2 font-serif text-lg text-[var(--color-soft-gold)]">
          {t("Tổng quan trải bài", "Reading overview")}
        </h3>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[var(--color-warm-ivory)]/90">
          {synthesis.overview}
        </p>
        <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-[var(--color-antique-gold)]">
          {t("Cung truyện", "Story arc")}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-text)]">
          {synthesis.arc}
        </p>
        <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-[var(--color-antique-gold)]">
          {t("Cân bằng năng lượng", "Energy balance")}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-text)]">
          {synthesis.balance}
        </p>
        <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-[var(--color-antique-gold)]">
          {t("Lời khuyên tổng", "Overall counsel")}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-warm-ivory)]/85">
          {synthesis.counsel}
        </p>
      </GlassPanel>

      {drawn.map((d, idx) => {
        const sections = buildCardSections({
          card: d.card,
          reversed: d.reversed,
          positionLabel: d.position,
          topic,
          locale,
          t,
          previous: idx > 0 ? drawn[idx - 1] : null,
          next: idx < drawn.length - 1 ? drawn[idx + 1] : null,
        });
        return (
          <GlassPanel key={d.uid}>
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="relative mx-auto aspect-[2/3] w-36 shrink-0 sm:mx-0 sm:w-44">
                <TarotCardFace card={d.card} reversed={d.reversed} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-antique-gold)]">
                  {d.position}
                  {d.reversed
                    ? ` · ${t("Ngược", "Reversed")}`
                    : ` · ${t("Thuận", "Upright")}`}
                </p>
                <h3 className="mt-1 font-serif text-xl text-[var(--color-warm-ivory)]">
                  {d.card.name[locale]}
                </h3>
                <div className="mt-4 space-y-4">
                  {sections.map((sec) => (
                    <div key={sec.id}>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-antique-gold)]">
                        {sec.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted-text)]">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        );
      })}
    </div>
  );
}

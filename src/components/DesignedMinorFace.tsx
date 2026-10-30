"use client";

import Image from "next/image";
import type { TarotCard } from "@/data/deck-index";
import type { Suit } from "@/data/deck-types";
import { useI18n } from "@/lib/i18n";

const suitTheme: Record<
  Suit,
  { accent: string; glow: string; emblem: string; label: { vi: string; en: string } }
> = {
  wands: {
    accent: "#c6a15b",
    glow: "rgba(198,161,91,0.35)",
    emblem: "✦",
    label: { vi: "CUNG", en: "WANDS" },
  },
  cups: {
    accent: "#a69bbe",
    glow: "rgba(166,155,190,0.4)",
    emblem: "☽",
    label: { vi: "CỐC", en: "CUPS" },
  },
  swords: {
    accent: "#8ba4c7",
    glow: "rgba(139,164,199,0.4)",
    emblem: "✧",
    label: { vi: "KIẾM", en: "SWORDS" },
  },
  pentacles: {
    accent: "#e1c78a",
    glow: "rgba(225,199,138,0.4)",
    emblem: "◎",
    label: { vi: "XU", en: "COINS" },
  },
};

function rankGlyph(slug: string): string {
  const map: Record<string, string> = {
    ace: "I",
    two: "II",
    three: "III",
    four: "IV",
    five: "V",
    six: "VI",
    seven: "VII",
    eight: "VIII",
    nine: "IX",
    ten: "X",
    page: "P",
    knight: "Kn",
    queen: "Q",
  };
  const rank = slug.split("-")[1] ?? "";
  return map[rank] ?? "•";
}

type Props = {
  card: TarotCard;
  compact?: boolean;
};

export function DesignedMinorFace({ card, compact }: Props) {
  const { locale } = useI18n();
  const suit = card.suit ?? "wands";
  const theme = suitTheme[suit];
  const roman = rankGlyph(card.slug);

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 20%, ${theme.glow}, transparent 55%),
          linear-gradient(165deg, #11182b 0%, #0b1020 45%, #080a12 100%)`,
      }}
    >
      {/* Ornamental outer frame */}
      <div
        className="pointer-events-none absolute inset-1.5 rounded-md border"
        style={{ borderColor: `${theme.accent}66` }}
      />
      <div
        className="pointer-events-none absolute inset-2.5 rounded-sm border"
        style={{ borderColor: `${theme.accent}33` }}
      />

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-[18%] top-[22%] h-0.5 w-0.5 rounded-full bg-[var(--color-warm-ivory)]" />
        <div className="absolute right-[22%] top-[30%] h-1 w-1 rounded-full bg-[var(--color-soft-gold)]/80" />
        <div className="absolute bottom-[28%] left-[30%] h-0.5 w-0.5 rounded-full bg-white/70" />
        <div className="absolute right-[28%] bottom-[35%] h-0.5 w-0.5 rounded-full bg-white/50" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center px-2 pt-3">
        <p
          className={`font-serif tracking-[0.25em] ${compact ? "text-[8px]" : "text-[10px]"}`}
          style={{ color: theme.accent }}
        >
          {roman}
        </p>

        <div
          className={`relative mt-2 overflow-hidden rounded-full border-2 ${
            compact ? "h-14 w-14" : "h-20 w-20"
          }`}
          style={{
            borderColor: `${theme.accent}99`,
            boxShadow: `0 0 20px ${theme.glow}`,
          }}
        >
          <Image
            src="/pet/celestial-mascot.png"
            alt=""
            fill
            className="object-cover scale-110"
            sizes={compact ? "56px" : "80px"}
          />
        </div>

        <p
          className={`mt-2 font-serif ${compact ? "text-lg" : "text-2xl"}`}
          style={{ color: theme.accent }}
          aria-hidden
        >
          {theme.emblem}
        </p>

        <p
          className={`mt-1 text-center font-serif font-semibold leading-tight text-[var(--color-warm-ivory)] ${
            compact ? "text-[9px]" : "text-xs"
          }`}
        >
          {card.name[locale]}
        </p>

        <p
          className={`mt-auto mb-2 tracking-[0.3em] ${compact ? "text-[7px]" : "text-[9px]"}`}
          style={{ color: `${theme.accent}cc` }}
        >
          {theme.label[locale]}
        </p>
      </div>

      {/* Bottom ornamental band */}
      <div
        className="relative z-10 h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.accent}88, transparent)`,
        }}
      />
    </div>
  );
}

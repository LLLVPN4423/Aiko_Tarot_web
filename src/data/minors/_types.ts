import type { Locale } from "@/data/major-arcana";
import type { Suit, TarotCardBase } from "@/data/deck-types";

export type MinorCardSpec = {
  rank: string;
  slugRank: string;
  label: Record<Locale, string>;
  keywords: Record<Locale, string[]>;
  upright: Record<Locale, string>;
  reversed: Record<Locale, string>;
  symbolism: Record<Locale, string>;
  love: Record<Locale, string>;
  career: Record<Locale, string>;
  growth: Record<Locale, string>;
  spirit: Record<Locale, string>;
};

export type SuitMeta = {
  suit: Suit;
  startId: number;
  group: Record<Locale, string>;
  groupShort: Record<Locale, string>;
};

export function assembleMinor(
  meta: SuitMeta,
  index: number,
  spec: MinorCardSpec,
): TarotCardBase {
  const id = meta.startId + index;
  const name = {
    vi: `${spec.label.vi} ${meta.group.vi}`,
    en: `${spec.label.en} of ${meta.groupShort.en}`,
  };
  return {
    id,
    slug: `${meta.suit}-${spec.slugRank}`,
    arcana: "minor",
    suit: meta.suit,
    name,
    keywords: spec.keywords,
    upright: spec.upright,
    reversed: spec.reversed,
    symbolism: spec.symbolism,
    loveMeaning: spec.love,
    careerMeaning: spec.career,
    personalGrowthMeaning: spec.growth,
    spiritualityMeaning: spec.spirit,
  };
}

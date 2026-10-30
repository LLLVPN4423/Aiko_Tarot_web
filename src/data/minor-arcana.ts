import type { Locale } from "./major-arcana";
import type { Suit } from "./deck-types";
import { astralSwords } from "./minors/swords";
import { celestialWands } from "./minors/wands";
import { goldenPentacles } from "./minors/pentacles";
import { lunarCups } from "./minors/cups";
import { minorImagePaths } from "./minors/image-paths";

/** 50 minor arcana — full bilingual meanings + topic lenses */
export const minorArcana = [
  ...celestialWands,
  ...lunarCups,
  ...astralSwords,
  ...goldenPentacles,
].map((card) =>
  minorImagePaths[card.slug]
    ? { ...card, imagePath: minorImagePaths[card.slug] }
    : card,
);

const groupLabels: Record<Suit, Record<Locale, string>> = {
  wands: { vi: "Cung Thiên Thể", en: "Celestial Wands" },
  cups: { vi: "Cốc Nguyệt", en: "Lunar Cups" },
  swords: { vi: "Kiếm Thiên Tinh", en: "Astral Swords" },
  pentacles: { vi: "Xu Vàng", en: "Golden Pentacles" },
};

export function minorGroupLabel(suit: Suit, locale: Locale): string {
  return groupLabels[suit][locale];
}

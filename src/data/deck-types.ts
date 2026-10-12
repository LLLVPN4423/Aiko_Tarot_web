import type { Locale } from "@/data/major-arcana";

export type ArcanaType = "major" | "minor";
export type Suit = "wands" | "cups" | "swords" | "pentacles";

export type TarotCardBase = {
  id: number;
  slug: string;
  arcana: ArcanaType;
  name: Record<Locale, string>;
  keywords: Record<Locale, string[]>;
  upright: Record<Locale, string>;
  reversed: Record<Locale, string>;
  imagePath?: string;
  suit?: Suit;
};

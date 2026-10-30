import type { Locale } from "@/data/major-arcana";
import type { ArcanaType, Suit } from "@/data/deck-types";

export type ElementId = "fire" | "water" | "air" | "earth" | "spirit";

export type TraditionId = "rws" | "marseille" | "thoth" | "celestial-cat" | "general";

export type ReversedApproach =
  | "blocked"
  | "internalized"
  | "excessive"
  | "delayed"
  | "shadow";

export type ReadingTopicId =
  | "general"
  | "love"
  | "career"
  | "finance"
  | "self"
  | "family"
  | "spirituality";

export type ReadingDepth = "quick" | "standard" | "deep";

export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type TraditionNote = {
  tradition: TraditionId;
  note: Localized;
};

export type OrientationProfile = {
  core: Localized;
  psychological: Localized;
  emotional: Localized;
  behavioral: Localized;
  opportunities: Localized;
  challenges: Localized;
  advice: Localized;
  outcomes: Localized;
};

export type ReversedProfile = OrientationProfile & {
  /** Preferred approach when context does not override */
  defaultApproach: ReversedApproach;
  approachHints: Record<ReversedApproach, Localized>;
};

export type TopicOrientationCopy = {
  upright: Localized;
  reversed: Localized;
};

export type KnowledgeCard = {
  id: number;
  slug: string;
  arcana: ArcanaType;
  suit?: Suit;
  rank?: string;
  rankValue?: number;
  element: ElementId;
  numerology?: number;
  archetype: LocalizedList;
  keywords: LocalizedList;
  symbolism: Localized;
  traditionalSummary: Localized;
  deckSpecificNote: Localized;
  astrology?: {
    label: Localized;
    tradition: TraditionId;
  };
  upright: OrientationProfile;
  reversed: ReversedProfile;
  topics: Record<ReadingTopicId, TopicOrientationCopy>;
  references: TraditionNote[];
  imagePath?: string;
  name: Localized;
};

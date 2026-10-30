import type { Locale } from "@/data/major-arcana";

export type PositionRole =
  | "core"
  | "past"
  | "present"
  | "future"
  | "situation"
  | "challenge"
  | "advice"
  | "foundation"
  | "conscious"
  | "self"
  | "environment"
  | "hopes_fears"
  | "outcome"
  | "other"
  | "relationship"
  | "mind"
  | "body"
  | "spirit"
  | "opportunity"
  | "obstacle"
  | "direction"
  | "root";

export type SpreadPositionDef = {
  id: string;
  role: PositionRole;
  label: Record<Locale, string>;
  hint: Record<Locale, string>;
  /** Optional relation to other position ids */
  relatesTo?: string[];
  col?: number;
  row?: number;
};

export type SpreadDefinition = {
  id: string;
  /** Parent family for URL / UI grouping */
  family: "single" | "three" | "five" | "celtic";
  label: Record<Locale, string>;
  blurb: Record<Locale, string>;
  purpose: Record<Locale, string>;
  cardCount: number;
  positions: SpreadPositionDef[];
  followUpPrompts: Record<Locale, string[]>;
  layoutCols: number;
};

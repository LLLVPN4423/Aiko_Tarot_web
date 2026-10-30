import type { Locale } from "@/data/major-arcana";
import type { KnowledgeCard, ReadingDepth, ReadingTopicId, ReversedApproach } from "@/data/knowledge/types";
import type { PositionRole } from "@/data/spreads/types";

export type DrawnInput = {
  cardId: number;
  reversed: boolean;
  positionId: string;
  positionLabel: string;
  role: PositionRole;
};

export type QuestionAnalysis = {
  topicHint: ReadingTopicId;
  focus:
    | "decision"
    | "situation"
    | "relationship"
    | "self"
    | "direction"
    | "unclear";
  timeHorizon: "immediate" | "near" | "long" | "unspecified";
  emotionalTone: "anxious" | "hopeful" | "neutral" | "heavy" | "curious";
  clarification?: { vi: string; en: string };
  summary: { vi: string; en: string };
};

export type CardInterpretation = {
  cardId: number;
  slug: string;
  name: { vi: string; en: string };
  reversed: boolean;
  positionId: string;
  positionLabel: string;
  role: PositionRole;
  keywords: string[];
  approach?: ReversedApproach;
  sections: {
    id: string;
    title: { vi: string; en: string };
    body: { vi: string; en: string };
  }[];
  transparency: {
    traditional: { vi: string; en: string };
    position: { vi: string; en: string };
    topic: { vi: string; en: string };
  };
};

export type PatternReport = {
  suitCounts: Record<string, number>;
  elementCounts: Record<string, number>;
  majorCount: number;
  courtCount: number;
  reversedCount: number;
  dominantElement?: string;
  missingElements: string[];
  numberEchoes: number[];
  summary: { vi: string; en: string };
};

export type CombinationHit = {
  id: string;
  a: string;
  b: string;
  theme: { vi: string; en: string };
  meaning: { vi: string; en: string };
  caution?: { vi: string; en: string };
  positions: [string, string];
};

export type ReadingResult = {
  version: 1;
  locale: Locale;
  depth: ReadingDepth;
  topic: ReadingTopicId;
  spreadId: string;
  question: string;
  analyzed: QuestionAnalysis;
  overview: { vi: string; en: string };
  energy: { vi: string; en: string };
  cards: CardInterpretation[];
  patterns: PatternReport;
  combinations: CombinationHit[];
  narrative: { vi: string; en: string };
  guidance: {
    attend: { vi: string; en: string };
    reconsider: { vi: string; en: string };
    avoid: { vi: string; en: string };
    next: { vi: string; en: string };
  };
  reflections: { vi: string; en: string }[];
  ethicsNote: { vi: string; en: string };
  knowledgeSnapshot: { id: number; slug: string }[];
};

export type BuildReadingInput = {
  question: string;
  topic: ReadingTopicId;
  depth: ReadingDepth;
  spreadId: string;
  locale: Locale;
  cards: DrawnInput[];
  knowledge: KnowledgeCard[];
};

import { knowledgeById } from "@/data/knowledge";
import type { KnowledgeCard } from "@/data/knowledge/types";
import { requireSpreadDef } from "@/data/spreads/registry";
import { analyzeQuestion } from "./question";
import { interpretCard } from "./card-context";
import { analyzePatterns } from "./patterns";
import { analyzeCombinations } from "./combinations";
import { buildEnergy, buildNarrative, buildOverview } from "./narrative";
import { buildGuidance, buildReflections, ETHICS_NOTE } from "./advice";
import type { BuildReadingInput, DrawnInput, ReadingResult } from "./types";

export type { ReadingResult, BuildReadingInput, DrawnInput } from "./types";
export type { ReadingDepth, ReadingTopicId } from "@/data/knowledge/types";

export function buildDrawnFromSpread(options: {
  spreadId: string;
  locale: "vi" | "en";
  cards: { cardId: number; reversed: boolean }[];
}): DrawnInput[] {
  const spread = requireSpreadDef(options.spreadId);
  return options.cards.map((c, i) => {
    const pos = spread.positions[i];
    return {
      cardId: c.cardId,
      reversed: c.reversed,
      positionId: pos?.id ?? `p${i}`,
      positionLabel: pos?.label[options.locale] ?? `#${i + 1}`,
      role: pos?.role ?? "core",
    };
  });
}

export function buildReading(input: BuildReadingInput): ReadingResult {
  const spread = requireSpreadDef(input.spreadId);
  if (input.cards.length !== spread.cardCount) {
    // Allow partial only if lengths match positions sliced
  }

  const kbMap = new Map<number, KnowledgeCard>();
  for (const k of input.knowledge) kbMap.set(k.id, k);
  for (const d of input.cards) {
    if (!kbMap.has(d.cardId)) {
      const k = knowledgeById(d.cardId);
      if (k) kbMap.set(d.cardId, k);
    }
  }

  const analyzed = analyzeQuestion(input.question, input.topic);
  const effectiveTopic = input.topic === "general" ? analyzed.topicHint : input.topic;

  const cardInterpretations = input.cards.map((drawn) => {
    const card = kbMap.get(drawn.cardId);
    if (!card) {
      throw new Error(`Missing knowledge for card ${drawn.cardId}`);
    }
    return interpretCard({
      drawn,
      card,
      topic: effectiveTopic,
      depth: input.depth,
      analyzed,
    });
  });

  const patterns = analyzePatterns(input.cards, kbMap);
  const combinations = analyzeCombinations(input.cards, kbMap);
  const overview = buildOverview({
    analyzed,
    cards: cardInterpretations,
    patterns,
    locale: input.locale,
  });
  const energy = buildEnergy({ cards: cardInterpretations, patterns });
  const narrative = buildNarrative({
    cards: cardInterpretations,
    combinations,
    patterns,
    analyzed,
  });
  const guidance = buildGuidance({
    cards: cardInterpretations,
    combinations,
    analyzed,
  });
  const reflections = buildReflections({
    cards: cardInterpretations,
    analyzed,
  });

  return {
    version: 1,
    locale: input.locale,
    depth: input.depth,
    topic: effectiveTopic,
    spreadId: input.spreadId,
    question: input.question,
    analyzed,
    overview,
    energy,
    cards: cardInterpretations,
    patterns,
    combinations,
    narrative,
    guidance,
    reflections,
    ethicsNote: ETHICS_NOTE,
    knowledgeSnapshot: input.cards.map((c) => {
      const k = kbMap.get(c.cardId)!;
      return { id: k.id, slug: k.slug };
    }),
  };
}

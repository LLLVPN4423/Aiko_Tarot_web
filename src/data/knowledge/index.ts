import { allTarotCards, cardById, cardBySlug } from "@/data/deck-index";
import { assembleKnowledgeCard } from "./assemble";
import type { KnowledgeCard } from "./types";

export type {
  ElementId,
  KnowledgeCard,
  ReadingDepth,
  ReadingTopicId,
  ReversedApproach,
  TraditionId,
} from "./types";

export const knowledgeCards: KnowledgeCard[] = allTarotCards.map(
  assembleKnowledgeCard,
);

const byId = new Map(knowledgeCards.map((c) => [c.id, c]));
const bySlug = new Map(knowledgeCards.map((c) => [c.slug, c]));

export function knowledgeById(id: number): KnowledgeCard | undefined {
  return byId.get(id);
}

export function knowledgeBySlug(slug: string): KnowledgeCard | undefined {
  return bySlug.get(slug);
}

export function requireKnowledgeById(id: number): KnowledgeCard {
  const k = knowledgeById(id) ?? (cardById(id) ? assembleKnowledgeCard(cardById(id)!) : undefined);
  if (!k) throw new Error(`Missing knowledge card id=${id}`);
  return k;
}

export function requireKnowledgeBySlug(slug: string): KnowledgeCard {
  const k =
    knowledgeBySlug(slug) ??
    (cardBySlug(slug) ? assembleKnowledgeCard(cardBySlug(slug)!) : undefined);
  if (!k) throw new Error(`Missing knowledge card slug=${slug}`);
  return k;
}

export const knowledgeStats = {
  total: knowledgeCards.length,
  withElement: knowledgeCards.filter((c) => !!c.element).length,
  withAstrology: knowledgeCards.filter((c) => !!c.astrology).length,
  withSymbolism: knowledgeCards.filter((c) => !!c.symbolism.en).length,
  topicsComplete: knowledgeCards.every((c) =>
    (["general", "love", "career", "finance", "self", "family", "spirituality"] as const).every(
      (t) => c.topics[t]?.upright.en && c.topics[t]?.reversed.en,
    ),
  ),
};

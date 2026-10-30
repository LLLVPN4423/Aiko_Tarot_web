import { findCombination } from "@/data/knowledge/combinations";
import type { KnowledgeCard } from "@/data/knowledge/types";
import type { CombinationHit, DrawnInput } from "./types";

export function analyzeCombinations(
  cards: DrawnInput[],
  knowledge: Map<number, KnowledgeCard>,
): CombinationHit[] {
  const hits: CombinationHit[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const a = knowledge.get(cards[i].cardId);
      const b = knowledge.get(cards[j].cardId);
      if (!a || !b) continue;
      const rule = findCombination(a.slug, b.slug);
      if (!rule) continue;
      if (seen.has(rule.id)) continue;
      seen.add(rule.id);
      // Prefer adjacent or role-related pairs; still allow non-adjacent curated hits
      const adjacent = Math.abs(i - j) === 1;
      const relatedRoles =
        cards[i].role === "challenge" ||
        cards[j].role === "challenge" ||
        cards[i].role === "outcome" ||
        cards[j].role === "outcome" ||
        cards[i].role === "present" ||
        cards[j].role === "present";
      if (!adjacent && !relatedRoles && cards.length > 3) {
        // Keep but only if major involved
        if (a.arcana !== "major" && b.arcana !== "major") continue;
      }
      hits.push({
        id: rule.id,
        a: a.slug,
        b: b.slug,
        theme: rule.theme,
        meaning: rule.meaning,
        caution: rule.caution,
        positions: [cards[i].positionLabel, cards[j].positionLabel],
      });
    }
  }

  return hits.slice(0, 5);
}

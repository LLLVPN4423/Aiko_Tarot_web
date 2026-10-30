import { majorArcana } from "./major-arcana";
import { majorTopicMeanings } from "./major-topic-meanings";
import { minorArcana } from "./minor-arcana";
import type { TarotCardBase } from "./deck-types";

export type TarotCard = TarotCardBase;

export const majorCards: TarotCard[] = majorArcana.map((c) => {
  const topics = majorTopicMeanings[c.slug];
  return {
    ...c,
    arcana: "major" as const,
    loveMeaning: topics?.love,
    careerMeaning: topics?.career,
    personalGrowthMeaning: topics?.growth,
    spiritualityMeaning: topics?.spirit,
  };
});

export const allTarotCards: TarotCard[] = [...majorCards, ...minorArcana];

export function cardBySlug(slug: string): TarotCard | undefined {
  return allTarotCards.find((c) => c.slug === slug);
}

export function cardById(id: number): TarotCard | undefined {
  return allTarotCards.find((c) => c.id === id);
}

export const deckStats = {
  total: allTarotCards.length,
  major: majorCards.length,
  minor: minorArcana.length,
  withArt: allTarotCards.filter((c) => c.imagePath).length,
};

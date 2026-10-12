import { majorArcana, type MajorArcanaCard } from "@/data/major-arcana";

export type DeckCard = {
  uid: string;
  card: MajorArcanaCard;
  reversed: boolean;
};

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function createShuffledDeck(reversedChance = 0.35): DeckCard[] {
  const shuffled = shuffleInPlace([...majorArcana]);
  return shuffled.map((card, index) => ({
    uid: `${card.id}-${index}-${Math.random().toString(36).slice(2, 9)}`,
    card,
    reversed: Math.random() < reversedChance,
  }));
}

export const PPF_POSITIONS = {
  vi: ["Quá khứ", "Hiện tại", "Tương lai"],
  en: ["Past", "Present", "Future"],
} as const;

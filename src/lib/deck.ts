import { majorArcana, type MajorArcanaCard } from "@/data/major-arcana";
import { minorArcana } from "@/data/minor-arcana";
import type { DeckMode } from "@/lib/settings";

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

export function getActiveDeckCards(deckMode: DeckMode = "major"): MajorArcanaCard[] {
  if (deckMode === "full" && minorArcana.length > 0) {
    return majorArcana;
  }
  return majorArcana;
}

export function createShuffledDeck(options?: {
  reversedChance?: number;
  reversedEnabled?: boolean;
  deckMode?: DeckMode;
}): DeckCard[] {
  const reversedEnabled = options?.reversedEnabled ?? true;
  const reversedChance = reversedEnabled ? (options?.reversedChance ?? 0.35) : 0;
  const pool = getActiveDeckCards(options?.deckMode ?? "major");
  const shuffled = shuffleInPlace([...pool]);
  return shuffled.map((card, index) => ({
    uid: `${card.id}-${index}-${Math.random().toString(36).slice(2, 9)}`,
    card,
    reversed: reversedEnabled && Math.random() < reversedChance,
  }));
}

export function emptySlots(n: number): (DeckCard | null)[] {
  return Array.from({ length: n }, () => null);
}

export function emptyFlipped(n: number): boolean[] {
  return Array.from({ length: n }, () => false);
}

export function deckCardsFromShared(
  cards: { id: number; reversed: boolean }[],
): DeckCard[] | null {
  const built: DeckCard[] = [];
  for (let index = 0; index < cards.length; index++) {
    const c = cards[index];
    const card = majorArcana.find((m) => m.id === c.id);
    if (!card) return null;
    built.push({
      uid: `shared-${index}-${c.id}`,
      card,
      reversed: c.reversed,
    });
  }
  return built;
}

import { majorArcana, type MajorArcanaCard } from "@/data/major-arcana";

export type DrawnCard = {
  card: MajorArcanaCard;
  reversed: boolean;
  position?: string;
};

export type SpreadId = "single" | "three" | "cross";

export type TopicId = "general" | "love" | "career" | "self";

export const spreads: Record<
  SpreadId,
  { positions: { vi: string; en: string }[] }
> = {
  single: {
    positions: [{ vi: "Thông điệp chính", en: "Core message" }],
  },
  three: {
    positions: [
      { vi: "Quá khứ / nền tảng", en: "Past / foundation" },
      { vi: "Hiện tại", en: "Present" },
      { vi: "Hướng đi / lời khuyên", en: "Direction / advice" },
    ],
  },
  cross: {
    positions: [
      { vi: "Tình huống", en: "Situation" },
      { vi: "Thách thức", en: "Challenge" },
      { vi: "Quá khứ", en: "Past influence" },
      { vi: "Tương lai gần", en: "Near future" },
      { vi: "Lời khuyên", en: "Advice" },
    ],
  },
};

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function drawReading(
  spread: SpreadId,
  options?: { reversedChance?: number },
): DrawnCard[] {
  const count = spreads[spread].positions.length;
  const reversedChance = options?.reversedChance ?? 0.35;
  const deck = shuffleInPlace([...majorArcana]).slice(0, count);

  return deck.map((card, index) => ({
    card,
    reversed: Math.random() < reversedChance,
    position: spreads[spread].positions[index]?.vi,
  }));
}

export function enrichWithPositions(
  spread: SpreadId,
  drawn: DrawnCard[],
  locale: "vi" | "en",
): DrawnCard[] {
  const positions = spreads[spread].positions;
  return drawn.map((d, i) => ({
    ...d,
    position: positions[i]?.[locale] ?? d.position,
  }));
}

export type JournalEntry = {
  id: string;
  at: string;
  spread: SpreadId;
  topic: TopicId;
  cards: { id: number; reversed: boolean }[];
  note?: string;
};

const JOURNAL_KEY = "pet-tarot-journal-v1";

export function loadJournal(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as JournalEntry[];
  } catch {
    return [];
  }
}

export function saveJournalEntry(entry: JournalEntry): void {
  const prev = loadJournal();
  const next = [entry, ...prev].slice(0, 30);
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(next));
}

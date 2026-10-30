import type { Locale } from "@/data/major-arcana";
import {
  allTarotCards,
  cardById as deckCardById,
  majorCards,
  type TarotCard,
} from "@/data/deck-index";

export type DrawnCard = {
  card: TarotCard;
  reversed: boolean;
  position?: string;
};

export type SpreadId = "single" | "three" | "cross" | "five" | "celtic";

export type TopicId =
  | "general"
  | "love"
  | "career"
  | "finance"
  | "self"
  | "family"
  | "spirituality";

export const spreads: Record<
  SpreadId,
  {
    positions: { vi: string; en: string }[];
    blurb: { vi: string; en: string };
    label: { vi: string; en: string };
  }
> = {
  single: {
    label: { vi: "1 lá", en: "1 card" },
    blurb: {
      vi: "Một thông điệp trung tâm cho câu hỏi của bạn.",
      en: "One core message for your question.",
    },
    positions: [{ vi: "Thông điệp chính", en: "Core message" }],
  },
  three: {
    label: { vi: "3 lá — Quá khứ · Hiện tại · Tương lai", en: "3 cards — Past · Present · Future" },
    blurb: {
      vi: "Dòng chảy thời gian và lời khuyên.",
      en: "Timeline flow and guidance.",
    },
    positions: [
      { vi: "Quá khứ", en: "Past" },
      { vi: "Hiện tại", en: "Present" },
      { vi: "Tương lai", en: "Future" },
    ],
  },
  cross: {
    label: { vi: "5 lá — mở rộng", en: "5-card expanded" },
    blurb: {
      vi: "Tình huống, thách thức, quá khứ, tương lai gần và lời khuyên.",
      en: "Situation, challenge, past, near future, and advice.",
    },
    positions: [
      { vi: "Tình huống", en: "Situation" },
      { vi: "Thách thức", en: "Challenge" },
      { vi: "Quá khứ", en: "Past influence" },
      { vi: "Tương lai gần", en: "Near future" },
      { vi: "Lời khuyên", en: "Advice" },
    ],
  },
  five: {
    label: { vi: "5 lá — mở rộng", en: "5-card expanded" },
    blurb: {
      vi: "Đọc sâu hơn ba lá — thêm thách thức và lời khuyên.",
      en: "Deeper than three cards — adds challenge and counsel.",
    },
    positions: [
      { vi: "Tình huống", en: "Situation" },
      { vi: "Thách thức", en: "Challenge" },
      { vi: "Quá khứ", en: "Past influence" },
      { vi: "Tương lai gần", en: "Near future" },
      { vi: "Lời khuyên", en: "Advice" },
    ],
  },
  celtic: {
    label: { vi: "Celtic Cross · 10 lá", en: "Celtic Cross · 10 cards" },
    blurb: {
      vi: "Trải bài cổ điển — bức tranh đầy đủ tình huống và kết quả.",
      en: "Classic spread — a full picture of situation and outcome.",
    },
    positions: [
      { vi: "Hiện tại", en: "Present" },
      { vi: "Thách thức", en: "Challenge" },
      { vi: "Mục tiêu ý thức", en: "Conscious aim" },
      { vi: "Nền tảng", en: "Foundation" },
      { vi: "Quá khứ", en: "Past" },
      { vi: "Tương lai gần", en: "Near future" },
      { vi: "Bản thân", en: "Self" },
      { vi: "Môi trường", en: "Environment" },
      { vi: "Hy vọng & lo sợ", en: "Hopes & fears" },
      { vi: "Kết quả", en: "Outcome" },
    ],
  },
};

export function getSpreadPositions(spread: SpreadId, locale: Locale): string[] {
  return spreads[spread].positions.map((p) => p[locale]);
}

export function getSpreadPositionLabels(
  spread: SpreadId,
): { vi: string; en: string }[] {
  return spreads[spread].positions;
}

export function slotCountForSpread(spread: SpreadId): number {
  return spreads[spread].positions.length;
}

const SPREAD_IDS = Object.keys(spreads) as SpreadId[];

export function isSpreadId(value: string | null | undefined): value is SpreadId {
  return !!value && SPREAD_IDS.includes(value as SpreadId);
}

export function parseSpreadId(
  value: string | null | undefined,
  fallback: SpreadId = "three",
): SpreadId {
  return isSpreadId(value) ? value : fallback;
}

export function getActiveMajorCards(): TarotCard[] {
  return majorCards;
}

export function getActiveDeckSize(deckMode: "major" | "full"): number {
  if (deckMode === "full") return allTarotCards.length;
  return majorCards.length;
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function drawReading(
  spread: SpreadId,
  options?: { reversedChance?: number; reversedEnabled?: boolean },
): DrawnCard[] {
  const count = spreads[spread].positions.length;
  const reversedEnabled = options?.reversedEnabled ?? true;
  const reversedChance = reversedEnabled ? (options?.reversedChance ?? 0.35) : 0;
  const deck = shuffleInPlace([...majorCards]).slice(0, count);

  return deck.map((card, index) => ({
    card,
    reversed: reversedEnabled && Math.random() < reversedChance,
    position: spreads[spread].positions[index]?.vi,
  }));
}

export type JournalEntry = {
  id: string;
  at: string;
  spread: SpreadId;
  topic: TopicId;
  cards: { id: number; reversed: boolean }[];
  positionLabels: { vi: string; en: string }[];
  question?: string;
  note?: string;
};

const JOURNAL_KEY_V2 = "pet-tarot-journal-v2";
const JOURNAL_KEY_V1 = "pet-tarot-journal-v1";

function migrateV1(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(JOURNAL_KEY_V1);
    if (!raw) return [];
    const v1 = JSON.parse(raw) as Array<{
      id: string;
      at: string;
      spread: SpreadId;
      topic: TopicId;
      cards: { id: number; reversed: boolean }[];
      note?: string;
    }>;
    return v1.map((e) => ({
      ...e,
      positionLabels: getSpreadPositionLabels(e.spread),
    }));
  } catch {
    return [];
  }
}

export function loadJournal(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(JOURNAL_KEY_V2);
    if (raw) return JSON.parse(raw) as JournalEntry[];
    const migrated = migrateV1();
    if (migrated.length) saveJournalAll(migrated);
    return migrated;
  } catch {
    return [];
  }
}

function saveJournalAll(entries: JournalEntry[]) {
  localStorage.setItem(JOURNAL_KEY_V2, JSON.stringify(entries));
}

export function saveJournalEntry(entry: JournalEntry): void {
  const prev = loadJournal();
  saveJournalAll([entry, ...prev].slice(0, 50));
}

export function deleteJournalEntry(id: string): void {
  saveJournalAll(loadJournal().filter((e) => e.id !== id));
}

export function updateJournalNote(id: string, note: string): void {
  saveJournalAll(
    loadJournal().map((e) => (e.id === id ? { ...e, note } : e)),
  );
}

export function cardById(id: number): TarotCard | undefined {
  return deckCardById(id);
}

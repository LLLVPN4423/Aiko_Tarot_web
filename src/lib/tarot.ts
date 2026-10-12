import { majorArcana, type MajorArcanaCard, type Locale } from "@/data/major-arcana";
import { minorArcana } from "@/data/minor-arcana";

export type DrawnCard = {
  card: MajorArcanaCard;
  reversed: boolean;
  position?: string;
};

export type SpreadId = "single" | "three" | "cross";

export type TopicId = "general" | "love" | "career" | "self";

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
    label: { vi: "5 lá — dạng thập", en: "5-card cross" },
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

export function getActiveMajorCards(): MajorArcanaCard[] {
  return majorArcana;
}

export function getActiveDeckSize(deckMode: "major" | "full"): number {
  if (deckMode === "full" && minorArcana.length > 0) {
    return majorArcana.length + minorArcana.length;
  }
  return majorArcana.length;
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
  const deck = shuffleInPlace([...majorArcana]).slice(0, count);

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

export function cardById(id: number): MajorArcanaCard | undefined {
  return majorArcana.find((c) => c.id === id);
}

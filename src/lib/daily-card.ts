import { majorArcana } from "@/data/major-arcana";

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function dateKey(d = new Date()): string {
  return d.toLocaleDateString("en-CA");
}

export type DailyDraw = {
  date: string;
  cardId: number;
  reversed: boolean;
};

export function getDailyDraw(options?: {
  salt?: string;
  date?: Date;
}): DailyDraw {
  const date = dateKey(options?.date);
  const salt = options?.salt ?? "celestial-cat";
  const h1 = hashString(`${date}-${salt}-card`);
  const h2 = hashString(`${date}-${salt}-rev`);
  const cardId = h1 % majorArcana.length;
  const reversed = h2 % 100 < 35;
  return { date, cardId, reversed };
}

const SALT_KEY = "daily-card-salt";

export function getOrCreateDailySalt(): string {
  if (typeof window === "undefined") return "celestial-cat";
  try {
    let salt = localStorage.getItem(SALT_KEY);
    if (!salt) {
      salt = crypto.randomUUID().slice(0, 8);
      localStorage.setItem(SALT_KEY, salt);
    }
    return salt;
  } catch {
    return "celestial-cat";
  }
}

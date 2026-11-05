import type { KnowledgeCard } from "@/data/knowledge/types";
import type { DrawnInput, PatternReport } from "./types";

const ELEMENTS = ["fire", "water", "air", "earth"] as const;

export function analyzePatterns(
  cards: DrawnInput[],
  knowledge: Map<number, KnowledgeCard>,
): PatternReport {
  const suitCounts: Record<string, number> = {
    major: 0,
    wands: 0,
    cups: 0,
    swords: 0,
    pentacles: 0,
  };
  const elementCounts: Record<string, number> = {
    fire: 0,
    water: 0,
    air: 0,
    earth: 0,
    spirit: 0,
  };
  let majorCount = 0;
  let courtCount = 0;
  let reversedCount = 0;
  const numbers: number[] = [];

  for (const d of cards) {
    const k = knowledge.get(d.cardId);
    if (!k) continue;
    if (d.reversed) reversedCount += 1;
    if (k.arcana === "major") {
      majorCount += 1;
      suitCounts.major += 1;
    } else if (k.suit) {
      suitCounts[k.suit] = (suitCounts[k.suit] ?? 0) + 1;
    }
    elementCounts[k.element] = (elementCounts[k.element] ?? 0) + 1;
    if (
      k.rank === "page" ||
      k.rank === "knight" ||
      k.rank === "queen"
    ) {
      courtCount += 1;
    }
    if (typeof k.numerology === "number" && k.numerology > 0) {
      numbers.push(k.numerology);
    }
  }

  const presentElements = ELEMENTS.filter((e) => (elementCounts[e] ?? 0) > 0);
  const missingElements = ELEMENTS.filter((e) => (elementCounts[e] ?? 0) === 0).map(
    String,
  );
  let dominantElement: string | undefined;
  let best = 0;
  for (const e of ELEMENTS) {
    const n = elementCounts[e] ?? 0;
    if (n > best) {
      best = n;
      dominantElement = e;
    }
  }

  const freq = new Map<number, number>();
  for (const n of numbers) freq.set(n, (freq.get(n) ?? 0) + 1);
  const numberEchoes = [...freq.entries()]
    .filter(([, c]) => c >= 2)
    .map(([n]) => n);

  const n = cards.length || 1;
  const bitsVi: string[] = [];
  const bitsEn: string[] = [];
  if (majorCount >= Math.ceil(n / 2)) {
    bitsVi.push("nhiều Major — chuyện lớn hơn chuyện vụn");
    bitsEn.push("several Majors — bigger themes than trivia");
  }
  if (courtCount >= 2) {
    bitsVi.push("nhiều lá triều đình — chú ý người và vai trò");
    bitsEn.push("several courts — people and roles matter");
  }
  if (reversedCount >= Math.ceil(n / 2)) {
    bitsVi.push("nhiều lá ngược — đang có chỗ bị kẹt hoặc cần nhìn vào trong");
    bitsEn.push("many reversals — something is stuck or needs inward looking");
  }
  const summary = {
    vi: bitsVi.length ? `(${bitsVi.join("; ")}.)` : "",
    en: bitsEn.length ? `(${bitsEn.join("; ")}.)` : "",
  };

  return {
    suitCounts,
    elementCounts,
    majorCount,
    courtCount,
    reversedCount,
    dominantElement,
    missingElements,
    numberEchoes,
    summary,
  };
}

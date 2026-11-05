import type { Locale } from "@/data/major-arcana";
import type { ReadingTopicId } from "@/data/knowledge/types";
import type { CombinationHit, PatternReport, QuestionAnalysis } from "./types";
import type { CardInterpretation } from "./types";

function topicPhrase(topic: ReadingTopicId): { vi: string; en: string } {
  const map: Record<ReadingTopicId, { vi: string; en: string }> = {
    general: { vi: "bức tranh chung", en: "the wider picture" },
    love: { vi: "tình cảm", en: "love" },
    career: { vi: "công việc", en: "work" },
    finance: { vi: "tiền bạc", en: "money" },
    self: { vi: "bản thân", en: "yourself" },
    family: { vi: "gia đình", en: "family" },
    spirituality: { vi: "nội tâm", en: "inner life" },
  };
  return map[topic];
}

export function buildOverview(options: {
  analyzed: QuestionAnalysis;
  cards: CardInterpretation[];
  patterns: PatternReport;
  locale: Locale;
}): { vi: string; en: string } {
  const { analyzed, cards, patterns } = options;
  const topic = topicPhrase(analyzed.topicHint);
  const first = cards[0];
  const last = cards[cards.length - 1];
  if (!first || !last) return { vi: "", en: "" };

  const clarifyVi = analyzed.clarification
    ? ` ${analyzed.clarification.vi}`
    : "";
  const clarifyEn = analyzed.clarification
    ? ` ${analyzed.clarification.en}`
    : "";

  return {
    vi: `Về ${topic.vi}: trọng tâm đang ở “${first.name.vi}${first.reversed ? " (ngược)" : ""}”, và hướng khép lại nghiêng về “${last.name.vi}${last.reversed ? " (ngược)" : ""}”.${clarifyVi}${patterns.summary.vi ? ` ${patterns.summary.vi}` : ""}`,
    en: `On ${topic.en}: the center is “${first.name.en}${first.reversed ? " (rev)" : ""}”, closing toward “${last.name.en}${last.reversed ? " (rev)" : ""}”.${clarifyEn}${patterns.summary.en ? ` ${patterns.summary.en}` : ""}`,
  };
}

export function buildEnergy(options: {
  cards: CardInterpretation[];
  patterns: PatternReport;
}): { vi: string; en: string } {
  // Kept for API compatibility; overview already carries the pulse.
  const { cards } = options;
  const mid = cards[Math.floor(cards.length / 2)];
  if (!mid) return { vi: "", en: "" };
  return {
    vi: `Điểm tựa giữa trải: “${mid.name.vi}” ở ô ${mid.positionLabel}.`,
    en: `Midpoint: “${mid.name.en}” in ${mid.positionLabel}.`,
  };
}

export function buildNarrative(options: {
  cards: CardInterpretation[];
  combinations: CombinationHit[];
  patterns: PatternReport;
  analyzed: QuestionAnalysis;
}): { vi: string; en: string } {
  const { cards, combinations, analyzed } = options;
  if (!cards.length) return { vi: "", en: "" };

  const topic = topicPhrase(analyzed.topicHint);
  const first = cards[0];
  const last = cards[cards.length - 1];
  const tension =
    cards.find((c) => c.role === "challenge" || c.role === "obstacle") ??
    cards.find((c) => c.reversed) ??
    cards[Math.floor(cards.length / 2)];

  const comboVi = combinations[0]
    ? ` Hai lá nổi cùng nhau gợi “${combinations[0].theme.vi}”.`
    : "";
  const comboEn = combinations[0]
    ? ` A standout pairing suggests “${combinations[0].theme.en}”.`
    : "";

  return {
    vi: `Với ${topic.vi}, chuyện mở bằng ${first.name.vi} (${first.positionLabel}). Chỗ cần nhìn kỹ là ${tension.name.vi} (${tension.positionLabel}). Hướng đi tiếp gắn với ${last.name.vi} — lấy đó làm việc nhỏ có thể làm, không phải lời hứa lớn.${comboVi}`,
    en: `For ${topic.en}, the story opens with ${first.name.en} (${first.positionLabel}). Look closely at ${tension.name.en} (${tension.positionLabel}). The next step sits with ${last.name.en} — treat it as one doable act, not a grand promise.${comboEn}`,
  };
}

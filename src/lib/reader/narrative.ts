import type { Locale } from "@/data/major-arcana";
import type { CombinationHit, PatternReport, QuestionAnalysis } from "./types";
import type { CardInterpretation } from "./types";

export function buildOverview(options: {
  analyzed: QuestionAnalysis;
  cards: CardInterpretation[];
  patterns: PatternReport;
  locale: Locale;
}): { vi: string; en: string } {
  const { analyzed, cards, patterns } = options;
  const namesVi = cards.map((c) => c.name.vi).join(", ");
  const namesEn = cards.map((c) => c.name.en).join(", ");
  return {
    vi: `${analyzed.summary.vi}${analyzed.clarification ? ` ${analyzed.clarification.vi}` : ""} Trải ${cards.length} lá (${namesVi}). ${patterns.summary.vi}`,
    en: `${analyzed.summary.en}${analyzed.clarification ? ` ${analyzed.clarification.en}` : ""} ${cards.length}-card spread (${namesEn}). ${patterns.summary.en}`,
  };
}

export function buildEnergy(options: {
  cards: CardInterpretation[];
  patterns: PatternReport;
}): { vi: string; en: string } {
  const { cards, patterns } = options;
  const first = cards[0];
  const last = cards[cards.length - 1];
  return {
    vi: `Năng lượng mở với “${first?.name.vi ?? "—"}${first?.reversed ? " (ngược)" : ""}” và khép hướng “${last?.name.vi ?? "—"}${last?.reversed ? " (ngược)" : ""}”. ${patterns.dominantElement ? `Nhịp nguyên tố nghiêng về ${patterns.dominantElement}.` : ""}`,
    en: `Energy opens with “${first?.name.en ?? "—"}${first?.reversed ? " (rev)" : ""}” and leans toward “${last?.name.en ?? "—"}${last?.reversed ? " (rev)" : ""}”. ${patterns.dominantElement ? `Elemental pulse favors ${patterns.dominantElement}.` : ""}`,
  };
}

export function buildNarrative(options: {
  cards: CardInterpretation[];
  combinations: CombinationHit[];
  patterns: PatternReport;
  analyzed: QuestionAnalysis;
}): { vi: string; en: string } {
  const { cards, combinations, patterns, analyzed } = options;
  if (!cards.length) return { vi: "", en: "" };

  const mid = cards[Math.floor(cards.length / 2)];
  const comboVi = combinations.length
    ? ` Cặp nổi: ${combinations.map((c) => c.theme.vi).join("; ")}.`
    : "";
  const comboEn = combinations.length
    ? ` Key pairs: ${combinations.map((c) => c.theme.en).join("; ")}.`
    : "";

  return {
    vi: [
      `Chuyện đang xảy ra xoay quanh ô “${cards[0].positionLabel}” với ${cards[0].name.vi}.`,
      `Lực nền / điểm tựa xuất hiện ở “${mid.positionLabel}” (${mid.name.vi}).`,
      `Căng thẳng chính nằm ở chỗ thuận/ngược và nguyên tố: ${patterns.summary.vi}`,
      `Điều có thể học được gắn với chủ đề ${analyzed.topicHint} — không phải lời tiên tri cứng.`,
      `Hướng khả dĩ kết ở “${cards[cards.length - 1].positionLabel}” (${cards[cards.length - 1].name.vi}) nếu bạn điều chỉnh theo lời khuyên.${comboVi}`,
    ].join(" "),
    en: [
      `What is happening centers on “${cards[0].positionLabel}” with ${cards[0].name.en}.`,
      `A pivot appears at “${mid.positionLabel}” (${mid.name.en}).`,
      `Central tension lives in orientation and element: ${patterns.summary.en}`,
      `What can be learned ties to ${analyzed.topicHint} — not rigid prophecy.`,
      `A possible direction closes at “${cards[cards.length - 1].positionLabel}” (${cards[cards.length - 1].name.en}) if counsel is practiced.${comboEn}`,
    ].join(" "),
  };
}

import type { ReadingTopicId } from "@/data/knowledge/types";
import type { CardInterpretation, CombinationHit, QuestionAnalysis } from "./types";

function topicWord(topic: ReadingTopicId): { vi: string; en: string } {
  const map: Record<ReadingTopicId, { vi: string; en: string }> = {
    general: { vi: "việc này", en: "this" },
    love: { vi: "tình cảm", en: "love" },
    career: { vi: "công việc", en: "work" },
    finance: { vi: "tiền bạc", en: "money" },
    self: { vi: "bản thân", en: "yourself" },
    family: { vi: "gia đình", en: "family" },
    spirituality: { vi: "nội tâm", en: "inner life" },
  };
  return map[topic];
}

export function buildGuidance(options: {
  cards: CardInterpretation[];
  combinations: CombinationHit[];
  analyzed: QuestionAnalysis;
}): {
  attend: { vi: string; en: string };
  reconsider: { vi: string; en: string };
  avoid: { vi: string; en: string };
  next: { vi: string; en: string };
} {
  const { cards, analyzed } = options;
  const tw = topicWord(analyzed.topicHint);
  const challenge =
    cards.find((c) => c.role === "challenge" || c.role === "obstacle") ??
    cards.find((c) => c.reversed) ??
    cards[0];
  const adviceCard =
    cards.find((c) => c.role === "advice" || c.role === "direction") ??
    cards[cards.length - 1];

  return {
    attend: {
      vi: `Nhìn kỹ “${challenge?.name.vi}” — đó là chỗ đang làm ${tw.vi} rối nhất.`,
      en: `Look at “${challenge?.name.en}” — that is where ${tw.en} feels most tangled.`,
    },
    reconsider: {
      vi: `Hỏi lại: mình đang giả định gì về ${tw.vi} mà chưa kiểm chứng?`,
      en: `Ask: what assumption about ${tw.en} have I not checked?`,
    },
    avoid: {
      vi:
        analyzed.topicHint === "finance"
          ? "Đừng quyết định tiền lớn chỉ vì một trải bài."
          : analyzed.focus === "relationship"
            ? "Đừng khẳng định ý nghĩ người khác như sự thật."
            : "Đừng xào lại đến khi ra ‘lá đẹp’.",
      en:
        analyzed.topicHint === "finance"
          ? "Don’t make a big money move from one spread alone."
          : analyzed.focus === "relationship"
            ? "Don’t treat another person’s thoughts as fact."
            : "Don’t reshuffle until a ‘pretty’ card appears.",
    },
    next: {
      vi: `Việc tiếp theo (gắn “${adviceCard?.name.vi}”): một hành động nhỏ trong 48 giờ liên quan ${tw.vi}.`,
      en: `Next (via “${adviceCard?.name.en}”): one small act within 48 hours about ${tw.en}.`,
    },
  };
}

export function buildReflections(options: {
  cards: CardInterpretation[];
  analyzed: QuestionAnalysis;
}): { vi: string; en: string }[] {
  const { analyzed } = options;
  const tw = topicWord(analyzed.topicHint);
  return [
    {
      vi: `Điều gì về ${tw.vi} trong trải này đang đúng với tuần này?`,
      en: `What about ${tw.en} in this spread is true for my week?`,
    },
    {
      vi: `Nếu chỉ đổi một việc liên quan ${tw.vi}, đó sẽ là gì?`,
      en: `If I change only one thing about ${tw.en}, what is it?`,
    },
  ];
}

export const ETHICS_NOTE = {
  vi: "Tarot ở đây để phản tỉnh — không dự báo chắc chắn. Việc y tế, pháp lý, tài chính lớn: hãy tìm chuyên gia phù hợp.",
  en: "Tarot here is for reflection — not certain prediction. For medical, legal, or high-stakes money matters, seek a suitable professional.",
};

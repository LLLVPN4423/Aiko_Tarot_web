import type { KnowledgeCard, ReadingDepth, ReadingTopicId, ReversedApproach } from "@/data/knowledge/types";
import type { PositionRole } from "@/data/spreads/types";
import type { CardInterpretation, DrawnInput, QuestionAnalysis } from "./types";

function pickApproach(
  card: KnowledgeCard,
  role: PositionRole,
  analyzed: QuestionAnalysis,
): ReversedApproach {
  if (role === "challenge" || role === "obstacle") return "shadow";
  if (role === "advice" || role === "direction" || role === "outcome")
    return "delayed";
  if (role === "past" || role === "foundation" || role === "root")
    return "internalized";
  if (analyzed.emotionalTone === "anxious" || analyzed.emotionalTone === "heavy")
    return "blocked";
  if (analyzed.focus === "decision") return "excessive";
  return card.reversed.defaultApproach;
}

function depthKeep(depth: ReadingDepth): Set<string> {
  if (depth === "quick")
    return new Set(["core", "topic", "advice"]);
  if (depth === "standard")
    return new Set([
      "position",
      "orientation",
      "keywords",
      "core",
      "topic",
      "advice",
    ]);
  return new Set([
    "position",
    "orientation",
    "keywords",
    "core",
    "psychological",
    "emotional",
    "topic",
    "symbolism",
    "approach",
    "advice",
    "opportunities",
    "challenges",
  ]);
}

export function interpretCard(options: {
  drawn: DrawnInput;
  card: KnowledgeCard;
  topic: ReadingTopicId;
  depth: ReadingDepth;
  analyzed: QuestionAnalysis;
}): CardInterpretation {
  const { drawn, card, topic, depth, analyzed } = options;
  const profile = drawn.reversed ? card.reversed : card.upright;
  const topicCopy = drawn.reversed
    ? card.topics[topic].reversed
    : card.topics[topic].upright;
  const approach = drawn.reversed
    ? pickApproach(card, drawn.role, analyzed)
    : undefined;

  const allSections: CardInterpretation["sections"] = [
    {
      id: "position",
      title: { vi: "Vị trí", en: "Position" },
      body: {
        vi: `${drawn.positionLabel} — đọc lá này cho đúng ô này.`,
        en: `${drawn.positionLabel} — read this card for this seat.`,
      },
    },
    {
      id: "orientation",
      title: { vi: "Hướng lá", en: "Orientation" },
      body: drawn.reversed
        ? {
            vi: "Ngược — năng lượng nội tại, bị chặn, trì hoãn, thái quá, hoặc bóng tối cần nhìn.",
            en: "Reversed — inward, blocked, delayed, excessive, or shadow needing sight.",
          }
        : {
            vi: "Thuận — năng lượng biểu hiện trực tiếp hơn.",
            en: "Upright — energy expresses more directly.",
          },
    },
    {
      id: "keywords",
      title: { vi: "Từ khóa", en: "Keywords" },
      body: {
        vi: card.keywords.vi.join(" · "),
        en: card.keywords.en.join(" · "),
      },
    },
    {
      id: "core",
      title: { vi: "Ý nghĩa cốt lõi", en: "Core meaning" },
      body: profile.core,
    },
    {
      id: "psychological",
      title: { vi: "Tầng tâm lý", en: "Psychological" },
      body: profile.psychological,
    },
    {
      id: "emotional",
      title: { vi: "Tầng cảm xúc", en: "Emotional" },
      body: profile.emotional,
    },
    {
      id: "topic",
      title: { vi: "Theo chủ đề", en: "Topic lens" },
      body: topicCopy,
    },
    {
      id: "symbolism",
      title: { vi: "Biểu tượng", en: "Symbolism" },
      body: card.symbolism,
    },
    {
      id: "approach",
      title: { vi: "Cách đọc ngược", en: "Reversed approach" },
      body: approach
        ? card.reversed.approachHints[approach]
        : { vi: "", en: "" },
    },
    {
      id: "opportunities",
      title: { vi: "Cơ hội", en: "Opportunities" },
      body: profile.opportunities,
    },
    {
      id: "challenges",
      title: { vi: "Thách thức", en: "Challenges" },
      body: profile.challenges,
    },
    {
      id: "advice",
      title: { vi: "Lời khuyên", en: "Advice" },
      body: profile.advice,
    },
  ];

  const keep = depthKeep(depth);
  const sections = allSections.filter(
    (s) => keep.has(s.id) && (s.body.vi || s.body.en),
  );

  return {
    cardId: card.id,
    slug: card.slug,
    name: card.name,
    reversed: drawn.reversed,
    positionId: drawn.positionId,
    positionLabel: drawn.positionLabel,
    role: drawn.role,
    keywords: card.keywords.en,
    approach,
    sections,
    transparency: {
      traditional: card.traditionalSummary,
      position: {
        vi: `Vai trò ô “${drawn.positionLabel}” định hướng cách gắn “${card.keywords.vi[0]}” vào câu hỏi.`,
        en: `Seat “${drawn.positionLabel}” steers how “${card.keywords.en[0]}” meets the question.`,
      },
      topic: topicCopy,
    },
  };
}

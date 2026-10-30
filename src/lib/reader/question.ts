import type { ReadingTopicId } from "@/data/knowledge/types";
import type { QuestionAnalysis } from "./types";

const LOVE = /yêu|tình|crush|người yêu|husband|wife|partner|love|relationship|dating|breakup|chia tay|hôn nhân|marry/i;
const CAREER = /việc|job|career|work|sếp|boss|lương|promote|công ty|interview|học|study|school/i;
const FINANCE = /tiền|tài chính|money|finance|debt|nợ|đầu tư|invest|salary|lương|chi tiêu/i;
const FAMILY = /gia đình|family|mẹ|bố|cha|con|anh|chị|em|bạn bè|friend|social/i;
const SPIRIT = /tâm linh|spirit|meditation|thiền|ý nghĩa|purpose|soul|destiny|định mệnh/i;
const SELF = /bản thân|self|tôi nên|phát triển|healing|chữa|anxiety|lo âu|tự tin/i;
const DECISION = /nên|có nên|should|decide|lựa chọn|chọn|or not|có hay không|yes or no/i;
const REL = /chúng tôi|hắn|cô ấy|anh ấy|they|we|us|quan hệ/i;
const ANX = /sợ|lo|fear|anxious|worried|panic|đau/i;
const HOPE = /hy vọng|hope|mong|wish|excited|vui/i;
const HEAVY = /mất|mệt|tan vỡ|grief|depress|tuyệt vọng|hopeless/i;
const NEAR = /tuần|tháng|soon|this week|gần|sắp|tháng tới/i;
const LONG = /năm|year|long.?term|tương lai xa|lifetime/i;

export function analyzeQuestion(
  question: string,
  topic: ReadingTopicId,
): QuestionAnalysis {
  const q = question.trim();
  let topicHint = topic;
  if (topic === "general" && q) {
    if (LOVE.test(q)) topicHint = "love";
    else if (FINANCE.test(q)) topicHint = "finance";
    else if (CAREER.test(q)) topicHint = "career";
    else if (FAMILY.test(q)) topicHint = "family";
    else if (SPIRIT.test(q)) topicHint = "spirituality";
    else if (SELF.test(q)) topicHint = "self";
  }

  let focus: QuestionAnalysis["focus"] = "situation";
  if (!q) focus = "unclear";
  else if (DECISION.test(q)) focus = "decision";
  else if (REL.test(q) || topicHint === "love" || topicHint === "family")
    focus = "relationship";
  else if (SELF.test(q) || topicHint === "self" || topicHint === "spirituality")
    focus = "self";
  else if (/hướng|path|direction|tương lai|future|what next/i.test(q))
    focus = "direction";

  const timeHorizon: QuestionAnalysis["timeHorizon"] = LONG.test(q)
    ? "long"
    : NEAR.test(q)
      ? "near"
      : q
        ? "immediate"
        : "unspecified";

  const emotionalTone: QuestionAnalysis["emotionalTone"] = HEAVY.test(q)
    ? "heavy"
    : ANX.test(q)
      ? "anxious"
      : HOPE.test(q)
        ? "hopeful"
        : q
          ? "curious"
          : "neutral";

  const ambiguous =
    q.length > 0 &&
    q.length < 12 &&
    !LOVE.test(q) &&
    !CAREER.test(q) &&
    !FINANCE.test(q) &&
    focus === "unclear";

  return {
    topicHint,
    focus,
    timeHorizon,
    emotionalTone,
    clarification: ambiguous
      ? {
          vi: "Câu hỏi khá ngắn — nếu có thể, thêm chủ đề (tình cảm / việc / bản thân) sẽ giúp đọc sát hơn. Dưới đây vẫn giải dựa trên trải bài.",
          en: "The question is quite brief — adding a topic (love / work / self) would sharpen the reading. Below still interprets the spread as drawn.",
        }
      : undefined,
    summary: {
      vi: q
        ? `Câu hỏi được hiểu quanh chủ đề “${topicHint}”, trọng tâm ${focus}, tông cảm xúc ${emotionalTone}.`
        : `Không có câu hỏi chữ — đọc theo chủ đề “${topic}” và cấu trúc trải bài.`,
      en: q
        ? `Question framed around “${topicHint}”, focus ${focus}, tone ${emotionalTone}.`
        : `No written question — reading by topic “${topic}” and spread structure.`,
    },
  };
}

import type { Locale } from "@/data/major-arcana";
import type { TarotCard } from "@/data/deck-index";
import type { TopicId } from "@/lib/tarot";
import { topicLenses } from "@/data/topic-lenses";

type Drawn = { card: TarotCard; reversed: boolean; position: string };

function topicBody(
  card: TarotCard,
  topic: TopicId,
  reversed: boolean,
  locale: Locale,
): string | undefined {
  if (topic === "love") return card.loveMeaning?.[locale];
  if (topic === "career") return card.careerMeaning?.[locale];
  if (topic === "self") return card.personalGrowthMeaning?.[locale];
  if (topic === "spirituality") return card.spiritualityMeaning?.[locale];
  return undefined;
}

/** Rich topic paragraph: dedicated field or woven adaptation of core meaning. */
export function topicInterpretation(
  card: TarotCard,
  topic: TopicId,
  reversed: boolean,
  locale: Locale,
): string {
  const dedicated = topicBody(card, topic, reversed, locale);
  if (dedicated) return dedicated;

  const core = reversed ? card.reversed[locale] : card.upright[locale];
  const label = topicLenses[topic].label[locale];
  const kw = card.keywords[locale][0] ?? "";

  if (locale === "vi") {
    const frames: Record<TopicId, string> = {
      general: `Trong bức tranh tổng quát, năng lượng “${kw}” của lá này đang tô màu tuần này của bạn. ${core} Hãy hỏi: điều gì cần được đặt lên bàn trước tiên?`,
      love: `Về trái tim và gắn kết: “${kw}” đang hiện diện trong cách bạn yêu hoặc được yêu. ${core} Chú ý ranh giới và sự chân thật cảm xúc hơn là kịch bản lý tưởng.`,
      career: `Trong công việc và nguồn lực: “${kw}” chỉ hướng hành động nghề nghiệp. ${core} Chuyển thông điệp thành một việc làm được trong tuần — email, quyết định, hoặc ranh giới công việc.`,
      finance: `Về tài chính / vật chất: “${kw}” soi thói quen nguồn lực. ${core} Đây là phản tỉnh, không phải tư vấn tài chính chuyên nghiệp.`,
      self: `Trên hành trình phát triển: “${kw}” là bài học nội tâm. ${core} Chăm sóc phần bản thân đang bị bỏ quên thay vì chỉ tối ưu hiệu suất.`,
      family: `Trong gia đình / vòng gần: “${kw}” nói về vai trò và không khí chung. ${core} Làm rõ nhu cầu thay vì đoán ý người khác.`,
      spirituality: `Trên đường tâm linh: “${kw}” là dấu hiệu cần lắng nghe. ${core} Biến thông điệp thành một nghi thức nhỏ (thở, viết, im lặng) thay vì chỉ suy nghĩ về nó.`,
    };
    return `【${label}】 ${frames[topic]}`;
  }

  const frames: Record<TopicId, string> = {
    general: `In the wider picture, “${kw}” colors this chapter. ${core} Ask what belongs on the table first.`,
    love: `In matters of the heart, “${kw}” shows how you love or receive love. ${core} Favor honesty and boundaries over idealized scripts.`,
    career: `At work and with resources, “${kw}” points to professional action. ${core} Turn the message into one doable task this week — a message, a decision, or a boundary.`,
    finance: `In finance / material life, “${kw}” mirrors resource habits. ${core} Reflective only — not professional financial advice.`,
    self: `On the growth path, “${kw}” is an inner lesson. ${core} Tend the neglected self rather than only optimizing performance.`,
    family: `In family / close circles, “${kw}” speaks to roles and climate. ${core} Clarify needs instead of guessing others.`,
    spirituality: `On the spiritual path, “${kw}” is a signal to listen. ${core} Make one small ritual (breath, writing, silence) instead of only thinking about it.`,
  };
  return `[${label}] ${frames[topic]}`;
}

export function positionAwareCounsel(
  position: string,
  card: TarotCard,
  topic: TopicId,
  reversed: boolean,
  locale: Locale,
): string {
  const kw = card.keywords[locale][0] ?? "";
  const topicLabel = topicLenses[topic].label[locale];
  const p = position.toLowerCase();

  const isPast =
    /quá khứ|past|nền tảng|foundation|influence/i.test(p);
  const isChallenge =
    /thách|challenge|obstacle|conflict/i.test(p);
  const isFuture =
    /tương lai|future|outcome|kết quả|near/i.test(p);
  const isAdvice =
    /khuyên|advice|counsel|guidance/i.test(p);
  const isSelf =
    /bản thân|self|conscious|ý thức/i.test(p);

  if (locale === "vi") {
    if (isPast)
      return `Ô quá khứ: “${kw}” là gốc rễ đang nuôi (hoặc níu) chủ đề ${topicLabel}. ${reversed ? "Năng lượng này chưa được tiêu hóa hết — hãy đặt tên nó trước khi bước tiếp." : "Tôn trọng bài học đã qua; đừng mang gánh cũ vào lựa chọn mới nếu không cần."}`;
    if (isChallenge)
      return `Ô thách thức: “${kw}” chính là ma sát hiện tại quanh ${topicLabel}. ${reversed ? "Đừng tấn lực — tìm lối đi vòng hoặc nhờ hỗ trợ." : "Đối diện trực tiếp, nhưng chọn một trận đáng đánh."}`;
    if (isFuture)
      return `Ô hướng tới: nếu tiếp tục như hiện tại, “${kw}” là khí hậu sắp tới của ${topicLabel}. ${reversed ? "Có thể trì hoãn hoặc đảo chiều — bạn còn cửa chỉnh hướng." : "Chuẩn bị đón nhận và hành động sớm thay vì chờ bị động."}`;
    if (isAdvice)
      return `Ô lời khuyên: hãy lấy “${kw}” làm kim chỉ nam cho ${topicLabel} tuần này — một hành động nhỏ, rõ, trong 48 giờ.`;
    if (isSelf)
      return `Ô bản thân: bạn đang mang “${kw}” vào tình huống ${topicLabel}. ${reversed ? "Điều chỉnh nội tâm trước khi đòi môi trường đổi." : "Sở hữu năng lượng này một cách có ý thức."}`;
    return `Ở vị trí “${position}”, hãy đọc “${kw}” như chìa khóa cho ${topicLabel}: ${reversed ? "nhìn phần bị che/kẹt." : "biểu hiện thẳng và có thể hành động."}`;
  }

  if (isPast)
    return `Past seat: “${kw}” is the root feeding (or gripping) ${topicLabel}. ${reversed ? "This energy is unfinished — name it before moving on." : "Honor the lesson; don't haul old weight into new choices needlessly."}`;
  if (isChallenge)
    return `Challenge seat: “${kw}” is the present friction around ${topicLabel}. ${reversed ? "Don't force the wall — find a side door or ask for help." : "Meet it directly, but pick a fight worth fighting."}`;
  if (isFuture)
    return `Toward the future: if you continue as now, “${kw}” is the coming climate of ${topicLabel}. ${reversed ? "Delay or reversal is possible — you still have a steering window." : "Prepare to receive and act early rather than wait passively."}`;
  if (isAdvice)
    return `Advice seat: let “${kw}” guide ${topicLabel} this week — one small clear action within 48 hours.`;
  if (isSelf)
    return `Self seat: you bring “${kw}” into the ${topicLabel} situation. ${reversed ? "Adjust inwardly before demanding the outer world change." : "Own this energy consciously."}`;
  return `In “${position}”, read “${kw}” as the key for ${topicLabel}: ${reversed ? "look at what is blocked or hidden." : "direct, actionable expression."}`;
}

export function topicSynthesisNarrative(
  cards: Drawn[],
  topic: TopicId,
  locale: Locale,
): { overview: string; counsel: string } {
  if (!cards.length) return { overview: "", counsel: "" };
  const label = topicLenses[topic].label[locale];
  const intro = topicLenses[topic].intro[locale];
  const first = cards[0];
  const last = cards[cards.length - 1];
  const names = cards
    .map((c) => `${c.card.name[locale]}${c.reversed ? (locale === "vi" ? " ↓" : " ↓") : ""}`)
    .join(" · ");

  if (locale === "vi") {
    const hooks: Record<TopicId, string> = {
      general: "bức tranh đời sống",
      love: "trái tim và các mối gắn kết",
      career: "công việc và trách nhiệm",
      finance: "nguồn lực và thói quen tiền bạc",
      self: "sự trưởng thành nội tâm",
      family: "gia đình và vòng quan hệ gần",
      spirituality: "đường tâm linh và ý nghĩa",
    };
    return {
      overview: `Trải bài về ${label} — ${hooks[topic]}. ${intro}\n\nChuỗi lá: ${names}.\nMở bằng “${first.position}” (${first.card.name.vi} / ${first.card.keywords.vi[0]}) và khép ở “${last.position}” (${last.card.name.vi} / ${last.card.keywords.vi[0]}). Đọc như một câu chuyện cảm xúc có nhịp, không phải checklist.`,
      counsel: `Trong 7 ngày tới, chọn một hành động thuộc ${label} lấy cảm hứng từ lá kết “${last.card.name.vi}” (${last.reversed ? "điều chỉnh / mở khóa" : "nuôi dưỡng"} ${last.card.keywords.vi[0]}). Viết thành việc dưới 30 phút — rồi làm. Tarot soi; bước đi là của bạn.`,
    };
  }

  const hooks: Record<TopicId, string> = {
    general: "the wider life picture",
    love: "the heart and bonds",
    career: "work and duty",
    finance: "resources and money habits",
    self: "inner maturation",
    family: "family and close circles",
    spirituality: "meaning and spirit",
  };
  return {
    overview: `A reading on ${label} — ${hooks[topic]}. ${intro}\n\nSequence: ${names}.\nIt opens in “${first.position}” (${first.card.name.en} / ${first.card.keywords.en[0]}) and closes in “${last.position}” (${last.card.name.en} / ${last.card.keywords.en[0]}). Read as a paced story, not a checklist.`,
    counsel: `Over the next 7 days, take one ${label.toLowerCase()} action inspired by the closing card “${last.card.name.en}” (${last.reversed ? "unblock/adjust" : "nurture"} ${last.card.keywords.en[0]}). Make it under 30 minutes — then do it. Tarot lights the path; the step is yours.`,
  };
}

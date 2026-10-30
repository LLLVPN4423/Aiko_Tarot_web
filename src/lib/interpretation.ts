import type { Locale } from "@/data/major-arcana";
import type { TarotCard } from "@/data/deck-index";
import type { TopicId } from "@/lib/tarot";
import { topicLenses } from "@/data/topic-lenses";
import {
  positionAwareCounsel,
  topicInterpretation,
  topicSynthesisNarrative,
} from "@/lib/topic-reading";

export type ReadingSection = {
  id: string;
  title: string;
  body: string;
};

export type DrawnForReading = {
  card: TarotCard;
  reversed: boolean;
  position: string;
};

function topicField(
  card: TarotCard,
  topic: TopicId,
  reversed: boolean,
  locale: Locale,
): string {
  return topicInterpretation(card, topic, reversed, locale);
}

function adviceForCard(
  card: TarotCard,
  reversed: boolean,
  locale: Locale,
  t: (vi: string, en: string) => string,
): string {
  const kw = card.keywords[locale][0] ?? "";
  if (reversed) {
    return t(
      `Thực hành: chậm lại quanh chủ đề “${kw}”. Chọn một hành động nhỏ chữa lệch (nói thật, nghỉ, hoặc cắt bớt) trong 48 giờ.`,
      `Practice: slow down around “${kw}”. Choose one corrective micro-action (honest talk, rest, or cutback) within 48 hours.`,
    );
  }
  return t(
    `Thực hành: nuôi năng lượng “${kw}” bằng một hành động cụ thể hôm nay — viết ra, nói ra, hoặc lịch hóa nó.`,
    `Practice: feed “${kw}” with one concrete act today — write it, speak it, or put it on the calendar.`,
  );
}

export function buildCardSections(options: {
  card: TarotCard;
  reversed: boolean;
  positionLabel: string;
  topic: TopicId;
  locale: Locale;
  t: (vi: string, en: string) => string;
  previous?: DrawnForReading | null;
  next?: DrawnForReading | null;
}): ReadingSection[] {
  const { card, reversed, positionLabel, topic, locale, t, previous, next } =
    options;
  const core = reversed ? card.reversed[locale] : card.upright[locale];
  const keywords = card.keywords[locale].join(" · ");

  const sections: ReadingSection[] = [
    {
      id: "position",
      title: t("Vị trí trong trải bài", "Spread position"),
      body: t(
        `${positionLabel} — đọc lá này như câu trả lời cho đúng ô này, không phải cho cả đời bạn.`,
        `${positionLabel} — read this card as an answer for this seat, not for your entire life.`,
      ),
    },
    {
      id: "orientation",
      title: t("Hướng lá", "Orientation"),
      body: reversed
        ? t(
            "Ngược — năng lượng đang nội tại, bị chặn, trì hoãn, hoặc cần nhìn từ phía bóng. Không tự động là 'xấu'; hãy hỏi đang thiếu gì để biểu hiện lành mạnh.",
            "Reversed — energy turns inward, blocked, delayed, or asks to be seen from its shadow side. Not automatically 'bad'; ask what is missing for healthy expression.",
          )
        : t(
            "Thuận — năng lượng biểu hiện trực tiếp, có thể hành động và quan sát ngoài đời.",
            "Upright — energy expresses directly; actionable and observable in daily life.",
          ),
    },
    {
      id: "keywords",
      title: t("Từ khóa", "Keywords"),
      body: keywords,
    },
    {
      id: "core",
      title: t("Ý nghĩa cốt lõi", "Core meaning"),
      body: core,
    },
    {
      id: "topic",
      title: t(
        `Theo chủ đề: ${topicLenses[topic].label.vi}`,
        `Topic focus: ${topicLenses[topic].label.en}`,
      ),
      body: topicField(card, topic, reversed, locale),
    },
    {
      id: "position-counsel",
      title: t("Lời khuyên theo vị trí", "Position counsel"),
      body: positionAwareCounsel(
        positionLabel,
        card,
        topic,
        reversed,
        locale,
      ),
    },
  ];

  if (card.symbolism?.[locale]) {
    sections.push({
      id: "symbolism",
      title: t("Biểu tượng & hình ảnh", "Symbolism & imagery"),
      body: card.symbolism[locale],
    });
  }

  if (previous) {
    sections.push({
      id: "bridge-prev",
      title: t("Cầu nối với lá trước", "Bridge from previous card"),
      body: t(
        `Từ “${previous.position}” (${previous.card.name.vi}${previous.reversed ? ", ngược" : ""}) sang đây: câu chuyện chuyển từ “${previous.card.keywords.vi[0]}” sang “${card.keywords.vi[0]}”. Hỏi điều gì đã thay đổi giữa hai nhịp.`,
        `From “${previous.position}” (${previous.card.name.en}${previous.reversed ? ", rev" : ""}) into this seat: the story moves from “${previous.card.keywords.en[0]}” toward “${card.keywords.en[0]}”. Ask what changed between the two beats.`,
      ),
    });
  }

  if (next) {
    sections.push({
      id: "bridge-next",
      title: t("Hướng tới lá sau", "Toward the next card"),
      body: t(
        `Lá này chuẩn bị cho “${next.position}” (${next.card.name.vi}). Giữ câu hỏi mở: nếu đây là nguyên nhân/điều kiện, lá sau có thể là hệ quả hoặc lời đáp.`,
        `This card prepares “${next.position}” (${next.card.name.en}). Hold an open question: if this is cause or condition, the next may be consequence or reply.`,
      ),
    });
  }

  sections.push({
    id: "advice",
    title: t("Lời khuyên thực hành", "Practical counsel"),
    body: adviceForCard(card, reversed, locale, t),
  });

  sections.push({
    id: "reflection",
    title: t("Câu hỏi suy ngẫm", "Reflection prompt"),
    body: t(
      `Nếu chỉ giữ một câu hỏi từ lá này: “Điều gì trong thông điệp về ${card.keywords.vi[0]} đang đúng với tuần này của tôi — và tôi sẽ làm gì khác đi?”`,
      `If you keep only one question from this card: “What in the message about ${card.keywords.en[0]} is true for my week — and what will I do differently?”`,
    ),
  });

  return sections;
}

function suitBalance(
  cards: DrawnForReading[],
  locale: Locale,
  t: (vi: string, en: string) => string,
): string {
  const counts: Record<string, number> = {
    major: 0,
    wands: 0,
    cups: 0,
    swords: 0,
    pentacles: 0,
  };
  for (const c of cards) {
    if (c.card.arcana === "major") counts.major += 1;
    else if (c.card.suit) counts[c.card.suit] += 1;
  }
  const parts: string[] = [];
  if (counts.major)
    parts.push(
      locale === "vi"
        ? `${counts.major} Major (bài học lớn / định mệnh nhỏ)`
        : `${counts.major} Major (big lessons / small fate)`,
    );
  if (counts.wands)
    parts.push(
      locale === "vi"
        ? `${counts.wands} Cung (hành động, lửa)`
        : `${counts.wands} Wands (action, fire)`,
    );
  if (counts.cups)
    parts.push(
      locale === "vi"
        ? `${counts.cups} Cốc (cảm xúc, nước)`
        : `${counts.cups} Cups (emotion, water)`,
    );
  if (counts.swords)
    parts.push(
      locale === "vi"
        ? `${counts.swords} Kiếm (tư duy, khí)`
        : `${counts.swords} Swords (mind, air)`,
    );
  if (counts.pentacles)
    parts.push(
      locale === "vi"
        ? `${counts.pentacles} Xu (thực tế, đất)`
        : `${counts.pentacles} Pentacles (material, earth)`,
    );

  const reversed = cards.filter((c) => c.reversed).length;
  const revNote =
    reversed === 0
      ? t(
          "Không có lá ngược — năng lượng thiên về biểu hiện thẳng.",
          "No reversals — energy leans toward direct expression.",
        )
      : t(
          `${reversed}/${cards.length} lá ngược — hãy chú ý chỗ bị kẹt hoặc cần nội quán.`,
          `${reversed}/${cards.length} reversed — notice where things stall or need inward work.`,
        );

  return t(
    `Cân bằng bộ bài: ${parts.join("; ")}. ${revNote}`,
    `Deck balance: ${parts.join("; ")}. ${revNote}`,
  );
}

export function buildSynthesis(options: {
  cards: DrawnForReading[];
  topic: TopicId;
  locale: Locale;
  t: (vi: string, en: string) => string;
}): { overview: string; arc: string; counsel: string; balance: string } {
  const { cards, topic, locale, t } = options;
  if (cards.length === 0) {
    return { overview: "", arc: "", counsel: "", balance: "" };
  }

  const first = cards[0];
  const last = cards[cards.length - 1];
  const mid = cards[Math.floor(cards.length / 2)];
  const narrative = topicSynthesisNarrative(cards, topic, locale);

  const arc = t(
    `Cung truyện: mở bằng “${first.position}” (${first.card.name.vi} — ${first.card.keywords.vi[0]}), điểm tựa giữa quanh “${mid.position}” (${mid.card.name.vi}), và hướng kết ở “${last.position}” (${last.card.name.vi} — ${last.card.keywords.vi[0]}). Nếu mở và kết trái dấu (thuận/ngược), câu chuyện đang đổi chiều — hãy tôn trọng sự chuyển đó.`,
    `Story arc: opens in “${first.position}” (${first.card.name.en} — ${first.card.keywords.en[0]}), pivots near “${mid.position}” (${mid.card.name.en}), and closes toward “${last.position}” (${last.card.name.en} — ${last.card.keywords.en[0]}). If open and close disagree in orientation, the story is changing direction — honor that turn.`,
  );

  return {
    overview: narrative.overview,
    arc,
    counsel: narrative.counsel,
    balance: suitBalance(cards, locale, t),
  };
}

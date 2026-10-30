import type { CardInterpretation, CombinationHit, QuestionAnalysis } from "./types";

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
  const { cards, combinations, analyzed } = options;
  const challenge =
    cards.find((c) => c.role === "challenge" || c.role === "obstacle") ??
    cards.find((c) => c.reversed) ??
    cards[0];
  const adviceCard =
    cards.find((c) => c.role === "advice" || c.role === "direction") ??
    cards[cards.length - 1];

  return {
    attend: {
      vi: `Chú ý “${challenge?.name.vi ?? "nhịp chính"}” ở ô ${challenge?.positionLabel ?? ""} — đó là chỗ đang xin ánh sáng.`,
      en: `Attend to “${challenge?.name.en ?? "the main pulse"}” in ${challenge?.positionLabel ?? ""} — that seat asks for light.`,
    },
    reconsider: {
      vi: `Xem lại giả định quanh chủ đề ${analyzed.topicHint}${combinations[0] ? `; cặp “${combinations[0].theme.vi}” gợi bạn đừng đọc từng lá tách rời` : ""}.`,
      en: `Reconsider assumptions around ${analyzed.topicHint}${combinations[0] ? `; the “${combinations[0].theme.en}” pairing asks you not to read cards in isolation` : ""}.`,
    },
    avoid: {
      vi:
        analyzed.topicHint === "finance"
          ? "Tránh quyết định tiền lớn chỉ vì một trải bài; dùng bài như gương thói quen, không như bảo chứng."
          : analyzed.focus === "relationship"
            ? "Tránh khẳng định ý nghĩ người khác như sự thật; giữ ngôn ngữ 'có thể / gợi ý'."
            : "Tránh đọc lại liên tục đến khi ra 'lá đẹp' — đó tạo phụ thuộc chứ không sáng suốt.",
      en:
        analyzed.topicHint === "finance"
          ? "Avoid major money moves from a spread alone; use it as a habit mirror, not a guarantee."
          : analyzed.focus === "relationship"
            ? "Avoid declaring another person's thoughts as fact; keep 'may / suggests' language."
            : "Avoid reshuffling until a 'pretty' card appears — that breeds dependency, not clarity.",
    },
    next: {
      vi: `Bước tiếp theo gắn với “${adviceCard?.name.vi ?? "lời khuyên"}”: chọn một hành động nhỏ trong 48 giờ (viết, nói, hoặc ranh giới).`,
      en: `Next step follows “${adviceCard?.name.en ?? "counsel"}”: one small act within 48 hours (write, speak, or set a boundary).`,
    },
  };
}

export function buildReflections(options: {
  cards: CardInterpretation[];
  analyzed: QuestionAnalysis;
}): { vi: string; en: string }[] {
  const { cards, analyzed } = options;
  const k = cards[0]?.name;
  return [
    {
      vi: `Điều gì trong trải bài về “${k?.vi ?? "chủ đề này"}” đang đúng với tuần này của tôi?`,
      en: `What in this spread about “${k?.en ?? "this theme"}” is true for my week?`,
    },
    {
      vi: `Nếu tôi chỉ thay một thói quen liên quan ${analyzed.topicHint}, đó sẽ là gì?`,
      en: `If I change only one habit related to ${analyzed.topicHint}, what would it be?`,
    },
    {
      vi: `Lá nào tôi muốn phủ nhận nhất — và vì sao?`,
      en: `Which card do I most want to deny — and why?`,
    },
  ];
}

export const ETHICS_NOTE = {
  vi: "Tarot ở đây là thực hành biểu tượng và phản tỉnh — không phải phương pháp khoa học dự báo tương lai. Không có bảo đảm sự kiện; với việc y tế, pháp lý, tài chính quan trọng hãy tìm chuyên gia phù hợp.",
  en: "Tarot here is symbolic reflective practice — not a scientifically verified forecasting method. No event is guaranteed; for medical, legal, or high-stakes financial matters, seek appropriate professionals.",
};

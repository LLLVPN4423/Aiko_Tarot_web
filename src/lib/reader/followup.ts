import type { ReadingSession } from "./session";

export function answerFollowUp(
  session: ReadingSession,
  prompt: string,
): { vi: string; en: string } {
  const q = prompt.trim().toLowerCase();
  const { result } = session;
  const cards = result.cards;

  const cardHit = cards.find((c) => {
    const vi = c.name.vi.toLowerCase();
    const en = c.name.en.toLowerCase();
    return q.includes(en.toLowerCase()) || q.includes(vi) || q.includes(c.slug);
  });

  if (/ngược|reversed|reverse/.test(q) && cardHit) {
    const approach = cardHit.approach
      ? cardHit.sections.find((s) => s.id === "approach")?.body
      : undefined;
    return {
      vi: `Về ${cardHit.name.vi} ngược ở ô “${cardHit.positionLabel}”: ${approach?.vi ?? cardHit.sections.find((s) => s.id === "core")?.body.vi ?? ""}. Đây là diễn giải trong ngữ cảnh trải hiện tại, không phải định nghĩa từ điển tách rời.`,
      en: `On reversed ${cardHit.name.en} in “${cardHit.positionLabel}”: ${approach?.en ?? cardHit.sections.find((s) => s.id === "core")?.body.en ?? ""}. This is contextual to this spread, not a standalone dictionary gloss.`,
    };
  }

  if (cardHit && (/giải|explain|mean|ý nghĩa|nói về/.test(q) || q.length < 40)) {
    const core = cardHit.sections.find((s) => s.id === "core")?.body;
    const topic = cardHit.transparency.topic;
    return {
      vi: `${cardHit.name.vi} (${cardHit.reversed ? "ngược" : "thuận"}) tại “${cardHit.positionLabel}”: ${core?.vi ?? ""} Theo chủ đề: ${topic.vi}`,
      en: `${cardHit.name.en} (${cardHit.reversed ? "rev" : "up"}) in “${cardHit.positionLabel}”: ${core?.en ?? ""} Topic lens: ${topic.en}`,
    };
  }

  if (/cặp|together|combination|hai lá|why.*appear|tại sao.*cùng/.test(q)) {
    const combo = result.combinations[0];
    if (combo) {
      return {
        vi: `Cặp “${combo.theme.vi}” (${combo.a} + ${combo.b}) giữa ô ${combo.positions[0]} và ${combo.positions[1]}: ${combo.meaning.vi}${combo.caution ? ` Lưu ý: ${combo.caution.vi}` : ""}`,
        en: `Pair “${combo.theme.en}” (${combo.a} + ${combo.b}) between ${combo.positions[0]} and ${combo.positions[1]}: ${combo.meaning.en}${combo.caution ? ` Note: ${combo.caution.en}` : ""}`,
      };
    }
    return {
      vi: "Trong trải này chưa có cặp curated nổi; hãy nhìn nguyên tố và Major trong phần mô típ.",
      en: "No curated pair fired in this spread; use the pattern section on elements and Majors.",
    };
  }

  if (/quan hệ|relationship|love|tình/.test(q)) {
    const rel = cards.filter(
      (c) =>
        c.role === "relationship" ||
        c.role === "other" ||
        c.role === "self" ||
        result.topic === "love",
    );
    const focus = rel[0] ?? cards[0];
    return {
      vi: `Với quan hệ (phản tỉnh, không đọc ý nghĩ người khác): nhìn ${focus.name.vi} ở “${focus.positionLabel}”. ${focus.transparency.topic.vi} Giữ ngôn ngữ khả năng, không khẳng định tuyệt đối.`,
      en: `For relationship (reflective, not mind-reading): see ${focus.name.en} in “${focus.positionLabel}”. ${focus.transparency.topic.en} Keep possibility language; no absolute claims.`,
    };
  }

  if (/chú ý|attend|watch|pay attention|nên làm|next|tiếp/.test(q)) {
    return {
      vi: `${result.guidance.attend.vi} ${result.guidance.next.vi}`,
      en: `${result.guidance.attend.en} ${result.guidance.next.en}`,
    };
  }

  return {
    vi: `Dựa trên trải hiện tại (${cards.map((c) => c.name.vi).join(", ")}): ${result.narrative.vi} Bạn có thể hỏi về một lá cụ thể, một cặp, hoặc “tôi nên chú ý gì?”`,
    en: `From this spread (${cards.map((c) => c.name.en).join(", ")}): ${result.narrative.en} You can ask about a specific card, a pair, or “what should I watch?”`,
  };
}

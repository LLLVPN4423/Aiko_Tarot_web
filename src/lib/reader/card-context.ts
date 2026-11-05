import type {
  KnowledgeCard,
  ReadingDepth,
  ReadingTopicId,
  ReversedApproach,
} from "@/data/knowledge/types";
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

/** How this seat should be read — short, plain language. */
function seatBridge(
  role: PositionRole,
  positionLabel: string,
  topic: ReadingTopicId,
): { vi: string; en: string } {
  const topicVi: Record<ReadingTopicId, string> = {
    general: "bức tranh chung",
    love: "tình cảm / gắn kết",
    career: "công việc",
    finance: "tiền bạc / nguồn lực",
    self: "bản thân",
    family: "gia đình / vòng gần",
    spirituality: "đường nội tâm",
  };
  const topicEn: Record<ReadingTopicId, string> = {
    general: "the wider picture",
    love: "love / connection",
    career: "work",
    finance: "money / resources",
    self: "yourself",
    family: "family / close circle",
    spirituality: "inner path",
  };
  const tVi = topicVi[topic];
  const tEn = topicEn[topic];

  const byRole: Partial<
    Record<PositionRole, { vi: string; en: string }>
  > = {
    past: {
      vi: `Ô “${positionLabel}”: đây là gốc đang còn ảnh hưởng tới ${tVi}.`,
      en: `“${positionLabel}”: this is the root still shaping ${tEn}.`,
    },
    present: {
      vi: `Ô “${positionLabel}”: đây là việc đang xảy ra với ${tVi} lúc này.`,
      en: `“${positionLabel}”: this is what is happening with ${tEn} now.`,
    },
    future: {
      vi: `Ô “${positionLabel}”: nếu giữ hướng hiện tại, ${tVi} có thể nghiêng về đây — không phải định mệnh cứng.`,
      en: `“${positionLabel}”: if you keep this path, ${tEn} may lean here — not fixed fate.`,
    },
    situation: {
      vi: `Ô “${positionLabel}”: đây là bối cảnh ${tVi} đang đứng.`,
      en: `“${positionLabel}”: this is the situation around ${tEn}.`,
    },
    challenge: {
      vi: `Ô “${positionLabel}”: đây là chỗ đang làm ${tVi} khó chịu hoặc chậm lại.`,
      en: `“${positionLabel}”: this is where ${tEn} feels stuck or strained.`,
    },
    obstacle: {
      vi: `Ô “${positionLabel}”: đây là trở ngại chính quanh ${tVi}.`,
      en: `“${positionLabel}”: this is the main snag around ${tEn}.`,
    },
    advice: {
      vi: `Ô “${positionLabel}”: đây là hướng xử lý hữu ích cho ${tVi}.`,
      en: `“${positionLabel}”: this is useful counsel for ${tEn}.`,
    },
    direction: {
      vi: `Ô “${positionLabel}”: đây là hướng có thể đi tiếp với ${tVi}.`,
      en: `“${positionLabel}”: this is a workable direction for ${tEn}.`,
    },
    outcome: {
      vi: `Ô “${positionLabel}”: đây là kết quả tiềm năng của ${tVi} nếu các lực hiện tại tiếp tục.`,
      en: `“${positionLabel}”: a possible outcome for ${tEn} if current forces continue.`,
    },
    foundation: {
      vi: `Ô “${positionLabel}”: đây là nền tảng sâu dưới ${tVi}.`,
      en: `“${positionLabel}”: this is the deeper base under ${tEn}.`,
    },
    root: {
      vi: `Ô “${positionLabel}”: đây là gốc rễ của vấn đề ${tVi}.`,
      en: `“${positionLabel}”: this is the root of the ${tEn} issue.`,
    },
    self: {
      vi: `Ô “${positionLabel}”: đây là cách bạn đang đứng trong ${tVi}.`,
      en: `“${positionLabel}”: this is how you are showing up in ${tEn}.`,
    },
    other: {
      vi: `Ô “${positionLabel}”: đây là năng lượng biểu tượng về phía kia — đọc nhẹ, đừng đoán ý nghĩ họ như sự thật.`,
      en: `“${positionLabel}”: symbolic energy of the other side — read lightly; don’t treat it as mind-reading.`,
    },
    relationship: {
      vi: `Ô “${positionLabel}”: đây là động thái đang chảy giữa hai phía.`,
      en: `“${positionLabel}”: this is what is flowing between you.`,
    },
    conscious: {
      vi: `Ô “${positionLabel}”: đây là điều bạn đang cố nhắm tới trong ${tVi}.`,
      en: `“${positionLabel}”: this is what you are consciously aiming for in ${tEn}.`,
    },
    environment: {
      vi: `Ô “${positionLabel}”: đây là hoàn cảnh / người quanh bạn đang tô màu ${tVi}.`,
      en: `“${positionLabel}”: this is the setting coloring ${tEn}.`,
    },
    hopes_fears: {
      vi: `Ô “${positionLabel}”: đây là hy vọng và lo sợ đang kéo ${tVi}.`,
      en: `“${positionLabel}”: hopes and fears pulling on ${tEn}.`,
    },
    opportunity: {
      vi: `Ô “${positionLabel}”: đây là cửa đang mở (hoặc có thể mở) cho ${tVi}.`,
      en: `“${positionLabel}”: an opening for ${tEn}.`,
    },
    mind: {
      vi: `Ô “${positionLabel}”: đây là tầng suy nghĩ / câu chuyện bạn kể cho mình.`,
      en: `“${positionLabel}”: the mind layer — self-talk and thoughts.`,
    },
    body: {
      vi: `Ô “${positionLabel}”: đây là nhịp sống / thói quen thể hiện ra ngoài.`,
      en: `“${positionLabel}”: lived rhythm and habits.`,
    },
    spirit: {
      vi: `Ô “${positionLabel}”: đây là tầng ý nghĩa / niềm tin đang gọi.`,
      en: `“${positionLabel}”: meaning and belief calling for attention.`,
    },
    core: {
      vi: `Ô “${positionLabel}”: thông điệp trung tâm cho ${tVi}.`,
      en: `“${positionLabel}”: the core message for ${tEn}.`,
    },
  };

  return (
    byRole[role] ?? {
      vi: `Ô “${positionLabel}” trong ${tVi}:`,
      en: `“${positionLabel}” for ${tEn}:`,
    }
  );
}

function topicCloser(
  topic: ReadingTopicId,
  kwVi: string,
  kwEn: string,
  reversed: boolean,
): { vi: string; en: string } {
  if (reversed) {
    const rev: Record<ReadingTopicId, { vi: string; en: string }> = {
      general: {
        vi: `Với bức tranh chung: hãy tìm chỗ “${kwVi}” đang bị kẹt hoặc né tránh, rồi chỉnh một điểm nhỏ.`,
        en: `Overall: find where “${kwEn}” is stuck or avoided, then adjust one small point.`,
      },
      love: {
        vi: `Với tình cảm: đừng đọc đây là “hết rồi” — hãy hỏi bạn đang né cảm xúc hoặc ranh giới nào quanh “${kwVi}”.`,
        en: `In love: this is not automatic “it’s over” — ask what feeling or boundary around “${kwEn}” you are avoiding.`,
      },
      career: {
        vi: `Với công việc: “${kwVi}” đang lệch nhịp — làm rõ một ưu tiên thay vì ôm hết.`,
        en: `At work: “${kwEn}” is off-tempo — clarify one priority instead of carrying everything.`,
      },
      finance: {
        vi: `Với tiền bạc: soi thói quen quanh “${kwVi}” (rò rỉ, trì hoãn, sợ quyết) — đây là gương, không phải lời khuyên đầu tư.`,
        en: `With money: mirror habits around “${kwEn}” (leaks, delay, fear) — a mirror, not investment advice.`,
      },
      self: {
        vi: `Với bản thân: “${kwVi}” đang chỉ chỗ cần chăm, không phải chỗ để tự trách.`,
        en: `For yourself: “${kwEn}” marks what needs care, not what to punish.`,
      },
      family: {
        vi: `Với gia đình: làm rõ nhu cầu của bạn quanh “${kwVi}” thay vì đoán ý người thân.`,
        en: `With family: clarify your need around “${kwEn}” instead of guessing theirs.`,
      },
      spirituality: {
        vi: `Với nội tâm: trở lại thực hành nhỏ chân thật quanh “${kwVi}”, đừng ép phải “ngộ” ngay.`,
        en: `Inwardly: return to a small honest practice around “${kwEn}”; don’t force a breakthrough.`,
      },
    };
    return rev[topic];
  }

  const up: Record<ReadingTopicId, { vi: string; en: string }> = {
    general: {
      vi: `Với bức tranh chung: giữ “${kwVi}” như ưu tiên tuần này — một việc cụ thể là đủ.`,
      en: `Overall: keep “${kwEn}” as this week’s priority — one concrete act is enough.`,
    },
    love: {
      vi: `Với tình cảm: “${kwVi}” đang nói về cách bạn kết nối — trung thực và ranh giới quan trọng hơn kịch bản đẹp.`,
      en: `In love: “${kwEn}” is about how you connect — honesty and boundaries beat a pretty script.`,
    },
    career: {
      vi: `Với công việc: biến “${kwVi}” thành một việc làm được (tin nhắn, quyết định, hoặc ranh giới).`,
      en: `At work: turn “${kwEn}” into one doable act (a message, a decision, or a boundary).`,
    },
    finance: {
      vi: `Với tiền bạc: đọc “${kwVi}” như thói quen nguồn lực — ổn định và rủi ro, không phải dự báo số.`,
      en: `With money: read “${kwEn}” as resource habits — stability and risk, not a number forecast.`,
    },
    self: {
      vi: `Với bản thân: “${kwVi}” là bài học cần chăm, không phải mục tiêu tối ưu thêm.`,
      en: `For yourself: “${kwEn}” is a lesson to tend, not another optimization target.`,
    },
    family: {
      vi: `Với gia đình: “${kwVi}” gợi vai trò hoặc không khí cần nói rõ hơn.`,
      en: `With family: “${kwEn}” points to a role or climate that needs clearer words.`,
    },
    spirituality: {
      vi: `Với nội tâm: để “${kwVi}” thành một nghi thức nhỏ (thở, viết, im lặng), không chỉ suy nghĩ.`,
      en: `Inwardly: let “${kwEn}” become a small ritual (breath, writing, silence), not only thinking.`,
    },
  };
  return up[topic];
}

function shortAdvice(
  reversed: boolean,
  kwVi: string,
  kwEn: string,
  role: PositionRole,
): { vi: string; en: string } {
  if (role === "advice" || role === "direction" || role === "outcome") {
    return reversed
      ? {
          vi: `Việc nhỏ: chậm lại quanh “${kwVi}” — chọn một chỉnh trong 48 giờ (nói thật, nghỉ, hoặc cắt bớt).`,
          en: `Small step: slow down around “${kwEn}” — one correction in 48 hours (honesty, rest, or cutback).`,
        }
      : {
          vi: `Việc nhỏ: làm một hành động cụ thể nuôi “${kwVi}” hôm nay.`,
          en: `Small step: one concrete act that feeds “${kwEn}” today.`,
        };
  }
  if (role === "challenge" || role === "obstacle") {
    return {
      vi: `Đừng cố “thắng” chỗ này ngay — đặt tên nó, rồi chọn lối đi vòng nếu cần.`,
      en: `Don’t try to “win” this seat immediately — name it, then take a side door if needed.`,
    };
  }
  return reversed
    ? {
        vi: `Giữ câu hỏi: “${kwVi}” đang bị chặn chỗ nào — và tôi có thể nới một nút không?`,
        en: `Hold this question: where is “${kwEn}” blocked — and can I loosen one knot?`,
      }
    : {
        vi: `Giữ câu hỏi: “${kwVi}” đang đúng với tuần này của tôi ở điểm nào?`,
        en: `Hold this question: where is “${kwEn}” true for my week?`,
      };
}

/**
 * One clear meaning paragraph + one short tip.
 * Deep adds at most one extra note (reversal or symbolism), not a wall of sections.
 */
export function interpretCard(options: {
  drawn: DrawnInput;
  card: KnowledgeCard;
  topic: ReadingTopicId;
  depth: ReadingDepth;
  analyzed: QuestionAnalysis;
}): CardInterpretation {
  const { drawn, card, topic, depth, analyzed } = options;
  const profile = drawn.reversed ? card.reversed : card.upright;
  const kwVi = card.keywords.vi[0] ?? card.name.vi;
  const kwEn = card.keywords.en[0] ?? card.name.en;
  const approach = drawn.reversed
    ? pickApproach(card, drawn.role, analyzed)
    : undefined;

  const bridge = seatBridge(drawn.role, drawn.positionLabel, topic);
  const closer = topicCloser(topic, kwVi, kwEn, drawn.reversed);
  const coreVi = profile.core.vi;
  const coreEn = profile.core.en;

  const meaning = {
    vi: `${bridge.vi} ${coreVi} ${closer.vi}`,
    en: `${bridge.en} ${coreEn} ${closer.en}`,
  };
  const advice = shortAdvice(drawn.reversed, kwVi, kwEn, drawn.role);

  const sections: CardInterpretation["sections"] = [
    {
      id: "meaning",
      title: { vi: "Ý nghĩa", en: "Meaning" },
      body: meaning,
    },
    {
      id: "advice",
      title: { vi: "Gợi ý nhỏ", en: "Small tip" },
      body: advice,
    },
  ];

  if (depth === "deep") {
    if (drawn.reversed && approach) {
      sections.push({
        id: "approach",
        title: { vi: "Khi lá ngược", en: "On the reversal" },
        body: card.reversed.approachHints[approach],
      });
    } else if (card.symbolism.vi) {
      sections.push({
        id: "symbolism",
        title: { vi: "Hình ảnh", en: "Imagery" },
        body: card.symbolism,
      });
    }
  }

  // quick: meaning only
  const finalSections =
    depth === "quick" ? sections.filter((s) => s.id === "meaning") : sections;

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
    sections: finalSections,
    transparency: {
      traditional: profile.core,
      position: bridge,
      topic: closer,
    },
  };
}

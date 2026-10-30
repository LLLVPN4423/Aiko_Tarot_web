import type { TarotCard } from "@/data/deck-index";
import type { Suit } from "@/data/deck-types";
import { majorMetaBySlug } from "./major-meta";
import type {
  ElementId,
  KnowledgeCard,
  OrientationProfile,
  ReadingTopicId,
  ReversedApproach,
  ReversedProfile,
  TopicOrientationCopy,
} from "./types";

const SUIT_ELEMENT: Record<Suit, ElementId> = {
  wands: "fire",
  cups: "water",
  swords: "air",
  pentacles: "earth",
};

const RANK_VALUE: Record<string, number> = {
  ace: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  page: 11,
  knight: 12,
  queen: 13,
};

function L(vi: string, en: string) {
  return { vi, en };
}

function facetFromCore(
  coreVi: string,
  coreEn: string,
  kwVi: string,
  kwEn: string,
  kind: "up" | "rev",
): OrientationProfile {
  if (kind === "up") {
    return {
      core: L(coreVi, coreEn),
      psychological: L(
        `Về tâm lý: năng lượng “${kwVi}” đang mở lối nhận thức — ${coreVi}`,
        `Psychologically, “${kwEn}” is opening awareness — ${coreEn}`,
      ),
      emotional: L(
        `Về cảm xúc: hãy để “${kwVi}” được cảm nhận rõ mà không bị cường điệu.`,
        `Emotionally, let “${kwEn}” be felt clearly without exaggeration.`,
      ),
      behavioral: L(
        `Về hành vi: một hành động nhỏ phù hợp với “${kwVi}” sẽ hữu ích hơn lời hứa lớn.`,
        `Behaviorally, one small act aligned with “${kwEn}” helps more than a grand promise.`,
      ),
      opportunities: L(
        `Cơ hội: dùng “${kwVi}” để làm rõ ưu tiên và tiến một bước cụ thể.`,
        `Opportunity: use “${kwEn}” to clarify priorities and take one concrete step.`,
      ),
      challenges: L(
        `Thách thức: đừng biến “${kwVi}” thành áp lực phải hoàn hảo ngay.`,
        `Challenge: do not turn “${kwEn}” into pressure for instant perfection.`,
      ),
      advice: L(
        `Lời khuyên: giữ “${kwVi}” trong tầm tay — quan sát, rồi chọn một việc làm được hôm nay.`,
        `Advice: keep “${kwEn}” practical — observe, then choose one doable act today.`,
      ),
      outcomes: L(
        `Hướng có thể xảy ra: nếu nuôi dưỡng “${kwVi}”, tình huống có xu hướng rõ ràng và dễ hành động hơn.`,
        `Possible direction: tending “${kwEn}” often makes the situation clearer and more actionable.`,
      ),
    };
  }
  return {
    core: L(coreVi, coreEn),
    psychological: L(
      `Về tâm lý (ngược): “${kwVi}” đang bị kẹt, nội tại hóa, hoặc biểu hiện lệch — ${coreVi}`,
      `Psychologically (reversed): “${kwEn}” may be stuck, internalized, or skewed — ${coreEn}`,
    ),
    emotional: L(
      `Về cảm xúc: chú ý chỗ né tránh hoặc phóng đại quanh “${kwVi}”.`,
      `Emotionally, notice avoidance or exaggeration around “${kwEn}”.`,
    ),
    behavioral: L(
      `Về hành vi: tạm chậm lại; kiểm tra động cơ trước khi đẩy “${kwVi}” ra ngoài.`,
      `Behaviorally, slow down; check motives before pushing “${kwEn}” outward.`,
    ),
    opportunities: L(
      `Cơ hội trong nghịch: nhận diện chỗ lệch giúp sửa hướng sớm.`,
      `Opportunity in reversal: naming the skew helps correct course early.`,
    ),
    challenges: L(
      `Thách thức: tiếp tục phủ nhận sẽ làm “${kwVi}” càng khó điều hướng.`,
      `Challenge: denial makes “${kwEn}” harder to steer.`,
    ),
    advice: L(
      `Lời khuyên: chọn một chỉnh nhẹ (ranh giới, nghỉ, nói thật) quanh “${kwVi}” trong 48 giờ.`,
      `Advice: choose one gentle correction (boundary, rest, honesty) around “${kwEn}” within 48 hours.`,
    ),
    outcomes: L(
      `Hướng có thể xảy ra: khi đảo chiều được nhìn nhận, năng lượng thường dần trở lại cân bằng hơn là “xấu đi mãi”.`,
      `Possible direction: when the reversal is faced, energy often rebalances rather than worsening endlessly.`,
    ),
  };
}

function reversedApproaches(
  kwVi: string,
  kwEn: string,
): Record<ReversedApproach, { vi: string; en: string }> {
  return {
    blocked: L(
      `Năng lượng “${kwVi}” đang bị chặn — cần tìm nút thắt cụ thể thay vì tự trách.`,
      `“${kwEn}” energy is blocked — find the concrete knot rather than self-blame.`,
    ),
    internalized: L(
      `“${kwVi}” đang hướng vào trong — quá trình nội tâm quan trọng hơn biểu diễn bên ngoài.`,
      `“${kwEn}” turns inward — inner process matters more than outer display.`,
    ),
    excessive: L(
      `“${kwVi}” đang thái quá — bớt cường độ, giữ phần tinh túy.`,
      `“${kwEn}” is excessive — dial intensity down; keep the essence.`,
    ),
    delayed: L(
      `“${kwVi}” đang trì hoãn — thời điểm chưa chín; chuẩn bị hơn là ép.`,
      `“${kwEn}” is delayed — timing is unripe; prepare rather than force.`,
    ),
    shadow: L(
      `“${kwVi}” hiện ở mặt bóng — nhìn thẳng phần khó chịu để lấy lại quyền lựa chọn.`,
      `“${kwEn}” shows its shadow — face the uncomfortable part to regain choice.`,
    ),
  };
}

function topicBundle(
  card: TarotCard,
  kwVi: string,
  kwEn: string,
  upVi: string,
  upEn: string,
  revVi: string,
  revEn: string,
): Record<ReadingTopicId, TopicOrientationCopy> {
  const loveUp = card.loveMeaning
    ? L(card.loveMeaning.vi, card.loveMeaning.en)
    : L(
        `Trong tình cảm: “${kwVi}” tô màu cách bạn kết nối. ${upVi}`,
        `In love: “${kwEn}” colors how you connect. ${upEn}`,
      );
  const loveRev = L(
    `Trong tình cảm (ngược): kiểm tra né tránh, kỳ vọng lệch, hoặc ranh giới quanh “${kwVi}”. ${revVi}`,
    `In love (reversed): check avoidance, skewed expectations, or boundaries around “${kwEn}”. ${revVi}`,
  );

  const careerUp = card.careerMeaning
    ? L(card.careerMeaning.vi, card.careerMeaning.en)
    : L(
        `Trong công việc: “${kwVi}” gợi hành động nghề nghiệp thực tế. ${upVi}`,
        `At work: “${kwEn}” suggests practical professional action. ${upEn}`,
      );
  const careerRev = L(
    `Trong công việc (ngược): tránh phân tán hoặc tự phá; làm rõ một ưu tiên. ${revVi}`,
    `At work (reversed): avoid scatter or self-sabotage; clarify one priority. ${revEn}`,
  );

  const growthUp = card.personalGrowthMeaning
    ? L(card.personalGrowthMeaning.vi, card.personalGrowthMeaning.en)
    : L(
        `Phát triển bản thân: “${kwVi}” là bài học nội tâm. ${upVi}`,
        `Personal growth: “${kwEn}” is an inner lesson. ${upEn}`,
      );
  const growthRev = L(
    `Phát triển (ngược): đừng bỏ qua tín hiệu khó chịu — đó là chỗ cần chăm. ${revVi}`,
    `Growth (reversed): do not ignore the uncomfortable signal — that is the work. ${revEn}`,
  );

  const spiritUp = card.spiritualityMeaning
    ? L(card.spiritualityMeaning.vi, card.spiritualityMeaning.en)
    : L(
        `Tâm linh: “${kwVi}” mời lắng nghe sâu hơn lời ồn. ${upVi}`,
        `Spirit: “${kwEn}” invites listening beneath the noise. ${upEn}`,
      );
  const spiritRev = L(
    `Tâm linh (ngược): tránh ép giác ngộ; trở lại thực hành nhỏ và chân thật. ${revVi}`,
    `Spirit (reversed): avoid forcing awakening; return to small honest practice. ${revEn}`,
  );

  const generalUp = L(
    `Tổng quát: ${upVi}`,
    `General: ${upEn}`,
  );
  const generalRev = L(
    `Tổng quát (ngược): ${revVi}`,
    `General (reversed): ${revEn}`,
  );

  const financeUp = L(
    `Tài chính / vật chất: đọc “${kwVi}” như thói quen nguồn lực — ngân sách, rủi ro, và sự ổn định. ${upVi} Đây là gợi ý phản tỉnh, không phải tư vấn tài chính chuyên nghiệp.`,
    `Finance / material: read “${kwEn}” as resource habits — budget, risk, and stability. ${upEn} Reflective guidance only — not professional financial advice.`,
  );
  const financeRev = L(
    `Tài chính (ngược): chú ý rò rỉ, trì hoãn quyết định tiền bạc, hoặc sợ hãi chi phối. ${revVi} Cân nhắc chuyên gia nếu vấn đề nghiêm trọng.`,
    `Finance (reversed): watch leaks, deferred money decisions, or fear-driven choices. ${revEn} Seek a professional if stakes are high.`,
  );

  const familyUp = L(
    `Gia đình / xã hội: “${kwVi}” nói về vai trò, kỳ vọng, và không khí chung. ${upVi}`,
    `Family / social: “${kwEn}” speaks to roles, expectations, and shared climate. ${upEn}`,
  );
  const familyRev = L(
    `Gia đình (ngược): ranh giới hoặc hiểu lầm có thể đang làm căng — làm rõ nhu cầu thay vì đoán. ${revVi}`,
    `Family (reversed): boundaries or misunderstandings may tense the field — clarify needs instead of guessing. ${revEn}`,
  );

  return {
    general: { upright: generalUp, reversed: generalRev },
    love: { upright: loveUp, reversed: loveRev },
    career: { upright: careerUp, reversed: careerRev },
    finance: { upright: financeUp, reversed: financeRev },
    self: { upright: growthUp, reversed: growthRev },
    family: { upright: familyUp, reversed: familyRev },
    spirituality: { upright: spiritUp, reversed: spiritRev },
  };
}

function parseRank(slug: string): { rank?: string; rankValue?: number } {
  const parts = slug.split("-");
  if (parts.length < 2) return {};
  const slugRank = parts.slice(1).join("-");
  return { rank: slugRank, rankValue: RANK_VALUE[slugRank] };
}

export function assembleKnowledgeCard(card: TarotCard): KnowledgeCard {
  const kwVi = card.keywords.vi[0] ?? card.name.vi;
  const kwEn = card.keywords.en[0] ?? card.name.en;
  const upVi = card.upright.vi;
  const upEn = card.upright.en;
  const revVi = card.reversed.vi;
  const revEn = card.reversed.en;

  const majorMeta =
    card.arcana === "major" ? majorMetaBySlug[card.slug] : undefined;
  const { rank, rankValue } =
    card.arcana === "minor" ? parseRank(card.slug) : {};

  const element: ElementId =
    majorMeta?.element ??
    (card.suit ? SUIT_ELEMENT[card.suit] : "spirit");

  const numerology =
    majorMeta?.numerology ??
    (rankValue !== undefined && rankValue <= 10 ? rankValue : undefined);

  const symbolism = card.symbolism
    ? L(card.symbolism.vi, card.symbolism.en)
    : L(
        `Hình ảnh Celestial Cat nhấn mạnh “${kwVi}” qua biểu tượng mèo và bầu trời — đọc như ẩn dụ nội tâm hơn là điềm báo cứng.`,
        `Celestial Cat imagery emphasizes “${kwEn}” through feline and sky symbols — read as inner metaphor, not rigid omen.`,
      );

  const upright = facetFromCore(upVi, upEn, kwVi, kwEn, "up");
  const reversedBase = facetFromCore(revVi, revEn, kwVi, kwEn, "rev");
  const reversed: ReversedProfile = {
    ...reversedBase,
    defaultApproach: "blocked",
    approachHints: reversedApproaches(kwVi, kwEn),
  };

  return {
    id: card.id,
    slug: card.slug,
    arcana: card.arcana,
    suit: card.suit,
    rank,
    rankValue,
    element,
    numerology,
    archetype: majorMeta?.archetype ?? {
      vi: [kwVi, card.suit ? `Cung ${card.suit}` : "Ẩn dụ nhỏ"],
      en: [kwEn, card.suit ? `${card.suit} suit` : "Minor theme"],
    },
    keywords: card.keywords,
    symbolism,
    traditionalSummary: L(
      `Nền tảng truyền thống xoay quanh “${kwVi}”. ${upVi}`,
      `Traditional foundation centers on “${kwEn}”. ${upEn}`,
    ),
    deckSpecificNote: L(
      `Trong Celestial Cat Tarot, lá này giữ bản sắc bộ bài mèo vũ trụ — giải nghĩa gắn với chăm sóc, trực giác, và bầu trời nội tâm.`,
      `In Celestial Cat Tarot, this card keeps the cosmic-cat deck voice — care, intuition, and inner sky.`,
    ),
    astrology: majorMeta?.astrology
      ? {
          label: L(majorMeta.astrology.vi, majorMeta.astrology.en),
          tradition: majorMeta.astrology.tradition,
        }
      : undefined,
    upright,
    reversed,
    topics: topicBundle(card, kwVi, kwEn, upVi, upEn, revVi, revEn),
    references: [
      {
        tradition: "celestial-cat",
        note: L(
          "Diễn giải gốc cho bộ Celestial Cat (72 lá), không sao chép guidebook có bản quyền.",
          "Original Celestial Cat (72-card) wording; no copyrighted guidebook text.",
        ),
      },
      ...(majorMeta
        ? [
            {
              tradition: "rws" as const,
              note: L(
                "Tương ứng biểu tượng/chiêm tinh phổ biến trong dòng Rider–Waite–Smith / Golden Dawn — dùng làm nền, không độc quyền.",
                "Common RWS / Golden Dawn symbolic correspondences used as foundation, not monopoly.",
              ),
            },
          ]
        : [
            {
              tradition: "general" as const,
              note: L(
                "Tiểu Arcana theo hệ nguyên tố cổ điển (Lửa/Nước/Khí/Đất) và thứ hạng số.",
                "Minor Arcana via classical elements (Fire/Water/Air/Earth) and rank numerology.",
              ),
            },
          ]),
    ],
    imagePath: card.imagePath,
    name: card.name,
  };
}

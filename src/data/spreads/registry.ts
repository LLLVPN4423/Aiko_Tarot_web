import type { SpreadDefinition } from "./types";

export const spreadRegistry: SpreadDefinition[] = [
  {
    id: "single",
    family: "single",
    label: { vi: "1 lá", en: "1 card" },
    blurb: {
      vi: "Một thông điệp trung tâm cho câu hỏi của bạn.",
      en: "One core message for your question.",
    },
    purpose: {
      vi: "Lấy mạch chính, lời khuyên ngắn, và điểm phản tỉnh.",
      en: "Core pulse, brief counsel, and a reflection point.",
    },
    cardCount: 1,
    layoutCols: 1,
    positions: [
      {
        id: "core",
        role: "core",
        label: { vi: "Thông điệp chính", en: "Core message" },
        hint: {
          vi: "Đọc như năng lượng hiện tại + lời khuyên then chốt.",
          en: "Read as current energy plus the key counsel.",
        },
        col: 1,
        row: 1,
      },
    ],
    followUpPrompts: {
      vi: [
        "Lá này muốn tôi chú ý điều gì nhất?",
        "Tôi có thể làm gì thực tế trong 24 giờ?",
      ],
      en: [
        "What does this card most want me to notice?",
        "What practical step can I take in 24 hours?",
      ],
    },
  },
  {
    id: "three-time",
    family: "three",
    label: {
      vi: "3 lá — Quá khứ · Hiện tại · Tương lai",
      en: "3 cards — Past · Present · Future",
    },
    blurb: {
      vi: "Dòng chảy thời gian và lời khuyên.",
      en: "Timeline flow and guidance.",
    },
    purpose: {
      vi: "Nhìn chuỗi nhân quả theo thời gian.",
      en: "See cause-and-effect across time.",
    },
    cardCount: 3,
    layoutCols: 3,
    positions: [
      {
        id: "past",
        role: "past",
        label: { vi: "Quá khứ", en: "Past" },
        hint: {
          vi: "Gốc rễ hoặc ảnh hưởng gần đây vẫn còn vọng.",
          en: "Root or recent influence still echoing.",
        },
        col: 1,
        row: 1,
        relatesTo: ["present"],
      },
      {
        id: "present",
        role: "present",
        label: { vi: "Hiện tại", en: "Present" },
        hint: {
          vi: "Trung tâm câu chuyện đang sống.",
          en: "The living center of the story.",
        },
        col: 2,
        row: 1,
        relatesTo: ["past", "future"],
      },
      {
        id: "future",
        role: "future",
        label: { vi: "Tương lai", en: "Future" },
        hint: {
          vi: "Hướng có thể nếu xu hướng hiện tại tiếp tục — không phải định mệnh cứng.",
          en: "Likely direction if present trends continue — not fixed fate.",
        },
        col: 3,
        row: 1,
        relatesTo: ["present"],
      },
    ],
    followUpPrompts: {
      vi: [
        "Quá khứ đang níu hiện tại thế nào?",
        "Tôi cần điều chỉnh gì để tương lai dịu hơn?",
      ],
      en: [
        "How is the past gripping the present?",
        "What should I adjust for a kinder future path?",
      ],
    },
  },
  {
    id: "three-advice",
    family: "three",
    label: {
      vi: "3 lá — Tình huống · Thách thức · Lời khuyên",
      en: "3 cards — Situation · Challenge · Advice",
    },
    blurb: {
      vi: "Nhìn rõ việc đang xảy ra, trở ngại, và hướng xử lý.",
      en: "Clarify what is happening, the obstacle, and how to respond.",
    },
    purpose: {
      vi: "Ra quyết định thực tế.",
      en: "Practical decision support.",
    },
    cardCount: 3,
    layoutCols: 3,
    positions: [
      {
        id: "situation",
        role: "situation",
        label: { vi: "Tình huống", en: "Situation" },
        hint: {
          vi: "Bức tranh đang diễn ra.",
          en: "What is unfolding now.",
        },
        col: 1,
        row: 1,
      },
      {
        id: "challenge",
        role: "challenge",
        label: { vi: "Thách thức", en: "Challenge" },
        hint: {
          vi: "Lực cản hoặc điểm mù.",
          en: "Resistance or blind spot.",
        },
        col: 2,
        row: 1,
      },
      {
        id: "advice",
        role: "advice",
        label: { vi: "Lời khuyên", en: "Advice" },
        hint: {
          vi: "Hướng hành động hữu ích nhất lúc này.",
          en: "Most helpful response now.",
        },
        col: 3,
        row: 1,
      },
    ],
    followUpPrompts: {
      vi: ["Thách thức này đến từ đâu?", "Lời khuyên yêu cầu tôi bỏ thói quen nào?"],
      en: ["Where does this challenge come from?", "Which habit does the advice ask me to drop?"],
    },
  },
  {
    id: "three-mbs",
    family: "three",
    label: {
      vi: "3 lá — Tâm · Thân · Tinh thần",
      en: "3 cards — Mind · Body · Spirit",
    },
    blurb: {
      vi: "Cân bằng nội tại trên ba tầng.",
      en: "Inner balance across three layers.",
    },
    purpose: {
      vi: "Chăm sóc toàn diện bản thân.",
      en: "Holistic self-care reading.",
    },
    cardCount: 3,
    layoutCols: 3,
    positions: [
      {
        id: "mind",
        role: "mind",
        label: { vi: "Tâm trí", en: "Mind" },
        hint: { vi: "Suy nghĩ, câu chuyện bạn kể cho mình.", en: "Thoughts and self-talk." },
        col: 1,
        row: 1,
      },
      {
        id: "body",
        role: "body",
        label: { vi: "Thân thể / nhịp sống", en: "Body / lived rhythm" },
        hint: {
          vi: "Năng lượng thể chất, thói quen, nhịp ngày.",
          en: "Physical energy, habits, daily rhythm.",
        },
        col: 2,
        row: 1,
      },
      {
        id: "spirit",
        role: "spirit",
        label: { vi: "Tinh thần", en: "Spirit" },
        hint: {
          vi: "Ý nghĩa, niềm tin, kết nối sâu.",
          en: "Meaning, belief, deeper connection.",
        },
        col: 3,
        row: 1,
      },
    ],
    followUpPrompts: {
      vi: ["Tầng nào đang lệch nhất?", "Tôi có thể hòa ba tầng thế nào tuần này?"],
      en: ["Which layer is most off?", "How can I harmonize all three this week?"],
    },
  },
  {
    id: "three-relation",
    family: "three",
    label: {
      vi: "3 lá — Bạn · Người kia · Quan hệ",
      en: "3 cards — You · Other · Dynamic",
    },
    blurb: {
      vi: "Nhìn động thái giữa hai phía — không đọc ý nghĩ người khác như sự thật.",
      en: "See the dynamic between two sides — never claim another's private thoughts as fact.",
    },
    purpose: {
      vi: "Quan hệ và giao tiếp.",
      en: "Relationship and communication.",
    },
    cardCount: 3,
    layoutCols: 3,
    positions: [
      {
        id: "you",
        role: "self",
        label: { vi: "Bạn", en: "You" },
        hint: { vi: "Vai trò / thái độ của bạn.", en: "Your stance or role." },
        col: 1,
        row: 1,
      },
      {
        id: "other",
        role: "other",
        label: { vi: "Người kia (biểu tượng)", en: "Other (symbolic)" },
        hint: {
          vi: "Năng lượng biểu tượng về phía kia — suy đoán cẩn trọng.",
          en: "Symbolic energy of the other side — interpret cautiously.",
        },
        col: 2,
        row: 1,
      },
      {
        id: "dynamic",
        role: "relationship",
        label: { vi: "Động thái quan hệ", en: "Relationship dynamic" },
        hint: {
          vi: "Những gì đang chảy giữa hai phía.",
          en: "What flows between you.",
        },
        col: 3,
        row: 1,
      },
    ],
    followUpPrompts: {
      vi: [
        "Tôi đang đóng góp gì vào động thái này?",
        "Ranh giới nào cần rõ hơn?",
      ],
      en: [
        "What am I contributing to this dynamic?",
        "Which boundary needs clarity?",
      ],
    },
  },
  {
    id: "three-path",
    family: "three",
    label: {
      vi: "3 lá — Cơ hội · Trở ngại · Hướng đi",
      en: "3 cards — Opportunity · Obstacle · Direction",
    },
    blurb: {
      vi: "Nhìn cửa mở, chỗ kẹt, và hướng khả dĩ.",
      en: "See the opening, the snag, and a workable direction.",
    },
    purpose: {
      vi: "Định hướng khi đứng trước lựa chọn.",
      en: "Orientation when facing a choice.",
    },
    cardCount: 3,
    layoutCols: 3,
    positions: [
      {
        id: "opportunity",
        role: "opportunity",
        label: { vi: "Cơ hội", en: "Opportunity" },
        hint: { vi: "Cửa đang mở hoặc có thể mở.", en: "Door open or openable." },
        col: 1,
        row: 1,
      },
      {
        id: "obstacle",
        role: "obstacle",
        label: { vi: "Trở ngại", en: "Obstacle" },
        hint: { vi: "Điều làm chậm hoặc làm lệch.", en: "What slows or skews." },
        col: 2,
        row: 1,
      },
      {
        id: "direction",
        role: "direction",
        label: { vi: "Hướng đi", en: "Potential direction" },
        hint: {
          vi: "Lối đi cân bằng giữa cơ hội và trở ngại.",
          en: "A path balancing opportunity and obstacle.",
        },
        col: 3,
        row: 1,
      },
    ],
    followUpPrompts: {
      vi: ["Cơ hội nào tôi đang bỏ qua?", "Trở ngại nào nằm trong tầm kiểm soát?"],
      en: ["Which opportunity am I overlooking?", "Which obstacle is within my control?"],
    },
  },
  {
    id: "five",
    family: "five",
    label: { vi: "5 lá — mở rộng", en: "5-card expanded" },
    blurb: {
      vi: "Tình huống, gốc rễ, thách thức, lời khuyên và hướng đi.",
      en: "Situation, root, challenge, advice, and direction.",
    },
    purpose: {
      vi: "Đọc sâu hơn ba lá cho quyết định phức tạp.",
      en: "Deeper than three cards for complex decisions.",
    },
    cardCount: 5,
    layoutCols: 3,
    positions: [
      {
        id: "situation",
        role: "situation",
        label: { vi: "Tình huống", en: "Situation" },
        hint: { vi: "Bối cảnh hiện tại.", en: "Current context." },
        col: 2,
        row: 1,
      },
      {
        id: "root",
        role: "root",
        label: { vi: "Gốc rễ", en: "Root cause" },
        hint: { vi: "Ảnh hưởng nền tảng.", en: "Underlying influence." },
        col: 1,
        row: 2,
      },
      {
        id: "challenge",
        role: "challenge",
        label: { vi: "Thách thức", en: "Challenge" },
        hint: { vi: "Lực cản chính.", en: "Primary resistance." },
        col: 2,
        row: 2,
      },
      {
        id: "advice",
        role: "advice",
        label: { vi: "Lời khuyên", en: "Advice" },
        hint: { vi: "Hướng xử lý.", en: "How to respond." },
        col: 3,
        row: 2,
      },
      {
        id: "direction",
        role: "direction",
        label: { vi: "Hướng tiềm năng", en: "Potential direction" },
        hint: {
          vi: "Xu hướng nếu lời khuyên được thực hành — không đảm bảo.",
          en: "Trend if advice is practiced — not a guarantee.",
        },
        col: 2,
        row: 3,
      },
    ],
    followUpPrompts: {
      vi: ["Gốc rễ và thách thức liên hệ thế nào?", "Lời khuyên đổi hướng ra sao?"],
      en: ["How do root and challenge relate?", "How would advice change the direction?"],
    },
  },
  {
    id: "celtic",
    family: "celtic",
    label: { vi: "Celtic Cross · 10 lá", en: "Celtic Cross · 10 cards" },
    blurb: {
      vi: "Trải bài cổ điển — bức tranh đầy đủ tình huống và kết quả tiềm năng.",
      en: "Classic spread — full picture of situation and potential outcome.",
    },
    purpose: {
      vi: "Phân tích toàn cảnh khi câu hỏi phức tạp.",
      en: "Full-spectrum analysis for complex questions.",
    },
    cardCount: 10,
    layoutCols: 5,
    positions: [
      {
        id: "present",
        role: "present",
        label: { vi: "Hiện tại", en: "Present situation" },
        hint: { vi: "Trung tâm vấn đề.", en: "Heart of the matter." },
        col: 3,
        row: 2,
        relatesTo: ["challenge"],
      },
      {
        id: "challenge",
        role: "challenge",
        label: { vi: "Thách thức", en: "Challenge / crossing" },
        hint: { vi: "Lực cắt ngang.", en: "Crossing influence." },
        col: 4,
        row: 2,
        relatesTo: ["present"],
      },
      {
        id: "conscious",
        role: "conscious",
        label: { vi: "Mục tiêu ý thức", en: "Conscious aim" },
        hint: { vi: "Điều bạn đang hướng tới có ý thức.", en: "What you consciously aim for." },
        col: 3,
        row: 1,
      },
      {
        id: "foundation",
        role: "foundation",
        label: { vi: "Nền tảng", en: "Foundation" },
        hint: { vi: "Nền tảng sâu / vô thức gần.", en: "Deep base / near unconscious." },
        col: 3,
        row: 3,
      },
      {
        id: "past",
        role: "past",
        label: { vi: "Quá khứ", en: "Recent past" },
        hint: { vi: "Ảnh hưởng vừa qua.", en: "What is passing away." },
        col: 2,
        row: 2,
      },
      {
        id: "near-future",
        role: "future",
        label: { vi: "Tương lai gần", en: "Near future" },
        hint: {
          vi: "Xu hướng sắp tới — không phải kết cục cuối.",
          en: "Near-term trend — not final destiny.",
        },
        col: 3,
        row: 4,
      },
      {
        id: "self",
        role: "self",
        label: { vi: "Bản thân", en: "Self / approach" },
        hint: { vi: "Cách bạn đang ứng xử.", en: "How you are approaching this." },
        col: 1,
        row: 4,
      },
      {
        id: "environment",
        role: "environment",
        label: { vi: "Môi trường", en: "Environment" },
        hint: { vi: "Hoàn cảnh và người xung quanh.", en: "Setting and others around you." },
        col: 5,
        row: 4,
      },
      {
        id: "hopes-fears",
        role: "hopes_fears",
        label: { vi: "Hy vọng & lo sợ", en: "Hopes & fears" },
        hint: {
          vi: "Kỳ vọng và nỗi sợ cùng hiện diện.",
          en: "Hope and fear present together.",
        },
        col: 3,
        row: 5,
      },
      {
        id: "outcome",
        role: "outcome",
        label: { vi: "Kết quả tiềm năng", en: "Potential outcome" },
        hint: {
          vi: "Hướng tổng hợp nếu các lực hiện tại tiếp tục — luôn có thể điều chỉnh.",
          en: "Composite direction if current forces continue — always adjustable.",
        },
        col: 3,
        row: 6,
      },
    ],
    followUpPrompts: {
      vi: [
        "Thách thức cắt ngang hiện tại thế nào?",
        "Hy vọng và lo sợ đang kéo tôi đi đâu?",
        "Tôi có thể ảnh hưởng kết quả tiềm năng ra sao?",
      ],
      en: [
        "How does the challenge cross the present?",
        "Where are hopes and fears pulling me?",
        "How can I influence the potential outcome?",
      ],
    },
  },
];

const byId = new Map(spreadRegistry.map((s) => [s.id, s]));

export function getSpreadDef(id: string): SpreadDefinition | undefined {
  return byId.get(id);
}

export function requireSpreadDef(id: string): SpreadDefinition {
  const s = getSpreadDef(id);
  if (!s) throw new Error(`Unknown spread: ${id}`);
  return s;
}

/** Legacy SpreadId → default registry id */
export function legacySpreadToRegistryId(
  legacy: "single" | "three" | "five" | "celtic" | "cross",
): string {
  if (legacy === "cross") return "five";
  if (legacy === "three") return "three-time";
  return legacy;
}

export function spreadsForFamily(
  family: SpreadDefinition["family"],
): SpreadDefinition[] {
  return spreadRegistry.filter((s) => s.family === family);
}

export function parseSpreadRegistryId(
  value: string | null | undefined,
  fallback = "three-time",
): string {
  if (value && byId.has(value)) return value;
  if (value === "three") return "three-time";
  if (value === "cross") return "five";
  if (value === "single" || value === "five" || value === "celtic") return value;
  return fallback;
}

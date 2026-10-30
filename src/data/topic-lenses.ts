import type { Locale } from "@/data/major-arcana";
import type { TopicId } from "@/lib/tarot";

type TopicLens = {
  label: Record<Locale, string>;
  intro: Record<Locale, string>;
  prompts: Record<Locale, string[]>;
};

export const topicLenses: Record<TopicId, TopicLens> = {
  general: {
    label: { vi: "Tổng quát", en: "General" },
    intro: {
      vi: "Nhìn toàn cảnh cuộc sống — năng lượng đang chi phối và hướng mở ra.",
      en: "A wide view of your path — dominant energies and openings ahead.",
    },
    prompts: {
      vi: [
        "Điều gì đang cần sự chú ý nhất của tôi?",
        "Tôi nên buông bỏ điều gì?",
      ],
      en: [
        "What needs my attention most right now?",
        "What should I release?",
      ],
    },
  },
  love: {
    label: { vi: "Tình cảm", en: "Love" },
    intro: {
      vi: "Gắn kết, ranh giới và lựa chọn trái tim — với bản thân hoặc người khác.",
      en: "Bonds, boundaries, and heart-led choices — with self or others.",
    },
    prompts: {
      vi: [
        "Năng lượng tình cảm hiện tại của tôi là gì?",
        "Tôi có đang trung thực với nhu cầu của mình?",
      ],
      en: [
        "What is the current energy in my relationships?",
        "Am I honest about my needs?",
      ],
    },
  },
  career: {
    label: { vi: "Công việc", en: "Career" },
    intro: {
      vi: "Hướng đi nghề nghiệp, trách nhiệm và cơ hội đang hình thành.",
      en: "Direction, responsibility, and emerging opportunities in work.",
    },
    prompts: {
      vi: [
        "Bước tiếp theo nào phục vụ tốt nhất mục tiêu dài hạn?",
        "Obstacle nào tôi đang tự tạo ra?",
      ],
      en: [
        "What next step best serves my long-term goals?",
        "What obstacle am I creating for myself?",
      ],
    },
  },
  finance: {
    label: { vi: "Tài chính", en: "Finance" },
    intro: {
      vi: "Thói quen nguồn lực, ổn định và rủi ro — phản tỉnh, không phải tư vấn tài chính chuyên nghiệp.",
      en: "Resource habits, stability, and risk — reflective only, not professional financial advice.",
    },
    prompts: {
      vi: [
        "Thói quen tiền bạc nào đang giúp hoặc hại tôi?",
        "Tôi đang tránh quyết định tài chính nào?",
      ],
      en: [
        "Which money habits help or harm me?",
        "Which financial decision am I avoiding?",
      ],
    },
  },
  family: {
    label: { vi: "Gia đình & xã hội", en: "Family & social" },
    intro: {
      vi: "Vai trò, kỳ vọng và không khí trong nhà hoặc vòng quan hệ gần.",
      en: "Roles, expectations, and climate at home or in close circles.",
    },
    prompts: {
      vi: [
        "Ranh giới nào cần rõ hơn với người thân?",
        "Tôi đang mang vai trò nào không còn vừa?",
      ],
      en: [
        "Which boundary needs clarity with loved ones?",
        "Which role no longer fits me?",
      ],
    },
  },
  spirituality: {
    label: { vi: "Tâm linh", en: "Spirituality" },
    intro: {
      vi: "Kết nối với điều lớn hơn bản thân — ý nghĩa, nghi lễ và lòng biết ơn.",
      en: "Connection to something larger — meaning, ritual, and gratitude.",
    },
    prompts: {
      vi: [
        "Tôi cần nuôi dưỡng điều gì trong hành trình tâm linh?",
        "Dấu hiệu nào đang mời tôi tin tưởng sâu hơn?",
      ],
      en: [
        "What wants nurturing on my spiritual path?",
        "What sign invites deeper trust?",
      ],
    },
  },
  self: {
    label: { vi: "Phát triển bản thân", en: "Personal growth" },
    intro: {
      vi: "Nội tâm, chữa lành và bản sắc — làm rõ bạn đang trở thành ai.",
      en: "Inner life, healing, and identity — who you are becoming.",
    },
    prompts: {
      vi: [
        "Tôi cần chăm sóc phần nào của bản thân?",
        "Điều gì đang kêu gọi sự thật thẳng thắn?",
      ],
      en: [
        "Which part of myself needs care?",
        "What is calling for honest truth?",
      ],
    },
  },
};

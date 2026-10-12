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
  self: {
    label: { vi: "Bản thân", en: "Self" },
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

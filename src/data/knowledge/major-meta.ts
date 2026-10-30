import type { ElementId, TraditionId } from "./types";
import type { Locale } from "@/data/major-arcana";

export type MajorMeta = {
  slug: string;
  element: ElementId;
  numerology: number;
  archetype: Record<Locale, string[]>;
  astrology?: { vi: string; en: string; tradition: TraditionId };
};

/** Established correspondences (primarily RWS / Golden Dawn lineage), tagged for transparency. */
export const majorMetaBySlug: Record<string, MajorMeta> = {
  "the-fool": {
    slug: "the-fool",
    element: "air",
    numerology: 0,
    archetype: {
      vi: ["Người khởi hành", "Niềm tin ngây thơ", "Bước nhảy"],
      en: ["The seeker", "Innocent trust", "The leap"],
    },
    astrology: { vi: "Thiên Vương (Uranus)", en: "Uranus", tradition: "rws" },
  },
  "the-magician": {
    slug: "the-magician",
    element: "air",
    numerology: 1,
    archetype: {
      vi: ["Người sáng tạo", "Ý chí", "Kênh biểu hiện"],
      en: ["Creator", "Will", "Channel of skill"],
    },
    astrology: { vi: "Thủy Tinh (Mercury)", en: "Mercury", tradition: "rws" },
  },
  "the-high-priestess": {
    slug: "the-high-priestess",
    element: "water",
    numerology: 2,
    archetype: {
      vi: ["Người giữ bí mật", "Trực giác", "Ngưỡng cửa"],
      en: ["Keeper of mystery", "Intuition", "Threshold"],
    },
    astrology: { vi: "Mặt Trăng", en: "Moon", tradition: "rws" },
  },
  "the-empress": {
    slug: "the-empress",
    element: "earth",
    numerology: 3,
    archetype: {
      vi: ["Người nuôi dưỡng", "Thịnh vượng", "Thiên nhiên"],
      en: ["Nurturer", "Abundance", "Nature"],
    },
    astrology: { vi: "Kim Tinh (Venus)", en: "Venus", tradition: "rws" },
  },
  "the-emperor": {
    slug: "the-emperor",
    element: "fire",
    numerology: 4,
    archetype: {
      vi: ["Người kiến trúc", "Trật tự", "Ranh giới"],
      en: ["Architect", "Order", "Boundary"],
    },
    astrology: { vi: "Bạch Dương (Aries)", en: "Aries", tradition: "rws" },
  },
  "the-hierophant": {
    slug: "the-hierophant",
    element: "earth",
    numerology: 5,
    archetype: {
      vi: ["Thầy dạy", "Truyền thống", "Nghi thức"],
      en: ["Teacher", "Tradition", "Rite"],
    },
    astrology: { vi: "Kim Ngưu (Taurus)", en: "Taurus", tradition: "rws" },
  },
  "the-lovers": {
    slug: "the-lovers",
    element: "air",
    numerology: 6,
    archetype: {
      vi: ["Sự chọn lựa", "Liên kết", "Giá trị"],
      en: ["Choice", "Union", "Values"],
    },
    astrology: { vi: "Song Tử (Gemini)", en: "Gemini", tradition: "rws" },
  },
  "the-chariot": {
    slug: "the-chariot",
    element: "water",
    numerology: 7,
    archetype: {
      vi: ["Người chỉ huy", "Ý chí tiến", "Thắng lợi"],
      en: ["Commander", "Drive", "Victory"],
    },
    astrology: { vi: "Cự Giải (Cancer)", en: "Cancer", tradition: "rws" },
  },
  strength: {
    slug: "strength",
    element: "fire",
    numerology: 8,
    archetype: {
      vi: ["Dũng cảm dịu", "Làm chủ nội tâm", "Từ bi"],
      en: ["Gentle courage", "Inner mastery", "Compassion"],
    },
    astrology: { vi: "Sư Tử (Leo)", en: "Leo", tradition: "rws" },
  },
  "the-hermit": {
    slug: "the-hermit",
    element: "earth",
    numerology: 9,
    archetype: {
      vi: ["Người tìm ánh sáng", "Cô tịch hữu ích", "Trí tuệ"],
      en: ["Light-seeker", "Useful solitude", "Wisdom"],
    },
    astrology: { vi: "Xử Nữ (Virgo)", en: "Virgo", tradition: "rws" },
  },
  "wheel-of-fortune": {
    slug: "wheel-of-fortune",
    element: "fire",
    numerology: 10,
    archetype: {
      vi: ["Vòng xoay", "Thời cơ", "Chu kỳ"],
      en: ["Turning", "Timing", "Cycle"],
    },
    astrology: { vi: "Mộc Tinh (Jupiter)", en: "Jupiter", tradition: "rws" },
  },
  justice: {
    slug: "justice",
    element: "air",
    numerology: 11,
    archetype: {
      vi: ["Cân bằng", "Trách nhiệm", "Sự thật"],
      en: ["Balance", "Accountability", "Truth"],
    },
    astrology: { vi: "Thiên Bình (Libra)", en: "Libra", tradition: "rws" },
  },
  "the-hanged-man": {
    slug: "the-hanged-man",
    element: "water",
    numerology: 12,
    archetype: {
      vi: ["Hy sinh có ý", "Đảo góc nhìn", "Tạm dừng"],
      en: ["Meaningful pause", "Inverted view", "Surrender"],
    },
    astrology: { vi: "Hải Vương (Neptune)", en: "Neptune", tradition: "rws" },
  },
  death: {
    slug: "death",
    element: "water",
    numerology: 13,
    archetype: {
      vi: ["Chuyển hóa", "Kết thúc cần thiết", "Lột xác"],
      en: ["Transformation", "Needed ending", "Metamorphosis"],
    },
    astrology: { vi: "Bọ Cạp (Scorpio)", en: "Scorpio", tradition: "rws" },
  },
  temperance: {
    slug: "temperance",
    element: "fire",
    numerology: 14,
    archetype: {
      vi: ["Hòa hợp", "Pha trộn", "Điều độ"],
      en: ["Alchemy", "Blend", "Moderation"],
    },
    astrology: { vi: "Nhân Mã (Sagittarius)", en: "Sagittarius", tradition: "rws" },
  },
  "the-devil": {
    slug: "the-devil",
    element: "earth",
    numerology: 15,
    archetype: {
      vi: ["Trói buộc", "Ham muốn", "Bóng tối hữu thức"],
      en: ["Bondage", "Desire", "Conscious shadow"],
    },
    astrology: { vi: "Ma Kết (Capricorn)", en: "Capricorn", tradition: "rws" },
  },
  "the-tower": {
    slug: "the-tower",
    element: "fire",
    numerology: 16,
    archetype: {
      vi: ["Đổ vỡ giả tạo", "Giải phóng đột ngột", "Sét đánh"],
      en: ["False structure falls", "Sudden release", "Lightning"],
    },
    astrology: { vi: "Hỏa Tinh (Mars)", en: "Mars", tradition: "rws" },
  },
  "the-star": {
    slug: "the-star",
    element: "air",
    numerology: 17,
    archetype: {
      vi: ["Hy vọng", "Chữa lành", "Định hướng"],
      en: ["Hope", "Healing", "Guidance"],
    },
    astrology: { vi: "Bảo Bình (Aquarius)", en: "Aquarius", tradition: "rws" },
  },
  "the-moon": {
    slug: "the-moon",
    element: "water",
    numerology: 18,
    archetype: {
      vi: ["Ảo ảnh", "Sợ hãi", "Trực giác đêm"],
      en: ["Illusion", "Fear", "Night intuition"],
    },
    astrology: { vi: "Song Ngư (Pisces)", en: "Pisces", tradition: "rws" },
  },
  "the-sun": {
    slug: "the-sun",
    element: "fire",
    numerology: 19,
    archetype: {
      vi: ["Rạng rỡ", "Sự thật sáng", "Niềm vui"],
      en: ["Radiance", "Clear truth", "Joy"],
    },
    astrology: { vi: "Mặt Trời", en: "Sun", tradition: "rws" },
  },
  judgement: {
    slug: "judgement",
    element: "fire",
    numerology: 20,
    archetype: {
      vi: ["Thức tỉnh", "Lời gọi", "Tha thứ"],
      en: ["Awakening", "Calling", "Absolution"],
    },
    astrology: { vi: "Diêm Vương (Pluto)", en: "Pluto", tradition: "rws" },
  },
  "the-world": {
    slug: "the-world",
    element: "earth",
    numerology: 21,
    archetype: {
      vi: ["Hoàn tất", "Hội tụ", "Chu kỳ mới"],
      en: ["Completion", "Integration", "New cycle"],
    },
    astrology: { vi: "Thổ Tinh (Saturn)", en: "Saturn", tradition: "rws" },
  },
};

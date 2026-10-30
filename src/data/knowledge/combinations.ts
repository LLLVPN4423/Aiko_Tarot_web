import type { Locale } from "@/data/major-arcana";

export type CombinationRule = {
  id: string;
  /** Card slugs (order-insensitive match) */
  a: string;
  b: string;
  theme: Record<Locale, string>;
  meaning: Record<Locale, string>;
  caution?: Record<Locale, string>;
};

/** Curated pairs — contextual starters, not universal laws. */
export const combinationRules: CombinationRule[] = [
  {
    id: "lovers-two-cups",
    a: "the-lovers",
    b: "cups-two",
    theme: { vi: "Liên kết hai chiều", en: "Mutual alignment" },
    meaning: {
      vi: "Sự chọn lựa trái tim gặp sự cộng hưởng cảm xúc — nhấn mạnh quan hệ có qua có lại, không chỉ hấp dẫn một phía.",
      en: "Heart-choice meets emotional reciprocity — mutual connection, not one-sided pull.",
    },
  },
  {
    id: "tower-star",
    a: "the-tower",
    b: "the-star",
    theme: { vi: "Đổ vỡ rồi chữa lành", en: "Disruption then renewal" },
    meaning: {
      vi: "Cấu trúc giả tạo sụp rồi hy vọng tái lập — đau nhưng mở lối phục hồi, không phải tận thế.",
      en: "False structures fall, then hope rebuilds — painful opening to recovery, not apocalypse.",
    },
  },
  {
    id: "devil-eight-swords",
    a: "the-devil",
    b: "swords-eight",
    theme: { vi: "Trói buộc và cảm giác kẹt", en: "Attachment and perceived trap" },
    meaning: {
      vi: "Ham muốn/thói quen gặp tư duy tự giam — giải pháp thường bắt đầu bằng nhận ra dây nào do mình siết.",
      en: "Attachment meets self-binding thought — freedom often starts by naming which rope you tighten.",
    },
    caution: {
      vi: "Không quy kết người khác là 'ác'; nhìn vòng lặp.",
      en: "Do not cast others as pure villains; see the loop.",
    },
  },
  {
    id: "magician-ace-wands",
    a: "the-magician",
    b: "wands-ace",
    theme: { vi: "Khởi sự sáng tạo", en: "Creative ignition" },
    meaning: {
      vi: "Công cụ sẵn sàng gặp tia lửa mới — thời điểm hành động có chủ đích.",
      en: "Tools ready meet a new spark — intentional action time.",
    },
  },
  {
    id: "moon-seven-cups",
    a: "the-moon",
    b: "cups-seven",
    theme: { vi: "Ảo ảnh và nhiều lựa chọn", en: "Illusion and many options" },
    meaning: {
      vi: "Sương mù cảm xúc gặp bàn đầy khả năng — cần lọc mơ khỏi tín hiệu thật trước khi chọn.",
      en: "Emotional fog meets a table of possibilities — sort dream from signal before choosing.",
    },
  },
  {
    id: "sun-ten-cups",
    a: "the-sun",
    b: "cups-ten",
    theme: { vi: "Niềm vui và hòa hợp", en: "Joy and harmony" },
    meaning: {
      vi: "Ánh sáng rõ gặp cảm giác đủ đầy trong quan hệ/gia đình — tận hưởng nhưng đừng đòi hỏi hoàn hảo tuyệt đối.",
      en: "Clear light meets relational fullness — enjoy without demanding absolute perfection.",
    },
  },
  {
    id: "hermit-two-swords",
    a: "the-hermit",
    b: "swords-two",
    theme: { vi: "Cô tịch và lưỡng lự", en: "Solitude and stalemate" },
    meaning: {
      vi: "Rút vào trong gặp thế cân não — đôi khi cần im lặng để quyết, không phải thêm ý kiến.",
      en: "Withdrawal meets mental stalemate — silence may decide more than more opinions.",
    },
  },
  {
    id: "empress-ace-pentacles",
    a: "the-empress",
    b: "pentacles-ace",
    theme: { vi: "Nuôi dưỡng hạt giống vật chất", en: "Nurturing a material seed" },
    meaning: {
      vi: "Sự chăm sóc gặp cơ hội thực tế mới — nuôi bằng nhịp đều, không nóng vội.",
      en: "Care meets a fresh material opening — grow it steadily, not hastily.",
    },
  },
  {
    id: "death-temperance",
    a: "death",
    b: "temperance",
    theme: { vi: "Kết thúc và hòa hợp lại", en: "Ending and re-blending" },
    meaning: {
      vi: "Chuyển hóa gặp nghệ thuật pha trộn — sau khi buông, hãy pha lại cuộc sống với nhịp vừa phải.",
      en: "Transformation meets alchemy — after release, re-blend life at a humane pace.",
    },
  },
  {
    id: "chariot-six-wands",
    a: "the-chariot",
    b: "wands-six",
    theme: { vi: "Ý chí và công nhận", en: "Drive and recognition" },
    meaning: {
      vi: "Chỉ huy nội lực gặp dấu hiệu tiến triển được thấy — giữ kỷ luật sau chiến thắng nhỏ.",
      en: "Directed will meets visible progress — keep discipline after small wins.",
    },
  },
];

export function findCombination(
  slugA: string,
  slugB: string,
): CombinationRule | undefined {
  const set = new Set([slugA, slugB]);
  return combinationRules.find((r) => set.has(r.a) && set.has(r.b));
}

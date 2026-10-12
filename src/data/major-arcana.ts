export type Locale = "vi" | "en";

export type MajorArcanaCard = {
  id: number;
  slug: string;
  name: Record<Locale, string>;
  keywords: Record<Locale, string[]>;
  upright: Record<Locale, string>;
  reversed: Record<Locale, string>;
  /** Custom illustration; others use stylized placeholder */
  imagePath?: string;
};

export const majorArcana: MajorArcanaCard[] = [
  {
    id: 0,
    slug: "the-fool",
    name: { vi: "Kẻ Khờ", en: "The Fool" },
    keywords: {
      vi: ["khởi đầu", "tự do", "niềm tin", "phiêu lưu"],
      en: ["beginnings", "freedom", "trust", "adventure"],
    },
    upright: {
      vi: "Một bước đi mới, trái tim nhẹ nhàng và sẵn sàng khám phá. Hãy tin vào trực giác như bé mèo vừa bước ra nắng — tò mò nhưng an toàn trong giới hạn của bạn.",
      en: "A fresh start with a light heart and openness to explore. Trust your instincts like a cat stepping into sunlight — curious, yet within your own safe bounds.",
    },
    reversed: {
      vi: "Liều lĩnh thiếu suy xét hoặc trì hoãn quá lâu. Kiểm tra lại kế hoạch trước khi nhảy; đừng để sợ hãi khiến bạn bỏ lỡ cơ hội.",
      en: "Recklessness or hesitation that stalls growth. Recheck plans before you leap; don't let fear make you miss the opening.",
    },
    imagePath: "/cards/00-the-fool.jpg",
  },
  {
    id: 1,
    slug: "the-magician",
    name: { vi: "Pháp Sư", en: "The Magician" },
    keywords: {
      vi: ["sáng tạo", "ý chí", "kỹ năng", "tập trung"],
      en: ["creation", "willpower", "skill", "focus"],
    },
    upright: {
      vi: "Bạn đã có đủ công cụ trên bàn — giờ là lúc hành động có chủ đích. Tập trung như mèo săn mồi: một mục tiêu, một nhịp.",
      en: "You already have what you need on the table — act with clear intent. Focus like a hunting cat: one target, one rhythm.",
    },
    reversed: {
      vi: "Phân tán năng lượng, thao túng hoặc tự nghi ngờ. Làm rõ động cơ và trung thực với bản thân trước khi thuyết phục người khác.",
      en: "Scattered energy, manipulation, or self-doubt. Clarify motives and be honest with yourself before persuading others.",
    },
    imagePath: "/cards/01-the-magician.jpg",
  },
  {
    id: 2,
    slug: "the-high-priestess",
    name: { vi: "Nữ Tư Tế", en: "The High Priestess" },
    keywords: {
      vi: ["trực giác", "bí ẩn", "nội tâm", "chờ đợi"],
      en: ["intuition", "mystery", "inner world", "patience"],
    },
    upright: {
      vi: "Im lặng nghe tiếng trong. Câu trả lời chưa cần nói to — nằm trong giấc mơ, cảm giác và khoảnh khắc yên ắng bên cửa sổ.",
      en: "Listen inward. Answers need not be loud — they live in dreams, feelings, and quiet moments by the window.",
    },
    reversed: {
      vi: "Che giấu cảm xúc hoặc bỏ qua trực giác. Đừng ép mọi thứ phải rõ ngay; cũng đừng lánh tránh sự thật bạn đã biết.",
      en: "Hidden feelings or ignored intuition. Don't force instant clarity; don't avoid truths you already sense.",
    },
  },
  {
    id: 3,
    slug: "the-empress",
    name: { vi: "Nữ Hoàng", en: "The Empress" },
    keywords: {
      vi: ["nuôi dưỡng", "đẹp đẽ", "sinh sản", "dư dả"],
      en: ["nurture", "beauty", "abundance", "comfort"],
    },
    upright: {
      vi: "Mùa của sự chăm sóc — bản thân, người thân, dự án. Tạo không gian ấm, cho phép mọi thứ lớn lên tự nhiên.",
      en: "A season of care — for yourself, loved ones, and projects. Make warmth; let things grow at their natural pace.",
    },
    reversed: {
      vi: "Kiệt sức vì cho quá nhiều hoặc bám víu kiểm soát. Học cách nhận lại tình cảm và nghỉ ngơi không tội lỗi.",
      en: "Burnout from overgiving or control. Practice receiving care and resting without guilt.",
    },
  },
  {
    id: 4,
    slug: "the-emperor",
    name: { vi: "Hoàng Đế", en: "The Emperor" },
    keywords: {
      vi: ["cấu trúc", "quyền lực", "ổn định", "ranh giới"],
      en: ["structure", "authority", "stability", "boundaries"],
    },
    upright: {
      vi: "Đặt luật chơi rõ ràng. Kỷ luật nhẹ nhưng nhất quán sẽ bảo vệ những gì bạn xây.",
      en: "Set clear rules of the game. Gentle, consistent discipline protects what you're building.",
    },
    reversed: {
      vi: "Cứng nhắc, độc đoán hoặc trốn trách nhiệm. Quyền lực thật sự đến từ trách nhiệm, không phải áp đặt.",
      en: "Rigidity, domination, or avoiding responsibility. Real authority comes from accountability, not force.",
    },
  },
  {
    id: 5,
    slug: "the-hierophant",
    name: { vi: "Giáo Hoàng", en: "The Hierophant" },
    keywords: {
      vi: ["truyền thống", "học hỏi", "cộng đồng", "giá trị"],
      en: ["tradition", "learning", "community", "values"],
    },
    upright: {
      vi: "Tìm mentor, nghi lễ hoặc nhóm đồng hành. Kiến thức được truyền tay cũng quan trọng như trải nghiệm riêng.",
      en: "Seek mentors, rituals, or a community. Shared wisdom matters as much as solo experience.",
    },
    reversed: {
      vi: "Phá luật cũ một cách có ý thức. Hỏi: quy tắc này còn phục vụ bạn, hay chỉ là thói quen?",
      en: "Consciously break outdated rules. Ask: does this norm still serve you, or is it mere habit?",
    },
  },
  {
    id: 6,
    slug: "the-lovers",
    name: { vi: "Người Tình", en: "The Lovers" },
    keywords: {
      vi: ["lựa chọn", "gắn kết", "hòa hợp", "giá trị"],
      en: ["choice", "bond", "alignment", "values"],
    },
    upright: {
      vi: "Quyết định từ trái tim và đạo đức cá nhân. Mối liên kết đẹp khi cả hai bên trung thực với bản thân.",
      en: "Choose from the heart and your ethics. Bonds thrive when both sides stay honest with themselves.",
    },
    reversed: {
      vi: "Mâu thuẫn giá trị hoặc tránh cam kết. Đừng hy sinh bản thân để giữ hòa khí giả tạo.",
      en: "Value conflict or commitment avoidance. Don't sacrifice yourself for fake harmony.",
    },
  },
  {
    id: 7,
    slug: "the-chariot",
    name: { vi: "Cỗ Xe", en: "The Chariot" },
    keywords: {
      vi: ["tiến lên", "quyết tâm", "chiến thắng", "kiểm soát"],
      en: ["momentum", "determination", "victory", "direction"],
    },
    upright: {
      vi: "Giữ lái vững giữa cảm xúc đối lập. Bạn có thể vượt qua nếu không buông lỏng mục tiêu cốt lõi.",
      en: "Hold the reins between opposing feelings. You can advance if you keep sight of the core goal.",
    },
    reversed: {
      vi: "Chạy quá nhanh hoặc mất phương hướng. Hãy dừng điều chỉnh thay vì chứng minh điểm.",
      en: "Speed without direction. Pause to adjust instead of proving a point.",
    },
  },
  {
    id: 8,
    slug: "strength",
    name: { vi: "Sức Mạnh", en: "Strength" },
    keywords: {
      vi: ["kiên nhẫn", "dũng cảm", "dịu dàng", "tự chủ"],
      en: ["patience", "courage", "gentleness", "self-mastery"],
    },
    upright: {
      vi: "Sức mạnh thật là dịu dàng kiên định — như vuốt ve con thú hoang trong lòng. Kiềm chế bằng tình thương.",
      en: "True strength is steady gentleness — taming the wild inside with compassion, not force.",
    },
    reversed: {
      vi: "Tự trách hoặc bùng nổ. Hãy thừa nhận cảm xúc mạnh mà không để chúng lái bạn.",
      en: "Self-criticism or outbursts. Acknowledge intense feelings without letting them drive.",
    },
  },
  {
    id: 9,
    slug: "the-hermit",
    name: { vi: "Ẩn Sĩ", en: "The Hermit" },
    keywords: {
      vi: ["suy ngẫm", "cô đơn", "trí tuệ", "tìm kiếm"],
      en: ["reflection", "solitude", "wisdom", "search"],
    },
    upright: {
      vi: "Rút lui có chủ đích để soi sáng. Ánh đèn nhỏ của bạn đủ dẫn bước tiếp theo.",
      en: "Withdraw on purpose to gain clarity. Your small lantern is enough for the next step.",
    },
    reversed: {
      vi: "Cô lập quá mức hoặc trốn tránh. Cân bằng giữa một mình và kết nối.",
      en: "Isolation or avoidance. Balance solitude with connection.",
    },
  },
  {
    id: 10,
    slug: "wheel-of-fortune",
    name: { vi: "Bánh Xe", en: "Wheel of Fortune" },
    keywords: {
      vi: ["vận may", "chu kỳ", "thay đổi", "bất ngờ"],
      en: ["fortune", "cycles", "change", "surprise"],
    },
    upright: {
      vi: "Vòng quay đang chuyển — cơ hội hoặc bài học đến bất chợt. Linh hoạt như mèo luôn tiếp đất bằng chân.",
      en: "The wheel turns — opportunity or lesson arrives unexpectedly. Stay adaptable, like a cat always landing on its feet.",
    },
    reversed: {
      vi: "Kháng cự thay đổi hoặc cảm giác unlucky kéo dài. Tập trung vào phần bạn kiểm soát được.",
      en: "Resisting change or a prolonged unlucky streak. Focus on what you can influence.",
    },
  },
  {
    id: 11,
    slug: "justice",
    name: { vi: "Công Lý", en: "Justice" },
    keywords: {
      vi: ["cân bằng", "sự thật", "trách nhiệm", "hậu quả"],
      en: ["balance", "truth", "accountability", "consequence"],
    },
    upright: {
      vi: "Sự thật và công bằng được nhấn mạnh. Hành động có hậu quả — chọn minh bạch.",
      en: "Truth and fairness take center stage. Actions have consequences — choose transparency.",
    },
    reversed: {
      vi: "Thiên vị hoặc né tránh trách nhiệm. Xem lại dữ kiện trước khi phán xét.",
      en: "Bias or dodging accountability. Review the facts before judging.",
    },
  },
  {
    id: 12,
    slug: "the-hanged-man",
    name: { vi: "Người Treo Ngược", en: "The Hanged Man" },
    keywords: {
      vi: ["buông bỏ", "góc nhìn mới", "tạm dừng", "hy sinh"],
      en: ["surrender", "new perspective", "pause", "sacrifice"],
    },
    upright: {
      vi: "Dừng lại để nhìn đảo ngược. Đôi khi không làm gì là cách thông minh nhất.",
      en: "Pause and invert your view. Sometimes doing nothing is the wisest move.",
    },
    reversed: {
      vi: "Kẹt trong trì hoãn hoặc hy sinh vô ích. Đặt hạn cho sự chờ đợi.",
      en: "Stuck in delay or pointless sacrifice. Set a limit on waiting.",
    },
  },
  {
    id: 13,
    slug: "death",
    name: { vi: "Cái Chết", en: "Death" },
    keywords: {
      vi: ["kết thúc", "chuyển hóa", "buông", "tái sinh"],
      en: ["ending", "transformation", "release", "renewal"],
    },
    upright: {
      vi: "Một chương khép lại để chỗ cho điều mới. Không phải nỗi sợ — là dọn nhà cho linh hồn.",
      en: "A chapter closes to make room for the new. Not doom — housekeeping for the soul.",
    },
    reversed: {
      vi: "Bám víu quá khứ hoặc sợ thay đổi. Hỏi: điều gì đã hết hạn?",
      en: "Clinging to the past or fearing change. Ask: what has already expired?",
    },
  },
  {
    id: 14,
    slug: "temperance",
    name: { vi: "Tiết Chế", en: "Temperance" },
    keywords: {
      vi: ["hòa trộn", "kiên nhẫn", "chữa lành", "cân bằng"],
      en: ["blending", "patience", "healing", "moderation"],
    },
    upright: {
      vi: "Pha trộn từ từ — công việc, cảm xúc, sức khỏe. Trung đạo không nhàm; đó là nghệ thuật.",
      en: "Mix slowly — work, feelings, health. Moderation isn't boring; it's craft.",
    },
    reversed: {
      vi: "Thái quá hoặc mất nhịp. Quay lại thói quen nhỏ, đều đặn.",
      en: "Extremes or lost rhythm. Return to small, steady habits.",
    },
  },
  {
    id: 15,
    slug: "the-devil",
    name: { vi: "Ác Quỷ", en: "The Devil" },
    keywords: {
      vi: ["giam cầm", "ham muốn", "bóng tối", "phụ thuộc"],
      en: ["bondage", "desire", "shadow", "attachment"],
    },
    upright: {
      vi: "Nhìn thẳng vào xiềng xích tự tạo — thói quen, sợ hãi, ham muốn. Nhận ra là bước đầu thoát.",
      en: "Face self-made chains — habits, fear, craving. Recognition is the first escape.",
    },
    reversed: {
      vi: "Giải phóng dần hoặc từ chối nhìn bóng tối. Hãy nhẹ nhàng nhưng thật với bản thân.",
      en: "Gradual liberation or denial of shadow. Be gentle yet honest with yourself.",
    },
  },
  {
    id: 16,
    slug: "the-tower",
    name: { vi: "Tháp", en: "The Tower" },
    keywords: {
      vi: ["sóng gió", "sự thật", "đổ vỡ", "thức tỉnh"],
      en: ["upheaval", "truth", "breakdown", "awakening"],
    },
    upright: {
      vi: "Cấu trúc cũ sụp để lộ sự thật. Cho dù chói chang, nền mới có thể vững hơn.",
      en: "Old structures fall, revealing truth. Harsh light can build a sturdier foundation.",
    },
    reversed: {
      vi: "Trì hoãn điều tất yếu hoặc sốc nhẹ hơn. Vẫn cần thay đổi — chọn chủ động.",
      en: "Delaying the inevitable or softer shock. Change is still needed — choose it actively.",
    },
  },
  {
    id: 17,
    slug: "the-star",
    name: { vi: "Ngôi Sao", en: "The Star" },
    keywords: {
      vi: ["hy vọng", "chữa lành", "hướng dẫn", "bình yên"],
      en: ["hope", "healing", "guidance", "peace"],
    },
    upright: {
      vi: "Sau bão là đêm trong và ngôi sao dẫn đường. Hy vọng quiet nhưng bền.",
      en: "After storms, a clear night and a guiding star. Hope that's quiet yet durable.",
    },
    reversed: {
      vi: "Mất niềm tin tạm thời. Nhìn những điều nhỏ vẫn sáng — chúng vẫn ở đó.",
      en: "Temporary loss of faith. Notice small lights still shining — they're there.",
    },
  },
  {
    id: 18,
    slug: "the-moon",
    name: { vi: "Mặt Trăng", en: "The Moon" },
    keywords: {
      vi: ["ảo ảnh", "giấc mơ", "sợ hãi", "bản năng"],
      en: ["illusion", "dreams", "fear", "instinct"],
    },
    upright: {
      vi: "Không phải mọi thứ đều rõ trong ánh trăng mờ. Tin bản năng nhưng kiểm chứng trước khi kết luận.",
      en: "Not everything is clear in moonlight. Trust instinct, yet verify before concluding.",
    },
    reversed: {
      vi: "Sương mù tan dần hoặc lo âu tăng. Ghi chép giấc mơ và cảm giác để thấy mẫu hình.",
      en: "Fog lifting or anxiety rising. Journal dreams and moods to spot patterns.",
    },
  },
  {
    id: 19,
    slug: "the-sun",
    name: { vi: "Mặt Trời", en: "The Sun" },
    keywords: {
      vi: ["vui vẻ", "rõ ràng", "thành công", "sức sống"],
      en: ["joy", "clarity", "success", "vitality"],
    },
    upright: {
      vi: "Ánh sáng ấm — niềm vui giản dị, thành quả được nhìn thấy. Hãy ở hiện tại và tận hưởng.",
      en: "Warm light — simple joy, visible results. Be present and savor it.",
    },
    reversed: {
      vi: "Vui bị che khuất hoặc kỳ vọng quá cao. Tìm niềm vui nhỏ trong ngày thường.",
      en: "Joy dimmed or inflated expectations. Find small delights in the everyday.",
    },
    imagePath: "/cards/19-the-sun.jpg",
  },
  {
    id: 20,
    slug: "judgement",
    name: { vi: "Phán Xét", en: "Judgement" },
    keywords: {
      vi: ["gọi hồi", "thức tỉnh", "tha thứ", "tái sinh"],
      en: ["calling", "awakening", "forgiveness", "rebirth"],
    },
    upright: {
      vi: "Một tiếng gọi nội tại — đứng dậy, học từ quá khứ, bước tiếp nhẹ hơn.",
      en: "An inner call — rise, learn from the past, move forward lighter.",
    },
    reversed: {
      vi: "Tự phán xét khắt khe hoặc bỏ qua bài học. Tha thứ cho bản thân để tiến.",
      en: "Harsh self-judgment or ignoring lessons. Forgive yourself to advance.",
    },
  },
  {
    id: 21,
    slug: "the-world",
    name: { vi: "Thế Giới", en: "The World" },
    keywords: {
      vi: ["hoàn thành", "tích hợp", "du lịch", "trọn vẹn"],
      en: ["completion", "integration", "travel", "wholeness"],
    },
    upright: {
      vi: "Một vòng tròn khép lại — thành tựu và cảm giác trọn vẹn. Sẵn sàng chương mới ở tầm cao hơn.",
      en: "A cycle completes — achievement and wholeness. Ready for a new chapter at a higher level.",
    },
    reversed: {
      vi: "Gần đích nhưng còn một mảnh thiếu. Hoàn thiện chi tiết cuối trước khi ăn mừng.",
      en: "Near the finish with one piece missing. Polish the last detail before celebrating.",
    },
  },
];

export const cardById = new Map(majorArcana.map((c) => [c.id, c]));

import type { MinorCardSpec, SuitMeta } from "./_types";
import { assembleMinor } from "./_types";

const meta: SuitMeta = {
  suit: "wands",
  startId: 22,
  group: { vi: "Cung Thiên Thể", en: "Celestial Wands" },
  groupShort: { vi: "Cung", en: "Celestial Wands" },
};

const specs: MinorCardSpec[] = [
  {
    rank: "Ace",
    slugRank: "ace",
    label: { vi: "Át", en: "Ace" },
    keywords: {
      vi: ["khởi lửa", "ý tưởng mới", "động lực", "tia sáng"],
      en: ["spark", "new idea", "drive", "ignition"],
    },
    upright: {
      vi: "Một tia lửa tinh khiết vừa được trao vào tay bạn — dự án, lời nói, hoặc quyết định cần hành động nóng. Đừng để nguội; nuôi bằng sự tập trung và dũng cảm nhỏ mỗi ngày. Mèo thiên thể đặt móng lên nhánh sao: bắt đầu từ một bước thật.",
      en: "A pure spark is placed in your hands — a project, word, or decision that wants heat. Don't let it cool; feed it with focus and small daily courage. The celestial cat sets a paw on a star-branch: begin with one real step.",
    },
    reversed: {
      vi: "Động lực đang bị dập tắt bởi sợ hãi, trì hoãn, hoặc quá nhiều ý tưởng cùng lúc. Lửa chưa tắt — chỉ đang thiếu oxy. Chọn một ý và bỏ những ngọn lửa giả tạo.",
      en: "Drive is smothered by fear, delay, or too many ideas at once. The flame isn't gone — it lacks oxygen. Choose one idea and release the false fires.",
    },
    symbolism: {
      vi: "Một nhánh cung vàng giữa bầu trời đêm — khởi nguồn của ý chí và sáng tạo.",
      en: "A golden wand-branch against midnight sky — the origin of will and creation.",
    },
    love: {
      vi: "Sự hấp dẫn mới hoặc tái khởi động cảm xúc. Thể hiện rõ ràng hơn thay vì chờ người kia đoán.",
      en: "Fresh attraction or emotional restart. Show interest clearly instead of waiting to be guessed.",
    },
    career: {
      vi: "Cơ hội nghề nghiệp vừa lộ diện. Đề xuất, pitch, hoặc học kỹ năng mới sẽ đơm kết quả nhanh.",
      en: "A career opening just appeared. Pitching, proposing, or learning a new skill will pay off quickly.",
    },
    growth: {
      vi: "Bạn sẵn sàng hơn mình nghĩ. Tin vào năng lượng khởi đầu thay vì chờ 'đủ sẵn sàng'.",
      en: "You are more ready than you think. Trust beginning-energy instead of waiting to feel fully prepared.",
    },
    spirit: {
      vi: "Lời mời từ vũ trụ: thắp lại thực hành tâm linh bằng một nghi thức nhỏ, đều đặn.",
      en: "A cosmic invitation: rekindle spiritual practice with one small, steady ritual.",
    },
  },
  {
    rank: "Two",
    slugRank: "two",
    label: { vi: "Hai", en: "Two" },
    keywords: {
      vi: ["lựa chọn", "tầm nhìn", "cân nhắc", "ngã ba"],
      en: ["choice", "vision", "weighing", "crossroads"],
    },
    upright: {
      vi: "Bạn đứng giữa hai hướng đều hấp dẫn. Lá này không thúc giục vội — nó yêu cầu nhìn xa hơn một bước: hướng nào nuôi tầm nhìn dài hạn? Giữ cả hai quá lâu sẽ làm loãng sức mạnh.",
      en: "You stand between two appealing paths. This card does not rush you — it asks for longer sight: which path feeds the long vision? Holding both too long dilutes power.",
    },
    reversed: {
      vi: "Do dự biến thành bế tắc. Sợ chọn sai khiến bạn không chọn gì. Đặt tiêu chí rõ (giá trị, thời gian, năng lượng) rồi quyết trong khung thời hạn.",
      en: "Hesitation has become paralysis. Fear of the wrong choice becomes no choice. Set clear criteria (values, time, energy) and decide within a deadline.",
    },
    symbolism: {
      vi: "Hai nhánh cung bắt chéo dưới mặt trăng — thế cân bằng trước khi bước tới.",
      en: "Two crossed wands beneath the moon — balance before the next step.",
    },
    love: {
      vi: "Cân nhắc giữa hai người, hoặc giữa ở lại và bước tiếp. Trung thực với nhu cầu trước khi hứa hẹn.",
      en: "Weighing two people — or staying versus leaving. Be honest about needs before making promises.",
    },
    career: {
      vi: "Hai lộ trình công việc. So sánh không chỉ lương mà cả nhịp sống và sự phát triển kỹ năng.",
      en: "Two work paths. Compare not only pay, but lifestyle rhythm and skill growth.",
    },
    growth: {
      vi: "Bạn đang học cách quyết định từ giá trị, không chỉ từ sợ hãi mất mát.",
      en: "You are learning to decide from values, not only from fear of loss.",
    },
    spirit: {
      vi: "Hai con đường tâm linh — chọn chiều sâu thay vì thu thập thêm nghi thức.",
      en: "Two spiritual roads — choose depth over collecting more rituals.",
    },
  },
  {
    rank: "Three",
    slugRank: "three",
    label: { vi: "Ba", en: "Three" },
    keywords: {
      vi: ["mở rộng", "hợp tác", "tầm nhìn chung", "hành trình"],
      en: ["expansion", "teamwork", "shared vision", "voyage"],
    },
    upright: {
      vi: "Công việc bạn gieo đang bắt đầu có gió thuận. Đây là lúc mở rộng vòng hợp tác, chia sẻ tầm nhìn, và để người khác cùng chèo. Đừng giữ mọi thứ một mình vì sợ mất kiểm soát.",
      en: "What you planted is catching favorable wind. Expand collaboration, share the vision, and let others row with you. Don't keep everything alone from fear of losing control.",
    },
    reversed: {
      vi: "Kế hoạch mở rộng gặp trở ngại: thiếu đồng bộ, kỳ vọng lệch, hoặc bạn đang chạy trước khi nền tảng chắc. Thu hẹp phạm vi, làm rõ vai trò.",
      en: "Expansion stalls: misalignment, mismatched expectations, or running ahead of the foundation. Narrow scope and clarify roles.",
    },
    symbolism: {
      vi: "Ba cung dựng như cột buồm — hành trình chung trên biển sao.",
      en: "Three wands rising like masts — a shared voyage on a sea of stars.",
    },
    love: {
      vi: "Mối quan hệ bước sang giai đoạn nhìn xa hơn: kế hoạch chung, chuyến đi, hoặc định nghĩa lại cam kết.",
      en: "The bond enters a farther-looking phase: shared plans, travel, or redefining commitment.",
    },
    career: {
      vi: "Dự án cần networking và đối tác. Kết quả tốt đến từ giao tiếp rõ ràng hơn là làm thêm một mình.",
      en: "The project needs networking and partners. Clear communication beats solo overwork.",
    },
    growth: {
      vi: "Học cách tin tưởng quá trình và người đồng hành — giải phóng kiểm soát quá mức.",
      en: "Learn to trust process and companions — release over-control.",
    },
    spirit: {
      vi: "Mở rộng thực hành ra cộng đồng: chia sẻ, học nhóm, hoặc phục vụ.",
      en: "Widen practice into community: sharing, group learning, or service.",
    },
  },
  {
    rank: "Four",
    slugRank: "four",
    label: { vi: "Bốn", en: "Four" },
    keywords: {
      vi: ["ổn định", "ăn mừng", "nền tảng", "nhịp nghỉ"],
      en: ["stability", "celebration", "foundation", "rest"],
    },
    upright: {
      vi: "Được phép dừng và thừa nhận những gì đã dựng được. Lá này mang không khí nghi lễ nhỏ — ăn mừng tiến độ, củng cố căn cứ, rồi mới lao tiếp. Nghỉ có chủ đích cũng là chiến lược.",
      en: "You are allowed to pause and honor what you've built. This card carries a small ritual mood — celebrate progress, secure base camp, then continue. Intentional rest is strategy.",
    },
    reversed: {
      vi: "Bất ổn trong nền tảng, hoặc bạn từ chối nghỉ đến mức kiệt. Kiểm tra lại cấu trúc hỗ trợ (nhịp làm việc, không gian, quan hệ) trước khi thêm mục tiêu.",
      en: "Unstable foundations, or refusal to rest until burnout. Check support structures (work rhythm, space, relationships) before adding goals.",
    },
    symbolism: {
      vi: "Bốn cung dựng khung đền nhỏ giữa ngân hà — nơi trú an toàn.",
      en: "Four wands framing a small temple among the galaxy — a safe haven.",
    },
    love: {
      vi: "Giai đoạn hòa hợp, gắn kết gia đình hoặc khoảnh khắc đáng nhớ. Nuôi dưỡng sự ấm áp hiện có.",
      en: "Harmony, family bonding, or a memorable moment. Nourish the warmth already present.",
    },
    career: {
      vi: "Cột mốc đạt được — nhận công nhận, ổn định quy trình, rồi mở phase mới.",
      en: "A milestone reached — accept recognition, stabilize process, then open the next phase.",
    },
    growth: {
      vi: "Xây cảm giác an toàn bên trong để không phải chạy liên tục.",
      en: "Build inner safety so you don't have to keep running.",
    },
    spirit: {
      vi: "Tạo không gian thiêng liêng tại nhà — góc nhỏ, ánh nến, nhịp thở đều.",
      en: "Create sacred space at home — a corner, candlelight, even breath.",
    },
  },
  {
    rank: "Five",
    slugRank: "five",
    label: { vi: "Năm", en: "Five" },
    keywords: {
      vi: ["xung đột", "cạnh tranh", "ma sát", "thử thách ý chí"],
      en: ["conflict", "competition", "friction", "will tested"],
    },
    upright: {
      vi: "Ma sát xuất hiện — ý kiến va chạm, cạnh tranh, hoặc nội tâm đang kéo hai hướng. Đây không phải dấu hiệu thất bại; là bài kiểm tra cách bạn bảo vệ ý chí mà không biến mọi thứ thành chiến trường.",
      en: "Friction appears — clashing opinions, competition, or an inner tug-of-war. Not failure; a test of defending will without turning everything into a battlefield.",
    },
    reversed: {
      vi: "Xung đột đang nguội hoặc bị đẩy xuống dưới thảm. Nếu né tránh quá lâu, căng thẳng sẽ bùng theo cách xấu hơn. Tìm cách nói sự thật có tôn trọng.",
      en: "Conflict is cooling — or being swept under the rug. Avoid too long and tension returns worse. Find respectful truth-telling.",
    },
    symbolism: {
      vi: "Năm cung giao nhau trong bão sao — thử lửa của ý chí.",
      en: "Five wands clashing in a star-storm — the will's trial by fire.",
    },
    love: {
      vi: "Cãi vã hoặc ganh tị cần được làm rõ. Tranh luận lành mạnh hơn im lặng lạnh.",
      en: "Arguments or jealousy need clarifying. Healthy debate beats cold silence.",
    },
    career: {
      vi: "Cạnh tranh trong team hoặc thị trường. Tách ego khỏi mục tiêu chung.",
      en: "Competition in team or market. Separate ego from shared goals.",
    },
    growth: {
      vi: "Học đứng vững khi bị phản đối mà không trở nên cứng nhắc.",
      en: "Learn to stand firm under opposition without becoming rigid.",
    },
    spirit: {
      vi: "Mâu thuẫn tín ngưỡng nội tại — dung hòa thay vì chọn phe tuyệt đối.",
      en: "Inner belief conflict — integrate rather than pick absolute sides.",
    },
  },
  {
    rank: "Six",
    slugRank: "six",
    label: { vi: "Sáu", en: "Six" },
    keywords: {
      vi: ["chiến thắng", "công nhận", "tự hào lành", "tiến bước"],
      en: ["victory", "recognition", "healthy pride", "advance"],
    },
    upright: {
      vi: "Nỗ lực được nhìn thấy. Đây là lá của chiến thắng công khai — không phải khoe khoang rỗng, mà là nhận lấy thành quả để tiếp tục với tự tin vững. Cho phép mình được vỗ tay.",
      en: "Effort is seen. Public victory — not empty bragging, but claiming results so you can continue with steady confidence. Allow yourself applause.",
    },
    reversed: {
      vi: "Thành công bị trì hoãn, hoặc bạn đang phụ thuộc quá nhiều vào lời khen bên ngoài. Tự công nhận tiến bộ trước khi chờ thế giới.",
      en: "Success delayed, or over-dependence on external praise. Acknowledge your own progress before the world does.",
    },
    symbolism: {
      vi: "Đoàn quân sao mang cung chiến thắng — diễu hành dưới ánh ngân hà.",
      en: "A star-host bearing victorious wands — parade under the Milky Way.",
    },
    love: {
      vi: "Được trân trọng, công khai tình cảm, hoặc mối quan hệ bước lên tầm mới với niềm vui.",
      en: "Feeling valued, public affection, or the bond rising with joy.",
    },
    career: {
      vi: "Thăng tiến, hoàn thành mốc, hoặc được đồng nghiệp công nhận. Dùng đà này một cách khiêm tốn và rõ ràng.",
      en: "Promotion, milestone, or peer recognition. Ride the momentum with clear humility.",
    },
    growth: {
      vi: "Xây lòng tự trọng dựa trên hành động thật, không chỉ hình ảnh.",
      en: "Build self-worth on real action, not image alone.",
    },
    spirit: {
      vi: "Cảm giác được 'đúng đường' — lòng biết ơn là nghi lễ chiến thắng.",
      en: "A sense of being on-path — gratitude is the victory ritual.",
    },
  },
  {
    rank: "Seven",
    slugRank: "seven",
    label: { vi: "Bảy", en: "Seven" },
    keywords: {
      vi: ["bền chí", "bảo vệ vị thế", "thách thức", "đứng vững"],
      en: ["perseverance", "hold ground", "challenge", "stand firm"],
    },
    upright: {
      vi: "Bạn đang phải bảo vệ những gì đã gây dựng — ý tưởng, ranh giới, hoặc tiến độ — trước sức ép. Không cần đánh trả mọi phía; chọn trận đáng đánh và giữ trung tâm.",
      en: "You must defend what you've built — idea, boundary, or progress — under pressure. Don't fight every front; choose the worthy battle and keep center.",
    },
    reversed: {
      vi: "Kiệt sức vì chống đỡ quá nhiều, hoặc bỏ cuộc quá sớm. Rà lại: đâu là hiểm họa thật, đâu chỉ là tiếng ồn?",
      en: "Exhausted from defending too much, or quitting too soon. Recheck: what is real threat, and what is only noise?",
    },
    symbolism: {
      vi: "Một hình bóng cầm cung trên đỉnh núi sao — đứng một mình nhưng không nhỏ bé.",
      en: "A silhouette holding a wand atop a star-ridge — alone, not small.",
    },
    love: {
      vi: "Cần bảo vệ mối quan hệ khỏi can thiệp, hoặc bảo vệ bản thân khỏi bị cuốn theo.",
      en: "Protect the bond from interference — or protect yourself from being swept away.",
    },
    career: {
      vi: "Phê bình, cạnh tranh, hoặc thay đổi đột ngột. Giữ chuẩn mực nghề nghiệp của bạn.",
      en: "Criticism, rivalry, or sudden change. Keep your professional standards.",
    },
    growth: {
      vi: "Rèn khả năng nói 'không' mà vẫn giữ lòng từ ái.",
      en: "Practice saying no while remaining kind.",
    },
    spirit: {
      vi: "Thử thách đức tin — đứng vững trong thực hành dù môi trường ồn ào.",
      en: "A faith test — stay with practice despite noisy surroundings.",
    },
  },
  {
    rank: "Eight",
    slugRank: "eight",
    label: { vi: "Tám", en: "Eight" },
    keywords: {
      vi: ["tốc độ", "tin tức", "chuyển động", "đột phá"],
      en: ["speed", "news", "movement", "breakthrough"],
    },
    upright: {
      vi: "Mọi thứ tăng tốc — tin nhắn, chuyến đi, quyết định, cảm hứng. Đừng cố kiểm soát từng chi tiết; căn chỉnh hướng rồi để đà đưa bạn tới. Cơ hội có hạn giờ.",
      en: "Everything accelerates — messages, travel, decisions, inspiration. Don't micromanage; align direction and let momentum carry you. Windows are time-bound.",
    },
    reversed: {
      vi: "Trì trệ, tin tức chậm, hoặc hỗn loạn vì chạy quá nhiều hướng. Lọc ưu tiên; một mũi tên sắc hơn tám mũi lệch.",
      en: "Delays, slow news, or chaos from running too many directions. Filter priorities; one true arrow beats eight scattered ones.",
    },
    symbolism: {
      vi: "Tám cung như sao băng — năng lượng phóng về một đích.",
      en: "Eight wands as meteors — energy aimed at one destination.",
    },
    love: {
      vi: "Tiến triển nhanh, lời tỏ tình, hoặc khoảng cách được thu hẹp. Giữ rõ ràng để tốc độ không thành hiểu lầm.",
      en: "Fast progress, confessions, or closing distance. Stay clear so speed doesn't become confusion.",
    },
    career: {
      vi: "Deadline, chuyến công tác, hoặc cơ hội cần phản hồi ngay. Chuẩn bị sẵn sàng để nói có.",
      en: "Deadlines, travel, or offers needing quick reply. Be ready to say yes.",
    },
    growth: {
      vi: "Học hành động kịp thời thay vì phân tích vô tận.",
      en: "Learn timely action instead of endless analysis.",
    },
    spirit: {
      vi: "Thông điệp trực giác đến nhanh — ghi lại trước khi quên.",
      en: "Intuitive messages arrive fast — write them before they fade.",
    },
  },
  {
    rank: "Nine",
    slugRank: "nine",
    label: { vi: "Chín", en: "Nine" },
    keywords: {
      vi: ["kiên cường", "gần đích", "cảnh giác", "sức bền"],
      en: ["resilience", "near finish", "vigilance", "stamina"],
    },
    upright: {
      vi: "Bạn đã đi rất xa; đích gần nhưng mệt cũng thật. Lá này tôn vinh sự kiên cường — giữ ranh giới, nghỉ chiến lược, và đừng buông đúng lúc cuối. Bạn mạnh hơn cảm giác mệt của mình.",
      en: "You've come far; the finish is near and fatigue is real. Honor resilience — keep boundaries, rest strategically, and don't quit at the last stretch. You are stronger than your tiredness.",
    },
    reversed: {
      vi: "Kiệt quệ, phòng thủ quá mức, hoặc cô lập vì không chịu nhờ giúp. Hạ khiên một chút; sức bền cũng cần tiếp tế.",
      en: "Burnout, over-defensiveness, or isolation from refusing help. Lower the shield a little; stamina needs supply lines.",
    },
    symbolism: {
      vi: "Chín cung dựng thành tường thành dưới bầu trời cháy — phòng thủ sau nhiều trận.",
      en: "Nine wands as a battlement under a burning sky — defense after many fights.",
    },
    love: {
      vi: "Cần thời gian hồi phục sau tổn thương, hoặc bảo vệ trái tim một cách khôn ngoan chứ không đóng cứng.",
      en: "Time to heal after hurt — or guard the heart wisely without sealing shut.",
    },
    career: {
      vi: "Giai đoạn áp lực cao trước khi xong việc lớn. Phân bổ năng lượng, đừng ôm hết một mình.",
      en: "High-pressure stretch before a big finish. Budget energy; don't carry it alone.",
    },
    growth: {
      vi: "Nhận ra mô hình 'cứ phải cứng' và cho phép mềm đi mà không mất sức mạnh.",
      en: "Notice the 'must stay hard' pattern and allow softness without losing strength.",
    },
    spirit: {
      vi: "Đức tin được tôi luyện qua thử thách — nghi lễ phục hồi cũng là tu tập.",
      en: "Faith tempered by trial — recovery ritual is also practice.",
    },
  },
  {
    rank: "Ten",
    slugRank: "ten",
    label: { vi: "Mười", en: "Ten" },
    keywords: {
      vi: ["gánh nặng", "trách nhiệm", "quá tải", "cần chia sẻ"],
      en: ["burden", "duty", "overload", "delegate"],
    },
    upright: {
      vi: "Bạn đang vác nhiều hơn mức bền vững — việc, kỳ vọng, lời hứa. Thành công vẫn có thể đến, nhưng cái giá là lưng mỏi. Hỏi: phần nào có thể đặt xuống hoặc giao lại mà không phản bội giá trị?",
      en: "You are carrying more than is sustainable — tasks, expectations, promises. Success may still arrive, at the cost of a tired back. Ask: what can be set down or handed off without betraying your values?",
    },
    reversed: {
      vi: "Đã đến lúc buông một phần gánh. Hoặc bạn đang tránh trách nhiệm cần thiết. Phân biệt gánh nặng thật và gánh bạn tự chọn vì tội lỗi/kiểm soát.",
      en: "Time to release part of the load — or you are dodging necessary duty. Separate real burden from what you chose from guilt or control.",
    },
    symbolism: {
      vi: "Mười cung chất trên lưng dưới bầu trời nặng — sức nặng của trách nhiệm.",
      en: "Ten wands stacked on the back under a heavy sky — the weight of duty.",
    },
    love: {
      vi: "Một bên đang gánh quá nhiều trong quan hệ. Cân bằng lại sự chăm sóc lẫn nhau.",
      en: "One person carries too much in the bond. Rebalance mutual care.",
    },
    career: {
      vi: "Quá tải công việc. Ưu tiên, ủy quyền, hoặc đàm phán phạm vi trước khi đổ vỡ.",
      en: "Work overload. Prioritize, delegate, or renegotiate scope before collapse.",
    },
    growth: {
      vi: "Bài học về giới hạn lành mạnh và giá trị của việc nhờ giúp.",
      en: "A lesson in healthy limits and the value of asking for help.",
    },
    spirit: {
      vi: "Buông 'phải chứng minh tâm linh bằng khổ hạnh'. Nhẹ nhàng cũng thiêng.",
      en: "Release proving spirituality through hardship. Softness can be sacred too.",
    },
  },
  {
    rank: "Page",
    slugRank: "page",
    label: { vi: "Tiểu đồng", en: "Page" },
    keywords: {
      vi: ["tin vui", "học hỏi", "tò mò", "thông điệp"],
      en: ["good news", "learning", "curiosity", "message"],
    },
    upright: {
      vi: "Một thông điệp, ý tưởng, hoặc cơ hội học hỏi vừa gõ cửa. Hãy giữ tinh thần học trò — tò mò, nhiệt huyết, sẵn sàng thử. Đừng đòi hoàn hảo trước khi bắt đầu.",
      en: "A message, idea, or learning chance just knocked. Keep the student's spirit — curious, eager, willing to try. Don't demand perfection before beginning.",
    },
    reversed: {
      vi: "Tin tức chậm, hoặc bạn đang phân tán và bỏ dở học hành. Tập trung vào một kỹ năng/thông điệp thay vì đuổi theo mọi thứ mới.",
      en: "Delayed news, or scattered unfinished learning. Focus on one skill/message instead of chasing every novelty.",
    },
    symbolism: {
      vi: "Mèo tiểu đồng ôm nhánh cung sáng — sứ giả của khởi đầu sáng tạo.",
      en: "A page-cat holding a lit wand — messenger of creative beginnings.",
    },
    love: {
      vi: "Tán tỉnh vui vẻ, tin nhắn bất ngờ, hoặc giai đầu khám phá cảm xúc mới.",
      en: "Playful flirtation, unexpected messages, or early exploration of new feelings.",
    },
    career: {
      vi: "Học việc, khóa học, hoặc đề xuất nhỏ có thể lớn. Đọc kỹ email/hợp đồng.",
      en: "Apprenticeship, a course, or a small proposal that can grow. Read emails/contracts carefully.",
    },
    growth: {
      vi: "Cho phép mình là người mới — đó là sức mạnh, không phải điểm yếu.",
      en: "Allow yourself to be a beginner — that is strength, not weakness.",
    },
    spirit: {
      vi: "Dấu hiệu nhỏ từ vũ trụ; chú ý trùng hợp và giấc mơ.",
      en: "Small cosmic signs; notice synchronicities and dreams.",
    },
  },
  {
    rank: "Knight",
    slugRank: "knight",
    label: { vi: "Kỵ sĩ", en: "Knight" },
    keywords: {
      vi: ["hành động", "phiêu lưu", "xung phong", "nhiệt huyết"],
      en: ["action", "adventure", "charge", "passion"],
    },
    upright: {
      vi: "Năng lượng xung phong: đi, làm, nói, theo đuổi. Lý tưởng khi bạn cần đà; nguy hiểm nếu thiếu kế hoạch. Kết hợp lửa với một bản đồ ngắn hạn.",
      en: "Charging energy: go, do, speak, pursue. Ideal when you need momentum; risky without a plan. Pair fire with a short map.",
    },
    reversed: {
      vi: "Nóng vội, xung đột không cần thiết, hoặc hứa rồi bỏ. Hãm lại; kiểm tra động cơ trước khi lao tới.",
      en: "Reckless heat, needless conflict, or promises dropped. Slow down; check motive before charging.",
    },
    symbolism: {
      vi: "Kỵ sĩ mèo phi giữa sao băng — ý chí đang phi nước đại.",
      en: "A knight-cat racing through meteors — will at full gallop.",
    },
    love: {
      vi: "Theo đuổi nồng nhiệt, chuyến đi bất ngờ. Cần sự chân thành bền hơn chỉ đà cảm xúc.",
      en: "Passionate pursuit, sudden trips. Need sincerity that lasts beyond the rush.",
    },
    career: {
      vi: "Đẩy dự án mạnh, đàm phán dứt khoát. Đừng đốt cầu vì nóng giận.",
      en: "Push projects hard, negotiate firmly. Don't burn bridges in anger.",
    },
    growth: {
      vi: "Chuyển từ suy nghĩ sang hành động có kiểm soát.",
      en: "Move from thinking into controlled action.",
    },
    spirit: {
      vi: "Hành hương nội tâm với nhiệt huyết — nhưng giữ khiêm nhường.",
      en: "An inner quest with heat — keep humility.",
    },
  },
  {
    rank: "Queen",
    slugRank: "queen",
    label: { vi: "Nữ hoàng", en: "Queen" },
    keywords: {
      vi: ["tự tin", "lãnh đạo ấm", "sáng tạo chín", "hút năng lượng"],
      en: ["confidence", "warm leadership", "mature creativity", "magnetism"],
    },
    upright: {
      vi: "Sự tự chủ sáng tạo đã chín. Bạn có thể truyền lửa mà không đốt người khác — lãnh đạo bằng tầm nhìn và sự ấm áp. Tin vào sức hút tự nhiên của mình.",
      en: "Creative self-possession has matured. You can pass the flame without burning others — lead with vision and warmth. Trust your natural magnetism.",
    },
    reversed: {
      vi: "Ghen tị, kiểm soát, hoặc tự nghi ngờ làm tắt lửa nội tại. Nuôi lại lòng tự trọng bằng hành động nhỏ nhất quán.",
      en: "Jealousy, control, or self-doubt extinguish the inner fire. Rebuild esteem with small consistent acts.",
    },
    symbolism: {
      vi: "Nữ hoàng mèo ngồi trên ngai cung sao — lửa được thuần hóa thành ánh sáng.",
      en: "A queen-cat on a wand-star throne — fire tamed into light.",
    },
    love: {
      vi: "Sức hút mạnh, sự chăm sóc đầy nhiệt huyết. Cần không gian để cả hai cùng tỏa sáng.",
      en: "Strong attraction and passionate care. Need space for both to shine.",
    },
    career: {
      vi: "Vai trò mentor, creative lead, hoặc hình ảnh chuyên môn vững. Truyền cảm hứng bằng ví dụ.",
      en: "Mentor, creative lead, or solid professional presence. Inspire by example.",
    },
    growth: {
      vi: "Sở hữu quyền lực cá nhân một cách dịu dàng và rõ ràng.",
      en: "Own personal power gently and clearly.",
    },
    spirit: {
      vi: "Nữ tính sáng tạo / anima sáng — nghi lễ lửa, ánh nến, lời khẳng định.",
      en: "Creative feminine / bright anima — fire ritual, candlelight, affirmation.",
    },
  },
];

export const celestialWands = specs.map((s, i) => assembleMinor(meta, i, s));

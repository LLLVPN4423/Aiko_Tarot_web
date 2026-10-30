import type { Locale } from "./major-arcana";

export type TopicBundle = {
  love: Record<Locale, string>;
  career: Record<Locale, string>;
  growth: Record<Locale, string>;
  spirit: Record<Locale, string>;
};

/** Topic lenses for all 22 Major Arcana (keyed by slug). */
export const majorTopicMeanings: Record<string, TopicBundle> = {
  "the-fool": {
    love: {
      vi: "Tình cảm mới hoặc khởi đầu lại với trái tim nhẹ. Đừng hứa quá sớm — hãy tò mò và trung thực.",
      en: "New love or a light-hearted restart. Don't over-promise early — stay curious and honest.",
    },
    career: {
      vi: "Cơ hội nghề nghiệp mới; chấp nhận học việc. Bước nhỏ hôm nay hơn kế hoạch hoàn hảo.",
      en: "A new work opening; accept being a beginner. A small step today beats a perfect plan.",
    },
    growth: {
      vi: "Cho phép mình chưa biết. Giải phóng hình ảnh 'phải sẵn sàng'.",
      en: "Allow not-knowing. Release the image of having to be ready.",
    },
    spirit: {
      vi: "Tin vào bước kế tiếp trên đường — nghi thức là bước chân, không phải bản đồ đầy đủ.",
      en: "Trust the next step on the path — ritual is a footstep, not a finished map.",
    },
  },
  "the-magician": {
    love: {
      vi: "Chủ động thể hiện rõ ràng. Dùng lời và hành động khớp nhau để tạo gắn kết.",
      en: "Initiate with clarity. Match words and actions to build the bond.",
    },
    career: {
      vi: "Bạn đã có công cụ — pitch, gửi, làm. Tập trung một mục tiêu.",
      en: "You already have the tools — pitch, send, ship. Focus one goal.",
    },
    growth: {
      vi: "Biến ý định thành thói quen; ý chí cần lịch cụ thể.",
      en: "Turn intention into habit; will needs a calendar.",
    },
    spirit: {
      vi: "Đồng sáng tạo với vũ trụ: cầu nguyện rồi hành động.",
      en: "Co-create with the cosmos: pray, then act.",
    },
  },
  "the-high-priestess": {
    love: {
      vi: "Lắng nghe khoảng lặng giữa hai người. Đừng ép nói nếu trực giác bảo chờ.",
      en: "Listen to the silence between you. Don't force talk if intuition says wait.",
    },
    career: {
      vi: "Thu thập thông tin ẩn trước khi quyết. Quan sát chính trị/team dynamics.",
      en: "Gather hidden information before deciding. Watch team dynamics.",
    },
    growth: {
      vi: "Tin vào tri thức nội tại; nhật ký giấc mơ hữu ích.",
      en: "Trust inner knowing; dream journaling helps.",
    },
    spirit: {
      vi: "Im lặng là đền thờ. Giảm nhiễu để nghe.",
      en: "Silence is the temple. Reduce noise to hear.",
    },
  },
  "the-empress": {
    love: {
      vi: "Nuôi dưỡng bằng sự hiện diện ấm. Tạo không gian an toàn cho tình cảm lớn.",
      en: "Nurture with warm presence. Make safe space for love to grow.",
    },
    career: {
      vi: "Dự án cần chăm sóc dài; sáng tạo và thẩm mỹ mang lợi thế.",
      en: "Projects need long care; creativity and aesthetics are advantages.",
    },
    growth: {
      vi: "Chăm cơ thể và môi trường sống như vườn thiêng.",
      en: "Tend body and living space as a sacred garden.",
    },
    spirit: {
      vi: "Thần tính qua sự sống — thiên nhiên, ẩm thực, nghệ thuật.",
      en: "The divine through life — nature, food, art.",
    },
  },
  "the-emperor": {
    love: {
      vi: "Cần cấu trúc và cam kết rõ. Bảo vệ quan hệ bằng ranh giới lành.",
      en: "Need clear structure and commitment. Protect the bond with healthy boundaries.",
    },
    career: {
      vi: "Lãnh đạo, hệ thống, trách nhiệm. Xây quy trình bền.",
      en: "Leadership, systems, responsibility. Build durable process.",
    },
    growth: {
      vi: "Làm chủ cuộc đời bằng kỷ luật dịu, không độc tài với bản thân.",
      en: "Own your life with gentle discipline, not inner tyranny.",
    },
    spirit: {
      vi: "Trật tự thiêng — nghi thức đều đặn là cột trụ.",
      en: "Sacred order — steady ritual is a pillar.",
    },
  },
  "the-hierophant": {
    love: {
      vi: "Giá trị chung, truyền thống, hoặc lời khuyên từ người đáng tin.",
      en: "Shared values, tradition, or counsel from someone trustworthy.",
    },
    career: {
      vi: "Học từ mentor, chứng chỉ, văn hóa tổ chức. Tôn trọng luật chơi rồi cải tiến.",
      en: "Learn from mentors, credentials, culture. Respect the rules, then improve them.",
    },
    growth: {
      vi: "Tìm thầy/cộng đồng học hỏi; đừng tự cô lập kiến thức.",
      en: "Find a teacher/community; don't isolate your learning.",
    },
    spirit: {
      vi: "Truyền thống tâm linh như bản đồ — sống chứ đừng chỉ thuộc lòng.",
      en: "Spiritual tradition as a map — live it, don't only memorize it.",
    },
  },
  "the-lovers": {
    love: {
      vi: "Lựa chọn trái tim có ý thức. Hòa hợp giá trị quan trọng hơn hấp dẫn nhất thời.",
      en: "A conscious heart choice. Value harmony matters more than momentary attraction.",
    },
    career: {
      vi: "Hợp tác quan trọng; chọn đối tác/dự án khớp đạo đức của bạn.",
      en: "Partnership matters; choose allies/projects that match your ethics.",
    },
    growth: {
      vi: "Hòa hợp các phần trong bạn — lý trí và cảm xúc bắt tay.",
      en: "Integrate your parts — mind and heart shake hands.",
    },
    spirit: {
      vi: "Thánh hóa sự kết nối — tình yêu như thực hành tâm linh.",
      en: "Sanctify connection — love as spiritual practice.",
    },
  },
  "the-chariot": {
    love: {
      vi: "Tiến bước có định hướng trong quan hệ; kéo hai ý muốn về một hướng.",
      en: "Directed progress in the bond; pull two wills into one direction.",
    },
    career: {
      vi: "Thắng bằng kỷ luật và chiến lược. Kiểm soát tốc độ.",
      en: "Win through discipline and strategy. Control the pace.",
    },
    growth: {
      vi: "Làm chủ xung đột nội tâm; thắng bằng tập trung.",
      en: "Master inner conflict; win through focus.",
    },
    spirit: {
      vi: "Ý chí phụng sự tầm nhìn cao hơn ego.",
      en: "Will in service of a vision higher than ego.",
    },
  },
  strength: {
    love: {
      vi: "Dịu dàng mạnh mẽ. Kiên nhẫn với sợ hãi của cả hai.",
      en: "Gentle strength. Patience with both partners' fears.",
    },
    career: {
      vi: "Ảnh hưởng bằng sự bình tĩnh hơn là áp lực. Sức bền thắng nước rút.",
      en: "Influence through calm more than pressure. Stamina beats sprints.",
    },
    growth: {
      vi: "Thuần hóa bản năng — không đàn áp, mà dẫn dắt.",
      en: "Tame instinct — not suppress, but guide.",
    },
    spirit: {
      vi: "Lòng từ bi là sức mạnh thật.",
      en: "Compassion is true power.",
    },
  },
  "the-hermit": {
    love: {
      vi: "Cần không gian một mình để yêu tốt hơn — không phải bỏ chạy.",
      en: "Need solitude to love better — not to abandon.",
    },
    career: {
      vi: "Rút để nghiên cứu/chiến lược. Mentor nội tại lên tiếng.",
      en: "Withdraw to research/strategy. The inner mentor speaks.",
    },
    growth: {
      vi: "Thắp đèn soi đường cho chính mình trước khi dẫn người.",
      en: "Light your own path before guiding others.",
    },
    spirit: {
      vi: "Ẩn tu ngắn — tìm câu trả lời trong im lặng.",
      en: "A short retreat — seek answers in silence.",
    },
  },
  "wheel-of-fortune": {
    love: {
      vi: "Chu kỳ đổi — gặp gỡ bất ngờ hoặc bước ngoặt quan hệ.",
      en: "Cycles turn — chance meetings or a relational pivot.",
    },
    career: {
      vi: "Thời cơ; nắm khi bánh xe quay lên, đừng tuyệt vọng khi xuống.",
      en: "Timing; seize the upswing, don't despair the downswing.",
    },
    growth: {
      vi: "Chấp nhận thay đổi là định luật; linh hoạt là khôn ngoan.",
      en: "Accept change as law; flexibility is wisdom.",
    },
    spirit: {
      vi: "Tin vào nhịp lớn hơn kế hoạch nhỏ của bạn.",
      en: "Trust a larger rhythm than your small plans.",
    },
  },
  justice: {
    love: {
      vi: "Cân bằng cho-nhận; nói thật về công bằng cảm xúc.",
      en: "Balance give-and-take; speak honestly about emotional fairness.",
    },
    career: {
      vi: "Hợp đồng, pháp lý, đánh giá công minh. Quyết dựa trên sự thật.",
      en: "Contracts, fairness, clear evaluation. Decide on facts.",
    },
    growth: {
      vi: "Nhận trách nhiệm phần của mình — không hơn, không kém.",
      en: "Own your share — no more, no less.",
    },
    spirit: {
      vi: "Nghiệp và cân bằng — chỉnh lại điều lệch.",
      en: "Karma and balance — correct what is skewed.",
    },
  },
  "the-hanged-man": {
    love: {
      vi: "Tạm dừng; nhìn quan hệ từ góc mới. Hy sinh có ý thức, không tự hủy.",
      en: "Pause; see the bond from a new angle. Conscious sacrifice, not self-erasure.",
    },
    career: {
      vi: "Treo dự án để thấy rõ. Đổi góc nhìn chiến lược.",
      en: "Suspend a project to see clearly. Change strategic angle.",
    },
    growth: {
      vi: "Buông kiểm soát; bài học đến khi bạn chịu đảo ngược giả định.",
      en: "Release control; lessons arrive when you invert assumptions.",
    },
    spirit: {
      vi: "Đầu hàng thiêng — chờ đợi cũng là hành động.",
      en: "Sacred surrender — waiting is also action.",
    },
  },
  death: {
    love: {
      vi: "Kết thúc một hình thái quan hệ để hình thái mới có chỗ. Tiễn biệt sạch sẽ.",
      en: "An ending so a new form can begin. Make a clean farewell.",
    },
    career: {
      vi: "Chuyển ngành/vai trò; đừng níu xác chết chuyên môn.",
      en: "Role or industry shift; don't cling to a dead specialty.",
    },
    growth: {
      vi: "Lột xác bản sắc. Đau là cửa, không phải đích.",
      en: "Identity molt. Pain is a door, not the destination.",
    },
    spirit: {
      vi: "Cái chết của ảo tưởng — khoảng trống cho tái sinh.",
      en: "Death of illusion — emptiness for rebirth.",
    },
  },
  temperance: {
    love: {
      vi: "Hòa hợp nhịp hai người; pha trộn khác biệt thành hợp kim.",
      en: "Harmonize two rhythms; alloy differences into something shared.",
    },
    career: {
      vi: "Cân bằng tốc độ và chất lượng; hợp tác đa kỹ năng.",
      en: "Balance speed and quality; cross-skill collaboration.",
    },
    growth: {
      vi: "Điều độ — chữa lành bằng nhịp đều.",
      en: "Moderation — heal through even rhythm.",
    },
    spirit: {
      vi: "Luyện kim nội tâm: pha nước và lửa thành sự bình an.",
      en: "Inner alchemy: blend water and fire into peace.",
    },
  },
  "the-devil": {
    love: {
      vi: "Dính mắc, ghen, hoặc vòng lặp độc. Nhìn chuỗi xích bạn tự khóa.",
      en: "Attachment, jealousy, or toxic loops. See the chain you locked yourself.",
    },
    career: {
      vi: "Công việc hút năng lượng / vàng bóng. Đặt lại ranh giới.",
      en: "Work that drains / golden handcuffs. Reset boundaries.",
    },
    growth: {
      vi: "Đối diện bóng tối ham muốn mà không xấu hổ hủy diệt.",
      en: "Face desire's shadow without annihilating shame.",
    },
    spirit: {
      vi: "Giải thoát khỏi thần tượng giả — kể cả 'tâm linh' như trốn chạy.",
      en: "Free from false idols — including 'spirituality' as escape.",
    },
  },
  "the-tower": {
    love: {
      vi: "Rung chuyển bất ngờ; cấu trúc giả đổ. Xây lại trên sự thật.",
      en: "Sudden shake; false structures fall. Rebuild on truth.",
    },
    career: {
      vi: "Thay đổi đột ngột — layoff, pivot. Giữ lõi kỹ năng.",
      en: "Sudden change — layoff, pivot. Keep your skill core.",
    },
    growth: {
      vi: "Vỡ để thấy nền. Đừng tô son lên tháp nứt.",
      en: "Break to see the foundation. Don't paint a cracked tower.",
    },
    spirit: {
      vi: "Sét đánh thức — mặc khải đau nhưng sạch.",
      en: "Lightning awakening — painful but clarifying revelation.",
    },
  },
  "the-star": {
    love: {
      vi: "Hy vọng và chữa lành sau bão. Mở lại bằng sự dịu dàng.",
      en: "Hope and healing after storm. Reopen with gentleness.",
    },
    career: {
      vi: "Tầm nhìn dài; làm việc vì ý nghĩa, không chỉ KPI.",
      en: "Long vision; work for meaning, not only KPIs.",
    },
    growth: {
      vi: "Phục hồi niềm tin vào bản thân từng giọt.",
      en: "Restore self-trust drop by drop.",
    },
    spirit: {
      vi: "Ngôi sao dẫn đường — cầu nguyện bằng lòng biết ơn.",
      en: "The guiding star — pray through gratitude.",
    },
  },
  "the-moon": {
    love: {
      vi: "Mơ hồ, tưởng tượng, sợ bóng. Kiểm chứng thay vì đoán.",
      en: "Ambiguity, projection, shadow fear. Verify instead of guessing.",
    },
    career: {
      vi: "Thông tin chưa rõ; tránh quyết lớn trong sương.",
      en: "Unclear information; avoid big calls in the fog.",
    },
    growth: {
      vi: "Làm bạn với vô thức — nghệ thuật, trị liệu, giấc mơ.",
      en: "Befriend the unconscious — art, therapy, dreams.",
    },
    spirit: {
      vi: "Đường đêm của tâm hồn; tin trực giác nhưng soi đèn.",
      en: "The night path of the soul; trust intuition, carry a lamp.",
    },
  },
  "the-sun": {
    love: {
      vi: "Niềm vui rõ ràng, ấm áp, được thấy. Chia sẻ ánh sáng.",
      en: "Clear joy, warmth, being seen. Share the light.",
    },
    career: {
      vi: "Thành công lộ diện; tự tin thể hiện năng lực.",
      en: "Success visible; confidently show your craft.",
    },
    growth: {
      vi: "Sống thật với bản sắc tươi sáng của bạn.",
      en: "Live true to your bright identity.",
    },
    spirit: {
      vi: "Ánh sáng ý thức — vui cũng thiêng.",
      en: "Light of consciousness — joy is sacred too.",
    },
  },
  judgement: {
    love: {
      vi: "Lời gọi làm mới quan hệ hoặc tha thứ có chọn lọc.",
      en: "A call to renew the bond — or forgive with discernment.",
    },
    career: {
      vi: "Đánh giá, gọi nghề nghiệp, bước vào vai trò lớn hơn.",
      en: "Review, vocation call, step into a larger role.",
    },
    growth: {
      vi: "Thức tỉnh: nghe lời gọi cũ bạn từng trì hoãn.",
      en: "Awakening: hear the call you postponed.",
    },
    spirit: {
      vi: "Tiếng gọi từ cao hơn — trả lời bằng đời sống, không chỉ lời.",
      en: "A higher call — answer with life, not only words.",
    },
  },
  "the-world": {
    love: {
      vi: "Viên mãn chu kỳ; cam kết toàn vẹn hoặc đóng chương đẹp.",
      en: "Cycle completion; wholehearted commitment or a graceful close.",
    },
    career: {
      vi: "Hoàn tất lớn; sẵn sàng vòng thành tựu mới.",
      en: "A major completion; ready for a new success cycle.",
    },
    growth: {
      vi: "Hòa hợp các phần thành một bản ngã tròn.",
      en: "Integrate parts into a rounded self.",
    },
    spirit: {
      vi: "Khiêu vũ với toàn thể — bạn thuộc về vũ trụ này.",
      en: "Dance with the whole — you belong to this cosmos.",
    },
  },
};

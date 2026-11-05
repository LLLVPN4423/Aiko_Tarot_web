"use client";

import { useEffect, useMemo, useState } from "react";
import type { DeckCard } from "@/lib/deck";
import type { TopicId } from "@/lib/tarot";
import { knowledgeCards } from "@/data/knowledge";
import type { ReadingDepth } from "@/data/knowledge/types";
import { topicLenses } from "@/data/topic-lenses";
import {
  buildDrawnFromSpread,
  buildReading,
  type ReadingResult,
} from "@/lib/reader";
import {
  clearFollowUps,
  saveReadingSession,
  updateReadingSession,
  type ReadingSession,
} from "@/lib/reader/session";
import { answerFollowUp as runFollowUp } from "@/lib/reader/followup";
import { useI18n } from "@/lib/i18n";
import { GlassPanel } from "./GlassPanel";
import { TarotCardFace } from "./TarotCardFace";

type Props = {
  slots: (DeckCard | null)[];
  spreadId: string;
  topic: TopicId;
  question: string;
  depth: ReadingDepth;
};

export function ReadingInterpretation({
  slots,
  spreadId,
  topic,
  question,
  depth,
}: Props) {
  const { locale, t } = useI18n();
  const [showWhy, setShowWhy] = useState(false);
  const [session, setSession] = useState<ReadingSession | null>(null);
  const [followDraft, setFollowDraft] = useState("");

  const drawnCards = useMemo(
    () =>
      slots
        .map((s) => (s ? { cardId: s.card.id, reversed: s.reversed } : null))
        .filter((s): s is { cardId: number; reversed: boolean } => s !== null),
    [slots],
  );

  const result: ReadingResult | null = useMemo(() => {
    if (!drawnCards.length) return null;
    try {
      const drawn = buildDrawnFromSpread({
        spreadId,
        locale,
        cards: drawnCards,
      });
      return buildReading({
        question,
        topic,
        depth,
        spreadId,
        locale,
        cards: drawn,
        knowledge: knowledgeCards,
      });
    } catch {
      return null;
    }
  }, [drawnCards, spreadId, locale, question, topic, depth]);

  useEffect(() => {
    if (!result) return;
    const saved = saveReadingSession(result);
    setSession(saved);
  }, [result]);

  if (!result) {
    return (
      <GlassPanel>
        <p className="text-sm text-slate-400">
          {t("Chưa đủ dữ liệu để giải bài.", "Not enough data to interpret.")}
        </p>
      </GlassPanel>
    );
  }

  const loc = locale;
  const faceById = new Map(
    slots.filter(Boolean).map((s) => [s!.card.id, s! as DeckCard]),
  );

  const onFollow = (prompt: string) => {
    if (!session) return;
    const answer = runFollowUp(session, prompt);
    const turn = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      prompt,
      answer,
    };
    const next = {
      ...session,
      followUps: [...session.followUps, turn],
    };
    updateReadingSession(next);
    setSession(next);
    setFollowDraft("");
  };

  return (
    <div className="space-y-6">
      <GlassPanel>
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-antique-gold)]">
          {topicLenses[result.topic].label[loc]}
          {depth === "deep"
            ? ` · ${t("đọc sâu", "deep")}`
            : depth === "quick"
              ? ` · ${t("nhanh", "quick")}`
              : ""}
        </p>
        {question.trim() ? (
          <p className="mt-2 text-sm italic text-[var(--color-muted-text)]">
            “{question.trim()}”
          </p>
        ) : null}
        <h3 className="mt-3 font-serif text-lg text-[var(--color-soft-gold)]">
          {t("Tóm tắt", "In short")}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-warm-ivory)]/90">
          {result.overview[loc]}
        </p>
      </GlassPanel>

      {result.cards.map((c) => {
        const deck = faceById.get(c.cardId);
        const meaning = c.sections.find((s) => s.id === "meaning");
        const tip = c.sections.find((s) => s.id === "advice");
        const extra = c.sections.find(
          (s) => s.id === "approach" || s.id === "symbolism",
        );
        const kws =
          loc === "vi"
            ? knowledgeCards.find((k) => k.id === c.cardId)?.keywords.vi
            : c.keywords;
        return (
          <GlassPanel key={`${c.cardId}-${c.positionId}`}>
            <div className="flex flex-col gap-6 sm:flex-row">
              {deck ? (
                <div className="relative mx-auto aspect-[2/3] w-36 shrink-0 sm:mx-0 sm:w-44">
                  <TarotCardFace card={deck.card} reversed={c.reversed} />
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-antique-gold)]">
                  {c.positionLabel}
                  {c.reversed
                    ? ` · ${t("Ngược", "Reversed")}`
                    : ` · ${t("Thuận", "Upright")}`}
                </p>
                <h3 className="mt-1 font-serif text-xl text-[var(--color-warm-ivory)]">
                  {c.name[loc]}
                </h3>
                {kws?.length ? (
                  <p className="mt-1 text-xs text-[var(--color-soft-gold)]">
                    {kws.slice(0, 4).join(" · ")}
                  </p>
                ) : null}
                {meaning ? (
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-warm-ivory)]/90">
                    {meaning.body[loc]}
                  </p>
                ) : null}
                {tip ? (
                  <p className="mt-3 text-sm text-[var(--color-muted-text)]">
                    <span className="text-[var(--color-antique-gold)]">
                      {t("Gợi ý", "Tip")}
                    </span>
                    : {tip.body[loc]}
                  </p>
                ) : null}
                {extra ? (
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    {extra.body[loc]}
                  </p>
                ) : null}
              </div>
            </div>
          </GlassPanel>
        );
      })}

      <GlassPanel>
        <h3 className="font-serif text-lg text-[var(--color-soft-gold)]">
          {t("Nối các lá lại", "Putting it together")}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-warm-ivory)]/90">
          {result.narrative[loc]}
        </p>
        {result.combinations[0] ? (
          <p className="mt-3 text-sm text-[var(--color-muted-text)]">
            <span className="text-[var(--color-antique-gold)]">
              {result.combinations[0].theme[loc]}
            </span>
            — {result.combinations[0].meaning[loc]}
          </p>
        ) : null}
      </GlassPanel>

      <GlassPanel>
        <h3 className="font-serif text-lg text-[var(--color-soft-gold)]">
          {t("Bạn có thể làm gì", "What you can do")}
        </h3>
        <p className="mt-3 text-sm text-[var(--color-warm-ivory)]/90">
          {result.guidance.next[loc]}
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted-text)]">
          {result.guidance.attend[loc]}
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted-text)]">
          {result.guidance.avoid[loc]}
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted-text)]">
          {result.reflections.map((r) => (
            <li key={r.en}>{r[loc]}</li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-4 text-xs text-cyan-300/90 underline-offset-2 hover:underline"
          onClick={() => setShowWhy((v) => !v)}
        >
          {showWhy
            ? t("Ẩn ghi chú", "Hide note")
            : t("Ghi chú nhỏ", "Small note")}
        </button>
        {showWhy ? (
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            {result.ethicsNote[loc]}{" "}
            {result.guidance.reconsider[loc]}
          </p>
        ) : null}
      </GlassPanel>

      <GlassPanel>
        <h3 className="font-serif text-lg text-[var(--color-soft-gold)]">
          {t("Hỏi thêm về trải này", "Follow up on this reading")}
        </h3>
        <p className="mt-2 text-xs text-slate-500">
          {t(
            "Trả lời theo quy tắc từ chính trải bài đã rút — không xào bài mới, không AI.",
            "Rule-based answers from this draw only — no reshuffle, no AI.",
          )}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            locale === "vi"
              ? [
                  "Tôi nên chú ý gì?",
                  "Giải thích lá ngược",
                  "Hai lá này liên hệ thế nào?",
                  "Ý nghĩa cho quan hệ?",
                ]
              : [
                  "What should I watch?",
                  "Explain the reversed card",
                  "How do these cards relate?",
                  "What does this mean for relationship?",
                ]
          ).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onFollow(p)}
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300 hover:border-cyan-400/40"
            >
              {p}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            value={followDraft}
            onChange={(e) => setFollowDraft(e.target.value)}
            placeholder={t("Câu hỏi của bạn…", "Your question…")}
            className="flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-200"
          />
          <button
            type="button"
            disabled={!followDraft.trim()}
            onClick={() => onFollow(followDraft)}
            className="rounded-full border border-cyan-400/40 px-5 py-2 text-sm text-cyan-100 disabled:opacity-40"
          >
            {t("Gửi", "Ask")}
          </button>
        </div>
        {session?.followUps.length ? (
          <div className="mt-4 space-y-3">
            {session.followUps.map((turn) => (
              <div
                key={turn.id}
                className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm"
              >
                <p className="text-cyan-200/90">Q: {turn.prompt}</p>
                <p className="mt-2 text-[var(--color-muted-text)]">
                  {turn.answer[loc]}
                </p>
              </div>
            ))}
            <button
              type="button"
              className="text-xs text-slate-500 underline"
              onClick={() => {
                if (!session) return;
                setSession(clearFollowUps(session));
              }}
            >
              {t("Xóa hội thoại (giữ trải bài)", "Clear chat (keep reading)")}
            </button>
          </div>
        ) : null}
      </GlassPanel>
    </div>
  );
}

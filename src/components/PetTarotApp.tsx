"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { petConfig } from "@/config/pet";
import { useI18n } from "@/lib/i18n";
import { useAudio } from "@/lib/audio";
import {
  createShuffledDeck,
  PPF_POSITIONS,
  type DeckCard,
} from "@/lib/deck";
import { captureElementAsPng } from "@/lib/export-reading";
import { saveJournalEntry, type TopicId } from "@/lib/tarot";
import { FlipCard } from "./FlipCard";
import { TarotCardBack } from "./TarotCardBack";
import { TarotCardFace } from "./TarotCardFace";
import { GlassPanel } from "./GlassPanel";
import { CardModal } from "./CardModal";

type Phase = "setup" | "deck" | "reading";

const topics: { id: TopicId; vi: string; en: string }[] = [
  { id: "general", vi: "Tổng quát", en: "General" },
  { id: "love", vi: "Tình cảm", en: "Love" },
  { id: "career", vi: "Công việc", en: "Career" },
  { id: "self", vi: "Bản thân", en: "Self" },
];

function MuteIcon({ muted }: { muted: boolean }) {
  return (
    <span className="text-lg" aria-hidden>
      {muted ? "🔇" : "🔊"}
    </span>
  );
}

export function PetTarotApp() {
  const { locale, setLocale, t } = useI18n();
  const { muted, toggleMute, playFlip, unlockAudio } = useAudio();

  const [phase, setPhase] = useState<Phase>("setup");
  const [topic, setTopic] = useState<TopicId>("general");
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [slots, setSlots] = useState<(DeckCard | null)[]>([
    null,
    null,
    null,
  ]);
  const [flipped, setFlipped] = useState([false, false, false]);
  const [shuffling, setShuffling] = useState(false);
  const [modalSlot, setModalSlot] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);
  const [exporting, setExporting] = useState(false);

  const exportRef = useRef<HTMLDivElement>(null);

  const positions = PPF_POSITIONS[locale];
  const drawnCount = slots.filter(Boolean).length;
  const allDrawn = drawnCount === 3;
  const allFlipped = allDrawn && flipped.every(Boolean);

  const availableDeck = useMemo(
    () =>
      deck.filter(
        (d) => !slots.some((s) => s?.uid === d.uid),
      ),
    [deck, slots],
  );

  const beginDeck = () => {
    unlockAudio();
    setDeck(createShuffledDeck());
    setSlots([null, null, null]);
    setFlipped([false, false, false]);
    setPhase("deck");
    setJournalSaved(false);
  };

  const runShuffle = useCallback(() => {
    unlockAudio();
    setShuffling(true);
    setSlots([null, null, null]);
    setFlipped([false, false, false]);
    setModalSlot(null);
    window.setTimeout(() => {
      setDeck(createShuffledDeck());
      setShuffling(false);
    }, 900);
  }, [unlockAudio]);

  const drawFromDeck = (card: DeckCard) => {
    if (!allDrawn) {
      unlockAudio();
      setSlots((prev) => {
        const idx = prev.findIndex((s) => s === null);
        if (idx === -1) return prev;
        const next = [...prev];
        next[idx] = card;
        return next;
      });
    }
  };

  const handleSlotClick = (index: number) => {
    const card = slots[index];
    if (!card) return;
    unlockAudio();

    if (!flipped[index]) {
      playFlip();
      setFlipped((prev) => {
        const next = [...prev];
        next[index] = true;
        const filled = slots.filter(Boolean).length === 3;
        if (filled && next.every(Boolean)) {
          window.setTimeout(() => setPhase("reading"), 400);
        }
        return next;
      });
      return;
    }

    setModalSlot(index);
  };

  const saveToJournal = () => {
    saveJournalEntry({
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      spread: "three",
      topic,
      cards: slots
        .filter((s): s is DeckCard => s !== null)
        .map((s) => ({ id: s.card.id, reversed: s.reversed })),
      note: note.trim() || undefined,
    });
    setJournalSaved(true);
  };

  const exportReading = async () => {
    if (!exportRef.current) return;
    setExporting(true);
    try {
      await captureElementAsPng(
        exportRef.current,
        `pet-tarot-${Date.now()}.png`,
      );
    } finally {
      setExporting(false);
    }
  };

  const resetAll = () => {
    setPhase("setup");
    setDeck([]);
    setSlots([null, null, null]);
    setFlipped([false, false, false]);
    setNote("");
    setModalSlot(null);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 pb-20">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-cyan-400/40 shadow-[0_0_24px_rgba(34,211,238,0.35)] ring-2 ring-purple-500/30">
            <Image
              src="/pet/face-closeup.png"
              alt={petConfig.name}
              fill
              className="object-cover"
              priority
              sizes="64px"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
              {t("Vũ trụ tarot", "Cosmic tarot")} · {petConfig.name}
            </p>
            <h1 className="heading-glow font-serif text-2xl font-semibold text-amber-50 sm:text-3xl">
              {petConfig.deckTitle[locale]}
            </h1>
            <p className="mt-1 max-w-md text-sm text-slate-400">
              {petConfig.tagline[locale]}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start">
          <button
            type="button"
            onClick={toggleMute}
            className="glass-panel flex h-10 w-10 items-center justify-center rounded-full border-cyan-400/30 p-0!"
            aria-label={muted ? t("Bật âm thanh", "Unmute") : t("Tắt âm thanh", "Mute")}
            title={muted ? t("Bật âm thanh", "Unmute") : t("Tắt âm thanh", "Mute")}
          >
            <MuteIcon muted={muted} />
          </button>
          <div className="glass-panel flex gap-1 rounded-full p-1!">
            {(["vi", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  locale === l
                    ? "bg-cyan-500/30 text-cyan-100"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {phase === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <GlassPanel>
              <h2 className="heading-glow font-serif text-xl text-amber-100">
                {t("Quá khứ · Hiện tại · Tương lai", "Past · Present · Future")}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {t(
                  "Xào bộ bài, chọn 3 lá úp từ deck, lật từng lá rồi xem chi tiết.",
                  "Shuffle the deck, pick 3 face-down cards, flip each one, then explore meanings.",
                )}
              </p>
              <h3 className="mt-6 font-serif text-sm uppercase tracking-widest text-cyan-300/90">
                {t("Chủ đề", "Topic")}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {topics.map((tp) => (
                  <button
                    key={tp.id}
                    type="button"
                    onClick={() => setTopic(tp.id)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      topic === tp.id
                        ? "border-amber-400/50 bg-amber-400/10 text-amber-100"
                        : "border-white/10 text-slate-400 hover:border-cyan-400/30"
                    }`}
                  >
                    {locale === "vi" ? tp.vi : tp.en}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={beginDeck}
                className="mt-8 rounded-full bg-linear-to-r from-cyan-600/80 to-purple-700/80 px-10 py-3 font-serif text-sm font-semibold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:brightness-110"
              >
                {t("Vào bàn xem bài", "Enter the reading table")}
              </button>
            </GlassPanel>
          </motion.div>
        )}

        {(phase === "deck" || phase === "reading") && (
          <motion.div
            key="deck"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-8"
          >
            <GlassPanel className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div>
                <h2 className="font-serif text-lg text-amber-100">
                  {t("Trải ba lá", "Three-card spread")}
                </h2>
                <p className="text-sm text-slate-400">
                  {allDrawn
                    ? t(
                        "Chạm lá để lật · chạm lá đã mở để phóng to",
                        "Tap to flip · tap revealed cards to zoom",
                      )
                    : t(
                        `Chọn ${3 - drawnCount} lá nữa từ deck (${drawnCount}/3)`,
                        `Pick ${3 - drawnCount} more from the deck (${drawnCount}/3)`,
                      )}
                </p>
              </div>
              <button
                type="button"
                onClick={runShuffle}
                disabled={shuffling}
                className="rounded-full border border-cyan-400/40 px-6 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/10 disabled:opacity-50"
              >
                {shuffling
                  ? t("Đang xào...", "Shuffling...")
                  : t("Xào bài", "Shuffle deck")}
              </button>
            </GlassPanel>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {positions.map((label, index) => {
                const card = slots[index];
                return (
                  <div key={label} className="flex flex-col items-center gap-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/80">
                      {label}
                    </p>
                    <div className="flex h-52 w-36 sm:h-60 sm:w-44 items-center justify-center">
                      {card ? (
                        <FlipCard
                          flipped={flipped[index]}
                          onClick={() => handleSlotClick(index)}
                          className="h-full w-full cursor-pointer"
                          glow={index === 1 ? "gold" : "cyan"}
                          front={
                            <TarotCardFace
                              card={card.card}
                              reversed={card.reversed}
                            />
                          }
                          back={<TarotCardBack />}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/5 text-xs text-slate-500">
                          {t("Trống", "Empty")}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <GlassPanel>
              <h3 className="font-serif text-sm uppercase tracking-widest text-amber-200/90">
                {t("Bộ bài (úp)", "Deck (face down)")}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {t(
                  "Nhấn một lá để rút vào vị trí còn trống.",
                  "Click a card to draw it into the next open slot.",
                )}
              </p>
              <div
                className={`mt-4 grid max-h-[420px] grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6 md:grid-cols-8 ${
                  shuffling ? "deck-shuffling" : ""
                }`}
              >
                {availableDeck.map((d, i) => (
                  <button
                    key={d.uid}
                    type="button"
                    disabled={allDrawn || shuffling}
                    onClick={() => drawFromDeck(d)}
                    className="deck-card-enter aspect-[3/4] min-h-[72px] disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ animationDelay: `${(i % 8) * 40}ms` }}
                  >
                    <div className="h-full w-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                      <TarotCardBack compact />
                    </div>
                  </button>
                ))}
              </div>
            </GlassPanel>

            {phase === "reading" && allFlipped && (
              <div className="space-y-6">
                <div
                  ref={exportRef}
                  className="rounded-2xl border border-amber-400/20 bg-[#0b0f19] p-6"
                >
                  <p className="text-center font-serif text-lg text-amber-100">
                    {petConfig.deckTitle[locale]}
                  </p>
                  <p className="text-center text-xs text-slate-500">
                    {new Date().toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US")}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {slots.map((s, i) =>
                      s ? (
                        <div key={s.uid} className="text-center">
                          <div className="relative mx-auto aspect-[3/4] w-full max-w-[100px] overflow-hidden rounded-lg border border-cyan-400/30">
                            <div className="absolute inset-0">
                              <TarotCardFace
                                card={s.card}
                                reversed={s.reversed}
                                compact
                              />
                            </div>
                          </div>
                          <p className="mt-2 text-[10px] uppercase text-cyan-300/80">
                            {positions[i]}
                          </p>
                          <p className="font-serif text-xs text-amber-100">
                            {s.card.name[locale]}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {s.card.keywords[locale].slice(0, 3).join(" · ")}
                          </p>
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>

                {slots.map((s, i) =>
                  s ? (
                    <GlassPanel key={`read-${s.uid}`}>
                      <h3 className="font-serif text-lg text-amber-100">
                        {positions[i]} — {s.card.name[locale]}
                        {s.reversed && (
                          <span className="ml-2 text-sm text-rose-300/90">
                            ({t("ngược", "reversed")})
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-cyan-200/70">
                        {s.card.keywords[locale].join(" · ")}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {s.reversed
                          ? s.card.reversed[locale]
                          : s.card.upright[locale]}
                      </p>
                    </GlassPanel>
                  ) : null,
                )}

                <GlassPanel>
                  <label
                    htmlFor="journal-note"
                    className="font-serif text-sm text-amber-100"
                  >
                    {t("Ghi chú", "Notes")}
                  </label>
                  <textarea
                    id="journal-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-slate-200"
                  />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={exportReading}
                      disabled={exporting}
                      className="rounded-full border border-amber-400/50 bg-amber-400/10 px-5 py-2 text-sm font-medium text-amber-100"
                    >
                      {exporting
                        ? t("Đang tạo ảnh...", "Creating image...")
                        : t("Lưu trải bài thành ảnh PNG", "Save reading as PNG")}
                    </button>
                    <button
                      type="button"
                      onClick={saveToJournal}
                      className="rounded-full border border-cyan-400/40 px-5 py-2 text-sm text-cyan-100"
                    >
                      {journalSaved
                        ? t("Đã lưu nhật ký ✓", "Journal saved ✓")
                        : t("Lưu nhật ký", "Save to journal")}
                    </button>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="rounded-full px-5 py-2 text-sm text-slate-400 hover:text-slate-200"
                    >
                      {t("Trải bài mới", "New reading")}
                    </button>
                  </div>
                </GlassPanel>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <CardModal
        open={modalSlot !== null}
        onClose={() => setModalSlot(null)}
        drawn={modalSlot !== null ? slots[modalSlot] : null}
        positionLabel={
          modalSlot !== null ? positions[modalSlot] : undefined
        }
      />

      <footer className="text-center text-xs text-slate-600">
        {t(
          "Tarot mang tính giải trí và tự suy ngẫm — không thay thế tư vấn chuyên môn.",
          "Tarot is for entertainment and reflection — not professional advice.",
        )}
      </footer>
    </div>
  );
}

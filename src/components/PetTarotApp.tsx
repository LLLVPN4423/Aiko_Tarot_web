"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { petConfig } from "@/config/pet";
import { topicLenses } from "@/data/topic-lenses";
import { useI18n } from "@/lib/i18n";
import { useAudio } from "@/lib/audio";
import { useSettings } from "@/lib/settings";
import {
  createShuffledDeck,
  deckCardsFromShared,
  emptyFlipped,
  emptySlots,
  type DeckCard,
} from "@/lib/deck";
import { captureElementAsPng } from "@/lib/export-reading";
import {
  getSpreadPositions,
  getSpreadPositionLabels,
  parseSpreadId,
  saveJournalEntry,
  slotCountForSpread,
  spreads,
  type SpreadId,
  type TopicId,
} from "@/lib/tarot";
import {
  decodeReadingFromHash,
  encodeReadingToHash,
  shareReadingText,
} from "@/lib/share-reading";
import { FlipCard } from "./FlipCard";
import { TarotCardBack } from "./TarotCardBack";
import { TarotCardFace } from "./TarotCardFace";
import { GlassPanel } from "./GlassPanel";
import { CardModal } from "./CardModal";
import { DailyCardBanner } from "./DailyCardBanner";
import { ReadingInterpretation } from "./ReadingInterpretation";
import { SpreadPreview } from "./SpreadPreview";

type Phase = "setup" | "deck" | "reading";

const spreadIds: SpreadId[] = ["single", "three", "five", "celtic"];

function MuteIcon({ muted }: { muted: boolean }) {
  return <span className="text-lg" aria-hidden>{muted ? "🔇" : "🔊"}</span>;
}

function gridClassForCount(n: number): string {
  if (n === 1) return "grid-cols-1 place-items-center";
  if (n === 3) return "grid-cols-1 sm:grid-cols-3";
  if (n === 5) return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";
  if (n >= 10) return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4";
  return "grid-cols-2 sm:grid-cols-3";
}

type SharedReadingBootstrap = {
  spread: SpreadId;
  topic: TopicId;
  slots: (DeckCard | null)[];
  flipped: boolean[];
  key: string;
};

const subscribeHashNoop = () => () => {};

let cachedShared: SharedReadingBootstrap | null | undefined;
let cachedSharedHash: string | undefined;

function readSharedReadingBootstrap(): SharedReadingBootstrap | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (cachedSharedHash === hash && cachedShared !== undefined) {
    return cachedShared;
  }
  cachedSharedHash = hash;
  const payload = decodeReadingFromHash(hash);
  if (!payload) {
    cachedShared = null;
    return null;
  }
  const n = slotCountForSpread(payload.spread);
  if (payload.cards.length !== n) {
    cachedShared = null;
    return null;
  }
  const built = deckCardsFromShared(payload.cards);
  if (!built) {
    cachedShared = null;
    return null;
  }
  cachedShared = {
    spread: payload.spread,
    topic: payload.topic,
    slots: built,
    flipped: built.map(() => true),
    key: built.map((c) => c.uid).join("-"),
  };
  return cachedShared;
}

export function PetTarotApp() {
  const searchParams = useSearchParams();
  const shared = useSyncExternalStore(
    subscribeHashNoop,
    readSharedReadingBootstrap,
    () => null,
  );
  const urlSpread = parseSpreadId(searchParams.get("spread"));

  return (
    <PetTarotAppInner
      key={shared ? `shared-${shared.key}` : "live"}
      initialShared={shared}
      urlSpread={urlSpread}
    />
  );
}

type PetTarotAppInnerProps = {
  initialShared: SharedReadingBootstrap | null;
  urlSpread: SpreadId;
};

function PetTarotAppInner({
  initialShared,
  urlSpread,
}: PetTarotAppInnerProps) {
  const router = useRouter();
  const { locale, setLocale, t } = useI18n();
  const { muted, toggleMute, playFlip, unlockAudio } = useAudio();
  const {
    reversedChance,
    reversedEnabled,
    deckMode,
    reduceMotion,
  } = useSettings();

  const startingSpread = initialShared?.spread ?? urlSpread;
  const startingCount = slotCountForSpread(startingSpread);

  const [phase, setPhase] = useState<Phase>(
    initialShared ? "reading" : "setup",
  );
  const [spread, setSpread] = useState<SpreadId>(startingSpread);
  const [topic, setTopic] = useState<TopicId>(
    initialShared?.topic ?? "general",
  );
  const [question, setQuestion] = useState("");
  const slotCount = slotCountForSpread(spread);

  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [slots, setSlots] = useState<(DeckCard | null)[]>(
    () => initialShared?.slots ?? emptySlots(startingCount),
  );
  const [flipped, setFlipped] = useState(
    () => initialShared?.flipped ?? emptyFlipped(startingCount),
  );
  const [shuffling, setShuffling] = useState(false);
  const [modalSlot, setModalSlot] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [shareOk, setShareOk] = useState(false);

  const exportRef = useRef<HTMLDivElement>(null);

  const positions = useMemo(
    () => getSpreadPositions(spread, locale),
    [spread, locale],
  );
  const lens = topicLenses[topic];
  const drawnCount = slots.filter(Boolean).length;
  const allDrawn = drawnCount === slotCount;
  const allFlipped = allDrawn && flipped.every(Boolean);

  const availableDeck = useMemo(
    () => deck.filter((d) => !slots.some((s) => s?.uid === d.uid)),
    [deck, slots],
  );

  const syncSpreadInUrl = useCallback(
    (nextSpread: SpreadId) => {
      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : "",
      );
      params.set("spread", nextSpread);
      const hash =
        typeof window !== "undefined" ? window.location.hash : "";
      router.replace(`/reading?${params.toString()}${hash}`, {
        scroll: false,
      });
    },
    [router],
  );

  const applySpread = useCallback((nextSpread: SpreadId) => {
    setSpread(nextSpread);
    const n = slotCountForSpread(nextSpread);
    setSlots(emptySlots(n));
    setFlipped(emptyFlipped(n));
  }, []);

  // Home featured links (and soft navigations) pass ?spread= — apply while still in setup.
  useEffect(() => {
    if (initialShared) return;
    if (phase !== "setup") return;
    if (urlSpread === spread) return;
    applySpread(urlSpread);
  }, [urlSpread, phase, spread, initialShared, applySpread]);

  const selectSpread = (nextSpread: SpreadId) => {
    applySpread(nextSpread);
    syncSpreadInUrl(nextSpread);
  };

  const resetSlotsForSpread = (nextSpread: SpreadId) => {
    const n = slotCountForSpread(nextSpread);
    setSlots(emptySlots(n));
    setFlipped(emptyFlipped(n));
  };

  const beginDeck = () => {
    unlockAudio();
    const n = slotCountForSpread(spread);
    setDeck(
      createShuffledDeck({
        reversedChance,
        reversedEnabled,
        deckMode,
      }),
    );
    setSlots(emptySlots(n));
    setFlipped(emptyFlipped(n));
    setPhase("deck");
    setJournalSaved(false);
    setShareOk(false);
    syncSpreadInUrl(spread);
  };

  const runShuffle = useCallback(() => {
    unlockAudio();
    setShuffling(true);
    const n = slotCountForSpread(spread);
    setSlots(emptySlots(n));
    setFlipped(emptyFlipped(n));
    setModalSlot(null);
    window.setTimeout(() => {
      setDeck(
        createShuffledDeck({
          reversedChance,
          reversedEnabled,
          deckMode,
        }),
      );
      setShuffling(false);
    }, reduceMotion ? 200 : 900);
  }, [
    unlockAudio,
    spread,
    reversedChance,
    reversedEnabled,
    deckMode,
    reduceMotion,
    setModalSlot,
  ]);

  const drawFromDeck = (card: DeckCard) => {
    if (allDrawn) return;
    unlockAudio();
    const needed = slotCount;
    setSlots((prev) => {
      const base =
        prev.length === needed
          ? prev
          : [
              ...prev.slice(0, needed),
              ...emptySlots(Math.max(0, needed - prev.length)),
            ];
      const idx = base.findIndex((s) => s === null);
      if (idx === -1) return prev;
      const next = [...base];
      next[idx] = card;
      return next;
    });
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
        const ready =
          slots.filter(Boolean).length === slotCount &&
          slots.every((s, i) => !s || next[i]);
        if (ready) window.setTimeout(() => setPhase("reading"), 400);
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
      spread,
      topic,
      cards: slots
        .filter((s): s is DeckCard => s !== null)
        .map((s) => ({ id: s.card.id, reversed: s.reversed })),
      positionLabels: getSpreadPositionLabels(spread),
      question: question.trim() || undefined,
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
        `celestial-cat-${Date.now()}.png`,
      );
    } finally {
      setExporting(false);
    }
  };

  const shareReading = async () => {
    const cards = slots
      .filter((s): s is DeckCard => s !== null)
      .map((s) => ({ id: s.card.id, reversed: s.reversed }));
    const hash = encodeReadingToHash({ spread, topic, cards });
    const url = `${window.location.origin}/reading${hash}`;
    const names = cards
      .map((c) => {
        const card = slots.find((s) => s?.card.id === c.id)?.card;
        return card ? `${card.name[locale]}${c.reversed ? " ↓" : ""}` : "";
      })
      .join(" · ");
    const ok = await shareReadingText(
      `${petConfig.deckTitle[locale]} — ${names}`,
      url,
    );
    setShareOk(ok);
  };

  const resetAll = () => {
    setPhase("setup");
    setDeck([]);
    resetSlotsForSpread(spread);
    setNote("");
    setModalSlot(null);
  };

  const spreadInfo = spreads[spread];

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 pb-20">
      <DailyCardBanner />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[var(--color-antique-gold)]/45 shadow-[0_0_24px_rgba(198,161,91,0.28)] ring-2 ring-[var(--color-cosmic-violet)]/40">
            <Image
              src="/pet/celestial-mascot.png"
              alt={petConfig.name}
              fill
              className="object-cover object-top"
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
                {t("Chọn trải bài", "Choose a spread")}
              </h2>
              <div className="mt-4 flex flex-col gap-2">
                {spreadIds.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectSpread(id)}
                    className={`flex gap-4 rounded-xl border px-4 py-3 text-left text-sm transition ${
                      spread === id
                        ? "border-[var(--color-antique-gold)]/50 bg-[rgba(198,161,91,0.1)] text-[var(--color-warm-ivory)]"
                        : "border-white/10 text-[var(--color-muted-text)] hover:border-[var(--color-antique-gold)]/30"
                    }`}
                  >
                    <SpreadPreview spread={id} active={spread === id} />
                    <span className="min-w-0 flex-1">
                      <span className="font-serif font-semibold text-[var(--color-soft-gold)]">
                        {spreads[id].label[locale]}
                      </span>
                      <span className="mt-1 block text-[11px] uppercase tracking-wider text-[var(--color-antique-gold)]/80">
                        {spreads[id].positions.length}{" "}
                        {t("lá", "cards")}
                      </span>
                      <span className="mt-1 block text-xs opacity-90">
                        {spreads[id].blurb[locale]}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              <h3 className="mt-6 font-serif text-sm uppercase tracking-widest text-cyan-300/90">
                {t("Chủ đề", "Topic")}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{lens.intro[locale]}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(Object.keys(topicLenses) as TopicId[]).map((tp) => (
                  <button
                    key={tp}
                    type="button"
                    onClick={() => setTopic(tp)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      topic === tp
                        ? "border-amber-400/50 bg-amber-400/10 text-amber-100"
                        : "border-white/10 text-slate-400 hover:border-cyan-400/30"
                    }`}
                  >
                    {topicLenses[tp].label[locale]}
                  </button>
                ))}
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-500">
                {lens.prompts[locale].map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <label className="mt-4 block text-sm text-slate-400">
                {t("Câu hỏi của bạn (tuỳ chọn)", "Your question (optional)")}
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-200"
                />
              </label>
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
                  {spreadInfo.label[locale]}
                </h2>
                <p className="text-sm text-slate-400">
                  {allDrawn
                    ? t(
                        "Chạm lá để lật · chạm lá đã mở để phóng to",
                        "Tap to flip · tap revealed cards to zoom",
                      )
                    : t(
                        `Chọn ${slotCount - drawnCount} lá nữa (${drawnCount}/${slotCount})`,
                        `Pick ${slotCount - drawnCount} more (${drawnCount}/${slotCount})`,
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

            <div className={`grid gap-6 ${gridClassForCount(slotCount)}`}>
              {positions.map((label, index) => {
                const card = slots[index];
                return (
                  <div key={`${label}-${index}`} className="flex flex-col items-center gap-3">
                    <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/80">
                      {label}
                    </p>
                    <div className="flex h-52 w-36 sm:h-60 sm:w-44 items-center justify-center">
                      {card ? (
                        <FlipCard
                          flipped={flipped[index]}
                          onClick={() => handleSlotClick(index)}
                          className="h-full w-full cursor-pointer"
                          glow={index === Math.floor(slotCount / 2) ? "gold" : "cyan"}
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
              <div
                className={`mt-4 grid max-h-[420px] grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6 md:grid-cols-8 ${
                  shuffling && !reduceMotion ? "deck-shuffling" : ""
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
                <GlassPanel>
                  <p className="text-sm text-cyan-200/80">{lens.intro[locale]}</p>
                </GlassPanel>
                <div
                  ref={exportRef}
                  className="rounded-2xl border border-amber-400/20 bg-[#0b0f19] p-6"
                >
                  <p className="text-center font-serif text-lg text-amber-100">
                    {petConfig.deckTitle[locale]}
                  </p>
                  <p className="text-center text-xs text-slate-500">
                    {spreadInfo.label[locale]} ·{" "}
                    {new Date().toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US")}
                  </p>
                  <div className={`mt-4 grid gap-3 ${gridClassForCount(slotCount)}`}>
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
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>

                <ReadingInterpretation
                  slots={slots}
                  positions={positions}
                  topic={topic}
                />

                <GlassPanel>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder={t("Ghi chú...", "Notes...")}
                    className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-slate-200"
                  />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={exportReading}
                      disabled={exporting}
                      className="rounded-full border border-amber-400/50 bg-amber-400/10 px-5 py-2 text-sm text-amber-100"
                    >
                      {exporting
                        ? t("Đang tạo ảnh...", "Creating image...")
                        : t("Lưu PNG", "Save PNG")}
                    </button>
                    <button
                      type="button"
                      onClick={saveToJournal}
                      className="rounded-full border border-cyan-400/40 px-5 py-2 text-sm text-cyan-100"
                    >
                      {journalSaved
                        ? t("Đã lưu ✓", "Saved ✓")
                        : t("Lưu nhật ký", "Save journal")}
                    </button>
                    <button
                      type="button"
                      onClick={shareReading}
                      className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-300"
                    >
                      {shareOk
                        ? t("Đã sao chép/chia sẻ", "Shared/copied")
                        : t("Chia sẻ", "Share")}
                    </button>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="rounded-full px-5 py-2 text-sm text-slate-400"
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
        positionLabel={modalSlot !== null ? positions[modalSlot] : undefined}
      />
    </div>
  );
}

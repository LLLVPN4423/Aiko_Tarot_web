"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  cardById,
  deleteJournalEntry,
  loadJournal,
  spreads,
  updateJournalNote,
  type JournalEntry,
} from "@/lib/tarot";
import { useI18n } from "@/lib/i18n";
import { encodeReadingToHash } from "@/lib/share-reading";
import { GlassPanel } from "./GlassPanel";
import { TarotCardFace } from "./TarotCardFace";

export function JournalPageClient() {
  const { locale, t } = useI18n();
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadJournal());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState("");
  const [search, setSearch] = useState("");

  const refresh = () => setEntries(loadJournal());

  const sorted = useMemo(() => {
    const q = search.toLowerCase().trim();
    return [...entries]
      .filter((e) => {
        if (!q) return true;
        return (
          e.question?.toLowerCase().includes(q) ||
          e.note?.toLowerCase().includes(q) ||
          spreads[e.spread].label.en.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.at.localeCompare(a.at));
  }, [entries, search]);

  const startEdit = (e: JournalEntry) => {
    setEditingId(e.id);
    setDraftNote(e.note ?? "");
  };

  const saveEdit = (id: string) => {
    updateJournalNote(id, draftNote);
    setEditingId(null);
    refresh();
  };

  const remove = (id: string) => {
    deleteJournalEntry(id);
    refresh();
  };

  if (sorted.length === 0) {
    return (
      <GlassPanel className="mx-auto max-w-lg text-center">
        <p className="text-slate-400">
          {t("Chưa có lần xem bài nào được lưu.", "No saved readings yet.")}
        </p>
        <Link
          href="/reading"
          className="mt-4 inline-block text-[var(--color-antique-gold)] underline"
        >
          {t("Xem bài ngay", "Start a reading")}
        </Link>
      </GlassPanel>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("Tìm câu hỏi hoặc ghi chú...", "Search question or notes...")}
        className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm"
      />
      {sorted.map((entry) => (
        <GlassPanel key={entry.id}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-serif text-amber-100">
                {spreads[entry.spread].label[locale]}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(entry.at).toLocaleString(
                  locale === "vi" ? "vi-VN" : "en-US",
                )}
              </p>
              {entry.question && (
                <p className="mt-1 text-sm italic text-slate-400">
                  “{entry.question}”
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <Link
                href={`/reading${encodeReadingToHash({
                  spread: entry.spread,
                  topic: entry.topic,
                  cards: entry.cards,
                })}`}
                className="text-cyan-400 hover:underline"
              >
                {t("Xem lại", "Replay reading")}
              </Link>
              <button
                type="button"
                onClick={() => remove(entry.id)}
                className="text-rose-400 hover:underline"
              >
                {t("Xóa", "Delete")}
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {entry.cards.map((c, i) => {
              const card = cardById(c.id);
              if (!card) return null;
              const label =
                entry.positionLabels[i]?.[locale] ?? `#${i + 1}`;
              return (
                <div key={`${entry.id}-${c.id}-${i}`} className="w-20 text-center">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                    <TarotCardFace card={card} reversed={c.reversed} compact />
                  </div>
                  <p className="mt-1 text-[9px] uppercase text-cyan-300/70">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
          {editingId === entry.id ? (
            <div className="mt-4">
              <textarea
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-white/10 bg-black/30 p-2 text-sm"
              />
              <button
                type="button"
                onClick={() => saveEdit(entry.id)}
                className="mt-2 text-sm text-cyan-300 underline"
              >
                {t("Lưu ghi chú", "Save note")}
              </button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">
              {entry.note || t("(Không ghi chú)", "(No note)")}{" "}
              <button
                type="button"
                onClick={() => startEdit(entry)}
                className="text-cyan-400 underline"
              >
                {t("Sửa", "Edit")}
              </button>
            </p>
          )}
        </GlassPanel>
      ))}
    </div>
  );
}

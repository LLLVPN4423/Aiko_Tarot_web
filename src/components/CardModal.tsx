"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { DeckCard } from "@/lib/deck";
import { useI18n } from "@/lib/i18n";
import { TarotCardFace } from "./TarotCardFace";

type Props = {
  open: boolean;
  onClose: () => void;
  drawn: DeckCard | null;
  positionLabel?: string;
};

export function CardModal({ open, onClose, drawn, positionLabel }: Props) {
  const { locale, t } = useI18n();

  if (!drawn) return null;

  const { card, reversed } = drawn;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal
          aria-labelledby="card-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#050810]/85 backdrop-blur-md"
            onClick={onClose}
            aria-label={t("Đóng", "Close")}
          />
          <motion.div
            className="glass-panel relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col gap-4 overflow-y-auto border-amber-400/30 sm:max-w-2xl"
            initial={{ scale: 0.92, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full border border-white/20 px-2 py-1 text-sm text-slate-300 hover:bg-white/10"
            >
              ✕
            </button>
            {positionLabel && (
              <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-cyan-300/90">
                {positionLabel}
              </p>
            )}
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl shadow-[0_0_60px_rgba(251,191,36,0.25)]">
              {card.imagePath ? (
                <Image
                  src={card.imagePath}
                  alt={card.name[locale]}
                  fill
                  className={`object-cover ${reversed ? "rotate-180" : ""}`}
                  sizes="320px"
                  priority
                />
              ) : (
                <div className="h-full min-h-[320px] w-full">
                  <TarotCardFace card={card} reversed={reversed} />
                </div>
              )}
            </div>
            <div className="text-center">
              <h2
                id="card-modal-title"
                className="heading-glow font-serif text-2xl font-semibold text-amber-100"
              >
                {card.name[locale]}
              </h2>
              <p className="mt-1 text-sm text-cyan-200/80">
                {reversed ? t("Ngược", "Reversed") : t("Thuận", "Upright")} ·{" "}
                {card.keywords[locale].join(" · ")}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              {reversed ? card.reversed[locale] : card.upright[locale]}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

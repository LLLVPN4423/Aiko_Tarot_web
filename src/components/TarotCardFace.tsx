"use client";

import Image from "next/image";
import type { MajorArcanaCard } from "@/data/major-arcana";
import { useI18n } from "@/lib/i18n";

type Props = {
  card: MajorArcanaCard;
  reversed?: boolean;
  compact?: boolean;
};

export function TarotCardFace({ card, reversed, compact }: Props) {
  const { locale } = useI18n();

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-xl border border-amber-400/35 bg-[#0f1525] shadow-[inset_0_0_24px_rgba(251,191,36,0.08)] ${
        reversed ? "rotate-180" : ""
      }`}
    >
      {card.imagePath ? (
        <Image
          src={card.imagePath}
          alt={card.name[locale]}
          fill
          className="object-cover"
          sizes={compact ? "120px" : "(max-width:768px) 40vw, 220px"}
        />
      ) : (
        <div className="flex h-full flex-col bg-linear-to-br from-[#1a1035] via-[#121a2e] to-[#0b0f19] p-3">
          <div className="relative mx-auto mt-1 aspect-square w-[55%] overflow-hidden rounded-full border-2 border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <Image
              src="/pet/face-closeup.png"
              alt=""
              fill
              className="object-cover scale-110"
              sizes="120px"
            />
          </div>
          <p className="mt-2 text-center font-serif text-[10px] font-bold uppercase tracking-widest text-cyan-300/70">
            {String(card.id).padStart(2, "0")}
          </p>
          <p
            className={`text-center font-serif font-bold leading-tight text-amber-100 ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            {card.name[locale]}
          </p>
          <div className="mt-auto flex flex-wrap justify-center gap-1 pb-1">
            {card.keywords[locale].slice(0, 2).map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-slate-300"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0b0f19]/40 to-transparent" />
    </div>
  );
}

"use client";

import Image from "next/image";

type Props = {
  compact?: boolean;
};

/** Mystical astrology / mythology card reverse */
export function TarotCardBack({ compact }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-[var(--color-antique-gold)]/45 bg-[var(--color-obsidian)] shadow-[inset_0_0_28px_rgba(0,0,0,0.45)]">
      <Image
        src="/cards/card-back.png"
        alt=""
        fill
        className="object-cover"
        sizes={compact ? "80px" : "(max-width:768px) 40vw, 220px"}
        priority={!compact}
      />
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-[var(--color-antique-gold)]/25" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-black/10" />
    </div>
  );
}

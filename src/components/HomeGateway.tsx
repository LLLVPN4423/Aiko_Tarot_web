"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { deckStats, majorCards } from "@/data/deck-index";
import { spreads, type SpreadId } from "@/lib/tarot";
import { useI18n } from "@/lib/i18n";
import { GlassPanel } from "./GlassPanel";
import { SpreadPreview } from "./SpreadPreview";
import { TarotCardFace } from "./TarotCardFace";

const featuredSpreads: SpreadId[] = ["single", "three", "five", "celtic"];

const featuredSlugs = ["the-fool", "the-star", "the-moon", "the-sun"];

export function HomeGateway() {
  const { locale, t } = useI18n();
  const featured = majorCards.filter((c) => featuredSlugs.includes(c.slug));

  useEffect(() => {
    if (window.location.hash.startsWith("#r=")) {
      window.location.replace(`/reading${window.location.hash}`);
    }
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-antique-gold)]">
            {t("Tarot trực tuyến", "Online tarot")}
          </p>
          <h1 className="heading-glow mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Celestial Cat Tarot
          </h1>
          <p className="mt-2 font-serif text-lg text-[var(--color-soft-gold)]">
            {t("Hành trình qua các vì sao", "A journey through the stars")}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--color-muted-text)]">
            {t(
              "Bước vào phòng xem bài — chọn trải bài, xào bộ 72 lá, lật từng lá và đọc ý nghĩa có cấu trúc. Mọi thứ chạy trên trình duyệt của bạn; nhật ký lưu cục bộ.",
              "Enter the reading room — choose a spread, shuffle the 72-card deck, flip each card, and read structured meanings. Everything runs in your browser; journal saves locally.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/reading" className="btn-primary px-8 py-3">
              {t("Bắt đầu xem bài", "Begin your reading")}
            </Link>
            <Link href="/library" className="btn-ghost px-6 py-3">
              {t("Khám phá bộ bài", "Explore the deck")}
            </Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-[var(--color-antique-gold)]/30 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(198,161,91,0.18),transparent_60%)]" />
          <Image
            src="/pet/celestial-mascot.png"
            alt={t("Mèo Celestial Cat", "Celestial Cat mascot")}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width:768px) 80vw, 400px"
          />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl text-[var(--color-warm-ivory)]">
          {t("Cách hoạt động", "How it works")}
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            t("Chọn trải bài & chủ đề", "Pick spread & topic"),
            t("Xào & chọn lá", "Shuffle & draw"),
            t("Lật & khám phá", "Flip & reveal"),
            t("Lưu nhật ký", "Save to journal"),
          ].map((step, i) => (
            <GlassPanel key={step} className="text-sm">
              <span className="font-serif text-[var(--color-antique-gold)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[var(--color-warm-ivory)]">{step}</p>
            </GlassPanel>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl text-[var(--color-warm-ivory)]">
          {t("Trải bài nổi bật", "Featured spreads")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredSpreads.map((id) => (
            <Link key={id} href="/reading" className="group">
              <GlassPanel className="transition group-hover:border-[var(--color-antique-gold)]/45">
                <SpreadPreview spread={id} active />
                <p className="mt-3 font-serif text-sm text-[var(--color-soft-gold)]">
                  {spreads[id].label[locale]}
                </p>
                <p className="mt-1 text-xs text-[var(--color-muted-text)]">
                  {spreads[id].blurb[locale]}
                </p>
              </GlassPanel>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-serif text-2xl text-[var(--color-warm-ivory)]">
            {t("Lá nổi bật", "Featured cards")}
          </h2>
          <p className="text-xs text-[var(--color-muted-text)]">
            {deckStats.withArt}/{deckStats.total}{" "}
            {t("ảnh hoàn thiện", "finished artworks")}
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {featured.map((card) => (
            <Link
              key={card.slug}
              href={`/library/${card.slug}`}
              className="group overflow-hidden rounded-xl border border-white/10 transition hover:border-[var(--color-antique-gold)]/40"
            >
              <div className="relative aspect-[2/3]">
                <TarotCardFace card={card} />
              </div>
              <p className="p-2 text-center font-serif text-xs text-[var(--color-soft-gold)]">
                {card.name[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

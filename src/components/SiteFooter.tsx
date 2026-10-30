"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { locale, t } = useI18n();

  return (
    <footer className="mt-auto border-t border-[rgba(198,161,91,0.15)] bg-[var(--color-obsidian)]/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p className="font-serif text-sm tracking-wide text-[var(--color-soft-gold)]">
            Celestial Cat Tarot
          </p>
          <p className="mt-1 text-xs text-[var(--color-muted-text)]">
            {t(
              "Hành trình qua các vì sao — giải trí & suy ngẫm.",
              "A journey through the stars — entertainment & reflection.",
            )}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-[var(--color-muted-lavender)]">
          <Link href="/reading" className="hover:text-[var(--color-warm-ivory)]">
            {locale === "vi" ? "Xem bài" : "Reading"}
          </Link>
          <Link href="/library" className="hover:text-[var(--color-warm-ivory)]">
            {locale === "vi" ? "Bộ bài" : "Deck"}
          </Link>
          <Link href="/about" className="hover:text-[var(--color-warm-ivory)]">
            {locale === "vi" ? "Giới thiệu" : "About"}
          </Link>
        </div>
      </div>
    </footer>
  );
}

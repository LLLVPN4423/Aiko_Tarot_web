"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

const links = [
  { href: "/", vi: "Trang chủ", en: "Home" },
  { href: "/reading", vi: "Phòng xem bài", en: "Reading" },
  { href: "/library", vi: "Bộ bài", en: "Library" },
  { href: "/journal", vi: "Nhật ký", en: "Journal" },
  { href: "/about", vi: "Giới thiệu", en: "About" },
];

type Props = { onOpenSettings?: () => void };

export function SiteNav({ onOpenSettings }: Props) {
  const pathname = usePathname();
  const { locale } = useI18n();

  return (
    <nav className="sticky top-0 z-40 border-b border-[rgba(198,161,91,0.12)] bg-[var(--color-obsidian)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-3 sm:justify-between">
        <Link
          href="/"
          className="font-serif text-sm font-semibold tracking-[0.12em] text-[var(--color-soft-gold)]"
        >
          Celestial Cat Tarot
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-1">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-[rgba(198,161,91,0.18)] text-[var(--color-warm-ivory)]"
                    : "text-[var(--color-muted-text)] hover:bg-white/5 hover:text-[var(--color-warm-ivory)]"
                }`}
              >
                {locale === "vi" ? link.vi : link.en}
              </Link>
            );
          })}
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="rounded-full px-3 py-1.5 text-xs text-[var(--color-muted-lavender)] hover:bg-white/5"
              aria-label="Settings"
            >
              {locale === "vi" ? "Cài đặt" : "Settings"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

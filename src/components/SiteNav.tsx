"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

const links = [
  { href: "/", vi: "Xem bài", en: "Reading" },
  { href: "/library", vi: "Bộ bài", en: "Library" },
  { href: "/journal", vi: "Nhật ký", en: "Journal" },
  { href: "/about", vi: "Giới thiệu", en: "About" },
];

type Props = { onOpenSettings?: () => void };

export function SiteNav({ onOpenSettings }: Props) {
  const pathname = usePathname();
  const { locale } = useI18n();

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#080910]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-1 px-4 py-3 sm:justify-between">
        <Link
          href="/"
          className="font-serif text-sm font-semibold tracking-wide text-amber-100"
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
                    ? "bg-cyan-500/25 text-cyan-100"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
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
              className="rounded-full px-3 py-1.5 text-xs text-slate-400 hover:bg-white/5"
              aria-label="Settings"
            >
              ⚙
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

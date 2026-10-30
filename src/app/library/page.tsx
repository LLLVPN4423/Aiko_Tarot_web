import Link from "next/link";
import { allTarotCards, deckStats } from "@/data/deck-index";
import { LibraryGrid } from "@/components/LibraryGrid";

export const metadata = {
  title: "Library",
  description: "Browse all 72 Celestial Cat Tarot cards — Major and Minor Arcana.",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="heading-glow font-serif text-3xl text-[var(--color-warm-ivory)]">
        Celestial Cat Tarot · {deckStats.total}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted-text)]">
        {deckStats.withArt} finished artworks · {deckStats.minor} minor arcana with
        placeholder faces until illustration batch completes.
      </p>
      <LibraryGrid cards={allTarotCards} />
      <p className="mt-10 text-center text-xs">
        <Link href="/reading" className="text-[var(--color-antique-gold)] underline">
          ← Reading room
        </Link>
      </p>
    </div>
  );
}

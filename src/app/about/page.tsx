import Link from "next/link";
import { GlassPanel } from "@/components/GlassPanel";
import { deckStats } from "@/data/deck-index";

export const metadata = {
  title: "About",
  description: "About Celestial Cat Tarot — deck, mascot, and reading experience.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <GlassPanel>
        <h1 className="heading-glow font-serif text-2xl text-[var(--color-warm-ivory)]">
          Celestial Cat Tarot
        </h1>
        <p className="mt-2 font-serif text-[var(--color-soft-gold)]">
          A journey through the stars
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted-text)]">
          An online tarot application — not a static gallery. Choose a spread,
          shuffle the deck, draw and flip cards, and read structured
          interpretations. The mystical tabby cat is the through-line of a custom{" "}
          {deckStats.total}-card deck: {deckStats.major} Major Arcana and{" "}
          {deckStats.minor} minor suits (Celestial Wands, Lunar Cups, Astral
          Swords, Golden Pentacles).
        </p>
        <h2 className="mt-8 font-serif text-lg text-[var(--color-soft-gold)]">
          The cat
        </h2>
        <p className="mt-3 text-sm text-[var(--color-muted-text)]">
          Art direction follows a single character reference — gray-brown tabby,
          warm belly, gold-green eyes — appearing in different celestial roles
          while staying recognizable.
        </p>
        <h2 className="mt-8 font-serif text-lg text-[var(--color-soft-gold)]">
          Privacy & storage
        </h2>
        <p className="mt-3 text-sm text-[var(--color-muted-text)]">
          Readings and journal entries are stored in your browser (localStorage).
          They are not synced across devices unless you export or share a link.
        </p>
        <h2 className="mt-8 font-serif text-lg text-[var(--color-soft-gold)]">
          Disclaimer
        </h2>
        <p className="mt-3 text-sm text-[var(--color-muted-text)]">
          Tarot here is for entertainment and self-reflection only. It does not
          replace professional medical, legal, or financial advice.
        </p>
        <Link
          href="/reading"
          className="btn-primary mt-8 inline-block px-6 py-2.5"
        >
          Begin your reading
        </Link>
      </GlassPanel>
    </div>
  );
}

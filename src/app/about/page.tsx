import Link from "next/link";
import { GlassPanel } from "@/components/GlassPanel";

export const metadata = {
  title: "About",
  description: "About Celestial Cat Tarot — entertainment and reflection.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <GlassPanel>
        <h1 className="heading-glow font-serif text-2xl text-amber-100">
          Celestial Cat Tarot
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          A client-side tarot experience featuring 22 Major Arcana illustrated
          in a celestial, vintage fine-art style — starring a real tabby cat as
          the guide through the stars. Available in Vietnamese and English.
        </p>
        <h2 className="mt-8 font-serif text-lg text-amber-100">How to use</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-400">
          <li>Choose a spread (1, 3, or 5 cards) and optional topic.</li>
          <li>Shuffle and pick cards from the face-down deck.</li>
          <li>Flip each card, read meanings, save to journal or export PNG.</li>
          <li>Visit Library for all 22 cards; Daily card updates each day.</li>
        </ol>
        <h2 className="mt-8 font-serif text-lg text-amber-100">Disclaimer</h2>
        <p className="mt-3 text-sm text-slate-400">
          Tarot here is for entertainment and self-reflection only. It does not
          replace professional medical, legal, or financial advice.
        </p>
        <Link href="/" className="mt-8 inline-block text-cyan-400 underline">
          ← Start reading
        </Link>
      </GlassPanel>
    </div>
  );
}

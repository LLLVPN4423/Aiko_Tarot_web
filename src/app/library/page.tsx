import Link from "next/link";
import { majorArcana } from "@/data/major-arcana";
import { LibraryGrid } from "@/components/LibraryGrid";

export const metadata = {
  title: "Library",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="heading-glow font-serif text-2xl text-amber-100">
        Major Arcana · 22
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Celestial Cat Tarot — full art and meanings (VI/EN on each card).
      </p>
      <LibraryGrid cards={majorArcana} />
      <p className="mt-8 text-center text-xs text-slate-600">
        <Link href="/" className="text-cyan-400 underline">
          Back to reading
        </Link>
      </p>
    </div>
  );
}

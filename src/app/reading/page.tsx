import { Suspense } from "react";
import { PetTarotApp } from "@/components/PetTarotApp";

export const metadata = {
  title: "Reading Room",
  description: "Interactive Celestial Cat Tarot reading — spreads, shuffle, draw, interpret.",
};

export default function ReadingPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm text-slate-400">
          Loading reading room…
        </div>
      }
    >
      <PetTarotApp />
    </Suspense>
  );
}

import { JournalPageClient } from "@/components/JournalPageClient";

export const metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="heading-glow font-serif text-2xl text-amber-100">
        Reading journal
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Saved on this device only (localStorage).
      </p>
      <div className="mt-8">
        <JournalPageClient />
      </div>
    </div>
  );
}

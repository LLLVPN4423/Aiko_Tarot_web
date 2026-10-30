import Link from "next/link";
import { notFound } from "next/navigation";
import { allTarotCards, cardBySlug } from "@/data/deck-index";
import { CardDetailView } from "@/components/CardDetailView";

export function generateStaticParams() {
  return allTarotCards.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const card = cardBySlug(slug);
  if (!card) return { title: "Card" };
  return { title: card.name.en };
}

export default async function CardPage({ params }: Props) {
  const { slug } = await params;
  const card = cardBySlug(slug);
  if (!card) notFound();

  return (
    <div className="px-4 py-10">
      <CardDetailView card={card} />
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm">
        <Link href="/library" className="text-[var(--color-antique-gold)] underline">
          ← Library
        </Link>
        {" · "}
        <Link href="/reading" className="text-[var(--color-antique-gold)] underline">
          Reading
        </Link>
      </p>
    </div>
  );
}

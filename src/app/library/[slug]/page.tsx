import Link from "next/link";
import { notFound } from "next/navigation";
import { majorArcana } from "@/data/major-arcana";
import { CardDetailView } from "@/components/CardDetailView";

export function generateStaticParams() {
  return majorArcana.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const card = majorArcana.find((c) => c.slug === slug);
  if (!card) return { title: "Card" };
  return { title: card.name.en };
}

export default async function CardPage({ params }: Props) {
  const { slug } = await params;
  const card = majorArcana.find((c) => c.slug === slug);
  if (!card) notFound();

  return (
    <div className="px-4 py-10">
      <CardDetailView card={card} />
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm">
        <Link href="/library" className="text-cyan-400 underline">
          ← Library
        </Link>
        {" · "}
        <Link href="/" className="text-cyan-400 underline">
          Reading
        </Link>
      </p>
    </div>
  );
}

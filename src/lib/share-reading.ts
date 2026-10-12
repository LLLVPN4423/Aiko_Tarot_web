import type { SpreadId, TopicId } from "@/lib/tarot";

export type SharePayload = {
  spread: SpreadId;
  topic: TopicId;
  cards: { id: number; reversed: boolean }[];
};

export function encodeReadingToHash(payload: SharePayload): string {
  const compact = `${payload.spread}|${payload.topic}|${payload.cards
    .map((c) => `${c.id}${c.reversed ? "r" : "u"}`)
    .join(",")}`;
  return `#r=${encodeURIComponent(compact)}`;
}

export function decodeReadingFromHash(hash: string): SharePayload | null {
  if (!hash.startsWith("#r=")) return null;
  try {
    const compact = decodeURIComponent(hash.slice(3));
    const [spread, topic, cardsStr] = compact.split("|");
    if (!spread || !topic || !cardsStr) return null;
    const cards = cardsStr.split(",").map((token) => {
      const reversed = token.endsWith("r");
      const id = Number.parseInt(token.replace(/[ur]$/, ""), 10);
      return { id, reversed };
    });
    return {
      spread: spread as SharePayload["spread"],
      topic: topic as SharePayload["topic"],
      cards,
    };
  } catch {
    return null;
  }
}

export async function shareReadingText(text: string, url: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ text, url });
      return true;
    } catch {
      return false;
    }
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    return true;
  }
  return false;
}

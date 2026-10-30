"use client";

import type { SpreadId } from "@/lib/tarot";

const layouts: Record<
  SpreadId,
  { cols: number; cells: { col: number; row: number; label?: string }[] }
> = {
  single: {
    cols: 1,
    cells: [{ col: 1, row: 1 }],
  },
  three: {
    cols: 3,
    cells: [
      { col: 1, row: 1 },
      { col: 2, row: 1 },
      { col: 3, row: 1 },
    ],
  },
  cross: {
    cols: 3,
    cells: [
      { col: 2, row: 1 },
      { col: 1, row: 2 },
      { col: 2, row: 2 },
      { col: 3, row: 2 },
      { col: 2, row: 3 },
    ],
  },
  five: {
    cols: 3,
    cells: [
      { col: 2, row: 1 },
      { col: 1, row: 2 },
      { col: 2, row: 2 },
      { col: 3, row: 2 },
      { col: 2, row: 3 },
    ],
  },
  celtic: {
    cols: 5,
    cells: [
      { col: 3, row: 2 },
      { col: 4, row: 2 },
      { col: 3, row: 1 },
      { col: 3, row: 3 },
      { col: 2, row: 2 },
      { col: 3, row: 4 },
      { col: 1, row: 4 },
      { col: 5, row: 4 },
      { col: 3, row: 5 },
      { col: 3, row: 6 },
    ],
  },
};

type Props = {
  spread: SpreadId;
  active?: boolean;
};

export function SpreadPreview({ spread, active }: Props) {
  const layout = layouts[spread];
  const rows = Math.max(...layout.cells.map((c) => c.row));

  return (
    <div
      className={`mt-3 grid aspect-[4/3] w-full max-w-[140px] gap-1 rounded-lg border p-2 ${
        active
          ? "border-[var(--color-antique-gold)]/60 bg-[rgba(198,161,91,0.08)]"
          : "border-white/10 bg-black/20"
      }`}
      style={{
        gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
      aria-hidden
    >
      {layout.cells.map((cell, i) => (
        <div
          key={`${cell.col}-${cell.row}-${i}`}
          className="rounded-sm border border-[var(--color-antique-gold)]/35 bg-[var(--color-deep-cosmic)]"
          style={{ gridColumn: cell.col, gridRow: cell.row }}
        />
      ))}
    </div>
  );
}

"use client";

export function TarotCardBack({ compact }: { compact?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-cyan-400/40 bg-linear-to-br from-[#121a2e] via-[#1a1035] to-[#0b0f19] shadow-[inset_0_0_30px_rgba(56,189,248,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(167,139,250,0.25),transparent_55%)]" />
      <svg
        className="absolute inset-0 h-full w-full p-3 opacity-90"
        viewBox="0 0 200 280"
        aria-hidden
      >
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="130"
          r="72"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="1.2"
          opacity="0.85"
        />
        <circle
          cx="100"
          cy="130"
          r="58"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.7"
        />
        <circle
          cx="100"
          cy="130"
          r="44"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="0.6"
          opacity="0.5"
        />
        {[
          [100, 58],
          [142, 75],
          [158, 130],
          [142, 185],
          [100, 202],
          [58, 185],
          [42, 130],
          [58, 75],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5" fill="#fbbf24" opacity="0.85" />
            <line
              x1="100"
              y1="130"
              x2={cx}
              y2={cy}
              stroke="#22d3ee"
              strokeWidth="0.4"
              opacity="0.35"
            />
          </g>
        ))}
        <path
          d="M100 95 L108 118 L132 118 L112 132 L120 155 L100 141 L80 155 L88 132 L68 118 L92 118 Z"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1"
          opacity="0.75"
        />
        <text
          x="100"
          y="248"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize={compact ? "8" : "10"}
          fontFamily="serif"
          letterSpacing="3"
        >
          MAJOR ARCANA
        </text>
      </svg>
      <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.15)]" />
    </div>
  );
}

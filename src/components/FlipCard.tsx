"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useAudio } from "@/lib/audio";

type Props = {
  flipped: boolean;
  front: ReactNode;
  back: ReactNode;
  onClick?: () => void;
  onHover?: () => void;
  className?: string;
  levitate?: boolean;
  glow?: "cyan" | "gold" | "none";
};

export function FlipCard({
  flipped,
  front,
  back,
  onClick,
  onHover,
  className = "",
  levitate = true,
  glow = "cyan",
}: Props) {
  const { playHover } = useAudio();

  const glowClass =
    glow === "gold"
      ? "hover:shadow-[0_0_35px_rgba(251,191,36,0.65),0_0_80px_rgba(251,191,36,0.25)]"
      : glow === "cyan"
        ? "hover:shadow-[0_0_35px_rgba(34,211,238,0.7),0_0_70px_rgba(167,139,250,0.35)]"
        : "";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => {
        playHover();
        onHover?.();
      }}
      className={`group relative [perspective:1200px] transition-shadow duration-300 ${levitate ? "hover:-translate-y-2.5" : ""} ${glowClass} ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateY: flipped ? 180 : 0,
          scale: flipped ? [1, 1.06, 1] : 1,
        }}
        transition={{
          rotateY: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.45, times: [0, 0.45, 1] },
        }}
      >
        <div
          className="absolute inset-0 h-full w-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          {back}
        </div>
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {front}
        </div>
      </motion.div>
    </motion.button>
  );
}

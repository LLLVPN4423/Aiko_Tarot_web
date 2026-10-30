"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useAudio } from "@/lib/audio";
import { useSettings } from "@/lib/settings";

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
  const { reduceMotion } = useSettings();

  const glowClass =
    glow === "gold"
      ? "hover:shadow-[0_0_28px_rgba(198,161,91,0.45)]"
      : glow === "cyan"
        ? "hover:shadow-[0_0_28px_rgba(166,155,190,0.35)]"
        : "";

  const motionEnabled = !reduceMotion;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => {
        playHover();
        onHover?.();
      }}
      className={`group relative [perspective:1200px] transition-shadow duration-300 ${levitate && motionEnabled ? "hover:-translate-y-2" : ""} ${glowClass} ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      whileTap={motionEnabled ? { scale: 0.98 } : undefined}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          motionEnabled
            ? {
                rotateY: flipped ? 180 : 0,
                scale: flipped ? [1, 1.04, 1] : 1,
              }
            : { rotateY: flipped ? 180 : 0 }
        }
        transition={
          motionEnabled
            ? {
                rotateY: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.45, times: [0, 0.45, 1] },
              }
            : { duration: 0 }
        }
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

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className = "" }: Props) {
  return (
    <div
      className={`glass-panel rounded-2xl border border-cyan-400/20 bg-[#0d1220]/55 p-5 shadow-[0_0_40px_rgba(56,189,248,0.08)] backdrop-blur-xl sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

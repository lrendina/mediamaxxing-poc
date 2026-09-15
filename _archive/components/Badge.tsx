import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "payout" | "live" | "ink";

/* Hard-edged, uppercase, loud. */
const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-sunk text-ink",
  payout:  "bg-lime text-surface-dark",
  live:    "bg-status text-ink-inverse",
  ink:     "bg-ink text-ink-inverse",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-[6px] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.06em] leading-none ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

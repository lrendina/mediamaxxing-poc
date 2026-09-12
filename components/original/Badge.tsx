import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "payout" | "live";

/* Soft tile + role colour, same pairing the creator app's pills use. */
const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-sunk text-ink",
  payout:  "bg-money-sunk text-money",
  live:    "bg-status-sunk text-status",
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
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-medium leading-none tracking-[0.01em] ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

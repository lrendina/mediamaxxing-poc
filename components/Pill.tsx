import type { ReactNode } from "react";

export type PillTone = "neutral" | "action" | "money" | "streak" | "warn";

/* The pill: a role colour on its sunk companion, the same pairing the
   creator app's pills use. Full-round is a shape, not a second radius. */
const toneClasses: Record<PillTone, string> = {
  neutral: "bg-surface-sunk text-ink",
  action: "bg-action-sunk text-action",
  money: "bg-money-sunk text-money",
  streak: "bg-streak-sunk text-streak",
  warn: "bg-warn-sunk text-warn",
};

export type PillProps = {
  tone?: PillTone;
  className?: string;
  children: ReactNode;
};

/* gap-1 (4px) is the one place a half-step is allowed: the optical space
   between an icon and its label inside a pill. Nothing truncates — a pill
   wraps rather than clipping a figure. */
export function Pill({ tone = "neutral", className = "", children }: PillProps) {
  return (
    <span
      className={`inline-flex min-w-0 max-w-full items-center justify-center gap-1 rounded-full px-4 py-2 min-h-8 text-center text-small font-medium leading-tight tabular-nums ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

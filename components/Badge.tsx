import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "action" | "money" | "streak" | "warn";

/* The pill: role colour on its sunk companion, the same pairing the
   creator app's pills use. Full-round is a shape, not a second radius. */
const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-sunk text-ink",
  action:  "bg-action-sunk text-action",
  money:   "bg-money-sunk text-money",
  streak:  "bg-streak-sunk text-streak",
  warn:    "bg-warn-sunk text-warn",
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
      className={`inline-flex min-h-8 items-center gap-1 rounded-full px-4 text-small font-medium leading-none ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

import type { ReactNode } from "react";

/* Soft rounded square behind an icon — the app's recurring icon
   treatment (mission cards, feature list, locked states). Each role has a
   -sunk companion for exactly this. */
export type TileTone = "action" | "money" | "streak" | "warn" | "neutral";

const toneClass: Record<TileTone, string> = {
  action: "bg-action-sunk text-action",
  money: "bg-money-sunk text-money",
  streak: "bg-streak-sunk text-streak",
  warn: "bg-warn-sunk text-warn",
  neutral: "bg-surface-sunk text-ink",
};

const sizeClass = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
} as const;

export function IconTile({
  tone = "neutral",
  size = "md",
  children,
  className = "",
}: {
  tone?: TileTone;
  size?: keyof typeof sizeClass;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-[8px] ${toneClass[tone]} ${sizeClass[size]} ${className}`}
    >
      {children}
    </span>
  );
}

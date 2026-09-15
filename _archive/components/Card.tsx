import type { ElementType, ReactNode } from "react";

export type CardVariant = "default" | "panel" | "spotlight" | "dark" | "lime";

const variantClasses: Record<CardVariant, string> = {
  default:
    "rounded-[var(--radius-card)] bg-surface border border-border",
  panel:
    "rounded-[var(--radius-card)] bg-surface-sunk",
  spotlight:
    "rounded-[var(--radius-card)] bg-surface border-2 border-ink shadow-[6px_6px_0_var(--ink)]",
  dark:
    "rounded-[var(--radius-card)] bg-surface-dark text-ink-inverse",
  lime:
    "rounded-[var(--radius-card)] bg-lime text-surface-dark",
};

const padClasses = {
  none: "",
  sm:   "p-4",
  md:   "p-5",
  lg:   "p-6 md:p-8",
} as const;

export type CardPad = keyof typeof padClasses;

export function Card({
  variant = "default",
  pad = "md",
  as: Tag = "div",
  className = "",
  children,
}: {
  variant?: CardVariant;
  pad?: CardPad;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`${variantClasses[variant]} ${padClasses[pad]} ${className}`}>
      {children}
    </Tag>
  );
}

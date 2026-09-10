import type { ElementType, ReactNode } from "react";

export type CardVariant = "default" | "panel" | "spotlight";

/* Variants exist so hierarchy is visible in the feed. Never render every
   card with the same radius and shadow — that flattens the whole page. */
const variantClasses: Record<CardVariant, string> = {
  default:
    "rounded-2xl bg-canvas border border-ink/10",
  panel:
    "rounded-2xl bg-panel",
  spotlight:
    "rounded-3xl bg-canvas border border-ink/15 shadow-[0_2px_0_rgba(14,26,18,0.06)]",
};

const padClasses = {
  none: "",
  sm:   "p-4",
  md:   "p-5",
  lg:   "p-6",
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

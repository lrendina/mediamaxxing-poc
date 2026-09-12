import type { ElementType, ReactNode } from "react";

export type CardVariant = "default" | "panel" | "spotlight" | "dark";

/* Hierarchy through surface and border, not shadow. Only `spotlight`
   floats, and only slightly — it is for the one object per section that
   should read as the point. `dark` is the green-black object that anchors
   a section (CTA band, featured campaign). */
const variantClasses: Record<CardVariant, string> = {
  default:
    "rounded-[var(--radius-card)] bg-surface border border-border",
  panel:
    "rounded-[var(--radius-card)] bg-surface-sunk/70",
  spotlight:
    "rounded-[var(--radius-card)] bg-surface border border-border shadow-lift",
  dark:
    "rounded-[var(--radius-card)] bg-surface-dark text-ink-inverse",
};

const padClasses = {
  none: "",
  sm:   "p-4",
  md:   "p-5",
  lg:   "p-6 md:p-7",
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

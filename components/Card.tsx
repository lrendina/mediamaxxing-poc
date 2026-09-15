import type { ElementType, ReactNode } from "react";

export type CardVariant = "default" | "panel" | "spotlight" | "dark";

/* Hierarchy through surface and border. `panel` is a sunk surface for inset
   content, `spotlight` is the one object per section that should read as the
   point, and `dark` is the near-black object that anchors a section (CTA
   band, featured campaign). */
const variantClasses: Record<CardVariant, string> = {
  default: "bg-surface border border-border",
  panel: "bg-surface-sunk/70",
  spotlight: "bg-surface border border-border",
  dark: "bg-surface-dark text-ink-inverse",
};

/* Card padding: 24 mobile / 32 desktop, plus a 16 tile size. No half-steps
   — the old p-5 / p-7 values are gone. */
const padClasses = {
  none: "",
  sm: "p-4",
  md: "p-6 md:p-8",
  lg: "p-6 md:p-8",
} as const;

export type CardPad = keyof typeof padClasses;

const base =
  "rounded min-w-0 shadow-1 " +
  "transition-none motion-safe:transition-[box-shadow,transform] motion-safe:duration-150 motion-safe:ease-out " +
  "motion-reduce:transition-none";

const hoverClasses = "hover:shadow-2 motion-safe:hover:-translate-y-0.5";

export type CardProps = {
  variant?: CardVariant;
  pad?: CardPad;
  /* Opt-in: shadow-1 to shadow-2 and a 2px rise on hover. Only testimonial
     cards, feature cards and badge tiles take it (LANDING-PAGE.md, "Motion":
     nothing else lifts). */
  hover?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Card({
  variant = "default",
  pad = "md",
  hover = false,
  as: Tag = "div",
  className = "",
  children,
}: CardProps) {
  const hoverClass = hover ? hoverClasses : "";

  return (
    <Tag
      className={`${base} ${variantClasses[variant]} ${padClasses[pad]} ${hoverClass} ${className}`}
    >
      {children}
    </Tag>
  );
}

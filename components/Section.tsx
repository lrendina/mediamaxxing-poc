import type { HTMLAttributes, ReactNode } from "react";
import { Container, type ContainerWidth } from "./Container";

export type SectionTone = "canvas" | "surface" | "dark";

const toneClasses: Record<SectionTone, string> = {
  canvas: "",
  surface: "bg-surface",
  dark: "bg-surface-dark text-ink-inverse",
};

/* Every page section: a full-bleed background, 96px desktop / 64px mobile
   vertical padding, and a centered 1120 or 720 column. Padding and widths
   come from tokens, so a section can't drift off them. `hidesStickyHeader`
   marks the hero and the final CTA (see lib/sticky-header.ts). */
export function Section({
  width = "content",
  tone = "canvas",
  hidesStickyHeader = false,
  className = "",
  children,
  ...rest
}: {
  width?: ContainerWidth;
  tone?: SectionTone;
  hidesStickyHeader?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">) {
  return (
    <section
      {...rest}
      data-hides-sticky-header={hidesStickyHeader ? "" : undefined}
      className={`py-[var(--section-pad)] ${toneClasses[tone]}`}
    >
      <Container width={width} className={className}>
        {children}
      </Container>
    </section>
  );
}

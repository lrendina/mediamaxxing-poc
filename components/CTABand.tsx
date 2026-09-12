import type { ReactNode } from "react";
import { Button } from "./Button";

/* Full-bleed lime. The headline runs edge to edge at viewport scale. */
export function CTABand({
  eyebrow,
  headline,
  ctaLabel,
  ctaHref,
  children,
}: {
  eyebrow?: string;
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-lime text-surface-dark">
      <div className="mx-auto max-w-[var(--content-max)] px-4 md:px-8 py-16 md:py-24 flex flex-col gap-8">
        {eyebrow ? (
          <p className="text-[13px] uppercase tracking-[0.12em] font-bold">{eyebrow}</p>
        ) : null}
        <h2 className="font-display text-[clamp(48px,9vw,140px)]">
          {headline}
        </h2>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {children ? (
            <p className="text-[18px] md:text-[20px] font-medium max-w-[36ch] leading-[1.35]">{children}</p>
          ) : <span />}
          <Button href={ctaHref} variant="primary" size="xl">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

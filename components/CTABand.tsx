import type { ReactNode } from "react";
import { Button } from "./Button";

/* The dark object that closes a page. Money-green CTA on green-black —
   the one place the two greens meet on purpose. */
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
    <section
      className="
        relative overflow-hidden rounded
        bg-surface-dark text-ink-inverse p-7 md:p-10 flex flex-col gap-4
      "
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-money/25 blur-3xl"
      />
      {eyebrow ? (
        <p className="text-[13px] text-ink-inverse/60">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-[44px] md:text-[56px] leading-[1.0] max-w-[16ch]">
        {headline}
      </h2>
      {children ? (
        <p className="text-[16px] text-ink-inverse/75 max-w-[48ch]">{children}</p>
      ) : null}
      <div className="mt-3">
        <Button href={ctaHref} variant="secondary" size="lg">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { Button } from "./Button";

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
    <section className="rounded-3xl bg-ink text-canvas p-8 flex flex-col gap-4">
      {eyebrow ? (
        <p className="text-[13px] text-canvas/70">{eyebrow}</p>
      ) : null}
      <h2 className="text-[40px] leading-[1.05] font-medium max-w-[18ch]">
        {headline}
      </h2>
      {children ? (
        <p className="text-[15px] text-canvas/80 max-w-[52ch]">{children}</p>
      ) : null}
      <div className="mt-2">
        <Button href={ctaHref} variant="primary">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}

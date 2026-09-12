import type { Metadata } from "next";

import {
  BRANDS_HERO,
  BRANDS_STEPS,
  BRANDS_STEPS_HEADLINE_VERBATIM,
  BRANDS_FEATURES,
  BRANDS_FEATURES_HEADING,
  BRANDS_COUNTERS,
  BRANDS_FOOTER_CTA,
} from "@/content/for-brands";

import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { CTABand } from "@/components/CTABand";
import { SiteFooter } from "@/components/SiteFooter";
import { StepCard } from "@/components/StepCard";

export const metadata: Metadata = {
  title: "For brands — MediaMaxxing",
  description: BRANDS_HERO.subhead,
};

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[var(--content-max)] px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

/* Same sections as the live page, same order. Brands get the black hero;
   creators get the lime one. */
export default function ForBrands() {
  return (
    <div id="top" className="w-full">
      <section aria-labelledby="hero-heading" className="bg-surface-dark text-ink-inverse">
        <Container className="pt-16 md:pt-24 pb-12 md:pb-16 flex flex-col gap-10">
          <h1 id="hero-heading" className="font-display text-[clamp(56px,11vw,160px)] max-w-[10ch]">
            {BRANDS_HERO.headlineVerbatim}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-8">
            <p className="text-[20px] md:text-[24px] font-medium leading-[1.3] max-w-[30ch] text-ink-inverse/80">
              {BRANDS_HERO.subhead}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={BRANDS_HERO.primaryCta.href} variant="lime" size="xl">
                {BRANDS_HERO.primaryCta.label}
              </Button>
              <Button href={BRANDS_HERO.secondaryCta.href} variant="ghost" size="xl" className="!border-ink-inverse/40 !text-ink-inverse hover:!border-ink-inverse">
                {BRANDS_HERO.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section id="how-it-works" aria-labelledby="how-heading" className="bg-surface-dark text-ink-inverse border-t border-ink-inverse/15 scroll-mt-16">
        <Container className="py-16 md:py-24 flex flex-col gap-12">
          <h2 id="how-heading" className="font-display text-[clamp(40px,7vw,96px)] max-w-[12ch]">
            {BRANDS_STEPS_HEADLINE_VERBATIM}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-6">
            {BRANDS_STEPS.map((step, i) => (
              <StepCard key={step.title} title={step.title} index={i}>
                {step.description}
              </StepCard>
            ))}
          </div>
        </Container>
      </section>

      <section id="features" aria-labelledby="features-heading" className="bg-canvas scroll-mt-16">
        <Container className="py-16 md:py-24 flex flex-col gap-10">
          <h2 id="features-heading" className="font-display text-[clamp(40px,7vw,96px)] max-w-[12ch]">
            {BRANDS_FEATURES_HEADING}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRANDS_FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`flex flex-col gap-3 rounded-[var(--radius-card)] p-7 md:p-9 border-2 border-ink ${
                  i === 0 ? "bg-lime text-surface-dark" : "bg-surface"
                }`}
              >
                <h3 className="font-display-sm text-[28px] md:text-[34px]">{f.title}</h3>
                <p className={`text-[16px] leading-[1.5] max-w-[44ch] ${i === 0 ? "text-surface-dark/75" : "text-muted"}`}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="counters" aria-label="Brand results" className="bg-canvas border-t-2 border-ink">
        <Container className="py-8 md:py-12 flex flex-col divide-y-2 divide-ink">
          {BRANDS_COUNTERS.map((c) => (
            <div
              key={c.label}
              className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-8 py-6 md:py-8 min-w-0"
            >
              <p className="text-[13px] uppercase tracking-[0.12em] font-bold text-muted shrink-0">{c.label}</p>
              <Counter
                value={c.value}
                prefix={c.prefix}
                suffix={c.suffix}
                className="font-display text-[clamp(56px,9vw,144px)] whitespace-nowrap"
              />
            </div>
          ))}
        </Container>
      </section>

      <div id="waitlist" className="scroll-mt-16">
        <CTABand
          eyebrow={BRANDS_FOOTER_CTA.eyebrowVerbatim}
          headline={BRANDS_FOOTER_CTA.headlineVerbatim}
          ctaLabel={BRANDS_FOOTER_CTA.ctaLabel}
          ctaHref={BRANDS_FOOTER_CTA.ctaHref}
        >
          {BRANDS_FOOTER_CTA.body}
        </CTABand>
      </div>
      <SiteFooter />
    </div>
  );
}

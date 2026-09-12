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
import { Card } from "@/components/Card";
import { Counter } from "@/components/Counter";
import { CTABand } from "@/components/CTABand";
import { PageIntro } from "@/components/PageIntro";
import { SiteFooter } from "@/components/SiteFooter";
import { StepCard } from "@/components/StepCard";
import {
  BrandsIcon,
  AgenciesIcon,
  BlogIcon,
  HomeIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "For brands — MediaMaxxing",
  description: BRANDS_HERO.subhead,
};

const STEP_ICONS = [BrandsIcon, AgenciesIcon, BlogIcon, HomeIcon];

export default function ForBrands() {
  return (
    <div id="top" className="mx-auto w-full max-w-[640px] md:max-w-[880px]">
      <div className="flex flex-col gap-10 px-4 md:px-6 pt-6 pb-16">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-heading"
          className="scroll-mt-24 flex flex-col gap-5"
        >
          <PageIntro>
            <h1
              id="hero-heading"
              className="font-display text-[48px] sm:text-[64px] leading-[0.98] max-w-[14ch]"
            >
              {BRANDS_HERO.headlineVerbatim}
            </h1>
            <p className="text-[17px] sm:text-[18px] text-muted max-w-[46ch] mt-5 leading-[1.5]">
              {BRANDS_HERO.subhead}
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Button href={BRANDS_HERO.primaryCta.href} variant="primary" size="lg">
                {BRANDS_HERO.primaryCta.label}
              </Button>
              <Button href={BRANDS_HERO.secondaryCta.href} variant="ghost" size="lg">
                {BRANDS_HERO.secondaryCta.label}
              </Button>
            </div>
          </PageIntro>
        </section>

        {/* ── How it works ─────────────────────────────────────────── */}
        <section
          id="how-it-works"
          aria-labelledby="how-heading"
          className="scroll-mt-24 flex flex-col gap-4"
        >
          <h2
            id="how-heading"
            className="font-display text-[32px] md:text-[36px] leading-[1.05] max-w-[30ch]"
          >
            {BRANDS_STEPS_HEADLINE_VERBATIM}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {BRANDS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? HomeIcon;
              return (
                <StepCard
                  key={step.title}
                  icon={<Icon width={20} height={20} />}
                  title={step.title}
                >
                  {step.description}
                </StepCard>
              );
            })}
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────── */}
        <section
          id="features"
          aria-labelledby="features-heading"
          className="scroll-mt-24 flex flex-col gap-4"
        >
          <h2
            id="features-heading"
            className="font-display text-[32px] md:text-[36px] leading-[1.05]"
          >
            {BRANDS_FEATURES_HEADING}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {BRANDS_FEATURES.map((f) => (
              <Card
                key={f.title}
                variant="default"
                pad="lg"
                className="flex flex-col gap-2"
              >
                <h3 className="text-[19px] font-medium leading-tight tracking-[-0.01em]">
                  {f.title}
                </h3>
                <p className="text-[15px] text-muted leading-[1.55]">{f.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Counters ─────────────────────────────────────────────── */}
        <section
          id="counters"
          aria-label="Brand results"
          className="scroll-mt-24"
        >
          <Card variant="default" pad="none" className="grid grid-cols-2 divide-x divide-border">
            {BRANDS_COUNTERS.map((c, i) => (
              <div
                key={c.label}
                className="flex flex-col gap-1.5 min-w-0 px-5 sm:px-7 py-6"
              >
                <Counter
                  value={c.value}
                  prefix={c.prefix}
                  suffix={c.suffix}
                  className={`text-[32px] sm:text-[44px] leading-none font-expanded truncate ${
                    i === 0 ? "text-money" : "text-ink"
                  }`}
                />
                <p className="text-[13px] text-muted truncate">{c.label}</p>
              </div>
            ))}
          </Card>
        </section>

        {/* ── Footer CTA ───────────────────────────────────────────── */}
        <section id="waitlist" className="scroll-mt-24">
          <CTABand
            eyebrow={BRANDS_FOOTER_CTA.eyebrowVerbatim}
            headline={BRANDS_FOOTER_CTA.headlineVerbatim}
            ctaLabel={BRANDS_FOOTER_CTA.ctaLabel}
            ctaHref={BRANDS_FOOTER_CTA.ctaHref}
          >
            {BRANDS_FOOTER_CTA.body}
          </CTABand>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}

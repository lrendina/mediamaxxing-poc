import { Accordion } from "@/components/Accordion";
import { BadgeTile } from "@/components/BadgeTile";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FeatureCard } from "@/components/FeatureCard";
import { LandingIcon } from "@/components/LandingIcon";
import { LeaderboardRow } from "@/components/LeaderboardRow";
import { LogoRow } from "@/components/LogoRow";
import { Section } from "@/components/Section";
import { StepCard } from "@/components/StepCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { SUBSTANTIATION_LINE } from "@/content/claims";
import { TESTIMONIALS } from "@/content/creators";
import { CTA } from "@/content/cta";
import { FAQ } from "@/content/faq";
import { FEATURES } from "@/content/features";
import { FINAL_CTA } from "@/content/final-cta";
import { HERO } from "@/content/hero";
import { LEADERBOARD } from "@/content/leaderboard";
import { STEPS } from "@/content/steps";
import { TRUST } from "@/content/trust";

/* The conversion page, in LANDING-PAGE.md order: hero, solution, proof,
   trust, FAQ, final CTA, with the one CTA at every seam. Every string comes
   from content/. Motion is the hero entrance (.hero-rise in globals.css) and
   the card hover lift; nothing reveals on scroll. */

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="mx-auto max-w-[var(--text-max)] text-balance text-center text-h2">
      {children}
    </h2>
  );
}

function SectionCta() {
  return (
    <div className="flex justify-center">
      <Button href={CTA.href} size="md">
        {CTA.label}
      </Button>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* 1. Hero — text-led, no product visual. */}
      <Section
        id="hero"
        aria-labelledby="hero-heading"
        hidesStickyHeader
        className="flex flex-col items-center gap-16 text-center"
      >
        <div className="flex max-w-[var(--text-max)] flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <h1 id="hero-heading" className="hero-rise text-balance text-h1">
              {HERO.headline}
            </h1>
            <p className="hero-rise text-body text-muted [--hero-step:1]">{HERO.subheadline}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="hero-rise [--hero-step:2]">
              <Button href={CTA.href} size="md">
                {CTA.label}
              </Button>
            </div>
            <ul className="hero-rise flex flex-col items-center gap-2 text-small text-muted sm:flex-row sm:gap-0 sm:divide-x sm:divide-border [--hero-step:3]">
              {HERO.frictionStrip.map((item) => (
                <li key={item} className="sm:px-4 sm:first:pl-0 sm:last:pr-0">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-small text-muted">{SUBSTANTIATION_LINE}</p>
          </div>
        </div>
        <LogoRow logos={HERO.trustBrands} className="justify-center" />
      </Section>

      {/* 2a. Three steps. */}
      <Section id="how-it-works" aria-labelledby="how-it-works-heading" className="flex flex-col gap-12">
        <SectionHeading id="how-it-works-heading">{STEPS.heading}</SectionHeading>
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.steps.map((step, index) => (
            <li key={step.title} className="min-w-0">
              <StepCard title={`${index + 1}. ${step.title}`} className="h-full">
                {step.body}
              </StepCard>
            </li>
          ))}
        </ol>
      </Section>

      {/* 2b. Feature → benefit grid, CTA #2. */}
      <Section id="features" aria-labelledby="features-heading" className="flex flex-col gap-12">
        <SectionHeading id="features-heading">{FEATURES.heading}</SectionHeading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FEATURES.features.map((item) => (
            <FeatureCard key={item.benefit} icon={<LandingIcon name={item.icon} />} title={item.benefit}>
              {item.feature}
            </FeatureCard>
          ))}
        </div>
        <SectionCta />
      </Section>

      {/* 3. Social proof: leaderboard, testimonials, CTA #3. */}
      <Section id="proof" aria-labelledby="proof-heading" className="flex flex-col gap-12">
        <SectionHeading id="proof-heading">{LEADERBOARD.heading}</SectionHeading>
        <div className="mx-auto flex w-full max-w-[var(--text-max)] flex-col gap-4">
          <Card pad="none" className="px-6 md:px-8">
            <ol className="divide-y divide-border">
              {LEADERBOARD.entries.map((entry) => (
                <LeaderboardRow key={entry.position} entry={entry} />
              ))}
            </ol>
          </Card>
          <p className="text-center text-small text-muted">{LEADERBOARD.note}</p>
        </div>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li key={testimonial.id} className="min-w-0">
              <TestimonialCard data={testimonial} />
            </li>
          ))}
        </ul>
        <SectionCta />
      </Section>

      {/* 4. Guarantee and trust. */}
      <Section id="trust" aria-labelledby="trust-heading" className="flex flex-col gap-12">
        <SectionHeading id="trust-heading">{TRUST.heading}</SectionHeading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TRUST.tiles.map((tile) => (
            <BadgeTile key={tile.title} icon={<LandingIcon name={tile.icon} />} title={tile.title}>
              {tile.body}
            </BadgeTile>
          ))}
        </div>
      </Section>

      {/* 5. FAQ — sourced answers only, first item open. */}
      <Section id="faq" width="text" aria-labelledby="faq-heading" className="flex flex-col gap-12">
        <SectionHeading id="faq-heading">{FAQ.heading}</SectionHeading>
        <Accordion items={FAQ.items} defaultOpenIndex={0} />
      </Section>

      {/* 6. Final CTA — dark, full-bleed, the page's one large button. */}
      <Section
        id="get-started"
        tone="dark"
        aria-labelledby="final-cta-heading"
        hidesStickyHeader
        className="flex flex-col items-center gap-8 py-8 text-center md:py-16"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 id="final-cta-heading" className="max-w-[var(--text-max)] text-balance text-h2">
            {FINAL_CTA.headline}
          </h2>
          <p className="text-body text-ink-inverse/80">{FINAL_CTA.body}</p>
        </div>
        <Button href={CTA.href} size="lg">
          {CTA.label}
        </Button>
        <p className="max-w-[var(--text-max)] text-small text-ink-inverse/70">{SUBSTANTIATION_LINE}</p>
      </Section>
    </>
  );
}

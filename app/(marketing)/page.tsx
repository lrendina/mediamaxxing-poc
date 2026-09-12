import { CREATORS } from "@/content/creators";
import { STEPS, STEPS_HEADLINE_VERBATIM } from "@/content/steps";
import { FAQ, FAQ_HEADING } from "@/content/faq";
import { BLOG_POSTS, BLOG_HEADING } from "@/content/blog";
import { HERO, PROOF_HEADLINE_VERBATIM, FOOTER_CTA } from "@/content/hero";
import { HERO_COUNTERS, COUNTERS_A11Y_LABEL } from "@/content/counters";

import { Accordion } from "@/components/Accordion";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { CTABand } from "@/components/CTABand";
import { Marquee } from "@/components/Marquee";
import { ProofCard } from "@/components/ProofCard";
import { SiteFooter } from "@/components/SiteFooter";
import { StepCard } from "@/components/StepCard";

/* Section order is the product: hero → proof → how it works → counters →
   FAQ → blog → CTA. Every section is full-bleed and owns its colour. */

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[var(--content-max)] px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

function Ticker() {
  return (
    <Marquee duration={45} className="border-y-2 border-surface-dark bg-surface-dark text-ink-inverse py-3">
      {CREATORS.map((c) => (
        <span key={c.id} className="inline-flex items-center gap-3 px-6 text-[15px] font-medium whitespace-nowrap">
          <span className="text-ink-inverse/60">@{c.handle}</span>
          <span className="font-expanded text-lime text-[18px]">{c.earnings}</span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lime ml-3" />
        </span>
      ))}
    </Marquee>
  );
}

export default function Home() {
  return (
    <div id="top" className="w-full">
      {/* ── Hero — lime ─────────────────────────────────────────────── */}
      <section aria-labelledby="hero-heading" className="bg-lime text-surface-dark">
        <Container className="pt-16 md:pt-24 pb-12 md:pb-16 flex flex-col gap-10">
          <h1
            id="hero-heading"
            className="font-display text-[clamp(56px,11.5vw,168px)] max-w-[10ch]"
          >
            {HERO.headlineVerbatim}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-8">
            <p className="text-[20px] md:text-[24px] font-medium leading-[1.3] max-w-[30ch]">
              {HERO.subhead}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={HERO.primaryCta.href} variant="primary" size="xl">
                {HERO.primaryCta.label}
              </Button>
              <Button href={HERO.secondaryCta.href} variant="ghost" size="xl" className="!border-surface-dark">
                {HERO.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Ticker />

      {/* ── Proof — paper ───────────────────────────────────────────── */}
      <section id="proof" aria-labelledby="proof-heading" className="bg-canvas scroll-mt-16">
        <Container className="py-16 md:py-24 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 id="proof-heading" className="font-display text-[clamp(40px,7vw,96px)] max-w-[12ch]">
              {PROOF_HEADLINE_VERBATIM}
            </h2>
            <p className="text-[16px] text-muted max-w-[32ch] md:text-right">
              Real dashboards, real phones, real handles. Click any card to see the whole screenshot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {CREATORS.map((c, i) => (
              <div key={c.id} id={`creator-${c.id}`} className="scroll-mt-20">
                <ProofCard data={c} priority={i === 0} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How it works — black ────────────────────────────────────── */}
      <section id="how-it-works" aria-labelledby="how-heading" className="bg-surface-dark text-ink-inverse scroll-mt-16">
        <Container className="py-16 md:py-24 flex flex-col gap-12">
          <h2 id="how-heading" className="font-display text-[clamp(40px,7vw,96px)] max-w-[12ch]">
            {STEPS_HEADLINE_VERBATIM}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {STEPS.map((step, i) => (
              <StepCard key={step.title} title={step.title} index={i}>
                {step.description}
              </StepCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Counters — black, numbers at viewport scale ────────────── */}
      <section id="counters" aria-label={COUNTERS_A11Y_LABEL} className="bg-surface-dark text-ink-inverse border-t border-ink-inverse/15">
        {/* Full-width rows, label left, number right. Rows instead of
            columns so the numbers can run at viewport scale without
            being clipped by a third of the container. */}
        <Container className="py-8 md:py-12 flex flex-col divide-y divide-ink-inverse/15">
          {HERO_COUNTERS.map((c, i) => (
            <div
              key={c.label}
              className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-8 py-6 md:py-8 min-w-0"
            >
              <p className="text-[13px] uppercase tracking-[0.12em] font-bold text-ink-inverse/55 shrink-0">
                {c.label}
              </p>
              <Counter
                value={c.value}
                prefix={c.prefix}
                suffix={c.suffix}
                className={`font-display text-[clamp(56px,9vw,144px)] whitespace-nowrap ${i === 1 ? "text-lime" : "text-ink-inverse"}`}
              />
            </div>
          ))}
        </Container>
      </section>

      {/* ── FAQ — paper ─────────────────────────────────────────────── */}
      <section id="questions" aria-labelledby="faq-heading" className="bg-canvas scroll-mt-16">
        <Container className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-10">
          {/* Sized to its column, wraps on words, never clips. */}
          <h2 id="faq-heading" className="font-display text-[clamp(36px,4.2vw,64px)] break-words min-w-0">
            {FAQ_HEADING}
          </h2>
          <Accordion items={FAQ} />
        </Container>
      </section>

      {/* ── Blog — paper ────────────────────────────────────────────── */}
      <section id="blog" aria-labelledby="blog-heading" className="bg-canvas border-t-2 border-ink">
        <Container className="py-16 md:py-24 flex flex-col gap-10">
          <h2 id="blog-heading" className="font-display text-[clamp(40px,6vw,80px)]">
            {BLOG_HEADING}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <BlogCard
                key={post.slug}
                data={{
                  href: `/blog/${post.slug}`,
                  title: post.title,
                  excerpt: post.excerpt,
                  cover: post.cover,
                  readMinutes: post.readMinutes,
                }}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA — lime, then footer — black ─────────────────────────── */}
      <div id="get-started" className="scroll-mt-16">
        <CTABand
          eyebrow={FOOTER_CTA.eyebrow}
          headline={FOOTER_CTA.headline}
          ctaLabel={FOOTER_CTA.ctaLabel}
          ctaHref={FOOTER_CTA.ctaHref}
        >
          {FOOTER_CTA.body}
        </CTABand>
      </div>
      <SiteFooter />
    </div>
  );
}

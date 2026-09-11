import { CREATORS } from "@/content/creators";
import { STEPS, STEPS_HEADLINE_VERBATIM } from "@/content/steps";
import { FAQ, FAQ_HEADING } from "@/content/faq";
import { BLOG_POSTS, BLOG_HEADING } from "@/content/blog";
import {
  HERO,
  PROOF_HEADLINE_VERBATIM,
  FOOTER_CTA,
} from "@/content/hero";
import { HERO_COUNTERS, COUNTERS_A11Y_LABEL } from "@/content/counters";

import { Accordion } from "@/components/Accordion";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Counter } from "@/components/Counter";
import { CTABand } from "@/components/CTABand";
import { FeedFilters } from "@/components/FeedFilters";
import { PageIntro } from "@/components/PageIntro";
import { ProofCard } from "@/components/ProofCard";
import { SiteFooter } from "@/components/SiteFooter";
import { StepCard } from "@/components/StepCard";
import { HomeIcon, BrandsIcon, AgenciesIcon } from "@/components/icons";

const STEP_ICONS = [HomeIcon, BrandsIcon, AgenciesIcon];

/* Numeric counter component consumed by both hero counters and RightRail.
   Layout deliberately reuses FeatureStatCard-like proportions but drops the
   card chrome — the counter row reads as a stat strip inside the feed. */
function CountersRow() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {HERO_COUNTERS.map((c, i) => (
        <Card
          key={c.label}
          variant={i === 1 ? "spotlight" : "default"}
          pad="md"
          className="flex flex-col gap-1 min-w-0"
        >
          <Counter
            value={c.value}
            prefix={c.prefix}
            suffix={c.suffix}
            className={`text-[24px] sm:text-[32px] leading-none font-expanded truncate ${
              i === 1 ? "text-payout" : "text-ink"
            }`}
          />
          <p className="text-[13px] text-muted truncate">{c.label}</p>
        </Card>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div id="top" className="mx-auto w-full max-w-[640px] md:max-w-[880px]">
      <FeedFilters />

      <div className="flex flex-col gap-10 px-4 md:px-6 pt-6 pb-16">
        {/* ── Hero — the one orchestrated page-load moment ─────────── */}
        <section
          aria-labelledby="hero-heading"
          className="scroll-mt-24 flex flex-col gap-5"
        >
          <PageIntro>
            <h1
              id="hero-heading"
              className="text-[40px] sm:text-[48px] leading-[1.05] font-medium max-w-[18ch]"
            >
              {HERO.headlineVerbatim}
            </h1>
            <p className="text-[18px] text-muted max-w-[52ch] mt-4">
              {HERO.subhead}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button href={HERO.primaryCta.href} variant="primary">
                {HERO.primaryCta.label}
              </Button>
              <Button href={HERO.secondaryCta.href} variant="ghost">
                {HERO.secondaryCta.label}
              </Button>
            </div>
          </PageIntro>
        </section>

        {/* ── Proof — the feed's center of gravity ──────────────────── */}
        <section
          id="proof"
          aria-labelledby="proof-heading"
          className="scroll-mt-24 flex flex-col gap-4"
        >
          <h2
            id="proof-heading"
            className="text-[24px] leading-tight font-medium"
          >
            {PROOF_HEADLINE_VERBATIM}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CREATORS.map((c) => (
              <div
                key={c.id}
                id={`creator-${c.id}`}
                className="scroll-mt-24"
              >
                <ProofCard data={c} />
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────────── */}
        <section
          id="how-it-works"
          aria-labelledby="how-heading"
          className="scroll-mt-24 flex flex-col gap-4"
        >
          <h2
            id="how-heading"
            className="text-[24px] leading-tight font-medium"
          >
            {STEPS_HEADLINE_VERBATIM}
          </h2>
          <div className="flex flex-col gap-3">
            {STEPS.map((step, i) => {
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

        {/* ── Counters ──────────────────────────────────────────────── */}
        <section
          id="counters"
          aria-label={COUNTERS_A11Y_LABEL}
          className="scroll-mt-24"
        >
          <CountersRow />
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section
          id="questions"
          aria-labelledby="faq-heading"
          className="scroll-mt-24 flex flex-col gap-4"
        >
          <h2
            id="faq-heading"
            className="text-[24px] leading-tight font-medium"
          >
            {FAQ_HEADING}
          </h2>
          <Card variant="panel" pad="lg">
            <Accordion items={FAQ} />
          </Card>
        </section>

        {/* ── Blog ──────────────────────────────────────────────────── */}
        <section
          id="blog"
          aria-labelledby="blog-heading"
          className="scroll-mt-24 flex flex-col gap-4"
        >
          <h2
            id="blog-heading"
            className="text-[24px] leading-tight font-medium"
          >
            {BLOG_HEADING}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
        </section>

        {/* ── Footer CTA card ───────────────────────────────────────── */}
        <section id="get-started" className="scroll-mt-24">
          <CTABand
            eyebrow={FOOTER_CTA.eyebrow}
            headline={FOOTER_CTA.headline}
            ctaLabel={FOOTER_CTA.ctaLabel}
            ctaHref={FOOTER_CTA.ctaHref}
          >
            {FOOTER_CTA.body}
          </CTABand>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}

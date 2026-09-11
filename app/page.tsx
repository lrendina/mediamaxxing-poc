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
import { BackdropController } from "@/components/BackdropController";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Counter } from "@/components/Counter";
import { CTABand } from "@/components/CTABand";
import { DeviceIntro } from "@/components/DeviceIntro";
import { PageIntro } from "@/components/PageIntro";
import { ProofCard } from "@/components/ProofCard";
import { SiteFooter } from "@/components/SiteFooter";
import { StepCard } from "@/components/StepCard";
import { HomeIcon, BrandsIcon, AgenciesIcon } from "@/components/icons";
import { INTRO_ENABLED } from "@/lib/features";

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

/* Hero children — a fragment, so the DOM around it (PageIntro's div for
   the INTRO_ENABLED=false path, DeviceIntro's viewport for =true) stays
   in charge of layout. Padding for the intro path is applied to
   .intro-viewport in globals.css, not baked in here — this way flipping
   INTRO_ENABLED to false gives back Phase 7's DOM byte-for-byte. */
function HeroContent() {
  return (
    <>
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
    </>
  );
}

/* Section wrapper. Section itself carries NO bg — the body's --page-bg
   handles that, driven by BackdropController based on which section is
   visible. `dark` here just declares the target colour via data attribute
   for the observer to read. Text colours stay canonical (ink/muted). */
function FeedSection({
  id,
  ariaLabelledBy,
  ariaLabel,
  dark = false,
  className = "",
  children,
}: {
  id?: string;
  ariaLabelledBy?: string;
  ariaLabel?: string;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      data-section-bg={dark ? "canvas-alt" : "canvas"}
      className={`scroll-mt-24 py-10 md:py-14 px-4 md:px-6 ${className}`}
    >
      <div className="mx-auto w-full max-w-[608px] md:max-w-[832px]">
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div id="top" className="w-full">
      <BackdropController />

      {/* ── Hero — DARK so the iPhone screen (canvas) stands out ─────── */}
      {INTRO_ENABLED ? (
        <FeedSection ariaLabelledBy="hero-heading" dark>
          <DeviceIntro>
            <HeroContent />
          </DeviceIntro>
        </FeedSection>
      ) : (
        <FeedSection ariaLabelledBy="hero-heading" dark className="flex flex-col gap-5">
          <PageIntro>
            <HeroContent />
          </PageIntro>
        </FeedSection>
      )}

      {/* Transition zone: canvas-bg spacer between hero (dark) and proof.
          As the hero release-scrolls out, this element scrolls in — the
          BackdropController's IntersectionObserver sees a canvas section
          taking over and the body bg fades dark → canvas, so the phone-
          screen white "expands to the sides" and lands on the proof
          section already at canvas. */}
      <div
        aria-hidden
        data-section-bg="canvas"
        className="h-[35vh]"
      />

      {/* ── Proof — canvas, the feed's center of gravity ────────────── */}
      <FeedSection id="proof" ariaLabelledBy="proof-heading">
        <h2 id="proof-heading" className="section-heading text-[24px] leading-tight font-medium mb-4">
          {PROOF_HEADLINE_VERBATIM}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CREATORS.map((c, i) => (
            <div key={c.id} id={`creator-${c.id}`} className="scroll-mt-24">
              <ProofCard data={c} priority={i === 0} />
            </div>
          ))}
        </div>
      </FeedSection>

      {/* ── How it works — DARK ─────────────────────────────────────── */}
      <FeedSection id="how-it-works" ariaLabelledBy="how-heading" dark>
        <h2 id="how-heading" className="section-heading text-[24px] leading-tight font-medium mb-4">
          {STEPS_HEADLINE_VERBATIM}
        </h2>
        <div className="flex flex-col gap-3">
          {STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? HomeIcon;
            return (
              <StepCard key={step.title} icon={<Icon width={20} height={20} />} title={step.title}>
                {step.description}
              </StepCard>
            );
          })}
        </div>
      </FeedSection>

      {/* ── Counters — DARK ─────────────────────────────────────────── */}
      <FeedSection id="counters" ariaLabel={COUNTERS_A11Y_LABEL} dark>
        <CountersRow />
      </FeedSection>

      {/* ── FAQ — DARK ──────────────────────────────────────────────── */}
      <FeedSection id="questions" ariaLabelledBy="faq-heading" dark>
        <h2 id="faq-heading" className="section-heading text-[24px] leading-tight font-medium mb-4">
          {FAQ_HEADING}
        </h2>
        <Card variant="panel" pad="lg">
          <Accordion items={FAQ} />
        </Card>
      </FeedSection>

      {/* ── Blog — canvas ───────────────────────────────────────────── */}
      <FeedSection id="blog" ariaLabelledBy="blog-heading">
        <h2 id="blog-heading" className="section-heading text-[24px] leading-tight font-medium mb-4">
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
      </FeedSection>

      {/* ── Footer CTA + site footer — canvas ───────────────────────── */}
      <FeedSection id="get-started">
        <CTABand
          eyebrow={FOOTER_CTA.eyebrow}
          headline={FOOTER_CTA.headline}
          ctaLabel={FOOTER_CTA.ctaLabel}
          ctaHref={FOOTER_CTA.ctaHref}
        >
          {FOOTER_CTA.body}
        </CTABand>
        <SiteFooter />
      </FeedSection>
    </div>
  );
}

import { CREATORS } from "@/content/creators";
import { STEPS, STEPS_HEADLINE_VERBATIM } from "@/content/steps";
import { FAQ, FAQ_HEADING } from "@/content/faq";
import { BLOG_POSTS, BLOG_HEADING } from "@/content/blog";
import { HERO, PROOF_HEADLINE_VERBATIM, FOOTER_CTA } from "@/content/hero";
import { HERO_COUNTERS, COUNTERS_A11Y_LABEL } from "@/content/counters";

import { Accordion } from "@/components/original/Accordion";
import { BackdropController } from "@/components/original/BackdropController";
import { BlogCard } from "@/components/original/BlogCard";
import { Button } from "@/components/original/Button";
import { Card } from "@/components/original/Card";
import { Counter } from "@/components/Counter";
import { CTABand } from "@/components/original/CTABand";
import { DeviceIntro } from "@/components/DeviceIntro";
import { ProofCard } from "@/components/original/ProofCard";
import { SiteFooter } from "@/components/original/SiteFooter";
import { StepCard } from "@/components/original/StepCard";
import { HomeIcon, BrandsIcon, AgenciesIcon } from "@/components/icons";

/* The default homepage (`/`) — the pre-loud-redesign homepage (paper-and-
   signal feed shell, Instrument Serif, the Phase 8 phone fly-in), restored
   to default per explicit request. The loud direction (black-and-acid-lime,
   full-bleed) lives at /loud and stays reachable via DemoVariantToggle.

   This is the historical page byte-for-byte except: the DeviceIntro branch
   always runs (the INTRO_ENABLED feature flag and its PageIntro fallback
   were dropped — DeviceIntro already collapses to plain layout on its own
   under prefers-reduced-motion / narrow viewports), and every CTA that used
   to point at the non-functional "/#get-started" anchor now points at the
   creator app, matching the loud page's CTAs. */

const STEP_ICONS = [HomeIcon, BrandsIcon, AgenciesIcon];

function CountersRow() {
  return (
    <Card variant="default" pad="none" className="grid grid-cols-3 divide-x divide-border">
      {HERO_COUNTERS.map((c, i) => (
        <div
          key={c.label}
          className="flex flex-col gap-1.5 min-w-0 px-4 sm:px-6 py-5"
        >
          <Counter
            value={c.value}
            prefix={c.prefix}
            suffix={c.suffix}
            className={`text-[26px] sm:text-[36px] leading-none font-expanded truncate ${
              i === 1 ? "text-money" : "text-ink"
            }`}
          />
          <p className="text-[12px] sm:text-[13px] text-muted truncate">{c.label}</p>
        </div>
      ))}
    </Card>
  );
}

function HeroContent() {
  return (
    <>
      <h1
        id="hero-heading"
        className="hero-heading font-display text-[48px] sm:text-[64px] leading-[0.98] max-w-[14ch]"
      >
        {HERO.headlineVerbatim}
      </h1>
      <p className="hero-subhead text-[17px] sm:text-[18px] text-muted max-w-[46ch] mt-5 leading-[1.5]">
        {HERO.subhead}
      </p>
      <div className="flex flex-wrap gap-3 mt-7">
        <Button href={HERO.primaryCta.href} variant="primary" size="lg">
          {HERO.primaryCta.label}
        </Button>
        <Button
          href={HERO.secondaryCta.href}
          variant="ghost"
          size="lg"
          className="hero-ghost-cta"
        >
          {HERO.secondaryCta.label}
        </Button>
      </div>
    </>
  );
}

function FeedSection({
  id,
  ariaLabelledBy,
  ariaLabel,
  bg = "canvas",
  className = "",
  children,
}: {
  id?: string;
  ariaLabelledBy?: string;
  ariaLabel?: string;
  bg?: "canvas" | "dark" | "manual";
  className?: string;
  children: React.ReactNode;
}) {
  const dataAttr = bg === "manual" ? undefined : bg === "dark" ? "canvas-alt" : "canvas";
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      data-section-bg={dataAttr}
      data-section-bg-mobile={bg === "manual" ? "canvas-alt" : undefined}
      className={`scroll-mt-24 py-10 md:py-14 px-4 md:px-6 ${className}`}
    >
      <div className="mx-auto w-full max-w-[608px] md:max-w-[832px]">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div id="top" className="w-full">
      <BackdropController />

      <FeedSection ariaLabelledBy="hero-heading" bg="manual">
        <DeviceIntro>
          <HeroContent />
        </DeviceIntro>
      </FeedSection>

      <FeedSection id="proof" ariaLabelledBy="proof-heading">
        <h2 id="proof-heading" className="section-heading font-display text-[32px] md:text-[36px] leading-[1.05] mb-5">
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

      <FeedSection id="how-it-works" ariaLabelledBy="how-heading" bg="dark">
        <h2 id="how-heading" className="section-heading font-display text-[32px] md:text-[36px] leading-[1.05] mb-5">
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

      <FeedSection id="counters" ariaLabel={COUNTERS_A11Y_LABEL} bg="dark">
        <CountersRow />
      </FeedSection>

      <FeedSection id="questions" ariaLabelledBy="faq-heading" bg="dark">
        <h2 id="faq-heading" className="section-heading font-display text-[32px] md:text-[36px] leading-[1.05] mb-5">
          {FAQ_HEADING}
        </h2>
        <Card variant="default" pad="lg" className="!py-2">
          <Accordion items={FAQ} />
        </Card>
      </FeedSection>

      <FeedSection id="blog" ariaLabelledBy="blog-heading">
        <h2 id="blog-heading" className="section-heading font-display text-[32px] md:text-[36px] leading-[1.05] mb-5">
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

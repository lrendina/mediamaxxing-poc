/* Primitive inventory for /styleguide, rendered after the pills section.

   Server component. Every string comes from content/primitive-examples.ts or
   from a real source module (FAQ, leaderboard, testimonials); the figures in
   the specimens are layout fixtures, not payout promises.

   Lightbox owns the client boundary and receives content as ReactNode.
   Accordion uses native details in a synchronous Server Component. */

import type { ReactNode } from "react";

import Image from "next/image";

import { Accordion } from "@/components/Accordion";
import { BadgeTile } from "@/components/BadgeTile";
import { Card } from "@/components/Card";
import { FeatureCard } from "@/components/FeatureCard";
import { LeaderboardRow } from "@/components/LeaderboardRow";
import { Lightbox } from "@/components/Lightbox";
import { LogoRow } from "@/components/LogoRow";
import { StatRow } from "@/components/StatRow";
import { StepCard } from "@/components/StepCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { TESTIMONIALS } from "@/content/creators";
import { FAQ } from "@/content/faq";
import { LEADERBOARD } from "@/content/leaderboard";
import {
  ACCORDION_SECTION,
  BADGE_TILE_SECTION,
  CARD_SECTION,
  FEATURE_SECTION,
  LEADERBOARD_SECTION,
  LIGHTBOX_SECTION,
  LOGO_SECTION,
  SHOWCASE_INTRO,
  STAT_SECTION,
  STEP_SECTION,
  TESTIMONIAL_SECTION,
} from "@/content/primitive-examples";
/* The 1, 2 and 3 column grids behind the testimonial block. */
const TESTIMONIAL_GRID_CLASS: Record<string, string> = {
  one: "grid grid-cols-1 gap-6",
  two: "grid grid-cols-1 gap-6 md:grid-cols-2",
  three: "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
};


function SpecimenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

function SpecimenLabel({ title, note }: { title: string; note?: string }) {
  return (
    <Card as="div" pad="sm" hover={false} className="min-w-0">
      <div className="flex flex-col gap-2">
        <p className="text-small font-semibold">{title}</p>
        {note ? <p className="text-small text-muted">{note}</p> : null}
      </div>
    </Card>
  );
}

function ShowcaseSection({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 id={headingId} className="text-h2">
          {title}
        </h2>
        <p className="max-w-[var(--text-max)] text-body text-muted">{note}</p>
      </div>
      {children}
    </section>
  );
}

export function PrimitiveShowcase() {
  const testimonials = ["sam", "steven", "jennifer"].flatMap((id) =>
    TESTIMONIALS.filter((entry) => entry.id === id),
  );
  const faqItems = FAQ.items.map((item) => ({
    question: item.question,
    answer: <p className="max-w-[var(--text-max)] text-body">{item.answer}</p>,
  }));
  const faqGroups = [{ id: "faq", title: FAQ.heading, items: faqItems }];

  return (
    <div id={SHOWCASE_INTRO.id} className="flex flex-col gap-16">
      <p className="max-w-[var(--text-max)] text-body text-muted">
        {SHOWCASE_INTRO.note}
      </p>

      {/* Cards ----------------------------------------------------------- */}
      <ShowcaseSection
        id={CARD_SECTION.id}
        title={CARD_SECTION.title}
        note={CARD_SECTION.note}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SpecimenLabel
              title={CARD_SECTION.variantsLabel}
              note={CARD_SECTION.variantsNote}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {CARD_SECTION.variants.map((variant) => (
                <Card
                  key={variant.id}
                  variant={variant.id}
                  pad="md"
                  className="flex h-full min-w-0 flex-col gap-4"
                >
                  <p className="text-h3">{variant.label}</p>
                  <p className={`text-body ${variant.id === "dark" ? "text-ink-inverse" : "text-muted"}`}>{variant.note}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SpecimenLabel title={CARD_SECTION.padsLabel} note={CARD_SECTION.padsNote} />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {CARD_SECTION.pads.map((pad) => (
                <Card key={pad.id} pad={pad.id} className="h-full min-w-0">
                  <div className="flex flex-col gap-2 rounded bg-surface-sunk p-4">
                    <p className="text-small font-semibold">{pad.label}</p>
                    <p className="text-small text-muted">{pad.note}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SpecimenLabel title={CARD_SECTION.hoverLabel} note={CARD_SECTION.hoverNote} />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card pad="md" hover className="flex min-w-0 flex-col gap-4">
                <p className="text-h3">{CARD_SECTION.specimenTitle}</p>
                <p className="text-body">{CARD_SECTION.specimenBody}</p>
                <p className="text-small text-muted">
                  {CARD_SECTION.hoverOnLabel}
                </p>
              </Card>
              <Card pad="md" hover={false} className="flex min-w-0 flex-col gap-4">
                <p className="text-h3">{CARD_SECTION.specimenTitle}</p>
                <p className="text-body">{CARD_SECTION.specimenBody}</p>
                <p className="text-small text-muted">
                  {CARD_SECTION.hoverOffLabel}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Step cards ------------------------------------------------------ */}
      <ShowcaseSection
        id={STEP_SECTION.id}
        title={STEP_SECTION.title}
        note={STEP_SECTION.note}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex min-w-0 flex-col gap-4">
            <SpecimenLabel title={STEP_SECTION.noIcon.label} note={STEP_SECTION.noIcon.note} />
            <StepCard title={STEP_SECTION.stepTitle}>{STEP_SECTION.stepBody}</StepCard>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <SpecimenLabel
              title={STEP_SECTION.withIcon.label}
              note={STEP_SECTION.withIcon.note}
            />
            <StepCard icon={<SpecimenIcon />} title={STEP_SECTION.stepTitle}>
              {STEP_SECTION.stepBody}
            </StepCard>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <SpecimenLabel
              title={STEP_SECTION.withMarker.label}
              note={STEP_SECTION.withMarker.note}
            />
            <StepCard
              icon={<SpecimenIcon />}
              marker={STEP_SECTION.markerValue}
              title={STEP_SECTION.stepTitle}
            >
              {STEP_SECTION.stepBody}
            </StepCard>
          </div>
        </div>
      </ShowcaseSection>

      {/* Feature cards --------------------------------------------------- */}
      <ShowcaseSection
        id={FEATURE_SECTION.id}
        title={FEATURE_SECTION.title}
        note={FEATURE_SECTION.note}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <SpecimenLabel
              title={FEATURE_SECTION.withIcon.label}
              note={FEATURE_SECTION.withIcon.note}
            />
            <FeatureCard icon={<SpecimenIcon />} title={FEATURE_SECTION.withIcon.title}>
              {FEATURE_SECTION.withIcon.body}
            </FeatureCard>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <SpecimenLabel
              title={FEATURE_SECTION.noIcon.label}
              note={FEATURE_SECTION.noIcon.note}
            />
            <FeatureCard title={FEATURE_SECTION.noIcon.title}>
              {FEATURE_SECTION.noIcon.body}
            </FeatureCard>
          </div>
        </div>
      </ShowcaseSection>

      {/* Badge tiles ----------------------------------------------------- */}
      <ShowcaseSection
        id={BADGE_TILE_SECTION.id}
        title={BADGE_TILE_SECTION.title}
        note={BADGE_TILE_SECTION.note}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <SpecimenLabel
              title={BADGE_TILE_SECTION.label}
              note={BADGE_TILE_SECTION.labelNote}
            />
            <BadgeTile
              icon={<SpecimenIcon />}
              title={BADGE_TILE_SECTION.tileTitle}
            >
              {BADGE_TILE_SECTION.tileBody}
            </BadgeTile>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <SpecimenLabel title={BADGE_TILE_SECTION.noIconLabel} />
            <BadgeTile title={BADGE_TILE_SECTION.tileTitle}>
              {BADGE_TILE_SECTION.tileBody}
            </BadgeTile>
          </div>
        </div>
      </ShowcaseSection>

      {/* Testimonials ---------------------------------------------------- */}
      <ShowcaseSection
        id={TESTIMONIAL_SECTION.id}
        title={TESTIMONIAL_SECTION.title}
        note={TESTIMONIAL_SECTION.note}
      >
        <div className="flex flex-col gap-8">
          {TESTIMONIAL_SECTION.widths.map((width) => (
            <div key={width.id} className="flex flex-col gap-4">
              <SpecimenLabel title={width.label} note={width.note} />
              <div
                className={
                  TESTIMONIAL_GRID_CLASS[width.id] ?? "grid grid-cols-1 gap-6"
                }
              >
                {testimonials.slice(0, width.count).map((testimonial, index) => (
                  <div
                    key={`${width.id}-${index}`}
                    className="min-w-0"
                  >
                    <TestimonialCard
                      data={testimonial}
                      priority={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="max-w-[var(--text-max)] text-small text-muted">
            {TESTIMONIAL_SECTION.priorityNote}
          </p>
        </div>
      </ShowcaseSection>

      {/* Stat rows ------------------------------------------------------- */}
      <ShowcaseSection
        id={STAT_SECTION.id}
        title={STAT_SECTION.title}
        note={STAT_SECTION.note}
      >
        <div className="flex flex-col gap-8">
          {STAT_SECTION.fixtures.map((fixture) => (
            <div key={fixture.id} className="flex flex-col gap-4">
              <SpecimenLabel title={fixture.label} note={fixture.note} />
              <StatRow stats={fixture.stats} className="min-w-0" />
            </div>
          ))}
          <p className="max-w-[var(--text-max)] text-small text-muted">
            {STAT_SECTION.fixtureWarning}
          </p>
        </div>
      </ShowcaseSection>

      {/* Leaderboard ----------------------------------------------------- */}
      <ShowcaseSection
        id={LEADERBOARD_SECTION.id}
        title={LEADERBOARD_SECTION.title}
        note={LEADERBOARD_SECTION.note}
      >
        <div className="flex flex-col gap-4">
          <SpecimenLabel title={LEADERBOARD_SECTION.label} />
          <ol className="flex flex-col gap-2">
            {LEADERBOARD.entries.map((entry) => (
              <LeaderboardRow key={entry.position} entry={entry} />
            ))}
          </ol>
          <p className="max-w-[var(--text-max)] text-small text-muted">
            {LEADERBOARD.note}
          </p>
          <SpecimenLabel title={LEADERBOARD_SECTION.avatarLabel} note={LEADERBOARD_SECTION.avatarNote} />
          <ol>
            <LeaderboardRow entry={LEADERBOARD_SECTION.avatarExample} />
          </ol>
        </div>
      </ShowcaseSection>

      {/* Accordions ------------------------------------------------------ */}
      <ShowcaseSection
        id={ACCORDION_SECTION.id}
        title={ACCORDION_SECTION.title}
        note={ACCORDION_SECTION.note}
      >
        <div className="flex flex-col gap-8">
          <p className="max-w-[var(--text-max)] text-small text-muted">
            {ACCORDION_SECTION.faqWarning}
          </p>
          <div className="flex flex-col gap-4">
            <SpecimenLabel
              title={ACCORDION_SECTION.grouped.label}
              note={ACCORDION_SECTION.grouped.note}
            />
            <Accordion groups={faqGroups} />
          </div>
          <div className="flex flex-col gap-4">
            <SpecimenLabel
              title={ACCORDION_SECTION.flat.label}
              note={ACCORDION_SECTION.flat.note}
            />
            <Accordion items={faqItems} />
          </div>
          <div className="flex flex-col gap-4">
            <SpecimenLabel
              title={ACCORDION_SECTION.closed.label}
              note={ACCORDION_SECTION.closed.note}
            />
            <Accordion groups={faqGroups} defaultOpenIndex={null} />
          </div>
        </div>
      </ShowcaseSection>

      {/* Logo rows ------------------------------------------------------- */}
      <ShowcaseSection
        id={LOGO_SECTION.id}
        title={LOGO_SECTION.title}
        note={LOGO_SECTION.note}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SpecimenLabel
              title={LOGO_SECTION.presentLabel}
              note={LOGO_SECTION.presentNote}
            />
            <LogoRow logos={LOGO_SECTION.presentLogos} />
          </div>
          <div className="flex flex-col gap-4">
            <SpecimenLabel
              title={LOGO_SECTION.missingLabel}
              note={LOGO_SECTION.missingNote}
            />
            <LogoRow logos={LOGO_SECTION.missingLogos} />
          </div>
        </div>
      </ShowcaseSection>

      {/* Lightbox -------------------------------------------------------- */}
      <ShowcaseSection
        id={LIGHTBOX_SECTION.id}
        title={LIGHTBOX_SECTION.title}
        note={LIGHTBOX_SECTION.note}
      >
        <div className="flex flex-col gap-4">
          <SpecimenLabel title={LIGHTBOX_SECTION.label} />
          <Lightbox
            title={LIGHTBOX_SECTION.dialogTitle}
            triggerLabel={LIGHTBOX_SECTION.triggerLabel}
            closeLabel={LIGHTBOX_SECTION.closeLabel}
            trigger={
              <span className="text-small font-semibold">
                {LIGHTBOX_SECTION.triggerText}
              </span>
            }
          >
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded bg-surface-sunk">
                <Image
                  src={LIGHTBOX_SECTION.screenshot.src}
                  alt={LIGHTBOX_SECTION.screenshot.alt}
                  fill
                  sizes={LIGHTBOX_SECTION.screenshot.sizes}
                  className="object-contain"
                />
              </div>
              <p className="max-w-[var(--text-max)] text-small text-muted">
                {LIGHTBOX_SECTION.assetNote}
              </p>
            </div>
          </Lightbox>
        </div>
      </ShowcaseSection>
    </div>
  );
}

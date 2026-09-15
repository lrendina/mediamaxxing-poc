import Image from "next/image";
import { Card } from "./Card";
import { Lightbox } from "./Lightbox";
import { Pill } from "./Pill";
import { StatRow } from "./StatRow";
import {
  dashboardDialogTitle,
  dashboardImageAlt,
  dashboardTriggerLabel,
  dialogCloseLabel,
  phoneImageAlt,
  proofUi,
} from "@/content/proof-ui";
import type { Testimonial } from "@/content/creators";

export type TestimonialCardProps = {
  data: Testimonial;
  /* Set true on the first card in a feed so its dashboard image loads eagerly
     and Next.js emits a preload hint — matters for LCP. */
  priority?: boolean;
};

/* One creator's proof, in the order the number earns the attention: who, how
   much, the receipts, the small table of what it took, then their own words.
   h-full keeps cards level inside a row. The shared card lift follows the
   landing-page motion spec; the labelled screenshot is its explicit trigger. */
export function TestimonialCard({
  data,
  priority = false,
}: TestimonialCardProps) {
  return (
    <Card
      as="article"
      variant="spotlight"
      pad="none"
      hover
      className="flex h-full flex-col overflow-hidden"
    >
      <header className="flex flex-col items-start gap-2 px-6 pt-6 md:px-8 md:pt-8">
        <div className="flex w-full min-w-0 flex-col gap-2">
          <h3 className="break-words text-h3 text-ink">{data.name}</h3>
          <p className="break-words text-small text-muted">@{data.handle}</p>
        </div>
        <Pill tone="neutral">{data.tier}</Pill>
      </header>

      <div className="flex flex-col gap-2 px-6 pt-6 md:px-8">
        <p className="text-small text-muted">{proofUi.earningsLabel}</p>
        {/* text-h3 rather than h2: the money still leads the card, but at a
            three-column grid cell h2 would wrap and clip. */}
        <p className="font-expanded text-h3 tabular-nums text-money">
          {data.earnings}
        </p>
      </div>

      <div className="px-6 pt-6 md:px-8">
        <Lightbox
          className="block"
          title={dashboardDialogTitle(data.name)}
          triggerLabel={dashboardTriggerLabel(data.name)}
          closeLabel={dialogCloseLabel(data.name)}
          trigger={
            <span className="relative block aspect-[2/1] overflow-hidden rounded bg-surface-sunk ring-1 ring-border">
              {/* Decorative: the button already carries the label. */}
              <Image
                src={data.dashboardSrc}
                alt=""
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 768px) calc(50vw - 112px), calc(100vw - 96px)"
                className="object-contain"
                preload={priority}
              />
            </span>
          }
        >
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="relative aspect-[2/1] overflow-hidden rounded bg-surface-sunk ring-1 ring-border md:aspect-auto md:min-h-[360px]">
              <Image
                src={data.dashboardSrc}
                alt={dashboardImageAlt(data.name)}
                fill
                sizes="(min-width: 768px) 600px, calc(100vw - 96px)"
                className="object-contain"
              />
            </div>
            <div className="relative aspect-[9/16] overflow-hidden rounded bg-surface-sunk ring-1 ring-border md:aspect-auto md:min-h-[360px]">
              <Image
                src={data.phoneSrc}
                alt={phoneImageAlt(data.name)}
                fill
                sizes="(min-width: 768px) 300px, calc(100vw - 96px)"
                className="object-contain"
              />
            </div>
          </div>

          {/* The card only shows two lines; the whole story is here, verbatim. */}
          <section className="mt-6 flex flex-col gap-4">
            <h3 className="text-h3 text-ink">{proofUi.fullStoryLabel}</h3>
            <blockquote className="max-w-[var(--text-max)] text-body text-muted">
              <p>{data.blurb}</p>
            </blockquote>
          </section>
        </Lightbox>
      </div>

      <div className="px-6 pt-6 md:px-8">
        <StatRow stats={data.stats} />
      </div>

      <blockquote className="mt-auto px-6 pb-6 pt-6 md:px-8 md:pb-8">
        <p className="line-clamp-2 text-small text-muted">
          &ldquo;{data.blurb}&rdquo;
        </p>
      </blockquote>
    </Card>
  );
}

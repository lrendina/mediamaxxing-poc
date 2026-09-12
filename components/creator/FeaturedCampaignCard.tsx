"use client";

import Link from "next/link";
import type { Brand, Campaign } from "@/content/creator/types";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { ArrowRightIcon } from "./app-icons";
import { BadgePill } from "./BadgePill";
import { BrandArtwork } from "./BrandArtwork";
import { Countdown } from "./Countdown";
import { useCreator } from "./CreatorStateProvider";

/* Observed: the one dark object on the page. Status pills top-left, brand
   art behind a large centred countdown, campaign name as eyebrow above,
   instruction below, green full-width CTA with trailing arrow. The CTA is
   a real link into the detail view — navigation is not a mutation. */
export function FeaturedCampaignCard({
  brand,
  campaign,
}: {
  brand: Brand;
  campaign: Campaign;
}) {
  const { href } = useCreator();
  const bounty = brand.badges.find((b) => b.kind === "bounty");

  return (
    <article
      aria-labelledby={`featured-${campaign.id}`}
      className="rounded-[var(--radius-card)] overflow-hidden bg-surface-dark text-ink-inverse"
    >
      <BrandArtwork
        brandId={brand.id}
        wordmark={brand.wordmark}
        aspect="aspect-[16/7] sm:aspect-[16/5]"
        wordmarkClass="text-[64px] opacity-20"
      >
        <div className="absolute top-3 left-3 flex gap-2">
          <BadgePill badge={{ kind: "accepted" }} />
          {bounty ? <BadgePill badge={bounty} /> : null}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span
            id={`featured-${campaign.id}`}
            className="text-[11px] font-medium tracking-wider uppercase text-ink-inverse/80"
          >
            {brand.name} · {campaign.name}
          </span>
          {campaign.acceptedDeadline ? (
            <Countdown
              deadline={campaign.acceptedDeadline}
              className="mt-1 text-[40px] sm:text-[48px] leading-none font-expanded"
            />
          ) : null}
          <span className="mt-2 text-[13px] text-ink-inverse/75">
            {CAMPAIGNS_PAGE.featured.instruction}
          </span>
        </div>
      </BrandArtwork>

      <div className="p-3">
        <Link
          href={href(`/creator/campaigns/${brand.slug}/${campaign.slug}`)}
          className="
            flex items-center justify-center gap-2 w-full min-h-11
            rounded-[var(--radius-control)] bg-money text-ink-inverse
            text-[15px] font-medium hover:brightness-95 transition
          "
        >
          {CAMPAIGNS_PAGE.featured.cta}
          <ArrowRightIcon aria-hidden width={18} height={18} />
        </Link>
      </div>
    </article>
  );
}

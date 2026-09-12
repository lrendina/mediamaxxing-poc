"use client";

import Link from "next/link";
import type { Brand, Campaign } from "@/content/creator/types";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { ArrowRightIcon } from "./app-icons";
import { BadgePill } from "./BadgePill";
import { BrandLogo } from "./BrandLogo";
import { Countdown } from "./Countdown";
import { useCreator } from "./CreatorStateProvider";

/* The accepted campaign. A lime block with the deadline at headline
   size — the one thing on the index that is actually urgent. */
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
      className="rounded-[var(--radius-card)] bg-lime text-surface-dark p-5 md:p-7 flex flex-col gap-6"
    >
      <div className="flex flex-wrap items-center gap-3">
        <BrandLogo brandId={brand.id} name={brand.name} size={36} />
        <span id={`featured-${campaign.id}`} className="font-display-sm text-[20px]">
          {brand.name} · {campaign.name}
        </span>
        <span className="ml-auto flex gap-2">
          <BadgePill badge={{ kind: "accepted" }} className="!bg-surface-dark !text-lime" />
          {bounty ? <BadgePill badge={bounty} /> : null}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.12em] font-bold opacity-70">Time left</span>
        {campaign.acceptedDeadline ? (
          <Countdown
            deadline={campaign.acceptedDeadline}
            className="font-display text-[clamp(56px,9vw,128px)]"
          />
        ) : null}
        <span className="text-[16px] font-medium max-w-[40ch]">
          {CAMPAIGNS_PAGE.featured.instruction}
        </span>
      </div>

      <Link
        href={href(`/creator/campaigns/${brand.slug}/${campaign.slug}`)}
        className="
          inline-flex self-start items-center gap-2 min-h-12 px-6
          rounded-full bg-surface-dark text-lime
          text-[16px] font-semibold hover:bg-surface-dark/90 transition
        "
      >
        {CAMPAIGNS_PAGE.featured.cta}
        <ArrowRightIcon aria-hidden width={18} height={18} strokeWidth={2} />
      </Link>
    </article>
  );
}

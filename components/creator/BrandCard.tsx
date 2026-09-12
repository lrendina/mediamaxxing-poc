"use client";

import Link from "next/link";
import type { Brand } from "@/content/creator/types";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { BadgePill } from "./BadgePill";
import { BrandArtwork } from "./BrandArtwork";
import { BrandLogo } from "./BrandLogo";
import { useCreator } from "./CreatorStateProvider";
import { RatePill } from "./RatePill";

/* Observed grid unit: 16:9 art, footer row with small logo, name,
   "N campaigns", right-aligned blue rate pill. Bounty pill top-left of the
   art, XP multiplier top-right. Only OpenArt has a built detail view;
   other brands link to it too so the grid is fully navigable. */
export function BrandCard({
  brand,
  detailHref,
}: {
  brand: Brand;
  detailHref: string;
}) {
  const { href } = useCreator();
  const bounty = brand.badges.find((b) => b.kind === "bounty");
  const xp = brand.badges.find((b) => b.kind === "xpMultiplier");
  const live = brand.badges.find((b) => b.kind === "live");

  return (
    <Link
      href={href(detailHref)}
      aria-label={`${brand.name}, ${CAMPAIGNS_PAGE.campaignsCount(brand.campaignCount)}`}
      className="
        group block rounded-[var(--radius-card)] overflow-hidden
        bg-surface border border-border
        hover:border-ink/30 transition
      "
    >
      <BrandArtwork brandId={brand.id} wordmark={brand.wordmark}>
        {bounty ? (
          <span className="absolute top-2 left-2">
            <BadgePill badge={{ kind: "bounty" }} />
          </span>
        ) : live ? (
          <span className="absolute top-2 left-2">
            <BadgePill badge={live} />
          </span>
        ) : null}
        {xp ? (
          <span className="absolute top-2 right-2">
            <BadgePill badge={xp} className="!bg-surface-dark/70 !text-streak" />
          </span>
        ) : null}
      </BrandArtwork>

      <div className="flex items-center gap-3 px-3 py-3">
        <BrandLogo brandId={brand.id} name={brand.name} size={32} />
        <span className="flex-1 min-w-0 flex flex-col leading-tight">
          <span className="text-[15px] font-medium truncate">{brand.name}</span>
          <span className="text-[13px] text-muted">
            {CAMPAIGNS_PAGE.campaignsCount(brand.campaignCount)}
          </span>
        </span>
        <RatePill centsPerThousand={brand.headlineRateCentsPerThousand} />
      </div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import type { Brand } from "@/content/creator/types";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { BadgePill } from "./BadgePill";
import { BrandArtwork } from "./BrandArtwork";
import { useCreator } from "./CreatorStateProvider";
import { RatePill } from "./RatePill";

/* Grid unit. Art on top, then the brand name at display size with the
   rate pill hard against it. Hover lifts with a lime offset shadow. */
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
        bg-surface border-2 border-border
        transition hover:border-lime hover:shadow-[6px_6px_0_var(--lime)] hover:-translate-x-0.5 hover:-translate-y-0.5
      "
    >
      <BrandArtwork brandId={brand.id} wordmark={brand.wordmark} wordmarkClass="font-display text-[32px]">
        {bounty ? (
          <span className="absolute top-2 left-2"><BadgePill badge={{ kind: "bounty" }} /></span>
        ) : live ? (
          <span className="absolute top-2 left-2"><BadgePill badge={live} /></span>
        ) : null}
        {xp ? <span className="absolute top-2 right-2"><BadgePill badge={xp} /></span> : null}
      </BrandArtwork>

      <div className="flex items-end gap-3 px-4 py-4">
        <span className="flex-1 min-w-0 flex flex-col gap-1">
          <span className="font-display-sm text-[22px] truncate">{brand.name}</span>
          <span className="text-[11px] uppercase tracking-[0.08em] font-bold text-muted">
            {CAMPAIGNS_PAGE.campaignsCount(brand.campaignCount)}
          </span>
        </span>
        <RatePill centsPerThousand={brand.headlineRateCentsPerThousand} />
      </div>
    </Link>
  );
}

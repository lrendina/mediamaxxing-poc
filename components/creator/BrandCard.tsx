"use client";

import Link from "next/link";
import type { Brand } from "@/content/creator/types";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";
import { LockIcon } from "./app-icons";
import { BadgePill } from "./BadgePill";
import { BrandArtwork } from "./BrandArtwork";
import { BrandLogo } from "./BrandLogo";
import { useCreator } from "./CreatorStateProvider";
import { EarningNowBadge } from "./EarningNowBadge";
import { RatePill } from "./RatePill";

/* Observed grid unit: 16:9 art, footer row with small logo, name,
   "N campaigns", right-aligned blue rate pill. Bounty pill top-left of the
   art, XP multiplier top-right. Only OpenArt has a built detail view;
   other brands link to it too so the grid is fully navigable.

   Passing `onApply` renders the locked variant (not observed, see
   CAMPAIGNS_PAGE.locked): no link into the detail view, a lock beside the
   campaign count, and a full-width "Apply to join" button. */
export function BrandCard({
  brand,
  detailHref,
  onApply,
}: {
  brand: Brand;
  detailHref?: string;
  onApply?: () => void;
}) {
  const { href } = useCreator();
  const bounty = brand.badges.find((b) => b.kind === "bounty");
  const xp = brand.badges.find((b) => b.kind === "xpMultiplier");
  const live = brand.badges.find((b) => b.kind === "live");

  const artwork = (
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
      <span className="absolute bottom-2 left-2">
        <EarningNowBadge />
      </span>
    </BrandArtwork>
  );

  if (onApply || !detailHref) {
    return (
      <article
        aria-labelledby={`brand-${brand.id}`}
        className="flex flex-col rounded-[var(--radius-card)] overflow-hidden bg-surface border border-border"
      >
        {artwork}

        <div className="flex items-center gap-3 px-3 pt-3">
          <BrandLogo brandId={brand.id} name={brand.name} size={32} />
          <span className="flex-1 min-w-0 flex flex-col leading-tight">
            <span id={`brand-${brand.id}`} className="text-[15px] font-medium truncate">
              {brand.name}
            </span>
            <span className="inline-flex items-center gap-1 text-[13px] text-muted">
              <LockIcon aria-hidden width={12} height={12} />
              {CAMPAIGNS_PAGE.locked.campaigns(brand.campaignCount)}
            </span>
          </span>
          <RatePill centsPerThousand={brand.headlineRateCentsPerThousand} />
        </div>

        <div className="p-3">
          <button
            type="button"
            onClick={onApply}
            className="
              flex items-center justify-center w-full min-h-11
              rounded-full bg-action text-ink-inverse
              text-[15px] font-medium hover:brightness-95 transition
            "
          >
            {CAMPAIGNS_PAGE.locked.apply}
          </button>
        </div>
      </article>
    );
  }

  return (
    <Link
      href={href(detailHref)}
      aria-label={`${brand.name}, ${CAMPAIGNS_PAGE.campaignsCount(brand.campaignCount)}`}
      className="
        group block rounded-[var(--radius-card)] overflow-hidden
        bg-surface border border-border
        hover:shadow-2 hover:-translate-y-0.5 transition
      "
    >
      {artwork}

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

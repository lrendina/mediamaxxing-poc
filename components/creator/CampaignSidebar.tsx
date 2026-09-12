"use client";

import Link from "next/link";
import type { Brand, Campaign } from "@/content/creator/types";
import { CAMPAIGN_DETAIL } from "@/content/creator/ui";
import { formatRate } from "@/lib/format";
import { ArrowLeftIcon, CheckIcon, FlameIcon, LockIcon } from "./app-icons";
import { BadgePill } from "./BadgePill";
import { BrandArtwork } from "./BrandArtwork";
import { BrandLogo } from "./BrandLogo";
import { useCreator } from "./CreatorStateProvider";
import { ProgressBar } from "./ProgressBar";
import { PrototypeButton } from "./PrototypeButton";

/* The campaign's own sidebar (the second pane of the detail view).
   Observed top to bottom: back pill, artwork thumb, logo + campaign +
   brand, tab nav with locked streak perks, CAMPAIGNS sibling list with
   rates, onboarding card, Submit Content pinned below. */
export function CampaignSidebar({
  brand,
  campaign,
  siblings,
}: {
  brand: Brand;
  campaign: Campaign;
  siblings: Campaign[];
}) {
  const { href } = useCreator();
  const stepsDone = campaign.onboarding.filter((s) => s.complete).length;
  const currentStep = Math.min(stepsDone + 1, campaign.onboarding.length);

  const tabClass = (active: boolean) =>
    `flex items-center gap-2 min-h-11 px-3 rounded-[var(--radius-control)] text-[15px] ${
      active ? "bg-surface-sunk font-medium" : "text-ink/80 hover:bg-ink/[0.04]"
    }`;

  return (
    <aside
      aria-label="Campaign"
      className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-surface border border-border p-3 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto"
    >
      <Link
        href={href("/creator/campaigns")}
        className="inline-flex items-center gap-1.5 self-start min-h-9 pl-2.5 pr-3.5 rounded-full border border-border text-[13px] font-medium hover:border-ink"
      >
        <ArrowLeftIcon aria-hidden width={16} height={16} />
        {CAMPAIGN_DETAIL.back}
      </Link>

      <BrandArtwork
        brandId={brand.id}
        wordmark={brand.wordmark}
        className="rounded-[var(--radius-control)]"
        wordmarkClass="text-[20px]"
      />

      <div className="flex items-center gap-3">
        <BrandLogo brandId={brand.id} name={brand.name} size={36} />
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-[15px] font-medium truncate">{campaign.name}</span>
          <span className="text-[13px] text-muted truncate">{brand.name}</span>
        </div>
      </div>

      <nav aria-label="Campaign sections" className="flex flex-col gap-0.5">
        <a href="#overview" aria-current="page" className={tabClass(true)}>
          {CAMPAIGN_DETAIL.tabs.overview}
        </a>
        <Link href={href("/creator/submissions")} className={tabClass(false)}>
          {CAMPAIGN_DETAIL.tabs.submissions}
        </Link>
        {campaign.perks.map((perk) => (
          <span
            key={perk.id}
            aria-disabled={!perk.unlocked}
            className={`${tabClass(false)} ${perk.unlocked ? "" : "text-muted cursor-not-allowed"}`}
          >
            <span className="flex-1">{perk.label}</span>
            <span className="inline-flex items-center gap-0.5 text-[13px] text-streak">
              <FlameIcon aria-hidden width={13} height={13} />
              {CAMPAIGN_DETAIL.streak(perk.currentStreakDays, perk.requiredStreakDays)}
            </span>
            {perk.unlocked ? (
              <CheckIcon aria-label="Unlocked" width={14} height={14} className="text-money" />
            ) : (
              <LockIcon aria-label="Locked" width={14} height={14} />
            )}
          </span>
        ))}
      </nav>

      <div className="flex flex-col gap-0.5">
        <p className="px-3 pb-1 text-[11px] font-medium tracking-wider text-muted">
          {CAMPAIGN_DETAIL.campaignsHeading}
        </p>
        {siblings.map((c) => {
          const active = c.id === campaign.id;
          return (
            <Link
              key={c.id}
              href={href(`/creator/campaigns/${brand.slug}/${c.slug}`)}
              aria-current={active ? "page" : undefined}
              className={tabClass(active)}
            >
              <span className="flex-1 truncate">{c.name}</span>
              {c.listBadge ? (
                <BadgePill badge={c.listBadge} />
              ) : (
                <span className="text-[13px] font-expanded text-muted">
                  {formatRate(c.headlineRateCentsPerThousand)}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 rounded-[var(--radius-control)] bg-surface-sunk p-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[15px] font-medium">{CAMPAIGN_DETAIL.onboarding.title}</span>
          <span className="text-[13px] text-muted whitespace-nowrap">
            {CAMPAIGN_DETAIL.onboarding.step(currentStep, campaign.onboarding.length)}
          </span>
        </div>
        <ProgressBar
          value={stepsDone}
          max={campaign.onboarding.length}
          tone="action"
          label={CAMPAIGN_DETAIL.onboarding.title}
          height="h-1.5"
        />
        <ol className="flex flex-col gap-1.5 mt-1">
          {campaign.onboarding.map((s) => (
            <li
              key={s.label}
              className={`flex items-center gap-2 text-[13px] ${s.locked && !s.complete ? "text-muted" : "text-ink"}`}
            >
              <span
                aria-hidden
                className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  s.complete ? "bg-money border-money text-ink-inverse" : "border-ink/30"
                }`}
              >
                {s.complete ? <CheckIcon width={10} height={10} /> : null}
              </span>
              <span className={s.complete ? "line-through decoration-ink/40" : ""}>{s.label}</span>
              <span className="sr-only">{s.complete ? ", complete" : s.locked ? ", locked" : ""}</span>
            </li>
          ))}
        </ol>
      </div>

      <PrototypeButton tone="action" className="w-full">
        {CAMPAIGN_DETAIL.submit}
      </PrototypeButton>
    </aside>
  );
}

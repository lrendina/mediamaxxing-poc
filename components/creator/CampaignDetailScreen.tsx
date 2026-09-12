"use client";

import { notFound } from "next/navigation";
import { brandBySlug } from "@/content/creator/brands";
import { campaignBySlug, campaignsForBrand } from "@/content/creator/campaigns";
import { DIRECTOR_ADVANCED_CREATORS } from "@/content/creator/leaderboard";
import { CAMPAIGN_DETAIL } from "@/content/creator/ui";
import { formatCount, formatRate, formatUsd } from "@/lib/format";
import { CampaignSidebar } from "./CampaignSidebar";
import { CreatorsPanel } from "./CreatorsPanel";
import { useCreator } from "./CreatorStateProvider";
import { GuidelinesPanel } from "./GuidelinesPanel";
import { PayRateTable } from "./PayRateTable";
import { StatStrip } from "./StatStrip";

/* Three panes — the icon rail is the collapsed AppSidebar (AppShell does
   that on this route), then the campaign sidebar, the content column,
   and the creators rail. Right rail drops below xl; the campaign sidebar
   stacks above the content below lg. */
export function CampaignDetailScreen({
  brandSlug,
  campaignSlug,
}: {
  brandSlug: string;
  campaignSlug: string;
}) {
  const { fixtures } = useCreator();
  const brand = brandBySlug(brandSlug);
  const campaign = brand
    ? campaignBySlug(fixtures.campaigns, brand.id, campaignSlug)
    : undefined;
  if (!brand || !campaign) notFound();

  const siblings = campaignsForBrand(fixtures.campaigns, brand.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_var(--app-rail)] gap-4 items-start">
      <CampaignSidebar brand={brand} campaign={campaign} siblings={siblings} />

      <div id="overview" className="flex flex-col gap-4 min-w-0 scroll-mt-4">
        {/* Labels below are assumed — cropped in the screenshot. See
            CAMPAIGN_DETAIL.stats and the [HUMAN] item in PLAN.md. */}
        <StatStrip
          stats={[
            { label: CAMPAIGN_DETAIL.stats.rate,   value: formatRate(campaign.headlineRateCentsPerThousand), tone: "money", assumedLabel: true },
            { label: CAMPAIGN_DETAIL.stats.posts,  value: formatCount(campaign.postCount), assumedLabel: true },
            { label: CAMPAIGN_DETAIL.stats.budget, value: formatUsd(campaign.totalBudgetCents), assumedLabel: true },
          ]}
        />

        {campaign.payTiers.length ? <PayRateTable tiers={campaign.payTiers} /> : null}

        <GuidelinesPanel markdown={campaign.guidelinesMarkdown} notionUrl={campaign.guidelinesUrl} />

        <div className="xl:hidden">
          <CreatorsPanel board={DIRECTOR_ADVANCED_CREATORS} creatorCount={campaign.creatorCount} />
        </div>
      </div>

      <aside aria-label="Complementary" className="hidden xl:block sticky top-4">
        <CreatorsPanel board={DIRECTOR_ADVANCED_CREATORS} creatorCount={campaign.creatorCount} />
      </aside>
    </div>
  );
}

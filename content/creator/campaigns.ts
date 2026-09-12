import type { Campaign, CampaignPerk, OnboardingStep } from "./types";
import { fromNow, HOURS, MINUTES } from "@/lib/time";

/* Observed on the detail view: two perks locked behind streaks. */
const lockedPerks: CampaignPerk[] = [
  { id: "free-code", label: "Free Code", requiredStreakDays: 3, currentStreakDays: 0, unlocked: false },
  { id: "advanced-submit", label: "Advanced Submit", requiredStreakDays: 14, currentStreakDays: 0, unlocked: false },
];

const unlockedPerks: CampaignPerk[] = lockedPerks.map((p) => ({
  ...p,
  currentStreakDays: 17, // assumed — matches activeCreator.streakDays
  unlocked: true,
}));

/* Observed: "Complete onboarding · Step 1 of 2". */
const onboardingStep1: OnboardingStep[] = [
  { label: "Link an account", complete: false, locked: false },
  { label: "Make your first post", complete: false, locked: true },
];

const onboardingDone: OnboardingStep[] = onboardingStep1.map((s) => ({
  ...s,
  complete: true,
  locked: false,
}));

/* The guidelines body. Copy is placeholder documentation shaped like the
   observed Notion export (h2s, callouts, links, an embedded image) — the
   real text was not legible in the screenshot. */
const DIRECTOR_ADVANCED_GUIDELINES = `
## What this campaign is

OpenArt Director is a tool for turning a written prompt into a short film. Your job is to make the tool look effortless. Show the prompt, show the output, keep the cut under 30 seconds.

> Rates step up at 2.0K views. Posts under that threshold pay the entry rate; everything above it pays the headline rate on all views, not just the ones past the line.

## What to post

- Open on the finished clip, then rewind to the prompt.
- Say the product name out loud once. Do not overlay it as text.
- Keep captions in your own voice. Copied captions are rejected.

![Example post layout](example-post)

## What gets rejected

- Reused footage from another campaign.
- Anything that shows a competitor's interface.
- Posts older than 48 hours at submission time.

Full brand assets and the current prompt pack are in the [Notion workspace](https://www.notion.so). Questions go to the campaign channel on Discord.
`.trim();

const GENERIC_GUIDELINES = `
## Overview

Read the brief in the Notion workspace before your first post. Rates, thresholds, and rejection rules are the same across this brand's campaigns unless the brief says otherwise.

> Submissions are reviewed within 48 hours. Views are tracked from the moment of submission, not the moment of posting.

## Requirements

- One post per submission.
- Public account, original footage.
- Tag the brand where the platform allows it.
`.trim();

const NOTION = "https://www.notion.so";

/* OpenArt campaign family, as listed in the observed campaign sidebar.
   Director Advanced is the one with the full detail view. */
export const OPENART_CAMPAIGNS: Campaign[] = [
  {
    id: "openart-director-basic",
    brandId: "openart",
    name: "Director Basic",
    slug: "director-basic",
    headlineRateCentsPerThousand: 300,
    payTiers: [
      { minViews: 0, maxViews: 2000, rateCentsPerThousand: 100 },     // assumed
      { minViews: 2000, maxViews: null, rateCentsPerThousand: 300 },
    ],
    creatorCount: 512,      // assumed
    totalBudgetCents: 250_000, // assumed
    postCount: 1_140,       // assumed
    guidelinesUrl: NOTION,
    guidelinesMarkdown: GENERIC_GUIDELINES,
    status: "available",
    perks: lockedPerks,
    onboarding: onboardingStep1,
  },
  {
    id: "openart-director-advanced",
    brandId: "openart",
    name: "Director Advanced",
    slug: "director-advanced",
    headlineRateCentsPerThousand: 350,
    payTiers: [
      { minViews: 0, maxViews: 2000, rateCentsPerThousand: 125 },
      { minViews: 2000, maxViews: null, rateCentsPerThousand: 350 },
    ],
    creatorCount: 421,
    totalBudgetCents: 350_000,
    postCount: 990,
    guidelinesUrl: NOTION,
    guidelinesMarkdown: DIRECTOR_ADVANCED_GUIDELINES,
    status: "accepted",
    /* Observed as "23h 38m" at screenshot time. Relative so it still ticks. */
    acceptedDeadline: fromNow(23 * HOURS + 38 * MINUTES),
    perks: lockedPerks,
    onboarding: onboardingStep1,
  },
  {
    id: "openart-chat-basic",
    brandId: "openart",
    name: "Chat Basic",
    slug: "chat-basic",
    headlineRateCentsPerThousand: 500,
    payTiers: [
      { minViews: 0, maxViews: 2000, rateCentsPerThousand: 200 },     // assumed
      { minViews: 2000, maxViews: null, rateCentsPerThousand: 500 },
    ],
    creatorCount: 288,      // assumed
    totalBudgetCents: 200_000, // assumed
    postCount: 640,         // assumed
    guidelinesUrl: NOTION,
    guidelinesMarkdown: GENERIC_GUIDELINES,
    status: "available",
    perks: lockedPerks,
    onboarding: onboardingStep1,
  },
  {
    id: "openart-chat-advanced",
    brandId: "openart",
    name: "Chat Advanced",
    slug: "chat-advanced",
    headlineRateCentsPerThousand: 600,
    payTiers: [
      { minViews: 0, maxViews: 2000, rateCentsPerThousand: 250 },     // assumed
      { minViews: 2000, maxViews: null, rateCentsPerThousand: 600 },
    ],
    creatorCount: 173,      // assumed
    totalBudgetCents: 300_000, // assumed
    postCount: 402,         // assumed
    guidelinesUrl: NOTION,
    guidelinesMarkdown: GENERIC_GUIDELINES,
    status: "available",
    perks: lockedPerks,
    onboarding: onboardingStep1,
  },
  {
    id: "openart-challenges",
    brandId: "openart",
    name: "Challenges",
    slug: "challenges",
    headlineRateCentsPerThousand: 0,
    payTiers: [],
    creatorCount: 96,       // assumed
    totalBudgetCents: 100_000, // assumed
    postCount: 210,         // assumed
    guidelinesUrl: NOTION,
    guidelinesMarkdown: GENERIC_GUIDELINES,
    status: "available",
    listBadge: { kind: "live" },
    perks: [],
    onboarding: onboardingStep1,
  },
  {
    id: "openart-bounties",
    brandId: "openart",
    name: "Bounties",
    slug: "bounties",
    headlineRateCentsPerThousand: 0,
    payTiers: [],
    creatorCount: 54,       // assumed
    totalBudgetCents: 100_000,
    postCount: 88,          // assumed
    guidelinesUrl: NOTION,
    guidelinesMarkdown: GENERIC_GUIDELINES,
    status: "available",
    listBadge: { kind: "bounty", amountCents: 100_000 },
    perks: [],
    onboarding: onboardingStep1,
  },
];

/* Populated variant: same campaigns, perks unlocked, onboarding complete. */
export const OPENART_CAMPAIGNS_ACTIVE: Campaign[] = OPENART_CAMPAIGNS.map((c) => ({
  ...c,
  perks: c.perks.length ? unlockedPerks : [],
  onboarding: onboardingDone,
}));

export function campaignsForBrand(all: Campaign[], brandId: string) {
  return all.filter((c) => c.brandId === brandId);
}

export function campaignBySlug(all: Campaign[], brandId: string, slug: string) {
  return all.find((c) => c.brandId === brandId && c.slug === slug);
}

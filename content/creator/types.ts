/* Fixture shapes for the creator app prototype. Mirrors DATA-MODEL.md with
   one deliberate deviation: money fields are suffixed `Cents` and hold
   integer cents (DATA-MODEL.md's own "store money as integer cents" rule),
   rather than the `Usd` suffix the sketch used. One formatter renders all
   of them — see lib/format.ts.

   Anything marked `assumed` was not observable in the screenshots. */

// ---------- creator ----------

export type Rank =
  | "unranked"
  | "copper"
  | "bronze"   // assumed beyond copper
  | "silver"   // assumed
  | "gold"     // assumed
  | "platinum"; // assumed

export interface CreatorProfile {
  handle: string;
  displayName: string;
  avatarUrl: string | null;     // null renders initials
  rank: Rank;
  xp: number;
  xpToNextRank: number;         // observed: 500 to Copper
  nextRank: Rank;
  streakDays: number;           // observed: 1
  discordConnected: boolean;    // observed: false
}

// ---------- brands & campaigns ----------

export type BadgeKind = "accepted" | "bounty" | "xpMultiplier" | "live";

export interface Badge {
  kind: BadgeKind;
  amountCents?: number;         // bounty
  multiplier?: number;          // xpMultiplier
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  campaignCount: number;
  headlineRateCentsPerThousand: number;
  badges: Badge[];
  joined: boolean;              // drives "My Brands" vs "Brands"
  /* No brand art was sourced. Artwork is a deterministic gradient keyed
     off `id` (see lib/brand-art.ts); this is the wordmark drawn over it. */
  wordmark: string;
}

export interface PayTier {
  minViews: number;
  maxViews: number | null;      // null = open-ended top tier
  rateCentsPerThousand: number;
}

export interface CampaignPerk {
  id: string;
  label: string;                // "Free Code", "Advanced Submit"
  requiredStreakDays: number;   // 3, 14
  currentStreakDays: number;
  unlocked: boolean;
}

export interface OnboardingStep {
  label: string;                // "Link an account", "Make your first post"
  complete: boolean;
  locked: boolean;
}

export type CampaignStatus = "available" | "accepted" | "ended";

export interface Campaign {
  id: string;
  brandId: string;
  name: string;                 // "Director Advanced"
  slug: string;
  headlineRateCentsPerThousand: number; // the TOP tier rate, not the entry rate
  payTiers: PayTier[];
  creatorCount: number;         // observed: 421
  totalBudgetCents: number;     // observed: 3500
  postCount: number;            // observed: 990 — label assumed
  guidelinesUrl: string;        // Notion
  guidelinesMarkdown: string;   // rendered inline in GuidelinesPanel
  status: CampaignStatus;
  acceptedDeadline?: string;    // ISO — drives the 23h 38m countdown
  /* Sidebar list entries that are not rate-bearing campaigns
     (Challenges, Bounties) carry a badge instead of a rate. */
  listBadge?: Badge;
  perks: CampaignPerk[];
  onboarding: OnboardingStep[];
}

// ---------- missions ----------

export type MissionKind = "newCreatorBonus" | "daily";

export interface Mission {
  id: string;
  kind: MissionKind;
  eyebrow: string;
  title: string;
  reward: { type: "cents" | "xp"; amount: number };
  progress: { current: number; total: number };
  expiresAt?: string;           // ISO — drives "14d left"
}

// ---------- rank ladder milestones ----------
// Distinct from `Mission` above (the campaign-index bonus/daily cards).
// These back the checklist in the Missions tab of the Rank Ladder modal —
// one-time XP awards for lifetime milestones, not renewing daily tasks.

export type MilestoneCategory =
  | "account"
  | "posts"
  | "views"
  | "campaign"
  | "earnings"
  | "bounty";

export interface Milestone {
  id: string;
  category: MilestoneCategory;
  title: string;
  rewardXp: number;
  progress: { current: number; total: number }; // current >= total => complete
}

// ---------- submissions ----------

export type SubmissionStatus = "pending" | "approved" | "rejected" | "paid";
export type Platform = "tiktok" | "instagram" | "youtube"; // assumed set

export interface Submission {
  id: string;
  campaignId: string;
  platform: Platform;
  postUrl: string;
  views: number;
  earningsCents: number;
  status: SubmissionStatus;
  submittedAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

// ---------- earnings ----------

export interface EarningsSummary {
  confirmedCents: number;
  estimatedCents: number;
  totalCents: number;
  totalViews: number;
  windowDays: 7 | 30 | 90;      // observed: 30
  series: { date: string; amountCents: number }[];
}

// ---------- leaderboard ----------
// One shape serves both the Earnings "Top Earners" panel and the campaign
// "Creators" rail.

export interface LeaderboardEntry {
  position: number;
  handle: string;
  avatarUrl: string | null;     // null renders initials, as seen for AC / CJ / M / T
  streakDays?: number;
  earnedCents: number;
  posts: number;
}

export interface Leaderboard {
  scope: "allTime" | "campaign";
  metric: "earned" | "posts";
  entries: LeaderboardEntry[];
}

// ---------- courses ----------

export interface Course {
  id: string;
  order: number;
  title: string;                // "Essentials"
  lessonCount: number;
  durationMinutes: number;
  completedLessons: number;
}

// ---------- retainers ----------

export interface RetainerStatus {
  streakDays: number;           // observed: 1
  requiredDays: number;         // observed: 14
  unlocked: boolean;
}

// ---------- fixture set ----------
// Everything a screen can ask for, for one creator state. The ?state=
// switch swaps the whole object.

export interface CreatorFixtures {
  profile: CreatorProfile;
  brands: Brand[];
  campaigns: Campaign[];
  missions: Mission[];
  milestones: Milestone[];
  submissions: Submission[];
  earnings: EarningsSummary;
  topEarners: Leaderboard;
  courses: Course[];
  retainer: RetainerStatus;
}

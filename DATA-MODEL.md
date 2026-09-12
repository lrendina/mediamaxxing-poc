# DATA-MODEL.md

Fixture shapes for the creator app prototype. Everything lives in `content/creator/` as typed
objects. No fetching, no state persistence.

Values marked `// assumed` were not observable in the screenshots. Keep them plausible and
keep them flagged.

```ts
// ---------- creator ----------

export type Rank =
  | 'unranked' | 'copper' | 'bronze' | 'silver' | 'gold' | 'platinum' // assumed beyond copper

export interface CreatorProfile {
  handle: string
  displayName: string
  avatarUrl: string
  rank: Rank
  xp: number
  xpToNextRank: number          // observed: 500 to Copper
  nextRank: Rank
  streakDays: number            // observed: 1
  discordConnected: boolean     // observed: false
}

// ---------- brands & campaigns ----------

export type BadgeKind = 'accepted' | 'bounty' | 'xpMultiplier' | 'live'

export interface Badge {
  kind: BadgeKind
  amountUsd?: number            // bounty
  multiplier?: number           // xpMultiplier
}

export interface Brand {
  id: string
  name: string                  // Pump.fun, Speed, 11Eleven Creative, Lovable, OpenArt
  slug: string
  logoUrl: string
  artworkUrl: string            // 16:9 card art
  campaignCount: number
  headlineRatePerThousand: number
  badges: Badge[]
  joined: boolean               // drives "My Brands" vs "Brands"
}

export interface PayTier {
  minViews: number
  maxViews: number | null       // null = open-ended top tier
  ratePerThousand: number
}

export interface Campaign {
  id: string
  brandId: string
  name: string                  // "Director Advanced"
  slug: string
  headlineRatePerThousand: number   // the TOP tier rate, not the entry rate
  payTiers: PayTier[]
  creatorCount: number          // observed: 421
  totalBudgetUsd: number        // observed: 3500
  postCount: number             // observed: 990 — label assumed
  guidelinesUrl: string         // Notion
  guidelinesMarkdown: string    // rendered inline in GuidelinesPanel
  status: 'available' | 'accepted' | 'ended'
  acceptedDeadline?: string     // ISO — drives the 23h 38m countdown
  perks: CampaignPerk[]
  onboarding: OnboardingStep[]
}

export interface CampaignPerk {
  id: string
  label: string                 // "Free Code", "Advanced Submit"
  requiredStreakDays: number    // 3, 14
  currentStreakDays: number
  unlocked: boolean
}

export interface OnboardingStep {
  label: string                 // "Link an account", "Make your first post"
  complete: boolean
  locked: boolean
}

// ---------- missions ----------

export interface Mission {
  id: string
  kind: 'newCreatorBonus' | 'daily'
  eyebrow: string
  title: string
  reward: { type: 'usd' | 'xp'; amount: number }
  progress: { current: number; total: number }
  expiresAt?: string            // ISO — drives "14d left"
}

// ---------- submissions ----------

export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'paid'
export type Platform = 'tiktok' | 'instagram' | 'youtube'   // assumed set

export interface Submission {
  id: string
  campaignId: string
  platform: Platform
  postUrl: string
  thumbnailUrl: string
  views: number
  earningsUsd: number
  status: SubmissionStatus
  submittedAt: string
  reviewedAt?: string
  rejectionReason?: string
}

// ---------- earnings ----------

export interface EarningsSummary {
  confirmedUsd: number
  estimatedUsd: number
  totalUsd: number
  totalViews: number
  windowDays: 7 | 30 | 90       // observed: 30
  series: { date: string; amountUsd: number }[]
}

// ---------- leaderboard ----------
// One shape serves both the Earnings "Top Earners" panel and the campaign "Creators" rail.

export interface LeaderboardEntry {
  position: number
  handle: string
  avatarUrl: string | null      // null renders initials, as seen for AC / CJ / M / T
  streakDays?: number
  earnedUsd: number
  posts: number
}

export interface Leaderboard {
  scope: 'allTime' | 'campaign'
  metric: 'earned' | 'posts'
  entries: LeaderboardEntry[]
}

// ---------- courses ----------

export interface Course {
  id: string
  order: number
  title: string                 // "Essentials"
  thumbnailUrl: string
  lessonCount: number
  durationMinutes: number
  completedLessons: number
}

// ---------- retainers ----------

export interface RetainerStatus {
  streakDays: number            // observed: 1
  requiredDays: number          // observed: 14
  unlocked: boolean
}
```

## Fixture requirements

- **Two profiles.** `newCreator` reproduces the observed state exactly: unranked, 0 XP,
  1-day streak, Discord disconnected, no submissions, $0 earnings. `activeCreator` is the
  populated counterpart for `?state=populated`.
- **Leaderboard.** Use the observed handles and figures from the Earnings screenshot. They are
  public in the app and they make the prototype feel real. Three entries have no avatar and
  render as initials — keep that, it's a state the component has to handle.
- **Five brands minimum.** OpenArt (joined, accepted campaign, live countdown), Pump.fun
  (4 campaigns, $7/1K), Speed (2 campaigns, $6/1K, 2x XP), 11Eleven Creative, Lovable (bounty).
  Pad to 12 to match the observed "Brands · 12" count.
- **OpenArt campaign family.** Director Basic $3/1K, Director Advanced $3.5/1K, Chat Basic
  $5/1K, Chat Advanced $6/1K, plus Challenges and Bounties entries. Director Advanced carries
  the two-tier pay table and the full guidelines body.
- **Artwork.** We don't have their brand art. Generate deterministic CSS gradients keyed off
  brand id rather than sourcing stock images or AI art. A flat gradient with the brand
  wordmark over it reads as intentional; a mismatched stock photo reads as a mistake.
- **Money and dates.** Store money as integer cents, render with a single shared formatter.
  Store dates as ISO strings and compute countdowns at render so `23h 38m` stays live.

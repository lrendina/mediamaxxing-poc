import type { CreatorProfile, Rank } from "./types";

/* Deviation from the CREATOR-APP.md "Unranked, 0 XP" observed state, per
   explicit product request: account creation now grants a 25 XP signup
   bonus, so a brand-new account is Unranked at 25 XP rather than 0. One-day
   streak and disconnected Discord are still the observed values. */
export const newCreator: CreatorProfile = {
  handle: "lorenzo",
  displayName: "Lorenzo",
  avatarUrl: null,
  rank: "unranked",
  xp: 25,
  xpToNextRank: 475,
  nextRank: "copper",
  streakDays: 1,
  discordConnected: false,
};

/* Populated counterpart for ?state=populated. xp/xpToNextRank were already
   assumed and are kept as-is; rank/nextRank are corrected to Bronze/Silver
   to match RANK_THRESHOLDS below (1,000 <= 3,240 < 5,000) — the earlier
   Silver/Gold pairing predates having real thresholds and no longer
   reconciles. */
export const activeCreator: CreatorProfile = {
  handle: "lorenzo",
  displayName: "Lorenzo",
  avatarUrl: null,
  rank: "bronze",
  xp: 3240,              // assumed
  xpToNextRank: 1760,    // assumed
  nextRank: "silver",
  streakDays: 17,        // assumed — past the 14-day retainer gate
  discordConnected: true,
};

export const RANK_LABEL: Record<Rank, string> = {
  unranked: "Unranked",
  copper: "Copper",
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
};

/* Cumulative total XP required to unlock each rank — from a screenshot of
   the live Rank Ladder (Sept 2026). Supersedes the "assumed beyond Copper"
   note in DATA-MODEL.md/CREATOR-APP.md; these are now observed values. */
export const RANK_THRESHOLDS: Record<Rank, number> = {
  unranked: 0,
  copper: 500,
  bronze: 1000,
  silver: 5000,
  gold: 25000,
  platinum: 50000,
};

export const RANK_ORDER: Rank[] = ["unranked", "copper", "bronze", "silver", "gold", "platinum"];

/* Per-rank medallion tint. Palette addition, pre-approved for this
   feature (see CREATOR-APP.md) rather than matched to a screenshot photo. */
export const RANK_SWATCH: Record<Rank, { tile: string; ring: string }> = {
  unranked: { tile: "bg-surface-sunk text-muted", ring: "border-border-strong" },
  copper: { tile: "bg-rank-copper-sunk text-rank-copper", ring: "border-rank-copper" },
  bronze: { tile: "bg-rank-bronze-sunk text-rank-bronze", ring: "border-rank-bronze" },
  silver: { tile: "bg-rank-silver-sunk text-rank-silver", ring: "border-rank-silver" },
  gold: { tile: "bg-rank-gold-sunk text-rank-gold", ring: "border-rank-gold" },
  platinum: { tile: "bg-rank-platinum-sunk text-rank-platinum", ring: "border-rank-platinum" },
};

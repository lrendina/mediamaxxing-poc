import type { CreatorProfile } from "./types";

/* Observed: a brand-new account. Unranked, 0 XP, 500 to Copper, one-day
   streak, Discord not connected. */
export const newCreator: CreatorProfile = {
  handle: "lorenzo",
  displayName: "Lorenzo",
  avatarUrl: null,
  rank: "unranked",
  xp: 0,
  xpToNextRank: 500,
  nextRank: "copper",
  streakDays: 1,
  discordConnected: false,
};

/* Populated counterpart for ?state=populated. Every value assumed. */
export const activeCreator: CreatorProfile = {
  handle: "lorenzo",
  displayName: "Lorenzo",
  avatarUrl: null,
  rank: "silver",        // assumed
  xp: 3240,              // assumed
  xpToNextRank: 1760,    // assumed
  nextRank: "gold",      // assumed
  streakDays: 17,        // assumed — past the 14-day retainer gate
  discordConnected: true,
};

export const RANK_LABEL: Record<CreatorProfile["rank"], string> = {
  unranked: "Unranked",
  copper: "Copper",
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
};

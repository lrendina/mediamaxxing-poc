import { TOP_EARNERS as APP_TOP_EARNERS } from "@/content/creator/leaderboard";

export interface TopEarner {
  position: number;
  handle: string;
  /* A local image path, or null for the initials fallback. */
  avatarUrl: string | null;
  earnedCents: number;
}

export interface LeaderboardSection {
  heading: string;
  /* The non-typicality note. Required under the list (LANDING-PAGE.md,
     "Earnings claims"). */
  note: string;
  entries: readonly TopEarner[];
}

/* LANDING-PAGE.md, Section 3a. Read straight from the creator app's "Top
   Earners · All Time" panel (content/creator/leaderboard.ts), never retyped.
   Post counts are dropped: the app never showed them, so they are assumed
   and stay off the marketing page. No avatar photos exist, so the app's
   "placeholder" sentinel becomes null and every row renders initials. */
export const LEADERBOARD: LeaderboardSection = {
  heading: "Real creators, real payouts",
  note: "These are the platform's highest earners, not typical results.",
  entries: [...APP_TOP_EARNERS.entries]
    .sort((a, b) => a.position - b.position)
    .slice(0, 8)
    .map(({ position, handle, avatarUrl, earnedCents }) => ({
      position,
      handle,
      avatarUrl: avatarUrl === "placeholder" ? null : avatarUrl,
      earnedCents,
    })),
};

import { LEADERBOARD } from "@/content/leaderboard";
import { formatUsd } from "@/lib/format";

const topEarner = LEADERBOARD.entries.find((entry) => entry.position === 1);
if (!topEarner) {
  throw new Error("content/claims: the leaderboard has no #1 entry to substantiate the headline");
}

/* The substantiation line (LANDING-PAGE.md, "Earnings claims"). Required
   under the hero CTA and again under the final CTA, so both import it from
   here. The figure is read from the leaderboard's #1 entry rather than
   typed, so the claim and the proof further down the page cannot disagree. */
export const SUBSTANTIATION_LINE = `Our top creator has earned ${formatUsd(topEarner.earnedCents)}. Most earn far less — see the full numbers below.`;

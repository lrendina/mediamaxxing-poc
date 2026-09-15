import type { SourceMeta } from "./types";

/* Platform-level facts and figures, sorted by how far they can be trusted.
   The creator-app fixtures stay in content/creator/ (that surface is kept),
   so they are pointed at rather than copied, to avoid two diverging copies. */

export { TOP_EARNERS } from "@/content/creator/leaderboard";

export const TOP_EARNERS_META: SourceMeta = {
  provenance: "creator-app",
  from: ["content/creator/leaderboard.ts"],
  note:
    "Handles and dollar figures observed on /creator/earnings \"Top Earners · All Time\". Post " +
    "counts assumed. No avatar images exist. #1 steven at $153,823 is the figure " +
    "LANDING-PAGE.md's substantiation line uses.",
};

export const OBSERVED_BRANDS_META: SourceMeta = {
  provenance: "creator-app",
  from: ["content/creator/brands.ts"],
  note:
    "The five brands observed on the campaigns index. The other seven in brands.ts are padding " +
    "the old build invented to fill the grid — never use them on the marketing page. No logo " +
    "files exist for any of them.",
};

export const OBSERVED_BRANDS = ["OpenArt", "Pump.fun", "Speed", "11Eleven Creative", "Lovable"];

export const PAID_OUT_META: SourceMeta = {
  provenance: "live-site",
  from: ["content/blog.ts"],
  note: "Stated in two live blog excerpts. The only sourced platform-wide payout figure.",
};

export const PAID_OUT = "over $1M";

export const REVIEW_WINDOW_META: SourceMeta = {
  provenance: "unknown",
  from: ["content/creator/campaigns.ts", "content/creator/ui.ts", "content/faq.ts"],
  note:
    "The repo says 48 hours in three places: a campaign guidelines fixture, the submissions " +
    "callout (marked assumed wording), and a placeholder FAQ answer. LANDING-PAGE.md says " +
    "\"Reviewed in 7 days\". Neither has a recorded source.",
};

export const REVIEW_WINDOW_IN_REPO = "Submissions are reviewed within 48 hours.";

export const INVENTED_FIGURES_META: SourceMeta = {
  provenance: "invented",
  from: [
    "content/counters.ts",
    "components/original/RightRail.tsx",
    "app/(marketing)/styleguide/page.tsx",
  ],
  note:
    "Round-number stand-ins and demo figures with no source. Kept only so the record is " +
    "complete. Do not publish any of these.",
};

export const INVENTED_FIGURES = {
  heroCounters: [
    { value: 5_200, suffix: "+", label: "Creators earned" },
    { value: 12, prefix: "$", suffix: "M+", label: "Paid to creators" },
    { value: 4.9, suffix: "★", label: "Creator rating" },
  ],
  heroCountersA11yLabel: "Platform totals",
  rightRail: {
    paidThisMonthLabel: "Paid to creators this month",
    paidThisMonthValue: 1_204_908,
    acrossCreators: "Across 342 creators",
  },
  styleguideSamples: [
    {
      value: "$1.2M",
      label: "Paid to creators this month",
      body: "The number keeps climbing — updated as payouts land.",
    },
    {
      value: "342",
      label: "Creators earning right now",
      body: "Median payout is up 41% year over year.",
    },
  ],
};

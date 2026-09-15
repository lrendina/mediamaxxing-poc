import type { SourceMeta } from "./types";

/* The live site's homepage copy as the old build held it. LANDING-PAGE.md
   supplies new hero and step copy; these are kept as the record of what the
   live site says, not as the copy to ship. */

export const HERO_META: SourceMeta = {
  provenance: "live-site",
  from: ["content/hero.ts"],
  note:
    "Marked verbatim in the old build. The live headline italicised \"Per View\"; the old " +
    "build stripped it per the kill list. CTA hrefs were ours and are omitted.",
};

export const HERO = {
  headline: "Create Content & Get Paid Per View",
  subhead:
    "Join campaigns, use proven viral templates, and earn based on your content's performance.",
  primaryCtaLabel: "Start creating",
  secondaryCtaLabel: "For brands",
};

export const PROOF_HEADLINE_META: SourceMeta = {
  provenance: "live-site",
  from: ["content/hero.ts"],
  note: "The live site italicised \"real\"; stripped per the kill list.",
};

export const PROOF_HEADLINE = "Real creators, real income";

export const STEPS_META: SourceMeta = {
  provenance: "live-site",
  from: ["content/steps.ts"],
  note:
    "Headline marked verbatim; the live site italicised \"three simple steps\". Step copy " +
    "carries no separate note.",
};

export const STEPS_HEADLINE = "Start earning in three simple steps";

export const STEPS = [
  {
    title: "Browse Campaigns",
    description:
      "Explore available brand campaigns with ready-to-use viral templates designed for guaranteed views.",
  },
  {
    title: "Create Content",
    description:
      "Follow step-by-step tutorials that show you exactly how to recreate already-viral videos. No experience needed.",
  },
  {
    title: "Earn Per View",
    description:
      "Get paid for the views your content generates. Our proven templates help even beginners start earning right away.",
  },
];

export const FOOTER_CTA_META: SourceMeta = {
  provenance: "unknown",
  from: ["content/hero.ts"],
  note:
    "Not marked verbatim, and \"Turn your feed into a paycheck\" reads like the feed concept's " +
    "own copy. \"Weekly payouts\" is an unverified claim. The eyebrow is all-caps-eyebrow " +
    "territory on the kill list.",
};

export const FOOTER_CTA = {
  eyebrow: "For creators",
  headline: "Turn your feed into a paycheck.",
  body: "Free to join. Weekly payouts. No résumé, no follower count.",
  ctaLabel: "Start creating",
};

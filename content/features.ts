export interface Feature {
  /* The H3. Benefit leads. */
  benefit: string;
  /* The body under it. Feature supports. */
  feature: string;
}

export interface FeaturesSection {
  heading: string;
  features: readonly Feature[];
}

/* LANDING-PAGE.md, Section 2b. Verbatim. CTA #2 sits under the grid and
   takes its label from content/cta.ts. */
export const FEATURES: FeaturesSection = {
  heading: "The hard parts are already done",
  features: [
    {
      benefit: "You never pitch a brand",
      feature: "Campaigns are negotiated and live before you see them. Join one and start filming.",
    },
    {
      benefit: "You never stare at a blank screen",
      feature:
        "Every campaign includes proven templates and step-by-step tutorials for recreating videos that already worked.",
    },
    {
      benefit: "You don't need an audience",
      feature: "Post to your own accounts at any size. Pay is based on views, not followers.",
    },
    {
      benefit: "You never send an invoice",
      feature: "Views are tracked automatically and payouts run on their own. No chasing, no middlemen.",
    },
  ],
};

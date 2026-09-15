export interface FinalCtaContent {
  headline: string;
  body: string;
}

/* LANDING-PAGE.md, Section 6. The label comes from content/cta.ts. Replaces
   the old build's
   "Turn your feed into a paycheck" band, on record in
   content/source/homepage.ts. */
export const FINAL_CTA: FinalCtaContent = {
  headline: "Your first campaign is five minutes away",
  body: "Free to join. No followers required. Get paid for every view.",
};

export type Step = {
  title: string;
  description: string;
};

/* Section headline on the live site is "Start earning in three simple steps",
   which the PLAN's [HUMAN] copy pass flags as reading flat without the
   italicized "three simple steps" the original design leaned on.
   Provided here verbatim — replace before Phase 5 ships. */
export const STEPS_HEADLINE_VERBATIM =
  "Start earning in three simple steps";

export const STEPS: Step[] = [
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

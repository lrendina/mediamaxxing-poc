import { TESTIMONIALS as SOURCE_TESTIMONIALS } from "@/content/source/creators";

export type Tier = "Beginner" | "Intermediate" | "Advanced";

export interface TestimonialStat {
  label: string;
  value: string;
  /* Money values get the expanded numeral treatment. */
  expanded?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  tier: Tier;
  /* Pre-formatted, exactly as published: "$100,227". */
  earnings: string;
  dashboardSrc: string;
  phoneSrc: string;
  stats: readonly TestimonialStat[];
  /* The whole story. Cards clamp it to two lines; the lightbox shows it all. */
  blurb: string;
}

/* LANDING-PAGE.md, Section 3b. The eight live-site testimonials, read from
   content/source/creators.ts rather than copied, so every name, figure and
   story exists once. Top earner first. The range runs $100,227 down to
   $8,227, the spread "Earnings claims" rule 3 asks for. These figures
   disagree with the leaderboard (Steven $100,227 here, $153,823 there);
   keeping both as they are was decided 2026-09-15. */
export const TESTIMONIALS: readonly Testimonial[] = SOURCE_TESTIMONIALS;

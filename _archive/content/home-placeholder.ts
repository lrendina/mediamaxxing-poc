import type { SectionTone } from "@/components/Section";

/* Labels for the Phase 2 shell preview at /. One labelled placeholder per
   LANDING-PAGE.md section, in spec order, so the header, sticky header,
   section rhythm and footer can be reviewed before any section exists.
   Phase 5 replaces this file and app/(marketing)/page.tsx. */

export interface PlaceholderSection {
  id: string;
  label: string;
  tone: SectionTone;
  hidesStickyHeader?: boolean;
}

export const HOME_PLACEHOLDER_SECTIONS: PlaceholderSection[] = [
  { id: "hero", label: "Hero — placeholder until Phase 5", tone: "canvas", hidesStickyHeader: true },
  { id: "how-it-works", label: "The solution: three steps — placeholder until Phase 5", tone: "canvas" },
  { id: "features", label: "The solution: feature grid — placeholder until Phase 5", tone: "canvas" },
  { id: "proof", label: "Social proof: leaderboard and testimonials — placeholder until Phase 5", tone: "canvas" },
  { id: "trust", label: "Guarantee and trust — placeholder until Phase 5", tone: "canvas" },
  { id: "faq", label: "FAQ — placeholder until Phase 5", tone: "canvas" },
  { id: "final-cta", label: "Final CTA — placeholder until Phase 5", tone: "dark", hidesStickyHeader: true },
];

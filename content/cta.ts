export interface Cta {
  label: string;
  href: string;
}

/* The one CTA. Every call to action on the marketing surface imports this:
   header, sticky header, hero, the section CTAs and the final CTA. One
   label, one destination (LANDING-PAGE.md, "Persistent CTA"). */
export const CTA: Cta = {
  label: "Start earning — it's free",
  href: "/auth",
};

export interface Cta {
  label: string;
  href: string;
}

/* The one CTA. Every call to action on the marketing surface imports this:
   header, sticky header, hero, the section CTA and the final CTA. One
   label, one destination (LANDING-PAGE.md, "Persistent CTA"). The
   destination is the creator app's campaigns screen with its first-run
   welcome modal open; the prototype has no sign-up to put in between. */
export const CTA: Cta = {
  label: "Start earning — it's free",
  href: "/creator/campaigns?welcome=1",
};

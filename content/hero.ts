export interface TrustBrand {
  name: string;
  /* Local logo path. None exist yet, so every brand renders as a named
     placeholder. */
  src?: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  /* Separate items: the page divides them with thin rules, never a
     middle-dot string. */
  frictionStrip: readonly string[];
  trustBrands: readonly TrustBrand[];
}

/* LANDING-PAGE.md, Section 1. Verbatim. The CTA label comes from
   content/cta.ts and the substantiation line from content/claims.ts. The
   live site's hero copy stays on record in content/source/homepage.ts.
   Trust brands are the five observed in the creator app (OBSERVED_BRANDS in
   content/source/platform.ts), in the spec's order. */
export const HERO: HeroContent = {
  headline: "Make six figures from your phone",
  subheadline:
    "Brands pay you for every view. The campaigns are already signed, the video templates already work, and you can post your first one tonight.",
  frictionStrip: ["Free to join", "No followers needed", "First campaign in under five minutes"],
  trustBrands: [
    { name: "OpenArt" },
    { name: "Pump.fun" },
    { name: "Speed" },
    { name: "Lovable" },
    { name: "11Eleven Creative" },
  ],
};

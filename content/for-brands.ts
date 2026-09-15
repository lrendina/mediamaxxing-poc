export type HeroCounter = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

/* Copy pulled verbatim from mediamaxxing.com/for-brands, with two kill-list
   modifications: italicized single-word emphasis is stripped ("Drive Growth
   with Authentic Content" instead of "Drive _Growth_ with Authentic
   Content"), and the 01/02/03 step markers are dropped since the site's
   brands "how it works" isn't the MCP ordered flow the kill list allows. */

export const BRANDS_HERO = {
  headlineVerbatim: "Drive Growth with Authentic Content",
  subhead:
    "Partner with our creator network to produce high-performing content that converts. Real results with proven viral templates.",
  primaryCta:   { label: "Join the waitlist", href: "#waitlist"      },
  secondaryCta: { label: "Learn more",        href: "#how-it-works"  },
};

export const BRANDS_STEPS_HEADLINE_VERBATIM =
  "How It Works — From application to viral content";

export type BrandStep = {
  title: string;
  description: string;
};

export const BRANDS_STEPS: BrandStep[] = [
  {
    title: "Join the Waitlist",
    description:
      "Tell us about your app, your audience, and your goals. Spots are limited, so the sooner you're on the list, the sooner you launch.",
  },
  {
    title: "Get Matched with Creators",
    description:
      "Once you're off the waitlist, our team hand-picks the creators from our network who fit your brand and convert your audience.",
  },
  {
    title: "Content Goes Viral",
    description:
      "Creators run your campaign on our proven templates, content built to rack up views and drive real downloads.",
  },
  {
    title: "Pay Per View & Scale",
    description:
      "You only pay for the views you get. Track performance in real time and pour budget into what's already working.",
  },
];

export type BrandFeature = {
  title: string;
  body: string;
};

export const BRANDS_FEATURES_HEADING = "What brands get";

export const BRANDS_FEATURES: BrandFeature[] = [
  {
    title: "Templates that print views",
    body:
      "Skip the guesswork. Your campaign launches on viral formats already proven to generate millions of views and convert.",
  },
  {
    title: "A network on tap",
    body:
      "Hand-picked creators with real track records of going viral and driving app downloads, ready to run your campaign on day one.",
  },
];

/* Values are extractable from the live site's copy directly (100M+, 30k+),
   unlike the homepage headline counters which were 0-placeholder-JS. */
export const BRANDS_COUNTERS: HeroCounter[] = [
  { value: 100, suffix: "M+", label: "Average views per brand" },
  { value: 30,  suffix: "k+", label: "Active creators"          },
];

export const BRANDS_FOOTER_CTA = {
  eyebrowVerbatim: "For brands",
  headlineVerbatim: "Spots are limited. Get in line.",
  body:
    "We onboard a handful of new brands at a time so every campaign gets the right creators. Join the waitlist now to lock your spot.",
  ctaLabel: "Join the waitlist",
  ctaHref:  "#waitlist",
};

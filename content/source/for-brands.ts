import type { SourceMeta } from "./types";

export const FOR_BRANDS_META: SourceMeta = {
  provenance: "live-site",
  from: ["content/for-brands.ts"],
  note:
    "Pulled verbatim from mediamaxxing.com/for-brands with two kill-list changes in the old " +
    "build: italic emphasis stripped (\"Drive _Growth_ with Authentic Content\"), 01/02/03 step " +
    "markers dropped. The 100M+ and 30k+ figures appear in the live copy.",
};

export const BRANDS_HERO = {
  headline: "Drive Growth with Authentic Content",
  subhead:
    "Partner with our creator network to produce high-performing content that converts. Real results with proven viral templates.",
  primaryCtaLabel: "Join the waitlist",
  secondaryCtaLabel: "Learn more",
};

export const BRANDS_STEPS_HEADLINE = "How It Works — From application to viral content";

export const BRANDS_STEPS = [
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

export const BRANDS_FEATURES_HEADING = "What brands get";

export const BRANDS_FEATURES = [
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

export const BRANDS_STATS = [
  { value: 100, suffix: "M+", label: "Average views per brand" },
  { value: 30, suffix: "k+", label: "Active creators" },
];

export const BRANDS_FOOTER_CTA = {
  eyebrow: "For brands",
  headline: "Spots are limited. Get in line.",
  body:
    "We onboard a handful of new brands at a time so every campaign gets the right creators. Join the waitlist now to lock your spot.",
  ctaLabel: "Join the waitlist",
};

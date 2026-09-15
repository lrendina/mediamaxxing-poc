import type { SourceMeta } from "./types";

export type SourceTier = "Beginner" | "Intermediate" | "Advanced";

export type SourceStat = {
  label: string;
  value: string;
  expanded?: boolean;
};

export type SourceTestimonial = {
  id: string;
  name: string;
  handle: string;
  tier: SourceTier;
  earnings: string;
  dashboardSrc: string;
  phoneSrc: string;
  stats: SourceStat[];
  blurb: string;
};

export const TESTIMONIALS_META: SourceMeta = {
  provenance: "live-site",
  from: ["content/creators.ts"],
  note:
    "The old README credits the figures and blurbs to the live site. Stats were middle-dot " +
    "strings there; the old build split them into label/value pairs. Earnings and handles " +
    "disagree with the creator-app leaderboard (Steven $100,227 here vs $153,823 there) — " +
    "see INVENTORY.md content flags before quoting either.",
};

/* Ordered top earner first, as in the old build. */
export const TESTIMONIALS: SourceTestimonial[] = [
  {
    id: "steven",
    name: "Steven",
    handle: "stee.ugc",
    tier: "Advanced",
    earnings: "$100,227",
    dashboardSrc: "/proof/creators/steven/dashboard.png",
    phoneSrc: "/proof/creators/steven/phone.jpg",
    stats: [
      { label: "Accounts", value: "17" },
      { label: "Posts", value: "5,900" },
      { label: "Per day", value: "50" },
    ],
    blurb:
      "Scaled a 17-account content machine to over 5,900 posts in under 4 months, turning MediaMaxxing into a consistent $800+/day engine.",
  },
  {
    id: "jennifer",
    name: "Jennifer",
    handle: "jennymakescontent",
    tier: "Intermediate",
    earnings: "$45,402",
    dashboardSrc: "/proof/creators/jennifer/dashboard.png",
    phoneSrc: "/proof/creators/jennifer/phone.jpg",
    stats: [
      { label: "Accounts", value: "20" },
      { label: "Views", value: "11.2M" },
      { label: "Per day", value: "15" },
    ],
    blurb:
      "Held a steady 15 posts a day for 6.5 months across 20 accounts. Consistent output, not luck, built the $45K.",
  },
  {
    id: "brayden",
    name: "Brayden",
    handle: "bray.codes",
    tier: "Advanced",
    earnings: "$42,225",
    dashboardSrc: "/proof/creators/brayden/dashboard.png",
    phoneSrc: "/proof/creators/brayden/phone.jpg",
    stats: [
      { label: "Accounts", value: "7" },
      { label: "Views", value: "24.5M" },
      { label: "Approval", value: "97%" },
    ],
    blurb:
      "Threw out the high-volume playbook. Under 5 posts a day on 7 accounts, averaging 50,000+ views per post.",
  },
  {
    id: "erica",
    name: "Erica",
    handle: "ericanocode",
    tier: "Advanced",
    earnings: "$39,304",
    dashboardSrc: "/proof/creators/erica/dashboard.png",
    phoneSrc: "/proof/creators/erica/phone.jpg",
    stats: [
      { label: "Accounts", value: "9" },
      { label: "Views", value: "8.5M" },
      { label: "Posts", value: "525" },
    ],
    blurb:
      "One of the fastest climbers on the platform. A lean 9-account setup and just 525 submissions got her to the top 6.",
  },
  {
    id: "enel",
    name: "Enel",
    handle: "noah.lousiana",
    tier: "Advanced",
    earnings: "$35,688",
    dashboardSrc: "/proof/creators/enel/dashboard.png",
    phoneSrc: "/proof/creators/enel/phone.jpg",
    stats: [
      { label: "Followers", value: "12.4K" },
      { label: "Views", value: "4.4M" },
      { label: "Per day", value: "$648", expanded: true },
    ],
    blurb:
      "At 16, Enel trained a VA team into an in-house content machine and pointed all of it at MediaMaxxing.",
  },
  {
    id: "rachael",
    name: "Rachael",
    handle: "michelletech2026",
    tier: "Intermediate",
    earnings: "$33,824",
    dashboardSrc: "/proof/creators/rachael/dashboard.png",
    phoneSrc: "/proof/creators/rachael/phone.jpg",
    stats: [
      { label: "Followers", value: "51.8K" },
      { label: "Views", value: "9.8M" },
      { label: "Per day", value: "$278", expanded: true },
    ],
    blurb:
      "Low volume, high views per post. In about 4 months she turned a 17-account footprint into a $278/day average.",
  },
  {
    id: "natalie",
    name: "Natalie",
    handle: "nattyluv_ai",
    tier: "Intermediate",
    earnings: "$30,361",
    dashboardSrc: "/proof/creators/natalie/dashboard.png",
    phoneSrc: "/proof/creators/natalie/phone.jpg",
    stats: [
      { label: "Followers", value: "1,938" },
      { label: "Views", value: "12.2M" },
      { label: "Accounts", value: "6" },
    ],
    blurb:
      "Proof you don't need an audience. Under 2,000 followers, a 1.8M-view post, and 6 accounts out-earned high-volume veterans.",
  },
  {
    id: "sam",
    name: "Sam",
    handle: "samtheog",
    tier: "Intermediate",
    earnings: "$8,227",
    dashboardSrc: "/proof/creators/sam/dashboard.png",
    phoneSrc: "/proof/creators/sam/phone.jpg",
    stats: [
      { label: "Followers", value: "1,322" },
      { label: "Views", value: "252K" },
      { label: "Per day", value: "$167", expanded: true },
    ],
    blurb:
      "Sam made his first $1,000 from a single video, then kept posting daily and scaled it from there.",
  },
];

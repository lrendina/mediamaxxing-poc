import type { SourceMeta } from "./types";

/* Strings that were hardcoded in JSX in the old build: component labels,
   the prototype disclaimer, stub page bodies, route metadata. Templates use
   {name}-style slots where the old build interpolated. */

export const COMPONENT_LABELS_META: SourceMeta = {
  provenance: "prototype",
  from: [
    "components/ProofCard.tsx",
    "components/original/ProofCard.tsx",
    "components/BlogCard.tsx",
    "components/original/BlogCard.tsx",
    "components/SiteFooter.tsx",
    "components/original/SiteFooter.tsx",
    "components/LogoLockup.tsx",
    "components/SkipToContent.tsx",
    "components/Stub.tsx",
  ],
};

export const COMPONENT_LABELS = {
  wordmark: "MediaMaxxing",
  skipToContent: "Skip to content",
  backToHomepage: "Back to homepage",
  footerDisclaimer: "Unaffiliated proof-of-concept reskin. Nothing here is a real service.",
  testimonial: {
    totalEarned: "Total earned",
    openDashboard: "Open {name}'s dashboard",
    dashboardAlt: "{name}'s earnings dashboard",
    phoneAlt: "{name}'s content on mobile",
    earnedSuffix: "earned",
    close: "Close",
  },
  blogCard: {
    readTime: "{minutes} min read",
  },
};

export const RIGHT_RAIL_META: SourceMeta = {
  provenance: "prototype",
  from: ["components/original/RightRail.tsx"],
  note: "Invented figures from the same component are in platform.ts under INVENTED_FIGURES.",
};

export const RIGHT_RAIL = {
  signupTitle: "Ready to earn?",
  signupBody: "Free to join. No résumé, no follower count.",
  emailLabel: "Email address",
  emailPlaceholder: "you@example.com",
  submit: "Continue",
  formDisclaimer: "Prototype — form is not connected.",
  earningNowHeading: "Earning right now",
};

export const DEMO_CHROME_META: SourceMeta = {
  provenance: "prototype",
  from: [
    "app/(marketing)/loud/page.tsx",
    "components/DemoVariantToggle.tsx",
    "components/DeviceIntro.tsx",
    "app/(marketing)/for-brands/page.tsx",
  ],
};

export const DEMO_CHROME = {
  loudProofSubhead:
    "Real dashboards, real phones, real handles. Click any card to see the whole screenshot.",
  demoToggleLabel: "Homepage design demo",
  demoToggleLoud: "Loud",
  demoToggleOriginal: "Original",
  deviceIntroLabel: "Homepage introduction",
  brandResultsLabel: "Brand results",
  styleguideCtaSampleBody:
    "Free to join. Weekly payouts. No résumé, no follower count. It works the way a real creator economy should.",
};

export const STUB_PAGES_META: SourceMeta = {
  provenance: "prototype",
  from: [
    "app/(marketing)/auth/page.tsx",
    "app/(marketing)/blog/page.tsx",
    "app/(marketing)/for-agencies/page.tsx",
    "app/(marketing)/mcp/page.tsx",
  ],
  note:
    "The auth body mentions a homepage sign-in card, and the for-agencies copy describes a " +
    "\"feed pattern\" — both describe the cut design.",
};

export const STUB_PAGES = {
  auth: {
    metaTitle: "Sign in — MediaMaxxing",
    metaDescription: "Stub route. Authentication is out of scope for the proof-of-concept.",
    eyebrow: "Stub route",
    title: "Sign in",
    body: [
      "Authentication is out of scope for the proof-of-concept. The homepage’s sign-in card and this route both link here so the surface exists, but there’s no functioning flow behind it.",
      "In the real product, this route would host the sign-in and sign-up flows and gate the creator dashboard behind them.",
    ],
  },
  blog: {
    metaTitle: "Blog — MediaMaxxing",
    metaDescription: "Blog card grid. Article routes aren't rendered in the proof-of-concept.",
    eyebrow: "Blog stub",
    title: "From the blog",
    body: [
      "The BlogCard primitive rendered against the three real posts on the live site. Titles, excerpts, cover images, and dates are all real — just the article bodies are missing.",
    ],
    postsLabel: "Blog posts",
    articlesNote: "Individual article pages aren’t rendered — clicking a card goes nowhere.",
  },
  forAgencies: {
    metaTitle: "For agencies — MediaMaxxing",
    metaDescription:
      "Stub route in the proof-of-concept. The real /for-agencies would follow the same feed pattern as /for-brands with agency-specific copy.",
    eyebrow: "Stub route",
    title: "For agencies",
    body: [
      "This surface isn’t built out in the proof-of-concept. The design system reads without it.",
      "In the real product, /for-agencies would follow the same feed pattern as /for-brands — hero, how it works, a features section, and a footer CTA — swapped for agency-focused copy, pricing tiers, and multi-client management value props.",
    ],
  },
  mcp: {
    metaTitle: "MCP — MediaMaxxing",
    metaDescription:
      "Stub route. The live /mcp is a complex interactive tool intentionally deferred in the POC scope.",
    eyebrow: "Deliberately deferred",
    title: "MCP",
    body: [
      "The live site’s /mcp is the most complex page in the product — tabs, a client selector, clipboard interactions, a simulated chat thread.",
      "Rebuilding it well for a proof-of-concept costs more than it proves. Building it badly is worse than not building it. It’s deliberately out of scope; see the writeup for the scope rationale.",
    ],
  },
};

export const ROUTE_METADATA_META: SourceMeta = {
  provenance: "prototype",
  from: [
    "app/layout.tsx",
    "app/(home)/layout.tsx",
    "app/(marketing)/loud/page.tsx",
    "app/(marketing)/for-brands/page.tsx",
    "app/(marketing)/styleguide/page.tsx",
  ],
  note: "The site description describes the cut three-column design.",
};

export const ROUTE_METADATA = {
  siteTitle: "MediaMaxxing",
  siteDescription:
    "A proof-of-concept reskin of mediamaxxing.com — a three-column app shell built for a design interview.",
  loudTitle: "Loud homepage (demo) — MediaMaxxing",
  loudDescription:
    "The black-and-acid-lime redesign direction, kept at /loud for an interview demo toggle against the restored default homepage.",
  forBrandsTitle: "For brands — MediaMaxxing",
  styleguideTitle: "Styleguide — MediaMaxxing",
  styleguideDescription:
    "Design tokens and every primitive with every state — the design-system review surface.",
};

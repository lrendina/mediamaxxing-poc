/* Styleguide fixtures for components/PrimitiveShowcase.tsx, which the lead
   appends to the existing /styleguide route after the pills section.

   Every label, note and specimen string the reader sees is declared here. The
   showcase pulls its real fixtures from the landing-page content modules —
   content/faq, content/leaderboard and content/creators — so this page never
   restates product copy or invents a claim.

   Two rules the showcase keeps:
   - Figures in the specimen cards and the stat rows are layout fixtures, not
     payout promises, and the leaderboard ships with its non-typicality note.
   - The FAQ shows only questions with sourced answers. */

export interface ShowcaseSectionCopy {
  id: string;
  title: string;
  note: string;
}

export const SHOWCASE_INTRO = {
  id: "primitives",
  note: "The cards, rows, lists and overlays the landing page and the creator app are built from. Everything below is a specimen: the sample copy and the sample figures show how the pieces sit together, they are not claims about the product. Nothing is restyled on this page — if a specimen looks wrong here, it is wrong in the component.",
};

/* Cards ------------------------------------------------------------------- */

export type CardVariantId = "default" | "panel" | "spotlight" | "dark";
export type CardPadId = "none" | "sm" | "md" | "lg";

export interface CardVariantCopy {
  id: CardVariantId;
  label: string;
  note: string;
}

export interface CardPadCopy {
  id: CardPadId;
  label: string;
  note: string;
}

export const CARD_SECTION = {
  id: "cards",
  title: "Cards",
  note: "Four variants and four padding steps, all resting at shadow-1. The hover lift to shadow-2 is opt-in: only testimonial cards, feature cards and badge tiles take it, and the 2px rise stops under prefers-reduced-motion.",
  specimenTitle: "Specimen card",
  specimenBody:
    "Fixture copy at the body step, so the inset above and below the text is visible at every padding.",
  variantsLabel: "Variants",
  variantsNote: "Each variant at pad md, with hover left at the library default.",
  variants: [
    {
      id: "default",
      label: "variant default",
      note: "Surface card with the hairline border and shadow-1 at rest. The workhorse.",
    },
    {
      id: "panel",
      label: "variant panel",
      note: "Recessed grouping for content inside a page section.",
    },
    {
      id: "spotlight",
      label: "variant spotlight",
      note: "Stands forward of its neighbours. One per row.",
    },
    {
      id: "dark",
      label: "variant dark",
      note: "surface-dark. Artwork frames and the final CTA band.",
    },
  ] satisfies CardVariantCopy[],
  padsLabel: "Padding",
  padsNote:
    "The sunk strip is flush with the card edge at pad none and inset by 32px at pad lg.",
  pads: [
    {
      id: "none",
      label: "pad none",
      note: "No inset. For media that meets the card edge.",
    },
    { id: "sm", label: "pad sm", note: "16px inset. Chip-sized content." },
    {
      id: "md",
      label: "pad md",
      note: "24px on mobile, 32px on desktop. The default card padding.",
    },
    {
      id: "lg",
      label: "pad lg",
      note: "24px on mobile, 32px on desktop. Kept as a compatibility size.",
    },
  ] satisfies CardPadCopy[],
  hoverLabel: "Hover",
  hoverNote:
    "Both cards are variant default at pad md. Point at each one: the left card lifts, the right card does not.",
  hoverOnLabel: "hover — shadow-1 to shadow-2 with a 2px lift",
  hoverOffLabel: "hover={false}, the default — rests at shadow-1",
};

/* Step cards -------------------------------------------------------------- */

export const STEP_SECTION = {
  id: "step-cards",
  title: "Step cards",
  note: "A step is read, not pressed, so StepCard pins itself to the resting state. The icon is optional; numbered markers are reserved for the MCP connection sequence. The copy below is a fixture — the live step wording is authored with the landing-page copy.",
  stepTitle: "Specimen step title",
  stepBody:
    "Fixture body copy, long enough to wrap at 375px, for judging the rhythm between the title and the text underneath it.",
  markerValue: "01",
  noIcon: { label: "No icon", note: "Title and body only." },
  withIcon: {
    label: "With icon",
    note: "icon set — decorative, hidden from assistive tech.",
  },
  withMarker: {
    label: "With icon and marker",
    note: "Numbered marker for the MCP connection flow only. Marketing steps leave it unset.",
  },
};

/* Feature cards ----------------------------------------------------------- */

export const FEATURE_SECTION = {
  id: "feature-cards",
  title: "Feature cards",
  note: "The two you-never cards. Title and body are quoted from LANDING-PAGE.md, unchanged. The icon is optional, so both states are shown.",
  withIcon: {
    label: "With icon",
    note: "icon set — decorative, sized by the component.",
    title: "You never pitch a brand",
    body: "Campaigns are negotiated and live before you see them. Join one and start filming.",
  },
  noIcon: {
    label: "No icon",
    note: "icon omitted. The card keeps its rhythm without it.",
    title: "You never send an invoice",
    body: "Views are tracked automatically and payouts run on their own. No chasing, no middlemen.",
  },
};

/* Badge tiles ------------------------------------------------------------- */

export const BADGE_TILE_SECTION = {
  id: "badge-tiles",
  title: "Badge tiles",
  note: "Compact tile for a single reassurance point, next to a group of feature cards or under a CTA.",
  label: "Single tile",
  noIconLabel: "Without icon",
  labelNote: "icon set — the tile still carries the whole meaning without it.",
  tileTitle: "Free to join",
  tileBody: "No fees, no subscription, nothing taken up front.",
};

/* Testimonials ------------------------------------------------------------ */

export interface TestimonialWidthCopy {
  id: string;
  label: string;
  note: string;
  count: number;
}

export const TESTIMONIAL_SECTION = {
  id: "testimonials",
  title: "Testimonials",
  note: "Three real entries from content/creators, the lowest earner first, shown at one, two and three columns. The numbers are the creators' own — nothing is rounded up for the styleguide.",
  widths: [
    {
      id: "one",
      label: "One column",
      note: "Full width. The lowest earner sits here on purpose, so the layout is judged on a modest number and not only on the top line.",
      count: 1,
    },
    {
      id: "two",
      label: "Two columns",
      note: "Short names and longer handles both have to fit without the figures moving.",
      count: 2,
    },
    {
      id: "three",
      label: "Three columns",
      note: "Three source entries spanning $8,227 to $100,227.",
      count: 3,
    },
  ] satisfies TestimonialWidthCopy[],
  priorityNote: "Screenshots load lazily because these specimens appear below the token sections.",
};

/* Stat rows --------------------------------------------------------------- */

export interface StatFixtureItem {
  label: string;
  value: string;
  expanded?: boolean;
}

export interface StatFixture {
  id: string;
  label: string;
  note: string;
  stats: StatFixtureItem[];
}

export const STAT_SECTION = {
  id: "stat-rows",
  title: "Stat rows",
  note: "Label and figure, at the two widths the figure can take. Counters use tabular figures at the default width; money turns the expanded width axis on so the dollar figure is the loudest thing in the row.",
  fixtures: [
    {
      id: "counters",
      label: "Counters",
      note: "Default width axis, tabular figures. The label wraps before the figure ever does.",
      stats: [
        { label: "Approved campaigns", value: "12" },
        { label: "Videos submitted", value: "38" },
      ],
    },
    {
      id: "money",
      label: "Money",
      note: "expanded on, so the decimal still lines up with the figure above it.",
      stats: [{ label: "Paid to date", value: "$1,284.50", expanded: true }],
    },
    {
      id: "long-label",
      label: "Long label",
      note: "The same row at 375px, where the label has to wrap without pushing or truncating the figure.",
      stats: [
        {
          label: "Lifetime earnings after fees and platform adjustments",
          value: "$987.65",
          expanded: true,
        },
      ],
    },
  ] satisfies StatFixture[],
  fixtureWarning:
    "Fixture values. They show column widths and wrapping, not a payout promise.",
};

/* Leaderboard ------------------------------------------------------------- */

export const LEADERBOARD_SECTION = {
  id: "leaderboard",
  title: "Leaderboard rows",
  label: "Eight published entries",
  note: "The eight entries from content/leaderboard, in rank order. No avatar photos exist, so every row renders the initials fallback — no stand-in face is invented for it.",
  avatarLabel: "Local avatar asset — layout fixture",
  avatarNote: "The MediaMaxxing logo demonstrates an available avatar. The zero balance below is a fixture, separate from the published ranking.",
  avatarExample: {
    position: 1,
    handle: "mediamaxxing",
    avatarUrl: "/proof/brand/logo.png",
    earnedCents: 0,
  },
};

/* Accordions -------------------------------------------------------------- */

export const ACCORDION_SECTION = {
  id: "accordions",
  title: "Accordions",
  note: "Native details and summary, so keyboard, screen-reader and find-in-page behaviour is the browser's. Several panels can be open at once.",
  faqWarning:
    "The landing-page FAQ from content/faq, which ships only questions with sourced answers.",
  grouped: {
    label: "Grouped",
    note: "One group under the section heading. The first item of the first group opens by default.",
  },
  flat: {
    label: "Flat",
    note: "The same questions without group headings. The flat form starts closed by default.",
  },
  closed: {
    label: "All closed",
    note: "defaultOpenIndex={null} overrides the grouped default, so every panel starts shut.",
  },
};

/* Logo rows --------------------------------------------------------------- */

export interface LogoCopy {
  name: string;
  src?: string;
}

export const LOGO_SECTION = {
  id: "logo-rows",
  title: "Logo rows",
  note: "Each logo is a list item with an accessible name. With an asset it renders the image; without one it renders a neutral placeholder that still carries the name, so the row never shows an unlabelled box.",
  presentLabel: "Asset present",
  presentNote: "Local asset from the public folder.",
  missingLabel: "Asset unavailable",
  missingNote: "Named placeholder tiles. Swap each one in as the asset clears.",
  presentLogos: [
    { name: "MediaMaxxing", src: "/proof/brand/logo.png" },
  ] satisfies LogoCopy[],
  missingLogos: [
    { name: "OpenArt" },
    { name: "Pump.fun" },
    { name: "Speed" },
    { name: "Lovable" },
    { name: "11Eleven Creative" },
  ] satisfies LogoCopy[],
};

/* Lightbox ---------------------------------------------------------------- */

export const LIGHTBOX_SECTION = {
  id: "lightbox",
  title: "Lightbox",
  label: "Standalone overlay",
  note: "The primitive owns the trigger button and the dialog: it locks page scroll while open and returns focus to the trigger on Escape, on the close button and on a backdrop click. The body mounts lazily, so nothing inside it loads until the trigger is pressed.",
  dialogTitle: "Dashboard screenshot",
  triggerLabel: "Open dashboard screenshot",
  triggerText: "Open dashboard screenshot",
  closeLabel: "Close screenshot",
  screenshot: {
    src: "/proof/creators/steven/dashboard.png",
    alt: "The MediaMaxxing creator dashboard.",
    sizes: "(max-width: 768px) 100vw, 720px",
  },
  assetNote:
    "Steven’s existing dashboard capture, shown in full without cropping.",
};

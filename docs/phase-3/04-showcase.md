You are a DeepSeek coding sub-agent for Phase 3 of MediaMaxxing. You have no filesystem tools; return complete code for your assigned files for lead review/integration. Output ONLY a valid JSON object {"files":[{"path":"...", "content":"full source"}],"notes":["..."]}. Do not use markdown fences. Do not edit other files. Next.js 16.3.4 App Router, React 19.2, Tailwind v4, TypeScript strict. Named component exports, no dependencies. All human UI copy belongs in content/*.ts or props; do not invent marketing claims. Source copy preserved verbatim. Respect 375px and narrow grid cells; min-w-0, wrapping, no truncating money. Native semantics, visible focus, 44px+ hit targets. No CSS modules or new global CSS. Use text-h1/h2/h3/body/small, font-expanded tabular-nums for money/counters. Icons decorative. No arbitrary type scale. No new palette. Keep creator app unchanged. Framework docs reviewed by lead: client event handlers need "use client"; client props crossing server boundary must be serializable (ReactNode composition supported); next/image use fill with relative parent + sizes and object-contain for screenshot, preload replaces deprecated priority.

DESIGN RULES:
# DESIGN-TOKENS.md

One token system, two surfaces. This supersedes the palette proposed in PLAN.md Phase 1.

## Why it changed

The Phase 1 proposal made green the primary accent. The live creator app uses **blue for
actions and green for money**, and that split is load-bearing: green means a dollar figure,
a payout, an accepted campaign. Promoting green to the primary button color would collapse a
signal the product depends on.

So the roles below come from the app and are not up for renegotiation. The *values* are ours,
retuned brighter and cleaner. Fidelity of meaning, freedom of appearance.

## Semantic roles

| Role | Meaning | Where it appears |
|---|---|---|
| `action` | Something to press | Submit Content, Apply, Explore Campaigns, rate pills |
| `money` | Dollars, payouts, acceptance | $30.00, Link your account, ACCEPTED |
| `streak` | Progress, XP, momentum, urgency | flame, XP, "14d left", streak bars |
| `warn` | Attention, scarcity, bounty | Discord banner, bounty pills, guidelines panel |
| `discord` | Brand-locked | Join Discord only |

Never use a role outside its meaning. A neutral button does not get `money` because it looks
good, and a deadline does not get `warn` because it feels urgent — deadlines are `streak`.

## Values

```css
:root {
  /* surfaces */
  --canvas:        #F6F7F9;   /* page */
  --surface:       #FFFFFF;   /* cards, sidebar */
  --surface-sunk:  #EEF0F4;   /* inset rows, tracks, chips */
  --surface-dark:  #0B0D10;   /* featured campaign cards, artwork frames */
  --border:        #E3E6EB;

  /* text */
  --ink:           #0D1220;
  --muted:         #5B6472;
  --ink-inverse:   #FFFFFF;

  /* roles */
  --action:        #2F5BEA;
  --action-sunk:   #E9EFFE;
  --money:         #0FA958;
  --money-sunk:    #E4F6EC;
  --streak:        #F4741F;
  --streak-sunk:   #FDEEE3;
  --warn:          #A8761A;
  --warn-sunk:     #FBF3E2;
  --discord:       #5865F2;
}
```

Every role has a `-sunk` companion for pill backgrounds and soft icon tiles. That pairing is
what the app does throughout and it's why the gamification layer reads as cheerful rather than
alarming.

## Type

**Archivo** for UI and body. Dollar figures, counters, and the campaign countdown use
**Archivo at wdth 125** — "Archivo Expanded" is not its own family in `next/font/google`; it
is Archivo's width axis at its maximum, loaded with `axes: ["wdth"]` and applied by
`.font-expanded`. Confirmed 2026-09-15; `/styleguide` shows both widths side by side so a
silent fallback is visible. The live app appears to use a neutral default grotesque
(assumed — read from a screenshot), so the expanded numerals are one of the few places our
build will visibly differ. That's deliberate: the money should be the loudest thing on screen,
and it currently isn't.

Tabular figures everywhere numbers change — counters, leaderboards, rate pills, streaks.

Scale: the table in `LANDING-PAGE.md` — H1 72/40, H2 44/32, H3 22/20, body 18/17, small 14
(desktop/mobile, switching at 768px), exposed as `text-h1` … `text-small`. Decided
2026-09-15; it replaces an earlier 13 / 15 / 18 / 24 / 40 / 64 scale that had no mobile sizes.

Sentence case. No all-caps except the small eyebrows the app already uses ("NEW CREATOR
BONUS", "DAILY MISSION", "REVENUE", "CAMPAIGNS").

## Geometry

**One radius.** `12px`, everywhere — cards, buttons, inputs, icon tiles, images, the phone
frame. Pills are full-round, which is a shape rather than a step on a radius scale, so they
don't count as a second value. There is no third option.

```css
--radius:      12px;
--radius-pill: 999px;
```

**Two shadows.** A resting state and a hover state, nothing between.

```css
--shadow-1: 0 1px 2px rgb(13 18 32 / 0.04), 0 2px 8px rgb(13 18 32 / 0.04);
--shadow-2: 0 2px 4px rgb(13 18 32 / 0.06), 0 8px 24px rgb(13 18 32 / 0.08);
```

`--shadow-1` on cards at rest. `--shadow-2` on hover and on overlays, lightboxes, and the
sticky header. Flat surfaces keep the hairline border and no shadow at all.

Both rules are structural. `@theme inline` in `app/globals.css` clears Tailwind's default
radius and shadow scales, so the only utilities are `rounded`, `rounded-full`, `shadow-1`, and
`shadow-2`. `npm run check:tokens` fails on anything else on the marketing surface.

## Spacing — the 8px rule

Every vertical and horizontal gap is a multiple of 8. No exceptions at the layout level.

```
8  16  24  32  48  64  96  128
```

- Section padding: 96 desktop, 64 mobile
- Grid gap: 24
- Card padding: 32 desktop, 24 mobile
- Stack rhythm inside a card: 8 / 16
- Heading to body: 16. Body to CTA: 32.

4px is permitted **only** for optical adjustment inside a pill or between an icon and its
label, where 8 visibly over-spaces. Nowhere else, and never for layout.

`npm run check:tokens` lists every spacing value off this scale. It reports rather than fails
until the Phase 3 sweep clears the old build's 4px half-steps.

## Layout

```
content-max    1120px
text-max        720px   /* any block of running prose */
gutter           24px mobile / 48px tablet+
```

The marketing page is a single centered column. No sidebar, no rails. The creator app
(Phase 9) keeps its own shell widths — those live in CREATOR-APP.md.

## Dark mode

The live app has a persistent dark-mode toggle bottom-right. Build the toggle and the token
swap structure, but treat a fully tuned dark palette as optional for the prototype. A
half-finished dark mode looks worse than an honestly disabled one — if it isn't done, ship
the toggle disabled with a tooltip saying so.

## Continuity rule

The marketing page and the creator app share these tokens, this radius, these two shadows, and
this spacing scale. They no longer share a shell — the marketing page is a centered column and
the app keeps its sidebar. Continuity now lives in the details: same pills, same card
geometry, same colour meanings.

**Until Phase 9, the creator app holds its previous values** under `.creator-surface` —
palette, 20px card radius, its own shadows, Instrument Serif headings (decided 2026-09-15). The
roles already match; the values converge when Phase 9 is revisited. The legacy token names it
still uses are app-only, and `check:tokens` keeps them off the marketing surface.


Frozen component contracts to coordinate your sibling agents:
Card existing variant/default|panel|spotlight|dark, pad none|sm|md|lg, as, className, children; add hover?:boolean. Base shadow-1, hover=true defaults to shadow-2 + motion-safe 2px lift; StepCard disables hover.
Pill: tone neutral|action|money|streak|warn, className, children. Badge compatible alias.
StepCard retains icon?,title,children,marker?; new FeatureCard and BadgeTile use icon?:ReactNode,title:string,children:ReactNode,className?:string.
StatRow stats readonly {label:string,value:string,expanded?:boolean}[], className?. StatGrid compatible alias.
Lightbox props title:string,triggerLabel:string,closeLabel:string,trigger:ReactNode,children:ReactNode,className?:string. Own native trigger button and dialog. className styles trigger. title is accessible dialog heading. ESC/backdrop/close all restore focus; lock body scroll with cleanup. Can lazily mount body. No nested buttons.
TestimonialCard props data: SourceTestimonial (from content/source/creators), priority?:boolean. SourceTestimonial matches old Creator structurally. ProofCard compatible wrapper.
Accordion: discriminated union {items:readonly AccordionItem[],groups?:never,defaultOpenIndex?:number|null,className?:string} OR {groups:readonly AccordionGroup[],items?:never,defaultOpenIndex?:number|null,className?:string}; AccordionItem={question:string,answer:ReactNode}; AccordionGroup={id:string,title:string,items:readonly AccordionItem[]}. Native details, first item of first nonempty group open by default in grouped form; flat closed by default. defaultOpenIndex flattened across groups. Multiple can open. Unique headings with useId if needed.
LeaderboardRow: entry:{position:number,handle:string,avatarUrl?:string|null,earnedCents:number}, className?:string. Render li for parent ol. Existing avatarUrl "placeholder" treated as missing; initials fallback. Currency via lib/format formatUsd(cents). No fake avatars.
LogoRow: logos readonly {name:string,src?:string}[],className?:string; ul with accessible names and local image or labelled neutral placeholder.

YOUR ASSIGNMENT:
Implement ONLY components/PrimitiveShowcase.tsx and content/primitive-examples.ts. Server component imported later by lead into existing /styleguide route after pills. Build clearly named sections with h2 text-h2 and descriptions from content/primitive-examples.ts. All variant copy/demonstration labels in that file. Showcase all four Card variants and none/sm/md/lg pads, hover and static, StepCard without icon, with icon and MCP-only marker, FeatureCard, BadgeTile, TestimonialCard at 1/2/3-col widths (use 3 real source TESTIMONIALS including low Sam), StatRow normal and money/long label examples, LeaderboardRow TOP_EARNERS all eight (include initials sentinel), grouped and flat Accordion and explicit all-closed version, LogoRow actual-logo and missing-logo states, standalone Lightbox via trigger simple ReactNode. Pills/buttons already fully showcased by existing route so don't duplicate. Use simple inline svg icon with aria-hidden rather than dependencies. Import source TESTIMONIALS from content/source/creators; TOP_EARNERS from content/creator/leaderboard; FAQ_ITEMS from content/source/faq. Show only actual first FAQ answer as published copy; other questions may show explicit placeholder label rather than fabricate eligibility facts. Group into Getting started, Getting paid, Campaigns & content, Eligibility only where source questions fit, represent missing copy with clear 'Copy pending — Phase 4' documentation not claimed answers. Clearly label samples as styleguide fixtures, show provenance warning for FAQ and top-earners non-typicality sentence. Feature examples from LANDING-PAGE: title 'You never pitch a brand', body 'Campaigns are negotiated and live before you see them. Join one and start filming.' and 'You never send an invoice' / 'Views are tracked automatically and payouts run on their own. No chasing, no middlemen.' BadgeTile sample 'Free to join'/'No fees, no subscription, nothing taken up front.' Logo real sample name MediaMaxxing src /proof/brand/logo.png, missing names OpenArt, Pump.fun, Speed, Lovable, 11Eleven Creative (assets unavailable). Styleguide only, don't edit homepage/content production files. Ensure all imported APIs match frozen contracts exactly, no unknown props. Use Card as div for labels outside specimen cards. Standalone lightbox title 'Dashboard screenshot', triggerLabel 'Open dashboard screenshot', closeLabel 'Close screenshot' from content constant. Keep paragraphs max-w-[var(--text-max)].

EXISTING SOURCE CONTEXT:
/* Copy for /styleguide, the Phase 1 design-system sign-off surface.
   Type specimens quote LANDING-PAGE.md so the scale is judged on the real
   headlines; the small specimen is the substantiation line, so the H1
   specimen never stands as an unqualified earnings claim. Pill labels are
   the examples DESIGN-TOKENS.md gives for each role. */

import type { BadgeTone } from "@/components/Badge";
import type { ButtonSize, ButtonVariant } from "@/components/Button";

export interface SectionCopy {
  title: string;
  note: string;
}

export const STYLEGUIDE_META = {
  title: "Styleguide — MediaMaxxing",
  description:
    "Palette, type scale, radius, shadows, spacing, buttons and pills — the Phase 1 sign-off surface.",
};

export const STYLEGUIDE_INTRO = {
  heading: "Styleguide",
  body: "Every value on this page is read from app/globals.css. Once this is signed off, a change to the palette, typeface or type scale is a conversation, not an edit.",
};

export const SECTIONS = {
  palette: {
    title: "Palette",
    note: "The roles come from the creator app and don't move: blue is something to press, green is money, orange is momentum, amber is attention. Each role has a sunk companion for pill backgrounds and soft tiles. AA needs 4.5:1 for body text and 3:1 for large text.",
  },
  type: {
    title: "Type scale",
    note: "Archivo throughout. Sizes switch from mobile to desktop at 768px. Check the H1 to H2 to H3 steps in the 375px column; nothing sits between H3 and body.",
  },
  numerals: {
    title: "Numerals",
    note: "Dollar figures and counters use Archivo at wdth 125 with tabular figures. If the two rows below are the same width, the axis isn't loading.",
  },
  radius: {
    title: "Radius",
    note: "One radius, 12px, on cards, buttons, inputs, icon tiles, images and the phone frame. Pills are full-round, which is a shape rather than a second step.",
  },
  shadows: {
    title: "Shadows",
    note: "Two strengths. Flat surfaces keep a hairline border and no shadow. shadow-1 is a card at rest; shadow-2 is hover, overlays, the lightbox and the sticky header.",
  },
  spacing: {
    title: "Spacing",
    note: "Every gap is a multiple of 8. 4px only for optical adjustment inside a pill or between an icon and its label. npm run check:tokens lists anything off the scale.",
  },
  buttons: {
    title: "Buttons",
    note: "Primary is the only variant the page CTA uses. Money never colours a button — green means a dollar figure.",
  },
  pills: {
    title: "Pills",
    note: "Role colour on its sunk companion. Contrast for each pair is on the role cards above.",
  },
} satisfies Record<string, SectionCopy>;

export type SectionId = keyof typeof SECTIONS;

/* Palette ----------------------------------------------------------------- */

export interface Swatch {
  token: string;
  role: string;
}

export interface ContrastPair {
  label: string;
  fg: string;
  bg: string;
}

export interface RoleSwatch {
  token: string;
  sunk?: string;
  meaning: string;
  where: string;
  contrast: ContrastPair[];
}

export const PALETTE_GROUPS = {
  surfaces: "Surfaces",
  text: "Text",
  roles: "Roles",
};

export const SURFACES: Swatch[] = [
  { token: "canvas", role: "Page" },
  { token: "surface", role: "Cards, header" },
  { token: "surface-sunk", role: "Inset rows, tracks, chips" },
  { token: "surface-dark", role: "Final CTA band, artwork frames" },
  { token: "border", role: "Hairlines on flat surfaces" },
];

export const TEXT: Swatch[] = [
  { token: "ink", role: "Headings and body" },
  { token: "muted", role: "Secondary text, friction strip, disclosures" },
  { token: "ink-inverse", role: "Text on dark and on action" },
];

const onSurface = (token: string): ContrastPair => ({ label: "Text on surface", fg: token, bg: "surface" });
const onSunk = (token: string): ContrastPair => ({ label: "Text on sunk", fg: token, bg: `${token}-sunk` });
const whiteOn = (token: string): ContrastPair => ({ label: "White on fill", fg: "ink-inverse", bg: token });

export const ROLES: RoleSwatch[] = [
  {
    token: "action",
    sunk: "action-sunk",
    meaning: "Something to press",
    where: "Submit content, Apply, Explore campaigns, rate pills",
    contrast: [onSurface("action"), onSunk("action"), whiteOn("action")],
  },
  {
    token: "money",
    sunk: "money-sunk",
    meaning: "Dollars, payouts, acceptance",
    where: "$30.00, Link your account, Accepted",
    contrast: [onSurface("money"), onSunk("money"), whiteOn("money")],
  },
  {
    token: "streak",
    sunk: "streak-sunk",
    meaning: "Progress, XP, momentum, urgency",
    where: "Flame, XP, 14d left, streak bars",
    contrast: [onSurface("streak"), onSunk("streak"), whiteOn("streak")],
  },
  {
    token: "warn",
    sunk: "warn-sunk",
    meaning: "Attention, scarcity, bounty",
    where: "Discord banner, bounty pills, guidelines panel",
    contrast: [onSurface("warn"), onSunk("warn"), whiteOn("warn")],
  },
  {
    token: "discord",
    meaning: "Brand-locked",
    where: "Join Discord only",
    contrast: [whiteOn("discord")],
  },
];

/* Type -------------------------------------------------------------------- */

export type TypeLevelId = "h1" | "h2" | "h3" | "body" | "small";

export interface TypeLevel {
  id: TypeLevelId;
  label: string;
  desktop: string;
  mobile: string;
  use: string;
  sample: string;
}

export const TYPE_TABLE = {
  level: "Level",
  desktop: "Desktop",
  mobile: "Mobile",
  use: "Use",
};

export const TYPE_FRAMES = {
  desktop: "Desktop sizes — 768px and up",
  mobile: "Mobile sizes — 375px frame",
};

export const TYPE_LEVELS: TypeLevel[] = [
  { id: "h1", label: "H1", desktop: "72 / 1.02", mobile: "40", use: "Hero only, once", sample: "Make six figures from your phone" },
  { id: "h2", label: "H2", desktop: "44 / 1.1", mobile: "32", use: "Section headings", sample: "From signup to your first campaign in five minutes" },
  { id: "h3", label: "H3", desktop: "22 / 1.3", mobile: "20", use: "Card and step titles", sample: "You never pitch a brand" },
  {
    id: "body",
    label: "Body",
    desktop: "18 / 1.6",
    mobile: "17",
    use: "Paragraphs",
    sample: "Brands pay you for every view. The campaigns are already signed, the video templates already work, and you can post your first one tonight.",
  },
  {
    id: "small",
    label: "Small",
    desktop: "14 / 1.5",
    mobile: "14",
    use: "Friction strips, disclosures",
    sample: "Our top creator has earned $153,823. Most earn far less — see the full numbers below.",
  },
];

/* Numerals ---------------------------------------------------------------- */

export const NUMERALS = {
  specimen: "$12,345.67",
  digits: "0123456789",
  rows: [
    { label: "Archivo, wdth 100", expanded: false },
    { label: "Archivo, wdth 125", expanded: true },
  ],
  columnLabel: "Tabular figures — the columns align",
  column: ["$11,111.11", "$80,808.08", "$1,000.00"],
};

/* Geometry ---------------------------------------------------------------- */

export const RADIUS_SPECIMENS = {
  radius: "radius · 12px",
  pill: "pill · full-round",
};

export type ShadowId = "flat" | "shadow-1" | "shadow-2" | "hover";

export const SHADOW_SPECIMENS: { id: ShadowId; label: string; body: string }[] = [
  { id: "flat", label: "Flat", body: "Hairline border, no shadow" },
  { id: "shadow-1", label: "shadow-1", body: "Card at rest" },
  { id: "shadow-2", label: "shadow-2", body: "Hover, overlays, lightbox, sticky header" },
  { id: "hover", label: "Hover lift", body: "shadow-1 to shadow-2 and 2px up over 150ms. No lift under reduced motion." },
];

export const SPACING_STEPS = [8, 16, 24, 32, 48, 64, 96, 128];

/* Buttons and pills ------------------------------------------------------- */

export const BUTTONS = {
  sample: "Button label",
  states: { disabled: "Disabled", link: "As a link", dark: "On surface-dark" },
  variants: [
    { id: "primary", label: "Primary", note: "Action role. The page CTA; nothing else competes with it." },
    { id: "secondary", label: "Secondary", note: "Neutral surface, for an action beside a primary." },
    { id: "ghost", label: "Ghost", note: "Action-coloured text, for tertiary actions." },
  ] satisfies { id: ButtonVariant; label: string; note: string }[],
  sizes: [
    { id: "lg", label: "Large · 56px — final CTA" },
    { id: "md", label: "Medium · 48px — hero and section CTAs" },
    { id: "sm", label: "Small · 44px — header. Never below 44." },
  ] satisfies { id: ButtonSize; label: string }[],
};

export const PILLS: { tone: BadgeTone; label: string }[] = [
  { tone: "neutral", label: "Beginner" },
  { tone: "action", label: "$7/1K views" },
  { tone: "money", label: "Accepted" },
  { tone: "streak", label: "14d left" },
  { tone: "warn", label: "Bounty" },
];
export type Step = {
  title: string;
  description: string;
};

/* Section headline on the live site is "Start earning in three simple steps",
   which the PLAN's [HUMAN] copy pass flags as reading flat without the
   italicized "three simple steps" the original design leaned on.
   Provided here verbatim — replace before Phase 5 ships. */
export const STEPS_HEADLINE_VERBATIM =
  "Start earning in three simple steps";

export const STEPS: Step[] = [
  {
    title: "Browse Campaigns",
    description:
      "Explore available brand campaigns with ready-to-use viral templates designed for guaranteed views.",
  },
  {
    title: "Create Content",
    description:
      "Follow step-by-step tutorials that show you exactly how to recreate already-viral videos. No experience needed.",
  },
  {
    title: "Earn Per View",
    description:
      "Get paid for the views your content generates. Our proven templates help even beginners start earning right away.",
  },
];
import type { Provenance, SourceMeta } from "./types";

export type SourceFaqItem = {
  question: string;
  answer: string;
  provenance: Provenance;
};

export const FAQ_META: SourceMeta = {
  provenance: "live-site",
  from: ["content/faq.ts"],
  note:
    "All five questions are from the live site. Only the first answer was extractable " +
    "verbatim; the old build marked answers 2–5 as placeholders to replace, and they still " +
    "carry that marker. Answer 3's \"within 48 hours\" conflicts with LANDING-PAGE.md's " +
    "\"Reviewed in 7 days\".",
};

export const FAQ_HEADING = { text: "Questions", provenance: "unknown" as Provenance };

export const FAQ_ITEMS: SourceFaqItem[] = [
  {
    question: "What exactly is MediaMaxxing?",
    answer:
      "MediaMaxxing is a creator-first platform that connects you directly with brands running paid UGC campaigns. You pick a campaign, film your videos, submit them for review, and get paid automatically once approved. It's the easiest way to turn short-form content into income. No outreach, no clients, no middlemen.",
    provenance: "live-site",
  },
  {
    question: "Do I need experience or followers?",
    answer:
      "No. Templates walk you through what to film, and payouts are per-view — not per-follower. Natalie hit $30,361 on under 2,000 followers using the same playbook. (Placeholder answer — replace during copy pass.)",
    provenance: "placeholder",
  },
  {
    question: "How fast can I start earning?",
    answer:
      "Sign-up is instant. Most creators submit their first campaign the same day and see approvals within 48 hours. Payouts are automatic once your work clears review. (Placeholder answer — replace during copy pass.)",
    provenance: "placeholder",
  },
  {
    question: "What kinds of campaigns are available?",
    answer:
      "Brand campaigns across consumer products, apps, and services — each with a template that has already gone viral. New campaigns land weekly. (Placeholder answer — replace during copy pass.)",
    provenance: "placeholder",
  },
  {
    question: "Is this available worldwide?",
    answer:
      "Creators from most countries are eligible — payouts land via standard international rails. (Placeholder answer — replace during copy pass.)",
    provenance: "placeholder",
  },
];


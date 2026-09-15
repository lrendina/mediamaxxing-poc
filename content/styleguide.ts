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

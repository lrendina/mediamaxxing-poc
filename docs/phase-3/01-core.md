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
Implement components/Button.tsx, Card.tsx, StepCard.tsx, FeatureCard.tsx, BadgeTile.tsx, Pill.tsx, Badge.tsx. Adapt supplied code, preserve existing external APIs. Button default type=button, supports native disabled and Link with anchor attrs; link href including empty string should use link branch consistently. Keep button sizes 56/48/44 min-height (hit-target heights permitted) and padding spacing scale, wrap long CTA text with vertical padding. Card default padding p-6 md:p-8, sm p-4, lg p-6 md:p-8, none blank; maintain variants but eliminate old p-5,p-7. Default hover=true; StepCard hover=false, semantic h3 text-h3 and body text-body. Step icon neutral/action not money; 48px tile. FeatureCard benefit h3 then feature children, hover card. BadgeTile is restrained trust tile, no invented seal; shared Card treatment. Use motion-safe transform and motion-reduce transition-none. Pill 4px optical gap acceptable; Badge reexport preserving BadgeTone name. Return full files.

EXISTING SOURCE CONTEXT:
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "sm" | "lg";

/* Primary is the action role and the only variant the page CTA uses.
   Secondary is a neutral surface for an action beside a primary; ghost is
   action-coloured text. Money never colours a button — green means a
   dollar figure. Every size clears the 44px tap target. */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-action text-ink-inverse hover:bg-action/90 active:bg-action/80",
  secondary:
    "bg-surface text-ink border border-border hover:bg-surface-sunk active:bg-surface-sunk",
  ghost:
    "bg-transparent text-action hover:bg-action-sunk active:bg-action-sunk",
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: "px-8 min-h-14 text-body",
  md: "px-6 min-h-12 text-body",
  sm: "px-4 min-h-11 text-small",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded " +
  "font-medium leading-none transition-colors " +
  "disabled:opacity-40 disabled:cursor-not-allowed";

function classesFor(variant: ButtonVariant, size: ButtonSize, extra: string) {
  return `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${extra}`;
}

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof StyleProps | "href"> & {
    href: string;
  };

type NativeButtonProps = StyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof StyleProps> & {
    href?: undefined;
  };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
  } = props;
  const cls = classesFor(variant, size, className);

  if ("href" in props && props.href) {
    const {
      variant: _v, size: _s, className: _c, children: _ch,
      href, ...anchorRest
    } = props;
    void _v; void _s; void _c; void _ch;
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v, size: _s, className: _c, children: _ch,
    href: _href, ...buttonRest
  } = props as NativeButtonProps;
  void _v; void _s; void _c; void _ch; void _href;
  return (
    <button className={cls} {...buttonRest}>
      {children}
    </button>
  );
}
import type { ElementType, ReactNode } from "react";

export type CardVariant = "default" | "panel" | "spotlight" | "dark";

/* Hierarchy through surface and border, not shadow. Only `spotlight`
   floats, and only slightly — it is for the one object per section that
   should read as the point. `dark` is the green-black object that anchors
   a section (CTA band, featured campaign). */
const variantClasses: Record<CardVariant, string> = {
  default:
    "rounded bg-surface border border-border",
  panel:
    "rounded bg-surface-sunk/70",
  spotlight:
    "rounded bg-surface border border-border shadow-1",
  dark:
    "rounded bg-surface-dark text-ink-inverse",
};

const padClasses = {
  none: "",
  sm:   "p-4",
  md:   "p-5",
  lg:   "p-6 md:p-7",
} as const;

export type CardPad = keyof typeof padClasses;

export function Card({
  variant = "default",
  pad = "md",
  as: Tag = "div",
  className = "",
  children,
}: {
  variant?: CardVariant;
  pad?: CardPad;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`${variantClasses[variant]} ${padClasses[pad]} ${className}`}>
      {children}
    </Tag>
  );
}
import type { ReactNode } from "react";
import { Card } from "./Card";

export function StepCard({
  icon,
  title,
  children,
  /* MCP flow is the only place ordered markers are allowed. Off by default. */
  marker,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  marker?: string;
}) {
  return (
    <Card variant="default" pad="lg" className="flex gap-4">
      {icon ? (
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-money-sunk text-money"
        >
          {icon}
        </span>
      ) : null}
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-baseline gap-2">
          {marker ? (
            <span className="text-[12px] text-muted font-mono">{marker}</span>
          ) : null}
          <h3 className="text-[19px] leading-tight font-medium tracking-[-0.01em]">{title}</h3>
        </div>
        <div className="text-[15px] text-muted leading-[1.55]">{children}</div>
      </div>
    </Card>
  );
}
import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "action" | "money" | "streak" | "warn";

/* The pill: role colour on its sunk companion, the same pairing the
   creator app's pills use. Full-round is a shape, not a second radius. */
const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-sunk text-ink",
  action:  "bg-action-sunk text-action",
  money:   "bg-money-sunk text-money",
  streak:  "bg-streak-sunk text-streak",
  warn:    "bg-warn-sunk text-warn",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex min-h-8 items-center gap-1 rounded-full px-4 text-small font-medium leading-none ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}


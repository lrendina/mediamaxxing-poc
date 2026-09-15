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
Implement components/StatRow.tsx, StatGrid.tsx, Lightbox.tsx, TestimonialCard.tsx, ProofCard.tsx, and content/proof-ui.ts. Extract reusable native-dialog lightbox from ProofCard rather than preserve overlapping phone thumbnail layout. TestimonialCard equal-height h-full card article, name/handle, large expanded money (text-h2 may overflow a 3-col padded cell; use text-h3 for card money as design override), tier Pill, aspect 2/1 object-contain dashboard trigger, labelled StatRow, source blurb. Show two-line story summary but include full story inside dialog for access. Lightbox full dashboard and phone screenshots with object-contain and sensible sizes, accessible descriptive alt from content helper funcs. No earnings values or story rewrites. Store UI strings/functions for name-specific accessible labels in content/proof-ui.ts. Dialog keyboard trap via showModal, close button autofocus, backdrop only outside content (not clicking padding accidentally), scroll body lock/restoration including unmount and repeated opens, title linked with useId. StatRow small labelled dl with wrapping grid; no middle-dot strings or truncation. Compatibility wrappers preserve old imports. Need no external lightbox dependency.

EXISTING SOURCE CONTEXT:
"use client";

import Image from "next/image";
import { useRef } from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { StatGrid } from "./StatGrid";
import type { Creator } from "@/content/creators";

/* The feed's center of gravity. Layout leads with the number: earnings at
   display size, then the evidence (dashboard + phone), then the small
   table of what it took, then the creator's own words. */
export function ProofCard({
  data,
  priority = false,
}: {
  data: Creator;
  /* Set true on the first card in a feed so its dashboard image loads
     eagerly and Next.js emits a preload hint — matters for LCP. */
  priority?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    /* Click on the backdrop (the dialog element itself, outside its inner
       content) closes. Native <dialog> gives us ESC-to-close automatically. */
    if (e.target === dialogRef.current) close();
  };

  return (
    <>
      <Card
        as="article"
        variant="spotlight"
        pad="none"
        className="flex flex-col overflow-hidden"
      >
        <header className="flex items-center gap-3 px-5 pt-5">
          <span
            aria-hidden
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-sunk text-[13px] font-medium"
          >
            {data.name[0]}
          </span>
          <div className="flex flex-col leading-tight min-w-0">
            <p className="text-[15px] font-medium truncate">{data.name}</p>
            <p className="text-[13px] text-muted truncate">@{data.handle}</p>
          </div>
          <Badge
            tone="neutral"
            className="ml-auto"
          >
            {data.tier}
          </Badge>
        </header>

        <div className="flex flex-col px-5 pt-5 pb-4">
          <p className="text-[12px] text-muted">Total earned</p>
          <p className="text-[44px] leading-none font-expanded text-money mt-1">
            {data.earnings}
          </p>
        </div>

        <button
          type="button"
          onClick={open}
          aria-label={`Open ${data.name}'s dashboard`}
          className="group relative block w-full text-left px-5"
        >
          {/* Dashboard — card matches the graph's native 2:1 so the whole
              chart is visible, never cropped. */}
          <div
            className="
              relative aspect-[2/1] rounded overflow-hidden
              bg-surface-sunk ring-1 ring-border
              transition group-hover:brightness-[0.98]
            "
          >
            <Image
              src={data.dashboardSrc}
              alt=""
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
              priority={priority}
            />
          </div>

          {/* Phone — hovers over the dashboard, lifted by shadow.
              Positioned as a sibling of the clipped dashboard so the shadow
              is not clipped by overflow-hidden. */}
          <div
            className="
              absolute bottom-3 right-8
              h-[88%] aspect-[900/1955]
              rounded overflow-hidden
              bg-surface-sunk ring-1 ring-ink/10
              shadow-2
              transition-transform group-hover:-translate-y-1
            "
          >
            <Image
              src={data.phoneSrc}
              alt=""
              fill
              sizes="140px"
              className="object-cover"
            />
          </div>
        </button>

        <div className="px-5 pt-5">
          <StatGrid stats={data.stats} />
        </div>

        <blockquote className="mx-5 my-5 rounded bg-surface-sunk/60 px-4 py-3 text-[14px] leading-[1.55] text-ink/85">
          &ldquo;{data.blurb}&rdquo;
        </blockquote>
      </Card>

      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        className="
          m-auto w-[min(920px,92vw)] max-h-[92vh]
          rounded p-0 bg-surface text-ink
          shadow-2 backdrop:bg-surface-dark/70 backdrop:backdrop-blur-sm
        "
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex flex-col leading-tight">
            <p className="text-[18px] font-medium">{data.name}</p>
            <p className="text-[13px] text-muted">
              @{data.handle} · <span className="font-expanded text-money">{data.earnings}</span> earned
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="
              inline-flex h-11 w-11 items-center justify-center rounded-full
              bg-surface-sunk text-ink hover:bg-ink/[0.08] transition
              text-[20px] leading-none
            "
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-[2fr_1fr] overflow-auto max-h-[calc(92vh-73px)] bg-canvas">
          <div className="relative rounded overflow-hidden bg-surface aspect-[16/9] ring-1 ring-border">
            <Image
              src={data.dashboardSrc}
              alt={`${data.name}'s earnings dashboard`}
              fill
              sizes="(min-width: 768px) 600px, 92vw"
              className="object-contain"
            />
          </div>
          <div className="relative rounded overflow-hidden bg-surface aspect-[9/16] md:aspect-auto md:min-h-[400px] ring-1 ring-border">
            <Image
              src={data.phoneSrc}
              alt={`${data.name}'s content on mobile`}
              fill
              sizes="(min-width: 768px) 300px, 92vw"
              className="object-contain"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
export type Stat = {
  label: string;
  value: string;
  /* When true, the value gets the expanded numeral treatment. */
  expanded?: boolean;
};

/* Labeled values separated by hairlines — a small table, not a caption
   string. Value above label so the number leads. */
export function StatGrid({
  stats,
  className = "",
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <dl
      className={`grid ${gridColsFor(stats.length)} divide-x divide-border ${className}`}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1 min-w-0 px-4 first:pl-0 last:pr-0">
          <dd
            className={`text-[20px] leading-none truncate ${
              s.expanded ? "font-expanded" : "font-medium"
            }`}
          >
            {s.value}
          </dd>
          <dt className="text-[12px] text-muted truncate">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

function gridColsFor(n: number) {
  if (n <= 2) return "grid-cols-2";
  if (n === 3) return "grid-cols-3";
  return "grid-cols-2 sm:grid-cols-4";
}
import type { Stat } from "@/components/StatGrid";

export type Tier = "Beginner" | "Intermediate" | "Advanced";

export type Creator = {
  id: string;
  name: string;
  handle: string;
  tier: Tier;
  earnings: string;
  dashboardSrc: string;
  phoneSrc: string;
  stats: Stat[];
  blurb: string;
};

/* Ordered top-earner first — the feed's persuasion sequence leads with the
   strongest number, so the first testimonial should be the biggest figure. */
export const CREATORS: Creator[] = [
  {
    id: "steven",
    name: "Steven",
    handle: "stee.ugc",
    tier: "Advanced",
    earnings: "$100,227",
    dashboardSrc: "/proof/creators/steven/dashboard.png",
    phoneSrc:     "/proof/creators/steven/phone.jpg",
    stats: [
      { label: "Accounts", value: "17"    },
      { label: "Posts",    value: "5,900" },
      { label: "Per day",  value: "50"    },
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
    phoneSrc:     "/proof/creators/jennifer/phone.jpg",
    stats: [
      { label: "Accounts", value: "20"    },
      { label: "Views",    value: "11.2M" },
      { label: "Per day",  value: "15"    },
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
    phoneSrc:     "/proof/creators/brayden/phone.jpg",
    stats: [
      { label: "Accounts", value: "7"     },
      { label: "Views",    value: "24.5M" },
      { label: "Approval", value: "97%"   },
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
    phoneSrc:     "/proof/creators/erica/phone.jpg",
    stats: [
      { label: "Accounts", value: "9"    },
      { label: "Views",    value: "8.5M" },
      { label: "Posts",    value: "525"  },
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
    phoneSrc:     "/proof/creators/enel/phone.jpg",
    stats: [
      { label: "Followers", value: "12.4K" },
      { label: "Views",     value: "4.4M"  },
      { label: "Per day",   value: "$648"  , expanded: true },
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
    phoneSrc:     "/proof/creators/rachael/phone.jpg",
    stats: [
      { label: "Followers", value: "51.8K" },
      { label: "Views",     value: "9.8M"  },
      { label: "Per day",   value: "$278" , expanded: true },
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
    phoneSrc:     "/proof/creators/natalie/phone.jpg",
    stats: [
      { label: "Followers", value: "1,938" },
      { label: "Views",     value: "12.2M" },
      { label: "Accounts",  value: "6"     },
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
    phoneSrc:     "/proof/creators/sam/phone.jpg",
    stats: [
      { label: "Followers", value: "1,322" },
      { label: "Views",     value: "252K"  },
      { label: "Per day",   value: "$167", expanded: true },
    ],
    blurb:
      "Sam made his first $1,000 from a single video, then kept posting daily and scaled it from there.",
  },
];


# CLAUDE.md

Persistent context for this repo. Read this before every task. If a request conflicts with
this file, stop and ask.

## What this is

A **proof-of-concept reskin** of mediamaxxing.com, built for a design interview. It is not
production work, it does not connect to the real backend, and it will never be merged into
their codebase. It exists to demonstrate a structural argument about their marketing site.

We do **not** have access to MediaMaxxing's repo. This repo is ours, and it already contains a
complete build of an **earlier, abandoned design** — a card feed with a left sidebar and right
rail. That design is cut. The repo is now a source of reusable copy, assets, and leaf
components, not a starting point to extend.

**When the code and the docs disagree, the docs win.** An existing component is evidence of
what the last design wanted, not an instruction. If you find `Feed`, `Sidebar`, `RightRail`, or
`DeviceIntro` on the marketing surface, they are stale by definition — archive them per
`MIGRATION.md`, don't pattern-match to them. The creator app's own sidebars and rails
(`AppSidebar`, `CampaignSidebar`, `CreatorsPanel`) are not stale; they are the product's shell.

The exception is content. Copy and assets already in the repo are authoritative and must be
extracted before anything is removed.

## Documents

- `MIGRATION.md` — how to get from the existing build to the new one. Follow it first: its
  steps and gates come before PLAN.md, and it wins where the two disagree.
- `PLAN.md` — phased build plan, agent/human split. Work through it in order.
- `LANDING-PAGE.md` — the page spec. Section order, copy, CTA placement, typography.
- `DESIGN-TOKENS.md` — the token system. Read before writing any CSS.
- `CREATOR-APP.md` — spec for the creator dashboard (Phase 9, optional).
- `DATA-MODEL.md` — typed fixture shapes for the creator app.

## The argument we're making

A conversion-first landing page for a product whose real advantage is that the hard parts are
already done. No brand outreach, no audience requirement, no creative block, no invoicing.
Time-to-value is the pitch: signup to first campaign in five minutes.

Structure is conventional on purpose — hero, solution, proof, trust, objections, close, with a
CTA at every seam. Do not get clever with it. The page converts or it fails.

An earlier concept rebuilt the marketing site as a card feed with a sidebar. **That is cut.**
If you find feed, sidebar, or rail references on the marketing surface, they are stale — flag
them, don't build them.

The marketing page and the creator app are **one app**: same tokens, radius, shadows, spacing,
pills, card geometry, and colour meanings (see the continuity rule in DESIGN-TOKENS.md). They
don't share a shell — the marketing page is a centered column, the app keeps its sidebar.

Phase 9 (optional) is the creator dashboard: a faithful rebuild in our tokens, **not a
redesign** — do not restructure their nav or improve their flows on your own initiative. Where
a screenshot and your instinct disagree, the screenshot wins. Deviations made on explicit
request are documented and flagged in CREATOR-APP.md.

## Stack

- Next.js (App Router), TypeScript, Tailwind v4
- No backend, no auth, no database. Forms are non-functional and say so.
- Content is hardcoded in `content/` as typed objects, not fetched.

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # must pass clean before any handoff
npm run lint
```

## Conventions

- Components in `components/`, one per file, named exports.
- All copy lives in `content/*.ts` — never inline strings in JSX. The real site's words are
  the content; we are changing presentation only.
- Design tokens live in `app/globals.css` as CSS custom properties, surfaced to Tailwind
  through the `@theme inline` block in the same file (Tailwind v4 — there is no
  `tailwind.config.ts`). **No hardcoded hex values in components, ever.**
- Tailwind utilities only. No CSS modules, no styled-components.
- Real images go in `public/proof/`. If an asset is missing, use a labeled gray block —
  never a stock photo, never an AI-generated image.

## Kill list

The current site uses several patterns that read as templated. Removing them is a deliberate
part of the redesign, so do not reintroduce them:

- **Single-word italic emphasis in headlines** ("three simple steps", "real income").
  Write headlines that work without a highlighted word.
- **`01 / 02 / 03` numbered markers**, except on the MCP connect flow where the content
  genuinely is an ordered sequence a user follows.
- **All-caps eyebrow labels** above every section ("How It Works", "Success Stories", "FAQ").
- **Middle-dot stat strings** ("17 accounts · 5,900 posts · 50/day"). Use a small stat grid
  with labeled values.
- Fade-and-slide-up entrance animations on every section. Motion is the two effects in
  LANDING-PAGE.md — the one-time hero entrance and the card hover lift — and nothing else.
- More than one border radius or more than two shadow strengths. One radius, two shadows,
  8px spacing scale. These are hard constraints, not preferences — see DESIGN-TOKENS.md.
- Varying the CTA label between sections. One string, imported from `content/cta.ts`.

## Quality floor

Meet these without being asked and without announcing them:

- Responsive to 375px. The mobile view is the one that gets checked first.
- Visible keyboard focus on every interactive element.
- `prefers-reduced-motion` respected.
- Semantic landmarks (`nav`, `main`, `aside`), real heading hierarchy, alt text on every image.
- Tap targets 44px minimum.

## Stop and ask

Do not decide these alone. Surface the question and wait:

- Any change to the palette, typeface, or type scale after Phase 1 sign-off.
- Reordering, merging, or cutting a content section.
- Adding a dependency beyond what `package.json` already lists (next, react, react-dom,
  agentation).
- Anything that would require credentials, an API key, or a real account.
- Downloading assets from mediamaxxing.com — ask first, every time.

## Working style

- Small commits, one concern each, conventional commit messages. Archival removals get their
  own commit so the diff stays legible.
- Never hard-delete. Removals move to `_archive/`.
- After each phase in PLAN.md, stop. Summarize what changed and what needs a human eye
  before starting the next phase. Do not chain phases unprompted.
- You cannot judge whether this looks good. Describe what you built and ask for a visual
  review rather than asserting it works.

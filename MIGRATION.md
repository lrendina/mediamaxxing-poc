# MIGRATION.md

The repo already contains a complete build of the previous design — the card feed with a left
sidebar and right rail. That design is cut. This file governs how the agent gets from that
build to the one specified in `LANDING-PAGE.md`.

## The rule that matters

**Extract before you demolish.** The old build is the only place some things exist: the
testimonial copy, the FAQ answers, the downloaded screenshots, the brand logos, the tier
badges. Once a component is deleted, whatever was hardcoded inside it is gone.

Nothing is deleted until it has been inventoried and its content extracted. In that order,
every time.

## Step 0 — Safety

- [AGENT] `git checkout -b rebuild/conversion-page` — all work happens here
- [AGENT] Confirm the working tree is clean and the previous build is committed on `main`
- [AGENT] Nothing is hard-deleted. Removals move to `_archive/` and land in their own commit.

## Step 1 — Inventory

- [AGENT] Write `INVENTORY.md` at the repo root listing, for each file in `components/`,
  `content/`, `app/`, and `public/`:
  - what it is, in one line
  - whether `LANDING-PAGE.md` still needs it
  - a triage verdict: **Keep**, **Adapt**, or **Archive**
- [AGENT] Report the framework facts explicitly: App Router or Pages Router, Tailwind major
  version, whether `globals.css` already defines custom properties, and which font families
  are loaded and how
- [AGENT] **Stop here and show the inventory.** Do not start triage.

**[HUMAN] Review the inventory.** You built this repo and you know which components were
solid and which were held together with tape. Correct the verdicts before anything moves. This
is a five-minute read that prevents the agent archiving something you'd rather have kept.

## Step 2 — Extraction

Before any teardown:

- [AGENT] Pull every string out of the old components into `content/source/` — testimonial
  names, handles, figures, tier badges, stat lines, blurbs; all FAQ questions and answers;
  nav and footer labels; blog card titles and excerpts
- [AGENT] Catalogue `public/` into the asset manifest below, with real filenames and dimensions
- [AGENT] Note anything the spec needs that the old build does not contain

Copy that exists in the repo is authoritative. Do not rewrite it, do not "improve" it, do not
regenerate it from memory of the live site.

## Step 3 — Triage

### Archive — the shell is gone

`Sidebar`, `RightRail`, `Feed`, filter chips, the marketing mobile bottom tab bar
(`MarketingTabBar`), anything named for the feed concept, and `DeviceIntro` if it was built.
These have no equivalent in the new page. This is the marketing surface only — the creator
app is the same app and keeps its own sidebars, rails, and the shared `MobileTabBar`.
Move them to `_archive/` in one commit so the diff is legible.

### Keep — content and leaf primitives

Content files, `Button`, `Accordion`, `Badge`, `Pill`, `Lightbox`, `LogoLockup`, and the
downloaded proof imagery. These carry over with light or no change.

### Adapt — everything in between

`Card`, `TestimonialCard`, `StepCard`, `FeatureStatCard`, `BlogCard`, `StatGrid`. The markup
survives; the assumptions don't. See the hazards below.

## Step 4 — Known adaptation hazards

Four things changed underneath every component. Sweep for all four rather than fixing them as
they surface visually.

**Width.** Old components were built for a 600px feed column. They now sit in a 1120px
centered layout, often in 2- or 3-column grids. A testimonial card tuned for a narrow column
will look stretched and under-filled at width. Check every `max-w`, every fixed pixel width,
and every assumption that a card owns the full row.

**Spacing.** The old build used a 4px base. `DESIGN-TOKENS.md` now mandates 8px. Every 12px,
20px, and 28px value in the codebase is out of scale and has to move to the nearest valid step.
Do this as a deliberate sweep, not opportunistically.

**Radius.** The old build had four radius values. There is now one, plus full-round for pills.
Every other radius is a bug.

**Shadow.** The old direction was flat with hairline borders. There are now exactly two shadow
strengths, with `--shadow-2` reserved for hover, overlays, and the sticky header.

**Tokens.** `globals.css` — its custom properties and its `@theme inline` block (Tailwind v4,
there is no `tailwind.config.ts`) — is retuned, not rewritten — the old build
should have had no hardcoded hex values, so changing the token values ought to propagate
everywhere. Verify that assumption rather than trusting it: grep for `#` in `components/` and
report anything found. Hardcoded colour is the most likely place the old palette survives.

## Step 5 — Handoff to PLAN.md

Once the inventory is reviewed and extraction is complete, resume at `PLAN.md` Phase 1. The
scaffolding steps in Phase 0 do not apply to this repo.

---

## Asset manifest

Fill this in during Step 2 from what's actually in `public/`, then flag the gaps.

| Asset | Expected filename | Used by | Present? |
|---|---|---|---|
| Testimonial dashboard screenshots ×8 | `public/proof/{handle}-earnings.png` | `TestimonialCard` | **Yes, 8/8**, at `public/proof/creators/{name}/dashboard.png`, all 2:1. brayden 1450×725 · enel 1160×580 · erica 1430×715 · jennifer 1350×675 · natalie **706×353 (low-res)** · rachael 910×455 · sam 1160×580 · steven 1340×670 |
| Testimonial phone screenshots ×8 | `public/proof/{handle}-phone.png` | lightbox | **Yes, 8/8**, at `public/proof/creators/{name}/phone.jpg`. 900×1955 for brayden, erica, jennifer, rachael, steven · natalie 900×1956 · enel and sam **276×600 (low-res)** |
| Brand logos ×5 | `public/brands/{slug}.svg` | hero trust bar | **No.** No logo files anywhere; `content/creator/brands.ts` has wordmark text only |
| Creator avatars ×8 | `public/avatars/{handle}.png` | `LeaderboardRow` | **No.** Leaderboard fixture uses `"placeholder"` or `null`; three entries render as initials in the real app, so initials are an observed state |
| Phone frame | CSS or inline SVG | hero visual | n/a — `components/iphone.tsx`, inline SVG (433×882 viewBox), 11 hex fills to move onto tokens |
| Hero screen capture | `public/hero/app-screen.png` | hero visual | **No** |
| Logo lockup | existing | header, footer | **Yes** — `public/proof/brand/logo.png` 256×256 + `components/LogoLockup.tsx` |

Also in `public/`, outside the spec's list: three blog covers at `public/proof/blog/*.png`
(1200×630, used by the `/blog` stub), and five unreferenced create-next-app SVGs (`file`,
`globe`, `next`, `vercel`, `window`).

### Missing-asset rule

A missing asset renders as a **labelled placeholder block** — correct dimensions, neutral
surface token, the asset's name in muted small text. Never a broken image, never a stock
photo, never a generated substitute, never a silently collapsed element.

This matters more than it sounds. A half-sourced build full of labelled placeholders reads as
work in progress. The same build with mismatched stock imagery reads as finished and wrong.

### Assets the old build won't have

~~The hero visual needs a screen capture of the real creator app.~~ Resolved 2026-09-15: the
hero has no phone frame or product screen (see LANDING-PAGE.md, Section 1), so no capture is
needed. Never improvise a fake app UI in its place.

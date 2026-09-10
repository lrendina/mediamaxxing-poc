# PLAN.md

Build plan for the MediaMaxxing proof-of-concept reskin. Work through phases in order. Stop
at the end of each phase for review.

Legend: **[AGENT]** run it · **[HUMAN]** I do this or sign off before you continue

---

## Scope

**In:** the three-column shell, the design system, `/` built completely, `/for-brands` built
to prove the template generalizes, stubs for everything else.

**Out:** `/mcp` beyond a stub, `/blog`, `/auth`, `/careers`, `/legal`, working forms,
any backend.

`/mcp` is the most complex page on the live site — tabs, a client selector, clipboard
interaction, a simulated chat thread. It is not worth the time for a POC and building it
badly is worse than not building it.

---

## Phase 0 — Scaffold

- [AGENT] `npx create-next-app@latest mediamaxxing-poc --typescript --tailwind --app --eslint`
- [AGENT] `git init`, initial commit, branch `main`
- [AGENT] Add `next/font` for the chosen typeface. No other dependencies.
- [AGENT] Create empty `components/`, `content/`, `public/proof/`
- [AGENT] Confirm `npm run dev` serves and `npm run build` passes clean

**[HUMAN] Assets.** Decide whether to pull the testimonial screenshots from the live site
into `public/proof/`, or ship with labeled placeholder blocks. The proof imagery is doing
most of the persuasive work — a feed of empty gray rectangles will look hollow in a review.
These are public marketing assets from the company you're interviewing with, so using them
in a POC you present back to them is defensible. Make that call yourself; don't delegate it.

---

## Phase 1 — Design system

This is the phase that determines whether the rest of the work is good. Nothing else starts
until it's signed off.

**Proposed direction — grounded in the subject, not a default kit.** The product pays
creators per view. The emotional center of the whole site is a number going up: the earnings
dashboard screenshot. So the money is the design, and everything else gets out of its way.

### Color

Bright, as briefed. Not cream, not near-black, not a neon-on-dark scheme.

```
--canvas   #FFFFFF   page
--panel    #EDF1EC   card surface, sidebar rail
--ink      #0E1A12   primary text (deep forest-black, ties to the accent)
--muted    #5F6F63   secondary text
--payout   #16C95C   the accent — money, counters, primary CTA only
--live     #FF4A2B   scarcity and status only (tier badges, "limited spots")
```

Two chromatic colors, each with one job. `--payout` is not decoration: if an element isn't
about earning, it doesn't get the green.

### Type

One family, two widths. **Archivo** for UI and body, **Archivo Expanded** for dollar figures
and counters. Expanded width makes the money the visual event without needing a second
typeface or a color highlight. Tabular figures on every number so counters don't jitter.

Scale: 13 / 15 / 18 / 24 / 40 / 64. Body 15/1.6, feed column capped at ~68 characters.
Sentence case everywhere.

### Layout

Left rail 240px fixed · feed 600px max, centered · right rail 300px. Right rail drops below
1280px, sidebar collapses to a 72px icon rail below 1024px, becomes a bottom tab bar below
768px. Content left-aligned throughout — centered text in a feed reads as a landing page and
undoes the whole premise.

### Tasks

- [AGENT] Write tokens into `app/globals.css`, wire into `tailwind.config.ts`
- [AGENT] Build a `/styleguide` route rendering the full palette, type scale, and every
  button and badge state, so the system can be reviewed in isolation
- [AGENT] Stop. Do not build components yet.

**[HUMAN] Sign off on the styleguide.** Open `/styleguide`, look at it, and either approve
or change it. This is the one judgment an agent genuinely cannot make for you, and every
later phase inherits it. If the green is wrong, find that out now and not after forty
components are built against it.

---

## Phase 2 — Shell

- [AGENT] Three-column layout in `app/layout.tsx` so every route inherits it
- [AGENT] `Sidebar` — logo, five nav items with icons, active state, Get started CTA pinned
  to the bottom
- [AGENT] `RightRail` — live counters, a persistent sign-in card, a "suggested" list
- [AGENT] `Feed` — the centered scrolling column with consistent card rhythm
- [AGENT] All three responsive collapses, including the mobile bottom tab bar
- [AGENT] Keyboard navigation through the sidebar, visible focus, skip-to-content link

**[HUMAN] Check the mobile view on an actual phone**, not a narrowed browser window. The
bottom tab bar is the single most FYP-authentic thing in this build and also the easiest to
get subtly wrong — thumb reach, safe-area insets, whether the feed scrolls under it cleanly.

---

## Phase 3 — Primitives

Twelve components carry all four pages. Restyle these and everything moves at once.

- [AGENT] `Button` (primary / secondary / ghost)
- [AGENT] `Card` — the base feed unit, with variants for hierarchy rather than one uniform
  rounded rectangle for everything
- [AGENT] `ProofCard` — creator name, handle, earnings figure, tier badge, dashboard
  screenshot, phone screenshot, stat grid, blurb. Expands to full screenshot on click.
- [AGENT] `StatGrid` — replaces the middle-dot strings
- [AGENT] `Counter` — count-up on first view only, respects reduced motion
- [AGENT] `StepCard`
- [AGENT] `FeatureStatCard`
- [AGENT] `Accordion`
- [AGENT] `BlogCard`
- [AGENT] `CTABand`
- [AGENT] `Badge` (tier, status)
- [AGENT] `LogoLockup`
- [AGENT] Render every one in `/styleguide` with all states

---

## Phase 4 — Content extraction

- [AGENT] `content/creators.ts` — all eight testimonials with their real figures and copy
- [AGENT] `content/steps.ts`, `content/faq.ts`, `content/nav.ts`, `content/blog.ts`
- [AGENT] Typed interfaces for each

**[HUMAN] Copy pass.** The site's headlines are built around an italicized word; once that's
gone, some of them read flat. "Start earning in three simple steps" and "Real creators, real
income" both need a rewrite that works without the highlight. Write those yourself — the
copy is where a reskin either sounds like the brand or doesn't, and you have a better ear for
their voice than the agent does.

---

## Phase 5 — Homepage

- [AGENT] Assemble `/` as a feed, preserving section order: hero → proof → how it works →
  counters → FAQ → blog → footer card
- [AGENT] Proof section leads. Eight creator cards are the feed's center of gravity.
- [AGENT] Sticky filter chips at the top of the feed (All / Earnings / How it works /
  Questions) that scroll to sections — the feed affordance that costs nothing and sells the
  concept
- [AGENT] One orchestrated page-load moment. Not per-section animations.

**[HUMAN] Read the page as a prospect, not a builder.** Scroll it top to bottom and ask
whether the argument still lands in feed form. If proof-first buries the value proposition,
that's a real finding and worth writing up — a redesign that reports its own trade-offs is
stronger than one that pretends there weren't any.

---

## Phase 6 — Second page and stubs

- [AGENT] `/for-brands` from the same primitives, different content
- [AGENT] Stub `/for-agencies`, `/mcp`, `/blog`, `/auth` — real shell, honest placeholder
  content, no fake UI
- [AGENT] Non-functional forms clearly labeled as such

---

## Phase 7 — Polish

- [AGENT] Keyboard pass on every interactive element
- [AGENT] Alt text audit
- [AGENT] Reduced-motion check
- [AGENT] Lighthouse run, report scores
- [AGENT] `npm run build` clean
- [AGENT] `README.md` with setup instructions and a note that this is an unaffiliated POC

**[HUMAN] Deploy and write the presentation.** Vercel from your own account. Then the part
that actually decides the interview: before/after screenshots, the twelve-primitive
inventory, the footer inconsistency you found on the live site, and a paragraph on why the
funnel order survived inside the feed metaphor. Most candidates submit a prettier page. You
are submitting a structural read of their site. Lead with that.

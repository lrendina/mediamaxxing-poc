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

**Additive:** the scroll-driven device intro (Phase 8). It sits on top of a site that is
already finished and deployed. It is deliberately the last thing built and the first thing
cut.

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

**Superseded — see DESIGN-TOKENS.md.** The original proposal here made green the primary
accent. Screenshots of the live creator app then showed that the product already uses blue
for actions and green for money, and that split carries meaning we cannot break. The token
file reconciles the two: the app's semantic roles, our values.

Read DESIGN-TOKENS.md before writing a single line of CSS.

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

---

## Phase 8 — Scroll-driven device intro

Deliberately after Phase 7. The site is already finished, polished, and deployed by the time
this starts. If Phase 8 runs long, gets cut, or doesn't land visually, deleting it leaves a
complete build behind. Do not start it early, and do not start it while anything in Phases
0–7 is still open.

### The decision, already made

The intro zooms into a **phone**, not a laptop. Three reasons, so you don't relitigate it:

1. Every creator in the testimonials posts from a phone, dozens of times a day. A laptop on
   a desk is B2B SaaS vernacular and reads as borrowed from a different company.
2. A phone screen is roughly 9:19.5 and a mobile viewport is roughly 9:19.5. A laptop's
   16:10 screen inside a portrait viewport is a postage stamp — the effect dies on the device
   most of the audience uses.
3. The feed column is capped at 600px, so the phone screen expands to *exactly* the feed
   column rather than to full bleed, while the sidebar and right rail slide in around it.
   The object you fly into becomes the object you scroll. That is the whole thesis of the
   redesign, delivered in three seconds without copy.

### Structure

There is no transition between "the screen" and "the page." It is one element throughout.
The content inside the phone is the **real hero DOM rendered at natural size and scaled
down**, never a screenshot. Zooming in is just returning it to `scale(1)` — no resolution
loss, no crossfade seam, no second copy of the hero to keep in sync.

```
<section class="intro">        height: 250vh
  <div class="stage">          position: sticky; top: 0; height: 100vh; overflow: hidden
    <div class="scene">        transform-origin: center of the phone screen
      <div class="field" />    background wash — scales 1.15x for parallax, fades out
      <div class="device" />   phone chrome, CSS/SVG only — fades out over p 0.6–0.9
      <div class="viewport">   the real hero, full size, pointer-events: none until p === 1
    </div>
  </div>
</section>
```

### The math

Progress `p` runs 0 to 1 across the 150vh above the sticky release.

```js
const s0    = screenWidthPx / targetWidthPx        // e.g. 210 / 600 = 0.35
const scale = s0 * Math.pow(1 / s0, p)             // geometric, not linear
```

Use geometric interpolation. Linear interpolation between `s0` and `1` reads as a zoom
decelerating into a wall; geometric reads as constant velocity, which is what flying in
actually feels like. This one line is most of the difference between the effect looking
expensive and looking cheap.

### Driver

`position: sticky` plus an `IntersectionObserver` that attaches a rAF-throttled scroll
handler **only while the section is in view**, and detaches on exit. Roughly forty lines.

- No GSAP, no Framer Motion, no ScrollMagic. A scroll-jacked hero shipping a 50kb animation
  library is an easy thing for a reviewer to poke at.
- No native `animation-timeline: scroll()`. It is the better long-term answer, but its
  failure mode is bad: a browser that doesn't implement `animation-timeline` drops only that
  declaration and keeps the rest of the rule, firing a time-based animation immediately on
  page load, all at once, in the wrong place. Guarding it needs `@supports` plus a parallel
  JS path, which is two implementations of the same effect. Not worth it here.
- The device frame is CSS or inline SVG. No stock photography — a photographed desk scene
  will fight the flat bright palette from Phase 1.

### Tasks

- [AGENT] `components/DeviceIntro.tsx` implementing the structure above
- [AGENT] Compute `s0` from measured element rects on mount and on resize, never hardcode it
- [AGENT] Wire the sidebar and right rail to fade and slide in over `p` 0.75–1.0
- [AGENT] Confirm that at `p === 1` the hero is pixel-identical to the static Phase 5 hero
- [AGENT] `prefers-reduced-motion: reduce` collapses the section to `height: 100vh`, locks
  scale at 1, hides the device and field layers. The hero simply appears.
- [AGENT] Below 768px, same collapse. Mid-range Android turns 250vh of transform into a
  slideshow.
- [AGENT] A single `INTRO_ENABLED` flag that removes the whole thing cleanly
- [AGENT] Verify no layout shift on load and no scroll position restoration bug on refresh
  partway through the intro

### Acceptance criteria

- Keyboard tab from the address bar reaches real, focusable hero content, not a 200px-wide
  button floating in space
- Refreshing mid-intro restores to a coherent state
- Scroll stays at 60fps on a throttled CPU profile
- Removing `INTRO_ENABLED` leaves Phase 7's site byte-for-byte intact

**[HUMAN] Decide whether it earns the scroll.** You are making every visitor pass through
150vh of nothing before reaching content. On a real marketing site that is a measurable
conversion trade. For a POC it is probably the right call, but you have to look at it and
judge — an agent cannot tell you whether flying into a phone feels expensive or feels like a
gimmick. If it feels like a gimmick, cut it. The flag is there for exactly that.

**[HUMAN] Test on real hardware.** A throttled desktop profile is not an older Android phone.

**[HUMAN] Name the trade-off in the writeup.** Do not let a reviewer raise the
time-to-content cost first. "I added this knowing it delays time-to-content, and here is why
I think it earns the delay on this specific site" is a far stronger position than being
asked about it. Then redeploy.

---

## Phase 9 — Creator app prototype

Full spec in **CREATOR-APP.md**. Fixture shapes in **DATA-MODEL.md**. Read both before
starting; this phase has more observed detail than the rest of the plan combined, and
inventing structure that contradicts a screenshot is the main way it goes wrong.

### Why this phase exists

The live creator dashboard already uses a left sidebar, a content column, and a right rail.
So the marketing redesign is not an invention — it is the app's own shell applied to the one
surface that ignores it. Building both proves that in a way no amount of writeup can.

This phase is **a faithful rebuild in our tokens, not a redesign**. Do not restructure their
information architecture, rename their nav, or improve their flows. Reskin and reproduce.

### Order

- [AGENT] Shell first: `AppSidebar` (expanded + collapsed), `TopBar`, `DiscordBanner`,
  `RankBar`, `PageHeader`, `DarkModeToggle`. Confirm it composes with the marketing shell from
  Phase 2 rather than duplicating it.
- [AGENT] `content/creator/` fixtures per DATA-MODEL.md, both `newCreator` and `activeCreator`
- [AGENT] `/creator/campaigns` — missions, disclosures, featured card with live countdown,
  brand grid
- [AGENT] `/creator/campaigns/[brand]/[campaign]` — the three-pane detail view. Largest single
  screen in the project.
- [AGENT] `/creator/earnings` — both the locked zero state and the populated state
- [AGENT] `/creator/submissions`, `/creator/retainers`, `/creator/courses` — observed states
  are empty or locked, so these are cheap and accurate. Build populated variants too.
- [AGENT] `/creator/white-label`
- [AGENT] `?state=populated` query param switching the fixture set globally
- [AGENT] A dev-only toggle in the sidebar switching between the marketing surface and the
  creator app. No auth, no login screen.

### Rules

- Every mutating control is inert and visibly labelled a prototype control.
- Brand artwork is deterministic CSS gradients keyed off brand id. No stock photography, no
  generated images.
- The leaderboard uses the real handles and figures from the screenshots.
- Countdowns compute from ISO timestamps at render, so `23h 38m` actually ticks.
- Anything marked `(assumed)` in CREATOR-APP.md stays flagged in a code comment.

**[HUMAN] Confirm the cropped labels.** The three stats atop the campaign detail view
($3.5/1K, 990, $3,500) had their labels cut off in the screenshot. Check the live app and
tell the agent what they say before it ships a guess.

**[HUMAN] Decide how far the empty states go.** The observed account is brand new, so seven
of eight surfaces are empty or locked. That is either an accident of the screenshot or the
most interesting finding in the project. You have to look at the live app with an older
account to know which.

**[HUMAN] Cut scope.** Nine phases is more than a take-home usually justifies. A tight build
covering the marketing feed, the campaigns index, and the campaign detail view beats a
sprawling one that runs out of runway at Phase 7. Decide what you are willing to drop before
the agent starts, not after.

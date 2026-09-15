# PLAN.md

Build plan for the MediaMaxxing proof-of-concept redesign. Work through phases in order. Stop
at the end of each phase for review.

Legend: **[AGENT]** run it · **[HUMAN]** I do this or sign off before you continue

**Read first:** `MIGRATION.md` (this is a rebuild in an existing repo), `LANDING-PAGE.md`
(page spec), `DESIGN-TOKENS.md` (tokens).
`CREATOR-APP.md` and `DATA-MODEL.md` apply to Phase 9 only.

---

## Scope

**In:** the conversion-first landing page, the design system, and `/for-brands` to prove the
system generalizes. Stubs for everything else.

**Out:** `/mcp` beyond a stub, `/blog`, `/auth`, `/careers`, `/legal`, working forms, backend.

**Optional:** the creator app prototype (Phase 9). Separate deliverable, not load-bearing.

**Cut:** the feed-and-sidebar concept, and the scroll-driven device intro. See the note after
Phase 7.

---

## Phase 0 — Migration

**The repo already contains a complete build of the previous design.** This is a rebuild, not
a scaffold. Follow `MIGRATION.md` end to end: branch, inventory, extract, triage, tear down.

It ends with a human review of `INVENTORY.md` before anything is archived. Do not skip that
gate — the old build is the only source for the testimonial copy, the FAQ answers, and the
proof imagery, and a component deleted before extraction takes its hardcoded content with it.

- [AGENT] `MIGRATION.md` Steps 0 through 4
- [AGENT] Report framework facts: router, Tailwind version, existing custom properties,
  font loading

**[HUMAN] Review `INVENTORY.md`.** You know which components were solid and which were tape.
Correct the Keep/Adapt/Archive verdicts before anything moves.

**[HUMAN] Confirm the font.** `DESIGN-TOKENS.md` specifies Archivo Expanded for money
numerals. Check it resolves as its own family in `next/font/google` rather than as a width
axis on Archivo. This fails silently — the fallback renders, nothing errors, and the one
typographic decision carrying the money hierarchy just isn't there.

---

## Phase 1 — Design system

Nothing else starts until this is signed off. Every later phase inherits it.

- [AGENT] Retune the existing `app/globals.css` — its custom properties and its `@theme inline`
  block (Tailwind v4, there is no `tailwind.config.ts`) — to `DESIGN-TOKENS.md`. Change the
  values in place rather than rewriting the file, so the old build's token plumbing survives.
- [AGENT] Grep `components/` for hardcoded hex values and report every hit. Any colour that
  didn't move when the tokens changed is a bug from the old build.
- [AGENT] Enforce the constraints structurally: one radius variable, exactly two shadow
  variables, spacing scale restricted to the 8px steps. If a component later needs a value
  outside the scale, that is a conversation, not a new token.
- [AGENT] Build a `/styleguide` route showing the palette, the full type scale at desktop and
  mobile sizes, both shadow states, and every button and pill variant
- [AGENT] Stop. Do not build page sections yet.

**[HUMAN] Sign off on the styleguide.** Check the H1→H2→H3 jumps at real sizes — big
hierarchy steps look decisive in a spec and can look broken on a narrow screen. This is the
one judgment an agent cannot make for you.

---

## Phase 2 — Page shell

- [AGENT] Centered single-column layout in `app/layout.tsx`. No sidebar, no rails.
- [AGENT] `Header` — wordmark, thin nav, single CTA button
- [AGENT] `StickyHeader` — slim variant that appears once the hero scrolls out and hides
  inside the final CTA section. IntersectionObserver, not a scroll listener.
- [AGENT] `Footer` — rebuild the existing one, and reconcile the two variants on the live site
  (the `/mcp` footer drops a link and changes the company name)
- [AGENT] `Section` wrapper enforcing the 96/64 vertical padding and the 1120/720 max-widths
- [AGENT] Skip-to-content link, semantic landmarks

---

## Phase 3 — Primitives

**Status (2026-09-15):** Implemented and verified; ready for visual review at `/styleguide`.
Four DeepSeek MCP coding tasks, lead integration decisions, and validation results are in
[`docs/phase-3/README.md`](docs/phase-3/README.md).

Most of these already exist. Adapt them per the hazards in `MIGRATION.md` Step 4 — width
assumptions, 8px spacing, single radius, two shadows — rather than rebuilding from scratch.
Only the components marked new below have no predecessor.

- [AGENT] `Button` — primary, secondary, ghost. Primary is the only one used for the page CTA.
- [AGENT] `Card` — base surface, `--shadow-1` at rest, `--shadow-2` plus 2px lift on hover
- [AGENT] `StepCard` (existing), `FeatureCard` (H3 benefit over body feature), `BadgeTile` (**new**)
- [AGENT] `TestimonialCard` — name, handle, earnings in expanded numerals, tier badge,
  screenshot thumbnail, story, lightbox trigger
- [AGENT] `StatRow` — labelled stat pairs, replaces the middle-dot strings
- [AGENT] `LeaderboardRow` — **new.** Rank, avatar or initials, handle, right-aligned money
- [AGENT] `Accordion` — existing, plus **new** category grouping
- [AGENT] `LogoRow`, `Lightbox`, `Pill`
- [AGENT] Every variant rendered in `/styleguide`

---

## Phase 4 — Content

**Status (2026-09-15):** Agent work done. Every module is typed and derives from
`content/source/` or `content/creator/` rather than retyping copy. Beyond the list: `hero.ts` and
`final-cta.ts`, so Phase 5 has no inline copy, and `claims.ts`, which reads the substantiation
figure from the leaderboard. The FAQ ships only questions with sourced answers (one today); the
gap questions were cut, so there is no human FAQ pass. Two trust tiles still need a copy
decision (see the comment in `content/trust.ts`). Phase 5 has not started.

Source everything from `content/source/`, extracted in Phase 0. The copy in the repo is
authoritative — do not rewrite it or regenerate it from memory of the live site.

- [AGENT] `content/cta.ts` — the single CTA label string, imported by all five CTAs
- [AGENT] `content/creators.ts` — eight testimonials, real figures and copy
- [AGENT] `content/leaderboard.ts` — top earners from the creator app
- [AGENT] `content/faq.ts` — only questions with sourced answers, per `LANDING-PAGE.md`
- [AGENT] `content/steps.ts`, `content/features.ts`, `content/trust.ts`, `content/nav.ts`
- [AGENT] Typed interfaces for each

~~**[HUMAN] Write the FAQ answers for the gaps.**~~ Cut 2026-09-15: unanswered questions don't
ship.

---

## Phase 5 — Landing page

**Status (2026-09-15):** Agent work done; ready for the human read on a phone. All six sections
are built at `/` in spec order with the text-led hero, the CSS-only hero entrance, and the
card lift on testimonial, feature and trust cards only. Trust tile and substantiation copy is
kept as the spec wrote it. Feature and trust icons are new decorative glyphs
(`components/LandingIcon.tsx`); brand logos are still named placeholders.

Build sections in order from `LANDING-PAGE.md`: hero, solution, social proof, guarantee, FAQ,
final CTA.

- [AGENT] Text-led hero per general hero conventions — no phone frame, no product screen
- [AGENT] Hero entrance animation — staggered fade and 12px rise, once, reduced-motion safe
- [AGENT] All five CTAs wired to the same label constant and the same destination
- [AGENT] Substantiation line in the hero and the final CTA. Non-negotiable — see the earnings
  claims section of `LANDING-PAGE.md`.
- [AGENT] No scroll-triggered reveals anywhere

**[HUMAN] Read it as a prospect, on a phone.** Scroll the whole thing and ask whether you'd
sign up. The hero promise is a six-figure income claim; if the page doesn't earn it by the
time you reach the FAQ, the proof is in the wrong order.

---

## Phase 6 — Second page and stubs

- [AGENT] `/for-brands` from the same primitives
- [AGENT] Stub `/for-agencies`, `/mcp`, `/blog`, `/auth`
- [AGENT] Non-functional forms clearly labelled as such

---

## Phase 7 — Polish

- [AGENT] Keyboard pass, visible focus on every interactive element
- [AGENT] Alt text audit
- [AGENT] Reduced-motion check on both animations
- [AGENT] Responsive to 375px, tap targets 44px minimum
- [AGENT] Lighthouse run, report scores
- [AGENT] `npm run build` clean
- [AGENT] `README.md` noting this is an unaffiliated POC

**[HUMAN] Deploy and write the presentation.** Vercel, your own account. Lead with the
structural findings, not the visuals — the duplicated footer, the two competing creator
routes, the fact that their own app already solved problems the marketing site hasn't, and
the cold-account onboarding gaps in `CREATOR-APP.md`. Those observations survived the redesign
pivot and they're what separate a reskin from a read of the product.

---

## Cut: the scroll-driven device intro

Removed under the new brief. Motion is limited to a hero entrance and hover lifts, and a 250vh
scroll-jacked zoom is the opposite of that. It also cost 150vh of time-to-content, which is
the exact trade a conversion-first page refuses to make.

Worth one line in the presentation: built the concept, cut it on conversion grounds. Showing
an idea you killed for a reason is stronger than showing one you kept for a feeling.

---

## Phase 9 — Creator app prototype (optional)

Spec in `CREATOR-APP.md`, fixtures in `DATA-MODEL.md`.

**Its original justification changed.** This phase existed to prove the marketing site and the
app shared one shell. The marketing page no longer has a sidebar, so that version of the
argument died with the pivot. The two are still one app — shared tokens, card geometry, pills,
and colour meanings — and the creator app is where that continuity shows. Still worth
something; not load-bearing for the landing page.

Build it only if Phases 0–7 are finished, deployed, and polished. If time is short, cut it and
put the screenshot findings in the writeup instead. They carry most of the value on their own.

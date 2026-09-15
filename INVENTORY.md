# INVENTORY.md

MIGRATION.md Step 1. Written on `rebuild/conversion-page` before any triage. **Nothing has
moved.** Verdicts are proposals for human review.

Verdicts: **Keep** (carries over as-is or near it) · **Adapt** (markup survives, assumptions
don't) · **Archive** (move to `_archive/`, extract content first).

---

## Read this first — the repo is not what MIGRATION.md expects

MIGRATION.md describes one abandoned design: a feed with a sidebar and right rail. The repo
actually holds **two abandoned marketing directions and a finished creator app**:

| Surface | Route | Components | Tokens |
|---|---|---|---|
| Paper-and-signal feed (sidebar, feed, right rail, DeviceIntro) | `/` via `app/(home)` | `components/original/*` | `.original-surface` scope |
| "Loud" black-and-acid-lime, full-bleed | `/loud`, and styles `/for-brands`, stubs, `/styleguide` | top-level `components/*` | `:root` |
| Creator app prototype (Phase 9, already built) | `/creator/*` | `components/creator/*` | `.creator-surface` scope |

Consequences for triage:

1. **Most primitives exist twice**: `Accordion`, `Badge`, `BlogCard`, `Button`, `Card`,
   `CTABand`, `ProofCard`, `SiteFooter`, `StatGrid`, `StepCard`. The `original/` copies are
   much closer to DESIGN-TOKENS.md. They use sentence case, hairline borders, and money-green
   meaning dollars. The loud copies break the kill list: uppercase eyebrows, `01/02/03` step
   numerals, hard offset shadows, and lime as the brand colour. **Proposal: adapt from the
   `original/` copy and archive the loud copy.** If accepted, the `original/` files move up
   into `components/` during triage.
2. **MIGRATION.md's Keep/Adapt names don't all exist.** Mapping:
   - `TestimonialCard` → `ProofCard`
   - `Lightbox` → the `<dialog>` inside `ProofCard`, not its own component
   - `Pill` → none on marketing; the creator app has `RatePill` and `BadgePill`
   - `FeatureStatCard` → exists, but is a big-number card, not the spec's `FeatureCard`
   - `LeaderboardRow` → none; the nearest pattern is `creator/LeaderboardList`
3. **The creator app is outside this triage.** It depends on shared marketing files that must
   survive archival: `icons`, `LogoLockup`, `SidebarNavItem`, `SurfaceSwitch`, `MobileTabBar`,
   `lib/*`, `app/fonts.ts` (Instrument Serif), and the `.creator-surface` block in `globals.css`.

---

## Framework facts

| | |
|---|---|
| Router | **App Router.** Next.js 16.3.4 (Turbopack), React 19.2.8. Route groups `(home)`, `(marketing)`, plus `creator/`. |
| Tailwind | **v4** via `@tailwindcss/postcss`. **There is no `tailwind.config.ts`.** The theme is CSS-first `@theme inline` in `app/globals.css`. CLAUDE.md and PLAN Phase 1 name a config file that doesn't exist, so the Phase 1 retune happens in `globals.css` only. |
| Custom properties | **Yes, in three scopes:** `:root` (loud), `.creator-surface`, `.original-surface`. Names already match DESIGN-TOKENS.md for canvas, surface, surface-sunk, surface-dark, border, ink, muted, ink-inverse, action(-sunk), money(-sunk), streak(-sunk), warn(-sunk), discord. Extras not in the spec: `border-strong`, `on-pastel`, `on-art`, `lime`, `money-ink`, `status(-sunk)`, the legacy aliases `panel`/`canvas-alt`/`payout`/`live`, `rank-*` (creator only), feed layout vars, `--text-*`. |
| Radius / shadow tokens | Three radius tokens (`--radius-card` 12/20, `--radius-control` 8/12, `--radius-tile` 8/12) plus `--radius-pill`. Two shadows, `--shadow-lift` and `--shadow-pop`, whose values differ per scope. The spec wants one `--radius` and `--shadow-1`/`--shadow-2`. |
| Fonts | `next/font/google` in `app/fonts.ts`. **Archivo** is variable with the `wdth` axis → `--font-archivo`. **Instrument Serif** 400 normal and italic → `--font-display`, used by the creator app and `original/`. "Expanded" is the `.font-expanded` class (`font-variation-settings: "wdth" 125`). |
| **Archivo Expanded check** (PLAN Phase 0 human gate) | **It is not a separate family in next/font.** `font-data.json` lists only `Archivo` (wdth 62–125, wght 100–900), `Archivo Black`, and `Archivo Narrow`. Archivo Expanded is Archivo at `wdth 125`. The current setup loads the axis, so it really renders rather than silently falling back. DESIGN-TOKENS.md should say "Archivo, wdth 125", or you should confirm this is acceptable. |
| Dependencies | next, react, react-dom, **agentation** (dev-only feedback toolbar, mounted in the root layout). The original Phase 0 list was "next/font, no other dependencies", so `agentation` is already beyond it. |
| Build / lint | `npm run build` **passes clean**: 24 static pages. `npm run lint` **clean**. |

---

## `components/` — loud direction (top level)

| File | What it is | Needed by LANDING-PAGE.md? | Verdict |
|---|---|---|---|
| `Accordion.tsx` | Loud `<details>` accordion; uppercase display questions, 2px ink rules | Superseded by `original/Accordion` | **Archive** |
| `Badge.tsx` | Loud uppercase badge, `rounded-[6px]`, lime/status tones | Superseded by `original/Badge` | **Archive** |
| `BlogCard.tsx` | Loud blog card, hard offset hover shadow | No (`/blog` stub only) | **Archive** (use `original/BlogCard`) |
| `Button.tsx` | Loud button: primary, secondary(=lime), ghost, lime, inverse | Superseded by `original/Button` | **Archive** |
| `Card.tsx` | Loud card; spotlight has a 6px hard offset shadow; lime variant | Superseded by `original/Card` | **Archive** |
| `Counter.tsx` | Count-up number fired on scroll-into-view | No. Spec has no counters, and this is scroll-triggered motion. Used by `/for-brands`. | **Archive** |
| `CTABand.tsx` | Full-bleed lime band, uppercase eyebrow, viewport-scale headline | The final CTA needs full-bleed dark instead | **Archive** (adapt `original/CTABand`) |
| `DemoVariantToggle.tsx` | Floating Loud/Original switch for the demo | No | **Archive** |
| `DeviceIntro.tsx` | Phase 8 250vh scroll-jacked phone fly-in | No, cut in PLAN | **Archive** |
| `FeatureStatCard.tsx` | Big-number card; styleguide only, invented figures | No. Spec's `FeatureCard` is icon + H3 + body, a different thing | **Archive** |
| `icons.tsx` | Marketing nav and arrow SVG icons, `iconByName` map | Yes (the creator app imports it) | **Keep** |
| `iphone.tsx` | Inline-SVG iPhone frame with a screen slot | Yes, the hero phone frame | **Adapt**. 11 hardcoded hex fills and a `dark:` variant to move onto tokens. |
| `LogoLockup.tsx` | Logo PNG + "MediaMaxxing" wordmark | Yes (header, footer; creator app too) | **Keep** (`rounded-md` → radius token) |
| `Marquee.tsx` | Endless earnings ticker | No (unsanctioned motion) | **Archive** |
| `MobileTabBar.tsx` | Shared bottom tab bar | Not for marketing; the creator app's `AppTabBar` uses it | **Keep** (creator dependency) |
| `ProofCard.tsx` | Loud testimonial card, lime offset shadow, poster-size figure, dialog | Superseded by `original/ProofCard` | **Archive** |
| `SidebarNavItem.tsx` | Nav item shared by both sidebars | Not for marketing; the creator app's `AppSidebar` uses it | **Keep** (creator dependency; the `marketing` tone goes dead) |
| `SiteFooter.tsx` | Loud black footer with giant wordmark | Superseded by `original/SiteFooter` | **Archive** |
| `SkipToContent.tsx` | Skip link to `#main` | Yes | **Keep** |
| `StatGrid.tsx` | Loud stat tiles, uppercase labels | Superseded by `original/StatGrid` | **Archive** |
| `StepCard.tsx` | Giant lime `01/02/03` numeral + title + body | No (kill list) | **Archive** |
| `Stub.tsx` | Stub page scaffold: eyebrow, display title, back button | Yes (Phase 6 stubs) | **Adapt** (uppercase eyebrow, display type) |
| `SurfaceSwitch.tsx` | Dev-only link between marketing and creator app | The creator app's `AppSidebar` uses it | **Keep** |
| `TopNav.tsx` | Sticky black bar, lime pill links, Sign in + "Get started" | Basis for `Header` | **Adapt**: single CTA from `cta.ts`, drop lime, thin nav |

## `components/original/` — paper-and-signal feed

| File | What it is | Needed? | Verdict |
|---|---|---|---|
| `Accordion.tsx` | Hairline `<details>` accordion, sentence case | Yes (FAQ) | **Keep**. Phase 3 adds category grouping. |
| `BackdropController.tsx` | IntersectionObserver that swaps page background per section | No | **Archive** |
| `Badge.tsx` | Soft role pill: neutral / money / status | Yes (tier badge) | **Adapt**. `--status` isn't in DESIGN-TOKENS.md; `px-2.5` is off-grid. |
| `BlogCard.tsx` | Card + cover + title + excerpt | `/blog` stub only | **Adapt** |
| `Button.tsx` | primary(ink) / secondary(money) / ghost pill button | Yes | **Adapt**. The primary role should probably be `action`, and secondary shouldn't be money; see DESIGN-TOKENS roles. `py-3.5` is off-grid, and there's an inset rgba shadow. |
| `Card.tsx` | default / panel / spotlight / dark surfaces | Yes | **Adapt**: `--shadow-1` rest, `--shadow-2` + 2px lift on hover, single radius |
| `CTABand.tsx` | Dark rounded CTA card with blurred money blob | Final CTA | **Adapt**: full-bleed, no blob, oversized primary CTA, substantiation line |
| `MarketingTabBar.tsx` | Marketing mobile bottom tabs | No | **Archive** |
| `ProofCard.tsx` | Testimonial: avatar initial, tier badge, expanded earnings, dashboard + phone, StatGrid, blurb, `<dialog>` lightbox | Yes, as `TestimonialCard` + `Lightbox` | **Adapt**: 600px feed-width assumptions, radii 14/18px, equal-height grid, two-line story |
| `RightRail.tsx` | Right rail: paid-this-month counter, email form, "Earning right now" list | No | **Archive**. The figures inside are invented; see content flags. |
| `Sidebar.tsx` | Marketing left sidebar / icon rail | No | **Archive** |
| `SiteFooter.tsx` | Logo, two link groups, disclaimer, copyright | Yes (Footer) | **Adapt** (reconcile with the `/mcp` footer variant in Phase 2) |
| `StatGrid.tsx` | Hairline-divided `dl` of labelled values | Yes, as `StatRow` | **Adapt** (`px-4 first:pl-0` is fine; check widths) |
| `StepCard.tsx` | Icon tile + title + body card | Yes (3 steps) and the basis for `FeatureCard` | **Adapt** (plain number in title, `gap-1.5` off-grid) |

## `components/creator/` — Phase 9 creator app

**Verdict for the whole directory: Keep.** It is a separate surface, not part of this
teardown. It uses its own `.creator-surface` tokens and will need its own 8px, single-radius,
two-shadow sweep if Phase 9 is revisited. `LeaderboardList.tsx` is the reference pattern for
the new marketing `LeaderboardRow`, as a pattern rather than an import.

| File | What it is |
|---|---|
| `app-icons.tsx` | Creator-app SVG icon set + name map |
| `AppShell.tsx` | Sidebar, top bar, Discord banner, page; collapses on the detail route |
| `AppSidebar.tsx` | App nav, RankBar, profile row, state/surface switches |
| `AppTabBar.tsx` | Mobile bottom tabs via shared `MobileTabBar` |
| `Avatar.tsx` | Placeholder disc or initials (no photos) |
| `BadgePill.tsx` | Accepted / bounty / xp-multiplier / live pills |
| `BrandArtwork.tsx` | Deterministic gradient stand-in for brand art |
| `BrandCard.tsx` | Brand grid card, locked "Apply to join" variant |
| `BrandLogo.tsx` | Small gradient brand mark |
| `CampaignDetailScreen.tsx` | Three-pane campaign detail view |
| `CampaignSidebar.tsx` | Campaign sidebar: onboarding checklist, perks, CTAs |
| `CampaignsScreen.tsx` | `/creator/campaigns` index |
| `Countdown.tsx` | Ticking countdown from an ISO deadline |
| `CourseCard.tsx` | Course thumbnail + progress |
| `CoursesScreen.tsx` | `/creator/courses` |
| `CreatorsPanel.tsx` | Detail-view creators leaderboard rail |
| `CreatorStateProvider.tsx` | `?state=` fixtures + joined-brand client state |
| `DarkModeToggle.tsx` | Floating moon button (inert); arbitrary rgba shadow |
| `DiscordBanner.tsx` | Amber "connect Discord" callout |
| `EarningNowBadge.tsx` | Randomised "N creators earning right now" pill (fabricated number, previously flagged) |
| `EarningsScreen.tsx` | `/creator/earnings` |
| `EmptyState.tsx` | Glyph + title + body empty/locked state |
| `FeaturedCampaignCard.tsx` | Dark featured accepted-campaign card |
| `FeatureListCard.tsx` | Icon tile + title + description (white-label page) |
| `FilterChipBar.tsx` | Outlined filter chips (inert) |
| `GuidelinesPanel.tsx` | Amber campaign guidelines card |
| `IconTile.tsx` | Role-toned soft icon square |
| `InfoCallout.tsx` | Blue info callout |
| `LeaderboardList.tsx` | Ranked list: medal, avatar, handle, money |
| `LeaderboardPanel.tsx` | "Top Earners" panel with metric toggle |
| `MetricToggle.tsx` | Two-state segmented control; arbitrary rgba shadow |
| `MissionCard.tsx` | Daily mission / bonus card |
| `PageHeader.tsx` | Display h1 + subtitle + action slot |
| `PayRateTable.tsx` | "Pay Rate by Views" tiers |
| `ProgressBar.tsx` | Role-toned progress track |
| `PrototypeButton.tsx` | Inert labelled prototype control |
| `RankBar.tsx` | Sidebar rank/XP bar, opens ladder modal |
| `RankLadderModal.tsx` | Rank ladder + missions modal |
| `RatePill.tsx` | Blue "$7/1K Views" pill |
| `RetainersScreen.tsx` | `/creator/retainers` locked state |
| `RevenueCard.tsx` | Revenue figure + chart + toggles |
| `SectionDisclosure.tsx` | Collapsible section header with count |
| `Sparkline.tsx` | Decorative inline trend line |
| `StateSwitch.tsx` | Prototype new/populated switch |
| `StatStrip.tsx` | Hairline-divided stat card row |
| `StreakMeter.tsx` | Flame streak progress |
| `SubmissionRows.tsx` | Submission table/cards by status |
| `SubmissionsScreen.tsx` | `/creator/submissions` |
| `TopBar.tsx` | Collapse toggle, breadcrumb, Discord button |
| `WelcomeModal.tsx` | First-run modal behind `?welcome=1` |
| `WhiteLabelScreen.tsx` | `/creator/white-label` marketing-in-app page |
| `XpFillBar.tsx` | Animated XP fill on welcome |

---

## `content/`

| File | What it is | Needed? | Verdict |
|---|---|---|---|
| `blog.ts` | 3 real blog posts: title, excerpt, cover, date | `/blog` stub; the excerpts are the source for "over $1M paid" | **Keep** |
| `counters.ts` | Hero counters 5,200+ / $12M+ / 4.9★ | **No. Self-described round-number stand-ins, not real.** `for-brands.ts` imports its `HeroCounter` type. | **Archive** (move the type first) |
| `creators.ts` | 8 testimonials: name, handle, tier, earnings, image paths, stats, blurb | Yes (testimonial grid); imports `Stat` from `components/StatGrid` | **Keep** (source for `content/creators.ts`) |
| `faq.ts` | 5 FAQs; **only answer 1 is verbatim, answers 2–5 are self-flagged placeholders** | Partially; imports `AccordionItem` from loud `Accordion` | **Adapt** |
| `for-brands.ts` | Verbatim `/for-brands` copy: hero, 4 steps, 2 features, 100M+/30k+ counters, footer CTA | Phase 6 | **Keep** |
| `hero.ts` | Live-site hero headline/subhead, CTAs, proof headline, footer CTA | Superseded by LANDING-PAGE.md copy; keep as source | **Adapt** → `content/source/` |
| `nav.ts` | `SIDEBAR_NAV`, surface switch labels, `TOP_NAV_CTA`, `FOOTER_NAV`, copyright | Footer nav and nav items yes; `SIDEBAR_NAV` name and `TOP_NAV_CTA` stale | **Adapt** |
| `steps.ts` | Live-site "three simple steps" copy | Superseded by LANDING-PAGE.md steps; keep as source | **Adapt** → `content/source/` |
| `creator/*.ts` (14 files) | Creator app fixtures, types, and UI strings | `leaderboard.ts` → marketing leaderboard source; `brands.ts` → the 5 observed trust-bar brand names | **Keep** |

## `app/`

| File | What it is | Needed? | Verdict |
|---|---|---|---|
| `layout.tsx` | Root document: fonts, skip link, Agentation. Metadata says "three-column app shell". | Yes | **Adapt** (metadata copy; Phase 2 layout) |
| `fonts.ts` | Archivo (wdth) + Instrument Serif | Yes | **Keep** (Instrument Serif stays for the creator app) |
| `globals.css` | Three token scopes, `@theme inline`, base styles, marquee, backdrop theme rules, 150+ lines of DeviceIntro CSS | Yes | **Adapt**. Retune `:root` in Phase 1; strip the intro, backdrop, marquee, and `.original-surface` blocks at archival. |
| `favicon.ico` | Favicon | Yes | **Keep** |
| `(home)/layout.tsx` | Three-column feed shell; owns `/` | No | **Archive** |
| `(home)/page.tsx` | Feed homepage: DeviceIntro hero, proof, steps, counters, FAQ, blog, CTA | No (content extracted first) | **Archive** |
| `(marketing)/layout.tsx` | TopNav + `main` | Yes, the new `/` shell | **Adapt** |
| `(marketing)/loud/page.tsx` | Loud homepage demo | No | **Archive** |
| `(marketing)/for-brands/page.tsx` | Loud `/for-brands` | Phase 6 | **Adapt** (rebuild from new primitives) |
| `(marketing)/auth/page.tsx` | Stub | Phase 6 | **Adapt** (copy mentions a "sign-in card" that won't exist) |
| `(marketing)/blog/page.tsx` | Stub + real BlogCards | Phase 6 | **Adapt** |
| `(marketing)/for-agencies/page.tsx` | Stub | Phase 6 | **Adapt** (copy says "same feed pattern") |
| `(marketing)/mcp/page.tsx` | Stub | Phase 6 | **Adapt** |
| `(marketing)/styleguide/page.tsx` | Loud styleguide: hex swatches, invented FeatureStatCard figures, feed layout diagram | Phase 1 | **Adapt** (effectively rewritten in Phase 1) |
| `creator/**` (10 route files) | Creator app routes + layout | Phase 9 | **Keep** |

## `public/`

| File | Dimensions | Needed? | Verdict |
|---|---|---|---|
| `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | — | No. create-next-app boilerplate, zero references. | **Archive** |
| `proof/brand/logo.png` | 256×256 | Yes (LogoLockup) | **Keep** |
| `proof/blog/brands-guide-ugc-2026.png` | 1200×630 | `/blog` | **Keep** |
| `proof/blog/brands-shifting-budgets.png` | 1200×630 | `/blog` | **Keep** |
| `proof/blog/ugc-vs-influencer.png` | 1200×630 | `/blog` | **Keep** |
| `proof/creators/brayden/dashboard.png` · `phone.jpg` | 1450×725 · 900×1955 | Yes | **Keep** |
| `proof/creators/enel/dashboard.png` · `phone.jpg` | 1160×580 · **276×600** | Yes | **Keep** (phone is low-res) |
| `proof/creators/erica/dashboard.png` · `phone.jpg` | 1430×715 · 900×1955 | Yes | **Keep** |
| `proof/creators/jennifer/dashboard.png` · `phone.jpg` | 1350×675 · 900×1955 | Yes | **Keep** |
| `proof/creators/natalie/dashboard.png` · `phone.jpg` | **706×353** · 900×1956 | Yes | **Keep** (dashboard is low-res) |
| `proof/creators/rachael/dashboard.png` · `phone.jpg` | 910×455 · 900×1955 | Yes | **Keep** |
| `proof/creators/sam/dashboard.png` · `phone.jpg` | 1160×580 · **276×600** | Yes | **Keep** (phone is low-res) |
| `proof/creators/steven/dashboard.png` · `phone.jpg` | 1340×670 · 900×1955 | Yes | **Keep** |

All dashboards are 2:1. All phones are ~9:19.5. Paths are `proof/creators/{name}/…`, not
MIGRATION's `proof/{handle}-earnings.png`. Renaming is a triage decision, not required.

## Outside the listed directories

| File | Note |
|---|---|
| `lib/features.ts` | `INTRO_ENABLED` is dead once DeviceIntro is archived; `SURFACE_SWITCHER` still used → **Adapt** |
| `lib/brand-art.ts`, `format.ts`, `markdown.tsx`, `time.ts`, `useCountUp.ts` | Creator app utilities → **Keep**. `brand-art.ts` is the one documented non-token colour source. |
| `README.md` | Describes the three-column feed argument and a stale palette → rewrite in Phase 7 |
| `AGENTS.md` | Next.js agent rules block, auto-written by `next dev` → **Keep** |
| `.env.local`, `.vercel/` | Vercel link/env, git-ignored. Not read, not touched. |

---

## Preliminary asset manifest (full catalogue is Step 2)

| Asset | Expected | Actual | Present? |
|---|---|---|---|
| Testimonial dashboards ×8 | `public/proof/{handle}-earnings.png` | `public/proof/creators/{name}/dashboard.png` | **Yes, 8/8** |
| Testimonial phones ×8 | `public/proof/{handle}-phone.png` | `public/proof/creators/{name}/phone.jpg` | **Yes, 8/8** (2 low-res) |
| Brand logos ×5 | `public/brands/{slug}.svg` | none. `creator/brands.ts` has wordmark text only. | **No** |
| Creator avatars ×8 | `public/avatars/{handle}.png` | none. Leaderboard fixture uses `"placeholder"`/`null`. | **No** |
| Phone frame | CSS or inline SVG | `components/iphone.tsx` | **Yes** (needs token pass) |
| Hero screen capture | `public/hero/app-screen.png` | none | **No, needs [HUMAN]** |
| Logo lockup | existing | `public/proof/brand/logo.png` + `LogoLockup` | **Yes** |

---

## Step 4 hazard sweep — findings only, nothing changed

**Hardcoded colour.** In `components/`, hex appears only in `iphone.tsx` (11 lines of
`fill-[#E5E5E5]`, `#F5F5F5`, and `dark:` greys). Arbitrary `rgba()` shadows appear in:
- `SidebarNavItem.tsx` (×2)
- `creator/MetricToggle.tsx`
- `creator/DarkModeToggle.tsx`
- `original/Button.tsx`

Outside `components/`:
- The hex in `styleguide/page.tsx` swatches is documentation, but it will drift.
- `globals.css` has raw `rgba()` in the dark-theme and intro blocks.
- `lib/brand-art.ts` hashes hues on purpose.

**Radius.** Three radius tokens plus pill. Raw radii outside them:
- `rounded-[8px]` ×5
- `rounded-[14px]` ×4
- `rounded-[10px]` ×4
- `rounded-[6px]` ×2
- `rounded-[18px]` ×1
- `rounded-lg` ×3
- `rounded-md` ×2

The spec allows one radius plus pill.

**Shadow.** Currently in use:
- `shadow-lift` and `shadow-pop`
- two hard offset shadows: `6px_6px_0_var(--ink)` and `8px_8px_0_var(--lime)`
- four arbitrary rgba shadows (listed above)

The spec allows exactly two.

**Spacing.** There are about 350 utility uses on the 4px half-steps. The most common are
`gap-3` ×54, `gap-1` ×30, `py-3` ×24, `px-5` ×20, `gap-1.5` ×18, and `px-3` ×17. These counts
include the creator app. Some of them will be legitimate 4px optical adjustments inside pills,
and each needs a judgement call during the sweep.

**Width.** Old layouts assume narrow columns:
- `--feed-max: 600px`
- `FeedSection` at `max-w-[608px] md:max-w-[832px]`
- `ProofCard` `sizes` tuned to 600px
- `--content-max: 1440px` (spec: 1120)
- rail vars at 240/300

---

## Content flags for Step 2 (do not resolve silently)

1. **Steven's figure disagrees across sources.** `content/creators.ts` has Steven at
   **$100,227** as `@stee.ugc`. The creator leaderboard has `steven` at **$153,823**, which is
   the number LANDING-PAGE.md's substantiation line uses. Four other testimonial handles also
   differ from their leaderboard handles:
   - jennymakescontent / jennifer-leeh
   - bray.codes / brayspencer
   - ericanocode / ericaaaa
   - nattyluv_ai / nattylab

   These are probably two snapshots taken at different times. They need a human call on which
   one the page quotes.
2. **FAQ answers 2–5 are placeholders.** They are labelled "replace during copy pass" and are
   not authoritative, even though they're in the repo. Only "What exactly is MediaMaxxing?" is
   verbatim.
3. **The review window conflicts.** The spec's trust tile says "Reviewed in 7 days". The repo
   says "reviewed within 48 hours" in two places: `content/creator/campaigns.ts` guidelines and
   the placeholder FAQ. One of them is wrong.
4. **Invented figures that must not be extracted as real:**
   - `counters.ts`: 5,200+ / $12M+ / 4.9★
   - `RightRail`: $1,204,908 this month, 342 creators
   - styleguide `FeatureStatCard`: $1.2M, 342, "median payout up 41%"

   The only sourced platform total is "over $1M" from the blog excerpts.
5. **Seven of the twelve creator-app brands are padded fictions.** The trust bar should use only
   the five observed brands, which match the spec: OpenArt, Pump.fun, Speed, Lovable, and
   11Eleven Creative.
6. **The CTA destination conflicts.** The spec says `/auth`. Commit `85bbb48` recently pointed
   every CTA at `/creator/campaigns`.
7. **Hardcoded strings to extract before archiving:**
   - `original/RightRail`: "Ready to earn?", "Free to join. No résumé, no follower count.",
     "Earning right now", "Continue", "Prototype — form is not connected."
   - `ProofCard`: "Total earned"
   - both footers: the disclaimer
   - `/loud`: "Real dashboards, real phones, real handles…"
   - `LogoLockup`: the wordmark
   - stub page bodies

   All of these are now in `content/source/chrome.ts`.

---

## Step 2 — Extraction results

Every string from the old build is copied into `content/source/`, tagged by provenance:
`live-site`, `creator-app`, `placeholder`, `invented`, `prototype`, `unknown`. Nothing imports
it yet.

| File | Holds |
|---|---|
| `types.ts` | `Provenance` and `SourceMeta` |
| `creators.ts` | 8 testimonials: name, handle, tier, earnings, image paths, stats, blurb |
| `faq.ts` | 5 questions; answer 1 verbatim, answers 2–5 placeholders |
| `homepage.ts` | Live-site hero, proof headline, three steps; the old footer CTA (unknown origin) |
| `blog.ts` | 3 posts; read times flagged as estimates |
| `nav.ts` | Primary nav, header CTAs, footer groups, copyright, surface switch |
| `for-brands.ts` | All `/for-brands` copy |
| `platform.ts` | Re-exports `TOP_EARNERS`; the 5 observed brands; "over $1M"; the 48-hour review string; every invented figure, quarantined |
| `chrome.ts` | Hardcoded JSX strings, stub page bodies, route metadata |

The asset manifest in MIGRATION.md is filled in with real filenames and dimensions.

Doc corrections since Step 1 (the Step 1 text above is left as written):
- The `tailwind.config.ts` references in CLAUDE.md, PLAN.md and MIGRATION.md now point at
  `globals.css`.
- CLAUDE.md and MIGRATION.md scope "stale sidebar/rail" to the marketing surface. The
  creator app is the same app and keeps its own shell.

## What LANDING-PAGE.md needs that the old build doesn't contain

The spec supplies its own copy for the hero, friction strip, substantiation line, steps,
feature grid, trust tiles, section headings, final CTA, and the CTA label, so none of those
are gaps. These are:

**Assets**
- Five brand logos for the trust bar (OpenArt, Pump.fun, Speed, Lovable, 11Eleven Creative).
- Eight leaderboard avatars.
- The hero screen capture. MIGRATION.md allows composing the phone screen from the creator-app
  components instead; that app is built, so it's available as an option.
- Low-res sources: the enel and sam phones (276×600) and the natalie dashboard (706×353) will
  look soft in the lightbox.

**FAQ.** The spec wants about 15 questions in four groups. The old build has 5 questions and
1 real answer.

| Existing question | Spec slot |
|---|---|
| Do I need experience or followers? | Getting started — followers, experience |
| How fast can I start earning? | Getting started — first video |
| What kinds of campaigns are available? | Campaigns & content — nearest is "Who picks the campaigns?" |
| Is this available worldwide? | Eligibility — countries |
| What exactly is MediaMaxxing? | **No slot** in the spec's four groups |

- **No source copy at all** for: equipment, how pay per view works, when payouts land,
  underperforming videos, minimum payout, using your own idea, sponsorship disclosure, video
  ownership, age requirements, and verification. The creator app's pay-rate table
  (`$/1K views`) is the closest source for "how pay per view works".
- **Eligibility** is the [HUMAN] task PLAN Phase 4 already names; there is no legal page copy
  in the repo.

**Claims without a source in the repo**
- "Reviewed in 7 days". The repo says 48 hours, with no source for either.
- "Free to join". It appears only in prototype and unknown-origin copy, never in anything
  marked live-site.
- "First campaign in under five minutes" and "signup to first campaign in five minutes".

**Earnings range.** Rule 3 of LANDING-PAGE.md's earnings claims asks for figures spanning a
wide range. Seven of the eight testimonials are $30K or more; Sam at $8,227 is the only
lower one.

**Other**
- The `/mcp` footer variant PLAN Phase 2 asks to reconcile was never captured. Only the
  standard footer is in the repo.
- Icons for the feature cards and trust tiles. `components/icons.tsx` has only nav and
  arrow icons. `components/creator/app-icons.tsx` has gift, link, medal, lock and others;
  whether to share them is a Phase 3 decision.

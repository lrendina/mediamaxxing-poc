# CREATOR-APP.md

Specification for the creator dashboard prototype. Derived from screenshots of a live
logged-in account, September 2026. Where something is marked **(assumed)**, it was inferred
rather than observed — flag it rather than inventing detail around it.

## The finding that reframes this project

The real app is **already** a left sidebar, a centered content column, and a right rail. The
redesign is not imposing an app shell onto a marketing site. It is extending the shell the
product already uses to the marketing site that currently ignores it.

That means Phase 9 is **not a redesign of the dashboard**. It is a faithful rebuild of the
dashboard in our token system, so that the marketing feed and the creator app are visibly one
product. Do not restructure their app. Do not "improve" their information architecture.
Reskin it and let the continuity make the argument.

The app is also densely gamified — XP, ranks, streaks, daily missions, bounties, XP
multipliers, leaderboards, progressive unlocks — and the marketing site contains none of that
energy. That gap is the strongest observation available and it should drive the writeup.

## Routes

| Route | Screenshot | Notes |
|---|---|---|
| `/creator/campaigns` | 1, 2 | Index. The primary surface. |
| `/creator/campaigns/[brand]/[campaign]` | 8 | Detail. Three-pane. |
| `/creator/submissions` | 3 | Empty state observed |
| `/creator/earnings` | 4 | Zero state observed, leaderboard populated |
| `/creator/retainers` | 5 | Locked state observed |
| `/creator/courses` | 6 | One course, 0% progress |
| `/creator/white-label` | 7 | Marketing page living inside the app shell |
| `/creator/welcome` | — | **Not observed.** Added per explicit request as the destination of the marketing top nav's "Get started" button, since this prototype has no real session to gate a first-run screen behind. |

## Global shell

Present on every route.

**`AppSidebar`** — ~248px, white, hairline right border. Logo lockup at top (rounded app icon
plus wordmark). Nav items: Campaigns, Submissions, Earnings, Retainers, Courses, Campaign
White Label. Active item gets a light gray pill plus a left accent bar. Submissions carries a
red dot badge. Campaign White Label has a distinct gradient-tinted background — it's a
promoted item, not a normal nav entry, and needs its own variant. Pinned at the bottom:
creator avatar, display name, notification bell.

**`TopBar`** — sidebar collapse toggle, breadcrumb (`Creator › {Page}`), and a Discord-blurple
"Join Discord" button at the right.

**`DiscordBanner`** — full-width amber callout with a warning triangle and an underlined link:
connect Discord to access private campaigns. Appears on every route. Dismissible **(assumed)**.

**`RankBar`** — **(deviation, not observed)** originally spec'd as a full-width pill card
directly under the banner. Moved into `AppSidebar`, directly above the profile row, per
explicit reviewer request — the app screenshots do not place it there. Circular rank avatar,
rank name ("Unranked"), a progress track, "500 to Copper", "0 XP", a small rank medallion,
chevron; collapses to an icon-only button on the icon rail. Clicking it opens `RankLadderModal`.

**`RankLadderModal`** — added per explicit product request, backed by a screenshot of the live
modal (Sept 2026). This also supersedes the "ranks beyond Copper are (assumed)" note above:
the thresholds are now observed —  500 / 1,000 / 5,000 / 25,000 / 50,000 XP for
Copper/Bronze/Silver/Gold/Platinum, cumulative total XP, not per-tier deltas. Header (trophy,
title, subtitle, XP pill), the "Rank perks launching soon. Climb now, lock in your tier."
banner, and the "FOUNDATION / Every creator begins the climb" ladder section are reproduced
verbatim from the screenshot. Per-rank medallion colors are a **pre-approved palette addition**
(`--rank-copper` etc. in `app/globals.css`, scoped to `.creator-surface`) rather than sampled
from a photo.

Two things in this modal are **not** from the screenshot, flagged rather than hidden:
- The **Ladder / Missions tab split** — the screenshot only showed the ladder. Missions needed
  a home behind the same entry point, so a second tab was added (assumed structure).
- The **Missions checklist copy and reward amounts** — the milestone list and order (link an
  account → first post → 5/10/100 posts → 1K/2K/10K/20K views → 5/10/20/50 posts on a single
  campaign → first $100/$500/$1,000 → claim a bounty) is per explicit spec. The XP reward for
  each one is **assumed** (not specified) and scaled by difficulty; see `content/creator/milestones.ts`.

Also per explicit request: account creation now grants a **25 XP signup bonus**, so `newCreator`
is Unranked at 25 XP rather than the previously-observed 0 XP. See the note on `newCreator` in
`content/creator/profiles.ts`.

**`WelcomeScreen`** (`/creator/welcome`) — **entirely not observed**, added per explicit
request as the first thing a brand-new account sees. The marketing top nav's "Get started"
button now points here instead of straight to `/creator/campaigns`; since this prototype has no
real session, every click plays the same brand-new-account moment rather than only a true
first visit. Plays the `newCreator` XP bar filling from 0 to 25 once on mount (`useCountUp`,
`lib/useCountUp.ts` — mirrors `Counter.tsx`'s easing and its `prefers-reduced-motion` handling,
but fires on mount instead of on-scroll-into-view), then lists three onboarding actions as
linked rows: Browse campaigns, Join OpenArt, Link an account. "Join OpenArt" and "Link an
account" both route to the OpenArt Director Advanced campaign detail page — that page's
`CampaignSidebar` onboarding checklist is where "Link an account" already lives in this build,
so this doesn't invent a second, unobserved account-settings page.

**`PageHeader`** — h1 plus one-line subtitle. Optional right-aligned action slot (Withdraw,
Auto Submit).

**`DarkModeToggle`** — floating circular moon button, fixed bottom-right, on every screen.

**Collapsed sidebar** — on the campaign detail view the main sidebar collapses to a ~56px
icon-only rail to make room for the campaign's own sidebar. Same component, `collapsed` prop.

## `/creator/campaigns`

- **`MissionCard`** — two variants sharing one component.
  - *Bonus*: blue gift icon, eyebrow "NEW CREATOR BONUS", an orange countdown chip ("14d left"),
    title, a dot-progress row ("0/3 days"), right-aligned dollar reward in green.
  - *Daily*: orange target icon, eyebrow "DAILY MISSION", title, right-aligned XP reward in
    orange with a lightning glyph, chevron.
- **`SectionDisclosure`** — collapsible section header with a chevron, label, and count
  ("My Brands · 1", "Brands · 12").
- **`FeaturedCampaignCard`** — dark full-bleed card for an accepted campaign. Status pills
  overlaid top-left (green "ACCEPTED", amber bounty pill). Brand artwork behind a large
  centered countdown (`23h 38m`), campaign name as an eyebrow above it, instruction line
  below, and a green full-width CTA with a trailing arrow.
- **`BrandCard`** — the grid unit. 16:9 artwork, then a footer row: small brand logo, brand
  name, "N campaigns" beneath, right-aligned blue rate pill ("$7/1K Views"). Badge pills
  overlay the artwork: amber "🏆 Bounty available" top-left, dark amber "⚡ 2x XP" top-right.
  **Three-column grid on desktop (deviation, not observed)** — the source screenshots show
  two columns; widened to three per explicit request to fit more campaigns above the fold.
  Two columns at `sm`, one below that.
- **`RatePill`**, **`BadgePill`** — small shared primitives. Badge kinds: accepted, bounty,
  xp-multiplier, live.
- **`EarningNowBadge`** — **(deviation, not observed, not fixture-backed)** "N creators
  earning right now!" pill on every `FeaturedCampaignCard` and `BrandCard`, `N` a random
  integer between 51 and 299 regenerated on mount. Added per explicit reviewer request over
  the Agentation feedback toolbar. Unlike every other badge here, the number is fabricated
  client-side rather than sourced from a campaign or brand fixture, which cuts against this
  project's content rule ("the real site's words are the content"). Flagged, not silently
  reverted — a human should confirm this stays before this build is shown further.

## `/creator/campaigns/[brand]/[campaign]`

Three panes: icon rail, campaign sidebar, content column, plus a right rail.

**`CampaignSidebar`** — back pill ("← Campaigns"), brand artwork thumbnail, brand logo with
campaign name and brand name stacked, then:
- Tab nav: Overview (active), Submissions, then locked items showing streak requirements —
  "Free Code 🔥0/3", "Advanced Submit 🔥0/14" — with lock glyphs.
- A "CAMPAIGNS" list of sibling campaigns from the same brand, each with its rate:
  Director Basic $3/1K, Director Advanced $3.5/1K (active), Chat Basic $5/1K,
  Chat Advanced $6/1K, plus Challenges (LIVE badge) and Bounties ($1.0K badge).
- An onboarding card: "Complete onboarding · Step 1 of 2", progress bar, checklist
  (Link an account, Make your first post) with radio-style state.
- A primary blue "Submit Content" button pinned below.

**`StatStrip`** — three cells across the top: rate, a count (990), and a dollar figure
($3,500). Labels for these were cropped in the screenshot **(assumed)**: treat as rate,
creators or posts, and total budget. Ask before finalizing the labels.

**`PayRateTable`** — "Pay Rate by Views" card with a layers icon and the note that rates vary
by view range. Rows: `0 – 2.0K views → $1.25/1K`, `2.0K+ views → $3.50/1K`. Note the headline
rate ($3.5/1K) is the *top* tier, not the starting one.

**`GuidelinesPanel`** — amber-bordered card, warning icon, title, a read-carefully line, and
an "Open in Notion" external-link button. Body renders long-form campaign documentation:
h2 headings, callout boxes, inline links, embedded images. Build it as a prose container with
real typographic styles, not a plain div.

**`CreatorsPanel`** (right rail) — people icon, "Creators", participant count (421). A
two-state toggle ("$ Earned" / "Posts"). A blue tooltip bubble reading "The more you post, the
more you make". Then a ranked list: medals for the top three, then plain numerals; avatar,
@handle, an orange flame with a streak number, right-aligned dollar figure.

## `/creator/submissions`

- **`InfoCallout`** — blue info icon, "New to the Platform?", paragraph explaining review
  timelines and view-tracking lag.
- **`FilterChipBar`** — All Statuses, Earning: All, Campaign: All, All Platforms,
  Date (Newest). Each an outlined pill with a leading glyph.
- **`ViewToggle`** — segmented Table / Cards control, right-aligned.
- **`EmptyState`** — video camera glyph, "No submissions found", two-line body.
- **`AutoSubmitButton`** — header action with a lightning glyph and a red notification dot.
- **`SubmissionTable`** / **`SubmissionCard`** — **not observed populated**. Build from the
  filter dimensions: status, campaign, platform, views, earnings, date.

## `/creator/earnings`

- **`FilterChipBar`** — Last 30 Days (dropdown), All Campaigns, All Platforms.
- **`RevenueCard`** — "REVENUE" eyebrow, `$0.00` at display size, a chart area, and two icon
  toggles top-right (line chart / calendar). In the zero state the chart is blurred out and
  overlaid with a lock-style prompt: "Unlock your earning potential", body copy, and a blue
  "Explore Campaigns →" button. Build both states.
- **`StatStrip`** — four cells: Confirmed (30D), Estimated (30D), Total (30D), Total Views
  (30D). Each with a small leading glyph.
- **`LeaderboardPanel`** — trophy icon, "Top Earners", a `$` / posts toggle, an "All Time"
  scope label, and the ranked list. Observed values: steven $153,823, clay $65,376,
  jennifer-leeh $56,132, acnestudiosboss $50,861, brayspencer $46,151, cjsprinting $45,087,
  ericaaaa $42,656, nattylab $40,755. Same list component as `CreatorsPanel`.
- **`WithdrawButton`** — header action, wallet glyph, trailing arrow.

## `/creator/retainers`

- **`LockedState`** — orange lock glyph in a soft rounded square, "Complete a 14-Day Posting
  Streak", explanatory line.
- **`StreakMeter`** — flame glyph, "1 / 14 days", right-aligned "7%", an orange progress bar,
  and a row of 14 dots labelled 1 / 7 / 14. Day one filled solid, day two a soft
  next-up state, the rest empty.
- **`NoteCard`** — muted inset explaining that completing the streak allows an application,
  not a guarantee.

## `/creator/courses`

- **`CourseCard`** — thumbnail, title ("1. Essentials"), meta row (book glyph "3 lessons",
  clock glyph "2m"), completion line ("0 / 3 completed" with right-aligned "0%"), and a thin
  progress bar. Only one course exists; build the grid anyway.

## `/creator/white-label`

Marketing content rendered inside the app shell — direct evidence for the thesis, so build it
faithfully and mention it in the writeup.

- **`EarlyAccessBadge`** — pill with a sparkle glyph.
- Centered h1 and lede, max ~620px.
- **`FeatureListCard`** ×4 — icon in a soft rounded square, title, two-line description.
  List our campaigns · Set your own rates · Get paid automatically · Add your own campaigns.
- Primary blue "Apply" button with a sparkle glyph.

## States to build

Every one of these was observed, so none of it is speculative:

- Discord not connected (banner present)
- Unranked, 0 XP
- Submissions empty
- Earnings zero, chart locked
- Retainers locked behind an incomplete streak
- Courses 0% complete
- Campaign onboarding at step 1 of 2
- Campaign perks locked behind 0/3 and 0/14 streaks

**This is the whole finding.** A new creator's first session is a Discord nag, an unranked
badge, an empty submissions list, a locked earnings chart, a locked retainers page, an
untouched course, and two locked campaign perks. Seven closed doors and one open one. The
leaderboard meanwhile shows someone who made $153,823.

Build a `?state=populated` variant alongside the observed empty states so the prototype
demonstrates both — and so the contrast is legible in a single screenshot pair. The empty
states are cheap to build and accurate; the populated ones are what make the prototype look
finished.

## Out of scope

No auth, no persistence, no submission flow, no real charts backed by real data, no dark mode
unless time allows. Fixtures only. Every button that would mutate state is inert and labelled
as a prototype control.

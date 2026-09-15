# LANDING-PAGE.md

Spec for the redesigned marketing page. This **replaces** the feed-and-sidebar concept
entirely. No sidebar, no right rail, no card feed. A single centered column, conventional
long-form conversion structure.

## Premise

One audience, one action: a creator signs up. Everything on the page either moves them toward
that or gets cut. The selling point is not earnings potential in the abstract — it's that the
hard parts are already done. No brand outreach, no audience requirement, no creative block,
no invoicing. Pick a campaign, film, post, get paid.

Time-to-value is the argument. Say it early, say it often, prove it.

## Layout

```
max-width       1120px content, 720px for text-only blocks
gutter          24px mobile, 48px tablet+
section pad     96px desktop / 64px mobile, vertical
```

Text blocks cap at 720px. Never let a paragraph run the full 1120.

## Section 1 — Hero

**H1:** Make six figures from your phone

**Subheadline:** Brands pay you for every view. The campaigns are already signed, the video
templates already work, and you can post your first one tonight.

**Primary CTA:** `Start earning — it's free` → `/auth`

**Friction strip** directly under the button, small and muted, separated by thin dividers:
Free to join · No followers needed · First campaign in under five minutes

**Substantiation line** below that, smaller still:
Our top creator has earned $153,823. Most earn far less — see the full numbers below.

That line is not optional. See "Earnings claims" at the bottom of this file.

**Visual:** a phone frame showing the real creator app — the campaigns screen or the earnings
screen from `CREATOR-APP.md`. Reuse the actual product UI rather than an illustration. It
supports "from your phone" literally, and showing the product beats describing it.

**Trust bar** at the base of the hero: a quiet logo row of brands running campaigns — OpenArt,
Pump.fun, Speed, Lovable, 11Eleven Creative. Grayscale, low contrast, no heading. They have
this asset and don't use it.

## Section 2 — The Solution

Two blocks. The first sells speed, the second sells the absence of work.

### 2a. Three steps

**H2:** From signup to your first campaign in five minutes

Three steps, horizontal on desktop, stacked on mobile. Each: number, short title, one line.

1. **Pick a campaign** — Browse live brand campaigns and join in one tap.
2. **Film from the template** — Every campaign ships with formats that have already gone viral.
3. **Post and get paid** — Submit the link. Payouts run automatically on views.

No `01 / 02 / 03` display numerals. Plain numbers inside the step titles.

### 2b. Feature → benefit grid

**H2:** The hard parts are already done

Four cards, 2×2 on desktop, stacked on mobile. Each card: icon tile, **H3 benefit**, then the
feature underneath in body text. Benefit leads, feature supports — never the reverse.

| H3 (benefit) | Body (feature) |
|---|---|
| You never pitch a brand | Campaigns are negotiated and live before you see them. Join one and start filming. |
| You never stare at a blank screen | Every campaign includes proven templates and step-by-step tutorials for recreating videos that already worked. |
| You don't need an audience | Post to your own accounts at any size. Pay is based on views, not followers. |
| You never send an invoice | Views are tracked automatically and payouts run on their own. No chasing, no middlemen. |

**CTA #2** directly beneath the grid, centered, same label as the hero.

## Section 3 — Social Proof

Reused from the existing site, restructured.

### 3a. Earnings leaderboard

**H2:** Real creators, real payouts

Pull the top-earners list straight out of the creator app — handles, avatars, dollar figures.
It exists in the product and has never appeared on the marketing site. Eight rows, ranked,
money right-aligned in expanded numerals.

Under it, one muted line: These are the platform's highest earners, not typical results.

### 3b. Testimonial grid

Three-column grid on desktop, one on mobile. Equal-height cards, **not masonry** — the source
screenshots vary in aspect ratio and masonry will look accidental rather than designed.

Each card: creator name and handle, the earnings figure in expanded numerals, a tier badge,
the dashboard screenshot thumbnail, and two lines of their story. Click opens the full
screenshot in a lightbox. Keep the existing copy from the current site.

Include the real stat lines but render them as a small labelled stat row, not a
middle-dot string.

**CTA #3** beneath the grid.

## Section 4 — Guarantee & Trust

**H2:** What we can actually promise

The one thing this section must not do is guarantee earnings. Four badge tiles instead, each
a claim the company can stand behind:

- **Free to join** — No fees, no subscription, nothing taken up front.
- **Paid per view** — Compensation tracks performance automatically.
- **Over $1M paid out** — Their own published figure.
- **Reviewed in 7 days** — From the platform's stated submission review window.

Flat tiles, icon plus label plus one line. No certificate imagery, no invented trust seals,
no fabricated badges. Anything that looks like a third-party certification the company doesn't
hold is worse than nothing.

## Section 5 — FAQ

**H2:** Questions before you start

Categorized accordion, four groups. Reuse the five existing FAQs from the current site and
distribute them, then fill the gaps below. One item open by default in the first group.

**Getting started** — Do I need followers? Do I need experience? What equipment? How fast can
I post my first video?

**Getting paid** — How does pay per view work? When do payouts land? What happens if a video
underperforms? Is there a minimum payout?

**Campaigns & content** — Who picks the campaigns? Can I use my own idea? Do I have to
disclose sponsorship? Who owns the video?

**Eligibility** — Age requirements (13+, parental consent under 18). What verification is
required (government ID and tax documentation before payouts). Which countries.

That eligibility group handles the three objections most likely to kill a signup silently,
and none of them appear on the current site.

## Section 6 — Final CTA

High contrast: the dark surface token against the bright page. Full-bleed, generous padding.

**H2:** Your first campaign is five minutes away
One line of body: Free to join. No followers required. Get paid for every view.
**CTA #4**, same label, oversized.
Beneath: the same substantiation line as the hero, small and muted.

## Persistent CTA

A slim header appears after the hero scrolls out: wordmark left, single button right. Same
label. Hidden while the hero is visible, hidden inside the final CTA section.

Five CTAs total, **one label across all of them**. Varying the wording ("Get started", "Join
now", "Sign up free") reads as indecision and splits the action in the reader's head. Pick one
string, put it in `content/cta.ts`, import it everywhere.

## Typography

Big jumps, as briefed.

| Level | Desktop | Mobile | Use |
|---|---|---|---|
| H1 | 72 / 1.02 | 40 | Hero only, once |
| H2 | 44 / 1.1 | 32 | Section headings |
| H3 | 22 / 1.3 | 20 | Card and step titles |
| Body | 18 / 1.6 | 17 | Paragraphs |
| Small | 14 / 1.5 | 14 | Friction strips, disclosures |

H1 to H2 is a 28px drop, H2 to H3 is 22px. Nothing sits between H3 and body — that gap is what
makes hierarchy read instantly.

Dollar figures and counters use Archivo Expanded with tabular figures. Everything else Archivo.

## Motion

Two effects. Nothing else.

**Hero entrance** — H1, subheadline, CTA, and friction strip fade and rise 12px on a 60ms
stagger, 400ms ease-out, once on load. Not replayed on scroll-back.

**Card hover lift** — `translateY(-2px)` plus the step up from shadow-1 to shadow-2, 150ms.
Applies to testimonial cards, feature cards, badge tiles. Nothing else lifts.

`prefers-reduced-motion: reduce` disables both. No scroll-triggered reveals anywhere on the
page — they delay reading and every section already has a job.

## Earnings claims

"Make six figures from your phone" is an income claim, and the platform's own legal page
states that past performance and earnings examples don't guarantee future results.

The headline stays as briefed. Three things make it defensible, and all three are required:

1. The substantiation line appears in the hero and again in the final CTA.
2. The leaderboard carries its non-typicality note.
3. The testimonial section shows real figures spanning a wide range, not only the top.

This is standard practice for income-opportunity marketing and it converts better anyway.
"Steven earned $153,823" is more persuasive than "make six figures" because it's specific,
named, and checkable. Vague promises trigger skepticism; documented ones don't.

Worth raising in the presentation. Noticing a compliance exposure in a marketing brief and
solving it without weakening the pitch is a stronger signal than any layout decision on
this page.

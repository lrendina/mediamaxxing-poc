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

## Values — "black and acid lime" (loud redesign, September 2026)

Supersedes everything below. Lime `#D4FF3A` is the brand and means money; it is allowed to
fill a whole section. Black `#0A0A0A` carries weight: top bar, how-it-works band, footer.
Paper `#F2F1EA` is for reading. The creator app inverts the same roles onto black
(`.creator-surface` in `app/globals.css`): surfaces go dark, lime stays lime, the featured
campaign card becomes the one lime object on the page, `action` becomes violet.

**Type.** One family. Archivo at wdth 125 / weight 800 / uppercase is the poster voice for
every headline, at `clamp()` sizes that scale with the viewport. Archivo 400–500 is UI and
body. Archivo Expanded 500 is every number. No serif.

**Layout.** The marketing surface drops the three-column feed for a sticky black top bar
and full-bleed colour blocks: lime hero, black ticker, paper proof wall (3-up at xl), black
how-it-works with 120px numerals, black counters at viewport scale, paper FAQ, paper blog,
lime CTA band, black footer with the wordmark at 13vw. The Phase 8 device intro is off
(`INTRO_ENABLED = false`); it flew into a feed column that no longer exists.

**Geometry.** Sharper: card 12, control 8. Proof and blog cards carry 2px black borders and
hard offset shadows (lime under proof, black under blog on hover). Buttons stay pills.

## Values — "paper and signal" (superseded)

Supersedes the first draft below. Warm paper canvas, white cards on hairline borders,
warm near-black ink, one saturated colour per role. `app/globals.css` is the source of
truth; this is the reference.

```css
:root {
  /* surfaces */
  --canvas:        #F4F2EC;   /* page — warm paper, both surfaces */
  --surface:       #FFFFFF;   /* cards, panels */
  --surface-sunk:  #EBE8DF;   /* inset rows, tracks, chips, tiles */
  --surface-dark:  #0F1411;   /* dark bands, featured cards — green-black */
  --border:        #E1DDD2;
  --border-strong: #C9C4B6;

  /* text */
  --ink:           #14130F;
  --muted:         #6B675C;
  --ink-inverse:   #F7F6F1;

  /* roles */
  --action:        #2A4BD7;   --action-sunk: #E3E8FB;
  --money:         #0E9F5E;   --money-sunk:  #DCF3E6;
  --streak:        #EF6420;   --streak-sunk: #FDE6D9;
  --warn:          #96690F;   --warn-sunk:   #F8EED7;
  --discord:       #5865F2;
  --status:        #5B3FC9;   --status-sunk: #EBE5FA;   /* marketing tier badges only */
}
```

**Buttons.** Primary is ink, not a colour: on paper the darkest object is the most
pressable one, and it leaves green free to mean money. Secondary is `money`, reserved for
the one CTA per page that is literally about getting paid. In the app, `action` blue is the
press colour (Submit, Apply, Explore), matching the live product.

**Type.** Archivo for UI and body. **Instrument Serif** for display headings at 24px and
up — h1, section h2, page headers, the CTA band, empty-state titles. Never for numbers
(no tabular figures) and never for body. Archivo Expanded for every number, as before.

**Geometry.** Card 20px, control 12px, tile 12px, pill 999px. Buttons are pills on both
surfaces. Hairline borders everywhere; `--shadow-lift` only on the one object per section
that should float (spotlight proof card, featured campaign, brand card on hover),
`--shadow-pop` only on overlays.

**Data.** Numbers get shape: the revenue chart carries gridlines, a gradient area, and an
endpoint marker with the last value; leaderboard rows draw a proportional bar behind the
figure; Earnings stat tiles carry sparklines; the rank bar is a segmented track; the
streak meter is fourteen cells.

### First draft (superseded)

```css
:root {
  --canvas: #F6F7F9; --surface: #FFFFFF; --surface-sunk: #EEF0F4; --surface-dark: #0B0D10;
  --border: #E3E6EB; --ink: #0D1220; --muted: #5B6472; --ink-inverse: #FFFFFF;
  --action: #2F5BEA; --action-sunk: #E9EFFE; --money: #0FA958; --money-sunk: #E4F6EC;
  --streak: #F4741F; --streak-sunk: #FDEEE3; --warn: #A8761A; --warn-sunk: #FBF3E2;
  --discord: #5865F2;
}
```

Every role has a `-sunk` companion for pill backgrounds and soft icon tiles. That pairing is
what the app does throughout and it's why the gamification layer reads as cheerful rather than
alarming.

## Type

Unchanged from Phase 1. **Archivo** for UI and body, **Archivo Expanded** for dollar figures,
counters, and the campaign countdown. The live app appears to use a neutral default grotesque
(assumed — read from a screenshot), so the expanded numerals are one of the few places our
build will visibly differ. That's deliberate: the money should be the loudest thing on screen,
and it currently isn't.

Tabular figures everywhere numbers change — counters, leaderboards, rate pills, streaks.

Scale: 13 / 15 / 18 / 24 / 40 / 64. Sentence case. No all-caps except the small eyebrows the
app already uses ("NEW CREATOR BONUS", "DAILY MISSION", "REVENUE", "CAMPAIGNS").

## Geometry

```
radius-card       12px
radius-control    10px
radius-tile       10px   /* soft icon squares */
radius-pill       999px
```

Spacing on a 4px base. Card padding 16–20px. Grid gap 12–16px.

```
sidebar           248px      collapsed 56px
right-rail        380px      hidden below 1280px
content-max       1160px
feed-column       600px      marketing surface only
```

## Elevation

The app is almost entirely flat — hairline borders, no drop shadows except on overlays and
tooltips. Keep it that way. Hierarchy comes from surface color and border, not shadow. One
exception: the dark featured campaign card, which sits visually above the grid because it's
the only dark object on the page.

## Dark mode

The live app has a persistent dark-mode toggle bottom-right. Build the toggle and the token
swap structure, but treat a fully tuned dark palette as optional for the prototype. A
half-finished dark mode looks worse than an honestly disabled one — if it isn't done, ship
the toggle disabled with a tooltip saying so.

## Continuity rule

The marketing surface and the creator app use these exact tokens, the same sidebar component,
the same card geometry, and the same rate and badge pills. If a reviewer can tell where the
marketing site ends and the app begins by looking at anything other than the content, the
build has failed its own premise.

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

Unchanged from Phase 1. **Archivo** for UI and body, **Archivo Expanded** for dollar figures,
counters, and the campaign countdown. The live app appears to use a neutral default grotesque
(assumed — read from a screenshot), so the expanded numerals are one of the few places our
build will visibly differ. That's deliberate: the money should be the loudest thing on screen,
and it currently isn't.

Tabular figures everywhere numbers change — counters, leaderboards, rate pills, streaks.

Scale: 13 / 15 / 18 / 24 / 40 / 64. Sentence case. No all-caps except the small eyebrows the
app already uses ("NEW CREATOR BONUS", "DAILY MISSION", "REVENUE", "CAMPAIGNS").

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

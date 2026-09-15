# MediaMaxxing reskin — POC

An **unaffiliated** proof-of-concept reskin of [mediamaxxing.com](https://mediamaxxing.com),
built for a design interview. It is not a product, not a fork of their code, and not
connected to any real backend. Nothing here is a working sign-up, form, or account.

## The argument

A conversion-first landing page for a product whose real advantage is that the hard parts are
already done: no brand outreach, no audience requirement, no creative block, no invoicing.
The structure is conventional on purpose — hero, solution, proof, trust, FAQ, final CTA — with
one CTA label everywhere. The marketing page and the creator app share one token system.

An earlier concept rebuilt the site as a card feed with a sidebar, plus a scroll-driven phone
intro. Both were cut; their code is in `_archive/`.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # must pass clean before handoff
npm run lint
npm run check:tokens   # colour, radius, shadow and 8px spacing rules
```

Don't run `npm run build` while `npm run dev` is running — the build rewrites `.next` under the
dev server and leaves it unreachable. Node 20+. No env vars or external services are required.

## Routes

| Route | State | Notes |
| --- | --- | --- |
| `/` | Built | The conversion landing page (`LANDING-PAGE.md`) |
| `/styleguide` | Built | Tokens, type scale, and every primitive and variant |
| `/for-brands` | Pre-rebuild | Earlier direction's page on the new tokens; Phase 6 rebuild not done |
| `/for-agencies`, `/mcp`, `/auth` | Stub | Placeholder pages; copy still predates the rebuild (Phase 6) |
| `/blog` | Stub | Real titles, excerpts and covers; article routes are not built |
| `/creator/*` | Prototype | Creator app shell on its own scoped tokens (`CREATOR-APP.md`) |

Footer links to `/careers` and `/legal/*` are out of scope and lead to the 404 page.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4, configured CSS-first in `app/globals.css` (no `tailwind.config.ts`)
- `next/font` loading Archivo with its `wdth` axis; money renders at `wdth 125`
- Dependencies: `next`, `react`, `react-dom`, `agentation` (dev-only feedback toolbar)

## Layout of the repo

```
app/(marketing)/      landing page, styleguide, /for-brands and stubs, marketing shell
app/creator/          creator app prototype
components/           one component per file; creator app components in components/creator/
content/              every string on the site, as typed modules
content/source/       copy extracted from the previous build, tagged by provenance
public/proof/         real creator screenshots, blog covers, logo
_archive/             removed code, never hard-deleted
docs/                 phase notes
```

Planning documents: `PLAN.md` (phases), `LANDING-PAGE.md` (page spec), `DESIGN-TOKENS.md`
(tokens), `MIGRATION.md` and `INVENTORY.md` (the rebuild from the old build),
`CREATOR-APP.md` and `DATA-MODEL.md` (creator app).

## Rules the code keeps

- **Copy lives in `content/`**, never inline in JSX. The live site's words are the content.
- **No hex values in components.** Colours are CSS custom properties in `app/globals.css`,
  exposed to Tailwind through `@theme inline`.
- **One radius, two shadows, an 8px spacing scale.** Tailwind's default radius and shadow
  scales are cleared, and `npm run check:tokens` fails on anything off-system.
- **One CTA label**, imported from `content/cta.ts` by every call to action.
- **Two motion effects only:** the one-time hero entrance and the card hover lift, both off
  under `prefers-reduced-motion`.
- **Blue means press, green means money.** Roles never leave their meaning.

See `DESIGN-TOKENS.md` for values and `CLAUDE.md` for the full kill list.

## Quality checks (Phase 8)

Checked against the production build with a scripted Chrome pass:

- **375px:** no horizontal overflow on any marketing route; every tap target is at least 44px.
- **Keyboard:** 28 tab stops on `/`, each with a visible focus indicator, none hidden under the
  sticky header. Skip link moves focus to `main`. The lightbox keeps focus inside and returns
  it on Escape. The FAQ toggles with Space and Enter.
- **Reduced motion:** the hero entrance and card lift both switch off.
- **Images:** every `<img>` has alt text; decorative images use `alt=""` next to a text label.
- **Console:** no errors or failed requests while scrolling the marketing routes.

## Lighthouse

Production build on localhost, Lighthouse 12.8.2, single run (scores vary by a few points):

| | Mobile | Desktop |
| --- | --- | --- |
| Performance | 92 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Mobile LCP is 3.4 s under simulated throttling (FCP 0.9 s, TBT 0 ms, CLS 0). Lighthouse picks
the first section heading below the hero as the LCP element, most likely because the hero
headline's entrance animation starts at opacity 0. The remaining findings are framework-level:
about 120 KiB of unused JavaScript and 13 KiB of legacy polyfills.

## Known gaps

- Brand logos in the hero trust bar are named placeholders; no logo files exist.
- The FAQ ships only questions with sourced answers — one today.
- The six-figure headline carries no on-page qualifier; that was a deliberate decision
  (see "Earnings claims" in `LANDING-PAGE.md`).
- Phase 6 (`/for-brands` rebuild and stub copy) was skipped; `/blog` still jumps from h1 to h3.

## Credits

Creator screenshots, earnings figures, testimonial copy and blog covers come from
mediamaxxing.com's public marketing, and leaderboard figures from their creator app. They
belong to MediaMaxxing LLC. This project has no affiliation with MediaMaxxing and does not
represent a real product or service.

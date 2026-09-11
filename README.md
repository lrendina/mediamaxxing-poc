# MediaMaxxing reskin — POC

An unaffiliated proof-of-concept reskin of [mediamaxxing.com](https://mediamaxxing.com),
built for a design interview. **Not a product, not a fork, not connected to any real
backend.** The point is to make a structural argument about the marketing site: rebuild it
as a three-column app-shell with a card feed so it reads like the platform it's selling
rather than a brochure about it.

The persuasion sequence is preserved intact (hero → proof → how it works → counters → FAQ
→ blog → CTA) — only the container changes.

## Run it

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # must pass clean before handoff
npm run lint
```

Node 20+ recommended. No env vars, no secrets, no external services.

## Routes

| Route            | State  | Notes                                                            |
| ---------------- | ------ | ---------------------------------------------------------------- |
| `/`              | Built  | The homepage feed — hero, 8 proof cards, steps, counters, FAQ, blog, CTA |
| `/for-brands`    | Built  | Same primitives, brands-focused content — proves the template generalizes |
| `/styleguide`    | Built  | Design system review surface — every token, every primitive, every state |
| `/for-agencies`  | Stub   | Honest placeholder — scope decision                              |
| `/mcp`           | Stub   | Honest placeholder — deliberately deferred (see stub copy)       |
| `/blog`          | Stub   | Renders real BlogCards; article routes not built                 |
| `/auth`          | Stub   | Honest placeholder — auth out of scope                           |

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4 (CSS-first `@theme` config in `app/globals.css`)
- `next/font` loading Archivo (with the `wdth` variable axis for money-only expanded numerals)
- No other dependencies. No client-side data fetching. Content lives in `content/*.ts`.

## Architecture

```
app/
  layout.tsx            three-column app shell — sidebar / feed / right rail
  page.tsx              homepage feed assembly
  for-brands/page.tsx   brands page assembly
  styleguide/page.tsx   design-system review page
  {for-agencies,mcp,blog,auth}/page.tsx    stubs

components/             12 primitives + 4 shell parts, one per file
  Accordion.tsx  Badge.tsx  BlogCard.tsx  Button.tsx  Card.tsx
  Counter.tsx    CTABand.tsx  FeatureStatCard.tsx  LogoLockup.tsx
  ProofCard.tsx  StatGrid.tsx  StepCard.tsx
  ── shell: Sidebar.tsx  RightRail.tsx  MobileTabBar.tsx  SkipToContent.tsx
  ── extras: PageIntro.tsx  FeedFilters.tsx  SiteFooter.tsx  Stub.tsx  icons.tsx

content/                typed content modules — every string in the app lives here
  creators.ts  steps.ts  faq.ts  blog.ts  hero.ts
  counters.ts  nav.ts    for-brands.ts

public/proof/           real assets pulled from mediamaxxing.com (creators + blog + logo)
```

**Content rule.** Copy never lives in JSX. Adding a string means adding it to `content/`.
Constants suffixed `_VERBATIM` are unedited from the live site and flagged for a
future copy pass (the site's original headlines lean on italicized single-word emphasis
that the kill list drops).

**Design token rule.** No hex codes in components. All colors sit in `app/globals.css` as
CSS custom properties, exposed to Tailwind via `@theme inline`. Change a token, the
whole app follows.

## Design system

Two chromatic colors, each with one job:

| Token       | Hex       | Role                                              |
| ----------- | --------- | ------------------------------------------------- |
| `--canvas`  | `#FFFFFF` | Page background                                   |
| `--panel`   | `#EDF1EC` | Card surface, sidebar rail                        |
| `--ink`     | `#0E1A12` | Primary text                                      |
| `--muted`   | `#5F6F63` | Secondary text                                    |
| `--payout`  | `#04773A` | Money, counters, primary CTA only (5.6:1 vs white)|
| `--live`    | `#7A3AE0` | Scarcity and status only (tier badges)            |

Archivo (Google font, variable) is the single typeface. The `wdth` axis is used *only*
for dollar figures and counters via the `.font-expanded` class — the visual identity of
the money without needing a second font or a color highlight.

Type scale: 13 / 15 / 18 / 24 / 40 / 64. Body 15 / 1.6. Sentence case everywhere.
Tabular figures site-wide so counters don't jitter.

Layout shell: 240 (sidebar) · 640–880 (feed) · 300 (right rail). Right rail drops below
1280, sidebar collapses to a 72px icon rail below 1024, becomes a bottom tab bar below 768.

## What's not here

Deliberately out of scope, per PLAN:

- **No `/mcp`.** The live page is a complex interactive tool (tabs, client selector,
  clipboard, simulated chat). Building it well costs more than it proves. Building it
  badly is worse than not building it.
- **No `/blog/[slug]`.** BlogCards on `/blog` render real titles/excerpts/covers from the
  live site; article routes intentionally 404.
- **No auth.** `/auth` is a stub. The homepage RightRail sign-in card is a non-functional
  form clearly labeled "Prototype — form is not connected."
- **No backend.** All content is static, hardcoded in `content/`. Counters use round-number
  placeholders where the live site's runtime-JS values weren't scrapeable.

## Lighthouse

Run against the production build (`npm run build && PORT=3100 npm start`):

|                | Desktop | Mobile |
| -------------- | ------- | ------ |
| Performance    | 80      | 89     |
| Accessibility  | 100     | 100    |
| Best Practices | 100     | 100    |
| SEO            | 100     | 100    |

Performance sits below 100 because of framework-level costs (Next.js polyfills,
render-blocking font CSS, unused JS in the bundle). LCP is the first proof card — flagged
`priority` on the first `<Image>` so it preloads instead of lazy-loading.

## Kill list

Patterns from the live site that were deliberately not carried over:

- No single-word italicized emphasis in headlines.
- No `01 / 02 / 03` numbered markers (except MCP flow, which isn't built).
- No all-caps eyebrow labels above every section.
- No middle-dot stat strings (`17 accounts · 5,900 posts · 50/day`) — replaced with `StatGrid`.
- No fade-and-slide-up entrance animations on every section — one orchestrated moment on
  the homepage hero (`PageIntro`), nothing else.
- No uniform border-radius + soft shadow on every card — `Card` has three variants
  (`default | panel | spotlight`) so hierarchy is visible in the feed.

## Quality floor

- Responsive to 375px.
- Visible keyboard focus on every interactive element (global `:focus-visible` outline).
- `prefers-reduced-motion` respected (global CSS collapses transition/animation durations
  to ~0ms; `Counter` explicitly jumps to final value).
- Semantic landmarks (`nav[aria-label]`, `main`, `aside`), heading hierarchy, alt text
  audited on every image.
- Tap targets ≥44px throughout.

## Deploy

```bash
vercel        # any Vercel account will work — no env vars needed
```

## Credits & scope

Real screenshots, real earnings figures, real blurbs, real logos, real blog covers, all
pulled from [mediamaxxing.com](https://mediamaxxing.com) — these are public marketing
assets belonging to MediaMaxxing LLC. This project has no affiliation with MediaMaxxing
and does not represent a real product or service. Nothing here is a live sign-up, a real
form, or a working account.

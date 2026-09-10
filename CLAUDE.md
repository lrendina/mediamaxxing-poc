# CLAUDE.md

Persistent context for this repo. Read this before every task. If a request conflicts with
this file, stop and ask.

## What this is

A **proof-of-concept reskin** of mediamaxxing.com, built for a design interview. It is not
production work, it does not connect to the real backend, and it will never be merged into
their codebase. It exists to demonstrate a structural argument about their marketing site.

We do **not** have access to the original repo. Everything here is built from scratch and
matched to the live site's content.

## The argument we're making

MediaMaxxing's site is a conventional top-to-bottom landing page. We are rebuilding it as a
**three-column app shell with a card feed** — sidebar nav, centered feed, right rail — so it
reads like the platform it's selling rather than a brochure about it.

The constraint that makes this interesting: a feed is endless and unordered, a landing page
is a fixed argument in a fixed order. We keep the persuasion sequence intact (hook → proof →
mechanism → objections → CTA) and change only the container. **Never reorder or drop a
section to make the feed metaphor cleaner.** The order is the product.

## Stack

- Next.js (App Router), TypeScript, Tailwind
- No backend, no auth, no database. Forms are non-functional and say so.
- Content is hardcoded in `content/` as typed objects, not fetched.

## Commands

```bash
npm run dev      # localhost:3000
npm run build    # must pass clean before any handoff
npm run lint
```

## Conventions

- Components in `components/`, one per file, named exports.
- All copy lives in `content/*.ts` — never inline strings in JSX. The real site's words are
  the content; we are changing presentation only.
- Design tokens live in `app/globals.css` as CSS custom properties, surfaced to Tailwind
  through `tailwind.config.ts`. **No hardcoded hex values in components, ever.**
- Tailwind utilities only. No CSS modules, no styled-components.
- Real images go in `public/proof/`. If an asset is missing, use a labeled gray block —
  never a stock photo, never an AI-generated image.

## Kill list

The current site uses several patterns that read as templated. Removing them is a deliberate
part of the redesign, so do not reintroduce them:

- **Single-word italic emphasis in headlines** ("three simple steps", "real income").
  Write headlines that work without a highlighted word.
- **`01 / 02 / 03` numbered markers**, except on the MCP connect flow where the content
  genuinely is an ordered sequence a user follows.
- **All-caps eyebrow labels** above every section ("How It Works", "Success Stories", "FAQ").
- **Middle-dot stat strings** ("17 accounts · 5,900 posts · 50/day"). Use a small stat grid
  with labeled values.
- Fade-and-slide-up entrance animations on every section. One orchestrated moment on the
  homepage, nothing else.
- Identical border-radius and identical soft gray shadow on every card regardless of
  hierarchy.

## Quality floor

Meet these without being asked and without announcing them:

- Responsive to 375px. The mobile view is the one that gets checked first.
- Visible keyboard focus on every interactive element.
- `prefers-reduced-motion` respected.
- Semantic landmarks (`nav`, `main`, `aside`), real heading hierarchy, alt text on every image.
- Tap targets 44px minimum.

## Stop and ask

Do not decide these alone. Surface the question and wait:

- Any change to the palette, typeface, or type scale after Phase 1 sign-off.
- Reordering, merging, or cutting a content section.
- Adding a dependency beyond the Phase 0 list.
- Anything that would require credentials, an API key, or a real account.
- Downloading assets from mediamaxxing.com — ask first, every time.

## Working style

- Small commits, one concern each, conventional commit messages.
- After each phase in PLAN.md, stop. Summarize what changed and what needs a human eye
  before starting the next phase. Do not chain phases unprompted.
- You cannot judge whether this looks good. Describe what you built and ask for a visual
  review rather than asserting it works.

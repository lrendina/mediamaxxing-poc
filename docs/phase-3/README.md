# Phase 3 — Primitive implementation

## Delegation

Four independent DeepSeek Flash coding tasks were dispatched through
`mcp__deepseek__deepseek_chat`. The endpoint returns source drafts rather than
editing the checkout. The lead owns review, application, integration and validation.
The numbered files in this directory preserve the exact prompts and source context.

| Task | Ownership |
| --- | --- |
| [Core](01-core.md) | Button, Card, StepCard, FeatureCard, BadgeTile, Pill, Badge |
| [Proof](02-proof.md) | TestimonialCard, Lightbox, StatRow, compatibility exports, proof UI copy |
| [Rows](03-rows.md) | Grouped Accordion, LeaderboardRow, LogoRow |
| [Styleguide](04-showcase.md) | PrimitiveShowcase and typed demonstration content |

## Scope and decisions

- Phase 3 only: extend `/styleguide`; the homepage remains the Phase 2 shell.
- Keep `Badge`, `StatGrid`, and `ProofCard` compatibility exports so existing callers
  can migrate without duplicated implementations.
- Use H3-sized expanded earnings inside testimonial cards. H2-sized money is too wide
  for the padded three-column layout. The type scale itself is unchanged.
- Keep step cards static. Feature, trust and testimonial cards use the shared 2px hover
  lift, disabled under reduced motion. Remove the old proof-image and blog-image motion.
- Keep full screenshot aspect ratios and move full stories into the lightbox alongside
  their two-line summaries. No story or earnings copy is rewritten.
- Brand campaign logos have no downloaded assets. Show named neutral placeholders.
- Only one source FAQ answer is verified. Demonstrations identify pending copy rather
  than presenting the other four placeholder answers as facts. Phase 4 owns that work.
- Preserve the creator app's scoped values and fixtures until Phase 9.
- Enforce the spacing sweep in `check:tokens`; allow only the documented 4px Pill gap.

## Review checklist

- TypeScript, ESLint, token checks and production build.
- Styleguide at 375px and desktop: no clipped money, labelled missing assets, all variants.
- Grouped FAQ default state, explicit closed state, keyboard toggle.
- Lightbox open, focus confinement, close button, Escape, backdrop, repeat open and focus return.
- Screenshot loading and descriptive alt text; no console errors.

## Integration corrections

- Corrected two drafts that disabled required trust/testimonial hover lifts; set the
  shared transition to the specified 150ms. Steps and blog cards remain static.
- Reworked the testimonial header to fit all names, handles and tiers in narrow columns.
- Added per-instance accordion IDs and removed render-time mutation caught by ESLint.
- Corrected the showcase's leaderboard object/array mismatch and duplicate copy key.
- Replaced an invented screenshot path with Steven's real local dashboard; selected
  testimonial fixtures by their stable IDs rather than fuzzy string matching.
- Checked FAQ provenance instead of assuming an array position establishes authenticity.
- Added explicit focus restoration and bounds-based backdrop detection to the lightbox.
- Added no-icon trust tiles and an explicitly labelled local-avatar fixture for variant coverage.

## Validation results

- `npm run build`: **pass**, default Turbopack, 23 generated pages. An initial sandbox
  worker-port failure was cached; moving `.next/cache/turbopack` to
  `/tmp/mediamaxxing-phase3-turbopack-cache-20260915` and building with permission resolved it.
- `npm run build -- --webpack`: **pass** as an additional build-path check.
- TypeScript and `npm run lint`: **pass**.
- `npm run check:tokens`: **pass**, including enforced marketing spacing.
- `node --test scripts/check-tokens.test.mjs`: **5 passing tests**.
- Browser at **375 × 812** and **1280 × 900**: no document or primitive overflow,
  no duplicate IDs; desktop three-column testimonials measured equal at 548px tall.
- All three FAQ forms have their intended defaults. Enter and Space toggle a native
  summary; multiple answers can remain open; keyboard focus has a visible outline.
- Lightbox: real dashboard and phone images load; full story is visible; Tab stays in
  the dialog; Escape, close button and backdrop dismissal restore trigger focus and
  unlock scrolling. Reopening and the standalone variant also work.
- Local-avatar fixture loads; missing avatars and logos retain labelled fallback states.
- Browser console: no errors or warnings. Computed money typography is Archivo,
  `wdth 125`, weight 500. Reduced-motion behavior was reviewed in the component classes
  and global media rule; OS preference emulation was not available in this browser API.

## Handoff

Review `/styleguide#primitives`, particularly card density, the tier/name arrangement,
and screenshot readability on a phone. Phase 4 remains separate: missing FAQ answers
and campaign-logo assets still need source material. No creator-app styling changed.

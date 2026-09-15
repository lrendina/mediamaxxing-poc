# _archive

Files removed from the build during MIGRATION.md Step 3. Nothing here is compiled, linted, or
routed. Paths mirror where each file used to live. See INVENTORY.md for why each was archived.

- `components/` (top level) — the "loud" black-and-acid-lime direction's primitives, plus
  `Counter`, `DemoVariantToggle`, `DeviceIntro`, `FeatureStatCard`, `Marquee`.
- `components/original/` — the paper-and-signal feed shell: `Sidebar`, `RightRail`,
  `MarketingTabBar`, `BackdropController`.
- `app/(home)/` — the feed homepage that owned `/`.
- `app/(marketing)/loud/` — the loud homepage demo.
- `content/counters.ts` — invented hero counters (also quarantined in content/source/platform.ts).
- `public/*.svg` — unreferenced create-next-app boilerplate.

Every string these files held is in `content/source/`.
- `components/TopNav.tsx` and `components/original/SiteFooter.tsx` — Phase 2. Superseded by
  `Header`, `StickyHeader` and `Footer`. The footer sits under `original/` because it was the
  paper-and-signal copy promoted from there, and `components/SiteFooter.tsx` here is already the
  loud one. Their nav constants (`SIDEBAR_NAV`, `TOP_NAV_CTA`) left
  `content/nav.ts`; the labels and destinations are in `content/source/nav.ts`.
- `components/compat/ProofCard.tsx` and `components/compat/StatGrid.tsx` — Phase 4. Phase 3
  kept them as aliases of `TestimonialCard` and `StatRow` for old callers; once
  `content/creators.ts` stopped importing `Stat` from `StatGrid`, neither had a caller. They sit
  under `compat/` so they don't collide with the loud copies archived at `components/`.

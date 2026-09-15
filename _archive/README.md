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

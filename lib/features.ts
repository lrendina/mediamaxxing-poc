/* Feature flags. One place, greppable, easy to remove. */

/* Phase 8 scroll-driven device intro on the homepage.
   Flip to false to remove the intro entirely — the homepage falls back to
   the static Phase 5/7 hero and no DeviceIntro code paths run. */
/* Off since the loud redesign: the intro flies into a 600px feed column
   that no longer exists. The component and its CSS are intact. */
export const INTRO_ENABLED = false;

/* Phase 9 surface switcher in both sidebars (marketing ⇄ creator app).
   "dev"    — only in `next dev`, per PLAN.md.
   "always" — also on the deployed POC, for reviewers.
   "never"  — hidden; /creator stays reachable by URL. */
export const SURFACE_SWITCHER: "dev" | "always" | "never" = "dev";

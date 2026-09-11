"use client";

import { useEffect } from "react";

/* Watches [data-section-bg] elements in the current page and updates the
   --page-bg CSS variable on <html> to whichever section is most visible.
   Body's `background: var(--page-bg)` + `transition: background 500ms`
   handles the actual colour fade — this component just picks the target.

   Cleaner than per-section coloured wrappers because:
   - The colour extends to the viewport edges (behind sidebar / right rail)
     because body's background is drawn under the entire grid.
   - Consecutive same-colour sections don't trigger any change — the CSS
     transition only runs when the value actually differs.
   - Removing the component leaves sections with no visible colour, which
     is a coherent fallback (canvas everywhere). */

const COLOR_TOKENS: Record<string, string> = {
  canvas: "var(--canvas)",
  "canvas-alt": "var(--canvas-alt)",
};

/* Which colour tokens count as "dark" — drives data-page-theme on <html>
   so CSS can flip section headings and other on-bg text without checking
   the raw colour value. */
const DARK_TOKENS = new Set(["canvas-alt"]);

export function BackdropController() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-bg]")
    );
    if (sections.length === 0) return;

    /* Track visibility ratios so we can pick the section with the greatest
       intersection area whenever anything changes. */
    const visibility = new Map<HTMLElement, number>();

    const applyActive = () => {
      let best: HTMLElement | null = null;
      let bestRatio = 0;
      for (const [el, ratio] of visibility) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = el;
        }
      }
      if (!best) return;
      const key = best.dataset.sectionBg ?? "canvas";
      const value = COLOR_TOKENS[key] ?? COLOR_TOKENS.canvas;
      document.documentElement.style.setProperty("--page-bg", value);
      /* Also expose the theme so CSS can invert on-bg text (section
         headings, sidebar labels) without knowing the exact colour. */
      document.documentElement.dataset.pageTheme = DARK_TOKENS.has(key)
        ? "dark"
        : "light";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target as HTMLElement, entry.intersectionRatio);
        }
        applyActive();
      },
      {
        /* Multiple thresholds so scrolling through a tall section still
           refreshes the ratio smoothly. */
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1],
      }
    );

    for (const s of sections) observer.observe(s);
    return () => {
      observer.disconnect();
      /* Leave --page-bg where it is — next mount will reset. */
    };
  }, []);

  return null;
}

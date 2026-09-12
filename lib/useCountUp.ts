import { useEffect, useState } from "react";

/* Animates 0 -> target on mount, easing out like Counter.tsx's scroll-in
   count-up. Fires on mount rather than on-intersection since callers (the
   welcome screen's XP bar) control when the component first appears.
   Respects prefers-reduced-motion by jumping straight to the final value.

   No "has it already run" ref: React 18 Strict Mode's dev-only double
   invoke (mount -> cleanup -> mount) would see that flag already set by
   the first pass and skip scheduling the second, real one, leaving the
   value stuck at 0. Letting every invocation just start its own rAF loop
   and cancel it on cleanup is correct in both dev (briefly restarts,
   invisibly) and production (runs once). */
export function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      /* Deferred to the next frame so it counts as an async callback,
         not a cascading render inside the effect body. */
      requestAnimationFrame(() => setValue(target));
      return;
    }

    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

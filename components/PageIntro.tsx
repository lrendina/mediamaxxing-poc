"use client";

import { useEffect, useState, type ReactNode } from "react";

/* The single orchestrated page-load moment on the homepage.
   PLAN forbids per-section fade-and-slide-ups. This wraps the hero and
   nothing else.

   Reduced-motion is honoured by the global CSS override in globals.css,
   which collapses transition-duration to ~0ms — so we don't check
   prefers-reduced-motion here. */
export function PageIntro({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    /* Defer a frame so the browser paints the pre-transition state before
       we flip to `ready`. Guarantees the transition actually runs. */
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {children}
    </div>
  );
}

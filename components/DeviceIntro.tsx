"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Iphone } from "./iphone";

/* Phase 8 scroll-driven device intro.

   Structure:
     <section .intro-section>          height: 250vh
       <div .intro-sticky>             position: sticky; top: 0; height: 100vh
         <div .intro-field />          background wash — fades over p 0.0-0.9
         <div .intro-scene-wrap>       centered flex container
           <div .intro-scene>          transformed, transform-origin: center
             <Iphone .intro-iphone>    phone chrome (SVG) — fades p 0.6-0.9
               <div .intro-viewport>   hero DOM inside the phone screen
                 {children}
               </div>
             </Iphone>
           </div>
         </div>
       </div>
     </section>

   Progress `p` runs 0 → 1 across the 150vh above the sticky release.
   Scale is geometric (`s0 * (1/s0) ^ p`), not linear — reads as constant
   velocity, which is what flying in actually feels like.

   Collapse (mobile <768px OR reduced-motion) is CSS-only. The intro CSS in
   globals.css is gated behind a `@media (min-width: 768px) and
   (prefers-reduced-motion: no-preference)` block, so under either condition
   the section, sticky, transform, and phone chrome all reset to natural
   layout and the hero simply appears. */

const SECTION_HEIGHT_VH = 250;
const FALLBACK_S0 = 0.28;
const TARGET_PHONE_WIDTH_PX = 220;

/* Screen width as fraction of phone width (from Iphone SVG geometry:
   SCREEN_WIDTH / PHONE_WIDTH = 389.5 / 433 ≈ 0.8995). At p=1 we want the
   phone SCREEN to match the feed column width, so the whole scene ends up
   scaled by 1/0.8995 — the phone body extends slightly past the feed edges
   while the chrome fades to 0, leaving hero content that perfectly fills
   the feed column as the eye lands on the proof section below. */
const SCREEN_TO_PHONE = 389.5 / 433;
const END_SCALE = 1 / SCREEN_TO_PHONE;

export function DeviceIntro({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [s0, setS0] = useState(FALLBACK_S0);

  /* Measure s0 = TARGET_PHONE_WIDTH / measured scene width.
     Scene width is the phone's natural width — Iphone renders w-full inside
     the scene, so scene width == phone width. Recompute on resize. */
  useEffect(() => {
    const collapsed = () =>
      window.matchMedia(
        "(prefers-reduced-motion: reduce), (max-width: 767px)"
      ).matches;

    const measure = () => {
      if (collapsed()) return;
      const scene = sceneRef.current;
      if (!scene) return;
      const width = scene.offsetWidth;
      if (width > 0) setS0(TARGET_PHONE_WIDTH_PX / width);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* IntersectionObserver + rAF-throttled scroll driver. */
  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const vp = viewportRef.current;
    if (!section || !scene || !vp) return;

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce), (max-width: 767px)"
      ).matches
    ) {
      document.documentElement.style.setProperty("--intro-shell-p", "1");
      return;
    }

    let rafId = 0;
    let attached = false;

    const update = () => {
      rafId = 0;
      const rect = section.getBoundingClientRect();
      const scrollY = -rect.top;
      const denom = section.offsetHeight - window.innerHeight;
      const p = denom > 0 ? Math.max(0, Math.min(1, scrollY / denom)) : 1;

      /* Geometric interpolation from s0 to END_SCALE (>1) so the phone
         screen ends up at feed-column width. Chrome fades over p 0.6→0.9
         so only the screen content is visible when scale exceeds 1. */
      const scale = s0 * Math.pow(END_SCALE / s0, p);
      scene.style.transform = `scale(${scale})`;

      const deviceOpacity = clamp01((0.9 - p) / 0.3);
      const fieldOpacity = clamp01((0.9 - p) / 0.9);
      const shellP = clamp01((p - 0.75) / 0.25);

      /* Page background transitions from dark to canvas over the same
         window the phone screen expands to feed width — so the "white
         expanding to the sides" reaches the viewport edges by p=1 and
         no dark strip is left visible between the phone-screen white
         and the proof section below. */
      const bgP = clamp01((p - 0.75) / 0.25);
      const bg =
        bgP <= 0
          ? "var(--canvas-alt)"
          : bgP >= 1
          ? "var(--canvas)"
          : `color-mix(in oklab, var(--canvas-alt) ${(1 - bgP) * 100}%, var(--canvas) ${bgP * 100}%)`;

      scene.style.setProperty("--device-opacity", String(deviceOpacity));
      scene.style.setProperty("--field-opacity", String(fieldOpacity));
      document.documentElement.style.setProperty(
        "--intro-shell-p",
        String(shellP)
      );
      document.documentElement.style.setProperty("--page-bg", bg);
      document.documentElement.dataset.pageTheme =
        bgP < 0.5 ? "dark" : "light";

      vp.style.pointerEvents = p >= 1 ? "auto" : "none";
    };

    const schedule = () => {
      if (rafId === 0) rafId = requestAnimationFrame(update);
    };

    const attach = () => {
      if (attached) return;
      attached = true;
      window.addEventListener("scroll", schedule, { passive: true });
      schedule();
    };
    const detach = () => {
      if (!attached) return;
      attached = false;
      window.removeEventListener("scroll", schedule);
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) attach();
        else detach();
      },
      { threshold: 0 }
    );

    observer.observe(section);
    schedule();

    return () => {
      observer.disconnect();
      detach();
      document.documentElement.style.setProperty("--intro-shell-p", "1");
    };
  }, [s0]);

  const sceneStyle = {
    "--scene-scale": String(s0),
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      aria-label="Homepage introduction"
      className="intro-section"
      style={{ ["--intro-h-vh" as string]: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="intro-sticky">
        <div aria-hidden className="intro-field" />
        <div className="intro-scene-wrap">
          <div ref={sceneRef} className="intro-scene" style={sceneStyle}>
            <Iphone
              className="intro-iphone"
              screenClassName="intro-viewport-screen"
            >
              <div ref={viewportRef} className="intro-viewport">
                {children}
              </div>
            </Iphone>
          </div>
        </div>
      </div>
    </section>
  );
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

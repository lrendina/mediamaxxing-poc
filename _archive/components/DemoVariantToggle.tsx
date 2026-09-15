import Link from "next/link";

/* Interview-demo control only — lets a reviewer flip between the default
   homepage (`/`, paper-and-signal, restored per explicit request) and
   /loud, the black-and-acid-lime full-bleed redesign direction. Not part
   of the design argument itself, so it isn't listed in
   CREATOR-APP.md/PLAN.md — just two links, no client state, styled from
   each page's own tokens so it fits either surface. Positioned bottom-left
   (the Agentation feedback toolbar already owns bottom-right on every page
   in dev) and above the mobile tab bar (--mobile-tabs) on `/`; /loud has no
   bottom tab bar, so the extra clearance there is harmless. */
export function DemoVariantToggle({ active }: { active: "loud" | "original" }) {
  return (
    <div
      role="group"
      aria-label="Homepage design demo"
      className="
        fixed left-4 z-50
        bottom-[calc(var(--mobile-tabs)+env(safe-area-inset-bottom)+12px)]
        md:bottom-4
        flex items-center gap-1 rounded-full border border-border bg-surface
        p-1 text-[13px] font-medium shadow-lift
      "
    >
      <Link
        href="/loud"
        aria-current={active === "loud" ? "page" : undefined}
        className={`inline-flex items-center min-h-9 px-3 rounded-full transition ${
          active === "loud" ? "bg-ink text-ink-inverse" : "text-ink hover:bg-ink/[0.06]"
        }`}
      >
        Loud
      </Link>
      <Link
        href="/"
        aria-current={active === "original" ? "page" : undefined}
        className={`inline-flex items-center min-h-9 px-3 rounded-full transition ${
          active === "original" ? "bg-ink text-ink-inverse" : "text-ink hover:bg-ink/[0.06]"
        }`}
      >
        Original
      </Link>
    </div>
  );
}

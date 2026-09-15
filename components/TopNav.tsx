"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_NAV, TOP_NAV_CTA } from "@/content/nav";
import { LogoLockup } from "./LogoLockup";
import { Button } from "./Button";
import { SurfaceSwitch } from "./SurfaceSwitch";

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/* Sticky black bar. Links are pills; the active one is lime. On phones
   the link row scrolls sideways under the logo. */
export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-surface-dark text-ink-inverse">
      <div className="mx-auto max-w-[var(--content-max)] px-4 md:px-8 flex items-center gap-4 min-h-[var(--topnav)]">
        <Link href="/" className="shrink-0 flex items-center rounded-md min-h-11">
          <LogoLockup size="md" className="text-ink-inverse" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1 ml-4"
        >
          {SIDEBAR_NAV.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`
                  inline-flex items-center min-h-10 px-4 rounded-full
                  text-[14px] font-medium transition
                  ${active ? "bg-lime text-surface-dark" : "text-ink-inverse/80 hover:text-ink-inverse hover:bg-ink-inverse/10"}
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden lg:block">
            <SurfaceSwitch direction="toCreator" />
          </span>
          <Button href={TOP_NAV_CTA.signIn.href} variant="ghost" size="sm" className="hidden sm:inline-flex !border-ink-inverse/30 !text-ink-inverse hover:!border-ink-inverse">
            {TOP_NAV_CTA.signIn.label}
          </Button>
          <Button href={TOP_NAV_CTA.getStarted.href} variant="secondary" size="sm">
            {TOP_NAV_CTA.getStarted.label}
          </Button>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="md:hidden flex gap-1 overflow-x-auto px-3 pb-2 -mt-1"
      >
        {SIDEBAR_NAV.map((item) => {
          const active = isActive(item.href, pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`
                inline-flex shrink-0 items-center min-h-9 px-3.5 rounded-full
                text-[13px] font-medium whitespace-nowrap
                ${active ? "bg-lime text-surface-dark" : "text-ink-inverse/80 bg-ink-inverse/10"}
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

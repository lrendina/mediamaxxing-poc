"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_NAV, TOP_NAV_CTA } from "@/content/nav";
import { ArrowRightIcon, iconByName } from "@/components/icons";
import { LogoLockup } from "@/components/LogoLockup";
import { Button } from "./Button";
import { SidebarNavItem } from "@/components/SidebarNavItem";
import { SurfaceSwitch } from "@/components/SurfaceSwitch";

/* Restored verbatim (structure + copy) from the pre-loud-redesign commit for
   the /original demo toggle — see lib/features.ts DEMO_VARIANT and
   app/original/. Only cross-component imports were repointed: siblings that
   still exist unchanged (icons, LogoLockup, SidebarNavItem, SurfaceSwitch)
   resolve to @/components/*; Button was forked into ./Button because its
   "secondary" variant now means something else in the loud direction. */

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Primary"
      className="
        hidden md:flex sticky top-0 h-screen flex-col bg-canvas
        w-[72px] lg:w-[240px]
        px-2.5 lg:px-4 py-5
        border-r border-border
      "
    >
      {/* No aria-label — LogoLockup itself supplies "MediaMaxxing" as the
          accessible name (visible wordmark at lg+, sr-only span below). An
          aria-label of "MediaMaxxing home" would mismatch the visible text
          and confuse voice-control users. */}
      <Link
        href="/"
        className="mb-8 rounded-lg px-1 lg:px-2 py-2 min-h-11 flex items-center"
      >
        <span className="hidden lg:inline">
          <LogoLockup size="md" />
        </span>
        <span className="lg:hidden">
          <LogoLockup size="md" showWordmark={false} />
        </span>
      </Link>

      {/* Two renders of the same list, one per breakpoint, so the
          collapsed prop can be driven by CSS without a resize listener. */}
      <nav className="flex-1 flex flex-col gap-1">
        {SIDEBAR_NAV.map((item) => {
          const active = isActive(item.href, pathname);
          const props = {
            href: item.href,
            label: item.label,
            icon: iconByName[item.icon],
            active,
          };
          return (
            <span key={item.href} className="contents">
              <span className="hidden lg:contents">
                <SidebarNavItem {...props} />
              </span>
              <span className="lg:hidden contents">
                <SidebarNavItem {...props} collapsed />
              </span>
            </span>
          );
        })}
      </nav>

      <div className="mt-6 flex flex-col gap-3">
        <SurfaceSwitch direction="toCreator" />
        <span className="hidden lg:block">
          <Button href={TOP_NAV_CTA.getStarted.href} variant="primary" className="w-full">
            {TOP_NAV_CTA.getStarted.label}
          </Button>
        </span>
        <span className="lg:hidden">
          <Button
            href={TOP_NAV_CTA.getStarted.href}
            variant="primary"
            aria-label={TOP_NAV_CTA.getStarted.label}
            className="w-full !px-3"
          >
            <ArrowRightIcon aria-hidden />
          </Button>
        </span>
      </div>
    </aside>
  );
}

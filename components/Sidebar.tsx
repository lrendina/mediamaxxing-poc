"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_NAV } from "@/content/nav";
import { ArrowRightIcon, iconByName } from "./icons";
import { LogoLockup } from "./LogoLockup";
import { Button } from "./Button";
import { SidebarNavItem } from "./SidebarNavItem";
import { SurfaceSwitch } from "./SurfaceSwitch";

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Primary"
      className="
        hidden md:flex sticky top-0 h-screen flex-col bg-panel
        w-[72px] lg:w-[240px]
        px-3 lg:px-4 py-5
        border-r border-ink/5
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
          <Button href="/#get-started" variant="primary" className="w-full">
            Get started
          </Button>
        </span>
        <span className="lg:hidden">
          <Button
            href="/#get-started"
            variant="primary"
            aria-label="Get started"
            className="w-full !px-3"
          >
            <ArrowRightIcon aria-hidden />
          </Button>
        </span>
      </div>
    </aside>
  );
}

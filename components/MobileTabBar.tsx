"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";

export type TabBarItem = {
  label: string;
  /* Shorter label for the tab bar when the full one won't fit at 375px. */
  shortLabel?: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/* Bottom tab bar below 768px. Shared by both surfaces — the marketing site
   passes SIDEBAR_NAV, the creator app passes its own nav — so the mobile
   chrome is literally the same component on both. Callers resolve icon
   names to components before passing items in (see MarketingTabBar). */
export function MobileTabBar({
  items,
  hrefFor = (href) => href,
}: {
  items: TabBarItem[];
  /* Lets the creator app preserve its ?state= query on every link. */
  hrefFor?: (href: string) => string;
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="
        md:hidden fixed bottom-0 inset-x-0 z-40
        bg-canvas/92 backdrop-blur-md
        border-t border-border
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <ul className="flex items-stretch justify-between px-1.5 py-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, pathname);
          return (
            <li key={item.href} className="flex-1 min-w-0">
              <Link
                href={hrefFor(item.href)}
                aria-current={active ? "page" : undefined}
                aria-label={item.shortLabel ? item.label : undefined}
                className={`
                  flex flex-col items-center justify-center gap-1
                  min-h-12 py-1.5 rounded-[10px]
                  text-[11px] font-medium leading-none whitespace-nowrap
                  ${active ? "text-ink" : "text-muted"}
                `}
              >
                <span
                  className={`inline-flex h-7 w-11 items-center justify-center rounded-full transition ${
                    active ? "bg-surface-sunk" : ""
                  }`}
                >
                  <Icon aria-hidden className="shrink-0" width={20} height={20} strokeWidth={active ? 1.9 : 1.6} />
                </span>
                {item.shortLabel ?? item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

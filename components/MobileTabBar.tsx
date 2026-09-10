"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_NAV } from "@/content/nav";
import { iconByName } from "./icons";

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="
        md:hidden fixed bottom-0 inset-x-0 z-40
        bg-canvas/95 backdrop-blur
        border-t border-ink/10
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <ul className="flex items-stretch justify-between px-2 py-1">
        {SIDEBAR_NAV.map((item) => {
          const Icon = iconByName[item.icon];
          const active = isActive(item.href, pathname);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`
                  flex flex-col items-center justify-center gap-1
                  min-h-11 py-1.5 rounded-lg
                  text-[11px] leading-none
                  ${active ? "text-ink" : "text-muted"}
                `}
              >
                <Icon aria-hidden className="shrink-0" width={22} height={22} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

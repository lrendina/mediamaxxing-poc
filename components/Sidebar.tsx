"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_NAV } from "@/content/nav";
import { iconByName, ArrowRightIcon } from "./icons";
import { LogoLockup } from "./LogoLockup";
import { Button } from "./Button";

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
      <Link
        href="/"
        className="mb-8 rounded-lg px-1 lg:px-2 py-2 min-h-11 flex items-center"
        aria-label="MediaMaxxing home"
      >
        <span className="hidden lg:inline">
          <LogoLockup size="md" />
        </span>
        <span className="lg:hidden">
          <LogoLockup size="md" showWordmark={false} />
        </span>
      </Link>

      <nav className="flex-1 flex flex-col gap-1">
        {SIDEBAR_NAV.map((item) => {
          const Icon = iconByName[item.icon];
          const active = isActive(item.href, pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`
                flex items-center gap-3 rounded-full min-h-11
                px-3 lg:px-4 py-2
                text-[15px]
                justify-center lg:justify-start
                transition
                ${active ? "bg-ink text-canvas" : "text-ink/80 hover:bg-ink/[0.05]"}
              `}
            >
              <Icon aria-hidden className="shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
              <span className="sr-only lg:hidden">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 flex flex-col">
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

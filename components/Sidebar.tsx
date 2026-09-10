"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SIDEBAR_NAV } from "@/content/nav";
import { iconByName, ArrowRightIcon } from "./icons";

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
        className="
          flex items-center gap-2 mb-8 rounded-lg
          px-1 lg:px-2 py-2 min-h-11
        "
      >
        <Image
          src="/proof/brand/logo.png"
          alt=""
          width={28}
          height={28}
          className="rounded-md"
          priority
        />
        <span className="hidden lg:inline text-[18px] font-medium tracking-tight">
          MediaMaxxing
        </span>
        <span className="sr-only lg:hidden">MediaMaxxing home</span>
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
                ${
                  active
                    ? "bg-ink text-canvas"
                    : "text-ink/80 hover:bg-ink/[0.05]"
                }
              `}
            >
              <Icon aria-hidden className="shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
              <span className="sr-only lg:hidden">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Link
        href="/#get-started"
        className="
          mt-6 inline-flex items-center justify-center gap-2
          rounded-full bg-payout text-canvas
          px-3 lg:px-5 py-3 min-h-11
          text-[15px] font-medium leading-none
          hover:brightness-95 active:brightness-90 transition
        "
      >
        <span className="hidden lg:inline">Get started</span>
        <ArrowRightIcon aria-hidden className="lg:hidden" />
        <span className="sr-only lg:hidden">Get started</span>
      </Link>
    </aside>
  );
}

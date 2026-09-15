"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CTA } from "@/content/cta";
import { HEADER_NAV } from "@/content/nav";
import { SITE } from "@/content/site";
import { SITE_HEADER_ID } from "@/lib/sticky-header";
import { Button } from "./Button";
import { Container } from "./Container";
import { LogoLockup } from "./LogoLockup";

/* The page-top header: wordmark, a thin nav, the one CTA. It scrolls away
   with the page, and StickyHeader takes over once it and the hero are gone.
   The nav hides below 768px — the footer carries the same links — and the
   wordmark collapses to its icon below 640px, so the CTA fits at 375. */
export function Header() {
  const pathname = usePathname();

  return (
    <header id={SITE_HEADER_ID}>
      <Container className="flex min-h-16 items-center gap-8">
        <Link href="/" className="inline-flex min-h-11 shrink-0 items-center rounded">
          <LogoLockup size="md" showWordmark="sm" />
        </Link>

        <nav aria-label={SITE.landmarks.primaryNav} className="hidden md:block">
          <ul className="flex items-center gap-6">
            {HEADER_NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center rounded text-small font-medium transition-colors hover:text-ink ${
                      active ? "text-ink" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Button href={CTA.href} size="sm" className="ml-auto">
          {CTA.label}
        </Button>
      </Container>
    </header>
  );
}

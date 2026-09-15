"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CTA } from "@/content/cta";
import { SITE_HEADER_ID, STICKY_HEADER_HEIGHT, STICKY_HIDE_SELECTOR } from "@/lib/sticky-header";
import { Button } from "./Button";
import { Container } from "./Container";
import { LogoLockup } from "./LogoLockup";

/* The slim persistent header: wordmark left, the one CTA right. Hidden
   while the page-top header or a section marked `hidesStickyHeader` (the
   hero, the final CTA) sits in the band just under the bar — from 56px
   down to 20% of the viewport. Watching a band rather than the whole
   viewport means the bar stays up while the final CTA only peeks in at the
   bottom, and goes once you're inside it. The hero follows the header
   directly, so for it "in the band" and "on screen" are the same thing.
   One IntersectionObserver, no scroll listener. (Below a 280px-tall
   viewport the band is empty and the bar simply stays visible.)

   It appears without a transition — motion on this site is the hero
   entrance and the card hover lift, nothing else. While hidden it's
   visibility: hidden, so its links leave the tab order and the
   accessibility tree. */
export function StickyHeader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = [
      document.getElementById(SITE_HEADER_ID),
      ...document.querySelectorAll(STICKY_HIDE_SELECTOR),
    ].filter((el): el is Element => el !== null);

    const inView = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target);
          else inView.delete(entry.target);
        }
        setVisible(inView.size === 0);
      },
      { rootMargin: `-${STICKY_HEADER_HEIGHT}px 0px -80% 0px` },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className={`fixed inset-x-0 top-0 z-40 bg-surface shadow-2 ${visible ? "" : "invisible"}`}>
      <Container className="flex min-h-14 items-center justify-between gap-4">
        <Link href="/" className="inline-flex min-h-11 shrink-0 items-center rounded">
          <LogoLockup size="sm" showWordmark="sm" />
        </Link>
        <Button href={CTA.href} size="sm">
          {CTA.label}
        </Button>
      </Container>
    </div>
  );
}

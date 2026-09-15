import Link from "next/link";
import { FOOTER_COPYRIGHT, FOOTER_NAV } from "@/content/nav";
import { SITE } from "@/content/site";
import { Container } from "./Container";
import { LogoLockup } from "./LogoLockup";

/* One footer for every marketing route. The live site ships two — the /mcp
   variant drops a link and changes the company name — but only the
   standard one was ever captured, so it is the reconciled footer until the
   other is. Links keep 44px tap targets. */
export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-8 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto_auto] sm:gap-16">
          <div className="flex flex-col gap-4">
            <LogoLockup size="sm" />
            <p className="max-w-[32ch] text-small text-muted">{SITE.footerDisclaimer}</p>
          </div>

          {FOOTER_NAV.map((group) => {
            const headingId = `footer-${group.heading.toLowerCase()}`;
            return (
              <nav key={group.heading} aria-labelledby={headingId}>
                <h2 id={headingId} className="text-small font-medium">
                  {group.heading}
                </h2>
                <ul className="mt-2 flex flex-col">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-11 items-center rounded text-small text-muted transition-colors hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <p className="border-t border-border pt-8 text-small text-muted">{FOOTER_COPYRIGHT}</p>
      </Container>
    </footer>
  );
}

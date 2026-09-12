import Link from "next/link";
import { FOOTER_NAV, FOOTER_COPYRIGHT } from "@/content/nav";
import { LogoLockup } from "./LogoLockup";

export function SiteFooter() {
  return (
    <footer className="mt-6 pt-8 border-t border-border flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-8">
        <div className="flex flex-col gap-3">
          <LogoLockup size="sm" />
          <p className="text-[13px] text-muted max-w-[28ch]">
            Unaffiliated proof-of-concept reskin. Nothing here is a real
            service.
          </p>
        </div>
        {FOOTER_NAV.map((group) => (
          <div key={group.heading} className="flex flex-col gap-2 sm:min-w-[9rem]">
            <h3 className="text-[13px] font-medium text-ink">
              {group.heading}
            </h3>
            {group.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13px] text-muted hover:text-ink transition min-h-6"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <p className="text-[12px] text-muted">{FOOTER_COPYRIGHT}</p>
    </footer>
  );
}

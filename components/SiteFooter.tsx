import Link from "next/link";
import { FOOTER_NAV, FOOTER_COPYRIGHT } from "@/content/nav";

export function SiteFooter() {
  return (
    <footer className="mt-4 pt-8 border-t border-ink/10 flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        {FOOTER_NAV.map((group) => (
          <div key={group.heading} className="flex flex-col gap-2.5">
            <h3 className="text-[13px] font-medium text-ink">
              {group.heading}
            </h3>
            {group.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13px] text-muted hover:text-ink transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[13px] text-muted">{FOOTER_COPYRIGHT}</p>
        <p className="text-[11px] text-muted">
          Unaffiliated proof-of-concept reskin. Nothing here is a real
          service.
        </p>
      </div>
    </footer>
  );
}

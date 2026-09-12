import Link from "next/link";
import { FOOTER_NAV, FOOTER_COPYRIGHT } from "@/content/nav";

/* Black. The wordmark runs as large as the viewport allows. */
export function SiteFooter() {
  return (
    <footer className="bg-surface-dark text-ink-inverse">
      <div className="mx-auto max-w-[var(--content-max)] px-4 md:px-8 pt-14 pb-10 flex flex-col gap-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_NAV.map((group) => (
            <div key={group.heading} className="flex flex-col gap-2">
              <h3 className="text-[11px] uppercase tracking-[0.12em] font-bold text-ink-inverse/50">
                {group.heading}
              </h3>
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[15px] font-medium text-ink-inverse/85 hover:text-lime transition min-h-7"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="col-span-2 flex flex-col gap-2 md:text-right">
            <p className="text-[13px] text-ink-inverse/60">{FOOTER_COPYRIGHT}</p>
            <p className="text-[12px] text-ink-inverse/40">
              Unaffiliated proof-of-concept reskin. Nothing here is a real service.
            </p>
          </div>
        </div>
        <p
          aria-hidden
          className="font-display text-[clamp(56px,13vw,220px)] leading-[0.8] text-ink-inverse/10 select-none -mb-4 overflow-hidden whitespace-nowrap"
        >
          MediaMaxxing
        </p>
      </div>
    </footer>
  );
}

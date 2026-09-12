"use client";

import Image from "next/image";
import { Card } from "./Card";
import { Counter } from "./Counter";
import { Button } from "./Button";
import { CREATORS } from "@/content/creators";

const suggested = CREATORS.slice(0, 3);

export function RightRail() {
  return (
    <aside
      aria-label="Complementary"
      className="
        hidden xl:flex sticky top-0 h-screen w-[300px]
        flex-col gap-4 px-4 py-5
        border-l border-border on-page-bg-border overflow-y-auto
      "
    >
      <Card variant="dark" pad="md" className="relative overflow-hidden flex flex-col gap-1">
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-money/30 blur-3xl"
        />
        <p className="text-[12px] text-ink-inverse/60">Paid to creators this month</p>
        <Counter
          value={1204908}
          prefix="$"
          className="text-[34px] leading-none font-expanded text-money mt-1"
        />
        <p className="text-[12px] text-ink-inverse/60 mt-1">Across 342 creators</p>
      </Card>

      <Card variant="default" pad="md" className="flex flex-col gap-3">
        <p className="font-display text-[22px] leading-tight">
          Ready to earn?
        </p>
        <p className="text-[13px] text-muted -mt-1">
          Free to join. No résumé, no follower count.
        </p>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="sr-only" htmlFor="rr-email">
            Email address
          </label>
          <input
            id="rr-email"
            type="email"
            placeholder="you@example.com"
            className="
              rounded-full px-4 py-2 min-h-11
              bg-canvas border border-border
              text-[15px] placeholder:text-muted
              focus:border-ink
            "
          />
          <Button type="submit" variant="primary" className="w-full">
            Continue
          </Button>
        </form>
        <p className="text-[11px] text-muted">
          Prototype — form is not connected.
        </p>
      </Card>

      {/* Suggested-creators block sits directly on the page bg (no Card
          wrapper) — its text needs to invert when a dark section is
          active. `.on-page-bg` / `.on-page-bg-muted` are flipped by
          BackdropController via data-page-theme on <html>. */}
      <div className="flex flex-col gap-2">
        <p className="text-[12px] text-muted on-page-bg-muted px-1">
          Earning right now
        </p>
        <ul className="flex flex-col">
          {suggested.map((c) => (
            <li key={c.id}>
              <a
                href={`#creator-${c.id}`}
                className="
                  flex items-center gap-3 rounded-[var(--radius-control)] px-2 min-h-12
                  hover:bg-ink/[0.04] transition
                "
              >
                <span className="relative h-8 w-8 shrink-0 rounded-full overflow-hidden bg-surface-sunk ring-1 ring-border">
                  <Image
                    src={c.dashboardSrc}
                    alt=""
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col leading-tight min-w-0">
                  <span className="text-[14px] font-medium on-page-bg truncate">
                    {c.name}
                  </span>
                  <span className="text-[12px] text-muted on-page-bg-muted truncate">
                    @{c.handle}
                  </span>
                </span>
                <span className="ml-auto text-[13px] font-expanded text-money">
                  {c.earnings}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

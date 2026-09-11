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
        border-l border-ink/5 overflow-y-auto
      "
    >
      <Card variant="panel" pad="md" className="flex flex-col gap-1.5">
        <p className="text-[13px] text-muted">Paid to creators this month</p>
        <Counter
          value={1204908}
          prefix="$"
          className="text-[40px] leading-none font-expanded text-payout"
        />
        <p className="text-[13px] text-muted">Across 342 creators</p>
      </Card>

      <Card variant="default" pad="md" className="flex flex-col gap-3">
        <p className="text-[15px] font-medium leading-tight">
          Ready to earn?
        </p>
        <p className="text-[13px] text-muted">
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
              bg-canvas border border-ink/15
              text-[15px] placeholder:text-muted
            "
          />
          <Button type="submit" variant="secondary" className="w-full">
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
      <div className="flex flex-col gap-3">
        <p className="text-[13px] text-muted on-page-bg-muted px-1">
          Earning right now
        </p>
        <ul className="flex flex-col gap-1">
          {suggested.map((c) => (
            <li key={c.id}>
              <a
                href={`#creator-${c.id}`}
                className="
                  flex items-center gap-3 rounded-xl p-2 min-h-11
                  hover:bg-ink/[0.04] transition
                "
              >
                <span className="relative h-9 w-9 shrink-0 rounded-full overflow-hidden bg-panel">
                  <Image
                    src={c.dashboardSrc}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col leading-tight min-w-0">
                  <span className="text-[15px] on-page-bg truncate">
                    {c.name}
                  </span>
                  <span className="text-[13px] text-muted on-page-bg-muted truncate">
                    @{c.handle}
                  </span>
                </span>
                <span className="ml-auto text-[13px] font-expanded text-payout">
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

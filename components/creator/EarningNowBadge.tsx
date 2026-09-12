"use client";

import { useState } from "react";
import { CAMPAIGNS_PAGE } from "@/content/creator/ui";

/* Reviewer-requested urgency pill: a randomized count (51-299), regenerated
   per mount, with no basis in fixture data — unlike every other BadgePill
   kind, which is sourced from a campaign or brand fixture. Kept as its own
   component rather than a new Badge["kind"] so the fabricated number stays
   isolated from the typed content model. Flagged as a deliberate deviation
   in CREATOR-APP.md; implemented as requested. */
export function EarningNowBadge({ className = "" }: { className?: string }) {
  const [count] = useState(() => Math.floor(Math.random() * 249) + 51);

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full px-2 py-1
        text-[11px] font-medium leading-none tracking-wide uppercase
        whitespace-nowrap bg-money-sunk text-money
        ${className}
      `}
    >
      {CAMPAIGNS_PAGE.badges.earningNow(count)}
    </span>
  );
}

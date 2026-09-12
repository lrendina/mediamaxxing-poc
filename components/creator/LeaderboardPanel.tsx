"use client";

import { useState } from "react";
import type { Leaderboard } from "@/content/creator/types";
import { EARNINGS_PAGE } from "@/content/creator/ui";
import { TrophyIcon } from "./app-icons";
import { LeaderboardList } from "./LeaderboardList";
import { MetricToggle } from "./MetricToggle";

/* Earnings "Top Earners": trophy, title, $ / posts toggle, "All Time"
   scope, ranked list. Same list component as the campaign rail. */
export function LeaderboardPanel({ board }: { board: Leaderboard }) {
  const [metric, setMetric] = useState<Leaderboard["metric"]>("earned");

  return (
    <section
      aria-labelledby="top-earners-heading"
      className="rounded-[var(--radius-card)] bg-surface border-2 border-border p-5 flex flex-col gap-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        <TrophyIcon aria-hidden width={18} height={18} className="text-warn" />
        <h2 id="top-earners-heading" className="font-display-sm text-[24px]">
          {EARNINGS_PAGE.leaderboard.title}
        </h2>
        <span className="text-[11px] uppercase tracking-[0.1em] font-bold text-muted">{EARNINGS_PAGE.leaderboard.scope}</span>
        <span className="ml-auto">
          <MetricToggle
            label={EARNINGS_PAGE.leaderboard.title}
            value={metric}
            onChange={setMetric}
            options={[
              { value: "earned", label: EARNINGS_PAGE.leaderboard.earned },
              { value: "posts", label: EARNINGS_PAGE.leaderboard.posts },
            ]}
          />
        </span>
      </div>
      <LeaderboardList board={board} metric={metric} />
    </section>
  );
}

"use client";

import { useState } from "react";
import type { Leaderboard } from "@/content/creator/types";
import { CAMPAIGN_DETAIL } from "@/content/creator/ui";
import { formatCount } from "@/lib/format";
import { PeopleIcon } from "./app-icons";
import { LeaderboardList } from "./LeaderboardList";
import { MetricToggle } from "./MetricToggle";

/* Right rail of the detail view: people icon, "Creators", participant
   count, $ Earned / Posts toggle, the blue tooltip, ranked list with
   streaks. */
export function CreatorsPanel({
  board,
  creatorCount,
}: {
  board: Leaderboard;
  creatorCount: number;
}) {
  const [metric, setMetric] = useState<Leaderboard["metric"]>("earned");

  return (
    <section
      aria-labelledby="creators-heading"
      className="rounded-[var(--radius-card)] bg-surface border-2 border-border p-5 flex flex-col gap-4"
    >
      <div className="flex items-center gap-2">
        <PeopleIcon aria-hidden width={18} height={18} className="text-muted" />
        <h2 id="creators-heading" className="font-display-sm text-[24px]">
          {CAMPAIGN_DETAIL.creators.title}
        </h2>
        <span className="font-display-sm text-[24px] text-lime">{formatCount(creatorCount)}</span>
        <span className="ml-auto">
          <MetricToggle
            label={CAMPAIGN_DETAIL.creators.title}
            value={metric}
            onChange={setMetric}
            options={[
              { value: "earned", label: CAMPAIGN_DETAIL.creators.earned },
              { value: "posts", label: CAMPAIGN_DETAIL.creators.posts },
            ]}
          />
        </span>
      </div>

      <p
        role="note"
        className="relative self-start rounded-[6px] bg-lime text-surface-dark text-[13px] font-semibold px-3 py-2
          after:absolute after:-bottom-1.5 after:left-4 after:h-3 after:w-3 after:rotate-45 after:bg-lime"
      >
        {CAMPAIGN_DETAIL.creators.tooltip}
      </p>

      <LeaderboardList board={board} metric={metric} showStreak />
    </section>
  );
}

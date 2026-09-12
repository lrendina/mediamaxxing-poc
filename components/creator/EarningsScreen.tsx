"use client";

import { EARNINGS_PAGE } from "@/content/creator/ui";
import { formatCount, formatUsd } from "@/lib/format";
import { ArrowRightIcon, CheckIcon, ClockIcon, EarningsIcon, VideoIcon, WalletIcon } from "./app-icons";
import { useCreator } from "./CreatorStateProvider";
import { FilterChipBar } from "./FilterChipBar";
import { LeaderboardPanel } from "./LeaderboardPanel";
import { PageHeader } from "./PageHeader";
import { PrototypeButton } from "./PrototypeButton";
import { RevenueCard } from "./RevenueCard";
import { StatStrip } from "./StatStrip";

/* /creator/earnings — header with Withdraw, filter chips, revenue card,
   four-cell strip, Top Earners. The leaderboard's placement relative to
   the revenue card was not certain from the crop (assumed: beside it at
   xl, below it otherwise). */
export function EarningsScreen() {
  const { fixtures } = useCreator();
  const { earnings, topEarners } = fixtures;
  const money = earnings.totalCents > 0 ? "money" : "ink";

  return (
    <div className="flex flex-col gap-5 max-w-[var(--app-content-max)]">
      <PageHeader
        title={EARNINGS_PAGE.title}
        subtitle={EARNINGS_PAGE.subtitle}
        action={
          <PrototypeButton tone="action" size="sm">
            <WalletIcon aria-hidden width={16} height={16} />
            {EARNINGS_PAGE.withdraw}
            <ArrowRightIcon aria-hidden width={14} height={14} />
          </PrototypeButton>
        }
      />

      <FilterChipBar chips={EARNINGS_PAGE.filters} />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_var(--app-rail)] gap-4 items-start">
        <div className="flex flex-col gap-4 min-w-0">
          <RevenueCard earnings={earnings} />
          <StatStrip
            stats={[
              { label: EARNINGS_PAGE.stats.confirmed, value: formatUsd(earnings.confirmedCents, { cents: true }), icon: <CheckIcon width={14} height={14} />, tone: money },
              { label: EARNINGS_PAGE.stats.estimated, value: formatUsd(earnings.estimatedCents, { cents: true }), icon: <ClockIcon width={14} height={14} /> },
              { label: EARNINGS_PAGE.stats.total,     value: formatUsd(earnings.totalCents, { cents: true }),     icon: <EarningsIcon width={14} height={14} />, tone: money },
              { label: EARNINGS_PAGE.stats.views,     value: formatCount(earnings.totalViews),                    icon: <VideoIcon width={14} height={14} /> },
            ]}
          />
        </div>
        <LeaderboardPanel board={topEarners} />
      </div>
    </div>
  );
}

import type { Leaderboard } from "@/content/creator/types";
import { formatCount, formatUsd } from "@/lib/format";
import { Avatar } from "./Avatar";
import { FlameIcon } from "./app-icons";

/* One ranked list for both the Earnings "Top Earners" panel and the
   campaign "Creators" rail. Each row carries a proportional bar behind
   the figure, so the gap between first and eighth is visible without
   reading a single number. Medals for the top three, numerals after. */
const MEDAL = ["🥇", "🥈", "🥉"];

export function LeaderboardList({
  board,
  metric,
  showStreak = false,
}: {
  board: Leaderboard;
  metric: Leaderboard["metric"];
  showStreak?: boolean;
}) {
  const valueOf = (e: Leaderboard["entries"][number]) =>
    metric === "earned" ? e.earnedCents : e.posts;
  const max = Math.max(1, ...board.entries.map(valueOf));

  return (
    <ol className="flex flex-col gap-0.5">
      {board.entries.map((e) => {
        const pct = (valueOf(e) / max) * 100;
        return (
          <li
            key={e.handle}
            className="relative flex items-center gap-3 min-h-12 px-2 rounded overflow-hidden"
          >
            <span
              aria-hidden
              className={`absolute inset-y-1 left-0 rounded ${metric === "earned" ? "bg-money-sunk/70" : "bg-surface-sunk"}`}
              style={{ width: `${pct}%` }}
            />
            <span className="relative w-6 shrink-0 text-center text-[13px] text-muted tabular-nums">
              {e.position <= 3 ? (
                <span role="img" aria-label={`Rank ${e.position}`}>{MEDAL[e.position - 1]}</span>
              ) : (
                e.position
              )}
            </span>
            <Avatar handle={e.handle} avatarUrl={e.avatarUrl} size={28} className="relative" />
            <span className="relative flex-1 min-w-0 text-[14px] font-medium truncate">@{e.handle}</span>
            {showStreak && e.streakDays !== undefined ? (
              <span className="relative inline-flex items-center gap-0.5 text-[12px] text-streak shrink-0">
                <FlameIcon aria-hidden width={12} height={12} />
                <span className="sr-only">Streak </span>
                {e.streakDays}
              </span>
            ) : null}
            <span
              className={`relative shrink-0 text-[14px] font-expanded ${metric === "earned" ? "text-money" : "text-ink"}`}
            >
              {metric === "earned" ? formatUsd(e.earnedCents) : formatCount(e.posts)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

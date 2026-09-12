import type { Leaderboard } from "@/content/creator/types";
import { formatCount, formatUsd } from "@/lib/format";
import { Avatar } from "./Avatar";
import { FlameIcon } from "./app-icons";

/* One ranked list for both the Earnings "Top Earners" panel and the
   campaign "Creators" rail. Medals for the top three, plain numerals
   after; avatar, @handle, optional flame + streak, right-aligned figure.
   Medal colours are the three metals — not tokens, not decoration. */
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
  return (
    <ol className="flex flex-col">
      {board.entries.map((e) => (
        <li
          key={e.handle}
          className="flex items-center gap-3 min-h-12 py-1.5 border-b border-border last:border-b-0"
        >
          <span className="w-6 shrink-0 text-center text-[13px] text-muted tabular-nums">
            {e.position <= 3 ? (
              <span role="img" aria-label={`Rank ${e.position}`}>{MEDAL[e.position - 1]}</span>
            ) : (
              e.position
            )}
          </span>
          <Avatar handle={e.handle} avatarUrl={e.avatarUrl} size={32} />
          <span className="flex-1 min-w-0 text-[15px] truncate">@{e.handle}</span>
          {showStreak && e.streakDays !== undefined ? (
            <span className="inline-flex items-center gap-0.5 text-[13px] text-streak shrink-0">
              <FlameIcon aria-hidden width={14} height={14} />
              <span className="sr-only">Streak </span>
              {e.streakDays}
            </span>
          ) : null}
          <span
            className={`shrink-0 text-[15px] font-expanded ${metric === "earned" ? "text-money" : "text-ink"}`}
          >
            {metric === "earned" ? formatUsd(e.earnedCents) : formatCount(e.posts)}
          </span>
        </li>
      ))}
    </ol>
  );
}

import type { Leaderboard } from "@/content/creator/types";
import { formatCount, formatUsd } from "@/lib/format";
import { Avatar } from "./Avatar";
import { FlameIcon } from "./app-icons";

/* Ranked list with a proportional lime bar behind each figure. Positions
   are display numerals; the top three are lime. */
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
    <ol className="flex flex-col gap-1">
      {board.entries.map((e) => {
        const pct = (valueOf(e) / max) * 100;
        const top = e.position <= 3;
        return (
          <li
            key={e.handle}
            className="relative flex items-center gap-3 min-h-12 px-2 rounded-[6px] overflow-hidden"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 bg-lime/10"
              style={{ width: `${pct}%` }}
            />
            <span
              className={`relative w-8 shrink-0 font-display text-[20px] ${top ? "text-lime" : "text-muted"}`}
            >
              <span className="sr-only">Rank </span>
              {String(e.position).padStart(2, "0")}
            </span>
            <Avatar handle={e.handle} avatarUrl={e.avatarUrl} size={28} className="relative" />
            <span className="relative flex-1 min-w-0 text-[15px] font-semibold truncate">@{e.handle}</span>
            {showStreak && e.streakDays !== undefined ? (
              <span className="relative inline-flex items-center gap-0.5 text-[12px] font-bold text-streak shrink-0">
                <FlameIcon aria-hidden width={12} height={12} />
                <span className="sr-only">Streak </span>
                {e.streakDays}
              </span>
            ) : null}
            <span className={`relative shrink-0 font-expanded text-[16px] ${metric === "earned" ? "text-lime" : "text-ink"}`}>
              {metric === "earned" ? formatUsd(e.earnedCents) : formatCount(e.posts)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

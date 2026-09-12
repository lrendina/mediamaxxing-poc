import { RETAINERS_PAGE } from "@/content/creator/ui";
import { formatPercent } from "@/lib/format";
import { FlameIcon } from "./app-icons";

/* Observed: flame, "1 / 14 days", right-aligned "7%", orange bar, then
   14 markers labelled 1 / 7 / 14. Drawn as 14 cells — each day is a
   thing you fill, not a point on a line. Day one solid, day two the
   next-up state, the rest empty. */
export function StreakMeter({
  streakDays,
  requiredDays,
}: {
  streakDays: number;
  requiredDays: number;
}) {
  const done = Math.min(streakDays, requiredDays);
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-surface border border-border p-5">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-streak-sunk text-streak">
          <FlameIcon aria-hidden width={16} height={16} />
        </span>
        <span className="text-[15px] font-medium">
          {RETAINERS_PAGE.streak(streakDays, requiredDays)}
        </span>
        <span className="ml-auto text-[20px] font-expanded text-streak">
          {formatPercent(done / requiredDays)}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <ol
          role="progressbar"
          aria-label="Posting streak"
          aria-valuemin={0}
          aria-valuemax={requiredDays}
          aria-valuenow={done}
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${requiredDays}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: requiredDays }).map((_, i) => {
            const day = i + 1;
            const state = day <= done ? "done" : day === done + 1 ? "next" : "todo";
            return (
              <li key={day}>
                <span
                  className={`block h-8 rounded-[6px] ${
                    state === "done"
                      ? "bg-streak"
                      : state === "next"
                      ? "bg-streak-sunk ring-1 ring-inset ring-streak/50"
                      : "bg-surface-sunk"
                  }`}
                />
                <span className="sr-only">
                  Day {day}, {state === "done" ? "complete" : state === "next" ? "next" : "pending"}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="flex justify-between text-[11px] text-muted" aria-hidden>
          {RETAINERS_PAGE.dayLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

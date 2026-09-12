import { RETAINERS_PAGE } from "@/content/creator/ui";
import { formatPercent } from "@/lib/format";
import { FlameIcon } from "./app-icons";
import { ProgressBar } from "./ProgressBar";

/* Observed: flame, "1 / 14 days", right-aligned "7%", orange bar, then
   14 dots labelled 1 / 7 / 14. Day one solid, day two a soft next-up
   state, the rest empty. */
export function StreakMeter({
  streakDays,
  requiredDays,
}: {
  streakDays: number;
  requiredDays: number;
}) {
  const done = Math.min(streakDays, requiredDays);
  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-card)] bg-surface border border-border p-4">
      <div className="flex items-center gap-2">
        <FlameIcon aria-hidden width={18} height={18} className="text-streak" />
        <span className="text-[15px] font-medium">
          {RETAINERS_PAGE.streak(streakDays, requiredDays)}
        </span>
        <span className="ml-auto text-[15px] font-expanded text-streak">
          {formatPercent(done / requiredDays)}
        </span>
      </div>
      <ProgressBar value={done} max={requiredDays} tone="streak" label="Posting streak" />
      <div className="flex flex-col gap-1.5">
        <ol className="grid gap-1" style={{ gridTemplateColumns: `repeat(${requiredDays}, minmax(0, 1fr))` }} aria-label="Streak days">
          {Array.from({ length: requiredDays }).map((_, i) => {
            const day = i + 1;
            const state = day <= done ? "done" : day === done + 1 ? "next" : "todo";
            return (
              <li key={day} className="flex justify-center">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    state === "done" ? "bg-streak" : state === "next" ? "bg-streak-sunk ring-1 ring-inset ring-streak/50" : "bg-surface-sunk"
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

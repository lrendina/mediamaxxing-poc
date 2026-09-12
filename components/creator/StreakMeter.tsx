import { RETAINERS_PAGE } from "@/content/creator/ui";
import { formatPercent } from "@/lib/format";
import { FlameIcon } from "./app-icons";

/* Fourteen tall cells. Done is lime, next is outlined, the rest are sunk.
   The percentage is the headline. */
export function StreakMeter({
  streakDays,
  requiredDays,
}: {
  streakDays: number;
  requiredDays: number;
}) {
  const done = Math.min(streakDays, requiredDays);
  return (
    <div className="flex flex-col gap-5 rounded-[var(--radius-card)] bg-surface border-2 border-border p-5 md:p-6">
      <div className="flex items-end gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-streak text-ink-inverse">
          <FlameIcon aria-hidden width={20} height={20} />
        </span>
        <span className="font-display-sm text-[22px] pb-1">
          {RETAINERS_PAGE.streak(streakDays, requiredDays)}
        </span>
        <span className="ml-auto font-display text-[48px] md:text-[64px] text-lime">
          {formatPercent(done / requiredDays)}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <ol
          role="progressbar"
          aria-label="Posting streak"
          aria-valuemin={0}
          aria-valuemax={requiredDays}
          aria-valuenow={done}
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${requiredDays}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: requiredDays }).map((_, i) => {
            const day = i + 1;
            const state = day <= done ? "done" : day === done + 1 ? "next" : "todo";
            return (
              <li key={day}>
                <span
                  className={`block h-12 rounded-[4px] ${
                    state === "done"
                      ? "bg-lime"
                      : state === "next"
                      ? "border-2 border-dashed border-lime/60"
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
        <div className="flex justify-between text-[11px] uppercase tracking-[0.08em] font-bold text-muted" aria-hidden>
          {RETAINERS_PAGE.dayLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { Sparkline } from "./Sparkline";

export type StripStat = {
  label: string;
  value: string;
  icon?: ReactNode;
  tone?: "money" | "ink";
  series?: number[];
  assumedLabel?: boolean;
};

/* Numbers at display scale, each in its own hard-bordered cell. */
export function StatStrip({ stats }: { stats: StripStat[] }) {
  const cols = stats.length === 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4";
  return (
    <dl className={`grid ${cols} gap-3`}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-3 px-4 md:px-5 py-4 min-w-0 rounded-[var(--radius-card)] bg-surface border-2 border-border"
        >
          <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] font-bold text-muted truncate">
            {s.icon ? <span aria-hidden className="shrink-0">{s.icon}</span> : null}
            {s.label}
            {s.assumedLabel ? <span className="sr-only"> (label assumed)</span> : null}
          </dt>
          <dd className="flex items-end justify-between gap-2 min-w-0">
            <span
              className={`font-display text-[clamp(28px,3.2vw,48px)] truncate ${
                s.tone === "money" ? "text-lime" : "text-ink"
              }`}
            >
              {s.value}
            </span>
            {s.series ? (
              <Sparkline
                values={s.series}
                tone={s.tone === "money" ? "money" : "ink"}
                className="shrink-0 hidden sm:block"
              />
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

import type { ReactNode } from "react";
import { Sparkline } from "./Sparkline";

export type StripStat = {
  label: string;
  value: string;
  icon?: ReactNode;
  /* money → green expanded numeral; the rest are ink. */
  tone?: "money" | "ink";
  /* Optional trend behind the number. */
  series?: number[];
  /* Flags a label that was cropped in the screenshot and is a guess. */
  assumedLabel?: boolean;
};

/* One card, cells separated by hairlines — the numbers read as a row of
   a table rather than four unrelated boxes. */
export function StatStrip({ stats }: { stats: StripStat[] }) {
  const cols =
    stats.length === 3
      ? "grid-cols-3"
      : "grid-cols-2 lg:grid-cols-4";
  return (
    <dl
      className={`grid ${cols} rounded-[var(--radius-card)] bg-surface border border-border overflow-hidden`}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col gap-1.5 px-4 md:px-5 py-4 min-w-0 border-border ${
            i > 0 ? "border-l" : ""
          } ${stats.length === 4 && i >= 2 ? "border-t lg:border-t-0" : ""} ${
            stats.length === 4 && i === 2 ? "!border-l-0 lg:!border-l" : ""
          }`}
        >
          <dt className="flex items-center gap-1.5 text-[12px] text-muted truncate">
            {s.icon ? <span aria-hidden className="shrink-0">{s.icon}</span> : null}
            {s.label}
            {s.assumedLabel ? (
              <span className="sr-only"> (label assumed)</span>
            ) : null}
          </dt>
          <dd className="flex items-end justify-between gap-2 min-w-0">
            <span
              className={`text-[22px] md:text-[26px] leading-none font-expanded truncate ${
                s.tone === "money" ? "text-money" : "text-ink"
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

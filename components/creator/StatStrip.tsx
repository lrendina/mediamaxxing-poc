import type { ReactNode } from "react";

export type StripStat = {
  label: string;
  value: string;
  icon?: ReactNode;
  /* money → green expanded numeral; the rest are ink. */
  tone?: "money" | "ink";
  /* Flags a label that was cropped in the screenshot and is a guess. */
  assumedLabel?: boolean;
};

/* Row of stat cells — three atop the campaign detail, four on Earnings.
   A sibling of the marketing StatGrid with card chrome per cell, which is
   how the app draws it. */
export function StatStrip({ stats }: { stats: StripStat[] }) {
  return (
    <dl className={`grid gap-3 ${stats.length === 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-1 rounded-[var(--radius-card)] bg-surface border border-border px-4 py-3 min-w-0"
        >
          <dt className="flex items-center gap-1.5 text-[13px] text-muted truncate">
            {s.icon ? <span aria-hidden className="shrink-0">{s.icon}</span> : null}
            {s.label}
            {s.assumedLabel ? (
              <span className="sr-only"> (label assumed)</span>
            ) : null}
          </dt>
          <dd
            className={`text-[18px] sm:text-[24px] leading-none font-expanded truncate ${s.tone === "money" ? "text-money" : "text-ink"}`}
          >
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

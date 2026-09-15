export type Stat = {
  label: string;
  value: string;
  expanded?: boolean;
};

export function StatGrid({
  stats,
  className = "",
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <dl className={`grid ${gridColsFor(stats.length)} gap-2 ${className}`}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-1 min-w-0 rounded-[var(--radius-control)] bg-surface-sunk px-3 py-2.5"
        >
          <dd className="text-[22px] leading-none truncate font-expanded">{s.value}</dd>
          <dt className="text-[11px] uppercase tracking-[0.06em] font-semibold text-muted truncate">
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

function gridColsFor(n: number) {
  if (n <= 2) return "grid-cols-2";
  if (n === 3) return "grid-cols-3";
  return "grid-cols-2 sm:grid-cols-4";
}

export type Stat = {
  label: string;
  value: string;
  /* When true, the value gets the expanded numeral treatment. */
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
    <dl
      className={`grid gap-4 ${gridColsFor(stats.length)} ${className}`}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1 min-w-0">
          <dt className="text-[13px] text-muted truncate">{s.label}</dt>
          <dd
            className={`text-[18px] leading-none truncate ${
              s.expanded ? "font-expanded" : ""
            }`}
          >
            {s.value}
          </dd>
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

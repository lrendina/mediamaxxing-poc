export type Stat = {
  label: string;
  value: string;
  /* When true, the value gets the expanded numeral treatment. */
  expanded?: boolean;
};

/* Labeled values separated by hairlines — a small table, not a caption
   string. Value above label so the number leads. */
export function StatGrid({
  stats,
  className = "",
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <dl
      className={`grid ${gridColsFor(stats.length)} divide-x divide-border ${className}`}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1 min-w-0 px-4 first:pl-0 last:pr-0">
          <dd
            className={`text-[20px] leading-none truncate ${
              s.expanded ? "font-expanded" : "font-medium"
            }`}
          >
            {s.value}
          </dd>
          <dt className="text-[12px] text-muted truncate">{s.label}</dt>
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

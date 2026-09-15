export type Stat = {
  label: string;
  value: string;
  /* When true, the value gets the expanded numeral treatment. */
  expanded?: boolean;
};

/* A small labelled table of figures. Value leads, label follows, and nothing
   truncates: a 375px phone and a narrow three-column grid cell both have to
   fit "Followers 51.8K" without clipping the number. */
export function StatRow({
  stats,
  className = "",
}: {
  stats: readonly Stat[];
  className?: string;
}) {
  if (stats.length === 0) return null;

  return (
    <dl className={`grid gap-4 ${gridColumnsFor(stats.length)} ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={`${stat.label}-${index}`}
          className="flex min-w-0 flex-col-reverse gap-2"
        >
          {/* dt before dd keeps the markup in spec order; column-reverse is
              what puts the number on top, where it leads. */}
          <dt className="text-small text-muted">{stat.label}</dt>
          <dd
            className={`text-body tabular-nums ${
              stat.expanded ? "font-expanded" : "font-medium"
            }`}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* Two columns up to four stats, three for the common three-stat card, and a
   2x2 block for anything longer — never so many columns that a label has to
   be shortened. */
function gridColumnsFor(count: number): string {
  if (count === 1) return "grid-cols-1";
  if (count <= 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-3";
  return "grid-cols-2 sm:grid-cols-4";
}

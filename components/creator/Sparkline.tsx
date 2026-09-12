/* Tiny inline trend line for stat tiles. Decorative — the number beside
   it is the data, this is the shape. */
export function Sparkline({
  values,
  tone = "money",
  className = "",
}: {
  values: number[];
  tone?: "money" | "ink" | "streak";
  className?: string;
}) {
  if (values.length < 2) return null;
  const w = 80;
  const h = 24;
  const max = Math.max(1, ...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const step = w / (values.length - 1);
  const pts = values.map(
    (v, i) => `${(i * step).toFixed(1)},${(h - 2 - ((v - min) / range) * (h - 4)).toFixed(1)}`
  );
  const color =
    tone === "money" ? "text-money" : tone === "streak" ? "text-streak" : "text-ink/60";
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      aria-hidden
      className={`${color} ${className}`}
    >
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={w}
        cy={h - 2 - ((values[values.length - 1] - min) / range) * (h - 4)}
        r="2"
        fill="currentColor"
      />
    </svg>
  );
}

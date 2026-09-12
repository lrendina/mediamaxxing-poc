/* Thin track + fill. `tone` follows the token roles: streak for XP and
   posting streaks, action for onboarding, money for earnings. */
export type ProgressTone = "streak" | "action" | "money" | "neutral";

const fillClass: Record<ProgressTone, string> = {
  streak: "bg-streak",
  action: "bg-lime",
  money: "bg-lime",
  neutral: "bg-ink/40",
};

export function ProgressBar({
  value,
  max,
  tone = "streak",
  label,
  className = "",
  height = "h-2",
}: {
  value: number;
  max: number;
  tone?: ProgressTone;
  /* Accessible name for the progressbar. */
  label: string;
  className?: string;
  height?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={`w-full rounded-full bg-surface-sunk overflow-hidden ${height} ${className}`}
    >
      <div
        className={`h-full rounded-full ${fillClass[tone]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

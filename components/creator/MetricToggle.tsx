"use client";

/* Two-state segmented control ("$ Earned" / "Posts", "Table" / "Cards").
   A real radiogroup — this one is allowed to work because it only changes
   what is displayed, never what is stored. */
export function MetricToggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; icon?: React.ReactNode }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex items-center rounded-full bg-surface-sunk p-0.5"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`
              inline-flex items-center gap-1.5 min-h-8 px-3 rounded-full
              text-[13px] font-medium transition
              ${active ? "bg-surface text-ink shadow-[0_1px_2px_rgba(13,18,32,0.08)]" : "text-muted hover:text-ink"}
            `}
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

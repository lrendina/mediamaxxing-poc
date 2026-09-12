import { formatRate } from "@/lib/format";

/* "$7/1K Views" — the blue rate pill. Rates are actions in the app's
   colour grammar (they sit on the thing you press), hence `action`. */
export function RatePill({
  centsPerThousand,
  suffix = "Views",
  className = "",
}: {
  centsPerThousand: number;
  suffix?: string | null;
  className?: string;
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full px-2.5 py-1
        bg-action-sunk text-action text-[13px] font-medium leading-none
        whitespace-nowrap
        ${className}
      `}
    >
      <span className="font-expanded">{formatRate(centsPerThousand)}</span>
      {suffix ? <span>{suffix}</span> : null}
    </span>
  );
}

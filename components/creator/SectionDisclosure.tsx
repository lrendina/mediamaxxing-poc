import type { ReactNode } from "react";
import { ChevronDownIcon } from "./app-icons";

/* Collapsible section header: chevron, label, count ("My Brands · 1").
   Native <details> like the marketing Accordion — keyboard and ARIA for
   free. Open by default; both observed sections were expanded. */
export function SectionDisclosure({
  label,
  count,
  defaultOpen = true,
  children,
}: {
  label: string;
  count: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group">
      <summary
        className="
          flex items-center gap-2 min-h-11 py-2 -mx-1 px-1 rounded-[var(--radius-control)]
          cursor-pointer list-none select-none
          text-[15px] font-medium
          [&::-webkit-details-marker]:hidden
          hover:bg-ink/[0.03]
        "
      >
        <ChevronDownIcon
          aria-hidden
          width={18}
          height={18}
          className="text-muted transition group-open:rotate-0 -rotate-90"
        />
        <span>{label}</span>
        <span className="text-muted" aria-hidden>·</span>
        <span className="text-muted">{count}</span>
      </summary>
      <div className="pt-2 pb-4">{children}</div>
    </details>
  );
}

import type { ReactNode } from "react";
import { ChevronDownIcon } from "./app-icons";

/* Section header at display size with the count in lime. Native <details>. */
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
          flex items-center gap-3 min-h-11 py-3
          cursor-pointer list-none select-none
          border-t-2 border-border
          [&::-webkit-details-marker]:hidden
        "
      >
        <span className="font-display text-[28px] md:text-[36px]">{label}</span>
        <span className="font-display text-[28px] md:text-[36px] text-lime">{count}</span>
        <ChevronDownIcon
          aria-hidden
          width={22}
          height={22}
          strokeWidth={2.2}
          className="ml-auto text-muted transition group-open:rotate-0 -rotate-90"
        />
      </summary>
      <div className="pt-3 pb-8">{children}</div>
    </details>
  );
}

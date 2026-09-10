import type { ReactNode } from "react";

export type AccordionItem = {
  question: string;
  answer: ReactNode;
};

/* Native <details>/<summary> — keyboard nav, ARIA, and open state come free.
   No JS required, no useState, no animation library. */
export function Accordion({
  items,
  className = "",
}: {
  items: AccordionItem[];
  className?: string;
}) {
  return (
    <div className={`divide-y divide-ink/10 ${className}`}>
      {items.map((item, i) => (
        <details
          key={i}
          className="group py-1"
        >
          <summary
            className="
              flex items-center justify-between gap-4 py-4
              cursor-pointer list-none min-h-11
              text-[18px] leading-snug
              [&::-webkit-details-marker]:hidden
            "
          >
            <span>{item.question}</span>
            <span
              aria-hidden
              className="
                shrink-0 h-6 w-6 rounded-full bg-panel
                flex items-center justify-center text-[18px] leading-none
                transition group-open:rotate-45
              "
            >
              +
            </span>
          </summary>
          <div className="pb-4 text-[15px] text-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

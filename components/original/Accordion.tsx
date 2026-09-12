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
    <div className={`divide-y divide-border ${className}`}>
      {items.map((item, i) => (
        <details
          key={i}
          className="group"
        >
          <summary
            className="
              flex items-center justify-between gap-4 py-4
              cursor-pointer list-none min-h-11
              text-[17px] leading-snug font-medium tracking-[-0.005em]
              [&::-webkit-details-marker]:hidden
            "
          >
            <span>{item.question}</span>
            <span
              aria-hidden
              className="
                shrink-0 h-7 w-7 rounded-full border border-border
                flex items-center justify-center text-[18px] leading-none text-muted
                transition group-open:rotate-45 group-open:bg-ink group-open:text-ink-inverse group-open:border-ink
              "
            >
              +
            </span>
          </summary>
          <div className="pb-5 pr-10 text-[15px] text-muted leading-[1.6]">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

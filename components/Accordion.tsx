import type { ReactNode } from "react";

export type AccordionItem = {
  question: string;
  answer: ReactNode;
};

/* Native <details>/<summary>. Questions at display size. */
export function Accordion({
  items,
  className = "",
}: {
  items: AccordionItem[];
  className?: string;
}) {
  return (
    <div className={`divide-y-2 divide-ink border-y-2 border-ink ${className}`}>
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary
            className="
              flex items-center justify-between gap-6 py-6
              cursor-pointer list-none min-h-11
              font-display-sm text-[22px] md:text-[30px]
              [&::-webkit-details-marker]:hidden
            "
          >
            <span>{item.question}</span>
            <span
              aria-hidden
              className="
                shrink-0 h-10 w-10 rounded-full border-2 border-ink
                flex items-center justify-center text-[24px] leading-none
                transition group-open:rotate-45 group-open:bg-lime
              "
            >
              +
            </span>
          </summary>
          <div className="pb-7 pr-16 text-[17px] text-muted leading-[1.55] max-w-[64ch]">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

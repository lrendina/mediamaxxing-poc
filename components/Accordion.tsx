import { useId, type ReactNode } from "react";

export type AccordionItem = {
  question: string;
  answer: ReactNode;
};

export type AccordionGroup = {
  id: string;
  title: string;
  items: readonly AccordionItem[];
};

type AccordionCommonProps = {
  /* Flattened index of the item that starts open. `null` disables the
     default; `undefined` keeps it (closed for the flat list, first item of
     the first non-empty group for grouped). */
  defaultOpenIndex?: number | null;
  className?: string;
};

export type FlatAccordionProps = AccordionCommonProps & {
  items: readonly AccordionItem[];
  groups?: never;
};

export type GroupedAccordionProps = AccordionCommonProps & {
  groups: readonly AccordionGroup[];
  items?: never;
};

export type AccordionProps = FlatAccordionProps | GroupedAccordionProps;

/* One row, shared by both shapes. <details> stays uncontrolled: we only ever
   set the *initial* `open` attribute, so the browser owns the state afterwards
   and several rows can be open at once. `defaultOpen` is not a real HTML
   attribute, hence the conditional spread (no defaultOpen, no useState). */
function AccordionRow({
  question,
  answer,
  open,
}: {
  question: string;
  answer: ReactNode;
  open: boolean;
}) {
  return (
    <details className="group" {...(open ? { open: true } : {})}>
      <summary
        className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-body font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action [&::-webkit-details-marker]:hidden"
      >
        <span className="min-w-0 flex-1 break-words">{question}</span>
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-body leading-none text-muted group-open:border-ink group-open:bg-ink group-open:text-ink-inverse"
        >
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <div className="min-w-0 break-words pb-6 text-body text-muted">{answer}</div>
    </details>
  );
}

/* Native <details>/<summary>: keyboard nav, ARIA and open state come free, no
   JS. Grouped form renders an h3 per category wired with aria-labelledby;
   useId keeps category headings unique across multiple synchronous server
   component instances on the same page. */
export function Accordion(props: AccordionProps) {
  const { className = "", defaultOpenIndex } = props;
  const instanceId = useId();

  if (props.groups) {
    const groups = props.groups.filter((group) => group.items.length > 0);

    return (
      <div className={`flex flex-col gap-8 ${className}`}>
        {groups.map((group, groupIndex) => {
          const baseIndex = groups.slice(0, groupIndex).reduce(
            (count, previous) => count + previous.items.length, 0,
          );
          const headingId = `${instanceId}-${groupIndex}-heading`;

          return (
            <section
              key={`${group.id}-${groupIndex}`}
              aria-labelledby={headingId}
              className="flex min-w-0 flex-col gap-4"
            >
              <h3 id={headingId} className="text-h3 text-ink">
                {group.title}
              </h3>
              <div className="divide-y divide-border">
                {group.items.map((item, itemIndex) => {
                  const index = baseIndex + itemIndex;
                  const open =
                    defaultOpenIndex === undefined
                      ? index === 0
                      : defaultOpenIndex !== null && defaultOpenIndex === index;

                  return (
                    <AccordionRow
                      key={`${group.id}-${itemIndex}`}
                      question={item.question}
                      answer={item.answer}
                      open={open}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  /* Flat (legacy) API: closed by default unless an explicit index is given. */
  return (
    <div className={`divide-y divide-border ${className}`}>
      {props.items.map((item, index) => (
        <AccordionRow
          key={`${index}-${item.question}`}
          question={item.question}
          answer={item.answer}
          open={typeof defaultOpenIndex === "number" && defaultOpenIndex === index}
        />
      ))}
    </div>
  );
}

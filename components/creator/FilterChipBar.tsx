import { SHELL } from "@/content/creator/ui";
import { ChevronDownIcon, FilterIcon } from "./app-icons";

/* Outlined pills with a leading glyph and trailing chevron — the observed
   filter row on Submissions and Earnings. Inert: they are dropdowns in
   the real app and there is nothing to filter in a fixture. */
export function FilterChipBar({ chips }: { chips: string[] }) {
  return (
    <div className="flex gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-1">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          title={SHELL.prototypeControl}
          aria-haspopup="listbox"
          className="
            inline-flex shrink-0 items-center gap-1.5 min-h-10 px-3.5
            rounded-full bg-surface border border-border
            text-[13px] font-medium text-ink whitespace-nowrap
            hover:border-ink transition
          "
        >
          <FilterIcon aria-hidden width={14} height={14} className="text-muted" />
          {chip}
          <ChevronDownIcon aria-hidden width={14} height={14} className="text-muted" />
        </button>
      ))}
    </div>
  );
}

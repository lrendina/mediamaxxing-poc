const CHIPS = [
  { label: "All",           href: "#top"          },
  { label: "Earnings",      href: "#proof"        },
  { label: "How it works",  href: "#how-it-works" },
  { label: "Questions",     href: "#questions"    },
];

/* Sticky at the top of the feed column. Anchor targets each set
   `scroll-mt-24` so they don't slide under this bar. */
export function FeedFilters() {
  return (
    <nav
      aria-label="Feed sections"
      className="
        sticky top-0 z-30
        bg-canvas/90 backdrop-blur
        border-b border-border
      "
    >
      <ul className="flex gap-2 overflow-x-auto px-4 md:px-6 py-2">
        {CHIPS.map((chip) => (
          <li key={chip.label}>
            <a
              href={chip.href}
              className="
                inline-flex items-center rounded-full min-h-11
                bg-ink/[0.05] hover:bg-ink/[0.08] active:bg-ink/[0.10]
                text-ink text-[13px] font-medium
                px-3.5 whitespace-nowrap transition
              "
            >
              {chip.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

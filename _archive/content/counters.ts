export const COUNTERS_A11Y_LABEL = "Platform totals";

export type HeroCounter = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

/* The live site's headline counters ("0+ Creators Earned", "$0M+ Paid to
   Creators", "0★ Creator Rating") are JS-computed at runtime — the raw HTML
   only ships the 0 placeholders, so we couldn't scrape them. These are
   round-number stand-ins consistent with the RightRail counter used
   elsewhere in the shell. Replace with real numbers when they land. */
export const HERO_COUNTERS: HeroCounter[] = [
  { value: 5_200,     suffix: "+",  label: "Creators earned" },
  { value: 12,        prefix: "$", suffix: "M+", label: "Paid to creators" },
  { value: 4.9,       suffix: "★",  label: "Creator rating" },
];

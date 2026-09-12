/* The single money formatter. Every dollar figure on both surfaces goes
   through here so cents-in / string-out is the only contract. */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const usdWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/* $153,823 (whole) or $30.00 (cents) — pass `cents: true` for the latter. */
export function formatUsd(cents: number, opts: { cents?: boolean } = {}) {
  return (opts.cents ? usd : usdWhole).format(cents / 100);
}

/* $1.0K, $3.5K — for badges and compact chips. */
export function formatUsdCompact(cents: number) {
  const dollars = cents / 100;
  if (dollars >= 1000) return `$${(dollars / 1000).toFixed(1)}K`;
  return usdWhole.format(dollars);
}

/* $7/1K, $3.5/1K, $1.25/1K — the observed rate pill notation. Trims a
   trailing zero so $3.50 reads as $3.5 (observed) but $1.25 stays. */
export function formatRate(centsPerThousand: number) {
  const dollars = centsPerThousand / 100;
  const s =
    Number.isInteger(dollars) ? `${dollars}` : dollars.toFixed(2).replace(/0$/, "");
  return `$${s}/1K`;
}

/* Views: 2.0K, 12.4K, 1.2M. Matches the observed "0 – 2.0K views". */
export function formatViews(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}

export function formatCount(n: number) {
  return n.toLocaleString("en-US");
}

export function formatPercent(fraction: number) {
  return `${Math.round(fraction * 100)}%`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

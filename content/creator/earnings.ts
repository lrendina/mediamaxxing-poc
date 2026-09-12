import type { EarningsSummary } from "./types";

/* Observed: $0.00, chart locked. */
export const EARNINGS_NEW: EarningsSummary = {
  confirmedCents: 0,
  estimatedCents: 0,
  totalCents: 0,
  totalViews: 0,
  windowDays: 30,
  series: [],
};

/* Populated 30-day series. Assumed; totals reconcile with the populated
   submissions fixture in spirit, not to the cent. */
export const EARNINGS_ACTIVE: EarningsSummary = {
  confirmedCents: 23_085,
  estimatedCents: 3_554,
  totalCents: 26_639,
  totalViews: 76_070,
  windowDays: 30,
  series: [
    { date: "2026-08-13", amountCents: 0 },
    { date: "2026-08-15", amountCents: 0 },
    { date: "2026-08-17", amountCents: 420 },
    { date: "2026-08-19", amountCents: 910 },
    { date: "2026-08-21", amountCents: 640 },
    { date: "2026-08-23", amountCents: 1_280 },
    { date: "2026-08-25", amountCents: 1_050 },
    { date: "2026-08-27", amountCents: 2_140 },
    { date: "2026-08-29", amountCents: 1_720 },
    { date: "2026-08-31", amountCents: 2_610 },
    { date: "2026-09-02", amountCents: 3_880 },
    { date: "2026-09-04", amountCents: 2_950 },
    { date: "2026-09-06", amountCents: 3_410 },
    { date: "2026-09-08", amountCents: 2_190 },
    { date: "2026-09-10", amountCents: 3_439 },
  ],
};

import type { LandingIconName } from "@/components/LandingIcon";

export interface TrustTile {
  icon: LandingIconName;
  title: string;
  body: string;
}

export interface TrustSection {
  heading: string;
  tiles: readonly TrustTile[];
}

/* LANDING-PAGE.md, Section 4. Claims the company can stand behind: never an
   earnings guarantee, never a seal or certification. Verbatim from the spec,
   kept as written on request (2026-09-15). For the record: "Over $1M paid
   out" is sourced (PAID_OUT in content/source/platform.ts); "Reviewed in 7
   days" has no recorded source, and the repo elsewhere says 48 hours
   (REVIEW_WINDOW_META). */
export const TRUST: TrustSection = {
  heading: "What we can actually promise",
  tiles: [
    { icon: "gift", title: "Free to join", body: "No fees, no subscription, nothing taken up front." },
    { icon: "eye", title: "Paid per view", body: "Compensation tracks performance automatically." },
    { icon: "dollar", title: "Over $1M paid out", body: "Their own published figure." },
    { icon: "clock", title: "Reviewed in 7 days", body: "From the platform's stated submission review window." },
  ],
};

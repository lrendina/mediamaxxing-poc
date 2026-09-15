export interface TrustTile {
  title: string;
  body: string;
}

export interface TrustSection {
  heading: string;
  tiles: readonly TrustTile[];
}

/* LANDING-PAGE.md, Section 4. Claims the company can stand behind: never an
   earnings guarantee, never a seal or certification. Verbatim from the spec,
   with two lines open for review before Phase 5:
   - "Over $1M paid out": the figure is sourced (two live blog excerpts, see
     PAID_OUT in content/source/platform.ts), but the body reads as a note to
     the builder rather than copy for a prospect.
   - "Reviewed in 7 days": no recorded source. The repo says 48 hours in
     three places, also unsourced (REVIEW_WINDOW_META). */
export const TRUST: TrustSection = {
  heading: "What we can actually promise",
  tiles: [
    { title: "Free to join", body: "No fees, no subscription, nothing taken up front." },
    { title: "Paid per view", body: "Compensation tracks performance automatically." },
    { title: "Over $1M paid out", body: "Their own published figure." },
    { title: "Reviewed in 7 days", body: "From the platform's stated submission review window." },
  ],
};

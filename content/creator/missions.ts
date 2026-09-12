import type { Mission } from "./types";
import { fromNow, DAYS } from "@/lib/time";

/* Both observed on the campaigns index. Reward amounts observed; the
   bonus title wording is close to observed but not verbatim (assumed). */
export const MISSIONS_NEW: Mission[] = [
  {
    id: "new-creator-bonus",
    kind: "newCreatorBonus",
    eyebrow: "NEW CREATOR BONUS",
    title: "Post 3 days in a row",
    reward: { type: "cents", amount: 3000 },
    progress: { current: 0, total: 3 },
    expiresAt: fromNow(14 * DAYS),
  },
  {
    id: "daily",
    kind: "daily",
    eyebrow: "DAILY MISSION",
    title: "Submit one post today",
    reward: { type: "xp", amount: 50 },
    progress: { current: 0, total: 1 },
  },
];

/* Populated: bonus claimed and gone, daily mission half done. Assumed. */
export const MISSIONS_ACTIVE: Mission[] = [
  {
    id: "daily",
    kind: "daily",
    eyebrow: "DAILY MISSION",
    title: "Submit two posts today",
    reward: { type: "xp", amount: 80 },
    progress: { current: 1, total: 2 },
  },
];

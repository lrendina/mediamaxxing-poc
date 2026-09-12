import type { RetainerStatus } from "./types";

/* Observed: 1 / 14 days, 7%, locked. */
export const RETAINER_NEW: RetainerStatus = {
  streakDays: 1,
  requiredDays: 14,
  unlocked: false,
};

/* Populated: streak past the gate. What the unlocked page shows was not
   observed — see RETAINER_UNLOCKED_COPY in ui.ts (assumed). */
export const RETAINER_ACTIVE: RetainerStatus = {
  streakDays: 17,
  requiredDays: 14,
  unlocked: true,
};

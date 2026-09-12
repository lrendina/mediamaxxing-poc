import type { CreatorFixtures } from "./types";
import { newCreator, activeCreator } from "./profiles";
import { BRANDS } from "./brands";
import { OPENART_CAMPAIGNS, OPENART_CAMPAIGNS_ACTIVE } from "./campaigns";
import { MISSIONS_NEW, MISSIONS_ACTIVE } from "./missions";
import { MILESTONES_NEW, MILESTONES_ACTIVE } from "./milestones";
import { SUBMISSIONS_NEW, SUBMISSIONS_ACTIVE } from "./submissions";
import { EARNINGS_NEW, EARNINGS_ACTIVE } from "./earnings";
import { TOP_EARNERS } from "./leaderboard";
import { COURSES_NEW, COURSES_ACTIVE } from "./courses";
import { RETAINER_NEW, RETAINER_ACTIVE } from "./retainers";

export type CreatorState = "new" | "populated";

/* The observed account, with one deviation: the screenshots show this
   account already in OpenArt with Director Advanced accepted. Per explicit
   request, a new creator now starts outside every brand — every card is
   locked behind "Apply to join" and nothing is accepted yet. */
export const NEW_CREATOR: CreatorFixtures = {
  profile: newCreator,
  brands: BRANDS.map((b) => ({ ...b, joined: false })),
  campaigns: OPENART_CAMPAIGNS.map((c) => ({
    ...c,
    status: c.status === "accepted" ? "available" : c.status,
    acceptedDeadline: undefined,
  })),
  missions: MISSIONS_NEW,
  milestones: MILESTONES_NEW,
  submissions: SUBMISSIONS_NEW,
  earnings: EARNINGS_NEW,
  topEarners: TOP_EARNERS,
  courses: COURSES_NEW,
  retainer: RETAINER_NEW,
};

/* ?state=populated */
export const ACTIVE_CREATOR: CreatorFixtures = {
  profile: activeCreator,
  brands: BRANDS.map((b) =>
    /* A more active creator has joined a couple more brands. Assumed. */
    b.id === "speed" || b.id === "lovable" ? { ...b, joined: true } : b
  ),
  campaigns: OPENART_CAMPAIGNS_ACTIVE,
  missions: MISSIONS_ACTIVE,
  milestones: MILESTONES_ACTIVE,
  submissions: SUBMISSIONS_ACTIVE,
  earnings: EARNINGS_ACTIVE,
  topEarners: TOP_EARNERS,
  courses: COURSES_ACTIVE,
  retainer: RETAINER_ACTIVE,
};

export function fixturesFor(state: CreatorState): CreatorFixtures {
  return state === "populated" ? ACTIVE_CREATOR : NEW_CREATOR;
}

export function parseState(value: string | null | undefined): CreatorState {
  return value === "populated" ? "populated" : "new";
}

export const STATE_PARAM = "state";

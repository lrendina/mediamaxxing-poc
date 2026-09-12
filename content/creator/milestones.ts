import type { Milestone } from "./types";

/* Rank Ladder "Missions" tab — one-time lifetime milestones, distinct from
   the renewing bonus/daily cards in missions.ts. The list and order are
   observed (explicit product spec); reward XP amounts were not observed
   and are assumed, scaled roughly with how hard each milestone is to hit. */
const MILESTONE_DEFS: Omit<Milestone, "progress">[] = [
  { id: "link-account", category: "account", title: "Link an account", rewardXp: 25 },
  { id: "first-post", category: "posts", title: "Make your first post", rewardXp: 25 },
  { id: "posts-5", category: "posts", title: "Make 5 posts", rewardXp: 50 },
  { id: "posts-10", category: "posts", title: "Make 10 posts", rewardXp: 75 },
  { id: "posts-100", category: "posts", title: "Make 100 posts", rewardXp: 250 },
  { id: "views-1k", category: "views", title: "Reach 1,000 views", rewardXp: 50 },
  { id: "views-2k", category: "views", title: "Reach 2,000 views", rewardXp: 75 },
  { id: "views-10k", category: "views", title: "Reach 10,000 views", rewardXp: 150 },
  { id: "views-20k", category: "views", title: "Reach 20,000 views", rewardXp: 250 },
  { id: "campaign-posts-5", category: "campaign", title: "Post 5 times on a single campaign", rewardXp: 50 },
  { id: "campaign-posts-10", category: "campaign", title: "Post 10 times on a single campaign", rewardXp: 100 },
  { id: "campaign-posts-20", category: "campaign", title: "Post 20 times on a single campaign", rewardXp: 175 },
  { id: "campaign-posts-50", category: "campaign", title: "Post 50 times on a single campaign", rewardXp: 300 },
  { id: "earnings-100", category: "earnings", title: "Earn your first $100", rewardXp: 100 },
  { id: "earnings-500", category: "earnings", title: "Earn your first $500", rewardXp: 200 },
  { id: "earnings-1000", category: "earnings", title: "Earn your first $1,000", rewardXp: 350 },
  { id: "claim-bounty", category: "bounty", title: "Claim a bounty", rewardXp: 150 },
];

/* Observed: a brand-new account has done none of it. */
export const MILESTONES_NEW: Milestone[] = MILESTONE_DEFS.map((m) => ({
  ...m,
  progress: { current: 0, total: 1 },
}));

/* Populated counterpart. Progress reconciles in spirit with the populated
   submissions/earnings fixtures (6 posts, 76,070 views, ~$266 earned, none
   on a single campaign past 4) — assumed, not derived programmatically. */
const ACTIVE_PROGRESS: Record<string, { current: number; total: number }> = {
  "link-account": { current: 1, total: 1 },
  "first-post": { current: 1, total: 1 },
  "posts-5": { current: 6, total: 5 },
  "posts-10": { current: 6, total: 10 },
  "posts-100": { current: 6, total: 100 },
  "views-1k": { current: 76_070, total: 1_000 },
  "views-2k": { current: 76_070, total: 2_000 },
  "views-10k": { current: 76_070, total: 10_000 },
  "views-20k": { current: 76_070, total: 20_000 },
  "campaign-posts-5": { current: 4, total: 5 },
  "campaign-posts-10": { current: 4, total: 10 },
  "campaign-posts-20": { current: 4, total: 20 },
  "campaign-posts-50": { current: 4, total: 50 },
  "earnings-100": { current: 266, total: 100 },
  "earnings-500": { current: 266, total: 500 },
  "earnings-1000": { current: 266, total: 1000 },
  "claim-bounty": { current: 0, total: 1 },
};

export const MILESTONES_ACTIVE: Milestone[] = MILESTONE_DEFS.map((m) => ({
  ...m,
  progress: ACTIVE_PROGRESS[m.id],
}));

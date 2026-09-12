import type { Submission } from "./types";

/* Observed: empty. */
export const SUBMISSIONS_NEW: Submission[] = [];

/* Populated table was never observed; rows are built from the filter
   dimensions the empty state exposed (status, campaign, platform, views,
   earnings, date). All assumed. */
export const SUBMISSIONS_ACTIVE: Submission[] = [
  { id: "s-01", campaignId: "openart-director-advanced", platform: "tiktok",    postUrl: "https://www.tiktok.com/@lorenzo/video/1", views: 48_200, earningsCents: 16_870, status: "paid",     submittedAt: "2026-09-02T14:10:00Z", reviewedAt: "2026-09-03T09:00:00Z" },
  { id: "s-02", campaignId: "openart-director-advanced", platform: "instagram", postUrl: "https://www.instagram.com/reel/2",       views: 12_900, earningsCents: 4_515,  status: "approved", submittedAt: "2026-09-05T18:22:00Z", reviewedAt: "2026-09-06T10:15:00Z" },
  { id: "s-03", campaignId: "openart-chat-basic",        platform: "tiktok",    postUrl: "https://www.tiktok.com/@lorenzo/video/3", views: 3_400,  earningsCents: 1_700,  status: "approved", submittedAt: "2026-09-06T11:05:00Z", reviewedAt: "2026-09-07T08:40:00Z" },
  { id: "s-04", campaignId: "openart-director-advanced", platform: "youtube",   postUrl: "https://www.youtube.com/shorts/4",       views: 1_150,  earningsCents: 0,      status: "rejected", submittedAt: "2026-09-07T20:48:00Z", reviewedAt: "2026-09-08T12:00:00Z", rejectionReason: "Reused footage from another campaign" },
  { id: "s-05", campaignId: "openart-director-advanced", platform: "tiktok",    postUrl: "https://www.tiktok.com/@lorenzo/video/5", views: 9_800,  earningsCents: 3_430,  status: "pending",  submittedAt: "2026-09-10T16:30:00Z" },
  { id: "s-06", campaignId: "openart-chat-basic",        platform: "instagram", postUrl: "https://www.instagram.com/reel/6",       views: 620,    earningsCents: 124,    status: "pending",  submittedAt: "2026-09-11T08:12:00Z" },
];

export const STATUS_LABEL: Record<Submission["status"], string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  paid: "Paid",
};

export const PLATFORM_LABEL: Record<Submission["platform"], string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
};

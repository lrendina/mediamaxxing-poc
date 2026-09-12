/* Every string the creator app renders. Observed copy is reproduced as
   seen; anything not legible in a screenshot is marked assumed. */

export const SHELL = {
  logoAlt: "MediaMaxxing",
  collapseSidebar: "Collapse sidebar",
  expandSidebar: "Expand sidebar",
  joinDiscord: "Join Discord",
  notifications: "Notifications",
  darkMode: "Dark mode",
  darkModeDisabledNote: "Dark mode is not built in this prototype.",
  prototypeControl: "Prototype control — does nothing",
  discordBanner: {
    body: "Connect your Discord account to access private campaigns.",
    link: "Connect Discord",
    dismiss: "Dismiss", // dismissible is assumed
  },
  rank: {
    toNext: (n: number, rank: string) => `${n} to ${rank}`,
    xp: (n: number) => `${n.toLocaleString("en-US")} XP`,
    open: "View rank details",
  },
};

/* Rank Ladder modal, opened from RankBar. Title, perks-soon banner, and
   "FOUNDATION / Every creator begins the climb" are observed verbatim from
   a screenshot. The Ladder/Missions tab split is not observed — this is a
   deviation to fit both the ladder and the milestone checklist behind one
   entry point, per the same request that added the checklist. Flagged,
   not hidden. */
export const RANK_LADDER = {
  title: "Rank Ladder",
  subtitle: "Earn XP through campaigns, submissions, and retainers",
  perksSoon: "Rank perks launching soon. Climb now, lock in your tier.",
  close: "Close",
  tabs: { ladder: "Ladder", missions: "Missions" }, // assumed structure
  foundationEyebrow: "FOUNDATION",
  foundationSubtitle: "Every creator begins the climb",
  current: "Current",
  xpProgress: (current: number, total: number) =>
    `${current.toLocaleString("en-US")} / ${total.toLocaleString("en-US")} XP`,
  toNext: (n: number, rank: string) => `${n.toLocaleString("en-US")} XP until ${rank}`,
  unlockAt: (xp: number) => `Unlock at ${xp.toLocaleString("en-US")} XP`,
  reached: "Reached", // assumed — no screenshot of a rank already passed
  missionsSubtitle: "Complete missions to climb faster.", // assumed
  missionReward: (xp: number) => `+${xp} XP`,
};

export const CAMPAIGNS_PAGE = {
  title: "Campaigns",
  subtitle: "Browse brands, join campaigns, and get paid per view.", // assumed
  myBrands: "My Brands",
  brands: "Brands",
  campaignsCount: (n: number) => (n === 1 ? "1 campaign" : `${n} campaigns`),
  daysProgress: (c: number, t: number) => `${c}/${t} days`,
  featured: {
    instruction: "Post before the deadline to keep your spot.", // assumed
    cta: "View campaign",
  },
  badges: {
    accepted: "ACCEPTED",
    bounty: "Bounty available",
    xp: (m: number) => `${m}x XP`,
    live: "LIVE",
    /* Reviewer-requested urgency badge — the count is randomized on the
       client, not sourced from a fixture. See CREATOR-APP.md. */
    earningNow: (n: number) => `${n} creators earning right now!`,
  },
};

export const CAMPAIGN_DETAIL = {
  back: "Campaigns",
  tabs: { overview: "Overview", submissions: "Submissions" },
  streak: (c: number, t: number) => `${c}/${t}`,
  campaignsHeading: "CAMPAIGNS",
  onboarding: {
    title: "Complete onboarding",
    step: (c: number, t: number) => `Step ${c} of ${t}`,
  },
  submit: "Submit Content",
  /* Labels for the three-cell stat strip were cropped in the screenshot.
     These are placeholders — the [HUMAN] task in PLAN.md is to confirm
     them against the live app before shipping. All assumed. */
  stats: {
    rate: "Rate",
    posts: "Posts",
    budget: "Budget",
  },
  payRate: {
    title: "Pay Rate by Views",
    note: "Rates vary by view range. Higher view counts unlock higher rates.",
    range: (lo: string, hi: string | null) => (hi ? `${lo} – ${hi} views` : `${lo}+ views`),
  },
  guidelines: {
    title: "Campaign Guidelines",
    readCarefully: "Read these carefully before posting. Submissions that ignore them are rejected.",
    openNotion: "Open in Notion",
    imageMissing: "Guideline image",
  },
  creators: {
    title: "Creators",
    earned: "$ Earned",
    posts: "Posts",
    tooltip: "The more you post, the more you make",
  },
};

export const SUBMISSIONS_PAGE = {
  title: "Submissions",
  subtitle: "Track your posts, their review status, and what they've earned.", // assumed
  autoSubmit: "Auto Submit",
  info: {
    title: "New to the Platform?",
    body: "Submissions are reviewed within 48 hours. View counts can lag the platform by up to 24 hours, so earnings update after the views do.", // assumed wording
  },
  filters: ["All Statuses", "Earning: All", "Campaign: All", "All Platforms", "Date (Newest)"],
  view: { table: "Table", cards: "Cards" },
  empty: {
    title: "No submissions found",
    body: "You haven't submitted any content yet. Join a campaign and submit your first post to see it here.", // assumed wording
  },
  columns: {
    post: "Post",
    campaign: "Campaign",
    platform: "Platform",
    status: "Status",
    views: "Views",
    earnings: "Earnings",
    date: "Date",
  },
};

export const EARNINGS_PAGE = {
  title: "Earnings",
  subtitle: "See what your content has earned and cash out.", // assumed
  withdraw: "Withdraw",
  filters: ["Last 30 Days", "All Campaigns", "All Platforms"],
  revenue: "REVENUE",
  chartView: { line: "Line chart", calendar: "Calendar" },
  locked: {
    title: "Unlock your earning potential",
    body: "Join a campaign and submit your first post. Your revenue chart fills in as views come in.", // assumed wording
    cta: "Explore Campaigns",
  },
  stats: {
    confirmed: "Confirmed (30D)",
    estimated: "Estimated (30D)",
    total: "Total (30D)",
    views: "Total Views (30D)",
  },
  leaderboard: {
    title: "Top Earners",
    scope: "All Time",
    earned: "$",
    posts: "Posts",
  },
};

export const RETAINERS_PAGE = {
  title: "Retainers",
  subtitle: "Fixed monthly deals with brands for consistent creators.", // assumed
  locked: {
    title: "Complete a 14-Day Posting Streak",
    body: "Retainers open once you've posted for 14 consecutive days.", // assumed wording
  },
  streak: (c: number, t: number) => `${c} / ${t} days`,
  dayLabels: ["1", "7", "14"],
  note: "Completing the streak lets you apply for retainers. It doesn't guarantee one — brands choose who they work with.", // assumed wording
  unlocked: {
    title: "You're eligible to apply",
    body: "Your streak is past the gate. Applications are reviewed by the brand.", // assumed
    cta: "Apply for a retainer",
  },
};

export const COURSES_PAGE = {
  title: "Courses",
  subtitle: "Short lessons on making content that gets views.", // assumed
  courseTitle: (order: number, title: string) => `${order}. ${title}`,
  lessons: (n: number) => (n === 1 ? "1 lesson" : `${n} lessons`),
  duration: (m: number) => `${m}m`,
  completed: (c: number, t: number) => `${c} / ${t} completed`,
};

export const WHITE_LABEL_PAGE = {
  title: "Campaign White Label",
  badge: "Early access",
  headline: "Run campaigns under your own brand",
  lede: "Bring our campaign marketplace to your creators, set your own rates, and keep the margin. We handle tracking and payouts.", // assumed wording
  features: [
    { icon: "list",   title: "List our campaigns",     body: "Every active campaign, available to your creators the day you launch." },
    { icon: "rate",   title: "Set your own rates",     body: "Choose what your creators earn per thousand views. The difference is yours." },
    { icon: "payout", title: "Get paid automatically", body: "Payouts run on our schedule. Nothing to reconcile, nothing to invoice." },
    { icon: "plus",   title: "Add your own campaigns", body: "Run your own brand deals alongside ours, in the same dashboard." },
  ],
  apply: "Apply",
};

/* The "Get started" button's destination (see content/nav.ts): a modal
   over /creator/campaigns rather than its own page (?welcome=1 opens it —
   see WelcomeModal.tsx and CampaignsScreen.tsx), not observed, built per
   explicit request. Plays the 0 -> signup-bonus XP animation once, then
   points to the three onboarding actions. "Join OpenArt" and "Link an
   account" both land on the OpenArt campaign detail page — that's where
   CampaignSidebar's own onboarding checklist ("Link an account", "Make
   your first post") already lives, so this doesn't invent a second,
   unobserved account-settings page. */
export const WELCOME_MODAL = {
  title: "You're in.",
  subtitle: "New accounts start with a small XP bonus. Here's how to start earning.",
  xpEyebrow: "Signup bonus",
  stepsHeading: "Get started",
  steps: [
    {
      title: "Join OpenArt",
      body: "We matched you to a campaign that's live right now.",
      href: "/creator/campaigns/openart/director-advanced",
    },
    {
      title: "Link an account",
      body: "Connect the account you'll post from — it's the first step in OpenArt's onboarding checklist.",
      href: "/creator/campaigns/openart/director-advanced",
    },
  ],
  close: "Close",
  skip: "I'll look around first",
};

export const STATE_SWITCH = {
  label: "Fixture state",
  new: "New creator",
  populated: "Populated",
};

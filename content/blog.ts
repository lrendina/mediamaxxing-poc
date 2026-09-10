export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  publishedAt: string;    // ISO date
  readMinutes: number;    // estimated — not scraped
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "brands-guide-ugc-2026",
    title: "The Brand's Guide to Working With UGC Creators in 2026",
    excerpt:
      "How to find, brief, pay, and scale UGC creators in 2026, with real rate data and a faster pay-per-view model that has paid creators over $1M.",
    cover: "/proof/blog/brands-guide-ugc-2026.png",
    publishedAt: "2026-09-08",
    readMinutes: 10,
  },
  {
    slug: "ugc-vs-influencer",
    title: "UGC vs Influencer Content: Which Actually Pays More",
    excerpt:
      "UGC vs influencer content, broken down with real rate data and what creators actually earn. Plus the pay-per-view model paying out over $1M.",
    cover: "/proof/blog/ugc-vs-influencer.png",
    publishedAt: "2026-09-08",
    readMinutes: 7,
  },
  {
    slug: "brands-shifting-budgets",
    title: "10 Reasons Brands Are Shifting Ad Budgets to UGC in 2026",
    excerpt:
      "Brands moved $10.52B into creators in 2025. Here are 10 data-backed reasons ad budgets are flowing to UGC, plus real MediaMaxxing payout proof.",
    cover: "/proof/blog/brands-shifting-budgets.png",
    publishedAt: "2026-09-04",
    readMinutes: 8,
  },
];

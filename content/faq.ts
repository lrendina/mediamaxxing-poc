import type { AccordionItem } from "@/components/Accordion";

export const FAQ_HEADING = "Questions";

/* Only the first answer was extractable verbatim from the live site — the
   other four answers are loaded inside a React streaming payload that our
   fetch could not read. The stand-in answers below are our best summary of
   what the site implies elsewhere (blurbs, hero copy, creator locations) and
   MUST be replaced during the [HUMAN] copy pass before ship. */
export const FAQ: AccordionItem[] = [
  {
    question: "What exactly is MediaMaxxing?",
    answer:
      "MediaMaxxing is a creator-first platform that connects you directly with brands running paid UGC campaigns. You pick a campaign, film your videos, submit them for review, and get paid automatically once approved. It's the easiest way to turn short-form content into income. No outreach, no clients, no middlemen.",
  },
  {
    question: "Do I need experience or followers?",
    answer:
      "No. Templates walk you through what to film, and payouts are per-view — not per-follower. Natalie hit $30,361 on under 2,000 followers using the same playbook. (Placeholder answer — replace during copy pass.)",
  },
  {
    question: "How fast can I start earning?",
    answer:
      "Sign-up is instant. Most creators submit their first campaign the same day and see approvals within 48 hours. Payouts are automatic once your work clears review. (Placeholder answer — replace during copy pass.)",
  },
  {
    question: "What kinds of campaigns are available?",
    answer:
      "Brand campaigns across consumer products, apps, and services — each with a template that has already gone viral. New campaigns land weekly. (Placeholder answer — replace during copy pass.)",
  },
  {
    question: "Is this available worldwide?",
    answer:
      "Creators from most countries are eligible — payouts land via standard international rails. (Placeholder answer — replace during copy pass.)",
  },
];

import { FAQ_ITEMS } from "@/content/source/faq";

export interface FaqItem {
  question: string;
  /* null until the answer has real copy. Never render a guess in its place. */
  answer: string | null;
  /* "live-site" questions are quoted; "spec" questions are worded from the
     topics LANDING-PAGE.md lists. */
  questionSource: "live-site" | "spec";
}

export interface FaqGroup {
  id: string;
  title: string;
  items: readonly FaqItem[];
}

export interface FaqSection {
  heading: string;
  groups: readonly FaqGroup[];
}

/* A live-site question. Its answer comes along only if the answer is
   live-site copy too: the source's answers 2–5 are the old build's
   placeholders, and they stay out. */
function live(question: string): FaqItem {
  const source = FAQ_ITEMS.find((item) => item.question === question);
  if (!source) {
    throw new Error(`content/faq: "${question}" is not in content/source/faq.ts`);
  }
  return {
    question,
    answer: source.provenance === "live-site" ? source.answer : null,
    questionSource: "live-site",
  };
}

/* A gap LANDING-PAGE.md asks us to fill. The answer is written in the
   PLAN.md Phase 4 human pass. */
function gap(question: string): FaqItem {
  return { question, answer: null, questionSource: "spec" };
}

/* LANDING-PAGE.md, Section 5. The five live-site questions are distributed
   first, then the spec's topics fill the gaps. Where a live question already
   covers a spec topic, the live wording is used instead of adding a
   near-duplicate:
   - "Do I need experience or followers?" covers "Do I need followers?" and
     "Do I need experience?"
   - "How fast can I start earning?" covers "How fast can I post my first
     video?"
   - "Is this available worldwide?" covers "Which countries" */
export const FAQ: FaqSection = {
  heading: "Questions before you start",
  groups: [
    {
      id: "getting-started",
      title: "Getting started",
      items: [
        live("What exactly is MediaMaxxing?"),
        live("Do I need experience or followers?"),
        gap("What equipment do I need?"),
        live("How fast can I start earning?"),
      ],
    },
    {
      id: "getting-paid",
      title: "Getting paid",
      items: [
        gap("How does pay per view work?"),
        gap("When do payouts land?"),
        gap("What happens if a video underperforms?"),
        gap("Is there a minimum payout?"),
      ],
    },
    {
      id: "campaigns",
      title: "Campaigns & content",
      items: [
        gap("Who picks the campaigns?"),
        live("What kinds of campaigns are available?"),
        gap("Can I use my own idea?"),
        gap("Do I have to disclose sponsorship?"),
        gap("Who owns the video?"),
      ],
    },
    {
      /* The spec's facts for this group, to be written from the platform's
         legal page: 13+, with parental consent under 18; government ID and
         tax documentation before payouts. */
      id: "eligibility",
      title: "Eligibility",
      items: [
        gap("How old do I need to be?"),
        gap("What verification is required?"),
        live("Is this available worldwide?"),
      ],
    },
  ],
};

export interface Step {
  title: string;
  body: string;
}

export interface StepsSection {
  heading: string;
  steps: readonly Step[];
}

/* LANDING-PAGE.md, Section 2a. Verbatim. Supersedes the live site's "Start
   earning in three simple steps", which stays on record in
   content/source/homepage.ts. Titles carry no number: the page prefixes the
   plain step number, never a 01 / 02 / 03 display numeral. */
export const STEPS: StepsSection = {
  heading: "From signup to your first campaign in five minutes",
  steps: [
    { title: "Pick a campaign", body: "Browse live brand campaigns and join in one tap." },
    { title: "Film from the template", body: "Every campaign ships with formats that have already gone viral." },
    { title: "Post and get paid", body: "Submit the link. Payouts run automatically on views." },
  ],
};

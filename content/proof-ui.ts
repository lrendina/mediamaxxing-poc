/* Copy and accessible labels for creator testimonials.

   The components stay presentational: every string a person reads or hears
   lives here, so it can be reviewed in one pass, translated, and kept
   consistent wherever a testimonial card is reused.
   Nothing here is a claim — the alt text describes what the screenshot is,
   never what it proves. */

export const proofUi = {
  /** Sits directly above the headline earnings figure on a testimonial card. */
  earningsLabel: "Total earned",
  /** Heading above the full story, which only appears inside the lightbox. */
  fullStoryLabel: "Their story",
} as const;

/** Accessible heading for the dialog. */
export function dashboardDialogTitle(name: string): string {
  return `${name}'s dashboard and story`;
}

/** Accessible name for the button that opens the dialog. */
export function dashboardTriggerLabel(name: string): string {
  return `Open ${name}'s dashboard and story`;
}

/** Accessible name for the dialog's close button. */
export function dialogCloseLabel(name: string): string {
  return `Close ${name}'s dashboard`;
}

/** Alt text for the full dashboard screenshot inside the dialog. */
export function dashboardImageAlt(name: string): string {
  return `Screenshot of ${name}'s earnings dashboard`;
}

/** Alt text for the phone screenshot inside the dialog. */
export function phoneImageAlt(name: string): string {
  return `Screenshot of ${name}'s social account on a phone`;
}

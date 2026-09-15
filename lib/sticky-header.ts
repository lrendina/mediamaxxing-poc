/* Shared by Header, StickyHeader and Section. */

/* The page-top header. StickyHeader stays hidden while it's in view. */
export const SITE_HEADER_ID = "site-header";

/* Section's `hidesStickyHeader` prop renders this attribute — the hero and
   the final CTA carry it, and StickyHeader stays hidden while any marked
   element is in view. */
export const STICKY_HIDE_SELECTOR = "[data-hides-sticky-header]";

/* StickyHeader's height in px, matching its min-h-14. Used as the observer's
   top margin so a section counts as gone once it's under the bar. */
export const STICKY_HEADER_HEIGHT = 56;

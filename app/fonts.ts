import { Archivo, Instrument_Serif } from "next/font/google";

/* UI, body, and — via the wdth axis — every number. */
export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
});

/* Display headings only: h1, section h2, page headers, the CTA band.
   Never numbers (no tabular figures), never body. */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

import { Archivo, Instrument_Serif } from "next/font/google";

/* One variable family for the marketing surface. The width axis does the
   display work: wdth 125 at weight 800, uppercase, is the poster voice;
   wdth 100 at 400–500 is the UI voice; wdth 125 at 500 is every number. */
export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
});

/* Creator app display face only ("paper and signal"): h1, section h2,
   page headers, empty-state titles. Never numbers, never body. */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

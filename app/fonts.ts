import { Archivo } from "next/font/google";

/* One variable family. The width axis does the display work: wdth 125 at
   weight 800, uppercase, is the poster voice; wdth 100 at 400–500 is the
   UI voice; wdth 125 at 500 is every number. */
export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
});

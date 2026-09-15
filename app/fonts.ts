import { Archivo } from "next/font/google";

/* One variable family for both surfaces. wdth 100 is the UI and heading
   voice; wdth 125 at weight 500 is every number (.font-expanded). */
export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
});

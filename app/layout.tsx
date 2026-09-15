import type { Metadata } from "next";
import { Agentation } from "agentation";
import { archivo, instrumentSerif } from "./fonts";
import { SkipToContent } from "@/components/SkipToContent";
import { SITE } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = SITE.metadata;

/* Root layout owns only the document: fonts, tokens, skip link, dev tools.
   The two surfaces each mount their own shell one level down —
   app/(marketing)/layout.tsx for the public site, app/creator/layout.tsx
   for the creator app — so they can share primitives without one shell
   having to know about the other. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-ink font-sans">
        <SkipToContent />
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}

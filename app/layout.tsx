import type { Metadata } from "next";
import { Agentation } from "agentation";
import { archivo } from "./fonts";
import { SkipToContent } from "@/components/SkipToContent";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaMaxxing",
  description:
    "A proof-of-concept reskin of mediamaxxing.com — a three-column app shell built for a design interview.",
};

/* Root layout owns only the document: fonts, tokens, skip link, dev tools.
   The two surfaces each mount their own shell one level down —
   app/(marketing)/layout.tsx for the public site, app/creator/layout.tsx
   for the creator app — so they can share primitives without one shell
   having to know about the other. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      {/* No bg-canvas here — body background is driven by --page-bg
          in globals.css so it can fade between section colours. */}
      <body className="min-h-full text-ink font-sans">
        <SkipToContent />
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { archivo } from "./fonts";
import { Sidebar } from "@/components/Sidebar";
import { RightRail } from "@/components/RightRail";
import { MobileTabBar } from "@/components/MobileTabBar";
import { SkipToContent } from "@/components/SkipToContent";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaMaxxing",
  description:
    "A proof-of-concept reskin of mediamaxxing.com — a three-column app shell built for a design interview.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full bg-canvas text-ink font-sans">
        <SkipToContent />

        <div
          className="
            min-h-svh
            grid grid-cols-1
            md:grid-cols-[72px_1fr]
            lg:grid-cols-[240px_1fr]
            xl:grid-cols-[240px_1fr_300px]
          "
        >
          <Sidebar />

          <main
            id="main"
            tabIndex={-1}
            className="
              min-w-0
              pb-[calc(var(--mobile-tabs)+env(safe-area-inset-bottom))]
              md:pb-0
            "
          >
            {children}
          </main>

          <RightRail />
        </div>

        <MobileTabBar />
      </body>
    </html>
  );
}

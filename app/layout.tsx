import type { Metadata } from "next";
import { archivo } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaMaxxing",
  description:
    "A proof-of-concept reskin of mediamaxxing.com — a three-column app shell built for a design interview.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans">
        {children}
      </body>
    </html>
  );
}

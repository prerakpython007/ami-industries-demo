import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ami-industries.example.com"),
  title: {
    default: "AMI Industries — Precision ovens for modern kitchens",
    template: "%s | AMI Industries",
  },
  description:
    "AMI Industries manufactures, trades and exports commercial ovens, cooking ranges and heating solutions to kitchens in 41 countries.",
  keywords: ["ovens", "built-in oven", "induction range", "combi microwave", "kitchen appliances"],
  openGraph: {
    title: "AMI Industries — Precision ovens for modern kitchens",
    description:
      "Manufacturers, traders, exporters and heating solutions — commercial ovens and ranges built for precise, even heat.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${fraunces.variable} h-full bg-white`}>
      <body id="top" className="min-h-full bg-white text-ink-900 antialiased">
        <div className="flex min-h-full flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

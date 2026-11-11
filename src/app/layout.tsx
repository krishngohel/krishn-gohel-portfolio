import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/standard.css";
import "@fontsource-variable/ibm-plex-sans/index.css";
import "@fontsource-variable/ibm-plex-sans/wght-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krishn Gohel, AI/ML engineer",
  description:
    "Krishn Gohel, AI/ML engineer in Frisco, TX. Necto, the Gratiture recruiting CRM, Paper Desk, TrafficLab and 16 more projects, with screenshots, code and the real numbers.",
  keywords: ["Krishn Gohel", "AI/ML engineer", "machine learning", "software engineer", "full-stack", "Necto", "Webloom", "UTSA", "Supabase", "Next.js"],
  openGraph: {
    title: "Krishn Gohel, AI/ML engineer",
    description:
      "20 projects with screenshots, code, and the numbers behind them.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0e10",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

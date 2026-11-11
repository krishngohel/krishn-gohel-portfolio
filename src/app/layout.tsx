import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/standard.css";
import "@fontsource-variable/ibm-plex-sans/index.css";
import "@fontsource-variable/ibm-plex-sans/wght-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krishn Gohel, software engineer",
  description:
    "Software engineer in Frisco, TX. Builds Necto, a relationship CRM on iOS, Android and web; lead-routing and recruiting platforms for clients; 50+ client projects through Webloom.",
  keywords: ["Krishn Gohel", "software engineer", "full-stack", "Necto", "Webloom", "UTSA", "Supabase", "Next.js"],
  openGraph: {
    title: "Krishn Gohel, software engineer",
    description:
      "Necto, Ringlist, the Gratiture recruiting platform, and earlier work. Schema to deploy, and still running after launch.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e9eae5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

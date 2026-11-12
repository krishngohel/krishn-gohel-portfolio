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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0e10" },
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-mode="plain" suppressHydrationWarning>
      <head>
        <script
          // Apply the saved theme and detail level before first paint.
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{var t=localStorage.getItem("kg-theme");var m=localStorage.getItem("kg-mode");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.dataset.theme=t;if(m==="tech"||m==="plain")d.dataset.mode=m}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

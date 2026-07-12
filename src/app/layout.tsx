import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MouseFollower } from "@/components/shared/mouse-follower";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { BackToTop } from "@/components/shared/back-to-top";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  title: "Krishn Gohel — Full-stack & AI Engineer",
  description:
    "Krishn Gohel — Computer Science @ UTSA, founder of Webloom, full-stack & AI engineer. I build privacy-first AI platforms, ML classifiers, and SaaS products that ship.",
  keywords: ["Krishn Gohel", "full-stack developer", "AI engineer", "Next.js", "machine learning", "Webloom", "UTSA"],
  openGraph: {
    title: "Krishn Gohel — Full-stack & AI Engineer",
    description: "Privacy-first AI platforms, ML classifiers, and SaaS products — built and shipped end to end.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body>
        <ScrollProgress />
        <MouseFollower />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}

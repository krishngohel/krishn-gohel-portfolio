import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { AboutEdges } from "@/components/about-edges";

export const metadata: Metadata = {
  title: "About — Krishn Gohel",
  description: "Computer Science @ UTSA, founder of Webloom, full-stack & AI engineer.",
};

export default function AboutPage() {
  return (
    <section className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl border border-[#2a241c]/12">
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #fff6ec 0%, #f1ecf9 55%, #e7f3ef 100%)" }} />
            <div className="absolute right-[-60px] top-[-60px] h-[260px] w-[260px] rounded-full opacity-30 blur-[90px]" style={{ background: "rgba(194,87,31,0.4)" }} />
            <div className="absolute bottom-[-50px] left-[-50px] h-[220px] w-[220px] rounded-full opacity-30 blur-[90px]" style={{ background: "rgba(138,99,210,0.4)" }} />
            <span className="relative font-display text-8xl font-bold text-[#2a241c]/90 md:text-9xl">KG</span>
          </div>

          <div className="flex flex-col justify-center">
            <SectionHeading label="01 · About" title="Building things that ship." />
            <div className="mt-8 flex flex-col gap-5 leading-relaxed text-[#6f6557]">
              <p>
                I&apos;m a Computer Science student at the{" "}
                <strong className="font-semibold text-[#2a241c]">University of Texas at San Antonio</strong> with a
                Data Science concentration, graduating <strong className="font-semibold text-[#2a241c]">May 2026</strong>.
              </p>
              <p>
                Since 2023 I&apos;ve run <strong className="font-semibold text-[#2a241c]">Webloom</strong>, a digital
                services business in Dallas where I&apos;ve delivered{" "}
                <strong className="font-semibold text-[#2a241c]">50+ paid client projects</strong> end to end — from
                discovery and requirements all the way to deployment and ongoing support.
              </p>
              <p>
                On the engineering side I build privacy-first AI platforms, ML classifiers, and full-stack SaaS
                products — federated learning, real-time computer vision, NLP ensembles, and developer tooling. I
                like owning the whole thing: design it, build it, ship it, keep it running.
              </p>
            </div>
          </div>
        </div>

        <AboutEdges />
      </div>
    </section>
  );
}

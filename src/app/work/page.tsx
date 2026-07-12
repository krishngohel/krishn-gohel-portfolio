import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectTimeline } from "@/components/shared/project-timeline";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Krishn Gohel",
  description: "Projects I've built. Hover for a glimpse, click to open.",
};

export default function WorkPage() {
  return (
    <section className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          label="Portfolio"
          title="Things I've built"
          description="Hover for a glimpse, click to open the live site or repo."
        />
        <div className="mt-14">
          <ProjectTimeline projects={projects} />
        </div>
      </div>
    </section>
  );
}

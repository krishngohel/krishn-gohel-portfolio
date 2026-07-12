"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectTimeline } from "@/components/shared/project-timeline";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          label="03 · Work"
          title="Things I've built"
          description="Everything I've shipped — hover for a glimpse, click to open the live site or repo."
        />
        <div className="mt-14">
          <ProjectTimeline projects={projects} />
        </div>
      </div>
    </section>
  );
}

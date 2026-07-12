import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProcessTimeline } from "@/components/process-timeline";

export const metadata: Metadata = {
  title: "Process — Krishn Gohel",
  description: "From audit to long-term maintenance — how we build.",
};

export default function ProcessPage() {
  return (
    <section className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          label="Process"
          title="How we build"
          description="A clear, proven path from first conversation to ongoing partnership."
        />
        <ProcessTimeline />
      </div>
    </section>
  );
}

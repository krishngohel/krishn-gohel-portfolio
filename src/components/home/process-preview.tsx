"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { processSteps } from "@/data/process";

export function ProcessPreview() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            label="05 · Process"
            title="The process"
            description="A clear path from first call to long-term partnership."
          />
          <Link
            href="/process"
            data-cursor="pointer"
            className="group inline-flex items-center gap-2 text-[#2a241c]/70 transition-colors hover:text-[#c2571f]"
          >
            Full process
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-16">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex items-center gap-6 border-t border-[#2a241c]/12 py-8 md:gap-12"
            >
              <span className="font-display text-4xl font-bold text-[#2a241c]/20 transition-colors group-hover:text-[#c2571f] md:text-6xl">
                {step.number}
              </span>
              <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-12">
                <h3 className="font-display text-2xl font-bold md:w-64 md:text-3xl">
                  {step.title}
                </h3>
                <p className="flex-1 text-[#6f6557]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

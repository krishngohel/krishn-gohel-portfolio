"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { processSteps } from "@/data/process";

export function ProcessTimeline() {
  return (
    <>
      <div className="mt-16 flex flex-col">
        {processSteps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-6 md:gap-12"
          >
            <div className="flex flex-col items-center">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#c2571f]/30 bg-[#c2571f]/[0.06] font-display text-lg font-bold text-[#c2571f]">
                {step.number}
              </span>
              {i < processSteps.length - 1 && (
                <span className="my-2 w-px flex-1 bg-[#2a241c]/10" />
              )}
            </div>
            <div className="flex-1 pb-12">
              <div className="rounded-2xl border border-[#2a241c]/12 bg-[#fffdf8] p-8">
                <h3 className="font-display text-2xl font-bold md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-[#6f6557]">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-8 overflow-hidden rounded-3xl border border-[#2a241c]/12 p-10 text-center md:p-16"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(194,87,31,0.18) 0%, transparent 60%)",
          }}
        />
        <h3 className="relative font-display text-3xl font-bold md:text-5xl">
          Ready to start the process?
        </h3>
        <p className="relative mx-auto mt-4 max-w-md text-[#6f6557]">
          Book a call and we&apos;ll map out the first steps together.
        </p>
        <div className="relative mt-8 flex justify-center">
          <MagneticButton>
            <Button asChild variant="accent" size="lg">
              <Link href="/contact">Book a call</Link>
            </Button>
          </MagneticButton>
        </div>
      </motion.div>
    </>
  );
}

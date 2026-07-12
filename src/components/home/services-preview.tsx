"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { servicePreviews } from "@/data/services";

export function ServicesPreview() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            label="04 · Services"
            title="What I do"
            description="Four disciplines, one obsessive standard."
          />
          <Link
            href="/services"
            data-cursor="pointer"
            className="group inline-flex items-center gap-2 text-[#2a241c]/70 transition-colors hover:text-[#c2571f]"
          >
            All services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#2a241c]/12 bg-[#2a241c]/10 sm:grid-cols-2">
          {servicePreviews.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col gap-4 bg-[#fffdf8] p-8 transition-colors hover:bg-[#fffdf8] md:p-12"
            >
              <span className="font-display text-sm font-bold text-[#c2571f]">
                {service.number}
              </span>
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                {service.title}
              </h3>
              <p className="text-[#6f6557]">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

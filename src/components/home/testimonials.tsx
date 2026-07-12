"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          label="Kind words"
          title="What clients say"
          align="center"
          className="mx-auto"
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between gap-8 rounded-2xl border border-[#2a241c]/12 bg-[#fffdf8] p-8"
            >
              <Quote className="h-8 w-8 text-[#c2571f]" />
              <blockquote className="text-lg leading-relaxed text-[#2a241c]/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="border-t border-[#2a241c]/12 pt-5">
                <span className="block font-medium text-foreground">
                  {t.author}
                </span>
                <span className="text-sm text-[#6f6557]">{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

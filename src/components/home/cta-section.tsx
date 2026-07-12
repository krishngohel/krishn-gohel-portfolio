"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[#2a241c]/12 bg-[#fffdf8] px-8 py-20 text-center shadow-[0_14px_40px_rgba(90,70,40,0.10)] md:px-16 md:py-28"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-30"
            style={{ background: "radial-gradient(circle at center, rgba(194,87,31,0.22) 0%, transparent 66%)" }}
          />
          <h2 className="relative mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.02] md:text-6xl lg:text-7xl">
            Let&apos;s build something <span className="text-[#c2571f]">great</span>
          </h2>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton>
              <Button asChild variant="accent" size="lg">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild variant="outline" size="lg">
                <a href="https://github.com/krishngohel" target="_blank" rel="noopener">
                  See my GitHub
                </a>
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

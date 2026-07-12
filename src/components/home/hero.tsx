"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { AnimatedText } from "@/components/shared/animated-text";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "50+", label: "Client projects" },
  { value: "UTSA", label: "CS · grad May 2026" },
  { value: "6+", label: "AI & full-stack apps" },
];

const socials = [
  { href: "https://github.com/krishngohel", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/krishngohel", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:gohel.krishn@gmail.com", label: "Email", icon: Mail },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 opacity-40"
        style={{ background: "radial-gradient(circle at center, rgba(194,87,31,0.12) 0%, transparent 62%)" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-100px] top-[80px] h-[400px] w-[400px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "rgba(138,99,210,0.35)" }}
        animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 block text-xs uppercase tracking-[0.3em] text-[#1f8a7c]"
        >
          Portfolio — Krishn Gohel
        </motion.span>

        <h1 className="font-display font-bold leading-[0.95]" style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}>
          <AnimatedText
            lines={[
              { text: "I build things", className: "text-[#2a241c]" },
              { text: "that actually", className: "text-[#2a241c]/40" },
              { text: "ship.", className: "text-[#c2571f]" },
            ]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-8 max-w-xl text-base text-[#6f6557] md:text-lg"
        >
          Computer Science @ UTSA, founder of <strong className="font-semibold text-[#2a241c]">Webloom</strong>,
          and a full-stack &amp; AI engineer. I build privacy-first AI platforms, ML classifiers, and SaaS
          products — and I ship them end to end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <Button asChild variant="accent" size="lg">
              <Link href="/work">View my work</Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </MagneticButton>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <MagneticButton key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  data-cursor="pointer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2a241c]/15 bg-[#fffdf8] text-[#2a241c] transition-colors hover:border-[#c2571f] hover:text-[#c2571f]"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              </MagneticButton>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-16 flex flex-wrap gap-10 border-t border-[#2a241c]/12 pt-8 md:gap-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display text-3xl font-bold text-[#2a241c] md:text-4xl">{stat.value}</span>
              <span className="mt-1 text-sm text-[#6f6557]">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

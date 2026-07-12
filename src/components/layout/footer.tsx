"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/shared/magnetic-button";

const footerLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#2a241c]/12 bg-[#fffdf8]">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col justify-between gap-16 lg:flex-row">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl"
            >
              Let&apos;s <span className="text-[#c2571f]">talk.</span>
            </motion.h2>
            <p className="mt-6 max-w-md text-[#6f6557]">
              Building something, hiring, or just want to compare notes? My inbox is open.
            </p>
            <div className="mt-8">
              <MagneticButton>
                <Link
                  href="/contact"
                  data-cursor="pointer"
                  className="inline-flex items-center gap-3 rounded-full bg-[#c2571f] px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                >
                  Get in touch
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-20 lg:gap-24">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#2a241c]/35">Menu</span>
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} data-cursor="pointer" className="text-[#6f6557] transition-colors hover:text-[#2a241c]">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#2a241c]/35">Connect</span>
              <a href="mailto:gohel.krishn@gmail.com" data-cursor="pointer" className="text-[#6f6557] transition-colors hover:text-[#2a241c]">
                gohel.krishn@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/krishngohel" target="_blank" rel="noopener" data-cursor="pointer" className="text-[#6f6557] transition-colors hover:text-[#2a241c]">
                linkedin.com/in/krishngohel
              </a>
              <a href="https://github.com/krishngohel" target="_blank" rel="noopener" data-cursor="pointer" className="text-[#6f6557] transition-colors hover:text-[#2a241c]">
                github.com/krishngohel
              </a>
              <span className="text-[#2a241c]/45">San Antonio &amp; Dallas, TX</span>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-[#2a241c]/12 pt-8 text-sm text-[#2a241c]/35 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Krishn Gohel. All rights reserved.</span>
          <span>Building things that ship.</span>
        </div>
      </div>
    </footer>
  );
}

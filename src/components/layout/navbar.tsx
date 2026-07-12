"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#2a241c]/8 bg-[#fffdf8]/85 backdrop-blur-md">
        <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <Link href="/" className="flex flex-col leading-none" data-cursor="pointer">
            <span className="font-display text-xl font-bold tracking-tight">
              Krishn <span className="text-[#c2571f]">Gohel</span>
            </span>
            <span className="mt-1 hidden text-[10px] uppercase tracking-[0.25em] text-[#6f6557] sm:block">
              Full-stack &amp; AI engineer
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="pointer"
                className={`text-sm transition-colors hover:text-[#2a241c] ${
                  pathname === link.href ? "text-[#2a241c]" : "text-[#6f6557]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <MagneticButton>
              <Button asChild variant="outline" size="sm">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </MagneticButton>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-[#2a241c] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#fffdf8] px-6 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={link.href} className="block py-3 font-display text-4xl font-bold text-[#2a241c]">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <Button asChild size="lg" className="w-full">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

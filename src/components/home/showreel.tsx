"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const baseCards = [
  { label: "Build", from: "#fff6ec", to: "#fdeee0", bar: "#c2571f" },
  { label: "Ship", from: "#f1ecf9", to: "#e9e1f6", bar: "#8a63d2" },
  { label: "Learn", from: "#e7f3ef", to: "#dcefe8", bar: "#1f8a7c" },
  { label: "Iterate", from: "#fff6ec", to: "#fdeee0", bar: "#c2571f" },
  { label: "Scale", from: "#f1ecf9", to: "#e9e1f6", bar: "#8a63d2" },
  { label: "Repeat", from: "#e7f3ef", to: "#dcefe8", bar: "#1f8a7c" },
];

const cards = [...baseCards, ...baseCards];

export function Showreel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="overflow-hidden py-24 md:py-32">
      <motion.div style={{ x }} className="flex gap-6 px-6 md:px-10">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative flex h-[280px] w-[400px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#2a241c]/12 shadow-[0_10px_30px_rgba(90,70,40,0.08)] md:h-[360px] md:w-[520px]"
            style={{ background: `linear-gradient(135deg, ${card.from}, ${card.to})` }}
          >
            <span className="font-display text-5xl font-bold text-[#2a241c]/90 md:text-7xl">
              {card.label}
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 h-1 w-full origin-left"
              style={{ background: card.bar }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Users, GraduationCap } from "lucide-react";

const edges = [
  { icon: Rocket, color: "#c2571f", title: "Ships end-to-end", description: "Discovery to deployment to maintenance. I own the whole lifecycle, not just a slice of it." },
  { icon: ShieldCheck, color: "#1f8a7c", title: "Privacy-first AI", description: "Federated learning, differential privacy, on-prem deployments — AI that respects the data." },
  { icon: Users, color: "#8a63d2", title: "Client-tested", description: "50+ paid projects through Webloom. I translate business needs into things that actually work." },
  { icon: GraduationCap, color: "#c2571f", title: "Always learning", description: "From NLP ensembles to in-browser WASM compilers — I go deep on whatever the problem needs." },
];

export function AboutEdges() {
  return (
    <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#2a241c]/12 bg-[#2a241c]/10 sm:grid-cols-2">
      {edges.map((edge, i) => (
        <motion.div
          key={edge.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 bg-[#fffdf8] p-8 md:p-10"
        >
          <edge.icon className="h-7 w-7" style={{ color: edge.color }} />
          <h3 className="font-display text-xl font-bold md:text-2xl">{edge.title}</h3>
          <p className="text-[#6f6557]">{edge.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

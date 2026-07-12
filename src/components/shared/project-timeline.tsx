"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import { ProjectPreview } from "./project-preview";
import type { Project, Accent } from "@/data/projects";

const accentHex: Record<Accent, string> = {
  orange: "#c2571f",
  purple: "#8a63d2",
  teal: "#1f8a7c",
};

export function ProjectTimeline({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="relative">
      <div className="relative max-w-3xl">
        {/* gradient spine */}
        <span className="absolute bottom-3 left-[15px] top-3 w-[3px] rounded-full bg-gradient-to-b from-[#c2571f] via-[#8a63d2] to-[#1f8a7c] md:left-[19px]" />

        <div className="flex flex-col gap-5">
          {projects.map((p, i) => {
            const hex = accentHex[p.accent];
            const url = p.liveUrl ?? p.repoUrl;
            const Inner = (
              <>
                <span className="absolute inset-x-0 top-0 h-1" style={{ background: hex }} />
                <span className="text-[10.5px] font-bold uppercase tracking-[0.16em]" style={{ color: hex }}>
                  {p.tag}
                </span>
                <h3 className="mt-1 flex items-center gap-2 font-display text-2xl font-bold text-[#2a241c] transition-colors group-hover:text-[#c2571f]">
                  {p.name}
                  {url && (
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  )}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#1f8a7c]/20 bg-[#1f8a7c]/[0.07] px-2.5 py-1 text-[10.5px] tracking-wide text-[#1f8a7c]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="mt-4 flex flex-col gap-2">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="relative pl-5 text-sm leading-relaxed text-[#6f6557]">
                      <span className="absolute left-0 text-[#c2571f]">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: url ? hex : "#9a8f7d" }}>
                  {url ? <Github className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
                  {p.liveUrl ? "View live ↗" : url ? "View on GitHub ↗" : "Private / coursework"}
                </span>
              </>
            );

            const cardClass =
              "group relative block overflow-hidden rounded-2xl border border-[#2a241c]/12 bg-[#fffdf8] p-6 shadow-[0_8px_24px_rgba(90,70,40,0.08)] transition-[transform,box-shadow] duration-300";

            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: 26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.42, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12 md:pl-16"
                onMouseEnter={() => setActive(p)}
                onMouseLeave={() => setActive(null)}
              >
                {/* node dot */}
                <span className="absolute left-[8px] top-7 flex h-4 w-4 items-center justify-center md:left-[12px]">
                  <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full opacity-50" style={{ background: hex }} />
                  <span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: hex }} />
                </span>

                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener"
                    data-cursor="pointer"
                    className={`${cardClass} hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(90,70,40,0.16)]`}
                  >
                    {Inner}
                  </a>
                ) : (
                  <div className={cardClass}>{Inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      <ProjectPreview project={active} />
    </div>
  );
}

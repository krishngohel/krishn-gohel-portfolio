"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { AnimatedPreview } from "./animated-preview";

function hostname(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "") + u.pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
}

export function ProjectPreview({ project }: { project: Project | null }) {
  const target = project ? project.liveUrl ?? project.repoUrl : undefined;
  const bar = project?.liveUrl
    ? hostname(project.liveUrl)
    : target
      ? hostname(target)
      : project
        ? project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        : "";

  return (
    <div className="pointer-events-none fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <AnimatePresence mode="wait">
        {project && (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, scale: 0.92, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <div className="overflow-hidden rounded-xl border border-[#2a241c]/12 bg-[#fffdf8] shadow-[0_24px_60px_rgba(90,70,40,0.28)]">
              <div className="flex items-center gap-3 border-b border-[#2a241c]/10 bg-[#f6efe2] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-[11px] text-[#6f6557]">
                  {bar}
                </div>
              </div>
              <div className="relative overflow-hidden bg-white" style={{ width: 520, height: 325 }}>
                {project.liveUrl ? (
                  <iframe
                    src={project.liveUrl}
                    title={project.name}
                    className="absolute left-0 top-0 origin-top-left border-0"
                    style={{ width: 1440, height: 900, transform: "scale(0.361)", pointerEvents: "none" }}
                    loading="lazy"
                    scrolling="no"
                  />
                ) : (
                  <AnimatedPreview project={project} />
                )}
              </div>
            </div>
            <p className="text-center text-[11px] uppercase tracking-[0.2em] text-[#6f6557]">
              {project.liveUrl
                ? "Live preview — click to open"
                : project.repoUrl
                  ? "Preview — click to open repo"
                  : "Preview"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

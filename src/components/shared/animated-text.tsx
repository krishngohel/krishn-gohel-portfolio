"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  lines: { text: string; className?: string }[];
  className?: string;
  delay?: number;
}

export function AnimatedText({ lines, className, delay = 0 }: AnimatedTextProps) {
  return (
    <span className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block", line.className)}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

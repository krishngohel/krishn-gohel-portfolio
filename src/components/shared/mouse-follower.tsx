"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseFollower() {
  const [enabled, setEnabled] = useState(false);
  const [pointer, setPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const el = e.target as HTMLElement;
      const interactive = el.closest(
        "a, button, input, textarea, [data-cursor='pointer']"
      );
      setPointer(!!interactive);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ x, y }}
    >
      <motion.div
        className="rounded-full bg-white"
        style={{ mixBlendMode: "difference", translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: pointer ? 12 : 32,
          height: pointer ? 12 : 32,
          scale: pointer ? 2.2 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
      />
    </motion.div>
  );
}

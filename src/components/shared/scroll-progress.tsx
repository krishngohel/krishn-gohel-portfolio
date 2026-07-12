"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setPct(Math.max(0, Math.min(1, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div
        className="fixed left-0 top-0 z-[1000] h-1 rounded-r-full"
        style={{
          width: `${pct * 100}%`,
          background: "linear-gradient(90deg,#c2571f,#8a63d2,#1f8a7c)",
          boxShadow: "0 0 12px rgba(194,87,31,.4)",
        }}
      />
      <span className="fixed right-3 top-2.5 z-[1000] text-[11px] tracking-[0.12em] text-[#6f6557] tabular-nums">
        {Math.round(pct * 100)}%
      </span>
    </>
  );
}

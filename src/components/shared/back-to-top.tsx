"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () =>
      setShow(document.documentElement.scrollTop > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-cursor="pointer"
      className={`fixed bottom-6 right-6 z-[950] flex h-12 w-12 items-center justify-center rounded-full border border-[#2a241c]/12 bg-[#fffdf8] shadow-[0_8px_24px_rgba(90,70,40,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c2571f] hover:shadow-[0_14px_30px_rgba(194,87,31,0.25)] ${
        show ? "visible opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5 text-[#c2571f]" />
    </button>
  );
}

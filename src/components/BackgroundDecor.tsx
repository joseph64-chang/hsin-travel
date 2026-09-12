"use client";

import { useEffect, useRef } from "react";

const SPEEDS = [0.08, 0.14, 0.05];

export default function BackgroundDecor() {
  const blobRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    function apply() {
      const y = window.scrollY;
      blobRefs.current.forEach((el, i) => {
        if (el) el.style.translate = `0px ${(y * SPEEDS[i]).toFixed(1)}px`;
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        ref={(el) => {
          blobRefs.current[0] = el;
        }}
        className="animate-blob absolute -left-24 -top-24 h-96 w-96 rounded-full bg-sky-400/40 blur-3xl dark:bg-sky-500/20"
        style={{ animationDelay: "0s" }}
      />
      <div
        ref={(el) => {
          blobRefs.current[1] = el;
        }}
        className="animate-blob absolute right-[-6rem] top-1/4 h-[26rem] w-[26rem] rounded-full bg-teal-300/40 blur-3xl dark:bg-teal-400/15"
        style={{ animationDelay: "4s" }}
      />
      <div
        ref={(el) => {
          blobRefs.current[2] = el;
        }}
        className="animate-blob absolute bottom-[-8rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-400/10"
        style={{ animationDelay: "8s" }}
      />
    </div>
  );
}

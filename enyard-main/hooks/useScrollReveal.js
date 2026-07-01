"use client";

import { useEffect } from "react";

/**
 * useScrollReveal — mounts an IntersectionObserver that adds .visible
 * to every .reveal, .reveal-left, .reveal-right, .reveal-scale element
 * as it enters the viewport.
 */
export default function useScrollReveal(threshold = 0.12) {
  useEffect(() => {
    const selectors = ".reveal, .reveal-left, .reveal-right, .reveal-scale";
    const elements = document.querySelectorAll(selectors);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);         // fire once
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
}

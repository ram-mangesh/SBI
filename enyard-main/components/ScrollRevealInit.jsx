"use client";

import useScrollReveal from "@/hooks/useScrollReveal";

/**
 * Mounts the scroll-reveal IntersectionObserver globally.
 * Placed once in layout so all page sections are covered.
 */
export default function ScrollRevealInit() {
  useScrollReveal();
  return null;
}

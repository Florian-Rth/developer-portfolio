import { useIsMobile } from "@hooks/useIsMobile";
import { useCallback, useEffect, useRef } from "react";

const REDUCED_MOTION =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Attaches a mouse-tracking radial gradient spotlight to a grid wrapper.
 * Sets CSS custom properties --sx / --sy (as %) and --spotlight-active (0/1)
 * directly on the DOM element so no React re-renders are triggered.
 */
export const useSectionSpotlight = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  const clearSpotlight = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    el.style.setProperty("--spotlight-active", "0");
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || isMobile || REDUCED_MOTION) return;

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--sx", `${x.toFixed(1)}%`);
        el.style.setProperty("--sy", `${y.toFixed(1)}%`);
        el.style.setProperty("--spotlight-active", "1");
      });
    };

    const handleLeave = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      clearSpotlight();
    };

    el.addEventListener("mousemove", handleMove as EventListener);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove as EventListener);
      el.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, clearSpotlight]);

  return { gridRef };
};

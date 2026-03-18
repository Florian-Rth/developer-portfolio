import { useIsMobile } from "@hooks/useIsMobile";
import { useCallback, useEffect, useRef } from "react";

const REDUCED_MOTION =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type TiltStyle = {
  transform: string;
  transition: string;
};

type UseCardTiltResult = {
  cardRef: React.RefObject<HTMLElement | null>;
  tiltStyle: TiltStyle;
  resetTilt: () => void;
};

const INITIAL_STYLE: TiltStyle = {
  transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
  transition: "transform 0.1s ease",
};

const RESET_STYLE: TiltStyle = {
  transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
  transition: "transform 0.4s ease",
};

const MAX_DEGREES = 3;

export const useCardTilt = (): UseCardTiltResult => {
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLElement | null>(null);
  const styleRef = useRef<TiltStyle>(INITIAL_STYLE);
  const rafRef = useRef<number | null>(null);

  // Store a setter so we can force re-render — we track via DOM directly to avoid re-render per frame
  const applyStyle = useCallback((style: TiltStyle) => {
    const el = cardRef.current;
    if (!el) return;
    (el as HTMLElement).style.transform = style.transform;
    (el as HTMLElement).style.transition = style.transition;
    styleRef.current = style;
  }, []);

  const resetTilt = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    applyStyle(RESET_STYLE);
  }, [applyStyle]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || isMobile || REDUCED_MOTION) return;

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rotateY = dx * MAX_DEGREES;
        const rotateX = -dy * MAX_DEGREES;
        applyStyle({
          transform: `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.015)`,
          transition: "transform 0.1s ease",
        });
      });
    };

    const handleLeave = () => resetTilt();

    el.addEventListener("mousemove", handleMove as EventListener);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove as EventListener);
      el.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, applyStyle, resetTilt]);

  return { cardRef, tiltStyle: styleRef.current, resetTilt };
};

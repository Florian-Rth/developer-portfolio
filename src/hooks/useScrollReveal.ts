import { useEffect, useRef, useState } from "react";

type UseScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
};

type UseScrollRevealReturn = {
  ref: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  style: React.CSSProperties;
};

export const useScrollReveal = (options: UseScrollRevealOptions = {}): UseScrollRevealReturn => {
  const {
    threshold = 0.2,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  const style: React.CSSProperties = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return { ref, isVisible, style };
};

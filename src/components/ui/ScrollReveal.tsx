import { useScrollReveal } from "@hooks/useScrollReveal";
import { cn } from "@lib/utils";
import type React from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  /** Use display: contents to pass through grid positioning to children */
  asContents?: boolean;
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  threshold,
  rootMargin,
  triggerOnce,
  className,
  asContents = false,
}) => {
  const { ref, isVisible, style } = useScrollReveal({
    delay,
    threshold,
    rootMargin,
    triggerOnce,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("scroll-reveal", isVisible && "visible", asContents && "contents", className)}
      style={asContents ? undefined : style}
    >
      {children}
    </div>
  );
};

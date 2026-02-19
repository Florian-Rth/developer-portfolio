import { useScrollReveal } from "@hooks/useScrollReveal";
import { cn } from "@lib/utils";
import type React from "react";

type ArrowDirection = "up" | "down" | "left" | "right";

type AnnotationProps = {
  text: string;
  rotation?: number;
  arrowDirection?: ArrowDirection;
  className?: string;
  animationDelay?: number;
};

const ArrowUp: React.FC = () => (
  <svg
    width="30"
    height="40"
    viewBox="0 0 30 40"
    fill="none"
    aria-hidden="true"
    className="absolute -top-10 left-1/2 -translate-x-1/2"
  >
    <path
      d="M15 38 C12 30, 8 20, 15 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M10 12 L15 4 L20 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const ArrowDown: React.FC = () => (
  <svg
    width="30"
    height="40"
    viewBox="0 0 30 40"
    fill="none"
    aria-hidden="true"
    className="absolute -bottom-10 left-1/2 -translate-x-1/2"
  >
    <path
      d="M15 2 C18 10, 22 20, 15 35"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M10 28 L15 36 L20 28"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const ArrowLeft: React.FC = () => (
  <svg
    width="40"
    height="30"
    viewBox="0 0 40 30"
    fill="none"
    aria-hidden="true"
    className="absolute top-1/2 -translate-y-1/2 -left-11"
  >
    <path
      d="M38 15 C30 12, 20 8, 5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M12 10 L4 15 L12 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const ArrowRight: React.FC = () => (
  <svg
    width="40"
    height="30"
    viewBox="0 0 40 30"
    fill="none"
    aria-hidden="true"
    className="absolute top-1/2 -translate-y-1/2 -right-11"
  >
    <path
      d="M2 15 C10 18, 20 22, 35 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M28 10 L36 15 L28 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const arrowComponents: Record<ArrowDirection, React.FC> = {
  up: ArrowUp,
  down: ArrowDown,
  left: ArrowLeft,
  right: ArrowRight,
};

export const Annotation: React.FC<AnnotationProps> = ({
  text,
  rotation = 0,
  arrowDirection = "up",
  className,
  animationDelay = 0,
}) => {
  const Arrow = arrowComponents[arrowDirection];
  const { ref, isVisible, style } = useScrollReveal({ delay: animationDelay });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      aria-hidden="true"
      className={cn(
        "absolute pointer-events-none z-10 text-accent dark:text-accent-hover",
        "scroll-reveal",
        isVisible && "visible",
        className,
      )}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
    >
      <span className="relative font-script text-sm lg:text-base whitespace-nowrap">
        {text}
        <Arrow />
      </span>
    </div>
  );
};

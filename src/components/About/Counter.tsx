import { cn } from "@lib/utils";
import { useEffect, useRef, useState } from "react";
import type React from "react";

type CounterProps = {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
};

export const Counter: React.FC<CounterProps> = ({
  value,
  suffix = "+",
  label,
  className,
  duration = 1500,
}) => {
  const [count, setCount] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - (1 - progress) ** 3;
            const currentCount = Math.floor(easeOut * value);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
              setTimeout(() => setShowSuffix(true), 50);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <div
      ref={containerRef}
      data-testid="counter"
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "px-6 py-4",
        "border-2 border-muted rounded-[50%]",
        "w-[160px] h-[100px]",
        className,
      )}
    >
      <div className="flex items-baseline gap-0.5">
        <span
          className={cn(
            "font-dm-sans font-extrabold text-text",
            "text-[48px] md:text-[64px]",
            "leading-none",
          )}
        >
          {count}
        </span>
        <span
          className={cn(
            "font-dm-sans font-extrabold text-text",
            "text-[48px] md:text-[64px]",
            "leading-none",
            "transition-opacity duration-200",
            showSuffix ? "opacity-100" : "opacity-0",
          )}
        >
          {suffix}
        </span>
      </div>
      <span
        className={cn(
          "font-dm-sans font-medium text-text-secondary",
          "text-sm uppercase tracking-[1.5px]",
          "mt-1",
        )}
      >
        {label}
      </span>
    </div>
  );
};

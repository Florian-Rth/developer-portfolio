import { cn } from "@lib/utils";
import type React from "react";

type CarouselDotsProps = {
  total: number;
  activeIndex: number;
  className?: string;
};

export const CarouselDots: React.FC<CarouselDotsProps> = ({ total, activeIndex, className }) => {
  const dots = Array.from({ length: total }, (_, i) => i);

  return (
    <div className={cn("flex justify-center mt-6", className)}>
      <svg width={total * 24} height="20" viewBox={`0 0 ${total * 24} 20`} aria-hidden="true">
        {dots.map((i) => {
          const isActive = i === activeIndex;
          const cx = i * 24 + 10;
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy="10"
                r={isActive ? 7 : 5}
                fill={isActive ? "var(--accent, #D4929B)" : "var(--muted, #E8DDD0)"}
                style={{
                  transition: "fill 0.3s ease, r 0.3s ease",
                  transform: isActive ? "scale(1.3)" : "scale(1)",
                  transformOrigin: `${cx}px 10px`,
                }}
              />
              {/* Satellite dots for active brush-tupfen effect */}
              {isActive && (
                <>
                  <circle cx={cx - 8} cy="5" r="1.5" fill="var(--accent, #D4929B)" opacity="0.6" />
                  <circle cx={cx + 7} cy="7" r="1" fill="var(--accent, #D4929B)" opacity="0.4" />
                  <circle cx={cx + 5} cy="15" r="1.2" fill="var(--accent, #D4929B)" opacity="0.5" />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

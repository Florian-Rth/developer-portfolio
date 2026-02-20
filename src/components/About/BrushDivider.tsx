import { cn } from "@lib/utils";
import type React from "react";

type BrushDividerProps = {
  className?: string;
};

export const BrushDivider: React.FC<BrushDividerProps> = ({ className }) => {
  return (
    <div
      data-testid="brush-divider"
      className={cn("w-full mt-10 lg:mt-20 col-span-full", className)}
    >
      <svg
        aria-hidden="true"
        width="100%"
        height="70"
        viewBox="0 0 1200 70"
        fill="none"
        preserveAspectRatio="none"
        className="opacity-80 dark:opacity-60"
      >
        <defs>
          <linearGradient id="brushDividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8B4A0" />
            <stop offset="50%" stopColor="#D4929B" />
            <stop offset="100%" stopColor="#B8A9D4" />
          </linearGradient>
        </defs>
        {/* Organic wave with variable stroke width - thin at edges, expressive in middle */}
        <path
          d="M0 45
             C50 42, 100 38, 150 35
             C200 32, 250 28, 300 25
             C350 22, 400 18, 450 20
             C500 22, 550 30, 600 35
             C650 40, 700 45, 750 42
             C800 39, 850 32, 900 28
             C950 24, 1000 22, 1050 25
             C1100 28, 1150 32, 1200 35"
          fill="none"
          stroke="url(#brushDividerGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Second wave layer for more organic feel - offset and thicker in middle */}
        <path
          d="M0 38
             C80 35, 160 32, 240 28
             C320 24, 400 20, 480 22
             C560 24, 640 32, 720 38
             C800 44, 880 48, 960 44
             C1040 40, 1120 36, 1200 32"
          fill="none"
          stroke="url(#brushDividerGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Third wave - central expressive stroke */}
        <path
          d="M100 42
             C200 38, 300 30, 400 25
             C500 20, 600 28, 700 35
             C800 42, 900 38, 1000 32
             C1050 28, 1100 30, 1100 32"
          fill="none"
          stroke="url(#brushDividerGradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

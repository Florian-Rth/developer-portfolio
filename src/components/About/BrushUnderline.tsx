import { cn } from "@lib/utils";
import type React from "react";

type BrushUnderlineProps = {
  className?: string;
};

export const BrushUnderline: React.FC<BrushUnderlineProps> = ({ className }) => {
  return (
    <div className={cn("flex justify-center w-full", className)}>
      <svg
        aria-hidden="true"
        width="60%"
        height="12"
        viewBox="0 0 200 12"
        fill="none"
        preserveAspectRatio="none"
        className="opacity-70"
      >
        <defs>
          <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8B4A0" />
            <stop offset="50%" stopColor="#D4929B" />
            <stop offset="100%" stopColor="#B8A9D4" />
          </linearGradient>
        </defs>
        <path
          d="M0 6 C20 2, 40 10, 60 5 C80 0, 100 8, 120 4 C140 0, 160 9, 180 5 C190 3, 195 6, 200 6"
          fill="none"
          stroke="url(#brushGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

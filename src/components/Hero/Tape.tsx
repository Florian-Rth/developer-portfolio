import type React from "react";

type TapeProps = {
  className?: string;
};

export const Tape: React.FC<TapeProps> = ({ className = "" }) => {
  return (
    <div
      data-testid="hero-tape"
      aria-hidden="true"
      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 ${className}`}
    >
      <svg
        viewBox="0 0 96 24"
        className="w-full h-full"
        preserveAspectRatio="none"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tapeGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#E8B4A0" />
            <stop offset="50%" stopColor="#D4929B" />
            <stop offset="100%" stopColor="#B8A9D4" />
          </linearGradient>
        </defs>
        <path
          d="M2,8 Q8,4 16,6 Q32,10 48,8 Q64,6 80,10 Q88,12 94,8 L94,16 Q88,20 80,14 Q64,10 48,16 Q32,18 16,14 Q8,12 2,16 Z"
          fill="url(#tapeGradient)"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};

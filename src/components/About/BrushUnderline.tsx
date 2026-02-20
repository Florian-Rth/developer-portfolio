import { cn } from "@lib/utils";
import { useEffect, useRef, useState } from "react";
import type React from "react";

type BrushUnderlineProps = {
  className?: string;
};

// Center path that follows the middle of the brush shape
const CENTER_PATH =
  "M8 8 C120 2, 280 0, 378 7 C386 8, 388 11, 382 14 C340 17, 200 21, 150 22 C126 23, 120 26, 126 29 C140 33, 200 34, 244 32 C258 31, 262 35, 254 38 C244 41, 220 40, 210 39 C202 39, 198 42, 196 47";

// Filled brush shape path
const BRUSH_SHAPE = [
  "M8 8",
  "C10 5, 14 3, 22 3",
  "C120 0, 280 -2, 370 3",
  "C386 4, 392 7, 387 10",
  "C380 13, 366 15, 340 16",
  "C280 18, 200 20, 150 21",
  "C132 22, 119 24, 124 27",
  "C130 30, 144 32, 164 32",
  "C200 33, 228 32, 244 31",
  "C256 30, 261 33, 255 36",
  "C249 39, 237 40, 224 39",
  "C210 38, 201 39, 197 44",
  "C195 47, 194 47, 195 48",
  "C196 49, 198 48, 199 46",
  "C203 41, 211 40, 225 41",
  "C238 42, 250 41, 257 38",
  "C263 35, 258 32, 245 33",
  "C229 34, 201 35, 165 35",
  "C145 35, 131 33, 125 30",
  "C117 26, 131 24, 151 23",
  "C201 22, 281 20, 341 18",
  "C367 17, 381 15, 389 12",
  "C394 9, 388 5, 372 4",
  "C282 -1, 120 3, 14 11",
  "C10 12, 6 11, 8 8",
  "Z",
].join(" ");

export const BrushUnderline: React.FC<BrushUnderlineProps> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("flex justify-center w-full", className)}>
      <svg
        ref={svgRef}
        aria-hidden="true"
        width="90%"
        height="80"
        viewBox="0 0 400 58"
        fill="none"
        className="opacity-80"
      >
        <defs>
          <linearGradient id="brushUnderlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8B4A0" />
            <stop offset="50%" stopColor="#D4929B" />
            <stop offset="100%" stopColor="#B8A9D4" />
          </linearGradient>
          {/* Mask: animated stroke that reveals the shape */}
          <mask id="brushDrawMask">
            <path
              d={CENTER_PATH}
              fill="none"
              stroke="white"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1200"
              strokeDashoffset={isVisible ? "0" : "1200"}
              style={{
                transition: "stroke-dashoffset 1.2s ease-in-out",
              }}
            />
          </mask>
        </defs>
        {/* Filled brush shape revealed by the animated mask */}
        <path d={BRUSH_SHAPE} fill="url(#brushUnderlineGradient)" opacity="0.85" mask="url(#brushDrawMask)" />
      </svg>
    </div>
  );
};

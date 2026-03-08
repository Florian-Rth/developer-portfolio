import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import type React from "react";

type PackRipProps = {
  isOpen: boolean;
  glowing?: boolean;
  className?: string;
};

// Straight line across top of pack
const CLOSED_PATH = "M0,0 L26,0 L52,0 L78,0 L104,0 L130,0 L156,0 L182,0 L208,0 L234,0 L260,0";

// Jagged tear line
const OPEN_PATH = "M0,0 L26,-8 L52,4 L78,-12 L104,6 L130,-10 L156,8 L182,-6 L208,10 L234,-4 L260,0";

export const PackRip: React.FC<PackRipProps> = ({ isOpen, glowing = false, className }) => {
  return (
    <div
      className={cn("absolute top-0 left-0 w-full", className)}
      style={{ height: 40, zIndex: 20 }}
    >
      <svg
        viewBox="0 -15 260 40"
        className="w-full h-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Pack tear"
      >
        {/* Glow behind the rip */}
        {isOpen && (
          <motion.path
            d={OPEN_PATH}
            fill="none"
            stroke="rgba(244,208,63,0.6)"
            strokeWidth={glowing ? 12 : 6}
            initial={{ opacity: 0 }}
            animate={{ opacity: glowing ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
            style={{ filter: "blur(6px)" }}
          />
        )}

        {/* Main rip path */}
        <motion.path
          d={isOpen ? OPEN_PATH : CLOSED_PATH}
          fill="none"
          stroke={isOpen ? "rgba(255,253,249,0.9)" : "transparent"}
          strokeWidth={2}
          strokeLinecap="round"
          initial={false}
          animate={{ d: isOpen ? OPEN_PATH : CLOSED_PATH }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Inner glow when open */}
        {isOpen && (
          <motion.rect
            x={0}
            y={0}
            width={260}
            height={25}
            fill="url(#ripGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        )}

        <defs>
          <linearGradient id="ripGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(244,208,63,0.4)" />
            <stop offset="100%" stopColor="rgba(244,208,63,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

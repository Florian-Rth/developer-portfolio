import type { GradientColors } from "@/data/projects";
import { cn } from "@lib/utils";
import type React from "react";

type MeshGradientProps = {
  colors: GradientColors;
  /** Stagger duration in seconds (e.g. 0, 2, 4…) */
  animationDelay?: number;
  /** Total animation duration in seconds (default 12) */
  animationDuration?: number;
  className?: string;
};

const toRgba = (hex: string, alpha: number): string => {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const MeshGradient: React.FC<MeshGradientProps> = ({
  colors,
  animationDelay = 0,
  animationDuration = 12,
  className,
}) => {
  const { primary, secondary, accent } = colors;

  const gradient = [
    `radial-gradient(ellipse 80% 80% at 20% 20%, ${toRgba(primary, 0.7)} 0%, transparent 60%)`,
    `radial-gradient(ellipse 70% 70% at 80% 80%, ${toRgba(secondary, 0.65)} 0%, transparent 55%)`,
    `radial-gradient(ellipse 60% 60% at 50% 10%, ${toRgba(accent, 0.55)} 0%, transparent 50%)`,
  ].join(", ");

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)} aria-hidden="true">
      {/* Mesh gradient layers */}
      <div
        className="absolute inset-0"
        style={{
          background: gradient,
          backgroundSize: "200% 200%, 200% 200%, 200% 200%",
          animation: `meshFloat ${animationDuration}s ease-in-out infinite`,
          animationDelay: `${animationDelay}s`,
        }}
      />
      {/* Base colour fill */}
      <div className="absolute inset-0 -z-10" style={{ background: toRgba(primary, 0.08) }} />
      {/* Noise / grain overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18] dark:opacity-[0.24] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={`noise-${primary.slice(1)}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${primary.slice(1)})`} />
      </svg>
    </div>
  );
};

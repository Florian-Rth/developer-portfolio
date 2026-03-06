/**
 * SparkleField — scattered 4-pointed stars that flare near the cursor.
 *
 * 36 deterministic sparkle stars sit across the card. Stars close to the
 * mouse glow brighter; stars far away stay dim. A soft iridescent wash
 * underneath ensures the card looks special even without hovering.
 */
import type React from "react";
import { useMemo } from "react";
import { useShimmerCtx } from "./SkillCardShimmerContext";
import type { ShimmerProps } from "./types";

const MAX_OPACITY: Record<NonNullable<ShimmerProps["intensity"]>, number> = {
  low: 0.45,
  medium: 0.75,
  max: 0.95,
};

// Seeded pseudo-random for deterministic positions
function seeded(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

const STAR_COUNT = 36;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  x: seeded(i * 2.7 + 1) * 86 + 7,
  y: seeded(i * 1.9 + 3) * 86 + 7,
  // Outer radius 0.8–2.2, inner ratio fixed at 0.3 (sharp 4-pt star)
  r: seeded(i * 3.1 + 5) * 1.4 + 0.8,
  // Random rotation 0–90° (4-pt star repeats every 90°)
  rot: seeded(i * 5.3 + 7) * 90,
}));

/** Returns the SVG path for a 4-pointed star centred at (cx, cy). */
function starPath(cx: number, cy: number, outer: number, rot: number): string {
  const inner = outer * 0.28;
  const pts: [number, number][] = [];
  for (let k = 0; k < 8; k++) {
    const angle = (Math.PI / 4) * k + (rot * Math.PI) / 180;
    const r = k % 2 === 0 ? outer : inner;
    pts.push([cx + r * Math.cos(angle - Math.PI / 2), cy + r * Math.sin(angle - Math.PI / 2)]);
  }
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ") + " Z";
}

export const SparkleField: React.FC<ShimmerProps> = ({ intensity = "medium" }) => {
  const { mouseX, mouseY, isHovered } = useShimmerCtx();
  const maxOp = MAX_OPACITY[intensity];
  const mx = mouseX * 100;
  const my = mouseY * 100;

  const opacities = useMemo(
    () =>
      STARS.map(({ x, y }) => {
        if (!isHovered) return 0.12 * maxOp;
        const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
        return Math.max(0.06, 1 - dist / 32) * maxOp;
      }),
    [mx, my, isHovered, maxOp],
  );

  return (
    <div
      className="absolute inset-0 rounded-[14px] pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Soft iridescent base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(184,169,212,0.14) 0%, rgba(232,180,160,0.10) 50%, rgba(168,196,184,0.14) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Star field */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {STARS.map((s, i) => (
          <path
            key={i}
            d={starPath(s.x, s.y, s.r, s.rot)}
            fill="white"
            opacity={opacities[i]}
            style={{ transition: "opacity 0.12s ease" }}
          />
        ))}
      </svg>
    </div>
  );
};

/**
 * SparkleField — scattered glitter dots that flare near the cursor.
 *
 * 28 deterministic sparkle points sit across the card. Points close to the
 * mouse glow brighter; points far away stay dim. A soft iridescent wash
 * underneath ensures the card looks special even without hovering.
 */
import type React from "react";
import { useMemo } from "react";
import { useShimmerCtx } from "./SkillCardShimmerContext";
import type { ShimmerProps } from "./types";

const MAX_OPACITY: Record<NonNullable<ShimmerProps["intensity"]>, number> = {
  low: 0.45,
  medium: 0.72,
  max: 0.95,
};

// Deterministic sparkle positions in 0–100 space (seeded by index)
function seeded(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

const SPARKLES = Array.from({ length: 28 }, (_, i) => ({
  x: seeded(i * 2.7 + 1) * 88 + 6,   // keep 6% from edges
  y: seeded(i * 1.9 + 3) * 88 + 6,
  r: seeded(i * 3.1 + 5) * 2 + 1,    // radius 1–3
}));

export const SparkleField: React.FC<ShimmerProps> = ({ intensity = "medium" }) => {
  const { mouseX, mouseY, isHovered } = useShimmerCtx();
  const maxOp = MAX_OPACITY[intensity];
  const mx = mouseX * 100;
  const my = mouseY * 100;

  // Compute per-sparkle glow: full brightness within ~28 units, falls off to 0
  const opacities = useMemo(
    () =>
      SPARKLES.map(({ x, y }) => {
        const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
        return isHovered
          ? Math.max(0.08, 1 - dist / 30) * maxOp
          : 0.15 * maxOp; // idle: uniform dim
      }),
    [mx, my, isHovered, maxOp],
  );

  return (
    <div
      className="absolute inset-0 rounded-[14px] pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Soft iridescent base so the card always looks a little special */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(184,169,212,0.14) 0%, rgba(232,180,160,0.10) 50%, rgba(168,196,184,0.14) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Sparkle dots */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {SPARKLES.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="white"
            opacity={opacities[i]}
            style={{ transition: "opacity 0.1s ease" }}
          />
        ))}
      </svg>
    </div>
  );
};

import type React from "react";

// Desktop offsets — cards can fan out wide
const GHOST_CONFIGS_DEFAULT = [
  { rotate: 19,  tx:  66, ty: 24, scale: 0.91, opacity: 0.70 },
  { rotate: -18, tx: -64, ty: 18, scale: 0.93, opacity: 0.80 },
] as const;

// Mobile offsets — reduced tx so rotated cards stay within 390px viewport
// Calc: pack center ~195px, card half-bounding-box ~176px @ 19° → max tx ~19px safe margin
const GHOST_CONFIGS_COMPACT = [
  { rotate: 15, tx:  40, ty: 18, scale: 0.92, opacity: 0.80 },
  { rotate: -14, tx: -38, ty: 14, scale: 0.94, opacity: 0.85 },
] as const;

const GHOST_GRADIENT = "linear-gradient(145deg, #9B7FC9 0%, #D4A0B8 55%, #E8907A 100%)";

type GhostCardsProps = {
  /** Use smaller offsets to avoid overflow on narrow viewports */
  compact?: boolean;
};

export const GhostCards: React.FC<GhostCardsProps> = ({ compact = false }) => {
  const configs = compact ? GHOST_CONFIGS_COMPACT : GHOST_CONFIGS_DEFAULT;

  return (
    <>
      {configs.map((g) => (
        <div
          key={g.rotate}
          className="absolute rounded-2xl"
          style={{
            width: 248,
            height: 362,
            background: GHOST_GRADIENT,
            opacity: g.opacity,
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${g.rotate}deg) translateX(${g.tx}px) translateY(${g.ty}px) scale(${g.scale})`,
            boxShadow: "0 16px 50px rgba(120,90,160,0.3)",
            border: "1.5px solid rgba(255,255,255,0.45)",
          }}
        />
      ))}
    </>
  );
};

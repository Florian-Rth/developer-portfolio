import type React from "react";

const GHOST_CONFIGS = [
  { rotate: 19,  tx:  66, ty: 24, scale: 0.91, opacity: 0.7 },
  { rotate: -18, tx: -64, ty: 18, scale: 0.93, opacity: 0.8 },
] as const;

const GHOST_GRADIENT = "linear-gradient(145deg, #A890D0 0%, #D8A8C0 55%, #E0907A 100%)";

export const GhostCards: React.FC = () => (
  <>
    {GHOST_CONFIGS.map((g) => (
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

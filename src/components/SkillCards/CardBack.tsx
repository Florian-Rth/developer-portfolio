import { cn } from "@lib/utils";
import type React from "react";

type CardBackProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const CardBack: React.FC<CardBackProps> = ({ className, style }) => (
  <div
    className={cn("w-[220px] h-[320px] rounded-xl overflow-hidden relative", className)}
    style={{
      background: "radial-gradient(ellipse at center, #FFFDF9, #F5F0E8)",
      border: "2px solid rgba(184,169,212,0.4)",
      // clip-path works more reliably than overflow-hidden inside 3D transform
      // contexts (backface-visibility, preserve-3d) — prevents corner dots
      // from "bleeding" outside the card boundary.
      clipPath: "inset(0 round 12px)",
      ...style,
    }}
  >
    {/* Shimmer animation */}
    <div
      className="absolute inset-0 rounded-xl"
      style={{
        background:
          "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
        backgroundSize: "200% 100%",
        animation: "cardBackShimmer 5s ease-in-out infinite",
      }}
    />

    {/* Decorative corner dots */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 320" aria-hidden="true">
      {/* Corners */}
      <circle cx={24} cy={24} r={4} fill="#B8A9D4" opacity={0.4} />
      <circle cx={196} cy={24} r={4} fill="#E8B4A0" opacity={0.4} />
      <circle cx={24} cy={296} r={4} fill="#D4929B" opacity={0.4} />
      <circle cx={196} cy={296} r={4} fill="#A8C4B8" opacity={0.4} />
      {/* Mid-edge dots */}
      <circle cx={24} cy={160} r={3} fill="#D4929B" opacity={0.3} />
      <circle cx={196} cy={160} r={3} fill="#B8A9D4" opacity={0.3} />
      <circle cx={110} cy={24} r={3} fill="#E8B4A0" opacity={0.3} />
      <circle cx={110} cy={296} r={3} fill="#A8C4B8" opacity={0.3} />
    </svg>

    {/* FR monogram */}
    <div className="absolute inset-0 flex items-center justify-center">
      <span
        className="font-script text-5xl select-none"
        style={{
          background: "linear-gradient(135deg, #B8A9D4 0%, #D4929B 50%, #E8B4A0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 2px 6px rgba(184,169,212,0.3))",
        }}
      >
        FR
      </span>
    </div>

    {/* Gradient border overlay */}
    <div
      className="absolute inset-0 rounded-xl pointer-events-none"
      style={{
        // Only the inner glow — the 1.5px border-shadow has been removed
        // because the outer div already has `border: 2px solid` and the
        // combination created a visible double-border at spotlight scale.
        boxShadow: "inset 0 0 20px rgba(232,180,160,0.1)",
      }}
    />
  </div>
);

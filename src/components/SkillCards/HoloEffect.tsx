import type { SkillRarity } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";

type HoloEffectProps = {
  rarity: SkillRarity;
  intensity?: "low" | "medium" | "max";
  className?: string;
};

const RARITY_HAS_HOLO: Record<SkillRarity, boolean> = {
  legendary: true,
  epic: true,
  rare: false,
  uncommon: false,
  common: false,
};

const INTENSITY_OPACITY = {
  low: 0.15,
  medium: 0.3,
  max: 0.5,
};

export const HoloEffect: React.FC<HoloEffectProps> = ({
  rarity,
  intensity = "medium",
  className,
}) => {
  if (!RARITY_HAS_HOLO[rarity]) return null;

  const opacity = INTENSITY_OPACITY[intensity];

  return (
    <div
      className={cn("absolute inset-0 rounded-xl pointer-events-none overflow-hidden", className)}
      style={{ zIndex: 10 }}
    >
      {/* Conic shimmer */}
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%,
            rgba(184,169,212,${opacity}) 0deg,
            rgba(232,180,160,${opacity}) 72deg,
            rgba(212,146,155,${opacity}) 144deg,
            rgba(168,196,184,${opacity}) 216deg,
            rgba(244,208,63,${opacity}) 288deg,
            rgba(184,169,212,${opacity}) 360deg)`,
          animation: "holoSpin 4s linear infinite",
          mixBlendMode: "overlay",
        }}
      />

      {/* Sweep highlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          animation: "holoSweep 3s ease-in-out infinite",
        }}
      />
    </div>
  );
};

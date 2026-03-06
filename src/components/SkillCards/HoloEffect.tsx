import type { SkillRarity } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";

type HoloEffectProps = {
  rarity: SkillRarity;
  intensity?: "low" | "medium" | "max";
  className?: string;
  /** Normalized 0–1 mouse position within the card. When provided + isHovered,
   *  the shimmer tracks the cursor instead of playing a CSS animation. */
  mouseX?: number;
  mouseY?: number;
  isHovered?: boolean;
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
  mouseX,
  mouseY,
  isHovered = false,
}) => {
  if (!RARITY_HAS_HOLO[rarity]) return null;

  const opacity = INTENSITY_OPACITY[intensity];

  // Mouse-driven values — only active when hovering with known position
  const tracked = isHovered && mouseX !== undefined && mouseY !== undefined;
  const conicFrom = tracked ? (mouseX! + mouseY!) * 90 : 0;
  const conicAt = tracked ? `${mouseX! * 100}% ${mouseY! * 100}%` : "50% 50%";
  const sweepPos = tracked ? `${mouseX! * 200}% 0` : undefined;

  return (
    <div
      className={cn("absolute inset-0 rounded-[14px] pointer-events-none overflow-hidden", className)}
      style={{ zIndex: 10 }}
    >
      {/* Conic shimmer — follows mouse when hovered, auto-spins otherwise */}
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${conicFrom}deg at ${conicAt},
            rgba(184,169,212,${opacity}) 0deg,
            rgba(232,180,160,${opacity}) 72deg,
            rgba(212,146,155,${opacity}) 144deg,
            rgba(168,196,184,${opacity}) 216deg,
            rgba(244,208,63,${opacity}) 288deg,
            rgba(184,169,212,${opacity}) 360deg)`,
          animation: tracked ? "none" : "holoSpin 4s linear infinite",
          mixBlendMode: "overlay",
          transition: "background 0.08s ease",
        }}
      />

      {/* Sweep highlight — shifts with mouse X when hovered */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          backgroundPosition: sweepPos ?? "0% 0%",
          animation: tracked ? "none" : "holoSweep 3s ease-in-out infinite",
          transition: tracked ? "background-position 0.08s ease" : "none",
        }}
      />
    </div>
  );
};

import type { SkillRarity } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";

type HoloEffectProps = {
  rarity: SkillRarity;
  intensity?: "low" | "medium" | "max";
  className?: string;
  mouseX?: number; // 0–1
  mouseY?: number; // 0–1
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
  low: 0.12,
  medium: 0.18,
  max: 0.28,
};

export const HoloEffect: React.FC<HoloEffectProps> = ({
  rarity,
  intensity = "medium",
  className,
  mouseX = 0.5,
  mouseY = 0.5,
  isHovered = false,
}) => {
  if (!RARITY_HAS_HOLO[rarity]) return null;

  const op = INTENSITY_OPACITY[intensity];

  // Shift the iridescent sheen based on mouse position
  const hue = Math.round(mouseX * 60 + mouseY * 40); // 0–100 hue shift
  const posX = Math.round(mouseX * 100);
  const posY = Math.round(mouseY * 100);

  return (
    <div
      className={cn("absolute inset-0 rounded-[14px] pointer-events-none overflow-hidden", className)}
      style={{ zIndex: 10 }}
    >
      {/* Iridescent foil — soft rainbow that shifts with mouse */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            ${105 + hue}deg,
            hsla(${200 + hue}, 60%, 80%, ${op}) 0%,
            hsla(${280 + hue}, 50%, 85%, ${op * 0.6}) 35%,
            hsla(${340 + hue}, 55%, 80%, ${op}) 65%,
            hsla(${200 + hue}, 60%, 80%, ${op * 0.4}) 100%
          )`,
          mixBlendMode: "overlay",
          transition: isHovered ? "background 0.15s ease" : "none",
        }}
      />

      {/* Specular gloss — small bright spot that follows the cursor */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 55% 45% at ${posX}% ${posY}%,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.06) 50%,
            transparent 70%
          )`,
          mixBlendMode: "screen",
          transition: isHovered ? "background 0.12s ease" : "none",
        }}
      />
    </div>
  );
};

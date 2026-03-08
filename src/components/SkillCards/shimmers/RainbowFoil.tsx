/**
 * RainbowFoil — classic TCG holographic foil.
 *
 * Diagonal rainbow stripes rotate in hue and angle as the mouse moves,
 * exactly like real Pokémon / MTG holo cards. A soft specular flash sits
 * on top so the bright spot follows the cursor.
 */
import type React from "react";
import { useShimmerCtx } from "./SkillCardShimmerContext";
import type { ShimmerProps } from "./types";

const OPACITY: Record<NonNullable<ShimmerProps["intensity"]>, number> = {
  low: 0.12,
  medium: 0.22,
  max: 0.33,
};

export const RainbowFoil: React.FC<ShimmerProps> = ({ intensity = "medium" }) => {
  const { mouseX, mouseY, isHovered } = useShimmerCtx();
  const op = OPACITY[intensity];

  // Diagonal angle shifts ±35° around 110° as mouse moves left↔right
  const angle = 75 + mouseX * 70;
  // Hue rotation driven by both axes — full 120° swing
  const hue = (mouseX + mouseY) * 120;
  const tr = isHovered ? "background 0.1s ease" : "none";

  return (
    <div
      className="absolute inset-0 rounded-[14px] pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Rainbow stripe layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            ${angle}deg,
            hsla(${200 + hue}deg, 85%, 65%, ${op}) 0%,
            hsla(${260 + hue}deg, 85%, 65%, ${op}) 16%,
            hsla(${320 + hue}deg, 85%, 65%, ${op}) 33%,
            hsla(${  20 + hue}deg, 85%, 65%, ${op}) 50%,
            hsla(${  80 + hue}deg, 85%, 65%, ${op}) 67%,
            hsla(${140 + hue}deg, 85%, 65%, ${op}) 83%,
            hsla(${200 + hue}deg, 85%, 65%, ${op}) 100%
          )`,
          mixBlendMode: "overlay",
          transition: tr,
        }}
      />
      {/* Specular flash — bright spot that follows the cursor */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 55% 45% at ${mouseX * 100}% ${mouseY * 100}%,
            rgba(255,255,255,0.14) 0%,
            transparent 60%
          )`,
          mixBlendMode: "screen",
          transition: tr,
        }}
      />
    </div>
  );
};

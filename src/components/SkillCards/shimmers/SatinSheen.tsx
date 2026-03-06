/**
 * SatinSheen — single wide pearl-like specular highlight.
 *
 * One broad beam of soft white light sweeps across the card as the mouse
 * moves left/right. The angle tilts slightly with mouseY. Looks like light
 * catching satin fabric or pearlescent paint — clean, premium, no rainbow.
 */
import type React from "react";
import { useShimmerCtx } from "./SkillCardShimmerContext";
import type { ShimmerProps } from "./types";

const BRIGHTNESS: Record<NonNullable<ShimmerProps["intensity"]>, number> = {
  low: 0.22,
  medium: 0.36,
  max: 0.52,
};

export const SatinSheen: React.FC<ShimmerProps> = ({ intensity = "medium" }) => {
  const { mouseX, mouseY, isHovered } = useShimmerCtx();
  const b = BRIGHTNESS[intensity];

  // Beam centre follows mouseX (0→100%), width ±18%
  const centre = mouseX * 100;
  const angle = 82 + mouseY * 16; // mostly horizontal, slight Y tilt
  const tr = isHovered ? "background 0.12s ease" : "none";

  return (
    <div
      className="absolute inset-0 rounded-[14px] pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Pearl wash — static soft iridescence so card looks special at rest */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(232,180,160,0.08) 40%, rgba(184,169,212,0.08) 60%, rgba(255,255,255,0.05) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Moving satin beam */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            ${angle}deg,
            transparent                        ${Math.max(0,   centre - 22)}%,
            rgba(255,255,255,${b * 0.5})       ${Math.max(0,   centre - 12)}%,
            rgba(255,255,255,${b})             ${centre}%,
            rgba(255,255,255,${b * 0.5})       ${Math.min(100, centre + 12)}%,
            transparent                        ${Math.min(100, centre + 22)}%
          )`,
          mixBlendMode: "screen",
          transition: tr,
        }}
      />
    </div>
  );
};

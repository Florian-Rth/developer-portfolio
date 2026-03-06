import type { Skill } from "@/data/skills";
import { categoryColors, rarityColors } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CardArtwork } from "./CardArtwork";
import { CategoryBadge } from "./CategoryBadge";
import { RarityBadge } from "./RarityBadge";
import { SkillCardShimmerContext } from "./shimmers/SkillCardShimmerContext";
import type { ShimmerProps } from "./shimmers/types";
import { SkillStatsList } from "./SkillStatsList";

// Native design size — zoom handles all scaling externally
const CARD_W = 220;
const CARD_H = 320;

type SkillCardProps = {
  skill: Skill;
  style?: React.CSSProperties;
  onSelect?: () => void;
  className?: string;
  /** Proportional scale applied via CSS zoom — scales text, padding, borders, everything */
  scale?: number;
  /**
   * Compound composition: pass any shimmer component (RainbowFoil, SparkleField,
   * SatinSheen, or your own). It receives mouse state via SkillCardShimmerContext
   * and an optional `intensity` prop.
   *
   * @example
   * <SkillCard skill={skill} Shimmer={RainbowFoil} shimmerIntensity="max" />
   */
  Shimmer?: React.ComponentType<ShimmerProps>;
  shimmerIntensity?: ShimmerProps["intensity"];
};

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  style,
  onSelect,
  className,
  scale = 1,
  Shimmer,
  shimmerIntensity = "medium",
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (ny - 0.5) * -10, y: (nx - 0.5) * 10 });
    setMousePos({ x: nx, y: ny });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  // Idle shimmer drift — slowly oscillates mousePos so the shimmer subtly
  // animates even without interaction. Stops the moment the user hovers.
  const rafRef = useRef<number>(0);
  const idleStartRef = useRef<number>(0);
  useEffect(() => {
    if (isHovered) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    idleStartRef.current = performance.now();
    const tick = (now: number) => {
      const t = (now - idleStartRef.current) / 1000; // seconds
      setMousePos({
        x: 0.5 + Math.sin(t * 0.25) * 0.35,
        y: 0.5 + Math.cos(t * 0.18) * 0.28,
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered]);

  const shimmerCtx = useMemo(
    () => ({ mouseX: mousePos.x, mouseY: mousePos.y, isHovered }),
    [mousePos.x, mousePos.y, isHovered],
  );

  const rColors = rarityColors[skill.rarity];
  const catColor = categoryColors[skill.category];

  return (
    <SkillCardShimmerContext.Provider value={shimmerCtx}>
      <button
        ref={cardRef}
        type="button"
        className={cn(
          "w-[220px] h-[320px]",
          "rounded-[14px] cursor-pointer select-none",
          "flex flex-col overflow-hidden",
          "transition-shadow duration-300",
          "text-left",
          className,
        )}
        style={{
          zoom: scale,
          backgroundColor: "var(--card, var(--surface, #f5f0e8))",
          border: `2px solid ${rColors.border}`,
          boxShadow: isHovered
            ? `0 8px 32px ${rColors.glow}, 0 0 20px ${rColors.glow}`
            : "0 4px 20px rgba(0,0,0,0.08)",
          transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.08 : 1})`,
          transition: "transform 0.2s ease-out, box-shadow 0.3s ease",
          ...style,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={onSelect}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
          <CategoryBadge category={skill.category} />
          <RarityBadge rarity={skill.rarity} />
        </div>

        {/* Artwork */}
        <CardArtwork skill={skill} className="mx-2.5 h-[45%] rounded-lg overflow-hidden" />

        {/* Skill Name */}
        <h3 className="font-sans text-[14px] font-bold px-3 pt-2 text-foreground truncate">
          {skill.name}
        </h3>

        {/* Separator */}
        <div className="mx-3 my-1 h-px bg-foreground/10" />

        {/* Stats */}
        <SkillStatsList skill={skill} color={catColor} className="px-3 flex-1 min-h-0" />

        {/* Bottom padding */}
        <div className="pb-3" />

        {/* Shimmer layer — inside button so it participates in the 3D tilt transform.
            Reads mouse state from SkillCardShimmerContext (no prop drilling needed). */}
        {Shimmer && <Shimmer intensity={shimmerIntensity} />}
      </button>
    </SkillCardShimmerContext.Provider>
  );
};

export { CARD_W, CARD_H };

import type { Skill } from "@/data/skills";
import { categoryColors, rarityColors } from "@/data/skills";
import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { CardArtwork } from "./CardArtwork";
import { CategoryBadge } from "./CategoryBadge";
import { RarityBadge } from "./RarityBadge";
import { StatBar } from "./StatBar";

type SkillCardProps = {
  skill: Skill;
  style?: React.CSSProperties;
  onSelect?: () => void;
  className?: string;
  draggable?: boolean;
};

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  style,
  onSelect,
  className,
  draggable = false,
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const rColors = rarityColors[skill.rarity];
  const catColor = categoryColors[skill.category];

  const cardContent = (
    <button
      ref={cardRef}
      type="button"
      className={cn(
        "w-[220px] h-[320px] md:w-[240px] md:h-[340px]",
        "rounded-xl cursor-pointer select-none",
        "flex flex-col overflow-hidden",
        "transition-shadow duration-300",
        "text-left",
        className,
      )}
      style={{
        backgroundColor: "var(--surface, #f5f0e8)",
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
      <div className="px-3 flex flex-col gap-0.5 flex-1 min-h-0">
        <StatBar label="Mastery" value={skill.stats.power} color={catColor} />
        <StatBar label="Speed" value={skill.stats.speed} color={catColor} />
        <StatBar label="Range" value={skill.stats.versatility} color={catColor} />
        <StatBar label="Impact" value={skill.stats.impact} color={catColor} />
      </div>

      {/* Bottom padding */}
      <div className="pb-3" />
    </button>
  );

  if (draggable) {
    return (
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05, zIndex: 50 }}
        style={{ position: "absolute" }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

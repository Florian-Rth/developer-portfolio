import type { SkillRarity } from "@/data/skills";
import { rarityColors, rarityLabel } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";

type RarityBadgeProps = {
  rarity: SkillRarity;
  className?: string;
};

export const RarityBadge: React.FC<RarityBadgeProps> = ({ rarity, className }) => {
  return (
    <span
      className={cn("font-sans text-[9px] font-medium uppercase tracking-[1px]", className)}
      style={{ color: rarityColors[rarity].badge }}
    >
      {rarityLabel[rarity]}
    </span>
  );
};

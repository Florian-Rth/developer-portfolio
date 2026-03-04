import type { SkillCategory } from "@/data/skills";
import { categoryColors } from "@/data/skills";
import type React from "react";

type FallbackArtworkProps = {
  initial: string;
  category: SkillCategory;
};

export const FallbackArtwork: React.FC<FallbackArtworkProps> = ({ initial, category }) => {
  const color = categoryColors[category];

  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${color}30, ${color}15)`,
      }}
    >
      <span className="font-sans text-[36px] font-bold select-none" style={{ color: `${color}90` }}>
        {initial}
      </span>
    </div>
  );
};

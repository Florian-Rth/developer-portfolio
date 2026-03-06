import type { SkillCategory } from "@/data/skills";
import { categoryColors } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";

type CategoryBadgeProps = {
  category: SkillCategory;
  className?: string;
};

const categoryLabels: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps",
  tools: "Tools",
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className }) => {
  return (
    <span
      className={cn(
        "font-sans text-[10px] font-medium uppercase tracking-[1px]",
        "px-2 py-0.5 rounded-full",
        className,
      )}
      style={{
        backgroundColor: `${categoryColors[category]}20`,
        color: categoryColors[category],
      }}
    >
      {categoryLabels[category]}
    </span>
  );
};

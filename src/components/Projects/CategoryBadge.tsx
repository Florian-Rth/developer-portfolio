import { type ProjectCategory, categoryColors, categoryLabels } from "@/data/projects";
import { cn } from "@lib/utils";
import type React from "react";

type CategoryBadgeProps = {
  category: ProjectCategory;
  className?: string;
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className }) => {
  const label = categoryLabels[category];
  const colors = categoryColors[category];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold select-none",
        className,
      )}
      style={{
        backgroundColor: colors.bg,
        color: colors.fg,
      }}
    >
      {label}
    </span>
  );
};

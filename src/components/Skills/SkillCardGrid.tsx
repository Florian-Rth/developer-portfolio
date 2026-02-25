import { cn } from "@lib/utils";
import type React from "react";

type SkillCardGridProps = {
  children: React.ReactNode;
  className?: string;
};

export const SkillCardGrid: React.FC<SkillCardGridProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        // Desktop: flex grid with all 3 cards visible
        "flex flex-col items-center gap-8",
        "lg:flex-row lg:justify-center lg:gap-8",
        // Mobile carousel
        "max-lg:overflow-x-auto max-lg:scroll-snap-x max-lg:snap-mandatory",
        "max-lg:flex-row max-lg:px-[10vw]",
        // Shared
        "relative z-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

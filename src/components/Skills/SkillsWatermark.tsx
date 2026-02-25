import { cn } from "@lib/utils";
import type React from "react";

type SkillsWatermarkProps = {
  className?: string;
};

export const SkillsWatermark: React.FC<SkillsWatermarkProps> = ({ className }) => {
  return (
    <div className={cn("absolute left-1/2 -translate-x-1/2 -top-10 z-0", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "font-dm-sans font-extrabold text-[120px] lg:text-[280px]",
          "text-foreground/[0.04] dark:text-foreground/[0.03]",
          "select-none pointer-events-none whitespace-nowrap",
          "uppercase tracking-[20px]",
        )}
      >
        SKILLS
      </span>
    </div>
  );
};

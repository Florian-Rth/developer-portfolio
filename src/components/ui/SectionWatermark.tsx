import { cn } from "@lib/utils";
import type React from "react";

type SectionWatermarkProps = {
  text: string;
  className?: string;
};

export const SectionWatermark: React.FC<SectionWatermarkProps> = ({ text, className }) => {
  return (
    <div className={cn("absolute left-1/2 -translate-x-1/2 -top-14 md:-top-24 z-0", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "font-script text-[120px] lg:text-[280px]",
          "text-foreground/[0.022] dark:text-foreground/[0.018]",
          "select-none pointer-events-none whitespace-nowrap",
        )}
      >
        {text}
      </span>
    </div>
  );
};

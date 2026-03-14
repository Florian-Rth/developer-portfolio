import { cn } from "@lib/utils";
import type React from "react";

type SectionWatermarkProps = {
  text: string;
  className?: string;
};

export const SectionWatermark: React.FC<SectionWatermarkProps> = ({ text, className }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center -translate-y-[50%] z-0 pointer-events-none select-none",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "font-script text-[120px] lg:text-[280px]",
          "text-foreground/[0.022] dark:text-foreground/[0.018]",
          "whitespace-nowrap leading-none",
        )}
      >
        {text}
      </span>
    </div>
  );
};

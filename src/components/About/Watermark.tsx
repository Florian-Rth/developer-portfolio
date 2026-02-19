import { cn } from "@lib/utils";
import type React from "react";

type WatermarkProps = {
  className?: string;
};

export const Watermark: React.FC<WatermarkProps> = ({ className }) => {
  return (
    <div className={cn("absolute left-1/2 -translate-x-1/2 -top-24 z-0", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "font-script text-[120px] lg:text-[280px]",
          "text-foreground/[0.04] dark:text-foreground/[0.03]",
          "select-none pointer-events-none whitespace-nowrap",
        )}
      >
        about
      </span>
    </div>
  );
};

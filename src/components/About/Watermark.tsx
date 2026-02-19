import { cn } from "@lib/utils";
import type React from "react";

type WatermarkProps = {
  className?: string;
};

export const Watermark: React.FC<WatermarkProps> = ({ className }) => {
  return (
    <div className={cn("absolute left-1/2 -translate-x-1/2 -top-10 z-0", className)}>
      {/* Desktop: DM Sans, uppercase "ABOUT" */}
      <span
        aria-hidden="true"
        className={cn(
          "hidden lg:block",
          "font-sans font-extrabold text-[280px] uppercase tracking-[20px]",
          "text-foreground/[0.04] dark:text-foreground/[0.03]",
          "select-none pointer-events-none",
        )}
      >
        ABOUT
      </span>
      {/* Mobile: Pacifico, lowercase "about" */}
      <span
        aria-hidden="true"
        className={cn(
          "block lg:hidden",
          "font-script text-[120px]",
          "text-foreground/[0.04] dark:text-foreground/[0.03]",
          "select-none pointer-events-none",
        )}
      >
        about
      </span>
    </div>
  );
};

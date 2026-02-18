import { cn } from "@lib/utils";
import type React from "react";

type WatermarkProps = {
  children: React.ReactNode;
  className?: string;
};

export const Watermark: React.FC<WatermarkProps> = ({ children, className }) => {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-x-0 flex justify-center pointer-events-none select-none font-script text-[25vw] md:text-[14vw] text-foreground/[0.04] -translate-y-[60%]",
        className,
      )}
    >
      {children}
    </span>
  );
};

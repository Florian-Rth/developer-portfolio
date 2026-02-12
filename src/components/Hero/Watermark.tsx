import type React from "react";

type WatermarkProps = {
  children: React.ReactNode;
  className?: string;
};

export const Watermark: React.FC<WatermarkProps> = ({ children, className = "" }) => {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none font-script text-[25vw] md:text-[18vw] text-foreground/[0.07] ${className}`}
    >
      {children}
    </span>
  );
};

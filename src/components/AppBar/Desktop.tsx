import { cn } from "@lib/utils";
import type React from "react";

type DesktopProps = {
  children: React.ReactNode;
  className?: string;
};

export const Desktop: React.FC<DesktopProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "hidden md:flex items-center justify-between px-6 py-4 max-w-7xl mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

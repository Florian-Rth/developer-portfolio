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
        "relative z-10 hidden min-h-screen md:flex items-stretch px-6 lg:px-10 pt-[calc(var(--appbar-height-desktop)+3rem)] pb-20",
        className,
      )}
    >
      {children}
    </div>
  );
};

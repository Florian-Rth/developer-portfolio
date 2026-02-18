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
        "relative hidden md:flex flex-col items-center text-center min-h-screen px-4 pt-[38vh]",
        className,
      )}
    >
      {children}
    </div>
  );
};

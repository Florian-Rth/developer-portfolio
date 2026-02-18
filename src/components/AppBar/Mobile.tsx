import { cn } from "@lib/utils";
import type React from "react";

type MobileProps = {
  children: React.ReactNode;
  className?: string;
};

export const Mobile: React.FC<MobileProps> = ({ children, className }) => {
  return (
    <div className={cn("flex md:hidden items-center justify-between px-4 py-3", className)}>
      {children}
    </div>
  );
};

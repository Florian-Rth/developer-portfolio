import { cn } from "@lib/utils";
import type React from "react";

type SkillTagProps = {
  children: React.ReactNode;
  className?: string;
};

export const SkillTag: React.FC<SkillTagProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        "inline-block rounded-full",
        "bg-muted text-text-secondary",
        "font-dm-sans font-medium text-xs",
        "px-2.5 py-1",
        className,
      )}
    >
      {children}
    </span>
  );
};

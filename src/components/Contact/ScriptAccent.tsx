import { cn } from "@lib/utils";
import type React from "react";

type ScriptAccentProps = {
  children: React.ReactNode;
  className?: string;
};

export const ScriptAccent: React.FC<ScriptAccentProps> = ({ children, className }) => {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-script text-accent text-2xl md:text-3xl select-none opacity-75",
        className,
      )}
    >
      {children}
    </span>
  );
};

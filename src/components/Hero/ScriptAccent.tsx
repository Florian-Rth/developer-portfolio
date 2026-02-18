import { cn } from "@lib/utils";
import type React from "react";

type ScriptAccentProps = {
  children: React.ReactNode;
  className?: string;
};

export const ScriptAccent: React.FC<ScriptAccentProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        "inline font-script text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-gradient-peach via-gradient-dusty-rose to-gradient-lavender bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
};

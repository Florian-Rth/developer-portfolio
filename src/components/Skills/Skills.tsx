import { cn } from "@lib/utils";
import type React from "react";

type SkillsProps = {
  children: React.ReactNode;
  className?: string;
};

export const Skills: React.FC<SkillsProps> = ({ children, className }) => {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className={cn(
        "relative overflow-hidden bg-background",
        "px-5 py-15 md:px-6 md:py-20 lg:px-10 lg:py-30",
        "max-w-[1200px] mx-auto",
        className,
      )}
    >
      {children}
    </section>
  );
};

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
        "px-5 pt-36 pb-15 md:px-6 md:pt-52 md:pb-20 lg:px-10 lg:pt-60 lg:pb-30",
        "max-w-[1200px] mx-auto",
        className,
      )}
    >
      {children}
    </section>
  );
};

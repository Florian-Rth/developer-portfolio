import { cn } from "@lib/utils";
import type React from "react";

type AboutProps = {
  children: React.ReactNode;
  className?: string;
};

export const About: React.FC<AboutProps> = ({ children, className }) => {
  return (
    <section
      id="about"
      aria-label="About"
      className={cn(
        "relative bg-background",
        "px-5 pt-28 pb-15 md:pt-52 md:pb-30 md:px-10",
        "max-w-[1200px] mx-auto",
        // CSS Grid: 1 column mobile, 2 columns desktop
        "grid grid-cols-1 lg:grid-cols-2",
        "gap-y-8 lg:gap-x-[60px] lg:gap-y-10",
        className,
      )}
    >
      {children}
    </section>
  );
};

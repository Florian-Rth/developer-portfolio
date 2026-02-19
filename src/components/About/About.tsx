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
        "relative bg-background overflow-hidden",
        "px-5 py-15 md:py-30 md:px-10",
        "max-w-[1200px] mx-auto",
        className,
      )}
    >
      {children}
    </section>
  );
};

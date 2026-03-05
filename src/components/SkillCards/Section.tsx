import { SectionWatermark } from "@/components/ui/SectionWatermark";
import { cn } from "@lib/utils";
import type React from "react";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export const Section: React.FC<SectionProps> = ({ children, className }) => (
  <section
    id="skills"
    aria-label="Skills"
    className={cn(
      "relative bg-background",
      "min-h-[700px]",
      "pt-24 md:pt-32 pb-20",
      className,
    )}
  >
    <SectionWatermark text="skills" />
    <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">{children}</div>
  </section>
);

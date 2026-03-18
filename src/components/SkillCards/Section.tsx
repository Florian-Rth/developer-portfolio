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
      "relative bg-background overflow-visible",
      "min-h-[700px] [@media(max-height:720px)]:min-h-[500px] [@media(max-height:680px)]:min-h-[420px]",
      "pt-4 md:pt-32 pb-20 [@media(max-height:720px)]:pt-4 [@media(max-height:720px)]:pb-10 [@media(max-height:680px)]:pt-2 [@media(max-height:680px)]:pb-4",
      "scroll-mt-20",
      className,
    )}
  >
    <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">{children}</div>
  </section>
);

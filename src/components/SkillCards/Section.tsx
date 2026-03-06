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
    {/* Ambient glow — lives at section level so it never gets clipped
        by the max-w content container */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 28% 45% at 50% 42%, rgba(212,88,122,0.10) 0%, transparent 100%),
          radial-gradient(ellipse 32% 55% at 50% 46%, rgba(139,110,199,0.12) 0%, transparent 100%)
        `,
      }}
    />
    <SectionWatermark text="skills" />
    <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">{children}</div>
  </section>
);

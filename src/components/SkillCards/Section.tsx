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
      "relative bg-background overflow-visible",
      "min-h-[700px]",
      "pt-24 md:pt-32 pb-20",
      "scroll-mt-20",
      className,
    )}
  >
    {/* Ambient glow — positioned outside max-w container so it isn't clipped.
        Extends 300px above section (bleeds into About) and 200px below (into Projekte area).
        Total height ~1500px covers full section + bleed zones.
        Ellipse centers at 35% (biased upward) so top bleed is visible. */}
    <div
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      aria-hidden="true"
      style={{
        top: -300,
        width: "100vw",
        height: 1500,
        background: `
          radial-gradient(ellipse 400px 580px at 50% 46%, rgba(212,88,122,0.13) 0%, transparent 100%),
          radial-gradient(ellipse 460px 640px at 50% 48%, rgba(139,110,199,0.15) 0%, transparent 100%)
        `,
      }}
    />

    <SectionWatermark text="skills" />
    <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">{children}</div>
  </section>
);

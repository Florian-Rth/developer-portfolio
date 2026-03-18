import { ScrollReveal } from "@components/ui/ScrollReveal";
import { SectionWatermark } from "@components/ui/SectionWatermark";
import { cn } from "@lib/utils";
import type React from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  watermark?: string;
  className?: string;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  watermark,
  className,
}) => (
  <header
    className={cn(
      "relative w-full flex flex-col items-center justify-center mb-10 md:mb-16",
      className,
    )}
  >
    {watermark && <SectionWatermark text={watermark} />}

    <ScrollReveal delay={0} className="relative z-10 text-center">
      <h2
        className="font-script inline-block"
        style={{
          fontSize: "clamp(3rem, 6vw, 4.5rem)",
          lineHeight: 1.5,
          background: "linear-gradient(to right, #e8b4a0, #d4929b, #b8a9d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          padding: "0.15em 0.1em 0.1em",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-foreground/55 mt-2">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  </header>
);

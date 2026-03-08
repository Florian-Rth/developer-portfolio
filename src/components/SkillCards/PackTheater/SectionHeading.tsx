import { skills } from "@/data/skills";
import type React from "react";

type SectionHeadingProps = {
  subtitle?: string;
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle = `${skills.length} technologies · open the pack to discover`,
}) => (
  <div className="text-center mb-2">
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
      Skills.
    </h2>
    <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-foreground/55 mt-2">
      {subtitle}
    </p>
  </div>
);

import { skills } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";
import { useCallback, useState } from "react";
import { CardDeck } from "./CardDeck";
import { CardScatterA } from "./CardScatterA";
import { SectionWatermark } from "./SectionWatermark";

type SkillCardSectionProps = {
  className?: string;
};

export const SkillCardSection: React.FC<SkillCardSectionProps> = ({ className }) => {
  const [scattered, setScattered] = useState(false);

  const handleScatter = useCallback(() => {
    setScattered(true);
  }, []);

  return (
    <section
      id="skills"
      aria-label="Skills"
      className={cn(
        "relative bg-background overflow-hidden",
        "min-h-screen",
        "pt-36 md:pt-52 lg:pt-60 pb-20",
        className,
      )}
    >
      <SectionWatermark text="skills" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">
        {!scattered ? (
          <div className="flex items-center justify-center min-h-[500px]">
            <CardDeck onScatter={handleScatter} />
          </div>
        ) : (
          <CardScatterA skills={skills} />
        )}
      </div>
    </section>
  );
};

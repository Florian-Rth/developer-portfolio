import { skills } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";
import { useCallback, useState } from "react";
import { CardDeck } from "./CardDeck";
import { CardScatterA } from "./CardScatterA";
import { CardScatter3D } from "./r3f/CardScatter3D";
import { SectionWatermark } from "./SectionWatermark";

type Version = "2d" | "3d";

type SkillCardSectionProps = {
  className?: string;
};

export const SkillCardSection: React.FC<SkillCardSectionProps> = ({ className }) => {
  const [scatterState, setScatterState] = useState<"stacked" | "scattered">("stacked");
  const [version, setVersion] = useState<Version>("2d");

  const handleScatter = useCallback(() => {
    setScatterState("scattered");
  }, []);

  const handleVersionChange = useCallback((v: Version) => {
    setVersion(v);
    setScatterState("stacked");
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

      {/* Version Toggle */}
      <div className="relative z-20 flex justify-center mb-8">
        <div className="flex items-center gap-1 p-1 rounded-full bg-surface shadow-sm border border-muted">
          <button
            type="button"
            onClick={() => handleVersionChange("2d")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              "font-sans",
              version === "2d"
                ? "bg-accent text-white shadow-sm"
                : "text-text-secondary hover:text-text",
            )}
          >
            2D
          </button>
          <button
            type="button"
            onClick={() => handleVersionChange("3d")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              "font-sans",
              version === "3d"
                ? "bg-accent text-white shadow-sm"
                : "text-text-secondary hover:text-text",
            )}
          >
            3D Physics
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">
        {version === "2d" ? (
          scatterState === "stacked" ? (
            <div className="flex items-center justify-center min-h-[500px]">
              <CardDeck onScatter={handleScatter} />
            </div>
          ) : (
            <CardScatterA skills={skills} />
          )
        ) : (
          <CardScatter3D />
        )}
      </div>
    </section>
  );
};

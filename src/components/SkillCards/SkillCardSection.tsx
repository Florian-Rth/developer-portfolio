import type { Skill } from "@/data/skills";
import { skills } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { CardDeck } from "./CardDeck";
import { CardScatterA } from "./CardScatterA";
import { DetailDrawer } from "./DetailDrawer";
import { MobileCardStack } from "./MobileCardStack";
import { SectionWatermark } from "./SectionWatermark";

type SkillCardSectionProps = {
  className?: string;
};

export const SkillCardSection: React.FC<SkillCardSectionProps> = ({ className }) => {
  const [scattered, setScattered] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleScatter = useCallback(() => setScattered(true), []);
  const handleSelect = useCallback((skill: Skill) => setSelectedSkill(skill), []);
  const handleClose = useCallback(() => setSelectedSkill(null), []);

  return (
    <>
      <section
        id="skills"
        aria-label="Skills"
        className={cn(
          "relative bg-background",
          "min-h-screen",
          "pt-36 md:pt-52 lg:pt-60 pb-20",
          className,
        )}
      >
        <SectionWatermark text="skills" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">
          {isMobile ? (
            // ── Mobile: Tinder-style swipe stack ──────────────────────────────
            <div className="flex items-center justify-center min-h-[500px]">
              <MobileCardStack onSelect={handleSelect} />
            </div>
          ) : (
            // ── Desktop: scatter on click ──────────────────────────────────────
            !scattered ? (
              <div className="flex items-center justify-center min-h-[500px]">
                <CardDeck onScatter={handleScatter} />
              </div>
            ) : (
              <CardScatterA skills={skills} onSelect={handleSelect} />
            )
          )}
        </div>
      </section>

      <DetailDrawer skill={selectedSkill} onClose={handleClose} />
    </>
  );
};

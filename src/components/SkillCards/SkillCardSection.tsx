import type { Skill } from "@/data/skills";
import { skills } from "@/data/skills";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@lib/utils";
import type React from "react";
import { useState } from "react";
import { SkillCardsContext } from "./SkillCardsContext";

type SkillCardSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export const SkillCardSection: React.FC<SkillCardSectionProps> = ({ children, className }) => {
  const [scattered, setScattered] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const isMobile = useIsMobile();

  return (
    <SkillCardsContext.Provider
      value={{
        skills,
        scattered,
        setScattered,
        selectedSkill,
        setSelectedSkill,
        isMobile,
      }}
    >
      <div className={cn(className)}>{children}</div>
    </SkillCardsContext.Provider>
  );
};

import type { Skill } from "@/data/skills";
import { createContext } from "react";

export type SkillCardsContextValue = {
  skills: Skill[];
  scattered: boolean;
  setScattered: (v: boolean) => void;
  selectedSkill: Skill | null;
  setSelectedSkill: (skill: Skill | null) => void;
  isMobile: boolean;
};

export const SkillCardsContext = createContext<SkillCardsContextValue | null>(null);

import { useContext } from "react";
import { SkillCardsContext, type SkillCardsContextValue } from "./SkillCardsContext";

export const useSkillCards = (): SkillCardsContextValue => {
  const context = useContext(SkillCardsContext);
  if (!context) throw new Error("SkillCards parts must be used within SkillCardSection");
  return context;
};

import { createContext, useContext } from "react";

export type SkillCardShimmerCtx = {
  mouseX: number; // 0–1, normalised within the card
  mouseY: number; // 0–1
  isHovered: boolean;
};

export const SkillCardShimmerContext = createContext<SkillCardShimmerCtx>({
  mouseX: 0.5,
  mouseY: 0.5,
  isHovered: false,
});

export const useShimmerCtx = () => useContext(SkillCardShimmerContext);

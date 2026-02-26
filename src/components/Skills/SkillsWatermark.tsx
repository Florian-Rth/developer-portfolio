import { SectionWatermark } from "@components/ui/SectionWatermark";
import type React from "react";

type SkillsWatermarkProps = {
  className?: string;
};

export const SkillsWatermark: React.FC<SkillsWatermarkProps> = ({ className }) => {
  return <SectionWatermark text="skills" className={className} />;
};

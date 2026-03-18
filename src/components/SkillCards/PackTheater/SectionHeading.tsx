import { SectionHeader } from "@/components/ui/SectionHeader";
import { skills } from "@/data/skills";
import type React from "react";

type SectionHeadingProps = {
  subtitle?: string;
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle = `${skills.length} technologies · open the pack to discover`,
}) => <SectionHeader watermark="skills" title="Skills." subtitle={subtitle} className="mb-2" />;

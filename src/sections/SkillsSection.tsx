import { SkillCardSection } from "@components/SkillCards";
import type React from "react";

export const SkillsSection: React.FC = () => (
  <SkillCardSection>
    <SkillCardSection.Section>
      <SkillCardSection.Deck />
      <SkillCardSection.Scatter />
      <SkillCardSection.MobileStack />
    </SkillCardSection.Section>
    <SkillCardSection.Drawer />
  </SkillCardSection>
);

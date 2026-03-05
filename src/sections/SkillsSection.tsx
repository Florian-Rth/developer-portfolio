import { SkillCardSection } from "@components/SkillCards";
import { useSkillCards } from "@components/SkillCards/SkillCardsProvider";
import type React from "react";

const TheaterWithDrawer: React.FC = () => {
  const { setSelectedSkill, isMobile } = useSkillCards();

  if (isMobile) {
    return (
      <>
        <SkillCardSection.MobileStack />
        <SkillCardSection.Drawer />
      </>
    );
  }

  return (
    <>
      <SkillCardSection.Theater onCardSelect={setSelectedSkill} />
      <SkillCardSection.Drawer />
    </>
  );
};

export const SkillsSection: React.FC = () => (
  <SkillCardSection>
    <SkillCardSection.Section>
      <TheaterWithDrawer />
    </SkillCardSection.Section>
  </SkillCardSection>
);

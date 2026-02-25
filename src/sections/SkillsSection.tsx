import { Skills } from "@components/Skills";
import { BackendScene } from "@components/Skills/scenes/BackendScene";
import { DevOpsScene } from "@components/Skills/scenes/DevOpsScene";
import { FrontendScene } from "@components/Skills/scenes/FrontendScene";
import type React from "react";

export const SkillsSection: React.FC = () => {
  return (
    <Skills>
      <Skills.Watermark />
      <Skills.CardGrid>
        <Skills.Card
          category="Frontend"
          skills={["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"]}
          glowColor="#B8A9D4"
        >
          <Skills.Scene component={FrontendScene} />
        </Skills.Card>
        <Skills.Card
          category="Backend"
          skills={["C#", ".NET", ".NET Core", "REST APIs"]}
          glowColor="#D4929B"
        >
          <Skills.Scene component={BackendScene} />
        </Skills.Card>
        <Skills.Card
          category="DevOps"
          skills={["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "GitOps"]}
          glowColor="#E8B4A0"
        >
          <Skills.Scene component={DevOpsScene} />
        </Skills.Card>
      </Skills.CardGrid>
    </Skills>
  );
};

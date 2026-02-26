import { Annotation } from "@components/About/Annotation";
import { Skills } from "@components/Skills";
import { BackendScene } from "@components/Skills/scenes/BackendScene";
import { DevOpsScene } from "@components/Skills/scenes/DevOpsScene";
import { FrontendScene } from "@components/Skills/scenes/FrontendScene";
import type React from "react";

export const SkillsSection: React.FC = () => {
  return (
    <Skills>
      <Skills.Watermark />
      {/* Card grid + annotations wrapper */}
      <div className="relative">
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

        {/* Annotation 1: "hover me!" — top-left, points toward first card */}
        <div className="hidden lg:block absolute -top-10 left-4 z-20">
          <Annotation
            text="hover me!"
            rotation={-8}
            arrowDirection="right"
            animationDelay={400}
          />
        </div>

        {/* Annotation 2: "it's 3D!" — top-center, points down toward scene */}
        <div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 z-20">
          <Annotation
            text="it's 3D!"
            rotation={5}
            arrowDirection="down"
            animationDelay={500}
          />
        </div>

        {/* Annotation 3: "interactive!" — bottom-right, points toward dots on mobile or card */}
        <div className="hidden lg:block absolute -bottom-10 right-4 z-20">
          <Annotation
            text="interactive!"
            rotation={6}
            arrowDirection="up"
            animationDelay={600}
          />
        </div>
      </div>
    </Skills>
  );
};

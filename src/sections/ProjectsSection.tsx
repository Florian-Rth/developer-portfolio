import { Projects } from "@components/Projects";
import { SectionHeader } from "@components/ui/SectionHeader";
import type React from "react";

export const ProjectsSection: React.FC = () => (
  <Projects>
    <SectionHeader
      watermark="projects"
      title="Projects."
      subtitle="Things I built ✦ A selection of projects spanning industrial software, logistics, DevOps tooling, and this very portfolio."
    />
    <Projects.Grid />
    <Projects.Detail />
  </Projects>
);

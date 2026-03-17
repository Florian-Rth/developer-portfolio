import type { Project } from "@/data/projects";
import type React from "react";
import { CicdArt } from "./CicdArt";
import { LogisticsArt } from "./LogisticsArt";
import { MachineEyeArt } from "./MachineEyeArt";
import { PortfolioArt } from "./PortfolioArt";
import { SchedulerArt } from "./SchedulerArt";

type ProjectIconProps = {
  project: Project;
};

const artworkMap: Record<string, React.FC> = {
  "machine-eye": MachineEyeArt,
  "cr3-scheduler": SchedulerArt,
  "yard-logistics": LogisticsArt,
  "cicd-actions": CicdArt,
  "developer-portfolio": PortfolioArt,
};

export const ProjectIcon: React.FC<ProjectIconProps> = ({ project }) => {
  const Artwork = artworkMap[project.id];
  if (!Artwork) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <Artwork />
    </div>
  );
};

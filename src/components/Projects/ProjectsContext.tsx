import type { Project } from "@/data/projects";
import { createContext } from "react";

export type ProjectsContextValue = {
  expandedProject: Project | null;
  expand: (project: Project) => void;
  close: () => void;
};

export const ProjectsContext = createContext<ProjectsContextValue | null>(null);

import type { Project } from "@/data/projects";
import { createContext } from "react";

export type ProjectsContextValue = {
  expandedProject: Project | null;
  originRect: DOMRect | null;
  expand: (project: Project, sourceEl?: HTMLElement | null) => void;
  close: () => void;
};

export const ProjectsContext = createContext<ProjectsContextValue | null>(null);

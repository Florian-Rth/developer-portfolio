import type React from "react";
import { useContext } from "react";
import { useProjectExpand } from "./useProjectExpand";
import { ProjectsContext } from "./ProjectsContext";
import type { ProjectsContextValue } from "./ProjectsContext";

type ProjectsProviderProps = {
  children: React.ReactNode;
};

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const value = useProjectExpand();

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};

export const useProjectsContext = (): ProjectsContextValue => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("Projects components must be used within a ProjectsProvider");
  }
  return context;
};

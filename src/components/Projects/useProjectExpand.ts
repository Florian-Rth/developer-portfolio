import type { Project } from "@/data/projects";
import { useCallback, useEffect, useState } from "react";

type UseProjectExpandResult = {
  expandedProject: Project | null;
  expand: (project: Project) => void;
  close: () => void;
};

export const useProjectExpand = (): UseProjectExpandResult => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  const expand = useCallback((project: Project) => {
    setExpandedProject(project);
  }, []);

  const close = useCallback(() => {
    setExpandedProject(null);
  }, []);

  // ESC key closes the detail view
  useEffect(() => {
    if (!expandedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [expandedProject, close]);

  return { expandedProject, expand, close };
};

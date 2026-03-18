import type { Project } from "@/data/projects";
import { useCallback, useEffect, useState } from "react";

type UseProjectExpandResult = {
  expandedProject: Project | null;
  renderedProject: Project | null;
  closingProjectId: Project["id"] | null;
  originRect: DOMRect | null;
  expand: (project: Project, sourceEl?: HTMLElement | null) => void;
  close: () => void;
  finishClose: () => void;
};

export const useProjectExpand = (): UseProjectExpandResult => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [renderedProject, setRenderedProject] = useState<Project | null>(null);
  const [closingProjectId, setClosingProjectId] = useState<Project["id"] | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const expand = useCallback((project: Project, sourceEl?: HTMLElement | null) => {
    setClosingProjectId(null);
    setOriginRect(sourceEl ? sourceEl.getBoundingClientRect() : null);
    setRenderedProject(project);
    setExpandedProject(project);
  }, []);

  const close = useCallback(() => {
    const projectToClose = expandedProject ?? renderedProject;
    setClosingProjectId(projectToClose?.id ?? null);
    setExpandedProject(null);
  }, [expandedProject, renderedProject]);

  const finishClose = useCallback(() => {
    setClosingProjectId(null);
    setRenderedProject(null);
  }, []);

  useEffect(() => {
    if (!expandedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const handleResize = () => {
      setOriginRect(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [expandedProject, close]);

  return { expandedProject, renderedProject, closingProjectId, originRect, expand, close, finishClose };
};

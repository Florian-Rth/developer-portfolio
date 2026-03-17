import type { Project } from "@/data/projects";
import { useCallback, useEffect, useState } from "react";

type UseProjectExpandResult = {
  expandedProject: Project | null;
  closingProjectId: Project["id"] | null;
  originRect: DOMRect | null;
  expand: (project: Project, sourceEl?: HTMLElement | null) => void;
  close: () => void;
  finishClose: () => void;
};

export const useProjectExpand = (): UseProjectExpandResult => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [closingProjectId, setClosingProjectId] = useState<Project["id"] | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const expand = useCallback((project: Project, sourceEl?: HTMLElement | null) => {
    setClosingProjectId(null);
    setOriginRect(sourceEl ? sourceEl.getBoundingClientRect() : null);
    setExpandedProject(project);
  }, []);

  const close = useCallback(() => {
    setClosingProjectId(expandedProject?.id ?? null);
    setExpandedProject(null);
  }, [expandedProject]);

  const finishClose = useCallback(() => {
    setClosingProjectId(null);
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

  return { expandedProject, closingProjectId, originRect, expand, close, finishClose };
};

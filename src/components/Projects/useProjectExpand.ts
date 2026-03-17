import type { Project } from "@/data/projects";
import { useCallback, useEffect, useState } from "react";

type UseProjectExpandResult = {
  expandedProject: Project | null;
  originRect: DOMRect | null;
  expand: (project: Project, sourceEl?: HTMLElement | null) => void;
  close: () => void;
};

export const useProjectExpand = (): UseProjectExpandResult => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const expand = useCallback((project: Project, sourceEl?: HTMLElement | null) => {
    setOriginRect(sourceEl ? sourceEl.getBoundingClientRect() : null);
    setExpandedProject(project);
  }, []);

  const close = useCallback(() => {
    setExpandedProject(null);
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

  return { expandedProject, originRect, expand, close };
};

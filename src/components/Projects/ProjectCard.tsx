import type { Project } from "@/data/projects";
import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import type React from "react";
import { useCallback } from "react";
import { CategoryBadge } from "./CategoryBadge";
import { MeshGradient } from "./MeshGradient";
import { ProjectArtwork } from "./ProjectArtwork";
import { TechPills } from "./TechPills";
import { useCardTilt } from "./useCardTilt";
import { useProjectsContext } from "./ProjectsProvider";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { cardRef, resetTilt } = useCardTilt();
  const { expand } = useProjectsContext();

  const handleClick = useCallback(() => {
    resetTilt();
    expand(project);
  }, [expand, project, resetTilt]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  // Stagger animation delays so cards don't all move in sync
  const meshDelay = index * 2.4;

  return (
    <motion.article
      ref={cardRef as React.RefObject<HTMLElement>}
      layout
      layoutId={project.id}
      className={cn(
        "relative z-10 flex flex-col rounded-2xl overflow-hidden",
        "bg-card border border-border",
        "cursor-pointer outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "h-full",
      )}
      style={{ willChange: "transform" }}
      aria-label={project.title}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      whileHover={{ scale: 1.0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Artwork: top half */}
      <div className="relative flex-shrink-0 h-44 sm:h-52 overflow-hidden">
        <MeshGradient
          colors={project.gradientColors}
          animationDelay={meshDelay}
          className="w-full h-full"
        />
        <ProjectArtwork project={project} className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/70 to-transparent" />
        {/* Category badge: top-left absolute */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={project.category} />
        </div>
      </div>

      {/* Info: bottom half */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="text-base font-bold text-card-foreground leading-tight">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-snug line-clamp-2">{project.tagline}</p>
        <div className="mt-auto pt-2">
          <TechPills pills={project.techPills} total={project.techStack.length} />
        </div>
      </div>
    </motion.article>
  );
};

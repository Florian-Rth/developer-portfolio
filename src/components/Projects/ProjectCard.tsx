import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useCallback, useRef } from "react";
import type React from "react";
import { ProjectIcon } from "./ProjectIcon";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

/** Category → badge color mapping */
const categoryColors: Record<string, string> = {
  "Industrial IoT": "bg-gradient-lavender/20 text-gradient-lavender",
  Scheduling: "bg-gradient-peach/20 text-gradient-peach",
  Logistics: "bg-gradient-dusty-rose/20 text-gradient-dusty-rose",
  DevOps: "bg-[#A8C4B8]/20 text-[#A8C4B8]",
  Portfolio: "bg-gradient-lavender/15 text-gradient-dusty-rose",
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;
    
    // Calculate parallax offsets for different layers
    const parallaxX = (x - 0.5) * -8;
    const parallaxY = (y - 0.5) * -6;
    
    // Apply transform with parallax
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.transition = "transform 150ms ease";
    
    // Update parallax layers via CSS variables
    card.style.setProperty('--parallax-x', `${parallaxX}px`);
    card.style.setProperty('--parallax-y', `${parallaxY}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.transition = "transform 400ms ease";
    
    // Reset parallax variables
    card.style.setProperty('--parallax-x', '0px');
    card.style.setProperty('--parallax-y', '0px');
  }, []);

  const techPillsToShow = project.techPills.slice(0, 3);
  const overflow = project.tech.length - 3;

  return (
    <article
      ref={cardRef}
      className={cn(
        "project-card group relative rounded-2xl overflow-hidden cursor-pointer",
        "bg-card border border-border",
        "transition-shadow duration-300 ease-out",
        "hover:shadow-lg",
        "will-change-transform",
        className,
      )}
      aria-label={project.title}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient border overlay — visible on hover */}
      <div
        className={cn(
          "absolute -inset-px rounded-[17px] -z-10",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        )}
        style={{
          background: `linear-gradient(135deg, ${project.gradient.primary}, ${project.gradient.secondary}, ${project.gradient.accent})`,
        }}
      />

      {/* Card inner — covers gradient except 1px border */}
      <div className="relative h-full bg-card rounded-2xl overflow-hidden flex flex-col">
        {/* Artwork area — top 45% */}
        <div className="relative flex-[0_0_45%] overflow-hidden">
          {/* Mesh gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 40%, ${project.gradient.primary}20, transparent 60%),
                radial-gradient(ellipse at 70% 60%, ${project.gradient.secondary}18, transparent 55%),
                radial-gradient(ellipse at 50% 80%, ${project.gradient.accent}12, transparent 50%)
              `,
            }}
          />

          {/* SVG artwork */}
          <ProjectIcon project={project} />

          {/* Category badge */}
          <div
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 rounded-full",
              "text-[11px] font-medium uppercase tracking-wider",
              "backdrop-blur-sm",
              categoryColors[project.category] ?? "bg-muted/40 text-muted-foreground",
            )}
          >
            {project.category}
          </div>
        </div>

        {/* Content area — bottom 55% */}
        <div className="flex-1 p-4 flex flex-col gap-2">
          <h3 className="text-lg font-bold text-card-foreground leading-tight">{project.title}</h3>
          <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
            {project.tagline}
          </p>

          {/* Tech pills */}
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {techPillsToShow.map((pill) => (
              <span
                key={pill}
                className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px] font-medium"
              >
                {pill}
              </span>
            ))}
            {overflow > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px] font-medium">
                +{overflow}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

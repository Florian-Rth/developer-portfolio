import { projects } from "@/data/projects";
import { ScrollReveal } from "@components/ui/ScrollReveal";
import type React from "react";
import { ProjectCard } from "./ProjectCard";
import { useSectionSpotlight } from "./useSectionSpotlight";

export const ProjectsGrid: React.FC = () => {
  const { gridRef } = useSectionSpotlight();

  return (
    <div ref={gridRef} className="projects-spotlight relative">
      {/*
        Bento grid layout:
          - mobile  (<768px):  single column
          - tablet  (768-1023px): 2-col uniform grid
          - desktop (≥1024px): named template areas — 2 cards on row 1, 3 on row 2
      */}
      <div
        className="
          grid gap-4
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
        "
        style={
          {
            // Desktop named grid: row 1 spans full 2-of-3 cols each, row 2 is 3-of-3
            // We use inline style for the lg template so tailwind doesn't need to know
          }
        }
      >
        {projects.map((project, i) => (
          <ScrollReveal
            key={project.id}
            delay={i * 80}
            className={
              // Desktop BENTO overrides via lg: modifier classes applied per card
              i === 0
                ? "lg:col-span-1 lg:row-span-1" // slot A (row1, col1)
                : i === 1
                  ? "lg:col-span-2 lg:row-span-1" // slot B (row1, col2-3) — wider right card
                  : "" // row2: 1 col each
            }
          >
            <ProjectCard project={project} index={i} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

import { cn } from "@lib/utils";
import type React from "react";
import { ProjectsProvider } from "./ProjectsProvider";

type ProjectsProps = {
  children: React.ReactNode;
  className?: string;
};

export const Projects: React.FC<ProjectsProps> = ({ children, className }) => {
  return (
    <ProjectsProvider>
      <section
        id="projects"
        aria-label="Projects"
        className={cn(
          "relative bg-background overflow-visible",
          "min-h-screen",
          "pt-16 md:pt-32 pb-20",
          "scroll-mt-20",
          className,
        )}
      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="mb-6 sm:mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/80">
              Things I built
            </p>
          </div>
          {children}
        </div>
      </section>
    </ProjectsProvider>
  );
};

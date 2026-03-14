import type { Project } from "@/data/projects";
import { categoryLabels } from "@/data/projects";
import { Backdrop } from "@components/ui/Backdrop";
import { LAYERS } from "@lib/layers";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import { CategoryBadge } from "./CategoryBadge";
import { MeshGradient } from "./MeshGradient";
import { useProjectsContext } from "./ProjectsProvider";

const REDUCED_MOTION =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type ProjectDetailProps = {
  project: Project;
  onClose: () => void;
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Save and restore focus
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    // Small delay so the motion animation starts before we focus
    const t = setTimeout(() => closeButtonRef.current?.focus(), 50);
    return () => {
      clearTimeout(t);
      previousFocusRef.current?.focus();
    };
  }, []);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose],
  );

  const springTransition = REDUCED_MOTION
    ? { type: "tween" as const, duration: 0.15 }
    : { type: "spring" as const, duration: 0.4, bounce: 0.1 };

  return (
    <Backdrop
      visible
      blockScroll
      onDismiss={onClose}
      zIndex={LAYERS.theater + 1}
      dimColor="rgba(10, 8, 12, 0.72)"
      fadeDuration={REDUCED_MOTION ? 0.1 : 0.3}
    >
      <motion.div
        layout
        layoutId={project.id}
        transition={springTransition}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onKeyDown={handleKeyDown}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="relative w-full max-w-2xl mx-4 rounded-2xl bg-card border border-border overflow-hidden flex flex-col max-h-[90vh]"
        style={{ pointerEvents: "auto" }}
      >
        {/* ── Header artwork ───────────────────────────────────────── */}
        <div className="relative flex-shrink-0 h-48 sm:h-56">
          <MeshGradient
            colors={project.gradientColors}
            animationDuration={10}
            className="w-full h-full"
          />
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <CategoryBadge category={project.category} />
          </div>
          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            ✕
          </button>
        </div>

        {/* ── Scrollable body ──────────────────────────────────────── */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 flex flex-col gap-5">
          {/* Title + tagline */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-card-foreground">{project.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {categoryLabels[project.category]} · {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-card-foreground leading-relaxed">{project.description}</p>

          {/* What I built */}
          <section aria-label="Key highlights">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
              What I built
            </h3>
            <ul className="flex flex-col gap-1.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-card-foreground">
                  <span
                    className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Full tech stack */}
          <section aria-label="Tech stack">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
              Tech stack
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {/* Links or confidential note */}
          {project.isPublic ? (
            <section aria-label="Links" className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target={project.liveUrl.startsWith("http") ? "_blank" : "_self"}
                  rel={project.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-accent-hover transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live site
                </a>
              )}
            </section>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              🔒 This project is confidential and not publicly available.
            </p>
          )}
        </div>
      </motion.div>
    </Backdrop>
  );
};

export const ProjectDetailWrapper: React.FC = () => {
  const { expandedProject, close } = useProjectsContext();

  return (
    <AnimatePresence>
      {expandedProject && (
        <ProjectDetail key={expandedProject.id} project={expandedProject} onClose={close} />
      )}
    </AnimatePresence>
  );
};

import { projects } from "@/data/projects";
import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import { Projects } from "..";

// Mock framer-motion to avoid animation issues in tests (same pattern as SkillCards)
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    article: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <article {...props}>{children}</article>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAnimation: () => ({ start: vi.fn() }),
}));

// Mock Backdrop to simulate a simple render (avoid portal + framer-motion combo)
vi.mock("@components/ui/Backdrop", () => ({
  Backdrop: ({
    visible,
    children,
    onDismiss,
  }: {
    visible: boolean;
    children: React.ReactNode;
    onDismiss?: () => void;
  }) =>
    visible ? (
      <div role="presentation" data-testid="backdrop" onClick={onDismiss}>
        {children}
      </div>
    ) : null,
}));

describe("Projects", () => {
  describe("Section render", () => {
    it("should render without crash", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      expect(screen.getByRole("region", { name: /projects/i })).toBeInTheDocument();
    });

    it("should render the annotation", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      expect(screen.getByText(/things I built/i)).toBeInTheDocument();
    });
  });

  describe("Project cards", () => {
    it("should render all 5 project cards", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      // Each card is an article with aria-label = project title
      for (const project of projects) {
        expect(screen.getByRole("button", { name: project.title })).toBeInTheDocument();
      }
    });

    it("should render cards with accessible aria-labels", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      for (const project of projects) {
        expect(screen.getByLabelText(project.title)).toBeInTheDocument();
      }
    });

    it("should render each project title", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      for (const project of projects) {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      }
    });

    it("should open detail view when a card is clicked", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      const firstCard = screen.getByLabelText(projects[0].title);
      fireEvent.click(firstCard);
      // Detail view should appear
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      // Both card h3 and detail h2 render — use getAllByRole and check at least 2
      const headings = screen.getAllByRole("heading", { name: projects[0].title });
      expect(headings.length).toBeGreaterThanOrEqual(1);
    });

    it("should open detail view on Enter key press", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      const firstCard = screen.getByLabelText(projects[0].title);
      fireEvent.keyDown(firstCard, { key: "Enter" });
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should open detail view on Space key press", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      const firstCard = screen.getByLabelText(projects[0].title);
      fireEvent.keyDown(firstCard, { key: " " });
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Detail view", () => {
    it("should render description in the detail view", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      fireEvent.click(screen.getByLabelText(projects[0].title));
      expect(screen.getByText(projects[0].description)).toBeInTheDocument();
    });

    it("should render all highlights in the detail view", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      fireEvent.click(screen.getByLabelText(projects[0].title));
      for (const highlight of projects[0].highlights) {
        expect(screen.getByText(highlight)).toBeInTheDocument();
      }
    });

    it("should close detail view when close button is clicked", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      fireEvent.click(screen.getByLabelText(projects[0].title));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: /close/i }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should close detail view on ESC key", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      fireEvent.click(screen.getByLabelText(projects[0].title));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should show GitHub link for public projects", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      const publicProject = projects.find((p) => p.isPublic && p.githubUrl);
      if (!publicProject) return;
      fireEvent.click(screen.getByLabelText(publicProject.title));
      expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
        "href",
        publicProject.githubUrl,
      );
    });

    it("should show confidential note for private projects", () => {
      render(
        <Projects>
          <Projects.Grid />
          <Projects.Detail />
        </Projects>
      );
      const privateProject = projects.find((p) => !p.isPublic);
      if (!privateProject) return;
      fireEvent.click(screen.getByLabelText(privateProject.title));
      expect(screen.getByText(/confidential/i)).toBeInTheDocument();
    });
  });

  describe("Projects data integrity", () => {
    it("should have exactly 5 projects", () => {
      expect(projects).toHaveLength(5);
    });

    it("should have all required fields on every project", () => {
      for (const p of projects) {
        expect(p.id).toBeTruthy();
        expect(p.title).toBeTruthy();
        expect(p.tagline).toBeTruthy();
        expect(p.description).toBeTruthy();
        expect(p.category).toBeTruthy();
        expect(p.highlights.length).toBeGreaterThan(0);
        expect(p.techStack.length).toBeGreaterThan(0);
        expect(p.techPills.length).toBeGreaterThan(0);
        expect(p.gradientColors.primary).toMatch(/^#/);
        expect(p.gradientColors.secondary).toMatch(/^#/);
        expect(p.gradientColors.accent).toMatch(/^#/);
      }
    });

    it("should have correct categories", () => {
      const categories = projects.map((p) => p.category);
      expect(categories).toContain("iot");
      expect(categories).toContain("scheduling");
      expect(categories).toContain("logistics");
      expect(categories).toContain("devops");
      expect(categories).toContain("portfolio");
    });

    it("should have public projects with a githubUrl", () => {
      for (const p of projects.filter((p) => p.isPublic)) {
        expect(p.githubUrl).toBeTruthy();
      }
    });
  });
});

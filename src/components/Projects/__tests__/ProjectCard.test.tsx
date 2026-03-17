import { projects } from "@/data/projects";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "../ProjectCard";

describe("ProjectCard", () => {
  const testProject = projects[0];

  it("should render project title", () => {
    render(<ProjectCard project={testProject} />);
    expect(screen.getByText(testProject.title)).toBeInTheDocument();
  });

  it("should render project tagline", () => {
    render(<ProjectCard project={testProject} />);
    expect(screen.getByText(testProject.tagline)).toBeInTheDocument();
  });

  it("should render category badge", () => {
    render(<ProjectCard project={testProject} />);
    expect(screen.getByText(testProject.category)).toBeInTheDocument();
  });

  it("should render tech pills (max 3 + overflow)", () => {
    render(<ProjectCard project={testProject} />);
    const firstThreePills = testProject.techPills.slice(0, 3);
    for (const pill of firstThreePills) {
      expect(screen.getByText(pill)).toBeInTheDocument();
    }
  });

  it("should render overflow count when more than 3 tech items", () => {
    render(<ProjectCard project={testProject} />);
    const overflow = testProject.tech.length - 3;
    if (overflow > 0) {
      expect(screen.getByText(`+${overflow}`)).toBeInTheDocument();
    }
  });

  it("should have article element with aria-label", () => {
    render(<ProjectCard project={testProject} />);
    const article = screen.getByLabelText(testProject.title);
    expect(article).toBeInTheDocument();
    expect(article.tagName).toBe("ARTICLE");
  });

  it("should have aria-label for accessibility", () => {
    render(<ProjectCard project={testProject} />);
    const article = screen.getByLabelText(testProject.title);
    expect(article).toHaveAttribute("aria-label", testProject.title);
  });

  it("should contain SVG artwork", () => {
    const { container } = render(<ProjectCard project={testProject} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render all 5 project cards", () => {
    for (const project of projects) {
      const { unmount } = render(<ProjectCard project={project} />);
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.category)).toBeInTheDocument();
      unmount();
    }
  });

  it("should apply custom className", () => {
    render(<ProjectCard project={testProject} className="custom-class" />);
    const article = screen.getByLabelText(testProject.title);
    expect(article.className).toContain("custom-class");
  });

  it("should have gradient border element for hover effect", () => {
    const { container } = render(<ProjectCard project={testProject} />);
    const gradientBorder = container.querySelector(".-inset-px");
    expect(gradientBorder).toBeInTheDocument();
  });
});

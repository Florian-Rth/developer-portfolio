import { projects } from "@/data/projects";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectIcon } from "../ProjectIcon";

describe("ProjectIcon", () => {
  it("should render an SVG artwork for each project", () => {
    for (const project of projects) {
      const { container, unmount } = render(<ProjectIcon project={project} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      unmount();
    }
  });

  it("should render SVGs with gradient defs", () => {
    for (const project of projects) {
      const { container, unmount } = render(<ProjectIcon project={project} />);
      const defs = container.querySelector("defs");
      expect(defs).toBeInTheDocument();
      const gradients = container.querySelectorAll("linearGradient, radialGradient");
      expect(gradients.length).toBeGreaterThan(0);
      unmount();
    }
  });

  it("should be wrapped in a centered absolute container", () => {
    const { container } = render(<ProjectIcon project={projects[0]} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("absolute");
    expect(wrapper.className).toContain("inset-0");
    expect(wrapper.className).toContain("flex");
    expect(wrapper.className).toContain("items-center");
    expect(wrapper.className).toContain("justify-center");
  });

  it("should have pointer-events-none to not interfere with card clicks", () => {
    const { container } = render(<ProjectIcon project={projects[0]} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("pointer-events-none");
  });

  it("should render aria-hidden SVGs since they are decorative", () => {
    for (const project of projects) {
      const { container, unmount } = render(<ProjectIcon project={project} />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
      unmount();
    }
  });

  it("should contain animated elements with CSS animation classes", () => {
    for (const project of projects) {
      const { container, unmount } = render(<ProjectIcon project={project} />);
      const animatedElements = container.querySelectorAll('[class*="art-"]');
      expect(animatedElements.length).toBeGreaterThan(0);
      unmount();
    }
  });

  it("should return null for unknown project id", () => {
    const unknown = {
      ...projects[0],
      id: "unknown-project",
    };
    const { container } = render(<ProjectIcon project={unknown} />);
    expect(container.firstElementChild).toBeNull();
  });
});

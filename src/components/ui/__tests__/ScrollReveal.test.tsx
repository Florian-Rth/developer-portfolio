import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollReveal } from "../ScrollReveal";

describe("ScrollReveal", () => {
  describe("rendering", () => {
    it("should render children", () => {
      render(<ScrollReveal>Test Content</ScrollReveal>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should apply scroll-reveal class by default", () => {
      const { container } = render(<ScrollReveal>Test Content</ScrollReveal>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("scroll-reveal");
    });

    it("should not have visible class initially", () => {
      const { container } = render(<ScrollReveal>Test Content</ScrollReveal>);
      const element = container.firstChild as HTMLElement;
      expect(element).not.toHaveClass("visible");
    });

    it("should render as div element", () => {
      const { container } = render(<ScrollReveal>Test Content</ScrollReveal>);
      expect(container.firstChild?.nodeName).toBe("DIV");
    });
  });

  describe("delay prop", () => {
    it("should apply transitionDelay style when delay is provided", () => {
      const { container } = render(<ScrollReveal delay={150}>Test Content</ScrollReveal>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveStyle({ transitionDelay: "150ms" });
    });

    it("should not apply transitionDelay when delay is 0", () => {
      const { container } = render(<ScrollReveal delay={0}>Test Content</ScrollReveal>);
      const element = container.firstChild as HTMLElement;
      expect(element.style.transitionDelay).toBe("");
    });
  });

  describe("className prop", () => {
    it("should merge custom className with scroll-reveal", () => {
      const { container } = render(
        <ScrollReveal className="custom-class">Test Content</ScrollReveal>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("scroll-reveal");
      expect(element).toHaveClass("custom-class");
    });
  });
});

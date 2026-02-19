import { ThemeProvider } from "@components/ThemeProvider";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { About } from "../index";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider defaultTheme="light">{ui}</ThemeProvider>);
};

describe("About", () => {
  describe("Main Component", () => {
    it("should render the about section", () => {
      renderWithTheme(
        <About>
          <About.Watermark />
        </About>,
      );
      expect(screen.getByRole("region", { name: "About" })).toBeInTheDocument();
    });

    it("should have correct id attribute", () => {
      renderWithTheme(
        <About>
          <About.Watermark />
        </About>,
      );
      expect(screen.getByRole("region", { name: "About" })).toHaveAttribute("id", "about");
    });

    it("should render children", () => {
      renderWithTheme(
        <About>
          <span>Test Content</span>
        </About>,
      );
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About className="custom-class">
          <About.Watermark />
        </About>,
      );
      expect(screen.getByRole("region", { name: "About" })).toHaveClass("custom-class");
    });
  });

  describe("About.Watermark", () => {
    it("should render desktop watermark text", () => {
      renderWithTheme(
        <About>
          <About.Watermark />
        </About>,
      );
      expect(screen.getByText("ABOUT")).toBeInTheDocument();
    });

    it("should render mobile watermark text", () => {
      renderWithTheme(
        <About>
          <About.Watermark />
        </About>,
      );
      expect(screen.getByText("about")).toBeInTheDocument();
    });

    it("should be hidden from accessibility tree", () => {
      renderWithTheme(
        <About>
          <About.Watermark />
        </About>,
      );
      const desktopWatermark = screen.getByText("ABOUT");
      const mobileWatermark = screen.getByText("about");
      expect(desktopWatermark).toHaveAttribute("aria-hidden", "true");
      expect(mobileWatermark).toHaveAttribute("aria-hidden", "true");
    });

    it("should have user-select none class", () => {
      renderWithTheme(
        <About>
          <About.Watermark />
        </About>,
      );
      const desktopWatermark = screen.getByText("ABOUT");
      const mobileWatermark = screen.getByText("about");
      expect(desktopWatermark).toHaveClass("select-none");
      expect(mobileWatermark).toHaveClass("select-none");
    });

    it("should have pointer-events none class", () => {
      renderWithTheme(
        <About>
          <About.Watermark />
        </About>,
      );
      const desktopWatermark = screen.getByText("ABOUT");
      const mobileWatermark = screen.getByText("about");
      expect(desktopWatermark).toHaveClass("pointer-events-none");
      expect(mobileWatermark).toHaveClass("pointer-events-none");
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.Watermark className="custom-watermark" />
        </About>,
      );
      const container = screen.getByText("ABOUT").parentElement;
      expect(container).toHaveClass("custom-watermark");
    });
  });

  describe("About.PhotoCard", () => {
    it("should render photo card container", () => {
      renderWithTheme(
        <About>
          <About.PhotoCard src="/test.jpg" alt="Test photo" />
        </About>,
      );
      expect(screen.getByRole("img", { name: "Test photo" })).toBeInTheDocument();
    });

    it("should render with correct alt text", () => {
      renderWithTheme(
        <About>
          <About.PhotoCard src="/headshot.jpg" alt="Florian Rätsch" />
        </About>,
      );
      expect(screen.getByRole("img", { name: "Florian Rätsch" })).toBeInTheDocument();
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.PhotoCard src="/test.jpg" alt="Test" className="custom-card" />
        </About>,
      );
      const card = screen.getByTestId("photo-card");
      expect(card).toHaveClass("custom-card");
    });

    it("should render children (for annotations)", () => {
      renderWithTheme(
        <About>
          <About.PhotoCard src="/test.jpg" alt="Test">
            <span>Annotation child</span>
          </About.PhotoCard>
        </About>,
      );
      expect(screen.getByText("Annotation child")).toBeInTheDocument();
    });
  });

  describe("About.Annotation", () => {
    it("should render annotation text", () => {
      renderWithTheme(
        <About>
          <About.Annotation text="This is me! 👋" />
        </About>,
      );
      expect(screen.getByText("This is me! 👋")).toBeInTheDocument();
    });

    it("should be hidden from accessibility tree", () => {
      renderWithTheme(
        <About>
          <About.Annotation text="Test annotation" />
        </About>,
      );
      const annotation = screen.getByText("Test annotation").closest("div");
      expect(annotation).toHaveAttribute("aria-hidden", "true");
    });

    it("should have pointer-events none class", () => {
      renderWithTheme(
        <About>
          <About.Annotation text="Test annotation" />
        </About>,
      );
      const annotation = screen.getByText("Test annotation").closest("div");
      expect(annotation).toHaveClass("pointer-events-none");
    });

    it("should render SVG arrow", () => {
      renderWithTheme(
        <About>
          <About.Annotation text="Test" arrowDirection="up" />
        </About>,
      );
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.Annotation text="Test" className="custom-annotation" />
        </About>,
      );
      const annotation = screen.getByText("Test").closest("div");
      expect(annotation).toHaveClass("custom-annotation");
    });

    it("should apply rotation style", () => {
      renderWithTheme(
        <About>
          <About.Annotation text="Rotated" rotation={-6} />
        </About>,
      );
      const annotation = screen.getByText("Rotated").closest("div");
      expect(annotation).toHaveStyle({ transform: "rotate(-6deg)" });
    });
  });

  describe("About.PullQuote", () => {
    it("should render quote text", () => {
      renderWithTheme(
        <About>
          <About.PullQuote>Code is my canvas, pixels are my paint.</About.PullQuote>
        </About>,
      );
      expect(screen.getByText("Code is my canvas, pixels are my paint.")).toBeInTheDocument();
    });

    it("should render as blockquote element", () => {
      renderWithTheme(
        <About>
          <About.PullQuote>Test quote</About.PullQuote>
        </About>,
      );
      const quote = screen.getByRole("blockquote");
      expect(quote).toBeInTheDocument();
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.PullQuote className="custom-quote">Test</About.PullQuote>
        </About>,
      );
      const quote = screen.getByRole("blockquote");
      expect(quote).toHaveClass("custom-quote");
    });

    it("should include BrushUnderline SVG", () => {
      renderWithTheme(
        <About>
          <About.PullQuote>Test</About.PullQuote>
        </About>,
      );
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("About.BrushUnderline", () => {
    it("should render SVG element", () => {
      renderWithTheme(
        <About>
          <About.BrushUnderline />
        </About>,
      );
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should be hidden from accessibility tree", () => {
      renderWithTheme(
        <About>
          <About.BrushUnderline />
        </About>,
      );
      const svg = document.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.BrushUnderline className="custom-underline" />
        </About>,
      );
      const container = document.querySelector("svg")?.parentElement;
      expect(container).toHaveClass("custom-underline");
    });

    it("should contain gradient definition", () => {
      renderWithTheme(
        <About>
          <About.BrushUnderline />
        </About>,
      );
      const gradient = document.querySelector("linearGradient");
      expect(gradient).toBeInTheDocument();
    });
  });

  describe("About.Story", () => {
    it("should render the heading 'My Story.'", () => {
      renderWithTheme(
        <About>
          <About.Story>Test content</About.Story>
        </About>,
      );
      expect(screen.getByRole("heading", { name: "My Story." })).toBeInTheDocument();
    });

    it("should render children content", () => {
      renderWithTheme(
        <About>
          <About.Story>This is my story content.</About.Story>
        </About>,
      );
      expect(screen.getByText("This is my story content.")).toBeInTheDocument();
    });

    it("should render as an article element", () => {
      renderWithTheme(
        <About>
          <About.Story>Content</About.Story>
        </About>,
      );
      expect(screen.getByRole("article")).toBeInTheDocument();
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.Story className="custom-story">Content</About.Story>
        </About>,
      );
      expect(screen.getByRole("article")).toHaveClass("custom-story");
    });

    it("should render heading with correct classes", () => {
      renderWithTheme(
        <About>
          <About.Story>Content</About.Story>
        </About>,
      );
      const heading = screen.getByRole("heading", { name: "My Story." });
      expect(heading).toHaveClass("font-bold");
      expect(heading).toHaveClass("text-text");
    });
  });

  describe("About.TextHighlight", () => {
    it("should render highlighted text", () => {
      renderWithTheme(
        <About>
          <About.TextHighlight>creative developer</About.TextHighlight>
        </About>,
      );
      expect(screen.getByText("creative developer")).toBeInTheDocument();
    });

    it("should render as a mark element", () => {
      renderWithTheme(
        <About>
          <About.TextHighlight>highlighted text</About.TextHighlight>
        </About>,
      );
      const mark = screen.getByText("highlighted text");
      expect(mark.tagName).toBe("MARK");
    });

    it("should have font-semibold class", () => {
      renderWithTheme(
        <About>
          <About.TextHighlight>bold text</About.TextHighlight>
        </About>,
      );
      const mark = screen.getByText("bold text");
      expect(mark).toHaveClass("font-semibold");
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.TextHighlight className="custom-highlight">text</About.TextHighlight>
        </About>,
      );
      const mark = screen.getByText("text");
      expect(mark).toHaveClass("custom-highlight");
    });

    it("should have brush stroke background image style", () => {
      renderWithTheme(
        <About>
          <About.TextHighlight>styled text</About.TextHighlight>
        </About>,
      );
      const mark = screen.getByText("styled text");
      expect(mark).toHaveStyle({ backgroundSize: "100% 40%" });
      expect(mark).toHaveStyle({ backgroundPosition: "0 90%" });
    });
  });

  describe("About.CodeSnippet", () => {
    it("should render the code snippet container", () => {
      renderWithTheme(
        <About>
          <About.CodeSnippet />
        </About>,
      );
      expect(screen.getByTestId("code-snippet")).toBeInTheDocument();
    });

    it("should render the title bar with filename", () => {
      renderWithTheme(
        <About>
          <About.CodeSnippet />
        </About>,
      );
      expect(screen.getByText("AboutMe.tsx")).toBeInTheDocument();
    });

    it("should render the three macOS window dots", () => {
      renderWithTheme(
        <About>
          <About.CodeSnippet />
        </About>,
      );
      const container = screen.getByTestId("code-snippet");
      const dots = container.querySelectorAll(".rounded-full");
      expect(dots.length).toBe(3);
    });

    it("should have dark background color", () => {
      renderWithTheme(
        <About>
          <About.CodeSnippet />
        </About>,
      );
      const container = screen.getByTestId("code-snippet");
      expect(container).toHaveStyle({ backgroundColor: "#1E1B19" });
    });

    it("should render code content with keywords", () => {
      renderWithTheme(
        <About>
          <About.CodeSnippet />
        </About>,
      );
      expect(screen.getByText("import")).toBeInTheDocument();
      expect(screen.getAllByText("const").length).toBeGreaterThan(0);
      expect(screen.getByText("return")).toBeInTheDocument();
    });

    it("should render code content with strings", () => {
      renderWithTheme(
        <About>
          <About.CodeSnippet />
        </About>,
      );
      expect(screen.getByText("'Florian'")).toBeInTheDocument();
      expect(screen.getByText("'Creative Developer'")).toBeInTheDocument();
    });

    it("should render component name AboutMe", () => {
      renderWithTheme(
        <About>
          <About.CodeSnippet />
        </About>,
      );
      expect(screen.getAllByText("AboutMe").length).toBeGreaterThan(0);
    });

    it("should render the comment text", () => {
      renderWithTheme(
        <About>
          <About.CodeSnippet />
        </About>,
      );
      expect(screen.getByText("// My digital persona")).toBeInTheDocument();
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.CodeSnippet className="custom-code" />
        </About>,
      );
      expect(screen.getByTestId("code-snippet")).toHaveClass("custom-code");
    });

    it("should have box-shadow style", () => {
      renderWithTheme(
        <About>
          <About.CodeSnippet />
        </About>,
      );
      const container = screen.getByTestId("code-snippet");
      expect(container).toHaveStyle({ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" });
    });
  });

  describe("About.Counter", () => {
    it("should render the counter container", () => {
      renderWithTheme(
        <About>
          <About.Counter value={3} label="Jahre Experience" />
        </About>,
      );
      expect(screen.getByTestId("counter")).toBeInTheDocument();
    });

    it("should render the label text", () => {
      renderWithTheme(
        <About>
          <About.Counter value={3} label="Jahre Experience" />
        </About>,
      );
      expect(screen.getByText("Jahre Experience")).toBeInTheDocument();
    });

    it("should render initial count of 0", () => {
      renderWithTheme(
        <About>
          <About.Counter value={3} label="Test" />
        </About>,
      );
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("should render suffix with initial opacity 0", () => {
      renderWithTheme(
        <About>
          <About.Counter value={3} suffix="+" label="Test" />
        </About>,
      );
      const suffix = screen.getByText("+");
      expect(suffix).toBeInTheDocument();
      expect(suffix).toHaveClass("opacity-0");
    });

    it("should have oval border styling", () => {
      renderWithTheme(
        <About>
          <About.Counter value={3} label="Test" />
        </About>,
      );
      const container = screen.getByTestId("counter");
      expect(container).toHaveClass("border-2");
      expect(container).toHaveClass("border-muted");
      expect(container).toHaveClass("rounded-[50%]");
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.Counter value={3} label="Test" className="custom-counter" />
        </About>,
      );
      expect(screen.getByTestId("counter")).toHaveClass("custom-counter");
    });

    it("should render label with uppercase class", () => {
      renderWithTheme(
        <About>
          <About.Counter value={3} label="Test Label" />
        </About>,
      );
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("uppercase");
    });

    it("should have correct dimensions", () => {
      renderWithTheme(
        <About>
          <About.Counter value={3} label="Test" />
        </About>,
      );
      const container = screen.getByTestId("counter");
      expect(container).toHaveClass("w-[160px]");
      expect(container).toHaveClass("h-[100px]");
    });

    it("should use default suffix of + when not specified", () => {
      renderWithTheme(
        <About>
          <About.Counter value={5} label="Test" />
        </About>,
      );
      expect(screen.getByText("+")).toBeInTheDocument();
    });

    it("should render custom suffix when provided", () => {
      renderWithTheme(
        <About>
          <About.Counter value={5} suffix="%" label="Test" />
        </About>,
      );
      expect(screen.getByText("%")).toBeInTheDocument();
    });
  });

  describe("About.BrushDivider", () => {
    it("should render the brush divider container", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider />
        </About>,
      );
      expect(screen.getByTestId("brush-divider")).toBeInTheDocument();
    });

    it("should render SVG element", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider />
        </About>,
      );
      const container = screen.getByTestId("brush-divider");
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should be hidden from accessibility tree", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider />
        </About>,
      );
      const container = screen.getByTestId("brush-divider");
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("should have full width class", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider />
        </About>,
      );
      const container = screen.getByTestId("brush-divider");
      expect(container).toHaveClass("w-full");
    });

    it("should have responsive margin-top classes", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider />
        </About>,
      );
      const container = screen.getByTestId("brush-divider");
      expect(container).toHaveClass("mt-10");
      expect(container).toHaveClass("lg:mt-20");
    });

    it("should have col-span-full class", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider />
        </About>,
      );
      const container = screen.getByTestId("brush-divider");
      expect(container).toHaveClass("col-span-full");
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider className="custom-divider" />
        </About>,
      );
      const container = screen.getByTestId("brush-divider");
      expect(container).toHaveClass("custom-divider");
    });

    it("should contain gradient definition", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider />
        </About>,
      );
      const gradient = document.querySelector("#brushDividerGradient");
      expect(gradient).toBeInTheDocument();
    });

    it("should have SVG with preserveAspectRatio none", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider />
        </About>,
      );
      const container = screen.getByTestId("brush-divider");
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("preserveAspectRatio", "none");
    });

    it("should have opacity classes for light and dark modes", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider />
        </About>,
      );
      const container = screen.getByTestId("brush-divider");
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("opacity-80");
      expect(svg).toHaveClass("dark:opacity-60");
    });

    it("should have multiple path elements for organic wave effect", () => {
      renderWithTheme(
        <About>
          <About.BrushDivider />
        </About>,
      );
      const container = screen.getByTestId("brush-divider");
      const paths = container.querySelectorAll("path");
      expect(paths.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("About.InfoText", () => {
    it("should render info text content", () => {
      renderWithTheme(
        <About>
          <About.InfoText>Personal info text here.</About.InfoText>
        </About>,
      );
      expect(screen.getByText("Personal info text here.")).toBeInTheDocument();
    });

    it("should render as a paragraph element", () => {
      renderWithTheme(
        <About>
          <About.InfoText>Info text</About.InfoText>
        </About>,
      );
      const paragraph = screen.getByText("Info text");
      expect(paragraph.tagName).toBe("P");
    });

    it("should have text-secondary color class", () => {
      renderWithTheme(
        <About>
          <About.InfoText>Styled text</About.InfoText>
        </About>,
      );
      const paragraph = screen.getByText("Styled text");
      expect(paragraph).toHaveClass("text-text-secondary");
    });

    it("should have max-width class", () => {
      renderWithTheme(
        <About>
          <About.InfoText>Limited width text</About.InfoText>
        </About>,
      );
      const paragraph = screen.getByText("Limited width text");
      expect(paragraph).toHaveClass("max-w-[480px]");
    });

    it("should accept custom className", () => {
      renderWithTheme(
        <About>
          <About.InfoText className="custom-info">Custom text</About.InfoText>
        </About>,
      );
      const paragraph = screen.getByText("Custom text");
      expect(paragraph).toHaveClass("custom-info");
    });

    it("should have DM Sans font class", () => {
      renderWithTheme(
        <About>
          <About.InfoText>Font test</About.InfoText>
        </About>,
      );
      const paragraph = screen.getByText("Font test");
      expect(paragraph).toHaveClass("font-dm-sans");
    });
  });

  describe("Composition", () => {
    it("should render a composed About section with Watermark", () => {
      renderWithTheme(
        <About>
          <About.Watermark />
          <div>Content goes here</div>
        </About>,
      );

      expect(screen.getByRole("region", { name: "About" })).toBeInTheDocument();
      expect(screen.getByText("ABOUT")).toBeInTheDocument();
      expect(screen.getByText("about")).toBeInTheDocument();
      expect(screen.getByText("Content goes here")).toBeInTheDocument();
    });

    it("should render PhotoCard with Annotation", () => {
      renderWithTheme(
        <About>
          <About.Watermark />
          <About.PhotoCard src="/headshot.jpg" alt="Florian Rätsch">
            <About.Annotation text="This is me! 👋" rotation={-6} arrowDirection="up" />
          </About.PhotoCard>
        </About>,
      );

      expect(screen.getByRole("img", { name: "Florian Rätsch" })).toBeInTheDocument();
      expect(screen.getByText("This is me! 👋")).toBeInTheDocument();
    });

    it("should render PullQuote with BrushUnderline", () => {
      renderWithTheme(
        <About>
          <About.PullQuote>Code is my canvas, pixels are my paint.</About.PullQuote>
        </About>,
      );

      expect(screen.getByText("Code is my canvas, pixels are my paint.")).toBeInTheDocument();
      expect(document.querySelector("svg")).toBeInTheDocument();
    });

    it("should render Story with TextHighlight", () => {
      renderWithTheme(
        <About>
          <About.Story>
            I'm a passionate <About.TextHighlight>creative developer</About.TextHighlight> based in
            Leipzig.
          </About.Story>
        </About>,
      );

      expect(screen.getByRole("heading", { name: "My Story." })).toBeInTheDocument();
      expect(screen.getByText("creative developer")).toBeInTheDocument();
      expect(screen.getByText("creative developer").tagName).toBe("MARK");
    });
  });
});

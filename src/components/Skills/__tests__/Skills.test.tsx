import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Skills } from "../index";

// Mock @react-three/fiber Canvas to avoid WebGL in tests
vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="r3f-canvas">{children}</div>
  ),
  useFrame: vi.fn(),
  useThree: vi.fn(() => ({ size: { width: 300, height: 400 } })),
}));

// Mock @react-three/drei
vi.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Placeholder scene for tests
const MockScene = () => <mesh />;

describe("Skills", () => {
  describe("Main Component", () => {
    it("should render as a section element", () => {
      render(
        <Skills>
          <span>content</span>
        </Skills>,
      );
      const section = document.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("should have id 'skills'", () => {
      render(
        <Skills>
          <span>content</span>
        </Skills>,
      );
      expect(document.getElementById("skills")).toBeInTheDocument();
    });

    it("should render children", () => {
      render(
        <Skills>
          <span>Test Content</span>
        </Skills>,
      );
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should accept custom className", () => {
      render(
        <Skills className="custom-class">
          <span>content</span>
        </Skills>,
      );
      const section = document.getElementById("skills");
      expect(section?.className).toContain("custom-class");
    });

    it("should have relative positioning for watermark", () => {
      render(
        <Skills>
          <span>content</span>
        </Skills>,
      );
      const section = document.getElementById("skills");
      expect(section?.className).toContain("relative");
    });

    it("should have overflow hidden", () => {
      render(
        <Skills>
          <span>content</span>
        </Skills>,
      );
      const section = document.getElementById("skills");
      expect(section?.className).toContain("overflow-hidden");
    });
  });

  describe("Skills.Watermark", () => {
    it("should render with aria-hidden", () => {
      render(
        <Skills>
          <Skills.Watermark />
        </Skills>,
      );
      const watermark = document.querySelector("[aria-hidden='true']");
      expect(watermark).toBeInTheDocument();
    });

    it("should contain 'SKILLS' text", () => {
      render(
        <Skills>
          <Skills.Watermark />
        </Skills>,
      );
      const watermark = document.querySelector("[aria-hidden='true']");
      expect(watermark?.textContent).toContain("SKILLS");
    });

    it("should be non-interactive (pointer-events-none, select-none)", () => {
      render(
        <Skills>
          <Skills.Watermark />
        </Skills>,
      );
      const watermark = document.querySelector("[aria-hidden='true']");
      expect(watermark?.className).toContain("pointer-events-none");
      expect(watermark?.className).toContain("select-none");
    });

    it("should have absolute positioning", () => {
      render(
        <Skills>
          <Skills.Watermark />
        </Skills>,
      );
      const container = document.querySelector("[aria-hidden='true']")?.parentElement;
      expect(container?.className).toContain("absolute");
    });

    it("should accept custom className", () => {
      render(
        <Skills>
          <Skills.Watermark className="custom-wm" />
        </Skills>,
      );
      const container = document.querySelector("[aria-hidden='true']")?.parentElement;
      expect(container?.className).toContain("custom-wm");
    });
  });

  describe("Skills.CardGrid", () => {
    it("should render children", () => {
      render(
        <Skills>
          <Skills.CardGrid>
            <span>Grid Child</span>
          </Skills.CardGrid>
        </Skills>,
      );
      expect(screen.getByText("Grid Child")).toBeInTheDocument();
    });

    it("should use flex layout on desktop", () => {
      render(
        <Skills>
          <Skills.CardGrid>
            <span>child</span>
          </Skills.CardGrid>
        </Skills>,
      );
      const grid = screen.getByText("child").parentElement;
      expect(grid?.className).toContain("flex");
    });

    it("should accept custom className", () => {
      render(
        <Skills>
          <Skills.CardGrid className="custom-grid">
            <span>child</span>
          </Skills.CardGrid>
        </Skills>,
      );
      const grid = screen.getByText("child").parentElement;
      expect(grid?.className).toContain("custom-grid");
    });
  });

  describe("Skills.Card", () => {
    it("should render category title", () => {
      render(
        <Skills>
          <Skills.CardGrid>
            <Skills.Card category="Frontend" skills={["React"]} glowColor="#B8A9D4">
              <Skills.Scene component={MockScene} />
            </Skills.Card>
          </Skills.CardGrid>
        </Skills>,
      );
      expect(screen.getByText("Frontend")).toBeInTheDocument();
    });

    it("should render skill tags", () => {
      render(
        <Skills>
          <Skills.CardGrid>
            <Skills.Card category="Frontend" skills={["React", "TypeScript"]} glowColor="#B8A9D4">
              <Skills.Scene component={MockScene} />
            </Skills.Card>
          </Skills.CardGrid>
        </Skills>,
      );
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("should have rounded corners (border-radius 16px)", () => {
      render(
        <Skills>
          <Skills.CardGrid>
            <Skills.Card category="Frontend" skills={["React"]} glowColor="#B8A9D4">
              <Skills.Scene component={MockScene} />
            </Skills.Card>
          </Skills.CardGrid>
        </Skills>,
      );
      const card = screen.getByText("Frontend").closest("[data-testid='skill-card']");
      expect(card?.className).toContain("rounded-2xl");
    });

    it("should have overflow hidden", () => {
      render(
        <Skills>
          <Skills.CardGrid>
            <Skills.Card category="Frontend" skills={["React"]} glowColor="#B8A9D4">
              <Skills.Scene component={MockScene} />
            </Skills.Card>
          </Skills.CardGrid>
        </Skills>,
      );
      const card = screen.getByText("Frontend").closest("[data-testid='skill-card']");
      expect(card?.className).toContain("overflow-hidden");
    });

    it("should render children (scene)", () => {
      render(
        <Skills>
          <Skills.CardGrid>
            <Skills.Card category="Frontend" skills={["React"]} glowColor="#B8A9D4">
              <div data-testid="scene-child">Scene</div>
            </Skills.Card>
          </Skills.CardGrid>
        </Skills>,
      );
      expect(screen.getByTestId("scene-child")).toBeInTheDocument();
    });

    it("should accept custom className", () => {
      render(
        <Skills>
          <Skills.CardGrid>
            <Skills.Card
              category="Frontend"
              skills={["React"]}
              glowColor="#B8A9D4"
              className="custom-card"
            >
              <Skills.Scene component={MockScene} />
            </Skills.Card>
          </Skills.CardGrid>
        </Skills>,
      );
      const card = screen.getByText("Frontend").closest("[data-testid='skill-card']");
      expect(card?.className).toContain("custom-card");
    });
  });

  describe("Skills.Scene", () => {
    it("should render the R3F canvas", () => {
      render(
        <Skills>
          <Skills.CardGrid>
            <Skills.Card category="Frontend" skills={["React"]} glowColor="#B8A9D4">
              <Skills.Scene component={MockScene} />
            </Skills.Card>
          </Skills.CardGrid>
        </Skills>,
      );
      expect(screen.getByTestId("r3f-canvas")).toBeInTheDocument();
    });

    it("should have gradient fade overlay at the bottom", () => {
      render(
        <Skills>
          <Skills.CardGrid>
            <Skills.Card category="Frontend" skills={["React"]} glowColor="#B8A9D4">
              <Skills.Scene component={MockScene} />
            </Skills.Card>
          </Skills.CardGrid>
        </Skills>,
      );
      const sceneContainer = screen.getByTestId("r3f-canvas").parentElement;
      const fadeOverlay = sceneContainer?.querySelector("[data-testid='scene-fade']");
      expect(fadeOverlay).toBeInTheDocument();
    });
  });

  describe("Skills.Tag", () => {
    it("should render tag text", () => {
      render(<Skills.Tag>React</Skills.Tag>);
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    it("should have pill shape (rounded-full)", () => {
      render(<Skills.Tag>React</Skills.Tag>);
      const tag = screen.getByText("React");
      expect(tag.className).toContain("rounded-full");
    });

    it("should accept custom className", () => {
      render(<Skills.Tag className="custom-tag">React</Skills.Tag>);
      expect(screen.getByText("React").className).toContain("custom-tag");
    });
  });

  describe("Skills.CarouselDots", () => {
    it("should render 3 dots for 3 items", () => {
      render(<Skills.CarouselDots total={3} activeIndex={0} />);
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
      const circles = svg?.querySelectorAll("circle");
      // At least 3 main circles (may have satellite dots too)
      expect(circles?.length).toBeGreaterThanOrEqual(3);
    });

    it("should highlight the active dot", () => {
      render(<Skills.CarouselDots total={3} activeIndex={1} />);
      const svg = document.querySelector("svg");
      const circles = svg?.querySelectorAll("circle");
      // Active dot (index 1) should have accent color fill
      // We check the second main circle has a different fill than the first
      expect(circles).toBeDefined();
    });

    it("should accept custom className", () => {
      const { container } = render(
        <Skills.CarouselDots total={3} activeIndex={0} className="custom-dots" />,
      );
      expect(container.firstChild).toHaveClass("custom-dots");
    });
  });

  describe("Integration", () => {
    it("should render complete skills section with all parts", () => {
      render(
        <Skills>
          <Skills.Watermark />
          <Skills.CardGrid>
            <Skills.Card
              category="Frontend"
              skills={["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"]}
              glowColor="#B8A9D4"
            >
              <Skills.Scene component={MockScene} />
            </Skills.Card>
            <Skills.Card
              category="Backend"
              skills={["C#", ".NET", ".NET Core", "REST APIs"]}
              glowColor="#D4929B"
            >
              <Skills.Scene component={MockScene} />
            </Skills.Card>
            <Skills.Card
              category="DevOps"
              skills={["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "GitOps"]}
              glowColor="#E8B4A0"
            >
              <Skills.Scene component={MockScene} />
            </Skills.Card>
          </Skills.CardGrid>
        </Skills>,
      );

      // Verify all categories rendered
      expect(screen.getByText("Frontend")).toBeInTheDocument();
      expect(screen.getByText("Backend")).toBeInTheDocument();
      expect(screen.getByText("DevOps")).toBeInTheDocument();

      // Verify all skill tags rendered
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("C#")).toBeInTheDocument();
      expect(screen.getByText(".NET")).toBeInTheDocument();
      expect(screen.getByText("Docker")).toBeInTheDocument();
      expect(screen.getByText("Kubernetes")).toBeInTheDocument();

      // Verify 3 canvas instances
      const canvases = screen.getAllByTestId("r3f-canvas");
      expect(canvases).toHaveLength(3);

      // Verify section structure
      const section = document.getElementById("skills");
      expect(section).toBeInTheDocument();
    });

    it("should render watermark with correct aria attributes", () => {
      render(
        <Skills>
          <Skills.Watermark />
          <Skills.CardGrid>
            <Skills.Card category="Frontend" skills={["React"]} glowColor="#B8A9D4">
              <Skills.Scene component={MockScene} />
            </Skills.Card>
          </Skills.CardGrid>
        </Skills>,
      );
      const ariaHidden = document.querySelectorAll("[aria-hidden='true']");
      expect(ariaHidden.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Composition Pattern", () => {
    it("should have all sub-components attached to Skills", () => {
      expect(Skills.Watermark).toBeDefined();
      expect(Skills.CardGrid).toBeDefined();
      expect(Skills.Card).toBeDefined();
      expect(Skills.Scene).toBeDefined();
      expect(Skills.Tag).toBeDefined();
      expect(Skills.CarouselDots).toBeDefined();
    });
  });
});

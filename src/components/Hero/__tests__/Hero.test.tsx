import { ThemeProvider } from "@components/ThemeProvider";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { Hero } from "../index";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider defaultTheme="light">{ui}</ThemeProvider>);
};

describe("Hero", () => {
  describe("Main Component", () => {
    it("should render the hero section", () => {
      renderWithTheme(
        <Hero>
          <Hero.Greeting>Test Greeting</Hero.Greeting>
        </Hero>,
      );
      expect(screen.getByRole("region")).toBeInTheDocument();
    });

    it("should have correct aria-label", () => {
      renderWithTheme(
        <Hero>
          <Hero.Greeting>Test</Hero.Greeting>
        </Hero>,
      );
      expect(screen.getByRole("region", { name: "Hero" })).toBeInTheDocument();
    });
  });

  describe("Hero.Watermark", () => {
    it("should render watermark text", () => {
      renderWithTheme(
        <Hero>
          <Hero.Watermark>hello</Hero.Watermark>
        </Hero>,
      );
      expect(screen.getByText("hello")).toBeInTheDocument();
    });

    it("should be hidden from accessibility tree", () => {
      renderWithTheme(
        <Hero>
          <Hero.Watermark>hello</Hero.Watermark>
        </Hero>,
      );
      const watermark = screen.getByText("hello");
      expect(watermark).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Hero.Card", () => {
    it("should render card container with children", () => {
      renderWithTheme(
        <Hero>
          <Hero.Card>
            <span>Card Content</span>
          </Hero.Card>
        </Hero>,
      );
      expect(screen.getByText("Card Content")).toBeInTheDocument();
    });
  });

  describe("Hero.Tape", () => {
    it("should render tape decoration", () => {
      renderWithTheme(
        <Hero>
          <Hero.Tape />
        </Hero>,
      );
      const tape = document.querySelector('[data-testid="hero-tape"]');
      expect(tape).toBeInTheDocument();
    });

    it("should be hidden from accessibility tree", () => {
      renderWithTheme(
        <Hero>
          <Hero.Tape />
        </Hero>,
      );
      const tape = document.querySelector('[data-testid="hero-tape"]');
      expect(tape).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Hero.Greeting", () => {
    it("should render greeting text", () => {
      renderWithTheme(
        <Hero>
          <Hero.Greeting>Ich bin</Hero.Greeting>
        </Hero>,
      );
      expect(screen.getByText("Ich bin")).toBeInTheDocument();
    });
  });

  describe("Hero.Name", () => {
    it("should render name as heading", () => {
      renderWithTheme(
        <Hero>
          <Hero.Name>Florian Rätsch</Hero.Name>
        </Hero>,
      );
      expect(screen.getByRole("heading", { level: 1, name: "Florian Rätsch" })).toBeInTheDocument();
    });
  });

  describe("Hero.ScriptAccent", () => {
    it("should render script accent text", () => {
      renderWithTheme(
        <Hero>
          <Hero.ScriptAccent>FlorianRth</Hero.ScriptAccent>
        </Hero>,
      );
      expect(screen.getByText("FlorianRth")).toBeInTheDocument();
    });
  });

  describe("Hero.Tagline", () => {
    it("should render tagline text", () => {
      renderWithTheme(
        <Hero>
          <Hero.Tagline>Full Stack Developer</Hero.Tagline>
        </Hero>,
      );
      expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    });
  });

  describe("Hero.Actions", () => {
    it("should render action buttons container", () => {
      renderWithTheme(
        <Hero>
          <Hero.Actions>
            <button type="button">Test Button</button>
          </Hero.Actions>
        </Hero>,
      );
      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });
  });

  describe("Hero.PrimaryButton", () => {
    it("should render primary button with gradient", () => {
      renderWithTheme(
        <Hero>
          <Hero.PrimaryButton href="#contact">Contact Me</Hero.PrimaryButton>
        </Hero>,
      );
      expect(screen.getByRole("link", { name: "Contact Me" })).toBeInTheDocument();
    });

    it("should have correct href", () => {
      renderWithTheme(
        <Hero>
          <Hero.PrimaryButton href="#contact">Contact Me</Hero.PrimaryButton>
        </Hero>,
      );
      expect(screen.getByRole("link", { name: "Contact Me" })).toHaveAttribute("href", "#contact");
    });
  });

  describe("Hero.OutlineButton", () => {
    it("should render outline button", () => {
      renderWithTheme(
        <Hero>
          <Hero.OutlineButton href="#projects">View Projects</Hero.OutlineButton>
        </Hero>,
      );
      expect(screen.getByRole("link", { name: "View Projects" })).toBeInTheDocument();
    });

    it("should have correct href", () => {
      renderWithTheme(
        <Hero>
          <Hero.OutlineButton href="#projects">View Projects</Hero.OutlineButton>
        </Hero>,
      );
      expect(screen.getByRole("link", { name: "View Projects" })).toHaveAttribute(
        "href",
        "#projects",
      );
    });
  });

  describe("Hero.SectionDivider", () => {
    it("should render section divider", () => {
      renderWithTheme(
        <Hero>
          <Hero.SectionDivider />
        </Hero>,
      );
      const divider = document.querySelector('[data-testid="section-divider"]');
      expect(divider).toBeInTheDocument();
    });

    it("should be hidden from accessibility tree", () => {
      renderWithTheme(
        <Hero>
          <Hero.SectionDivider />
        </Hero>,
      );
      const divider = document.querySelector('[data-testid="section-divider"]');
      expect(divider).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Hero.Desktop", () => {
    it("should render desktop layout container", () => {
      renderWithTheme(
        <Hero>
          <Hero.Desktop>
            <span>Desktop Content</span>
          </Hero.Desktop>
        </Hero>,
      );
      expect(screen.getByText("Desktop Content")).toBeInTheDocument();
    });
  });

  describe("Hero.Mobile", () => {
    it("should render mobile layout container", () => {
      renderWithTheme(
        <Hero>
          <Hero.Mobile>
            <span>Mobile Content</span>
          </Hero.Mobile>
        </Hero>,
      );
      expect(screen.getByText("Mobile Content")).toBeInTheDocument();
    });
  });

  describe("Composition", () => {
    it("should render a fully composed Hero section", () => {
      renderWithTheme(
        <Hero>
          <Hero.Watermark>hello</Hero.Watermark>

          <Hero.Desktop>
            <Hero.Greeting>Ich bin</Hero.Greeting>
            <Hero.Name>Florian Rätsch</Hero.Name>
            <Hero.ScriptAccent>FlorianRth</Hero.ScriptAccent>
            <Hero.Tagline>Full Stack Web Developer</Hero.Tagline>
            <Hero.Actions>
              <Hero.PrimaryButton href="#contact">Kontakt</Hero.PrimaryButton>
              <Hero.OutlineButton href="#projects">Projekte</Hero.OutlineButton>
            </Hero.Actions>
          </Hero.Desktop>

          <Hero.Mobile>
            <Hero.Card>
              <Hero.Tape />
              <Hero.Greeting>Ich bin</Hero.Greeting>
              <Hero.Name>Florian Rätsch</Hero.Name>
              <Hero.ScriptAccent>FlorianRth</Hero.ScriptAccent>
              <Hero.Tagline>Full Stack Web Developer</Hero.Tagline>
              <Hero.Actions>
                <Hero.PrimaryButton href="#contact">Kontakt</Hero.PrimaryButton>
                <Hero.OutlineButton href="#projects">Projekte</Hero.OutlineButton>
              </Hero.Actions>
            </Hero.Card>
          </Hero.Mobile>

          <Hero.SectionDivider />
        </Hero>,
      );

      expect(screen.getAllByText("hello")).toHaveLength(1);
      expect(screen.getAllByText("Ich bin")).toHaveLength(2);
      expect(screen.getAllByRole("heading", { level: 1, name: "Florian Rätsch" })).toHaveLength(2);
      expect(screen.getAllByText("FlorianRth")).toHaveLength(2);
      expect(screen.getAllByText("Full Stack Web Developer")).toHaveLength(2);
      expect(screen.getAllByRole("link", { name: "Kontakt" })).toHaveLength(2);
      expect(screen.getAllByRole("link", { name: "Projekte" })).toHaveLength(2);
    });
  });
});

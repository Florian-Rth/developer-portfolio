import { ThemeProvider } from "@components/ThemeProvider";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { Contact } from "../index";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider defaultTheme="light">{ui}</ThemeProvider>);
};

describe("Contact", () => {
  describe("Main Component", () => {
    it("should render the contact section", () => {
      renderWithTheme(
        <Contact>
          <span>Content</span>
        </Contact>,
      );
      expect(screen.getByRole("region")).toBeInTheDocument();
    });

    it("should have correct id", () => {
      renderWithTheme(
        <Contact>
          <span>Content</span>
        </Contact>,
      );
      expect(document.getElementById("contact")).toBeInTheDocument();
    });

    it("should have correct aria-label", () => {
      renderWithTheme(
        <Contact>
          <span>Content</span>
        </Contact>,
      );
      expect(screen.getByRole("region", { name: "Contact" })).toBeInTheDocument();
    });
  });

  describe("Contact.Headline", () => {
    it("should render an h2 heading", () => {
      renderWithTheme(
        <Contact>
          <Contact.Headline>Let's Build Something</Contact.Headline>
        </Contact>,
      );
      expect(
        screen.getByRole("heading", { level: 2, name: "Let's Build Something" }),
      ).toBeInTheDocument();
    });
  });

  describe("Contact.Body", () => {
    it("should render body text", () => {
      renderWithTheme(
        <Contact>
          <Contact.Body>Open to opportunities</Contact.Body>
        </Contact>,
      );
      expect(screen.getByText("Open to opportunities")).toBeInTheDocument();
    });
  });

  describe("Contact.ScriptAccent", () => {
    it("should render accent text", () => {
      renderWithTheme(
        <Contact>
          <Contact.ScriptAccent>let's talk</Contact.ScriptAccent>
        </Contact>,
      );
      expect(screen.getByText("let's talk")).toBeInTheDocument();
    });

    it("should be hidden from accessibility tree", () => {
      renderWithTheme(
        <Contact>
          <Contact.ScriptAccent>let's talk</Contact.ScriptAccent>
        </Contact>,
      );
      expect(screen.getByText("let's talk")).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Contact.Card", () => {
    it("should render card with children", () => {
      renderWithTheme(
        <Contact>
          <Contact.Card>
            <span>Card Content</span>
          </Contact.Card>
        </Contact>,
      );
      expect(screen.getByText("Card Content")).toBeInTheDocument();
    });
  });

  describe("Contact.TopicChips", () => {
    it("should render children", () => {
      renderWithTheme(
        <Contact>
          <Contact.TopicChips>
            <span>Chip 1</span>
          </Contact.TopicChips>
        </Contact>,
      );
      expect(screen.getByText("Chip 1")).toBeInTheDocument();
    });
  });

  describe("Contact.Chip", () => {
    it("should render chip text", () => {
      renderWithTheme(
        <Contact>
          <Contact.Chip>Project Inquiry</Contact.Chip>
        </Contact>,
      );
      expect(screen.getByText("Project Inquiry")).toBeInTheDocument();
    });

    it("should render as anchor when href provided", () => {
      renderWithTheme(
        <Contact>
          <Contact.Chip href="mailto:test@example.com">Project Inquiry</Contact.Chip>
        </Contact>,
      );
      expect(screen.getByRole("link", { name: "Project Inquiry" })).toBeInTheDocument();
    });

    it("should render as span when no href", () => {
      renderWithTheme(
        <Contact>
          <Contact.Chip>Collaboration</Contact.Chip>
        </Contact>,
      );
      const chip = screen.getByText("Collaboration");
      expect(chip.tagName).not.toBe("A");
    });
  });

  describe("Contact.PrimaryAction", () => {
    it("should render as an anchor link", () => {
      renderWithTheme(
        <Contact>
          <Contact.PrimaryAction href="mailto:hello@example.com">
            Send an Email
          </Contact.PrimaryAction>
        </Contact>,
      );
      expect(screen.getByRole("link", { name: "Send an Email" })).toBeInTheDocument();
    });

    it("should have the correct href", () => {
      renderWithTheme(
        <Contact>
          <Contact.PrimaryAction href="mailto:hello@example.com">
            Send an Email
          </Contact.PrimaryAction>
        </Contact>,
      );
      expect(screen.getByRole("link", { name: "Send an Email" })).toHaveAttribute(
        "href",
        "mailto:hello@example.com",
      );
    });
  });

  describe("Contact.SecondaryAction", () => {
    it("should render as an anchor link", () => {
      renderWithTheme(
        <Contact>
          <Contact.SecondaryAction href="/cv.pdf">Download CV</Contact.SecondaryAction>
        </Contact>,
      );
      expect(screen.getByRole("link", { name: "Download CV" })).toBeInTheDocument();
    });

    it("should have the correct href", () => {
      renderWithTheme(
        <Contact>
          <Contact.SecondaryAction href="/cv.pdf">Download CV</Contact.SecondaryAction>
        </Contact>,
      );
      expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute("href", "/cv.pdf");
    });
  });

  describe("Contact.SocialLinks", () => {
    it("should render children", () => {
      renderWithTheme(
        <Contact>
          <Contact.SocialLinks>
            <span>Social Content</span>
          </Contact.SocialLinks>
        </Contact>,
      );
      expect(screen.getByText("Social Content")).toBeInTheDocument();
    });
  });

  describe("Contact.SocialLink", () => {
    it("should render as an anchor link", () => {
      renderWithTheme(
        <Contact>
          <Contact.SocialLink href="https://github.com" label="GitHub">
            <span>GH</span>
          </Contact.SocialLink>
        </Contact>,
      );
      expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    });

    it("should have the correct href", () => {
      renderWithTheme(
        <Contact>
          <Contact.SocialLink href="https://github.com" label="GitHub">
            <span>GH</span>
          </Contact.SocialLink>
        </Contact>,
      );
      expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
        "href",
        "https://github.com",
      );
    });
  });

  describe("Integration", () => {
    it("should render a fully composed Contact section", () => {
      renderWithTheme(
        <Contact>
          <Contact.Headline>Let's Build Something</Contact.Headline>
          <Contact.Body>Open to new projects and collaborations.</Contact.Body>
          <Contact.ScriptAccent>let's talk</Contact.ScriptAccent>
          <Contact.Card>
            <Contact.TopicChips>
              <Contact.Chip>Project Inquiry</Contact.Chip>
              <Contact.Chip>Collaboration</Contact.Chip>
            </Contact.TopicChips>
            <Contact.PrimaryAction href="mailto:hello@example.com">
              Send an Email
            </Contact.PrimaryAction>
            <Contact.SecondaryAction href="/cv.pdf">Download CV</Contact.SecondaryAction>
            <Contact.SocialLinks>
              <Contact.SocialLink href="https://github.com" label="GitHub">
                <span>GH</span>
              </Contact.SocialLink>
            </Contact.SocialLinks>
          </Contact.Card>
        </Contact>,
      );

      expect(
        screen.getByRole("heading", { level: 2, name: "Let's Build Something" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Open to new projects and collaborations.")).toBeInTheDocument();
      expect(screen.getByText("let's talk")).toBeInTheDocument();
      expect(screen.getByText("Project Inquiry")).toBeInTheDocument();
      expect(screen.getByText("Collaboration")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Send an Email" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Download CV" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    });
  });
});

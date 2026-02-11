import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../index";

describe("Footer", () => {
  describe("Main Component", () => {
    it("should render the footer", () => {
      render(<Footer />);
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
  });

  describe("Footer.Copyright", () => {
    it("should render the copyright text", () => {
      render(<Footer.Copyright />);
      expect(screen.getByText(/2026 Florian Rätsch/)).toBeInTheDocument();
    });
  });

  describe("Footer.SocialLinks", () => {
    it("should render social links navigation", () => {
      render(<Footer.SocialLinks />);
      expect(screen.getByRole("navigation", { name: /social/i })).toBeInTheDocument();
    });

    it("should render GitHub link", () => {
      render(<Footer.SocialLinks />);
      expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    });

    it("should render LinkedIn link", () => {
      render(<Footer.SocialLinks />);
      expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
    });

    it("should render Email link", () => {
      render(<Footer.SocialLinks />);
      expect(screen.getByRole("link", { name: /email/i })).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("should render complete footer with all parts", () => {
      render(<Footer />);
      expect(screen.getByText(/2026 Florian Rätsch/)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    });
  });
});

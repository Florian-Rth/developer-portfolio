import { ThemeProvider } from "@components/theme-provider";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { AppBar } from "../index";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider defaultTheme="light">{ui}</ThemeProvider>);
};

describe("AppBar", () => {
  describe("Main Component", () => {
    it("should render the AppBar", () => {
      renderWithTheme(<AppBar />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("should render the logo", () => {
      renderWithTheme(<AppBar />);
      const logos = screen.getAllByText("FlorianRth");
      expect(logos.length).toBeGreaterThan(0);
    });
  });

  describe("AppBar.Logo", () => {
    it("should render the logo text", () => {
      render(<AppBar.Logo />);
      expect(screen.getByText("FlorianRth")).toBeInTheDocument();
    });

    it("should be a link", () => {
      render(<AppBar.Logo />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "#home");
    });
  });

  describe("AppBar.NavLinks", () => {
    it("should render left navigation links", () => {
      render(<AppBar.NavLinks position="left" />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Über mich")).toBeInTheDocument();
    });

    it("should render right navigation links", () => {
      render(<AppBar.NavLinks position="right" />);
      expect(screen.getByText("Projekte")).toBeInTheDocument();
      expect(screen.getByText("Kontakt")).toBeInTheDocument();
    });
  });

  describe("AppBar.DarkModeToggle", () => {
    it("should render the toggle button", () => {
      renderWithTheme(<AppBar.DarkModeToggle />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should have accessible label", () => {
      renderWithTheme(<AppBar.DarkModeToggle />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label");
    });
  });

  describe("AppBar.Divider", () => {
    it("should render the divider", () => {
      const { container } = render(<AppBar.Divider />);
      const divider = container.querySelector("div");
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Integration", () => {
    it("should render complete AppBar with all parts", () => {
      renderWithTheme(<AppBar />);
      const logos = screen.getAllByText("FlorianRth");
      expect(logos.length).toBeGreaterThan(0);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Projekte")).toBeInTheDocument();
    });

    it("should show mobile menu button on mobile", () => {
      renderWithTheme(<AppBar />);
      const menuButton = screen.getByRole("button", { name: /menu/i });
      expect(menuButton).toBeInTheDocument();
    });
  });
});

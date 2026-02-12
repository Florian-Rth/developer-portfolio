import { ThemeProvider } from "@components/ThemeProvider";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { AppBar } from "../index";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider defaultTheme="light">{ui}</ThemeProvider>);
};

describe("AppBar", () => {
  describe("Main Component", () => {
    it("should render the header", () => {
      renderWithTheme(
        <AppBar>
          <AppBar.Desktop>
            <AppBar.Logo />
          </AppBar.Desktop>
        </AppBar>,
      );
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });
  });

  describe("AppBar.Logo", () => {
    it("should render the logo text", () => {
      renderWithTheme(
        <AppBar>
          <AppBar.Logo />
        </AppBar>,
      );
      expect(screen.getByText("FlorianRth")).toBeInTheDocument();
    });
  });

  describe("AppBar.NavLink", () => {
    it("should render a nav link", () => {
      renderWithTheme(
        <AppBar>
          <AppBar.NavLink href="#test">Test Link</AppBar.NavLink>
        </AppBar>,
      );
      expect(screen.getByText("Test Link")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Test Link" })).toHaveAttribute("href", "#test");
    });
  });

  describe("AppBar.DarkModeToggle", () => {
    it("should render the dark mode toggle", () => {
      renderWithTheme(
        <AppBar>
          <AppBar.DarkModeToggle />
        </AppBar>,
      );
      expect(screen.getByRole("button", { name: /switch to/i })).toBeInTheDocument();
    });
  });

  describe("AppBar.Divider", () => {
    it("should render the divider", () => {
      renderWithTheme(
        <AppBar>
          <AppBar.Divider />
        </AppBar>,
      );
      expect(screen.getByRole("banner").querySelector("img")).toBeInTheDocument();
    });
  });

  describe("AppBar.MenuButton", () => {
    it("should render the menu button on mobile", () => {
      renderWithTheme(
        <AppBar>
          <AppBar.MenuButton />
        </AppBar>,
      );
      expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
    });
  });

  describe("Composition", () => {
    it("should render a fully composed AppBar", () => {
      renderWithTheme(
        <AppBar>
          <AppBar.Desktop>
            <AppBar.Nav>
              <AppBar.NavLink href="#home">Home</AppBar.NavLink>
            </AppBar.Nav>
            <AppBar.Logo />
            <AppBar.Nav>
              <AppBar.NavLink href="#contact">Kontakt</AppBar.NavLink>
            </AppBar.Nav>
          </AppBar.Desktop>
          <AppBar.Divider />
        </AppBar>,
      );
      expect(screen.getByText("FlorianRth")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Kontakt")).toBeInTheDocument();
    });
  });
});

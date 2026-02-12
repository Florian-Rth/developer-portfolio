import { ThemeProvider } from "@components/ThemeProvider";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { Layout } from "../index";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider defaultTheme="light">{ui}</ThemeProvider>);
};

describe("Layout", () => {
  describe("Main Component", () => {
    it("should render children", () => {
      renderWithTheme(
        <Layout>
          <div>Test Content</div>
        </Layout>,
      );
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should render AppBar", () => {
      renderWithTheme(
        <Layout>
          <div>Test</div>
        </Layout>,
      );
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("should render Footer", () => {
      renderWithTheme(
        <Layout>
          <div>Test</div>
        </Layout>,
      );
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
  });

  describe("Layout.Main", () => {
    it("should render main content area", () => {
      render(
        <Layout.Main>
          <p>Main content</p>
        </Layout.Main>,
      );
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("should render complete layout with AppBar, content, and Footer", () => {
      renderWithTheme(
        <Layout>
          <h1>Page Title</h1>
        </Layout>,
      );
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
      expect(screen.getByText("Page Title")).toBeInTheDocument();
    });
  });
});

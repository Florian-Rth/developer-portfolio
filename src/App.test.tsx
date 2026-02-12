import { ThemeProvider } from "@components/ThemeProvider";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider defaultTheme="light">{ui}</ThemeProvider>);
};

describe("App", () => {
  it("should render the welcome heading", () => {
    renderWithTheme(<App />);
    const heading = screen.getByText("Welcome");
    expect(heading).toBeInTheDocument();
  });

  it("should render all navigation sections", () => {
    renderWithTheme(<App />);
    const aboutElements = screen.getAllByText("Über mich");
    expect(aboutElements.length).toBeGreaterThan(0);
    const projectsElements = screen.getAllByText("Projekte");
    expect(projectsElements.length).toBeGreaterThan(0);
    const contactElements = screen.getAllByText("Kontakt");
    expect(contactElements.length).toBeGreaterThan(0);
  });

  it("should render the footer with copyright", () => {
    renderWithTheme(<App />);
    expect(screen.getByText(/2026 Florian Rätsch/)).toBeInTheDocument();
  });
});

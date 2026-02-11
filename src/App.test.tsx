import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("should render the heading", () => {
    render(<App />);
    const heading = screen.getByText("Design System Test");
    expect(heading).toBeInTheDocument();
  });

  it("should render button variants", () => {
    render(<App />);
    expect(screen.getByText("Default Button")).toBeInTheDocument();
    expect(screen.getByText("Secondary")).toBeInTheDocument();
    expect(screen.getByText("Outline")).toBeInTheDocument();
  });

  it("should render the theme toggle button", () => {
    render(<App />);
    const toggleButton = screen.getByRole("button", { name: /Toggle theme/ });
    expect(toggleButton).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("should render the heading", () => {
    render(<App />);
    const heading = screen.getByText("Developer Portfolio");
    expect(heading).toBeInTheDocument();
  });

  it("should render the coming soon text", () => {
    render(<App />);
    const text = screen.getByText("Coming soon...");
    expect(text).toBeInTheDocument();
  });

  it("should have the correct container style", () => {
    const { container } = render(<App />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    });
  });
});

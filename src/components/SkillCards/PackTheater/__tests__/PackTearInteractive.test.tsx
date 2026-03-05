import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PackTearInteractive } from "../PackTearInteractive";

describe("PackTearInteractive", () => {
  it("should render the pack with perforation line and scissors icon", () => {
    render(<PackTearInteractive onTearComplete={vi.fn()} />);
    expect(screen.getByText("✂")).toBeInTheDocument();
    expect(screen.getByText("→")).toBeInTheDocument();
    expect(screen.getByText("FlorianRth")).toBeInTheDocument();
    expect(screen.getByText("16 Cards")).toBeInTheDocument();
  });

  it("should not start tearing when pointer down is outside left third", () => {
    const onComplete = vi.fn();
    const { container } = render(<PackTearInteractive onTearComplete={onComplete} />);
    const zone = container.querySelector(".cursor-crosshair");
    expect(zone).toBeTruthy();

    // Simulate pointer down at x=200 (> 35% of 260)
    if (zone) {
      fireEvent.pointerDown(zone, { clientX: 200, clientY: 107 });
    }
    // Should not trigger complete immediately
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("should render perforation line elements", () => {
    const { container } = render(<PackTearInteractive onTearComplete={vi.fn()} />);
    const svgLines = container.querySelectorAll("line");
    expect(svgLines.length).toBeGreaterThan(0);
  });
});

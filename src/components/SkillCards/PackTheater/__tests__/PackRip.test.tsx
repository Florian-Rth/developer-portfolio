import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    path: (props: React.SVGAttributes<SVGPathElement>) => <path {...props} />,
    rect: (props: React.SVGAttributes<SVGRectElement>) => <rect {...props} />,
  },
}));

// Must import after mock
const { PackRip } = await import("../PackRip");

describe("PackRip", () => {
  it("should render SVG with tear label", () => {
    render(<PackRip isOpen={false} />);
    expect(screen.getByLabelText("Pack tear")).toBeInTheDocument();
  });

  it("should render without crash when open", () => {
    render(<PackRip isOpen={true} />);
    expect(screen.getByLabelText("Pack tear")).toBeInTheDocument();
  });

  it("should render without crash when glowing", () => {
    render(<PackRip isOpen={true} glowing={true} />);
    expect(screen.getByLabelText("Pack tear")).toBeInTheDocument();
  });
});

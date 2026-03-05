import { render } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Must import after mock
const { PackBurstAnimation } = await import("../PackBurstAnimation");

describe("PackBurstAnimation", () => {
  it("should call onBurstComplete after 700ms", () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<PackBurstAnimation onBurstComplete={onComplete} />);

    expect(onComplete).not.toHaveBeenCalled();

    vi.advanceTimersByTime(700);
    expect(onComplete).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("should render card silhouettes", () => {
    const { container } = render(<PackBurstAnimation onBurstComplete={vi.fn()} />);
    // 4 card silhouettes + upper half + lower half + flash + glow = multiple children
    const roundedLg = container.querySelectorAll(".rounded-lg");
    expect(roundedLg.length).toBe(4);
  });
});

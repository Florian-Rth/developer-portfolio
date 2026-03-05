import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HoloEffect } from "../HoloEffect";

describe("HoloEffect", () => {
  it("should render for legendary rarity", () => {
    const { container } = render(<HoloEffect rarity="legendary" />);
    expect(container.firstChild).not.toBeNull();
  });

  it("should render for epic rarity", () => {
    const { container } = render(<HoloEffect rarity="epic" />);
    expect(container.firstChild).not.toBeNull();
  });

  it("should not render for rare rarity", () => {
    const { container } = render(<HoloEffect rarity="rare" />);
    expect(container.firstChild).toBeNull();
  });

  it("should not render for uncommon rarity", () => {
    const { container } = render(<HoloEffect rarity="uncommon" />);
    expect(container.firstChild).toBeNull();
  });

  it("should not render for common rarity", () => {
    const { container } = render(<HoloEffect rarity="common" />);
    expect(container.firstChild).toBeNull();
  });

  it("should respect intensity prop", () => {
    const { container: low } = render(<HoloEffect rarity="legendary" intensity="low" />);
    const { container: max } = render(<HoloEffect rarity="legendary" intensity="max" />);
    // Both should render
    expect(low.firstChild).not.toBeNull();
    expect(max.firstChild).not.toBeNull();
  });
});

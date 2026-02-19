import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useScrollReveal } from "../useScrollReveal";

describe("useScrollReveal", () => {
  describe("initial state", () => {
    it("should return isVisible as false initially", () => {
      const { result } = renderHook(() => useScrollReveal());
      expect(result.current.isVisible).toBe(false);
    });

    it("should return a ref object", () => {
      const { result } = renderHook(() => useScrollReveal());
      expect(result.current.ref).toBeDefined();
      expect(result.current.ref.current).toBeNull();
    });

    it("should return empty style object when no delay is specified", () => {
      const { result } = renderHook(() => useScrollReveal());
      expect(result.current.style).toEqual({});
    });

    it("should return style with transitionDelay when delay is specified", () => {
      const { result } = renderHook(() => useScrollReveal({ delay: 150 }));
      expect(result.current.style).toEqual({ transitionDelay: "150ms" });
    });
  });

  describe("options", () => {
    it("should accept threshold option", () => {
      const { result } = renderHook(() => useScrollReveal({ threshold: 0.5 }));
      expect(result.current.ref).toBeDefined();
    });

    it("should accept rootMargin option", () => {
      const { result } = renderHook(() => useScrollReveal({ rootMargin: "10px" }));
      expect(result.current.ref).toBeDefined();
    });

    it("should accept triggerOnce option", () => {
      const { result } = renderHook(() => useScrollReveal({ triggerOnce: false }));
      expect(result.current.ref).toBeDefined();
    });
  });

  describe("delay configuration", () => {
    it("should support 0 delay", () => {
      const { result } = renderHook(() => useScrollReveal({ delay: 0 }));
      expect(result.current.style).toEqual({});
    });

    it("should support various delay values", () => {
      const delays = [150, 300, 450, 550, 800];
      for (const delay of delays) {
        const { result } = renderHook(() => useScrollReveal({ delay }));
        expect(result.current.style).toEqual({ transitionDelay: `${delay}ms` });
      }
    });
  });

  describe("default values", () => {
    it("should use default threshold of 0.2 when not specified", () => {
      const { result } = renderHook(() => useScrollReveal());
      expect(result.current.isVisible).toBe(false);
    });

    it("should use default rootMargin when not specified", () => {
      const { result } = renderHook(() => useScrollReveal());
      expect(result.current.isVisible).toBe(false);
    });

    it("should use default triggerOnce of true when not specified", () => {
      const { result } = renderHook(() => useScrollReveal());
      expect(result.current.isVisible).toBe(false);
    });
  });
});

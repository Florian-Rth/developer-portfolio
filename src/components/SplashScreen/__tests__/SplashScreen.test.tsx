import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SplashScreen } from "../index";

describe("SplashScreen", () => {
  describe("SplashScreen.Container", () => {
    it("should render children", () => {
      render(
        <SplashScreen onComplete={vi.fn()}>
          <SplashScreen.Container>
            <span>Test Content</span>
          </SplashScreen.Container>
        </SplashScreen>,
      );
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <SplashScreen onComplete={vi.fn()}>
          <SplashScreen.Container className="custom-class">
            <span>Test</span>
          </SplashScreen.Container>
        </SplashScreen>,
      );
      const container = screen.getByText("Test").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("should have fullscreen positioning", () => {
      render(
        <SplashScreen onComplete={vi.fn()}>
          <SplashScreen.Container>
            <span>Test</span>
          </SplashScreen.Container>
        </SplashScreen>,
      );
      const container = screen.getByText("Test").parentElement;
      expect(container).toHaveClass("fixed", "inset-0");
    });
  });

  describe("SplashScreen.Logo", () => {
    it("should render SVG with FlorianRth text", () => {
      render(
        <SplashScreen onComplete={vi.fn()}>
          <SplashScreen.Container>
            <SplashScreen.Logo />
          </SplashScreen.Container>
        </SplashScreen>,
      );
      expect(screen.getByRole("img", { name: "FlorianRth Logo" })).toBeInTheDocument();
      expect(screen.getByText("FlorianRth")).toBeInTheDocument();
    });

    it("should apply animation class to text", () => {
      render(
        <SplashScreen onComplete={vi.fn()}>
          <SplashScreen.Container>
            <SplashScreen.Logo />
          </SplashScreen.Container>
        </SplashScreen>,
      );
      const text = screen.getByText("FlorianRth");
      expect(text).toHaveClass("splash-logo-text");
    });

    it("should apply custom className to SVG", () => {
      render(
        <SplashScreen onComplete={vi.fn()}>
          <SplashScreen.Container>
            <SplashScreen.Logo className="custom-logo" />
          </SplashScreen.Container>
        </SplashScreen>,
      );
      const svg = screen.getByRole("img", { name: "FlorianRth Logo" });
      expect(svg).toHaveClass("custom-logo");
    });
  });

  describe("SplashScreen Main", () => {
    it("should render children", () => {
      render(
        <SplashScreen onComplete={vi.fn()}>
          <div>Splash Content</div>
        </SplashScreen>,
      );
      expect(screen.getByText("Splash Content")).toBeInTheDocument();
    });

    it("should call onComplete after animation", async () => {
      const onComplete = vi.fn();
      render(
        <SplashScreen onComplete={onComplete}>
          <SplashScreen.Container>
            <SplashScreen.Logo />
          </SplashScreen.Container>
        </SplashScreen>,
      );

      act(() => {
        window.dispatchEvent(new CustomEvent("splashAnimationComplete"));
      });

      await waitFor(
        () => {
          expect(onComplete).toHaveBeenCalled();
        },
        { timeout: 1000 },
      );
    });

    it("should apply exit transition classes after animation complete event", async () => {
      render(
        <SplashScreen onComplete={vi.fn()}>
          <SplashScreen.Container>
            <span>Content</span>
          </SplashScreen.Container>
        </SplashScreen>,
      );

      const wrapper = screen.getByText("Content").parentElement?.parentElement;
      expect(wrapper).toHaveClass("splash-screen-exit");
      expect(wrapper).not.toHaveClass("splash-screen-exit-active");

      act(() => {
        window.dispatchEvent(new CustomEvent("splashAnimationComplete"));
      });

      await waitFor(() => {
        expect(wrapper).toHaveClass("splash-screen-exit-active");
      });
    });
  });

  describe("SplashScreen.Wrapper", () => {
    const originalLocation = window.location;

    afterEach(() => {
      Object.defineProperty(window, "location", { value: originalLocation, writable: true });
    });

    it("should show splash screen by default", () => {
      Object.defineProperty(window, "location", {
        value: { ...originalLocation, search: "" },
        writable: true,
      });

      render(
        <SplashScreen.Wrapper>
          <div>Main App</div>
        </SplashScreen.Wrapper>,
      );

      expect(screen.getByRole("img", { name: "FlorianRth Logo" })).toBeInTheDocument();
      expect(screen.getByText("Main App")).toBeInTheDocument();
    });

    it("should not show splash screen when nosplash query param is set", () => {
      Object.defineProperty(window, "location", {
        value: { ...originalLocation, search: "?nosplash" },
        writable: true,
      });

      render(
        <SplashScreen.Wrapper>
          <div>Main App</div>
        </SplashScreen.Wrapper>,
      );

      expect(screen.queryByRole("img", { name: "FlorianRth Logo" })).not.toBeInTheDocument();
      expect(screen.getByText("Main App")).toBeInTheDocument();
    });

    it("should hide splash screen after completion", async () => {
      Object.defineProperty(window, "location", {
        value: { ...originalLocation, search: "" },
        writable: true,
      });

      render(
        <SplashScreen.Wrapper>
          <div>Main App</div>
        </SplashScreen.Wrapper>,
      );

      act(() => {
        window.dispatchEvent(new CustomEvent("splashAnimationComplete"));
      });

      await waitFor(() => {
        expect(screen.queryByRole("img", { name: "FlorianRth Logo" })).not.toBeInTheDocument();
      });
    });
  });

  describe("Integration", () => {

    it("should render complete splash screen with all parts", () => {
      render(
        <SplashScreen onComplete={vi.fn()}>
          <SplashScreen.Container>
            <SplashScreen.Logo />
          </SplashScreen.Container>
        </SplashScreen>,
      );

      expect(screen.getByRole("img", { name: "FlorianRth Logo" })).toBeInTheDocument();
      expect(screen.getByText("FlorianRth")).toBeInTheDocument();
    });
  });
});

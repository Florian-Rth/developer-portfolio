import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
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
    beforeEach(() => {
      sessionStorage.clear();
    });

    it("should show splash screen on first visit", () => {
      render(
        <SplashScreen.Wrapper>
          <div>Main App</div>
        </SplashScreen.Wrapper>,
      );

      expect(screen.getByRole("img", { name: "FlorianRth Logo" })).toBeInTheDocument();
      expect(screen.getByText("Main App")).toBeInTheDocument();
    });

    it("should not show splash screen if already shown in session", () => {
      sessionStorage.setItem("splash-screen-shown", "true");

      render(
        <SplashScreen.Wrapper>
          <div>Main App</div>
        </SplashScreen.Wrapper>,
      );

      expect(screen.queryByRole("img", { name: "FlorianRth Logo" })).not.toBeInTheDocument();
      expect(screen.getByText("Main App")).toBeInTheDocument();
    });

    it("should set sessionStorage flag after completion", async () => {
      render(
        <SplashScreen.Wrapper>
          <div>Main App</div>
        </SplashScreen.Wrapper>,
      );

      act(() => {
        window.dispatchEvent(new CustomEvent("splashAnimationComplete"));
      });

      await waitFor(() => {
        expect(sessionStorage.getItem("splash-screen-shown")).toBe("true");
      });
    });
  });

  describe("Integration", () => {
    beforeEach(() => {
      sessionStorage.clear();
    });

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

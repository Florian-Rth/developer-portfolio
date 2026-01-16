import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";

describe("main", () => {
  let rootElement: HTMLElement | null;

  beforeEach(() => {
    rootElement = document.getElementById("root");
    if (!rootElement) {
      rootElement = document.createElement("div");
      rootElement.id = "root";
      document.body.appendChild(rootElement);
    }
  });

  afterEach(() => {
    if (rootElement?.parentNode) {
      rootElement.parentNode.removeChild(rootElement);
    }
  });

  it("should find the root element", () => {
    const root = document.getElementById("root");
    expect(root).not.toBeNull();
  });

  it("should render App component without errors", () => {
    if (!rootElement) {
      throw new Error("Root element not found");
    }
    const { container } = render(<App />, { container: rootElement });
    expect(container.firstChild).not.toBeNull();
  });
});

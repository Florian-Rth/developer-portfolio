import { skills } from "@/data/skills";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import type { RevealCard } from "../useTheaterState";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAnimation: () => ({ start: vi.fn().mockResolvedValue(undefined), set: vi.fn() }),
}));

// Must import after mock
const { CardRevealPipeline } = await import("../CardRevealPipeline");

const buildCards = (): RevealCard[] => [
  ...skills.map((s, i) => ({ ...s, revealIndex: i })),
  {
    id: "hire-me" as const,
    name: "Hire Me" as const,
    category: "contact" as const,
    rarity: "legendary" as const,
    isHireMe: true as const,
    revealIndex: 15,
  },
];

describe("CardRevealPipeline", () => {
  it("should render all 16 cards when skipped", () => {
    const cards = buildCards();
    render(
      <CardRevealPipeline
        cards={cards}
        revealedCount={16}
        skipped={true}
        onCardSelect={vi.fn()}
        onAllDone={vi.fn()}
      />,
    );

    // All 15 skill names should be present
    for (const skill of skills) {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    }

    // Hire Me card should be present
    expect(screen.getByText("Hire Me")).toBeInTheDocument();
  });

  it("should not render cards when revealedCount is 0", () => {
    const cards = buildCards();
    render(
      <CardRevealPipeline
        cards={cards}
        revealedCount={0}
        skipped={false}
        onCardSelect={vi.fn()}
        onAllDone={vi.fn()}
      />,
    );

    // No skill cards should be placed yet
    for (const skill of skills) {
      expect(screen.queryByText(skill.name)).not.toBeInTheDocument();
    }
  });

  it("should call onCardSelect when a skill card is clicked", () => {
    const onSelect = vi.fn();
    const cards = buildCards();
    render(
      <CardRevealPipeline
        cards={cards}
        revealedCount={16}
        skipped={true}
        onCardSelect={onSelect}
        onAllDone={vi.fn()}
      />,
    );

    const reactCard = screen.getByText("React");
    reactCard.click();
    expect(onSelect).toHaveBeenCalled();
  });
});

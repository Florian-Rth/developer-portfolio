import { skills } from "@/data/skills";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CardDeck } from "../CardDeck";
import { CategoryBadge } from "../CategoryBadge";
import { DetailDrawer } from "../DetailDrawer";
import { RarityBadge } from "../RarityBadge";
import { SkillCard } from "../SkillCard";
import { SkillCardSection } from "../SkillCardSection";
import { StatBar } from "../StatBar";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("SkillCards", () => {
  describe("SkillCardSection", () => {
    it("should render without crash", () => {
      render(<SkillCardSection />);
      const section = document.querySelector("#skills");
      expect(section).toBeInTheDocument();
    });

    it("should have the skills watermark", () => {
      render(<SkillCardSection />);
      expect(screen.getByText("skills")).toBeInTheDocument();
    });
  });

  describe("CardDeck", () => {
    it("should show stacked cards initially", () => {
      const onScatter = vi.fn();
      render(<CardDeck onScatter={onScatter} />);
      expect(screen.getByText("Click to explore →")).toBeInTheDocument();
    });

    it("should call onScatter when clicked", () => {
      const onScatter = vi.fn();
      render(<CardDeck onScatter={onScatter} />);
      const annotation = screen.getByText("Click to explore →");
      const deck = annotation.parentElement?.querySelector("[class*='relative']");
      if (deck) {
        fireEvent.click(deck);
        expect(onScatter).toHaveBeenCalled();
      }
    });
  });

  describe("SkillCard", () => {
    const testSkill = skills[0];

    it("should render skill name", () => {
      render(<SkillCard skill={testSkill} />);
      expect(screen.getByText(testSkill.name)).toBeInTheDocument();
    });

    it("should render category and rarity badges", () => {
      render(<SkillCard skill={testSkill} />);
      // CategoryBadge and RarityBadge should both be present on the card
      expect(screen.getByText(/frontend/i)).toBeInTheDocument();
      expect(screen.getByText(/legendary/i)).toBeInTheDocument();
    });

    it("should call onSelect when clicked", () => {
      const onSelect = vi.fn();
      render(<SkillCard skill={testSkill} onSelect={onSelect} />);
      fireEvent.click(screen.getByText(testSkill.name));
      expect(onSelect).toHaveBeenCalled();
    });

    it("should render stats for the skill", () => {
      render(<SkillCard skill={testSkill} />);
      // Display labels as defined in SkillCard StatBar calls
      expect(screen.getByText("Mastery")).toBeInTheDocument();
      expect(screen.getByText("Speed")).toBeInTheDocument();
      expect(screen.getByText("Range")).toBeInTheDocument();
      expect(screen.getByText("Impact")).toBeInTheDocument();
    });
  });

  describe("StatBar", () => {
    it("should render label and value", () => {
      render(<StatBar label="Power" value={8} color="#B8A9D4" />);
      expect(screen.getByText("Power")).toBeInTheDocument();
      expect(screen.getByText("8")).toBeInTheDocument();
    });
  });

  describe("RarityBadge", () => {
    it("should render rarity label", () => {
      render(<RarityBadge rarity="legendary" />);
      expect(screen.getByText("★ LEGENDARY")).toBeInTheDocument();
    });
  });

  describe("CategoryBadge", () => {
    it("should render category label", () => {
      render(<CategoryBadge category="frontend" />);
      expect(screen.getByText("Frontend")).toBeInTheDocument();
    });
  });

  describe("DetailDrawer", () => {
    const testSkill = skills[0];

    it("should render skill name when open", () => {
      render(<DetailDrawer skill={testSkill} onClose={vi.fn()} />);
      expect(screen.getByText(testSkill.name)).toBeInTheDocument();
    });

    it("should show detail sections", () => {
      render(<DetailDrawer skill={testSkill} onClose={vi.fn()} />);
      expect(screen.getByText("Gelernt:")).toBeInTheDocument();
      expect(screen.getByText("Eingesetzt in:")).toBeInTheDocument();
      expect(screen.getByText(testSkill.detail.learned)).toBeInTheDocument();
      expect(screen.getByText(testSkill.detail.usedIn)).toBeInTheDocument();
    });

    it("should call onClose when close button is clicked", () => {
      const onClose = vi.fn();
      render(<DetailDrawer skill={testSkill} onClose={onClose} />);
      fireEvent.click(screen.getByLabelText("Close drawer"));
      expect(onClose).toHaveBeenCalled();
    });

    it("should not render when skill is null", () => {
      render(<DetailDrawer skill={null} onClose={vi.fn()} />);
      expect(screen.queryByText("Gelernt:")).not.toBeInTheDocument();
    });

    it("should call onClose on Escape key", () => {
      const onClose = vi.fn();
      render(<DetailDrawer skill={testSkill} onClose={onClose} />);
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("Skills data integration", () => {
    it("should have all 15 skills defined", () => {
      expect(skills).toHaveLength(15);
    });

    it("should load skills data correctly", () => {
      const react = skills.find((s) => s.id === "react");
      expect(react).toBeDefined();
      expect(react?.name).toBe("React");
      expect(react?.rarity).toBe("legendary");
    });
  });

  describe("Scatter state transition", () => {
    it("should switch from stacked to scattered on click", () => {
      render(<SkillCardSection />);
      // Initially: deck view with annotation
      expect(screen.getByText("Click to explore →")).toBeInTheDocument();

      // Find and click the deck area
      const annotation = screen.getByText("Click to explore →");
      const deckContainer = annotation.previousElementSibling;
      if (deckContainer) {
        fireEvent.click(deckContainer);
        // After scatter: all 15 skill names should be visible
        for (const skill of skills) {
          expect(screen.getByText(skill.name)).toBeInTheDocument();
        }
      }
    });
  });
});

import type { Skill } from "@/data/skills";
import { skills } from "@/data/skills";
import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import { CardDeck } from "../CardDeck";
import { CategoryBadge } from "../CategoryBadge";
import { DetailDrawer } from "../DetailDrawer";
import { RarityBadge } from "../RarityBadge";
import { SkillCard } from "../SkillCard";
import { SkillCardSection } from "../SkillCardSection";
import { useSkillCards } from "../SkillCardsProvider";
import { SkillStatsList } from "../SkillStatsList";
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

// Helper: wrap sub-components in Provider context
const renderWithContext = (ui: React.ReactNode, overrides?: { selectedSkill?: Skill | null }) => {
  const Wrapper = () => (
    <SkillCardSection>
      {overrides?.selectedSkill !== undefined ? (
        <ContextSetter skill={overrides.selectedSkill}>{ui}</ContextSetter>
      ) : (
        ui
      )}
    </SkillCardSection>
  );
  return render(<Wrapper />);
};

// Helper to set selectedSkill in context for DetailDrawer tests
const ContextSetter: React.FC<{
  skill: Skill | null;
  children: React.ReactNode;
}> = ({ skill, children }) => {
  // We need to use the context's setSelectedSkill
  // Since SkillCardSection is the provider, we trigger it via useEffect
  const { useEffect } = require("react");
  const Inner = () => {
    const { setSelectedSkill } = useSkillCards();
    useEffect(() => {
      setSelectedSkill(skill);
    }, [setSelectedSkill]);
    return <>{children}</>;
  };
  return <Inner />;
};

describe("SkillCards", () => {
  describe("SkillCardSection (Compound)", () => {
    it("should render without crash", () => {
      render(
        <SkillCardSection>
          <div>content</div>
        </SkillCardSection>,
      );
      expect(screen.getByText("content")).toBeInTheDocument();
    });
  });

  describe("CardDeck", () => {
    it("should show stacked cards initially", () => {
      renderWithContext(<CardDeck />);
      expect(screen.getByText("Click to explore →")).toBeInTheDocument();
    });

    it("should scatter on click", () => {
      renderWithContext(<CardDeck />);
      const annotation = screen.getByText("Click to explore →");
      const deck = annotation.parentElement?.querySelector("[class*='relative']");
      if (deck) {
        fireEvent.click(deck);
        // After scatter, deck returns null so the text disappears
        expect(screen.queryByText("Click to explore →")).not.toBeInTheDocument();
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
      expect(screen.getByText("Mastery")).toBeInTheDocument();
      expect(screen.getByText("Speed")).toBeInTheDocument();
      expect(screen.getByText("Range")).toBeInTheDocument();
      expect(screen.getByText("Impact")).toBeInTheDocument();
    });
  });

  describe("SkillStatsList", () => {
    it("should render all stat bars", () => {
      render(<SkillStatsList skill={skills[0]} color="#B8A9D4" />);
      expect(screen.getByText("Mastery")).toBeInTheDocument();
      expect(screen.getByText("Speed")).toBeInTheDocument();
      expect(screen.getByText("Range")).toBeInTheDocument();
      expect(screen.getByText("Impact")).toBeInTheDocument();
    });
  });

  describe("StatBar", () => {
    it("should render label and value", () => {
      render(<StatBar label="Mastery" value={8} color="#B8A9D4" />);
      expect(screen.getByText("Mastery")).toBeInTheDocument();
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

    it("should render skill name when opened via context", () => {
      renderWithContext(<DetailDrawer />, {
        selectedSkill: testSkill,
      });
      expect(screen.getByText(testSkill.name)).toBeInTheDocument();
    });

    it("should show detail sections", () => {
      renderWithContext(<DetailDrawer />, {
        selectedSkill: testSkill,
      });
      expect(screen.getByText("Gelernt:")).toBeInTheDocument();
      expect(screen.getByText("Eingesetzt in:")).toBeInTheDocument();
      expect(screen.getByText(testSkill.detail.learned)).toBeInTheDocument();
      expect(screen.getByText(testSkill.detail.usedIn)).toBeInTheDocument();
    });

    it("should close when close button is clicked", () => {
      renderWithContext(<DetailDrawer />, {
        selectedSkill: testSkill,
      });
      fireEvent.click(screen.getByLabelText("Close drawer"));
      // After close, drawer content should disappear
      expect(screen.queryByText("Gelernt:")).not.toBeInTheDocument();
    });

    it("should not render when no skill selected", () => {
      renderWithContext(<DetailDrawer />);
      expect(screen.queryByText("Gelernt:")).not.toBeInTheDocument();
    });

    it("should close on Escape key", () => {
      renderWithContext(<DetailDrawer />, {
        selectedSkill: testSkill,
      });
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByText("Gelernt:")).not.toBeInTheDocument();
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

    it("should use renamed stat fields", () => {
      const react = skills.find((s) => s.id === "react");
      expect(react?.stats.mastery).toBe(9);
      expect(react?.stats.range).toBe(9); // reduced from 10 for stat variance credibility
    });
  });

  describe("Scatter state transition", () => {
    it("should switch from stacked to scattered on click", () => {
      render(
        <SkillCardSection>
          <CardDeck />
        </SkillCardSection>,
      );
      // Initially: deck view with annotation
      expect(screen.getByText("Click to explore →")).toBeInTheDocument();

      // Find and click the deck area
      const annotation = screen.getByText("Click to explore →");
      const deckContainer = annotation.previousElementSibling;
      if (deckContainer) {
        fireEvent.click(deckContainer);
        // After scatter: CardDeck returns null
        expect(screen.queryByText("Click to explore →")).not.toBeInTheDocument();
      }
    });
  });
});

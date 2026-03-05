import { skills } from "@/data/skills";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTheaterState } from "../useTheaterState";

describe("useTheaterState", () => {
  it("should start in idle phase", () => {
    const { result } = renderHook(() => useTheaterState());
    expect(result.current.phase).toBe("idle");
    expect(result.current.revealedCount).toBe(0);
  });

  it("should have 16 ordered cards (15 skills + Hire Me)", () => {
    const { result } = renderHook(() => useTheaterState());
    expect(result.current.orderedCards).toHaveLength(16);
    expect(result.current.totalCards).toBe(16);
  });

  it("should order cards Common → Uncommon → Rare → Epic → Legendary → Hire Me", () => {
    const { result } = renderHook(() => useTheaterState());
    const cards = result.current.orderedCards;

    // Last card must be Hire Me
    expect(cards[cards.length - 1].id).toBe("hire-me");

    // Check rarity ordering: each card's rarity should be >= previous (ascending)
    const order = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
    const skillCards = cards.slice(0, -1);
    skillCards.forEach((card, idx) => {
      if (idx === 0) return;
      const prev = order[skillCards[idx - 1].rarity as keyof typeof order];
      const curr = order[card.rarity as keyof typeof order];
      expect(curr).toBeGreaterThanOrEqual(prev);
    });
  });

  it("should include all 15 skills", () => {
    const { result } = renderHook(() => useTheaterState());
    const skillCards = result.current.orderedCards.filter((c) => c.id !== "hire-me");
    expect(skillCards).toHaveLength(15);
    for (const skill of skills) {
      expect(skillCards.find((c) => c.id === skill.id)).toBeDefined();
    }
  });

  it("should transition to tearing on startReveal", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTheaterState());

    act(() => {
      result.current.startReveal();
    });

    expect(result.current.phase).toBe("tearing");
    vi.useRealTimers();
  });

  it("should transition to revealing after tear duration", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTheaterState());

    act(() => {
      result.current.startReveal();
    });

    act(() => {
      vi.advanceTimersByTime(700);
    });

    expect(result.current.phase).toBe("revealing");
    vi.useRealTimers();
  });

  it("should skip to scattered with all cards revealed", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTheaterState());

    act(() => {
      result.current.startReveal();
    });
    act(() => {
      vi.advanceTimersByTime(700);
    });
    act(() => {
      result.current.skip();
    });

    expect(result.current.phase).toBe("scattered");
    expect(result.current.revealedCount).toBe(16);
    expect(result.current.skipped).toBe(true);
    vi.useRealTimers();
  });

  it("should reset to idle", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTheaterState());

    act(() => {
      result.current.startReveal();
    });
    act(() => {
      result.current.skip();
    });
    act(() => {
      result.current.reset();
    });

    expect(result.current.phase).toBe("idle");
    expect(result.current.revealedCount).toBe(0);
    expect(result.current.skipped).toBe(false);
    vi.useRealTimers();
  });
});

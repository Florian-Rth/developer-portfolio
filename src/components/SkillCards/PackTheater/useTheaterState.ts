import type { Skill } from "@/data/skills";
import { rarityOrder, skills } from "@/data/skills";
import { useCallback, useMemo, useRef, useState } from "react";

export type TheaterPhase = "idle" | "tearing" | "revealing" | "scattered";

export type HireMeSkill = {
  id: "hire-me";
  name: "Hire Me";
  category: "contact";
  rarity: "legendary";
  isHireMe: true;
};

export const HIRE_ME: HireMeSkill = {
  id: "hire-me",
  name: "Hire Me",
  category: "contact",
  rarity: "legendary",
  isHireMe: true,
};

export type RevealCard = (Skill | HireMeSkill) & { revealIndex: number };

const TEAR_DURATION = 600;
const CARD_STAGGER = 600;
const HIRE_ME_PAUSE = 500;

const sortByRarity = (a: Skill, b: Skill): number => {
  const diff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
  if (diff !== 0) return diff;
  return a.name.localeCompare(b.name);
};

export const useTheaterState = () => {
  const [phase, setPhase] = useState<TheaterPhase>("idle");
  const [revealedCount, setRevealedCount] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const orderedCards: RevealCard[] = useMemo(() => {
    const sorted = [...skills].sort(sortByRarity);
    const indexed: RevealCard[] = sorted.map((s, i) => ({
      ...s,
      revealIndex: i,
    }));
    indexed.push({ ...HIRE_ME, revealIndex: sorted.length });
    return indexed;
  }, []);

  const totalCards = orderedCards.length;

  const clearTimers = useCallback(() => {
    for (const t of timersRef.current) clearTimeout(t);
    timersRef.current = [];
  }, []);

  const startReveal = useCallback(() => {
    setPhase("tearing");
    setRevealedCount(0);
    setSkipped(false);

    const tearTimer = setTimeout(() => {
      setPhase("revealing");
      // Stagger each card reveal
      Array.from({ length: totalCards }, (_, idx) => {
        const isHire = idx === totalCards - 1;
        const delay = isHire ? (totalCards - 1) * CARD_STAGGER + HIRE_ME_PAUSE : idx * CARD_STAGGER;
        const t = setTimeout(() => {
          setRevealedCount((prev) => prev + 1);
        }, delay);
        timersRef.current.push(t);
      });

      // All done after last card + its spotlight time
      const finalDelay = (totalCards - 1) * CARD_STAGGER + HIRE_ME_PAUSE + 1800;
      const doneTimer = setTimeout(() => {
        setPhase("scattered");
      }, finalDelay);
      timersRef.current.push(doneTimer);
    }, TEAR_DURATION);
    timersRef.current.push(tearTimer);
  }, [totalCards]);

  const skip = useCallback(() => {
    clearTimers();
    setSkipped(true);
    setRevealedCount(totalCards);
    setPhase("scattered");
  }, [clearTimers, totalCards]);

  const reset = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setRevealedCount(0);
    setSkipped(false);
  }, [clearTimers]);

  return {
    phase,
    orderedCards,
    revealedCount,
    totalCards,
    skipped,
    startReveal,
    skip,
    reset,
  };
};

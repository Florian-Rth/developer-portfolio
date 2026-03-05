import type { Skill } from "@/data/skills";
import { rarityOrder, skills } from "@/data/skills";
import { useCallback, useMemo, useRef, useState } from "react";

export type TheaterPhase = "idle" | "bursting" | "revealing" | "scattered";

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

const CARD_STAGGER = 1200;
const HIRE_ME_PAUSE = 900;

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

  const markScattered = useCallback(() => {
    setPhase("scattered");
  }, []);

  const startBurst = useCallback(() => {
    setPhase("bursting");
  }, []);

  const startReveal = useCallback(() => {
    setPhase("revealing");
    setRevealedCount(0);
    setSkipped(false);

    // Feed cards into the pipeline one by one via stagger
    Array.from({ length: totalCards }, (_, idx) => {
      const isHire = idx === totalCards - 1;
      const feedDelay = isHire
        ? (totalCards - 1) * CARD_STAGGER + HIRE_ME_PAUSE
        : idx * CARD_STAGGER;
      const t = setTimeout(() => {
        setRevealedCount((prev) => prev + 1);
      }, feedDelay);
      timersRef.current.push(t);
    });
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
    startBurst,
    startReveal,
    skip,
    reset,
    markScattered,
  };
};

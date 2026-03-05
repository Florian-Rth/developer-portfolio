import type { Skill } from "@/data/skills";
import { CardBack } from "../CardBack";
import { CardFlip } from "../CardFlip";
import { HireMeCard } from "../HireMeCard";
import { HoloEffect } from "../HoloEffect";
import { SkillCard } from "../SkillCard";
import type { HireMeSkill, RevealCard } from "./useTheaterState";

import { cn } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { CardSpotlight } from "./CardSpotlight";

type CardRevealPipelineProps = {
  cards: RevealCard[];
  revealedCount: number;
  skipped: boolean;
  onCardSelect: (skill: Skill) => void;
  cardScale?: number;
  className?: string;
};

const CARD_W = 220;
const CARD_H = 320;
const SCATTER_COL_W = CARD_W * 1.05;
const SCATTER_ROW_H = CARD_H * 0.97;
const SPOTLIGHT_DURATION = 500;
const HIRE_ME_SPOTLIGHT_DURATION = 900;

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generatePositions = (count: number, scale: number) => {
  const cols = Math.ceil(Math.sqrt(count));
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const rows = Math.ceil(count / cols);
    const baseX = (col - (cols - 1) / 2) * SCATTER_COL_W * scale;
    const baseY = (row - (rows - 1) / 2) * SCATTER_ROW_H * scale;
    const jitterX = (seededRandom(i * 7 + 1) - 0.5) * 40 * scale;
    const jitterY = (seededRandom(i * 13 + 3) - 0.5) * 40 * scale;
    const rotation = (seededRandom(i * 17 + 5) - 0.5) * 20;
    return { x: baseX + jitterX, y: baseY + jitterY, rotation };
  });
};

const isHireMe = (card: RevealCard): card is HireMeSkill & { revealIndex: number } =>
  card.id === "hire-me";

export const CardRevealPipeline: React.FC<CardRevealPipelineProps> = ({
  cards,
  revealedCount,
  skipped,
  onCardSelect,
  cardScale = 1,
  className,
}) => {
  const [spotlightIndex, setSpotlightIndex] = useState<number | null>(null);
  const [flippedSet, setFlippedSet] = useState<Set<number>>(new Set());
  const [placedSet, setPlacedSet] = useState<Set<number>>(new Set());

  const positions = useMemo(
    () => generatePositions(cards.length, cardScale),
    [cards.length, cardScale],
  );

  // Handle skip: instantly flip & place all
  useEffect(() => {
    if (skipped) {
      setSpotlightIndex(null);
      const allIndices = new Set(cards.map((_, i) => i));
      setFlippedSet(allIndices);
      setPlacedSet(allIndices);
    }
  }, [skipped, cards]);

  // Handle incremental reveal: spotlight → flip → place
  useEffect(() => {
    if (skipped || revealedCount === 0) return;
    const idx = revealedCount - 1;
    if (idx < 0 || idx >= cards.length) return;

    // Show spotlight
    setSpotlightIndex(idx);

    const isHire = isHireMe(cards[idx]);
    const duration = isHire ? HIRE_ME_SPOTLIGHT_DURATION : SPOTLIGHT_DURATION;

    // Flip after small delay
    const flipTimer = setTimeout(() => {
      setFlippedSet((prev) => new Set(prev).add(idx));
    }, 150);

    // Place after spotlight ends
    const placeTimer = setTimeout(() => {
      setSpotlightIndex(null);
      setPlacedSet((prev) => new Set(prev).add(idx));
    }, duration);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(placeTimer);
    };
  }, [revealedCount, skipped, cards]);

  const halfW = (CARD_W * cardScale) / 2;
  const halfH = (CARD_H * cardScale) / 2;

  // Get the currently spotlighted card for the overlay
  const spotlightCard = spotlightIndex !== null ? cards[spotlightIndex] : null;

  return (
    <>
      {/* Spotlight overlay */}
      {spotlightCard && !skipped && (
        <CardSpotlight
          visible={true}
          skillName={spotlightCard.name}
          isHireMe={isHireMe(spotlightCard)}
        >
          <div className="relative">
            <CardFlip
              flipped={flippedSet.has(spotlightIndex as number)}
              front={
                isHireMe(spotlightCard) ? (
                  <HireMeCard scale={cardScale} />
                ) : (
                  <div className="relative">
                    <SkillCard skill={spotlightCard as Skill} scale={cardScale} />
                    <HoloEffect rarity={spotlightCard.rarity} intensity="max" />
                  </div>
                )
              }
              back={<CardBack />}
            />
          </div>
        </CardSpotlight>
      )}

      {/* Scattered field */}
      <div
        className={cn(
          "relative w-full flex items-center justify-center",
          "min-h-[1400px]",
          className,
        )}
      >
        <div className="relative" style={{ width: "100%", height: "100%" }}>
          <AnimatePresence>
            {cards.map((card, i) => {
              const isPlaced = placedSet.has(i);
              const isFlipped = flippedSet.has(i);
              if (!isPlaced) return null;
              const pos = positions[i];

              return (
                <motion.div
                  key={card.id}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    zIndex: i,
                  }}
                  initial={{ x: -halfW, y: -halfH - 200, rotate: 0, opacity: 0 }}
                  animate={{
                    x: pos.x - halfW,
                    y: pos.y - halfH,
                    rotate: pos.rotation,
                    opacity: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    delay: skipped ? i * 0.03 : 0,
                  }}
                  drag
                  dragMomentum={false}
                  dragElastic={0.1}
                  whileHover={{ zIndex: 50 }}
                  whileDrag={{ scale: 1.05, zIndex: 100 }}
                >
                  {isHireMe(card) ? (
                    <HireMeCard scale={cardScale} />
                  ) : (
                    <div className="relative">
                      <SkillCard
                        skill={card as Skill}
                        scale={cardScale}
                        onSelect={() => onCardSelect(card as Skill)}
                      />
                      {isFlipped && <HoloEffect rarity={card.rarity} intensity="medium" />}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

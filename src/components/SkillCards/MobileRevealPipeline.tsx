/**
 * MobileRevealPipeline — spotlight card reveal for mobile
 *
 * Same flip animation as desktop CardRevealPipeline, but:
 *  - No scattered field (cards don't fly to positions)
 *  - After all cards shown → onAllDone() → MobileCardStack takes over
 *  - Card sized for mobile viewport
 */

import type { Skill } from "@/data/skills";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CardBack } from "./CardBack";
import { HireMeCard } from "./HireMeCard";
import { rarityShimmer } from "./shimmers";
import { CARD_H, CARD_W, SkillCard } from "./SkillCard";
import type { HireMeSkill, RevealCard } from "./PackTheater/useTheaterState";

// ─── Spotlight sizing for mobile ─────────────────────────────────────────────
// Slightly smaller than desktop (310px) to fit mobile screens comfortably
const SPOTLIGHT_W = 260;
const SPOTLIGHT_H = Math.round(SPOTLIGHT_W * (CARD_H / CARD_W));
const SPOTLIGHT_SCALE = SPOTLIGHT_W / CARD_W;

// ─── Timing (matches desktop) ─────────────────────────────────────────────────
const FLIP_IN_S = 0.42;
const FLIP_OUT_HALF_S = 0.22;
const HOLD_MS = 750;
const HIRE_ME_HOLD_MS = 1600;

const isHireMe = (card: RevealCard): card is HireMeSkill & { revealIndex: number } =>
  card.id === "hire-me";

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

type MobileRevealPipelineProps = {
  cards: RevealCard[];
  revealedCount: number;
  skipped: boolean;
  onCardSelect: (skill: Skill) => void;
  onAllDone: () => void;
};

export const MobileRevealPipeline: React.FC<MobileRevealPipelineProps> = ({
  cards,
  revealedCount,
  skipped,
  onCardSelect,
  onAllDone,
}) => {
  const controls = useAnimation();
  const rotBase = useRef(0);
  const busy = useRef(false);
  const queueRef = useRef<RevealCard[]>([]);
  const shownCount = useRef(0);

  const [frontContent, setFrontContent] = useState<React.ReactNode>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState<RevealCard | null>(null);

  const revealOne = useCallback(
    async (card: RevealCard) => {
      const holdMs = isHireMe(card) ? HIRE_ME_HOLD_MS : HOLD_MS;
      const base = rotBase.current;

      const spotlightSh = rarityShimmer(card.rarity);
      setFrontContent(
        isHireMe(card) ? (
          <HireMeCard scale={SPOTLIGHT_SCALE} />
        ) : (
          <SkillCard
            skill={card as Skill}
            scale={SPOTLIGHT_SCALE}
            Shimmer={spotlightSh?.Shimmer}
            shimmerIntensity={spotlightSh?.intensity}
            onSelect={() => onCardSelect(card as Skill)}
          />
        ),
      );
      setCurrentCard(card);
      setOverlayVisible(true);

      // Flip IN: back → front
      await controls.start({
        rotateY: base - 180,
        transition: { duration: FLIP_IN_S, ease: [0.645, 0.045, 0.355, 1.0] },
      });

      await delay(holdMs);

      // Flip OUT first half: front → edge
      await controls.start({
        rotateY: base - 270,
        transition: { duration: FLIP_OUT_HALF_S, ease: "easeIn" },
      });

      shownCount.current += 1;
      const isLast = shownCount.current === cards.length;

      if (isLast) {
        setOverlayVisible(false);
        await delay(600);
        onAllDone();
      }

      // Flip OUT second half: edge → back
      await controls.start({
        rotateY: base - 360,
        transition: { duration: FLIP_OUT_HALF_S, ease: "easeOut" },
      });

      rotBase.current = base - 360;
    },
    [cards.length, controls, onAllDone, onCardSelect],
  );

  const processQueue = useCallback(async () => {
    if (busy.current) return;
    while (queueRef.current.length > 0) {
      busy.current = true;
      const item = queueRef.current.shift()!;
      await revealOne(item);
      busy.current = false;
    }
  }, [revealOne]);

  // React to parent incrementing revealedCount
  useEffect(() => {
    if (skipped || revealedCount === 0) return;
    const idx = revealedCount - 1;
    const card = cards[idx];
    if (!card) return;
    queueRef.current.push(card);
    processQueue();
  }, [revealedCount, skipped, cards, processQueue]);

  // Skip: jump straight to scattered
  useEffect(() => {
    if (!skipped) return;
    setOverlayVisible(false);
    busy.current = false;
    queueRef.current = [];
    onAllDone();
  }, [skipped, onAllDone]);

  const isHireMeCard = currentCard && isHireMe(currentCard);

  return (
    <>
      {/* ── Spotlight overlay (fixed, fullscreen) ────────────────────────── */}
      <AnimatePresence>
        {overlayVisible && (
          <div
            key="mobile-spotlight"
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Dim */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.3)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Glow */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 360,
                height: 360,
                background: isHireMeCard
                  ? "radial-gradient(ellipse, rgba(244,208,63,0.35) 0%, transparent 70%)"
                  : "radial-gradient(ellipse, rgba(184,169,212,0.28) 0%, transparent 70%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Flip card */}
            <div
              className="relative z-10"
              style={{ perspective: "900px" }}
            >
              <motion.div
                animate={controls}
                style={{
                  transformStyle: "preserve-3d",
                  width: SPOTLIGHT_W,
                  height: SPOTLIGHT_H,
                  position: "relative",
                }}
              >
                {/* Back face */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <CardBack style={{ width: SPOTLIGHT_W, height: SPOTLIGHT_H }} />
                </div>

                {/* Front face */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {frontContent}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Placeholder so page doesn't collapse during reveal */}
      <div className="min-h-[200px]" />
    </>
  );
};

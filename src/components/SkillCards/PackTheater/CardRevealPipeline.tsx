/**
 * CardRevealPipeline — continuous-rotation spotlight reveal
 *
 * One persistent card rotates in a single direction forever.
 * Content swaps at the exact moment the card is edge-on (invisible).
 * No AnimatePresence re-mounts, no backward flips.
 *
 * Rotation cycle per card:
 *   base+0°   → base-180°  : flip IN  (back → front)  ~0.7s
 *   hold at base-180°                                  ~1.1s
 *   base-180° → base-270°  : flip OUT first half       ~0.33s  ← edge-on: swap content
 *   base-270° → base-360°  : flip OUT second half      ~0.33s
 *   base = base - 360° for next card
 */

import type { Skill } from "@/data/skills";
import { cn } from "@lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CardBack } from "../CardBack";
import { HireMeCard } from "../HireMeCard";
import { SkillCard } from "../SkillCard";
import type { HireMeSkill, RevealCard } from "./useTheaterState";

// ─── Timing ──────────────────────────────────────────────────────────────────
const FLIP_IN_S = 0.42; // back → front
const FLIP_OUT_HALF_S = 0.22; // each half of flip-out
const HOLD_MS = 750;  // front visible for skill cards
const HIRE_ME_HOLD_MS = 1600; // front visible for Hire Me

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isHireMe = (card: RevealCard): card is HireMeSkill & { revealIndex: number } =>
  card.id === "hire-me";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generatePositions = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const cols = Math.ceil(Math.sqrt(count));
    const col = i % cols;
    const row = Math.floor(i / cols);
    const rows = Math.ceil(count / cols);
    const CARD_W = 220,
      CARD_H = 320;
    const baseX = (col - (cols - 1) / 2) * CARD_W * 1.08;
    const baseY = (row - (rows - 1) / 2) * CARD_H * 1.0;
    const jX = (seededRandom(i * 7 + 1) - 0.5) * 40;
    const jY = (seededRandom(i * 13 + 3) - 0.5) * 40;
    const rot = (seededRandom(i * 17 + 5) - 0.5) * 18;
    return { x: baseX + jX, y: baseY + jY, rotation: rot };
  });

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Types ───────────────────────────────────────────────────────────────────
type CardRevealPipelineProps = {
  cards: RevealCard[];
  revealedCount: number;
  skipped: boolean;
  onCardSelect: (skill: Skill) => void;
  onAllDone: () => void;
  className?: string;
};

// ─── Component ───────────────────────────────────────────────────────────────
export const CardRevealPipeline: React.FC<CardRevealPipelineProps> = ({
  cards,
  revealedCount,
  skipped,
  onCardSelect,
  onAllDone,
  className,
}) => {
  const controls = useAnimation();
  const rotBase = useRef(0); // cumulative rotation base
  const busy = useRef(false); // is an animation running?
  const queue = useRef<RevealCard[]>([]);
  const placedCount = useRef(0);

  // What's currently on the front face of the rotating card
  const [frontContent, setFrontContent] = useState<React.ReactNode>(null);
  // Whether spotlight overlay is visible
  const [overlayVisible, setOverlayVisible] = useState(false);
  // Whether the front face should be shown (vs the back)
  // (we use the rotation, but we also track this for the glow colour)
  const [currentCard, setCurrentCard] = useState<RevealCard | null>(null);

  // Which cards have been placed in the scatter field
  const [placedSet, setPlacedSet] = useState<Set<number>>(new Set());

  const positions = useMemo(() => generatePositions(cards.length), [cards.length]);

  // ── Core animation sequence for one card ──────────────────────────────────
  const revealOne = useCallback(
    async (card: RevealCard, idx: number) => {
      const holdMs = isHireMe(card) ? HIRE_ME_HOLD_MS : HOLD_MS;
      const base = rotBase.current;

      const spotlightScale = SPOTLIGHT_W / CARD_W;

      // Prepare front face content BEFORE showing overlay
      setFrontContent(
        isHireMe(card) ? (
          <HireMeCard scale={spotlightScale} />
        ) : (
          // Apply zoom directly to SkillCard (scale prop) so it goes from
          // its native 220×320 → 310×451. Do NOT put zoom on the wrapper
          // div — the wrapper fills the 310px parent, so zooming it would
          // scale from 310px → 437px (wrong element, wrong result).
          <SkillCard
            skill={card as Skill}
            scale={spotlightScale}
            holoIntensity="max"
            onSelect={() => onCardSelect(card as Skill)}
          />
        ),
      );
      setCurrentCard(card);
      setOverlayVisible(true);

      // 1 — Flip IN: back → front  (0 → -180)
      await controls.start({
        rotateY: base - 180,
        transition: {
          duration: FLIP_IN_S,
          ease: [0.645, 0.045, 0.355, 1.0], // easeInOutCubic
        },
      });

      // 2 — Hold (front face visible)
      await delay(holdMs);

      // 3 — Flip OUT first half: front → edge  (-180 → -270)
      await controls.start({
        rotateY: base - 270,
        transition: { duration: FLIP_OUT_HALF_S, ease: "easeIn" },
      });

      // ← card is edge-on: launch it from spotlight center to scatter position
      setPlacedSet((prev) => new Set(prev).add(idx));

      placedCount.current += 1;
      if (placedCount.current === cards.length) {
        // All cards placed — now fade out the overlay once
        setOverlayVisible(false);
        await delay(900);
        onAllDone();
      }

      // 4 — Flip OUT second half: edge → back  (-270 → -360)
      await controls.start({
        rotateY: base - 360,
        transition: { duration: FLIP_OUT_HALF_S, ease: "easeOut" },
      });

      rotBase.current = base - 360;
    },
    [cards.length, controls, onAllDone, onCardSelect],
  );

  // ── Queue processor ────────────────────────────────────────────────────────
  const processQueue = useCallback(async () => {
    if (busy.current) return;
    while (queue.current.length > 0) {
      busy.current = true;
      const item = queue.current.shift()!;
      const idx = cards.findIndex((c) => c.id === item.id);
      await revealOne(item, idx);
      busy.current = false;
    }
  }, [cards, revealOne]);

  // ── React to parent incrementing revealedCount ────────────────────────────
  useEffect(() => {
    if (skipped || revealedCount === 0) return;
    const idx = revealedCount - 1;
    const card = cards[idx];
    if (!card) return;
    queue.current.push(card);
    processQueue();
  }, [revealedCount, skipped, cards, processQueue]);

  // ── Skip: place everything immediately ────────────────────────────────────
  useEffect(() => {
    if (!skipped) return;
    setOverlayVisible(false);
    busy.current = false;
    queue.current = [];
    setPlacedSet(new Set(cards.map((_, i) => i)));
    onAllDone();
  }, [skipped, cards, onAllDone]);

  // ── Dimensions ────────────────────────────────────────────────────────────
  const CARD_W = 220;  // scattered size (unchanged)
  const CARD_H = 320;
  const halfW = CARD_W / 2;
  const halfH = CARD_H / 2;
  const SPOTLIGHT_W = 310; // revealed card size (larger)
  const SPOTLIGHT_H = 452;

  return (
    <>
      {/* ── Spotlight stage ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {overlayVisible && (
          <div
            key="spotlight-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            {/* Dim */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.22)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Glow */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 420,
                height: 420,
                background:
                  currentCard && isHireMe(currentCard)
                    ? "radial-gradient(ellipse, rgba(244,208,63,0.28) 0%, transparent 70%)"
                    : "radial-gradient(ellipse, rgba(184,169,212,0.22) 0%, transparent 70%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </AnimatePresence>

      {/*
       * The rotating card — ALWAYS mounted while revealing, never re-mounted.
       * Only the rotateY value changes via `controls`.
       * Opacity wrapper shows/hides it around the overlay.
       */}
      {!skipped && (
        <div
          className="fixed inset-0 z-[51] flex items-center justify-center pointer-events-none"
          style={{ visibility: overlayVisible ? "visible" : "hidden" }}
        >
          {/* Outer wrapper: perspective */}
          <div style={{ perspective: "900px" }}>
            {/* Framer Motion drives rotateY continuously */}
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

      {/* ── Scattered field ──────────────────────────────────────────────── */}
      <div
        className={cn("relative w-full flex items-center justify-center min-h-[1400px]", className)}
      >
        <div className="relative" style={{ width: "100%", height: "100%" }}>
          <AnimatePresence>
            {cards.map((card, i) => {
              if (!placedSet.has(i)) return null;
              const pos = positions[i];

              return (
                <motion.div
                  key={card.id}
                  className="absolute"
                  style={{ left: "50%", top: "50%", zIndex: i }}
                  initial={{ x: -halfW, y: -halfH, scale: 0.88, rotate: 0, opacity: 0 }}
                  animate={{
                    x: pos.x - halfW,
                    y: pos.y - halfH,
                    scale: 1,
                    rotate: pos.rotation,
                    opacity: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 48,
                    damping: 16,
                    delay: skipped ? i * 0.025 : 0.08,
                  }}
                  whileHover={{ zIndex: 50 }}
                >
                  {isHireMe(card) ? (
                    <HireMeCard />
                  ) : (
                    <SkillCard
                      skill={card as Skill}
                      onSelect={() => onCardSelect(card as Skill)}
                    />
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

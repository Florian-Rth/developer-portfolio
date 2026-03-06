/**
 * MobileRevealPipeline — spotlight card reveal for mobile
 *
 * Flow:
 *   1. "Your cards are ready!" intro (card cascade, 2s)
 *      — top card = CardBack of first skill, layoutId="bridge-card"
 *   2. Intro exits, flip-stage enters with same layoutId
 *      → Framer Motion morphs the card from intro size/position to spotlight size
 *   3. Card flips: back → front for each skill card
 *   4. After last card → onAllDone() → MobileCardStack
 */

import type { Skill } from "@/data/skills";
import { AnimatePresence, LayoutGroup, motion, useAnimation } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CardBack } from "./CardBack";
import { HireMeCard } from "./HireMeCard";
import { rarityShimmer } from "./shimmers";
import { CARD_H, CARD_W, SkillCard } from "./SkillCard";
import type { HireMeSkill, RevealCard } from "./PackTheater/useTheaterState";

// ─── Sizing ───────────────────────────────────────────────────────────────────
const INTRO_CARD_W = 200;
const INTRO_CARD_H = 290;
const SPOTLIGHT_W = 260;
const SPOTLIGHT_H = Math.round(SPOTLIGHT_W * (CARD_H / CARD_W));
const SPOTLIGHT_SCALE = SPOTLIGHT_W / CARD_W;

// ─── Timing ───────────────────────────────────────────────────────────────────
const FLIP_IN_S = 0.42;
const FLIP_OUT_HALF_S = 0.22;
const HOLD_MS = 750;
const HIRE_ME_HOLD_MS = 1600;
const INTRO_DURATION_MS = 2000;
/** How long to wait for the layoutId morph animation before starting the first flip */
const BRIDGE_SETTLE_MS = 550;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isHireMe = (c: RevealCard): c is HireMeSkill & { revealIndex: number } => c.id === "hire-me";

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Intro cascade card positions ────────────────────────────────────────────
const INTRO_CARDS = [
  { delay: 0,    fromY: -220, fromX: -90, toRotate: -13, toX: -38, zIndex: 1, scale: 0.93 },
  { delay: 0.07, fromY: -240, fromX:  70, toRotate:   9, toX:  34, zIndex: 2, scale: 0.91 },
  { delay: 0.14, fromY: -200, fromX: -35, toRotate:  -4, toX: -14, zIndex: 3, scale: 0.96 },
  { delay: 0.21, fromY: -260, fromX:  25, toRotate:   3, toX:  10, zIndex: 4, scale: 0.97 },
];

// ─── Intro scene ─────────────────────────────────────────────────────────────
type IntroSceneProps = { onDone: () => void };

const IntroScene: React.FC<IntroSceneProps> = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, INTRO_DURATION_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      key="intro-scene"
      className="flex flex-col items-center justify-center gap-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card stack */}
      <div className="relative" style={{ width: INTRO_CARD_W, height: INTRO_CARD_H }}>
        {/* Light burst */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            inset: -60, borderRadius: "50%",
            background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(244,208,63,0.32) 0%, transparent 70%)",
            filter: "blur(24px)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Ghost cards (gradient silhouettes) */}
        {INTRO_CARDS.map((card) => (
          <motion.div
            key={card.delay}
            className="absolute rounded-2xl"
            style={{
              width: INTRO_CARD_W, height: INTRO_CARD_H,
              background: "linear-gradient(145deg, #9B7FC9 0%, #D4A0B8 55%, #E8907A 100%)",
              boxShadow: "0 14px 45px rgba(120,90,160,0.4)",
              border: "1.5px solid rgba(255,255,255,0.5)",
              zIndex: card.zIndex, left: 0, top: 0,
            }}
            initial={{ y: card.fromY, x: card.fromX, rotate: -25, opacity: 0, scale: 0.65 }}
            animate={{ y: -card.zIndex * 3, x: card.toX, rotate: card.toRotate, opacity: 1, scale: card.scale }}
            transition={{ delay: card.delay, type: "spring", stiffness: 220, damping: 20 }}
          />
        ))}

        {/* ── Top card: real CardBack — this is the bridge element ───────── */}
        <motion.div
          layoutId="bridge-card"
          className="absolute rounded-2xl overflow-hidden"
          style={{ width: INTRO_CARD_W, height: INTRO_CARD_H, zIndex: 10, left: 0, top: 0 }}
          initial={{ y: -270, x: 0, rotate: 18, opacity: 0, scale: 0.55 }}
          animate={{ y: -18, x: 0, rotate: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.42, type: "spring", stiffness: 190, damping: 17 }}
        >
          <CardBack style={{ width: INTRO_CARD_W, height: INTRO_CARD_H }} />
        </motion.div>
      </div>

      {/* "Your cards are ready!" text */}
      <motion.p
        className="font-script text-2xl"
        style={{
          background: "linear-gradient(135deg, #FFFDF9 0%, #F4D03F 40%, #E8B4A0 80%, #FFFDF9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 2px 12px rgba(244,208,63,0.4))",
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 22 }}
      >
        Your cards are ready!
      </motion.p>

      <motion.p
        className="font-sans text-xs tracking-widest uppercase"
        style={{ color: "rgba(255,253,249,0.45)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        16 cards · swipe to browse
      </motion.p>
    </motion.div>
  );
};

// ─── Props ────────────────────────────────────────────────────────────────────
type MobileRevealPipelineProps = {
  cards: RevealCard[];
  revealedCount: number;
  skipped: boolean;
  onCardSelect: (skill: Skill) => void;
  onAllDone: () => void;
};

// ─── MobileRevealPipeline ─────────────────────────────────────────────────────
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
  const introFinished = useRef(false);

  const [frontContent, setFrontContent] = useState<React.ReactNode>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [currentCard, setCurrentCard] = useState<RevealCard | null>(null);

  // ── Core flip for one card ──────────────────────────────────────────────────
  const revealOne = useCallback(
    async (card: RevealCard) => {
      const holdMs = isHireMe(card) ? HIRE_ME_HOLD_MS : HOLD_MS;
      const base = rotBase.current;

      const sh = rarityShimmer(card.rarity);
      setFrontContent(
        isHireMe(card) ? (
          <HireMeCard scale={SPOTLIGHT_SCALE} />
        ) : (
          <SkillCard
            skill={card as Skill}
            scale={SPOTLIGHT_SCALE}
            Shimmer={sh?.Shimmer}
            shimmerIntensity={sh?.intensity}
            onSelect={() => onCardSelect(card as Skill)}
          />
        ),
      );
      setCurrentCard(card);

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
      if (shownCount.current === cards.length) {
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

  // ── Queue processor ────────────────────────────────────────────────────────
  const processQueue = useCallback(async () => {
    if (busy.current || !introFinished.current) return;
    while (queueRef.current.length > 0) {
      busy.current = true;
      const item = queueRef.current.shift()!;
      await revealOne(item);
      busy.current = false;
    }
  }, [revealOne]);

  // ── Intro done → wait for bridge morph → start flips ─────────────────────
  const handleIntroDone = useCallback(() => {
    introFinished.current = true;
    setShowIntro(false);
    // Wait for layoutId morph animation to settle before starting flip
    setTimeout(() => processQueue(), BRIDGE_SETTLE_MS);
  }, [processQueue]);

  // ── Feed cards from parent ────────────────────────────────────────────────
  useEffect(() => {
    if (skipped || revealedCount === 0) return;
    const card = cards[revealedCount - 1];
    if (!card) return;
    queueRef.current.push(card);
    processQueue();
  }, [revealedCount, skipped, cards, processQueue]);

  // ── Skip ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!skipped) return;
    setOverlayVisible(false);
    setShowIntro(false);
    busy.current = false;
    queueRef.current = [];
    introFinished.current = true;
    onAllDone();
  }, [skipped, onAllDone]);

  const isHireMeCard = currentCard && isHireMe(currentCard);

  return (
    <LayoutGroup>
      {/* ── Full-screen overlay ────────────────────────────────────────── */}
      <AnimatePresence>
        {overlayVisible && (
          <div
            key="mobile-reveal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center px-8"
          >
            {/* Dim */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(10,8,12,0.55)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            />

            {/* Background glow */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: 400, height: 400, borderRadius: "50%",
                background: showIntro || !currentCard
                  ? "radial-gradient(ellipse, rgba(244,208,63,0.28) 0%, transparent 70%)"
                  : isHireMeCard
                    ? "radial-gradient(ellipse, rgba(244,208,63,0.32) 0%, transparent 70%)"
                    : "radial-gradient(ellipse, rgba(184,169,212,0.26) 0%, transparent 70%)",
              }}
              animate={{ scale: showIntro ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* ── Intro scene or Flip stage ──────────────────────────── */}
            <AnimatePresence mode="wait">
              {showIntro ? (
                <IntroScene key="intro" onDone={handleIntroDone} />
              ) : (
                /* Flip card — bridge-card layoutId morphs from intro size */
                <motion.div
                  key="flip-stage"
                  className="relative z-10 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <div style={{ perspective: "900px" }}>
                    {/* This wrapper receives the layoutId morph */}
                    <motion.div
                      layoutId="bridge-card"
                      style={{
                        width: SPOTLIGHT_W,
                        height: SPOTLIGHT_H,
                        position: "relative",
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    >
                      {/* Inner 3D rotator */}
                      <motion.div
                        animate={controls}
                        style={{
                          transformStyle: "preserve-3d",
                          width: "100%",
                          height: "100%",
                          position: "relative",
                        }}
                      >
                        {/* Back face */}
                        <div
                          style={{
                            position: "absolute", inset: 0,
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                          }}
                        >
                          <CardBack style={{ width: "100%", height: "100%" }} />
                        </div>

                        {/* Front face */}
                        <div
                          style={{
                            position: "absolute", inset: 0,
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                          }}
                        >
                          {frontContent}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      {/* Placeholder */}
      <div className="min-h-[200px]" />
    </LayoutGroup>
  );
};

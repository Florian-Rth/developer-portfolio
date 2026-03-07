/**
 * MobileRevealPipeline — spotlight card reveal for mobile
 *
 * The bridge card stays mounted the whole time.
 * Intro elements (ghost cards, text) fade in/out independently.
 * When intro ends, the card grows from intro size → spotlight size via `layout`.
 *
 * Flow:
 *   1. Overlay opens, intro visible: card at 200×290
 *   2. After 2s: intro fades, card grows to 260×SPOTLIGHT_H  ← layout animation
 *   3. After morph settles: card flips back→front for each skill
 *   4. Last card → onAllDone()
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
/** Wait for `layout` spring to settle before starting flip */
const BRIDGE_SETTLE_MS = 550;

// ─── Ghost card configs ───────────────────────────────────────────────────────
const GHOST_CARDS = [
  { delay: 0,    fromY: -220, fromX: -90, toRotate: -13, toX: -38, zIndex: 1, toScale: 0.93 },
  { delay: 0.07, fromY: -240, fromX:  70, toRotate:   9, toX:  34, zIndex: 2, toScale: 0.91 },
  { delay: 0.14, fromY: -200, fromX: -35, toRotate:  -4, toX: -14, zIndex: 3, toScale: 0.96 },
  { delay: 0.21, fromY: -260, fromX:  25, toRotate:   3, toX:  10, zIndex: 4, toScale: 0.97 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isHireMe = (c: RevealCard): c is HireMeSkill & { revealIndex: number } => c.id === "hire-me";

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Props ────────────────────────────────────────────────────────────────────
type Props = {
  cards: RevealCard[];
  revealedCount: number;
  skipped: boolean;
  onCardSelect: (skill: Skill) => void;
  onAllDone: () => void;
};

// ─── MobileRevealPipeline ─────────────────────────────────────────────────────
export const MobileRevealPipeline: React.FC<Props> = ({
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
  const [showIntro, setShowIntro] = useState(true);   // controls intro elements
  const [cardW, setCardW] = useState(INTRO_CARD_W);   // layout-animated
  const [cardH, setCardH] = useState(INTRO_CARD_H);
  const [currentCard, setCurrentCard] = useState<RevealCard | null>(null);

  // ── Flip one card ──────────────────────────────────────────────────────────
  const revealOne = useCallback(async (card: RevealCard) => {
    const holdMs = isHireMe(card) ? HIRE_ME_HOLD_MS : HOLD_MS;
    const base = rotBase.current;
    const sh = rarityShimmer(card.rarity);

    setCurrentCard(card);
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

    await controls.start({
      rotateY: base - 180,
      transition: { duration: FLIP_IN_S, ease: [0.645, 0.045, 0.355, 1.0] },
    });
    await wait(holdMs);
    await controls.start({
      rotateY: base - 270,
      transition: { duration: FLIP_OUT_HALF_S, ease: "easeIn" },
    });

    shownCount.current += 1;
    if (shownCount.current === cards.length) {
      setOverlayVisible(false);
      await wait(600);
      onAllDone();
    }

    await controls.start({
      rotateY: base - 360,
      transition: { duration: FLIP_OUT_HALF_S, ease: "easeOut" },
    });
    rotBase.current = base - 360;
  }, [cards.length, controls, onAllDone, onCardSelect]);

  // ── Queue processor ───────────────────────────────────────────────────────
  const processQueue = useCallback(async () => {
    if (busy.current || !introFinished.current) return;
    while (queueRef.current.length > 0) {
      busy.current = true;
      const item = queueRef.current.shift()!;
      await revealOne(item);
      busy.current = false;
    }
  }, [revealOne]);

  // ── Intro done: grow card, then flip ─────────────────────────────────────
  const handleIntroDone = useCallback(() => {
    setShowIntro(false);
    // Grow card to spotlight size — layout animation handles the morph
    setCardW(SPOTLIGHT_W);
    setCardH(SPOTLIGHT_H);
    introFinished.current = true;
    // Wait for layout spring to settle, then start flipping
    setTimeout(() => processQueue(), BRIDGE_SETTLE_MS);
  }, [processQueue]);

  // ── Intro timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (skipped) return;
    const t = setTimeout(handleIntroDone, INTRO_DURATION_MS);
    return () => clearTimeout(t);
  }, [handleIntroDone, skipped]);

  // ── Feed cards from parent ────────────────────────────────────────────────
  useEffect(() => {
    if (skipped || revealedCount === 0) return;
    const card = cards[revealedCount - 1];
    if (!card) return;
    queueRef.current.push(card);
    processQueue();
  }, [revealedCount, skipped, cards, processQueue]);

  // ── Skip ─────────────────────────────────────────────────────────────────
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
    <>
      <AnimatePresence>
        {overlayVisible && (
          <div
            key="mobile-reveal-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center"
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

            {/* Glow */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: 420, height: 420, borderRadius: "50%",
                background: showIntro || !currentCard
                  ? "radial-gradient(ellipse, rgba(244,208,63,0.28) 0%, transparent 70%)"
                  : isHireMeCard
                    ? "radial-gradient(ellipse, rgba(244,208,63,0.32) 0%, transparent 70%)"
                    : "radial-gradient(ellipse, rgba(184,169,212,0.26) 0%, transparent 70%)",
              }}
              animate={{ scale: showIntro ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* ── Centre column ──────────────────────────────────────────── */}
            <div className="relative flex flex-col items-center gap-6 z-10">

              {/* ── Card stack area ──────────────────────────────────────── */}
              <div
                className="relative flex items-center justify-center"
                style={{ width: SPOTLIGHT_W + 80, height: SPOTLIGHT_H + 60 }}
              >
                {/* Ghost cards — fade out when intro ends */}
                <AnimatePresence>
                  {showIntro && (
                    <motion.div
                      key="ghost-cards"
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Light burst */}
                      <motion.div
                        className="absolute pointer-events-none"
                        style={{
                          inset: -60, borderRadius: "50%",
                          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(244,208,63,0.3) 0%, transparent 70%)",
                          filter: "blur(24px)",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      {GHOST_CARDS.map((g) => (
                        <motion.div
                          key={g.delay}
                          className="absolute rounded-2xl"
                          style={{
                            width: INTRO_CARD_W, height: INTRO_CARD_H,
                            background: "linear-gradient(145deg, #9B7FC9 0%, #D4A0B8 55%, #E8907A 100%)",
                            boxShadow: "0 14px 45px rgba(120,90,160,0.4)",
                            border: "1.5px solid rgba(255,255,255,0.5)",
                            zIndex: g.zIndex,
                          }}
                          initial={{ y: g.fromY, x: g.fromX, rotate: -25, opacity: 0, scale: 0.65 }}
                          animate={{ y: -g.zIndex * 3, x: g.toX, rotate: g.toRotate, opacity: 1, scale: g.toScale }}
                          transition={{ delay: g.delay, type: "spring", stiffness: 220, damping: 20 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Bridge card — ALWAYS mounted, size changes via layout ── */}
                <div style={{ perspective: "900px", zIndex: 10 }}>
                  <motion.div
                    layout
                    style={{ width: cardW, height: cardH, position: "relative" }}
                    transition={{ type: "spring", stiffness: 200, damping: 28 }}
                  >
                    {/* 3D rotator */}
                    <motion.div
                      animate={controls}
                      style={{
                        transformStyle: "preserve-3d",
                        width: "100%", height: "100%",
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
              </div>

              {/* ── Intro text — fades out when intro ends ───────────────── */}
              <AnimatePresence>
                {showIntro && (
                  <motion.div
                    key="intro-text"
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p
                      className="font-script text-2xl"
                      style={{
                        background: "linear-gradient(135deg, #FFFDF9 0%, #F4D03F 40%, #E8B4A0 80%, #FFFDF9 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 2px 12px rgba(244,208,63,0.4))",
                      }}
                    >
                      Your cards are ready!
                    </p>
                    <p
                      className="font-sans text-xs tracking-widest uppercase"
                      style={{ color: "rgba(255,253,249,0.45)" }}
                    >
                      16 cards · swipe to browse
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>{/* end centre column */}
          </div>
        )}
      </AnimatePresence>

      {/* Placeholder */}
      <div className="min-h-[200px]" />
    </>
  );
};

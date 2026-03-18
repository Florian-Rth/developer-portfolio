/**
 * MobileRevealPipeline — spotlight card reveal for mobile
 *
 * Uses <Backdrop> (Portal) so the overlay sits directly on document.body —
 * immune to parent transforms, filters, or overflow clipping.
 *
 * Flow:
 *   1. Backdrop opens → intro: ghost cards cascade + "Your cards are ready!"
 *   2. After 2 s  → intro fades, card grows 200×290 → 260×SPOTLIGHT_H (layout)
 *   3. After morph settles → card flips back→front for each skill
 *   4. Last card → onAllDone()
 */

import { Backdrop } from "@/components/ui/Backdrop";
import type { Skill } from "@/data/skills";
import { LAYERS } from "@/lib/layers";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CardBack } from "./CardBack";
import { HireMeCard } from "./HireMeCard";
import type { HireMeSkill, RevealCard } from "./PackTheater/useTheaterState";
import { CARD_H, CARD_W, SkillCard } from "./SkillCard";
import { rarityShimmer } from "./shimmers";

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
  { delay: 0, fromY: -220, fromX: -90, toRotate: -13, toX: -38, zIndex: 1, toScale: 0.93 },
  { delay: 0.07, fromY: -240, fromX: 70, toRotate: 9, toX: 34, zIndex: 2, toScale: 0.91 },
  { delay: 0.14, fromY: -200, fromX: -35, toRotate: -4, toX: -14, zIndex: 3, toScale: 0.96 },
  { delay: 0.21, fromY: -260, fromX: 25, toRotate: 3, toX: 10, zIndex: 4, toScale: 0.97 },
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
  onSkip?: () => void;
};

// ─── MobileRevealPipeline ─────────────────────────────────────────────────────
export const MobileRevealPipeline: React.FC<Props> = ({
  cards,
  revealedCount,
  skipped,
  onCardSelect,
  onAllDone,
  onSkip,
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
  const [cardW, setCardW] = useState(INTRO_CARD_W);
  const [cardH, setCardH] = useState(INTRO_CARD_H);
  const [currentCard, setCurrentCard] = useState<RevealCard | null>(null);

  // ── Flip one card ──────────────────────────────────────────────────────────
  const revealOne = useCallback(
    async (card: RevealCard) => {
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
    },
    [cards.length, controls, onAllDone, onCardSelect],
  );

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
    setCardW(SPOTLIGHT_W);
    setCardH(SPOTLIGHT_H);
    introFinished.current = true;
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

  // ── Glow color based on current card rarity ───────────────────────────────
  const glowColor =
    showIntro || !currentCard
      ? "radial-gradient(ellipse, rgba(244,208,63,0.28) 0%, transparent 70%)"
      : isHireMeCard
        ? "radial-gradient(ellipse, rgba(244,208,63,0.32) 0%, transparent 70%)"
        : "radial-gradient(ellipse, rgba(184,169,212,0.26) 0%, transparent 70%)";

  return (
    <>
      <Backdrop
        visible={overlayVisible}
        zIndex={LAYERS.theater}
        dimColor="rgba(10,8,12,0.55)"
        fadeDuration={0.45}
      >
        {/* ── Glow — absolute, centered in viewport ──────────────────────── */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: glowColor,
          }}
          animate={{ scale: showIntro ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* ── Card stack area — sole flex child → always centered ───────── */}
        {/* NOTE: intro text is absolute below this div so card never jumps */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{ width: SPOTLIGHT_W + 80, height: SPOTLIGHT_H + 60, pointerEvents: "auto" }}
        >
          {/* Ghost cards + light burst — visible during intro */}
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
                    inset: -60,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(244,208,63,0.3) 0%, transparent 70%)",
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
                      width: INTRO_CARD_W,
                      height: INTRO_CARD_H,
                      background: "linear-gradient(145deg, #9B7FC9 0%, #D4A0B8 55%, #E8907A 100%)",
                      boxShadow: "0 14px 45px rgba(120,90,160,0.4)",
                      border: "1.5px solid rgba(255,255,255,0.5)",
                      zIndex: g.zIndex,
                    }}
                    initial={{ y: g.fromY, x: g.fromX, rotate: -25, opacity: 0, scale: 0.65 }}
                    animate={{
                      y: -g.zIndex * 3,
                      x: g.toX,
                      rotate: g.toRotate,
                      opacity: 1,
                      scale: g.toScale,
                    }}
                    transition={{ delay: g.delay, type: "spring", stiffness: 220, damping: 20 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Bridge card — always mounted, size changes via layout ──── */}
          <div style={{ perspective: "900px", zIndex: 10 }}>
            <motion.div
              layout
              style={{ width: cardW, height: cardH, position: "relative" }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
            >
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
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <CardBack style={{ width: "100%", height: "100%" }} />
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
            </motion.div>
          </div>

          {/* ── Intro text — absolute below card area, no layout impact ──── */}
          {/* Positioned via top:100% relative to card stack area (position:relative) */}
          <AnimatePresence>
            {showIntro && (
              <motion.div
                key="intro-text"
                className="absolute flex flex-col items-center gap-2"
                style={{ top: "100%", paddingTop: 20, left: 0, right: 0 }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.6 }}
              >
                <p
                  className="font-script text-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFFDF9 0%, #F4D03F 40%, #E8B4A0 80%, #FFFDF9 100%)",
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
                  {cards.length} cards · swipe to browse
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Skip button — absolute inside portal = viewport bottom-right ── */}
        <AnimatePresence>
          {onSkip && !skipped && (
            <motion.button
              key="skip-btn"
              type="button"
              onClick={onSkip}
              className="absolute bottom-8 right-6 px-4 py-2 rounded-full font-sans text-sm font-bold cursor-pointer"
              style={{
                background: "rgba(255,253,249,0.9)",
                color: "#2d2a26",
                border: "1px solid rgba(184,169,212,0.3)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                pointerEvents: "auto",
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.75, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ delay: 0.5 }}
              whileHover={{ opacity: 1 }}
            >
              Skip ⏭
            </motion.button>
          )}
        </AnimatePresence>
      </Backdrop>

      {/* Placeholder so the section keeps its height */}
      <div className="min-h-[200px]" />
    </>
  );
};

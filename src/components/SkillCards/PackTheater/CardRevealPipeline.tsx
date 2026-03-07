/**
 * CardRevealPipeline — continuous-rotation spotlight reveal
 *
 * Rotation cycle per card:
 *   base+0°   → base-180°  : flip IN  (back → front)  ~0.42s
 *   hold at base-180°                                  ~0.75s / 1.6s
 *   base-180° → base-270°  : flip OUT first half       ~0.22s  ← edge-on: swap content
 *   base-270° → base-360°  : flip OUT second half      ~0.22s
 *
 * Intro sequence (added):
 *   On mount → overlay opens → ghost cards cascade + "Your cards are ready!"
 *   After 2s  → ghost cards + text fade out, card grows 200×290 → 310×452
 *   After 550ms settle → first card flip starts
 */

import type { Skill } from "@/data/skills";
import { cn } from "@lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CardBack } from "../CardBack";
import { HireMeCard } from "../HireMeCard";
import { rarityShimmer } from "../shimmers";
import { CARD_H, CARD_W, SkillCard } from "../SkillCard";
import type { HireMeSkill, RevealCard } from "./useTheaterState";

// ─── Spotlight dimensions ─────────────────────────────────────────────────────
const SPOTLIGHT_W = 310;
const SPOTLIGHT_H = 452;
const SPOTLIGHT_SCALE = SPOTLIGHT_W / CARD_W;

// ─── Intro dimensions ─────────────────────────────────────────────────────────
const INTRO_W = 200;
const INTRO_H = 290;

// ─── Timing ───────────────────────────────────────────────────────────────────
const FLIP_IN_S = 0.42;
const FLIP_OUT_HALF_S = 0.22;
const HOLD_MS = 750;
const HIRE_ME_HOLD_MS = 1600;
const INTRO_DURATION_MS = 2000;
const BRIDGE_SETTLE_MS = 550;

// ─── Ghost card configs ───────────────────────────────────────────────────────
const GHOST_CARDS = [
  { delay: 0,    fromY: -220, fromX: -90, toRotate: -13, toX: -42, zIndex: 1, toScale: 0.93 },
  { delay: 0.07, fromY: -240, fromX:  70, toRotate:   9, toX:  38, zIndex: 2, toScale: 0.91 },
  { delay: 0.14, fromY: -200, fromX: -35, toRotate:  -4, toX: -16, zIndex: 3, toScale: 0.96 },
  { delay: 0.21, fromY: -260, fromX:  25, toRotate:   3, toX:  12, zIndex: 4, toScale: 0.97 },
];

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
  const rotBase = useRef(0);
  const busy = useRef(false);
  const queue = useRef<RevealCard[]>([]);
  const placedCount = useRef(0);
  const introFinished = useRef(false);

  const [frontContent, setFrontContent] = useState<React.ReactNode>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);   // open for intro
  const [showIntro, setShowIntro] = useState(true);
  const [cardW, setCardW] = useState(INTRO_W);                   // grows after intro
  const [cardH, setCardH] = useState(INTRO_H);
  const [currentCard, setCurrentCard] = useState<RevealCard | null>(null);
  const [placedSet, setPlacedSet] = useState<Set<number>>(new Set());

  const positions = useMemo(() => generatePositions(cards.length), [cards.length]);

  // ── Core animation sequence for one card ──────────────────────────────────
  const revealOne = useCallback(
    async (card: RevealCard, idx: number) => {
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

      // 1 — Flip IN
      await controls.start({
        rotateY: base - 180,
        transition: { duration: FLIP_IN_S, ease: [0.645, 0.045, 0.355, 1.0] },
      });

      // 2 — Hold
      await delay(holdMs);

      // 3 — Flip OUT first half → card is edge-on → place in scatter
      await controls.start({
        rotateY: base - 270,
        transition: { duration: FLIP_OUT_HALF_S, ease: "easeIn" },
      });

      setPlacedSet((prev) => new Set(prev).add(idx));
      placedCount.current += 1;

      if (placedCount.current === cards.length) {
        setOverlayVisible(false);
        await delay(900);
        onAllDone();
      }

      // 4 — Flip OUT second half
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
    while (queue.current.length > 0) {
      busy.current = true;
      const item = queue.current.shift()!;
      const idx = cards.findIndex((c) => c.id === item.id);
      await revealOne(item, idx);
      busy.current = false;
    }
  }, [cards, revealOne]);

  // ── Intro done: grow card → wait for spring → start flips ────────────────
  const handleIntroDone = useCallback(() => {
    setShowIntro(false);
    setCardW(SPOTLIGHT_W);
    setCardH(SPOTLIGHT_H);
    introFinished.current = true;
    setTimeout(() => processQueue(), BRIDGE_SETTLE_MS);
  }, [processQueue]);

  // ── Dim AppBar — useLayoutEffect fires before paint, syncs with framer-motion
  useLayoutEffect(() => {
    document.body.classList.add("card-reveal-active");
    return () => document.body.classList.remove("card-reveal-active");
  }, []);

  // ── Intro timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (skipped) return;
    const t = setTimeout(handleIntroDone, INTRO_DURATION_MS);
    return () => clearTimeout(t);
  }, [handleIntroDone, skipped]);

  // ── Feed cards from parent ────────────────────────────────────────────────
  useEffect(() => {
    if (skipped || revealedCount === 0) return;
    const idx = revealedCount - 1;
    const card = cards[idx];
    if (!card) return;
    queue.current.push(card);
    processQueue();
  }, [revealedCount, skipped, cards, processQueue]);

  // ── Skip ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!skipped) return;
    setOverlayVisible(false);
    setShowIntro(false);
    introFinished.current = true;
    busy.current = false;
    queue.current = [];
    setPlacedSet(new Set(cards.map((_, i) => i)));
    onAllDone();
  }, [skipped, cards, onAllDone]);

  // ── Derived layout values ─────────────────────────────────────────────────
  const halfW = CARD_W / 2;
  const halfH = CARD_H / 2;
  const isHireMeCard = currentCard && isHireMe(currentCard);

  return (
    <>
      {/* ── Overlay: dim + glow ─────────────────────────────────────────── */}
      <AnimatePresence>
        {overlayVisible && (
          <div
            key="spotlight-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
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
                width: 480, height: 480,
                background: showIntro || !currentCard
                  ? "radial-gradient(ellipse, rgba(244,208,63,0.26) 0%, transparent 70%)"
                  : isHireMeCard
                    ? "radial-gradient(ellipse, rgba(244,208,63,0.28) 0%, transparent 70%)"
                    : "radial-gradient(ellipse, rgba(184,169,212,0.22) 0%, transparent 70%)",
              }}
              animate={{ scale: showIntro ? 1.12 : 1 }}
              transition={{ duration: 0.5 }}
              initial={{ scale: 0, opacity: 0 }}
              exit={{ scale: 0.6, opacity: 0 }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* ── Card + intro elements (always mounted while revealing) ─────────── */}
      {!skipped && (
        <div
          className="fixed inset-0 z-[101] flex flex-col items-center justify-center gap-6 pointer-events-none"
          style={{ visibility: overlayVisible ? "visible" : "hidden" }}
        >
          {/* ── Card stack area ──────────────────────────────────────────── */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: SPOTLIGHT_W + 100, height: SPOTLIGHT_H + 80 }}
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
                      inset: -80, borderRadius: "50%",
                      background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(244,208,63,0.28) 0%, transparent 70%)",
                      filter: "blur(28px)",
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
                        width: INTRO_W, height: INTRO_H,
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

            {/* ── Bridge card — always mounted, grows via layout ─────────── */}
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

          {/* ── Intro text — fades out when intro ends ───────────────────── */}
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
                  className="font-script text-3xl"
                  style={{
                    background: "linear-gradient(135deg, #FFFDF9 0%, #F4D03F 40%, #E8B4A0 80%, #FFFDF9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 2px 14px rgba(244,208,63,0.45))",
                  }}
                >
                  Your cards are ready!
                </p>
                <p
                  className="font-sans text-xs tracking-widest uppercase"
                  style={{ color: "rgba(255,253,249,0.45)" }}
                >
                  16 cards · click to explore
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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
              const sh = isHireMe(card) ? null : rarityShimmer(card.rarity);

              return (
                <motion.div
                  key={card.id}
                  className="absolute cursor-pointer"
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
                  whileHover={{
                    scale: 1.08,
                    zIndex: 50,
                    y: pos.y - halfH - 8,
                    transition: { duration: 0.18, ease: "easeOut" },
                  }}
                >
                  {isHireMe(card) ? (
                    <HireMeCard />
                  ) : (
                    <SkillCard
                      skill={card as Skill}
                      onSelect={() => onCardSelect(card as Skill)}
                      Shimmer={sh?.Shimmer}
                      shimmerIntensity={sh?.intensity}
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

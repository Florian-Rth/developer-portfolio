/**
 * MobilePackTheater — Mobile TCG pack opening experience
 *
 * Flow: idle → bursting → revealing → scattered (MobileCardStack)
 *
 * Uses the same horizontal drag-tear mechanic as desktop (PackTearInteractive).
 * After bursting, cards are revealed one-by-one in a centered spotlight
 * (MobileRevealPipeline), then the Tinder-swipe stack appears.
 */

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import type React from "react";
import { useSkillCards } from "./SkillCardsProvider";
import { MobileCardStack } from "./MobileCardStack";
import { MobileRevealPipeline } from "./MobileRevealPipeline";
import { GhostCards } from "./PackTheater/GhostCards";
import { PackBurstAnimation } from "./PackTheater/PackBurstAnimation";
import { PackTearInteractive } from "./PackTheater/PackTearInteractive";
import { SectionHeading } from "./PackTheater/SectionHeading";
import { TechPills } from "./PackTheater/TechPills";
import { useTheaterState } from "./PackTheater/useTheaterState";

// ─── Mobile-specific CTA ──────────────────────────────────────────────────────
const MobilePackCTA: React.FC = () => (
  <div className="flex flex-col items-center mt-2 gap-2">
    <div
      className="flex items-center gap-3 px-6 py-3 rounded-full select-none"
      style={{
        background: "linear-gradient(135deg, rgba(123,95,199,0.15) 0%, rgba(224,64,128,0.12) 100%)",
        border: "1.5px solid rgba(123,95,199,0.4)",
        boxShadow: "0 4px 20px rgba(123,95,199,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        animation: "ctaFloat 2.5s ease-in-out infinite",
      }}
    >
      <span className="font-sans text-sm font-semibold tracking-wider uppercase" style={{ color: "#7B5FC7" }}>
        ← Hold left edge &amp; rip →
      </span>
    </div>
  </div>
);

// ─── Floating sparkles ────────────────────────────────────────────────────────
const SPARKLE_CONFIGS = [
  { top: "18%", left: "10%", delay: "0s", size: 4 },
  { top: "20%", left: "88%", delay: "0.8s", size: 3 },
  { top: "72%", left: "6%", delay: "1.6s", size: 5 },
  { top: "75%", left: "90%", delay: "0.4s", size: 3 },
  { top: "45%", left: "4%", delay: "1.2s", size: 4 },
  { top: "50%", left: "93%", delay: "2s", size: 3 },
];

const IdleSparkles: React.FC = () => (
  <>
    {SPARKLE_CONFIGS.map((s) => (
      <div
        key={`sparkle-${s.top}-${s.left}`}
        className="absolute pointer-events-none"
        style={{
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          borderRadius: "50%",
          background: "rgba(255,253,240,0.9)",
          boxShadow: `0 0 ${s.size * 2}px rgba(244,208,63,0.6), 0 0 ${s.size * 4}px rgba(244,208,63,0.3)`,
          animation: "sparkleFloat 3s ease-in-out infinite",
          animationDelay: s.delay,
        }}
      />
    ))}
  </>
);

// ─── MobilePackTheater ────────────────────────────────────────────────────────
export const MobilePackTheater: React.FC = () => {
  const {
    phase,
    orderedCards,
    revealedCount,
    skipped,
    startBurst,
    startReveal,
    skip,
    reset,
    markScattered,
  } = useTheaterState();

  const { setSelectedSkill } = useSkillCards();

  return (
    <div className="relative">
      <AnimatePresence mode="wait">

        {/* ── IDLE ──────────────────────────────────────────────────────── */}
        {phase === "idle" && (
          <motion.div
            key="idle"
            className="flex flex-col items-center justify-center min-h-[560px] gap-4"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
          >
            <SectionHeading />

            <div
              className="relative flex items-center justify-center p-8"
            >
              {/* Floating sparkles */}
              <IdleSparkles />

              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                  background: `
                    radial-gradient(ellipse 150px 190px at 50% 50%, rgba(212,88,122,0.22) 0%, transparent 100%),
                    radial-gradient(ellipse 200px 250px at 50% 50%, rgba(139,110,199,0.16) 0%, transparent 100%)
                  `,
                }}
              />

              {/* Pack + ghost cards */}
              <div
                className="relative flex items-center justify-center"
                style={{ animation: "floatBob 4s ease-in-out infinite" }}
              >
                <GhostCards compact />
                <PackTearInteractive onTearComplete={startBurst} mobileMode />
              </div>
            </div>

            <MobilePackCTA />
            <TechPills />
          </motion.div>
        )}

        {/* ── BURSTING ────────────────────────────────────────────────── */}
        {phase === "bursting" && (
          <motion.div
            key="bursting"
            className="flex flex-col items-center justify-center min-h-[520px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PackBurstAnimation onBurstComplete={startReveal} />
          </motion.div>
        )}

        {/* ── SKIP button during reveal ────────────────────────────────── */}
        {phase === "revealing" && !skipped && (
          <motion.button
            key="skip-btn"
            type="button"
            onClick={skip}
            className="fixed bottom-8 right-6 z-[102] px-4 py-2 rounded-full font-sans text-sm font-bold cursor-pointer transition-opacity hover:opacity-100"
            style={{
              background: "rgba(255,253,249,0.9)",
              color: "#2d2a26",
              border: "1px solid rgba(184,169,212,0.3)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              opacity: 0.75,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Skip ⏭
          </motion.button>
        )}

        {/* ── REVEALING ───────────────────────────────────────────────── */}
        {phase === "revealing" && (
          <motion.div
            key="revealing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MobileRevealPipeline
              cards={orderedCards}
              revealedCount={revealedCount}
              skipped={skipped}
              onCardSelect={setSelectedSkill}
              onAllDone={markScattered}
            />
          </motion.div>
        )}

        {/* ── SCATTERED → Tinder stack ─────────────────────────────────── */}
        {phase === "scattered" && (
          <motion.div
            key="scattered"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <div className="text-center pt-2 pb-2">
              <SectionHeading subtitle="Tap any card to explore" />
            </div>
            <MobileCardStack />
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={reset}
                className="font-script text-sm text-foreground/40 hover:text-foreground/60 cursor-pointer transition-colors"
              >
                ↺ Open again
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

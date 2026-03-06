/**
 * MobilePackTheater — Mobile TCG pack opening experience
 *
 * Flow: idle → swipe-up → bursting → revealing → scattered (MobileCardStack)
 *
 * On mobile, the user swipes UP on the pack to tear it open.
 * After the burst animation, cards briefly materialize,
 * then the MobileCardStack appears with an entrance animation.
 */

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { MobileCardStack } from "./MobileCardStack";
import { PackBurstAnimation } from "./PackTheater/PackBurstAnimation";
import { SectionHeading } from "./PackTheater/SectionHeading";
import { TechPills } from "./PackTheater/TechPills";
import {
  PACK_GRADIENT,
  PACK_H,
  PACK_W,
} from "./PackTheater/packConstants";
import { useTheaterState } from "./PackTheater/useTheaterState";

// ─── Mobile pack scale ────────────────────────────────────────────────────────
// Larger pack for better touch targets on mobile
const MOBILE_SCALE = 1.2;
const MOBILE_PACK_W = Math.round(PACK_W * MOBILE_SCALE);
const MOBILE_PACK_H = Math.round(PACK_H * MOBILE_SCALE);

// Drag threshold: how far up (px) before auto-completing tear
const DRAG_THRESHOLD = -100;
const DRAG_VELOCITY_THRESHOLD = -550;

// ─── Floating sparkles ────────────────────────────────────────────────────────
const SPARKLE_CONFIGS = [
  { top: "15%", left: "12%", delay: "0s", size: 4 },
  { top: "25%", left: "85%", delay: "0.8s", size: 3 },
  { top: "70%", left: "8%", delay: "1.6s", size: 5 },
  { top: "80%", left: "88%", delay: "0.4s", size: 3 },
  { top: "45%", left: "5%", delay: "1.2s", size: 4 },
  { top: "55%", left: "92%", delay: "2s", size: 3 },
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
          animation: `sparkleFloat 3s ease-in-out infinite`,
          animationDelay: s.delay,
        }}
      />
    ))}
  </>
);

// ─── MobileCTA ───────────────────────────────────────────────────────────────
const MobileCTA: React.FC = () => (
  <div className="flex flex-col items-center mt-6">
    <div
      className="flex items-center gap-3 px-6 py-3 rounded-full select-none"
      style={{
        background:
          "linear-gradient(135deg, rgba(123,95,199,0.15) 0%, rgba(224,64,128,0.12) 100%)",
        border: "1.5px solid rgba(123,95,199,0.4)",
        boxShadow:
          "0 4px 20px rgba(123,95,199,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        animation: "ctaFloat 2.5s ease-in-out infinite",
      }}
    >
      <span
        className="text-xl"
        style={{ animation: "swipeUp 1.4s ease-in-out infinite" }}
      >
        ☝️
      </span>
      <span
        className="font-sans text-sm font-semibold tracking-wider uppercase"
        style={{ color: "#7B5FC7" }}
      >
        Swipe up to open
      </span>
    </div>
  </div>
);

// ─── PackVisual ───────────────────────────────────────────────────────────────
// The pack artwork — extracted so it can be shared in idle + drag states
const PackVisual: React.FC<{ shimmerAngle?: number }> = ({
  shimmerAngle = 180,
}) => (
  <div
    className="relative rounded-2xl overflow-hidden"
    style={{ width: MOBILE_PACK_W, height: MOBILE_PACK_H }}
  >
    {/* Base gradient */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{ background: PACK_GRADIENT }}
    />
    {/* Brushwork texture */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        opacity: 0.15,
        backgroundImage: `
          repeating-linear-gradient(45deg, transparent 0px, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 9px),
          repeating-linear-gradient(-30deg, transparent 0px, transparent 12px, rgba(180,160,140,0.2) 12px, rgba(180,160,140,0.2) 13px)
        `,
      }}
    />
    {/* Shimmer */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: `conic-gradient(from ${shimmerAngle}deg at 50% 50%,
          rgba(184,169,212,0.3) 0deg,
          rgba(232,180,160,0.3) 60deg,
          rgba(212,146,155,0.3) 120deg,
          rgba(168,196,184,0.3) 180deg,
          rgba(184,169,212,0.3) 240deg,
          rgba(244,208,63,0.2) 300deg,
          rgba(184,169,212,0.3) 360deg)`,
        mixBlendMode: "overlay",
      }}
    />
    {/* Fresnel border */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        boxShadow: `
          inset 0 0 30px rgba(255,255,255,0.15),
          inset 0 0 60px rgba(184,169,212,0.1),
          0 4px 30px rgba(184,169,212,0.2),
          0 8px 60px rgba(212,146,155,0.15)
        `,
      }}
    />
    {/* Pack content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 pointer-events-none">
      <span
        className="font-script text-3xl"
        style={{
          background:
            "linear-gradient(135deg, #FFFDF9 0%, #F4D03F 30%, #FFFDF9 50%, #E8B4A0 70%, #FFFDF9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 2px 8px rgba(244,208,63,0.3))",
        }}
      >
        Florian Rätsch
      </span>
      <div
        className="flex items-center gap-2 px-3 py-1 rounded-full"
        style={{
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        <span
          className="font-sans text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,253,249,0.9)" }}
        >
          16 Skills
        </span>
      </div>
    </div>
    {/* Tear perforation hint */}
    <div
      className="absolute left-0 right-0 pointer-events-none"
      style={{
        top: Math.round(PACK_H * 0.28 * MOBILE_SCALE),
        height: 1,
        background:
          "repeating-linear-gradient(to right, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 6px, transparent 6px, transparent 10px)",
        opacity: 0.5,
      }}
    />
  </div>
);

// ─── Card cascade configs ─────────────────────────────────────────────────────
const CASCADE_CARDS = [
  { delay: 0, fromY: -200, fromX: -80, toRotate: -12, toX: -40, zIndex: 1 },
  { delay: 0.08, fromY: -220, fromX: 60, toRotate: 8, toX: 35, zIndex: 2 },
  { delay: 0.16, fromY: -180, fromX: -30, toRotate: -5, toX: -15, zIndex: 3 },
  { delay: 0.24, fromY: -240, fromX: 20, toRotate: 3, toX: 10, zIndex: 4 },
  { delay: 0.32, fromY: -200, fromX: 0, toRotate: 0, toX: 0, zIndex: 5 },
];

// ─── MobileRevealFlash ────────────────────────────────────────────────────────
// Dramatic card cascade: cards fly in from above and stack up
const MobileRevealFlash: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[520px] gap-4 overflow-hidden">
      {/* Light burst background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.3] }}
        transition={{ duration: 0.8, times: [0, 0.3, 1] }}
        style={{
          background: `
            radial-gradient(ellipse 300px 400px at 50% 45%, rgba(244,208,63,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 200px 300px at 50% 50%, rgba(184,169,212,0.2) 0%, transparent 60%)
          `,
        }}
      />

      {/* Card stack area */}
      <div className="relative" style={{ width: 200, height: 290 }}>
        {CASCADE_CARDS.map((card, i) => (
          <motion.div
            key={card.delay}
            className="absolute rounded-2xl"
            style={{
              width: 200,
              height: 290,
              background: "linear-gradient(145deg, #A890D0 0%, #D8A8C0 55%, #E0907A 100%)",
              boxShadow: "0 12px 40px rgba(120,90,160,0.4)",
              border: "1.5px solid rgba(255,255,255,0.5)",
              zIndex: card.zIndex,
              left: 0,
              top: 0,
            }}
            initial={{
              y: card.fromY,
              x: card.fromX,
              rotate: -30 + i * 8,
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              y: -i * 4,
              x: card.toX,
              rotate: card.toRotate,
              opacity: 1,
              scale: 1 - i * 0.02,
            }}
            transition={{
              delay: card.delay,
              type: "spring",
              stiffness: 200,
              damping: 18,
            }}
          />
        ))}

        {/* Top card with shimmer */}
        <motion.div
          className="absolute rounded-2xl overflow-hidden"
          style={{
            width: 200,
            height: 290,
            background: PACK_GRADIENT,
            boxShadow: "0 20px 60px rgba(184,169,212,0.5)",
            border: "2px solid rgba(255,255,255,0.6)",
            zIndex: 10,
            left: 0,
            top: 0,
          }}
          initial={{ y: -260, x: 0, rotate: 15, opacity: 0, scale: 0.6 }}
          animate={{ y: -20, x: 0, rotate: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 180, damping: 16 }}
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Text */}
      <motion.p
        className="font-script text-xl text-foreground/60"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        Your cards are ready!
      </motion.p>
    </div>
  );
};

// ─── MobilePackTheater ────────────────────────────────────────────────────────
export const MobilePackTheater: React.FC = () => {
  const { phase, startBurst, startReveal, markScattered, reset } =
    useTheaterState();

  // Motion values for swipe-up gesture
  const y = useMotionValue(0);
  const packScale = useTransform(y, [-300, 0], [0.82, 1]);
  const packOpacity = useTransform(y, [-280, -60, 0], [0, 0.9, 1]);
  const glowOpacity = useTransform(y, [-100, 0], [0, 1]);
  // Drag progress glow — intensifies as user drags up
  const dragGlowOpacity = useTransform(y, [0, -50, -100], [0, 0.4, 0.9]);
  const dragGlowScale = useTransform(y, [0, -100], [0.8, 1.3]);
  // shimmerAngle tracks drag progress for a reactive shimmer effect
  const [shimmerAngle, setShimmerAngle] = useState(180);
  const shimmerMV = useTransform(y, [-300, 0], [360, 180]);

  // Sync shimmerAngle state with motion value
  useEffect(() => {
    return shimmerMV.on("change", (v) => setShimmerAngle(Math.round(v)));
  }, [shimmerMV]);

  // Flash state for completion effect
  const [showFlash, setShowFlash] = useState(false);

  const completeTear = useCallback(() => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 300);
    setTimeout(() => startBurst(), 350);
  }, [startBurst]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      const swipedFar = info.offset.y < DRAG_THRESHOLD;
      const swipedFast = info.velocity.y < DRAG_VELOCITY_THRESHOLD;
      if (swipedFar || swipedFast) {
        completeTear();
      } else {
        animate(y, 0, { type: "spring", stiffness: 500, damping: 32 });
      }
    },
    [completeTear, y],
  );

  return (
    <div className="relative">
      {/* ── IDLE ─────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="idle"
            className="flex flex-col items-center justify-center min-h-[560px] gap-3"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
          >
            <SectionHeading />

            <div
              className="relative flex items-center justify-center p-8"
              style={{ touchAction: "none" }}
            >
              {/* Floating sparkles */}
              <IdleSparkles />

              {/* Focused glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: glowOpacity }}
                aria-hidden="true"
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `
                      radial-gradient(ellipse 160px 200px at 50% 50%, rgba(212,88,122,0.25) 0%, transparent 100%),
                      radial-gradient(ellipse 210px 260px at 50% 50%, rgba(139,110,199,0.18) 0%, transparent 100%)
                    `,
                  }}
                />
              </motion.div>

              {/* Drag progress glow — energy building up */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  opacity: dragGlowOpacity,
                  scale: dragGlowScale,
                  width: MOBILE_PACK_W + 100,
                  height: MOBILE_PACK_H + 120,
                  left: "50%",
                  top: "50%",
                  x: "-50%",
                  y: "-50%",
                  background: `
                    radial-gradient(ellipse 50% 50% at 50% 50%, 
                      rgba(244,208,63,0.5) 0%, 
                      rgba(232,180,160,0.3) 40%, 
                      transparent 70%)
                  `,
                  filter: "blur(20px)",
                  zIndex: 0,
                }}
              />

              {/* Ghost cards (static, behind pack) */}
              <div
                className="relative"
                style={{
                  width: MOBILE_PACK_W,
                  height: MOBILE_PACK_H,
                  animation: "floatBob 4s ease-in-out infinite",
                }}
              >
                {/* Ghost cards — higher contrast for mobile */}
                {[
                  { rotate: 17, tx: 58, ty: 20, scale: 0.92, opacity: 0.85 },
                  { rotate: -16, tx: -56, ty: 16, scale: 0.94, opacity: 0.9 },
                ].map((g) => (
                  <div
                    key={g.rotate}
                    className="absolute rounded-2xl"
                    style={{
                      width: MOBILE_PACK_W,
                      height: MOBILE_PACK_H,
                      background:
                        "linear-gradient(145deg, #9B7FC9 0%, #D4A0B8 55%, #E8907A 100%)",
                      opacity: g.opacity,
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) rotate(${g.rotate}deg) translateX(${g.tx}px) translateY(${g.ty}px) scale(${g.scale})`,
                      boxShadow: "0 18px 55px rgba(120,90,160,0.35)",
                      border: "1.5px solid rgba(255,255,255,0.55)",
                    }}
                  />
                ))}

                {/* Draggable pack */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    y,
                    scale: packScale,
                    opacity: packOpacity,
                    cursor: "grab",
                    zIndex: 10,
                  }}
                  drag="y"
                  dragConstraints={{ top: -300, bottom: 10 }}
                  dragElastic={{ top: 0.4, bottom: 0.1 }}
                  dragMomentum={false}
                  onDragEnd={handleDragEnd}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <PackVisual shimmerAngle={shimmerAngle} />

                  {/* Flash overlay */}
                  {showFlash && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: "white",
                        zIndex: 25,
                        animation: "tearFlash 300ms ease-out forwards",
                      }}
                    />
                  )}
                </motion.div>
              </div>
            </div>

            <MobileCTA />
            <TechPills />
          </motion.div>
        )}

        {/* ── BURSTING ──────────────────────────────────────────────────── */}
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

        {/* ── REVEALING ─────────────────────────────────────────────────── */}
        {phase === "revealing" && (
          <motion.div
            key="revealing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MobileRevealFlash onDone={markScattered} />
          </motion.div>
        )}

        {/* ── SCATTERED → MobileCardStack ───────────────────────────────── */}
        {phase === "scattered" && (
          <motion.div
            key="scattered"
            initial={{ opacity: 0, y: 30 }}
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

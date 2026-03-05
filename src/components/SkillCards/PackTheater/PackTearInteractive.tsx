import { cn } from "@lib/utils";
import type React from "react";
import { useCallback, useRef, useState } from "react";

type PackTearInteractiveProps = {
  onTearComplete: () => void;
};

const PACK_W = 260;
const PACK_H = 380;
const TEAR_Y = Math.round(PACK_H * 0.28); // ~107px

const TEAR_PATH =
  "M0,0 C15,-8 25,0 40,-6 C55,-12 65,2 80,-5 C95,-12 105,6 120,-4 C135,-14 145,4 160,-8 C175,-12 185,3 200,-6 C215,-9 225,5 240,-2 L260,0";

export const PackTearInteractive: React.FC<PackTearInteractiveProps> = ({ onTearComplete }) => {
  const packRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [tearProgress, setTearProgress] = useState(0);
  const [isTearing, setIsTearing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const tiltX = (mouse.y - 0.5) * -15;
  const tiltY = (mouse.x - 0.5) * 15;
  const shimmerAngle = mouse.x * 360;


  const completeTear = useCallback(() => {
    setIsTearing(false);
    setIsComplete(true);
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 300);
    setTimeout(() => onTearComplete(), 350);
  }, [onTearComplete]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = packRef.current;
      if (!el || isComplete) return;
      const rect = el.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      if (localX / PACK_W > 0.35) return;
      if (Math.abs(localY - TEAR_Y) > 25) return;

      setIsTearing(true);
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [isComplete],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = packRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width;
      const my = (e.clientY - rect.top) / rect.height;
      setMouse({ x: mx, y: my });

      if (!isTearing) return;
      const localX = e.clientX - rect.left;
      const progress = Math.min(1, Math.max(tearProgress, localX / PACK_W));
      setTearProgress(progress);
      if (progress >= 0.92) completeTear();
    },
    [isTearing, tearProgress, completeTear],
  );

  const handlePointerUp = useCallback(() => {
    if (!isTearing) return;
    if (tearProgress > 0.8) {
      completeTear();
    } else {
      setIsTearing(false);
      setTearProgress(0);
    }
  }, [isTearing, tearProgress, completeTear]);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0.5, y: 0.5 });
  }, []);

  const glowStrokeWidth = 6 + tearProgress * 18;
  const leakW = 50 + tearProgress * 120;
  const leakH = 100 + tearProgress * 260;

  return (
    <div
      ref={packRef}
      className="relative select-none w-[260px] h-[380px]"
      style={{ perspective: "800px", touchAction: "none" }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D tilt wrapper */}
      <div
        className="w-full h-full relative rounded-2xl overflow-hidden"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Layer 1: Base gradient */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, #B8A9D4 0%, #E8B4A0 40%, #D4929B 70%, #B8A9D4 100%)",
          }}
        />

        {/* Layer 2: Brushwork texture */}
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

        {/* Layer 3: Conic shimmer */}
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

        {/* Layer 5: Fresnel border glow */}
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

        {/* Pack thickness / stack shadow */}
        <div
          className="absolute -bottom-1 left-1 right-1 h-3 rounded-b-2xl"
          style={{
            background: "linear-gradient(to bottom, rgba(160,140,170,0.4), rgba(140,120,150,0.2))",
            filter: "blur(1px)",
            transform: "translateZ(-2px)",
          }}
        />
        <div
          className="absolute -bottom-2 left-2 right-2 h-2 rounded-b-2xl"
          style={{
            background: "rgba(140,120,150,0.15)",
            filter: "blur(2px)",
            transform: "translateZ(-4px)",
          }}
        />

        {/* Pack content: title + card count */}
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
            FlorianRth
          </span>
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span className="text-[10px] font-sans font-bold tracking-[0.15em] text-white/70 uppercase">
              16 Cards
            </span>
          </div>
        </div>

        {/* Perforation line (visible while not complete) */}
        {!isComplete && (
          <div
            className="absolute left-0 w-full pointer-events-none"
            style={{ top: TEAR_Y - 1, height: 2, zIndex: 15 }}
          >
            <svg
              viewBox={`0 0 ${PACK_W} 2`}
              className="w-full h-full"
              preserveAspectRatio="none"
              role="img"
              aria-label="Perforation line"
            >
              <line
                x1={0}
                y1={1}
                x2={PACK_W}
                y2={1}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={1}
                strokeDasharray="4 6"
                style={{ filter: "blur(0.5px)" }}
              />
            </svg>
            {/* Scissors icon left */}
            <span
              className="absolute text-white/60 select-none"
              style={{
                left: -20,
                top: -8,
                fontSize: 14,
                transform: "rotate(-45deg)",
              }}
            >
              ✂
            </span>
            {/* Arrow hint right */}
            <span
              className="absolute text-white/30 select-none"
              style={{ right: -16, top: -6, fontSize: 12 }}
            >
              →
            </span>
          </div>
        )}

        {/* Completion flash */}
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

        {/* Interaction zone */}
        <div
          className={cn(
            "absolute left-0 w-full z-30",
            !isTearing && !isComplete ? "cursor-crosshair" : "",
            isTearing ? "cursor-none" : "",
          )}
          style={{
            top: TEAR_Y - 25,
            height: 50,
          }}
          onPointerDown={handlePointerDown}
        />
      </div>

      {/* Progressive tear SVG — outside overflow-hidden so glow bleeds freely */}
      {tearProgress > 0 && (
        <div
          className="absolute left-0 w-full pointer-events-none"
          style={{ top: TEAR_Y - 60, height: 120, zIndex: 21 }}
        >
          <svg
            viewBox="0 -60 260 120"
            className="w-full h-full"
            preserveAspectRatio="none"
            role="img"
            aria-label="Tear progress"
          >
            <defs>
              <clipPath id="tearClip">
                <rect x={0} y={-60} width={tearProgress * PACK_W} height={120} />
              </clipPath>
            </defs>

            {/* Layer 1: Wide glow — free to bleed top/bottom */}
            <path
              d={TEAR_PATH}
              fill="none"
              stroke="rgba(255,240,200,0.55)"
              strokeWidth={glowStrokeWidth}
              clipPath="url(#tearClip)"
              style={{ filter: "blur(10px)" }}
            />

            {/* Layer 2: Crisp tear line */}
            <path
              d={TEAR_PATH}
              fill="none"
              stroke="rgba(255,253,249,0.95)"
              strokeWidth={2}
              clipPath="url(#tearClip)"
              style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.9))" }}
            />
          </svg>
        </div>
      )}

      {/* Light leak — outside overflow-hidden so it bleeds beyond card edges */}
      {tearProgress > 0 && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: tearProgress * PACK_W - leakW / 2,
            top: TEAR_Y - leakH / 2,
            width: leakW,
            height: leakH,
            background:
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,250,235,0.95), rgba(255,240,180,0.5) 35%, rgba(255,220,120,0.2) 60%, transparent 80%)",
            opacity: tearProgress * 0.95,
            mixBlendMode: "screen",
            zIndex: 20,
            filter: "blur(2px)",
          }}
        />
      )}

      {/* Flash keyframe style */}
      <style>
        {`@keyframes tearFlash {
          0% { opacity: 0; }
          40% { opacity: 0.7; }
          100% { opacity: 0; }
        }`}
      </style>
    </div>
  );
};

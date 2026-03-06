import type { Skill } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";
import { CardRevealPipeline } from "./CardRevealPipeline";
import { GhostCards } from "./GhostCards";
import { PackBurstAnimation } from "./PackBurstAnimation";
import { PackCTA } from "./PackCTA";
import { PackTearInteractive } from "./PackTearInteractive";
import { SectionHeading } from "./SectionHeading";
import { TechPills } from "./TechPills";
import { useTheaterState } from "./useTheaterState";

type PackTheaterProps = {
  onCardSelect: (skill: Skill) => void;
  className?: string;
};

export const PackTheater: React.FC<PackTheaterProps> = ({ onCardSelect, className }) => {
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

  return (
    <div className={cn("relative", className)}>
      {/* Stage lighting — spans full viewport width to avoid max-w clipping */}
      {phase === "idle" && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            background: `
              radial-gradient(ellipse 60% 45% at 50% 50%, rgba(212,88,122,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 50% 55%, rgba(139,110,199,0.1) 0%, transparent 70%)
            `,
          }}
        />
      )}

      {/* ── Idle: interactive tear ─────────────────────────────────────── */}
      {phase === "idle" && (
        <div className="flex flex-col items-center justify-center min-h-[520px] gap-4">
          <SectionHeading />

          <div
            className="relative flex items-center justify-center p-8"
            style={{
              animation: "floatBob 4s ease-in-out infinite",
              background:
                "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)",
            }}
          >
            <GhostCards />
            <PackTearInteractive onTearComplete={startBurst} />
          </div>

          <PackCTA />
          <TechPills />
        </div>
      )}

      {/* ── Bursting: pack halves fly apart ───────────────────────────── */}
      {phase === "bursting" && (
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <PackBurstAnimation onBurstComplete={startReveal} />
        </div>
      )}

      {/* ── Skip button during reveal ──────────────────────────────────── */}
      {phase === "revealing" && !skipped && (
        <button
          type="button"
          onClick={skip}
          className={cn(
            "fixed bottom-8 right-8 z-[60]",
            "px-4 py-2 rounded-full",
            "font-sans text-sm font-bold",
            "cursor-pointer",
            "transition-opacity hover:opacity-100",
          )}
          style={{
            background: "rgba(255,253,249,0.9)",
            color: "#2d2a26",
            border: "1px solid rgba(184,169,212,0.3)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            opacity: 0.7,
          }}
        >
          Skip ⏭
        </button>
      )}

      {/* ── Card reveal + scattered field ─────────────────────────────── */}
      {(phase === "revealing" || phase === "scattered") && (
        <CardRevealPipeline
          cards={orderedCards}
          revealedCount={revealedCount}
          skipped={skipped}
          onCardSelect={onCardSelect}
          onAllDone={markScattered}
        />
      )}

      {/* ── Watch again ───────────────────────────────────────────────── */}
      {phase === "scattered" && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={reset}
            className="font-script text-sm text-foreground/40 hover:text-foreground/60 cursor-pointer transition-colors"
          >
            ↺ Watch again
          </button>
        </div>
      )}
    </div>
  );
};

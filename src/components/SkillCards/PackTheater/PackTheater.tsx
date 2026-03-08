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
      {/* ── Idle: interactive tear ─────────────────────────────────────── */}
      {phase === "idle" && (
        <div className="flex flex-col items-center justify-center min-h-[520px] gap-4">
          <SectionHeading />

          <div
            className="relative flex items-center justify-center p-8"
            style={{
              animation: "floatBob 4s ease-in-out infinite",
            }}
          >
            {/* Focused glow — inset-0 stays within the p-8 pack wrapper so
                it never bleeds into the CTA / pills below.
                Fixed-px ellipse radii keep it tight around the cards. */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: `
                  radial-gradient(ellipse 140px 180px at 50% 50%, rgba(212,88,122,0.25) 0%, transparent 100%),
                  radial-gradient(ellipse 190px 240px at 50% 50%, rgba(139,110,199,0.18) 0%, transparent 100%)
                `,
              }}
            />
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

      {/* ── Scattered header — heading + interaction hint ─────────────── */}
      {phase === "scattered" && (
        <div className="text-center pt-2 pb-2">
          <SectionHeading subtitle="Tap any card to explore" />
        </div>
      )}

      {/* ── Card reveal + scattered field ─────────────────────────────── */}
      {(phase === "revealing" || phase === "scattered") && (
        <CardRevealPipeline
          cards={orderedCards}
          revealedCount={revealedCount}
          skipped={skipped}
          onCardSelect={onCardSelect}
          onAllDone={markScattered}
          onSkip={skip}
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

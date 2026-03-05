import type { Skill } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";
import { CardRevealPipeline } from "./CardRevealPipeline";
import { PackGraphic } from "./PackGraphic";
import { PackRip } from "./PackRip";
import { useTheaterState } from "./useTheaterState";

type PackTheaterProps = {
  onCardSelect: (skill: Skill) => void;
  cardScale?: number;
  className?: string;
};

export const PackTheater: React.FC<PackTheaterProps> = ({
  onCardSelect,
  cardScale = 1,
  className,
}) => {
  const { phase, orderedCards, revealedCount, skipped, startReveal, skip, reset } =
    useTheaterState();

  const showPack = phase === "idle" || phase === "tearing" || phase === "revealing";
  const isRipped = phase === "tearing" || phase === "revealing";
  const glowing = phase === "revealing" && revealedCount < orderedCards.length;

  return (
    <div className={cn("relative", className)}>
      {/* Stage lighting background */}
      {(phase === "idle" || phase === "tearing") && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(184,169,212,0.15) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Pack — prominent in idle/tearing/revealing */}
      {showPack && !skipped && (
        <div className="flex flex-col items-center justify-center min-h-[500px] gap-6">
          <PackGraphic onClick={phase === "idle" ? startReveal : undefined} opened={isRipped}>
            <PackRip isOpen={isRipped} glowing={glowing} />
          </PackGraphic>

          {phase === "idle" && (
            <p className="font-script text-sm text-foreground/40 text-center pointer-events-none select-none">
              Open Pack ▶
            </p>
          )}
        </div>
      )}

      {/* Mini pack after scattered */}
      {phase === "scattered" && (
        <div className="flex justify-end mb-4">
          <PackGraphic mini opened />
        </div>
      )}

      {/* Skip button during reveal */}
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

      {/* Card reveal pipeline */}
      {(phase === "revealing" || phase === "scattered") && (
        <CardRevealPipeline
          cards={orderedCards}
          revealedCount={revealedCount}
          skipped={skipped}
          onCardSelect={onCardSelect}
          cardScale={cardScale}
        />
      )}

      {/* Watch again button */}
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

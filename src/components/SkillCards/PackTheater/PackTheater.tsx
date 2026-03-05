import type { Skill } from "@/data/skills";
import { cn } from "@lib/utils";
import type React from "react";
import { CardRevealPipeline } from "./CardRevealPipeline";
import { PackBurstAnimation } from "./PackBurstAnimation";
import { PackGraphic } from "./PackGraphic";
import { PackTearInteractive } from "./PackTearInteractive";
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
      {/* Stage lighting background */}
      {phase === "idle" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 45% at 50% 50%, rgba(212,88,122,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 50% 55%, rgba(139,110,199,0.1) 0%, transparent 70%)
            `,
          }}
        />
      )}

      {/* Idle: interactive tear */}
      {phase === "idle" && (
        <div className="flex flex-col items-center justify-center min-h-[520px] gap-4">
          {/* Section heading */}
          <div className="text-center mb-6">
            <h2
              className="font-script inline-block"
              style={{
                fontSize: "clamp(3rem, 6vw, 4.5rem)",
                lineHeight: 1.5,
                background: "linear-gradient(to right, #e8b4a0, #d4929b, #b8a9d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                padding: "0.15em 0.1em 0.1em",
              }}
            >
              Skills.
            </h2>
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-foreground/40 mt-2">
              16 technologies · open the pack to discover
            </p>
          </div>

          {/* Pack + ghost cards stacked behind */}
          <div
            className="relative flex items-center justify-center p-8"
            style={{
              animation: "floatBob 4s ease-in-out infinite",
              background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)",
            }}
          >
            {/* Ghost card right */}
            <div
              className="absolute rounded-2xl"
              style={{
                width: 248,
                height: 362,
                background: "linear-gradient(145deg, #A890D0 0%, #D8A8C0 55%, #E0907A 100%)",
                opacity: 0.7,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(19deg) translateX(66px) translateY(24px) scale(0.91)",
                boxShadow: "0 20px 60px rgba(120,90,160,0.35)",
                border: "1.5px solid rgba(255,255,255,0.45)",
              }}
            />
            {/* Ghost card left */}
            <div
              className="absolute rounded-2xl"
              style={{
                width: 248,
                height: 362,
                background: "linear-gradient(145deg, #A890D0 0%, #D8A8C0 55%, #E0907A 100%)",
                opacity: 0.8,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(-18deg) translateX(-64px) translateY(18px) scale(0.93)",
                boxShadow: "0 16px 50px rgba(120,90,160,0.3)",
                border: "1.5px solid rgba(255,255,255,0.5)",
              }}
            />
            <PackTearInteractive onTearComplete={startBurst} />
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 mt-6">
            {/* Animated hand icon + text */}
            <div
              className="flex items-center gap-4 px-7 py-3.5 rounded-full select-none cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(123,95,199,0.15) 0%, rgba(224,64,128,0.12) 100%)",
                border: "1.5px solid rgba(123,95,199,0.4)",
                boxShadow: "0 4px 20px rgba(123,95,199,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                animation: "ctaFloat 2.5s ease-in-out infinite",
              }}
            >
              <span
                className="text-2xl"
                style={{ animation: "ctaHand 1.5s ease-in-out infinite" }}
              >
                👆
              </span>
              <span
                className="font-sans text-base font-semibold tracking-wider uppercase"
                style={{ color: "#7B5FC7" }}
              >
                Tap · drag to open
              </span>
            </div>
          </div>

          {/* Tech preview pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 max-w-lg">
            {[
              { name: "React", color: "#0EA5E9", bg: "rgba(14,165,233,0.12)" },
              { name: "C#", color: "#7C3AED", bg: "rgba(124,58,237,0.1)" },
              { name: "TypeScript", color: "#2563EB", bg: "rgba(37,99,235,0.1)" },
              { name: "Docker", color: "#0891B2", bg: "rgba(8,145,178,0.1)" },
              { name: ".NET", color: "#9333EA", bg: "rgba(147,51,234,0.1)" },
              { name: "Git", color: "#E2521A", bg: "rgba(226,82,26,0.1)" },
              { name: "+ 10 more", color: "#8B5CF6", bg: "rgba(139,92,246,0.08)" },
            ].map((tech) => (
              <span
                key={tech.name}
                className="font-sans text-sm font-semibold tracking-wide uppercase px-5 py-2.5 rounded-full transition-all hover:scale-105"
                style={{
                  border: `1.5px solid ${tech.color}50`,
                  color: tech.color,
                  background: tech.bg,
                  boxShadow: `0 2px 8px ${tech.color}15`,
                }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bursting: pack halves fly apart, cards burst */}
      {phase === "bursting" && (
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <PackBurstAnimation onBurstComplete={startReveal} />
        </div>
      )}

      {/* Revealing: cards appear — no pack backdrop (it already flew away) */}

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
          onAllDone={markScattered}
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
      <style>{`
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes ctaFloat {
          0%, 100% { transform: translateY(0px); opacity: 0.85; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes ctaHand {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(6px) rotate(-10deg); }
        }
      `}</style>
    </div>
  );
};

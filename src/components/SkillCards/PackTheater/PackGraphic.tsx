import { cn } from "@lib/utils";
import type React from "react";
import { useCallback, useRef, useState } from "react";

type PackGraphicProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  opened?: boolean;
  mini?: boolean;
};

export const PackGraphic: React.FC<PackGraphicProps> = ({
  children,
  onClick,
  className,
  opened = false,
  mini = false,
}) => {
  const packRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = packRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0.5, y: 0.5 });
  }, []);

  const tiltX = (mouse.y - 0.5) * -15;
  const tiltY = (mouse.x - 0.5) * 15;
  const shimmerAngle = mouse.x * 360;


  if (mini) {
    return (
      <div
        className={cn(
          "w-16 h-24 rounded-lg opacity-60",
          "bg-gradient-to-br from-[#B8A9D4] via-[#E8B4A0] to-[#D4929B]",
          className,
        )}
        style={{
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span
            className="font-script text-[10px] text-white/70"
            style={{
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            FR
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={packRef}
      className={cn(
        "relative select-none",
        mini ? "w-16 h-24" : "w-[260px] h-[380px]",
        onClick && !opened ? "cursor-pointer" : "",
        className,
      )}
      style={{
        perspective: "800px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={opened ? undefined : onClick}
      onKeyDown={
        onClick && !opened
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      role={onClick && !opened ? "button" : undefined}
      tabIndex={onClick && !opened ? 0 : undefined}
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

        {/* Layer 3: Conic shimmer (iridescent) */}
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

        {/* Content: title + card count */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
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

        {/* Rip zone: children slot for PackRip */}
        {children}
      </div>
    </div>
  );
};

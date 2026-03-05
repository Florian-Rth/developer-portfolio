import { cn } from "@lib/utils";
import type React from "react";
import { useCallback } from "react";

type HireMeCardProps = {
  className?: string;
  style?: React.CSSProperties;
  scale?: number;
};

const stats = [
  { label: "Availability", value: 100 },
  { label: "Communication", value: 95 },
  { label: "Culture Fit", value: 98 },
  { label: "Code Quality", value: 97 },
];

export const HireMeCard: React.FC<HireMeCardProps> = ({ className, style, scale = 1 }) => {
  const handleCTA = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      className={cn(
        "w-[220px] h-[320px] rounded-xl overflow-hidden relative flex flex-col",
        "select-none",
        className,
      )}
      style={{
        zoom: scale,
        background: "var(--card, #FFFDF9)",
        border: "2px solid #F4D03F",
        boxShadow: "0 4px 20px rgba(244,208,63,0.25), 0 0 40px rgba(244,208,63,0.1)",
        animation: "hireMeGlow 3s ease-in-out infinite",
        ...style,
      }}
    >
      {/* Header badges */}
      <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
        <span
          className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
          style={{ background: "rgba(244,208,63,0.15)", color: "#F39C12" }}
        >
          ✦ CONTACT
        </span>
        <span
          className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
          style={{ background: "rgba(244,208,63,0.15)", color: "#F39C12" }}
        >
          ★ LEGENDARY
        </span>
      </div>

      {/* Artwork area — abstract geometric */}
      <div className="mx-2.5 h-[36%] rounded-lg overflow-hidden relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #F4D03F 0%, #E8B4A0 40%, #D4929B 70%, #B8A9D4 100%)",
          }}
        />
        {/* Abstract geometric shapes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" aria-hidden="true">
          <circle cx={100} cy={55} r={28} fill="rgba(255,253,249,0.3)" />
          <circle cx={100} cy={55} r={18} fill="rgba(255,253,249,0.3)" />
          <polygon points="100,20 120,50 80,50" fill="rgba(255,253,249,0.2)" />
          <line x1={40} y1={90} x2={160} y2={90} stroke="rgba(255,253,249,0.2)" strokeWidth={1} />
          <line
            x1={50}
            y1={100}
            x2={150}
            y2={100}
            stroke="rgba(255,253,249,0.15)"
            strokeWidth={1}
          />
        </svg>
        {/* Holo overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(244,208,63,0.2), rgba(184,169,212,0.2), rgba(232,180,160,0.2), rgba(244,208,63,0.2))",
            animation: "holoSpin 4s linear infinite",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Name */}
      <h3
        className="font-sans text-[14px] font-bold px-3 pt-1.5"
        style={{
          background: "linear-gradient(135deg, #F4D03F, #F39C12)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Hire Me
      </h3>
      <p className="text-[10px] px-3 text-foreground/50">Florian Rätsch</p>

      {/* Stats compact */}
      <div className="px-3 pt-1 flex-1 flex flex-col gap-0.5 min-h-0">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="text-[8px] text-foreground/50 w-[72px] truncate">{s.label}</span>
            <div className="flex-1 h-1 rounded-full bg-foreground/5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${s.value}%`,
                  background: "linear-gradient(90deg, #F4D03F, #F39C12)",
                }}
              />
            </div>
            <span className="text-[8px] font-bold text-foreground/40 w-4 text-right">
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* Flavour text */}
      <p className="font-script text-[9px] px-3 text-foreground/40 italic">
        "Let's build something great."
      </p>

      {/* CTA */}
      <button
        type="button"
        onClick={handleCTA}
        className="mx-3 mb-2.5 mt-1 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #F4D03F, #F39C12)",
          color: "#1A1816",
          border: "none",
          boxShadow: "0 2px 8px rgba(244,208,63,0.3)",
        }}
      >
        Get in Touch
      </button>
    </div>
  );
};

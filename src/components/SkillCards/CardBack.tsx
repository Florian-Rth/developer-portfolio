import { cn } from "@lib/utils";
import type React from "react";

type CardBackProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const CardBack: React.FC<CardBackProps> = ({ className, style }) => (
  <div
    className={cn("w-[220px] h-[320px] rounded-xl overflow-hidden relative", className)}
    style={{
      background: "linear-gradient(160deg, #1a1528 0%, #221832 40%, #1c1a2e 70%, #1a1528 100%)",
      border: "1.5px solid rgba(184,169,212,0.5)",
      clipPath: "inset(0 round 12px)",
      ...style,
    }}
  >
    {/* ── Background diamond trellis pattern ─────────────────────────── */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 220 320"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Diamond trellis tile */}
        <pattern id="trellis" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <path
            d="M11 0 L22 11 L11 22 L0 11 Z"
            fill="none"
            stroke="rgba(184,169,212,0.12)"
            strokeWidth="0.8"
          />
        </pattern>
        {/* Radial vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(10,8,18,0.65)" />
        </radialGradient>
        {/* Center glow */}
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="rgba(184,169,212,0.1)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Trellis fill */}
      <rect width="220" height="320" fill="url(#trellis)" />

      {/* Center glow */}
      <rect width="220" height="320" fill="url(#centerGlow)" />

      {/* Vignette */}
      <rect width="220" height="320" fill="url(#vignette)" />

      {/* Inner frame */}
      <rect
        x="10"
        y="10"
        width="200"
        height="300"
        rx="7"
        fill="none"
        stroke="rgba(184,169,212,0.2)"
        strokeWidth="1"
      />
      <rect
        x="14"
        y="14"
        width="192"
        height="292"
        rx="5"
        fill="none"
        stroke="rgba(232,180,160,0.12)"
        strokeWidth="0.6"
      />

      {/* Corner ornaments */}
      {/* Top-left */}
      <path
        d="M18 18 L30 18 M18 18 L18 30"
        stroke="rgba(244,208,63,0.5)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Top-right */}
      <path
        d="M202 18 L190 18 M202 18 L202 30"
        stroke="rgba(244,208,63,0.5)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Bottom-left */}
      <path
        d="M18 302 L30 302 M18 302 L18 290"
        stroke="rgba(244,208,63,0.5)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Bottom-right */}
      <path
        d="M202 302 L190 302 M202 302 L202 290"
        stroke="rgba(244,208,63,0.5)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Top & bottom center diamonds */}
      <path
        d="M110 20 L116 26 L110 32 L104 26 Z"
        fill="rgba(244,208,63,0.3)"
        stroke="rgba(244,208,63,0.5)"
        strokeWidth="0.6"
      />
      <path
        d="M110 288 L116 294 L110 300 L104 294 Z"
        fill="rgba(244,208,63,0.3)"
        stroke="rgba(244,208,63,0.5)"
        strokeWidth="0.6"
      />
    </svg>

    {/* ── Shimmer sweep ───────────────────────────────────────────────── */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.06) 50%, transparent 75%)",
        backgroundSize: "200% 100%",
        animation: "cardBackShimmer 6s ease-in-out infinite",
      }}
    />

    {/* ── FR monogram ─────────────────────────────────────────────────── */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
      {/* Monogram container with subtle halo */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 80,
          height: 80,
        }}
      >
        {/* Halo ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(184,169,212,0.18) 0%, transparent 70%)",
          }}
        />
        <span
          className="font-script select-none relative z-10"
          style={{
            fontSize: "3.5rem",
            background:
              "linear-gradient(135deg, #e8d5b0 0%, #f4d03f 35%, #e8b4a0 65%, #d4929b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 2px 12px rgba(244,208,63,0.45))",
            lineHeight: 1,
          }}
        >
          FR
        </span>
      </div>

      {/* Decorative separator */}
      <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
        <div style={{ width: 24, height: 1, background: "rgba(244,208,63,0.3)" }} />
        <div
          style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(244,208,63,0.5)" }}
        />
        <div style={{ width: 24, height: 1, background: "rgba(244,208,63,0.3)" }} />
      </div>
    </div>

    {/* ── Gradient border glow (inset) ────────────────────────────────── */}
    <div
      className="absolute inset-0 rounded-xl pointer-events-none"
      style={{
        boxShadow: "inset 0 0 0 1px rgba(184,169,212,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    />
  </div>
);

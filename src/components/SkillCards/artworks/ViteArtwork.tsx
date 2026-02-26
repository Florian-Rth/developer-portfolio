import type React from "react";

const glowKeyframes = `
@keyframes vite-glow {
  0%, 100% { filter: drop-shadow(0 0 4px rgba(184,169,212,0.4)); }
  50% { filter: drop-shadow(0 0 12px rgba(184,169,212,0.7)); }
}
`;

export const ViteArtwork: React.FC = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-foreground/5">
      <style>{glowKeyframes}</style>
      <svg
        viewBox="0 0 60 70"
        className="w-[50%] h-[70%]"
        style={{ animation: "vite-glow 2s ease-in-out infinite" }}
        aria-hidden="true"
      >
        {/* Lightning bolt */}
        <polygon
          points="35,5 15,35 28,35 22,65 45,30 32,30"
          fill="url(#vite-grad)"
          stroke="#B8A9D4"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="vite-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8A9D4" />
            <stop offset="100%" stopColor="#E8B4A0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

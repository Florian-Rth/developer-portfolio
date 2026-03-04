import type React from "react";
import type { ArtworkProps } from "./types";

export const DotnetArtwork: React.FC<ArtworkProps> = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-card">
      <svg viewBox="0 0 120 80" className="w-[90%] h-[90%]" aria-hidden="true">
        {/* .NET text */}
        <text
          x="60"
          y="44"
          className="font-mono"
          fontSize="22"
          fontWeight="bold"
          fill="#512BD4"
          textAnchor="middle"
        >
          .NET
        </text>
        {/* Accent dot */}
        <circle cx="60" cy="58" r="3" fill="#512BD4" opacity="0.6" />
        {/* Decorative diamonds */}
        <polygon points="20,40 25,35 30,40 25,45" fill="#512BD4" opacity="0.3" />
        <polygon points="90,40 95,35 100,40 95,45" fill="#512BD4" opacity="0.3" />
      </svg>
    </div>
  );
};

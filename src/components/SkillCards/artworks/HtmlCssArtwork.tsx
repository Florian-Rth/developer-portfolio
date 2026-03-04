import type React from "react";
import type { ArtworkProps } from "./types";

export const HtmlCssArtwork: React.FC<ArtworkProps> = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-card">
      <svg viewBox="0 0 120 80" className="w-[90%] h-[90%]" aria-hidden="true">
        {/* HTML tag */}
        <text
          x="28"
          y="38"
          className="font-mono"
          fontSize="16"
          fontWeight="bold"
          fill="#E34F26"
          textAnchor="middle"
        >
          {"<div>"}
        </text>
        {/* CSS braces */}
        <text
          x="88"
          y="38"
          className="font-mono"
          fontSize="16"
          fontWeight="bold"
          fill="#264DE4"
          textAnchor="middle"
        >
          {"{ }"}
        </text>
        {/* Decorative line between */}
        <line x1="50" y1="30" x2="68" y2="30" stroke="#A8C4B8" strokeWidth="1" opacity="0.5" />
        {/* Labels */}
        <text
          x="28"
          y="58"
          className="font-mono"
          fontSize="8"
          fill="#E34F26"
          textAnchor="middle"
          opacity="0.7"
        >
          HTML
        </text>
        <text
          x="88"
          y="58"
          className="font-mono"
          fontSize="8"
          fill="#264DE4"
          textAnchor="middle"
          opacity="0.7"
        >
          CSS
        </text>
      </svg>
    </div>
  );
};

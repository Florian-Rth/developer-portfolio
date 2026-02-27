import type React from "react";

export const ReactArtwork: React.FC = () => {
  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#1E1B19" }}
    >
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Nucleus */}
        <circle cx="50" cy="50" r="8" fill="#61DAFB" />
        {/* Ring 1 — horizontal */}
        <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#61DAFB" strokeWidth="2" opacity="0.7" />
        {/* Ring 2 — tilted 60° */}
        <ellipse
          cx="50"
          cy="50"
          rx="38"
          ry="14"
          stroke="#61DAFB"
          strokeWidth="2"
          opacity="0.7"
          transform="rotate(60 50 50)"
        />
        {/* Ring 3 — tilted -60° */}
        <ellipse
          cx="50"
          cy="50"
          rx="38"
          ry="14"
          stroke="#61DAFB"
          strokeWidth="2"
          opacity="0.7"
          transform="rotate(-60 50 50)"
        />
      </svg>
    </div>
  );
};

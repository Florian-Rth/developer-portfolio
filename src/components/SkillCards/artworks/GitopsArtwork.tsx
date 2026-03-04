import type React from "react";
import type { ArtworkProps } from "./types";

export const GitopsArtwork: React.FC<ArtworkProps> = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-card">
      <svg viewBox="0 0 120 80" className="w-[90%] h-[90%]" aria-hidden="true">
        {/* Git branch line */}
        <line x1="25" y1="45" x2="55" y2="45" stroke="#E8B4A0" strokeWidth="2" />
        <line x1="35" y1="45" x2="45" y2="28" stroke="#E8B4A0" strokeWidth="2" />
        <line x1="45" y1="28" x2="55" y2="45" stroke="#E8B4A0" strokeWidth="2" />
        {/* Branch dots */}
        <circle cx="25" cy="45" r="3.5" fill="#E8B4A0" />
        <circle cx="35" cy="45" r="3" fill="#E8B4A0" />
        <circle cx="45" cy="28" r="3" fill="#E8B4A0" />
        <circle cx="55" cy="45" r="3.5" fill="#E8B4A0" />
        {/* Loop arrow (sync cycle) */}
        <path d="M 68,32 A 14,14 0 1,1 68,48" fill="none" stroke="#4CAF50" strokeWidth="2" />
        <polygon points="68,48 63,43 73,43" fill="#4CAF50" />
        {/* Sync icon center */}
        <circle cx="82" cy="40" r="3" fill="#4CAF50" opacity="0.5" />
        {/* Decorative dots */}
        <circle cx="55" cy="60" r="2" fill="#E8B4A0" opacity="0.4" />
        <circle cx="63" cy="60" r="2" fill="#4CAF50" opacity="0.4" />
      </svg>
    </div>
  );
};

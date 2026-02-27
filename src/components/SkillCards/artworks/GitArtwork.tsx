import type React from "react";

export const GitArtwork: React.FC = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-card">
      <svg viewBox="0 0 120 80" className="w-[90%] h-[90%]" aria-hidden="true">
        {/* Main branch line */}
        <line x1="20" y1="60" x2="100" y2="60" stroke="#A8C4B8" strokeWidth="2" />
        {/* Feature branch */}
        <line x1="40" y1="60" x2="55" y2="30" stroke="#D4929B" strokeWidth="2" />
        <line x1="55" y1="30" x2="80" y2="30" stroke="#D4929B" strokeWidth="2" />
        <line x1="80" y1="30" x2="80" y2="60" stroke="#D4929B" strokeWidth="2" />
        {/* Commit dots - main */}
        <circle cx="20" cy="60" r="4" fill="#A8C4B8" />
        <circle cx="40" cy="60" r="4" fill="#A8C4B8" />
        <circle cx="60" cy="60" r="3" fill="#A8C4B8" />
        <circle cx="80" cy="60" r="5" fill="#B8A9D4" />
        <circle cx="100" cy="60" r="4" fill="#A8C4B8" />
        {/* Commit dots - feature */}
        <circle cx="55" cy="30" r="3" fill="#D4929B" />
        <circle cx="68" cy="30" r="3" fill="#D4929B" />
        <circle cx="80" cy="30" r="3" fill="#D4929B" />
        {/* Labels */}
        <text x="20" y="75" className="font-mono" fontSize="7" fill="#A8C4B8" textAnchor="middle">
          main
        </text>
        <text x="55" y="22" className="font-mono" fontSize="7" fill="#D4929B" textAnchor="middle">
          feature
        </text>
      </svg>
    </div>
  );
};

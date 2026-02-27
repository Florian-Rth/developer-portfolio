import type React from "react";

export const CiCdArtwork: React.FC = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-foreground/5">
      <svg viewBox="0 0 120 80" className="w-[90%] h-[90%]" aria-hidden="true">
        {/* Connecting lines */}
        <line x1="30" y1="35" x2="52" y2="35" stroke="#A8C4B8" strokeWidth="2" />
        <line x1="68" y1="35" x2="90" y2="35" stroke="#A8C4B8" strokeWidth="2" />
        {/* Arrow heads */}
        <polygon points="50,31 56,35 50,39" fill="#A8C4B8" />
        <polygon points="88,31 94,35 88,39" fill="#A8C4B8" />
        {/* Build circle */}
        <circle cx="20" cy="35" r="12" fill="none" stroke="#B8A9D4" strokeWidth="2" />
        <text x="20" y="38" className="font-mono" fontSize="6" fontWeight="bold" fill="#B8A9D4" textAnchor="middle">
          Build
        </text>
        {/* Test circle */}
        <circle cx="60" cy="35" r="12" fill="none" stroke="#E8B4A0" strokeWidth="2" />
        <text x="60" y="38" className="font-mono" fontSize="6" fontWeight="bold" fill="#E8B4A0" textAnchor="middle">
          Test
        </text>
        {/* Deploy circle */}
        <circle cx="100" cy="35" r="12" fill="none" stroke="#A8C4B8" strokeWidth="2" />
        <text x="100" y="38" className="font-mono" fontSize="5" fontWeight="bold" fill="#A8C4B8" textAnchor="middle">
          Deploy
        </text>
        {/* CI/CD label */}
        <text x="60" y="65" className="font-mono" fontSize="8" fill="#D4929B" textAnchor="middle" opacity="0.6">
          CI / CD
        </text>
      </svg>
    </div>
  );
};

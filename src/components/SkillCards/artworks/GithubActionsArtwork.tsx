import type React from "react";

export const GithubActionsArtwork: React.FC = () => {
  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#1a1816" }}
    >
      <svg viewBox="0 0 120 80" className="w-[90%] h-[90%]" aria-hidden="true">
        {/* Play button circle */}
        <circle cx="40" cy="36" r="16" fill="none" stroke="#A8C4B8" strokeWidth="2" />
        <polygon points="35,27 35,45 52,36" fill="#A8C4B8" />
        {/* Workflow lines */}
        <line x1="58" y1="28" x2="75" y2="28" stroke="#B8A9D4" strokeWidth="2" />
        <line x1="58" y1="36" x2="80" y2="36" stroke="#B8A9D4" strokeWidth="2" />
        <line x1="58" y1="44" x2="70" y2="44" stroke="#B8A9D4" strokeWidth="2" />
        {/* Workflow dots */}
        <circle cx="78" cy="28" r="3" fill="#B8A9D4" />
        <circle cx="83" cy="36" r="3" fill="#A8C4B8" />
        <circle cx="73" cy="44" r="3" fill="#D4929B" />
        {/* Connecting vertical line */}
        <line x1="83" y1="28" x2="83" y2="44" stroke="#B8A9D4" strokeWidth="1" opacity="0.4" />
        {/* Label */}
        <text x="60" y="68" className="font-mono" fontSize="7" fill="#A8C4B8" textAnchor="middle" opacity="0.6">
          Actions
        </text>
      </svg>
    </div>
  );
};

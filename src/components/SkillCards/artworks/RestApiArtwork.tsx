import type React from "react";

export const RestApiArtwork: React.FC = () => {
  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#1a1816" }}
    >
      <svg viewBox="0 0 120 80" className="w-[90%] h-[90%]" aria-hidden="true">
        {/* GET badge */}
        <rect x="8" y="14" width="32" height="14" rx="3" fill="#4CAF50" />
        <text x="24" y="24" className="font-mono" fontSize="8" fontWeight="bold" fill="#fff" textAnchor="middle">
          GET
        </text>
        {/* POST badge */}
        <rect x="44" y="14" width="32" height="14" rx="3" fill="#2196F3" />
        <text x="60" y="24" className="font-mono" fontSize="8" fontWeight="bold" fill="#fff" textAnchor="middle">
          POST
        </text>
        {/* PUT badge */}
        <rect x="80" y="14" width="32" height="14" rx="3" fill="#FF9800" />
        <text x="96" y="24" className="font-mono" fontSize="8" fontWeight="bold" fill="#fff" textAnchor="middle">
          PUT
        </text>
        {/* API path */}
        <text x="60" y="50" className="font-mono" fontSize="8" fill="#A8C4B8" textAnchor="middle" opacity="0.7">
          /api/v1/skills
        </text>
        {/* Response line */}
        <text x="60" y="65" className="font-mono" fontSize="7" fill="#D4929B" textAnchor="middle" opacity="0.5">
          {"{ \"status\": 200 }"}
        </text>
      </svg>
    </div>
  );
};

import type React from "react";

export const CSharpArtwork: React.FC = () => {
  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#1E1B19" }}
    >
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* C letter arc */}
        <path
          d="M62 28C55.5 22 46.5 20 38 23C26 27.5 20 41 24.5 53C29 65 43 71 55 66.5C60 64.5 64 61 66 56"
          stroke="#D4929B"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Hash / sharp symbol */}
        <line x1="58" y1="38" x2="58" y2="62" stroke="#D4929B" strokeWidth="3" strokeLinecap="round" />
        <line x1="68" y1="38" x2="68" y2="62" stroke="#D4929B" strokeWidth="3" strokeLinecap="round" />
        <line x1="53" y1="46" x2="73" y2="46" stroke="#D4929B" strokeWidth="3" strokeLinecap="round" />
        <line x1="53" y1="54" x2="73" y2="54" stroke="#D4929B" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
};

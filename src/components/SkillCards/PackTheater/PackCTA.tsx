import type React from "react";

export const PackCTA: React.FC = () => (
  <div className="flex flex-col items-center mt-6">
    <div
      className="flex items-center gap-4 px-7 py-3.5 rounded-full select-none cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(123,95,199,0.15) 0%, rgba(224,64,128,0.12) 100%)",
        border: "1.5px solid rgba(123,95,199,0.4)",
        boxShadow: "0 4px 20px rgba(123,95,199,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        animation: "ctaFloat 2.5s ease-in-out infinite",
      }}
    >
      <span className="text-2xl" style={{ animation: "ctaHand 1.5s ease-in-out infinite" }}>
        👆
      </span>
      <span
        className="font-sans text-base font-semibold tracking-wider uppercase"
        style={{ color: "#7B5FC7" }}
      >
        Tap · drag to open
      </span>
    </div>
  </div>
);

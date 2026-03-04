import type React from "react";
import type { ArtworkProps } from "./types";

const typingKeyframes = `
@keyframes js-typing {
  0% { width: 0; }
  70% { width: 100%; }
  100% { width: 100%; }
}
@keyframes js-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;

export const JavaScriptArtwork: React.FC<ArtworkProps> = () => {
  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center p-3"
      style={{ backgroundColor: "#1E1B19" }}
    >
      <style>{typingKeyframes}</style>
      <div className="font-mono text-[10px] whitespace-nowrap overflow-hidden">
        <span style={{ color: "#9CDCFE" }}>console</span>
        <span style={{ color: "#D4D4D4" }}>.</span>
        <span style={{ color: "#DCDCAA" }}>log</span>
        <span style={{ color: "#D4D4D4" }}>(</span>
        <span
          className="inline-block overflow-hidden whitespace-nowrap align-bottom"
          style={{
            animation: "js-typing 3s steps(12) infinite",
            borderRight: "2px solid #D4D4D4",
          }}
        >
          <span style={{ color: "#CE9178" }}>"Hello! 👋"</span>
        </span>
        <span style={{ color: "#D4D4D4" }}>)</span>
      </div>
    </div>
  );
};

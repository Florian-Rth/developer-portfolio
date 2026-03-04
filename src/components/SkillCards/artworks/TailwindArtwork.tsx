import type React from "react";
import type { ArtworkProps } from "./types";

const chips = ["flex", "items-center", "gap-4", "text-sm", "rounded-full"];
const chipColors = ["#B8A9D4", "#D4929B", "#E8B4A0", "#A8C4B8", "#B8A9D4"];

export const TailwindArtwork: React.FC<ArtworkProps> = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden flex flex-wrap items-center justify-center gap-1.5 p-3 bg-card">
      {chips.map((chip, i) => (
        <span
          key={chip}
          className="font-mono text-[9px] px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${chipColors[i]}25`,
            color: chipColors[i],
            border: `1px solid ${chipColors[i]}40`,
          }}
        >
          {chip}
        </span>
      ))}
    </div>
  );
};

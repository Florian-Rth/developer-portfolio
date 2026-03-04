import type React from "react";
import type { ArtworkProps } from "./types";

export const TypeScriptArtwork: React.FC<ArtworkProps> = () => {
  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center p-3"
      style={{ backgroundColor: "#1E1B19" }}
    >
      <pre className="font-mono text-[10px] leading-relaxed">
        <code>
          <span style={{ color: "#C586C0" }}>const</span>{" "}
          <span style={{ color: "#9CDCFE" }}>x</span>
          <span style={{ color: "#D4D4D4" }}>: </span>
          <span style={{ color: "#4EC9B0" }}>number</span>
          <span style={{ color: "#D4D4D4" }}> = </span>
          <span style={{ color: "#B5CEA8" }}>42</span>
          {"\n"}
          <span style={{ color: "#569CD6" }}>type</span>{" "}
          <span style={{ color: "#4EC9B0" }}>Dev</span>
          <span style={{ color: "#D4D4D4" }}> = </span>
          <span style={{ color: "#CE9178" }}>"florian"</span>
        </code>
      </pre>
    </div>
  );
};

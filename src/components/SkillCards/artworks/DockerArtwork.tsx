import type React from "react";
import type { ArtworkProps } from "./types";

export const DockerArtwork: React.FC<ArtworkProps> = () => {
  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#1E1B19" }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Whale body */}
        <path
          d="M15 58C15 58 18 42 40 42H75C75 42 80 48 78 55C76 62 68 68 52 68C36 68 22 66 15 58Z"
          fill="#E8B4A0"
          opacity="0.85"
        />
        {/* Containers row 1 */}
        <rect
          x="30"
          y="44"
          width="8"
          height="7"
          rx="1"
          stroke="#1E1B19"
          strokeWidth="1.5"
          fill="#E8B4A0"
        />
        <rect
          x="40"
          y="44"
          width="8"
          height="7"
          rx="1"
          stroke="#1E1B19"
          strokeWidth="1.5"
          fill="#E8B4A0"
        />
        <rect
          x="50"
          y="44"
          width="8"
          height="7"
          rx="1"
          stroke="#1E1B19"
          strokeWidth="1.5"
          fill="#E8B4A0"
        />
        <rect
          x="60"
          y="44"
          width="8"
          height="7"
          rx="1"
          stroke="#1E1B19"
          strokeWidth="1.5"
          fill="#E8B4A0"
        />
        {/* Containers row 2 */}
        <rect
          x="40"
          y="35"
          width="8"
          height="7"
          rx="1"
          stroke="#1E1B19"
          strokeWidth="1.5"
          fill="#E8B4A0"
        />
        <rect
          x="50"
          y="35"
          width="8"
          height="7"
          rx="1"
          stroke="#1E1B19"
          strokeWidth="1.5"
          fill="#E8B4A0"
        />
        {/* Water wave */}
        <path
          d="M10 62C16 58 22 62 28 60C34 58 40 62 46 60C52 58 58 62 64 60C70 58 76 62 82 60C88 58 92 62 95 60"
          stroke="#E8B4A0"
          strokeWidth="2"
          opacity="0.4"
          fill="none"
        />
      </svg>
    </div>
  );
};

import type React from "react";
import type { ArtworkProps } from "./types";

export const KubernetesArtwork: React.FC<ArtworkProps> = () => {
  const cx = 60;
  const cy = 38;
  const outerR = 24;
  const spokeR = 10;

  // 7 spokes for the helm wheel
  const spokes = Array.from({ length: 7 }, (_, i) => {
    const angle = (i * 2 * Math.PI) / 7 - Math.PI / 2;
    const x2 = cx + Math.cos(angle) * outerR;
    const y2 = cy + Math.sin(angle) * outerR;
    const tipX = cx + Math.cos(angle) * (outerR + 5);
    const tipY = cy + Math.sin(angle) * (outerR + 5);
    return { x2, y2, tipX, tipY };
  });

  return (
    <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-card">
      <svg viewBox="0 0 120 80" className="w-[90%] h-[90%]" aria-hidden="true">
        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#326CE5" strokeWidth="2.5" />
        {/* Inner hub */}
        <circle cx={cx} cy={cy} r={spokeR} fill="#326CE5" opacity="0.3" />
        <circle cx={cx} cy={cy} r="4" fill="#326CE5" />
        {/* Spokes with rounded tips */}
        {spokes.map((s, i) => (
          <g key={i}>
            <line x1={cx} y1={cy} x2={s.x2} y2={s.y2} stroke="#326CE5" strokeWidth="2" />
            <circle cx={s.tipX} cy={s.tipY} r="3" fill="#326CE5" />
          </g>
        ))}
        {/* Label */}
        <text
          x="60"
          y="72"
          className="font-mono"
          fontSize="7"
          fill="#326CE5"
          textAnchor="middle"
          opacity="0.7"
        >
          K8s
        </text>
      </svg>
    </div>
  );
};

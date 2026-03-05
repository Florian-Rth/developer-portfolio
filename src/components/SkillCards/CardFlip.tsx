import { cn } from "@lib/utils";
import type React from "react";

type CardFlipProps = {
  flipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const CardFlip: React.FC<CardFlipProps> = ({ flipped, front, back, className, style }) => (
  <div
    className={cn("relative", className)}
    style={{
      perspective: "800px",
      width: 220,
      height: 320,
      ...style,
    }}
  >
    <div
      className="absolute inset-0"
      style={{
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.4s ease-out",
      }}
    >
      {/* Back face (visible by default) */}
      <div
        className="absolute inset-0"
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        {back}
      </div>

      {/* Front face (revealed on flip) */}
      <div
        className="absolute inset-0"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        {front}
      </div>
    </div>
  </div>
);

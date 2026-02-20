import { cn } from "@lib/utils";
import type React from "react";

type SectionDividerProps = {
  className?: string;
};

export const SectionDivider: React.FC<SectionDividerProps> = ({ className }) => {
  return (
    <div
      data-testid="section-divider"
      aria-hidden="true"
      className={cn("absolute left-0 right-0 w-full z-10", className)}
      style={{ top: "calc(100vh - 10rem)", pointerEvents: "none" }}
    >
      <svg
        viewBox="0 0 1440 260"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
        role="presentation"
      >
        <defs>
          <linearGradient
            id="dividerGrad"
            x1="0"
            y1="0"
            x2="1440"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#E8B4A0" stopOpacity="0.2" />
            <stop offset="15%" stopColor="#E8B4A0" stopOpacity="0.55" />
            <stop offset="38%" stopColor="#D4929B" stopOpacity="0.6" />
            <stop offset="62%" stopColor="#C4A0BD" stopOpacity="0.45" />
            <stop offset="82%" stopColor="#B8A9D4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9FAAD4" stopOpacity="0.18" />
          </linearGradient>
          <filter id="dividerBrush" x="-3%" y="-10%" width="106%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.006"
              numOctaves={1}
              seed={12}
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale={0.5}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* Fill below wave matches About section bg — creates seamless transition */}
        <path
          d="M-20,110 C40,102 90,92 160,76 C240,56 300,48 380,56 C460,64 500,76 560,80 C620,82 660,78 720,62 C790,46 840,38 920,44 C1000,50 1040,62 1100,66 C1160,68 1200,62 1260,48 C1320,36 1380,38 1460,38 L1460,260 L-20,260 Z"
          fill="transparent"
        />

        {/* Brush wave stroke */}
        <path
          d="M-20,95 C40,88 90,72 160,58 C240,40 300,34 380,40 C460,48 500,62 560,66 C620,70 660,58 720,44 C790,28 840,20 920,24 C1000,30 1040,42 1100,46 C1160,50 1200,40 1260,30 C1320,20 1380,18 1460,20 L1460,38 C1380,38 1320,36 1260,48 C1200,62 1160,68 1100,66 C1040,62 1000,50 920,44 C840,38 790,46 720,62 C660,78 620,82 560,80 C500,76 460,64 380,56 C300,48 240,56 160,76 C90,92 40,102 -20,110 Z"
          fill="url(#dividerGrad)"
          filter="url(#dividerBrush)"
        />
      </svg>
    </div>
  );
};
